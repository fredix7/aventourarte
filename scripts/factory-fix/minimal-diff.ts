import * as ts from 'typescript';
import { fail } from './errors';
import { buildCandidate, type CandidateBuildResult } from './candidate';
import { getSnapshotSourceText } from './snapshot';
import type { GuideSnapshot, StructuralLocation, GuideNode } from './snapshot-contracts';
import type { PreparedOperation } from './operations';
import { operationRef, enforceScope } from './modification-scope';
import { locationKey } from './fingerprint';
import { verifyOutsideEdits } from './span-edits';
import { inspectGuideExport } from './source-identity';
import { readStaticGuideRoot } from './static-value';
import { guideTree, sameTree } from './static-data';
import type { AuthorizationManifest, AuthorizedAction } from './authorization-contracts';
import { assertAuthorizationManifest, bindAuthorizedOperation } from './authorization';
import { prepareCandidateOperation } from './operations';

export interface ActionBinding { readonly action: AuthorizedAction; readonly prepared: PreparedOperation }
export function readCandidateRoot(snapshot: GuideSnapshot, text: string): GuideNode {
  const source = ts.createSourceFile(snapshot.sourceIdentity.sourcePath, text, ts.ScriptTarget.ES2022, true);
  if ((source as ts.SourceFile & { parseDiagnostics: readonly ts.Diagnostic[] }).parseDiagnostics.length) fail('CANDIDATE_INVALID');
  try {
    const exported = inspectGuideExport(source, snapshot.sourceIdentity.exportName);
    if (exported.guidePath !== snapshot.sourceIdentity.guidePath) fail('CANDIDATE_INVALID');
    return readStaticGuideRoot(exported.root, source);
  } catch { fail('CANDIDATE_INVALID'); }
}
export function candidateLocation(initial: StructuralLocation, operations: readonly PreparedOperation[]): StructuralLocation | null {
  const output = [...initial];
  for (let depth = 0; depth < initial.length; depth++) {
    const step = initial[depth]; if (!('element' in step)) continue;
    const parent = initial.slice(0, depth), key = locationKey(parent);
    for (const item of operations) {
      if (item.operation.type === 'REMOVE_ELEMENT' && item.parent && locationKey(item.parent.location) === key) {
        if (item.node.observedIndex === step.element) return null;
        if (item.node.observedIndex! < step.element) output[depth] = Object.freeze({ element: step.element - 1 });
      } else if (locationKey(item.node.location) === key && item.operation.type === 'ADD_ELEMENT'
        && item.insertionIndex! <= step.element) output[depth] = Object.freeze({ element: step.element + 1 });
      else if (locationKey(item.node.location) === key && item.operation.type === 'REORDER_ELEMENTS') {
        output[depth] = Object.freeze({ element: item.operation.order.findIndex(ref => ref.observedIndex === step.element) });
      }
    }
  }
  return Object.freeze(output);
}
export function changedLocation(item: PreparedOperation, all: readonly PreparedOperation[]): StructuralLocation | null {
  const op = item.operation;
  if (op.type === 'REMOVE_PROPERTY' || op.type === 'REMOVE_ELEMENT') return null;
  const base = candidateLocation(item.node.location, all)!;
  if (op.type === 'ADD_PROPERTY') return Object.freeze([...base, Object.freeze({ property: op.propertyName })]);
  if (op.type === 'ADD_ELEMENT') return Object.freeze([...base, Object.freeze({ element: item.insertionIndex! })]);
  return base;
}
// Internal audit utility: the public authorized API never accepts caller edits/candidate text.
export function enforceMinimalDiff(snapshot: GuideSnapshot, manifest: AuthorizationManifest,
  bindings: readonly ActionBinding[], candidate: CandidateBuildResult) {
  assertAuthorizationManifest(snapshot, manifest);
  const operations = bindings.map(binding => binding.prepared.operation);
  for (const binding of bindings) {
    if (!manifest.authorizedActions.includes(binding.action)) fail('DIFF_UNATTRIBUTED');
    bindAuthorizedOperation(snapshot, binding.action, binding.prepared.operation);
    enforceScope(manifest.modificationScope, binding.action.scopeId, binding.prepared.operation);
  }
  const expected = buildCandidate({ snapshot, operations });
  const actualRoot = readCandidateRoot(snapshot, candidate.candidateText);
  const expectedRoot = readCandidateRoot(snapshot, expected.candidateText);
  if (!sameTree(guideTree(actualRoot), guideTree(expectedRoot))) fail('CANDIDATE_STRUCTURE_MISMATCH');
  if (candidate.candidateText !== expected.candidateText || candidate.candidateHash !== expected.candidateHash
    || candidate.snapshotId !== snapshot.snapshotId || candidate.sourceHash !== snapshot.sourceHash
    || candidate.candidateByteLength !== expected.candidateByteLength) fail('MINIMAL_DIFF_VIOLATION');
  // These records are produced by the technical builder, never accepted from a model.
  // Compare them directly without imposing request-metadata string limits on legal edit text.
  if (JSON.stringify(candidate.editRecords) !== JSON.stringify(expected.editRecords)
    || JSON.stringify(candidate.changedTargets) !== JSON.stringify(expected.changedTargets)
    || JSON.stringify(candidate.appliedOperations) !== JSON.stringify(expected.appliedOperations)
    || JSON.stringify(candidate.noOpOperations) !== JSON.stringify(expected.noOpOperations)) fail('DIFF_UNATTRIBUTED');
  verifyOutsideEdits(getSnapshotSourceText(snapshot), candidate.candidateText, candidate.editRecords);
  const prepared = operations.map(operation => prepareCandidateOperation(snapshot, operation));
  const observedBindings = bindings.map((binding, i) => ({ action: binding.action, prepared: prepared[i] }));
  return Object.freeze(observedBindings.filter(binding => !binding.prepared.noOp).map(binding => {
    const op = binding.prepared.operation;
    const edits = candidate.editRecords.filter(edit => edit.operationId === op.operationId);
    const target = candidate.changedTargets.find(target => target.operationId === op.operationId);
    if (!target || !edits.length) fail('DIFF_UNATTRIBUTED');
    return Object.freeze({ actionId: binding.action.actionId, operationId: op.operationId,
      initialTarget: operationRef(op), initialLocation: op.type === 'ADD_PROPERTY' || op.type === 'ADD_ELEMENT' ? null : binding.prepared.node.location,
      candidateLocation: changedLocation(binding.prepared, prepared), editRecords: Object.freeze(edits),
      beforeFingerprint: target.beforeFingerprint, payloadDigest: target.payloadDigest });
  }));
}
