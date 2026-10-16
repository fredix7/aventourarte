import { randomBytes } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { createManualSyntheticFixture } from './inference-manual-fixture';
import { createOfflineInferenceProjection, inspectOfflineHttpRequests } from './inference-broker';
import { createOfflineSingleHttpsExchange, receiveOfflineSingleHttpsExchange, discardOfflineSingleHttpsExchange,
  type OfflineHttpsEvent, type OfflineSingleHttpsExchange } from './inference-https-adapter';
import { assertFixedHttpRequest, decodeOfflineInputTokens, type OfflineHttpRequests } from './inference-http';
import { createOfflineInferenceBudget, inspectOfflineInferenceBudget, reserveOfflineInference,
  settleOfflineInference, offlineInferenceReservationMicroUsd, OFFLINE_RATE_CARD, type OfflineInferenceBudget,
  createManualSmokePreparationBudget, MANUAL_SMOKE_GENERATION_RATES, manualSmokeGenerationMaximumMicroUsd } from './inference-budget';
import { decodeOfflineResponsesReply } from './inference-response';
import { decodeFixerJson, normalizeFixerData } from './fixer-json';
import { createSimulatedFixerTransport, launchFixer, assertOpenFixRequest } from './fixer-launcher';
import { FixerError, type FixPlan } from './fixer-contracts';
import { inferenceEnvelope } from './inference-data';
import { InferenceError } from './inference-contracts';
import { receivePreparedManualHttpsAttempt } from './inference-https-native';
import { createInterface } from 'node:readline/promises';

// Reviewed public documentation is not account access or authority to spend.
// Count billing/quota remain unknown; no operational review issuer exists.
export const MANUAL_NATIVE_SMOKE_POLICY = Object.freeze({ enabled: false, runtimeStatus: 'RUNTIME_NOT_ISOLATED',
  model: 'gpt-6-luna', generationRates: MANUAL_SMOKE_GENERATION_RATES,
  generationMaximumMicroUsd: manualSmokeGenerationMaximumMicroUsd(),
  countMaximumMicroUsd: null, countBillingVerified: false, countQuotaVerified: false,
  operationalReviewIssuer: false, humanChannel: 'HOST_TTY_ONLY', credentialChannel: 'PRIVATE_NO_ECHO_TTY',
  automaticRequests: false, retries: 0, startupQuietPeriodMs: 60000,
  projectExclusivity: 'ONE_HOST_ONE_EPHEMERAL_PROJECT_KEY_NO_OTHER_CLIENTS',
  restart: 'ABANDON_REVIEW_USAGE_REVOKE_OLD_KEY_NEW_HUMAN_AUTHORIZATION',
  crossProcessLockImplemented: false, simulatedBudgetsAuthorizeRealSpend: false } as const);

// Deliberately empty. A separate reviewed activation must supply host evidence,
// not a public flag, environment variable, JSON assertion or model response.
type NativeReview = { projectId: string; countMaximumMicroUsd: number;
  generationMaximumMicroUsd: number; exclusiveProcessId: number; expires: number };
const nativeReviews = new WeakMap<object, NativeReview>();
const nativeSessions = new WeakMap<ManualLabSession, NativeReview>();
const nativeAttempts = new WeakMap<object, { session: ManualLabSession; frame: OfflineHttpRequests['count'];
  count: boolean; secret: string; expires: number; signal: AbortSignal; timeoutMs: number }>();

// Consume-only bridge. No issuer, credential setter or callback is exported.
// Native transport joins private provenance before reading any caller frame.
export function consumePreparedManualHttpsAttempt(token: object, frame: OfflineHttpRequests['count'], count: boolean,
  signal: AbortSignal, timeoutMs: number): string {
  const permit = nativeAttempts.get(token); nativeAttempts.delete(token);
  if (!permit) throw new FixerError('RUNTIME_NOT_ISOLATED');
  const s = state(permit.session);
  if (!nativeSessions.has(permit.session) || s.phase !== 'RUNNING' || s.abort.signal.aborted
    || performance.now() >= permit.expires || permit.frame !== frame || permit.count !== count
    || permit.signal !== signal || permit.timeoutMs !== timeoutMs) {
    permit.secret = ''; throw new FixerError('RUNTIME_NOT_ISOLATED');
  }
  const secret = permit.secret; permit.secret = ''; return secret;
}

// Public inspection/preparation cannot release the dormant host entry below.
export function inspectManualNativeSmokePreparation() {
  return Object.freeze({ policy: MANUAL_NATIVE_SMOKE_POLICY, decision: 'BLOCKED', code: 'RUNTIME_NOT_ISOLATED',
    blockers: Object.freeze(['OPERATIONAL_REVIEW_ABSENT', 'COUNT_BILLING_AND_QUOTA_UNCONFIRMED',
      'EXCLUSIVE_PROJECT_CEREMONY_REQUIRED', 'REAL_PROJECT_CREDENTIAL_AND_BALANCE_UNVERIFIED']) } as const);
}

async function humanApproval(label: string): Promise<void> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) denied('MANUAL_HUMAN_TTY_REQUIRED');
  const challenge = 'APRUEBO ' + randomBytes(16).toString('hex');
  const terminal = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  try { if (await terminal.question(label + '\nEscriba exactamente: ' + challenge + '\n') !== challenge) denied('MANUAL_HUMAN_DENIED'); }
  finally { terminal.close(); }
}

// Raw TTY input: the secret is never echoed, logged, put in argv/env, or written.
// Bounded ASCII only; teardown restores the previous terminal mode on all exits.
async function privateTerminalCredential(): Promise<string> {
  const input = process.stdin;
  if (!input.isTTY || !process.stdout.isTTY) denied('MANUAL_HUMAN_TTY_REQUIRED');
  process.stdout.write('Clave del proyecto (entrada privada, sin eco): ');
  const wasRaw = !!input.isRaw, wasPaused = input.isPaused(); let value = '', finished = false;
  return new Promise<string>((resolve, reject) => {
    const done = (error?: Error): void => {
      if (finished) return; finished = true;
      const secret = value; value = ''; let ioFailed = false;
      input.removeListener('data', receive); input.removeListener('end', end); input.removeListener('error', end);
      // Attempt each cleanup independently; never throw from a stream callback
      // or preserve a raw IO error/cause containing credential bytes.
      try { input.setRawMode(wasRaw); } catch { ioFailed = true; }
      try { if (wasPaused) input.pause(); } catch { ioFailed = true; }
      try { process.stdout.write('\n'); } catch { ioFailed = true; }
      if (ioFailed) reject(Error('MANUAL_CREDENTIAL_IO_FAILED'));
      else if (error) reject(error); else resolve(secret);
    };
    const end = (): void => done(Error('MANUAL_CREDENTIAL_CANCELLED'));
    const receive = (chunk: Buffer | string): void => {
      const text = chunk.toString();
      if (/[\x03\x04]/.test(text)) { end(); return; }
      for (let at = 0; at < text.length; at++) {
        const char = text[at];
        if (char === '\r' || char === '\n') {
          if (at !== text.length - 1 && text.slice(at) !== '\r\n' || !/^[A-Za-z0-9_-]{16,256}$/.test(value)) {
            done(Error('MANUAL_CREDENTIAL_INVALID')); return;
          }
          done(); return;
        }
        if (char === '\x7f' || char === '\b') value = value.slice(0, -1);
        else if (/^[A-Za-z0-9_-]$/.test(char) && value.length < 256) value += char;
        else { done(Error('MANUAL_CREDENTIAL_INVALID')); return; }
      }
    };
    try { input.on('data', receive); input.once('end', end); input.once('error', end); input.setRawMode(true); input.resume(); }
    catch { done(Error('MANUAL_CREDENTIAL_IO_FAILED')); }
  });
}

// Dormant host ceremony, NOT exported and with no production caller or review
// issuer. Offline tests instrument this closure and the actual native IO only.
// Reuses exactly the existing session/ABC/reservation/decoder/validator path.
async function runPreparedNativeSmoke(reviewToken: object) {
  const review = nativeReviews.get(reviewToken); nativeReviews.delete(reviewToken);
  if (!review || review.exclusiveProcessId !== process.pid || performance.now() >= review.expires
    || !/^[A-Za-z0-9_-]{1,128}$/.test(review.projectId)
    || !Number.isSafeInteger(review.countMaximumMicroUsd) || review.countMaximumMicroUsd < 0
    || review.countMaximumMicroUsd > 1000000000 - review.generationMaximumMicroUsd
    || review.generationMaximumMicroUsd !== MANUAL_NATIVE_SMOKE_POLICY.generationMaximumMicroUsd) {
    throw new FixerError('RUNTIME_NOT_ISOLATED');
  }
  const s = createSession(true); nativeSessions.set(s, review); state(s).expires = Math.min(state(s).expires, review.expires);
  const quietUntil = performance.now() + MANUAL_NATIVE_SMOKE_POLICY.startupQuietPeriodMs;
  try {
    const attempt = async (stage: 'COUNT' | 'GENERATION') => {
      const info = inspectManualLabSession(s), scope = `${stage} project=${review.projectId} pid=${process.pid} digest=${info.countedFrames!.bindingDigest}`;
      await humanApproval(scope + '\nA: una sola conexion HTTPS al endpoint fijo; proyecto exclusivo, sin otros clientes.');
      if (performance.now() < quietUntil || performance.now() >= review.expires) denied('MANUAL_RATE_LIMIT');
      const connectivity = authorizeManualLabConnectivity(s);
      await humanApproval(scope + '\nB: usar solo la clave efimera de este proyecto en este proceso.');
      const credential = createManualLabCredential(s), key = credentials.get(credential)!;
      key.secret = await privateTerminalCredential();
      const projectCredential = authorizeManualLabCredential({ session: s, credential });
      const maximum = stage === 'COUNT' ? review.countMaximumMicroUsd : review.generationMaximumMicroUsd;
      const workflowMaximum = review.countMaximumMicroUsd + review.generationMaximumMicroUsd;
      await humanApproval(scope + `\nC: maximo por intento ${maximum} micro-USD; total ${workflowMaximum}; sin reembolso de consumo incierto ni reintento.`);
      const economic = authorizeManualLabBudget({ session: s, maxAttemptMicroUsd: workflowMaximum });
      const transcript = createManualLabTranscript({ session: s, events: [] });
      const input = { session: s, connectivity, credential, projectCredential, economic, transcript, timeoutMs: 30000 };
      return stage === 'COUNT' ? runManualLabCount(input) : runManualLabInference(input);
    };
    const counted = await attempt('COUNT');
    if (counted.status !== 'LAB_COUNT_VALID') return counted;
    await humanApproval('TRANSICION explicita: esperar al menos 60 segundos tras conteo. No se envia otra solicitud al esperar.');
    advanceManualLabGeneration({ session: s, countResult: counted });
    return await attempt('GENERATION');
  } catch (error) {
    // The dormant ceremony must not propagate raw TTY failures/stacks either.
    // Only fixed host errors survive, reconstructed without a caller cause.
    const allowed = new Set(['MANUAL_HUMAN_TTY_REQUIRED', 'MANUAL_HUMAN_DENIED', 'MANUAL_CREDENTIAL_CANCELLED',
      'MANUAL_CREDENTIAL_INVALID', 'MANUAL_CREDENTIAL_IO_FAILED', 'MANUAL_RATE_LIMIT', 'MANUAL_SESSION_EXPIRED',
      'MANUAL_SESSION_INACTIVE', 'MANUAL_SYNTHETIC_CONTEXT_CHANGED', 'MANUAL_COUNT_REQUIRED', 'MANUAL_COUNT_RECEIPT_INVALID']);
    throw Error(error instanceof Error && allowed.has(error.message) ? error.message : 'MANUAL_HUMAN_IO_FAILED');
  } finally { nativeSessions.delete(s); cancelManualLabSession(s); }
}

export const MANUAL_LAB_POLICY = Object.freeze({ version: '204-offline-single-post-v1', laboratoryOnly: true,
  runtimeStatus: 'RUNTIME_NOT_ISOLATED', realExecutionEnabled: false, nativeClientEnabled: false,
  countRequests: 0, maxAttempts: 1, maxConcurrency: 1, maxLifetimeMs: 30000, maxTimeoutMs: 30000,
  tokenEvidence: 'UNVERIFIED_FULL_INPUT_INCLUDING_SCHEMA_AND_WRAPPERS', commercialRatesVerified: false,
  labRateCard: OFFLINE_RATE_CARD, labReservationMicroUsd: offlineInferenceReservationMicroUsd(),
  realBlockers: Object.freeze(['RUNTIME_NOT_ISOLATED', 'TOKEN_BOUND_UNVERIFIED', 'COMMERCIAL_RATES_UNVERIFIED',
    'OPERATIONAL_A_B_C_ABSENT', 'REAL_PROJECT_CREDENTIAL_DELIVERY_ABSENT', 'NATIVE_CLIENT_DORMANT',
    'PROVIDER_ACCESS_AND_PROFILE_UNVERIFIED', 'TRUSTED_HOST_LIVE_REVIEW_REQUIRED']) } as const);

// Operator-reported project setup, NOT verified account state or billing authority.
// No key, project ID, balance API or account lookup is accepted/read here.
export const MANUAL_COUNTED_LAB_POLICY = Object.freeze({ version: '207-offline-count-then-generate-v1',
  projectName: 'AvenTourArte Factory', projectIdentityVerified: false, model: 'gpt-6-luna',
  reportedTpm: 25000, reportedRpm: 1, reportedBalanceUsd: 0, reportedAutoRecharge: false,
  realCredentialAvailable: false, networkEnabled: false, realExecutionEnabled: false, nativeClientEnabled: false,
  runtimeStatus: 'RUNTIME_NOT_ISOLATED',
  maxCountPosts: 1, maxGenerationPosts: 1, minimumIntervalMs: 60000, workflowLifetimeMs: 600000,
  grantLifetimeMs: 30000, maxInputTokens: 16000, maxOutputTokens: 4096,
  rateCoordinationScope: 'MODULE_INSTANCE_ONLY', survivesProcessRestart: false,
  providerAndOrganizationQuotaVerified: false,
  automaticTransition: false, retries: 0, countPricingVerified: false, countQuotaVerified: false,
  // An artificial lab allowance, NOT a price for input_tokens. Reuse conservative
  // reservation arithmetic for BOTH independent attempts; unknown count spend is
  // never settled as zero/refunded, even after a successful count response.
  simulatedCountReserveMicroUsd: offlineInferenceReservationMicroUsd(),
  simulatedGenerationReserveMicroUsd: offlineInferenceReservationMicroUsd(),
  minimumWorkflowCapMicroUsd: 2 * offlineInferenceReservationMicroUsd(),
  accounting: 'SIMULATED_NOT_BILLING', realMoneyAuthorized: false,
  additionalRealBlockers: Object.freeze(['COUNT_PRICE_AND_QUOTA_UNVERIFIED', 'PROJECT_ID_AND_ACCESS_UNVERIFIED',
    'API_CREDENTIAL_ABSENT', 'API_BALANCE_REPORTED_ZERO', 'HUMAN_APPROVAL_PER_STAGE_REQUIRED',
    'SHARED_PROJECT_RATE_COORDINATION_UNVERIFIED']) } as const);

// Local discovery: neither package-lock nor installed package metadata supplies
// a model-compatible tokenizer/vocabulary or an independent tokenized fixture.
// UTF-8 bytes bound our transport size, NOT the provider's complete token input:
// instructions + message framing + strict JSON schema + hidden provider wrappers.
// No chars/4 heuristic, usage echo, caller assertion or lab result proves <=16000.
// The single-POST path cannot automatically add a count. Step 207 separately
// prepares COUNT -> manual transition -> GENERATION in the same laboratory;
// neither simulated count nor byte length accredits the future real input bound.
export const MANUAL_TOKEN_BOUND_EVIDENCE = Object.freeze({ verified: false, limit: 16000,
  localExactTokenizer: 'NOT_FOUND_IN_CURRENT_DEPENDENCIES', formalFullPayloadBound: 'NOT_PROVEN',
  independentlyVerifiedSyntheticProfile: 'ABSENT', providerWrapperSpecification: 'UNVERIFIED',
  laboratoryUsage: 'INERT_TEST_DATA_NOT_TOKEN_EVIDENCE', liveDecision: 'BLOCKED',
  alternative: 'SEPARATELY_AUTHORIZE_REAL_COUNT_AND_GENERATION_AFTER_207_LAB_REVIEW' } as const);

// Future contract only, for a single trusted host process. No resolver/issuer is
// implemented: no IPC/worker requirement is imported from operational Phase 9G.
// Secret bytes would be delivered privately only AFTER live A/B/C and reservation,
// directly to the reviewed fixed transport, never into caller data or the model.
export interface FutureManualCredentialDelivery {
  deliverToFixedTransport(handle: import('./inference-contracts').FutureHostCredentialHandle,
    scope: Readonly<{ project: string; endpoint: 'https://api.openai.com/v1/responses';
      requestFingerprint: string; payloadDigest: string; attemptId: string }>): Promise<void>;
}
// Design only: each future delivery must also be bound to COUNT or GENERATION,
// the immutable frame-pair digest and its independent human A/B/C approval.
export interface FutureManualCountedCredentialDelivery {
  deliverToFixedTransport(handle: import('./inference-contracts').FutureHostCredentialHandle,
    scope: Readonly<{ projectId: string; stage: 'COUNT' | 'GENERATION';
      endpoint: 'https://api.openai.com/v1/responses/input_tokens' | 'https://api.openai.com/v1/responses';
      requestFingerprint: string; bindingDigest: string; attemptId: string }>): Promise<void>;
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
  requests: OfflineHttpRequests; stage: 'SINGLE' | 'COUNT' | 'GENERATION';
  phase: 'OPEN' | 'RUNNING' | 'COUNTED' | 'CLOSED'; expires: number; issued: Set<string>; abort: AbortController;
  budget?: OfflineInferenceBudget; simulatedPosts: number; outcome: string; cleanup: string;
  tokens: object[]; countPosts: number; inputTokens?: number; receipt?: ManualLabCountResult; workflowCap?: number };
type Binding = { session: ManualLabSession; request: object; digest: string; stage: State['stage']; expires: number };
declare const countResultBrand: unique symbol;
export interface ManualLabCountResult {
  readonly [countResultBrand]: true; readonly status: 'LAB_COUNT_VALID'; readonly inputTokens: number;
  readonly evidence: 'SIMULATED_UNVERIFIED_NOT_BILLING'; readonly bindingDigest: string;
  readonly realExecutionEnabled: false; readonly persistence: 'NOT_ATTEMPTED';
}
const countResults = new WeakMap<ManualLabCountResult, Binding & { readyAt: number; inputTokens: number }>();
export function isManualLabCountResult(value: unknown): value is ManualLabCountResult {
  return typeof value === 'object' && value !== null && countResults.has(value as ManualLabCountResult);
}
const sessions = new WeakMap<ManualLabSession, State>();
const grants = new WeakMap<ManualLabGrant, Binding & { type: 'A' | 'B' | 'C'; credential?: ManualLabCredential; max?: number }>();
const credentials = new WeakMap<ManualLabCredential, Binding & { secret: string; project: 'LAB_PROJECT_ONLY' }>();
const transcripts = new WeakMap<ManualLabTranscript, Binding & { exchange: OfflineSingleHttpsExchange }>();
let active = false;
// Module-instance laboratory gate: duplicate loads/processes have separate state,
// restart loses it, and other project/organization clients are not coordinated.
// Not proof of provider quota/reset state; never an operational rate authority.
// Failed/cancelled attempts also consume the slot. Never reset by closing a session.
let nextProjectAttemptAt = 0;
function denied(code: string): never { throw new Error(code); }
function state(session: ManualLabSession): State { const s = sessions.get(session); return s ?? denied('MANUAL_SESSION_INVALID'); }
function fresh(session: ManualLabSession, s: State): void {
  if (performance.now() >= s.expires) { close(session); denied('MANUAL_SESSION_EXPIRED'); }
  try { s.fixture.assertData(); assertOpenFixRequest(s.fixture.request); }
  catch { close(session); denied('MANUAL_SYNTHETIC_CONTEXT_CHANGED'); }
  if (performance.now() >= s.expires) { close(session); denied('MANUAL_SESSION_EXPIRED'); }
}
function open(session: ManualLabSession): State {
  const s = state(session); if (s.phase !== 'OPEN') denied('MANUAL_SESSION_INACTIVE');
  fresh(session, s); return s;
}
function binding(session: ManualLabSession, s: State): Binding {
  return { session, request: s.fixture.request, digest: s.stage === 'SINGLE' ? s.frame.digest : s.requests.bindingDigest,
    stage: s.stage, expires: Math.min(s.expires, performance.now() + 30000) };
}
function matches(b: Binding | undefined, session: ManualLabSession, s: State): boolean {
  return !!b && b.session === session && b.request === s.fixture.request && b.stage === s.stage
    && b.digest === (s.stage === 'SINGLE' ? s.frame.digest : s.requests.bindingDigest) && performance.now() < b.expires;
}
function once(s: State, type: string): void { if (s.issued.has(type)) denied('MANUAL_AUTHORITY_ALREADY_ISSUED'); s.issued.add(type); }
function clearTokens(s: State): void {
  for (const token of s.tokens) {
    const key = credentials.get(token as ManualLabCredential); if (key) key.secret = '';
    credentials.delete(token as ManualLabCredential); grants.delete(token as ManualLabGrant);
    const t = transcripts.get(token as ManualLabTranscript);
    if (t) discardOfflineSingleHttpsExchange(t.exchange);
    transcripts.delete(token as ManualLabTranscript);
  }
  s.tokens.length = 0;
}
function close(session: ManualLabSession): void {
  const s = state(session); if (s.phase === 'CLOSED') return;
  s.phase = 'CLOSED'; s.abort.abort(); clearTokens(s);
  if (s.receipt) countResults.delete(s.receipt);
  try { s.fixture.close(); s.cleanup = 'REMOVED'; } catch { s.cleanup = 'BLOCKED'; }
}
// No input and no registration hook: even an authentic real-guide request cannot
// be adopted. The only context is privately constructed, fixed synthetic data.
export function createManualLabSession(): ManualLabSession {
  if (arguments.length) denied('MANUAL_SYNTHETIC_ONLY');
  return createSession(false);
}
export function createManualCountedLabSession(): ManualLabSession {
  if (arguments.length) denied('MANUAL_SYNTHETIC_ONLY');
  return createSession(true);
}
function createSession(counted: boolean): ManualLabSession {
  if (active) denied('MANUAL_CONCURRENCY_EXCEEDED');
  const fixture = createManualSyntheticFixture();
  try {
    const projection = createOfflineInferenceProjection({ request: fixture.request });
    const requests = inspectOfflineHttpRequests(projection), frame = counted ? requests.count : requests.inference;
    const session = Object.freeze({}) as ManualLabSession;
    sessions.set(session, { fixture, frame, requests, stage: counted ? 'COUNT' : 'SINGLE',
      phase: 'OPEN', expires: performance.now() + (counted ? 600000 : 30000),
      issued: new Set(), abort: new AbortController(), simulatedPosts: 0, countPosts: 0,
      outcome: 'NOT_ATTEMPTED', cleanup: 'PENDING', tokens: [] });
    return session;
  } catch { fixture.close(); return denied('MANUAL_SETUP_FAILED'); }
}
export function inspectManualLabSession(session: ManualLabSession) {
  const s = state(session);
  // Copy data out; never export the WeakMap-authentic request to another host API.
  return Object.freeze({ phase: s.phase, request: normalizeFixerData(s.fixture.request) as unknown as typeof s.fixture.request, frame: s.frame,
    simulatedPosts: s.simulatedPosts, countPosts: s.countPosts, stage: s.stage, outcome: s.outcome, cleanup: s.cleanup,
    budget: s.budget ? inspectOfflineInferenceBudget(s.budget) : null,
    policy: s.stage === 'SINGLE' ? MANUAL_LAB_POLICY : MANUAL_COUNTED_LAB_POLICY,
    countedFrames: s.stage === 'SINGLE' ? null : s.requests,
    simulatedInputTokens: s.inputTokens ?? null });
}
export function inspectManualLiveReadiness(session: ManualLabSession) {
  state(session);
  return Object.freeze({ decision: 'BLOCKED', code: 'RUNTIME_NOT_ISOLATED',
    blockers: Object.freeze([...MANUAL_LAB_POLICY.realBlockers,
      ...(state(session).stage === 'SINGLE' ? [] : MANUAL_COUNTED_LAB_POLICY.additionalRealBlockers)]), fullInputTokenBoundVerified: false,
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
  const exchange = createOfflineSingleHttpsExchange({ frame: s.frame, events: d['events'] as readonly OfflineHttpsEvent[] }, s.stage === 'COUNT');
  const token = Object.freeze({}) as ManualLabTranscript; transcripts.set(token, { ...binding(session, s), exchange }); s.tokens.push(token); return token;
}
export function cancelManualLabSession(session: ManualLabSession): void { close(session); }

// Explicit host action, never a timer/automatic second request. A copied count or
// caller token number is not authority. Waiting does not extend workflow expiry.
export function advanceManualLabGeneration(input: { readonly session: ManualLabSession; readonly countResult: ManualLabCountResult }) {
  const d = inferenceEnvelope(input, ['session', 'countResult']), session = d['session'] as ManualLabSession, s = state(session);
  if (s.phase !== 'COUNTED' || s.stage !== 'COUNT') denied('MANUAL_COUNT_REQUIRED');
  fresh(session, s);
  const receipt = d['countResult'] as ManualLabCountResult, r = countResults.get(receipt);
  if (!matches(r, session, s) || s.receipt !== receipt) denied('MANUAL_COUNT_RECEIPT_INVALID');
  if (performance.now() < Math.max(r!.readyAt, nextProjectAttemptAt)) denied('MANUAL_RATE_LIMIT');
  countResults.delete(receipt); s.receipt = undefined; s.issued.clear();
  s.stage = 'GENERATION'; s.frame = s.requests.inference; s.phase = 'OPEN'; s.outcome = 'GENERATION_REQUIRES_FRESH_A_B_C';
  return Object.freeze({ status: 'LAB_GENERATION_READY', realExecutionEnabled: false, networkEnabled: false } as const);
}

// Laboratory entry only. No real/verified/testMode switch, URL, callback, resolver,
// HTTP client, environment key, native capability or bootstrap is accepted.
type ManualLabAttemptInput = { readonly session: ManualLabSession;
  readonly connectivity: ManualLabConnectivityGrant; readonly projectCredential: ManualLabProjectGrant; readonly economic: ManualLabEconomicGrant;
  readonly credential: ManualLabCredential; readonly transcript: ManualLabTranscript; readonly timeoutMs: number };
export function runManualLabInference(input: ManualLabAttemptInput) { return runManualLabAttempt(input, false); }
export function runManualLabCount(input: ManualLabAttemptInput) { return runManualLabAttempt(input, true); }
async function runManualLabAttempt(input: ManualLabAttemptInput, count: boolean) {
  let session: ManualLabSession | undefined, s: State | undefined, reservation: object | undefined;
  let exchange: OfflineSingleHttpsExchange | undefined, timer: ReturnType<typeof setTimeout> | undefined, owns = false, settled = false, keepOpen = false, attempted = false;
  try {
    const d = inferenceEnvelope(input, ['session', 'connectivity', 'projectCredential', 'economic', 'credential', 'transcript', 'timeoutMs']);
    session = d['session'] as ManualLabSession; s = open(session);
    if (active) denied('MANUAL_CONCURRENCY_EXCEEDED');
    if (s.stage !== 'SINGLE' && performance.now() < nextProjectAttemptAt) denied('MANUAL_RATE_LIMIT');
    // Own and close even a failed authorization attempt; no correction/retry on
    // this session. Join independent provenance BEFORE reservation/first await.
    owns = true; s.phase = 'RUNNING';
    if (count !== (s.stage === 'COUNT') || count && s.stage === 'SINGLE') denied('MANUAL_STAGE_INVALID');
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
    assertFixedHttpRequest(s.frame, count);
    if (performance.now() >= s.expires) denied('MANUAL_SESSION_EXPIRED');
    const nativeReview = nativeSessions.get(session);
    const workflowMinimum = nativeReview ? nativeReview.countMaximumMicroUsd + nativeReview.generationMaximumMicroUsd
      : MANUAL_COUNTED_LAB_POLICY.minimumWorkflowCapMicroUsd;
    if (s.stage !== 'SINGLE' && (count ? c!.max! < workflowMinimum
      : c!.max !== s.workflowCap)) denied('MANUAL_WORKFLOW_BUDGET_INVALID');
    for (const name of ['connectivity', 'projectCredential', 'economic']) grants.delete(d[name] as ManualLabGrant);
    credentials.delete(d['credential'] as ManualLabCredential); transcripts.delete(d['transcript'] as ManualLabTranscript);
    exchange = t!.exchange;
    if (!s.budget) {
      s.workflowCap = c!.max!;
      s.budget = nativeReview ? createManualSmokePreparationBudget({ countMaximumMicroUsd: nativeReview.countMaximumMicroUsd,
        generationMaximumMicroUsd: nativeReview.generationMaximumMicroUsd, maxBatchMicroUsd: c!.max! })
        : createOfflineInferenceBudget({ maxAttemptMicroUsd: s.stage === 'SINGLE' ? c!.max! : offlineInferenceReservationMicroUsd(),
          maxBatchMicroUsd: c!.max!, maxAttempts: s.stage === 'SINGLE' ? 1 : 2 });
    }
    reservation = reserveOfflineInference(s.budget); active = true;
    const signal = s.abort.signal, deadline = Math.min(s.expires, a!.expires, b!.expires, c!.expires,
      key!.expires, t!.expires, performance.now() + (timeout as number));
    timer = setTimeout(() => s!.abort.abort(new FixerError('TIMEOUT')), Math.max(1, deadline - performance.now()));
    if (performance.now() >= deadline) denied('MANUAL_TIMEOUT');
    attempted = true;
    if (s.stage !== 'SINGLE') nextProjectAttemptAt = performance.now() + 60000;
    if (count) s.countPosts++; else s.simulatedPosts++;
    let body: string;
    if (nativeSessions.has(session)) {
      const permit = Object.freeze({});
      const timeoutMs = Math.max(1, Math.ceil(deadline - performance.now()));
      nativeAttempts.set(permit, { session, frame: s.frame, count, secret: key!.secret, expires: deadline, signal, timeoutMs });
      key!.secret = '';
      try { body = await receivePreparedManualHttpsAttempt(permit, s.frame, count, signal, timeoutMs); }
      finally { nativeAttempts.delete(permit); }
    } else body = await receiveOfflineSingleHttpsExchange(exchange, s.frame, signal, key!.secret);
    const check = (): void => {
      if (performance.now() >= deadline) denied('MANUAL_TIMEOUT');
      if (signal.aborted || s!.phase !== 'RUNNING') denied('MANUAL_CANCELLED');
    };
    check();
    if (count) {
      const inputTokens = decodeOfflineInputTokens(body);
      check();
      if (inputTokens + MANUAL_COUNTED_LAB_POLICY.maxOutputTokens > MANUAL_COUNTED_LAB_POLICY.reportedTpm) denied('MANUAL_TPM_EXCEEDED');
      settleOfflineInference(reservation); settled = true; // Count price/usage UNKNOWN, never assumed free.
      check();
      nextProjectAttemptAt = Math.max(nextProjectAttemptAt, performance.now() + 60000);
      const result = Object.freeze({ status: 'LAB_COUNT_VALID', inputTokens, bindingDigest: s.requests.bindingDigest,
        evidence: 'SIMULATED_UNVERIFIED_NOT_BILLING', realExecutionEnabled: false, persistence: 'NOT_ATTEMPTED' }) as ManualLabCountResult;
      countResults.set(result, { ...binding(session, s), expires: s.expires, readyAt: nextProjectAttemptAt, inputTokens });
      s.receipt = result; s.inputTokens = inputTokens; s.phase = 'COUNTED'; s.outcome = 'COUNT_VALIDATED_WAIT_MANUAL_TRANSITION';
      keepOpen = true; return result;
    }
    const decoded = decodeOfflineResponsesReply({ status: 200, body, delayMs: 0 });
    check();
    // Equal immutable input does not prove equal provider accounting. Divergence
    // is unresolved (provider variation/error or tampering), NOT proof of attack.
    // Keep the existing fail-closed code and hold the uncertain reservation.
    if (s.stage === 'GENERATION' && decoded.usage.inputTokens !== s.inputTokens) throw new InferenceError('TOKEN_COUNT_INVALID');
    settleOfflineInference(reservation, decoded.usage); settled = true;
    check();
    // This is the existing inert validation adapter, NOT a second model run.
    const validation = await launchFixer({ request: s.fixture.request,
      transport: createSimulatedFixerTransport({ request: s.fixture.request,
        events: [{ type: 'stdout', text: decoded.text, delayMs: 0 }, { type: 'exit', code: 0, delayMs: 0 }] }) });
    check();
    if (validation.status !== 'PROPOSAL_VALID') throw new FixerError(validation.code);
    const plan = decodeFixerJson(decoded.text);
    check();
    s.outcome = 'VALIDATED_IN_MEMORY';
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
    if (attempted && s?.stage !== 'SINGLE') nextProjectAttemptAt = Math.max(nextProjectAttemptAt, performance.now() + 60000);
    if (owns && session) { active = false; if (keepOpen) clearTokens(s!); else close(session); }
  }
}
