import { spawnSync } from 'node:child_process';
import * as path from 'node:path';
import { realpathSync, statSync, accessSync, constants, lstatSync, openSync, fstatSync, readSync, closeSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { TextDecoder } from 'node:util';
import { createHash } from 'node:crypto';
import { freezeResult } from './result-contracts';
import { assertRepositoryIdentity, validateSourcePath, contained, hashBytes, readSourcePath } from './path-safety';
import { environmentFail, WorkspaceError, WORKSPACE_LIMITS, type RepositoryIdentity, type GitTargetState } from './workspace-contracts';

type Command = 'ROOT' | 'GITDIR' | 'HEAD' | 'CONFIG_SYSTEM_TEXT' | 'CONFIG_LOCAL' | 'CONFIG_WORKTREE' | 'INDEX' | 'FLAGS' | 'STATUS' | 'ATTRIBUTES' | 'INDEX_DIFF';
function argv(command: Command, sourcePath: string): readonly string[] {
  const literal = ':(literal)' + sourcePath;
  switch (command) {
    case 'ROOT': return ['rev-parse', '--show-toplevel'];
    case 'GITDIR': return ['rev-parse', '--absolute-git-dir'];
    case 'HEAD': return ['rev-parse', '--verify', 'HEAD'];
    // Read just the installed Git text-conversion default, without loading other system settings
    // or includes into any command's environment/configuration. This is not a config mutation.
    case 'CONFIG_SYSTEM_TEXT': return ['config', '--system', '--no-includes', '--null', '--get-regexp', '^core\\.autocrlf$'];
    case 'CONFIG_LOCAL': return ['config', '--local', '--no-includes', '--null', '--list'];
    case 'CONFIG_WORKTREE': return ['config', '--worktree', '--no-includes', '--null', '--get-regexp', '.'];
    case 'INDEX': return ['ls-files', '--stage', '-z'];
    case 'FLAGS': return ['ls-files', '-v', '-f', '-z', '--', literal];
    // Cached comparisons inspect objects/index only: no filesystem clean filters or helpers.
    case 'STATUS': return ['diff', '--cached', '--name-status', '-z', '--find-renames', '--no-ext-diff', '--no-textconv', '--ignore-submodules=all', '--'];
    case 'ATTRIBUTES': return ['check-attr', '-z', 'text', 'eol', 'ident', 'working-tree-encoding', 'filter', '--', sourcePath];
    case 'INDEX_DIFF': return ['diff', '--cached', '--quiet', '--exit-code', '--no-ext-diff', '--no-textconv', '--ignore-submodules=all', '--', literal];
  }
}
function gitEnvironment(): NodeJS.ProcessEnv {
  // PATH is host authority, not model/FixPlan input. No arbitrary caller executable/env/argv.
  const env: NodeJS.ProcessEnv = { PATH: process.env['PATH'] ?? process.env['Path'] ?? '',
    GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: process.platform === 'win32' ? 'NUL' : '/dev/null',
    GIT_TERMINAL_PROMPT: '0', GIT_OPTIONAL_LOCKS: '0', GIT_NO_LAZY_FETCH: '1', GIT_NO_REPLACE_OBJECTS: '1', LC_ALL: 'C', LANG: 'C',
    TEMP: tmpdir(), TMP: tmpdir() };
  for (const key of ['SystemRoot', 'WINDIR']) if (process.env[key]) env[key] = process.env[key];
  return env;
}
function gitExecutable(repo: RepositoryIdentity): string {
  // Resolve only absolute host PATH entries. Windows must not search the worktree for git.exe.
  for (const entry of (process.env['PATH'] ?? process.env['Path'] ?? '').split(path.delimiter)) {
    const directory = entry.replace(/^"(.*)"$/, '$1');
    if (!path.isAbsolute(directory)) continue;
    const candidate = path.resolve(directory, process.platform === 'win32' ? 'git.exe' : 'git');
    if (contained(repo.canonicalRoot, candidate)) continue;
    try {
      if (!statSync(candidate).isFile()) continue;
      accessSync(candidate, process.platform === 'win32' ? constants.F_OK : constants.X_OK);
      return candidate;
    } catch (error) {
      if (!['ENOENT', 'ENOTDIR', 'EACCES', 'EPERM'].includes((error as NodeJS.ErrnoException).code ?? '')) environmentFail('GIT_UNAVAILABLE');
    }
  }
  return environmentFail('GIT_UNAVAILABLE');
}
function run(repo: RepositoryIdentity, command: Command, sourcePath: string): { output: string; exit: number } {
  const result = spawnSync(gitExecutable(repo), ['--no-optional-locks', '-c', 'core.fsmonitor=false', '-c', 'core.untrackedCache=false',
    '-c', 'core.hooksPath=/dev/null', ...argv(command, sourcePath)], {
    cwd: repo.canonicalRoot, shell: false, windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'], env: gitEnvironment(), timeout: WORKSPACE_LIMITS.gitTimeoutMs,
    maxBuffer: WORKSPACE_LIMITS.maxGitOutputBytes, encoding: 'buffer' });
  if (result.error) {
    const code = (result.error as NodeJS.ErrnoException).code;
    environmentFail(code === 'ENOENT' ? 'GIT_UNAVAILABLE' : code === 'ETIMEDOUT' ? 'GIT_TIMEOUT'
      : code === 'ENOBUFS' ? 'GIT_OUTPUT_LIMIT' : 'GIT_INSPECTION_FAILED');
  }
  if (result.stdout.length > WORKSPACE_LIMITS.maxGitOutputBytes || result.stderr.length > WORKSPACE_LIMITS.maxGitOutputBytes) environmentFail('GIT_OUTPUT_LIMIT');
  if (result.signal !== null || result.status === null) environmentFail('GIT_INSPECTION_FAILED');
  const expectedExit = result.status === 1 && (command === 'INDEX_DIFF'
    // An optional config.worktree with no keys returns 1 without stdout/stderr.
    || (['CONFIG_WORKTREE', 'CONFIG_SYSTEM_TEXT'].includes(command) && !result.stdout.length && !result.stderr.length));
  if (result.status !== 0 && !expectedExit) {
    // Diagnostics never contain raw/localized stderr. A rejected/unborn repository is a controlled block.
    environmentFail(command === 'ROOT' || command === 'HEAD' ? 'REPO_INVALID' : 'GIT_INSPECTION_FAILED');
  }
  let output: string;
  try { output = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(result.stdout); }
  catch { environmentFail('GIT_OUTPUT_INVALID'); }
  return { output: output!, exit: result.status };
}
function nulRecords(text: string): string[] {
  if (text === '') return [];
  if (!text.endsWith('\0')) environmentFail('GIT_OUTPUT_INVALID');
  return text.slice(0, -1).split('\0');
}
function configSafe(text: string): { worktreeConfig: boolean; values: Record<string, string> } {
  let worktreeConfig = false;
  const values: Record<string, string> = Object.create(null);
  for (const record of nulRecords(text)) {
    const newline = record.indexOf('\n'), key = (newline === -1 ? record : record.slice(0, newline)).toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]*\.(?:[^\n]*\.)?[a-z][a-z0-9-]*$/.test(key)) environmentFail('GIT_OUTPUT_INVALID');
    if (/^(?:filter\.|include\.|includeif\.|extensions\.partialclone$|remote\..*\.(?:promisor|partialclonefilter)$)/.test(key)) environmentFail('GIT_CONFIG_UNSAFE');
    values[key] = newline === -1 ? 'true' : record.slice(newline + 1);
    if (key === 'extensions.worktreeconfig') {
      const value = newline === -1 ? '' : record.slice(newline + 1).toLowerCase();
      if (['', 'true', 'yes', 'on', '1'].includes(value)) worktreeConfig = true;
      else if (['false', 'no', 'off', '0'].includes(value)) worktreeConfig = false;
      else environmentFail('GIT_CONFIG_UNSAFE');
    }
  }
  return { worktreeConfig, values };
}
export function parseGitCachedChanges(text: string): readonly { readonly status: string; readonly path: string; readonly original: string | null }[] {
  const records = nulRecords(text), entries: { status: string; path: string; original: string | null }[] = [];
  for (let i = 0; i < records.length; i++) {
    const status = records[i];
    if (!/^(?:[ADMTU]|[RC](?:100|0?[0-9]{1,2}))$/.test(status)) environmentFail('GIT_OUTPUT_INVALID');
    const first = records[++i]; if (!first) environmentFail('GIT_OUTPUT_INVALID');
    const renamed = /^[RC]/.test(status), second = renamed ? records[++i] : first;
    if (!second) environmentFail('GIT_OUTPUT_INVALID');
    entries.push({ status, path: second!, original: renamed ? first : null });
  }
  return freezeResult(entries);
}
function attributes(text: string, sourcePath: string): Record<string, string> {
  const names = ['text', 'eol', 'ident', 'working-tree-encoding', 'filter'], records = nulRecords(text);
  if (records.length !== names.length * 3) environmentFail('GIT_OUTPUT_INVALID');
  const result: Record<string, string> = Object.create(null);
  for (let i = 0; i < names.length; i++) {
    if (records[i * 3] !== sourcePath || records[i * 3 + 1] !== names[i] || !records[i * 3 + 2]) environmentFail('GIT_OUTPUT_INVALID');
    result[names[i]] = records[i * 3 + 2];
  }
  return result;
}
function blobOid(bytes: Buffer, oid: string): string {
  return createHash(oid.length === 40 ? 'sha1' : 'sha256').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
}
function indexFileHash(gitDirectory: string): string {
  const filename = path.join(gitDirectory, 'index'); let descriptor: number | undefined;
  try {
    const named = lstatSync(filename, { bigint: true });
    if (!named.isFile() || named.isSymbolicLink() || named.ino === 0n) environmentFail('REPO_INVALID');
    descriptor = openSync(filename, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0) | (constants.O_NONBLOCK ?? 0));
    const opened = fstatSync(descriptor, { bigint: true });
    const same = (a: typeof named, b: typeof named) => a.isFile() && b.isFile() && a.dev === b.dev && a.ino === b.ino && a.size === b.size;
    if (!same(named, opened)) environmentFail('GIT_STATE_DRIFT');
    if (opened.size > BigInt(WORKSPACE_LIMITS.maxGitOutputBytes)) environmentFail('GIT_OUTPUT_LIMIT');
    const buffer = Buffer.alloc(WORKSPACE_LIMITS.maxGitOutputBytes + 1); let size = 0;
    while (size < buffer.length) {
      const count = readSync(descriptor, buffer, size, buffer.length - size, null);
      if (!count) break; size += count;
    }
    if (size > WORKSPACE_LIMITS.maxGitOutputBytes) environmentFail('GIT_OUTPUT_LIMIT');
    if (!same(opened, fstatSync(descriptor, { bigint: true })) || !same(opened, lstatSync(filename, { bigint: true }))
      || opened.size !== BigInt(size)) environmentFail('GIT_STATE_DRIFT');
    return hashBytes(buffer.subarray(0, size));
  } catch (error) {
    if (error instanceof WorkspaceError) throw error;
    if (['ENOENT', 'ENOTDIR', 'ELOOP'].includes((error as NodeJS.ErrnoException).code ?? '')) environmentFail('GIT_STATE_DRIFT');
    return environmentFail('FILESYSTEM_INSPECTION_FAILED');
  } finally {
    if (descriptor !== undefined) {
      try { closeSync(descriptor); } catch { environmentFail('FILESYSTEM_INSPECTION_FAILED'); }
    }
  }
}
function booleanSetting(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  if (['true', 'yes', 'on', '1', ''].includes(value.trim().toLowerCase())) return true;
  if (['false', 'no', 'off', '0'].includes(value.trim().toLowerCase())) return false;
  return environmentFail('GIT_CONFIG_UNSAFE');
}
function cleanBytes(bytes: Buffer, oid: string, config: Record<string, string>, attrs: Record<string, string>): boolean {
  // Only the builtin text/EOL conversion is supported. Never run filters,
  // ident or encoding helpers. Unsupported transformations fail closed instead of guessing.
  if (!['unspecified', 'unset'].includes(attrs['ident']) || !['unspecified', 'unset'].includes(attrs['working-tree-encoding'])) environmentFail('GIT_CONFIG_UNSAFE');
  if (blobOid(bytes, oid) === oid) return true;
  const text = attrs['text'], eol = attrs['eol'], autocrlf = config['core.autocrlf']?.trim().toLowerCase();
  const auto = text === 'auto' || (text === 'unspecified' && (autocrlf === 'input' || booleanSetting(autocrlf, false)));
  const convert = text !== 'unset' && (text === 'set' || text === 'auto' || eol === 'lf' || eol === 'crlf' || auto);
  if (!convert) return false;
  const raw = bytes.toString('latin1');
  if (auto && /\r(?!\n)|[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(raw)) return false;
  return blobOid(Buffer.from(raw.replace(/\r\n/g, '\n'), 'latin1'), oid) === oid;
}
export interface GitIndexEntry { readonly mode: string; readonly oid: string; readonly stage: number; readonly path: string }
// Pure stable-format parsers; not generic command execution APIs.
export function parseGitIndex(text: string): readonly GitIndexEntry[] {
  return freezeResult(nulRecords(text).map(record => {
    const match = /^([0-7]{6}) ([a-f0-9]{40}|[a-f0-9]{64}) ([0-3])\t([\s\S]+)$/.exec(record);
    if (!match) environmentFail('GIT_OUTPUT_INVALID');
    return { mode: match![1], oid: match![2], stage: Number(match![3]), path: match![4] };
  }));
}
interface StatusEntry { readonly xy: string; readonly path: string; readonly original: string | null; readonly conflict: boolean }
export function parseGitStatus(text: string): readonly StatusEntry[] {
  const records = nulRecords(text), entries: StatusEntry[] = [];
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    if (record.startsWith('1 ')) {
      const m = /^1 ([.MADRCUT]{2}) (N\.\.\.|S[.C][.M][.U]) ([0-7]{6}) ([0-7]{6}) ([0-7]{6}) ([a-f0-9]{40}|[a-f0-9]{64}) ([a-f0-9]{40}|[a-f0-9]{64}) ([\s\S]+)$/.exec(record);
      if (!m) environmentFail('GIT_OUTPUT_INVALID'); entries.push({ xy: m![1], path: m![8], original: null, conflict: false });
    } else if (record.startsWith('2 ')) {
      const m = /^2 ([.MADRCUT]{2}) (N\.\.\.|S[.C][.M][.U]) ([0-7]{6}) ([0-7]{6}) ([0-7]{6}) ([a-f0-9]{40}|[a-f0-9]{64}) ([a-f0-9]{40}|[a-f0-9]{64}) [RC](?:100|0?[0-9]{1,2}) ([\s\S]+)$/.exec(record);
      const original = records[++i]; if (!m || !original) environmentFail('GIT_OUTPUT_INVALID');
      entries.push({ xy: m![1], path: m![8], original, conflict: false });
    } else if (record.startsWith('u ')) {
      const m = /^u ([.MADRCUT]{2}) (N\.\.\.|S[.C][.M][.U]) ([0-7]{6} ){4}((?:[a-f0-9]{40}|[a-f0-9]{64}) ){3}([\s\S]+)$/.exec(record);
      if (!m) environmentFail('GIT_OUTPUT_INVALID'); entries.push({ xy: m![1], path: m![5], original: null, conflict: true });
    } else environmentFail('GIT_OUTPUT_INVALID');
  }
  return freezeResult(entries);
}
export function inspectGitTargetState(repo: RepositoryIdentity, sourcePath: string): GitTargetState {
  assertRepositoryIdentity(repo); validateSourcePath(sourcePath);
  const rootText = run(repo, 'ROOT', sourcePath).output.replace(/\r?\n$/, '');
  if (!path.isAbsolute(rootText) || rootText.length > WORKSPACE_LIMITS.maxPathLength || /[\x00-\x1f\x7f]/.test(rootText)) environmentFail('GIT_OUTPUT_INVALID');
  let top: string;
  try { top = realpathSync.native(path.resolve(rootText)); } catch { environmentFail('REPO_INVALID'); }
  if (top! !== repo.canonicalRoot) environmentFail('REPO_IDENTITY_MISMATCH');
  const local = configSafe(run(repo, 'CONFIG_LOCAL', sourcePath).output);
  const installedText = configSafe(run(repo, 'CONFIG_SYSTEM_TEXT', sourcePath).output).values;
  if (Object.keys(installedText).some(key => key !== 'core.autocrlf')) environmentFail('GIT_OUTPUT_INVALID');
  const config = { ...installedText, ...local.values, ...(local.worktreeConfig ? configSafe(run(repo, 'CONFIG_WORKTREE', sourcePath).output).values : {}) };
  const gitDirectory = run(repo, 'GITDIR', sourcePath).output.replace(/\r?\n$/, '');
  const headOid = run(repo, 'HEAD', sourcePath).output.replace(/\r?\n$/, '');
  if (!/^([a-f0-9]{40}|[a-f0-9]{64})$/.test(headOid) || !path.isAbsolute(gitDirectory)
    || gitDirectory.length > WORKSPACE_LIMITS.maxPathLength || /[\x00-\x1f\x7f]/.test(gitDirectory)) environmentFail('GIT_OUTPUT_INVALID');
  const indexOutput = run(repo, 'INDEX', sourcePath).output, index = parseGitIndex(indexOutput);
  if (index.some(e => e.mode === '160000' && sourcePath.startsWith(e.path + '/'))) environmentFail('TARGET_TYPE_CHANGED');
  if (index.some(e => e.path !== sourcePath && e.path.toLowerCase() === sourcePath.toLowerCase())) environmentFail('PATH_IDENTITY_MISMATCH');
  const matching = index.filter(e => e.path === sourcePath);
  if (matching.some(e => e.stage !== 0)) environmentFail('TARGET_CONFLICT');
  // Cached rename/copy records contain both original and destination paths.
  const statuses = parseGitCachedChanges(run(repo, 'STATUS', sourcePath).output)
    .filter(e => e.path === sourcePath || e.original === sourcePath);
  if (statuses.some(e => e.status === 'U')) environmentFail('TARGET_CONFLICT');
  if (statuses.some(e => e.original !== null)) environmentFail('TARGET_RENAMED');
  if (statuses.some(e => e.status === 'T')) environmentFail('TARGET_TYPE_CHANGED');
  if (statuses.some(e => e.status === 'D')) environmentFail('TARGET_DELETED');
  if (!matching.length) {
    if (index.some(e => e.path.toLowerCase() === sourcePath.toLowerCase())) environmentFail('PATH_IDENTITY_MISMATCH');
    environmentFail('TARGET_UNTRACKED');
  }
  if (matching.length !== 1) environmentFail('GIT_OUTPUT_INVALID');
  const entry = matching[0];
  if (entry.mode !== '100644' && entry.mode !== '100755') environmentFail('TARGET_TYPE_CHANGED');
  const indexHash = indexFileHash(gitDirectory);
  const flags = nulRecords(run(repo, 'FLAGS', sourcePath).output);
  if (flags.some(record => !/^[HSMRCK?hsmrck] [\s\S]+$/.test(record))) environmentFail('GIT_OUTPUT_INVALID');
  if (flags.length !== 1 || flags[0] !== 'H ' + sourcePath) environmentFail('INDEX_FLAGS_UNSAFE');
  if (statuses.length || run(repo, 'INDEX_DIFF', sourcePath).exit === 1) environmentFail('TARGET_DIRTY_INDEX');
  const attrs = attributes(run(repo, 'ATTRIBUTES', sourcePath).output, sourcePath), source = readSourcePath(repo, sourcePath);
  if ((booleanSetting(config['core.filemode'], process.platform !== 'win32')
    && ((BigInt(source.observation.file.mode) & 0o100n) !== 0n) !== (entry.mode === '100755'))
    || !cleanBytes(source.bytes, entry.oid, config, attrs)) environmentFail('TARGET_DIRTY_WORKTREE');
  if (indexFileHash(gitDirectory) !== indexHash) environmentFail('GIT_STATE_DRIFT');
  return freezeResult({ state: 'TRACKED_CLEAN', repository: repo, gitDirectory, headOid, sourcePath,
    indexMode: entry.mode, indexOid: entry.oid, indexFlags: 'H', indexStateDigest: hashBytes(JSON.stringify([indexOutput, indexHash])),
    conversionDigest: hashBytes(JSON.stringify([config['core.autocrlf'] ?? null, config['core.filemode'] ?? null, attrs])) });
}
