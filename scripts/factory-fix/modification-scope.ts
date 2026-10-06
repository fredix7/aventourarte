import { fail } from './errors';
import { identityTuple, locationKey, digest } from './fingerprint';
import { getSnapshotNode } from './snapshot';
import type { GuideSnapshot, ResolvedTargetRef, StructuralLocation } from './snapshot-contracts';
import { verifyResolvedTarget, listChildTargets, getGuideRootRef } from './target-locator';
import { record, identifier, list, strings } from './authorization-data';
import { AUTHORIZATION_LIMITS, type ModificationScope, type TechnicalOperation, type Extent } from './authorization-contracts';
import type { CandidateOperation } from './operations';

const kinds: readonly string[] = ['UPDATE_VALUE', 'ADD_PROPERTY', 'ADD_ELEMENT', 'REMOVE_PROPERTY', 'REMOVE_ELEMENT', 'REORDER_ELEMENTS'];
export function sameRef(a: ResolvedTargetRef, b: ResolvedTargetRef): boolean { return digest(identityTuple(a)) === digest(identityTuple(b)); }
export function within(parent: StructuralLocation, child: StructuralLocation): boolean {
  return parent.length <= child.length && parent.every((step, i) => locationKey([step]) === locationKey([child[i]]));
}
export function operationRef(operation: CandidateOperation): ResolvedTargetRef {
  return 'targetRef' in operation ? operation.targetRef : operation.parentRef;
}
export function normalizeScope(snapshot: GuideSnapshot, input: unknown): ModificationScope {
  const ids = new Set<string>();
  const targets = list(input, AUTHORIZATION_LIMITS.maxScopeTargets).map(value => {
    const item = record(value, ['scopeId', 'ref', 'extent', 'allowedDescendants', 'allowedOperations']);
    const scopeId = identifier(item['scopeId']);
    if (ids.has(scopeId)) fail('AUTHORIZATION_INVALID'); ids.add(scopeId);
    const ref = verifyResolvedTarget({ currentSnapshot: snapshot, targetRef: item['ref'] as ResolvedTargetRef });
    const extent = item['extent'];
    if (!['PROPERTY', 'ELEMENT', 'OBJECT', 'COLLECTION'].includes(extent as string)
      || extent === 'PROPERTY' && ref.propertySpan === null || extent === 'ELEMENT' && ref.targetType !== 'array-element'
      || extent === 'OBJECT' && ref.nodeKind !== 'object' || extent === 'COLLECTION' && ref.nodeKind !== 'array') fail('AUTHORIZATION_INVALID');
    const descendants = list(item['allowedDescendants'], AUTHORIZATION_LIMITS.maxDescendants).map(value =>
      verifyResolvedTarget({ currentSnapshot: snapshot, targetRef: value as ResolvedTargetRef }));
    if (new Set(descendants.map(d => d.targetId)).size !== descendants.length
      || descendants.some(d => d.location.length <= ref.location.length || !within(ref.location, d.location))
      || (extent === 'PROPERTY' || extent === 'ELEMENT') && descendants.length) fail('SCOPE_VIOLATION');
    const allowedOperations = strings(item['allowedOperations'], kinds.length);
    if (new Set(allowedOperations).size !== allowedOperations.length || allowedOperations.some(kind => !kinds.includes(kind))) fail('AUTHORIZATION_INVALID');
    // Observed boundary metadata, not a whitespace ownership grant.
    const parent = ref.parent && getSnapshotNode(snapshot, ref.parent.location);
    const protectedSiblings = parent ? listChildTargets({ snapshot, parentRef:
      // Obtain the exact observed parent ref through the existing ref enumeration.
      findRef(snapshot, parent.location) }).filter(sibling => !sameRef(sibling, ref)) : [];
    return Object.freeze({ scopeId, ref, targetId: ref.targetId, location: ref.location, extent: extent as Extent,
      allowedDescendants: Object.freeze(descendants), allowedOperations: Object.freeze(allowedOperations as TechnicalOperation[]),
      protectedSiblings: Object.freeze(protectedSiblings) });
  });
  const authorized = targets.flatMap(target => [target.ref, ...target.allowedDescendants]);
  return Object.freeze({ targets: Object.freeze(targets.map(target => Object.freeze({ ...target,
    protectedSiblings: Object.freeze(target.protectedSiblings.filter(sibling => !authorized.some(ref => sameRef(ref, sibling))))
  }))) });
}
// Enumeration uses snapshot identity only, never names/discriminators as a new resolution heuristic.
function findRef(snapshot: GuideSnapshot, location: StructuralLocation): ResolvedTargetRef {
  let ref = getGuideRootRef(snapshot);
  for (let depth = 1; depth <= location.length; depth++) {
    const next = listChildTargets({ snapshot, parentRef: ref }).find(child => locationKey(child.location) === locationKey(location.slice(0, depth)));
    if (!next) fail('SNAPSHOT_INVALID'); ref = next;
  }
  return ref;
}
export function enforceScope(scope: ModificationScope, scopeId: string, operation: CandidateOperation): void {
  const target = scope.targets.find(item => item.scopeId === scopeId);
  const ref = operationRef(operation);
  if (!target || !target.allowedOperations.includes(operation.type)) fail('SCOPE_VIOLATION');
  const exact = sameRef(target.ref, ref), listed = target.allowedDescendants.some(child => sameRef(child, ref));
  if (!exact && !listed) fail('SCOPE_VIOLATION');
  if (exact && target.extent === 'PROPERTY' && !['UPDATE_VALUE', 'REMOVE_PROPERTY'].includes(operation.type)
    || exact && target.extent === 'ELEMENT' && operation.type !== 'REMOVE_ELEMENT'
    || exact && target.extent === 'OBJECT' && operation.type !== 'ADD_PROPERTY'
    || exact && target.extent === 'COLLECTION' && !['ADD_ELEMENT', 'REORDER_ELEMENTS', 'REMOVE_PROPERTY'].includes(operation.type)) fail('SCOPE_VIOLATION');
  // A listed descendant still needs an exact action. No operation is authorized just by subtree.
}
