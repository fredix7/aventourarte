import type { FixRequest } from './fixer-contracts';
import type { StaticData } from './static-data';

// Descriptive HTTP contract only: Phase 9D has no executable networking implementation.
export const INFERENCE_PROFILE = Object.freeze({ version: 'openai-responses-offline-v1',
  provider: 'openai', endpoint: 'https://api.openai.com/v1/responses', method: 'POST', model: 'gpt-6-luna',
  maxOutputTokens: 4096, proposedMaxInputTokens: 16000, maxConcurrency: 1,
  inputTokenEvidence: 'PENDING_NO_VERIFIED_TOKENIZER', networkEnabled: false,
  retries: 0, fallback: false, credentialAccess: false, operational: false } as const);
export const INFERENCE_ERROR_CODES = ['INFERENCE_INPUT_INVALID', 'PROJECTION_INVALID', 'PROJECTION_INACTIVE',
  'SCHEMA_UNREPRESENTABLE', 'PROVIDER_RESPONSE_INVALID', 'PROVIDER_INCOMPLETE', 'PROVIDER_REFUSAL',
  'PROVIDER_TOOL_FORBIDDEN', 'PROVIDER_HTTP_ERROR', 'BUDGET_INVALID', 'BUDGET_EXHAUSTED',
  'BUDGET_USAGE_EXCEEDED', 'CONCURRENCY_EXCEEDED', 'INFERENCE_CANCELLED'] as const;
export type InferenceErrorCode = typeof INFERENCE_ERROR_CODES[number];
export class InferenceError extends Error {
  constructor(readonly code: InferenceErrorCode) { super(`Factory inference: ${code}.`); }
}
export function inferenceFail(code: InferenceErrorCode): never { throw new InferenceError(code); }
declare const projectionBrand: unique symbol;
export interface OfflineInferenceProjection {
  readonly [projectionBrand]: true;
  readonly kind: 'OFFLINE_RESPONSES_PROJECTION'; readonly endpoint: typeof INFERENCE_PROFILE.endpoint;
  readonly method: 'POST'; readonly body: StaticData; readonly serializedBody: string;
}
declare const transportBrand: unique symbol;
export interface OfflineResponsesTransport { readonly [transportBrand]: true; readonly kind: 'OFFLINE_RESPONSES_ONLY' }
export interface OfflineProviderReply { readonly status: number; readonly body: string; readonly delayMs: number }
export interface OfflineProjectionInput { readonly request: FixRequest }
// Future host-only interface DESIGN. No implementation, secret store, credential resolver,
// header builder or runtime accepts this interface in Phase 9D. Never part of FixRequest.
declare const credentialBrand: unique symbol;
export interface FutureHostCredentialHandle { readonly [credentialBrand]: true }
export interface FutureHostCredentialSource {
  resolveBearerForFixedProvider(handle: FutureHostCredentialHandle,
    scope: Readonly<{ provider: 'openai'; endpoint: typeof INFERENCE_PROFILE.endpoint }>): Promise<string>;
}
