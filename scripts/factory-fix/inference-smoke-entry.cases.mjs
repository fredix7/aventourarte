import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

const require = createRequire(import.meta.url), out = process.env.FACTORY_FIX_OUT_DIR;
assert.ok(out, 'Use inference-smoke-entry.test.mjs: compile to owned TEMP first.');
const compiled = name => require(path.join(out, 'scripts/factory-fix', name + '.js'));
const api = compiled('inference-smoke-entry'), native = compiled('inference-https-native');
const launcher = compiled('fixer-launcher'), operationRef = compiled('modification-scope').operationRef;
const guard = require('./inference-smoke-guard.cjs');
assert.equal(guard.snapshot().laboratoryMutations, 0, 'Importing Factory modules must not allocate/start a smoke');
let network = 0, privileged = 0, processes = 0;
const denyNetwork = () => { network++; throw Error('NETWORK_FORBIDDEN'); };
for (const [name, methods] of [['node:http', ['request', 'get']], ['node:https', ['request', 'get']],
  ['node:http2', ['connect']], ['node:net', ['connect', 'createConnection']], ['node:tls', ['connect']],
  ['node:dns', ['lookup', 'resolve']], ['node:dns/promises', ['lookup', 'resolve']], ['node:dgram', ['createSocket']]]) {
  for (const method of methods) require(name)[method] = denyNetwork;
}
require('node:net').Socket.prototype.connect = denyNetwork;
globalThis.fetch = denyNetwork; globalThis.WebSocket = denyNetwork;
for (const method of ['spawn', 'spawnSync', 'exec', 'execSync', 'execFile', 'execFileSync', 'fork']) {
  require('node:child_process')[method] = () => { processes++; throw Error('PROCESS_FORBIDDEN'); };
}
for (const [name, method] of [['writer', 'persistPreparedFix'], ['write-readiness', 'inspectWriteReadiness'], ['source-lock', 'acquireSourceLock']]) {
  compiled(name)[method] = () => { privileged++; throw Error('PRIVILEGE_FORBIDDEN'); };
}
after(() => { assert.equal(network, 0); assert.equal(privileged, 0); assert.equal(processes, 0); });

let epoch = 0;
const actualNow = performance.now.bind(performance);
const lab = (name, run) => test('AVA-76 offline entry: ' + name, async t => {
  let now = actualNow() + (++epoch) * 2000000;
  t.mock.method(performance, 'now', () => now);
  const owned = [];
  const x = { create() { const e = api.createOfflineSmokeEntry(); owned.push(e); return e; },
    tick(ms = 60000) { now += ms; }, inspect: api.inspectOfflineSmokeEntry,
    prepare(e) { return api.preflightOfflineSmoke(e); },
    input(e, p = api.preflightOfflineSmoke(e), options = {}) {
      const base = { entry: e, preflight: p };
      return { ...base, connectivity: api.approveOfflineSmokeConnectivity(base),
        projectCredential: api.approveOfflineSmokeProject(base),
        economic: api.approveOfflineSmokeBudget({ ...base, simulatedWorkflowMaximumMicroUsd: 8096 }),
        events: events(JSON.stringify(x.inspect(e).stage === 'COUNT' ? countBody() : response(x.inspect(e).request))),
        timeoutMs: 5000, ...options };
    },
    async count(e) { return api.runOfflineSmokeStage(x.input(e)); },
    advance(e, r) { return api.advanceOfflineSmokeGeneration({ entry: e, countResult: r }); } };
  try { await run(x, t); }
  finally {
    for (const entry of owned) { api.cancelOfflineSmokeEntry(entry); assert.equal(x.inspect(entry).cleanup, 'REMOVED'); }
    t.mock.restoreAll();
  }
});
const countBody = () => ({ object: 'response.input_tokens', input_tokens: 8000 });
function response(request) {
  const keys = ['schemaVersion', 'requestId', 'nonce', 'responseId', 'guidePath', 'sourceHash', 'catalogHash',
    'snapshotId', 'snapshotFingerprint', 'targetFingerprint', 'actionFingerprint', 'evidenceFingerprint', 'requestFingerprint'];
  const plan = { ...Object.fromEntries(keys.map(k => [k, request[k]])), operations: request.actions.map(a => ({
    actionId: a.actionId, operation: a.operation.type, targetId: operationRef(a.operation).targetId,
    ...('value' in a.operation ? { value: a.operation.value } : {}), evidence: [] })), unresolvedActionIds: [] };
  return { id: 'resp_offline', object: 'response', created_at: 1792108800, status: 'completed', error: null, incomplete_details: null,
    model: 'gpt-6-luna', store: false, background: false, tools: [], tool_choice: 'none',
    output: [{ id: 'msg_offline', type: 'message', role: 'assistant', status: 'completed',
      content: [{ type: 'output_text', text: JSON.stringify(plan), annotations: [], logprobs: [] }] }],
    usage: { input_tokens: 8000, output_tokens: 2000, total_tokens: 10000,
      input_tokens_details: { cached_tokens: 0 }, output_tokens_details: { reasoning_tokens: 0 } } };
}
function events(body, status = 200) {
  const data = Buffer.from(body);
  return [{ type: 'resolved', address: '8.8.8.8', delayMs: 0 },
    { type: 'connected', address: '8.8.8.8', hostname: 'api.openai.com', port: 443, authorized: true, encrypted: true, delayMs: 0 },
    { type: 'headers', status, headers: [{ name: 'Content-Type', value: 'application/json' },
      { name: 'Content-Length', value: String(data.length) }], delayMs: 0 },
    { type: 'data', bytes: [...data], delayMs: 0 }, { type: 'end', complete: true, delayMs: 0 }];
}
function blocked(r, code) {
  assert.equal(r.status, 'BLOCKED', JSON.stringify(r)); if (code) assert.equal(r.code, code);
  assert.equal('plan' in r, false); assert.equal('handoff' in r, false);
  assert.equal(r.realRequests, 0); assert.equal(r.realInferencePerformed, false);
  assert.equal(r.providerCountPriceMicroUsd, null); assert.equal(r.runtimeStatus, 'RUNTIME_NOT_ISOLATED');
}

lab('explicit preflight + ABC COUNT -> explicit transition -> fresh preflight/ABC GENERATION, memory only', async x => {
  const e = x.create(); assert.equal(x.inspect(e).simulatedCountPosts, 0);
  assert.throws(() => x.prepare(e), /SMOKE_QUIET_PERIOD_REQUIRED/); x.tick();
  const p = x.prepare(e); assert.equal(p.status, 'OFFLINE_PREFLIGHT_PASS'); assert.equal(p.liveDecision, 'BLOCKED');
  const i = x.input(e, p), count = await api.runOfflineSmokeStage(i);
  assert.equal(count.status, 'OFFLINE_COUNT_VALID'); assert.equal('plan' in count, false);
  assert.equal(x.inspect(e).laboratoryBudget.uncertainMicroUsd, 4048);
  assert.equal(x.inspect(e).laboratoryBudget.realMoneyReserved, false);
  const frames = x.inspect(e).frames; x.tick(); x.advance(e, count);
  const result = await api.runOfflineSmokeStage(x.input(e));
  assert.equal(result.status, 'OFFLINE_PLAN_VALID', JSON.stringify(result));
  assert.equal(result.mode, 'LABORATORY_ONLY'); assert.equal(result.io, 'SIMULATED_HTTPS_TRANSCRIPT');
  assert.equal(result.realSpend, 'NOT_INCURRED_OFFLINE'); assert.equal(result.providerCountPriceMicroUsd, null);
  assert.equal(result.billingEvidence, 'UNVERIFIED_NO_PROVIDER_OBSERVATION');
  assert.equal(result.realInferencePerformed, false); assert.equal(result.realRequests, 0);
  assert.equal(result.persistence, 'NOT_ATTEMPTED'); assert.equal(result.writeAuthorized, false);
  assert.equal('handoff' in result, false); assert.equal('preparedResult' in result, false);
  assert.equal(result.plan.operations[0].value, 'Texto inventado autorizado para la visita de prueba.');
  assert.equal(x.inspect(e).cleanup, 'REMOVED'); assert.deepEqual(x.inspect(e).frames, frames);
  assert.equal(x.inspect(e).simulatedCountPosts, 1); assert.equal(x.inspect(e).simulatedGenerationPosts, 1);
  blocked(await api.runOfflineSmokeStage(i));
});

for (const [name, forge] of [['copy', v => ({ ...v })], ['JSON', v => JSON.parse(JSON.stringify(v))],
  ['flag', () => ({ verified: true, live: true })], ['proxy', v => new Proxy(v, { get() { throw Error('TRAP'); } })],
  ['symbol', () => Symbol('grant')], ['null', () => null]]) {
  for (const field of ['entry', 'preflight', 'connectivity', 'projectCredential', 'economic']) {
    lab(`rejects ${name} ${field} before simulated POST`, async x => {
      const e = x.create(); x.tick(); const i = x.input(e); i[field] = forge(i[field]);
      blocked(await api.runOfflineSmokeStage(i)); assert.equal(x.inspect(e).simulatedCountPosts, 0);
    });
  }
}
for (const field of ['preflight', 'connectivity', 'projectCredential', 'economic']) {
  lab(`rejects ${field} belonging to another authentic payload/session`, async x => {
    const e = x.create(), other = x.create(); x.tick(); const i = x.input(e), j = x.input(other); i[field] = j[field];
    blocked(await api.runOfflineSmokeStage(i)); assert.equal(x.inspect(e).simulatedCountPosts, 0);
    if (field === 'preflight') blocked(await api.runOfflineSmokeStage(j));
  });
}
lab('ABC kinds cannot substitute for one another', async x => {
  const e = x.create(); x.tick(); const i = x.input(e); i.projectCredential = i.connectivity;
  blocked(await api.runOfflineSmokeStage(i), 'SMOKE_A_B_C_INVALID');
});
for (const field of ['connectivity', 'projectCredential', 'economic']) {
  lab(`fresh generation preflight cannot reuse COUNT ${field}`, async x => {
    const e = x.create(); x.tick(); const old = x.input(e), c = await api.runOfflineSmokeStage(old);
    x.tick(); x.advance(e, c); const i = x.input(e); i[field] = old[field];
    blocked(await api.runOfflineSmokeStage(i), 'SMOKE_A_B_C_INVALID');
    assert.equal(x.inspect(e).simulatedGenerationPosts, 0);
  });
}
lab('receipt expires even when ABC were issued later', async x => {
  const e = x.create(); x.tick(); const p = x.prepare(e); x.tick(29000); const i = x.input(e, p);
  x.tick(1000); blocked(await api.runOfflineSmokeStage(i), 'SMOKE_PREFLIGHT_INVALID');
  assert.equal(x.inspect(e).simulatedCountPosts, 0);
});
lab('preflight is burned on first rejection and cannot be repaired/replayed', async x => {
  const e = x.create(); x.tick(); const i = x.input(e), forged = { ...i, economic: {} };
  blocked(await api.runOfflineSmokeStage(forged), 'SMOKE_A_B_C_INVALID');
  blocked(await api.runOfflineSmokeStage(i)); assert.equal(x.inspect(e).simulatedCountPosts, 0);
});
lab('COUNT preflight cannot authorize a fresh GENERATION attempt', async x => {
  const e = x.create(); x.tick(); const i = x.input(e), c = await api.runOfflineSmokeStage(i);
  x.tick(); x.advance(e, c); const generation = x.input(e); generation.preflight = i.preflight;
  blocked(await api.runOfflineSmokeStage(generation), 'SMOKE_PREFLIGHT_INVALID');
  assert.equal(x.inspect(e).simulatedGenerationPosts, 0);
});
lab('inspection cannot replace immutable project, stage or payload bindings', x => {
  const e = x.create(), info = x.inspect(e);
  assert.throws(() => { info.project = 'prod'; }, TypeError);
  assert.throws(() => { info.frames.count.body = '{}'; }, TypeError);
  assert.throws(() => { info.request.requestFingerprint = 'forged'; }, TypeError);
  assert.equal(launcher.isHostFixRequest(info.request), false);
});
lab('preflight rejects changed synthetic source before emitting any receipt or ABC', x => {
  const fs = require('node:fs'), previous = fs.mkdtempSync; let owned;
  fs.mkdtempSync = (...args) => { owned = previous(...args); return owned; };
  let e;
  try { e = x.create(); } finally { fs.mkdtempSync = previous; }
  const file = path.join(owned, 'repo con espacios ü/src/app/guides/fixture.guide.ts');
  fs.appendFileSync(file, '\n// synthetic context drift\n'); x.tick();
  assert.throws(() => x.prepare(e), /SMOKE_CONTEXT_CHANGED/);
  assert.equal(x.inspect(e).simulatedCountPosts, 0); assert.equal(x.inspect(e).cleanup, 'REMOVED');
});
lab('preflight deadline bounds a later-issued ABC attempt through its await', async x => {
  const e = x.create(); x.tick(); const p = x.prepare(e); x.tick(29990);
  const i = x.input(e, p); i.events[3].delayMs = 100;
  blocked(await api.runOfflineSmokeStage(i), 'TIMEOUT');
});
lab('workflow expiry closes the synthetic fixture', async x => {
  const e = x.create(); x.tick(); const i = x.input(e); x.tick(600000);
  blocked(await api.runOfflineSmokeStage(i), 'SMOKE_PROCESS_OR_EXPIRY_INVALID');
});
lab('PID change cannot consume a prepared authorization', async (x, t) => {
  const e = x.create(); x.tick(); const i = x.input(e), descriptor = Object.getOwnPropertyDescriptor(process, 'pid');
  try {
    Object.defineProperty(process, 'pid', { ...descriptor, value: process.pid + 1 });
    blocked(await api.runOfflineSmokeStage(i), 'SMOKE_PROCESS_OR_EXPIRY_INVALID');
  } finally { Object.defineProperty(process, 'pid', descriptor); }
});
lab('duplicate preflight and duplicate authority do not refresh lifetime', async x => {
  const e = x.create(); x.tick(); const p = x.prepare(e);
  assert.throws(() => x.prepare(e), /SMOKE_PREFLIGHT_ALREADY_ISSUED/);
  api.approveOfflineSmokeConnectivity({ entry: e, preflight: p });
  assert.throws(() => api.approveOfflineSmokeConnectivity({ entry: e, preflight: p }), /MANUAL_AUTHORITY_ALREADY_ISSUED/);
  assert.equal(x.inspect(e).cleanup, 'REMOVED');
});
lab('early transition closes, never schedules generation', async x => {
  const e = x.create(); x.tick(); const c = await x.count(e); x.tick(59999);
  assert.throws(() => x.advance(e, c), /MANUAL_RATE_LIMIT/);
  x.tick(); assert.equal(x.inspect(e).simulatedGenerationPosts, 0);
  assert.equal(x.inspect(e).cleanup, 'REMOVED');
});
lab('copied COUNT result cannot authorize generation', async x => {
  const e = x.create(); x.tick(); const c = await x.count(e); x.tick();
  assert.throws(() => x.advance(e, { ...c }), /SMOKE_COUNT_RECEIPT_INVALID/);
});
lab('in-flight replay cannot release first attempt ownership or cancel its result', async x => {
  const e = x.create(); x.tick(); const i = x.input(e); i.events[3].delayMs = 10;
  const first = api.runOfflineSmokeStage(i); blocked(await api.runOfflineSmokeStage(i), 'SMOKE_ATTEMPT_ACTIVE');
  assert.equal((await first).status, 'OFFLINE_COUNT_VALID'); assert.equal(x.inspect(e).simulatedCountPosts, 1);
});
lab('explicit cancellation cannot be revived by late transcript', async x => {
  const e = x.create(); x.tick(); const i = x.input(e); i.events[3].delayMs = 20;
  const pending = api.runOfflineSmokeStage(i); api.cancelOfflineSmokeEntry(e);
  blocked(await pending, 'SMOKE_CANCELLED'); assert.equal(x.inspect(e).cleanup, 'REMOVED');
});
lab('PID drift across an await cannot return a valid COUNT receipt', async x => {
  const e = x.create(); x.tick(); const i = x.input(e); i.events[3].delayMs = 15;
  const pending = api.runOfflineSmokeStage(i), descriptor = Object.getOwnPropertyDescriptor(process, 'pid');
  try {
    Object.defineProperty(process, 'pid', { ...descriptor, value: process.pid + 1 });
    blocked(await pending, 'SMOKE_PROCESS_OR_EXPIRY_INVALID');
  } finally { Object.defineProperty(process, 'pid', descriptor); }
});
lab('real timer timeout closes with unknown simulated COUNT reservation held', async x => {
  const e = x.create(); x.tick(); const i = x.input(e); i.timeoutMs = 5; i.events[3].delayMs = 80;
  blocked(await api.runOfflineSmokeStage(i), 'TIMEOUT');
  assert.equal(x.inspect(e).laboratoryBudget.uncertainMicroUsd, 4048);
});
for (const timeout of [0, -1, 30001, 0.5, NaN, '5']) lab(`invalid timeout ${timeout} sends nothing`, async x => {
  const e = x.create(); x.tick(); const i = x.input(e); i.timeoutMs = timeout;
  blocked(await api.runOfflineSmokeStage(i), 'SMOKE_TIMEOUT_INVALID'); assert.equal(x.inspect(e).simulatedCountPosts, 0);
});
for (const status of [301, 400, 401, 403, 429, 500]) lab(`HTTP ${status} is inert transcript data; no retry`, async x => {
  const e = x.create(); x.tick(); const i = x.input(e); i.events = events('{}', status);
  blocked(await api.runOfflineSmokeStage(i)); assert.equal(x.inspect(e).simulatedCountPosts, 1);
  blocked(await api.runOfflineSmokeStage(i)); assert.equal(x.inspect(e).simulatedCountPosts, 1);
});
for (const kind of ['tool', 'correlation', 'usage', 'malformed', 'oversizedCount']) lab(`rejects ${kind} without writing a plan`, async x => {
  const e = x.create(); x.tick();
  if (kind === 'oversizedCount') {
    const i = x.input(e); i.events = events(JSON.stringify({ ...countBody(), input_tokens: 16001 }));
    blocked(await api.runOfflineSmokeStage(i)); return;
  }
  const c = await x.count(e); x.tick(); x.advance(e, c); const i = x.input(e), body = response(x.inspect(e).request);
  if (kind === 'tool') body.output.push({ type: 'function_call' });
  if (kind === 'correlation') { const plan = JSON.parse(body.output[0].content[0].text); plan.nonce = 'wrong'; body.output[0].content[0].text = JSON.stringify(plan); }
  if (kind === 'usage') { body.usage.input_tokens--; body.usage.total_tokens--; }
  i.events = events(kind === 'malformed' ? '{' : JSON.stringify(body)); blocked(await api.runOfflineSmokeStage(i));
});
for (const field of ['live', 'apiKey', 'projectId', 'transport', 'endpoint', 'writer', 'env', 'testMode']) lab(`rejects extra ${field} authority`, async x => {
  const e = x.create(); x.tick(); const i = x.input(e); i[field] = () => { throw Error('CALLBACK'); };
  blocked(await api.runOfflineSmokeStage(i), 'INFERENCE_INPUT_INVALID'); assert.equal(x.inspect(e).simulatedCountPosts, 0);
});
lab('getters and proxy traps in entry envelopes never execute', async x => {
  const e = x.create(); x.tick(); const i = x.input(e); let calls = 0;
  Object.defineProperty(i, 'events', { enumerable: true, get() { calls++; throw Error('TRAP'); } });
  blocked(await api.runOfflineSmokeStage(i), 'INFERENCE_INPUT_INVALID');
  blocked(await api.runOfflineSmokeStage(new Proxy({}, { ownKeys() { calls++; throw Error('TRAP'); } })), 'INFERENCE_INPUT_INVALID');
  assert.equal(calls, 0);
});
lab('every new capability is rejected by the native consumer before any DNS/socket', async x => {
  const e = x.create(); x.tick(); const p = x.prepare(e), i = x.input(e, p);
  for (const candidate of [e, p, i.connectivity, i.projectCredential, i.economic]) {
    await assert.rejects(native.receivePreparedManualHttpsAttempt(candidate, {}, true, {}, 1), error => error.code === 'RUNTIME_NOT_ISOLATED');
  }
  assert.equal(network, 0); assert.equal(native.DORMANT_HTTPS_CLIENT_POLICY.enabled, false);
  assert.equal(launcher.getFixerRuntimeStatus().code, 'RUNTIME_NOT_ISOLATED');
});
lab('no caller-selected source, project, credentials or executable can create an entry', x => {
  for (const arg of [{ repoRoot: process.cwd() }, { projectId: 'prod' }, { live: true }, () => {}]) {
    assert.throws(() => api.createOfflineSmokeEntry(arg), /SMOKE_SYNTHETIC_ONLY/);
  }
});
lab('entry import graph and source do not add a native issuer or privileged path', x => {
  const fs = require('node:fs'), source = fs.readFileSync(path.join(import.meta.dirname, 'inference-smoke-entry.ts'), 'utf8');
  assert.doesNotMatch(source, /nativeReviews\.set|nativeSessions\.set|liveCapabilities\.add|process\.(?:env|argv)|receivePreparedManualHttpsAttempt\(/);
  const visited = new Set();
  function visit(mod) {
    if (!mod || visited.has(mod.id)) return; visited.add(mod.id);
    assert.doesNotMatch(mod.id.replaceAll('\\', '/'), /\/(?:writer|write-readiness|source-lock|inference-bootstrap|trusted-execution)\.js$/);
    for (const child of mod.children) visit(child);
  }
  visit(require.cache[require.resolve(path.join(out, 'scripts/factory-fix/inference-smoke-entry.js'))]);
  assert.equal(api.OFFLINE_SMOKE_ENTRY_POLICY.liveActivation, 'BLOCKED_SEPARATE_REVIEW_AND_IMPLEMENTATION_REQUIRED');
});

function captureFixture(create) {
  const fs = require('node:fs'), previous = fs.mkdtempSync; let root;
  fs.mkdtempSync = (...args) => { root = previous(...args); return root; };
  try {
    const value = create(), repo = path.join(root, fs.readdirSync(root).find(p => p.startsWith('repo ')));
    return { value, root, repo, source: path.join(repo, 'src/app/guides/fixture.guide.ts'),
      catalog: path.join(repo, 'src/app/shared/guide-factory-catalog.ts') };
  } finally { fs.mkdtempSync = previous; }
}
for (const stage of ['COUNT', 'GENERATION']) for (const target of ['source', 'catalog']) {
  for (const point of ['TRANSPORT', 'DECODE', ...(stage === 'GENERATION' ? ['VALIDATION'] : [])]) {
    lab(`regression: ${stage} ${target} drift at ${point} never publishes success`, async x => {
      const fs = require('node:fs'), fixture = captureFixture(() => x.create()), e = fixture.value;
      x.tick();
      if (stage === 'GENERATION') { const count = await x.count(e); x.tick(); x.advance(e, count); }
      const input = x.input(e), mutate = () => fs.appendFileSync(fixture[target], '\n// TEMP regression drift\n');
      let restore = () => {}, calls = 0;
      try {
        let pending;
        if (point === 'TRANSPORT') {
          input.events[3].delayMs = 25; pending = api.runOfflineSmokeStage(input);
          assert.equal(x.inspect(e).phase, 'RUNNING'); mutate(); calls++;
        } else {
          const module = point === 'VALIDATION' ? launcher : compiled(stage === 'COUNT' ? 'inference-http' : 'inference-response');
          const method = point === 'VALIDATION' ? 'launchFixer' : stage === 'COUNT' ? 'decodeOfflineInputTokens' : 'decodeOfflineResponsesReply';
          const original = module[method]; restore = () => { module[method] = original; };
          module[method] = point === 'VALIDATION' ? async (...args) => {
            const result = await original(...args); assert.equal(result.status, 'PROPOSAL_VALID'); mutate(); calls++; return result;
          } : (...args) => { const result = original(...args); mutate(); calls++; return result; };
          pending = api.runOfflineSmokeStage(input);
        }
        const result = await pending; blocked(result, 'MANUAL_SYNTHETIC_CONTEXT_CHANGED'); assert.equal(calls, 1);
        assert.equal(x.inspect(e).phase, 'CLOSED'); assert.equal(x.inspect(e).cleanup, 'REMOVED');
        assert.equal(x.inspect(e).laboratoryBudget.allocatedMicroUsd, stage === 'COUNT' ? 4048 : 8096);
        assert.ok(x.inspect(e).laboratoryBudget.uncertainMicroUsd >= 4048);
        assert.throws(() => x.advance(e, result), /SMOKE_ENTRY_CLOSED/);
        blocked(await api.runOfflineSmokeStage(input));
      } finally { restore(); }
    });
  }
}
for (const target of ['source', 'catalog']) lab(`regression: ${target} drift between manual COUNT and public receipt is rejected`, async x => {
  const fs = require('node:fs'), manual = compiled('inference-manual'), original = manual.runManualLabCount;
  const fixture = captureFixture(() => x.create()), e = fixture.value; let receipt;
  x.tick(); const input = x.input(e);
  manual.runManualLabCount = async (...args) => {
    const result = await original(...args); assert.equal(result.status, 'LAB_COUNT_VALID'); receipt = result;
    fs.appendFileSync(fixture[target], '\n// TEMP publication-boundary drift\n'); return result;
  };
  try {
    blocked(await api.runOfflineSmokeStage(input), 'SMOKE_CONTEXT_CHANGED');
    assert.equal(manual.isManualLabCountResult(receipt), false);
    assert.equal(x.inspect(e).phase, 'CLOSED'); assert.equal(x.inspect(e).laboratoryBudget.uncertainMicroUsd, 4048);
  } finally { manual.runManualLabCount = original; }
});
lab('regression: expiry during final COUNT revalidation cannot publish a late receipt', async x => {
  const manual = compiled('inference-manual'), run = manual.runManualLabCount, current = manual.assertManualLabSessionCurrent;
  const e = x.create(); x.tick(); const input = x.input(e); let counted = false, receipt;
  manual.runManualLabCount = async (...args) => { receipt = await run(...args); counted = true; return receipt; };
  manual.assertManualLabSessionCurrent = (...args) => { current(...args); if (counted) x.tick(30000); };
  try {
    blocked(await api.runOfflineSmokeStage(input), 'SMOKE_PROCESS_OR_EXPIRY_INVALID');
    assert.equal(manual.isManualLabCountResult(receipt), false); assert.equal(x.inspect(e).cleanup, 'REMOVED');
  } finally { manual.runManualLabCount = run; manual.assertManualLabSessionCurrent = current; }
});
lab('regression: authentic request revocation during COUNT transport cannot mint a receipt', async x => {
  const original = launcher.createFixRequest; let request;
  launcher.createFixRequest = (...args) => { request = original(...args); return request; };
  let e; try { e = x.create(); } finally { launcher.createFixRequest = original; }
  x.tick(); const input = x.input(e); input.events[3].delayMs = 25;
  const pending = api.runOfflineSmokeStage(input); launcher.invalidateFixRequest(request);
  blocked(await pending, 'MANUAL_SYNTHETIC_CONTEXT_CHANGED');
  assert.equal(x.inspect(e).laboratoryBudget.uncertainMicroUsd, 4048);
});
for (const replacement of ['source', 'source-identical', 'catalog', 'guides-directory', 'app-directory']) {
  test(`AVA-76 cleanup regression: preserve substituted ${replacement}`, t => {
    const fs = require('node:fs'), manual = compiled('inference-manual');
    const fixture = captureFixture(() => manual.createManualLabSession()), session = fixture.value;
    const directory = replacement.endsWith('-directory');
    const target = replacement === 'guides-directory' ? path.dirname(fixture.source)
      : replacement === 'app-directory' ? path.join(fixture.repo, 'src/app')
        : replacement === 'catalog' ? fixture.catalog : fixture.source;
    const originalBytes = directory ? null : fs.readFileSync(target), backup = target + '.original';
    fs.renameSync(target, backup);
    if (directory) fs.mkdirSync(target);
    const sentinel = directory ? path.join(target, 'foreign-sentinel.txt') : target;
    const bytes = replacement === 'source-identical' ? originalBytes : Buffer.from('TEMP_REPLACEMENT_NOT_OWNED');
    fs.writeFileSync(sentinel, bytes);
    manual.cancelManualLabSession(session);
    assert.equal(manual.inspectManualLabSession(session).phase, 'CLOSED');
    assert.equal(manual.inspectManualLabSession(session).cleanup, 'BLOCKED');
    assert.deepEqual(fs.readFileSync(sentinel), bytes); assert.equal(fs.existsSync(backup), true);
    manual.cancelManualLabSession(session); assert.deepEqual(fs.readFileSync(sentinel), bytes);
    t.diagnostic('Uncertain TEMP fixture retained without deleting replacements: ' + fixture.root);
  });
}
