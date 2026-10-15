import type { SourceIdentity } from './contracts';
import type { FixerLaunchResult, FixerPreparationResult, FixRequest } from './fixer-contracts';
import type { RequiredQaHandoff } from './result-contracts';
import type { GuideSnapshot } from './snapshot-contracts';
import type { LockReleaseResult, WriteReadinessFailure, WriteReadinessReport } from './workspace-contracts';
import type { PersistenceResult } from './writer-contracts';

declare const sessionBrand: unique symbol;
export interface TrustedFixSession { readonly [sessionBrand]: true }
declare const workspaceBrand: unique symbol;
// Authority is private process-local provenance, never these observable paths or a JSON brand.
export interface SyntheticExecutionWorkspace {
  readonly [workspaceBrand]: true; readonly root: string; readonly repoRoot: string;
}
export interface TrustedFixContext {
  readonly session: TrustedFixSession; readonly sourceIdentity: SourceIdentity; readonly snapshot: GuideSnapshot;
}
export type ExecutionStage = 'SOURCE_IDENTITY' | 'SNAPSHOT' | 'FIX_REQUEST' | 'TARGETS'
  | 'FIXER' | 'PREPARATION' | 'WRITE_READINESS' | 'WRITER' | 'INDEPENDENT_READBACK' | 'QA_HANDOFF';
export interface ExecutionObservation { readonly stage: ExecutionStage; readonly status: string; readonly code: string | null }
export const EXECUTION_ERROR_CODES = ['EXECUTION_INPUT_INVALID', 'SESSION_INVALID', 'SESSION_INACTIVE',
  'SESSION_BINDING_MISMATCH', 'SYNTHETIC_SCOPE_REQUIRED', 'EXECUTION_CANCELLED', 'INDEPENDENT_READBACK_FAILED',
  'QA_HANDOFF_INCONSISTENT', 'INFRASTRUCTURE_ERROR'] as const;
export type ExecutionErrorCode = typeof EXECUTION_ERROR_CODES[number];
export class ExecutionError extends Error {
  constructor(readonly code: ExecutionErrorCode) { super(`Factory execution: ${code}.`); this.name = 'ExecutionError'; }
}
export type IndependentReadback = { readonly status: 'VERIFIED'; readonly sourceIdentity: SourceIdentity;
  readonly readbackHash: string } | { readonly status: 'FAILED'; readonly code: 'INDEPENDENT_READBACK_FAILED' };
// Host-only data for a later QA invocation; neither acceptance nor execution of QA.
export interface PersistedQaHandoff {
  readonly status: 'READY_FOR_QA'; readonly requestId: string; readonly requestDigest: string;
  readonly sourceIdentity: SourceIdentity; readonly originalSourceHash: string; readonly candidateHash: string;
  readonly readbackHash: string; readonly persistedOperationIds: readonly string[];
  readonly review: RequiredQaHandoff; readonly qaExecuted: false;
}
export interface TrustedFixExecutionResult {
  readonly schemaVersion: 1; readonly mode: 'SYNTHETIC_TEMP_ONLY';
  readonly status: 'APPLIED' | 'NO_CHANGE' | 'BLOCKED' | 'FAILED'; readonly code: string | null;
  readonly operational: false; readonly runtimeStatus: 'RUNTIME_NOT_ISOLATED';
  readonly e2eVerification: 'VERIFIED' | 'NOT_VERIFIED';
  readonly requestId: string | null; readonly sourceIdentity: SourceIdentity | null; readonly snapshotId: string | null;
  readonly observations: readonly ExecutionObservation[];
  readonly fixer: FixerLaunchResult | null; readonly preparation: FixerPreparationResult | null;
  readonly readiness: WriteReadinessReport | WriteReadinessFailure | null;
  readonly persistence: PersistenceResult | null; readonly independentReadback: IndependentReadback | null;
  readonly lockRelease: LockReleaseResult | null; readonly qaHandoff: PersistedQaHandoff | null;
}
export type SessionRequestInput = Omit<import('./fixer-contracts').CreateFixRequestInput, 'snapshot'>
  & { readonly session: TrustedFixSession };
export interface RunSyntheticFixInput {
  readonly session: TrustedFixSession; readonly request: FixRequest;
  readonly transport: import('./fixer-contracts').SimulatedFixerTransport | null;
}
