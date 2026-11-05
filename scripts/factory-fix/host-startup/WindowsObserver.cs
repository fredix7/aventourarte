// Source for a separately compiled, externally approved helper. Never compiled by the trial.
// No inference/Factory imports. Native calls validate/read pinned local artifacts,
// query process metadata/pipes or terminate the exact child. No SID account lookup.
using System;
using System.IO;
using System.Text;
using System.Diagnostics;
using System.Threading;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Security.Principal;
using System.Security.AccessControl;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using Microsoft.Win32.SafeHandles;

namespace Ava76Startup {
    public sealed class SecurityObservation {
        public string UserSid, IntegritySid;
        public int UserError, IntegrityError, ElevationError;
        public bool Elevated;
    }
    public sealed class ProcessObservation {
        public int Pid, ParentPid, ImageError, ParentError;
        public string ImagePath;
        public SecurityObservation Security;
    }
    public sealed class PipeObservation {
        public string Text = "";
        public int Bytes;
        public bool Overflow, ReadFailed;
    }
    public sealed class Trial {
        public ProcessObservation Child = new ProcessObservation { ImageError=-1, ParentError=-1,
            Security=new SecurityObservation { UserError=-1, IntegrityError=-1, ElevationError=-1 } }, Supervisor;
        public PipeObservation Stdout = new PipeObservation(), Stderr = new PipeObservation();
        public bool CreationAttempted, CreationUncertain, Started, Exited, TimedOut, KillSucceeded, WatchdogJoined, PipesCompleted, ControlFailed;
        public bool CleanupFailed, WatchdogFailed, ReadersStopped;
        public readonly List<string> CleanupErrors = new List<string>();
        public int? ExitCode;
        public int KillError;
        public long ElapsedMs, DeadlineMs=10000, WatchdogFiredMs=-1, KillRequestedMs=-1,
            ExitObservedMs=-1, StartReturnedMs=-1;
    }
    // Native owners use SafeHandle. No worker receives a borrowed process IntPtr.
    public sealed class OwnedHandle : SafeHandleZeroOrMinusOneIsInvalid {
        public int CloseError;
        public OwnedHandle() : base(true) { }
        public OwnedHandle(IntPtr value) : base(true) { SetHandle(value); }
        [DllImport("kernel32.dll", SetLastError=true)] static extern bool CloseHandle(IntPtr handle);
        protected override bool ReleaseHandle() {
            bool closed = CloseHandle(handle);
            if (!closed) { CloseError = Marshal.GetLastWin32Error(); if (CloseError == 0) CloseError = -1; }
            return closed;
        }
    }
    public sealed class AclObservation {
        public string Path, OwnerSid;
        public bool ReadSucceeded, NullDacl, CodexWriteAllow;
        public readonly List<string> Rules = new List<string>();
    }
    public sealed class PinnedPath {
        internal OwnedHandle Handle;
        public string OriginalPath, LaunchPath, NativePath, Device, FileIdentity;
        public bool Directory;
        public AclObservation Acl;
        public string Sha256() { if (Directory) throw new InvalidOperationException("FILE_REQUIRED"); return LocalFiles.Hash(Handle); }
        public string ReadUtf8(int limit) { if (Directory) throw new InvalidOperationException("FILE_REQUIRED"); return LocalFiles.ReadText(Handle, limit); }
        public bool MatchesClaim(string value) {
            return String.Equals(value, LaunchPath.TrimEnd('\\'), StringComparison.OrdinalIgnoreCase)
                || String.Equals(value, OriginalPath.TrimEnd('\\'), StringComparison.OrdinalIgnoreCase);
        }
    }
    // Deliberately narrow: drive letters mapped directly to a local NT disk volume,
    // no SUBST, redirector, mount point, reparse, offline/recall file or hardlink.
    // This class does NOT attest storage hardware, filter drivers, OS or egress.
    public sealed class LocalFiles : IDisposable {
        readonly List<PinnedPath> paths = new List<PinnedPath>();
        readonly Dictionary<string,PinnedPath> pinned = new Dictionary<string,PinnedPath>(StringComparer.OrdinalIgnoreCase);
        readonly string codexSid;
        bool disposed;
        public bool CleanupFailed;
        public readonly List<string> CleanupErrors = new List<string>();
        public PinnedPath[] Paths { get { return paths.ToArray(); } }
        public LocalFiles(string reviewedCodexSid) { codexSid = new SecurityIdentifier(reviewedCodexSid).Value; }
        [StructLayout(LayoutKind.Sequential)] struct Info {
            public uint Attributes, CLo, CHi, ALo, AHi, WLo, WHi, Serial, SizeHi, SizeLo, Links, IndexHi, IndexLo;
        }
        [StructLayout(LayoutKind.Sequential)] struct IoStatus { public IntPtr Status, Information; }
        [StructLayout(LayoutKind.Sequential)] struct DeviceInfo { public uint Type, Characteristics; }
        [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)] static extern uint QueryDosDevice(string name, [Out] char[] result, int length);
        [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)] static extern OwnedHandle CreateFile(string path, uint access, uint share, IntPtr security, uint mode, uint flags, IntPtr template);
        [DllImport("kernel32.dll", SetLastError=true)] static extern bool GetFileInformationByHandle(OwnedHandle handle, out Info info);
        [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)] static extern uint GetFinalPathNameByHandle(OwnedHandle handle, StringBuilder text, uint length, uint flags);
        [DllImport("ntdll.dll")] static extern int NtQueryVolumeInformationFile(OwnedHandle handle, out IoStatus status, out DeviceInfo info, uint size, int kind);
        [DllImport("advapi32.dll")] static extern uint GetSecurityInfo(OwnedHandle handle, int kind, uint requested, out IntPtr owner, out IntPtr group, out IntPtr dacl, out IntPtr sacl, out IntPtr descriptor);
        [DllImport("advapi32.dll")] static extern uint GetSecurityDescriptorLength(IntPtr descriptor);
        [DllImport("kernel32.dll")] static extern IntPtr LocalFree(IntPtr pointer);
        [DllImport("kernel32.dll", SetLastError=true)] static extern bool SetFilePointerEx(OwnedHandle handle, long distance, out long position, uint origin);
        [DllImport("kernel32.dll", SetLastError=true)] static extern bool ReadFile(OwnedHandle handle, [Out] byte[] bytes, uint count, out uint read, IntPtr overlapped);
        static void Need(bool condition) { if (!condition) throw new InvalidOperationException("LOCAL_ARTIFACT_UNVERIFIED"); }
        static string Mapping(string drive) {
            var data = new char[32768]; uint size = QueryDosDevice(drive, data, data.Length); Need(size > 0 && size < data.Length);
            string[] names = new string(data, 0, (int)size).TrimEnd('\0').Split('\0');
            Need(names.Length == 1 && Regex.IsMatch(names[0], @"^\\Device\\HarddiskVolume[0-9]+$"));
            return names[0];
        }
        static string Canonical(string value, bool directory) {
            Need(value != null && value.Length >= 3 && value.Length <= 240 && Regex.IsMatch(value, @"^[A-Za-z]:\\"));
            Need(!value.EndsWith(@"\\", StringComparison.Ordinal));
            string normalized = directory ? value.TrimEnd('\\') : value;
            if (normalized.Length == 2 && directory) return normalized + "\\";
            foreach (string component in normalized.Substring(3).Split('\\')) {
                Need(component.Length > 0 && component != "." && component != ".." && component.TrimEnd(' ','.') == component);
                Need(!Regex.IsMatch(component, "[\\x00-\\x1f<>:\"/|?*]") && !Regex.IsMatch(component, @"^(CON|PRN|AUX|NUL|CONIN\$|CONOUT\$|COM[1-9]|LPT[1-9])($|\.)", RegexOptions.IgnoreCase));
            }
            return normalized;
        }
        static string Final(OwnedHandle handle, uint flags) {
            var text = new StringBuilder(4096); uint size = GetFinalPathNameByHandle(handle, text, (uint)text.Capacity, flags);
            Need(size > 0 && size < text.Capacity); return text.ToString();
        }
        static AclObservation Acl(OwnedHandle handle, string path, string sid) {
            var result = new AclObservation { Path=path }; IntPtr owner, group, dacl, sacl, descriptor;
            uint error = GetSecurityInfo(handle, 1, 5, out owner, out group, out dacl, out sacl, out descriptor);
            if (error != 0) return result;
            try {
                uint size = GetSecurityDescriptorLength(descriptor); Need(size > 0 && size <= 65536);
                var bytes = new byte[size]; Marshal.Copy(descriptor, bytes, 0, (int)size);
                var sd = new RawSecurityDescriptor(bytes, 0); result.OwnerSid = sd.Owner == null ? null : sd.Owner.Value;
                result.NullDacl = sd.DiscretionaryAcl == null;
                if (sd.DiscretionaryAcl != null) foreach (GenericAce ace in sd.DiscretionaryAcl) {
                    var known = ace as KnownAce; if (known == null) throw new InvalidOperationException("ACL_UNKNOWN_ACE");
                    string account = known.SecurityIdentifier.Value;
                    result.Rules.Add(account + ":" + ace.AceType + ":" + ((uint)known.AccessMask).ToString("X8") + ":" + ace.AceFlags);
                    // Includes generic write/all and write/delete/owner/DACL rights.
                    if (account == sid && ace.AceType.ToString().StartsWith("AccessAllowed", StringComparison.Ordinal)
                        && (((uint)known.AccessMask & 0x500D0156U) != 0)) result.CodexWriteAllow = true;
                }
                result.ReadSucceeded = result.OwnerSid != null;
            } catch { result.ReadSucceeded = false; }
            finally { if (LocalFree(descriptor) != IntPtr.Zero) result.ReadSucceeded = false; }
            return result;
        }
        PinnedPath OpenComponent(string original, string native, string device, bool directory) {
            PinnedPath prior; if (pinned.TryGetValue(native, out prior)) { Need(prior.Directory == directory); return prior; }
            // OPEN_EXISTING, OPEN_REPARSE_POINT, BACKUP_SEMANTICS; never create/write.
            // Retain every ancestor without sharing write/delete until the session ends.
            OwnedHandle handle = CreateFile(@"\\?\GLOBALROOT" + native, directory ? 0x20080U : 0x80000000U, 1, IntPtr.Zero, 3, 0x02200000, IntPtr.Zero);
            if (handle == null || handle.IsInvalid) { if (handle != null) handle.Dispose(); throw new InvalidOperationException("LOCAL_OPEN_FAILED"); }
            var item = new PinnedPath { Handle=handle, OriginalPath=original, NativePath=native, Device=device, Directory=directory };
            try { paths.Add(item); } catch { handle.Dispose(); throw; }
            Info info; Need(GetFileInformationByHandle(handle, out info));
            Need((info.Attributes & (0x400U | 0x1000U | 0x40000U | 0x400000U)) == 0); // reparse/offline/recall
            Need(((info.Attributes & 0x10U) != 0) == directory);
            if (!directory) Need(info.Links == 1 && info.SizeHi == 0 && info.SizeLo <= 536870912U);
            IoStatus status; DeviceInfo volume;
            Need(NtQueryVolumeInformationFile(handle, out status, out volume, 8, 4) == 0 && volume.Type == 7 && (volume.Characteristics & 0x10U) == 0);
            Need(String.Equals(Final(handle, 2).TrimEnd('\\'), native.TrimEnd('\\'), StringComparison.OrdinalIgnoreCase));
            item.LaunchPath = Final(handle, 1); // volume GUID spelling, independent of DOS drive remapping
            Need(Regex.IsMatch(item.LaunchPath, @"^\\\\\?\\Volume\{[0-9a-fA-F-]{36}\}\\"));
            item.FileIdentity = info.Serial.ToString("X8") + ":" + info.IndexHi.ToString("X8") + info.IndexLo.ToString("X8");
            item.Acl = Acl(handle, original, codexSid); pinned.Add(native, item); return item;
        }
        public PinnedPath Pin(string value, bool directory) {
            Need(!disposed); string path = Canonical(value, directory), drive = path.Substring(0,2), device = Mapping(drive);
            PinnedPath item = OpenComponent(drive + "\\", device + "\\", device, true);
            string relative = path.Length > 3 ? path.Substring(3) : "";
            if (relative.Length > 0) {
                string original = drive + "\\", native = device + "\\"; string[] parts = relative.Split('\\');
                for (int i=0; i<parts.Length; i++) {
                    original += parts[i]; native += parts[i]; bool isDirectory = i < parts.Length-1 || directory;
                    item = OpenComponent(original, native, device, isDirectory); original += "\\"; native += "\\";
                }
            } else Need(directory);
            Need(Mapping(drive) == device); return item;
        }
        public void Revalidate() {
            foreach (PinnedPath item in paths) {
                Need(Mapping(item.OriginalPath.Substring(0,2)) == item.Device);
                Need(String.Equals(Final(item.Handle, 2).TrimEnd('\\'), item.NativePath.TrimEnd('\\'), StringComparison.OrdinalIgnoreCase));
                Need(String.Equals(Final(item.Handle, 1), item.LaunchPath, StringComparison.OrdinalIgnoreCase));
                Info info; Need(GetFileInformationByHandle(item.Handle, out info));
                Need((info.Attributes & (0x400U|0x1000U|0x40000U|0x400000U)) == 0 && (item.Directory || info.Links == 1));
            }
        }
        static void Rewind(OwnedHandle handle) { long position; Need(SetFilePointerEx(handle, 0, out position, 0) && position == 0); }
        internal static string Hash(OwnedHandle handle) {
            Rewind(handle);
            using (var sha = SHA256.Create()) {
                var bytes = new byte[65536]; uint read; long total=0;
                do {
                    Need(ReadFile(handle, bytes, (uint)bytes.Length, out read, IntPtr.Zero));
                    total += read; Need(total <= 536870912);
                    if (read > 0) sha.TransformBlock(bytes, 0, (int)read, bytes, 0);
                } while (read > 0);
                sha.TransformFinalBlock(new byte[0], 0, 0); return BitConverter.ToString(sha.Hash).Replace("-", "");
            }
        }
        internal static string ReadText(OwnedHandle handle, int limit) {
            Need(limit > 0 && limit <= 16384); Rewind(handle); var bytes = new byte[limit+1]; uint read;
            Need(ReadFile(handle, bytes, (uint)bytes.Length, out read, IntPtr.Zero) && read <= limit);
            return new UTF8Encoding(false, true).GetString(bytes, 0, (int)read).TrimStart('\uFEFF');
        }
        public void Dispose() {
            if (disposed) return; disposed = true;
            for (int i=paths.Count-1; i>=0; i--) {
                try { paths[i].Handle.Dispose(); if (!paths[i].Handle.IsClosed || paths[i].Handle.CloseError != 0) throw new InvalidOperationException(); }
                catch { CleanupFailed = true; CleanupErrors.Add("PINNED_HANDLE_CLOSE_UNCONFIRMED:" + i); }
            }
        }
    }
    public static class WindowsObserver {
        static int LastError() { int error = Marshal.GetLastWin32Error(); return error == 0 ? -1 : error; }
        [DllImport("kernel32.dll", SetLastError=true)] static extern bool TerminateProcess(OwnedHandle h, uint code);
        [DllImport("kernel32.dll", SetLastError=true)] static extern uint WaitForSingleObject(OwnedHandle h, uint ms);
        [DllImport("kernel32.dll")] static extern IntPtr GetCurrentProcess();
        [DllImport("kernel32.dll", SetLastError=true)] static extern bool DuplicateHandle(IntPtr sourceProcess, IntPtr source, IntPtr targetProcess, out OwnedHandle target, uint access, bool inherit, uint options);
        [DllImport("kernel32.dll", SetLastError=true)] static extern bool PeekNamedPipe(SafeFileHandle pipe, IntPtr buffer, uint size, IntPtr read, out uint available, IntPtr remaining);
        [DllImport("kernel32.dll", SetLastError=true)] static extern bool ReadFile(SafeFileHandle pipe, [Out] byte[] bytes, uint count, out uint read, IntPtr overlapped);
        [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)]
        static extern bool QueryFullProcessImageName(IntPtr h, uint flags, StringBuilder text, ref int size);
        [DllImport("kernel32.dll", SetLastError=true)] static extern OwnedHandle CreateToolhelp32Snapshot(uint flags, uint pid);
        [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)] struct Entry {
            public uint size, usage, pid; public UIntPtr heap;
            public uint module, threads, parent; public int priority;
            public uint flags; [MarshalAs(UnmanagedType.ByValTStr, SizeConst=260)] public string exe;
        }
        [DllImport("kernel32.dll", EntryPoint="Process32FirstW", CharSet=CharSet.Unicode, ExactSpelling=true, SetLastError=true)]
        static extern bool First(OwnedHandle h, ref Entry entry);
        [DllImport("kernel32.dll", EntryPoint="Process32NextW", CharSet=CharSet.Unicode, ExactSpelling=true, SetLastError=true)]
        static extern bool Next(OwnedHandle h, ref Entry entry);
        [DllImport("advapi32.dll", SetLastError=true)] static extern bool OpenProcessToken(IntPtr h, uint access, out OwnedHandle token);
        [DllImport("advapi32.dll", SetLastError=true)]
        static extern bool GetTokenInformation(OwnedHandle token, int kind, IntPtr data, int size, out int required);

        static IntPtr TokenData(OwnedHandle token, int kind, out int error) {
            int size; error = 0; GetTokenInformation(token, kind, IntPtr.Zero, 0, out size);
            if (size < 1 || size > 65536) { error = LastError(); return IntPtr.Zero; }
            IntPtr data = Marshal.AllocHGlobal(size);
            if (GetTokenInformation(token, kind, data, size, out size)) return data;
            error = LastError(); Marshal.FreeHGlobal(data); return IntPtr.Zero;
        }
        static string ReadSid(OwnedHandle token, int kind, out int error) {
            IntPtr data = TokenData(token, kind, out error);
            if (data == IntPtr.Zero) return null;
            try { return new SecurityIdentifier(Marshal.ReadIntPtr(data)).Value; }
            catch { error = -1; return null; }
            finally { Marshal.FreeHGlobal(data); }
        }
        static SecurityObservation Security(IntPtr handle) {
            var result = new SecurityObservation(); OwnedHandle token;
            if (!OpenProcessToken(handle, 8, out token)) {
                if (token != null) token.Dispose();
                result.UserError = result.IntegrityError = result.ElevationError = LastError(); return result;
            }
            try {
                result.UserSid = ReadSid(token, 1, out result.UserError);
                result.IntegritySid = ReadSid(token, 25, out result.IntegrityError);
                IntPtr data = TokenData(token, 20, out result.ElevationError);
                if (data != IntPtr.Zero) { try { result.Elevated = Marshal.ReadInt32(data) != 0; } finally { Marshal.FreeHGlobal(data); } }
                return result;
            } finally { CloseOwned(token); }
        }
        public static ProcessObservation Observe(Process process) {
            var result = new ProcessObservation(); result.Pid = process.Id;
            try {
                var text = new StringBuilder(32768); int size = text.Capacity;
                if (QueryFullProcessImageName(process.Handle, 1, text, ref size)) result.ImagePath = text.ToString();
                else result.ImageError = LastError();
                result.Security = Security(process.Handle);
            } catch { result.ImageError = -1; result.Security = new SecurityObservation { UserError=-1, IntegrityError=-1, ElevationError=-1 }; }
            OwnedHandle snapshot = CreateToolhelp32Snapshot(2, 0);
            if (snapshot == null || snapshot.IsInvalid) {
                result.ParentError = LastError(); if (snapshot != null) snapshot.Dispose(); return result;
            }
            try {
                var entry = new Entry(); entry.size = (uint)Marshal.SizeOf(typeof(Entry));
                bool more = First(snapshot, ref entry), found = false;
                while (more) { if (entry.pid == result.Pid) { result.ParentPid = (int)entry.parent; found = true; break; } more = Next(snapshot, ref entry); }
                if (!found) { result.ParentError = Marshal.GetLastWin32Error(); if (result.ParentError == 0) result.ParentError = -1; }
            } finally { CloseOwned(snapshot); }
            return result;
        }
        sealed class PipeReader : IDisposable {
            readonly FileStream stream;
            readonly MemoryStream bytes = new MemoryStream();
            readonly byte[] buffer = new byte[512];
            readonly PipeObservation result;
            public bool Eof;
            public PipeReader(Stream source, PipeObservation observation) {
                stream = source as FileStream; if (stream == null) throw new InvalidOperationException("PIPE_TYPE_UNSUPPORTED");
                result = observation;
            }
            // Single owner, no Task/reader thread, no process handle, no blocking
            // read of an empty pipe. Watchdog never calls into this reader.
            public void Poll() {
                if (Eof || result.ReadFailed || result.Overflow) return;
                try {
                    uint available;
                    if (!PeekNamedPipe(stream.SafeFileHandle, IntPtr.Zero, 0, IntPtr.Zero, out available, IntPtr.Zero)) {
                        if (Marshal.GetLastWin32Error() == 109) { Eof=true; return; }
                        throw new InvalidOperationException("PIPE_PEEK_FAILED");
                    }
                    if (available == 0) return;
                    uint read;
                    if (!ReadFile(stream.SafeFileHandle, buffer, Math.Min((uint)buffer.Length, available), out read, IntPtr.Zero)) throw new InvalidOperationException("PIPE_READ_FAILED");
                    result.Bytes += (int)read;
                    if (result.Bytes > 8192) { result.Overflow=true; return; }
                    bytes.Write(buffer, 0, (int)read);
                } catch { result.ReadFailed=true; }
            }
            public void Finish() {
                try { result.Text = new UTF8Encoding(false, true).GetString(bytes.ToArray()); }
                catch { result.ReadFailed=true; }
            }
            public void Dispose() { bytes.Dispose(); }
        }
        static OwnedHandle Duplicate(Process process) {
            OwnedHandle result;
            if (!DuplicateHandle(GetCurrentProcess(), process.Handle, GetCurrentProcess(), out result, 0, false, 2)) {
                if (result != null) result.Dispose(); throw new InvalidOperationException("HANDLE_DUPLICATE_FAILED");
            }
            return result;
        }
        static bool Signaled(OwnedHandle handle) {
            uint state = WaitForSingleObject(handle, 0);
            if (state == 0) return true;
            if (state == 258) return false;
            throw new InvalidOperationException("PROCESS_WAIT_FAILED");
        }
        static void Cleanup(Trial result, string name, Action action) {
            try { action(); } catch { result.CleanupFailed=true; result.CleanupErrors.Add(name); }
        }
        static void CloseOwned(OwnedHandle handle) {
            if (handle == null) return;
            handle.Dispose(); if (!handle.IsClosed || handle.CloseError != 0) throw new InvalidOperationException("HANDLE_CLOSE_UNCONFIRMED");
        }
        // Trial is allocated and registered by the caller BEFORE any process is
        // created. Its PID survives an exception/failed cleanup in this method.
        public static void Run(string node, string child, string cwd, IDictionary<string,string> env, string nonce, bool release, Trial result) {
            Process process = null; OwnedHandle control = null, watchdogHandle = null;
            ManualResetEvent cancel = null; Thread watchdog = null;
            PipeReader stdout = null, stderr = null; bool watchdogStarted=false;
            StreamReader output = null, error = null; StreamWriter input = null;
            var clock = new Stopwatch();
            try {
                process = new Process();
                process.StartInfo = new ProcessStartInfo(node, "--no-addons --no-global-search-paths \"" + child + "\"");
                process.StartInfo.WorkingDirectory = cwd;
                process.StartInfo.UseShellExecute=false; process.StartInfo.CreateNoWindow=true;
                process.StartInfo.RedirectStandardInput = process.StartInfo.RedirectStandardOutput = process.StartInfo.RedirectStandardError = true;
                process.StartInfo.EnvironmentVariables.Clear();
                foreach (var pair in env) process.StartInfo.EnvironmentVariables.Add(pair.Key, pair.Value);
                cancel = new ManualResetEvent(false);
                clock.Start(); // origin: immediately before Process.Start, not first JS callback
                result.CreationAttempted=true;
                if (!process.Start()) throw new InvalidOperationException("PROCESS_START_FAILED");
                result.Started=true;
                result.Child.Pid=process.Id; // first operation after recording Start success
                result.StartReturnedMs=clock.ElapsedMilliseconds;
                control=Duplicate(process); watchdogHandle=Duplicate(process);
                OwnedHandle threadHandle=watchdogHandle; ManualResetEvent threadCancel=cancel;
                watchdog = new Thread(() => {
                    try {
                        while (clock.ElapsedMilliseconds < result.DeadlineMs) {
                            if (threadCancel.WaitOne((int)Math.Max(1, result.DeadlineMs-clock.ElapsedMilliseconds))) return;
                        }
                        if (threadCancel.WaitOne(0) || Signaled(threadHandle)) return;
                        Interlocked.Exchange(ref result.WatchdogFiredMs, clock.ElapsedMilliseconds);
                        result.TimedOut=true;
                        Interlocked.Exchange(ref result.KillRequestedMs, clock.ElapsedMilliseconds);
                        result.KillSucceeded=TerminateProcess(threadHandle, 124);
                        if (!result.KillSucceeded) result.KillError=LastError();
                    } catch { result.WatchdogFailed=true; }
                    finally { try { CloseOwned(threadHandle); } catch { result.WatchdogFailed=true; } }
                });
                watchdog.IsBackground=true; watchdog.Start(); watchdogStarted=true;
                // Ownership of watchdogHandle has moved to the thread; the main
                // cleanup never closes it underneath that thread, even on timeout.
                output=process.StandardOutput; error=process.StandardError; input=process.StandardInput;
                stdout=new PipeReader(output.BaseStream, result.Stdout); stderr=new PipeReader(error.BaseStream, result.Stderr);
                using (Process self=Process.GetCurrentProcess()) result.Supervisor=Observe(self);
                result.Child=Observe(process);
                if (release && !Signaled(control)) { input.WriteLine(nonce); input.Close(); input=null; }
                while (clock.ElapsedMilliseconds <= result.DeadlineMs+2250) {
                    stdout.Poll(); stderr.Poll();
                    if (Signaled(control)) { result.Exited=true; result.ExitObservedMs=clock.ElapsedMilliseconds; break; }
                    if (result.Stdout.Overflow || result.Stderr.Overflow || result.Stdout.ReadFailed || result.Stderr.ReadFailed) throw new InvalidOperationException("PIPE_PROTOCOL_FAILED");
                    Thread.Sleep(10);
                }
            } catch { result.ControlFailed=true; }
            finally {
                // Every action is independent. Failure cannot skip later actions.
                Cleanup(result, "DIRECT_CHILD_TERMINATION", () => {
                    if (process == null || !result.CreationAttempted) return;
                    if (!result.Started) {
                        // Process.Start may throw before its public success return.
                        // Recover a linked PID if available; otherwise retain UNKNOWN.
                        try { result.Child.Pid=process.Id; result.Started=true; }
                        catch { result.CreationUncertain=true; throw new InvalidOperationException("CREATION_OUTCOME_UNKNOWN"); }
                    }
                    if (control == null) { // duplication/preparation failed after CreateProcess
                        if (!process.HasExited) process.Kill();
                        result.Exited=process.WaitForExit(2000);
                    } else {
                        if (!Signaled(control)) {
                            if (!TerminateProcess(control, 125)) throw new InvalidOperationException("FALLBACK_KILL_FAILED");
                            uint state=WaitForSingleObject(control, 2000); if (state != 0) throw new InvalidOperationException("EXIT_UNCONFIRMED");
                        }
                        result.Exited=Signaled(control);
                    }
                    if (!result.Exited) throw new InvalidOperationException("EXIT_UNCONFIRMED");
                    if (result.ExitObservedMs < 0) result.ExitObservedMs=clock.ElapsedMilliseconds;
                    result.ExitCode=process.ExitCode;
                });
                Cleanup(result, "WATCHDOG_CANCEL", () => { if (cancel != null) cancel.Set(); });
                Cleanup(result, "WATCHDOG_JOIN", () => {
                    if (!watchdogStarted) { result.WatchdogJoined=true; return; }
                    result.WatchdogJoined=watchdog.Join(2000);
                    if (!result.WatchdogJoined) throw new InvalidOperationException("WATCHDOG_UNCONFIRMED");
                });
                if (!watchdogStarted) Cleanup(result, "UNSTARTED_WATCHDOG_HANDLE", () => CloseOwned(watchdogHandle));
                Cleanup(result, "PIPE_DRAIN", () => {
                    if (stdout == null || stderr == null) throw new InvalidOperationException("PIPES_NOT_INITIALIZED");
                    long until=clock.ElapsedMilliseconds+250;
                    while ((!stdout.Eof || !stderr.Eof) && clock.ElapsedMilliseconds <= until) {
                        stdout.Poll(); stderr.Poll();
                        if (result.Stdout.Overflow || result.Stderr.Overflow || result.Stdout.ReadFailed || result.Stderr.ReadFailed) break;
                        if (!stdout.Eof || !stderr.Eof) Thread.Sleep(5);
                    }
                    stdout.Finish(); stderr.Finish(); result.PipesCompleted=stdout.Eof && stderr.Eof;
                    if (!result.PipesCompleted) throw new InvalidOperationException("PIPE_EOF_UNCONFIRMED");
                });
                // No reader Tasks exist. These readers are exclusively owned by
                // this stack frame; no deferred callback can touch any handle.
                result.ReadersStopped=true;
                Cleanup(result, "STDIN_CLOSE", () => { if (input != null) input.Close(); else if (result.Started) process.StandardInput.Close(); });
                Cleanup(result, "STDOUT_CLOSE", () => { if (output != null) output.Close(); else if (result.Started) process.StandardOutput.Close(); });
                Cleanup(result, "STDERR_CLOSE", () => { if (error != null) error.Close(); else if (result.Started) process.StandardError.Close(); });
                Cleanup(result, "STDOUT_BUFFER", () => { if (stdout != null) stdout.Dispose(); });
                Cleanup(result, "STDERR_BUFFER", () => { if (stderr != null) stderr.Dispose(); });
                Cleanup(result, "CONTROL_HANDLE", () => CloseOwned(control));
                Cleanup(result, "PROCESS_DISPOSE", () => { if (process != null) process.Dispose(); });
                if (result.WatchdogJoined) Cleanup(result, "WATCHDOG_EVENT", () => { if (cancel != null) cancel.Dispose(); });
                // If join fails, the thread keeps its own SafeHandle and event
                // reachable. Mark failure; do not race a close or start another child.
                result.ElapsedMs=clock.ElapsedMilliseconds;
            }
        }
    }
}
