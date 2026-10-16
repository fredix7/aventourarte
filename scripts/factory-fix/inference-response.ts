import { FIXER_LIMITS } from './fixer-contracts';
import { decodeProviderEnvelopeJson } from './fixer-json';
import { INFERENCE_PROFILE, inferenceFail } from './inference-contracts';
import { inferenceEnvelope, inferenceRecord } from './inference-data';
import type { OfflineProviderReply } from './inference-contracts';

// A deliberately narrow, versioned Responses envelope. Additional provider fields must
// be reviewed explicitly; no output concatenation, tool dispatch or SDK JSON helpers.
export function decodeOfflineResponsesReply(reply: OfflineProviderReply): Readonly<{
  text: string; usage: Readonly<{ inputTokens: number; outputTokens: number; cacheWriteInputTokens?: number }>
}> {
  const envelope = inferenceEnvelope(reply, ['status', 'body', 'delayMs']);
  if (typeof envelope['status'] !== 'number' || typeof envelope['body'] !== 'string') inferenceFail('PROVIDER_RESPONSE_INVALID');
  reply = { status: envelope['status'], body: envelope['body'], delayMs: 0 };
  if (reply.status !== 200) inferenceFail('PROVIDER_HTTP_ERROR');
  const raw = decodeProviderEnvelopeJson(reply.body);
  const required = ['id', 'object', 'created_at', 'status', 'error', 'incomplete_details',
    'model', 'output', 'usage', 'tools', 'tool_choice', 'store', 'background'];
  const optional = ['completed_at', 'instructions', 'max_output_tokens', 'max_tool_calls', 'parallel_tool_calls',
    'previous_response_id', 'reasoning', 'service_tier', 'temperature', 'text', 'top_p', 'truncation',
    'user', 'metadata', 'prompt_cache_key', 'prompt_cache_retention', 'safety_identifier', 'top_logprobs', 'access_programs'];
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) inferenceFail('PROVIDER_RESPONSE_INVALID');
  const present = Object.keys(raw);
  if (present.some(k => !required.includes(k) && !optional.includes(k))) inferenceFail('PROVIDER_RESPONSE_INVALID');
  const d = inferenceRecord(raw, [...required, ...optional.filter(k => present.includes(k))]);
  for (const key of ['previous_response_id', 'max_tool_calls', 'user', 'prompt_cache_key', 'safety_identifier', 'access_programs']) {
    if (Object.hasOwn(d, key) && d[key] !== null) inferenceFail('PROVIDER_RESPONSE_INVALID');
  }
  if (Object.hasOwn(d, 'max_output_tokens') && d['max_output_tokens'] !== INFERENCE_PROFILE.maxOutputTokens
    || Object.hasOwn(d, 'parallel_tool_calls') && d['parallel_tool_calls'] !== false
    || Object.hasOwn(d, 'service_tier') && d['service_tier'] !== 'default'
    || Object.hasOwn(d, 'truncation') && d['truncation'] !== 'disabled') inferenceFail('PROVIDER_RESPONSE_INVALID');
  if (Object.hasOwn(d, 'metadata')) inferenceRecord(d['metadata'], []);
  if (Object.hasOwn(d, 'reasoning')) {
    const r = inferenceRecord(d['reasoning'], ['effort', 'summary']);
    if (r['effort'] !== 'none' || r['summary'] !== null) inferenceFail('PROVIDER_RESPONSE_INVALID');
  }
  for (const key of ['instructions', 'prompt_cache_retention', 'truncation']) {
    if (Object.hasOwn(d, key) && d[key] !== null && typeof d[key] !== 'string') inferenceFail('PROVIDER_RESPONSE_INVALID');
  }
  for (const key of ['completed_at', 'temperature', 'top_p', 'top_logprobs']) {
    if (Object.hasOwn(d, key) && d[key] !== null && typeof d[key] !== 'number') inferenceFail('PROVIDER_RESPONSE_INVALID');
  }
  // Echoed text.format is metadata, never a replacement for the host-owned schema.
  if (Object.hasOwn(d, 'text')) {
    const t = inferenceRecord(d['text'], ['format', 'verbosity']);
    if (t['verbosity'] !== 'low' && t['verbosity'] !== 'medium' && t['verbosity'] !== 'high') inferenceFail('PROVIDER_RESPONSE_INVALID');
    const f = inferenceRecord(t['format'], ['type', 'name', 'strict', 'schema']);
    if (f['type'] !== 'json_schema' || f['name'] !== 'factory_fix_plan_v1' || f['strict'] !== true
      || !f['schema'] || typeof f['schema'] !== 'object' || Array.isArray(f['schema'])) inferenceFail('PROVIDER_RESPONSE_INVALID');
  }
  if (typeof d['id'] !== 'string' || !/^resp_[a-zA-Z0-9_-]{1,128}$/.test(d['id'])
    || d['object'] !== 'response' || !Number.isSafeInteger(d['created_at']) || (d['created_at'] as number) < 0
    || d['model'] !== INFERENCE_PROFILE.model || d['error'] !== null
    || d['store'] !== false || d['background'] !== false) inferenceFail('PROVIDER_RESPONSE_INVALID');
  if (d['status'] !== 'completed' || d['incomplete_details'] !== null) inferenceFail('PROVIDER_INCOMPLETE');
  if (!Array.isArray(d['tools']) || d['tools'].length || d['tool_choice'] !== 'none') inferenceFail('PROVIDER_TOOL_FORBIDDEN');
  const outputs = d['output'];
  if (!Array.isArray(outputs)) inferenceFail('PROVIDER_RESPONSE_INVALID');
  // Reject tools/refusals anywhere, including hidden extra output beside valid text.
  for (const item of outputs) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) inferenceFail('PROVIDER_RESPONSE_INVALID');
    const type = (item as Record<string, unknown>)['type'];
    if (type !== 'message') inferenceFail('PROVIDER_TOOL_FORBIDDEN');
    const content = (item as Record<string, unknown>)['content'];
    if (Array.isArray(content) && content.some(c => c && typeof c === 'object' && c['type'] === 'refusal')) inferenceFail('PROVIDER_REFUSAL');
  }
  if (outputs.length !== 1) inferenceFail('PROVIDER_RESPONSE_INVALID');
  const message = inferenceRecord(outputs[0], ['id', 'type', 'role', 'status', 'content']);
  if (typeof message['id'] !== 'string' || !/^msg_[a-zA-Z0-9_-]{1,128}$/.test(message['id'])
    || message['type'] !== 'message' || message['role'] !== 'assistant' || message['status'] !== 'completed'
    || !Array.isArray(message['content']) || message['content'].length !== 1) inferenceFail('PROVIDER_RESPONSE_INVALID');
  const text = inferenceRecord(message['content'][0], ['type', 'text', 'annotations', 'logprobs']);
  if (text['type'] !== 'output_text' || typeof text['text'] !== 'string'
    || !Array.isArray(text['annotations']) || text['annotations'].length
    || !Array.isArray(text['logprobs']) || text['logprobs'].length) inferenceFail('PROVIDER_RESPONSE_INVALID');
  if (Buffer.byteLength(text['text'], 'utf8') > FIXER_LIMITS.maxResponseBytes) inferenceFail('PROVIDER_RESPONSE_INVALID');
  const usage = inferenceRecord(d['usage'], ['input_tokens', 'output_tokens', 'total_tokens',
    'input_tokens_details', 'output_tokens_details']);
  const input = usage['input_tokens'], output = usage['output_tokens'];
  if (!Number.isSafeInteger(input) || (input as number) < 0 || !Number.isSafeInteger(output) || (output as number) < 0
    || usage['total_tokens'] !== (input as number) + (output as number)) inferenceFail('PROVIDER_RESPONSE_INVALID');
  const details = usage['input_tokens_details'];
  const hasWrites = !!details && typeof details === 'object' && !Array.isArray(details) && Object.hasOwn(details, 'cache_write_tokens');
  const inputDetails = inferenceRecord(details, ['cached_tokens', ...(hasWrites ? ['cache_write_tokens'] : [])]);
  const cached = inputDetails['cached_tokens'], writes = hasWrites ? inputDetails['cache_write_tokens'] : 0;
  const reasoning = inferenceRecord(usage['output_tokens_details'], ['reasoning_tokens'])['reasoning_tokens'];
  if (!Number.isSafeInteger(cached) || (cached as number) < 0 || (cached as number) > (input as number)
    || !Number.isSafeInteger(writes) || (writes as number) < 0 || (writes as number) > (input as number) - (cached as number)
    || !Number.isSafeInteger(reasoning) || (reasoning as number) < 0 || (reasoning as number) > (output as number)) inferenceFail('PROVIDER_RESPONSE_INVALID');
  return Object.freeze({ text: text['text'], usage: Object.freeze({ inputTokens: input as number, outputTokens: output as number,
    ...(hasWrites ? { cacheWriteInputTokens: writes as number } : {}) }) });
}
