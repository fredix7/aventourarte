import { randomBytes } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { createManualSyntheticFixture } from './inference-manual-fixture';
import { createOfflineInferenceProjection, inspectOfflineHttpRequests } from './inference-broker';
import { createOfflineSingleHttpsExchange, receiveOfflineSingleHttpsExchange, discardOfflineSingleHttpsExchange,
  type OfflineHttpsEvent, type OfflineSingleHttpsExchange } from './inference-https-adapter';
import { assertFixedHttpRequest, type OfflineHttpRequests } from './inference-http';
import { createOfflineInferenceBudget, inspectOfflineInferenceBudget, reserveOfflineInference,
  settleOfflineInference, offlineInferenceReservationMicroUsd, OFFLINE_RATE_CARD, type OfflineInferenceBudget } from './inference-budget';
import { decodeOfflineResponsesReply } from './inference-response';
import { decodeFixerJson, normalizeFixerData } from './fixer-json';
import { createSimulatedFixerTransport, launchFixer, assertOpenFixRequest } from './fixer-launcher';
import { FixerError, type FixPlan } from './fixer-contracts';
import { inferenceEnvelope } from './inference-data';
import { InferenceError } from './inference-contracts';

export const MANUAL_LAB_POLICY = Object.freeze({ version: '204-offline-single-post-v1', laboratoryOnly: true,
  runtimeStatus: 'RUNTIME_NOT_ISOLATED', realExecutionEnabled: false, nativeClientEnabled: false,
  countRequests: 0, maxAttempts: 1, maxConcurrency: 1, maxLifetimeMs: 30000, maxTimeoutMs: 30000,
  tokenEvidence: 'UNVERIFIED_FULL_INPUT_INCLUDING_SCHEMA_AND_WRAPPERS', commercialRatesVerified: false,
  labRateCard: OFFLINE_RATE_CARD, labReservationMicroUsd: offlineInferenceReservationMicroUsd(),
  realBlockers: Object.freeze(['RUNTIME_NOT_ISOLATED', 'TOKEN_BOUND_UNVERIFIED', 'COMMERCIAL_RATES_UNVERIFIED',
    'OPERATIONAL_A_B_C_ABSENT', 'REAL_PROJECT_CREDENTIAL_DELIVERY_ABSENT', 'NATIVE_CLIENT_DORMANT',
    'PROVIDER_ACCESS_AND_PROFILE_UNVERIFIED', 'TRUSTED_HOST_LIVE_REVIEW_REQUIRED']) } as const);

// Local discovery: neither package-lock nor installed package metadata supplies
// a model-compatible tokenizer/vocabulary or an independent tokenized fixture.
// UTF-8 bytes bound our transport size, NOT the provider's complete token input:
// instructions + message framing + strict JSON schema + hidden provider wrappers.
// No chars/4 heuristic, usage echo, caller assertion or lab result proves <=16000.
// A future input_tokens call needs separate authorization for a SECOND request,
// including its data export, quota, possible cost and reservation. Never automatic.
export const MANUAL_TOKEN_BOUND_EVIDENCE = Object.freeze({ verified: false, limit: 16000,
  localExactTokenizer: 'NOT_FOUND_IN_CURRENT_DEPENDENCIES', formalFullPayloadBound: 'NOT_PROVEN',
  independentlyVerifiedSyntheticProfile: 'ABSENT', providerWrapperSpecification: 'UNVERIFIED',
  laboratoryUsage: 'INERT_TEST_DATA_NOT_TOKEN_EVIDENCE', liveDecision: 'BLOCKED',
  alternative: 'SEPARATELY_AUTHORIZE_SECOND_INPUT_TOKENS_REQUEST' } as const);

// Future contract only, for a single trusted host process. No resolver/issuer is
// implemented: no IPC/worker requirement is imported from operational Phase 9G.
// Secret bytes would be delivered privately only AFTER live A/B/C and reservation,
// directly to the reviewed fixed transport, never into caller data or the model.
export interface FutureManualCredentialDelivery {
  deliverToFixedTransport(handle: import('./inference-contracts').FutureHostCredentialHandle,
    scope: Readonly<{ project: string; endpoint: 'https://api.openai.com/v1/responses';
      requestFingerprint: string; payloadDigest: string; attemptId: string }>): Promise<void>;
}
export const MANUAL_CREDENTIAL_DELIVERY_POLICY = Object.freeze({ implemented: false,
  realCredentialSource: 'ABSENT', futureDelivery: 'PRIVATE_HOST_MEMORY_AFTER_A_B_C_AND_RESERVATION',
  labSource: 'GENERATED_FAKE_PRIVATE_HANDLE', environmentAccess: false, argvAccess: false,
  persistentStorage: false, javascriptMemoryZeroizationProven: false } as const);

declare const sessionBrand: unique symbol, grantBrand: unique symbol, credentialBrand: unique symbol, transcriptBrand: unique symbol;
declare const connectivityBrand: unique symbol, projectBrand: unique symbol, economicBrand: unique symbol;
export interface ManualLabSession { readonly [sessionBrand]: true }
export interface ManualLabGrant { readonly [grantBrand]: true }
export interface ManualLabConnectivityGrant extends ManualLabGrant { readonly [connectivityBrand]: true }
export interface ManualLabProjectGrant extends ManualLabGrant { readonly [projectBrand]: true }
export interface ManualLabEconomicGrant extends ManualLabGrant { readonly [economicBrand]: true }
export interface ManualLabCredential { readonly [credentialBrand]: true }
export interface ManualLabTranscript { readonly [transcriptBrand]: true }
declare const resultBrand: unique symbol;
export interface ManualLabValidatedResult {
  readonly [resultBrand]: true; readonly status: 'LAB_PLAN_VALID'; readonly plan: FixPlan;
  readonly evidence: 'SIMULATED_UNVERIFIED_NOT_BILLING'; readonly persistence: 'NOT_ATTEMPTED';
  readonly realExecutionEnabled: false; readonly sourceWrite: false; readonly writeAuthorized: false;
  readonly runtimeStatus: 'RUNTIME_NOT_ISOLATED';
}
const validatedResults = new WeakSet<object>();
// Recognition only. This is not a handoff, prepared result or native grant.
export function isManualLabValidatedResult(value: unknown): value is ManualLabValidatedResult {
  return typeof value === 'object' && value !== null && validatedResults.has(value);
}
type State = { fixture: ReturnType<typeof createManualSyntheticFixture>; frame: OfflineHttpRequests['inference'];
  phase: 'OPEN' | 'RUNNING' | 'CLOSED'; expires: number; issued: Set<string>; abort: AbortController;
  budget?: OfflineInferenceBudget; simulatedPosts: number; outcome: string; cleanup: string;
  tokens: object[] };
type Binding = { session: ManualLabSession; request: object; digest: string };
const sessions = new WeakMap<ManualLabSession, State>();
const grants = new WeakMap<ManualLabGrant, Binding & { type: 'A' | 'B' | 'C'; credential?: ManualLabCredential; max?: number }>();
const credentials = new WeakMap<ManualLabCredential, Binding & { secret: string; project: 'LAB_PROJECT_ONLY' }>();
const transcripts = new WeakMap<ManualLabTranscript, Binding & { exchange: OfflineSingleHttpsExchange }>();
let active = false;
function denied(code: string): never { throw new Error(code); }
function state(session: ManualLabSession): State { const s = sessions.get(session); return s ?? denied('MANUAL_SESSION_INVALID'); }
function open(session: ManualLabSession): State {
  const s = state(session);
  if (s.phase !== 'OPEN') denied('MANUAL_SESSION_INACTIVE');
  if (performance.now() >= s.expires) { close(session); denied('MANUAL_SESSION_EXPIRED'); }
  try { s.fixture.assertData(); assertOpenFixRequest(s.fixture.request); }
  catch { close(session); denied('MANUAL_SYNTHETIC_CONTEXT_CHANGED'); }
  if (performance.now() >= s.expires) { close(session); denied('MANUAL_SESSION_EXPIRED'); }
  return s;
}
function binding(session: ManualLabSession, s: State): Binding { return { session, request: s.fixture.request, digest: s.frame.digest }; }
function matches(b: Binding | undefined, session: ManualLabSession, s: State): boolean {
  return !!b && b.session === session && b.request === s.fixture.request && b.digest === s.frame.digest;
}
function once(s: State, type: string): void { if (s.issued.has(type)) denied('MANUAL_AUTHORITY_ALREADY_ISSUED'); s.issued.add(type); }
function close(session: ManualLabSession): void {
  const s = state(session); if (s.phase === 'CLOSED') return;
  s.phase = 'CLOSED'; s.abort.abort();
  for (const token of s.tokens) {
    const key = credentials.get(token as ManualLabCredential); if (key) key.secret = '';
    credentials.delete(token as ManualLabCredential); grants.delete(token as ManualLabGrant);
    const t = transcripts.get(token as ManualLabTranscript);
    if (t) discardOfflineSingleHttpsExchange(t.exchange);
    transcripts.delete(token as ManualLabTranscript);
  }
  s.tokens.length = 0;
  try { s.fixture.close(); s.cleanup = 'REMOVED'; } catch { s.cleanup = 'BLOCKED'; }
}
// No input and no registration hook: even an authentic real-guide request cannot
// be adopted. The only context is privately constructed, fixed synthetic data.
export function createManualLabSession(): ManualLabSession {
  if (arguments.length) denied('MANUAL_SYNTHETIC_ONLY');
  if (active) denied('MANUAL_CONCURRENCY_EXCEEDED');
  const fixture = createManualSyntheticFixture();
  try {
    const projection = createOfflineInferenceProjection({ request: fixture.request });
    const frame = inspectOfflineHttpRequests(projection).inference;
    const session = Object.freeze({}) as ManualLabSession;
    sessions.set(session, { fixture, frame, phase: 'OPEN', expires: performance.now() + 30000,
      issued: new Set(), abort: new AbortController(), simulatedPosts: 0, outcome: 'NOT_ATTEMPTED', cleanup: 'PENDING', tokens: [] });
    return session;
  } catch { fixture.close(); return denied('MANUAL_SETUP_FAILED'); }
}
export function inspectManualLabSession(session: ManualLabSession) {
  const s = state(session);
  // Copy data out; never export the WeakMap-authentic request to another host API.
  return Object.freeze({ phase: s.phase, request: normalizeFixerData(s.fixture.request) as unknown as typeof s.fixture.request, frame: s.frame,
    simulatedPosts: s.simulatedPosts, countPosts: 0, outcome: s.outcome, cleanup: s.cleanup,
    budget: s.budget ? inspectOfflineInferenceBudget(s.budget) : null, policy: MANUAL_LAB_POLICY });
}
export function inspectManualLiveReadiness(session: ManualLabSession) {
  state(session);
  return Object.freeze({ decision: 'BLOCKED', code: 'RUNTIME_NOT_ISOLATED',
    blockers: MANUAL_LAB_POLICY.realBlockers, fullInputTokenBoundVerified: false,
    commercialRatesVerified: false, realMoneyAuthorized: false } as const);
}
export function authorizeManualLabConnectivity(session: ManualLabSession): ManualLabConnectivityGrant {
  if (arguments.length !== 1) denied('MANUAL_AUTHORITY_INVALID');
  const s = open(session); once(s, 'A'); const grant = Object.freeze({}) as ManualLabConnectivityGrant;
  grants.set(grant, { ...binding(session, s), type: 'A' }); s.tokens.push(grant); return grant;
}
export function createManualLabCredential(session: ManualLabSession): ManualLabCredential {
  if (arguments.length !== 1) denied('MANUAL_CREDENTIAL_INVALID');
  const s = open(session); once(s, 'KEY'); const handle = Object.freeze({}) as ManualLabCredential;
  credentials.set(handle, { ...binding(session, s), secret: 'LAB_NOT_A_REAL_KEY_' + randomBytes(32).toString('hex'), project: 'LAB_PROJECT_ONLY' });
  s.tokens.push(handle);
  return handle;
}
export function authorizeManualLabCredential(input: { readonly session: ManualLabSession; readonly credential: ManualLabCredential }): ManualLabProjectGrant {
  const d = inferenceEnvelope(input, ['session', 'credential']), session = d['session'] as ManualLabSession;
  const credential = d['credential'] as ManualLabCredential, s = open(session);
  if (!matches(credentials.get(credential), session, s)) denied('MANUAL_CREDENTIAL_INVALID');
  once(s, 'B'); const grant = Object.freeze({}) as ManualLabProjectGrant;
  grants.set(grant, { ...binding(session, s), type: 'B', credential }); s.tokens.push(grant); return grant;
}
export function authorizeManualLabBudget(input: { readonly session: ManualLabSession; readonly maxAttemptMicroUsd: number }): ManualLabEconomicGrant {
  const d = inferenceEnvelope(input, ['session', 'maxAttemptMicroUsd']), session = d['session'] as ManualLabSession, s = open(session);
  const max = d['maxAttemptMicroUsd'];
  if (!Number.isSafeInteger(max) || (max as number) < 0 || (max as number) > 1000000000) denied('MANUAL_BUDGET_INVALID');
  once(s, 'C'); const grant = Object.freeze({}) as ManualLabEconomicGrant;
  grants.set(grant, { ...binding(session, s), type: 'C', max: max as number }); s.tokens.push(grant); return grant;
}
export function createManualLabTranscript(input: { readonly session: ManualLabSession; readonly events: readonly OfflineHttpsEvent[] }): ManualLabTranscript {
  const d = inferenceEnvelope(input, ['session', 'events']), session = d['session'] as ManualLabSession, s = open(session);
  once(s, 'TRANSCRIPT');
  const exchange = createOfflineSingleHttpsExchange({ frame: s.frame, events: d['events'] as readonly OfflineHttpsEvent[] });
  const token = Object.freeze({}) as ManualLabTranscript; transcripts.set(token, { ...binding(session, s), exchange }); s.tokens.push(token); return token;
}
export function cancelManualLabSession(session: ManualLabSession): void { close(session); }

// Laboratory entry only. No real/verified/testMode switch, URL, callback, resolver,
// HTTP client, environment key, native capability or bootstrap is accepted.
export async function runManualLabInference(input: { readonly session: ManualLabSession;
  readonly connectivity: ManualLabConnectivityGrant; readonly projectCredential: ManualLabProjectGrant; readonly economic: ManualLabEconomicGrant;
  readonly credential: ManualLabCredential; readonly transcript: ManualLabTranscript; readonly timeoutMs: number }) {
  let session: ManualLabSession | undefined, s: State | undefined, reservation: object | undefined;
  let exchange: OfflineSingleHttpsExchange | undefined, timer: ReturnType<typeof setTimeout> | undefined, owns = false, settled = false;
  try {
    const d = inferenceEnvelope(input, ['session', 'connectivity', 'projectCredential', 'economic', 'credential', 'transcript', 'timeoutMs']);
    session = d['session'] as ManualLabSession; s = open(session);
    if (active) denied('MANUAL_CONCURRENCY_EXCEEDED');
    // Own and close even a failed authorization attempt; no correction/retry on
    // this session. Join independent provenance BEFORE reservation/first await.
    owns = true; s.phase = 'RUNNING';
    const a = grants.get(d['connectivity'] as ManualLabGrant), b = grants.get(d['projectCredential'] as ManualLabGrant);
    const c = grants.get(d['economic'] as ManualLabGrant), key = credentials.get(d['credential'] as ManualLabCredential);
    const t = transcripts.get(d['transcript'] as ManualLabTranscript);
    if (!matches(a, session, s) || a!.type !== 'A') denied('MANUAL_A_REQUIRED');
    if (!matches(b, session, s) || b!.type !== 'B') denied('MANUAL_B_REQUIRED');
    if (!matches(c, session, s) || c!.type !== 'C') denied('MANUAL_C_REQUIRED');
    if (!matches(key, session, s) || b!.credential !== d['credential']) denied('MANUAL_CREDENTIAL_INVALID');
    if (!matches(t, session, s)) denied('MANUAL_TRANSCRIPT_INVALID');
    const timeout = d['timeoutMs'];
    if (!Number.isSafeInteger(timeout) || (timeout as number) < 1 || (timeout as number) > 30000) denied('MANUAL_TIMEOUT_INVALID');
    assertFixedHttpRequest(s.frame, false);
    if (performance.now() >= s.expires) denied('MANUAL_SESSION_EXPIRED');
    for (const name of ['connectivity', 'projectCredential', 'economic']) grants.delete(d[name] as ManualLabGrant);
    credentials.delete(d['credential'] as ManualLabCredential); transcripts.delete(d['transcript'] as ManualLabTranscript);
    exchange = t!.exchange;
    s.budget = createOfflineInferenceBudget({ maxAttemptMicroUsd: c!.max!, maxBatchMicroUsd: c!.max!, maxAttempts: 1 });
    reservation = reserveOfflineInference(s.budget); active = true;
    const signal = s.abort.signal, deadline = Math.min(s.expires, performance.now() + (timeout as number));
    timer = setTimeout(() => s!.abort.abort(new FixerError('TIMEOUT')), Math.max(1, deadline - performance.now()));
    s.simulatedPosts++;
    const body = await receiveOfflineSingleHttpsExchange(exchange, s.frame, signal, key!.secret);
    const check = (): void => {
      if (performance.now() >= deadline) denied('MANUAL_TIMEOUT');
      if (signal.aborted || s!.phase !== 'RUNNING') denied('MANUAL_CANCELLED');
    };
    check();
    const decoded = decodeOfflineResponsesReply({ status: 200, body, delayMs: 0 });
    settleOfflineInference(reservation, decoded.usage); settled = true;
    // This is the existing inert validation adapter, NOT a second model run.
    const validation = await launchFixer({ request: s.fixture.request,
      transport: createSimulatedFixerTransport({ request: s.fixture.request,
        events: [{ type: 'stdout', text: decoded.text, delayMs: 0 }, { type: 'exit', code: 0, delayMs: 0 }] }) });
    check();
    if (validation.status !== 'PROPOSAL_VALID') throw new FixerError(validation.code);
    const plan = decodeFixerJson(decoded.text); s.outcome = 'VALIDATED_IN_MEMORY';
    close(session);
    if (s.cleanup !== 'REMOVED') denied('MANUAL_CLEANUP_BLOCKED');
    const result = Object.freeze({ status: 'LAB_PLAN_VALID', plan, evidence: 'SIMULATED_UNVERIFIED_NOT_BILLING',
      persistence: 'NOT_ATTEMPTED', realExecutionEnabled: false, sourceWrite: false,
      writeAuthorized: false, runtimeStatus: 'RUNTIME_NOT_ISOLATED' }) as unknown as ManualLabValidatedResult;
    validatedResults.add(result); return result;
  } catch (error) {
    let code = error instanceof InferenceError || error instanceof FixerError ? error.code : 'MANUAL_REJECTED';
    // Only fixed host codes escape; no thrown caller value, raw response, secret,
    // filesystem path, stack or cause is copied into the result.
    if (error instanceof Error && /^MANUAL_[A-Z_]+$/.test(error.message)) code = error.message as typeof code;
    if (s?.abort.signal.aborted && s.outcome !== 'VALIDATED_IN_MEMORY') {
      code = s.abort.signal.reason instanceof FixerError && s.abort.signal.reason.code === 'TIMEOUT' ? 'TIMEOUT' : 'INFERENCE_CANCELLED';
    }
    if (s && owns) s.outcome = code;
    return Object.freeze({ status: 'BLOCKED' as const, code, realExecutionEnabled: false,
      runtimeStatus: 'RUNTIME_NOT_ISOLATED', evidence: 'SIMULATED_UNVERIFIED_NOT_BILLING' });
  } finally {
    if (timer) clearTimeout(timer);
    if (reservation && !settled) {
      // settle rejects AFTER burning its one-shot token on malformed usage.
      // A second settlement is never used to obtain a refund.
      try { settleOfflineInference(reservation); } catch { /* Already uncertain. */ }
    }
    if (exchange) discardOfflineSingleHttpsExchange(exchange);
    if (owns && session) { active = false; close(session); }
  }
}
