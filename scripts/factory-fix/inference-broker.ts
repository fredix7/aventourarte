import { setTimeout as delay } from 'node:timers/promises';
import { performance } from 'node:perf_hooks';
import { FIXER_LIMITS, FixerError, type FixRequest, type FixerLaunchResult } from './fixer-contracts';
import { assertOpenFixRequest, createSimulatedFixerTransport, launchFixer, invalidateFixRequest } from './fixer-launcher';
import { buildFixerPrompt } from './fixer-prompt';
import { normalizeFixerData, serializeFixerData } from './fixer-json';
import { buildInferenceSchema } from './inference-schema';
import { INFERENCE_PROFILE, InferenceError, inferenceFail, type OfflineInferenceProjection,
  type OfflineProjectionInput, type OfflineResponsesTransport, type OfflineProviderReply } from './inference-contracts';
import { inferenceEnvelope } from './inference-data';
import { decodeOfflineResponsesReply } from './inference-response';
import { reserveOfflineInference, settleOfflineInference, type OfflineInferenceBudget } from './inference-budget';

interface ProjectionState { request: FixRequest; phase: 'OPEN' | 'RUNNING' | 'FINISHED' | 'CANCELLED'; abort?: AbortController }
const projections = new WeakMap<OfflineInferenceProjection, ProjectionState>();
const transports = new WeakMap<OfflineResponsesTransport, { projection: OfflineInferenceProjection; reply: OfflineProviderReply; used: boolean }>();
let active = false; // Host-wide single flight, including across separate offline budgets.
function context(projection: OfflineInferenceProjection): ProjectionState {
  const s = projections.get(projection); if (!s) inferenceFail('PROJECTION_INVALID'); return s;
}
export function getOfflineInferencePolicy() {
  return Object.freeze({ ...INFERENCE_PROFILE, runtimeStatus: 'RUNTIME_NOT_ISOLATED' as const,
    availableTransport: 'OFFLINE_RESPONSES_ONLY' as const, inputTokenLimitVerified: false,
    realConnectivityGate: 'BLOCKED_REQUIRES_SEPARATE_REVIEW' as const });
}
export function createOfflineInferenceProjection(input: OfflineProjectionInput): OfflineInferenceProjection {
  const d = inferenceEnvelope(input, ['request']), request = d['request'] as FixRequest;
  assertOpenFixRequest(request);
  const prompt = buildFixerPrompt(request), schema = buildInferenceSchema(request);
  const body = normalizeFixerData({ model: INFERENCE_PROFILE.model, tools: [], tool_choice: 'none',
    store: false, stream: false, background: false, parallel_tool_calls: false, service_tier: 'default',
    max_output_tokens: INFERENCE_PROFILE.maxOutputTokens,
    reasoning: { effort: 'none' }, instructions: prompt.system,
    input: [{ role: 'user', content: [{ type: 'input_text', text: prompt.data }] }],
    text: { format: { type: 'json_schema', name: 'factory_fix_plan_v1', strict: true, schema } } });
  const serializedBody = serializeFixerData(body);
  if (Buffer.byteLength(serializedBody, 'utf8') > FIXER_LIMITS.maxRequestBytes) throw new FixerError('REQUEST_LIMIT_EXCEEDED');
  const projection = Object.freeze({ kind: 'OFFLINE_RESPONSES_PROJECTION', endpoint: INFERENCE_PROFILE.endpoint,
    method: 'POST', body, serializedBody }) as OfflineInferenceProjection;
  projections.set(projection, { request, phase: 'OPEN' }); return projection;
}
export function createOfflineResponsesTransport(input: { readonly projection: OfflineInferenceProjection;
  readonly reply: OfflineProviderReply }): OfflineResponsesTransport {
  const d = inferenceEnvelope(input, ['projection', 'reply']), projection = d['projection'] as OfflineInferenceProjection;
  const host = context(projection);
  if (host.phase !== 'OPEN') inferenceFail('PROJECTION_INACTIVE');
  assertOpenFixRequest(host.request);
  const r = inferenceEnvelope(d['reply'], ['status', 'body', 'delayMs']);
  if (!Number.isSafeInteger(r['status']) || (r['status'] as number) < 100 || (r['status'] as number) > 599
    || typeof r['body'] !== 'string' || Buffer.byteLength(r['body'], 'utf8') > FIXER_LIMITS.maxResponseBytes * 2
    || !Number.isSafeInteger(r['delayMs']) || (r['delayMs'] as number) < 0
    || (r['delayMs'] as number) > FIXER_LIMITS.maxTimeoutMs * 2) inferenceFail('INFERENCE_INPUT_INVALID');
  const reply = Object.freeze({ status: r['status'], body: r['body'], delayMs: r['delayMs'] }) as OfflineProviderReply;
  const token = Object.freeze({ kind: 'OFFLINE_RESPONSES_ONLY' }) as OfflineResponsesTransport;
  transports.set(token, { projection, reply, used: false }); return token;
}
export function cancelOfflineInference(projection: OfflineInferenceProjection): void {
  const s = context(projection);
  if (s.phase === 'FINISHED' || s.phase === 'CANCELLED') return;
  s.phase = 'CANCELLED'; s.abort?.abort(new InferenceError('INFERENCE_CANCELLED')); invalidateFixRequest(s.request);
}
export async function runOfflineInference(input: { readonly projection: OfflineInferenceProjection;
  readonly transport: OfflineResponsesTransport; readonly budget: OfflineInferenceBudget }): Promise<FixerLaunchResult | Readonly<{
    status: 'BLOCKED'; code: string; requestId: string | null }>> {
  let host: ProjectionState | undefined, reservation: object | undefined, owns = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const d = inferenceEnvelope(input, ['projection', 'transport', 'budget']);
    const projection = d['projection'] as OfflineInferenceProjection; host = context(projection);
    if (host.phase !== 'OPEN') inferenceFail('PROJECTION_INACTIVE');
    assertOpenFixRequest(host.request);
    const transport = transports.get(d['transport'] as OfflineResponsesTransport);
    if (!transport || transport.projection !== projection || transport.used) inferenceFail('PROJECTION_INVALID');
    if (active) inferenceFail('CONCURRENCY_EXCEEDED');
    reservation = reserveOfflineInference(d['budget'] as OfflineInferenceBudget);
    active = true; owns = true; host.phase = 'RUNNING'; transport.used = true;
    const abort = new AbortController(); host.abort = abort;
    const deadline = performance.now() + host.request.limits.timeoutMs;
    const withinDeadline = (): void => {
      if (performance.now() >= deadline) throw new FixerError('TIMEOUT');
      if (abort.signal.aborted) throw abort.signal.reason;
    };
    timer = setTimeout(() => abort.abort(new FixerError('TIMEOUT')), host.request.limits.timeoutMs);
    if (transport.reply.delayMs) await delay(transport.reply.delayMs, undefined, { signal: abort.signal });
    withinDeadline();
    if (host.phase !== 'RUNNING') inferenceFail('PROJECTION_INACTIVE');
    assertOpenFixRequest(host.request);
    const decoded = decodeOfflineResponsesReply(transport.reply);
    withinDeadline();
    const pending = reservation; reservation = undefined;
    settleOfflineInference(pending, decoded.usage);
    // No new authorization/rehydration API: the original Phase 8 simulator and validators
    // mint the handoff in their private maps. A provider envelope itself grants nothing.
    const simulator = createSimulatedFixerTransport({ request: host.request, events: [
      { type: 'stdout', text: decoded.text, delayMs: 0 }, { type: 'exit', code: 0, delayMs: 0 }] });
    const result = await launchFixer({ request: host.request, transport: simulator });
    withinDeadline();
    return result;
  } catch (error) {
    const reason = host?.abort?.signal.aborted ? host.abort.signal.reason : error;
    const code = reason instanceof FixerError || reason instanceof InferenceError ? reason.code : 'INFRASTRUCTURE_ERROR';
    if (owns && host) invalidateFixRequest(host.request);
    return Object.freeze({ status: 'BLOCKED', code, requestId: host?.request.requestId ?? null });
  } finally {
    if (timer) clearTimeout(timer);
    if (reservation) settleOfflineInference(reservation);
    if (owns && host) { active = false; host.abort = undefined; if (host.phase !== 'CANCELLED') host.phase = 'FINISHED'; }
  }
}
