import { SourceIdentityError, type SourceIdentityErrorCode } from './errors';
import { RESULT_LIMITS, PREPARED_RESULT_SCHEMA_VERSION, freezeResult,
  type PreparedFixResult, type ResultDiagnostic, type ResultCorrelation, type ResultStage } from './result-contracts';
import { assertGuideSnapshot } from './snapshot';
import type { GuideSnapshot, ResolvedTargetRef } from './snapshot-contracts';
import { verifyResolvedTarget } from './target-locator';

interface Classification { readonly status: 'BLOCKED' | 'FAILED'; readonly stage: ResultStage;
  readonly category: ResultDiagnostic['category'] }
const blocked = (stage: ResultStage, category: ResultDiagnostic['category'] = 'CONTROLLED_INPUT'): Classification =>
  Object.freeze({ status: 'BLOCKED', stage, category });
const failed = (stage: ResultStage, category: ResultDiagnostic['category'] = 'INVARIANT'): Classification =>
  Object.freeze({ status: 'FAILED', stage, category });
// Exhaustive: unsupported forms and budgets are controlled blocks, not broken infrastructure.
// Stage describes the code's origin, never claims that previous pipeline stages completed.
export const ERROR_CLASSIFICATION = Object.freeze({
  INVALID_INPUT: blocked('IDENTITY'), GUIDE_NOT_FOUND: blocked('IDENTITY'),
  DUPLICATE_GUIDE_PATH: blocked('IDENTITY'), CATALOG_NOT_FOUND: blocked('IDENTITY'),
  CATALOG_UNSUPPORTED: blocked('IDENTITY'), CATALOG_IMPORT_MISSING: blocked('IDENTITY'),
  CATALOG_IMPORT_AMBIGUOUS: blocked('IDENTITY'), IMPORT_PATH_UNSAFE: blocked('IDENTITY'),
  SOURCE_NOT_FOUND: blocked('IDENTITY'), SOURCE_UNSUPPORTED: blocked('IDENTITY'),
  EXPORT_NOT_FOUND: blocked('IDENTITY'), EXPORT_AMBIGUOUS: blocked('IDENTITY'),
  PATH_NOT_STATIC: blocked('IDENTITY'), PATH_MISMATCH: blocked('IDENTITY'),
  RULESET_UNSUPPORTED: blocked('IDENTITY'), READ_FAILED: failed('IDENTITY', 'INFRASTRUCTURE'),
  SOURCE_STALE: blocked('SNAPSHOT', 'PRECONDITION'), GUIDE_ROOT_UNSUPPORTED: blocked('SNAPSHOT'),
  STATIC_VALUE_UNSUPPORTED: blocked('SNAPSHOT'), TARGET_NOT_FOUND: blocked('SNAPSHOT'),
  TARGET_AMBIGUOUS: blocked('SNAPSHOT'), TARGET_KIND_MISMATCH: blocked('SNAPSHOT'),
  TARGET_STALE: blocked('SNAPSHOT', 'PRECONDITION'), DUPLICATE_TARGET_REF: failed('SNAPSHOT'),
  SNAPSHOT_INVALID: blocked('SNAPSHOT'), LOCATOR_INVALID: blocked('SNAPSHOT'),
  SNAPSHOT_LIMIT_EXCEEDED: blocked('SNAPSHOT'), OPERATION_INVALID: blocked('CANDIDATE'),
  OPERATION_CONFLICT: blocked('CANDIDATE'), OPERATION_UNSUPPORTED: blocked('CANDIDATE'),
  TARGET_PROTECTED: blocked('CANDIDATE', 'POLICY'), PROPERTY_ALREADY_EXISTS: blocked('CANDIDATE', 'PRECONDITION'),
  ANCHOR_STALE: blocked('CANDIDATE', 'PRECONDITION'), COMMENT_TRIVIA_AMBIGUOUS: blocked('CANDIDATE', 'POLICY'),
  VALUE_UNSUPPORTED: blocked('CANDIDATE'), SERIALIZATION_FAILED: failed('CANDIDATE'),
  // Distinct ADDs can require the same source gap. This is an expected input conflict.
  EDIT_OVERLAP: blocked('CANDIDATE'), EDIT_INVALID: failed('CANDIDATE'),
  // These are host-built candidate/attribution invariants in this high-level pipeline.
  CANDIDATE_INVALID: failed('CANDIDATE'), CANDIDATE_STRUCTURE_MISMATCH: failed('CANDIDATE'),
  CANDIDATE_LIMIT_EXCEEDED: blocked('CANDIDATE'), AUTHORIZATION_INVALID: blocked('AUTHORIZATION'),
  AUTHORIZATION_LIMIT_EXCEEDED: blocked('AUTHORIZATION'), UNAUTHORIZED_ACTION: blocked('AUTHORIZATION', 'POLICY'),
  SCOPE_VIOLATION: blocked('AUTHORIZATION', 'POLICY'), ACTION_REQUIRED_MISSING: blocked('AUTHORIZATION', 'POLICY'),
  ACTION_BINDING_MISMATCH: blocked('AUTHORIZATION', 'POLICY'), PRECONDITION_FAILED: blocked('AUTHORIZATION', 'PRECONDITION'),
  EVIDENCE_REQUIRED: blocked('AUTHORIZATION', 'POLICY'), EVIDENCE_UNKNOWN: blocked('AUTHORIZATION', 'POLICY'),
  EVIDENCE_NOT_ALLOWED: blocked('AUTHORIZATION', 'POLICY'), PARTIAL_UNSUPPORTED: blocked('AUTHORIZATION', 'POLICY'),
  ACTIVE_CONFLICT: blocked('ACTIVE_VALIDATION', 'POLICY'), MINIMAL_DIFF_VIOLATION: failed('MINIMAL_DIFF'),
  DIFF_UNATTRIBUTED: failed('MINIMAL_DIFF'), REQUEST_DIGEST_MISMATCH: blocked('AUTHORIZATION', 'PRECONDITION'),
  ACTION_DEPENDENCY_MISSING: blocked('AUTHORIZATION', 'POLICY')
} satisfies Record<SourceIdentityErrorCode, Classification>);
export const PREPARED_ERROR_CODES = ['RESULT_INCONSISTENT', 'RESULT_LIMIT_EXCEEDED', 'QA_HANDOFF_INCONSISTENT'] as const;
export type PreparedErrorCode = typeof PREPARED_ERROR_CODES[number];
export class PreparedResultError extends Error {
  constructor(readonly code: PreparedErrorCode, readonly actionId: string | null = null,
    readonly operationId: string | null = null, readonly target: ResolvedTargetRef | null = null) {
    super(`Factory prepared result: ${code}.`); this.name = 'PreparedResultError';
  }
}
export function classifyFixError(error: unknown): Classification & { readonly code: string } {
  if (error instanceof SourceIdentityError && Object.hasOwn(ERROR_CLASSIFICATION, error.code)) {
    return Object.freeze({ ...ERROR_CLASSIFICATION[error.code], code: error.code });
  }
  if (error instanceof PreparedResultError && PREPARED_ERROR_CODES.includes(error.code)) {
    return Object.freeze({ ...failed(error.code === 'QA_HANDOFF_INCONSISTENT' ? 'QA_HANDOFF' : 'RESULT_CONSISTENCY'), code: error.code });
  }
  // TypeError, unknown infrastructure and programmer exceptions remain visible; no catch-all FAILED.
  throw error;
}
function correlationText(value: unknown, hash = false): string | null {
  return typeof value === 'string' && (hash ? /^[a-f0-9]{64}(?![\s\S])/.test(value)
    : /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}(?![\s\S])/.test(value)) ? value : null;
}
// Failure-only adapter also accommodates classified failures before a manifest exists (e.g. partial).
// Correlation strings never confer authority; identity/ref observations require a branded snapshot.
export function buildFixFailure(error: unknown, input: { readonly snapshot?: GuideSnapshot;
  readonly requestId?: string; readonly requestDigest?: string; readonly nonce?: string | null } = {}): PreparedFixResult {
  const classification = classifyFixError(error);
  const descriptors = Object.getOwnPropertyDescriptors(input);
  if (Object.getOwnPropertySymbols(input).length || Object.values(descriptors).some(d => !('value' in d))) {
    throw new TypeError('Invalid failure correlation.');
  }
  const snapshot = descriptors['snapshot']?.value as GuideSnapshot | undefined;
  if (snapshot !== undefined) assertGuideSnapshot(snapshot);
  const correlation: ResultCorrelation = { requestId: correlationText(descriptors['requestId']?.value),
    requestDigest: correlationText(descriptors['requestDigest']?.value, true), nonce: correlationText(descriptors['nonce']?.value),
    guidePath: snapshot?.sourceIdentity.guidePath ?? null, sourceIdentity: snapshot?.sourceIdentity ?? null,
    snapshotId: snapshot?.snapshotId ?? null, sourceHash: snapshot?.sourceHash ?? null };
  const target = error instanceof PreparedResultError && error.target && snapshot
    ? verifyResolvedTarget({ currentSnapshot: snapshot, targetRef: error.target }) : null;
  const diagnostic: ResultDiagnostic = { code: classification.code, stage: classification.stage,
    category: classification.category, message: `Factory fix ${classification.status}: ${classification.code}.`,
    actionId: error instanceof PreparedResultError ? correlationText(error.actionId, true) : null,
    operationId: error instanceof PreparedResultError ? correlationText(error.operationId, true) : null, target };
  if (diagnostic.message.length > RESULT_LIMITS.maxDiagnosticText) throw new PreparedResultError('RESULT_LIMIT_EXCEEDED');
  return freezeResult({ schemaVersion: PREPARED_RESULT_SCHEMA_VERSION, status: classification.status, ...correlation,
    diagnostics: [diagnostic], qaHandoff: { required: false, reason: 'NO_WRITE' } });
}
