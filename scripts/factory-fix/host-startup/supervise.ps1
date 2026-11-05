#requires -Version 5.1
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string]$ApprovalFile,
    [Parameter(Mandatory=$true)][ValidatePattern('^[A-Fa-f0-9]{64}$')][string]$ApprovedManifestSha256,
    [Parameter(Mandatory=$true)][byte[]]$ObserverAssemblyBytes,
    [Parameter(Mandatory=$true)][ValidatePattern('^[A-Fa-f0-9]{64}$')][string]$ApprovedObserverAssemblySha256,
    [Parameter(Mandatory=$true)][string]$ApprovedWindowsDirectory,
    [Parameter(Mandatory=$true)][ValidatePattern('^S-1-5-21-\d+-\d+-\d+-\d+$')][string]$ReviewedCodexSandboxUsersSid
)
Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'
$PSModuleAutoLoadingPreference='None'
$checks=New-Object 'System.Collections.Generic.List[object]'
$trials=New-Object 'System.Collections.Generic.List[object]'
$artifacts=New-Object 'System.Collections.Generic.List[object]'
$artifactEvidence=New-Object 'System.Collections.Generic.List[object]'
$files=$null
$attempted=0; $started=0; $verified=0; $failureCode='PREFLIGHT_FAILED'
$report=[ordered]@{
    schemaVersion=2; purpose='AVA76_LOCAL_STARTUP_ONLY'; launchAttempted=$false
    runtimeStatus='RUNTIME_NOT_ISOLATED'; hostTrust='UNKNOWN'; operationalDecision='BLOCKED'
    inferenceAuthorized=$false; realExecutionEnabled=$false; writeAuthorized=$false
    networkBoundary='NOT_IMPLEMENTED'; compilation='EXTERNAL_ONLY_NOT_ATTEMPTED'
    timeoutMs=10000; watchdogToleranceMs=250; terminationToleranceMs=2000; maximumPipeBytes=8192
    checks=$checks; trials=$trials; artifacts=$artifactEvidence
}
function Add-Check([string]$Name,[string]$State,[string]$Source,$Detail,[bool]$Required=$true) {
    $checks.Add([pscustomobject]@{name=$Name;state=$State;source=$Source;detail=$Detail;requiredForProcedure=$Required})
}
function Require([bool]$Condition,[string]$Name,[string]$Source) {
    if (-not $Condition) { Add-Check $Name 'FAIL' $Source 'CONDITION_NOT_MET'; throw 'CHECK_FAILED' }
    Add-Check $Name 'PASS' $Source 'CONDITION_MET'
}
function Exact-Keys($Value,[string[]]$Expected) {
    if ($null -eq $Value) { return $false }
    return ((@($Value.PSObject.Properties.Name | Sort-Object) -join '|') -ceq (($Expected | Sort-Object) -join '|'))
}
function Check-Observation($Trial,[string]$Prefix,[string]$NativeNode) {
    if ($Trial.Child.ImageError -ne 0) { Add-Check ($Prefix+'.image') 'UNKNOWN' 'WINDOWS_PROCESS_HANDLE' $Trial.Child.ImageError }
    else { Require ($Trial.Child.ImagePath -ieq $NativeNode) ($Prefix+'.image') 'WINDOWS_NATIVE_IMAGE_PATH' }
    if ($Trial.Child.ParentError -ne 0) { Add-Check ($Prefix+'.parent') 'UNKNOWN' 'WINDOWS_TOOLHELP' $Trial.Child.ParentError }
    else { Require ($Trial.Child.ParentPid -eq $PID) ($Prefix+'.parent') 'WINDOWS_TOOLHELP' }
    if ($null -eq $Trial.Supervisor) { Add-Check ($Prefix+'.supervisor') 'UNKNOWN' 'WINDOWS_TOKEN' 'NOT_OBSERVED'; return }
    $child=$Trial.Child.Security; $parent=$Trial.Supervisor.Security
    if ($child.UserError -ne 0 -or $parent.UserError -ne 0) { Add-Check ($Prefix+'.user') 'UNKNOWN' 'WINDOWS_TOKEN' 'UNAVAILABLE' }
    else { Require ($child.UserSid -eq $parent.UserSid) ($Prefix+'.user') 'WINDOWS_TOKEN' }
    if ($child.ElevationError -ne 0 -or $parent.ElevationError -ne 0) { Add-Check ($Prefix+'.nonElevated') 'UNKNOWN' 'WINDOWS_TOKEN' 'UNAVAILABLE' }
    else { Require (-not $child.Elevated -and -not $parent.Elevated) ($Prefix+'.nonElevated') 'WINDOWS_TOKEN' }
    if ($child.IntegrityError -ne 0 -or $parent.IntegrityError -ne 0) { Add-Check ($Prefix+'.integrity') 'UNKNOWN' 'WINDOWS_TOKEN' 'UNAVAILABLE' }
    else { Require ($child.IntegritySid -eq $parent.IntegritySid) ($Prefix+'.integrity') 'WINDOWS_TOKEN' }
}
try {
    # No artifact path is opened, no assembly loaded and no compiler invoked here.
    # PowerShell/CLR startup and delivery of the byte[] are an EXTERNAL trust boundary.
    Require ($PSVersionTable.PSEdition -eq 'Desktop' -and [IntPtr]::Size -eq 8) 'host.windowsPowerShell64' 'MANAGED_PREFLIGHT'
    $identity=[Security.Principal.WindowsIdentity]::GetCurrent()
    try {
        Require ($identity.IsAuthenticated -and -not $identity.IsSystem -and -not $identity.IsAnonymous) 'host.operatorIdentity' 'MANAGED_TOKEN'
        $principal=[Security.Principal.WindowsPrincipal]::new($identity)
        Require (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) 'host.adminRoleDisabled' 'MANAGED_TOKEN_BEFORE_ASSEMBLY_LOAD'
    } finally { $identity.Dispose() }
    Require ($ApprovedWindowsDirectory -cmatch '^[A-Za-z]:\\[^\\/:*?"<>|]+$') 'host.windowsReferenceShape' 'EXTERNAL_REFERENCE'
    $allowed=@('SystemRoot','WINDIR','TEMP','TMP','HOMEDRIVE','HOMEPATH','LOGONSERVER','PATH','SYSTEMDRIVE','USERDOMAIN','USERNAME','USERPROFILE')
    foreach ($name in [Environment]::GetEnvironmentVariables().Keys) {
        Require ($allowed -icontains $name) 'host.environmentName' 'MANAGED_ENVIRONMENT_NO_VALUES_REPORTED'
        if ($name -iin @('SystemRoot','WINDIR')) {
            Require ([Environment]::GetEnvironmentVariable($name) -ieq $ApprovedWindowsDirectory) 'host.windowsEnvironment' 'EXTERNAL_REFERENCE'
        } else {
            Require ([string]::IsNullOrEmpty([Environment]::GetEnvironmentVariable($name))) 'host.emptyAmbientValue' 'MANAGED_ENVIRONMENT_NO_VALUES_REPORTED'
        }
    }
    Require ([Environment]::GetEnvironmentVariable('SystemRoot') -ieq $ApprovedWindowsDirectory -and [Environment]::GetEnvironmentVariable('WINDIR') -ieq $ApprovedWindowsDirectory) 'host.windowsVariablesPresent' 'EXTERNAL_REFERENCE'
    Require ($ObserverAssemblyBytes.Length -gt 0 -and $ObserverAssemblyBytes.Length -le 1048576) 'observer.binarySize' 'IN_MEMORY_INPUT'
    # Private copy: the caller cannot change bytes between hashing and Assembly.Load.
    $assemblyBytes=[byte[]]$ObserverAssemblyBytes.Clone()
    $sha=[Security.Cryptography.SHA256]::Create()
    try { $binaryHash=([BitConverter]::ToString($sha.ComputeHash($assemblyBytes))).Replace('-','') } finally { $sha.Dispose() }
    Require ($binaryHash -ieq $ApprovedObserverAssemblySha256) 'observer.binaryReference' 'EXTERNAL_PREVIOUSLY_APPROVED_HASH'
    foreach ($loaded in [AppDomain]::CurrentDomain.GetAssemblies()) {
        Require ($null -eq $loaded.GetType('Ava76Startup.WindowsObserver',$false,$false)) 'observer.noPreloadedType' 'CURRENT_APPDOMAIN'
    }
    $failureCode='OBSERVER_LOAD_FAILED'
    # Load exact approved bytes, never Add-Type, LoadFrom, or an assembly pathname.
    $assembly=[Reflection.Assembly]::Load($assemblyBytes)
    Require ([Ava76Startup.WindowsObserver].Assembly -eq $assembly -and [Ava76Startup.LocalFiles].Assembly -eq $assembly -and [Ava76Startup.Trial].Assembly -eq $assembly) 'observer.loadedAssembly' 'IN_MEMORY_ASSEMBLY_IDENTITY'
    $self=[Diagnostics.Process]::GetCurrentProcess()
    try { $supervisor=[Ava76Startup.WindowsObserver]::Observe($self) } finally { $self.Dispose() }
    $report['supervisorBeforeLaunch']=$supervisor
    if ($supervisor.Security.ElevationError -ne 0) {
        Add-Check 'supervisor.nonElevated' 'UNKNOWN' 'WINDOWS_TOKEN' 'UNAVAILABLE; NO_CHILD_LAUNCHED'
        throw 'SECURITY_CONTEXT_UNAVAILABLE'
    }
    Require (-not $supervisor.Security.Elevated) 'supervisor.nonElevated' 'WINDOWS_TOKEN'
    $files=[Ava76Startup.LocalFiles]::new($ReviewedCodexSandboxUsersSid)
    $failureCode='APPROVAL_INVALID'
    $manifest=$files.Pin($ApprovalFile,$false)
    Require ($manifest.Sha256() -ieq $ApprovedManifestSha256) 'approval.referenceHash' 'PINNED_FILE_EXTERNAL_REFERENCE'
    $approval=$manifest.ReadUtf8(16384) | ConvertFrom-Json
    Require (Exact-Keys $approval @('schemaVersion','purpose','baselineCommit','node','artifacts','environment','codexSandboxUsersSid','review','build')) 'approval.schema' 'REVIEWED_SCHEMA'
    Require ($approval.schemaVersion -eq 2 -and $approval.purpose -ceq 'AVA76_LOCAL_STARTUP_ONLY' -and $approval.baselineCommit -ceq '626bf03d8785c986d76eb77942f1bba28dacaf2c') 'approval.scope' 'REVIEWED_SCHEMA'
    Require ((Exact-Keys $approval.node @('path','sha256','version')) -and (Exact-Keys $approval.artifacts @('supervisorSha256','observerSha256','observerAssemblySha256','childSha256')) -and (Exact-Keys $approval.environment @('windowsDirectory','temporaryDirectory')) -and (Exact-Keys $approval.review @('operator','approvedUtc')) -and (Exact-Keys $approval.build @('toolchainReference','sourceSha256'))) 'approval.fields' 'REVIEWED_SCHEMA'
    Require ($approval.codexSandboxUsersSid -ceq $ReviewedCodexSandboxUsersSid) 'approval.codexSid' 'EXTERNAL_REVIEWED_SID'
    Require ($approval.review.operator -is [string] -and $approval.review.operator.Length -gt 0 -and $approval.review.operator -notlike 'REPLACE_*' -and $approval.review.approvedUtc -match '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$') 'approval.reviewMetadata' 'METADATA_NOT_AUTHENTICATION'
    Require ($approval.build.toolchainReference -is [string] -and $approval.build.toolchainReference.Length -gt 0 -and $approval.build.toolchainReference -notlike 'REPLACE_*') 'approval.buildMetadata' 'METADATA_NOT_ATTESTATION'
    foreach ($digest in @($approval.node.sha256,$approval.artifacts.supervisorSha256,$approval.artifacts.observerSha256,$approval.artifacts.observerAssemblySha256,$approval.artifacts.childSha256,$approval.build.sourceSha256)) {
        Require ($digest -is [string] -and $digest -match '^[A-Fa-f0-9]{64}$') 'approval.digestFormat' 'REVIEWED_SCHEMA'
    }
    Require ($approval.artifacts.observerAssemblySha256 -ieq $binaryHash -and $approval.build.sourceSha256 -ieq $approval.artifacts.observerSha256) 'approval.binaryAndSourceReferences' 'EXTERNAL_REFERENCE_NOT_BUILD_PROOF'
    Require ($approval.node.version -is [string] -and $approval.node.version -match '^v\d+\.\d+\.\d+$') 'approval.versionFormat' 'REVIEWED_SCHEMA'
    Add-Check 'approval.independentAuthority' 'UNKNOWN' 'EXTERNAL_PRECONDITION' 'HUMAN_APPROVAL_AND_SOURCE_TO_BINARY_REVIEW_REQUIRED; METADATA_IS_NOT_AUTHENTICATION' $false
    $failureCode='ARTIFACT_INVALID'
    $node=$files.Pin($approval.node.path,$false)
    $supervisorFile=$files.Pin($PSCommandPath,$false)
    $observerFile=$files.Pin(($PSScriptRoot+'\WindowsObserver.cs'),$false)
    $child=$files.Pin(($PSScriptRoot+'\diagnostic-child.cjs'),$false)
    $cwd=$files.Pin($PSScriptRoot,$true)
    $windows=$files.Pin($approval.environment.windowsDirectory,$true)
    $temporary=$files.Pin($approval.environment.temporaryDirectory,$true)
    $repositoryRoot=[IO.Path]::GetDirectoryName([IO.Path]::GetDirectoryName([IO.Path]::GetDirectoryName($PSScriptRoot)))
    $repository=$files.Pin($repositoryRoot,$true)
    Require ([IO.Path]::GetFileName($node.OriginalPath) -ieq 'node.exe') 'node.filename' 'PATH_POLICY'
    Require ($windows.OriginalPath -ieq $ApprovedWindowsDirectory) 'environment.windowsReference' 'EXTERNAL_REFERENCE'
    $repoPrefix=$repository.NativePath.TrimEnd('\')+'\'; $tempPrefix=$temporary.NativePath.TrimEnd('\')+'\'
    Require (-not $tempPrefix.StartsWith($repoPrefix,[StringComparison]::OrdinalIgnoreCase) -and -not $repoPrefix.StartsWith($tempPrefix,[StringComparison]::OrdinalIgnoreCase)) 'environment.temporaryOutsideRepository' 'PINNED_NATIVE_PATHS'
    foreach ($entry in @(
        @{name='node';file=$node;hash=$approval.node.sha256},
        @{name='supervisor';file=$supervisorFile;hash=$approval.artifacts.supervisorSha256},
        @{name='observerSource';file=$observerFile;hash=$approval.artifacts.observerSha256},
        @{name='child';file=$child;hash=$approval.artifacts.childSha256}
    )) {
        $measured=$entry.file.Sha256()
        $entry['evidence']=[pscustomobject]@{name=$entry.name;path=$entry.file.OriginalPath;consumedPath=$entry.file.LaunchPath;identity=$entry.file.FileIdentity;referenceSha256=$entry.hash;beforeSha256=$measured;afterSha256=$null}
        $artifacts.Add($entry)
        $artifactEvidence.Add($entry.evidence)
        Require ($measured -ieq $entry.hash) ('hash.before:'+$entry.name) 'PINNED_FILE_HANDLE'
    }
    # Do not serialize file/handle objects into the public report.
    $report['acl']=@($files.Paths | ForEach-Object { $_.Acl })
    foreach ($path in $files.Paths) {
        if (-not $path.Acl.ReadSucceeded) { Add-Check 'acl.read' 'UNKNOWN' 'PINNED_HANDLE_DACL' 'UNAVAILABLE; NO_CHILD_LAUNCHED'; throw 'ACL_UNAVAILABLE' }
        Require (-not $path.Acl.NullDacl -and -not $path.Acl.CodexWriteAllow) 'acl.noObservedWriteExposure' 'PINNED_HANDLE_DACL'
    }
    Add-Check 'acl.effectiveAccess' 'UNKNOWN' 'LIMITATION' 'RAW_ACES_ONLY; GROUPS_DENIES_PRIVILEGES_NOT_FULLY_EVALUATED' $false
    Add-Check 'host.parentTrust' 'UNKNOWN' 'EXTERNAL_PRECONDITION' 'TRUSTED_OPERATOR_POWERSHELL_CLR_BINARY_DELIVERY_AND_STORAGE_REQUIRED' $false
    Add-Check 'runtime.nativeModulesAndPatches' 'UNKNOWN' 'LIMITATION' 'DLL_FILTER_DRIVER_AND_PATCH_ATTESTATION_NOT_IMPLEMENTED' $false
    Add-Check 'security.fullPrivilegesAndIsolation' 'UNKNOWN' 'LIMITATION' 'NO_RESTRICTED_TOKEN_OR_PROCESS_TREE_CONTAINMENT' $false
    Add-Check 'network.osBoundary' 'UNKNOWN' 'LIMITATION' 'LOCAL_NAMESPACE_CHECKS_ARE_NOT_OS_EGRESS_ENFORCEMENT_OR_STORAGE_HARDWARE_ATTESTATION' $false
    $environment=New-Object 'System.Collections.Generic.Dictionary[string,string]'
    $environment.Add('SystemRoot',$windows.LaunchPath); $environment.Add('WINDIR',$windows.LaunchPath)
    $environment.Add('TEMP',$temporary.LaunchPath); $environment.Add('TMP',$temporary.LaunchPath)
    $environment.Add('NODE_DISABLE_COMPILE_CACHE','1')
    foreach ($name in @('HOMEDRIVE','HOMEPATH','LOGONSERVER','PATH','SYSTEMDRIVE','USERDOMAIN','USERNAME','USERPROFILE')) { $environment.Add($name,'') }
    $report['environmentRequested']=$environment
    $report['observerAssemblySha256']=$binaryHash
    $report['approvedManifestSha256']=$ApprovedManifestSha256
    $failureCode='TRIAL_FAILED'
    foreach ($mode in @('NORMAL','DEADLINE')) {
        $files.Revalidate()
        $firstCheck=$checks.Count
        $bytes=New-Object byte[] 32; $rng=[Security.Cryptography.RandomNumberGenerator]::Create()
        try { $rng.GetBytes($bytes) } finally { $rng.Dispose() }
        $nonce=([BitConverter]::ToString($bytes)).Replace('-','')
        $trial=[Ava76Startup.Trial]::new()
        $row=[ordered]@{mode=$mode;pid=0;started=$false;controlReturned=$false}
        $trials.Add($row); $attempted++; $report.launchAttempted=$true
        try { [Ava76Startup.WindowsObserver]::Run($node.LaunchPath,$child.LaunchPath,$cwd.LaunchPath,$environment,$nonce,($mode -eq 'NORMAL'),$trial); $row.controlReturned=$true }
        finally {
            $row.pid=$trial.Child.Pid; $row.started=$trial.Started
            foreach ($field in @('Child','Supervisor','CreationAttempted','CreationUncertain','ElapsedMs','Exited','TimedOut','KillSucceeded','KillError','ExitCode','StartReturnedMs','DeadlineMs','WatchdogFiredMs','KillRequestedMs','ExitObservedMs','CleanupFailed','CleanupErrors','WatchdogJoined','WatchdogFailed','PipesCompleted','ReadersStopped','ControlFailed')) { $row[$field]=$trial.$field }
            if ($trial.Started) { $started++ }
        }
        if ($trial.CleanupFailed -or $trial.ControlFailed -or $trial.WatchdogFailed) {
            Add-Check ($mode+'.controlAndCleanup') 'FAIL' 'STRUCTURED_TRIAL_RESULT' 'FAILURE_RECORDED; NO_FURTHER_CHILD_ALLOWED'
        }
        if (-not $trial.Exited) { Add-Check ($mode+'.termination') 'UNKNOWN' 'WINDOWS_PROCESS_HANDLE' 'NOT_CONFIRMED; STOP_AND_INSPECT_RECORDED_PID'; break }
        Require (-not $trial.CreationUncertain -and -not $trial.ControlFailed -and -not $trial.CleanupFailed -and -not $trial.WatchdogFailed -and $trial.WatchdogJoined -and $trial.ReadersStopped -and $trial.PipesCompleted -and $trial.ElapsedMs -le 15000) ($mode+'.supervisionAndCleanup') 'SUPERVISOR_CLOCK_HANDLES_AND_CLEANUP'
        Require (-not $trial.Stdout.Overflow -and -not $trial.Stderr.Overflow -and -not $trial.Stdout.ReadFailed -and -not $trial.Stderr.ReadFailed -and $trial.Stderr.Bytes -eq 0) ($mode+'.boundedPipes') 'SINGLE_OWNER_PIPE_READ'
        Add-Check ($mode+'.termination') 'PASS' 'WINDOWS_PROCESS_HANDLE' 'DIRECT_CHILD_EXIT_CONFIRMED_ONLY'
        Check-Observation $trial $mode $node.NativePath
        if ($mode -eq 'DEADLINE') {
            Require ($trial.TimedOut -and $trial.KillSucceeded -and $trial.ExitCode -eq 124 -and $trial.Stdout.Bytes -eq 0) 'DEADLINE.externalKill' 'SUPERVISOR_WATCHDOG'
            Require ($trial.WatchdogFiredMs -ge 10000 -and $trial.KillRequestedMs -ge $trial.WatchdogFiredMs -and $trial.KillRequestedMs -le 10250 -and $trial.ExitObservedMs -ge $trial.KillRequestedMs -and $trial.ExitObservedMs -le ($trial.KillRequestedMs+2000)) 'DEADLINE.timing' 'MONOTONIC_EVENT_TIMESTAMPS_FIXED_TOLERANCES'
        } else {
            Require (-not $trial.TimedOut -and $trial.ExitCode -eq 0 -and $trial.ExitObservedMs -ge 0 -and $trial.ExitObservedMs -lt 10000) 'NORMAL.exit' 'WINDOWS_PROCESS_HANDLE_AND_MONOTONIC_CLOCK'
            $reply=$trial.Stdout.Text | ConvertFrom-Json
            Require (Exact-Keys $reply @('schemaVersion','nonce','pid','ppid','execPath','version','argv','execArgv','cwd','knownNamesOnly','environment','mainModuleOnly')) 'NORMAL.replyShape' 'BOUNDED_CHILD_REPORT'
            Require ($reply.schemaVersion -eq 1 -and $reply.nonce -ceq $nonce -and $reply.pid -eq $trial.Child.Pid -and $reply.ppid -eq $PID) 'NORMAL.correlation' 'CHILD_REPORT_COMPARED_TO_WINDOWS'
            Require ($node.MatchesClaim($reply.execPath) -and $cwd.MatchesClaim($reply.cwd) -and $reply.version -ceq $approval.node.version) 'NORMAL.runtimeClaims' 'CHILD_REPORT_NOT_ATTESTATION'
            Require (@($reply.argv).Count -eq 2 -and $node.MatchesClaim($reply.argv[0]) -and $child.MatchesClaim($reply.argv[1]) -and (@($reply.execArgv) -join '|') -ceq '--no-addons|--no-global-search-paths') 'NORMAL.argvClaims' 'CHILD_REPORT_NOT_ATTESTATION'
            Require ($reply.knownNamesOnly -eq $true -and (Exact-Keys $reply.environment @($environment.Keys))) 'NORMAL.environmentNames' 'CHILD_REPORT_NOT_ATTESTATION'
            foreach ($name in $environment.Keys) { Require ($reply.environment.$name -ceq $environment[$name]) ('NORMAL.environmentValue:'+$name) 'CHILD_REPORT_NOT_ATTESTATION' }
            Require ($reply.mainModuleOnly -eq $true) 'NORMAL.jsModuleClaims' 'CHILD_REPORT_NOT_ATTESTATION'
        }
        $modeChecks=@($checks | Select-Object -Skip $firstCheck | Where-Object { $_.requiredForProcedure })
        if (@($modeChecks | Where-Object { $_.state -ne 'PASS' }).Count -gt 0) { break }
        $verified++
    }
    $files.Revalidate()
    foreach ($entry in $artifacts) {
        $entry.evidence.afterSha256=$entry.file.Sha256()
        Require ($entry.evidence.afterSha256 -ieq $entry.hash) ('hash.after:'+$entry.name) 'SAME_PINNED_HANDLE'
    }
    Require ($manifest.Sha256() -ieq $ApprovedManifestSha256) 'approval.afterHash' 'SAME_PINNED_HANDLE'
} catch {
    Add-Check 'procedure.error' 'FAIL' 'SUPERVISOR' $failureCode
} finally {
    if ($null -ne $files) {
        try {
            $files.Dispose()
            $report['fileCleanupErrors']=@($files.CleanupErrors)
            Require (-not $files.CleanupFailed) 'cleanup.pinnedHandles' 'INDIVIDUAL_NATIVE_CLOSE_RESULTS'
        } catch { Add-Check 'cleanup.pinnedHandles' 'FAIL' 'SUPERVISOR' 'CLOSE_UNCONFIRMED' }
    }
    $report['attemptedCalls']=$attempted; $report['startedProcesses']=$started; $report['verifiedTrials']=$verified
    $required=@($checks | Where-Object { $_.requiredForProcedure } | ForEach-Object { $_.state })
    if ($required -contains 'FAIL') { $complete='FAIL' }
    elseif ($required -contains 'UNKNOWN' -or $verified -ne 2) { $complete='UNKNOWN' }
    else { $complete='PASS' }
    Add-Check 'procedure.complete' $complete 'REQUIRED_LOCAL_CHECKS_AFTER_CLEANUP' 'ATTEMPTS_ARE_NOT_VERIFICATION; NO_HOST_OR_OPERATIONAL_AUTHORITY'
    $states=@($checks | ForEach-Object { $_.state })
    if ($states -contains 'FAIL') { $report['overall']='FAIL'; $diagnosticExit=1 }
    elseif ($states -contains 'UNKNOWN') { $report['overall']='UNKNOWN'; $diagnosticExit=2 }
    else { $report['overall']='PASS'; $diagnosticExit=0 }
    $report | ConvertTo-Json -Depth 12
}
exit $diagnosticExit
