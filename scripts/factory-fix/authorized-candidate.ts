import { fail } from './errors';
import { record, authData, strings, list } from './authorization-data';
import { AUTHORIZATION_LIMITS, type AuthorizationManifest, type AuthorizedOperation } from './authorization-contracts';
import { assertAuthorizationManifest, bindAuthorizedOperation, checkActionPreconditions } from './authorization';
import { assertGuideSnapshot } from './snapshot';
import type { GuideSnapshot } from './snapshot-contracts';
import { enforceScope } from './modification-scope';
import { checkEvidence } from './evidence';
import { prepareCandidateOperation } from './operations';
import { buildCandidate } from './candidate';
import { enforceMinimalDiff } from './minimal-diff';
import { validateActiveCandidate } from './active-validation';
import { dataTree, sameTree } from './static-data';

// buildCandidate remains a technical primitive. Its CandidateBuildResult confers no permission;
// only this complete authorization + minimal-diff + ACTIVE pipeline emits an authorized result.
export function authorizeCandidate(input: { readonly snapshot: GuideSnapshot; readonly manifest: AuthorizationManifest;
  readonly requestDigest: string; readonly operations: readonly AuthorizedOperation[] }) {
  record(input, ['snapshot', 'manifest', 'requestDigest', 'operations']); assertGuideSnapshot(input.snapshot);
  const { snapshot, manifest } = input;
  assertAuthorizationManifest(snapshot, manifest);
  if (input.requestDigest !== manifest.requestDigest) fail('REQUEST_DIGEST_MISMATCH');
  const seen = new Set<string>();
  const proposed = list(authData(input.operations), AUTHORIZATION_LIMITS.maxActions).map(value => {
    const p = record(value, ['actionId', 'operation', 'evidenceIds']);
    const action = manifest.authorizedActions.find(action => action.actionId === p['actionId']);
    if (!action) fail('UNAUTHORIZED_ACTION');
    if (seen.has(action.actionId)) fail('UNAUTHORIZED_ACTION'); seen.add(action.actionId);
    const operation = bindAuthorizedOperation(snapshot, action, p['operation']);
    enforceScope(manifest.modificationScope, action.scopeId, operation);
    const evidenceIds = strings(p['evidenceIds'], AUTHORIZATION_LIMITS.maxEvidenceBindings, true);
    checkEvidence(action, evidenceIds, manifest.evidenceBindings);
    const prepared = prepareCandidateOperation(snapshot, operation);
    if (prepared.noOp && action.requirement === 'REQUIRED' && action.payloadConstraint.mode === 'MODEL_VALUE_WITHIN_TYPE'
      && 'value' in operation && 'value' in action.operation && !sameTree(dataTree(operation.value), dataTree(action.operation.value))) {
      fail('ACTION_BINDING_MISMATCH');
    }
    return Object.freeze({ action, prepared, evidenceIds });
  });
  for (const action of manifest.authorizedActions) {
    // Preconditions remain mandatory even for omitted OPTIONAL grants; stale manifests never rebase.
    checkActionPreconditions(snapshot, action.operation, action.preconditions);
    if (action.requirement === 'REQUIRED' && !seen.has(action.actionId)) fail('ACTION_REQUIRED_MISSING');
  }
  for (const { action } of proposed) {
    if (action.dependencies.some(key => !proposed.some(p => p.action.actionKey === key))) fail('ACTION_DEPENDENCY_MISSING');
  }
  const candidate = buildCandidate({ snapshot, operations: proposed.map(p => p.prepared.operation) });
  const diffAttribution = enforceMinimalDiff(snapshot, manifest, proposed, candidate);
  const activeValidation = validateActiveCandidate(snapshot, candidate.candidateText, proposed.map(p => p.prepared));
  const authorizedActionResults = Object.freeze(manifest.authorizedActions.map(action => {
    const selected = proposed.find(p => p.action.actionId === action.actionId);
    return Object.freeze({ actionId: action.actionId, actionKey: action.actionKey,
      outcome: !selected ? 'OMITTED' as const : selected.prepared.noOp ? 'NO_CHANGE' as const : 'CHANGED' as const,
      operationId: selected?.prepared.operation.operationId ?? null, evidenceIds: selected?.evidenceIds ?? Object.freeze([]) });
  }));
  // Success exists only after the entire request passes. No partial authorized result or writer.
  return Object.freeze({ requestId: manifest.requestId, requestDigest: manifest.requestDigest, guidePath: manifest.guidePath,
    snapshotId: candidate.snapshotId, sourceHash: candidate.sourceHash, candidateHash: candidate.candidateHash,
    candidateText: candidate.candidateText, appliedOperationIds: candidate.appliedOperations, noOpOperationIds: candidate.noOpOperations,
    authorizedActionResults, changedTargets: candidate.changedTargets, diffAttribution, activeValidation,
    evidenceBindingsUsed: Object.freeze(manifest.evidenceBindings.filter(e => proposed.some(p => p.evidenceIds.includes(e.evidenceId)))),
    preconditionChecks: Object.freeze({ snapshot: true, sourceIdentity: true, catalogBinding: true, actions: true }),
    diagnostics: Object.freeze({ allowPartial: false, sourceWrite: false, minimalDiff: true, activeValidation: true }) });
}
export type AuthorizedCandidateResult = ReturnType<typeof authorizeCandidate>;
