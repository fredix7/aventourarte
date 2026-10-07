import type { SourceIdentity } from './contracts';
import type { PreparedFixResult } from './result-contracts';
import { freezeResult } from './result-contracts';

export const WORKSPACE_LIMITS = Object.freeze({ gitTimeoutMs: 10000, maxGitOutputBytes: 2 * 1024 * 1024,
  maxPathLength: 4096, maxLockBytes: 1024, maxDiagnostics: 8, maxDiagnosticText: 256 });
export const WORKSPACE_ERROR_CODES = [
  'READINESS_INPUT_INVALID', 'REPO_INVALID', 'REPO_IDENTITY_MISMATCH', 'GIT_UNAVAILABLE', 'GIT_INSPECTION_FAILED',
  'GIT_OUTPUT_INVALID', 'GIT_TIMEOUT', 'GIT_OUTPUT_LIMIT', 'GIT_CONFIG_UNSAFE', 'GIT_STATE_DRIFT',
  'TARGET_UNTRACKED', 'TARGET_DIRTY_WORKTREE', 'TARGET_DIRTY_INDEX', 'TARGET_CONFLICT', 'TARGET_RENAMED',
  'TARGET_DELETED', 'TARGET_TYPE_CHANGED', 'INDEX_FLAGS_UNSAFE', 'PATH_UNSAFE', 'PATH_IDENTITY_MISMATCH',
  'SYMLINK_UNSAFE', 'REPARSE_UNSAFE', 'HARDLINK_UNSAFE', 'FILE_IDENTITY_UNAVAILABLE', 'FILESYSTEM_INSPECTION_FAILED',
  'LOCK_CONTENDED', 'LOCK_INVALID', 'LOCK_ACQUISITION_FAILED', 'LOCK_RELEASE_FAILED',
  'WRITE_PRECONDITION_FAILED', 'FILESYSTEM_DRIFT', 'CATALOG_STALE'
] as const;
export type WorkspaceErrorCode = typeof WORKSPACE_ERROR_CODES[number];
const technicalFailures: readonly WorkspaceErrorCode[] = ['GIT_UNAVAILABLE', 'GIT_INSPECTION_FAILED', 'GIT_OUTPUT_INVALID',
  'GIT_TIMEOUT', 'GIT_OUTPUT_LIMIT', 'FILESYSTEM_INSPECTION_FAILED', 'LOCK_ACQUISITION_FAILED', 'LOCK_RELEASE_FAILED'];
export const WORKSPACE_CLASSIFICATION: Readonly<Record<WorkspaceErrorCode, 'BLOCKED' | 'FAILED'>> = freezeResult(
  Object.fromEntries(WORKSPACE_ERROR_CODES.map(code => [code, technicalFailures.includes(code) ? 'FAILED' : 'BLOCKED'])) as Record<WorkspaceErrorCode, 'BLOCKED' | 'FAILED'>);
export class WorkspaceError extends Error {
  constructor(readonly code: WorkspaceErrorCode) { super(`Factory environment: ${code}.`); this.name = 'WorkspaceError'; }
}
export function environmentFail(code: WorkspaceErrorCode): never { throw new WorkspaceError(code); }
export interface FileIdentity { readonly absolutePath: string; readonly realPath: string; readonly dev: string;
  readonly ino: string; readonly nlink: string; readonly mode: string; readonly size: string; readonly mtimeNs: string; readonly ctimeNs: string }
export interface RepositoryIdentity { readonly canonicalRoot: string; readonly dev: string; readonly ino: string; readonly digest: string }
export interface PathObservation { readonly file: FileIdentity; readonly sourceHash: string;
  readonly ancestors: readonly { readonly absolutePath: string; readonly realPath: string; readonly dev: string; readonly ino: string }[] }
export interface GitTargetState { readonly state: 'TRACKED_CLEAN'; readonly repository: RepositoryIdentity;
  readonly gitDirectory: string; readonly headOid: string; readonly sourcePath: string;
  readonly indexMode: '100644' | '100755'; readonly indexOid: string; readonly indexFlags: 'H'; readonly indexStateDigest: string;
  readonly conversionDigest: string }
export interface WritePreconditionSnapshot { readonly sourceIdentity: SourceIdentity;
  readonly git: GitTargetState; readonly filesystem: PathObservation }
export interface WriteReadinessReport {
  readonly schemaVersion: 1; readonly status: 'WRITE_READY'; readonly requestId: string; readonly requestDigest: string;
  readonly candidateHash: string; readonly sourceHash: string; readonly guidePath: string; readonly sourcePath: string;
  readonly repository: RepositoryIdentity; readonly preconditions: WritePreconditionSnapshot;
  readonly diagnostics: { readonly lock: 'COOPERATIVE_HELD'; readonly sourceWrite: false;
    readonly candidatePersisted: false; readonly qaExecuted: false; readonly revalidateBeforeReplace: true;
    readonly toctouEliminated: false }
}
export interface WriteReadinessFailure { readonly schemaVersion: 1; readonly status: 'BLOCKED' | 'FAILED';
  readonly requestId: string | null; readonly requestDigest: string | null;
  readonly diagnostics: readonly { readonly code: string; readonly stage: string; readonly message: string }[] }
export type ReadyPreparedResult = Extract<PreparedFixResult, { status: 'READY_TO_WRITE' }>;
// Opaque runtime types; brands/capabilities reside in private WeakMaps, never in durable JSON.
declare const lockBrand: unique symbol;
export interface SourceLockHandle { readonly [lockBrand]: true }
declare const leaseBrand: unique symbol;
export interface PreparedWriteLease { readonly [leaseBrand]: true }
export type WriteReadinessResult = { readonly report: WriteReadinessReport; readonly lease: PreparedWriteLease }
  | { readonly report: WriteReadinessFailure; readonly lease?: never };
export type LockReleaseResult = { readonly status: 'RELEASED' | 'ALREADY_RELEASED' }
  | { readonly status: 'BLOCKED' | 'FAILED'; readonly code: WorkspaceErrorCode };
