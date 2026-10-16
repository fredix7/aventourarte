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
    operation: a.operation.type, targetId: a.operation.targetRef.targetId, value: a.operation.value, evidence: [] })), unresolvedActionIds: [] };
};
function response(s) {
  return { id: 'resp_manual_lab', object: 'response', created_at: 1792108800, status: 'completed', error: null, incomplete_details: null,
    model: 'gpt-6-luna', store: false, background: false, tools: [], tool_choice: 'none',
    output: [{ id: 'msg_manual_lab', type: 'message', role: 'assistant', status: 'completed',
      content: [{ type: 'output_text', text: JSON.stringify(planFor(inspect(s).request)), annotations: [], logprobs: [] }] }],
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
function inputFor(s, options = {}) {
  const connectivity = manual.authorizeManualLabConnectivity(s), credential = manual.createManualLabCredential(s);
  const projectCredential = manual.authorizeManualLabCredential({ session: s, credential });
  const economic = manual.authorizeManualLabBudget({ session: s, maxAttemptMicroUsd: options.max ?? 4048 });
  const transcript = manual.createManualLabTranscript({ session: s, events: options.events ?? events(JSON.stringify(response(s))) });
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
runTest('manual import graph contains no bootstrap, preflight, native invocation or persistence modules', () => {
  for (const id of moduleGraph) assert.doesNotMatch(id.replaceAll('\\', '/'), /\/(?:inference-bootstrap|inference-preflight|inference-https-native|writer|write-readiness|source-lock|execution)\.js$/);
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
  const allowed = new Set(['typescript', 'node:crypto', 'node:perf_hooks', 'node:fs', 'node:path', 'node:os', 'node:util', 'node:timers/promises']);
  function visit(file) {
    if (visited.has(file)) return; visited.add(file);
    const text = originalRead(file, 'utf8'), ast = ts.createSourceFile(file, text, ts.ScriptTarget.ES2022, true);
    assert.doesNotMatch(file.replaceAll('\\', '/'), /\/(?:guides\/|guide-factory-(?:catalog|executor)\.ts)/);
    for (const statement of ast.statements.filter(ts.isImportDeclaration)) {
      if (statement.importClause?.isTypeOnly) continue;
      const specifier = statement.moduleSpecifier.text;
      assert.doesNotMatch(specifier, /https-native|bootstrap|preflight|writer|readiness|source-lock|git-inspection|child_process|worker_threads|mcp|plugin|factory-qa-(?:channel|invoke)/i);
      if (specifier.startsWith('.')) visit(path.resolve(path.dirname(file), specifier + '.ts'));
      else assert.ok(allowed.has(specifier), 'Unexpected external runtime dependency: ' + specifier);
    }
    function scan(node) {
      if (ts.isCallExpression(node)) assert.equal(/^(?:require|eval|Function|fetch|WebSocket|spawn|execSync|execFile)$/.test(node.expression.getText(ast)), false);
      ts.forEachChild(node, scan);
    }
    scan(ast);
  }
  visit(path.join(root, 'scripts/factory-fix/inference-manual.ts'));
  t.diagnostic('Manual runtime source graph audited: ' + visited.size + ' local modules; no native/privileged entrypoint.');
});
