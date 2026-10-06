import * as ts from 'typescript';
import { createHash } from 'node:crypto';
import { fail, SourceIdentityError } from './errors';
import { digest, locationKey, type CanonicalValue } from './fingerprint';
import { activeOrder, orderNewTree } from './property-order';
import { CANDIDATE_LIMITS, descriptorArray, prepareCandidateOperation,
  type CandidateOperation, type PreparedOperation } from './operations';
import { assertGuideSnapshot, getSnapshotSourceText } from './snapshot';
import { inspectGuideExport } from './source-identity';
import { READ_LIMITS, type GuideNode, type GuideSnapshot, type ResolvedTargetRef, type StructuralLocation } from './snapshot-contracts';
import { applyTextEdits, operationEdits, verifyOutsideEdits, type TextEdit } from './span-edits';
import { guideTree, sameTree, treeTuple, type DataTree } from './static-data';
import { readStaticGuideRoot } from './static-value';
import { hasExactKeys } from './validation';

export interface ChangedTarget {
  readonly operationId: string; readonly initialTarget: ResolvedTargetRef;
  readonly beforeFingerprint: string; readonly payloadDigest: string | null;
}
export interface CandidateBuildResult {
  readonly snapshotId: string; readonly sourceHash: string; readonly candidateText: string;
  readonly candidateHash: string; readonly candidateByteLength: number;
  readonly appliedOperations: readonly string[]; readonly noOpOperations: readonly string[];
  readonly editRecords: readonly TextEdit[]; readonly changedTargets: readonly ChangedTarget[];
  readonly diagnostics: { readonly reparsed: true; readonly structureVerified: true; readonly outsideEditsPreserved: true };
}
function contains(a: StructuralLocation, b: StructuralLocation): boolean {
  return a.length <= b.length && a.every((step, i) => locationKey([step]) === locationKey([b[i]]));
}
function conflicts(snapshot: GuideSnapshot, prepared: readonly PreparedOperation[]): void {
  const seen = new Set<string>();
  prepared.forEach(item => {
    if (seen.has(item.operation.operationId)) fail('OPERATION_CONFLICT');
    seen.add(item.operation.operationId);
  });
  for (let i = 0; i < prepared.length; i++) for (let j = i + 1; j < prepared.length; j++) {
    const a = prepared[i], b = prepared[j];
    const same = locationKey(a.node.location) === locationKey(b.node.location);
    const distinctAdds = same && a.operation.type === 'ADD_PROPERTY' && b.operation.type === 'ADD_PROPERTY'
      && a.operation.propertyName !== b.operation.propertyName;
    if (distinctAdds && a.operation.type === 'ADD_PROPERTY' && b.operation.type === 'ADD_PROPERTY') {
      // Validate combined ADD keys too: two individually absent foto/fotos must not bypass PENDING.
      orderNewTree({ kind: 'object', properties: [
        { name: a.operation.propertyName, tree: a.tree! }, { name: b.operation.propertyName, tree: b.tree! }
      ] }, activeOrder(snapshot, a.node));
    }
    if (!distinctAdds && (contains(a.node.location, b.node.location) || contains(b.node.location, a.node.location))) {
      fail('OPERATION_CONFLICT');
    }
    // Membership mutations to one original array are deliberately not composed in v1.
    const arrayA = a.operation.type === 'REMOVE_ELEMENT' ? a.parent : a.node.nodeKind === 'array' ? a.node : null;
    const arrayB = b.operation.type === 'REMOVE_ELEMENT' ? b.parent : b.node.nodeKind === 'array' ? b.node : null;
    if (arrayA && arrayB && locationKey(arrayA.location) === locationKey(arrayB.location)) fail('OPERATION_CONFLICT');
    // Anchors must survive unchanged through the batch, never be deleted/updated/reordered implicitly.
    for (const [anchored, other] of [[a, b], [b, a]]) {
      if (other.operation.type !== 'ADD_PROPERTY' && 'placement' in anchored.operation && 'anchorRef' in anchored.operation.placement
        && (contains(other.node.location, anchored.operation.placement.anchorRef.location)
          || contains(anchored.operation.placement.anchorRef.location, other.node.location))) fail('OPERATION_CONFLICT');
    }
  }
}
// Apply intent to the logical original tree independently of text editing. All lookups use
// original locations; filtering/insertion never feeds shifted indices into another operation.
function expectedTree(node: GuideNode, prepared: readonly PreparedOperation[]): DataTree {
  const here = prepared.filter(p => p.node === node);
  const update = here.find(p => p.operation.type === 'UPDATE_VALUE');
  if (update) return update.tree!;
  if ('value' in node) return guideTree(node);
  if (node.nodeKind === 'object') {
    const retained = node.properties.filter(property => !prepared.some(p => p.node === property.node
      && p.operation.type === 'REMOVE_PROPERTY'));
    const properties = retained.map(property => ({ name: property.name, tree: expectedTree(property.node, prepared),
      originalIndex: node.properties.indexOf(property) }));
    const additions = here.filter(p => p.operation.type === 'ADD_PROPERTY').sort((a, b) => a.insertionIndex! - b.insertionIndex!);
    let offset = 0;
    for (const add of additions) {
      const op = add.operation;
      if (op.type !== 'ADD_PROPERTY') fail('OPERATION_INVALID');
      const index = properties.filter(p => p.originalIndex < add.insertionIndex!).length + offset++;
      properties.splice(index, 0, { name: op.propertyName, tree: add.tree!, originalIndex: Number.POSITIVE_INFINITY });
    }
    return Object.freeze({ kind: 'object', properties: Object.freeze(properties.map(p => Object.freeze({ name: p.name, tree: p.tree }))) });
  }
  const reorder = here.find(p => p.operation.type === 'REORDER_ELEMENTS');
  let elements: DataTree[];
  if (reorder && reorder.operation.type === 'REORDER_ELEMENTS') {
    elements = reorder.operation.order.map(ref => guideTree(node.elements[ref.observedIndex!]));
  } else {
    elements = node.elements.filter(element => !prepared.some(p => p.node === element && p.operation.type === 'REMOVE_ELEMENT'))
      .map(element => expectedTree(element, prepared));
    const add = here.find(p => p.operation.type === 'ADD_ELEMENT');
    if (add) elements.splice(add.insertionIndex!, 0, add.tree!);
  }
  return Object.freeze({ kind: 'array', elements: Object.freeze(elements) });
}
// Internal verifier is separately testable for tampering. It is not a raw-source operation API.
export function verifyCandidateStructure(snapshot: GuideSnapshot, candidate: string, expected: DataTree): void {
  assertGuideSnapshot(snapshot);
  let root: GuideNode;
  try {
    const source = ts.createSourceFile(snapshot.sourceIdentity.sourcePath, candidate, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
    const diagnostics = (source as ts.SourceFile & { parseDiagnostics: readonly ts.Diagnostic[] }).parseDiagnostics;
    if (diagnostics.length) fail('CANDIDATE_INVALID');
    const exported = inspectGuideExport(source, snapshot.sourceIdentity.exportName);
    if (exported.guidePath !== snapshot.sourceIdentity.guidePath) fail('CANDIDATE_INVALID');
    root = readStaticGuideRoot(exported.root, source);
  } catch (error) {
    if (error instanceof SourceIdentityError && error.code === 'CANDIDATE_INVALID') throw error;
    if (error instanceof SourceIdentityError && error.code === 'SNAPSHOT_LIMIT_EXCEEDED') fail('CANDIDATE_LIMIT_EXCEEDED');
    fail('CANDIDATE_INVALID');
  }
  if (!sameTree(guideTree(root), expected)) fail('CANDIDATE_STRUCTURE_MISMATCH');
}
export function buildCandidate(input: { readonly snapshot: GuideSnapshot; readonly operations: readonly CandidateOperation[] }): CandidateBuildResult {
  if (!hasExactKeys(input, ['snapshot', 'operations'])) fail('OPERATION_INVALID');
  assertGuideSnapshot(input.snapshot);
  const { snapshot } = input;
  let payloadNodes = 0, payloadStrings = 0;
  const countPayload = (tree: DataTree): void => {
    if (++payloadNodes > READ_LIMITS.maxNodes) fail('CANDIDATE_LIMIT_EXCEEDED');
    if (tree.kind === 'scalar') {
      if (typeof tree.value === 'string') payloadStrings += tree.value.length;
    } else if (tree.kind === 'array') tree.elements.forEach(countPayload);
    else tree.properties.forEach(property => { payloadStrings += property.name.length; countPayload(property.tree); });
    if (payloadStrings > READ_LIMITS.maxTotalStringLength) fail('CANDIDATE_LIMIT_EXCEEDED');
  };
  const prepared = descriptorArray(input.operations, CANDIDATE_LIMITS.maxOperations).map(op => {
    const item = prepareCandidateOperation(snapshot, op);
    if (item.tree) countPayload(item.tree);
    return item;
  });
  conflicts(snapshot, prepared);
  const source = getSnapshotSourceText(snapshot);
  const edits: TextEdit[] = [];
  let replacementBytes = 0;
  for (const item of prepared) {
    for (const edit of operationEdits(source, item)) {
      replacementBytes += Buffer.byteLength(edit.replacement, 'utf8');
      if (replacementBytes > CANDIDATE_LIMITS.maxReplacementBytes || edits.length >= CANDIDATE_LIMITS.maxEdits) {
        fail('CANDIDATE_LIMIT_EXCEEDED');
      }
      edits.push(edit);
    }
  }
  // Root braces/export/prefix/suffix are never writable, even for root-level editorial ADDs.
  if (edits.some(item => item.start <= snapshot.root.span.start || item.end >= snapshot.root.span.end)) fail('TARGET_PROTECTED');
  const candidate = applyTextEdits(source, edits);
  const expected = expectedTree(snapshot.root, prepared);
  verifyCandidateStructure(snapshot, candidate.text, expected);
  verifyOutsideEdits(source, candidate.text, candidate.edits);
  const active = prepared.filter(item => !item.noOp);
  const changedTargets = active.map(item => {
    const initialTarget = 'targetRef' in item.operation ? item.operation.targetRef : item.operation.parentRef;
    const payload: CanonicalValue | null = item.tree ? treeTuple(item.tree) : null;
    return Object.freeze({ operationId: item.operation.operationId, initialTarget,
      beforeFingerprint: item.node.fingerprint, payloadDigest: payload ? digest(payload) : null });
  });
  return Object.freeze({ snapshotId: snapshot.snapshotId, sourceHash: snapshot.sourceHash,
    candidateText: candidate.text, candidateHash: createHash('sha256').update(Buffer.from(candidate.text, 'utf8')).digest('hex'),
    candidateByteLength: Buffer.byteLength(candidate.text, 'utf8'),
    appliedOperations: Object.freeze(active.map(item => item.operation.operationId)),
    noOpOperations: Object.freeze(prepared.filter(item => item.noOp).map(item => item.operation.operationId)),
    editRecords: candidate.edits, changedTargets: Object.freeze(changedTargets),
    diagnostics: Object.freeze({ reparsed: true, structureVerified: true, outsideEditsPreserved: true }) });
}
