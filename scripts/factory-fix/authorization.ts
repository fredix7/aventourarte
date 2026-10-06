import { fail } from './errors';
import { assertSourceIdentity, isGuidePath, isSha256, isFactoryRuleSet } from './validation';
import { assertGuideSnapshot, getSnapshotNode } from './snapshot';
import { createCandidateOperation, prepareCandidateOperation } from './operations';
import type { GuideSnapshot, ResolvedTargetRef } from './snapshot-contracts';
import { READ_LIMITS } from './snapshot-contracts';
import { verifyResolvedTarget, listChildTargets } from './target-locator';
import { normalizeScope, enforceScope, operationRef, sameRef } from './modification-scope';
import { normalizeEvidence } from './evidence';
import { authData, authDigest, record, identifier, list, strings } from './authorization-data';
import { guideTree, dataTree, sameTree, type StaticData } from './static-data';
import { AUTHORIZATION_LIMITS, AUTHORIZATION_SCHEMA_VERSION, type AuthorizationRequest,
  type AuthorizationManifest, type AuthorizationPreconditions, type AuthorizedAction,
  type PayloadConstraint, type ActionPreconditions } from './authorization-contracts';
import type { SourceIdentity } from './contracts';
import type { OperationRequest, CandidateOperation } from './operations';

const manifests = new WeakSet<AuthorizationManifest>();
// Host provenance is process-local, not cryptographic authenticity or persistent replay protection.
function sourceTuple(source: SourceIdentity): unknown {
  const b = source.catalogBinding;
  return [source.guidePath, source.sourcePath, source.exportName, source.ruleSet, source.sourceHash,
    b.catalogPath, b.catalogHash, b.moduleSpecifier, b.importedSymbol, b.localSymbol, b.assignmentIndex, b.ruleSet, b.declaredGuidePath];
}
function normalizePreconditions(snapshot: GuideSnapshot, input: unknown): AuthorizationPreconditions {
  const p = record(input, ['guidePath', 'sourceIdentity', 'sourceHash', 'catalogHash', 'snapshotId', 'ruleSet']);
  assertSourceIdentity(p['sourceIdentity']);
  if (!isGuidePath(p['guidePath']) || !isSha256(p['sourceHash']) || !isSha256(p['catalogHash'])
    || !isSha256(p['snapshotId']) || !isFactoryRuleSet(p['ruleSet'])) fail('AUTHORIZATION_INVALID');
  if (p['guidePath'] !== snapshot.sourceIdentity.guidePath || p['sourceHash'] !== snapshot.sourceHash
    || p['catalogHash'] !== snapshot.sourceIdentity.catalogBinding.catalogHash || p['snapshotId'] !== snapshot.snapshotId
    || p['ruleSet'] !== snapshot.sourceIdentity.ruleSet
    || authDigest(sourceTuple(p['sourceIdentity'])) !== authDigest(sourceTuple(snapshot.sourceIdentity))) fail('PRECONDITION_FAILED');
  return Object.freeze({ guidePath: p['guidePath'], sourceIdentity: snapshot.sourceIdentity,
    sourceHash: p['sourceHash'], catalogHash: p['catalogHash'], snapshotId: p['snapshotId'], ruleSet: p['ruleSet'] });
}
export function checkActionPreconditions(snapshot: GuideSnapshot, operation: CandidateOperation, pre: ActionPreconditions): void {
  const ref = operationRef(operation);
  verifyResolvedTarget({ currentSnapshot: snapshot, targetRef: ref });
  const node = getSnapshotNode(snapshot, ref.location)!;
  if (pre.mode === 'VALUE') {
    if (!sameTree(guideTree(node), dataTree(pre.expectedValue))) fail('PRECONDITION_FAILED');
  } else if (pre.mode === 'ABSENT_PROPERTY') {
    if (node.nodeKind !== 'object' || node.properties.some(p => p.name === pre.propertyName)) fail('PRECONDITION_FAILED');
  } else {
    const current = listChildTargets({ snapshot, parentRef: ref });
    if (node.nodeKind !== 'array' || current.length !== pre.expectedOrder.length
      || current.some((child, i) => !sameRef(child, pre.expectedOrder[i]))) fail('PRECONDITION_FAILED');
  }
}
function precondition(snapshot: GuideSnapshot, op: CandidateOperation, value: unknown): ActionPreconditions {
  const mode = typeof value === 'object' && value !== null ? (value as Record<string, unknown>)['mode'] : null;
  let pre: ActionPreconditions;
  if (mode === 'VALUE') {
    const p = record(value, ['mode', 'expectedValue']);
    if (!['UPDATE_VALUE', 'REMOVE_PROPERTY', 'REMOVE_ELEMENT'].includes(op.type)) fail('AUTHORIZATION_INVALID');
    pre = Object.freeze({ mode, expectedValue: p['expectedValue'] as StaticData });
  } else if (mode === 'ABSENT_PROPERTY') {
    const p = record(value, ['mode', 'propertyName']);
    if (op.type !== 'ADD_PROPERTY' || p['propertyName'] !== op.propertyName) fail('AUTHORIZATION_INVALID');
    pre = Object.freeze({ mode, propertyName: op.propertyName });
  } else if (mode === 'MEMBERS') {
    const p = record(value, ['mode', 'expectedOrder']);
    if (op.type !== 'ADD_ELEMENT' && op.type !== 'REORDER_ELEMENTS') fail('AUTHORIZATION_INVALID');
    const order = list(p['expectedOrder'], READ_LIMITS.maxArrayElements).map(value =>
      verifyResolvedTarget({ currentSnapshot: snapshot, targetRef: value as ResolvedTargetRef }));
    if (new Set(order.map(r => r.targetId)).size !== order.length) fail('AUTHORIZATION_INVALID');
    pre = Object.freeze({ mode, expectedOrder: Object.freeze(order) });
  } else fail('AUTHORIZATION_INVALID');
  checkActionPreconditions(snapshot, op, pre); return pre;
}
function constraint(op: CandidateOperation, input: unknown): PayloadConstraint {
  const mode = typeof input === 'object' && input !== null ? (input as Record<string, unknown>)['mode'] : null;
  if (mode === 'EXACT_VALUE') {
    record(input, ['mode']); if (!('value' in op)) fail('AUTHORIZATION_INVALID');
    return Object.freeze({ mode });
  }
  if (mode === 'NO_PAYLOAD') {
    record(input, ['mode']); if ('value' in op) fail('AUTHORIZATION_INVALID');
    return Object.freeze({ mode });
  }
  const c = record(input, ['mode', 'kind', 'maxStringLength']);
  // V1 deliberately permits drafting scalar values only. Object/array ADD payloads are exact:
  // no free structural constraint language or hidden new fields inside model-authored objects.
  if (mode !== 'MODEL_VALUE_WITHIN_TYPE' || !('value' in op)
    || !['string', 'number', 'boolean', 'null'].includes(c['kind'] as string)
    || (op.value === null ? 'null' : typeof op.value) !== c['kind']
    || !Number.isSafeInteger(c['maxStringLength']) || (c['maxStringLength'] as number) < 0
    || (c['maxStringLength'] as number) > READ_LIMITS.maxStringLength) fail('AUTHORIZATION_INVALID');
  return Object.freeze({ mode, kind: c['kind'] as 'string' | 'number' | 'boolean' | 'null', maxStringLength: c['maxStringLength'] as number });
}
// Host-only authority preparation. Never construct this trusted request from a model's FixPlan.
// Deserialized manifests must be re-created from host-approved data; valid shape alone grants nothing.
export function createAuthorizationManifest(input: { readonly snapshot: GuideSnapshot; readonly request: AuthorizationRequest }): AuthorizationManifest {
  record(input, ['snapshot', 'request']); assertGuideSnapshot(input.snapshot);
  const snapshot = input.snapshot;
  const request = record(authData(input.request), ['requestId', 'nonce', 'allowPartial', 'preconditions', 'scopeTargets', 'actions', 'evidenceBindings']);
  if (request['allowPartial'] === true) fail('PARTIAL_UNSUPPORTED');
  if (request['allowPartial'] !== false) fail('AUTHORIZATION_INVALID');
  const requestId = identifier(request['requestId']), nonce = request['nonce'] === null ? null : identifier(request['nonce']);
  const preconditions = normalizePreconditions(snapshot, request['preconditions']);
  const modificationScope = normalizeScope(snapshot, request['scopeTargets']);
  const evidenceBindings = normalizeEvidence(snapshot, request['evidenceBindings']);
  const keys = new Set<string>();
  const actions = list(request['actions'], AUTHORIZATION_LIMITS.maxActions).map(value => {
    const a = record(value, ['actionKey', 'requirement', 'scopeId', 'operation', 'preconditions',
      'payloadConstraint', 'evidencePolicy', 'dependencies', 'explicitRemoval']);
    const actionKey = identifier(a['actionKey']), scopeId = identifier(a['scopeId']);
    if (keys.has(actionKey) || !['REQUIRED', 'OPTIONAL'].includes(a['requirement'] as string)
      || typeof a['explicitRemoval'] !== 'boolean') fail('AUTHORIZATION_INVALID'); keys.add(actionKey);
    const operation = createCandidateOperation({ snapshot, operation: a['operation'] as OperationRequest });
    if (operation.contractualAction === 'REMOVE' ? a['explicitRemoval'] !== true : a['explicitRemoval'] !== false) fail('AUTHORIZATION_INVALID');
    enforceScope(modificationScope, scopeId, operation);
    const actionPreconditions = precondition(snapshot, operation, a['preconditions']);
    const payloadConstraint = constraint(operation, a['payloadConstraint']);
    const evidence = record(a['evidencePolicy'], ['allowedIds', 'minimum']);
    const allowedIds = strings(evidence['allowedIds'], AUTHORIZATION_LIMITS.maxEvidenceBindings, true);
    const minimum = evidence['minimum'];
    if (!Number.isSafeInteger(minimum) || (minimum as number) < 0 || (minimum as number) > allowedIds.length) fail('AUTHORIZATION_INVALID');
    const dependencies = strings(a['dependencies'], AUTHORIZATION_LIMITS.maxDependencies, true);
    const base = { actionKey, requirement: a['requirement'] as 'REQUIRED' | 'OPTIONAL', scopeId, operation,
      contractualAction: operation.contractualAction, preconditions: actionPreconditions, payloadConstraint,
      evidencePolicy: Object.freeze({ allowedIds, minimum: minimum as number }), dependencies, explicitRemoval: a['explicitRemoval'] as boolean };
    return Object.freeze({ ...base, actionId: authDigest(['authorized-action', AUTHORIZATION_SCHEMA_VERSION,
      requestId, nonce, snapshot.snapshotId, base, modificationScope.targets.find(target => target.scopeId === scopeId),
      evidenceBindings.filter(binding => allowedIds.includes(binding.evidenceId))]) });
  });
  for (const a of actions) {
    for (const id of a.evidencePolicy.allowedIds) {
      const e = evidenceBindings.find(binding => binding.evidenceId === id);
      if (!e) fail('EVIDENCE_UNKNOWN');
      const ref = operationRef(a.operation), field = a.operation.type === 'ADD_PROPERTY' ? a.operation.propertyName
        : ref.location.at(-1) && 'property' in ref.location.at(-1)! ? (ref.location.at(-1) as { property: string }).property : null;
      if (e.actionKey !== a.actionKey || !sameRef(e.targetRef, ref) || e.field !== field) fail('EVIDENCE_NOT_ALLOWED');
    }
    if (a.dependencies.some(key => !keys.has(key) || key === a.actionKey)) fail('AUTHORIZATION_INVALID');
  }
  if (evidenceBindings.some(e => !keys.has(e.actionKey))) fail('AUTHORIZATION_INVALID');
  const visited = new Set<string>(), active = new Set<string>();
  const visit = (a: AuthorizedAction): void => {
    if (active.has(a.actionKey)) fail('AUTHORIZATION_INVALID'); if (visited.has(a.actionKey)) return;
    active.add(a.actionKey); a.dependencies.forEach(key => visit(actions.find(item => item.actionKey === key)!));
    active.delete(a.actionKey); visited.add(a.actionKey);
  };
  actions.forEach(visit);
  const base: Omit<AuthorizationManifest, 'requestDigest'> = { schemaVersion: AUTHORIZATION_SCHEMA_VERSION, requestId, nonce,
    guidePath: snapshot.sourceIdentity.guidePath, sourceIdentity: snapshot.sourceIdentity, snapshotId: snapshot.snapshotId,
    allowPartial: false as const, authorizedActions: Object.freeze(actions), modificationScope, evidenceBindings, preconditions,
    restrictions: Object.freeze({ minimalDiff: true as const, activeValidation: true as const, sourceWrite: false as const }) };
  const manifest = Object.freeze({ ...base, requestDigest: authDigest(base) }); manifests.add(manifest); return manifest;
}
export function assertAuthorizationManifest(snapshot: GuideSnapshot, manifest: AuthorizationManifest): void {
  if (typeof manifest !== 'object' || manifest === null || !manifests.has(manifest)) fail('AUTHORIZATION_INVALID');
  normalizePreconditions(snapshot, manifest.preconditions);
}
export function bindAuthorizedOperation(snapshot: GuideSnapshot, action: AuthorizedAction, input: unknown): CandidateOperation {
  const operation = prepareCandidateOperation(snapshot, input).operation, expected = action.operation;
  if (operation.type !== expected.type || operation.contractualAction !== action.contractualAction
    || !sameRef(operationRef(operation), operationRef(expected))) fail('ACTION_BINDING_MISMATCH');
  // Rebuild the trusted template with the proposed scalar value only. This checks all other
  // shape, anchors, names, permutations and metadata without granting authority by operationId.
  const { operationId: _id, contractualAction: _action, expectedSnapshotId: _snapshot, ...template } = expected;
  const matched = createCandidateOperation({ snapshot, operation: 'value' in operation && 'value' in template
    ? { ...template, value: operation.value } : template });
  if (matched.operationId !== operation.operationId) fail('ACTION_BINDING_MISMATCH');
  if (action.payloadConstraint.mode === 'EXACT_VALUE') {
    if (!('value' in operation) || !('value' in expected) || !sameTree(dataTree(operation.value), dataTree(expected.value))) fail('ACTION_BINDING_MISMATCH');
  } else if (action.payloadConstraint.mode === 'MODEL_VALUE_WITHIN_TYPE') {
    if (!('value' in operation) || (operation.value === null ? 'null' : typeof operation.value) !== action.payloadConstraint.kind
      || typeof operation.value === 'string' && operation.value.length > action.payloadConstraint.maxStringLength) fail('ACTION_BINDING_MISMATCH');
  }
  checkActionPreconditions(snapshot, expected, action.preconditions);
  return operation;
}
