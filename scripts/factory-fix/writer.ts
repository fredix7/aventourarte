import * as fs from 'node:fs';
import * as path from 'node:path';
import { randomBytes } from 'node:crypto';
import { isHostPreparedFixResult } from './prepared-result';
import { SourceIdentityError } from './errors';
import { classifyFixError } from './result-classification';
import { freezeResult } from './result-contracts';
import { hasExactKeys } from './validation';
import { resolveFactoryGuideSourceIdentity, resolvedIdentityRepository, MAX_GUIDE_SOURCE_BYTES } from './source-identity';
import { assertRepositoryIdentity, readSourcePath, assertSameFilesystem, hashBytes } from './path-safety';
import { inspectGitTargetState, inspectGitPersistedState } from './git-inspection';
import { assertSourceLockOwned } from './source-lock';
import { claimPreparedWriteLease, finishPreparedWriteLease } from './write-readiness';
import { WorkspaceError, WORKSPACE_CLASSIFICATION, type PathObservation } from './workspace-contracts';
import type { SourceIdentity } from './contracts';
import type { PersistPreparedFixInput, PersistenceResult, PersistenceDiagnostic, PersistenceErrorCode, RecoveryStatus } from './writer-contracts';

export type { PersistPreparedFixInput, PersistenceResult } from './writer-contracts';

class PersistenceError extends Error {
  constructor(readonly code: PersistenceErrorCode, readonly status: 'BLOCKED' | 'FAILED', readonly causeCode: string | null = null) {
    super(`Factory persistence: ${code}.`);
  }
}
function fail(code: PersistenceErrorCode, status: 'BLOCKED' | 'FAILED' = 'FAILED'): never { throw new PersistenceError(code, status); }
function systemCause(error: unknown): string | null {
  const code: unknown = error && typeof error === 'object' ? Object.getOwnPropertyDescriptor(error, 'code')?.value : null;
  return typeof code === 'string' && ['EACCES', 'EPERM', 'EBUSY', 'EXDEV', 'ENOENT', 'EEXIST', 'ENOSPC',
    'EIO', 'ENOTEMPTY', 'EMFILE', 'ENFILE', 'EBADF', 'EINVAL'].includes(code) ? code : null;
}
const same = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);
const sameInode = (a: fs.BigIntStats, b: fs.BigIntStats): boolean => a.dev === b.dev && a.ino === b.ino
  && a.ino !== 0n && a.isFile() && b.isFile() && !a.isSymbolicLink() && !b.isSymbolicLink() && a.nlink === 1n && b.nlink === 1n;
const sameVersion = (a: fs.BigIntStats, b: fs.BigIntStats): boolean => sameInode(a, b)
  && a.mode === b.mode && a.size === b.size && a.mtimeNs === b.mtimeNs && a.ctimeNs === b.ctimeNs;
interface Artifact { readonly filename: string; readonly kind: 'candidate' | 'original'; readonly bytes: Buffer; descriptor?: number;
  stat?: fs.BigIntStats; written: number; complete: boolean; moved: boolean }
// Private process-local recovery ledger. Retained files are never silently forgotten or exposed
// through the public result. A crash can leave sidecars; there is deliberately no automatic
// restart recovery or generic restore(path) capability. Host/manual intervention is required.
const retained = new Map<string, { readonly requestId: string; readonly artifacts: readonly Artifact[];
  readonly descriptors: ReadonlyMap<number, fs.BigIntStats | undefined> }>();
function readExact(fd: number, expected: Buffer): boolean {
  const bytes = Buffer.alloc(expected.length + 1); let count = 0;
  while (count < bytes.length) { const n = fs.readSync(fd, bytes, count, bytes.length - count, null); if (!n) break; count += n; }
  return count === expected.length && bytes.subarray(0, count).equals(expected);
}

/** Phase 7 only: one authorized source, one lease, one synchronous transaction.
 * Cooperating writers are excluded by Phase 6. Node exposes no Windows handle-relative
 * conditional rename/unlink or complete reparse-tag/ACL inspection. A hostile process with
 * write access can still win the last check -> rename/unlink race. Do not claim universal
 * atomicity, crash durability, ACL preservation or safety against that stronger adversary.
 * On Windows rename may replace an existing regular file, or fail due to sharing, ACLs,
 * Defender/AV or filesystem semantics. Never retry with delete/copy or across volumes.
 */
export function persistPreparedFix(input: PersistPreparedFixInput): PersistenceResult {
  if (!hasExactKeys(input, ['repoRoot', 'preparedResult', 'lease'])
    || ![null, Object.prototype].includes(Object.getPrototypeOf(input))
    || Object.values(Object.getOwnPropertyDescriptors(input)).some(d => !d.enumerable || !('value' in d))) {
    throw new TypeError('Invalid persistPreparedFix API envelope.');
  }
  const prepared = isHostPreparedFixResult(input.preparedResult) ? input.preparedResult : null;
  let capability: ReturnType<typeof claimPreparedWriteLease> | undefined;
  let stage = 'INPUT', status: PersistenceResult['status'] = 'FAILED', recovery: RecoveryStatus = 'NOT_NEEDED';
  let staging: Artifact | undefined, backup: Artifact | undefined, attempted = false, replaced = false, verified = false;
  let readbackHash: string | null = null, finalIdentity: SourceIdentity | null = null, finalPath: PathObservation | null = null;
  let recoveryReadbackHash: string | null = null;
  let cleanup: PersistenceResult['cleanup'] = 'COMPLETE', lockRelease: PersistenceResult['lockRelease'] = null;
  let reference: string | null = null, recoveryKey: string | null = null, dataFlushed = false;
  let finalVerifier: (() => void) | undefined;
  const artifacts: Artifact[] = [], diagnostics: PersistenceDiagnostic[] = [];
  const pendingCloses = new Map<number, fs.BigIntStats | undefined>();
  const closeOwned = (fd: number, expected: fs.BigIntStats | undefined): void => {
    try { fs.closeSync(fd); pendingCloses.delete(fd); }
    catch (error) { pendingCloses.set(fd, expected); throw error; }
  };
  const rememberRetained = (): void => {
    // Allocate the key before creating artifacts, not on an error path that must release
    // the lease even if the entropy provider has failed.
    reference = recoveryKey;
    if (reference) retained.set(reference, { requestId: prepared?.requestId ?? '', artifacts, descriptors: pendingCloses });
  };
  const diagnostic = (code: PersistenceErrorCode, cause: string | null = null): void => {
    diagnostics.push({ code, stage, cause, message: `Factory persistence ${stage}: ${code}.` });
  };
  // No paths, localized error messages, stack, bytes or lock tokens enter diagnostics.
  const classify = (error: unknown): PersistenceError => {
    if (error instanceof PersistenceError) return error;
    if (error instanceof WorkspaceError) return new PersistenceError(stage === 'LOCK' ? 'LOCK_OWNERSHIP_LOST'
      : stage === 'READBACK' ? 'READBACK_FAILED' : 'REVALIDATION_FAILED', WORKSPACE_CLASSIFICATION[error.code], error.code);
    if (error instanceof SourceIdentityError) return new PersistenceError('REVALIDATION_FAILED', classifyFixError(error).status, error.code);
    return new PersistenceError(stage === 'STAGING' ? 'STAGING_FAILED' : stage === 'BACKUP' ? 'BACKUP_FAILED'
      : stage === 'REPLACE' ? 'REPLACE_FAILED' : stage === 'READBACK' ? 'READBACK_FAILED' : 'REVALIDATION_FAILED',
    'FAILED', systemCause(error));
  };
  try {
    if (!prepared) fail('WRITER_INPUT_INVALID', 'BLOCKED');
    if (prepared.status === 'NO_CHANGE') fail('NO_CHANGE_NOT_WRITABLE', 'BLOCKED');
    if (prepared.status !== 'READY_TO_WRITE' || !prepared.requestDigest || !prepared.sourceHash
      || !prepared.candidateHash || typeof prepared.candidateText !== 'string'
      || hashBytes(prepared.candidateText) !== prepared.candidateHash
      || prepared.sourceIdentity.sourceHash !== prepared.sourceHash || prepared.candidateHash === prepared.sourceHash) {
      fail('WRITER_INPUT_INVALID', 'BLOCKED');
    }
    stage = 'LEASE';
    try { capability = claimPreparedWriteLease(input.repoRoot, prepared, input.lease); }
    catch { fail('LEASE_INVALID', 'BLOCKED'); }
    const { report, lock } = capability!, repo = report.repository, sourcePath = prepared.sourceIdentity.sourcePath;
    if (resolvedIdentityRepository(prepared.sourceIdentity) !== repo.canonicalRoot) fail('LEASE_INVALID', 'BLOCKED');
    recoveryKey = randomBytes(24).toString('hex');
    const source = report.preconditions.filesystem.file.absolutePath;
    const lockOwned = (): void => {
      try { assertSourceLockOwned(lock); }
      catch { fail('LOCK_OWNERSHIP_LOST', 'BLOCKED'); }
    };
    const parents = (observation: PathObservation): void => {
      if (!same(observation.ancestors, report.preconditions.filesystem.ancestors)) fail('SOURCE_DRIFT', 'BLOCKED');
    };
    const identity = (hash: string): SourceIdentity => {
      const fresh = resolveFactoryGuideSourceIdentity({ repoRoot: repo.canonicalRoot, guidePath: prepared.guidePath });
      if (!same(fresh, { ...prepared.sourceIdentity, sourceHash: hash })) fail('SOURCE_DRIFT', 'BLOCKED');
      return fresh;
    };
    const git = (persisted: boolean): void => {
      const current = persisted ? inspectGitPersistedState(repo, sourcePath, prepared.candidateHash) : inspectGitTargetState(repo, sourcePath);
      if (!same({ ...current, state: 'TRACKED_CLEAN' }, report.preconditions.git)) fail('REVALIDATION_FAILED', 'BLOCKED');
    };
    const original = (): ReturnType<typeof readSourcePath> => {
      lockOwned(); assertRepositoryIdentity(repo);
      const current = readSourcePath(repo, sourcePath);
      if (current.observation.sourceHash !== prepared.sourceHash) fail('SOURCE_DRIFT', 'BLOCKED');
      assertSameFilesystem(report.preconditions.filesystem, current.observation);
      // Phase 7 is stricter than Phase 6 about observed intervening same-inode writes.
      if (!same(current.observation, report.preconditions.filesystem)) fail('SOURCE_DRIFT', 'BLOCKED');
      identity(prepared.sourceHash); lockOwned(); return current;
    };
    const artifactStat = (item: Artifact, stat: fs.BigIntStats): void => {
      if (!item.stat || !sameInode(item.stat, stat) || stat.size !== BigInt(item.written)
        || fs.realpathSync.native(item.filename) !== item.filename) fail('STAGING_HASH_MISMATCH', 'BLOCKED');
    };
    const verifyArtifact = (item: Artifact): fs.BigIntStats => {
      // Validate parents before looking at or removing a sidecar through a pathname.
      assertRepositoryIdentity(repo); parents(readSourcePath(repo, sourcePath).observation);
      const before = fs.lstatSync(item.filename, { bigint: true }); artifactStat(item, before);
      const fd = fs.openSync(item.filename, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW ?? 0) | (fs.constants.O_NONBLOCK ?? 0));
      try {
        if (!sameVersion(before, fs.fstatSync(fd, { bigint: true }))) fail('STAGING_HASH_MISMATCH', 'BLOCKED');
        const bytes = Buffer.alloc(item.written + 1); let count = 0;
        while (count < bytes.length) { const n = fs.readSync(fd, bytes, count, bytes.length - count, null); if (!n) break; count += n; }
        if (count !== item.written || !bytes.subarray(0, count).equals(item.bytes.subarray(0, item.written))) {
          fail('STAGING_HASH_MISMATCH', 'BLOCKED');
        }
        if (!sameVersion(before, fs.fstatSync(fd, { bigint: true }))
          || !sameVersion(before, fs.lstatSync(item.filename, { bigint: true }))) fail('STAGING_HASH_MISMATCH', 'BLOCKED');
      } finally { closeOwned(fd, before); }
      if (item.complete && hashBytes(item.bytes) !== (item.kind === 'original' ? prepared.sourceHash : prepared.candidateHash)) {
        fail('STAGING_HASH_MISMATCH', 'BLOCKED');
      }
      return before;
    };
    const makeArtifact = (kind: 'candidate' | 'original', bytes: Buffer): Artifact => {
      if (bytes.length > MAX_GUIDE_SOURCE_BYTES) fail('STAGING_FAILED');
      original();
      const filename = path.join(path.dirname(source), `.factory-fix-${randomBytes(24).toString('hex')}-${kind}.tmp`);
      const descriptor = fs.openSync(filename, 'wx', 0o600);
      const item: Artifact = { filename, kind, bytes, descriptor, written: 0, complete: false, moved: false };
      artifacts.push(item);
      item.stat = fs.fstatSync(descriptor, { bigint: true });
      if (!sameInode(item.stat, item.stat) || String(item.stat.dev) !== report.preconditions.filesystem.file.dev) fail('STAGING_FAILED');
      while (item.written < bytes.length) {
        const n = fs.writeSync(descriptor, bytes, item.written, bytes.length - item.written);
        if (n <= 0) fail('STAGING_FAILED'); item.written += n;
      }
      // New file inherits Windows parent ACL, not the old file's ACL. Node's mode does
      // not prove ACL privacy. Per-user/worktree ACLs are a host prerequisite; no ACL escalation.
      if (process.platform !== 'win32' && kind === 'candidate') fs.fchmodSync(descriptor, Number(BigInt(report.preconditions.filesystem.file.mode) & 0o777n));
      fs.fsyncSync(descriptor);
      closeOwned(descriptor, item.stat); item.descriptor = undefined; item.complete = true;
      // Keep the exclusively-created inode. Only a stat whose identity AND bytes were
      // verified can refresh metadata; a later pathname lookup cannot confer ownership.
      item.stat = verifyArtifact(item);
      return item;
    };
    const ownedCandidate = (): ReturnType<typeof readSourcePath> => {
      lockOwned(); assertRepositoryIdentity(repo);
      const current = readSourcePath(repo, sourcePath), file = current.observation.file;
      parents(current.observation);
      if (!staging?.stat || file.dev !== String(staging.stat.dev) || file.ino !== String(staging.stat.ino)
        || file.mode !== String(staging.stat.mode) || file.mtimeNs !== String(staging.stat.mtimeNs)) fail('SOURCE_DRIFT', 'BLOCKED');
      readbackHash = current.observation.sourceHash;
      if (readbackHash !== prepared.candidateHash || !current.bytes.equals(Buffer.from(prepared.candidateText, 'utf8'))) {
        fail('READBACK_HASH_MISMATCH');
      }
      lockOwned(); return current;
    };
    const readback = (): void => {
      const first = ownedCandidate();
      const fresh = identity(prepared.candidateHash);
      git(true);
      const last = ownedCandidate();
      if (!same(first.observation, last.observation)) fail('SOURCE_DRIFT', 'BLOCKED');
      finalIdentity = fresh; finalPath = last.observation; verified = true;
    };
    finalVerifier = readback;
    stage = 'REVALIDATION'; const initial = original(); git(false); original();
    stage = 'STAGING'; staging = makeArtifact('candidate', Buffer.from(prepared.candidateText, 'utf8'));
    stage = 'BACKUP'; backup = makeArtifact('original', initial.bytes);
    dataFlushed = true;
    stage = 'FINAL_CHECKS'; verifyArtifact(staging); verifyArtifact(backup); original(); git(false);
    original(); verifyArtifact(staging); verifyArtifact(backup); original(); lockOwned();
    stage = 'REPLACE'; attempted = true;
    try {
      fs.renameSync(staging.filename, source); replaced = true; staging.moved = true;
    } catch (error) {
      // A reported error is not proof that the pathname is unchanged (e.g. uncertain I/O).
      // Determine only what can actually be observed; never force replacement.
      try {
        const current = readSourcePath(repo, sourcePath).observation;
        if (current.file.dev === String(staging.stat!.dev) && current.file.ino === String(staging.stat!.ino)) {
          replaced = true; staging.moved = true;
        } else if (!same(current, initial.observation)) recovery = 'UNSAFE';
      } catch { recovery = 'UNKNOWN'; }
      throw new PersistenceError('REPLACE_FAILED', 'FAILED', systemCause(error));
    }
    try { stage = 'READBACK'; readback(); status = 'APPLIED'; }
    catch (error) { throw classify(error); }

    // All helpers close over authentic capabilities and exact original/candidate bytes.
    // Recovery below is private too; there is no caller-supplied function or write(path,text).
  } catch (error) {
    const failure = classify(error); status = replaced ? 'FAILED' : failure.status; diagnostic(failure.code, failure.causeCode);
    if (replaced && capability && prepared?.status === 'READY_TO_WRITE' && staging?.stat && backup?.complete) {
      stage = 'RECOVERY_CHECKS';
      const { report, lock } = capability, repo = report.repository, sourcePath = prepared.sourceIdentity.sourcePath;
      let recoveryAttempted = false;
      try {
        assertSourceLockOwned(lock); assertRepositoryIdentity(repo);
        const current = readSourcePath(repo, sourcePath), file = current.observation.file;
        if (!same(current.observation.ancestors, report.preconditions.filesystem.ancestors)
          || file.dev !== String(staging.stat.dev) || file.ino !== String(staging.stat.ino)
          || file.mode !== String(staging.stat.mode) || file.mtimeNs !== String(staging.stat.mtimeNs)
          || current.observation.sourceHash !== prepared.candidateHash || !current.bytes.equals(staging.bytes)) fail('RECOVERY_UNSAFE', 'BLOCKED');
        const resolved = resolveFactoryGuideSourceIdentity({ repoRoot: repo.canonicalRoot, guidePath: prepared.guidePath });
        if (!same(resolved, { ...prepared.sourceIdentity, sourceHash: prepared.candidateHash })) fail('RECOVERY_UNSAFE', 'BLOCKED');
        const currentGit = inspectGitPersistedState(repo, sourcePath, prepared.candidateHash);
        if (!same({ ...currentGit, state: 'TRACKED_CLEAN' }, report.preconditions.git)) fail('RECOVERY_UNSAFE', 'BLOCKED');
        const before = fs.lstatSync(backup.filename, { bigint: true });
        if (!backup.stat || !sameInode(backup.stat, before) || before.size !== BigInt(backup.bytes.length)
          || fs.realpathSync.native(backup.filename) !== backup.filename) fail('RECOVERY_UNSAFE', 'BLOCKED');
        const fd = fs.openSync(backup.filename, fs.constants.O_RDWR | (fs.constants.O_NOFOLLOW ?? 0) | (fs.constants.O_NONBLOCK ?? 0));
        let verifiedBackup: fs.BigIntStats;
        try {
          if (!sameInode(before, fs.fstatSync(fd, { bigint: true }))) fail('RECOVERY_UNSAFE', 'BLOCKED');
          if (process.platform !== 'win32') fs.fchmodSync(fd, Number(BigInt(report.preconditions.filesystem.file.mode) & 0o777n));
          const beforeRead = fs.fstatSync(fd, { bigint: true });
          if (!readExact(fd, backup.bytes) || hashBytes(backup.bytes) !== prepared.sourceHash) fail('RECOVERY_UNSAFE', 'BLOCKED');
          fs.fsyncSync(fd);
          verifiedBackup = fs.fstatSync(fd, { bigint: true });
          if (!sameVersion(beforeRead, verifiedBackup)) fail('RECOVERY_UNSAFE', 'BLOCKED');
        } finally { closeOwned(fd, before); }
        const last = readSourcePath(repo, sourcePath);
        if (!same(current.observation, last.observation)) fail('RECOVERY_UNSAFE', 'BLOCKED');
        const backupLast = fs.lstatSync(backup.filename, { bigint: true });
        if (!sameVersion(verifiedBackup!, backupLast)) fail('RECOVERY_UNSAFE', 'BLOCKED');
        assertSourceLockOwned(lock);
        // Conditional only on these observations, not an OS CAS: a non-cooperating writer
        // can race the final check. No hash-only rollback and no Git rollback commands.
        stage = 'RECOVERY_REPLACE'; recoveryAttempted = true;
        fs.renameSync(backup.filename, report.preconditions.filesystem.file.absolutePath); backup.moved = true;
        stage = 'RECOVERY_READBACK';
        const restored = readSourcePath(repo, sourcePath);
        recoveryReadbackHash = restored.observation.sourceHash;
        if (restored.observation.file.dev !== String(before.dev) || restored.observation.file.ino !== String(before.ino)
          || restored.observation.sourceHash !== prepared.sourceHash || !restored.bytes.equals(backup.bytes)
          || !same(restored.observation.ancestors, report.preconditions.filesystem.ancestors)) fail('RECOVERY_FAILED');
        const restoredIdentity = resolveFactoryGuideSourceIdentity({ repoRoot: repo.canonicalRoot, guidePath: prepared.guidePath });
        if (!same(restoredIdentity, prepared.sourceIdentity)
          || !same(inspectGitTargetState(repo, sourcePath), report.preconditions.git)) fail('RECOVERY_FAILED');
        assertSourceLockOwned(lock);
        const lastRestored = readSourcePath(repo, sourcePath);
        if (!same(restored.observation, lastRestored.observation)) fail('RECOVERY_FAILED');
        recovery = 'RESTORED'; finalIdentity = restoredIdentity; finalPath = lastRestored.observation;
      } catch (recoveryError) {
        recovery = recoveryAttempted ? 'FAILED' : recoveryError instanceof WorkspaceError
          && WORKSPACE_CLASSIFICATION[recoveryError.code] === 'FAILED' ? 'UNKNOWN' : 'UNSAFE';
        if (recoveryAttempted) {
          // A thrown rename/verification does not prove which bytes remain. Observe the
          // outcome without another write; this probe can never confer RESTORED.
          try {
            assertSourceLockOwned(lock);
            const observed = readSourcePath(repo, sourcePath), file = observed.observation.file;
            assertSourceLockOwned(lock);
            const ownCandidate = file.dev === String(staging.stat.dev) && file.ino === String(staging.stat.ino)
              && observed.observation.sourceHash === prepared.candidateHash && observed.bytes.equals(staging.bytes);
            const ownOriginal = backup.stat && file.dev === String(backup.stat.dev) && file.ino === String(backup.stat.ino)
              && observed.observation.sourceHash === prepared.sourceHash && observed.bytes.equals(backup.bytes);
            recoveryReadbackHash = observed.observation.sourceHash;
            if (!same(observed.observation.ancestors, report.preconditions.filesystem.ancestors)
              || !ownCandidate && !ownOriginal) recovery = 'UNSAFE';
          } catch (observationError) {
            recovery = observationError instanceof WorkspaceError
              && WORKSPACE_CLASSIFICATION[observationError.code] === 'BLOCKED' ? 'UNSAFE' : 'UNKNOWN';
          }
        }
        diagnostic(recovery === 'FAILED' ? 'RECOVERY_FAILED' : recovery === 'UNKNOWN' ? 'RECOVERY_UNKNOWN' : 'RECOVERY_UNSAFE', systemCause(recoveryError));
      }
    } else if (replaced) { recovery = 'UNKNOWN'; diagnostic('RECOVERY_UNKNOWN'); }
    else if (attempted && recovery !== 'NOT_NEEDED') diagnostic(recovery === 'UNKNOWN' ? 'RECOVERY_UNKNOWN' : 'RECOVERY_UNSAFE');
  } finally {
    stage = 'CLEANUP';
    // Keep a verified original after any uncertain post-replace failure. Never remove a
    // foreign sidecar, changed parent, hardlink, symlink or replaced lock directory.
    let preserve = recovery === 'UNSAFE' || recovery === 'FAILED' || recovery === 'UNKNOWN';
    for (const item of artifacts) {
      if (item.descriptor !== undefined) {
        try { closeOwned(item.descriptor, item.stat); item.descriptor = undefined; }
        catch { cleanup = 'FAILED'; diagnostic('CLEANUP_FAILED'); }
      }
      if (item.moved) continue;
      if (preserve && item === backup) { if (cleanup !== 'FAILED') cleanup = 'RETAINED'; continue; }
      try {
        if (!capability || !item.stat) fail('CLEANUP_FAILED');
        const { report, lock } = capability;
        let current: PathObservation;
        try {
          assertSourceLockOwned(lock); assertRepositoryIdentity(report.repository);
          current = readSourcePath(report.repository, report.sourcePath).observation;
          if (!same(current.ancestors, report.preconditions.filesystem.ancestors)) fail('SOURCE_DRIFT', 'BLOCKED');
        } catch (inspectionError) {
          if (verified) {
            verified = false; status = 'FAILED'; recovery = inspectionError instanceof WorkspaceError
              && WORKSPACE_CLASSIFICATION[inspectionError.code] === 'FAILED' ? 'UNKNOWN' : 'UNSAFE';
            preserve = true; finalIdentity = null; finalPath = null;
            diagnostic(inspectionError instanceof WorkspaceError && inspectionError.code === 'LOCK_INVALID'
              ? 'LOCK_OWNERSHIP_LOST' : 'SOURCE_DRIFT');
          }
          throw inspectionError;
        }
        if (verified && !same(current, finalPath)) {
          verified = false; status = 'FAILED'; recovery = 'UNSAFE'; preserve = true;
          finalIdentity = null; finalPath = null; diagnostic('SOURCE_DRIFT');
          if (item === backup) { if (cleanup !== 'FAILED') cleanup = 'RETAINED'; continue; }
        }
        const stat = fs.lstatSync(item.filename, { bigint: true });
        if (!sameInode(item.stat, stat) || stat.size !== BigInt(item.written)
          || fs.realpathSync.native(item.filename) !== item.filename) fail('CLEANUP_FAILED');
        const fd = fs.openSync(item.filename, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW ?? 0) | (fs.constants.O_NONBLOCK ?? 0));
        try {
          if (!sameInode(stat, fs.fstatSync(fd, { bigint: true }))
            || !readExact(fd, item.bytes.subarray(0, item.written))) fail('CLEANUP_FAILED');
        } finally { closeOwned(fd, stat); }
        const last = fs.lstatSync(item.filename, { bigint: true });
        if (!sameInode(stat, last) || stat.size !== last.size || stat.mtimeNs !== last.mtimeNs || stat.ctimeNs !== last.ctimeNs) fail('CLEANUP_FAILED');
        try { assertSourceLockOwned(lock); }
        catch (lockError) {
          if (verified) {
            verified = false; status = 'FAILED'; recovery = 'UNSAFE'; preserve = true;
            finalIdentity = null; finalPath = null; diagnostic('LOCK_OWNERSHIP_LOST');
          }
          throw lockError;
        }
        fs.unlinkSync(item.filename);
      } catch (cleanupError) { cleanup = 'FAILED'; diagnostic('CLEANUP_FAILED', systemCause(cleanupError)); }
    }
    // A failing close is not proof that the fd is closed. Retry only a still-open descriptor
    // with the captured physical identity; never close a reused foreign fd number. An
    // unlinked owned inode may have nlink=0 here and can still be safely closed.
    for (const [fd, expected] of pendingCloses) {
      try {
        const current = fs.fstatSync(fd, { bigint: true });
        if (!expected || !current.isFile() || current.dev !== expected.dev || current.ino !== expected.ino || current.ino === 0n) fail('CLEANUP_FAILED');
        fs.closeSync(fd); pendingCloses.delete(fd);
      } catch (closeError) {
        if (systemCause(closeError) === 'EBADF') pendingCloses.delete(fd);
        else { cleanup = 'FAILED'; diagnostic('CLEANUP_FAILED', systemCause(closeError)); }
      }
    }
    // Cleanup itself takes time and invokes the filesystem. Check persistence once more
    // while the lock is held, including Git/catalog, before transferring responsibility.
    stage = 'FINAL_READBACK';
    if (verified && finalVerifier) {
      try { finalVerifier(); }
      catch (finalError) {
        verified = false; status = 'FAILED'; preserve = true;
        recovery = finalError instanceof WorkspaceError && WORKSPACE_CLASSIFICATION[finalError.code] === 'FAILED' ? 'UNKNOWN' : 'UNSAFE';
        finalIdentity = null; finalPath = null;
        diagnostic(finalError instanceof PersistenceError ? finalError.code : 'READBACK_FAILED', systemCause(finalError));
      }
    }
    if (preserve && cleanup === 'COMPLETE') cleanup = 'RETAINED';
    if (cleanup !== 'COMPLETE') {
      rememberRetained();
    }
    if (capability) {
      stage = 'LOCK_RELEASE';
      try { lockRelease = finishPreparedWriteLease(input.lease); }
      catch { lockRelease = { status: 'FAILED', code: 'LOCK_RELEASE_FAILED' }; }
      if (lockRelease.status === 'FAILED' || lockRelease.status === 'BLOCKED') diagnostic('LOCK_RELEASE_FAILED');
      if ((verified || recovery === 'RESTORED') && lockRelease.status === 'BLOCKED') {
        verified = false; status = 'FAILED'; recovery = 'UNSAFE'; finalIdentity = null; finalPath = null;
        diagnostic('LOCK_OWNERSHIP_LOST');
        // Even if the disk sidecar was safely removed before this last ownership check,
        // retain the original bytes/identities in the private, runtime-only ledger.
        if (!reference) {
          cleanup = 'RETAINED'; rememberRetained();
        }
      }
    }
  }
  // Infrastructure cleanup/release failures remain separate from verified persistence.
  // Detected loss of identity/ownership invalidates APPLIED. Never roll back just to clean.
  return freezeResult({ schemaVersion: 1, status, requestId: prepared?.requestId ?? null,
    requestDigest: prepared?.requestDigest ?? null, guidePath: prepared?.guidePath ?? null,
    sourceHash: prepared?.sourceHash ?? null, candidateHash: prepared && 'candidateHash' in prepared ? prepared.candidateHash : null,
    readbackHash, sourceIdentity: finalIdentity, fileIdentity: finalPath?.file ?? null,
    replaceCompleted: replaced, persistenceVerified: verified,
    persistedOperationIds: verified && prepared?.status === 'READY_TO_WRITE' ? prepared.candidateOperationIds : [],
    changedTargets: verified && prepared?.status === 'READY_TO_WRITE' ? prepared.changedTargets : [],
    recovery: { status: recovery, readbackHash: recoveryReadbackHash, artifactsRetained: cleanup !== 'COMPLETE', reference }, cleanup, lockRelease, diagnostics,
    qaHandoff: verified && prepared?.status === 'READY_TO_WRITE' ? prepared.qaHandoff : null,
    guarantees: { fileDataFlushedBeforeReplace: dataFlushed, directoryDurability: 'NOT_GUARANTEED',
      atomicity: 'SINGLE_RENAME_NO_ABSOLUTE_GUARANTEE', toctouEliminated: false } });
}
