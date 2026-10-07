import { createHash } from 'node:crypto';
import { authorizeCandidate, type AuthorizedCandidateResult } from './authorized-candidate';
import { assertAuthorizationManifest } from './authorization';
import { authData } from './authorization-data';
import type { AuthorizationManifest, AuthorizedOperation } from './authorization-contracts';
import { assertGuideSnapshot, getSnapshotSourceText } from './snapshot';
import type { GuideSnapshot, GuideNode, StructuralLocation } from './snapshot-contracts';
import { hasExactKeys } from './validation';
import { operationRef, sameRef } from './modification-scope';
import { prepareCandidateOperation } from './operations';
import { candidateLocation, changedLocation, readCandidateRoot } from './minimal-diff';
import { buildQaHandoff } from './qa-handoff';
import { buildFixFailure, PreparedResultError } from './result-classification';
import { RESULT_LIMITS, PREPARED_RESULT_SCHEMA_VERSION, freezeResult,
  type PreparedFixResult, type PreparedActionResult, type ChangedTarget } from './result-contracts';

export interface PrepareFixInput {
  readonly snapshot: GuideSnapshot; readonly manifest: AuthorizationManifest;
  readonly requestDigest: string; readonly operations: readonly AuthorizedOperation[];
}
const preparedResults = new WeakSet<object>();
// Shape/JSON copies cannot confer host authorization on a later write-readiness gate.
export function isHostPreparedFixResult(value: unknown): value is PreparedFixResult {
  return typeof value === 'object' && value !== null && preparedResults.has(value);
}
const sameData = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const invariant = (condition: unknown,
  known?: Pick<PreparedResultError, 'actionId' | 'operationId' | 'target'>): void => {
  if (!condition) throw new PreparedResultError('RESULT_INCONSISTENT', known?.actionId, known?.operationId, known?.target);
};
const unique = (values: readonly string[]) => new Set(values).size === values.length;

// Audit helper only: it cannot mint a READY_TO_WRITE result from an externally supplied Phase 4 shape.
// Joins/accounting and observations are checked here; authorization, minimal diff and ACTIVE stay in Phase 4.
export function assertPreparedCandidateConsistency(snapshot: GuideSnapshot, manifest: AuthorizationManifest,
  operations: readonly AuthorizedOperation[], result: AuthorizedCandidateResult): void {
  assertGuideSnapshot(snapshot); assertAuthorizationManifest(snapshot, manifest);
  invariant(result.requestId === manifest.requestId && result.requestDigest === manifest.requestDigest
    && result.guidePath === snapshot.sourceIdentity.guidePath && result.snapshotId === snapshot.snapshotId
    && result.sourceHash === snapshot.sourceHash && typeof result.candidateText === 'string'
    && result.candidateHash === createHash('sha256').update(result.candidateText, 'utf8').digest('hex'));
  invariant(sameData(result.preconditionChecks, { snapshot: true, sourceIdentity: true, catalogBinding: true, actions: true })
    && sameData(result.diagnostics, { allowPartial: false, sourceWrite: false, minimalDiff: true, activeValidation: true })
    && result.activeValidation.status === 'VALID' && result.activeValidation.findings.length === 0);
  invariant(result.authorizedActionResults.length === manifest.authorizedActions.length
    && unique(result.authorizedActionResults.map(a => a.actionId)) && unique(operations.map(p => p.actionId))
    && unique(operations.map(p => p.operation.operationId)));
  const prepared = operations.map(p => prepareCandidateOperation(snapshot, p.operation));
  const changed = operations.filter((_, i) => !prepared[i].noOp), noOps = operations.filter((_, i) => prepared[i].noOp);
  invariant(sameData(result.appliedOperationIds, changed.map(p => p.operation.operationId))
    && sameData(result.noOpOperationIds, noOps.map(p => p.operation.operationId)));
  manifest.authorizedActions.forEach((action, i) => {
    const proposed = operations.find(p => p.actionId === action.actionId), actual = result.authorizedActionResults[i];
    const isNoOp = proposed && prepared[operations.indexOf(proposed)].noOp;
    invariant(actual.actionId === action.actionId && actual.actionKey === action.actionKey
      && actual.outcome === (!proposed ? 'OMITTED' : isNoOp ? 'NO_CHANGE' : 'CHANGED')
      && actual.operationId === (proposed?.operation.operationId ?? null)
      && sameData(actual.evidenceIds, proposed?.evidenceIds ?? [])
      && (proposed || action.requirement === 'OPTIONAL'), { actionId: action.actionId,
        operationId: proposed?.operation.operationId ?? null, target: operationRef(action.operation) });
  });
  invariant(operations.every(p => manifest.authorizedActions.some(a => a.actionId === p.actionId)));
  const usedIds = new Set(operations.flatMap(p => [...p.evidenceIds]));
  invariant(sameData(result.evidenceBindingsUsed, manifest.evidenceBindings.filter(e => usedIds.has(e.evidenceId))));
  invariant(result.changedTargets.length === changed.length && result.diffAttribution.length === changed.length
    && unique(result.changedTargets.map(c => c.operationId)) && unique(result.diffAttribution.map(d => d.operationId)));
  changed.forEach(p => {
    const ref = operationRef(p.operation), observed = prepared[operations.indexOf(p)];
    const target = result.changedTargets.find(c => c.operationId === p.operation.operationId);
    const attribution = result.diffAttribution.find(c => c.operationId === p.operation.operationId);
    invariant(target && attribution && attribution.actionId === p.actionId
      && sameRef(target.initialTarget, ref) && sameRef(attribution.initialTarget, ref)
      && target.beforeFingerprint === ref.fingerprint && attribution.beforeFingerprint === ref.fingerprint
      && target.payloadDigest === attribution.payloadDigest
      && sameData(attribution.initialLocation, p.operation.type.startsWith('ADD') ? null : ref.location)
      && sameData(attribution.candidateLocation, changedLocation(observed, prepared))
      && attribution.editRecords.length > 0 && attribution.editRecords.every(e => e.operationId === p.operation.operationId
        && Number.isSafeInteger(e.start) && Number.isSafeInteger(e.end) && e.start >= 0 && e.end >= e.start
        && typeof e.replacement === 'string'), { actionId: p.actionId, operationId: p.operation.operationId, target: ref });
  });
  invariant((changed.length > 0) === (result.candidateHash !== result.sourceHash));
  if (!changed.length) invariant(result.candidateText === getSnapshotSourceText(snapshot)
    && result.candidateHash === snapshot.sourceHash && result.changedTargets.length === 0 && result.diffAttribution.length === 0);
}
function nodeAt(root: GuideNode, location: StructuralLocation): GuideNode | null {
  let node: GuideNode | undefined = root;
  for (const step of location) {
    node = 'property' in step ? node?.nodeKind === 'object' ? node.properties.find(p => p.name === step.property)?.node : undefined
      : node?.nodeKind === 'array' ? node.elements[step.element] : undefined;
  }
  return node ?? null;
}
function observations(snapshot: GuideSnapshot, operations: readonly AuthorizedOperation[], result: AuthorizedCandidateResult): readonly ChangedTarget[] {
  const prepared = operations.map(p => prepareCandidateOperation(snapshot, p.operation));
  const root = readCandidateRoot(snapshot, result.candidateText);
  return result.diffAttribution.map(attribution => {
    const proposal = operations.find(p => p.operation.operationId === attribution.operationId)!;
    const operation = proposal.operation, ref = operationRef(operation);
    const add = operation.type.startsWith('ADD'), reorder = operation.type === 'REORDER_ELEMENTS';
    const container = add || reorder ? ref : ref.parent;
    invariant(container);
    const candidateContainerLocation = candidateLocation(container!.location, prepared);
    invariant(candidateContainerLocation !== null && nodeAt(root, candidateContainerLocation!) !== null);
    const after = attribution.candidateLocation === null ? null : nodeAt(root, attribution.candidateLocation);
    invariant(attribution.candidateLocation === null || after !== null);
    const kind: ChangedTarget['kind'] = operation.type === 'UPDATE_VALUE' ? 'VALUE'
      : operation.type === 'ADD_PROPERTY' ? 'PROPERTY_ADD' : operation.type === 'REMOVE_PROPERTY' ? 'PROPERTY_REMOVE'
      : operation.type === 'ADD_ELEMENT' ? 'ELEMENT_ADD' : operation.type === 'REMOVE_ELEMENT' ? 'ELEMENT_REMOVE' : 'REORDER';
    return { actionId: proposal.actionId, operationId: operation.operationId, kind,
      originalTargetRef: add ? null : ref, originalLocation: add ? null : ref.location,
      originalContainerRef: container!, candidateLocation: attribution.candidateLocation,
      candidateContainerLocation: candidateContainerLocation!, beforeFingerprint: add ? null : ref.fingerprint,
      candidateFingerprint: after?.fingerprint ?? null, candidateNodeKind: after?.nodeKind ?? null };
  });
}
// Call only on internally constructed data, not arbitrary objects with accessors/toJSON.
export function assertResultLimits(result: PreparedFixResult): void {
  const diagnostics = Array.isArray(result.diagnostics) ? result.diagnostics : [];
  if (diagnostics.length > RESULT_LIMITS.maxDiagnostics || diagnostics.some(d => d.message.length > RESULT_LIMITS.maxDiagnosticText)) {
    throw new PreparedResultError('RESULT_LIMIT_EXCEEDED');
  }
  if ('authorizedActionResults' in result && (result.authorizedActionResults.length > RESULT_LIMITS.maxActionResults
    || result.changedTargets.length > RESULT_LIMITS.maxChangedTargets)) throw new PreparedResultError('RESULT_LIMIT_EXCEEDED');
  if (result.qaHandoff.required && result.qaHandoff.reviewContext.scope === 'targets'
    && result.qaHandoff.reviewContext.targets.length > RESULT_LIMITS.maxQaTargets) throw new PreparedResultError('RESULT_LIMIT_EXCEEDED');
  const metadata = 'candidateText' in result ? (({ candidateText: _text, ...rest }) => rest)(result) : result;
  if (Buffer.byteLength(JSON.stringify(metadata), 'utf8') > RESULT_LIMITS.maxSerializedMetadataBytes) {
    throw new PreparedResultError('RESULT_LIMIT_EXCEEDED');
  }
}
export function prepareFixResult(input: PrepareFixInput): PreparedFixResult {
  // An invalid host API envelope is a programmer error. Nested untrusted operation data is
  // descriptor-only normalized by Phase 4 helpers and returns its classified controlled failure.
  if (!hasExactKeys(input, ['snapshot', 'manifest', 'operations', 'requestDigest'])
    || ![null, Object.prototype].includes(Object.getPrototypeOf(input))
    || Object.values(Object.getOwnPropertyDescriptors(input)).some(d => !d.enumerable || !('value' in d))) {
    throw new TypeError('Invalid prepareFixResult API envelope.');
  }
  let snapshot: GuideSnapshot | undefined;
  try {
    assertGuideSnapshot(input.snapshot); snapshot = input.snapshot;
    const operations = authData(input.operations) as readonly AuthorizedOperation[];
    const result = authorizeCandidate({ ...input, operations });
    assertPreparedCandidateConsistency(snapshot, input.manifest, operations, result);
    const actionResults: PreparedActionResult[] = input.manifest.authorizedActions.map((action, i) => {
      const actual = result.authorizedActionResults[i];
      return { actionId: action.actionId, actionKey: action.actionKey, requirement: action.requirement,
        outcome: actual.outcome === 'CHANGED' ? 'CHANGED_IN_CANDIDATE' : actual.outcome === 'NO_CHANGE' ? 'NO_OP' : 'OMITTED_OPTIONAL',
        operationId: actual.operationId, target: operationRef(action.operation), contractualAction: action.contractualAction,
        technicalOperation: action.operation.type, evidenceIds: actual.evidenceIds, changed: actual.outcome === 'CHANGED',
        diagnosticCode: actual.outcome === 'CHANGED' ? 'CANDIDATE_DELTA' : actual.outcome === 'NO_CHANGE' ? 'OBJECTIVE_SATISFIED' : 'OPTIONAL_NOT_PROPOSED' };
    });
    const changedTargets = observations(snapshot, operations, result);
    const common = { schemaVersion: PREPARED_RESULT_SCHEMA_VERSION as typeof PREPARED_RESULT_SCHEMA_VERSION, requestId: result.requestId,
      requestDigest: result.requestDigest, nonce: input.manifest.nonce, guidePath: result.guidePath,
      sourceIdentity: snapshot.sourceIdentity, snapshotId: result.snapshotId, sourceHash: result.sourceHash,
      candidateHash: result.candidateHash, authorizedActionResults: actionResults,
      candidateOperationIds: result.appliedOperationIds, noOpOperationIds: result.noOpOperationIds,
      diffAttribution: result.diffAttribution, evidenceBindingsUsed: result.evidenceBindingsUsed,
      preconditionChecks: result.preconditionChecks, activeValidation: result.activeValidation,
      diagnostics: { ...result.diagnostics, persistence: 'NOT_ATTEMPTED' as const,
        currentFilesystemRevalidated: false as const, qaExecuted: false as const } };
    const output: PreparedFixResult = result.appliedOperationIds.length ? {
      ...common, status: 'READY_TO_WRITE', candidateText: result.candidateText, changedTargets,
      qaHandoff: buildQaHandoff(snapshot, changedTargets, result.candidateHash)
    } : { ...common, status: 'NO_CHANGE', changedTargets: [], qaHandoff: { required: false, reason: 'NO_CHANGE' } };
    assertResultLimits(output); freezeResult(output); preparedResults.add(output); return output;
  } catch (error) {
    // No getters or broad serialized manifest copies for failure correlation. These are hints only.
    const m: PropertyDescriptorMap = input.manifest && typeof input.manifest === 'object' ? Object.getOwnPropertyDescriptors(input.manifest) : {};
    const output = buildFixFailure(error, { ...(snapshot ? { snapshot } : {}), requestId: m['requestId']?.value,
      requestDigest: input.requestDigest, nonce: m['nonce']?.value });
    assertResultLimits(output); return output;
  }
}
