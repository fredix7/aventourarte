import { inferenceFail, INFERENCE_PROFILE } from './inference-contracts';
import { inferenceRecord } from './inference-data';
import { normalizeFixerData } from './fixer-json';

// Integer micro-USD. Snapshot is a simulation estimate, NOT a billing quote or permission
// to spend. Use the higher cache-write input rate conservatively for every reservation.
export const OFFLINE_RATE_CARD = Object.freeze({ version: '9c-2026-10-16-standard-short-v1',
  model: INFERENCE_PROFILE.model, inputMicroUsdPerMillion: 100000,
  reservedInputMicroUsdPerMillion: 125000, outputMicroUsdPerMillion: 500000,
  verifiedForBilling: false, currency: 'USD' } as const);
declare const budgetBrand: unique symbol;
export interface OfflineInferenceBudget { readonly [budgetBrand]: true; readonly kind: 'OFFLINE_BUDGET_ONLY' }
interface BudgetState { maxAttemptMicroUsd: number; maxBatchMicroUsd: number; maxAttempts: number;
  attempts: number; active: number; allocatedMicroUsd: number; knownMicroUsd: number; uncertainMicroUsd: number;
  stageReserves?: readonly number[]; preparationOnly?: true }
const budgets = new WeakMap<OfflineInferenceBudget, BudgetState>();
const reservations = new WeakMap<object, { budget: BudgetState; reserved: number; settled: boolean }>();
const amount = (value: unknown): number => {
  if (!Number.isSafeInteger(value) || (value as number) < 0 || (value as number) > 1000000000) inferenceFail('BUDGET_INVALID');
  return value as number;
};
function state(budget: OfflineInferenceBudget): BudgetState {
  const s = budgets.get(budget); if (!s) inferenceFail('BUDGET_INVALID'); return s;
}
export function createOfflineInferenceBudget(input: { readonly maxAttemptMicroUsd: number;
  readonly maxBatchMicroUsd: number; readonly maxAttempts: number }): OfflineInferenceBudget {
  const d = inferenceRecord(input, ['maxAttemptMicroUsd', 'maxBatchMicroUsd', 'maxAttempts']);
  const s = { maxAttemptMicroUsd: amount(d['maxAttemptMicroUsd']), maxBatchMicroUsd: amount(d['maxBatchMicroUsd']),
    maxAttempts: amount(d['maxAttempts']), attempts: 0, active: 0, allocatedMicroUsd: 0, knownMicroUsd: 0, uncertainMicroUsd: 0 };
  const token = Object.freeze({ kind: 'OFFLINE_BUDGET_ONLY' }) as OfflineInferenceBudget;
  budgets.set(token, s); return token;
}
export function inspectOfflineInferenceBudget(budget: OfflineInferenceBudget) {
  const s = state(budget);
  return Object.freeze({ ...s, rateVersion: s.preparationOnly ? 'manual-smoke-generation-reviewed-2026-10-16' : OFFLINE_RATE_CARD.version,
    model: OFFLINE_RATE_CARD.model, accounting: s.preparationOnly ? 'PREPARATION_ONLY_NOT_AUTHORIZED' as const : 'SIMULATED_NOT_BILLING' as const,
    realMoneyReserved: false, networkAuthorized: false });
}
// Estimate only; this is never an economic grant or a commercial count quote.
export function offlineInferenceReservationMicroUsd(): number {
  return Math.ceil(INFERENCE_PROFILE.proposedMaxInputTokens * OFFLINE_RATE_CARD.reservedInputMicroUsdPerMillion / 1000000)
    + Math.ceil(INFERENCE_PROFILE.maxOutputTokens * OFFLINE_RATE_CARD.outputMicroUsdPerMillion / 1000000);
}
// Separate documentation review, never promoted from OFFLINE_RATE_CARD.
// No commercial quote for count is inferred from generation token prices.
export const MANUAL_SMOKE_GENERATION_RATES = Object.freeze({ reviewedAt: '2026-10-16', model: 'gpt-6-luna',
  source: 'https://developers.openai.com/api/docs/models/gpt-6-luna', tier: 'default',
  inputMicroUsdPerMillion: 100000, reservedInputMicroUsdPerMillion: 125000, outputMicroUsdPerMillion: 500000,
  countPriceMicroUsd: null, countQuotaVerified: false } as const);
export function manualSmokeGenerationMaximumMicroUsd(): number {
  return Math.ceil(16000 * MANUAL_SMOKE_GENERATION_RATES.reservedInputMicroUsdPerMillion / 1000000)
    + Math.ceil(4096 * MANUAL_SMOKE_GENERATION_RATES.outputMicroUsdPerMillion / 1000000);
}
// Preparation arithmetic only, no economic authority or operational issuer.
// The SAME ledger handles the two independently reviewed per-stage amounts.
export function createManualSmokePreparationBudget(input: { readonly countMaximumMicroUsd: number;
  readonly generationMaximumMicroUsd: number; readonly maxBatchMicroUsd: number }): OfflineInferenceBudget {
  const d = inferenceRecord(input, ['countMaximumMicroUsd', 'generationMaximumMicroUsd', 'maxBatchMicroUsd']);
  const count = amount(d['countMaximumMicroUsd']), generation = amount(d['generationMaximumMicroUsd']);
  if (generation !== manualSmokeGenerationMaximumMicroUsd()) inferenceFail('BUDGET_INVALID');
  const budget = createOfflineInferenceBudget({ maxAttemptMicroUsd: Math.max(count, generation),
    maxBatchMicroUsd: amount(d['maxBatchMicroUsd']), maxAttempts: 2 });
  const s = state(budget); s.stageReserves = Object.freeze([count, generation]); s.preparationOnly = true;
  return budget;
}
// Internal host bridges; reservation objects carry private one-shot provenance.
export function reserveOfflineInference(budget: OfflineInferenceBudget): object {
  const s = state(budget), reserved = s.stageReserves ? s.stageReserves[s.attempts] : offlineInferenceReservationMicroUsd();
  if (s.active) inferenceFail('CONCURRENCY_EXCEEDED');
  if (s.attempts >= s.maxAttempts || reserved === undefined || reserved > s.maxAttemptMicroUsd || reserved > s.maxBatchMicroUsd - s.allocatedMicroUsd) inferenceFail('BUDGET_EXHAUSTED');
  s.attempts++; s.active++; s.allocatedMicroUsd += reserved;
  const token = Object.freeze({}); reservations.set(token, { budget: s, reserved, settled: false }); return token;
}
export function settleOfflineInference(token: object, usage?: Readonly<{ inputTokens: number; outputTokens: number; cacheWriteInputTokens?: number }>): void {
  const r = reservations.get(token); if (!r || r.settled) inferenceFail('BUDGET_INVALID');
  r.settled = true; r.budget.active--;
  // Never refund allocated capacity from untrusted provider usage, even a claimed zero.
  if (!usage) { r.budget.uncertainMicroUsd += r.reserved; return; }
  let input: number, output: number, writes: number;
  try {
    const data = normalizeFixerData(usage);
    const hasWrites = !!data && typeof data === 'object' && Object.hasOwn(data, 'cacheWriteInputTokens');
    const d = inferenceRecord(data, ['inputTokens', 'outputTokens', ...(hasWrites ? ['cacheWriteInputTokens'] : [])]);
    input = amount(d['inputTokens']); output = amount(d['outputTokens']);
    writes = hasWrites ? amount(d['cacheWriteInputTokens']) : 0;
  } catch { r.budget.uncertainMicroUsd += r.reserved; inferenceFail('BUDGET_USAGE_EXCEEDED'); }
  if (input > INFERENCE_PROFILE.proposedMaxInputTokens || output > INFERENCE_PROFILE.maxOutputTokens || writes > input) {
    r.budget.uncertainMicroUsd += r.reserved; inferenceFail('BUDGET_USAGE_EXCEEDED');
  }
  // Cached reads get no assumed discount. Cache writes use the conservative rate;
  // round the combined input charge once so known usage cannot exceed the reserve.
  const rates = r.budget.preparationOnly ? MANUAL_SMOKE_GENERATION_RATES : OFFLINE_RATE_CARD;
  const known = Math.ceil(((input - writes) * rates.inputMicroUsdPerMillion
    + writes * rates.reservedInputMicroUsdPerMillion) / 1000000)
    + Math.ceil(output * rates.outputMicroUsdPerMillion / 1000000);
  if (known > r.reserved) { r.budget.uncertainMicroUsd += r.reserved; inferenceFail('BUDGET_USAGE_EXCEEDED'); }
  r.budget.knownMicroUsd += known;
}
