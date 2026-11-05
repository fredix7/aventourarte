import { performance } from 'node:perf_hooks';
import {
  createManualCountedLabSession, inspectManualLabSession, assertManualLabSessionCurrent, cancelManualLabSession,
  authorizeManualLabConnectivity, createManualLabCredential, authorizeManualLabCredential,
  authorizeManualLabBudget, createManualLabTranscript, runManualLabCount, runManualLabInference,
  advanceManualLabGeneration, MANUAL_NATIVE_SMOKE_POLICY,
  type ManualLabSession, type ManualLabCountResult, type ManualLabConnectivityGrant,
  type ManualLabCredential, type ManualLabProjectGrant, type ManualLabEconomicGrant
} from './inference-manual';
import { DORMANT_HTTPS_CLIENT_POLICY } from './inference-https-native';
import { getFixerRuntimeStatus } from './fixer-launcher';
import { inferenceEnvelope } from './inference-data';
import { InferenceError } from './inference-contracts';
import { FixerError } from './fixer-contracts';
import type { OfflineHttpsEvent } from './inference-https-adapter';

// Explicit host API, never a CLI/main, timer, environment switch or real issuer.
// It reuses the manual ceremony's A/B/C and transcript transport, NOT its dormant
// native ceremony. No entry in nativeReviews/nativeSessions can be minted here.
export const OFFLINE_SMOKE_ENTRY_POLICY = Object.freeze({
  version: 'ava76-offline-entry-v1', mode: 'LABORATORY_ONLY', project: 'LAB_PROJECT_ONLY',
  io: 'SIMULATED_HTTPS_TRANSCRIPT', automaticStart: false, networkEnabled: false,
  realInferencePerformed: false, realSpend: 'NOT_INCURRED_OFFLINE',
  providerCountPriceMicroUsd: null, providerCountQuotaVerified: false,
  billingEvidence: 'UNVERIFIED_NO_PROVIDER_OBSERVATION', hostTrustAttested: false,
  runtimeStatus: 'RUNTIME_NOT_ISOLATED', writeAuthorized: false,
  startupQuietPeriodMs: 60000, grantLifetimeMs: 30000, workflowLifetimeMs: 600000,
  maxTimeoutMs: 30000, maxCountPosts: 1, maxGenerationPosts: 1, retries: 0,
  liveActivation: 'BLOCKED_SEPARATE_REVIEW_AND_IMPLEMENTATION_REQUIRED'
} as const);

declare const entryBrand: unique symbol, preflightBrand: unique symbol, grantBrand: unique symbol;
export interface OfflineSmokeEntry { readonly [entryBrand]: true }
export interface OfflineSmokePreflight { readonly [preflightBrand]: true }
export interface OfflineSmokeGrant { readonly [grantBrand]: true }
type Stage = 'COUNT' | 'GENERATION';
type State = { session: ManualLabSession; pid: number; stage: Stage;
  phase: 'OPEN' | 'RUNNING' | 'COUNTED' | 'CLOSED'; expires: number; readyAt: number;
  fingerprint: string; digest: string; preflight?: OfflineSmokePreflight; count?: ManualLabCountResult;
  countResult?: object; tokens: object[] };
type Review = { entry: OfflineSmokeEntry; pid: number; project: string; stage: Stage;
  fingerprint: string; digest: string; expires: number; consumed: boolean };
type Authority = { review: OfflineSmokePreflight; kind: 'A'; grant: ManualLabConnectivityGrant }
  | { review: OfflineSmokePreflight; kind: 'B'; grant: ManualLabProjectGrant; credential: ManualLabCredential }
  | { review: OfflineSmokePreflight; kind: 'C'; grant: ManualLabEconomicGrant };
const entries = new WeakMap<OfflineSmokeEntry, State>();
const reviews = new WeakMap<OfflineSmokePreflight, Review>();
const authorities = new WeakMap<OfflineSmokeGrant, Authority>();
const counts = new WeakMap<object, OfflineSmokeEntry>();
const token = () => Object.freeze(Object.create(null));
function fail(code: string): never { throw Error(code); }
function state(entry: OfflineSmokeEntry): State {
  return entries.get(entry) ?? fail('SMOKE_ENTRY_INVALID');
}
function close(s: State): void {
  s.phase = 'CLOSED';
  if (s.preflight) reviews.delete(s.preflight);
  if (s.countResult) counts.delete(s.countResult);
  for (const t of s.tokens) authorities.delete(t as OfflineSmokeGrant);
  s.tokens.length = 0; s.count = undefined;
  cancelManualLabSession(s.session);
}
function safeCode(error: unknown): string {
  if (error instanceof InferenceError || error instanceof FixerError) return error.code;
  return error instanceof Error && /^(?:SMOKE|MANUAL)_[A-Z_]+$/.test(error.message)
    ? error.message : 'SMOKE_REJECTED';
}
function fresh(s: State): void {
  if (s.phase === 'CLOSED') fail('SMOKE_ENTRY_CLOSED');
  if (s.pid !== process.pid || performance.now() >= s.expires) {
    close(s); fail('SMOKE_PROCESS_OR_EXPIRY_INVALID');
  }
  try { assertManualLabSessionCurrent(s.session); }
  catch { close(s); fail('SMOKE_CONTEXT_CHANGED'); }
  const info = inspectManualLabSession(s.session);
  if (info.stage !== s.stage || info.request.requestFingerprint !== s.fingerprint
    || info.countedFrames?.bindingDigest !== s.digest || info.request.guidePath !== 'fixture/ciudad'
    || info.phase !== (s.phase === 'COUNTED' ? 'COUNTED' : 'OPEN')) {
    close(s); fail('SMOKE_CONTEXT_CHANGED');
  }
}
function reviewFor(entry: OfflineSmokeEntry, preflight: OfflineSmokePreflight): { s: State; r: Review } {
  const s = state(entry), r = reviews.get(preflight);
  fresh(s);
  if (s.phase !== 'OPEN' || !r || r.consumed || s.preflight !== preflight || r.entry !== entry
    || r.pid !== process.pid || r.project !== OFFLINE_SMOKE_ENTRY_POLICY.project || r.stage !== s.stage
    || r.digest !== s.digest || r.fingerprint !== s.fingerprint || performance.now() >= r.expires) {
    // A failed join burns the presented receipt too. It cannot be corrected/replayed.
    if (r) r.consumed = true;
    close(s); fail('SMOKE_PREFLIGHT_INVALID');
  }
  return { s, r };
}
function policiesRemainOffline(): void {
  if (getFixerRuntimeStatus().realExecutionEnabled || MANUAL_NATIVE_SMOKE_POLICY.enabled
    || MANUAL_NATIVE_SMOKE_POLICY.operationalReviewIssuer || DORMANT_HTTPS_CLIENT_POLICY.enabled
    || DORMANT_HTTPS_CLIENT_POLICY.capabilityIssuer) fail('SMOKE_OFFLINE_POLICY_CHANGED');
}

export function createOfflineSmokeEntry(): OfflineSmokeEntry {
  if (arguments.length) fail('SMOKE_SYNTHETIC_ONLY');
  policiesRemainOffline();
  const session = createManualCountedLabSession();
  try {
    const info = inspectManualLabSession(session), entry = token() as OfflineSmokeEntry;
    entries.set(entry, { session, pid: process.pid, stage: 'COUNT', phase: 'OPEN',
      expires: performance.now() + OFFLINE_SMOKE_ENTRY_POLICY.workflowLifetimeMs,
      readyAt: performance.now() + OFFLINE_SMOKE_ENTRY_POLICY.startupQuietPeriodMs,
      fingerprint: info.request.requestFingerprint, digest: info.countedFrames!.bindingDigest, tokens: [] });
    return entry;
  } catch { cancelManualLabSession(session); return fail('SMOKE_SETUP_FAILED'); }
}

// Data copies only: no underlying session/request/count/ABC capabilities escape.
export function inspectOfflineSmokeEntry(entry: OfflineSmokeEntry) {
  const s = state(entry), info = inspectManualLabSession(s.session);
  return Object.freeze({ policy: OFFLINE_SMOKE_ENTRY_POLICY, phase: s.phase, stage: s.stage,
    project: OFFLINE_SMOKE_ENTRY_POLICY.project, processId: s.pid,
    request: info.request, frames: info.countedFrames, cleanup: info.cleanup,
    simulatedCountPosts: info.countPosts, simulatedGenerationPosts: info.simulatedPosts,
    laboratoryBudget: info.budget, liveDecision: 'BLOCKED' as const });
}

export function preflightOfflineSmoke(entry: OfflineSmokeEntry): OfflineSmokePreflight {
  const s = state(entry); fresh(s); policiesRemainOffline();
  if (s.phase !== 'OPEN' || s.preflight) fail('SMOKE_PREFLIGHT_ALREADY_ISSUED');
  if (performance.now() < s.readyAt) fail('SMOKE_QUIET_PERIOD_REQUIRED');
  const expires = Math.min(s.expires, performance.now() + OFFLINE_SMOKE_ENTRY_POLICY.grantLifetimeMs);
  const report = Object.freeze({ status: 'OFFLINE_PREFLIGHT_PASS',
    scope: 'SYNTHETIC_TRANSCRIPTS_ONLY', liveDecision: 'BLOCKED',
    project: OFFLINE_SMOKE_ENTRY_POLICY.project, processId: s.pid, stage: s.stage,
    requestFingerprint: s.fingerprint, payloadDigest: s.digest,
    expires,
    hostTrustAttested: false, runtimeStatus: 'RUNTIME_NOT_ISOLATED' }) as unknown as OfflineSmokePreflight;
  reviews.set(report, { entry, pid: s.pid, project: OFFLINE_SMOKE_ENTRY_POLICY.project,
    stage: s.stage, fingerprint: s.fingerprint, digest: s.digest,
    expires, consumed: false });
  s.preflight = report; return report;
}

type ApprovalInput = { readonly entry: OfflineSmokeEntry; readonly preflight: OfflineSmokePreflight };
function approve(input: ApprovalInput, kind: 'A' | 'B' | 'C', maximum?: number): OfflineSmokeGrant {
  const d = inferenceEnvelope(input, ['entry', 'preflight']);
  const entry = d['entry'] as OfflineSmokeEntry, preflight = d['preflight'] as OfflineSmokePreflight;
  const { s } = reviewFor(entry, preflight);
  try {
    let authority: Authority;
    if (kind === 'A') authority = { review: preflight, kind, grant: authorizeManualLabConnectivity(s.session) };
    else if (kind === 'B') {
      const credential = createManualLabCredential(s.session); // Generated LAB literal, never an API key.
      authority = { review: preflight, kind, credential,
        grant: authorizeManualLabCredential({ session: s.session, credential }) };
    } else authority = { review: preflight, kind,
      grant: authorizeManualLabBudget({ session: s.session, maxAttemptMicroUsd: maximum! }) };
    const grant = token() as OfflineSmokeGrant; authorities.set(grant, authority); s.tokens.push(grant); return grant;
  } catch (error) { close(s); return fail(safeCode(error)); }
}
export function approveOfflineSmokeConnectivity(input: ApprovalInput): OfflineSmokeGrant { return approve(input, 'A'); }
export function approveOfflineSmokeProject(input: ApprovalInput): OfflineSmokeGrant { return approve(input, 'B'); }
export function approveOfflineSmokeBudget(input: ApprovalInput & { readonly simulatedWorkflowMaximumMicroUsd: number }): OfflineSmokeGrant {
  const d = inferenceEnvelope(input, ['entry', 'preflight', 'simulatedWorkflowMaximumMicroUsd']);
  return approve({ entry: d['entry'] as OfflineSmokeEntry, preflight: d['preflight'] as OfflineSmokePreflight },
    'C', d['simulatedWorkflowMaximumMicroUsd'] as number);
}

type AttemptInput = ApprovalInput & { readonly connectivity: OfflineSmokeGrant; readonly projectCredential: OfflineSmokeGrant;
  readonly economic: OfflineSmokeGrant; readonly events: readonly OfflineHttpsEvent[]; readonly timeoutMs: number };
const evidence = Object.freeze({ mode: 'LABORATORY_ONLY', io: 'SIMULATED_HTTPS_TRANSCRIPT',
  realInferencePerformed: false, realRequests: 0, realSpend: 'NOT_INCURRED_OFFLINE',
  providerCountPriceMicroUsd: null, billingEvidence: 'UNVERIFIED_NO_PROVIDER_OBSERVATION',
  persistence: 'NOT_ATTEMPTED', writeAuthorized: false, runtimeStatus: 'RUNTIME_NOT_ISOLATED' } as const);

export async function runOfflineSmokeStage(input: AttemptInput) {
  let s: State | undefined, running = false;
  try {
    const d = inferenceEnvelope(input, ['entry', 'preflight', 'connectivity', 'projectCredential', 'economic', 'events', 'timeoutMs']);
    const entry = d['entry'] as OfflineSmokeEntry, preflight = d['preflight'] as OfflineSmokePreflight;
    s = state(entry);
    // Do not let a concurrent replay cancel or revive the first owned attempt.
    if (s.phase === 'RUNNING') fail('SMOKE_ATTEMPT_ACTIVE');
    const { r } = reviewFor(entry, preflight); r.consumed = true;
    policiesRemainOffline();
    const a = authorities.get(d['connectivity'] as OfflineSmokeGrant), b = authorities.get(d['projectCredential'] as OfflineSmokeGrant);
    const c = authorities.get(d['economic'] as OfflineSmokeGrant);
    for (const key of ['connectivity', 'projectCredential', 'economic']) authorities.delete(d[key] as OfflineSmokeGrant);
    if (!a || a.review !== preflight || a.kind !== 'A' || !b || b.review !== preflight || b.kind !== 'B'
      || !c || c.review !== preflight || c.kind !== 'C') fail('SMOKE_A_B_C_INVALID');
    const timeout = d['timeoutMs'];
    if (!Number.isSafeInteger(timeout) || (timeout as number) < 1 || (timeout as number) > 30000) fail('SMOKE_TIMEOUT_INVALID');
    const remaining = Math.floor(r.expires - performance.now());
    if (remaining < 1) fail('SMOKE_PREFLIGHT_EXPIRED');
    const transcript = createManualLabTranscript({ session: s.session, events: d['events'] as readonly OfflineHttpsEvent[] });
    const attempt = { session: s.session, connectivity: a.grant, projectCredential: b.grant,
      economic: c.grant, credential: b.credential, transcript, timeoutMs: Math.min(timeout as number, remaining) };
    s.phase = 'RUNNING'; running = true;
    const result = await (s.stage === 'COUNT' ? runManualLabCount(attempt) : runManualLabInference(attempt));
    // Cancellation cannot revive an entry after an await.
    if ((s.phase as string) === 'CLOSED') return Object.freeze({ ...evidence, status: 'BLOCKED', code: 'SMOKE_CANCELLED' });
    if (performance.now() >= r.expires || performance.now() >= s.expires || s.pid !== process.pid) fail('SMOKE_PROCESS_OR_EXPIRY_INVALID');
    if (result.status === 'LAB_COUNT_VALID') {
      s.phase = 'COUNTED';
      // The manual await returning a receipt is another trust boundary. Burn
      // it and close if the underlying context changed before publication.
      fresh(s);
      if (performance.now() >= r.expires || performance.now() >= s.expires || s.pid !== process.pid) fail('SMOKE_PROCESS_OR_EXPIRY_INVALID');
      s.count = result;
      const output = Object.freeze({ ...evidence, status: 'OFFLINE_COUNT_VALID', inputTokens: result.inputTokens });
      s.countResult = output; counts.set(output, entry); return output;
    }
    close(s);
    if (result.status === 'LAB_PLAN_VALID') return Object.freeze({ ...evidence, status: 'OFFLINE_PLAN_VALID', plan: result.plan });
    return Object.freeze({ ...evidence, status: 'BLOCKED', code: result.code });
  } catch (error) {
    if (s && (running || s.phase !== 'RUNNING')) close(s);
    return Object.freeze({ ...evidence, status: 'BLOCKED', code: safeCode(error) });
  }
}

export function advanceOfflineSmokeGeneration(input: { readonly entry: OfflineSmokeEntry; readonly countResult: object }) {
  const d = inferenceEnvelope(input, ['entry', 'countResult']), entry = d['entry'] as OfflineSmokeEntry;
  const s = state(entry), result = d['countResult'] as object;
  try {
    fresh(s);
    const owner = counts.get(result); counts.delete(result);
    if (s.phase !== 'COUNTED' || owner !== entry || s.countResult !== result || !s.count) fail('SMOKE_COUNT_RECEIPT_INVALID');
    advanceManualLabGeneration({ session: s.session, countResult: s.count });
    if (s.preflight) reviews.delete(s.preflight);
    for (const t of s.tokens) authorities.delete(t as OfflineSmokeGrant);
    s.tokens.length = 0; s.preflight = undefined; s.count = undefined; s.countResult = undefined;
    s.stage = 'GENERATION'; s.phase = 'OPEN';
    return Object.freeze({ ...evidence, status: 'OFFLINE_GENERATION_REQUIRES_PREFLIGHT_AND_A_B_C' });
  } catch (error) { close(s); return fail(safeCode(error)); }
}
export function cancelOfflineSmokeEntry(entry: OfflineSmokeEntry): void { close(state(entry)); }
