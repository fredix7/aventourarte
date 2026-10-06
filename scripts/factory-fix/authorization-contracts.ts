import type { SourceIdentity, FactoryQaRuleSet } from './contracts';
import type { CandidateOperation, ContractualAction, OperationRequest } from './operations';
import type { NodeKind, ResolvedTargetRef, StructuralLocation } from './snapshot-contracts';
import type { StaticData } from './static-data';

export const AUTHORIZATION_SCHEMA_VERSION = 1;
export const AUTHORIZATION_LIMITS = Object.freeze({ maxActions: 128, maxScopeTargets: 128,
  maxDescendants: 256, maxEvidenceBindings: 256, maxEvidenceText: 65536,
  maxMetadataString: 4096, maxReferences: 32, maxDependencies: 32,
  maxSerializedBytes: 4 * 1024 * 1024 });
export type TechnicalOperation = OperationRequest['type'];
export type Extent = 'PROPERTY' | 'ELEMENT' | 'OBJECT' | 'COLLECTION';
export interface ScopeTargetRequest {
  readonly scopeId: string; readonly ref: ResolvedTargetRef; readonly extent: Extent;
  readonly allowedDescendants: readonly ResolvedTargetRef[];
  readonly allowedOperations: readonly TechnicalOperation[];
}
export interface ModificationScopeTarget extends ScopeTargetRequest {
  readonly targetId: string; readonly location: StructuralLocation;
  readonly protectedSiblings: readonly ResolvedTargetRef[];
}
export interface ModificationScope { readonly targets: readonly ModificationScopeTarget[] }
export interface AuthorizationPreconditions {
  readonly guidePath: string; readonly sourceIdentity: SourceIdentity; readonly sourceHash: string;
  readonly catalogHash: string; readonly snapshotId: string; readonly ruleSet: FactoryQaRuleSet;
}
export type ActionPreconditions =
  | { readonly mode: 'VALUE'; readonly expectedValue: StaticData }
  | { readonly mode: 'ABSENT_PROPERTY'; readonly propertyName: string }
  | { readonly mode: 'MEMBERS'; readonly expectedOrder: readonly ResolvedTargetRef[] };
export type PayloadConstraint =
  | { readonly mode: 'EXACT_VALUE' }
  | { readonly mode: 'MODEL_VALUE_WITHIN_TYPE'; readonly kind: Exclude<NodeKind, 'object' | 'array'>;
    readonly maxStringLength: number }
  | { readonly mode: 'NO_PAYLOAD' };
export interface EvidencePolicy { readonly allowedIds: readonly string[]; readonly minimum: number }
// Descriptive, request-scoped material. No URL interpretation, truth promotion or persistence.
export interface EvidenceBinding {
  readonly evidenceId: string; readonly actionKey: string; readonly targetRef: ResolvedTargetRef;
  readonly origin: 'Researcher' | 'suppliedFact' | 'userEvidence';
  readonly provenanceReference: string; readonly entity: string; readonly field: string | null;
  readonly material: string; readonly findingStatus: 'CONFIRMED' | 'SUPPORTED' | 'CONFLICTING' | 'UNRESOLVED' | null;
  readonly limitations: readonly string[]; readonly sourceReferences: readonly string[];
  readonly observedAt: string | null;
}
export interface ActionGrant {
  readonly actionKey: string; readonly requirement: 'REQUIRED' | 'OPTIONAL'; readonly scopeId: string;
  readonly operation: OperationRequest; readonly preconditions: ActionPreconditions;
  readonly payloadConstraint: PayloadConstraint; readonly evidencePolicy: EvidencePolicy;
  readonly dependencies: readonly string[]; readonly explicitRemoval: boolean;
}
export interface AuthorizedAction extends Omit<ActionGrant, 'operation'> {
  readonly actionId: string; readonly contractualAction: ContractualAction;
  readonly operation: CandidateOperation;
}
export interface AuthorizationRequest {
  readonly requestId: string; readonly nonce: string | null; readonly allowPartial: boolean;
  readonly preconditions: AuthorizationPreconditions; readonly scopeTargets: readonly ScopeTargetRequest[];
  readonly actions: readonly ActionGrant[]; readonly evidenceBindings: readonly EvidenceBinding[];
}
export interface AuthorizationManifest {
  readonly schemaVersion: typeof AUTHORIZATION_SCHEMA_VERSION;
  readonly requestId: string; readonly nonce: string | null; readonly guidePath: string;
  readonly sourceIdentity: SourceIdentity; readonly snapshotId: string; readonly allowPartial: false;
  readonly authorizedActions: readonly AuthorizedAction[]; readonly modificationScope: ModificationScope;
  readonly evidenceBindings: readonly EvidenceBinding[]; readonly preconditions: AuthorizationPreconditions;
  readonly restrictions: { readonly minimalDiff: true; readonly activeValidation: true; readonly sourceWrite: false };
  readonly requestDigest: string;
}
export interface AuthorizedOperation {
  readonly actionId: string; readonly operation: CandidateOperation; readonly evidenceIds: readonly string[];
}
