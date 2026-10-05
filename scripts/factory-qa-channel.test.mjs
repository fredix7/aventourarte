import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, realpathSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';

const outDir = process.env.FACTORY_QA_OUT_DIR;
if (!outDir) throw new Error('Test configuration: FACTORY_QA_OUT_DIR is required.');

const channelPath = path.resolve(outDir, 'scripts/factory-qa-channel.js');
const require = createRequire(import.meta.url);
const { executeFactoryQa } = require(path.resolve(outDir, 'src/app/shared/guide-factory-executor.js'));
const municipal = 'europa/espana/andalucia/cadiz/jerez-de-la-frontera';
const generic = 'europa/dinamarca/copenhague';
const rio = 'america/sudamerica/brasil/rio-de-janeiro';

function invoke(input, entry = channelPath) {
  const child = spawnSync(process.execPath, [entry], {
    input,
    encoding: 'utf8',
    timeout: 15000,
  });
  assert.equal(child.error, undefined);
  assert.equal(child.signal, null);
  assert.equal(child.status, 0);
  assert.equal(child.stderr, '');
  const payload = JSON.parse(child.stdout);
  // Exactamente un JSON compacto y un salto final, sin banners ni logs.
  assert.equal(child.stdout, JSON.stringify(payload) + '\n');
  return payload;
}

function assertFailure(payload, kind) {
  assert.equal(payload.ok, false);
  assert.deepEqual(Object.keys(payload), ['ok', 'error']);
  assert.deepEqual(Object.keys(payload.error), ['kind', 'message']);
  assert.equal(payload.error.kind, kind);
  assert.equal(typeof payload.error.message, 'string');
  assert.ok(payload.error.message.trim().length > 0);
}

for (const [name, guidePath, context] of [
  ['municipal guide', municipal, { scope: 'guide' }],
  ['generic guide', generic, { scope: 'guide' }],
  ['municipal targets', municipal, { scope: 'targets', targets: ['secciones[3].platos[2]'] }],
  ['generic targets', generic, { scope: 'targets', targets: ['secciones[2].itinerario[0]'] }],
  ['empty targets', municipal, { scope: 'targets', targets: [] }],
  ['Rio independently of the viewer', rio, { scope: 'guide' }],
]) {
  test(`preserves the executor result for ${name}`, () => {
    const expected = executeFactoryQa(guidePath, context);
    assert.notEqual(expected, undefined);
    const payload = invoke(JSON.stringify({ guidePath, context }));
    // ok refleja la obtención de execution, independientemente del status QA.
    assert.deepEqual(payload, { ok: true, execution: expected });
  });
}

for (const [name, input] of [
  ['invalid JSON', '{'],
  ['empty stdin', ''],
  ['two requests', '{}\n{}'],
  ['null root', 'null'],
  ['array root', '[]'],
  ['string root', '"guide"'],
  ['number root', '42'],
  ['boolean root', 'true'],
  ['missing guidePath', JSON.stringify({ context: { scope: 'guide' } })],
  ['numeric guidePath', JSON.stringify({ guidePath: 42, context: { scope: 'guide' } })],
  ['null guidePath', JSON.stringify({ guidePath: null, context: { scope: 'guide' } })],
  ['missing context', JSON.stringify({ guidePath: municipal })],
]) {
  test(`rejects malformed transport: ${name}`, () => {
    assertFailure(invoke(input), 'malformed-request');
  });
}

for (const [name, context] of [
  ['null', null],
  ['empty object', {}],
  ['wrong scope', { scope: 'wrong' }],
  ['primitive', 1],
  ['missing targets', { scope: 'targets' }],
  ['invalid target syntax', { scope: 'targets', targets: ['secciones[-1]'] }],
]) {
  test(`delegates invalid context to Factory: ${name}`, () => {
    assertFailure(invoke(JSON.stringify({ guidePath: municipal, context })), 'invalid-context');
  });
}

for (const guidePath of [
  'unknown/guide',
  '',
  ' ' + municipal,
  municipal.toUpperCase(),
  municipal.replaceAll('/', '\\'),
  'Jerez',
]) {
  test(`does not normalize or infer path ${JSON.stringify(guidePath)}`, () => {
    assertFailure(invoke(JSON.stringify({ guidePath, context: { scope: 'guide' } })), 'guide-not-found');
  });
}

test('preserves path resolution precedence over context validation', () => {
  assertFailure(invoke(JSON.stringify({ guidePath: 'unknown/guide', context: null })), 'guide-not-found');
});

test('preserves targets and additional Factory context data without rewriting them', () => {
  const context = { scope: 'targets', targets: ['secciones[03].platos[02]'], extra: 'unchanged' };
  assert.deepEqual(invoke(JSON.stringify({ guidePath: municipal, context })), {
    ok: true,
    execution: executeFactoryQa(municipal, context),
  });
});

test('returns internal when the executor artifact cannot be loaded', () => {
  // Copia aislada del canal, sin executor: fallo real de carga, sin hooks de producción.
  const tempRoot = realpathSync.native(tmpdir());
  const fixture = mkdtempSync(path.join(tempRoot, 'factory-qa-channel-test-'));
  try {
    const scriptsDir = path.join(fixture, 'scripts');
    mkdirSync(scriptsDir);
    const isolatedChannel = path.join(scriptsDir, 'factory-qa-channel.js');
    copyFileSync(channelPath, isolatedChannel);
    assertFailure(invoke(JSON.stringify({ guidePath: municipal, context: { scope: 'guide' } }), isolatedChannel), 'internal');
    // Un envelope inválido se rechaza antes de intentar cargar el executor ausente.
    assertFailure(invoke('{}', isolatedChannel), 'malformed-request');
  } finally {
    const resolvedFixture = realpathSync.native(fixture);
    assert.equal(path.dirname(resolvedFixture), tempRoot);
    assert.ok(path.basename(resolvedFixture).startsWith('factory-qa-channel-test-'));
    rmSync(resolvedFixture, { recursive: true, force: true });
  }
});
