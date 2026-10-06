import { fail } from './errors';
import { digest, identityTuple, spanTuple } from './fingerprint';
import { assertGuideSnapshot, getSnapshotNode, nodeTargetId } from './snapshot';
import { hasExactKeys, isSha256 } from './validation';
import {
  READ_LIMITS, SNAPSHOT_SCHEMA_VERSION, type Discriminator, type GuideNode, type GuideSnapshot,
  type NodeIdentityRef, type NodeKind, type ResolvedTargetRef, type SourceSpan,
  type StaticScalar, type StructuralLocation, type TargetLocator, type TargetType
} from './snapshot-contracts';

const nodeKinds: readonly string[] = ['string', 'number', 'boolean', 'null', 'object', 'array'];
const targetTypes: readonly string[] = ['root', 'root-property', 'object-property', 'collection', 'array-element'];
function isKind(value: unknown): value is NodeKind { return typeof value === 'string' && nodeKinds.includes(value); }
function isIndex(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}
function isProperty(value: unknown): value is string {
  return typeof value === 'string' && value.length <= READ_LIMITS.maxStringLength;
}
function isScalar(value: unknown): value is StaticScalar {
  return value === null || typeof value === 'boolean' || isProperty(value)
    || typeof value === 'number' && Number.isFinite(value) && !Object.is(value, -0);
}
function isLocation(value: unknown): value is StructuralLocation {
  return Array.isArray(value) && value.length <= READ_LIMITS.maxDepth && Array.from(value).every(step =>
    hasExactKeys(step, ['property']) && isProperty(step['property'])
    || hasExactKeys(step, ['element']) && isIndex(step['element'])
  );
}
function isIdentityRef(value: unknown): value is NodeIdentityRef {
  return hasExactKeys(value, ['snapshotId', 'targetId', 'nodeKind', 'location', 'fingerprint'])
    && isSha256(value['snapshotId']) && isSha256(value['targetId']) && isKind(value['nodeKind'])
    && isLocation(value['location']) && isSha256(value['fingerprint']);
}
function isDiscriminators(value: unknown): value is readonly Discriminator[] {
  if (!Array.isArray(value) || value.length > READ_LIMITS.maxObjectProperties) return false;
  const seen = new Set<string>();
  return Array.from(value).every(item => {
    if (!hasExactKeys(item, ['property', 'value']) || !isProperty(item['property']) || !isScalar(item['value'])
      || seen.has(item['property'])) return false;
    seen.add(item['property']); return true;
  });
}
function isSpan(value: unknown): value is SourceSpan {
  return hasExactKeys(value, ['fullStart', 'start', 'end', 'contextEnd'])
    && isIndex(value['fullStart']) && isIndex(value['start']) && isIndex(value['end']) && isIndex(value['contextEnd'])
    && value['fullStart'] <= value['start'] && value['start'] <= value['end'] && value['end'] <= value['contextEnd'];
}

// Shape validation and target resolution are not authorization checks.
export function isTargetLocator(value: unknown): value is TargetLocator {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const type = Object.getOwnPropertyDescriptor(value, 'targetType')?.value;
  const common = ['snapshotSchemaVersion', 'snapshotId', 'targetType', 'parent', 'containerFingerprint',
    'expectedKind', 'expectedFingerprint'];
  const keys = type === 'root' ? common : type === 'array-element' ? [...common, 'selector']
    : ['root-property', 'object-property', 'collection'].includes(type) ? [...common, 'property'] : [];
  if (!hasExactKeys(value, keys) || value['snapshotSchemaVersion'] !== SNAPSHOT_SCHEMA_VERSION
    || !isSha256(value['snapshotId']) || !isKind(value['expectedKind'])
    || value['expectedFingerprint'] !== null && !isSha256(value['expectedFingerprint'])) return false;
  if (type === 'root') return value['parent'] === null && value['containerFingerprint'] === null;
  if (!isIdentityRef(value['parent']) || !isSha256(value['containerFingerprint'])) return false;
  if (type !== 'array-element') return isProperty(value['property']);
  const selector = value['selector'];
  return hasExactKeys(selector, ['discriminators', 'fingerprint', 'observedIndex'])
    && isDiscriminators(selector['discriminators'])
    && (selector['fingerprint'] === null || isSha256(selector['fingerprint']))
    && (selector['observedIndex'] === null || isIndex(selector['observedIndex']))
    && (selector['discriminators'].length > 0 || selector['fingerprint'] !== null)
    && (selector['observedIndex'] === null || selector['fingerprint'] !== null);
}

function identityRef(snapshot: GuideSnapshot, node: GuideNode): NodeIdentityRef {
  return Object.freeze({ snapshotId: snapshot.snapshotId, targetId: nodeTargetId(snapshot.snapshotId, node),
    nodeKind: node.nodeKind, location: node.location, fingerprint: node.fingerprint });
}
function makeRef(snapshot: GuideSnapshot, node: GuideNode): ResolvedTargetRef {
  const parent = node.parentLocation === null ? undefined : getSnapshotNode(snapshot, node.parentLocation);
  if (node.parentLocation !== null && !parent) fail('SNAPSHOT_INVALID');
  const last = node.location.at(-1);
  const targetType: TargetType = !last ? 'root' : 'element' in last ? 'array-element'
    : node.nodeKind === 'array' ? 'collection' : node.location.length === 1 ? 'root-property' : 'object-property';
  const propertySpan = parent?.nodeKind === 'object' && last && 'property' in last
    ? parent.properties.find(property => property.name === last.property)?.span ?? null : null;
  return Object.freeze({ ...identityRef(snapshot, node), targetType,
    parent: parent ? identityRef(snapshot, parent) : null, containerFingerprint: parent?.fingerprint ?? null,
    observedIndex: node.observedIndex, discriminators: node.discriminators,
    span: node.span, parentSpan: parent?.span ?? null, propertySpan });
}
function checkedParent(snapshot: GuideSnapshot, ref: NodeIdentityRef): GuideNode {
  if (ref.snapshotId !== snapshot.snapshotId) fail('TARGET_STALE');
  const parent = getSnapshotNode(snapshot, ref.location);
  if (!parent || digest(identityTuple(identityRef(snapshot, parent))) !== digest(identityTuple(ref))) {
    fail('TARGET_STALE');
  }
  return parent;
}
function matches(node: GuideNode, discriminators: readonly Discriminator[]): boolean {
  return discriminators.every(discriminator => {
    if (node.nodeKind !== 'object') return false;
    const child = node.properties.find(property => property.name === discriminator.property)?.node;
    return child !== undefined && 'value' in child && child.value === discriminator.value;
  });
}

export function resolveTarget(input: { readonly snapshot: GuideSnapshot; readonly locator: TargetLocator }): ResolvedTargetRef {
  if (!hasExactKeys(input, ['snapshot', 'locator']) || !isTargetLocator(input.locator)) fail('LOCATOR_INVALID');
  const { snapshot, locator } = input;
  assertGuideSnapshot(snapshot);
  if (locator.snapshotId !== snapshot.snapshotId) fail('TARGET_STALE');
  let node: GuideNode;
  if (locator.targetType === 'root') node = snapshot.root;
  else {
    const parent = checkedParent(snapshot, locator.parent);
    if (parent.fingerprint !== locator.containerFingerprint) fail('TARGET_STALE');
    if (locator.targetType === 'array-element') {
      if (parent.nodeKind !== 'array') fail('TARGET_KIND_MISMATCH');
      const { selector } = locator;
      let candidates = parent.elements.filter(element => matches(element, selector.discriminators));
      if (candidates.length === 0) fail('TARGET_NOT_FOUND');
      if (selector.fingerprint !== null) {
        candidates = candidates.filter(element => element.fingerprint === selector.fingerprint);
        if (candidates.length === 0) fail('TARGET_STALE');
      }
      if (selector.observedIndex !== null) {
        candidates = candidates.filter(element => element.observedIndex === selector.observedIndex);
        if (candidates.length === 0) fail('TARGET_STALE');
      }
      if (candidates.length !== 1) fail('TARGET_AMBIGUOUS');
      node = candidates[0];
    } else {
      if (parent.nodeKind !== 'object' || locator.targetType === 'root-property' && parent !== snapshot.root
        || locator.targetType === 'object-property' && parent === snapshot.root) fail('TARGET_KIND_MISMATCH');
      const child = parent.properties.find(property => property.name === locator.property)?.node;
      if (!child) fail('TARGET_NOT_FOUND');
      if (locator.targetType === 'collection' && child.nodeKind !== 'array') fail('TARGET_KIND_MISMATCH');
      node = child;
    }
  }
  if (node.nodeKind !== locator.expectedKind) fail('TARGET_KIND_MISMATCH');
  if (locator.expectedFingerprint !== null && node.fingerprint !== locator.expectedFingerprint) fail('TARGET_STALE');
  return makeRef(snapshot, node);
}

export function getGuideRootRef(snapshot: GuideSnapshot): ResolvedTargetRef {
  assertGuideSnapshot(snapshot); return makeRef(snapshot, snapshot.root);
}
export function listChildTargets(input: {
  readonly snapshot: GuideSnapshot; readonly parentRef: ResolvedTargetRef;
}): readonly ResolvedTargetRef[] {
  if (!hasExactKeys(input, ['snapshot', 'parentRef'])) fail('LOCATOR_INVALID');
  const ref = verifyResolvedTarget({ currentSnapshot: input.snapshot, targetRef: input.parentRef });
  const parent = getSnapshotNode(input.snapshot, ref.location);
  if (!parent) fail('TARGET_NOT_FOUND');
  const children = parent.nodeKind === 'object' ? parent.properties.map(property => property.node)
    : parent.nodeKind === 'array' ? parent.elements : [];
  return Object.freeze(children.map(child => makeRef(input.snapshot, child)));
}

function isResolvedRef(value: unknown): value is ResolvedTargetRef {
  if (!hasExactKeys(value, ['snapshotId', 'targetId', 'nodeKind', 'location', 'fingerprint', 'targetType',
    'parent', 'containerFingerprint', 'observedIndex', 'discriminators', 'span', 'parentSpan', 'propertySpan'])) return false;
  return isSha256(value['snapshotId']) && isSha256(value['targetId']) && isKind(value['nodeKind'])
    && isLocation(value['location']) && isSha256(value['fingerprint'])
    && typeof value['targetType'] === 'string' && targetTypes.includes(value['targetType'])
    && (value['parent'] === null || isIdentityRef(value['parent']))
    && (value['containerFingerprint'] === null || isSha256(value['containerFingerprint']))
    && (value['observedIndex'] === null || isIndex(value['observedIndex']))
    && isDiscriminators(value['discriminators']) && isSpan(value['span'])
    && (value['parentSpan'] === null || isSpan(value['parentSpan']))
    && (value['propertySpan'] === null || isSpan(value['propertySpan']));
}
function refDigest(ref: ResolvedTargetRef): string {
  return digest([identityTuple(ref), ref.targetType, ref.parent === null ? null : identityTuple(ref.parent),
    ref.containerFingerprint, ref.observedIndex, ref.discriminators.map(d => [d.property, d.value]),
    spanTuple(ref.span), ref.parentSpan === null ? null : spanTuple(ref.parentSpan),
    ref.propertySpan === null ? null : spanTuple(ref.propertySpan)]);
}
export function verifyResolvedTarget(input: {
  readonly currentSnapshot: GuideSnapshot; readonly targetRef: ResolvedTargetRef;
}): ResolvedTargetRef {
  if (!hasExactKeys(input, ['currentSnapshot', 'targetRef']) || !isResolvedRef(input.targetRef)) fail('LOCATOR_INVALID');
  assertGuideSnapshot(input.currentSnapshot);
  if (input.targetRef.snapshotId !== input.currentSnapshot.snapshotId) fail('TARGET_STALE');
  const node = getSnapshotNode(input.currentSnapshot, input.targetRef.location);
  if (!node) fail('TARGET_NOT_FOUND');
  const observed = makeRef(input.currentSnapshot, node);
  if (refDigest(observed) !== refDigest(input.targetRef)) fail('TARGET_STALE');
  return observed;
}

export function createTargetLocator(input: {
  readonly snapshot: GuideSnapshot; readonly targetRef: ResolvedTargetRef;
}): TargetLocator {
  if (!hasExactKeys(input, ['snapshot', 'targetRef'])) fail('LOCATOR_INVALID');
  const ref = verifyResolvedTarget({ currentSnapshot: input.snapshot, targetRef: input.targetRef });
  const common = { snapshotSchemaVersion: SNAPSHOT_SCHEMA_VERSION, snapshotId: ref.snapshotId,
    expectedKind: ref.nodeKind, expectedFingerprint: ref.fingerprint } as const;
  if (ref.targetType === 'root') return Object.freeze({ ...common, targetType: 'root', parent: null,
    containerFingerprint: null });
  if (!ref.parent || ref.containerFingerprint === null) fail('SNAPSHOT_INVALID');
  if (ref.targetType === 'array-element') return Object.freeze({ ...common, targetType: 'array-element',
    parent: ref.parent, containerFingerprint: ref.containerFingerprint, selector: Object.freeze({
      discriminators: ref.discriminators, fingerprint: ref.fingerprint, observedIndex: ref.observedIndex }) });
  const last = ref.location.at(-1);
  if (!last || !('property' in last)) fail('SNAPSHOT_INVALID');
  return Object.freeze({ ...common, targetType: ref.targetType, parent: ref.parent,
    containerFingerprint: ref.containerFingerprint, property: last.property });
}
