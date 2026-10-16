import { types } from 'node:util';
import { setTimeout as delay } from 'node:timers/promises';
import { inferenceEnvelope } from './inference-data';
import { normalizeFixerData, serializeFixerData } from './fixer-json';
import { inferenceFail, type InferenceErrorCode } from './inference-contracts';
import { assertFixedHttpRequest, createBoundedHttpReceiver, inertHttpArray, copyHttpBytes,
  snapshotOfflineHttpReply, discardOfflineHttpReply, OFFLINE_HTTPS_POLICY,
  type OfflineHttpRequests, type OfflineHttpReply } from './inference-http';

export const HTTPS_ADAPTER_POLICY = Object.freeze({ version: '9f-dormant-v1', networkEnabled: false,
  operational: false, runtimeStatus: 'RUNTIME_NOT_ISOLATED', nativeEntryPointExported: false,
  liveCapabilityIssuer: 'ABSENT', realConnectivityVerified: false, proxy: 'FORBIDDEN',
  addressFamily: 'PUBLIC_IPV4_ONLY', ipv6: 'BLOCKED_PENDING_REVIEW', dns: 'RESOLVE_ONCE_VALIDATE_ALL_PIN_ONE_NO_FALLBACK',
  trust: 'BUNDLED_CA_AND_FIXED_HOSTNAME', cleanHostEnvironmentRequired: true,
  countCostAndQuota: 'UNKNOWN_BLOCKS_LIVE_ACTIVATION', budgetBeforeAnyPotentialSpendRequired: true } as const);
const syntheticBearer = 'SYNTHETIC_FACTORY_9F_NOT_A_KEY';

// Conservative public-unicast IPv4 policy, NOT proof of provider ownership. TLS
// identity must also succeed. IPv6 (including mapped IPv4) is deliberately blocked.
export function isAllowedHttpsAddress(address: string): boolean {
  if (typeof address !== 'string' || !/^(?:0|[1-9][0-9]{0,2})(?:\.(?:0|[1-9][0-9]{0,2})){3}$/.test(address)) return false;
  const p = address.split('.').map(Number), [a, b, c] = p;
  if (p.some(n => n > 255) || a === 0 || a === 10 || a === 127 || a >= 224
    || a === 100 && b >= 64 && b <= 127 || a === 169 && b === 254
    || a === 172 && b >= 16 && b <= 31 || a === 192 && (b === 168 || b === 0 && (c === 0 || c === 2) || b === 88 && c === 99)
    || a === 198 && (b === 18 || b === 19 || b === 51 && c === 100)
    || a === 203 && b === 0 && c === 113) return false;
  return true;
}
// Snapshot descriptors before using DNS results. No getter, iterator or Proxy may
// execute during validation; duplicates and ambiguous result shapes fail closed.
export function selectPinnedHttpsAddress(value: unknown): string {
  const addresses: string[] = [];
  try {
    for (const entry of inertHttpArray(value, 16)) {
      const d = inferenceEnvelope(entry, ['address', 'family']);
      if (d['family'] !== 4 || typeof d['address'] !== 'string' || !isAllowedHttpsAddress(d['address'])
        || addresses.includes(d['address'])) inferenceFail('HTTPS_ADDRESS_FORBIDDEN');
      addresses.push(d['address']);
    }
  } catch { inferenceFail('HTTPS_ADDRESS_FORBIDDEN'); }
  if (!addresses.length) inferenceFail('HTTPS_ADDRESS_FORBIDDEN');
  return addresses[0];
}
function secretFree(text: string, secret: string): void {
  let decoded = text;
  for (let i = 0; i < 4; i++) {
    if (decoded.includes(secret)) inferenceFail('HTTPS_SECRET_ECHO');
    // Inspect all consecutive escape layers together. Collapsing pairs first can
    // leave a single backslash between decoded characters for nested JSON.
    // This inspection copy is never returned or used to reconstruct a FixPlan.
    decoded = decoded.replace(/\\+u([a-f0-9]{4})/gi, (_, h: string) => String.fromCharCode(parseInt(h, 16))).replace(/\\\\/g, '\\');
  }
  if (decoded.includes(secret)) inferenceFail('HTTPS_SECRET_ECHO');
}
// Internal, pure state machine. Native callbacks and inert test events use the
// same boundary; it has no network, credentials resolver or execution capability.
export function createHttpsResponseSession(frame: OfflineHttpRequests['count'], count: boolean, secret: string) {
  assertFixedHttpRequest(frame, count); secretFree(frame.body, secret);
  let phase: 'NEW' | 'DNS' | 'TLS' | 'BODY' | 'DONE' = 'NEW', pinned = '';
  let receiver: ReturnType<typeof createBoundedHttpReceiver> | undefined;
  const invalid = (): never => inferenceFail('HTTPS_EVENT_INVALID');
  return Object.freeze({
    resolved(address: string): void {
      if (phase !== 'NEW') invalid();
      if (!isAllowedHttpsAddress(address)) inferenceFail('HTTPS_ADDRESS_FORBIDDEN');
      pinned = address; phase = 'DNS';
    },
    connected(peer: { address: string; hostname: string; port: number; authorized: boolean; encrypted: boolean }): void {
      if (phase !== 'DNS') invalid();
      if (peer.authorized !== true || peer.encrypted !== true) inferenceFail('HTTPS_TLS_INVALID');
      if (peer.hostname !== OFFLINE_HTTPS_POLICY.hostname) inferenceFail('HTTPS_HOSTNAME_INVALID');
      if (peer.address !== pinned || peer.port !== 443) inferenceFail('HTTPS_ADDRESS_FORBIDDEN');
      phase = 'TLS';
    },
    headers(status: number, headers: OfflineHttpReply['headers']): void {
      if (phase !== 'TLS') invalid(); receiver = createBoundedHttpReceiver(status, headers, count);
      secretFree(serializeFixerData(headers), secret); phase = 'BODY';
    },
    data(bytes: Buffer): void { if (phase !== 'BODY') invalid(); receiver!.write(bytes); },
    end(complete: boolean): string {
      if (phase !== 'BODY') invalid(); phase = 'DONE';
      if (!complete) inferenceFail('HTTPS_UNEXPECTED_CLOSE');
      const body = receiver!.finish(); secretFree(body, secret); return body;
    },
    discard(): void { phase = 'DONE'; receiver?.discard(); pinned = ''; }
  });
}
export type OfflineHttpsEvent =
  | { readonly type: 'resolved'; readonly address: string; readonly delayMs: number }
  | { readonly type: 'connected'; readonly address: string; readonly hostname: string; readonly port: number; readonly authorized: boolean; readonly encrypted: boolean; readonly delayMs: number }
  | { readonly type: 'headers'; readonly status: number; readonly headers: OfflineHttpReply['headers']; readonly delayMs: number }
  | { readonly type: 'data'; readonly bytes: readonly number[]; readonly delayMs: number }
  | { readonly type: 'end'; readonly complete: boolean; readonly delayMs: number }
  | { readonly type: 'error'; readonly code: 'DNS' | 'CERTIFICATE' | 'HOSTNAME' | 'CONNECTION'; readonly delayMs: number }
  | { readonly type: 'close' | 'timeout'; readonly delayMs: number };
declare const exchangeBrand: unique symbol;
export interface OfflineHttpsExchange { readonly [exchangeBrand]: true }
interface ExchangeState { requests: OfflineHttpRequests; count: readonly Event[]; response: readonly Event[]; next: 'COUNT' | 'RESPONSE' | 'DONE' }
type Event = Record<string, unknown>;
const exchanges = new WeakMap<OfflineHttpsExchange, ExchangeState>();
const keys: Record<string, string[]> = { resolved: ['address'], connected: ['address', 'hostname', 'port', 'authorized', 'encrypted'],
  headers: ['status', 'headers'], data: ['bytes'], end: ['complete'], error: ['code'], close: [], timeout: [] };
function snapshot(events: readonly OfflineHttpsEvent[], count: boolean): readonly Event[] {
  let bytes = 0;
  return Object.freeze(inertHttpArray(events, 256).map(value => {
    if (!value || typeof value !== 'object' || types.isProxy(value)) inferenceFail('HTTPS_EVENT_INVALID');
    const type = Object.getOwnPropertyDescriptor(value, 'type')?.value;
    if (typeof type !== 'string' || !Object.hasOwn(keys, type)) inferenceFail('HTTPS_EVENT_INVALID');
    const d = inferenceEnvelope(value, ['type', 'delayMs', ...keys[type]]);
    if (!Number.isSafeInteger(d['delayMs']) || (d['delayMs'] as number) < 0 || (d['delayMs'] as number) > 60000) inferenceFail('HTTPS_EVENT_INVALID');
    if (type === 'resolved' && typeof d['address'] !== 'string'
      || type === 'connected' && (typeof d['address'] !== 'string' || typeof d['hostname'] !== 'string'
        || !Number.isSafeInteger(d['port']) || typeof d['authorized'] !== 'boolean' || typeof d['encrypted'] !== 'boolean')
      || type === 'end' && typeof d['complete'] !== 'boolean'
      || type === 'error' && !['DNS', 'CERTIFICATE', 'HOSTNAME', 'CONNECTION'].includes(d['code'] as string)) inferenceFail('HTTPS_EVENT_INVALID');
    if (type === 'data') {
      const data = copyHttpBytes(d['bytes']); bytes += data.length;
      if (bytes > (count ? OFFLINE_HTTPS_POLICY.maxCountBodyBytes : OFFLINE_HTTPS_POLICY.maxBodyBytes)) inferenceFail('HTTP_BODY_LIMIT');
      return Object.freeze({ ...d, bytes: data });
    }
    // Headers share exactly the 9E descriptor/size validation, with no body copy.
    if (type === 'headers') {
      const token = snapshotOfflineHttpReply({ status: d['status'] as number, headers: d['headers'] as OfflineHttpReply['headers'], chunks: [] });
      discardOfflineHttpReply(token);
    }
    return normalizeFixerData(d) as Event;
  }));
}
// Only inert transcripts are accepted. No callable IO port, agent, URL, credential,
// socket factory or environment-driven switch can be supplied to this constructor.
export function createOfflineHttpsExchange(input: { readonly requests: OfflineHttpRequests;
  readonly countEvents: readonly OfflineHttpsEvent[]; readonly responseEvents: readonly OfflineHttpsEvent[] }): OfflineHttpsExchange {
  const d = inferenceEnvelope(input, ['requests', 'countEvents', 'responseEvents']);
  const requests = normalizeFixerData(d['requests']) as unknown as OfflineHttpRequests;
  assertFixedHttpRequest(requests.count, true); assertFixedHttpRequest(requests.inference, false);
  const count = snapshot(d['countEvents'] as readonly OfflineHttpsEvent[], true);
  const response = snapshot(d['responseEvents'] as readonly OfflineHttpsEvent[], false);
  const token = Object.freeze({}) as OfflineHttpsExchange; exchanges.set(token, { requests, count, response, next: 'COUNT' }); return token;
}
export function discardOfflineHttpsExchange(token: OfflineHttpsExchange): void { exchanges.delete(token); }
export async function receiveOfflineHttpsExchange(token: OfflineHttpsExchange, frame: OfflineHttpRequests['count'], count: boolean, signal: AbortSignal): Promise<string> {
  const state = exchanges.get(token);
  if (!state || state.next !== (count ? 'COUNT' : 'RESPONSE')) inferenceFail('HTTPS_EVENT_INVALID');
  const expected = count ? state.requests.count : state.requests.inference;
  assertFixedHttpRequest(frame, count);
  if (frame.body !== expected.body || frame.path !== expected.path || frame.digest !== expected.digest) inferenceFail('TOKEN_BINDING_INVALID');
  state.next = 'DONE';
  const result = await receiveEvents(frame, count, count ? state.count : state.response, signal, syntheticBearer);
  if (count) state.next = 'RESPONSE';
  return result;
}

// Single POST laboratory transcript. This is inert data, with no callable port,
// credential resolver, native-client import or count request. Both modes share
// the SAME event engine/receiver as 9F, never a second HTTP implementation.
declare const singleBrand: unique symbol;
export interface OfflineSingleHttpsExchange { readonly [singleBrand]: true }
const singles = new WeakMap<OfflineSingleHttpsExchange, { frame: OfflineHttpRequests['inference']; events: readonly Event[] }>();
export function createOfflineSingleHttpsExchange(input: { readonly frame: OfflineHttpRequests['inference'];
  readonly events: readonly OfflineHttpsEvent[] }): OfflineSingleHttpsExchange {
  const d = inferenceEnvelope(input, ['frame', 'events']);
  const frame = normalizeFixerData(d['frame']) as unknown as OfflineHttpRequests['inference'];
  assertFixedHttpRequest(frame, false);
  const events = snapshot(d['events'] as readonly OfflineHttpsEvent[], false);
  const token = Object.freeze({}) as OfflineSingleHttpsExchange; singles.set(token, { frame, events }); return token;
}
export function discardOfflineSingleHttpsExchange(token: OfflineSingleHttpsExchange): void { singles.delete(token); }
export async function receiveOfflineSingleHttpsExchange(token: OfflineSingleHttpsExchange,
  frame: OfflineHttpRequests['inference'], signal: AbortSignal, syntheticSecret: string): Promise<string> {
  const state = singles.get(token); singles.delete(token);
  if (!state) inferenceFail('HTTPS_EVENT_INVALID');
  assertFixedHttpRequest(frame, false);
  if (frame.body !== state.frame.body || frame.path !== state.frame.path || frame.digest !== state.frame.digest) inferenceFail('TOKEN_BINDING_INVALID');
  return receiveEvents(frame, false, state.events, signal, syntheticSecret);
}
async function receiveEvents(frame: OfflineHttpRequests['count'], count: boolean, events: readonly Event[],
  signal: AbortSignal, secret: string): Promise<string> {
  const session = createHttpsResponseSession(frame, count, secret);
  let result: string | undefined;
  try {
    for (const event of events) {
      if (signal.aborted) inferenceFail('INFERENCE_CANCELLED');
      if (event['delayMs']) await delay(event['delayMs'] as number, undefined, { signal });
      if (signal.aborted) inferenceFail('INFERENCE_CANCELLED');
      if (result !== undefined) inferenceFail('HTTPS_EVENT_INVALID');
      switch (event['type']) {
        case 'resolved': session.resolved(event['address'] as string); break;
        case 'connected': session.connected(event as unknown as Parameters<typeof session.connected>[0]); break;
        case 'headers': session.headers(event['status'] as number, event['headers'] as OfflineHttpReply['headers']); break;
        case 'data': session.data(event['bytes'] as Buffer); break;
        case 'end': result = session.end(event['complete'] === true); break;
        case 'timeout': inferenceFail('HTTP_TIMEOUT'); break;
        case 'close': inferenceFail('HTTPS_UNEXPECTED_CLOSE'); break;
        case 'error': {
          const codes: Record<string, InferenceErrorCode> = { DNS: 'HTTPS_DNS_FAILED', CERTIFICATE: 'HTTPS_TLS_INVALID', HOSTNAME: 'HTTPS_HOSTNAME_INVALID', CONNECTION: 'HTTPS_CONNECTION_FAILED' };
          inferenceFail(codes[event['code'] as string] ?? 'HTTPS_EVENT_INVALID');
        }
      }
    }
    if (result === undefined) inferenceFail('HTTPS_UNEXPECTED_CLOSE');
    return result;
  } finally { session.discard(); }
}
