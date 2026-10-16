import { randomBytes } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { types } from 'node:util';
import { SourceIdentityError } from './errors';
import { createAuthorizationManifest, bindAuthorizedOperation } from './authorization';
import type { AuthorizationManifest, AuthorizedOperation } from './authorization-contracts';
import { assertGuideSnapshot, getSnapshotSourceText } from './snapshot';
import { verifyResolvedTarget } from './target-locator';
import { SNAPSHOT_SCHEMA_VERSION } from './snapshot-contracts';
import { createCandidateOperation, descriptorArray, type OperationRequest } from './operations';
import { operationRef, enforceScope } from './modification-scope';
import { checkEvidence } from './evidence';
import { resolveFactoryGuideSourceIdentity, resolvedIdentityRepository, readResolvedGuideSource } from './source-identity';
import { prepareFixResult } from './prepared-result';
import { freezeResult, type PreparedFixResult } from './result-contracts';
import { hasExactKeys } from './validation';
import { buildFixerPrompt } from './fixer-prompt';
import { decodeFixerJson, fixerFingerprint, isFixerText, serializeFixerData, normalizeFixerData } from './fixer-json';
import { FIXER_SCHEMA_VERSION, FIXER_PROMPT_VERSION, FIXER_LIMITS, FixerError,
  type CreateFixRequestInput, type FixRequest, type FixCorrelation, type FixEvidence,
  type FixerHandoff, type FixerFailure, type FixerErrorCode, type FixerLaunchResult,
  type FixerPreparationResult, type SimulatedFixerEvent, type SimulatedFixerTransport } from './fixer-contracts';

export type { CreateFixRequestInput, FixRequest, FixerHandoff, FixerLaunchResult,
  FixerPreparationResult, SimulatedFixerEvent, SimulatedFixerTransport } from './fixer-contracts';

type Phase = 'OPEN' | 'RUNNING' | 'VALIDATED' | 'CONSUMED' | 'INVALID';
interface HostContext {
  readonly snapshot: CreateFixRequestInput['snapshot']; readonly manifest: AuthorizationManifest;
  readonly repoRoot: string; phase: Phase; abort?: AbortController;
  prepared?: PreparedFixResult; handoff?: FixerHandoff;
}
const requests = new WeakMap<FixRequest, HostContext>();
const handoffs = new WeakMap<FixerHandoff, FixRequest>();
const transports = new WeakMap<SimulatedFixerTransport, { readonly request: FixRequest;
  readonly events: readonly SimulatedFixerEvent[]; used: boolean }>();
const correlationKeys = ['schemaVersion', 'requestId', 'nonce', 'responseId', 'guidePath', 'sourceHash',
  'catalogHash', 'snapshotId', 'snapshotFingerprint', 'targetFingerprint', 'actionFingerprint',
  'evidenceFingerprint', 'requestFingerprint'] as const;
function fail(code: FixerErrorCode): never { throw new FixerError(code); }
function exact(value: unknown, keys: readonly string[], code: FixerErrorCode): Record<string, unknown> {
  if (types.isProxy(value) || !hasExactKeys(value, keys) || ![null, Object.prototype].includes(Object.getPrototypeOf(value))
    || Object.values(Object.getOwnPropertyDescriptors(value)).some(d => !d.enumerable || !('value' in d))) fail(code);
  return value;
}
function context(request: unknown): HostContext {
  if (!isHostFixRequest(request)) return fail('REQUEST_INVALID');
  return requests.get(request)!;
}
function current(request: FixRequest, host: HostContext): void {
  try {
    const identity = resolveFactoryGuideSourceIdentity({ repoRoot: host.repoRoot, guidePath: host.manifest.guidePath });
    if (fixerFingerprint(identity) !== fixerFingerprint(host.snapshot.sourceIdentity)) fail('REQUEST_CONTEXT_STALE');
    readResolvedGuideSource({ repoRoot: host.repoRoot, sourceIdentity: host.snapshot.sourceIdentity });
  } catch (error) {
    if (error instanceof SourceIdentityError) fail('REQUEST_CONTEXT_STALE');
    throw error;
  }
}
function correlation(request: FixRequest): FixCorrelation {
  return Object.fromEntries(correlationKeys.map(k => [k, request[k]])) as unknown as FixCorrelation;
}
function failure(error: unknown, requestId: string | null): FixerFailure {
  const code = error instanceof FixerError ? error.code : 'INFRASTRUCTURE_ERROR';
  const status = ['INFRASTRUCTURE_ERROR', 'UNEXPECTED_CLOSE'].includes(code) ? 'FAILED'
    : ['RUNTIME_NOT_ISOLATED', 'MODEL_UNAVAILABLE', 'REQUEST_INVALID', 'REQUEST_INACTIVE',
      'REQUEST_CONTEXT_STALE', 'HANDOFF_INVALID', 'SESSION_MISMATCH'].includes(code) ? 'BLOCKED' : 'REJECTED';
  return Object.freeze({ status, code, requestId });
}
export function isHostFixRequest(value: unknown): value is FixRequest {
  return typeof value === 'object' && value !== null && requests.has(value as FixRequest);
}
export function isHostFixerHandoff(value: unknown): value is FixerHandoff {
  return typeof value === 'object' && value !== null && handoffs.has(value as FixerHandoff);
}
// Host construction never accepts requestId/nonce or model-selected identity/permissions.
// Only explicitly selected source spans and policy-allowed evidence leave the host as data.
export function createFixRequest(input: CreateFixRequestInput): FixRequest {
  try {
    exact(input, ['snapshot', 'authorization', 'task', 'contextTargets', 'editorialConstraints', 'timeoutMs'], 'REQUEST_INVALID');
    assertGuideSnapshot(input.snapshot);
    if (!isFixerText(input.task, 8192) || !input.task.trim() || !Number.isSafeInteger(input.timeoutMs)
      || input.timeoutMs < 1 || input.timeoutMs > FIXER_LIMITS.maxTimeoutMs) fail('REQUEST_INVALID');
    const editorialConstraints = descriptorArray(normalizeFixerData(input.editorialConstraints), 32).map(value => {
      if (!isFixerText(value, 4096) || !value.trim()) return fail('REQUEST_INVALID'); return value;
    });
    const authorization = exact(normalizeFixerData(input.authorization),
      ['allowPartial', 'preconditions', 'scopeTargets', 'actions', 'evidenceBindings'], 'REQUEST_INVALID');
    const requestId = 'fix-' + randomBytes(24).toString('hex'), nonce = randomBytes(32).toString('hex');
    const manifest = createAuthorizationManifest({ snapshot: input.snapshot,
      request: { ...authorization, requestId, nonce } as Parameters<typeof createAuthorizationManifest>[0]['request'] });
    if (!manifest.authorizedActions.length) fail('REQUEST_INVALID');
    const refs = descriptorArray(normalizeFixerData(input.contextTargets), FIXER_LIMITS.maxContextTargets).map(targetRef =>
      verifyResolvedTarget({ currentSnapshot: input.snapshot, targetRef: targetRef as CreateFixRequestInput['contextTargets'][number] }));
    if (new Set(refs.map(r => r.targetId)).size !== refs.length
      || manifest.authorizedActions.some(a => !refs.some(r => r.targetId === operationRef(a.operation).targetId))) fail('REQUEST_INVALID');
    const source = getSnapshotSourceText(input.snapshot);
    const fragments = refs.map(ref => {
      const text = source.slice(ref.span.start, ref.span.end);
      const fragment = { targetId: ref.targetId, location: ref.location, fingerprint: ref.fingerprint, text };
      if (Buffer.byteLength(serializeFixerData(fragment), 'utf8') > FIXER_LIMITS.maxFragmentBytes) fail('REQUEST_LIMIT_EXCEEDED');
      return fragment;
    });
    if (Buffer.byteLength(serializeFixerData(fragments), 'utf8') > FIXER_LIMITS.maxContextBytes) fail('REQUEST_LIMIT_EXCEEDED');
    const allowed = new Set(manifest.authorizedActions.flatMap(a => [...a.evidencePolicy.allowedIds]));
    const evidence: FixEvidence[] = manifest.evidenceBindings.filter(e => allowed.has(e.evidenceId))
      .map(binding => ({ evidenceId: binding.evidenceId, fingerprint: fixerFingerprint(binding), binding }));
    const base = { schemaVersion: FIXER_SCHEMA_VERSION, promptVersion: FIXER_PROMPT_VERSION,
      requestId, nonce, responseId: randomBytes(32).toString('hex'), guidePath: manifest.guidePath,
      sourceIdentity: manifest.sourceIdentity, sourceHash: input.snapshot.sourceHash,
      catalogHash: manifest.preconditions.catalogHash, snapshotId: input.snapshot.snapshotId,
      snapshotSchemaVersion: SNAPSHOT_SCHEMA_VERSION,
      snapshotFingerprint: fixerFingerprint([SNAPSHOT_SCHEMA_VERSION, input.snapshot.snapshotId, input.snapshot.root.fingerprint]),
      targetFingerprint: fixerFingerprint([manifest.modificationScope, refs]),
      actionFingerprint: fixerFingerprint(manifest.authorizedActions), evidenceFingerprint: fixerFingerprint(evidence),
      task: input.task, editorialConstraints, actions: manifest.authorizedActions,
      availableOperations: [...new Set(manifest.authorizedActions.map(a => a.operation.type))], fragments, evidence,
      limits: { ...FIXER_LIMITS, timeoutMs: input.timeoutMs } };
    // Copy out data: no authentic manifest, snapshot, refs or source capabilities go to transport.
    const request = normalizeFixerData({ ...base, requestFingerprint: fixerFingerprint(base) }) as unknown as FixRequest;
    const serialized = serializeFixerData(request);
    if (Buffer.byteLength(serialized, 'utf8') > FIXER_LIMITS.maxRequestBytes) fail('REQUEST_LIMIT_EXCEEDED');
    // Refuse host contexts that cannot fit the same bounded data grammar as the response.
    try { decodeFixerJson(serialized); } catch (error) {
      if (error instanceof FixerError && error.code === 'OUTPUT_LIMIT_EXCEEDED') fail('REQUEST_LIMIT_EXCEEDED');
      if (error instanceof FixerError && error.code === 'JSON_MALFORMED') fail('REQUEST_INVALID');
      throw error;
    }
    const host: HostContext = { snapshot: input.snapshot, manifest,
      repoRoot: resolvedIdentityRepository(input.snapshot.sourceIdentity), phase: 'OPEN' };
    current(request, host); requests.set(request, host); return request;
  } catch (error) {
    if (error instanceof FixerError) {
      if (error.code === 'PLAN_INVALID') fail('REQUEST_INVALID');
      if (error.code === 'OUTPUT_LIMIT_EXCEEDED') fail('REQUEST_LIMIT_EXCEEDED');
      throw error;
    }
    // Never expose thrown values, filesystem paths, source content or stacks as diagnostics.
    throw new FixerError(error instanceof SourceIdentityError ? 'REQUEST_INVALID' : 'INFRASTRUCTURE_ERROR');
  }
}
export function invalidateFixRequest(request: FixRequest): void {
  const host = context(request); host.phase = 'INVALID'; host.prepared = undefined;
  host.abort?.abort(new FixerError('REQUEST_INACTIVE'));
}
// Read-only host bridge for offline provider projection. It grants no transport or write
// authority and keeps phase/freshness checks in the existing authorization boundary.
export function assertOpenFixRequest(request: FixRequest): void {
  const host = context(request);
  if (host.phase !== 'OPEN') fail('REQUEST_INACTIVE');
  current(request, host);
  if (host.phase !== 'OPEN') fail('REQUEST_INACTIVE');
}
export function getFixerRuntimeStatus() {
  return Object.freeze({ realExecutionEnabled: false as const, code: 'RUNTIME_NOT_ISOLATED' as const,
    availableTransport: 'SIMULATED_ONLY' as const, isolationEvidence: 'NO_VERIFIED_REAL_RUNTIME' as const });
}
// Not a runtime registration API. Only inert event data can be constructed here. Caller flags,
// callbacks, executable paths and provider objects can never enable real execution.
export function createSimulatedFixerTransport(input: { readonly request: FixRequest;
  readonly events: readonly SimulatedFixerEvent[] }): SimulatedFixerTransport {
  try {
    exact(input, ['request', 'events'], 'TRANSPORT_INVALID'); context(input.request);
    const events = normalizeFixerData(input.events) as unknown as readonly SimulatedFixerEvent[];
    descriptorArray(events, FIXER_LIMITS.maxTransportEvents);
    let bytes = 0;
    for (const event of events) {
      const type = typeof event === 'object' && event !== null ? event.type : null;
      exact(event, type === 'stdout' || type === 'stderr' ? ['type', 'text', 'delayMs']
        : type === 'exit' ? ['type', 'code', 'delayMs'] : ['type', 'delayMs'], 'TRANSPORT_INVALID');
      if (!['stdout', 'stderr', 'exit', 'close', 'unavailable', 'tool-call'].includes(type ?? '')
        || !Number.isSafeInteger(event.delayMs) || event.delayMs < 0 || event.delayMs > FIXER_LIMITS.maxTimeoutMs * 2) fail('TRANSPORT_INVALID');
      if (event.type === 'stdout' || event.type === 'stderr') {
        if (typeof event.text !== 'string') fail('TRANSPORT_INVALID');
        bytes += Buffer.byteLength(event.text, 'utf8');
        if (bytes > FIXER_LIMITS.maxResponseBytes * 2 + FIXER_LIMITS.maxStderrBytes) fail('TRANSPORT_INVALID');
      } else if (event.type === 'exit' && (!Number.isSafeInteger(event.code) || event.code < 0 || event.code > 255)) fail('TRANSPORT_INVALID');
    }
    const transport: SimulatedFixerTransport = Object.freeze({ kind: 'SIMULATED_ONLY' });
    transports.set(transport, { request: input.request, events, used: false }); return transport;
  } catch (error) {
    if (error instanceof FixerError) {
      if (error.code === 'PLAN_INVALID' || error.code === 'OUTPUT_LIMIT_EXCEEDED') fail('TRANSPORT_INVALID');
      throw error;
    }
    throw new FixerError(error instanceof SourceIdentityError ? 'TRANSPORT_INVALID' : 'INFRASTRUCTURE_ERROR');
  }
}
async function simulate(prompt: ReturnType<typeof buildFixerPrompt>, events: readonly SimulatedFixerEvent[],
  request: FixRequest, host: HostContext): Promise<string> {
  // The model-side interface is strings only. No host root, callbacks, handles or capabilities.
  if (prompt.version !== FIXER_PROMPT_VERSION || typeof prompt.system !== 'string' || typeof prompt.data !== 'string') fail('TRANSPORT_INVALID');
  const abort = new AbortController(); host.abort = abort;
  const timer = setTimeout(() => abort.abort(new FixerError('TIMEOUT')), request.limits.timeoutMs);
  const chunks: string[] = []; let stdout = 0, stderr = 0, exited = false;
  try {
    for (const event of events) {
      if (event.delayMs) await delay(event.delayMs, undefined, { signal: abort.signal });
      if (abort.signal.aborted) throw abort.signal.reason;
      if (host.phase !== 'RUNNING') fail('REQUEST_INACTIVE');
      if (exited) fail('DUPLICATE_RESPONSE');
      if (event.type === 'stdout' || event.type === 'stderr') {
        const bytes = Buffer.byteLength(event.text, 'utf8');
        if (event.type === 'stdout') {
          stdout += bytes; if (stdout > request.limits.maxResponseBytes) fail('OUTPUT_LIMIT_EXCEEDED'); chunks.push(event.text);
        } else { stderr += bytes; if (stderr > request.limits.maxStderrBytes) fail('OUTPUT_LIMIT_EXCEEDED'); }
      } else if (event.type === 'tool-call') fail('TOOL_CALL_FORBIDDEN');
      else if (event.type === 'unavailable') fail('MODEL_UNAVAILABLE');
      else if (event.type === 'close') fail('UNEXPECTED_CLOSE');
      else if (event.type === 'exit') { if (event.code !== 0) fail('INFRASTRUCTURE_ERROR'); exited = true; }
    }
    if (!exited) fail('UNEXPECTED_CLOSE'); return chunks.join('');
  } catch (error) { if (abort.signal.aborted) throw abort.signal.reason; throw error; }
  finally { clearTimeout(timer); host.abort = undefined; }
}
function validatePlan(request: FixRequest, host: HostContext, text: string): { handoff: FixerHandoff; prepared: PreparedFixResult } {
  const plan = exact(decodeFixerJson(text), [...correlationKeys, 'operations', 'unresolvedActionIds'], 'PLAN_INVALID');
  if (plan['schemaVersion'] !== FIXER_SCHEMA_VERSION) fail('PLAN_INVALID');
  if (correlationKeys.some(k => plan[k] !== request[k])) fail('CORRELATION_MISMATCH');
  if (!Array.isArray(plan['operations']) || plan['operations'].length > FIXER_LIMITS.maxOperations
    || !Array.isArray(plan['unresolvedActionIds']) || plan['unresolvedActionIds'].length > FIXER_LIMITS.maxOperations) fail('PLAN_INVALID');
  const seen = new Set<string>(), operationIds = new Set<string>();
  const operations: AuthorizedOperation[] = plan['operations'].map(value => {
    const raw = exact(value, typeof value === 'object' && value !== null && Object.hasOwn(value, 'value')
      ? ['actionId', 'operation', 'targetId', 'evidence', 'value'] : ['actionId', 'operation', 'targetId', 'evidence'], 'PLAN_INVALID');
    if (!isFixerText(raw['actionId'], 128, false)) fail('PLAN_INVALID');
    const action = host.manifest.authorizedActions.find(a => a.actionId === raw['actionId']);
    if (!action || seen.has(action.actionId)) fail('ACTION_NOT_AUTHORIZED'); seen.add(action.actionId);
    if (raw['targetId'] !== operationRef(action.operation).targetId) fail('TARGET_NOT_AUTHORIZED');
    if (raw['operation'] !== action.operation.type) fail('OPERATION_NOT_ALLOWED');
    if (Object.hasOwn(raw, 'value') !== ('value' in action.operation)) fail('PLAN_INVALID');
    if (!Array.isArray(raw['evidence']) || raw['evidence'].length > request.evidence.length) fail('EVIDENCE_INVALID');
    const evidenceIds = raw['evidence'].map(item => {
      const e = exact(item, ['evidenceId', 'fingerprint'], 'EVIDENCE_INVALID');
      const binding = request.evidence.find(b => b.evidenceId === e['evidenceId']);
      if (!binding || e['fingerprint'] !== binding.fingerprint || !action.evidencePolicy.allowedIds.includes(binding.evidenceId)) fail('EVIDENCE_INVALID');
      return binding.evidenceId;
    });
    if (new Set(evidenceIds).size !== evidenceIds.length) fail('EVIDENCE_INVALID');
    try { checkEvidence(action, evidenceIds, host.manifest.evidenceBindings); }
    catch (error) { if (error instanceof SourceIdentityError) fail('EVIDENCE_INVALID'); throw error; }
    const { operationId: _id, contractualAction: _action, expectedSnapshotId: _snapshot, ...template } = action.operation;
    let payload = raw['value'];
    if ('value' in template && action.payloadConstraint.mode === 'EXACT_VALUE') {
      // JSON record-key order is not model authority over editorial property order. Compare
      // exact data canonically, then use the original ordered host payload through Phase 3–5.
      if (fixerFingerprint(payload) !== fixerFingerprint(template.value)) fail('OPERATION_NOT_ALLOWED');
      payload = template.value;
    }
    let operation;
    try {
      operation = createCandidateOperation({ snapshot: host.snapshot,
        operation: ('value' in template ? { ...template, value: payload } : template) as OperationRequest });
      operation = bindAuthorizedOperation(host.snapshot, action, operation);
      enforceScope(host.manifest.modificationScope, action.scopeId, operation);
    } catch (error) { if (error instanceof SourceIdentityError) return fail('OPERATION_NOT_ALLOWED'); throw error; }
    if (operationIds.has(operation.operationId)) fail('OPERATION_NOT_ALLOWED'); operationIds.add(operation.operationId);
    return { actionId: action.actionId, operation, evidenceIds };
  });
  for (const id of plan['unresolvedActionIds']) {
    const action = host.manifest.authorizedActions.find(a => a.actionId === id);
    if (!action || seen.has(action.actionId)) fail('ACTION_NOT_AUTHORIZED'); seen.add(action.actionId);
    if (action.requirement === 'REQUIRED') fail('ACTION_UNRESOLVED');
  }
  if (seen.size !== host.manifest.authorizedActions.length) fail('ACTION_UNRESOLVED');
  current(request, host);
  const prepared = prepareFixResult({ snapshot: host.snapshot, manifest: host.manifest,
    requestDigest: host.manifest.requestDigest, operations });
  if (prepared.status === 'FAILED') fail('INFRASTRUCTURE_ERROR');
  if (prepared.status !== 'READY_TO_WRITE' && prepared.status !== 'NO_CHANGE') fail('PROPOSAL_REJECTED');
  current(request, host);
  const handoff: FixerHandoff = freezeResult({ ...correlation(request), sourceIdentity: request.sourceIdentity,
    candidateHash: prepared.candidateHash, operationIds: operations.map(p => p.operation.operationId),
    sourceWrite: false, writeAuthorized: false });
  return { handoff, prepared };
}
// The only invocation path is a branded, single-use, request-bound simulator. Real provider
// objects and self-reported isolation flags are rejected without invoking any caller function.
export async function launchFixer(input: { readonly request: FixRequest;
  readonly transport: SimulatedFixerTransport | null }): Promise<FixerLaunchResult> {
  let host: HostContext | undefined, requestId: string | null = null, ownsSession = false;
  try {
    exact(input, ['request', 'transport'], 'REQUEST_INVALID'); host = context(input.request); requestId = input.request.requestId;
    if (host.phase !== 'OPEN') fail('REQUEST_INACTIVE');
    const transport = typeof input.transport === 'object' && input.transport !== null ? transports.get(input.transport) : undefined;
    if (!transport) fail('RUNTIME_NOT_ISOLATED');
    if (transport.request !== input.request || transport.used) fail('SESSION_MISMATCH');
    host.phase = 'RUNNING'; transport.used = true; ownsSession = true;
    current(input.request, host);
    const text = await simulate(buildFixerPrompt(input.request), transport.events, input.request, host);
    if (host.phase !== 'RUNNING') fail('REQUEST_INACTIVE');
    const validated = validatePlan(input.request, host, text);
    if (host.phase !== 'RUNNING') fail('REQUEST_INACTIVE');
    host.prepared = validated.prepared; host.handoff = validated.handoff; host.phase = 'VALIDATED';
    handoffs.set(validated.handoff, input.request);
    return Object.freeze({ status: 'PROPOSAL_VALID', handoff: validated.handoff });
  } catch (error) {
    if (host && ownsSession) { host.phase = 'INVALID'; host.prepared = undefined; }
    return failure(error, requestId);
  }
}
// One-shot host adaptation to the existing Phase 5 result. Re-check current source/catalog;
// no lease, lock, writer, QA or persistence. Clones/spreads/JSON cannot enter this gate.
export function prepareFixerHandoff(input: { readonly request: FixRequest;
  readonly handoff: FixerHandoff }): FixerPreparationResult {
  let host: HostContext | undefined, requestId: string | null = null;
  try {
    exact(input, ['request', 'handoff'], 'HANDOFF_INVALID'); host = context(input.request); requestId = input.request.requestId;
    if (!isHostFixerHandoff(input.handoff) || handoffs.get(input.handoff) !== input.request
      || host.handoff !== input.handoff) fail('HANDOFF_INVALID');
    if (host.phase !== 'VALIDATED' || !host.prepared) fail('REQUEST_INACTIVE');
    current(input.request, host);
    if (host.phase !== 'VALIDATED' || !host.prepared) fail('REQUEST_INACTIVE');
    const preparedResult = host.prepared;
    host.phase = 'CONSUMED'; host.prepared = undefined;
    return Object.freeze({ status: 'PREPARED', preparedResult });
  } catch (error) {
    if (host && error instanceof FixerError && error.code === 'REQUEST_CONTEXT_STALE') {
      host.phase = 'INVALID'; host.prepared = undefined;
    }
    return failure(error, requestId);
  }
}
