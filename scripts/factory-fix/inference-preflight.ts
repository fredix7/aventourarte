import { inspectOfflineBootstrapReceipt, BOOTSTRAP_POLICY, type OfflineBootstrapReceipt } from './inference-bootstrap';
import { inspectOfflineHttpRequests } from './inference-broker';
import { inspectOfflineInferenceBudget, offlineInferenceReservationMicroUsd, type OfflineInferenceBudget } from './inference-budget';
import { INFERENCE_PROFILE, inferenceFail, type OfflineInferenceProjection } from './inference-contracts';
import { inferenceEnvelope } from './inference-data';
import { normalizeFixerData, serializeFixerData } from './fixer-json';
import { FIXER_LIMITS } from './fixer-contracts';
import { OFFLINE_HTTPS_POLICY } from './inference-http';
import { HTTPS_ADAPTER_POLICY } from './inference-https-adapter';

// Requirements, NOT implementations or grants. An unverified item blocks live use.
export const LIVE_ACTIVATION_BLOCKERS = Object.freeze([
  'APPROVED_HOST_AND_PARENT_TRUST_ANCHOR', 'APPROVED_EXECUTABLE_AND_WORKER_MANIFEST',
  'RACE_FREE_EXECUTABLE_AND_FIXTURE_LAUNCH',
  'PRODUCTION_CLEAN_BOOTSTRAP_AND_AUTHENTICATED_IPC', 'PROCESS_TREE_TERMINATION_AND_CANCEL_BOUNDARY', 'PRIVATE_CONNECTIVITY_GRANT_A',
  'PRIVATE_DEDICATED_PROJECT_CREDENTIAL_GRANT_B', 'PROTECTED_HOST_CREDENTIAL_RESOLVER',
  'PRIVATE_CLOSED_ECONOMIC_GRANT_C', 'DURABLE_ATOMIC_BUDGET_LEDGER',
  'VERIFIED_COUNT_BILLING_PRICES_QUOTA_AND_PROJECT_MODEL_ACCESS', 'AUTHORIZED_REAL_TLS_DNS_SMOKE',
  'REVIEWED_PRIVATE_ONE_SHOT_NATIVE_ISSUER', 'RUNTIME_NOT_ISOLATED'
] as const);
export const DURABLE_BUDGET_REQUIREMENTS = Object.freeze({ implemented: false,
  reservation: 'ATOMIC_DURABLE_BEFORE_COUNT_AND_GENERATION', concurrency: 'SERIALIZED_ACROSS_PROCESSES_AND_PROJECT_LIMITS',
  binding: 'UNIQUE_ATTEMPT_REQUEST_FRAMES_MODEL_PROJECT_GRANTS_EXPIRY',
  replay: 'UNIQUE_RESERVATION_AND_ONE_SHOT_SETTLEMENT_NO_IMPLICIT_RETRY',
  recovery: 'PERSIST_BEFORE_SEND_CRASH_RESTART_RECOVER_UNKNOWN_AS_HELD',
  cancellation: 'LOCAL_ABORT_NEVER_REFUNDS_UNKNOWN_REMOTE_SPEND',
  reconciliation: 'AUTHENTIC_PROVIDER_USAGE_MONOTONIC_SETTLEMENT_NO_UNTRUSTED_REFUNDS',
  missing: Object.freeze(['STORAGE_BACKEND_AND_PROTECTION', 'TRANSACTION_LOCKING_AND_DURABILITY',
    'CROSS_PROCESS_CRASH_RECOVERY', 'PROVIDER_RECONCILIATION', 'VERIFIED_PRICES_AND_COUNT_COST', 'HOST_ECONOMIC_AUTHORITY']),
  simulationMicroUsdIsPermission: false } as const);

// Never read flags, caller grants, environment or credentials here. This diagnostic
// cannot activate anything. In particular, a LAB_PASS is not a live preflight pass.
export function inspectOperationalActivation() {
  return Object.freeze({ decision: 'BLOCKED', runtimeStatus: 'RUNTIME_NOT_ISOLATED',
    connectivityGrantIssued: false, projectCredentialGrantIssued: false, economicGrantIssued: false,
    nativeClientStarted: false, blockers: LIVE_ACTIVATION_BLOCKERS } as const);
}
const fixture = Object.freeze({ mode: 'LABORATORY_ONLY', runtimeVersion: BOOTSTRAP_POLICY.runtimeVersion,
  hostIdentity: 'SYNTHETIC_NOT_ATTESTED', endpoint: INFERENCE_PROFILE.endpoint,
  countEndpoint: OFFLINE_HTTPS_POLICY.origin + OFFLINE_HTTPS_POLICY.countPath, model: INFERENCE_PROFILE.model,
  requestBytes: FIXER_LIMITS.maxRequestBytes, responseBytes: FIXER_LIMITS.maxResponseBytes,
  inputTokens: OFFLINE_HTTPS_POLICY.maxInputTokens, outputTokens: OFFLINE_HTTPS_POLICY.maxOutputTokens,
  timeoutMs: OFFLINE_HTTPS_POLICY.maxTimeoutMs, concurrency: OFFLINE_HTTPS_POLICY.maxConcurrency,
  tls: HTTPS_ADAPTER_POLICY.trust, dns: HTTPS_ADAPTER_POLICY.dns, proxy: 'FORBIDDEN',
  tools: 'NONE', retries: 0, redirects: 0, fallback: false,
  credential: Object.freeze({ mode: 'SYNTHETIC_REFERENCE_ONLY', project: 'LAB_PROJECT_NO_ACCOUNT', dedicated: true }),
  economic: Object.freeze({ mode: 'IN_MEMORY_SIMULATION_ONLY', durable: false, countBilling: 'UNVERIFIED' }) } as const);
export function getOfflinePreflightFixture() { return fixture; }
type Input = { readonly projection: OfflineInferenceProjection; readonly bootstrap: OfflineBootstrapReceipt;
  readonly budget: OfflineInferenceBudget; readonly fixture: unknown };
interface State { projection: OfflineInferenceProjection; bootstrap: OfflineBootstrapReceipt; budget: OfflineInferenceBudget;
  binding: string; budgetSnapshot: string; phase: 'FRESH' | 'CONSUMED' | 'CANCELLED' }
const reports = new WeakMap<object, State>();
const report = (status: 'LAB_PASS' | 'LAB_REJECTED' | 'LAB_CONSUMED', code: string) => Object.freeze({
  status, code, ...inspectOperationalActivation() });
type Report = ReturnType<typeof report>;
function verify(input: Input) {
  const evidence = inspectOfflineBootstrapReceipt(input.bootstrap);
  if (evidence.runtimeVersion !== fixture.runtimeVersion || !evidence.laboratoryOnly
    || !evidence.environmentMatchesPolicy || evidence.operationalWorkerStarted || evidence.preloadExecuted) inferenceFail('PREFLIGHT_REQUIREMENT_UNVERIFIED');
  if (serializeFixerData(normalizeFixerData(input.fixture)) !== serializeFixerData(fixture)) inferenceFail('PREFLIGHT_REQUIREMENT_UNVERIFIED');
  const requests = inspectOfflineHttpRequests(input.projection), b = inspectOfflineInferenceBudget(input.budget);
  const required = offlineInferenceReservationMicroUsd();
  if (b.active || b.attempts >= b.maxAttempts || b.maxAttemptMicroUsd < required
    || b.maxBatchMicroUsd - b.allocatedMicroUsd < required) inferenceFail('PREFLIGHT_REQUIREMENT_UNVERIFIED');
  return { binding: requests.bindingDigest, budgetSnapshot: serializeFixerData(b) };
}
// Private provenance and identity bindings are for one-shot LAB consumption only.
// No issuer for A/B/C exists, and this module never imports the dormant native client.
export function runOfflinePreflight(input: Input): Report {
  try {
    const d = inferenceEnvelope(input, ['projection', 'bootstrap', 'budget', 'fixture']) as Input;
    const verified = verify(d), result = report('LAB_PASS', 'SIMULATED_ONLY');
    reports.set(result, { projection: d.projection, bootstrap: d.bootstrap, budget: d.budget, ...verified, phase: 'FRESH' });
    return result;
  } catch { return report('LAB_REJECTED', 'PREFLIGHT_REQUIREMENT_UNVERIFIED'); }
}
export function consumeOfflinePreflight(input: Omit<Input, 'fixture'> & { readonly report: Report }): Report {
  try {
    const d = inferenceEnvelope(input, ['projection', 'bootstrap', 'budget', 'report']);
    const state = reports.get(d['report'] as object);
    if (!state || state.phase !== 'FRESH') inferenceFail('PREFLIGHT_INACTIVE');
    // Burn before validation: an attempted rebind cannot be repaired and replayed.
    state.phase = 'CONSUMED';
    if (d['projection'] !== state.projection || d['bootstrap'] !== state.bootstrap || d['budget'] !== state.budget) inferenceFail('PREFLIGHT_INVALID');
    const current = verify({ ...state, fixture });
    if (state.binding !== current.binding || state.budgetSnapshot !== current.budgetSnapshot) inferenceFail('PREFLIGHT_INACTIVE');
    return report('LAB_CONSUMED', 'SIMULATED_ONLY');
  } catch { return report('LAB_REJECTED', 'PREFLIGHT_INACTIVE'); }
}
export function cancelOfflinePreflight(result: Report): void {
  const state = reports.get(result); if (state?.phase === 'FRESH') state.phase = 'CANCELLED';
}
