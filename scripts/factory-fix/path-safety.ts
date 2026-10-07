import * as fs from 'node:fs';
import * as path from 'node:path';
import { createHash } from 'node:crypto';
import { FACTORY_GUIDES_ROOT } from './contracts';
import { MAX_GUIDE_SOURCE_BYTES } from './source-identity';
import { freezeResult } from './result-contracts';
import { environmentFail, WorkspaceError, WORKSPACE_LIMITS,
  type RepositoryIdentity, type PathObservation, type FileIdentity } from './workspace-contracts';

const repositories = new WeakSet<object>();
export const hashBytes = (bytes: string | Buffer): string => createHash('sha256').update(bytes).digest('hex');
export function validateSourcePath(sourcePath: string): void {
  if (typeof sourcePath !== 'string' || sourcePath.length > WORKSPACE_LIMITS.maxPathLength
    || !sourcePath.startsWith(FACTORY_GUIDES_ROOT + '/') || !sourcePath.endsWith('.guide.ts')
    || /[\\:\x00-\x1f\x7f]/.test(sourcePath) || path.posix.isAbsolute(sourcePath) || path.win32.isAbsolute(sourcePath)) environmentFail('PATH_UNSAFE');
  for (const segment of sourcePath.split('/')) {
    if (!segment || segment === '.' || segment === '..' || /[. ]$/.test(segment)
      || /[<>"|?*]/.test(segment) || /^(?:CON|PRN|AUX|NUL|COM[1-9¹²³]|LPT[1-9¹²³])(?:\.|$)/i.test(segment)) environmentFail('PATH_UNSAFE');
  }
}
export function contained(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return relative !== '' && !path.isAbsolute(relative) && relative !== '..' && !relative.startsWith('..' + path.sep);
}
export function fsFailure(error: unknown): never {
  if (error instanceof WorkspaceError) throw error;
  const code = (error as NodeJS.ErrnoException)?.code;
  if (code === 'ENOENT' || code === 'ENOTDIR') environmentFail('TARGET_DELETED');
  if (code === 'ELOOP') environmentFail('SYMLINK_UNSAFE');
  environmentFail('FILESYSTEM_INSPECTION_FAILED');
}
function physicalDirectory(directory: string): { realPath: string; dev: string; ino: string } {
  const stat = fs.lstatSync(directory, { bigint: true });
  if (stat.isSymbolicLink()) environmentFail('REPARSE_UNSAFE');
  if (!stat.isDirectory()) environmentFail('REPO_INVALID');
  const realPath = fs.realpathSync.native(directory);
  if (realPath !== directory) environmentFail('PATH_IDENTITY_MISMATCH');
  if (stat.ino === 0n) environmentFail('FILE_IDENTITY_UNAVAILABLE');
  return { realPath, dev: String(stat.dev), ino: String(stat.ino) };
}
function exactChild(parent: string, name: string): void {
  // Case-folding is used only to reject aliases, never to resolve a different logical target.
  const names = fs.readdirSync(parent);
  const aliases = names.filter(n => n.toLowerCase() === name.toLowerCase());
  if (!aliases.length) environmentFail('TARGET_DELETED');
  if (!names.includes(name) || aliases.length !== 1) {
    environmentFail('PATH_IDENTITY_MISMATCH');
  }
}
export function inspectRepositoryRoot(repoRoot: string): RepositoryIdentity {
  if (typeof repoRoot !== 'string' || repoRoot.length > WORKSPACE_LIMITS.maxPathLength
    || !path.isAbsolute(repoRoot) || /[\x00-\x1f\x7f]/.test(repoRoot)
    || /^(?:\\\\|\/\/)/.test(repoRoot)) environmentFail('REPO_INVALID');
  try {
    // Canonical equality rejects aliases above the trusted worktree boundary without requiring
    // permission to enumerate/stat unrelated ancestors such as a Windows user profile.
    const absolute = path.resolve(repoRoot);
    const stat = physicalDirectory(absolute);
    const identity = freezeResult({ canonicalRoot: absolute, dev: stat.dev, ino: stat.ino,
      digest: hashBytes(JSON.stringify(['factory-worktree', absolute, stat.dev, stat.ino])) });
    repositories.add(identity); return identity;
  } catch (error) {
    if (error instanceof WorkspaceError) throw error;
    if (['ENOENT', 'ENOTDIR'].includes((error as NodeJS.ErrnoException)?.code ?? '')) environmentFail('REPO_INVALID');
    fsFailure(error);
  }
}
export function assertRepositoryIdentity(repo: RepositoryIdentity): void {
  if (!repo || !repositories.has(repo)) environmentFail('REPO_INVALID');
  const current = inspectRepositoryRoot(repo.canonicalRoot);
  if (current.digest !== repo.digest) environmentFail('REPO_IDENTITY_MISMATCH');
}
function fileIdentity(absolutePath: string, stat: fs.BigIntStats): FileIdentity {
  if (stat.isSymbolicLink()) environmentFail('SYMLINK_UNSAFE');
  if (!stat.isFile()) environmentFail('TARGET_TYPE_CHANGED');
  if (stat.nlink !== 1n) environmentFail(stat.nlink > 1n ? 'HARDLINK_UNSAFE' : 'FILE_IDENTITY_UNAVAILABLE');
  if (stat.ino === 0n) environmentFail('FILE_IDENTITY_UNAVAILABLE');
  const realPath = fs.realpathSync.native(absolutePath);
  if (absolutePath !== realPath) environmentFail('PATH_IDENTITY_MISMATCH');
  return { absolutePath, realPath, dev: String(stat.dev), ino: String(stat.ino), nlink: String(stat.nlink), mode: String(stat.mode),
    size: String(stat.size), mtimeNs: String(stat.mtimeNs), ctimeNs: String(stat.ctimeNs) };
}
function samePhysical(a: FileIdentity, b: FileIdentity): boolean {
  return a.realPath === b.realPath && a.dev === b.dev && a.ino === b.ino && a.nlink === b.nlink && a.size === b.size && a.mode === b.mode;
}
export function readSourcePath(repo: RepositoryIdentity, sourcePath: string): { readonly observation: PathObservation; readonly bytes: Buffer } {
  assertRepositoryIdentity(repo); validateSourcePath(sourcePath);
  try {
    const source = path.join(repo.canonicalRoot, ...sourcePath.split('/'));
    const guideRoot = path.join(repo.canonicalRoot, ...FACTORY_GUIDES_ROOT.split('/'));
    if (!contained(guideRoot, source) || !contained(repo.canonicalRoot, source)) environmentFail('PATH_UNSAFE');
    const ancestors: PathObservation['ancestors'][number][] = [];
    let current = repo.canonicalRoot;
    const segments = sourcePath.split('/');
    for (const segment of segments.slice(0, -1)) {
      exactChild(current, segment); current = path.join(current, segment);
      ancestors.push({ absolutePath: current, ...physicalDirectory(current) });
    }
    exactChild(current, segments.at(-1)!);
    const initial = fileIdentity(source, fs.lstatSync(source, { bigint: true }));
    if (BigInt(initial.size) > BigInt(MAX_GUIDE_SOURCE_BYTES)) environmentFail('WRITE_PRECONDITION_FAILED');
    const descriptor = fs.openSync(source, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW ?? 0) | (fs.constants.O_NONBLOCK ?? 0));
    let bytes: Buffer;
    try {
      const opened = fileIdentity(source, fs.fstatSync(descriptor, { bigint: true }));
      if (!samePhysical(initial, opened)) environmentFail('FILESYSTEM_DRIFT');
      const buffer = Buffer.alloc(MAX_GUIDE_SOURCE_BYTES + 1); let count = 0;
      while (count < buffer.length) {
        const read = fs.readSync(descriptor, buffer, count, buffer.length - count, null);
        if (!read) break; count += read;
      }
      if (count > MAX_GUIDE_SOURCE_BYTES) environmentFail('WRITE_PRECONDITION_FAILED');
      bytes = buffer.subarray(0, count);
      const after = fileIdentity(source, fs.fstatSync(descriptor, { bigint: true }));
      const named = fileIdentity(source, fs.lstatSync(source, { bigint: true }));
      if (!samePhysical(initial, after) || !samePhysical(after, named) || after.size !== String(count)) environmentFail('FILESYSTEM_DRIFT');
    } finally { fs.closeSync(descriptor); }
    // Node lstat/realpath and fd identity checks minimize races, not eliminate them. Node does
    // not expose every Windows reparse tag/8.3 attribute; Phase 7 must check again before replace.
    return Object.freeze({ observation: freezeResult({ file: initial, ancestors, sourceHash: hashBytes(bytes!) }), bytes: bytes! });
  } catch (error) { fsFailure(error); }
}
export function observeSourcePath(repo: RepositoryIdentity, sourcePath: string): PathObservation {
  return readSourcePath(repo, sourcePath).observation;
}
export function assertSameFilesystem(before: PathObservation, after: PathObservation): void {
  if (!samePhysical(before.file, after.file) || before.sourceHash !== after.sourceHash
    || JSON.stringify(before.ancestors) !== JSON.stringify(after.ancestors)) environmentFail('FILESYSTEM_DRIFT');
  // mtime/ctime are informational. Restoring identical bytes on the same inode is allowed;
  // replacing a file with identical bytes between observations is not.
}
