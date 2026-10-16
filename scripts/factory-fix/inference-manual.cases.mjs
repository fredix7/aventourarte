import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const require = createRequire(import.meta.url), out = process.env.FACTORY_FIX_OUT_DIR;
assert.ok(out, 'Compile to owned TEMP first; no bootstrap or generated fixture is executed.');
const compiled = name => require(path.join(out, 'scripts/factory-fix', name + '.js'));
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const fs = require('node:fs'), crypto = require('node:crypto');
let networkCalls = 0, processCalls = 0, privilegeCalls = 0, realGuideReads = 0;
const denyNetwork = () => { networkCalls++; throw Error('REAL_NETWORK_FORBIDDEN'); };
for (const [name, methods] of [['node:http', ['request', 'get']], ['node:https', ['request', 'get']],
  ['node:http2', ['connect']], ['node:net', ['connect', 'createConnection']], ['node:tls', ['connect']],
  ['node:dns', ['lookup', 'resolve']], ['node:dns/promises', ['lookup', 'resolve']], ['node:dgram', ['createSocket']]]) {
  const api = require(name); for (const method of methods) api[method] = denyNetwork;
}
require('node:net').Socket.prototype.connect = denyNetwork;
globalThis.fetch = denyNetwork; globalThis.WebSocket = denyNetwork;
for (const method of ['spawn', 'spawnSync', 'exec', 'execSync', 'execFile', 'execFileSync', 'fork']) {
  require('node:child_process')[method] = () => { processCalls++; throw Error('CHILD_PROCESS_FORBIDDEN'); };
}
require('node:worker_threads').Worker = class { constructor() { processCalls++; throw Error('WORKER_FORBIDDEN'); } };
const originalRead = fs.readFileSync, originalWrite = fs.writeFileSync, writes = [], ownedDirs = new Set();
fs.readFileSync = function(file, ...args) {
  if (typeof file === 'string' && file.startsWith(path.join(root, 'src/app/guides'))) realGuideReads++;
  return originalRead.call(this, file, ...args);
};
fs.writeFileSync = function(file, data, ...args) {
  writes.push({ file: String(file), text: String(data) });
  if (typeof file === 'string' && path.basename(file) === 'fixture.guide.ts') ownedDirs.add(path.resolve(path.dirname(file), '../../../..'));
  return originalWrite.call(this, file, data, ...args);
};
// Trusted test interception only: no secret-observation hook in production API.
// Preserve real randomness; record candidates privately to assert non-disclosure.
const originalRandom = crypto.randomBytes, secrets = [];
crypto.randomBytes = function(size, ...args) {
  const result = originalRandom.call(this, size, ...args);
  if (size === 32 && Buffer.isBuffer(result)) secrets.push('LAB_NOT_A_REAL_KEY_' + result.toString('hex'));
  return result;
};
const manual = compiled('inference-manual'), launcher = compiled('fixer-launcher'), adapter = compiled('inference-https-adapter');
// Trusted test observation of the REAL constructor, never a production bridge.
const hostRequests = new Map(), originalCreateRequest = launcher.createFixRequest;
launcher.createFixRequest = (...args) => { const request = originalCreateRequest(...args); hostRequests.set(request.requestId, request); return request; };
const moduleGraph = new Set();
function visit(id) { if (moduleGraph.has(id)) return; moduleGraph.add(id); for (const child of require.cache[id]?.children ?? []) visit(child.id); }
visit(require.resolve(path.join(out, 'scripts/factory-fix/inference-manual.js')));
for (const [name, method] of [['writer', 'persistPreparedFix'], ['write-readiness', 'inspectWriteReadiness'], ['source-lock', 'acquireSourceLock']]) {
  compiled(name)[method] = () => { privilegeCalls++; throw Error('PRIVILEGED_CALL_FORBIDDEN'); };
}
const outputs = [];
after(() => {
  assert.equal(networkCalls, 0); assert.equal(processCalls, 0); assert.equal(privilegeCalls, 0); assert.equal(realGuideReads, 0);
  for (const dir of ownedDirs) {
    assert.equal(path.dirname(dir), fs.realpathSync.native(tmpdir()));
    assert.match(path.basename(dir), /^factory-fix-phase9-fixture-/);
    assert.equal(fs.existsSync(dir), false, 'This process removed every owned synthetic directory');
  }
  const publicText = JSON.stringify({ outputs, writes });
  for (const secret of secrets) assert.equal(publicText.includes(secret), false, 'No fake secret in payload/result/error/TEMP');
});
const runTest = (name, run) => test('Paso 204: ' + name, run);
const create = () => manual.createManualLabSession();
const inspect = s => manual.inspectManualLabSession(s);
const cancel = s => manual.cancelManualLabSession(s);
const planFor = request => {
  const keys = ['schemaVersion', 'requestId', 'nonce', 'responseId', 'guidePath', 'sourceHash', 'catalogHash',
    'snapshotId', 'snapshotFingerprint', 'targetFingerprint', 'actionFingerprint', 'evidenceFingerprint', 'requestFingerprint'];
  return { ...Object.fromEntries(keys.map(k => [k, request[k]])), operations: request.actions.map(a => ({ actionId: a.actionId,
    operation: a.operation.type, targetId: compiled('modification-scope').operationRef(a.operation).targetId,
    ...('value' in a.operation ? { value: a.operation.value } : {}), evidence: [] })), unresolvedActionIds: [] };
};
function response(s) {
  return responseForRequest(inspect(s).request);
}
function responseForRequest(request) {
  return { id: 'resp_manual_lab', object: 'response', created_at: 1792108800, status: 'completed', error: null, incomplete_details: null,
    model: 'gpt-6-luna', store: false, background: false, tools: [], tool_choice: 'none',
    output: [{ id: 'msg_manual_lab', type: 'message', role: 'assistant', status: 'completed',
      content: [{ type: 'output_text', text: JSON.stringify(planFor(request)), annotations: [], logprobs: [] }] }],
    usage: { input_tokens: 8000, output_tokens: 2000, total_tokens: 10000,
      input_tokens_details: { cached_tokens: 0 }, output_tokens_details: { reasoning_tokens: 0 } } };
}
function events(body, status = 200) {
  const data = Buffer.from(body), chunks = [];
  for (let i = 0; i < data.length; i += 65536) chunks.push({ type: 'data', bytes: [...data.subarray(i, i + 65536)], delayMs: 0 });
  return [{ type: 'resolved', address: '8.8.8.8', delayMs: 0 },
    { type: 'connected', address: '8.8.8.8', hostname: 'api.openai.com', port: 443, authorized: true, encrypted: true, delayMs: 0 },
    { type: 'headers', status, headers: [{ name: 'Content-Type', value: 'application/json' },
      { name: 'Content-Length', value: String(data.length) }], delayMs: 0 }, ...chunks, { type: 'end', complete: true, delayMs: 0 }];
}
function inputFor(s, options = {}, api = manual) {
  const connectivity = api.authorizeManualLabConnectivity(s), credential = api.createManualLabCredential(s);
  const projectCredential = api.authorizeManualLabCredential({ session: s, credential });
  const economic = api.authorizeManualLabBudget({ session: s, maxAttemptMicroUsd: options.max ?? 4048 });
  const transcript = api.createManualLabTranscript({ session: s, events: options.events ?? events(JSON.stringify(response(s))) });
  return { session: s, connectivity, projectCredential, economic, credential, transcript, timeoutMs: options.timeout ?? 5000 };
}
async function run(input) { const result = await manual.runManualLabInference(input); outputs.push(result); return result; }
function blocked(result, code) { assert.equal(result.status, 'BLOCKED', JSON.stringify(result)); if (code) assert.equal(result.code, code); assert.equal('plan' in result, false); assert.equal('handoff' in result, false); }

runTest('full single POST -> original validators -> exact FixPlan memory -> closed, no handoff', async () => {
  const s = create(), i = inputFor(s), before = inspect(s);
  const hostRequest = hostRequests.get(before.request.requestId);
  assert.equal(launcher.isHostFixRequest(hostRequest), true);
  assert.equal(launcher.isHostFixRequest(before.request), false);
  assert.equal(before.request.fragments.length, 1); assert.match(before.request.fragments[0].text, /Texto inicial/);
  const r = await run(i); assert.equal(r.status, 'LAB_PLAN_VALID', JSON.stringify(r));
  assert.equal(r.plan.operations[0].value, compiled('inference-manual-fixture').MANUAL_FIXTURE_VALUE);
  assert.equal(r.evidence, 'SIMULATED_UNVERIFIED_NOT_BILLING'); assert.equal(r.sourceWrite, false); assert.equal(r.writeAuthorized, false);
  assert.equal('handoff' in r, false); assert.equal(inspect(s).phase, 'CLOSED'); assert.equal(inspect(s).cleanup, 'REMOVED');
  assert.equal(inspect(s).simulatedPosts, 1); assert.equal(inspect(s).countPosts, 0);
  assert.equal(inspect(s).budget.knownMicroUsd, 1800); assert.equal(inspect(s).budget.allocatedMicroUsd, 4048);
  assert.equal(inspect(s).budget.realMoneyReserved, false);
  assert.throws(() => launcher.assertOpenFixRequest(hostRequest), e => e.code === 'REQUEST_INACTIVE');
  blocked(await run(i), 'MANUAL_SESSION_INACTIVE');
});
runTest('manual import graph contains only a dormant guarded native bridge and no privileged modules', () => {
  for (const id of moduleGraph) assert.doesNotMatch(id.replaceAll('\\', '/'), /\/(?:inference-bootstrap|inference-preflight|writer|write-readiness|source-lock|execution)\.js$/);
  assert.equal(compiled('inference-https-native').DORMANT_HTTPS_CLIENT_POLICY.enabled, false);
  assert.equal(launcher.getFixerRuntimeStatus().code, 'RUNTIME_NOT_ISOLATED');
});
runTest('fixed complete payload has no filesystem roots, real guide data, tools, dynamic destinations or secrets', () => {
  const s = create(); try {
    const x = inspect(s), body = JSON.parse(x.frame.body);
    outputs.push(x);
    assert.deepEqual(body.tools, []); assert.equal(body.tool_choice, 'none');
    assert.equal(body.store, false); assert.equal(body.stream, false); assert.equal(body.background, false);
    assert.equal(x.frame.path, '/v1/responses'); assert.equal(x.frame.hostname, 'api.openai.com'); assert.equal(x.frame.port, 443);
    assert.equal(body.model, 'gpt-6-luna'); assert.equal(body.max_output_tokens, 4096);
    assert.equal(JSON.parse(body.input[0].content[0].text).guidePath, 'fixture/ciudad');
    assert.ok(body.instructions.length); assert.ok(body.text.format.schema);
    assert.equal(x.frame.body.includes(root), false); assert.equal(x.frame.body.includes(tmpdir()), false);
    assert.equal(x.frame.body.includes('/v1/responses/input_tokens'), false);
    assert.equal(x.policy.realExecutionEnabled, false); assert.equal(x.policy.nativeClientEnabled, false);
    assert.equal(Object.isFrozen(x.frame), true); assert.equal(Object.isFrozen(x.request), true);
  } finally { cancel(s); }
});
for (const [field, code] of [['connectivity', 'MANUAL_A_REQUIRED'], ['projectCredential', 'MANUAL_B_REQUIRED'], ['economic', 'MANUAL_C_REQUIRED']]) {
  runTest(`missing ${field} blocks before reservation/POST and invalidates session`, async () => {
    const s = create(), i = inputFor(s); i[field] = undefined; blocked(await run(i), code);
    assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(s).budget, null); assert.equal(inspect(s).cleanup, 'REMOVED');
  });
  for (const [label, counterfeit] of [['JSON', v => JSON.parse(JSON.stringify(v))], ['spread', v => ({ ...v })],
    ['flag', () => ({ authorized: true, verified: true, laboratoryOnly: true })], ['Proxy', v => new Proxy(v, { get() { throw Error('GETTER_EXECUTED'); } })]]) {
    runTest(`forged ${field} via ${label} carries no provenance`, async () => {
      const s = create(), i = inputFor(s); i[field] = counterfeit(i[field]); blocked(await run(i), code); assert.equal(inspect(s).simulatedPosts, 0);
    });
  }
  runTest(`${field} from another authentic session is rejected`, async () => {
    const s = create(), other = create(); try { const i = inputFor(s), j = inputFor(other); i[field] = j[field]; blocked(await run(i), code); }
    finally { cancel(s); cancel(other); }
  });
}
runTest('A, B and C are separate types and cannot substitute for one another', async () => {
  const s = create(), i = inputFor(s); i.projectCredential = i.connectivity; blocked(await run(i), 'MANUAL_B_REQUIRED');
});
for (const [name, mutate] of [
  ['payload', i => { i.frame = { ...inspect(i.session).frame, body: '{}' }; }],
  ['model', i => { i.model = 'other-model'; }], ['endpoint', i => { i.endpoint = 'http://localhost'; }],
  ['verified token bound', i => { i.inputTokensVerified = true; }], ['live flag', i => { i.real = true; }],
  ['retry flag', i => { i.retries = 1; }], ['transport callback', i => { i.transport = () => { throw Error('CALLED'); }; }],
  ['writer callback', i => { i.writer = () => { throw Error('CALLED'); }; }], ['caller credential string', i => { i.apiKey = 'LAB_FAKE_VALUE_ONLY'; }]
]) runTest(`caller cannot replace/enable ${name}`, async () => {
  const s = create(); try { const i = inputFor(s); mutate(i); blocked(await run(i), 'INFERENCE_INPUT_INVALID'); assert.equal(inspect(s).simulatedPosts, 0); }
  finally { cancel(s); }
});
runTest('unaccredited full input tokens and commercial prices ALWAYS block the future real gate', () => {
  const s = create(); try {
    const r = manual.inspectManualLiveReadiness(s); outputs.push(r);
    assert.equal(r.decision, 'BLOCKED'); assert.equal(r.fullInputTokenBoundVerified, false);
    assert.ok(r.blockers.includes('TOKEN_BOUND_UNVERIFIED')); assert.ok(r.blockers.includes('COMMERCIAL_RATES_UNVERIFIED'));
    assert.equal(r.realMoneyAuthorized, false);
  } finally { cancel(s); }
});
for (const max of [0, 4047]) runTest(`explicit lab budget ${max} cannot cover simulated reserve`, async () => {
  const s = create(); blocked(await run(inputFor(s, { max })), 'BUDGET_EXHAUSTED'); assert.equal(inspect(s).simulatedPosts, 0);
  assert.equal(inspect(s).budget.attempts, 0); assert.equal(inspect(s).budget.allocatedMicroUsd, 0);
});
runTest('the old 4048 estimate cannot create C; operator maximum must be explicit', () => {
  const s = create(); try {
    assert.throws(() => manual.authorizeManualLabBudget({ session: s }), e => e.code === 'INFERENCE_INPUT_INVALID');
    assert.throws(() => manual.authorizeManualLabBudget({ session: s, maxAttemptMicroUsd: 4048, verified: true }), e => e.code === 'INFERENCE_INPUT_INVALID');
  } finally { cancel(s); }
});
for (const counterfeit of [{}, 'LAB_NOT_A_REAL_KEY', null]) runTest(`wrong credential handle ${typeof counterfeit} rejected`, async () => {
  const s = create(), i = inputFor(s); i.credential = counterfeit; blocked(await run(i), 'MANUAL_CREDENTIAL_INVALID');
});
runTest('credential/project handle from another session rejected by B', async () => {
  const s = create(), other = create(); try {
    const i = inputFor(s), j = inputFor(other); i.credential = j.credential; blocked(await run(i), 'MANUAL_CREDENTIAL_INVALID');
  } finally { cancel(s); cancel(other); }
});
runTest('transcript bound to another request/body rejected before POST', async () => {
  const s = create(), other = create(); try { const i = inputFor(s), j = inputFor(other); i.transcript = j.transcript; blocked(await run(i), 'MANUAL_TRANSCRIPT_INVALID'); }
  finally { cancel(s); cancel(other); }
});
runTest('revocation invalidates all three authorities and prevents second issuance', async () => {
  const s = create(), i = inputFor(s); cancel(s); blocked(await run(i), 'MANUAL_SESSION_INACTIVE');
  assert.throws(() => manual.authorizeManualLabConnectivity(s), /MANUAL_SESSION_INACTIVE/);
  assert.equal(inspect(s).simulatedPosts, 0);
});
runTest('same authority cannot be issued twice even before use', () => {
  const s = create(); try { manual.authorizeManualLabConnectivity(s); assert.throws(() => manual.authorizeManualLabConnectivity(s), /MANUAL_AUTHORITY_ALREADY_ISSUED/); }
  finally { cancel(s); }
});
runTest('expired session invalidates A/B/C before reservation or POST', async t => {
  const s = create(), i = inputFor(s), clock = require('node:perf_hooks').performance;
  const original = clock.now.bind(clock);
  t.mock.method(clock, 'now', () => original() + 31000);
  try {
    blocked(await run(i), 'MANUAL_SESSION_EXPIRED');
    assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(s).budget, null); assert.equal(inspect(s).cleanup, 'REMOVED');
  } finally { t.mock.restoreAll(); cancel(s); }
});
runTest('fixed body/model/schema cannot be changed after A/B/C issuance', async () => {
  const s = create(), i = inputFor(s), x = inspect(s);
  assert.throws(() => { x.frame.body = '{}'; }, TypeError);
  assert.throws(() => { x.request.actions[0].operation.value = 'Unauthorized'; }, TypeError);
  assert.equal(await run(i).then(r => r.status), 'LAB_PLAN_VALID');
});
runTest('modification of owned synthetic data is rejected and cleaned before any POST', async () => {
  const s = create(), i = inputFor(s);
  try {
    const source = writes.at(-2).file;
    assert.match(source, /fixture\.guide\.ts$/);
    fs.appendFileSync(source, '\n// altered synthetic data');
    blocked(await run(i), 'MANUAL_SYNTHETIC_CONTEXT_CHANGED');
    assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(s).cleanup, 'REMOVED');
  } finally { cancel(s); }
});
for (const status of [301, 307, 401, 429, 500, 503]) runTest(`HTTP ${status}: no redirects, retries or released uncertain reserve`, async () => {
  const s = create(), i = inputFor(s, { events: events('untrusted error', status) }); blocked(await run(i));
  assert.equal(inspect(s).simulatedPosts, 1); assert.equal(inspect(s).budget.uncertainMicroUsd, 4048);
  blocked(await run(i), 'MANUAL_SESSION_INACTIVE'); assert.equal(inspect(s).simulatedPosts, 1);
});
for (const [name, mutate, code] of [
  ['invalid exact value', r => { const p = JSON.parse(r.output[0].content[0].text); p.operations[0].value = 'Unauthorized'; r.output[0].content[0].text = JSON.stringify(p); }, 'OPERATION_NOT_ALLOWED'],
  ['write operator not authorized', r => { const p = JSON.parse(r.output[0].content[0].text); p.operations[0].operation = 'REMOVE_PROPERTY'; r.output[0].content[0].text = JSON.stringify(p); }, 'OPERATION_NOT_ALLOWED'],
  ['writer tool', r => { r.output.push({ type: 'function_call', name: 'writer' }); }, 'PROVIDER_TOOL_FORBIDDEN'],
  ['shell tool', r => { r.tools = [{ type: 'shell' }]; }, 'PROVIDER_TOOL_FORBIDDEN'],
  ['invalid correlation', r => { const p = JSON.parse(r.output[0].content[0].text); p.nonce = 'wrong'; r.output[0].content[0].text = JSON.stringify(p); }, 'CORRELATION_MISMATCH'],
  ['extra writer field', r => { const p = JSON.parse(r.output[0].content[0].text); p.writer = true; r.output[0].content[0].text = JSON.stringify(p); }, 'PLAN_INVALID'],
  ['excess input usage', r => { r.usage.input_tokens = 16001; r.usage.total_tokens = 18001; }, 'BUDGET_USAGE_EXCEEDED'],
  ['excess output usage', r => { r.usage.output_tokens = 4097; r.usage.total_tokens = 12097; }, 'BUDGET_USAGE_EXCEEDED']
]) runTest(`original validation rejects ${name}`, async () => {
  const s = create(), r = response(s); mutate(r); blocked(await run(inputFor(s, { events: events(JSON.stringify(r)) })), code);
  assert.equal(inspect(s).simulatedPosts, 1); assert.equal(inspect(s).budget.allocatedMicroUsd, 4048);
});
for (const [name, transcript, code] of [
  ['timeout', [{ type: 'timeout', delayMs: 0 }], 'HTTP_TIMEOUT'],
  ['late reply after timeout', [{ type: 'timeout', delayMs: 0 }, { type: 'end', complete: true, delayMs: 10 }], 'HTTP_TIMEOUT'],
  ['unexpected close', [{ type: 'close', delayMs: 0 }], 'HTTPS_UNEXPECTED_CLOSE'],
  ['TLS failure', [{ type: 'resolved', address: '8.8.8.8', delayMs: 0 }, { type: 'connected', address: '8.8.8.8', hostname: 'api.openai.com', port: 443, authorized: false, encrypted: true, delayMs: 0 }], 'HTTPS_TLS_INVALID']
]) runTest(`${name} closes and keeps the whole uncertain reserve`, async () => {
  const s = create(); blocked(await run(inputFor(s, { events: transcript })), code);
  assert.equal(inspect(s).budget.uncertainMicroUsd, 4048); assert.equal(inspect(s).cleanup, 'REMOVED');
});
runTest('deadline stops delayed data; no late revival or refund', async () => {
  const s = create(), transcript = events(JSON.stringify(response(s))); transcript[0].delayMs = 1000;
  const i = inputFor(s, { events: transcript, timeout: 10 }); blocked(await run(i), 'TIMEOUT');
  assert.equal(inspect(s).budget.uncertainMicroUsd, 4048); blocked(await run(i), 'MANUAL_SESSION_INACTIVE');
});
runTest('cancel during transcript discards late events and cannot revive', async () => {
  const s = create(), transcript = events(JSON.stringify(response(s))); transcript[0].delayMs = 1000;
  const promise = run(inputFor(s, { events: transcript })); cancel(s); blocked(await promise, 'INFERENCE_CANCELLED');
  assert.equal(inspect(s).budget.uncertainMicroUsd, 4048); assert.equal(inspect(s).cleanup, 'REMOVED');
});
runTest('concurrent sessions are denied before second reservation/request', async () => {
  const s = create(), other = create(); try {
    const transcript = events(JSON.stringify(response(s))); transcript[0].delayMs = 1000;
    const i = inputFor(s, { events: transcript }), j = inputFor(other), first = run(i);
    blocked(await run(j), 'MANUAL_CONCURRENCY_EXCEEDED'); assert.equal(inspect(other).simulatedPosts, 0);
    cancel(s); blocked(await first, 'INFERENCE_CANCELLED');
  } finally { cancel(s); cancel(other); }
});
runTest('no adoption of arbitrary, cloned or authentic external request/snapshot/root', () => {
  const s = create(); try {
    for (const value of [{ synthetic: true }, { request: inspect(s).request }, { repoRoot: root }, JSON.parse(JSON.stringify(s))]) {
      assert.throws(() => manual.createManualLabSession(value), /MANUAL_SYNTHETIC_ONLY/);
    }
    assert.throws(() => manual.inspectManualLabSession(JSON.parse(JSON.stringify(s))), /MANUAL_SESSION_INVALID/);
  } finally { cancel(s); }
});
for (const where of ['body', 'unicode body', 'header']) runTest(`fake generated secret echoed in ${where} is rejected without disclosure`, async () => {
  const target = create(), a = manual.authorizeManualLabConnectivity(target), key = manual.createManualLabCredential(target);
  const actual = secrets.at(-1), b = manual.authorizeManualLabCredential({ session: target, credential: key });
  const c = manual.authorizeManualLabBudget({ session: target, maxAttemptMicroUsd: 4048 });
  let body = JSON.stringify(response(target));
  if (where === 'body') body = body.replace('resp_manual_lab', actual);
  if (where === 'unicode body') body = body.replace('resp_manual_lab', [...actual].map(ch => '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0')).join(''));
  const transcript = events(body);
  if (where === 'header') transcript[2].headers.push({ name: 'X-Untrusted', value: actual });
  const t = manual.createManualLabTranscript({ session: target, events: transcript });
  blocked(await run({ session: target, connectivity: a, projectCredential: b, economic: c, credential: key, transcript: t, timeoutMs: 5000 }), 'HTTPS_SECRET_ECHO');
  assert.equal(inspect(target).budget.uncertainMicroUsd, 4048);
});
runTest('one-frame shared transport is single use and checks exact body binding', async () => {
  const s = create(); try {
    const frame = inspect(s).frame;
    const exchange = adapter.createOfflineSingleHttpsExchange({ frame, events: events('{}') });
    assert.equal(await adapter.receiveOfflineSingleHttpsExchange(exchange, frame, new AbortController().signal, 'LAB_FIXED_TEST_SECRET'), '{}');
    await assert.rejects(adapter.receiveOfflineSingleHttpsExchange(exchange, frame, new AbortController().signal, 'LAB_FIXED_TEST_SECRET'), e => e.code === 'HTTPS_EVENT_INVALID');
    const other = create(); try {
      const bound = adapter.createOfflineSingleHttpsExchange({ frame, events: events('{}') });
      await assert.rejects(adapter.receiveOfflineSingleHttpsExchange(bound, inspect(other).frame, new AbortController().signal, 'LAB_FIXED_TEST_SECRET'), e => e.code === 'TOKEN_BINDING_INVALID');
    } finally { cancel(other); }
  } finally { cancel(s); }
});

test('Paso 205: expiry during synchronous checks blocks BEFORE reserve and POST', async t => {
  const s = create(), i = inputFor(s), clock = require('node:perf_hooks').performance;
  const now = clock.now.bind(clock); let reads = 0;
  t.mock.method(clock, 'now', () => now() + (++reads > 1 ? 31000 : 0));
  try {
    blocked(await run(i), 'MANUAL_SESSION_EXPIRED');
    assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(s).budget, null);
  } finally { t.mock.restoreAll(); cancel(s); }
});
test('Paso 205: inspection exposes data, never the original request capability', () => {
  const s = create(); try {
    const data = inspect(s).request;
    assert.equal(launcher.isHostFixRequest(data), false);
    assert.throws(() => launcher.createSimulatedFixerTransport({ request: data, events: [] }), e => e.code === 'REQUEST_INVALID');
  } finally { cancel(s); }
});
test('Paso 205: validated memory result has private provenance, not JSON authority', async () => {
  const s = create(), result = await run(inputFor(s));
  assert.equal(result.status, 'LAB_PLAN_VALID');
  assert.equal(typeof manual.isManualLabValidatedResult, 'function');
  assert.equal(manual.isManualLabValidatedResult(result), true);
  for (const clone of [{ ...result }, JSON.parse(JSON.stringify(result)), new Proxy(result, {})]) {
    assert.equal(manual.isManualLabValidatedResult(clone), false);
  }
  assert.equal(result.persistence, 'NOT_ATTEMPTED');
  assert.equal(launcher.isHostFixerHandoff(result), false);
});
test('Paso 205: production catalog reader exports no synthetic constructor', () => {
  assert.deepEqual(Object.keys(compiled('catalog-reader')), ['readCatalogAssignments']);
});
for (const field of ['connectivity', 'projectCredential', 'economic']) test(`Paso 205: getter for ${field} is never invoked`, async () => {
  const s = create(), i = inputFor(s); let calls = 0;
  Object.defineProperty(i, field, { enumerable: true, get() { calls++; throw Error('UNTRUSTED_GETTER'); } });
  try { blocked(await run(i), 'INFERENCE_INPUT_INVALID'); assert.equal(calls, 0); assert.equal(inspect(s).simulatedPosts, 0); }
  finally { cancel(s); }
});
test('Paso 205: Proxy envelope cannot reenter or execute traps', async () => {
  const s = create(), i = inputFor(s); let traps = 0;
  const trap = () => { traps++; throw Error('UNTRUSTED_PROXY'); };
  try {
    blocked(await run(new Proxy(i, { get: trap, ownKeys: trap, getPrototypeOf: trap })), 'INFERENCE_INPUT_INVALID');
    assert.equal(traps, 0); assert.equal(inspect(s).simulatedPosts, 0);
  } finally { cancel(s); }
});
for (const value of [-1, NaN, Infinity, -Infinity, 0.5, Number.MAX_SAFE_INTEGER + 1, 1000000001, '4048', null, {}, 4048n]) {
  test(`Paso 205: invalid economic amount ${typeof value} ${String(value)} cannot mint C`, () => {
    const s = create(); try {
      assert.throws(() => manual.authorizeManualLabBudget({ session: s, maxAttemptMicroUsd: value }), /MANUAL_BUDGET_INVALID/);
      assert.equal(inspect(s).budget, null); assert.equal(inspect(s).simulatedPosts, 0);
    } finally { cancel(s); }
  });
}
test('Paso 205: double consumption while active cannot release single flight or send a second POST', async () => {
  const s = create(), transcript = events(JSON.stringify(response(s))); transcript[0].delayMs = 1000;
  const i = inputFor(s, { events: transcript }), first = run(i);
  try {
    blocked(await run(i), 'MANUAL_SESSION_INACTIVE');
    assert.throws(() => create(), /MANUAL_CONCURRENCY_EXCEEDED/);
    assert.equal(inspect(s).simulatedPosts, 1); assert.equal(inspect(s).budget.attempts, 1);
  } finally { cancel(s); blocked(await first, 'INFERENCE_CANCELLED'); }
  assert.equal(inspect(s).budget.uncertainMicroUsd, 4048);
});
test('Paso 205: exception after ABC validation closes capabilities before any POST', async () => {
  const s = create(), i = inputFor(s), budgetApi = compiled('inference-budget'), original = budgetApi.reserveOfflineInference;
  budgetApi.reserveOfflineInference = () => { throw Error('LAB_FAULT_NO_RAW_DIAGNOSTIC'); };
  try { blocked(await run(i), 'MANUAL_REJECTED'); }
  finally { budgetApi.reserveOfflineInference = original; cancel(s); }
  assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(s).cleanup, 'REMOVED');
  assert.equal(inspect(s).budget.allocatedMicroUsd, 0);
  blocked(await run(i), 'MANUAL_SESSION_INACTIVE');
});
test('Paso 205: caller budget snapshot cannot reserve or settle; double settlement cannot refund', () => {
  const budgetApi = compiled('inference-budget');
  const b = budgetApi.createOfflineInferenceBudget({ maxAttemptMicroUsd: 4048, maxBatchMicroUsd: 4048, maxAttempts: 1 });
  const snapshot = budgetApi.inspectOfflineInferenceBudget(b);
  assert.throws(() => budgetApi.reserveOfflineInference(snapshot), e => e.code === 'BUDGET_INVALID');
  const reservation = budgetApi.reserveOfflineInference(b);
  assert.throws(() => budgetApi.reserveOfflineInference(b), e => e.code === 'CONCURRENCY_EXCEEDED');
  budgetApi.settleOfflineInference(reservation);
  assert.throws(() => budgetApi.settleOfflineInference(reservation, { inputTokens: 0, outputTokens: 0 }), e => e.code === 'BUDGET_INVALID');
  assert.equal(budgetApi.inspectOfflineInferenceBudget(b).uncertainMicroUsd, 4048);
  assert.equal(budgetApi.inspectOfflineInferenceBudget(b).allocatedMicroUsd, 4048);
  assert.throws(() => budgetApi.reserveOfflineInference(b), e => e.code === 'BUDGET_EXHAUSTED');
});
test('Paso 205: copied catalog/guide from another authentic session cannot replace context', async () => {
  const s = create(), i = inputFor(s), other = create(), j = inputFor(other);
  try {
    const data = inspect(other).request;
    blocked(await run({ ...i, session: { ...i.session, request: data, synthetic: true } }), 'MANUAL_SESSION_INVALID');
    blocked(await run({ ...j, transcript: i.transcript }), 'MANUAL_TRANSCRIPT_INVALID');
    assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(other).simulatedPosts, 0);
  } finally { cancel(s); cancel(other); }
});
for (const target of ['fixture.guide.ts', 'guide-factory-catalog.ts']) test(`Paso 205: content substitution of ${target} is blocked`, async () => {
  const s = create(), i = inputFor(s);
  try {
    const file = writes.slice(-2).find(w => path.basename(w.file) === target).file;
    fs.appendFileSync(file, '\nexport const UNAUTHORIZED = 1;');
    blocked(await run(i), 'MANUAL_SYNTHETIC_CONTEXT_CHANGED');
    assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(s).cleanup, 'REMOVED');
  } finally { cancel(s); }
});
for (const [name, mutate, expected] of [
  ['path traversal', t => t.replace('../guides/fixture.guide', '../../fixture.guide'), 'IMPORT_PATH_UNSAFE'],
  ['unknown rules', t => t.replace("'generic'", "'unknown'"), 'RULESET_UNSUPPORTED'],
  ['index changed', t => t.replace('return catalog;', 'return [];'), 'CATALOG_UNSUPPORTED'],
  ['executable statement', t => t + '\nprocess.exit();', 'CATALOG_UNSUPPORTED']
]) test(`Paso 205: original catalog reader rejects ${name} in laboratory data`, () => {
  const s = create(); try {
    const catalog = writes.at(-1).text, reader = compiled('catalog-reader');
    const entries = reader.readCatalogAssignments(catalog);
    assert.equal(entries.length, 1); assert.equal(entries[0].importedSymbol, 'FIXTURE_GUIDE');
    assert.throws(() => reader.readCatalogAssignments(mutate(catalog)), e => e.code === expected);
  } finally { cancel(s); }
});
test('Paso 205: complete manual source import graph excludes privileged and real-guide entrypoints', t => {
  const ts = require('typescript'), visited = new Set();
  const allowed = new Set(['typescript', 'node:crypto', 'node:perf_hooks', 'node:fs', 'node:path', 'node:os', 'node:util', 'node:timers/promises', 'node:readline/promises']);
  function visit(file) {
    if (visited.has(file)) return; visited.add(file);
    const text = originalRead(file, 'utf8'), ast = ts.createSourceFile(file, text, ts.ScriptTarget.ES2022, true);
    assert.doesNotMatch(file.replaceAll('\\', '/'), /\/(?:guides\/|guide-factory-(?:catalog|executor)\.ts)/);
    for (const statement of ast.statements.filter(ts.isImportDeclaration)) {
      if (statement.importClause?.isTypeOnly) continue;
      const specifier = statement.moduleSpecifier.text;
      assert.doesNotMatch(specifier, /bootstrap|preflight|writer|readiness|source-lock|git-inspection|child_process|worker_threads|mcp|plugin|factory-qa-(?:channel|invoke)/i);
      if (specifier.startsWith('.')) visit(path.resolve(path.dirname(file), specifier + '.ts'));
      else assert.ok(allowed.has(specifier) || path.basename(file) === 'inference-https-native.ts'
        && ['node:https', 'node:tls', 'node:dns/promises'].includes(specifier), 'Unexpected external runtime dependency: ' + specifier);
    }
    function scan(node) {
      if (ts.isCallExpression(node)) assert.equal(/^(?:require|eval|Function|fetch|WebSocket|spawn|execSync|execFile)$/.test(node.expression.getText(ast)), false);
      ts.forEachChild(node, scan);
    }
    scan(ast);
  }
  visit(path.join(root, 'scripts/factory-fix/inference-manual.ts'));
  t.diagnostic('Manual runtime source graph audited: ' + visited.size + ' local modules; native port is consume-only, no operational issuer/privileged entrypoint.');
});

// Virtual monotonic time is test instrumentation only. Production exposes no
// clock, sleep-skip, rate-reset, live flag or alternate transport registration.
let stageEpoch = 0;
const realStageNow = require('node:perf_hooks').performance.now.bind(require('node:perf_hooks').performance);
const stageTest = (name, body) => test('Paso 207: ' + name, async t => {
  let now = realStageNow() + (++stageEpoch) * 2000000;
  const clock = require('node:perf_hooks').performance, owned = [];
  t.mock.method(clock, 'now', () => now);
  const ctx = { create() { const s = manual.createManualCountedLabSession(); owned.push(s); return s; },
    tick(ms = 60000) { now += ms; },
    async count(s, tokens = 8000, options = {}) {
      const i = inputFor(s, { max: 8096, events: events(JSON.stringify({ object: 'response.input_tokens', input_tokens: tokens })), ...options });
      const result = await manual.runManualLabCount(i); outputs.push(result); return { i, result };
    },
    advance(s, result) { return manual.advanceManualLabGeneration({ session: s, countResult: result }); },
    generation(s, options = {}) { return inputFor(s, { max: 8096, ...options }); } };
  try { await body(ctx, t); }
  finally { for (const s of owned) cancel(s); t.mock.restoreAll(); }
});
stageTest('authentic count -> explicit 60s transition -> fresh ABC -> generation -> original memory result', async x => {
  const s = x.create(), before = inspect(s), { i, result: count } = await x.count(s);
  assert.equal(count.status, 'LAB_COUNT_VALID', JSON.stringify(count)); assert.equal(manual.isManualLabCountResult(count), true);
  assert.equal(manual.isManualLabValidatedResult(count), false); assert.equal(count.inputTokens, 8000);
  assert.equal(inspect(s).phase, 'COUNTED'); assert.equal(inspect(s).countPosts, 1); assert.equal(inspect(s).simulatedPosts, 0);
  assert.equal(inspect(s).budget.allocatedMicroUsd, 4048); assert.equal(inspect(s).budget.uncertainMicroUsd, 4048);
  assert.equal(inspect(s).budget.knownMicroUsd, 0); assert.equal(inspect(s).budget.realMoneyReserved, false);
  assert.throws(() => x.advance(s, count), /MANUAL_RATE_LIMIT/); x.tick(59999);
  assert.throws(() => x.advance(s, count), /MANUAL_RATE_LIMIT/); assert.equal(inspect(s).simulatedPosts, 0);
  x.tick(1); assert.equal(x.advance(s, count).status, 'LAB_GENERATION_READY');
  assert.equal(manual.isManualLabCountResult(count), false);
  const result = await run(x.generation(s)); assert.equal(result.status, 'LAB_PLAN_VALID', JSON.stringify(result));
  assert.equal(manual.isManualLabValidatedResult(result), true); assert.equal(result.persistence, 'NOT_ATTEMPTED');
  assert.equal(inspect(s).countPosts, 1); assert.equal(inspect(s).simulatedPosts, 1);
  assert.equal(inspect(s).budget.attempts, 2); assert.equal(inspect(s).budget.allocatedMicroUsd, 8096);
  assert.equal(inspect(s).budget.uncertainMicroUsd, 4048); assert.equal(inspect(s).budget.knownMicroUsd, 1800);
  assert.equal(inspect(s).cleanup, 'REMOVED'); assert.equal(inspect(s).phase, 'CLOSED');
  assert.equal(inspect(s).countedFrames.bindingDigest, before.countedFrames.bindingDigest);
  blocked(await run(i), 'MANUAL_SESSION_INACTIVE');
});
stageTest('count and generation share all immutable input-affecting fields, instructions and strict schema', async x => {
  const s = x.create(), frames = inspect(s).countedFrames;
  const count = JSON.parse(frames.count.body), generation = JSON.parse(frames.inference.body);
  for (const key of Object.keys(count)) assert.deepEqual(count[key], generation[key], key);
  assert.deepEqual(Object.keys(count).sort(), ['model', 'input', 'instructions', 'parallel_tool_calls', 'reasoning', 'text', 'tools', 'tool_choice', 'truncation'].sort());
  assert.equal(frames.count.path, '/v1/responses/input_tokens'); assert.equal(frames.inference.path, '/v1/responses');
  for (const f of [frames.count, frames.inference]) {
    assert.equal(f.hostname, 'api.openai.com'); assert.equal(f.protocol, 'https:'); assert.equal(f.port, 443); assert.equal(f.method, 'POST');
    assert.throws(() => { f.body = '{}'; }, TypeError);
  }
  const { result } = await x.count(s); x.tick(); x.advance(s, result);
  assert.deepEqual(inspect(s).countedFrames, frames);
  const policy = inspect(s).policy; assert.equal(policy.reportedTpm, 25000); assert.equal(policy.reportedRpm, 1);
  assert.equal(policy.realMoneyAuthorized, false); assert.equal(policy.countPricingVerified, false); assert.equal(policy.networkEnabled, false);
  const live = manual.inspectManualLiveReadiness(s); assert.equal(live.fullInputTokenBoundVerified, false);
  assert.ok(live.blockers.includes('COUNT_PRICE_AND_QUOTA_UNVERIFIED')); assert.ok(live.blockers.includes('API_BALANCE_REPORTED_ZERO'));
});
for (const tokens of [0, -1, 16001, 25000, 8000.5, '8000']) stageTest(`invalid/excess count ${String(tokens)} closes without generation`, async x => {
  const s = x.create(), { result } = await x.count(s, tokens); blocked(result);
  assert.equal(inspect(s).countPosts, 1); assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(s).cleanup, 'REMOVED');
  assert.equal(inspect(s).budget.uncertainMicroUsd, 4048);
});
for (const field of ['connectivity', 'projectCredential', 'economic']) stageTest(`count cannot omit ${field}`, async x => {
  const s = x.create(), i = x.generation(s, { events: events('{"object":"response.input_tokens","input_tokens":8000}') });
  i[field] = undefined; blocked(await manual.runManualLabCount(i)); assert.equal(inspect(s).countPosts, 0); assert.equal(inspect(s).budget, null);
});
for (const max of [0, 4048, 8095]) stageTest(`count requires an explicit cap for BOTH lab reservations: ${max}`, async x => {
  const s = x.create(), { result } = await x.count(s, 8000, { max }); blocked(result, 'MANUAL_WORKFLOW_BUDGET_INVALID');
  assert.equal(inspect(s).countPosts, 0); assert.equal(inspect(s).budget, null);
});
stageTest('generation cannot run before count or transition', async x => {
  const s = x.create();
  const i = x.generation(s, { events: events('{"object":"response.input_tokens","input_tokens":8000}') });
  blocked(await run(i), 'MANUAL_STAGE_INVALID');
  assert.equal(inspect(s).countPosts, 0); assert.equal(inspect(s).simulatedPosts, 0);
  x.tick(); const other = x.create(), { result } = await x.count(other);
  blocked(await run({ session: other }), 'INFERENCE_INPUT_INVALID');
  assert.equal(inspect(other).phase, 'COUNTED'); assert.equal(inspect(other).simulatedPosts, 0);
  assert.throws(() => manual.authorizeManualLabConnectivity(other), /MANUAL_SESSION_INACTIVE/);
});
for (const clone of [v => ({ ...v }), v => JSON.parse(JSON.stringify(v)), v => new Proxy(v, {}),
  () => ({ inputTokens: 8000, verified: true, bindingDigest: 'fake' })]) stageTest('public count data cannot mint a transition receipt', async x => {
  const s = x.create(), { result } = await x.count(s); x.tick();
  const forged = clone(result); assert.equal(manual.isManualLabCountResult(forged), false);
  assert.throws(() => x.advance(s, forged), /MANUAL_COUNT_RECEIPT_INVALID/); assert.equal(inspect(s).simulatedPosts, 0);
});
stageTest('count receipt or transcript from another session/request is rejected', async x => {
  const s = x.create(), { result: first, i } = await x.count(s); x.tick();
  const other = x.create(), { result: second } = await x.count(other); x.tick();
  assert.throws(() => x.advance(s, second), /MANUAL_COUNT_RECEIPT_INVALID/);
  assert.throws(() => x.advance(other, first), /MANUAL_COUNT_RECEIPT_INVALID/);
  x.advance(s, first);
  const generation = x.generation(s); generation.transcript = i.transcript;
  blocked(await run(generation), 'MANUAL_TRANSCRIPT_INVALID'); assert.equal(inspect(s).simulatedPosts, 0);
});
for (const field of ['connectivity', 'projectCredential', 'economic', 'credential']) stageTest(`old count ${field} cannot authorize generation`, async x => {
  const s = x.create(), { i, result } = await x.count(s); x.tick(); x.advance(s, result);
  const generation = x.generation(s); generation[field] = i[field]; blocked(await run(generation));
  assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(s).budget.allocatedMicroUsd, 4048);
});
stageTest('count, approval and generation each resist replay', async x => {
  const s = x.create(), { i, result } = await x.count(s);
  blocked(await manual.runManualLabCount(i), 'MANUAL_SESSION_INACTIVE'); x.tick(); x.advance(s, result);
  assert.throws(() => x.advance(s, result), /MANUAL_COUNT_REQUIRED/);
  const generation = x.generation(s), valid = await run(generation); assert.equal(valid.status, 'LAB_PLAN_VALID');
  blocked(await run(generation), 'MANUAL_SESSION_INACTIVE'); assert.equal(inspect(s).countPosts + inspect(s).simulatedPosts, 2);
});
stageTest('generation rejects a crossed model response through original correlations', async x => {
  const s = x.create(), { result } = await x.count(s); x.tick(); const other = x.create(); x.advance(s, result);
  blocked(await run(x.generation(s, { events: events(JSON.stringify(response(other))) })), 'CORRELATION_MISMATCH');
  assert.equal(inspect(s).simulatedPosts, 1); assert.equal(inspect(s).cleanup, 'REMOVED');
});
stageTest('generation usage must match the count bound to this immutable payload', async x => {
  const s = x.create(), { result } = await x.count(s); x.tick(); x.advance(s, result);
  const r = response(s); r.usage.input_tokens--; r.usage.total_tokens--;
  blocked(await run(x.generation(s, { events: events(JSON.stringify(r)) })), 'TOKEN_COUNT_INVALID');
  assert.equal(inspect(s).budget.uncertainMicroUsd, 8096); assert.equal(inspect(s).budget.allocatedMicroUsd, 8096);
});
stageTest('generation cannot change the explicit workflow economic maximum', async x => {
  const s = x.create(), { result } = await x.count(s); x.tick(); x.advance(s, result);
  blocked(await run(x.generation(s, { max: 100000 })), 'MANUAL_WORKFLOW_BUDGET_INVALID');
  assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(s).budget.allocatedMicroUsd, 4048);
});
stageTest('cancel between stages revokes the receipt and never refunds count uncertainty', async x => {
  const s = x.create(), { result } = await x.count(s); cancel(s); x.tick();
  assert.equal(manual.isManualLabCountResult(result), false); assert.throws(() => x.advance(s, result), /MANUAL_COUNT_REQUIRED/);
  assert.equal(inspect(s).budget.uncertainMicroUsd, 4048); assert.equal(inspect(s).simulatedPosts, 0);
});
stageTest('cancel during count rejects a late count without receipt or revival', async x => {
  const s = x.create(), transcript = events('{"object":"response.input_tokens","input_tokens":8000}'); transcript[0].delayMs = 1000;
  const i = x.generation(s, { events: transcript }), pending = manual.runManualLabCount(i);
  cancel(s); blocked(await pending, 'INFERENCE_CANCELLED');
  assert.equal(inspect(s).budget.uncertainMicroUsd, 4048); assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(s).cleanup, 'REMOVED');
});
stageTest('cancel during generation retains both independent reservations', async x => {
  const s = x.create(), { result } = await x.count(s); x.tick(); x.advance(s, result);
  const transcript = events(JSON.stringify(response(s))); transcript[0].delayMs = 1000;
  const pending = run(x.generation(s, { events: transcript })); cancel(s); blocked(await pending, 'INFERENCE_CANCELLED');
  assert.equal(inspect(s).budget.uncertainMicroUsd, 8096); assert.equal(inspect(s).budget.allocatedMicroUsd, 8096);
});
for (const stage of ['COUNT', 'GENERATION']) for (const status of [429, 307, 503]) stageTest(`${stage} HTTP ${status} closes with no retry/redirect`, async x => {
  const s = x.create(); let result;
  if (stage === 'COUNT') ({ result } = await x.count(s, 8000, { events: events('untrusted error', status) }));
  else { const counted = await x.count(s); x.tick(); x.advance(s, counted.result); result = await run(x.generation(s, { events: events('untrusted error', status) })); }
  blocked(result); assert.equal(inspect(s).phase, 'CLOSED'); assert.equal(inspect(s).cleanup, 'REMOVED');
  assert.equal(inspect(s).countPosts, 1); assert.equal(inspect(s).simulatedPosts, stage === 'COUNT' ? 0 : 1);
  assert.equal(inspect(s).budget.uncertainMicroUsd, stage === 'COUNT' ? 4048 : 8096);
});
for (const stage of ['COUNT', 'GENERATION']) stageTest(`${stage} timeout cannot trigger the next stage or refund`, async x => {
  const s = x.create(), transcript = [{ type: 'timeout', delayMs: 0 }, { type: 'end', complete: true, delayMs: 10 }]; let result;
  if (stage === 'COUNT') ({ result } = await x.count(s, 8000, { events: transcript }));
  else { const counted = await x.count(s); x.tick(); x.advance(s, counted.result); result = await run(x.generation(s, { events: transcript })); }
  blocked(result, 'HTTP_TIMEOUT'); assert.equal(inspect(s).budget.uncertainMicroUsd, stage === 'COUNT' ? 4048 : 8096);
});
stageTest('one RPM also blocks a different session and closing cannot reset its cooldown', async x => {
  const s = x.create(), { result } = await x.count(s), other = x.create();
  const i = x.generation(other, { events: events('{"object":"response.input_tokens","input_tokens":8000}') });
  blocked(await manual.runManualLabCount(i), 'MANUAL_RATE_LIMIT'); assert.equal(inspect(other).countPosts, 0);
  cancel(s); blocked(await manual.runManualLabCount(i), 'MANUAL_RATE_LIMIT');
  x.tick(); // Explicit new call after the interval, not an automatic retry or timer.
  const counted = await manual.runManualLabCount(i); assert.equal(counted.status, 'BLOCKED', 'Old 30s A/B/C have expired');
  assert.equal(inspect(other).countPosts, 0); assert.equal(manual.isManualLabCountResult(result), false);
});
stageTest('counted workflow expires while awaiting manual approval', async x => {
  const s = x.create(), { result } = await x.count(s); x.tick(600000);
  assert.throws(() => x.advance(s, result), /MANUAL_SESSION_EXPIRED/);
  assert.equal(inspect(s).cleanup, 'REMOVED'); assert.equal(inspect(s).budget.uncertainMicroUsd, 4048);
});
stageTest('changed source after count invalidates approval and count binding', async x => {
  const s = x.create(), { result } = await x.count(s), source = writes.at(-2).file;
  fs.appendFileSync(source, '\n// changed between count and generation'); x.tick();
  assert.throws(() => x.advance(s, result), /MANUAL_SYNTHETIC_CONTEXT_CHANGED/);
  assert.equal(inspect(s).cleanup, 'REMOVED'); assert.equal(manual.isManualLabCountResult(result), false);
});
for (const [name, mutate, code] of [
  ['tool call', r => { r.output.push({ type: 'function_call', name: 'writer' }); }, 'PROVIDER_TOOL_FORBIDDEN'],
  ['invalid plan', r => { const p = JSON.parse(r.output[0].content[0].text); p.operations[0].value = 'Unauthorized'; r.output[0].content[0].text = JSON.stringify(p); }, 'OPERATION_NOT_ALLOWED']
]) stageTest(`count cannot grant authority to a generation ${name}`, async x => {
  const s = x.create(), { result } = await x.count(s); x.tick(); x.advance(s, result);
  const r = response(s); mutate(r); blocked(await run(x.generation(s, { events: events(JSON.stringify(r)) })), code);
});
for (const patch of [{ real: true }, { verified: true }, { retries: 1 }, { endpoint: 'http://localhost' }, { transport: () => { throw Error('CALLED'); } }]) {
  stageTest('caller flags, URLs and transports cannot activate real count or generation', async x => {
    const s = x.create(), i = x.generation(s, { events: events('{"object":"response.input_tokens","input_tokens":8000}') });
    blocked(await manual.runManualLabCount({ ...i, ...patch }), 'INFERENCE_INPUT_INVALID');
    assert.equal(inspect(s).countPosts, 0); assert.equal(inspect(s).policy.nativeClientEnabled, false);
  });
}
stageTest('count crossing the deadline during decoding cannot publish a late receipt', async x => {
  const s = x.create(), http = compiled('inference-http'), original = http.decodeOfflineInputTokens;
  http.decodeOfflineInputTokens = text => { const value = original(text); x.tick(30001); return value; };
  try {
    const { result } = await x.count(s); blocked(result, 'MANUAL_TIMEOUT');
    assert.equal(manual.isManualLabCountResult(result), false); assert.equal(inspect(s).simulatedPosts, 0);
    assert.equal(inspect(s).budget.uncertainMicroUsd, 4048); assert.equal(inspect(s).cleanup, 'REMOVED');
  } finally { http.decodeOfflineInputTokens = original; }
});

stageTest('AUDIT 208: final plan decoding at the deadline cannot publish a validated result', async x => {
  const s = x.create(), { result } = await x.count(s); x.tick(); x.advance(s, result);
  const json = compiled('fixer-json'), decode = json.decodeFixerJson, launch = launcher.launchFixer;
  let validationFinished = false;
  launcher.launchFixer = async input => { const value = await launch(input); validationFinished = true; return value; };
  json.decodeFixerJson = text => { const value = decode(text); if (validationFinished) x.tick(30000); return value; };
  try {
    const r = await run(x.generation(s, { timeout: 30000 })); blocked(r, 'MANUAL_TIMEOUT');
    assert.equal(manual.isManualLabValidatedResult(r), false); assert.equal(inspect(s).cleanup, 'REMOVED');
  } finally { json.decodeFixerJson = decode; launcher.launchFixer = launch; }
});
stageTest('AUDIT 208: provider decoding at the deadline cannot enter plan validation', async x => {
  const s = x.create(), { result } = await x.count(s); x.tick(); x.advance(s, result);
  const provider = compiled('inference-response'), decode = provider.decodeOfflineResponsesReply, launch = launcher.launchFixer;
  let validations = 0;
  provider.decodeOfflineResponsesReply = input => { const value = decode(input); x.tick(30000); return value; };
  launcher.launchFixer = async input => { validations++; return launch(input); };
  try {
    const r = await run(x.generation(s, { timeout: 30000 })); blocked(r, 'MANUAL_TIMEOUT');
    assert.equal(validations, 0); assert.equal(inspect(s).budget.uncertainMicroUsd, 8096);
  } finally { provider.decodeOfflineResponsesReply = decode; launcher.launchFixer = launch; }
});

for (const [name, body, code] of [
  ['unsafe integer', '{"object":"response.input_tokens","input_tokens":9007199254740993}', 'JSON_MALFORMED'],
  ['numeric overflow', '{"object":"response.input_tokens","input_tokens":1e999}', 'JSON_MALFORMED'],
  ['duplicate field', '{"object":"response.input_tokens","input_tokens":1,"input_tokens":8000}', 'JSON_MALFORMED'],
  ['truncated JSON', '{"object":', 'JSON_MALFORMED'],
  ['wrong envelope', '{"object":"response","input_tokens":8000}', 'TOKEN_COUNT_INVALID']
]) stageTest(`AUDIT 208: ${name} count burns exactly one reservation and no receipt`, async x => {
  const s = x.create(), { result } = await x.count(s, 8000, { events: events(body) }); blocked(result, code);
  assert.equal(manual.isManualLabCountResult(result), false); assert.equal(inspect(s).budget.attempts, 1);
  assert.equal(inspect(s).budget.allocatedMicroUsd, 4048); assert.equal(inspect(s).budget.uncertainMicroUsd, 4048);
  blocked(await manual.runManualLabCount({ session: s }), 'INFERENCE_INPUT_INVALID');
  assert.equal(inspect(s).budget.allocatedMicroUsd, 4048);
});
stageTest('AUDIT 208: 16000 input tokens is accepted through both stages without exceeding simulated TPM', async x => {
  const s = x.create(), { result } = await x.count(s, 16000); assert.equal(result.status, 'LAB_COUNT_VALID');
  x.tick(); x.advance(s, result); const r = response(s); r.usage.input_tokens = 16000; r.usage.total_tokens = 18000;
  const valid = await run(x.generation(s, { events: events(JSON.stringify(r)) })); assert.equal(valid.status, 'LAB_PLAN_VALID');
  assert.equal(inspect(s).budget.knownMicroUsd, 2600); assert.equal(inspect(s).budget.allocatedMicroUsd, 8096);
});
for (const stage of ['COUNT', 'GENERATION']) for (const elapsed of [29999, 30000]) {
  stageTest(`AUDIT 208: ${stage} grants at exact ${elapsed}ms boundary`, async x => {
    const s = x.create();
    if (stage === 'GENERATION') { const { result } = await x.count(s); x.tick(); x.advance(s, result); }
    const i = x.generation(s, { events: stage === 'COUNT' ? events('{"object":"response.input_tokens","input_tokens":8000}') : events(JSON.stringify(response(s))), timeout: 30000 });
    x.tick(elapsed);
    const r = stage === 'COUNT' ? await manual.runManualLabCount(i) : await run(i);
    if (elapsed === 29999) assert.equal(r.status, stage === 'COUNT' ? 'LAB_COUNT_VALID' : 'LAB_PLAN_VALID', JSON.stringify(r));
    else { blocked(r, 'MANUAL_A_REQUIRED'); assert.equal(inspect(s).budget?.allocatedMicroUsd ?? 0, stage === 'COUNT' ? 0 : 4048); }
  });
}
for (const elapsed of [599999, 600000]) stageTest(`AUDIT 208: workflow exact ${elapsed}ms boundary`, async x => {
  const s = x.create(), { result } = await x.count(s); x.tick(elapsed);
  if (elapsed === 600000) { assert.throws(() => x.advance(s, result), /MANUAL_SESSION_EXPIRED/); return; }
  x.advance(s, result); const i = x.generation(s, { timeout: 30000 }); x.tick(1);
  blocked(await run(i), 'MANUAL_SESSION_EXPIRED'); assert.equal(inspect(s).simulatedPosts, 0);
});
for (const shift of [-864000000, 864000000]) stageTest(`AUDIT 208: wall clock shift ${shift} cannot advance RPM or extend TTL`, async (x, t) => {
  const s = x.create(), { result } = await x.count(s), wall = Date.now();
  t.mock.method(Date, 'now', () => wall + shift);
  assert.throws(() => x.advance(s, result), /MANUAL_RATE_LIMIT/);
  x.tick(59999); assert.throws(() => x.advance(s, result), /MANUAL_RATE_LIMIT/);
  x.tick(1); assert.equal(x.advance(s, result).status, 'LAB_GENERATION_READY');
  const i = x.generation(s); x.tick(30000); blocked(await run(i), 'MANUAL_A_REQUIRED');
});
for (const failure of ['error', 'timeout', 'cancel']) stageTest(`AUDIT 208: ${failure} count keeps the project cooldown for other sessions`, async x => {
  const s = x.create(), other = x.create(); let result;
  if (failure === 'cancel') {
    const transcript = events('{"object":"response.input_tokens","input_tokens":8000}'); transcript[0].delayMs = 1000;
    const pending = x.count(s, 8000, { events: transcript }); cancel(s); ({ result } = await pending);
  } else ({ result } = await x.count(s, 8000, { events: [failure === 'error' ? { type: 'error', code: 'DNS', delayMs: 0 } : { type: 'timeout', delayMs: 0 }] }));
  blocked(result); const i = x.generation(other, { events: events('{"object":"response.input_tokens","input_tokens":8000}') });
  blocked(await manual.runManualLabCount(i), 'MANUAL_RATE_LIMIT'); assert.equal(inspect(other).budget, null);
  assert.equal(inspect(s).budget.allocatedMicroUsd, 4048);
});
stageTest('AUDIT 208: simultaneous attempts cannot dispatch a second count in the same module', async x => {
  const s = x.create(), other = x.create(), transcript = events('{"object":"response.input_tokens","input_tokens":8000}');
  const i = x.generation(s, { events: transcript }), j = x.generation(other, { events: transcript });
  transcript[0].delayMs = 1000; // Existing snapshots remain immutable.
  const pending = manual.runManualLabCount(i); blocked(await manual.runManualLabCount(j), 'MANUAL_CONCURRENCY_EXCEEDED');
  assert.equal((await pending).status, 'LAB_COUNT_VALID'); assert.equal(inspect(other).countPosts, 0);
});
stageTest('AUDIT 208: duplicate module loads have independent RPM state (documented live blocker)', async x => {
  const s = x.create(); assert.equal((await x.count(s)).result.status, 'LAB_COUNT_VALID');
  const id = require.resolve(path.join(out, 'scripts/factory-fix/inference-manual.js')), cached = require.cache[id];
  delete require.cache[id]; let otherApi, other;
  try {
    otherApi = require(id); other = otherApi.createManualCountedLabSession();
    const i = inputFor(other, { max: 8096, events: events('{"object":"response.input_tokens","input_tokens":8000}') }, otherApi);
    assert.equal((await otherApi.runManualLabCount(i)).status, 'LAB_COUNT_VALID', 'No global coordination is claimed');
    assert.equal(otherApi.MANUAL_COUNTED_LAB_POLICY.rateCoordinationScope, 'MODULE_INSTANCE_ONLY');
    assert.equal(otherApi.MANUAL_COUNTED_LAB_POLICY.survivesProcessRestart, false);
    assert.equal(otherApi.MANUAL_COUNTED_LAB_POLICY.providerAndOrganizationQuotaVerified, false);
  } finally { if (other) otherApi.cancelManualLabSession(other); require.cache[id] = cached; }
});
for (const point of ['TRANSITION', 'GENERATION']) stageTest(`AUDIT 208: catalog drift before ${point} invalidates the counted context`, async x => {
  const s = x.create(), { result } = await x.count(s), catalog = writes.at(-1).file; x.tick();
  if (point === 'GENERATION') x.advance(s, result);
  fs.appendFileSync(catalog, '\n// changed after count');
  if (point === 'TRANSITION') assert.throws(() => x.advance(s, result), /MANUAL_SYNTHETIC_CONTEXT_CHANGED/);
  else assert.throws(() => x.generation(s), /MANUAL_SYNTHETIC_CONTEXT_CHANGED/);
  assert.equal(inspect(s).simulatedPosts, 0); assert.equal(inspect(s).cleanup, 'REMOVED');
  assert.equal(manual.isManualLabCountResult(result), false);
});
stageTest('AUDIT 208: authentic host request invalidation after count cannot be replaced by public request data', async x => {
  const s = x.create(), { result } = await x.count(s), r = inspect(s).request;
  launcher.invalidateFixRequest(hostRequests.get(r.requestId)); x.tick();
  assert.throws(() => x.advance(s, result), /MANUAL_SYNTHETIC_CONTEXT_CHANGED/);
  assert.equal(inspect(s).simulatedPosts, 0);
});
stageTest('AUDIT 208: transition rejects payload substitution even with an authentic count receipt', async x => {
  const s = x.create(), { result } = await x.count(s); x.tick();
  assert.throws(() => manual.advanceManualLabGeneration({ session: s, countResult: result, frame: { body: '{}' } }), e => e.code === 'INFERENCE_INPUT_INVALID');
  assert.equal(inspect(s).phase, 'COUNTED'); x.advance(s, result);
  assert.throws(() => { inspect(s).countedFrames.inference.body = '{}'; }, TypeError);
  assert.equal((await run(x.generation(s))).status, 'LAB_PLAN_VALID');
});
stageTest('AUDIT 208: both reserves exist before their first simulated transport event', async x => {
  const s = x.create(), receive = adapter.receiveOfflineSingleHttpsExchange, seen = [];
  adapter.receiveOfflineSingleHttpsExchange = (...args) => { const b = inspect(s).budget; seen.push([b.attempts, b.allocatedMicroUsd, b.active]); return receive(...args); };
  try {
    const { result } = await x.count(s); x.tick(); x.advance(s, result); assert.equal((await run(x.generation(s))).status, 'LAB_PLAN_VALID');
    assert.deepEqual(seen, [[1, 4048, 1], [2, 8096, 1]]);
  } finally { adapter.receiveOfflineSingleHttpsExchange = receive; }
});

// Trusted test dependency substitution ONLY: exercise the same counted state
// machine with six authentic host authorizations in owned synthetic workspaces.
// No production registration hook or caller-selected manual context is added.
for (const operator of ['UPDATE_VALUE', 'ADD_PROPERTY', 'ADD_ELEMENT', 'REMOVE_PROPERTY', 'REMOVE_ELEMENT', 'REORDER_ELEMENTS']) {
  stageTest(`AUDIT 208: ${operator} count -> fresh ABC -> original validators -> FixPlan memory`, async x => {
    const f = await import('./inference-fixtures.mjs'), fixtureApi = compiled('inference-manual-fixture');
    await f.fixture(async ctx => {
      const make = {
        UPDATE_VALUE: () => f.update(ctx.snapshot),
        ADD_PROPERTY: () => ({ type: 'ADD_PROPERTY', parentRef: f.refAt(ctx.snapshot, 'empty'), propertyName: 'nota', value: { exact: [0.125, 0.125], texto: 'Texto inventado' }, placement: { mode: 'auto' } }),
        ADD_ELEMENT: () => ({ type: 'ADD_ELEMENT', parentRef: f.refAt(ctx.snapshot, 'values'), value: { nombre: 'C', descripcion: 'Tercero' }, placement: { mode: 'append' } }),
        REMOVE_PROPERTY: () => ({ type: 'REMOVE_PROPERTY', targetRef: f.refAt(ctx.snapshot, 'info', 'count') }),
        REMOVE_ELEMENT: () => ({ type: 'REMOVE_ELEMENT', targetRef: f.refAt(ctx.snapshot, 'values', 1) }),
        REORDER_ELEMENTS: () => ({ type: 'REORDER_ELEMENTS', parentRef: f.refAt(ctx.snapshot, 'values'), order: [...compiled('target-locator').listChildTargets({ snapshot: ctx.snapshot, parentRef: f.refAt(ctx.snapshot, 'values') })].reverse() })
      };
      const request = launcher.createFixRequest(f.hostInput(ctx.snapshot, [make[operator]()], { timeoutMs: 30000 }));
      const source = originalRead(ctx.sourceFile), catalog = originalRead(ctx.catalogFile), createFixture = fixtureApi.createManualSyntheticFixture;
      let closed = false;
      fixtureApi.createManualSyntheticFixture = () => Object.freeze({ request,
        assertData() { assert.deepEqual(originalRead(ctx.sourceFile), source); assert.deepEqual(originalRead(ctx.catalogFile), catalog); },
        close() { if (!closed) { launcher.invalidateFixRequest(request); closed = true; } } });
      try {
        const s = x.create(), { result } = await x.count(s); assert.equal(result.status, 'LAB_COUNT_VALID');
        x.tick(); x.advance(s, result); const r = await run(x.generation(s));
        assert.equal(r.status, 'LAB_PLAN_VALID', JSON.stringify(r)); assert.equal(r.plan.operations[0].operation, operator);
        assert.deepEqual(r.plan, compiled('fixer-json').normalizeFixerData(planFor(request))); assert.equal(manual.isManualLabValidatedResult(r), true);
        assert.equal(r.persistence, 'NOT_ATTEMPTED'); assert.equal(r.sourceWrite, false); assert.equal(r.writeAuthorized, false);
        assert.equal('handoff' in r, false); assert.equal(closed, true);
        assert.deepEqual(originalRead(ctx.sourceFile), source); assert.deepEqual(originalRead(ctx.catalogFile), catalog);
      } finally { fixtureApi.createManualSyntheticFixture = createFixture; if (!closed) launcher.invalidateFixRequest(request); }
    });
  });
}

// Both real modules, one isolated CommonJS closure. Only native IO, TTY and the
// unissued review registry are instrumented IN MEMORY; no test hook is shipped.
function preparedSmokeHarness(x, mode = 'ok') {
  const { EventEmitter } = require('node:events'), vm = require('node:vm');
  const key = 'LAB_FAKE_NATIVE_' + originalRandom(24).toString('hex'), prompts = [], terminalOutput = [], requests = [], sockets = [], sessions = [], permits = [];
  const input = new EventEmitter(); input.isTTY = true; input.isRaw = false;
  input.isPaused = () => true; input.setRawMode = value => { input.isRaw = value;
    if (mode === 'raw-open-error' && value || mode === 'raw-close-error' && !value) throw Error(key);
  }; input.pause = () => {};
  input.resume = () => {
    if (mode === 'resume-error') throw Error(key);
    queueMicrotask(() => mode === 'input-error' ? input.emit('error', Error(key))
      : input.emit('data', Buffer.from(mode === 'key-cancel' ? '\x03' : mode === 'key-overflow' ? 'x'.repeat(257) : key + '\r')));
  };
  const output = { isTTY: true, write: text => { terminalOutput.push(text); if (mode === 'output-error') throw Error(key); return true; } };
  const fakeProcess = { pid: process.pid, stdin: input, stdout: output };
  let dns = 0, closedTerminals = 0, bridgeCalls = 0;
  class Socket extends EventEmitter {
    remoteAddress = mode === 'private' ? '127.0.0.1' : '8.8.8.8'; remotePort = 443; authorized = mode !== 'tls'; encrypted = true;
    getPeerCertificate() { return {}; } destroy() { this.destroyed = true; }
  }
  const cache = new Map();
  const get = name => {
    if (!['inference-manual', 'inference-https-native'].includes(name)) return compiled(name);
    if (cache.has(name)) return cache.get(name).exports;
    const mod = { exports: {} }; cache.set(name, mod);
    const filename = path.join(out, 'scripts/factory-fix', name + '.js');
    const access = name === 'inference-manual' ? '\nmodule.exports.testAccess={runPreparedNativeSmoke,nativeReviews,nativeAttempts};' : '';
    const loader = vm.runInThisContext('(function(exports,require,module,process,setTimeout,clearTimeout,Buffer){' + originalRead(filename, 'utf8') + access + '\n})', { filename: 'smoke-210-offline-' + name, timeout: 1000 });
    const imports = specifier => {
      if (specifier === 'node:readline/promises') return { createInterface() { return {
        async question(label) {
          prompts.push(label);
          if (mode === 'question-error') throw Error(key);
          if (label.includes('A:') && prompts.length === 1) x.tick(60000);
          if (label.includes('TRANSICION')) x.tick(mode === 'early-transition' ? 59999 : 60000);
          if (mode === 'expired' && label.includes('C:')) x.tick(30000);
          if (mode === 'timeout-swap' && label.includes('C:')) x.tick(1000);
          const authority = label.includes('A:') ? 'A' : label.includes('B:') ? 'B' : 'C';
          return mode === 'deny-' + authority || mode === 'deny-generation-' + authority && label.startsWith('GENERATION') ? 'NO' : label.match(/APRUEBO [a-f0-9]{32}/)[0];
        }, close() { closedTerminals++; if (mode === 'question-close-error') throw Error(key); }
      }; } };
      if (specifier === 'node:tls') return { TLSSocket: Socket, rootCertificates: ['FAKE_BUNDLED_CA'],
        checkServerIdentity: () => mode === 'hostname' ? Error(key) : undefined };
      if (specifier === 'node:dns/promises') return { async lookup(host, options) {
        dns++; assert.equal(host, 'api.openai.com'); assert.equal(options.family, 4);
        if (mode === 'dns') throw Error(key);
        return [{ address: '8.8.8.8', family: 4 }];
      } };
      if (specifier === 'node:https') return { request(options, callback) {
        const req = new EventEmitter(); req.destroy = () => { req.destroyed = true; req.socket?.destroy(); };
        req.end = body => {
          assert.equal(options.headers.authorization, 'Bearer ' + key); assert.equal(options.rejectUnauthorized, true);
          assert.equal(options.agent, false); assert.equal(options.hostname, 'api.openai.com');
          const count = options.path.endsWith('/input_tokens'), payload = JSON.parse(body);
          assert.equal(body.includes(key), false); requests.push({ path: options.path, payload });
          const incoming = new EventEmitter(); incoming.destroy = () => { incoming.destroyed = true; };
          incoming.rawHeaders = ['Content-Type', 'application/json']; incoming.complete = true;
          incoming.statusCode = ({ auth: 401, billing: 429, rate: 429, redirect: 307 })[mode] ?? 200;
          callback(incoming);
          if (mode === 'cancel') { get('inference-manual').cancelManualLabSession(sessions.at(-1)); return; }
          if (mode === 'timeout') { x.tick(30000); }
          let reply = count ? { object: 'response.input_tokens', input_tokens: 8000 } : responseForRequest(JSON.parse(payload.input[0].content[0].text));
          if (!count && mode === 'malicious') reply.output.push({ type: 'function_call', name: 'writer' });
          if (!count && mode === 'crossed') { const p = JSON.parse(reply.output[0].content[0].text); p.nonce = 'wrong'; reply.output[0].content[0].text = JSON.stringify(p); }
          if (!count && mode === 'usage') { reply.usage.input_tokens--; reply.usage.total_tokens--; }
          if (mode === 'billing') reply = { error: { code: 'insufficient_quota', message: key } };
          if (mode === 'secret-body') reply = { secret: key };
          const text = mode === 'malformed' ? '{' : mode === 'malformed-secret' ? '{"secret":' + key
            : mode === 'unicode-secret' ? '{"secret":"' + [...key].map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('') + '"}' : JSON.stringify(reply);
          incoming.emit('data', Buffer.from(text)); incoming.emit('end');
          incoming.emit('end'); incoming.emit('data', Buffer.from(key)); // Late events have no effect.
        };
        queueMicrotask(() => { const socket = new Socket(); sockets.push(socket); req.socket = socket; req.emit('socket', socket); socket.emit('secureConnect'); });
        return req;
      } };
      if (specifier === './inference-manual') {
        const api = get('inference-manual');
        return { ...api, consumePreparedManualHttpsAttempt(token, ...args) {
          bridgeCalls++; const p = api.testAccess.nativeAttempts.get(token); if (p) { sessions.push(p.session); permits.push(token); }
          const secret = api.consumePreparedManualHttpsAttempt(token, ...(mode === 'frame-swap' ? [{ ...args[0] }, ...args.slice(1)] : args));
          if (mode === 'consume-fault') throw Error(key);
          return secret;
        } };
      }
      if (specifier === './inference-https-native' && ['signal-swap', 'timeout-swap'].includes(mode)) {
        const api = get('inference-https-native');
        return { ...api, receivePreparedManualHttpsAttempt(permit, frame, count, signal, timeout) {
          return api.receivePreparedManualHttpsAttempt(permit, frame, count,
            mode === 'signal-swap' ? new AbortController().signal : signal, mode === 'timeout-swap' ? 30000 : timeout);
        } };
      }
      if (specifier.startsWith('./')) return get(specifier.slice(2));
      return require(specifier);
    };
    loader(mod.exports, imports, mod, fakeProcess, setTimeout, clearTimeout, Buffer); return mod.exports;
  };
  const api = get('inference-manual'), token = Object.freeze({});
  // Fictitious count allowance 17 is deliberately unrelated to the old 4048.
  // Production has NO setter/issuer for this private host review.
  api.testAccess.nativeReviews.set(token, { projectId: 'proj_LAB_ONLY', countMaximumMicroUsd: 17,
    generationMaximumMicroUsd: 4048, exclusiveProcessId: process.pid, expires: require('node:perf_hooks').performance.now() + 600000 });
  return { api, token, prompts, requests, sessions, sockets, permits, fakeProcess, key,
    native: get('inference-https-native'), review: () => api.testAccess.nativeReviews.get(token),
    run: () => api.testAccess.runPreparedNativeSmoke(token),
    check() {
      assert.equal(input.isRaw, false); assert.equal(closedTerminals, prompts.length);
      assert.equal(terminalOutput.join('').includes(key), false);
      for (const s of new Set(sessions)) { assert.equal(api.inspectManualLabSession(s).cleanup, 'REMOVED'); }
      for (const socket of sockets) assert.equal(socket.destroyed, true);
    }, stats: () => ({ dns, bridgeCalls }) };
}
stageTest('Paso 210: actual manual -> human ABC twice -> native TLS wiring -> FixPlan memory, fake IO only', async x => {
  const h = preparedSmokeHarness(x), r = await h.run();
  assert.equal(r.status, 'LAB_PLAN_VALID', JSON.stringify(r)); assert.equal(r.persistence, 'NOT_ATTEMPTED');
  assert.equal(r.realExecutionEnabled, false); assert.equal(r.writeAuthorized, false); assert.equal('handoff' in r, false);
  assert.equal(h.prompts.length, 7); assert.deepEqual(h.requests.map(r => r.path), ['/v1/responses/input_tokens', '/v1/responses']);
  for (const [key, value] of Object.entries(h.requests[0].payload)) assert.deepEqual(h.requests[1].payload[key], value);
  const budget = h.api.inspectManualLabSession(h.sessions[0]).budget;
  assert.equal(budget.allocatedMicroUsd, 4065); assert.equal(budget.uncertainMicroUsd, 17); assert.equal(budget.knownMicroUsd, 1800);
  await assert.rejects(h.run(), e => e.code === 'RUNTIME_NOT_ISOLATED'); assert.equal(h.requests.length, 2); h.check();
});
for (const [mode, code] of [['dns', 'HTTPS_DNS_FAILED'], ['private', 'HTTPS_ADDRESS_FORBIDDEN'], ['tls', 'HTTPS_TLS_INVALID'],
  ['hostname', 'HTTPS_HOSTNAME_INVALID'], ['auth', 'HTTP_UNAUTHORIZED'], ['billing', 'HTTP_RATE_LIMIT'],
  ['rate', 'HTTP_RATE_LIMIT'], ['redirect', 'HTTP_REDIRECT_FORBIDDEN'], ['timeout', 'MANUAL_TIMEOUT'],
  ['cancel', 'INFERENCE_CANCELLED'], ['malicious', 'PROVIDER_TOOL_FORBIDDEN'], ['crossed', 'CORRELATION_MISMATCH'], ['usage', 'TOKEN_COUNT_INVALID'],
  ['frame-swap', 'RUNTIME_NOT_ISOLATED']]) {
  stageTest(`Paso 210: full native prepared path rejects ${mode}, no retry or authority`, async x => {
    const h = preparedSmokeHarness(x, mode), r = await h.run(); blocked(r, code);
    assert.ok(h.requests.length <= (['malicious', 'crossed', 'usage'].includes(mode) ? 2 : 1));
    assert.equal(JSON.stringify(r).includes(h.key), false); await assert.rejects(h.run(), e => e.code === 'RUNTIME_NOT_ISOLATED'); h.check();
  });
}
for (const mode of ['deny-A', 'deny-B', 'deny-C', 'key-cancel', 'key-overflow']) stageTest(`Paso 210: ${mode} grants no native attempt`, async x => {
  const h = preparedSmokeHarness(x, mode); await assert.rejects(h.run(), /MANUAL_(?:HUMAN_DENIED|CREDENTIAL_(?:CANCELLED|INVALID))/);
  assert.equal(h.stats().dns, 0); assert.equal(h.stats().bridgeCalls, 0); h.check();
});
for (const authority of ['A', 'B', 'C']) stageTest(`Paso 210: second-stage human ${authority} refusal cannot reuse count permissions`, async x => {
  const h = preparedSmokeHarness(x, 'deny-generation-' + authority); await assert.rejects(h.run(), /MANUAL_HUMAN_DENIED/);
  assert.equal(h.requests.length, 1); assert.equal(h.api.inspectManualLabSession(h.sessions[0]).budget.allocatedMicroUsd, 17); h.check();
});
stageTest('Paso 210: explicit transition at 59999ms does not send generation or retry', async x => {
  const h = preparedSmokeHarness(x, 'early-transition'); await assert.rejects(h.run(), /MANUAL_RATE_LIMIT/);
  assert.equal(h.requests.length, 1); h.check();
});
stageTest('Paso 210: elapsed human ceremony cannot reuse expired A', async x => {
  const h = preparedSmokeHarness(x, 'expired'); blocked(await h.run(), 'MANUAL_A_REQUIRED'); assert.equal(h.stats().dns, 0); h.check();
});
stageTest('Paso 210: non TTY and forged review never grant human authority', async x => {
  const h = preparedSmokeHarness(x); await assert.rejects(h.api.testAccess.runPreparedNativeSmoke({ ...h.token }), e => e.code === 'RUNTIME_NOT_ISOLATED');
  assert.equal(h.prompts.length, 0); h.fakeProcess.stdin.isTTY = false;
  await assert.rejects(h.run(), /MANUAL_HUMAN_TTY_REQUIRED/); assert.equal(h.stats().dns, 0); h.check();
});
stageTest('Paso 210: public flags, JSON and lab grants cannot enter the consume-only native bridge', async x => {
  const native = compiled('inference-https-native'), trap = () => { throw Error('UNTRUSTED_PROPERTY_ACCESS'); }, proxy = new Proxy({}, { get: trap });
  const s = x.create(), { i, result } = await x.count(s);
  for (const permit of [{}, { enabled: true, authorized: true }, i.connectivity, i.economic, result, { ...result }]) {
    await assert.rejects(native.receivePreparedManualHttpsAttempt(permit, proxy, true, proxy, 1), e => e.code === 'RUNTIME_NOT_ISOLATED');
  }
  assert.equal(manual.inspectManualNativeSmokePreparation().decision, 'BLOCKED');
  assert.equal(manual.MANUAL_NATIVE_SMOKE_POLICY.countMaximumMicroUsd, null);
  assert.equal(manual.MANUAL_NATIVE_SMOKE_POLICY.operationalReviewIssuer, false);
});
test('Paso 210: separate reviewed generation quote and stage ledger never infer count price or exceed reservations', () => {
  const b = compiled('inference-budget');
  assert.equal(b.manualSmokeGenerationMaximumMicroUsd(), 4048); assert.equal(b.OFFLINE_RATE_CARD.verifiedForBilling, false);
  assert.equal(b.MANUAL_SMOKE_GENERATION_RATES.countPriceMicroUsd, null);
  const budget = b.createManualSmokePreparationBudget({ countMaximumMicroUsd: 17, generationMaximumMicroUsd: 4048, maxBatchMicroUsd: 4065 });
  let r = b.reserveOfflineInference(budget); b.settleOfflineInference(r);
  assert.throws(() => b.settleOfflineInference(r), e => e.code === 'BUDGET_INVALID');
  r = b.reserveOfflineInference(budget); b.settleOfflineInference(r, { inputTokens: 16000, cacheWriteInputTokens: 16000, outputTokens: 4096 });
  const state = b.inspectOfflineInferenceBudget(budget);
  assert.equal(state.accounting, 'PREPARATION_ONLY_NOT_AUTHORIZED'); assert.equal(state.realMoneyReserved, false);
  assert.equal(state.allocatedMicroUsd, 4065); assert.equal(state.knownMicroUsd, 4048); assert.equal(state.uncertainMicroUsd, 17);
  assert.throws(() => b.reserveOfflineInference(budget), e => e.code === 'BUDGET_EXHAUSTED');
});
for (const cap of [16, 4064]) test(`Paso 210: insufficient independent stage cap ${cap} blocks before its reservation`, () => {
  const b = compiled('inference-budget'), budget = b.createManualSmokePreparationBudget({ countMaximumMicroUsd: 17, generationMaximumMicroUsd: 4048, maxBatchMicroUsd: cap });
  if (cap === 4064) b.settleOfflineInference(b.reserveOfflineInference(budget));
  assert.throws(() => b.reserveOfflineInference(budget), e => e.code === 'BUDGET_EXHAUSTED');
  assert.equal(b.inspectOfflineInferenceBudget(budget).allocatedMicroUsd, cap === 16 ? 0 : 17);
});
for (const count of [-1, 0.5, Number.MAX_SAFE_INTEGER, 1000000001]) test(`Paso 210: invalid count allowance ${count} cannot prepare a budget`, () => {
  const b = compiled('inference-budget');
  assert.throws(() => b.createManualSmokePreparationBudget({ countMaximumMicroUsd: count, generationMaximumMicroUsd: 4048, maxBatchMicroUsd: 1000000000 }), e => e.code === 'BUDGET_INVALID');
});
test('Paso 210: usage cannot turn the count allowance into an oversized known charge', () => {
  const b = compiled('inference-budget'), budget = b.createManualSmokePreparationBudget({ countMaximumMicroUsd: 17, generationMaximumMicroUsd: 4048, maxBatchMicroUsd: 4065 });
  const r = b.reserveOfflineInference(budget);
  assert.throws(() => b.settleOfflineInference(r, { inputTokens: 16000, outputTokens: 4096 }), e => e.code === 'BUDGET_USAGE_EXCEEDED');
  assert.equal(b.inspectOfflineInferenceBudget(budget).knownMicroUsd, 0); assert.equal(b.inspectOfflineInferenceBudget(budget).uncertainMicroUsd, 17);
});
stageTest('AUDIT 211: authentic native permit cannot substitute its cancellation signal', async x => {
  const h = preparedSmokeHarness(x, 'signal-swap'); blocked(await h.run(), 'RUNTIME_NOT_ISOLATED');
  assert.equal(h.stats().dns, 0); assert.equal(h.requests.length, 0); h.check();
});
stageTest('AUDIT 211: authentic native permit cannot extend its authorized transport timeout', async x => {
  const h = preparedSmokeHarness(x, 'timeout-swap'); blocked(await h.run(), 'RUNTIME_NOT_ISOLATED');
  assert.equal(h.stats().dns, 0); h.check();
});
stageTest('AUDIT 211: raw terminal setup failure restores mode and removes owned listeners', async x => {
  const h = preparedSmokeHarness(x, 'raw-open-error'); await h.run().catch(() => {});
  assert.equal(h.fakeProcess.stdin.listenerCount('data'), 0); assert.equal(h.fakeProcess.stdin.isRaw, false); h.check();
});
for (const mode of ['question-error', 'question-close-error', 'raw-open-error', 'raw-close-error', 'resume-error', 'input-error', 'output-error']) stageTest(`AUDIT 211: ${mode} never leaks an IO error or leaves credential listeners`, async x => {
  const h = preparedSmokeHarness(x, mode), error = await h.run().then(() => null, error => error);
  assert.ok(error instanceof Error); assert.equal(String(error.stack).includes(h.key), false, 'Secret-bearing error must be redacted');
  assert.equal(h.stats().dns, 0);
  assert.equal(h.fakeProcess.stdin.listenerCount('data'), 0); assert.equal(h.fakeProcess.stdin.listenerCount('end'), 0);
  assert.equal(h.fakeProcess.stdin.listenerCount('error'), 0); h.check();
});
for (const [mode, code] of [['secret-body', 'HTTPS_SECRET_ECHO'], ['unicode-secret', 'HTTPS_SECRET_ECHO'],
  ['malformed-secret', 'HTTPS_SECRET_ECHO'], ['malformed', 'JSON_MALFORMED'], ['consume-fault', 'MANUAL_REJECTED']]) {
  stageTest(`AUDIT 211: ${mode} yields only fixed diagnostics and holds count uncertainty`, async x => {
    const h = preparedSmokeHarness(x, mode), r = await h.run(); blocked(r, code);
    assert.equal(JSON.stringify({ r, prompts: h.prompts }).includes(h.key), false);
    const budget = h.api.inspectManualLabSession(h.sessions[0]).budget;
    assert.equal(budget.allocatedMicroUsd, 17); assert.equal(budget.uncertainMicroUsd, 17); assert.equal(budget.active, 0);
    await assert.rejects(h.native.receivePreparedManualHttpsAttempt(h.permits[0], new Proxy({}, {}), true, new AbortController().signal, 30000), e => e.code === 'RUNTIME_NOT_ISOLATED');
    assert.equal(h.requests.length, mode === 'consume-fault' ? 0 : 1); h.check();
  });
}
for (const [name, mutate] of [['PID', h => { h.review().exclusiveProcessId++; }], ['expired review', h => { h.review().expires = require('node:perf_hooks').performance.now(); }]]) {
  stageTest(`AUDIT 211: ${name} rejects before any human/key/transport access`, async x => {
    const h = preparedSmokeHarness(x); mutate(h); await assert.rejects(h.run(), e => e.code === 'RUNTIME_NOT_ISOLATED');
    assert.equal(h.prompts.length, 0); assert.equal(h.stats().dns, 0); h.check();
  });
}
stageTest('AUDIT 211: review from another project/host closure and copied JSON cannot mint approval', async x => {
  const a = preparedSmokeHarness(x), b = preparedSmokeHarness(x); b.review().projectId = 'proj_OTHER_LAB';
  for (const token of [a.token, JSON.parse(JSON.stringify(b.token)), { projectId: 'proj_OTHER_LAB', approved: true }]) {
    await assert.rejects(b.api.testAccess.runPreparedNativeSmoke(token), e => e.code === 'RUNTIME_NOT_ISOLATED');
  }
  assert.equal(b.prompts.length, 0); assert.equal(b.stats().dns, 0); a.check(); b.check();
});
stageTest('AUDIT 211: native preparation never reads inherited env or argv', async x => {
  const h = preparedSmokeHarness(x); let reads = 0;
  const trap = () => { reads++; throw Error(h.key); };
  Object.defineProperties(h.fakeProcess, { env: { get: trap }, argv: { get: trap } });
  assert.equal((await h.run()).status, 'LAB_PLAN_VALID'); assert.equal(reads, 0); h.check();
});
test('AUDIT 211: TS and compiled production artifacts expose no review issuer, raw client, key reader or test access', async () => {
  const ts = require('typescript');
  for (const name of ['inference-manual', 'inference-https-native']) {
    const source = originalRead(path.join(root, 'scripts/factory-fix', name + '.ts'), 'utf8');
    const js = originalRead(path.join(out, 'scripts/factory-fix', name + '.js'), 'utf8');
    assert.doesNotMatch(source, /nativeReviews\.set|liveCapabilities\.add|process\.(?:env|argv)/);
    assert.doesNotMatch(js, /exports\.(?:runPreparedNativeSmoke|humanApproval|privateTerminalCredential|fixedHttpsRequest|dormantHttpsRequest|nativeReviews|nativeAttempts|testAccess)\s*=/);
    assert.equal((source.match(/runPreparedNativeSmoke\(/g) ?? []).length, name === 'inference-manual' ? 1 : 0);
    const ast = ts.createSourceFile(name, source, ts.ScriptTarget.ES2022, true);
    const exported = ast.statements.filter(s => ts.isFunctionDeclaration(s) && s.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)).map(s => s.name.text);
    for (const forbidden of ['runPreparedNativeSmoke', 'privateTerminalCredential', 'humanApproval', 'fixedHttpsRequest', 'dormantHttpsRequest']) assert.equal(exported.includes(forbidden), false);
    assert.equal(Object.hasOwn(compiled(name), 'testAccess'), false);
  }
  let traps = 0; const trap = () => { traps++; throw Error('TRAP'); };
  for (const token of [Symbol('approval'), new Proxy({}, { get: trap, ownKeys: trap, getPrototypeOf: trap }),
    Object.defineProperty({}, 'approved', { get: trap }), { [Symbol('approval')]: true }]) {
    await assert.rejects(compiled('inference-https-native').receivePreparedManualHttpsAttempt(token, {}, true, {}, 1), e => e.code === 'RUNTIME_NOT_ISOLATED');
  }
  assert.equal(traps, 0);
});
