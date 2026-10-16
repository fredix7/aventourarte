import { types, TextDecoder } from 'node:util';
import { setTimeout as delay } from 'node:timers/promises';
import { createHash } from 'node:crypto';
import { FIXER_LIMITS } from './fixer-contracts';
import { INFERENCE_PROFILE, inferenceFail, type OfflineInferenceProjection } from './inference-contracts';
import { inferenceEnvelope, inferenceRecord } from './inference-data';
import { decodeFixerJson, serializeFixerData } from './fixer-json';

// Sources reviewed 2026-10-16: official Responses input_tokens reference and
// https://developers.openai.com/api/docs/guides/token-counting . Count accepts
// input-affecting fields, not create-only store/stream/background/tier/output cap.
// TLS/DNS settings below are requirements for a FUTURE reviewed implementation,
// not evidence of real connectivity. No reachable network client or credential resolver
// exists here; the separate dormant 9F module is deliberately outside broker imports.
export const OFFLINE_HTTPS_POLICY = Object.freeze({ version: 'responses-https-design-9e-v1',
  origin: 'https://api.openai.com', hostname: 'api.openai.com', port: 443, protocol: 'https:', method: 'POST',
  inferencePath: '/v1/responses', countPath: '/v1/responses/input_tokens', model: INFERENCE_PROFILE.model,
  redirects: 0, retries: 0, fallback: false, tools: false, streaming: false, background: false,
  persistentConversation: false, proxy: 'FORBIDDEN', environmentProxy: 'NEVER_READ_OR_INHERIT',
  futureEnvironmentPolicy: 'CLEAN_ALLOWLIST_NO_PROXY_TLS_OVERRIDES_OR_NODE_PRELOAD',
  tlsCertificateVerificationRequired: true, tlsHostnameVerificationRequired: true,
  rejectLoopbackPrivateLinkLocalAndReservedAddresses: true, dnsRebindingProtectionRequired: true,
  realTlsDnsSocketsVerified: false, networkImplementation: 'ABSENT', credentials: 'SYNTHETIC_LITERAL_ONLY',
  realCredentialAccess: false, countEvidence: 'SIMULATED_ONLY', countEndpointBillingVerified: false,
  localAbortProvesRemoteCancellation: false, realPricingConfigured: false,
  futureCredentialOwner: 'TRUSTED_HOST_DEDICATED_API_PROJECT', secretStorage: 'NOT_IMPLEMENTED',
  realConnectivityGate: 'BLOCKED_REQUIRES_SEPARATE_REVIEW', runtimeStatus: 'RUNTIME_NOT_ISOLATED',
  maxHeaderBytes: 8192, maxHeaders: 32, maxHeaderValueBytes: 1024, maxChunks: 128,
  maxChunkBytes: 65536, maxBodyBytes: FIXER_LIMITS.maxResponseBytes, maxCountBodyBytes: 1024,
  maxInputTokens: 16000, maxOutputTokens: 4096, maxTimeoutMs: 30000, maxConcurrency: 1 } as const);
export interface OfflineHttpReply {
  readonly status: number;
  readonly headers: readonly Readonly<{ name: string; value: string }>[];
  readonly chunks: readonly Readonly<{ bytes: readonly number[]; delayMs: number }>[];
}
declare const httpResponseBrand: unique symbol;
export interface SimulatedHttpResponse { readonly [httpResponseBrand]: true }
interface ReplyState { status: number; headers: Readonly<Record<string, string>>;
  chunks: readonly { bytes: Buffer; delayMs: number }[]; used: boolean }
const replies = new WeakMap<SimulatedHttpResponse, ReplyState>();
export function discardOfflineHttpReply(token: SimulatedHttpResponse): void { replies.delete(token); }
const hash = (value: string): string => createHash('sha256').update(value, 'utf8').digest('hex');
const countKeys = ['model', 'input', 'instructions', 'parallel_tool_calls', 'reasoning', 'text', 'tools', 'tool_choice', 'truncation'];
const createOnlyKeys = ['store', 'stream', 'background', 'service_tier', 'max_output_tokens'];

export function buildOfflineHttpRequests(projection: OfflineInferenceProjection) {
  const body = inferenceRecord(projection.body, [...countKeys, ...createOnlyKeys]);
  if (body['model'] !== INFERENCE_PROFILE.model || body['store'] !== false || body['stream'] !== false
    || body['background'] !== false || body['service_tier'] !== 'default' || body['max_output_tokens'] !== 4096
    || body['tool_choice'] !== 'none' || body['parallel_tool_calls'] !== false || body['truncation'] !== 'disabled'
    || !Array.isArray(body['tools']) || body['tools'].length) inferenceFail('TOKEN_BINDING_INVALID');
  const serialized = serializeFixerData(body);
  if (serialized !== projection.serializedBody || projection.endpoint !== INFERENCE_PROFILE.endpoint
    || projection.method !== 'POST') inferenceFail('TOKEN_BINDING_INVALID');
  const countBody = Object.fromEntries(countKeys.map(k => [k, body[k]]));
  const countSerialized = serializeFixerData(countBody);
  const frame = (path: string, data: string) => {
    const bodyBytes = Buffer.byteLength(data, 'utf8');
    if (bodyBytes > FIXER_LIMITS.maxRequestBytes) inferenceFail('HTTP_BODY_LIMIT');
    // Public metadata has no bearer. Hashes correlate data, never grant authority.
    return Object.freeze({ protocol: 'https:', hostname: 'api.openai.com', port: 443, method: 'POST', path,
      body: data, bodyBytes, digest: hash(data), headers: Object.freeze({
        'content-type': 'application/json', accept: 'application/json', 'content-length': String(bodyBytes) }) });
  };
  return Object.freeze({ inference: frame(OFFLINE_HTTPS_POLICY.inferencePath, serialized),
    count: frame(OFFLINE_HTTPS_POLICY.countPath, countSerialized),
    bindingDigest: hash(serializeFixerData([serialized, countSerialized])), evidence: 'SIMULATED_ONLY' as const });
}
export type OfflineHttpRequests = ReturnType<typeof buildOfflineHttpRequests>;

// Inspect descriptors before elements: no caller callbacks, getters or iterators.
export function inertHttpArray(value: unknown, max: number): unknown[] {
  if (types.isProxy(value) || !Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) inferenceFail('HTTP_RESPONSE_INVALID');
  const length = Object.getOwnPropertyDescriptor(value, 'length')?.value;
  if (!Number.isSafeInteger(length) || length < 0 || length > max) inferenceFail('HTTP_RESPONSE_INVALID');
  if (Reflect.ownKeys(value).length !== length + 1) inferenceFail('HTTP_RESPONSE_INVALID');
  const result: unknown[] = [];
  for (let i = 0; i < length; i++) {
    const d = Object.getOwnPropertyDescriptor(value, String(i));
    if (!d || !d.enumerable || !('value' in d)) inferenceFail('HTTP_RESPONSE_INVALID');
    result.push(d.value);
  }
  return result;
}
export function copyHttpBytes(value: unknown): Buffer {
  const values = inertHttpArray(value, OFFLINE_HTTPS_POLICY.maxChunkBytes);
  if (values.some(v => !Number.isInteger(v) || (v as number) < 0 || (v as number) > 255)) inferenceFail('HTTP_RESPONSE_INVALID');
  return Buffer.from(values as number[]);
}
export function snapshotOfflineHttpReply(input: OfflineHttpReply, count = false): SimulatedHttpResponse {
  const d = inferenceEnvelope(input, ['status', 'headers', 'chunks']);
  if (!Number.isSafeInteger(d['status']) || (d['status'] as number) < 100 || (d['status'] as number) > 599) inferenceFail('HTTP_RESPONSE_INVALID');
  const headers: Record<string, string> = Object.create(null); let headerBytes = 2;
  for (const item of inertHttpArray(d['headers'], OFFLINE_HTTPS_POLICY.maxHeaders)) {
    const h = inferenceEnvelope(item, ['name', 'value']), name = h['name'], value = h['value'];
    if (typeof name !== 'string' || name.length > 128 || !/^[a-zA-Z0-9-]+$/.test(name)
      || typeof value !== 'string' || value.length > 1024 || /[^\x20-\x7e]/.test(value)) inferenceFail('HTTP_RESPONSE_INVALID');
    const key = name.toLowerCase();
    if (Object.hasOwn(headers, key)) inferenceFail('HTTP_RESPONSE_INVALID');
    headerBytes += Buffer.byteLength(name + ': ' + value + '\r\n', 'utf8');
    if (headerBytes > OFFLINE_HTTPS_POLICY.maxHeaderBytes) inferenceFail('HTTP_HEADER_LIMIT');
    headers[key] = value;
  }
  let size = 0;
  const chunks = inertHttpArray(d['chunks'], OFFLINE_HTTPS_POLICY.maxChunks).map(item => {
    const c = inferenceEnvelope(item, ['bytes', 'delayMs']);
    if (!Number.isSafeInteger(c['delayMs']) || (c['delayMs'] as number) < 0 || (c['delayMs'] as number) > 60000) inferenceFail('HTTP_RESPONSE_INVALID');
    const bytes = copyHttpBytes(c['bytes']);
    size += bytes.length;
    if (size > (count ? OFFLINE_HTTPS_POLICY.maxCountBodyBytes : OFFLINE_HTTPS_POLICY.maxBodyBytes)) inferenceFail('HTTP_BODY_LIMIT');
    return Object.freeze({ bytes, delayMs: c['delayMs'] as number });
  });
  const token = Object.freeze({}) as SimulatedHttpResponse;
  replies.set(token, { status: d['status'] as number, headers: Object.freeze(headers), chunks, used: false }); return token;
}
function statusError(status: number): never {
  if (status >= 300 && status <= 399) inferenceFail('HTTP_REDIRECT_FORBIDDEN');
  if (status === 400) inferenceFail('HTTP_BAD_REQUEST');
  if (status === 401) inferenceFail('HTTP_UNAUTHORIZED');
  if (status === 403) inferenceFail('HTTP_FORBIDDEN');
  if (status === 408) inferenceFail('HTTP_TIMEOUT');
  if (status === 429) inferenceFail('HTTP_RATE_LIMIT');
  if (status >= 500) inferenceFail('HTTP_SERVER_ERROR');
  inferenceFail('HTTP_RESPONSE_INVALID');
}
// Shared pure boundary for the 9E simulator and the dormant 9F client. No IO or
// authority is granted by a frame or this receiver.
export function assertFixedHttpRequest(request: OfflineHttpRequests['count'], count: boolean): void {
  if (request.protocol !== 'https:' || request.hostname !== 'api.openai.com' || request.port !== 443
    || request.method !== 'POST' || request.path !== (count ? OFFLINE_HTTPS_POLICY.countPath : OFFLINE_HTTPS_POLICY.inferencePath)
    || request.bodyBytes !== Buffer.byteLength(request.body, 'utf8') || request.bodyBytes > FIXER_LIMITS.maxRequestBytes
    || request.digest !== hash(request.body)) inferenceFail('TOKEN_BINDING_INVALID');
  const headers = { ...request.headers, authorization: 'Bearer SYNTHETIC_FACTORY_9E_NOT_A_KEY' };
  const headerBytes = Object.entries(headers).reduce((n, [k, v]) => n + Buffer.byteLength(k + ': ' + v + '\r\n', 'utf8'), 2);
  if (headerBytes > OFFLINE_HTTPS_POLICY.maxHeaderBytes) inferenceFail('HTTP_HEADER_LIMIT');
}
export function createBoundedHttpReceiver(status: number, headers: OfflineHttpReply['headers'], count: boolean) {
  const token = snapshotOfflineHttpReply({ status, headers, chunks: [] }, count);
  const h = replies.get(token)!.headers; replies.delete(token);
  if (status !== 200) statusError(status);
  if (!/^application\/json(?:;\s*charset=utf-8)?$/i.test(h['content-type'] ?? '')) inferenceFail('HTTP_CONTENT_TYPE_INVALID');
  if (h['content-encoding'] && h['content-encoding'] !== 'identity'
    || h['transfer-encoding'] && h['transfer-encoding'].toLowerCase() !== 'chunked'
    || h['transfer-encoding'] && h['content-length'] !== undefined) inferenceFail('HTTP_RESPONSE_INVALID');
  const max = count ? OFFLINE_HTTPS_POLICY.maxCountBodyBytes : OFFLINE_HTTPS_POLICY.maxBodyBytes;
  if (h['content-length'] !== undefined && (!/^(0|[1-9][0-9]*)$/.test(h['content-length'])
    || !Number.isSafeInteger(Number(h['content-length'])))) inferenceFail('HTTP_RESPONSE_INVALID');
  if (Number(h['content-length']) > max) inferenceFail('HTTP_BODY_LIMIT');
  const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }), parts: string[] = [];
  let bytes = 0, chunks = 0, ended = false;
  return Object.freeze({
    write(chunk: Buffer): void {
      if (ended || types.isProxy(chunk) || !Buffer.isBuffer(chunk) || ++chunks > OFFLINE_HTTPS_POLICY.maxChunks
        || chunk.length > OFFLINE_HTTPS_POLICY.maxChunkBytes) {
        ended = true; parts.length = 0; inferenceFail('HTTP_RESPONSE_INVALID');
      }
      bytes += chunk.length;
      if (bytes > max) { ended = true; parts.length = 0; inferenceFail('HTTP_BODY_LIMIT'); }
      try { parts.push(decoder.decode(chunk, { stream: true })); } catch { ended = true; parts.length = 0; inferenceFail('HTTP_RESPONSE_INVALID'); }
    },
    finish(): string {
      if (ended) inferenceFail('HTTP_RESPONSE_INVALID'); ended = true;
      try { parts.push(decoder.decode()); } catch { parts.length = 0; inferenceFail('HTTP_RESPONSE_INVALID'); }
      if (!bytes || h['content-length'] !== undefined && Number(h['content-length']) !== bytes) {
        parts.length = 0; inferenceFail('HTTP_RESPONSE_INVALID');
      }
      const text = parts.join(''); parts.length = 0; return text;
    },
    discard(): void { ended = true; parts.length = 0; }
  });
}
export async function receiveOfflineHttp(token: SimulatedHttpResponse, signal: AbortSignal,
  request: OfflineHttpRequests['count'], count: boolean): Promise<string> {
  const state = replies.get(token); if (!state || state.used) inferenceFail('HTTP_RESPONSE_INVALID');
  state.used = true; assertFixedHttpRequest(request, count);
  if (signal.aborted) throw signal.reason;
  const receiver = createBoundedHttpReceiver(state.status, Object.entries(state.headers).map(([name, value]) => ({ name, value })), count);
  try {
    for (const chunk of state.chunks) {
      if (chunk.delayMs) await delay(chunk.delayMs, undefined, { signal });
      if (signal.aborted) throw signal.reason; receiver.write(chunk.bytes);
    }
    return receiver.finish();
  } finally { receiver.discard(); }
}
export function decodeOfflineInputTokens(text: string): number {
  const d = inferenceRecord(decodeFixerJson(text), ['object', 'input_tokens']);
  const value = d['input_tokens'];
  if (d['object'] !== 'response.input_tokens' || !Number.isSafeInteger(value) || (value as number) <= 0) inferenceFail('TOKEN_COUNT_INVALID');
  if ((value as number) > OFFLINE_HTTPS_POLICY.maxInputTokens) inferenceFail('TOKEN_LIMIT_EXCEEDED');
  return value as number;
}
