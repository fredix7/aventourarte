import type { FixRequest } from './fixer-contracts';
import type { StaticData } from './static-data';

// Broker stays offline. The dormant native manual port consumes private permits;
// no operational issuer exists, and public data never authorizes its invocation.
export const INFERENCE_PROFILE = Object.freeze({ version: 'openai-responses-offline-v1',
  provider: 'openai', endpoint: 'https://api.openai.com/v1/responses', method: 'POST', model: 'gpt-6-luna',
  maxOutputTokens: 4096, proposedMaxInputTokens: 16000, maxConcurrency: 1,
  inputTokenEvidence: 'PENDING_NO_VERIFIED_TOKENIZER', networkEnabled: false,
  retries: 0, fallback: false, credentialAccess: false, operational: false } as const);
export const INFERENCE_ERROR_CODES = ['INFERENCE_INPUT_INVALID', 'PROJECTION_INVALID', 'PROJECTION_INACTIVE',
  'SCHEMA_UNREPRESENTABLE', 'PROVIDER_RESPONSE_INVALID', 'PROVIDER_INCOMPLETE', 'PROVIDER_REFUSAL',
  'PROVIDER_TOOL_FORBIDDEN', 'PROVIDER_HTTP_ERROR', 'BUDGET_INVALID', 'BUDGET_EXHAUSTED',
  'BUDGET_USAGE_EXCEEDED', 'CONCURRENCY_EXCEEDED', 'INFERENCE_CANCELLED', 'HTTP_RESPONSE_INVALID',
  'HTTP_HEADER_LIMIT', 'HTTP_BODY_LIMIT', 'HTTP_CONTENT_TYPE_INVALID', 'HTTP_REDIRECT_FORBIDDEN',
  'HTTP_BAD_REQUEST', 'HTTP_UNAUTHORIZED', 'HTTP_FORBIDDEN', 'HTTP_TIMEOUT', 'HTTP_RATE_LIMIT',
  'HTTP_SERVER_ERROR', 'TOKEN_COUNT_INVALID', 'TOKEN_LIMIT_EXCEEDED', 'TOKEN_BINDING_INVALID',
  'HTTPS_DNS_FAILED', 'HTTPS_ADDRESS_FORBIDDEN', 'HTTPS_TLS_INVALID', 'HTTPS_HOSTNAME_INVALID',
  'HTTPS_CONNECTION_FAILED', 'HTTPS_UNEXPECTED_CLOSE', 'HTTPS_EVENT_INVALID', 'HTTPS_SECRET_ECHO',
  'BOOTSTRAP_INVALID', 'BOOTSTRAP_FAILED', 'BOOTSTRAP_RUNTIME_UNVERIFIED', 'PREFLIGHT_INVALID',
  'PREFLIGHT_INACTIVE', 'PREFLIGHT_REQUIREMENT_UNVERIFIED'] as const;
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
    scope: Readonly<{ provider: 'openai'; endpoint: typeof INFERENCE_PROFILE.endpoint;
      countEndpoint: 'https://api.openai.com/v1/responses/input_tokens';
      dedicatedApiProject: true; purpose: 'RESPONSES_AND_INPUT_TOKENS' }>): Promise<string>;
}
// DESIGN ONLY. No issuer or runtime constructor exists for any of these grants.
// Visible IDs, amounts and a laboratory receipt must never confer their provenance.
// Future issuance must live in host-internal, non-exported identity registries:
// A follows approved host/worker bootstrap + explicit fixed-provider connectivity;
// B follows project-scoped key/access verification and creates an opaque handle;
// C follows an atomic durable reservation covering count AND generation, including
// uncertain spend. Each independent authority can revoke/expire its own grant.
// The private native gate must join and consume all three once BEFORE asynchronous
// I/O, with exact request/frames/project/worker/session/expiry/reservation bindings.
// Replay, mismatched bindings, failed IPC authentication, revoked/expired grants,
// unknown ledger state and partial joins must reject without any network call.
// A future IPC message carries bounded authenticated data, never a JSON-minted
// capability. Test instrumentation cannot be shipped as an issuer or bypass.
declare const connectivityGrantBrand: unique symbol;
declare const projectGrantBrand: unique symbol;
declare const economicGrantBrand: unique symbol;
export interface FutureConnectivityGrant { readonly [connectivityGrantBrand]: true }
export interface FutureProjectCredentialGrant { readonly [projectGrantBrand]: true }
export interface FutureEconomicGrant { readonly [economicGrantBrand]: true }
export interface FutureSeparatedActivationAuthority {
  readonly connectivity: FutureConnectivityGrant;
  readonly projectCredential: FutureProjectCredentialGrant;
  readonly economic: FutureEconomicGrant;
  readonly credentialHandle: FutureHostCredentialHandle;
  // Host metadata only: private issuance must bind all three to the authentic
  // request, exact frame pair, worker identity, project, expiry and durable reservation.
  readonly requestFingerprint: string;
  readonly bindingDigest: string;
}
// Future host-only delivery: an authenticated private IPC channel resolves the
// opaque handle only after independent A/B/C checks and durable reservation.
// The existing resolver above is intentionally unimplemented. Bearer bytes belong
// only to the privileged transport, never the model, request/plan, argv, env,
// diagnostics or TEMP. No JSON message can introduce a handle or mint a grant.
export const FUTURE_CREDENTIAL_DELIVERY_POLICY = Object.freeze({ implemented: false,
  owner: 'TRUSTED_HOST_DEDICATED_API_PROJECT', resolver: 'FutureHostCredentialSource',
  delivery: 'AUTHENTICATED_PRIVATE_IPC_AFTER_A_B_C_AND_DURABLE_RESERVATION',
  secretConsumer: 'PRIVILEGED_FIXED_PROVIDER_TRANSPORT_ONLY', persistentStorage: 'ABSENT',
  processEnvironmentDelivery: false, commandLineDelivery: false, modelAccess: false } as const);
