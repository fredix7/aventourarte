import { inferenceFail, INFERENCE_PROFILE } from './inference-contracts';
import { inferenceRecord } from './inference-data';

// Integer micro-USD. Snapshot is a simulation estimate, NOT a billing quote or permission
// to spend. Use the higher cache-write input rate conservatively for every reservation.
export const OFFLINE_RATE_CARD = Object.freeze({ version: '9c-2026-10-16-standard-short-v1',
  model: INFERENCE_PROFILE.model, inputMicroUsdPerMillion: 100000,
  reservedInputMicroUsdPerMillion: 125000, outputMicroUsdPerMillion: 500000,
  verifiedForBilling: false, currency: 'USD' } as const);
declare const budgetBrand: unique symbol;
export interface OfflineInferenceBudget { readonly [budgetBrand]: true; readonly kind: 'OFFLINE_BUDGET_ONLY' }
interface BudgetState { maxAttemptMicroUsd: number; maxBatchMicroUsd: number; maxAttempts: number;
  attempts: number; active: number; allocatedMicroUsd: number; knownMicroUsd: number; uncertainMicroUsd: number }
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
  return Object.freeze({ ...state(budget), rateVersion: OFFLINE_RATE_CARD.version, model: OFFLINE_RATE_CARD.model,
    accounting: 'SIMULATED_NOT_BILLING' as const, realMoneyReserved: false, networkAuthorized: false });
}
// Internal host bridges; reservation objects carry private one-shot provenance.
export function reserveOfflineInference(budget: OfflineInferenceBudget): object {
  const s = state(budget);
  const reserved = Math.ceil(INFERENCE_PROFILE.proposedMaxInputTokens * OFFLINE_RATE_CARD.reservedInputMicroUsdPerMillion / 1000000)
    + Math.ceil(INFERENCE_PROFILE.maxOutputTokens * OFFLINE_RATE_CARD.outputMicroUsdPerMillion / 1000000);
  if (s.active) inferenceFail('CONCURRENCY_EXCEEDED');
  if (s.attempts >= s.maxAttempts || reserved > s.maxAttemptMicroUsd || reserved > s.maxBatchMicroUsd - s.allocatedMicroUsd) inferenceFail('BUDGET_EXHAUSTED');
  s.attempts++; s.active++; s.allocatedMicroUsd += reserved;
  const token = Object.freeze({}); reservations.set(token, { budget: s, reserved, settled: false }); return token;
}
export function settleOfflineInference(token: object, usage?: Readonly<{ inputTokens: number; outputTokens: number }>): void {
  const r = reservations.get(token); if (!r || r.settled) inferenceFail('BUDGET_INVALID');
  r.settled = true; r.budget.active--;
  // Never refund allocated capacity from untrusted provider usage, even a claimed zero.
  if (!usage) { r.budget.uncertainMicroUsd += r.reserved; return; }
  let input: number, output: number;
  try {
    const d = inferenceRecord(usage, ['inputTokens', 'outputTokens']);
    input = amount(d['inputTokens']); output = amount(d['outputTokens']);
  } catch { r.budget.uncertainMicroUsd += r.reserved; inferenceFail('BUDGET_USAGE_EXCEEDED'); }
  if (input > INFERENCE_PROFILE.proposedMaxInputTokens || output > INFERENCE_PROFILE.maxOutputTokens) {
    r.budget.uncertainMicroUsd += r.reserved; inferenceFail('BUDGET_USAGE_EXCEEDED');
  }
  r.budget.knownMicroUsd += Math.ceil(input * OFFLINE_RATE_CARD.inputMicroUsdPerMillion / 1000000)
    + Math.ceil(output * OFFLINE_RATE_CARD.outputMicroUsdPerMillion / 1000000);
}
