import type { SourceIdentity } from './contracts';
import type { PreparedFixResult, RequiredQaHandoff, ChangedTarget } from './result-contracts';
import type { FileIdentity, LockReleaseResult, PreparedWriteLease } from './workspace-contracts';

export interface PersistPreparedFixInput {
  readonly repoRoot: string;
  readonly preparedResult: PreparedFixResult;
  readonly lease: PreparedWriteLease;
}
export type RecoveryStatus = 'NOT_NEEDED' | 'RESTORED' | 'UNSAFE' | 'FAILED' | 'UNKNOWN';
export const PERSISTENCE_ERROR_CODES = [
  'WRITER_INPUT_INVALID', 'NO_CHANGE_NOT_WRITABLE', 'LEASE_INVALID', 'STAGING_FAILED', 'STAGING_HASH_MISMATCH',
  'BACKUP_FAILED', 'REVALIDATION_FAILED', 'LOCK_OWNERSHIP_LOST', 'SOURCE_DRIFT', 'REPLACE_FAILED',
  'READBACK_FAILED', 'READBACK_HASH_MISMATCH', 'RECOVERY_UNSAFE', 'RECOVERY_FAILED', 'RECOVERY_UNKNOWN',
  'CLEANUP_FAILED', 'LOCK_RELEASE_FAILED'
] as const;
export type PersistenceErrorCode = typeof PERSISTENCE_ERROR_CODES[number];
export interface PersistenceDiagnostic {
  readonly code: PersistenceErrorCode; readonly stage: string; readonly cause: string | null;
  readonly message: string;
}
export interface PersistenceResult {
  readonly schemaVersion: 1; readonly status: 'APPLIED' | 'BLOCKED' | 'FAILED';
  readonly requestId: string | null; readonly requestDigest: string | null; readonly guidePath: string | null;
  readonly sourceHash: string | null; readonly candidateHash: string | null; readonly readbackHash: string | null;
  readonly sourceIdentity: SourceIdentity | null; readonly fileIdentity: FileIdentity | null;
  readonly replaceCompleted: boolean; readonly persistenceVerified: boolean;
  readonly persistedOperationIds: readonly string[]; readonly changedTargets: readonly ChangedTarget[];
  readonly recovery: { readonly status: RecoveryStatus; readonly readbackHash: string | null;
    readonly artifactsRetained: boolean; readonly reference: string | null };
  readonly cleanup: 'COMPLETE' | 'RETAINED' | 'FAILED'; readonly lockRelease: LockReleaseResult | null;
  readonly diagnostics: readonly PersistenceDiagnostic[];
  readonly qaHandoff: RequiredQaHandoff | null;
  // fsync of complete staging/backup is required. Node rename is a single replacement attempt,
  // not compare-and-swap, a journal, an ACL copier or a Windows directory-flush primitive.
  readonly guarantees: { readonly fileDataFlushedBeforeReplace: boolean; readonly directoryDurability: 'NOT_GUARANTEED';
    readonly atomicity: 'SINGLE_RENAME_NO_ABSOLUTE_GUARANTEE'; readonly toctouEliminated: false };
}
