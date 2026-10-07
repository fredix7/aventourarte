import * as fs from 'node:fs';
import * as path from 'node:path';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';
import { assertRepositoryIdentity, validateSourcePath, contained, hashBytes } from './path-safety';
import { freezeResult } from './result-contracts';
import { environmentFail, WorkspaceError, WORKSPACE_LIMITS, type RepositoryIdentity,
  type SourceLockHandle, type LockReleaseResult } from './workspace-contracts';

interface OwnedLock { readonly path: string; readonly root: string; readonly dev: bigint; readonly ino: bigint;
  readonly rootDev: bigint; readonly rootIno: bigint; readonly content: Buffer; written: number; active: boolean }
const locks = new WeakMap<object, OwnedLock>();
function runtimeRoot(repo: RepositoryIdentity): { root: string; dev: bigint; ino: bigint } {
  const temp = fs.realpathSync.native(tmpdir()), root = path.join(temp, 'aventourarte-factory-fix-locks-v1');
  if (root === repo.canonicalRoot || contained(repo.canonicalRoot, root)) environmentFail('LOCK_INVALID');
  try { fs.mkdirSync(root, { mode: 0o700 }); }
  catch (error) { if ((error as NodeJS.ErrnoException).code !== 'EEXIST') environmentFail('LOCK_ACQUISITION_FAILED'); }
  const stat = checkRoot(root); return { root, dev: stat.dev, ino: stat.ino };
}
function checkRoot(root: string): fs.BigIntStats {
  const stat = fs.lstatSync(root, { bigint: true });
  if (!stat.isDirectory() || stat.isSymbolicLink() || stat.ino === 0n || fs.realpathSync.native(root) !== root) environmentFail('LOCK_INVALID');
  // On POSIX, reject a root owned by another user or writable by group/others. Windows mode
  // is not an ACL proof: the host's per-user TEMP/ACL remains part of the trust boundary.
  if (process.platform !== 'win32' && (stat.uid !== BigInt(process.getuid!()) || (stat.mode & 0o022n) !== 0n)) environmentFail('LOCK_INVALID');
  return stat;
}
function sameEntry(owned: OwnedLock): boolean {
  const root = checkRoot(owned.root);
  if (root.dev !== owned.rootDev || root.ino !== owned.rootIno) return false;
  const stat = fs.lstatSync(owned.path, { bigint: true });
  return owned.ino !== 0n && stat.isFile() && !stat.isSymbolicLink() && stat.nlink === 1n && stat.dev === owned.dev && stat.ino === owned.ino
    && fs.realpathSync.native(owned.path) === owned.path;
}
function ownershipMatches(owned: OwnedLock): boolean {
  if (!sameEntry(owned)) return false;
  const descriptor = fs.openSync(owned.path, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW ?? 0) | (fs.constants.O_NONBLOCK ?? 0));
  try {
    const stat = fs.fstatSync(descriptor, { bigint: true });
    if (!stat.isFile() || stat.dev !== owned.dev || stat.ino !== owned.ino || stat.nlink !== 1n
      || stat.size !== BigInt(owned.written) || stat.size > BigInt(WORKSPACE_LIMITS.maxLockBytes)) return false;
    const buffer = Buffer.alloc(WORKSPACE_LIMITS.maxLockBytes + 1); let read = 0;
    while (read < buffer.length) {
      const count = fs.readSync(descriptor, buffer, read, buffer.length - read, read);
      if (!count) break; read += count;
    }
    if (!buffer.subarray(0, read).equals(owned.content.subarray(0, owned.written))) return false;
  } finally { fs.closeSync(descriptor); }
  return sameEntry(owned);
}
export function assertSourceLockOwned(handle: SourceLockHandle): void {
  const owned = handle && locks.get(handle);
  if (!owned?.active) environmentFail('LOCK_INVALID');
  try { if (!ownershipMatches(owned)) environmentFail('LOCK_INVALID'); }
  catch (error) {
    if (error instanceof WorkspaceError) throw error;
    if (['ENOENT', 'ENOTDIR', 'ELOOP'].includes((error as NodeJS.ErrnoException).code ?? '')) environmentFail('LOCK_INVALID');
    environmentFail('FILESYSTEM_INSPECTION_FAILED');
  }
}
export function acquireSourceLock(repo: RepositoryIdentity, sourcePath: string): SourceLockHandle {
  assertRepositoryIdentity(repo); validateSourcePath(sourcePath);
  let descriptor: number | undefined, owned: OwnedLock | undefined;
  try {
    const rootIdentity = runtimeRoot(repo), root = rootIdentity.root;
    const sourceDigest = hashBytes(sourcePath), key = hashBytes(JSON.stringify(['source-lock', repo.digest, sourceDigest]));
    const lockPath = path.join(root, key + '.lock');
    if (!contained(root, lockPath)) environmentFail('LOCK_INVALID');
    // Atomic exclusive create, never exists-then-create. Existing locks are not recovered by PID/time.
    try { descriptor = fs.openSync(lockPath, 'wx', 0o600); }
    catch (error) { environmentFail((error as NodeJS.ErrnoException).code === 'EEXIST' ? 'LOCK_CONTENDED' : 'LOCK_ACQUISITION_FAILED'); }
    const stat = fs.fstatSync(descriptor!, { bigint: true });
    const content = Buffer.from(JSON.stringify({ schemaVersion: 1, repoDigest: repo.digest, sourceDigest,
      pid: process.pid, token: randomBytes(24).toString('hex') }) + '\n', 'utf8');
    owned = { path: lockPath, root, dev: stat.dev, ino: stat.ino, rootDev: rootIdentity.dev, rootIno: rootIdentity.ino,
      content, written: 0, active: true };
    if (stat.ino === 0n || content.length > WORKSPACE_LIMITS.maxLockBytes || !sameEntry(owned)) environmentFail('LOCK_INVALID');
    let offset = 0;
    while (offset < content.length) {
      const written = fs.writeSync(descriptor!, content, offset, content.length - offset);
      if (!written) environmentFail('LOCK_ACQUISITION_FAILED'); offset += written; owned.written = offset;
    }
    if (!sameEntry(owned)) environmentFail('LOCK_INVALID');
    fs.closeSync(descriptor!); descriptor = undefined;
    const handle = Object.freeze(Object.defineProperty(Object.create(null), 'toJSON', {
      value() { throw new TypeError('Source lock capability is runtime-only.'); }, enumerable: false
    })) as SourceLockHandle;
    locks.set(handle, owned); return handle;
  } catch (error) {
    if (descriptor !== undefined) { try { fs.closeSync(descriptor); } catch { /* Report the original acquisition failure. */ } }
    // Failed metadata creation can only remove the exact exclusively-created inode. Never an existing/foreign lock.
    if (owned) {
      try { if (ownershipMatches(owned)) fs.unlinkSync(owned.path); } catch { environmentFail('LOCK_RELEASE_FAILED'); }
    }
    if (error instanceof WorkspaceError) throw error;
    environmentFail('LOCK_ACQUISITION_FAILED');
  }
}
export function isSourceLockHeld(handle: SourceLockHandle): boolean { return !!handle && locks.get(handle)?.active === true; }
export function releaseSourceLock(handle: SourceLockHandle): LockReleaseResult {
  const owned = handle && locks.get(handle);
  if (!owned) return freezeResult({ status: 'BLOCKED', code: 'LOCK_INVALID' });
  if (!owned.active) return freezeResult({ status: 'ALREADY_RELEASED' });
  owned.active = false;
  try {
    if (!ownershipMatches(owned)) return freezeResult({ status: 'BLOCKED', code: 'LOCK_INVALID' });
    // Cooperative ownership check, not an OS-universal unlink/TOCTOU guarantee.
    fs.unlinkSync(owned.path); return freezeResult({ status: 'RELEASED' });
  } catch (error) {
    if (error instanceof WorkspaceError) return freezeResult({ status: 'BLOCKED', code: 'LOCK_INVALID' });
    return freezeResult({ status: (error as NodeJS.ErrnoException).code === 'ENOENT' ? 'BLOCKED' : 'FAILED',
      code: (error as NodeJS.ErrnoException).code === 'ENOENT' ? 'LOCK_INVALID' : 'LOCK_RELEASE_FAILED' });
  }
}
