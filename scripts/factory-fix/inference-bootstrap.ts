import { spawnSync } from 'node:child_process';
import { createHash, randomBytes } from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { allocateSyntheticExecutionWorkspace, syntheticWorkspaceRepository, revokeSyntheticExecutionWorkspace } from './synthetic-workspace';
import { normalizeFixerData, decodeFixerJson, serializeFixerData } from './fixer-json';
import { inferenceRecord } from './inference-data';
import { inferenceFail, InferenceError } from './inference-contracts';

export const BOOTSTRAP_POLICY = Object.freeze({ version: '9g-laboratory-only-v1', runtimeVersion: 'v22.13.1',
  argv: Object.freeze(['--preserve-symlinks', '--preserve-symlinks-main', '--no-addons']),
  environment: Object.freeze(['SystemRoot', 'WINDIR', 'TEMP', 'TMP', 'NODE_DISABLE_COMPILE_CACHE']),
  // Observed Windows environment additions: explicitly empty, never inherited.
  // Child-side names AND digest verification reject any other host injection.
  emptyEnvironment: Object.freeze(['HOMEDRIVE', 'HOMEPATH', 'LOGONSERVER', 'PATH', 'SYSTEMDRIVE', 'USERDOMAIN', 'USERNAME', 'USERPROFILE']),
  prohibited: Object.freeze(['NODE_OPTIONS', 'NODE_TLS_REJECT_UNAUTHORIZED', 'NODE_EXTRA_CA_CERTS', 'NODE_USE_SYSTEM_CA',
    'NODE_DEBUG', 'NODE_DEBUG_NATIVE', 'NODE_V8_COVERAGE', 'NODE_REDIRECT_WARNINGS', 'NODE_PATH', 'NODE_ICU_DATA',
    'OPENSSL_CONF', 'OPENSSL_MODULES', 'SSLKEYLOGFILE', 'SSL_CERT_FILE', 'SSL_CERT_DIR', 'HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY', 'NO_PROXY']),
  shell: false, maxOutputBytes: 8192, timeoutMs: 10000, operational: false, capabilityIssuer: false,
  runtimeHashTrust: 'SELF_OBSERVED_NOT_APPROVED', evidenceScope: 'COMPLETED_PROBE_NOT_RUNNING_HOST',
  executableOrigin: 'PARENT_PROCESS_EXEC_PATH_NOT_APPROVED', expectedRuntimeManifest: 'ABSENT',
  hashExecutionRace: 'NOT_ELIMINATED_BLOCKS_OPERATIONAL_USE', abort: 'SYNCHRONOUS_PROBE_TIMEOUT_ONLY',
  parentTrust: 'NOT_ATTESTED', nativeClientLaunched: false, workerCodeApproved: false,
  childTreeTermination: 'NOT_IMPLEMENTED_FIXED_PROBE_HAS_NO_CHILDREN' } as const);
const fixedExecutable = fs.realpathSync.native(process.execPath);
const digest = (text: string | Buffer): string => createHash('sha256').update(text).digest('hex');
interface FileObservation { physical: string; identity: string; digest: string }
function physicalFile(stat: fs.BigIntStats): string {
  if (!stat.isFile() || stat.isSymbolicLink() || stat.nlink !== 1n || stat.ino === 0n) inferenceFail('BOOTSTRAP_FAILED');
  return JSON.stringify([String(stat.dev), String(stat.ino), String(stat.nlink)]);
}
function fileIdentity(stat: fs.BigIntStats): string {
  return JSON.stringify([physicalFile(stat), String(stat.mode), String(stat.size), String(stat.mtimeNs), String(stat.ctimeNs)]);
}
// Descriptor + named identity checks detect observed replacement/hardlinks. They
// do NOT make CreateProcess execute an approved handle or close the Windows race.
function observeFile(file: string, maxBytes: number): FileObservation {
  const initial = fs.lstatSync(file, { bigint: true }), identity = fileIdentity(initial);
  if (initial.size < 1n || initial.size > BigInt(maxBytes) || fs.realpathSync.native(file) !== file) inferenceFail('BOOTSTRAP_FAILED');
  const fd = fs.openSync(file, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW ?? 0) | (fs.constants.O_NONBLOCK ?? 0));
  try {
    if (fileIdentity(fs.fstatSync(fd, { bigint: true })) !== identity) inferenceFail('BOOTSTRAP_FAILED');
    // One byte beyond the observed size detects growth without an unbounded read.
    const bytes = Buffer.alloc(Number(initial.size) + 1); let length = 0;
    while (length < bytes.length) {
      const count = fs.readSync(fd, bytes, length, bytes.length - length, null);
      if (!count) break; length += count;
    }
    if (length !== Number(initial.size) || fileIdentity(fs.fstatSync(fd, { bigint: true })) !== identity
      || fileIdentity(fs.lstatSync(file, { bigint: true })) !== identity || fs.realpathSync.native(file) !== file) inferenceFail('BOOTSTRAP_FAILED');
    return { physical: physicalFile(initial), identity, digest: digest(bytes.subarray(0, length)) };
  } finally { fs.closeSync(fd); }
}
function unchanged(file: string, expected: FileObservation, maxBytes: number): void {
  const actual = observeFile(file, maxBytes);
  if (actual.identity !== expected.identity || actual.digest !== expected.digest) inferenceFail('BOOTSTRAP_FAILED');
}
// Pure inspection of supplied synthetic/host data, NEVER a permission or a launch
// API. Unknown variables are dropped, not blacklist-filtered. Casing is closed on Windows.
export function buildMinimalBootstrapEnvironment(source: unknown): Readonly<Record<string, string>> {
  const data = normalizeFixerData(source);
  if (!data || typeof data !== 'object' || Array.isArray(data)) inferenceFail('BOOTSTRAP_INVALID');
  const env: Record<string, string> = Object.create(null), seen = new Set<string>();
  for (const [name, value] of Object.entries(data)) {
    const key = name.toUpperCase();
    if (seen.has(key) || typeof value !== 'string' || value.length > 8192 || /[\u0000-\u001f\u007f]/.test(value)) inferenceFail('BOOTSTRAP_INVALID');
    seen.add(key);
    const allowed = BOOTSTRAP_POLICY.environment.find(k => k.toUpperCase() === key);
    if (allowed) env[allowed] = value;
  }
  // Compile cache disabling is fixed host policy, not caller configuration.
  env['NODE_DISABLE_COMPILE_CACHE'] = '1';
  for (const name of BOOTSTRAP_POLICY.emptyEnvironment) env[name] = '';
  return Object.freeze(env);
}
declare const receiptBrand: unique symbol;
export interface OfflineBootstrapReceipt { readonly [receiptBrand]: true }
interface Evidence { runtimeVersion: string; runtimeDigest: string; fixtureDigest: string;
  childPid: number; sessionBinding: 'PRIVATE_CHALLENGE_AND_CHILD_PID';
  environmentNames: readonly string[]; argv: readonly string[]; preloadExecuted: false;
  environmentMatchesPolicy: true; laboratoryOnly: true; operationalWorkerStarted: false; parentTrust: 'NOT_ATTESTED' }
const receipts = new WeakMap<OfflineBootstrapReceipt, Readonly<Evidence>>();
export function inspectOfflineBootstrapReceipt(receipt: OfflineBootstrapReceipt): Readonly<Evidence> {
  const evidence = receipts.get(receipt); if (!evidence) inferenceFail('BOOTSTRAP_INVALID'); return evidence;
}

// Sole launch path: fixed synthetic source, freshly allocated TEMP, no caller
// executable/path/env/argv/stdin/credential and no Factory/native/model imports.
// An operational bootstrap remains unimplemented. This probe does not attest the
// trustworthiness of a parent that may already have executed a preload.
export function runOfflineBootstrapLab(): OfflineBootstrapReceipt {
  if (arguments.length) inferenceFail('BOOTSTRAP_INVALID');
  if (process.version !== BOOTSTRAP_POLICY.runtimeVersion) inferenceFail('BOOTSTRAP_RUNTIME_UNVERIFIED');
  const workspace = allocateSyntheticExecutionWorkspace();
  const owned = new Map<string, string>();
  try {
    syntheticWorkspaceRepository(workspace);
    const entry = path.join(workspace.repoRoot, 'bootstrap-probe.cjs'), canary = path.join(workspace.repoRoot, 'preload-canary.cjs');
    const marker = path.join(workspace.repoRoot, 'preload-executed');
    const names = [...BOOTSTRAP_POLICY.environment, ...BOOTSTRAP_POLICY.emptyEnvironment].sort();
    const session = randomBytes(32).toString('hex'); // Correlation only, never an operational grant.
    // Only inspect values of these nonsecret host-policy names; unknown names are
    // reported for rejection without reading their values (possibly credentials).
    const source = `"use strict";const names=${JSON.stringify(names)};process.stdout.write(JSON.stringify({session:${JSON.stringify(session)},pid:process.pid,version:process.version,execPath:process.execPath,argv:process.execArgv,envNames:Object.keys(process.env).sort(),envDigest:require('node:crypto').createHash('sha256').update(JSON.stringify(names.map(k=>[k,process.env[k]??null]))).digest('hex'),cwd:process.cwd()})+'\\n');`;
    const writeFixture = (file: string, text: string): FileObservation => {
      syntheticWorkspaceRepository(workspace);
      const fd = fs.openSync(file, 'wx', 0o600);
      let identity: string;
      try {
        const created = physicalFile(fs.fstatSync(fd, { bigint: true })); owned.set(file, created);
        fs.writeFileSync(fd, text, 'utf8'); identity = fileIdentity(fs.fstatSync(fd, { bigint: true }));
      } finally { fs.closeSync(fd); }
      const observed = observeFile(file, BOOTSTRAP_POLICY.maxOutputBytes);
      if (observed.identity !== identity || observed.digest !== digest(text)) inferenceFail('BOOTSTRAP_FAILED');
      return observed;
    };
    const entryIdentity = writeFixture(entry, source);
    const canaryIdentity = writeFixture(canary, `require('node:fs').writeFileSync(${JSON.stringify(marker)},'UNEXPECTED_PRELOAD');`);
    const trusted = { SystemRoot: process.env['SystemRoot'] ?? '', WINDIR: process.env['WINDIR'] ?? '',
      TEMP: workspace.repoRoot, TMP: workspace.repoRoot };
    const contaminated = { ...trusted, ...Object.fromEntries(BOOTSTRAP_POLICY.prohibited.map(k => [k, 'SYNTHETIC_FORBIDDEN_VALUE'])),
      NODE_OPTIONS: '--require ' + JSON.stringify(canary) };
    const env = buildMinimalBootstrapEnvironment(contaminated), before = observeFile(fixedExecutable, 256 * 1024 * 1024);
    syntheticWorkspaceRepository(workspace);
    unchanged(entry, entryIdentity, BOOTSTRAP_POLICY.maxOutputBytes); unchanged(canary, canaryIdentity, BOOTSTRAP_POLICY.maxOutputBytes);
    const child = spawnSync(fixedExecutable, [...BOOTSTRAP_POLICY.argv, entry], {
      // Node 22.13.1 copies parent NODE_V8_COVERAGE even with options.env.
      // An own undefined property suppresses that copy and is omitted from envPairs.
      cwd: workspace.repoRoot, env: { ...env, NODE_V8_COVERAGE: undefined }, shell: false, windowsHide: true, input: '',
      encoding: 'utf8', killSignal: 'SIGTERM', timeout: BOOTSTRAP_POLICY.timeoutMs, maxBuffer: BOOTSTRAP_POLICY.maxOutputBytes });
    if (child.error || child.status !== 0 || child.signal !== null || child.stderr || fs.existsSync(marker)
      || !Number.isSafeInteger(child.pid) || child.pid < 1 || typeof child.stdout !== 'string'
      || Buffer.byteLength(child.stdout, 'utf8') > BOOTSTRAP_POLICY.maxOutputBytes) inferenceFail('BOOTSTRAP_FAILED');
    syntheticWorkspaceRepository(workspace);
    unchanged(fixedExecutable, before, 256 * 1024 * 1024);
    unchanged(entry, entryIdentity, BOOTSTRAP_POLICY.maxOutputBytes); unchanged(canary, canaryIdentity, BOOTSTRAP_POLICY.maxOutputBytes);
    const d = inferenceRecord(decodeFixerJson(child.stdout), ['session', 'pid', 'version', 'execPath', 'argv', 'envNames', 'envDigest', 'cwd']);
    if (d['session'] !== session || d['pid'] !== child.pid || d['version'] !== BOOTSTRAP_POLICY.runtimeVersion || d['execPath'] !== fixedExecutable || d['cwd'] !== workspace.repoRoot
      || serializeFixerData(d['argv']) !== serializeFixerData(BOOTSTRAP_POLICY.argv)
      || serializeFixerData(d['envNames']) !== serializeFixerData(Object.keys(env).sort())
      || d['envDigest'] !== digest(JSON.stringify(names.map(k => [k, env[k]])))) inferenceFail('BOOTSTRAP_FAILED');
    const receipt = Object.freeze({}) as OfflineBootstrapReceipt;
    receipts.set(receipt, Object.freeze({ runtimeVersion: BOOTSTRAP_POLICY.runtimeVersion, runtimeDigest: before.digest,
      childPid: child.pid, sessionBinding: 'PRIVATE_CHALLENGE_AND_CHILD_PID',
      fixtureDigest: digest(source), environmentNames: Object.freeze(Object.keys(env).sort()), argv: BOOTSTRAP_POLICY.argv,
      preloadExecuted: false, environmentMatchesPolicy: true, laboratoryOnly: true, operationalWorkerStarted: false, parentTrust: 'NOT_ATTESTED' }));
    return receipt;
  } catch (error) {
    if (error instanceof InferenceError) throw error;
    return inferenceFail('BOOTSTRAP_FAILED');
  } finally {
    try {
      syntheticWorkspaceRepository(workspace);
      // Never recursively remove content. A replaced file or uncertain directory
      // remains for host inspection rather than being adopted during cleanup.
      for (const name of ['bootstrap-probe.cjs', 'preload-canary.cjs', 'preload-executed']) {
        syntheticWorkspaceRepository(workspace);
        const file = path.join(workspace.repoRoot, name);
        let stat: fs.BigIntStats;
        try { stat = fs.lstatSync(file, { bigint: true }); }
        catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') continue; throw error; }
        const physical = physicalFile(stat);
        if (name !== 'preload-executed' && physical !== owned.get(file)) inferenceFail('BOOTSTRAP_FAILED');
        fs.unlinkSync(file);
      }
      syntheticWorkspaceRepository(workspace); fs.rmdirSync(workspace.repoRoot); fs.rmdirSync(workspace.root);
    } catch { inferenceFail('BOOTSTRAP_FAILED'); }
    finally { revokeSyntheticExecutionWorkspace(workspace); }
  }
}
