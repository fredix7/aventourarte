import type { AuthorizationRequest, AuthorizedAction, EvidenceBinding, TechnicalOperation } from './authorization-contracts';
import type { SourceIdentity } from './contracts';
import type { PreparedFixResult } from './result-contracts';
import type { GuideSnapshot, ResolvedTargetRef, StructuralLocation } from './snapshot-contracts';
import type { StaticData } from './static-data';

export const FIXER_SCHEMA_VERSION = 1;
export const FIXER_PROMPT_VERSION = 'aventourarte-fixer-1';
export const FIXER_LIMITS = Object.freeze({ maxRequestBytes: 512 * 1024, maxContextBytes: 128 * 1024,
  maxFragmentBytes: 32 * 1024, maxResponseBytes: 512 * 1024, maxStderrBytes: 8192,
  maxDepth: 32, maxNodes: 32768, maxStringLength: 65536, maxArrayLength: 10000,
  maxObjectKeys: 128, maxOperations: 128, maxContextTargets: 128, maxTimeoutMs: 30000,
  maxTransportEvents: 256 });

// Host API only. This is never decoded from model output. Phase 4 remains the authority builder.
export interface CreateFixRequestInput {
  readonly snapshot: GuideSnapshot;
  readonly authorization: Omit<AuthorizationRequest, 'requestId' | 'nonce'>;
  readonly task: string;
  readonly contextTargets: readonly ResolvedTargetRef[];
  readonly editorialConstraints: readonly string[];
  readonly timeoutMs: number;
}
export interface FixCorrelation {
  readonly schemaVersion: typeof FIXER_SCHEMA_VERSION;
  readonly requestId: string; readonly nonce: string; readonly responseId: string;
  readonly guidePath: string; readonly sourceHash: string; readonly catalogHash: string;
  readonly snapshotId: string; readonly snapshotFingerprint: string;
  readonly targetFingerprint: string; readonly actionFingerprint: string;
  readonly evidenceFingerprint: string; readonly requestFingerprint: string;
}
export interface FixEvidenceReference { readonly evidenceId: string; readonly fingerprint: string }
export interface FixEvidence extends FixEvidenceReference { readonly binding: EvidenceBinding }
export interface FixFragment {
  readonly targetId: string; readonly location: StructuralLocation; readonly fingerprint: string;
  readonly text: string;
}
export interface FixRequest extends FixCorrelation {
  readonly promptVersion: typeof FIXER_PROMPT_VERSION;
  readonly sourceIdentity: SourceIdentity; readonly snapshotSchemaVersion: number;
  readonly task: string; readonly editorialConstraints: readonly string[];
  readonly actions: readonly AuthorizedAction[];
  readonly availableOperations: readonly TechnicalOperation[];
  readonly fragments: readonly FixFragment[]; readonly evidence: readonly FixEvidence[];
  readonly limits: typeof FIXER_LIMITS & { readonly timeoutMs: number };
}
// Structural parameters (property, placement, order, refs) come only from the host template.
// A model can select an action and propose its already permitted payload, nothing else.
export interface FixPlanOperation {
  readonly actionId: string; readonly operation: TechnicalOperation; readonly targetId: string;
  readonly evidence: readonly FixEvidenceReference[]; readonly value?: StaticData;
}
export interface FixPlan extends FixCorrelation {
  readonly operations: readonly FixPlanOperation[]; readonly unresolvedActionIds: readonly string[];
}
export interface FixerHandoff extends FixCorrelation {
  readonly sourceIdentity: SourceIdentity; readonly candidateHash: string;
  readonly operationIds: readonly string[];
  readonly sourceWrite: false; readonly writeAuthorized: false;
}
export const FIXER_ERROR_CODES = [
  'REQUEST_INVALID', 'REQUEST_LIMIT_EXCEEDED', 'REQUEST_CONTEXT_STALE', 'REQUEST_INACTIVE',
  'RUNTIME_NOT_ISOLATED', 'MODEL_UNAVAILABLE', 'TRANSPORT_INVALID', 'SESSION_MISMATCH',
  'TIMEOUT', 'OUTPUT_LIMIT_EXCEEDED', 'INFRASTRUCTURE_ERROR', 'UNEXPECTED_CLOSE',
  'TOOL_CALL_FORBIDDEN', 'DUPLICATE_RESPONSE', 'JSON_MALFORMED', 'PLAN_INVALID',
  'CORRELATION_MISMATCH', 'ACTION_NOT_AUTHORIZED', 'TARGET_NOT_AUTHORIZED',
  'OPERATION_NOT_ALLOWED', 'EVIDENCE_INVALID', 'ACTION_UNRESOLVED', 'PROPOSAL_REJECTED',
  'HANDOFF_INVALID'
] as const;
export type FixerErrorCode = typeof FIXER_ERROR_CODES[number];
export class FixerError extends Error {
  constructor(readonly code: FixerErrorCode) { super(`Factory Fixer: ${code}.`); this.name = 'FixerError'; }
}
export type FixerFailure = { readonly status: 'BLOCKED' | 'REJECTED' | 'FAILED';
  readonly code: FixerErrorCode; readonly requestId: string | null };
export type FixerLaunchResult = FixerFailure | { readonly status: 'PROPOSAL_VALID'; readonly handoff: FixerHandoff };
export type FixerPreparationResult = FixerFailure | { readonly status: 'PREPARED'; readonly preparedResult: PreparedFixResult };

// Inert scripted data, not a callback or a process/provider adapter. It cannot execute a model.
export type SimulatedFixerEvent =
  | { readonly type: 'stdout' | 'stderr'; readonly text: string; readonly delayMs: number }
  | { readonly type: 'exit'; readonly code: number; readonly delayMs: number }
  | { readonly type: 'close' | 'unavailable' | 'tool-call'; readonly delayMs: number };
export interface SimulatedFixerTransport { readonly kind: 'SIMULATED_ONLY' }
