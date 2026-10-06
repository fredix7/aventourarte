import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  copyFileSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const tempRoot = realpathSync.native(tmpdir());
const prefix = 'factory-guide-catalog-channel-test-';
const resolutionFlags = ['--preserve-symlinks', '--preserve-symlinks-main'];
const require = createRequire(import.meta.url);
let outDir;
let channelPath;
let identityPath;
let listFactoryGuideIdentities;
let resolveFactoryGuideName;

function removeOwnedDirectory(directory) {
  const resolved = realpathSync.native(directory);
  assert.equal(resolved, directory);
  assert.equal(path.dirname(resolved), tempRoot);
  assert.ok(path.basename(resolved).startsWith(prefix));
  rmSync(resolved, { recursive: true, force: true });
}

before(() => {
  const relative = path.relative(projectRoot, tempRoot);
  assert.ok(path.isAbsolute(relative) || relative === '..' || relative.startsWith('..' + path.sep),
    'Compilation output must be outside the project');
  outDir = mkdtempSync(path.join(tempRoot, prefix));
  const compiler = path.join(projectRoot, 'node_modules/typescript/bin/tsc');
  const child = spawnSync(process.execPath, [
    ...resolutionFlags, compiler, '-p', path.join(projectRoot, 'tsconfig.factory-qa.json'),
    '--noEmit', 'false', '--outDir', outDir,
  ], { cwd: projectRoot, encoding: 'utf8', timeout: 60000, env: { NODE_DISABLE_COMPILE_CACHE: '1' } });
  assert.equal(child.error, undefined);
  assert.equal(child.signal, null);
  assert.equal(child.status, 0, child.stdout + child.stderr);
  channelPath = path.join(outDir, 'scripts/factory-guide-catalog-channel.js');
  identityPath = path.join(outDir, 'src/app/shared/guide-factory-catalog-identity.js');
  ({ listFactoryGuideIdentities, resolveFactoryGuideName } = require(identityPath));
}, { timeout: 70000 });

after(() => {
  if (outDir) removeOwnedDirectory(outDir);
});

function invoke(input, entry = channelPath) {
  const child = spawnSync(process.execPath, [...resolutionFlags, entry], {
    input, encoding: 'utf8', timeout: 15000, env: { NODE_DISABLE_COMPILE_CACHE: '1' },
  });
  assert.equal(child.error, undefined);
  assert.equal(child.signal, null);
  assert.equal(child.status, 0);
  assert.equal(child.stderr, '');
  const payload = JSON.parse(child.stdout);
  assert.equal(child.stdout, JSON.stringify(payload) + '\n');
  assert.equal(child.stdout.split('\n').length, 2);
  return payload;
}

function assertFailure(payload, kind) {
  const messages = {
    'malformed-request': 'La petición JSON no tiene el formato requerido.',
    internal: 'No se pudo completar la ejecución del canal de catálogo.',
  };
  assert.deepEqual(payload, { ok: false, error: { kind, message: messages[kind] } });
  assert.deepEqual(Object.keys(payload), ['ok', 'error']);
  assert.deepEqual(Object.keys(payload.error), ['kind', 'message']);
}

test('lists exactly the current domain identities in their original order without leaking content', () => {
  const expected = listFactoryGuideIdentities();
  const payload = invoke(JSON.stringify({ operation: 'list' }));
  assert.deepEqual(payload, { ok: true, entries: expected });
  assert.deepEqual(Object.keys(payload), ['ok', 'entries']);
  payload.entries.forEach(entry => assert.deepEqual(Object.keys(entry), ['path', 'name']));
});

for (const name of [
  'Copenhague', 'COPENHAGUE', ' \tCopenhague\n ', 'Ca\u0301diz',
  'Jerez de la Frontera', 'La Valeta',
]) {
  test(`preserves the domain MATCH for ${JSON.stringify(name)}`, () => {
    const expected = resolveFactoryGuideName(name);
    assert.equal(expected.resolution, 'MATCH');
    const payload = invoke(JSON.stringify({ operation: 'resolve', name }));
    assert.deepEqual(payload, { ok: true, ...expected });
    assert.deepEqual(Object.keys(payload), ['ok', 'resolution', 'entry']);
    assert.deepEqual(Object.keys(payload.entry), ['path', 'name']);
  });
}

for (const name of [
  'Jerez', 'Malta', 'Roma', 'Rio de Janeiro', 'Malmo', 'Cadiz',
  'Sanlucar de Barrameda', 'La  Valeta',
]) {
  test(`returns normal NOT_FOUND for ${JSON.stringify(name)}`, () => {
    const expected = resolveFactoryGuideName(name);
    assert.deepEqual(expected, { resolution: 'NOT_FOUND' });
    const payload = invoke(JSON.stringify({ operation: 'resolve', name }));
    assert.deepEqual(payload, { ok: true, ...expected });
    assert.deepEqual(Object.keys(payload), ['ok', 'resolution']);
  });
}

for (const [name, input] of [
  ['invalid JSON', '{'],
  ['empty stdin', ''],
  ['two requests', '{"operation":"list"}\n{"operation":"list"}'],
  ['null root', 'null'],
  ['array root', '[]'],
  ['string root', '"list"'],
  ['number root', '42'],
  ['boolean root', 'true'],
  ['missing operation', '{}'],
  ['unknown operation', '{"operation":"get"}'],
  ['non-string operation', '{"operation":42}'],
  ['operation only inside prototype data', '{"__proto__":{"operation":"list"}}'],
  ['list with name', '{"operation":"list","name":"Copenhague"}'],
  ['list with extra field', '{"operation":"list","extra":true}'],
  ['resolve without name', '{"operation":"resolve"}'],
  ['resolve with numeric name', '{"operation":"resolve","name":42}'],
  ['resolve with null name', '{"operation":"resolve","name":null}'],
  ['resolve with empty name', '{"operation":"resolve","name":""}'],
  ['resolve with whitespace name', JSON.stringify({ operation: 'resolve', name: ' \t\n ' })],
  ['resolve with extra field', '{"operation":"resolve","name":"Copenhague","extra":true}'],
]) {
  test(`rejects malformed transport: ${name}`, () => {
    assertFailure(invoke(input), 'malformed-request');
  });
}

for (const field of [
  'guidePath', 'context', 'ruleSet', 'aliases', 'options', 'locale', 'fuzzy',
  'target', 'command', 'flags', 'env',
]) {
  test(`rejects the additional protocol field ${field} for both operations`, () => {
    for (const request of [{ operation: 'list' }, { operation: 'resolve', name: 'Copenhague' }]) {
      assertFailure(invoke(JSON.stringify({ ...request, [field]: 'forbidden' })), 'malformed-request');
    }
  });
}

function withIsolatedChannel(run) {
  const fixture = mkdtempSync(path.join(tempRoot, prefix));
  try {
    const scriptsDir = path.join(fixture, 'scripts');
    mkdirSync(scriptsDir);
    const isolatedChannel = path.join(scriptsDir, 'factory-guide-catalog-channel.js');
    copyFileSync(channelPath, isolatedChannel);
    return run(fixture, isolatedChannel);
  } finally {
    removeOwnedDirectory(fixture);
  }
}

test('returns controlled internal for missing identity artifacts and validates before loading', () => {
  withIsolatedChannel((_fixture, isolatedChannel) => {
    assertFailure(invoke('{"operation":"list"}', isolatedChannel), 'internal');
    assertFailure(invoke('{"operation":"resolve","name":"Copenhague"}', isolatedChannel), 'internal');
    assertFailure(invoke('{}', isolatedChannel), 'malformed-request');
    assertFailure(invoke('{"operation":"list","name":"unexpected"}', isolatedChannel), 'malformed-request');
  });
});

test('returns controlled internal for unexpected operation TypeError without leaking its details', () => {
  withIsolatedChannel((fixture, isolatedChannel) => {
    const domainDir = path.join(fixture, 'src/app/shared');
    mkdirSync(domainDir, { recursive: true });
    const message = JSON.stringify('Private fixture path: ' + fixture);
    writeFileSync(path.join(domainDir, 'guide-factory-catalog-identity.js'), `
exports.listFactoryGuideIdentities = () => { throw new TypeError(${message}); };
exports.resolveFactoryGuideName = () => { throw new TypeError(${message}); };
`);
    assertFailure(invoke('{"operation":"list"}', isolatedChannel), 'internal');
    assertFailure(invoke('{"operation":"resolve","name":"Copenhague"}', isolatedChannel), 'internal');
  });
});

test('the compiled runtime graph has only local identity/catalog/guide dependencies and no QA calls', () => {
  const visited = new Set();
  function inspect(module) {
    if (visited.has(module.filename)) return;
    visited.add(module.filename);
    const relative = path.relative(outDir, module.filename);
    assert.ok(!path.isAbsolute(relative) && relative !== '..' && !relative.startsWith('..' + path.sep));
    const source = readFileSync(module.filename, 'utf8');
    assert.doesNotMatch(source, /\b(?:executeFactoryQa|runFactoryQa|FactoryQaResult)\b/);
    const specifiers = [...source.matchAll(/\brequire\(["']([^"']+)["']\)/g)].map(match => match[1]);
    specifiers.forEach(specifier => assert.ok(specifier.startsWith('.'), specifier));
    module.children.forEach(inspect);
  }
  inspect(require.cache[require.resolve(identityPath)]);
  const channelSource = readFileSync(channelPath, 'utf8');
  const imports = [...channelSource.matchAll(/\brequire\(["']([^"']+)["']\)/g)].map(match => match[1]);
  assert.deepEqual(imports, ['../src/app/shared/guide-factory-catalog-identity']);
  assert.doesNotMatch(channelSource, /\b(?:executeFactoryQa|runFactoryQa|FactoryQaResult|console)\b/);
});
