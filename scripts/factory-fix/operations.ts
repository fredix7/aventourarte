import { fail } from './errors';
import { digest, identityTuple, locationKey, type CanonicalValue } from './fingerprint';
import { activeOrder, orderNewTree, propertyInsertionIndex } from './property-order';
import { assertGuideSnapshot, getSnapshotNode } from './snapshot';
import { READ_LIMITS, type GuideNode, type GuideSnapshot, type ResolvedTargetRef } from './snapshot-contracts';
import { assertPropertyName, dataTree, normalizeStaticData, treeTuple, type DataTree, type StaticData } from './static-data';
import { verifyResolvedTarget } from './target-locator';
import { hasExactKeys, isExportName } from './validation';

export const CANDIDATE_LIMITS = Object.freeze({ maxOperations: 128, maxEdits: 2048,
  maxReplacementBytes: 4 * 1024 * 1024, maxCandidateGrowth: 2 * 1024 * 1024,
  maxCandidateBytes: 8 * 1024 * 1024 });
// Source identity and observed root presentation configuration require specialized future operations.
// This is a technical safety boundary, not an authorization manifest or an editorial field allowlist.
export const PROTECTED_ROOT_PROPERTIES = Object.freeze(['path', 'flag', 'flag2', 'background',
  'bgPos', 'bgPosMobile', 'bgDim', 'flagOverlay', 'flagOpacity', 'flagOpacityMobile',
  'flagSize', 'flagSizeMobile', 'bgSize', 'bgSizeMobile', 'bgBrightness']);

export type Placement = { readonly mode: 'append' }
  | { readonly mode: 'before' | 'after'; readonly anchorRef: ResolvedTargetRef };
export type PropertyPlacement = Placement | { readonly mode: 'auto' };
export type OperationRequest =
  | { readonly type: 'UPDATE_VALUE'; readonly targetRef: ResolvedTargetRef; readonly value: StaticData }
  | { readonly type: 'ADD_PROPERTY'; readonly parentRef: ResolvedTargetRef; readonly propertyName: string;
    readonly value: StaticData; readonly placement: PropertyPlacement }
  | { readonly type: 'ADD_ELEMENT'; readonly parentRef: ResolvedTargetRef; readonly value: StaticData; readonly placement: Placement }
  | { readonly type: 'REMOVE_PROPERTY' | 'REMOVE_ELEMENT'; readonly targetRef: ResolvedTargetRef }
  | { readonly type: 'REORDER_ELEMENTS'; readonly parentRef: ResolvedTargetRef; readonly order: readonly ResolvedTargetRef[] };
export type ContractualAction = 'ADD' | 'UPDATE' | 'REMOVE' | 'REORDER';
export type CandidateOperation = OperationRequest & { readonly operationId: string;
  readonly contractualAction: ContractualAction; readonly expectedSnapshotId: string };
export interface PreparedOperation {
  readonly operation: CandidateOperation; readonly node: GuideNode; readonly parent: GuideNode | null;
  readonly tree: DataTree | null; readonly insertionIndex: number | null; readonly noOp: boolean;
}
const requestKeys: Record<string, readonly string[]> = {
  UPDATE_VALUE: ['type', 'targetRef', 'value'], ADD_PROPERTY: ['type', 'parentRef', 'propertyName', 'value', 'placement'],
  ADD_ELEMENT: ['type', 'parentRef', 'value', 'placement'], REMOVE_PROPERTY: ['type', 'targetRef'],
  REMOVE_ELEMENT: ['type', 'targetRef'], REORDER_ELEMENTS: ['type', 'parentRef', 'order']
};
function checkedRef(snapshot: GuideSnapshot, value: unknown): ResolvedTargetRef {
  return verifyResolvedTarget({ currentSnapshot: snapshot, targetRef: value as ResolvedTargetRef });
}
function checkProtected(node: GuideNode, addedProperty?: string): void {
  const first = node.location[0];
  if (first && 'property' in first && PROTECTED_ROOT_PROPERTIES.includes(first.property)
    || node.location.length === 0 && addedProperty !== undefined && PROTECTED_ROOT_PROPERTIES.includes(addedProperty)) {
    fail('TARGET_PROTECTED');
  }
}
function action(type: string): ContractualAction {
  if (type.startsWith('ADD_')) return 'ADD';
  if (type.startsWith('REMOVE_')) return 'REMOVE';
  return type === 'UPDATE_VALUE' ? 'UPDATE' : 'REORDER';
}
// Dense descriptor-only arrays also protect operation/ref lists from caller accessors.
export function descriptorArray(value: unknown, max: number): readonly unknown[] {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) fail('OPERATION_INVALID');
  if (value.length > max) fail('CANDIDATE_LIMIT_EXCEEDED');
  const keys = Reflect.ownKeys(value);
  if (keys.length !== value.length + 1) fail('OPERATION_INVALID');
  return Array.from({ length: value.length }, (_, index) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (!descriptor || !('value' in descriptor)) fail('OPERATION_INVALID');
    return descriptor.value;
  });
}
function placement(snapshot: GuideSnapshot, input: unknown, parent: GuideNode, allowAuto: boolean): PropertyPlacement {
  const mode = typeof input === 'object' && input !== null ? Object.getOwnPropertyDescriptor(input, 'mode')?.value : null;
  if ((mode === 'append' || allowAuto && mode === 'auto') && hasExactKeys(input, ['mode'])) {
    return Object.freeze({ mode });
  }
  if ((mode !== 'before' && mode !== 'after') || !hasExactKeys(input, ['mode', 'anchorRef'])) fail('OPERATION_INVALID');
  let anchor: ResolvedTargetRef;
  try { anchor = checkedRef(snapshot, input['anchorRef']); } catch { fail('ANCHOR_STALE'); }
  if (!anchor.parent || locationKey(anchor.parent.location) !== locationKey(parent.location)
    || anchor.parent.fingerprint !== parent.fingerprint) fail('ANCHOR_STALE');
  return Object.freeze({ mode, anchorRef: anchor });
}
function placementIndex(parent: GuideNode, place: PropertyPlacement): number {
  const children = parent.nodeKind === 'object' ? parent.properties.map(p => p.node)
    : parent.nodeKind === 'array' ? parent.elements : [];
  if (place.mode === 'append' || place.mode === 'auto') return children.length;
  const index = children.findIndex(child => locationKey(child.location) === locationKey(place.anchorRef.location));
  if (index < 0) fail('ANCHOR_STALE');
  return index + (place.mode === 'after' ? 1 : 0);
}
function operationTuple(request: OperationRequest, snapshotId: string): CanonicalValue {
  const ref = 'targetRef' in request ? request.targetRef : request.parentRef;
  const tuple: CanonicalValue[] = ['candidate-operation', 1, snapshotId, action(request.type), request.type, identityTuple(ref)];
  if ('value' in request) tuple.push(treeTuple(dataTree(request.value)));
  if ('propertyName' in request) tuple.push(request.propertyName);
  if ('placement' in request) tuple.push([request.placement.mode,
    'anchorRef' in request.placement ? identityTuple(request.placement.anchorRef) : null]);
  if ('order' in request) tuple.push(request.order.map(identityTuple));
  return tuple;
}
function prepare(snapshot: GuideSnapshot, input: unknown, wire: boolean): PreparedOperation {
  assertGuideSnapshot(snapshot);
  const type = typeof input === 'object' && input !== null ? Object.getOwnPropertyDescriptor(input, 'type')?.value : null;
  const keys = typeof type === 'string' ? requestKeys[type] : undefined;
  if (!keys || !hasExactKeys(input, wire ? [...keys, 'operationId', 'contractualAction', 'expectedSnapshotId'] : keys)) {
    fail('OPERATION_INVALID');
  }
  if (wire && input['expectedSnapshotId'] !== snapshot.snapshotId) fail('TARGET_STALE');
  const ref = checkedRef(snapshot, input[type === 'ADD_PROPERTY' || type === 'ADD_ELEMENT' || type === 'REORDER_ELEMENTS'
    ? 'parentRef' : 'targetRef']);
  const node = getSnapshotNode(snapshot, ref.location)!;
  const parent = node.parentLocation === null ? null : getSnapshotNode(snapshot, node.parentLocation)!;
  checkProtected(node);
  let request: OperationRequest, tree: DataTree | null = null, insertionIndex: number | null = null, noOp = false;
  if (type === 'UPDATE_VALUE') {
    if (!ref.propertySpan || !parent || parent.nodeKind !== 'object' || !('value' in node)) fail('OPERATION_UNSUPPORTED');
    const value = normalizeStaticData(input['value']);
    if (value !== null && typeof value === 'object') fail('OPERATION_UNSUPPORTED');
    const kind = value === null ? 'null' : typeof value;
    if (kind !== node.nodeKind) fail('TARGET_KIND_MISMATCH');
    tree = dataTree(value); noOp = Object.is(value, node.value);
    request = Object.freeze({ type, targetRef: ref, value });
  } else if (type === 'ADD_PROPERTY' || type === 'ADD_ELEMENT') {
    if (node.nodeKind !== (type === 'ADD_PROPERTY' ? 'object' : 'array')) fail('TARGET_KIND_MISMATCH');
    const value = normalizeStaticData(input['value']); tree = dataTree(value);
    const place = placement(snapshot, input['placement'], node, type === 'ADD_PROPERTY');
    insertionIndex = placementIndex(node, place);
    if (type === 'ADD_PROPERTY') {
      const name = input['propertyName']; assertPropertyName(name); checkProtected(node, name);
      if (node.location.length === 0 && !isExportName(name)) fail('OPERATION_UNSUPPORTED');
      if (node.nodeKind !== 'object') fail('TARGET_KIND_MISMATCH');
      if (node.properties.some(p => p.name === name)) fail('PROPERTY_ALREADY_EXISTS');
      const activeIndex = propertyInsertionIndex(node.properties.map(p => p.name), name, activeOrder(snapshot, node));
      if (activeIndex !== null) {
        if (place.mode !== 'auto' && insertionIndex !== activeIndex) fail('OPERATION_UNSUPPORTED');
        insertionIndex = activeIndex;
      }
      request = Object.freeze({ type, parentRef: ref, propertyName: name, value, placement: place });
    } else {
      if (place.mode === 'auto') fail('OPERATION_INVALID');
      tree = orderNewTree(tree, activeOrder(snapshot, node));
      request = Object.freeze({ type, parentRef: ref, value, placement: place });
    }
  } else if (type === 'REMOVE_PROPERTY') {
    if (!ref.propertySpan || parent?.nodeKind !== 'object') fail('OPERATION_UNSUPPORTED');
    request = Object.freeze({ type, targetRef: ref });
  } else if (type === 'REMOVE_ELEMENT') {
    if (ref.targetType !== 'array-element' || parent?.nodeKind !== 'array') fail('OPERATION_UNSUPPORTED');
    request = Object.freeze({ type, targetRef: ref });
  } else {
    if (node.nodeKind !== 'array') fail('TARGET_KIND_MISMATCH');
    const order = descriptorArray(input['order'], READ_LIMITS.maxArrayElements).map(value => checkedRef(snapshot, value));
    if (order.length !== node.elements.length || new Set(order.map(r => r.targetId)).size !== order.length
      || order.some(r => r.targetType !== 'array-element' || !r.parent
        || locationKey(r.parent.location) !== locationKey(node.location) || r.parent.fingerprint !== node.fingerprint)) {
      fail('OPERATION_INVALID');
    }
    noOp = order.every((r, index) => r.observedIndex === index);
    request = Object.freeze({ type: 'REORDER_ELEMENTS', parentRef: ref, order: Object.freeze(order) });
  }
  const operationId = digest(operationTuple(request, snapshot.snapshotId));
  if (wire && (input['operationId'] !== operationId || input['contractualAction'] !== action(type))) fail('OPERATION_INVALID');
  const operation = Object.freeze({ ...request, operationId, contractualAction: action(type), expectedSnapshotId: snapshot.snapshotId });
  return Object.freeze({ operation, node, parent, tree, insertionIndex, noOp });
}
// Host preparation binds IDs to verified refs and data. Neither API grants authorization.
export function createCandidateOperation(input: { readonly snapshot: GuideSnapshot; readonly operation: OperationRequest }): CandidateOperation {
  if (!hasExactKeys(input, ['snapshot', 'operation'])) fail('OPERATION_INVALID');
  return prepare(input.snapshot, input.operation, false).operation;
}
export function prepareCandidateOperation(snapshot: GuideSnapshot, operation: unknown): PreparedOperation {
  return prepare(snapshot, operation, true);
}
