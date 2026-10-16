import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { randomBytes, createHash } from 'node:crypto';
import path from 'node:path';
import { fixture, hostInput, planFor, refAt, update, compiled, projectRoot } from './inference-fixtures.mjs';

const require = createRequire(import.meta.url);
let sockets = 0, privileges = 0;
const denySocket = () => { sockets++; throw Error('REAL_SOCKET_FORBIDDEN'); };
for (const [module, names] of [['node:https', ['request', 'get']], ['node:http', ['request', 'get']],
  ['node:http2', ['connect']], ['node:net', ['connect', 'createConnection']], ['node:tls', ['connect']],
  ['node:dns', ['lookup', 'resolve']], ['node:dns/promises', ['lookup', 'resolve']], ['node:dgram', ['createSocket']]]) {
  const api = require(module); for (const name of names) api[name] = denySocket;
}
require('node:net').Socket.prototype.connect = denySocket;
globalThis.fetch = denySocket; globalThis.WebSocket = denySocket;
const denyPrivilege = () => { privileges++; throw Error('PRIVILEGED_CAPABILITY_FORBIDDEN'); };
for (const [module, name] of [['writer', 'persistPreparedFix'], ['write-readiness', 'inspectWriteReadiness'], ['source-lock', 'acquireSourceLock']]) compiled(module)[name] = denyPrivilege;
const bootstrap = compiled('inference-bootstrap'), preflight = compiled('inference-preflight');
const broker = compiled('inference-broker'), launcher = compiled('fixer-launcher'), budgets = compiled('inference-budget');
const native = compiled('inference-https-native'), { listChildTargets } = compiled('target-locator');
const secret = 'FAKE_9G_' + randomBytes(24).toString('hex');
after(() => {
  assert.equal(sockets, 0); assert.equal(privileges, 0);
  assert.equal(launcher.getFixerRuntimeStatus().code, 'RUNTIME_NOT_ISOLATED');
  assert.equal(native.DORMANT_HTTPS_CLIENT_POLICY.enabled, false);
});
const sim = (name, run) => test('Phase 9G: ' + name, () => fixture(run));
const newBudget = overrides => budgets.createOfflineInferenceBudget({ maxAttemptMicroUsd: 4048, maxBatchMicroUsd: 4048, maxAttempts: 1, ...overrides });
const config = () => structuredClone(preflight.getOfflinePreflightFixture());
const blocked = result => {
  assert.equal(result.decision, 'BLOCKED'); assert.equal(result.runtimeStatus, 'RUNTIME_NOT_ISOLATED');
  for (const key of ['connectivityGrantIssued', 'projectCredentialGrantIssued', 'economicGrantIssued', 'nativeClientStarted']) assert.equal(result[key], false);
  assert.ok(result.blockers.includes('DURABLE_ATOMIC_BUDGET_LEDGER'));
  assert.equal(JSON.stringify(result).includes(secret), false);
};
let receipt, completedProbeReply;
test('Phase 9G: fixed fresh child drops preloads, TLS, OpenSSL, proxy and unknown environment without inheriting a secret', () => {
  const fakeParent = Object.fromEntries(bootstrap.BOOTSTRAP_POLICY.prohibited.map(k => [k, secret]));
  fakeParent.UNKNOWN_SECRET = secret; fakeParent.Path = secret;
  const clean = bootstrap.buildMinimalBootstrapEnvironment(fakeParent);
  assert.deepEqual(Object.keys(clean), ['NODE_DISABLE_COMPILE_CACHE', ...bootstrap.BOOTSTRAP_POLICY.emptyEnvironment]);
  for (const name of bootstrap.BOOTSTRAP_POLICY.emptyEnvironment) assert.equal(clean[name], '');
  assert.equal(JSON.stringify(clean).includes(secret), false);
  const cp = require('node:child_process'), original = cp.spawnSync;
  let launches = 0;
  cp.spawnSync = (exe, argv, opts) => {
    launches++; assert.equal(exe, require('node:fs').realpathSync.native(process.execPath));
    assert.deepEqual(argv.slice(0, -1), bootstrap.BOOTSTRAP_POLICY.argv);
    assert.equal(opts.shell, false); assert.equal(opts.windowsHide, true); assert.equal(opts.input, '');
    assert.equal(opts.timeout, 10000); assert.equal(opts.maxBuffer, 8192);
    assert.equal(path.dirname(argv.at(-1)), opts.cwd);
    assert.deepEqual(Object.keys(opts.env).sort(), [...bootstrap.BOOTSTRAP_POLICY.environment, ...bootstrap.BOOTSTRAP_POLICY.emptyEnvironment, 'NODE_V8_COVERAGE'].sort());
    assert.equal(Object.hasOwn(opts.env, 'NODE_V8_COVERAGE'), true); assert.equal(opts.env.NODE_V8_COVERAGE, undefined);
    assert.equal(JSON.stringify([argv, opts]).includes(secret), false);
    for (const file of readdirSync(opts.cwd)) {
      const text = readFileSync(path.join(opts.cwd, file), 'utf8');
      assert.equal(text.includes(secret), false);
      if (file === 'bootstrap-probe.cjs') {
        assert.doesNotMatch(text, /import|spawn|fetch|https|Socket|eval/);
        assert.deepEqual([...text.matchAll(/require\('([^']+)'\)/g)].map(m => m[1]), ['node:crypto']);
      }
    }
    assert.equal(readdirSync(opts.cwd).includes('preload-canary.cjs'), true);
    // Node itself propagates coverage unless the own-undefined sentinel exists.
    // Contaminate this test process only, with paths owned by the current fixture.
    const saved = { NODE_OPTIONS: process.env.NODE_OPTIONS, NODE_V8_COVERAGE: process.env.NODE_V8_COVERAGE };
    process.env.NODE_OPTIONS = '--require ' + JSON.stringify(path.join(opts.cwd, 'preload-canary.cjs'));
    process.env.NODE_V8_COVERAGE = path.join(opts.cwd, 'unexpected-coverage');
    let result;
    try { result = original(exe, argv, opts); }
    finally { for (const [key, value] of Object.entries(saved)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; } }
    assert.equal(readdirSync(opts.cwd).includes('unexpected-coverage'), false);
    assert.equal((result.stdout + result.stderr).includes(secret), false);
    completedProbeReply = structuredClone(result);
    return result;
  };
  try { receipt = bootstrap.runOfflineBootstrapLab(); } finally { cp.spawnSync = original; }
  assert.equal(launches, 1);
  const evidence = bootstrap.inspectOfflineBootstrapReceipt(receipt);
  assert.equal(evidence.preloadExecuted, false); assert.equal(evidence.operationalWorkerStarted, false);
  assert.equal(evidence.parentTrust, 'NOT_ATTESTED'); assert.match(evidence.runtimeDigest, /^[a-f0-9]{64}$/);
  assert.equal(Object.isFrozen(evidence), true);
  assert.equal(evidence.sessionBinding, 'PRIVATE_CHALLENGE_AND_CHILD_PID'); assert.ok(evidence.childPid > 0);
});
for (const name of ['environment names', 'environment values', 'runtime version', 'argv', 'fixture drift', 'preload marker', 'timeout']) {
  test('Phase 9G: bootstrap rejects ' + name + ' before issuing a receipt, with sanitized errors', () => {
    const cp = require('node:child_process'), original = cp.spawnSync;
    cp.spawnSync = (exe, argv, opts) => {
      if (name === 'timeout') return { error: Object.assign(Error(secret), { code: 'ETIMEDOUT' }), status: null, signal: 'SIGTERM', stdout: '', stderr: secret };
      const r = original(exe, argv, opts), d = JSON.parse(r.stdout);
      if (name === 'environment names') d.envNames.push('UNEXPECTED_INJECTION');
      if (name === 'environment values') d.envDigest = '0'.repeat(64);
      if (name === 'runtime version') d.version = 'v0.0.0';
      if (name === 'argv') d.argv.push('--require', 'unapproved.cjs');
      if (name === 'fixture drift') writeFileSync(argv.at(-1), '// altered only AFTER fixed probe exited\n');
      if (name === 'preload marker') writeFileSync(path.join(opts.cwd, 'preload-executed'), 'UNEXPECTED_PRELOAD');
      return { ...r, stdout: JSON.stringify(d) };
    };
    try { assert.throws(() => bootstrap.runOfflineBootstrapLab(), e => e.code === 'BOOTSTRAP_FAILED' && !String(e.stack).includes(secret)); }
    finally { cp.spawnSync = original; }
  });
}
for (const [name, value] of [
  ['case collision', { NODE_OPTIONS: '', node_options: '' }], ['case collision allowed', { TEMP: 'a', temp: 'b' }],
  ['control character', { NODE_OPTIONS: '\n' }], ['nonstring', { TEMP: true }], ['oversize', { TEMP: 'x'.repeat(8193) }],
  ['getter', Object.defineProperty({}, 'TEMP', { enumerable: true, get() { throw Error(secret); } })],
  ['proxy', new Proxy({}, { ownKeys() { throw Error(secret); } })]
]) test('Phase 9G: environment rejects ' + name + ' without callbacks or raw error data', () => {
  assert.throws(() => bootstrap.buildMinimalBootstrapEnvironment(value), e => !String(e.stack).includes(secret));
});
test('Phase 9G: caller cannot select executable, flags, environment, cwd or preload', () => {
  assert.throws(() => bootstrap.runOfflineBootstrapLab({ executable: secret, approved: true }), e => e.code === 'BOOTSTRAP_INVALID' && !String(e.stack).includes(secret));
});
for (const name of ['NODE_OPTIONS', 'NODE_TLS_REJECT_UNAUTHORIZED', 'NODE_EXTRA_CA_CERTS', 'NODE_USE_SYSTEM_CA',
  'NODE_DEBUG', 'NODE_V8_COVERAGE', 'NODE_REDIRECT_WARNINGS', 'OPENSSL_CONF', 'SSLKEYLOGFILE', 'HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY', 'NO_PROXY']) {
  test('Phase 9G: allowlist drops contaminated variable ' + name + ' in mixed case', () => {
    assert.equal(Object.keys(bootstrap.buildMinimalBootstrapEnvironment({ [name.toLowerCase()]: secret })).length, 1 + bootstrap.BOOTSTRAP_POLICY.emptyEnvironment.length);
  });
}
function setup(ctx, options = {}) {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot, options.ops, { timeoutMs: 5000 }));
  const projection = broker.createOfflineInferenceProjection({ request });
  const input = { projection, bootstrap: receipt, budget: newBudget(), fixture: config(), ...options.input };
  return { request, input, pass: () => preflight.runOfflinePreflight(input),
    consume: report => preflight.consumeOfflinePreflight({ projection: input.projection, bootstrap: input.bootstrap, budget: input.budget, report }) };
}
sim('deterministic simulated pass issues no operational grants and reserves no money', ctx => {
  const x = setup(ctx), before = budgets.inspectOfflineInferenceBudget(x.input.budget), r = x.pass();
  assert.equal(r.status, 'LAB_PASS'); blocked(r); assert.equal(Object.isFrozen(r), true);
  assert.deepEqual(budgets.inspectOfflineInferenceBudget(x.input.budget), before);
  assert.equal(x.consume(r).status, 'LAB_CONSUMED'); blocked(x.consume(r));
});
sim('rejected lab preflight cannot produce a consumable receipt, handoff or reservation', ctx => {
  const x = setup(ctx, { input: { bootstrap: {} } }), r = x.pass();
  assert.equal(r.status, 'LAB_REJECTED'); blocked(r);
  assert.equal(x.consume(r).status, 'LAB_REJECTED'); assert.equal('handoff' in r, false);
  assert.equal(budgets.inspectOfflineInferenceBudget(x.input.budget).attempts, 0);
});
sim('untrusted accessors and proxies never execute in preflight', ctx => {
  const x = setup(ctx); let callbacks = 0;
  for (const value of [Object.defineProperty({}, 'mode', { enumerable: true, get() { callbacks++; throw Error(secret); } }),
    new Proxy({}, { ownKeys() { callbacks++; throw Error(secret); } })]) {
    const r = preflight.runOfflinePreflight({ ...x.input, fixture: value }); assert.equal(r.status, 'LAB_REJECTED'); blocked(r);
  }
  const hostile = Object.defineProperty({ ...x.input }, 'bootstrap', { enumerable: true, get() { callbacks++; throw Error(secret); } });
  assert.equal(preflight.runOfflinePreflight(hostile).status, 'LAB_REJECTED'); assert.equal(callbacks, 0);
});
for (const [name, mutate] of [
  ['missing host identity', c => { delete c.hostIdentity; }], ['host claim', c => { c.hostIdentity = 'TRUST_ME'; }],
  ['runtime', c => { c.runtimeVersion = 'v0.0.0'; }], ['endpoint', c => { c.endpoint = 'https://attacker.invalid'; }],
  ['count endpoint', c => { c.countEndpoint = 'http://127.0.0.1'; }], ['model', c => { c.model = 'another-model'; }],
  ['TLS', c => { c.tls = 'NO_VERIFICATION'; }], ['DNS', c => { c.dns = 'UNPINNED'; }], ['proxy', c => { c.proxy = 'AUTO'; }],
  ['request limit', c => { c.requestBytes++; }], ['response limit', c => { c.responseBytes++; }],
  ['input tokens', c => { c.inputTokens++; }], ['output tokens', c => { c.outputTokens++; }],
  ['timeout', c => { c.timeoutMs++; }], ['concurrency', c => { c.concurrency++; }],
  ['tools', c => { c.tools = 'SHELL'; }], ['retry', c => { c.retries = 1; }], ['redirect', c => { c.redirects = 1; }],
  ['fallback', c => { c.fallback = true; }], ['missing credential', c => { delete c.credential; }],
  ['unauthorized project', c => { c.credential.project = 'REAL_PROJECT_CLAIM'; }],
  ['not dedicated', c => { c.credential.dedicated = false; }], ['credential secret', c => { c.credential.secret = secret; }],
  ['economic flag', c => { c.economic.approved = true; }], ['fake durable ledger', c => { c.economic.durable = true; }]
]) sim('reject changed or unverified ' + name, ctx => {
  const c = config(); mutate(c); const r = setup(ctx, { input: { fixture: c } }).pass();
  assert.equal(r.status, 'LAB_REJECTED'); blocked(r);
});
for (const [name, input] of [['missing bootstrap', { bootstrap: undefined }], ['forged bootstrap', { bootstrap: {} }],
  ['cloned bootstrap', { bootstrap: structuredClone({}) }], ['missing budget', { budget: undefined }],
  ['missing projection', { projection: undefined }], ['forged projection', { projection: { approved: true } }],
  ['forged budget', { budget: { approved: true, maxBatchMicroUsd: 1000000 } }],
  ['missing policy', { fixture: undefined }], ['flag', { approved: true }], ['public IDs', { grantId: 'allow' }]]) {
  sim('reject ' + name, ctx => { const r = setup(ctx, { input }).pass(); assert.equal(r.status, 'LAB_REJECTED'); blocked(r); });
}
for (const [name, limits] of [['zero attempts', { maxAttempts: 0 }], ['attempt insufficient', { maxAttemptMicroUsd: 4047 }],
  ['batch insufficient', { maxBatchMicroUsd: 4047 }]]) sim('reject budget ' + name, ctx => {
  const r = setup(ctx, { input: { budget: newBudget(limits) } }).pass(); assert.equal(r.status, 'LAB_REJECTED'); blocked(r);
});
sim('active and exhausted simulations reject without granting economic permission', ctx => {
  const b = newBudget(), reservation = budgets.reserveOfflineInference(b);
  let r = setup(ctx, { input: { budget: b } }).pass(); assert.equal(r.status, 'LAB_REJECTED');
  budgets.settleOfflineInference(reservation); r = setup(ctx, { input: { budget: b } }).pass();
  assert.equal(r.status, 'LAB_REJECTED'); blocked(r); assert.equal(budgets.inspectOfflineInferenceBudget(b).uncertainMicroUsd, 4048);
});
sim('one-shot report rejects clone, JSON, public IDs and a forged boolean', ctx => {
  const x = setup(ctx), r = x.pass(); assert.equal(r.status, 'LAB_PASS');
  for (const fake of [structuredClone(r), JSON.parse(JSON.stringify(r)), { approved: true }, {}, x.request, x.input.projection]) {
    const rejected = x.consume(fake); assert.equal(rejected.status, 'LAB_REJECTED'); blocked(rejected);
  }
  assert.equal(x.consume(r).status, 'LAB_CONSUMED'); assert.equal(x.consume(r).status, 'LAB_REJECTED');
});
sim('report cannot be rebound to another authentic request, budget or bootstrap', ctx => {
  for (const key of ['projection', 'budget', 'bootstrap']) {
    const x = setup(ctx), y = setup(ctx), r = x.pass();
    const changed = { projection: x.input.projection, budget: x.input.budget, bootstrap: x.input.bootstrap, report: r };
    changed[key] = key === 'bootstrap' ? {} : y.input[key];
    assert.equal(preflight.consumeOfflinePreflight(changed).status, 'LAB_REJECTED');
    assert.equal(x.consume(r).status, 'LAB_REJECTED');
  }
});
sim('budget change after preflight burns stale report', ctx => {
  const x = setup(ctx), r = x.pass(), reservation = budgets.reserveOfflineInference(x.input.budget);
  budgets.settleOfflineInference(reservation); assert.equal(x.consume(r).status, 'LAB_REJECTED');
});
for (const name of ['source', 'catalog']) sim('reject ' + name + ' drift after simulated preflight', ctx => {
  const x = setup(ctx), r = x.pass(), file = name === 'source' ? ctx.sourceFile : ctx.catalogFile;
  const before = readFileSync(file); writeFileSync(file, Buffer.concat([before, Buffer.from('\n// synthetic drift\n')]));
  assert.equal(x.consume(r).status, 'LAB_REJECTED'); writeFileSync(file, before);
  assert.equal(x.consume(r).status, 'LAB_REJECTED');
});
sim('cancelled preflight and late callback cannot revive a report', async ctx => {
  const x = setup(ctx), r = x.pass(); preflight.cancelOfflinePreflight(r);
  await Promise.resolve(); assert.equal(x.consume(r).status, 'LAB_REJECTED'); blocked(x.consume(r));
});
sim('cancelled authentic request invalidates preflight before and after pass', ctx => {
  const x = setup(ctx), r = x.pass(); broker.cancelOfflineInference(x.input.projection);
  assert.equal(x.consume(r).status, 'LAB_REJECTED'); assert.equal(x.pass().status, 'LAB_REJECTED');
});
sim('two concurrent consumes yield at most one LAB result and zero live activations', async ctx => {
  const x = setup(ctx), r = x.pass(), results = await Promise.all([Promise.resolve().then(() => x.consume(r)), Promise.resolve().then(() => x.consume(r))]);
  assert.deepEqual(results.map(v => v.status).sort(), ['LAB_CONSUMED', 'LAB_REJECTED']); results.forEach(blocked);
});
test('Phase 9G: no-preflight, flags, fake ABC, public IDs or a lab bridge can activate native HTTPS', () => {
  for (const input of [undefined, { approved: true }, { env: { ENABLE_HTTPS: '1' } },
    { connectivity: {}, projectCredential: {}, economic: {} }, { requestId: 'allow', grantId: 'yes' }, { testBridge: true }]) {
    blocked(preflight.inspectOperationalActivation(input));
  }
  assert.deepEqual(Object.keys(native), ['DORMANT_HTTPS_CLIENT_POLICY']);
  assert.equal(preflight.DURABLE_BUDGET_REQUIREMENTS.implemented, false);
  assert.equal(budgets.offlineInferenceReservationMicroUsd(), 4048);
  assert.equal(launcher.getFixerRuntimeStatus().code, 'RUNTIME_NOT_ISOLATED');
});
const events = text => {
  const bytes = Buffer.from(text);
  return [{ type: 'resolved', address: '8.8.8.8', delayMs: 0 }, { type: 'connected', address: '8.8.8.8', hostname: 'api.openai.com', port: 443, authorized: true, encrypted: true, delayMs: 0 },
    { type: 'headers', status: 200, headers: [{ name: 'Content-Type', value: 'application/json' }], delayMs: 0 },
    { type: 'data', bytes: [...bytes], delayMs: 0 }, { type: 'end', complete: true, delayMs: 0 }];
};
const providerReply = request => ({ id: 'resp_9g', object: 'response', created_at: 1792108800, status: 'completed', error: null, incomplete_details: null,
  model: 'gpt-6-luna', store: false, background: false, tools: [], tool_choice: 'none',
  output: [{ id: 'msg_9g', type: 'message', role: 'assistant', status: 'completed', content: [{ type: 'output_text', text: JSON.stringify(planFor(request)), annotations: [], logprobs: [] }] }],
  usage: { input_tokens: 8000, output_tokens: 2000, total_tokens: 10000, input_tokens_details: { cached_tokens: 0 }, output_tokens_details: { reasoning_tokens: 0 } } });
for (const [name, op] of [
  ['UPDATE_VALUE', s => update(s)],
  ['ADD_PROPERTY', s => ({ type: 'ADD_PROPERTY', parentRef: refAt(s, 'empty'), propertyName: 'nota', value: 'Texto útil', placement: { mode: 'auto' } })],
  ['ADD_ELEMENT', s => ({ type: 'ADD_ELEMENT', parentRef: refAt(s, 'values'), value: { nombre: 'C', descripcion: 'Tercero' }, placement: { mode: 'append' } })],
  ['REMOVE_PROPERTY', s => ({ type: 'REMOVE_PROPERTY', targetRef: refAt(s, 'info', 'count') })],
  ['REMOVE_ELEMENT', s => ({ type: 'REMOVE_ELEMENT', targetRef: refAt(s, 'values', 1) })],
  ['REORDER_ELEMENTS', s => ({ type: 'REORDER_ELEMENTS', parentRef: refAt(s, 'values'), order: [...listChildTargets({ snapshot: s, parentRef: refAt(s, 'values') })].reverse() })]
]) sim('E2E simulated preflight + ' + name + ' reaches candidate only in memory', async ctx => {
  const before = readFileSync(ctx.sourceFile), x = setup(ctx, { ops: [op(ctx.snapshot)] }), r = x.pass();
  assert.equal(r.status, 'LAB_PASS'); blocked(r); assert.equal(x.consume(r).status, 'LAB_CONSUMED');
  const text = JSON.stringify(providerReply(x.request)); assert.equal(text.includes(secret), false);
  assert.equal(x.input.projection.serializedBody.includes(secret), false);
  const transport = broker.createOfflineHttpsAdapterTransport({ projection: x.input.projection,
    countEvents: events(JSON.stringify({ object: 'response.input_tokens', input_tokens: 8000 })), responseEvents: events(text) });
  const result = await broker.runOfflineHttpsAdapterInference({ projection: x.input.projection, transport, budget: x.input.budget });
  assert.equal(result.status, 'PROPOSAL_VALID', JSON.stringify(result));
  const prepared = launcher.prepareFixerHandoff({ request: x.request, handoff: result.handoff });
  assert.equal(prepared.status, 'PREPARED'); assert.equal(prepared.preparedResult.diagnostics.persistence, 'NOT_ATTEMPTED');
  assert.deepEqual(readFileSync(ctx.sourceFile), before); blocked(preflight.inspectOperationalActivation(r));
});
test('Phase 9G: bootstrap/preflight have no operational native import, credential store or capability issuer', () => {
  for (const name of ['inference-bootstrap', 'inference-preflight']) {
    const source = readFileSync(path.join(projectRoot, 'scripts/factory-fix', name + '.ts'), 'utf8');
    assert.doesNotMatch(source, /from ['"].*(?:inference-https-native|writer|write-readiness|source-lock)['"]/);
    assert.equal(source.includes(secret), false);
  }
  const contracts = readFileSync(path.join(projectRoot, 'scripts/factory-fix/inference-contracts.ts'), 'utf8');
  for (const type of ['FutureConnectivityGrant', 'FutureProjectCredentialGrant', 'FutureEconomicGrant', 'FutureHostCredentialHandle']) assert.ok(contracts.includes(type));
});

// Host-local fault instrumentation only. No production bridge or capability issuer.
// Synthetic child transcripts do not attest OS isolation or a trustworthy parent.
function auditProbeFault(options) {
  const fs = require('node:fs'), cp = require('node:child_process'), temp = fs.realpathSync.native(require('node:os').tmpdir());
  const saved = Object.fromEntries(['openSync', 'closeSync', 'lstatSync', 'readSync', 'rmdirSync', 'writeFileSync'].map(k => [k, fs[k]]));
  const originalSpawn = cp.spawnSync, exe = fs.realpathSync.native(process.execPath), descriptors = new Map();
  let cwd, rootIdentity, afterSpawn = false, backup, backupIdentity, backing, moved, junctionCreated = false, realFaultObserved = false;
  const capture = file => {
    if (typeof file === 'string' && path.basename(file) === 'bootstrap-probe.cjs' && !cwd) {
      cwd = path.dirname(file); const root = path.dirname(cwd);
      assert.equal(path.dirname(root), temp); assert.ok(path.basename(root).startsWith('factory-fix-phase9-fixture-'));
      rootIdentity = saved.lstatSync(root, { bigint: true });
    }
  };
  const replaceEntry = kind => {
    if (!backup) { backup = fs.mkdtempSync(path.join(temp, 'factory-fix-9g-audit-fixture-')); backupIdentity = saved.lstatSync(backup, { bigint: true }); }
    const entry = path.join(cwd, 'bootstrap-probe.cjs'); backing = path.join(backup, 'identical.cjs');
    fs.copyFileSync(entry, backing); fs.unlinkSync(entry);
    if (kind === 'hardlink') fs.linkSync(backing, entry);
    else if (kind === 'symlink') fs.symlinkSync(backing, entry, 'file');
    else fs.renameSync(backing, entry);
  };
  const syntheticReply = (exe, argv, opts) => {
    const source = readFileSync(argv.at(-1), 'utf8'), match = /session:("[a-f0-9]{64}")/.exec(source);
    const names = Object.keys(opts.env).filter(k => opts.env[k] !== undefined).sort();
    const body = { session: JSON.parse(match[1]), pid: 12345, version: process.version, execPath: exe,
      argv: argv.slice(0, -1), envNames: names, envDigest: createHash('sha256').update(JSON.stringify(names.map(k => [k, opts.env[k]]))).digest('hex'), cwd: opts.cwd };
    return { pid: body.pid, status: 0, signal: null, stderr: '', stdout: JSON.stringify(body) };
  };
  fs.openSync = (file, ...args) => { capture(file); const fd = saved.openSync(file, ...args); descriptors.set(fd, file); return fd; };
  fs.closeSync = fd => { const result = saved.closeSync(fd); descriptors.delete(fd); return result; };
  fs.lstatSync = (file, ...args) => {
    const stat = saved.lstatSync(file, ...args);
    const selected = options.physical === 'fixture-symlink' ? file === path.join(cwd ?? '', 'bootstrap-probe.cjs') && afterSpawn : file === exe;
    if (!selected || !options.physical) return stat;
    const result = Object.assign(Object.create(Object.getPrototypeOf(stat)), stat);
    if (options.physical === 'executable-hardlink') result.nlink = 2n;
    if (options.physical === 'executable-missing-id') result.ino = 0n;
    if (options.physical === 'executable-replaced' && afterSpawn) result.ino += 1n;
    if (options.physical.endsWith('symlink')) result.isSymbolicLink = () => true;
    return result;
  };
  fs.readSync = (fd, ...args) => {
    if (options.readFailure && descriptors.get(fd) === exe) throw Error(secret);
    return saved.readSync(fd, ...args);
  };
  fs.writeFileSync = (file, ...args) => {
    const result = saved.writeFileSync(file, ...args);
    if (options.replaceBeforeLaunch && path.basename(descriptors.get(file) ?? '') === 'preload-canary.cjs') replaceEntry('replacement');
    return result;
  };
  fs.rmdirSync = (file, ...args) => {
    if (options.cleanupFailure && file === cwd) throw Object.assign(Error(secret), { code: 'EIO' });
    return saved.rmdirSync(file, ...args);
  };
  cp.spawnSync = (exe, argv, opts) => {
    assert.equal(opts.killSignal, 'SIGTERM');
    if (options.creationFailure) throw Error(secret);
    if (options.realFault) {
      const entry = argv.at(-1), source = readFileSync(entry, 'utf8'), marker = path.join(opts.cwd, 'preload-executed');
      // Deliberately reproduce the remaining check/CreateProcess gap with ONLY
      // trusted synthetic code and an effect confined to this owned TEMP fixture.
      writeFileSync(entry, options.realFault === 'exit' ? '"use strict";process.exit(23);'
        : `require('node:fs').writeFileSync(${JSON.stringify(marker)},'SYNTHETIC_RACE');\n` + source);
      const result = originalSpawn(exe, argv, opts); afterSpawn = true;
      realFaultObserved = options.realFault === 'exit' ? result.status === 23 : readFileSync(marker, 'utf8') === 'SYNTHETIC_RACE';
      return result;
    }
    const result = syntheticReply(exe, argv, opts); afterSpawn = true;
    if (options.replaceAfterLaunch) replaceEntry(options.replaceAfterLaunch);
    if (options.directoryJunction) {
      moved = path.join(path.dirname(cwd), 'original-probe-directory'); fs.renameSync(cwd, moved);
      fs.symlinkSync(moved, cwd, process.platform === 'win32' ? 'junction' : 'dir'); junctionCreated = true;
    }
    return options.reply ? options.reply(result) : result;
  };
  try {
    assert.throws(() => bootstrap.runOfflineBootstrapLab(), e => e.code === (options.expectedCode ?? 'BOOTSTRAP_FAILED') && !String(e.stack).includes(secret));
    if (options.replaceBeforeLaunch) assert.equal(afterSpawn, false, 'Detected drift before invoking spawn');
    if (options.replaceAfterLaunch === 'hardlink') assert.ok(readFileSync(backing, 'utf8').includes('process.stdout.write'));
    if (options.directoryJunction) assert.equal(junctionCreated, true, 'Actual junction creation must be accredited');
    if (options.realFault) assert.equal(realFaultObserved, true, 'Actual controlled child fault must be observed');
  } finally {
    cp.spawnSync = originalSpawn; for (const [key, value] of Object.entries(saved)) fs[key] = value;
    assert.equal(descriptors.size, 0, 'All host file descriptors closed on rejection');
    if (junctionCreated) { assert.equal(fs.lstatSync(cwd).isSymbolicLink(), true); fs.unlinkSync(cwd); }
    if (moved) fs.renameSync(moved, cwd);
    if (options.replaceAfterLaunch === 'symlink' && fs.lstatSync(path.join(cwd, 'bootstrap-probe.cjs')).isSymbolicLink()) fs.unlinkSync(path.join(cwd, 'bootstrap-probe.cjs'));
    for (const [dir, identity, prefix] of [[cwd && path.dirname(cwd), rootIdentity, 'factory-fix-phase9-fixture-'], [backup, backupIdentity, 'factory-fix-9g-audit-fixture-']]) {
      if (!dir || !fs.existsSync(dir)) continue;
      const resolved = fs.realpathSync.native(dir), stat = fs.lstatSync(dir, { bigint: true });
      assert.equal(resolved, dir); assert.equal(path.dirname(resolved), temp); assert.ok(path.basename(resolved).startsWith(prefix));
      assert.equal(stat.isSymbolicLink(), false); assert.equal(stat.dev, identity.dev); assert.equal(stat.ino, identity.ino);
      fs.rmSync(resolved, { recursive: true, force: true }); // Only these physically verified, test-owned allocations.
    }
  }
}
for (const [label, options] of [
  ['fixture replaced with identical bytes before launch', { replaceBeforeLaunch: true }],
  ['fixture replaced with identical bytes after launch', { replaceAfterLaunch: 'replacement' }],
  ['hardlinked fixture', { replaceAfterLaunch: 'hardlink' }],
  ['symlinked fixture', { replaceAfterLaunch: 'symlink' }], ['actual directory junction', { directoryJunction: true }],
  ...['executable-hardlink', 'executable-missing-id', 'executable-replaced', 'executable-symlink', 'fixture-symlink'].map(physical => [physical + ' metadata (synthetic)', { physical }]),
  ['exception while reading executable', { readFailure: true }], ['process creation exception', { creationFailure: true }],
  ['cleanup exception', { cleanupFailure: true }]
]) test('Phase 9G audit: reject ' + label + ' with no receipt, leaked data or open descriptors', () => auditProbeFault(options));
for (const realFault of ['exit', 'race']) test('Phase 9G audit: actual controlled child ' + realFault + ' rejects receipt and does not attest race-free execution', () => auditProbeFault({ realFault }));
test('Phase 9G audit: replay of a completed authentic child reply is rejected in a new session', () => auditProbeFault({ reply(r) {
  r.stdout = completedProbeReply.stdout; return r;
} }));
test('Phase 9G audit: replay rewritten with current public metadata still lacks the current private challenge', () => auditProbeFault({ reply(r) {
  const current = JSON.parse(r.stdout), old = JSON.parse(completedProbeReply.stdout);
  r.stdout = JSON.stringify({ ...current, session: old.session }); return r;
} }));

for (const [label, mutate, expectedCode] of [
  ['foreign session', (r, d) => { d.session = '0'.repeat(64); }],
  ['foreign child PID', (r, d) => { d.pid++; }], ['inconsistent spawn PID', r => { r.pid++; }],
  ['missing session', (r, d) => { delete d.session; }, 'INFERENCE_INPUT_INVALID'], ['missing child PID', (r, d) => { delete d.pid; }, 'INFERENCE_INPUT_INVALID'],
  ['invalid spawn PID', r => { r.pid = 0; }], ['foreign cwd', (r, d) => { d.cwd += '-another-session'; }],
  ['extra JSON field', (r, d) => { d.approved = true; }, 'INFERENCE_INPUT_INVALID'],
  ['nonzero exit', r => { r.status = 1; }], ['terminated process', r => { r.status = null; r.signal = 'SIGTERM'; }],
  ['stderr data', r => { r.stderr = secret; }],
  ['timeout after complete reply', r => { r.error = Object.assign(Error(secret), { code: 'ETIMEDOUT' }); }]
]) test('Phase 9G audit: reject response with ' + label, () => auditProbeFault({ expectedCode, reply(r) {
  const d = JSON.parse(r.stdout); mutate(r, d); r.stdout = JSON.stringify(d); return r;
} }));
for (const [label, mutate] of [
  ['malformed stdout', r => { r.stdout = '{'; }], ['empty stdout', r => { r.stdout = ''; }],
  ['duplicate messages', r => { r.stdout += '\n' + r.stdout; }],
  ['duplicate JSON keys', r => { r.stdout = r.stdout.replace('{', '{"pid":12345,'); }],
  ['oversized stdout', r => { r.stdout += ' '.repeat(bootstrap.BOOTSTRAP_POLICY.maxOutputBytes); }],
  ['partial reply and timeout', r => { r.stdout = r.stdout.slice(0, 20); r.error = Error(secret); r.status = null; }]
]) test('Phase 9G audit: reject ' + label, () => auditProbeFault({ reply(r) { mutate(r); return r; } }));

for (const source of [{ PATH: '', Path: '' }, { NODE_OPTIONS: '', node_options: '' }, { NODE_V8_COVERAGE: '', node_v8_coverage: '' }]) {
  test('Phase 9G audit: reject duplicate Windows spelling ' + Object.keys(source).join('/'), () => assert.throws(() => bootstrap.buildMinimalBootstrapEnvironment(source)));
}
for (const value of [undefined, '', secret]) test('Phase 9G audit: absent/empty/contaminated variables stay disabled: ' + (value === undefined ? 'absent' : value === '' ? 'empty' : 'contaminated'), () => {
  const source = value === undefined ? {} : Object.fromEntries(bootstrap.BOOTSTRAP_POLICY.prohibited.map(k => [k, value]));
  const result = bootstrap.buildMinimalBootstrapEnvironment(source);
  for (const name of bootstrap.BOOTSTRAP_POLICY.prohibited) assert.equal(Object.hasOwn(result, name), false);
  assert.equal(result.PATH, ''); assert.equal(result.NODE_DISABLE_COMPILE_CACHE, '1');
});
test('Phase 9G audit: other Node behaviour variables cannot enter the allowlist', () => {
  const values = Object.fromEntries(['NODE_REPL_EXTERNAL_MODULE', 'NODE_INSPECT_RESUME_ON_START', 'NODE_COMPILE_CACHE',
    'NODE_PENDING_DEPRECATION', 'NODE_NO_WARNINGS', 'NODE_PRESERVE_SYMLINKS', 'NODE_USE_ENV_PROXY', 'UV_THREADPOOL_SIZE',
    'V8_POOL_SIZE', 'NODE_CHANNEL_FD', 'NODE_CHANNEL_SERIALIZATION_MODE', 'ELECTRON_RUN_AS_NODE'].map(k => [k, secret]));
  const clean = bootstrap.buildMinimalBootstrapEnvironment(values); assert.equal(JSON.stringify(clean).includes(secret), false);
});
sim('audit: policy mutation after LAB_PASS cannot alter immutable request frames or authorize operation', ctx => {
  const x = setup(ctx), r = x.pass(), fixed = preflight.getOfflinePreflightFixture(); assert.equal(r.status, 'LAB_PASS');
  assert.equal(Object.isFrozen(fixed), true); assert.equal(Object.isFrozen(fixed.credential), true); assert.equal(Object.isFrozen(fixed.economic), true);
  assert.throws(() => { fixed.endpoint = 'http://127.0.0.1'; });
  x.input.fixture.endpoint = 'http://127.0.0.1'; x.input.fixture.model = 'another-model';
  const consumed = x.consume(r); assert.equal(consumed.status, 'LAB_CONSUMED'); blocked(consumed);
  assert.equal(broker.inspectOfflineHttpRequests(x.input.projection).inference.hostname, 'api.openai.com');
});
sim('audit: revocation during source freshness inspection rejects preflight', ctx => {
  const x = setup(ctx), fs = require('node:fs'), original = fs.readFileSync; let revoked = false;
  fs.readFileSync = (file, ...args) => { if (file === ctx.sourceFile && !revoked) { revoked = true; launcher.invalidateFixRequest(x.request); } return original(file, ...args); };
  try { const r = x.pass(); assert.equal(revoked, true); assert.equal(r.status, 'LAB_REJECTED'); blocked(r); }
  finally { fs.readFileSync = original; }
});
sim('audit: a request finished by timeout cannot consume a prior preflight', async ctx => {
  const request = launcher.createFixRequest(hostInput(ctx.snapshot, undefined, { timeoutMs: 1 }));
  const projection = broker.createOfflineInferenceProjection({ request }), budget = newBudget();
  const input = { projection, budget, bootstrap: receipt, fixture: config() }, r = preflight.runOfflinePreflight(input);
  assert.equal(r.status, 'LAB_PASS');
  const transport = broker.createOfflineResponsesTransport({ projection, reply: { status: 200, body: '{}', delayMs: 20 } });
  const result = await broker.runOfflineInference({ projection, transport, budget }); assert.equal(result.code, 'TIMEOUT');
  assert.equal(preflight.consumeOfflinePreflight({ projection, budget, bootstrap: receipt, report: r }).status, 'LAB_REJECTED');
  assert.equal(budgets.inspectOfflineInferenceBudget(budget).uncertainMicroUsd, 4048);
});
sim('audit: concurrent cancellation precedes consumption and late completion stays rejected', async ctx => {
  const x = setup(ctx), r = x.pass(); assert.equal(r.status, 'LAB_PASS');
  const results = await Promise.all([Promise.resolve().then(() => preflight.cancelOfflinePreflight(r)), Promise.resolve().then(() => x.consume(r))]);
  assert.equal(results[1].status, 'LAB_REJECTED'); blocked(results[1]); assert.equal(x.consume(r).status, 'LAB_REJECTED');
});
