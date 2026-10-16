import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fixture, hostInput, planFor, refAt, update, compiled, projectRoot } from './inference-fixtures.mjs';

const require = createRequire(import.meta.url), ts = require('typescript');
const broker = compiled('inference-broker'), http = compiled('inference-http'), budgets = compiled('inference-budget');
const launcher = compiled('fixer-launcher'), { serializeFixerData } = compiled('fixer-json');
const { listChildTargets } = compiled('target-locator');
let privilegedCalls = 0;
const forbidden = () => { privilegedCalls++; throw Error('FORBIDDEN_CAPABILITY'); };
for (const [module, names] of [['node:http', ['request', 'get']], ['node:https', ['request', 'get']],
  ['node:http2', ['connect']], ['node:net', ['connect', 'createConnection']], ['node:tls', ['connect']],
  ['node:dns', ['lookup', 'resolve']], ['node:child_process', ['spawn', 'spawnSync', 'exec', 'execSync', 'execFile', 'execFileSync']]]) {
  const api = require(module); for (const name of names) api[name] = forbidden;
}
globalThis.fetch = forbidden; globalThis.WebSocket = forbidden;
for (const [module, name] of [['writer', 'persistPreparedFix'], ['write-readiness', 'inspectWriteReadiness'], ['source-lock', 'acquireSourceLock']]) compiled(module)[name] = forbidden;
after(() => assert.equal(privilegedCalls, 0));
const sim = (name, run) => test('Phase 9E: ' + name, () => fixture(run));
const budget = overrides => budgets.createOfflineInferenceBudget({ maxAttemptMicroUsd: 4048, maxBatchMicroUsd: 4048, maxAttempts: 1, ...overrides });
function response(request, text = serializeFixerData(planFor(request))) {
  return { id: 'resp_9e', object: 'response', created_at: 1792108800, status: 'completed', error: null, incomplete_details: null,
    model: 'gpt-6-luna', store: false, background: false, tools: [], tool_choice: 'none', access_programs: null,
    output: [{ id: 'msg_9e', type: 'message', role: 'assistant', status: 'completed', content: [{ type: 'output_text', text, annotations: [], logprobs: [] }] }],
    usage: { input_tokens: 8000, output_tokens: 2000, total_tokens: 10000,
      input_tokens_details: { cached_tokens: 0, cache_write_tokens: 0 }, output_tokens_details: { reasoning_tokens: 0 } } };
}
function reply(text, overrides = {}) {
  const data = Buffer.from(text, 'utf8'), chunks = [];
  for (let at = 0; at < data.length; at += 65536) chunks.push({ bytes: [...data.subarray(at, at + 65536)], delayMs: 0 });
  return { status: 200, headers: [{ name: 'Content-Type', value: 'application/json; charset=utf-8' },
    { name: 'Content-Length', value: String(data.length) }], chunks, ...overrides };
}
const countReply = tokens => reply(JSON.stringify({ object: 'response.input_tokens', input_tokens: tokens }));
function setup(ctx, options = {}) {
  const request = options.request ?? launcher.createFixRequest(hostInput(ctx.snapshot, options.ops, { timeoutMs: 5000, ...options.host }));
  const projection = options.projection ?? broker.createOfflineInferenceProjection({ request });
  const b = options.budget ?? budget();
  const transport = broker.createOfflineHttpsTransport({ projection, countReply: options.count ?? countReply(8000),
    responseReply: options.response ?? reply(JSON.stringify(response(request))) });
  return { request, projection, transport, budget: b, run: () => broker.runOfflineHttpsInference({ projection, transport, budget: b }) };
}
const blocked = (r, code, status = 'BLOCKED') => { assert.equal(r.status, status, JSON.stringify(r)); assert.equal(r.code, code); assert.doesNotMatch(JSON.stringify(r), /FAKE_SECRET|SYNTHETIC_FACTORY|Authorization|Bearer/); };
const rejects = (fn, code) => assert.throws(fn, e => e.code === code);

sim('fixed HTTPS frames bind all input-affecting fields and exact UTF8 bytes without public Authorization', ctx => {
  const x = setup(ctx), frames = broker.inspectOfflineHttpRequests(x.projection);
  const generation = JSON.parse(frames.inference.body), counted = JSON.parse(frames.count.body);
  assert.equal(frames.inference.body, x.projection.serializedBody);
  assert.deepEqual(Object.keys(counted).sort(), ['model', 'input', 'instructions', 'parallel_tool_calls', 'reasoning', 'text', 'tools', 'tool_choice', 'truncation'].sort());
  for (const key of Object.keys(counted)) assert.deepEqual(counted[key], generation[key]);
  for (const frame of [frames.count, frames.inference]) {
    assert.equal(frame.protocol, 'https:'); assert.equal(frame.hostname, 'api.openai.com'); assert.equal(frame.port, 443); assert.equal(frame.method, 'POST');
    assert.equal(frame.bodyBytes, Buffer.byteLength(frame.body, 'utf8')); assert.equal(frame.headers['content-length'], String(frame.bodyBytes));
    assert.equal(Object.isFrozen(frame), true); assert.equal(Object.hasOwn(frame.headers, 'authorization'), false);
  }
  assert.equal(frames.count.path, '/v1/responses/input_tokens'); assert.equal(frames.inference.path, '/v1/responses');
  assert.equal(http.OFFLINE_HTTPS_POLICY.networkImplementation, 'ABSENT'); assert.equal(http.OFFLINE_HTTPS_POLICY.realTlsDnsSocketsVerified, false);
  assert.equal(http.OFFLINE_HTTPS_POLICY.countEndpointBillingVerified, false);
  assert.equal(broker.getOfflineInferencePolicy().networkEnabled, false); assert.equal(launcher.getFixerRuntimeStatus().code, 'RUNTIME_NOT_ISOLATED');
});
for (const [name, op] of [
  ['UPDATE_VALUE', s => update(s)],
  ['ADD_PROPERTY', s => ({ type: 'ADD_PROPERTY', parentRef: refAt(s, 'empty'), propertyName: 'nota', value: 'Texto ñ 😀', placement: { mode: 'auto' } })],
  ['ADD_ELEMENT', s => ({ type: 'ADD_ELEMENT', parentRef: refAt(s, 'values'), value: { nombre: 'C', descripcion: 'Tercero' }, placement: { mode: 'append' } })],
  ['REMOVE_PROPERTY', s => ({ type: 'REMOVE_PROPERTY', targetRef: refAt(s, 'info', 'count') })],
  ['REMOVE_ELEMENT', s => ({ type: 'REMOVE_ELEMENT', targetRef: refAt(s, 'values', 1) })],
  ['REORDER_ELEMENTS', s => ({ type: 'REORDER_ELEMENTS', parentRef: refAt(s, 'values'), order: [...listChildTargets({ snapshot: s, parentRef: refAt(s, 'values') })].reverse() })]
]) sim(`E2E ${name}: count -> reserve -> simulated HTTPS -> private handoff -> memory candidate`, async ctx => {
  const before = readFileSync(ctx.sourceFile), x = setup(ctx, { ops: [op(ctx.snapshot)] });
  const result = await x.run(); assert.equal(result.status, 'PROPOSAL_VALID', JSON.stringify(result));
  assert.equal(launcher.isHostFixerHandoff(result.handoff), true);
  const prepared = launcher.prepareFixerHandoff({ request: x.request, handoff: result.handoff });
  assert.equal(prepared.status, 'PREPARED'); assert.equal(prepared.preparedResult.diagnostics.persistence, 'NOT_ATTEMPTED');
  assert.equal(compiled('prepared-result').isHostPreparedFixResult(prepared.preparedResult), true);
  assert.deepEqual(readFileSync(ctx.sourceFile), before);
  const state = budgets.inspectOfflineInferenceBudget(x.budget);
  assert.equal(state.attempts, 1); assert.equal(state.allocatedMicroUsd, 4048); assert.equal(state.knownMicroUsd, 1800);
  blocked(await x.run(), 'PROJECTION_INACTIVE');
});
for (const field of ['url', 'host', 'endpoint', 'proxy', 'headers', 'credential', 'offline', 'model', 'rejectUnauthorized', 'fetch', 'inputTokens',
  'path', 'port', 'protocol', 'lookup', 'agent', 'socket', 'ca', 'redirect', 'retry', 'fallback', 'conversation']) {
  sim(`caller cannot configure ${field}`, ctx => {
    const r = launcher.createFixRequest(hostInput(ctx.snapshot)), projection = broker.createOfflineInferenceProjection({ request: r });
    rejects(() => broker.createOfflineHttpsTransport({ projection, countReply: countReply(8000), responseReply: reply(JSON.stringify(response(r))), [field]: 'FAKE_SECRET' }), 'INFERENCE_INPUT_INVALID');
  });
}
for (const [name, text, code] of [
  ['zero', '{"object":"response.input_tokens","input_tokens":0}', 'TOKEN_COUNT_INVALID'],
  ['negative zero', '{"object":"response.input_tokens","input_tokens":-0}', 'TOKEN_COUNT_INVALID'],
  ['negative', '{"object":"response.input_tokens","input_tokens":-1}', 'TOKEN_COUNT_INVALID'],
  ['fraction', '{"object":"response.input_tokens","input_tokens":1.5}', 'TOKEN_COUNT_INVALID'],
  ['string', '{"object":"response.input_tokens","input_tokens":"8000"}', 'TOKEN_COUNT_INVALID'],
  ['null', '{"object":"response.input_tokens","input_tokens":null}', 'TOKEN_COUNT_INVALID'],
  ['oversize', '{"object":"response.input_tokens","input_tokens":16001}', 'TOKEN_LIMIT_EXCEEDED'],
  ['precision', '{"object":"response.input_tokens","input_tokens":9007199254740993}', 'JSON_MALFORMED'],
  ['overflow', '{"object":"response.input_tokens","input_tokens":1e999}', 'JSON_MALFORMED'],
  ['duplicate', '{"object":"response.input_tokens","input_tokens":1,"input_tokens":8000}', 'JSON_MALFORMED'],
  ['truncated', '{"object":', 'JSON_MALFORMED'],
  ['unknown', '{"object":"response.input_tokens","input_tokens":8000,"model":"fake"}', 'INFERENCE_INPUT_INVALID'],
  ['wrong object', '{"object":"response","input_tokens":8000}', 'TOKEN_COUNT_INVALID']
]) sim(`count rejects ${name} before inference reservation`, async ctx => {
  const x = setup(ctx, { count: reply(text) }); blocked(await x.run(), code);
  assert.equal(budgets.inspectOfflineInferenceBudget(x.budget).attempts, 0);
});
for (const [status, code] of [[400, 'HTTP_BAD_REQUEST'], [401, 'HTTP_UNAUTHORIZED'], [403, 'HTTP_FORBIDDEN'], [408, 'HTTP_TIMEOUT'],
  [429, 'HTTP_RATE_LIMIT'], [500, 'HTTP_SERVER_ERROR'], [502, 'HTTP_SERVER_ERROR'], [503, 'HTTP_SERVER_ERROR'],
  [301, 'HTTP_REDIRECT_FORBIDDEN'], [302, 'HTTP_REDIRECT_FORBIDDEN'], [307, 'HTTP_REDIRECT_FORBIDDEN'], [308, 'HTTP_REDIRECT_FORBIDDEN']]) {
  for (const stage of ['count', 'response']) sim(`${stage} HTTP ${status}: sanitized, one attempt, no redirects or fallback`, async ctx => {
    const x = setup(ctx, { [stage]: reply('FAKE_SECRET Authorization: Bearer SYNTHETIC_FACTORY_9E_NOT_A_KEY',
      { status, headers: [{ name: 'Location', value: 'http://127.0.0.1/secret' }, { name: 'Authorization', value: 'Bearer FAKE_SECRET' }] }) });
    blocked(await x.run(), code); const s = budgets.inspectOfflineInferenceBudget(x.budget);
    assert.equal(s.attempts, stage === 'count' ? 0 : 1); assert.equal(s.uncertainMicroUsd, stage === 'count' ? 0 : 4048);
    blocked(await x.run(), 'PROJECTION_INACTIVE');
  });
}
for (const [name, mutate, code] of [
  ['empty body', r => { r.chunks = []; r.headers.pop(); }, 'HTTP_RESPONSE_INVALID'],
  ['wrong content type', r => { r.headers[0].value = 'text/html'; }, 'HTTP_CONTENT_TYPE_INVALID'],
  ['missing content type', r => { r.headers.shift(); }, 'HTTP_CONTENT_TYPE_INVALID'],
  ['wrong content length', r => { r.headers[1].value = '1'; }, 'HTTP_RESPONSE_INVALID'],
  ['gzip', r => { r.headers.push({ name: 'Content-Encoding', value: 'gzip' }); }, 'HTTP_RESPONSE_INVALID'],
  ['ambiguous framing', r => { r.headers.push({ name: 'Transfer-Encoding', value: 'chunked' }); }, 'HTTP_RESPONSE_INVALID'],
  ['invalid UTF8', r => { r.chunks[0].bytes = [0xc3, 0x28]; r.headers.pop(); }, 'HTTP_RESPONSE_INVALID']
]) sim(`response rejects ${name}`, async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), r = reply(JSON.stringify(response(request))); mutate(r);
  const x = setup(ctx, { request, response: r }); blocked(await x.run(), code);
  assert.equal(budgets.inspectOfflineInferenceBudget(x.budget).uncertainMicroUsd, 4048);
});
for (const [name, mutate, code] of [
  ['duplicate case-insensitive header', r => r.headers.push({ name: 'CONTENT-TYPE', value: 'application/json' }), 'HTTP_RESPONSE_INVALID'],
  ['header injection', r => { r.headers[0].value = 'application/json\r\nAuthorization: FAKE_SECRET'; }, 'HTTP_RESPONSE_INVALID'],
  ['header bytes', r => { r.headers = Array.from({ length: 9 }, (_, i) => ({ name: 'x-' + i, value: 'x'.repeat(1024) })); }, 'HTTP_HEADER_LIMIT'],
  ['too many headers', r => { r.headers = Array.from({ length: 33 }, (_, i) => ({ name: 'x-' + i, value: 'x' })); }, 'HTTP_RESPONSE_INVALID'],
  ['chunk size', r => { r.chunks = [{ bytes: Array(65537).fill(65), delayMs: 0 }]; }, 'HTTP_RESPONSE_INVALID'],
  ['total body', r => { r.chunks = Array.from({ length: 9 }, () => ({ bytes: Array(65536).fill(65), delayMs: 0 })); }, 'HTTP_BODY_LIMIT'],
  ['chunk count', r => { r.chunks = Array.from({ length: 129 }, () => ({ bytes: [], delayMs: 0 })); }, 'HTTP_RESPONSE_INVALID'],
  ['non-byte', r => { r.chunks[0].bytes[0] = 256; }, 'HTTP_RESPONSE_INVALID']
]) sim(`resource/descriptor limits reject ${name} before copying an unbounded response`, ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), r = reply(JSON.stringify(response(request))); mutate(r);
  const projection = broker.createOfflineInferenceProjection({ request });
  rejects(() => broker.createOfflineHttpsTransport({ projection, countReply: countReply(8000), responseReply: r }), code);
});
sim('count body has its own 1 KiB storage cap', ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), projection = broker.createOfflineInferenceProjection({ request });
  rejects(() => broker.createOfflineHttpsTransport({ projection, countReply: reply(' '.repeat(1025)), responseReply: reply('{}') }), 'HTTP_BODY_LIMIT');
});
sim('UTF8 can split inside a multibyte codepoint across byte chunks', async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot, [update(ctx.snapshot, ['descripcion'], 'Útil 😀 ñ')]));
  const r = reply(JSON.stringify(response(request))), bytes = r.chunks[0].bytes;
  const at = bytes.findIndex(b => b === 0xf0) + 1; assert.ok(at > 0);
  r.chunks = [{ bytes: bytes.slice(0, at), delayMs: 0 }, { bytes: bytes.slice(at), delayMs: 0 }];
  assert.equal((await setup(ctx, { request, response: r }).run()).status, 'PROPOSAL_VALID');
});
for (const [name, mutate, expected] of [
  ['refusal', d => { d.output[0].content = [{ type: 'refusal', refusal: 'FAKE_SECRET' }]; }, 'PROVIDER_REFUSAL'],
  ['tool call', d => d.output.push({ type: 'function_call', name: 'writer' }), 'PROVIDER_TOOL_FORBIDDEN'],
  ['multiple output', d => d.output.push(d.output[0]), 'PROVIDER_RESPONSE_INVALID'],
  ['incomplete', d => { d.status = 'incomplete'; d.incomplete_details = { reason: 'max_output_tokens' }; }, 'PROVIDER_INCOMPLETE'],
  ['billing mismatch', d => { d.usage.input_tokens = 7999; d.usage.total_tokens--; }, 'TOKEN_COUNT_INVALID'],
  ['automatic truncation', d => { d.truncation = 'auto'; }, 'PROVIDER_RESPONSE_INVALID'],
  ['output overspend', d => { d.usage.output_tokens = 4097; d.usage.total_tokens = 12097; }, 'BUDGET_USAGE_EXCEEDED'],
  ['bad reasoning detail', d => { d.usage.output_tokens_details.reasoning_tokens = 2001; }, 'PROVIDER_RESPONSE_INVALID'],
  ['bad cache detail', d => { d.usage.input_tokens_details.cache_write_tokens = 8001; }, 'PROVIDER_RESPONSE_INVALID']
]) sim(`provider ${name} cannot become an authorized result`, async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), d = response(request); mutate(d);
  const x = setup(ctx, { request, response: reply(JSON.stringify(d)) }); blocked(await x.run(), expected);
  assert.equal(budgets.inspectOfflineInferenceBudget(x.budget).allocatedMicroUsd, 4048);
});
sim('cache-write and reasoning tokens are covered by reservation without double billing output', async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), d = response(request);
  d.usage.input_tokens_details.cache_write_tokens = 8000; d.usage.output_tokens_details.reasoning_tokens = 1000;
  const x = setup(ctx, { request, response: reply(JSON.stringify(d)) }); assert.equal((await x.run()).status, 'PROPOSAL_VALID');
  assert.equal(budgets.inspectOfflineInferenceBudget(x.budget).knownMicroUsd, 2000);
});
sim('claimed zero usage never refunds the reserved attempt', async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), d = response(request);
  d.usage.input_tokens = d.usage.output_tokens = d.usage.total_tokens = 0;
  const x = setup(ctx, { request, response: reply(JSON.stringify(d)) }); blocked(await x.run(), 'TOKEN_COUNT_INVALID');
  const b = budgets.inspectOfflineInferenceBudget(x.budget); assert.equal(b.allocatedMicroUsd, 4048); assert.equal(b.uncertainMicroUsd, 4048);
});
sim('upper token bounds, all cache writes, and integer rounding stay within the reserved amount', async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), d = response(request);
  d.usage.input_tokens = 16000; d.usage.output_tokens = 4096; d.usage.total_tokens = 20096;
  d.usage.input_tokens_details.cache_write_tokens = 16000; d.usage.output_tokens_details.reasoning_tokens = 4096;
  const x = setup(ctx, { request, count: countReply(16000), response: reply(JSON.stringify(d)) });
  assert.equal((await x.run()).status, 'PROPOSAL_VALID'); assert.equal(budgets.inspectOfflineInferenceBudget(x.budget).knownMicroUsd, 4048);
  const b = budget(), reservation = budgets.reserveOfflineInference(b);
  budgets.settleOfflineInference(reservation, { inputTokens: 2, outputTokens: 0, cacheWriteInputTokens: 1 });
  assert.equal(budgets.inspectOfflineInferenceBudget(b).knownMicroUsd, 1);
});
for (const [text, expected] of [['{', 'JSON_MALFORMED'], ['{"output":[],"output":[]}', 'JSON_MALFORMED'],
  ['{"created_at":9007199254740993}', 'JSON_MALFORMED']]) sim(`malformed HTTP response body remains rejected: ${text}`, async ctx => {
  blocked(await setup(ctx, { response: reply(text) }).run(), expected);
});
sim('malicious FixPlan cannot inject path, refs, placement or command capabilities through HTTPS data', async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), plan = planFor(request);
  plan.operations[0].placement = { mode: 'overwrite', path: '../../.env', shell: 'git push', value: 'FAKE_SECRET' };
  const x = setup(ctx, { request, response: reply(JSON.stringify(response(request, JSON.stringify(plan)))) });
  blocked(await x.run(), 'PLAN_INVALID', 'REJECTED'); assert.equal(privilegedCalls, 0);
});
sim('chunked HTTP framing is allowed only without a conflicting length', async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), r = reply(JSON.stringify(response(request)));
  r.headers.pop(); r.headers.push({ name: 'Transfer-Encoding', value: 'chunked' });
  assert.equal((await setup(ctx, { request, response: r }).run()).status, 'PROPOSAL_VALID');
});
sim('HTTP snapshot storage is discarded after consumption or explicit cleanup', async ctx => {
  const x = setup(ctx), frame = broker.inspectOfflineHttpRequests(x.projection).count;
  const token = http.snapshotOfflineHttpReply(countReply(8000), true);
  http.discardOfflineHttpReply(token);
  await assert.rejects(http.receiveOfflineHttp(token, new AbortController().signal, frame, true), e => e.code === 'HTTP_RESPONSE_INVALID');
});
for (const stage of ['count', 'response']) sim(`cancellation during ${stage} releases concurrency but preserves uncertain inference allocation`, async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), r = stage === 'count' ? countReply(8000) : reply(JSON.stringify(response(request)));
  r.chunks[0].delayMs = 100; const x = setup(ctx, { request, [stage]: r }), pending = x.run();
  await new Promise(resolve => setImmediate(resolve)); broker.cancelOfflineInference(x.projection);
  blocked(await pending, 'INFERENCE_CANCELLED');
  const b = budgets.inspectOfflineInferenceBudget(x.budget); assert.equal(b.active, 0); assert.equal(b.uncertainMicroUsd, stage === 'count' ? 0 : 4048);
  await new Promise(resolve => setTimeout(resolve, 110)); blocked(await x.run(), 'PROJECTION_INACTIVE');
  assert.equal((await setup(ctx).run()).status, 'PROPOSAL_VALID');
});
for (const stage of ['count', 'response']) sim(`total timeout during ${stage}`, async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot, undefined, { timeoutMs: 30 }));
  const r = stage === 'count' ? countReply(8000) : reply(JSON.stringify(response(request))); r.chunks[0].delayMs = 100;
  const x = setup(ctx, { request, [stage]: r }); blocked(await x.run(), 'TIMEOUT');
  assert.equal(budgets.inspectOfflineInferenceBudget(x.budget).uncertainMicroUsd, stage === 'count' ? 0 : 4048);
});
sim('single flight covers count stage and the legacy broker across different budgets', async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), slow = countReply(8000); slow.chunks[0].delayMs = 80;
  const a = setup(ctx, { request, count: slow }), b = setup(ctx), pending = a.run();
  blocked(await b.run(), 'CONCURRENCY_EXCEEDED'); assert.equal(budgets.inspectOfflineInferenceBudget(a.budget).attempts, 0);
  const legacy = broker.createOfflineResponsesTransport({ projection: b.projection, reply: { status: 200, body: JSON.stringify(response(b.request)), delayMs: 0 } });
  blocked(await broker.runOfflineInference({ projection: b.projection, transport: legacy, budget: b.budget }), 'CONCURRENCY_EXCEEDED');
  assert.equal((await pending).status, 'PROPOSAL_VALID'); assert.equal((await b.run()).status, 'PROPOSAL_VALID');
});
for (const mutateFile of ['sourceFile', 'catalogFile']) sim(`drift of ${mutateFile} between count and inference blocks before reserving`, async ctx => {
  const { writeFileSync } = require('node:fs'), r = countReply(8000); r.chunks[0].delayMs = 40;
  const x = setup(ctx, { count: r }), pending = x.run(); writeFileSync(ctx[mutateFile], readFileSync(ctx[mutateFile], 'utf8') + '\n// TEMP drift\n');
  blocked(await pending, 'REQUEST_CONTEXT_STALE'); assert.equal(budgets.inspectOfflineInferenceBudget(x.budget).attempts, 0);
});
sim('crossed exchanges and copied capabilities cannot attest token provenance', async ctx => {
  const a = setup(ctx), b = setup(ctx);
  blocked(await broker.runOfflineHttpsInference({ projection: b.projection, transport: a.transport, budget: b.budget }), 'PROJECTION_INVALID');
  blocked(await broker.runOfflineHttpsInference({ projection: { ...a.projection }, transport: a.transport, budget: a.budget }), 'PROJECTION_INVALID');
  blocked(await broker.runOfflineHttpsInference({ projection: a.projection, transport: { ...a.transport }, budget: a.budget }), 'PROJECTION_INVALID');
  blocked(await broker.runOfflineInference({ projection: a.projection, transport: a.transport, budget: a.budget }), 'PROJECTION_INVALID');
  assert.equal((await a.run()).status, 'PROPOSAL_VALID');
});
sim('a response from another original request is rejected after count validation', async ctx => {
  const a = setup(ctx), b = setup(ctx, { response: reply(JSON.stringify(response(a.request))) });
  blocked(await b.run(), 'CORRELATION_MISMATCH', 'REJECTED');
});
sim('post-construction mutations and caller accessors cannot alter the private HTTP snapshot', async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), r = reply(JSON.stringify(response(request))), c = countReply(8000);
  const x = setup(ctx, { request, response: r, count: c }); r.chunks[0].bytes.fill(0); c.headers[0].value = 'text/html';
  assert.equal((await x.run()).status, 'PROPOSAL_VALID');
  let called = 0; const trap = () => { called++; throw Error('FAKE_SECRET'); };
  const y = setup(ctx), getter = Object.defineProperty({}, 'status', { enumerable: true, get: trap });
  rejects(() => broker.createOfflineHttpsTransport({ projection: y.projection, countReply: getter, responseReply: r }), 'INFERENCE_INPUT_INVALID');
  rejects(() => broker.createOfflineHttpsTransport({ projection: y.projection, countReply: new Proxy(c, { ownKeys: trap }), responseReply: r }), 'INFERENCE_INPUT_INVALID');
  const bytes = [1]; Object.defineProperty(bytes, '0', { enumerable: true, get: trap });
  rejects(() => broker.createOfflineHttpsTransport({ projection: y.projection, countReply: countReply(8000), responseReply: { ...r, chunks: [{ bytes, delayMs: 0 }] } }), 'HTTP_RESPONSE_INVALID');
  assert.equal(called, 0);
});
sim('large payloads stay within the original per-value and UTF8 body limits', async ctx => {
  const x = setup(ctx, { ops: [update(ctx.snapshot, ['descripcion'], 'ñ'.repeat(30000)), update(ctx.snapshot, ['info', 'telefono'], 'y'.repeat(40000))] });
  assert.equal((await x.run()).status, 'PROPOSAL_VALID');
});
sim('budget is reserved only after count; exhaustion prevents simulated inference', async ctx => {
  const x = setup(ctx, { budget: budget({ maxAttemptMicroUsd: 4047 }) }); blocked(await x.run(), 'BUDGET_EXHAUSTED');
  assert.equal(budgets.inspectOfflineInferenceBudget(x.budget).attempts, 0);
});
// Final audit faults are injected at trusted module boundaries, never as event data.
for (const moment of ['after count', 'before reservation', 'after reservation']) {
  for (const action of ['invalidate', 'cancel']) sim(`audit: ${action} ${moment} cannot mint a handoff or reuse authority`, async ctx => {
    const x = setup(ctx), receive = http.receiveOfflineHttp, reserve = budgets.reserveOfflineInference;
    const stop = () => action === 'cancel' ? broker.cancelOfflineInference(x.projection) : launcher.invalidateFixRequest(x.request);
    let reservations = 0;
    try {
      http.receiveOfflineHttp = async (...args) => {
        const text = await receive(...args);
        if (args[3] && moment === 'after count') stop();
        return text;
      };
      budgets.reserveOfflineInference = (...args) => {
        if (moment === 'before reservation') stop();
        const token = reserve(...args); reservations++;
        if (moment === 'after reservation') stop();
        return token;
      };
      blocked(await x.run(), action === 'cancel' ? 'INFERENCE_CANCELLED' : 'REQUEST_INACTIVE');
      const state = budgets.inspectOfflineInferenceBudget(x.budget);
      assert.equal(state.active, 0); assert.equal(state.attempts, reservations);
      assert.equal(state.uncertainMicroUsd, reservations * 4048);
      blocked(await x.run(), 'PROJECTION_INACTIVE');
    } finally { http.receiveOfflineHttp = receive; budgets.reserveOfflineInference = reserve; }
    assert.equal((await setup(ctx).run()).status, 'PROPOSAL_VALID');
  });
}
sim('audit: a consumed HTTP count receipt and a settled reservation are one-shot', async ctx => {
  const x = setup(ctx), frame = broker.inspectOfflineHttpRequests(x.projection).count;
  const token = http.snapshotOfflineHttpReply(countReply(8000), true), signal = new AbortController().signal;
  const results = await Promise.allSettled([http.receiveOfflineHttp(token, signal, frame, true), http.receiveOfflineHttp(token, signal, frame, true)]);
  assert.equal(results[0].status, 'fulfilled'); assert.equal(results[1].status, 'rejected');
  assert.equal(results[1].reason.code, 'HTTP_RESPONSE_INVALID'); http.discardOfflineHttpReply(token);
  const b = budget({ maxBatchMicroUsd: 8096, maxAttempts: 2 }), reservation = budgets.reserveOfflineInference(b);
  budgets.settleOfflineInference(reservation);
  rejects(() => budgets.settleOfflineInference(reservation, { inputTokens: 0, outputTokens: 0 }), 'BUDGET_INVALID');
  assert.equal(budgets.inspectOfflineInferenceBudget(b).uncertainMicroUsd, 4048);
});
for (const stage of ['count', 'response', 'handoff']) sim(`audit: unexpected ${stage} exception is sanitized and invalidates the owned session`, async ctx => {
  const x = setup(ctx), receive = http.receiveOfflineHttp, launch = launcher.launchFixer;
  try {
    http.receiveOfflineHttp = (...args) => {
      if ((stage === 'count' && args[3]) || (stage === 'response' && !args[3])) throw Error('FAKE_SECRET');
      return receive(...args);
    };
    launcher.launchFixer = (...args) => { if (stage === 'handoff') throw Error('FAKE_SECRET'); return launch(...args); };
    blocked(await x.run(), 'INFRASTRUCTURE_ERROR');
    rejects(() => launcher.assertOpenFixRequest(x.request), 'REQUEST_INACTIVE');
    const state = budgets.inspectOfflineInferenceBudget(x.budget);
    assert.equal(state.active, 0); assert.equal(state.allocatedMicroUsd, stage === 'count' ? 0 : 4048);
    if (stage === 'response') assert.equal(state.uncertainMicroUsd, 4048);
    if (stage === 'handoff') assert.equal(state.knownMicroUsd, 1800);
    blocked(await x.run(), 'PROJECTION_INACTIVE');
  } finally { http.receiveOfflineHttp = receive; launcher.launchFixer = launch; }
});
sim('audit: invalidation after validation prevents consuming the genuine private handoff', async ctx => {
  const x = setup(ctx), result = await x.run(); assert.equal(result.status, 'PROPOSAL_VALID');
  launcher.invalidateFixRequest(x.request);
  blocked(launcher.prepareFixerHandoff({ request: x.request, handoff: result.handoff }), 'REQUEST_INACTIVE');
  blocked(launcher.prepareFixerHandoff({ request: x.request, handoff: result.handoff }), 'REQUEST_INACTIVE');
});
for (const field of ['model', 'instructions', 'text', 'input']) sim(`audit: changed ${field} with recomputed public bytes cannot acquire provenance`, async ctx => {
  const x = setup(ctx), body = JSON.parse(x.projection.serializedBody);
  if (field === 'model') body.model = 'other-model';
  else if (field === 'instructions') body.instructions += ' changed';
  else if (field === 'text') body.text.format.schema.properties.requestId.enum = ['forged'];
  else body.input[0].content[0].text += ' changed';
  const forged = Object.freeze({ ...x.projection, body, serializedBody: serializeFixerData(body) });
  rejects(() => broker.inspectOfflineHttpRequests(forged), 'PROJECTION_INVALID');
  blocked(await broker.runOfflineHttpsInference({ projection: forged, transport: x.transport, budget: x.budget }), 'PROJECTION_INVALID');
  assert.equal((await x.run()).status, 'PROPOSAL_VALID');
});
for (const [name, mutate, code] of [
  ['incomplete final UTF8', r => { r.chunks = [{ bytes: [0xf0, 0x9f], delayMs: 0 }]; r.headers.pop(); }, 'HTTP_RESPONSE_INVALID'],
  ['noncanonical content length', r => { r.headers[1].value = '01'; }, 'HTTP_RESPONSE_INVALID'],
  ['overflow content length', r => { r.headers[1].value = '9007199254740993'; }, 'HTTP_RESPONSE_INVALID'],
  ['JSON control byte', r => { r.chunks = [{ bytes: [0], delayMs: 0 }]; r.headers.pop(); }, 'JSON_MALFORMED'],
  ['truncated connection body', r => { r.chunks[0].bytes.pop(); }, 'HTTP_RESPONSE_INVALID']
]) sim(`audit: ${name} fails closed`, async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), r = reply(JSON.stringify(response(request))); mutate(r);
  blocked(await setup(ctx, { request, response: r }).run(), code);
});
sim('audit: empty chunks between valid bytes do not alter UTF8 or length accounting', async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot)), r = reply(JSON.stringify(response(request)));
  r.chunks.unshift({ bytes: [], delayMs: 0 }); r.chunks.push({ bytes: [], delayMs: 0 });
  assert.equal((await setup(ctx, { request, response: r }).run()).status, 'PROPOSAL_VALID');
});
for (const variant of ['function', 'callback', 'nested', 'prototype', 'sparse', 'proxy']) sim(`audit: inert HTTP events reject ${variant} without executing caller code`, ctx => {
  const x = setup(ctx); let calls = 0;
  const trap = () => { calls++; throw Error('FAKE_SECRET'); };
  const r = countReply(8000);
  if (variant === 'function') r.chunks[0] = trap;
  if (variant === 'callback') r.chunks[0].callback = trap;
  if (variant === 'nested') r.chunks[0].bytes = [[65]];
  if (variant === 'prototype') Object.setPrototypeOf(r.chunks[0], { execute: trap });
  if (variant === 'sparse') delete r.chunks[0].bytes[0];
  if (variant === 'proxy') r.chunks = new Proxy(r.chunks, { getPrototypeOf: trap, ownKeys: trap, get: trap });
  assert.throws(() => broker.createOfflineHttpsTransport({ projection: x.projection, countReply: r, responseReply: reply('{}') }));
  assert.equal(calls, 0);
});

test('Phase 9E: transitive capability audit and no ambient environment activation', () => {
  const visited = new Set();
  function visit(file) {
    if (visited.has(file)) return; visited.add(file);
    const text = readFileSync(file, 'utf8'), ast = ts.createSourceFile(file, text, ts.ScriptTarget.ES2022, true);
    for (const statement of ast.statements.filter(ts.isImportDeclaration)) {
      if (statement.importClause?.isTypeOnly) continue;
      const name = statement.moduleSpecifier.text;
      assert.doesNotMatch(name, /writer|write-readiness|source-lock|git-inspection|trusted-execution|child_process|node:(?:net|http|https|http2|tls|dns)|mcp|plugin/i);
      if (name.startsWith('.')) visit(path.resolve(path.dirname(file), name + '.ts'));
    }
    assert.doesNotMatch(text, /\b(?:fetch|eval|spawn|execFile|execSync|WebSocket)\s*\(/);
  }
  visit(path.join(projectRoot, 'scripts/factory-fix/inference-broker.ts'));
  for (const name of ['inference-broker', 'inference-http', 'inference-budget', 'inference-contracts']) {
    assert.doesNotMatch(readFileSync(path.join(projectRoot, 'scripts/factory-fix', name + '.ts'), 'utf8'), /process\.env|\.env\b|\.codex|rejectUnauthorized\s*:\s*false/);
  }
  assert.equal(privilegedCalls, 0);
});
