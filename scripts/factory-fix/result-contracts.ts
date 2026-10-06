import type { SourceIdentity } from './contracts';
import type { NodeIdentityRef, ResolvedTargetRef, StructuralLocation } from './snapshot-contracts';
import type { ContractualAction } from './operations';
import type { TechnicalOperation } from './authorization-contracts';
import type { AuthorizedCandidateResult } from './authorized-candidate';
import type { FactoryReviewContext } from '../../src/app/shared/guide-factory-context';

export const PREPARED_RESULT_SCHEMA_VERSION = 1;
export const RESULT_LIMITS = Object.freeze({ maxDiagnostics: 32, maxChangedTargets: 128,
  maxQaTargets: 256, maxActionResults: 128, maxDiagnosticText: 512,
  maxSerializedMetadataBytes: 8 * 1024 * 1024 });
export type ResultStage = 'IDENTITY' | 'SNAPSHOT' | 'AUTHORIZATION' | 'CANDIDATE'
  | 'ACTIVE_VALIDATION' | 'MINIMAL_DIFF' | 'RESULT_CONSISTENCY' | 'QA_HANDOFF';
export interface ResultDiagnostic {
  readonly code: string; readonly stage: ResultStage;
  readonly category: 'CONTROLLED_INPUT' | 'POLICY' | 'PRECONDITION' | 'INFRASTRUCTURE' | 'INVARIANT';
  readonly message: string;
  readonly actionId: string | null; readonly operationId: string | null;
  readonly target: ResolvedTargetRef | null;
}
export interface PreparedActionResult {
  readonly actionId: string; readonly actionKey: string; readonly requirement: 'REQUIRED' | 'OPTIONAL';
  readonly outcome: 'CHANGED_IN_CANDIDATE' | 'NO_OP' | 'OMITTED_OPTIONAL';
  readonly operationId: string | null; readonly target: ResolvedTargetRef;
  readonly contractualAction: ContractualAction; readonly technicalOperation: TechnicalOperation;
  readonly evidenceIds: readonly string[]; readonly changed: boolean;
  readonly diagnosticCode: 'CANDIDATE_DELTA' | 'OBJECTIVE_SATISFIED' | 'OPTIONAL_NOT_PROPOSED';
}
export interface ChangedTarget {
  readonly actionId: string; readonly operationId: string;
  readonly kind: 'VALUE' | 'PROPERTY_ADD' | 'PROPERTY_REMOVE' | 'ELEMENT_ADD' | 'ELEMENT_REMOVE' | 'REORDER';
  // Only initial snapshot refs carry target IDs. An ADD has no prior target; a REMOVE has no after node.
  readonly originalTargetRef: ResolvedTargetRef | null;
  readonly originalLocation: StructuralLocation | null;
  readonly originalContainerRef: NodeIdentityRef;
  readonly candidateLocation: StructuralLocation | null;
  readonly candidateContainerLocation: StructuralLocation;
  readonly beforeFingerprint: string | null; readonly candidateFingerprint: string | null;
  readonly candidateNodeKind: NodeIdentityRef['nodeKind'] | null;
}
export type CoverageReason = 'PROPERTY_CHANGED' | 'COLLECTION_MEMBERSHIP_CHANGED' | 'ORDER_CHANGED'
  | 'SECTION_INVARIANT_AFFECTED' | 'NEW_REVIEWED_CARD' | 'CARD_INVARIANT_AFFECTED' | 'FALLBACK_FULL_GUIDE';
export const QA_PREREQUISITES = Object.freeze([
  'WRITER_SUCCESS', 'READBACK_MATCHES_CANDIDATE', 'SOURCE_HASH_MATCHES_CANDIDATE',
  'SOURCE_IDENTITY_RE_RESOLVED', 'CATALOG_BINDING_REVALIDATED'
] as const);
export interface RequiredQaHandoff {
  readonly required: true; readonly guidePath: string; readonly reviewContext: FactoryReviewContext;
  readonly changedOperationIds: readonly string[]; readonly coverageReasons: readonly CoverageReason[];
  readonly expectedSourceHashAfterWrite: string; readonly execute: 'ONLY_AFTER_CONFIRMED_WRITE';
  readonly prerequisites: typeof QA_PREREQUISITES;
  readonly observedCatalogHash: string;
  // Observed binding, not a future SourceIdentity or caller-supplied QA ruleSet.
  readonly expectedSourceBinding: {
    readonly sourcePath: string; readonly exportName: string; readonly moduleSpecifier: string;
    readonly importedSymbol: string; readonly localSymbol: string; readonly assignmentIndex: number;
  };
}
export type QaHandoff = RequiredQaHandoff | { readonly required: false; readonly reason: 'NO_CHANGE' | 'NO_WRITE' };
export interface ResultCorrelation {
  readonly requestId: string | null; readonly requestDigest: string | null; readonly nonce: string | null;
  readonly guidePath: string | null; readonly sourceIdentity: SourceIdentity | null;
  readonly snapshotId: string | null; readonly sourceHash: string | null;
}
interface PreparedSuccess extends ResultCorrelation {
  readonly schemaVersion: typeof PREPARED_RESULT_SCHEMA_VERSION;
  readonly requestId: string; readonly requestDigest: string; readonly guidePath: string;
  readonly sourceIdentity: SourceIdentity; readonly snapshotId: string; readonly sourceHash: string;
  readonly candidateHash: string; readonly authorizedActionResults: readonly PreparedActionResult[];
  // Phase 4's appliedOperationIds mean candidate edits; do not report them as persisted actions.
  readonly candidateOperationIds: readonly string[]; readonly noOpOperationIds: readonly string[];
  readonly changedTargets: readonly ChangedTarget[];
  readonly diffAttribution: AuthorizedCandidateResult['diffAttribution'];
  readonly evidenceBindingsUsed: AuthorizedCandidateResult['evidenceBindingsUsed'];
  readonly preconditionChecks: AuthorizedCandidateResult['preconditionChecks'];
  readonly activeValidation: AuthorizedCandidateResult['activeValidation'];
  readonly diagnostics: { readonly sourceWrite: false; readonly persistence: 'NOT_ATTEMPTED';
    readonly currentFilesystemRevalidated: false; readonly qaExecuted: false;
    readonly minimalDiff: true; readonly activeValidation: true; readonly allowPartial: false };
}
export type PreparedFixResult =
  | (PreparedSuccess & { readonly status: 'READY_TO_WRITE'; readonly candidateText: string;
      readonly qaHandoff: RequiredQaHandoff })
  | (PreparedSuccess & { readonly status: 'NO_CHANGE'; readonly changedTargets: readonly [];
      readonly qaHandoff: { readonly required: false; readonly reason: 'NO_CHANGE' } })
  | (ResultCorrelation & { readonly schemaVersion: typeof PREPARED_RESULT_SCHEMA_VERSION;
      readonly status: 'BLOCKED' | 'FAILED'; readonly diagnostics: readonly ResultDiagnostic[];
      readonly qaHandoff: { readonly required: false; readonly reason: 'NO_WRITE' } });

// Separate future contract vocabulary, not a writer result or a runtime conversion:
// READY_TO_WRITE + future verified persistence/readback -> FixerResult.APPLIED.
// NO_CHANGE/BLOCKED/FAILED retain their meaning. PARTIALLY_APPLIED is unreachable with allowPartial=false.
export type FutureFixerResultStatus = 'APPLIED' | 'PARTIALLY_APPLIED' | 'NO_CHANGE' | 'BLOCKED' | 'FAILED';

export function freezeResult<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(freezeResult); Object.freeze(value);
  }
  return value;
}
