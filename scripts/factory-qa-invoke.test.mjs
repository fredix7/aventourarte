import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync,
  realpathSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { invokeFactoryQa, invokeFactoryGuideCatalog } from './factory-qa-invoke.mjs';
import * as launcherExports from './factory-qa-invoke.mjs';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const launcher = path.join(projectRoot, 'scripts/factory-qa-invoke.mjs');
const outDir = process.env.FACTORY_QA_OUT_DIR;
if (!outDir) throw new Error('Test configuration: FACTORY_QA_OUT_DIR is required.');
const preparedChannel = path.resolve(outDir, 'scripts/factory-qa-channel.js');
const preparedCatalogChannel = path.resolve(outDir, 'scripts/factory-guide-catalog-channel.js');
const fixedResolution = ['--preserve-symlinks', '--preserve-symlinks-main'];
const municipal = 'europa/espana/andalucia/cadiz/jerez-de-la-frontera';
const generic = 'europa/dinamarca/copenhague';

function processCall(entry, input, { cwd = projectRoot, env = { NODE_DISABLE_COMPILE_CACHE: '1' } } = {}) {
  const child = spawnSync(process.execPath, [...fixedResolution, entry], {
    cwd, env, input, encoding: 'utf8', shell: false, timeout: 75000, killSignal: 'SIGKILL',
  });
  assert.equal(child.error, undefined);
  assert.equal(child.signal, null);
  return child;
}

function expectedResponse(input, channel = preparedChannel) {
  const child = spawnSync(process.execPath, [
    '--permission', '--allow-fs-read=' + path.resolve(outDir), ...fixedResolution, channel,
  ], { cwd: outDir, env: { NODE_DISABLE_COMPILE_CACHE: '1' }, input, encoding: 'utf8', timeout: 15000 });
  assert.equal(child.error, undefined);
  assert.equal(child.status, 0);
  assert.equal(child.stderr, '');
  return JSON.stringify(JSON.parse(child.stdout)) + '\n';
}

for (const [name, input] of [
  ['municipal guide', JSON.stringify({ guidePath: municipal, context: { scope: 'guide' } })],
  ['generic guide', JSON.stringify({ guidePath: generic, context: { scope: 'guide' } })],
  ['targets', JSON.stringify({ guidePath: municipal, context: { scope: 'targets', targets: ['secciones[3].platos[2]'] } })],
  ['unknown path', JSON.stringify({ guidePath: 'unknown/guide', context: { scope: 'guide' } })],
  ['invalid context', JSON.stringify({ guidePath: municipal, context: null })],
  ['malformed request', '{'],
]) {
  test(`returns exactly the prepared channel response for ${name}`, () => {
    const result = invokeFactoryQa(input);
    assert.equal(result.stderr, '');
    assert.equal(result.stdout, expectedResponse(input));
  });
}

test('manual entrypoint resolves the real project from another cwd', () => {
  const input = JSON.stringify({ guidePath: generic, context: { scope: 'targets', targets: [] } });
  const child = processCall(launcher, input, { cwd: realpathSync.native(tmpdir()) });
  assert.equal(child.status, 0);
  assert.equal(child.stderr, '');
  assert.equal(child.stdout, expectedResponse(input));
});

function removeOwnedFixture(fixture, root) {
  const resolved = realpathSync.native(fixture);
  assert.equal(path.dirname(resolved), root);
  assert.ok(path.basename(resolved).startsWith('factory-qa-invoke-test-'));
  rmSync(resolved, { recursive: true, force: true });
}

function withFixture(channelSource, run, compilerFailure = false, catalogSource = channelSource) {
  const root = realpathSync.native(tmpdir());
  const fixture = mkdtempSync(path.join(root, 'factory-qa-invoke-test-'));
  try {
    mkdirSync(path.join(fixture, 'scripts'));
    mkdirSync(path.join(fixture, 'node_modules/typescript/bin'), { recursive: true });
    copyFileSync(launcher, path.join(fixture, 'scripts/factory-qa-invoke.mjs'));
    writeFileSync(path.join(fixture, 'scripts/catalog-host.mjs'), `
import { invokeFactoryGuideCatalog } from './factory-qa-invoke.mjs';
let input = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) input += chunk;
const result = invokeFactoryGuideCatalog(input);
process.stdout.write(result.stdout);
process.stderr.write(result.stderr);
if (result.stderr) process.exitCode = 1;
`);
    writeFileSync(path.join(fixture, 'tsconfig.factory-qa.json'), '{}');
    const compilerSource = `
const fs = require('node:fs');
const path = require('node:path');
const args = process.argv.slice(2);
const out = args[args.indexOf('--outDir') + 1];
fs.writeFileSync(path.join(process.cwd(), 'record.json'), JSON.stringify({
  args, cwd: process.cwd(), out, compiler: process.argv[1],
  envClean: !('NODE_OPTIONS' in process.env) && !('NODE_PATH' in process.env) && !('FACTORY_QA_SECRET_TEST' in process.env),
  compileCacheDisabled: process.env.NODE_DISABLE_COMPILE_CACHE === '1'
}));
${compilerFailure ? 'process.exitCode = 2;' : `fs.mkdirSync(path.join(out, 'scripts'));
fs.writeFileSync(path.join(out, 'scripts/factory-qa-channel.js'), ${JSON.stringify(channelSource)});
${catalogSource === null ? '' : `fs.writeFileSync(path.join(out, 'scripts/factory-guide-catalog-channel.js'), ${JSON.stringify(typeof catalogSource === 'function' ? catalogSource(fixture) : catalogSource)});`}`}
`;
    writeFileSync(path.join(fixture, 'node_modules/typescript/bin/tsc'), compilerSource);
    return run(fixture);
  } finally {
    // Si un assert falla, retirar también el output observado, tras validar su ruta.
    const recordPath = path.join(fixture, 'record.json');
    if (existsSync(recordPath)) {
      const { out } = JSON.parse(readFileSync(recordPath, 'utf8'));
      if (existsSync(out)) {
        const resolvedOut = realpathSync.native(out);
        assert.equal(path.dirname(resolvedOut), root);
        assert.ok(path.basename(resolvedOut).startsWith('aventourarte-factory-qa-invoke-'));
        rmSync(resolvedOut, { recursive: true, force: true });
      }
    }
    removeOwnedFixture(fixture, root);
  }
}

const probeChannel = `
const fs = require('node:fs');
const path = require('node:path');
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  let writeCode, spawnCode;
  try { fs.writeFileSync(path.join(process.cwd(), 'forbidden.txt'), 'fixture'); }
  catch (error) { writeCode = error.code; }
  try { require('node:child_process').spawnSync(process.execPath, ['--version']); }
  catch (error) { spawnCode = error.code; }
  process.stdout.write(JSON.stringify({ok:true,execution:{
    input, envClean: !('NODE_OPTIONS' in process.env) && !('NODE_PATH' in process.env) && !('FACTORY_QA_SECRET_TEST' in process.env),
    compileCacheDisabled: process.env.NODE_DISABLE_COMPILE_CACHE === '1',
    cwdIsOutput: process.cwd() === path.dirname(__dirname), flags: process.execArgv,
    writeCode, spawnCode
  }}) + '\\n');
});`;

test('controls local compiler, cwd, env, fixed permissions, raw input and cleanup', () => {
  withFixture(probeChannel, fixture => {
    const input = ' \n{ "guidePath": " raw/path ", "context": null }\n';
    const child = processCall(path.join(fixture, 'scripts/factory-qa-invoke.mjs'), input, {
      cwd: realpathSync.native(tmpdir()),
      env: {
        NODE_OPTIONS: '--no-warnings', NODE_PATH: 'inert-nonexistent-module-path',
        FACTORY_QA_SECRET_TEST: 'fixture-only',
        PATH: '', NODE_DISABLE_COMPILE_CACHE: '1',
      },
    });
    assert.equal(child.status, 0);
    assert.equal(child.stderr, '');
    const { execution } = JSON.parse(child.stdout);
    assert.equal(execution.input, input);
    assert.equal(execution.envClean, true);
    assert.equal(execution.compileCacheDisabled, true);
    assert.equal(execution.cwdIsOutput, true);
    assert.equal(execution.writeCode, 'ERR_ACCESS_DENIED');
    assert.equal(execution.spawnCode, 'ERR_ACCESS_DENIED');
    const record = JSON.parse(readFileSync(path.join(fixture, 'record.json'), 'utf8'));
    assert.equal(record.cwd, fixture);
    assert.equal(record.compiler, path.join(fixture, 'node_modules/typescript/bin/tsc'));
    assert.equal(record.envClean, true);
    assert.equal(record.compileCacheDisabled, true);
    assert.deepEqual(record.args, [
      '-p', path.join(fixture, 'tsconfig.factory-qa.json'), '--noEmit', 'false', '--outDir', record.out,
    ]);
    assert.deepEqual(execution.flags, ['--permission', '--allow-fs-read=' + record.out, ...fixedResolution]);
    assert.equal(existsSync(record.out), false);
  });
});

for (const [name, channel, compilerFailure, stage] of [
  ['compiler failure', '', true, 'prepare'],
  ['child exit failure', 'process.exitCode = 3;', false, 'execute'],
  ['unexpected stderr', "process.stderr.write('fixture'); process.stdout.write('{}');", false, 'response'],
  ['empty output', '', false, 'response'],
  ['invalid JSON', "process.stdout.write('not JSON');", false, 'response'],
  ['impossible response', "process.stdout.write('null');", false, 'response'],
]) {
  test(`reports ${name} without stack and cleans its output`, () => {
    withFixture(channel, fixture => {
      const child = processCall(path.join(fixture, 'scripts/factory-qa-invoke.mjs'), '{}');
      assert.equal(child.status, 1);
      assert.equal(child.stdout, '');
      const diagnostic = JSON.parse(child.stderr);
      assert.deepEqual(Object.keys(diagnostic), ['ok', 'error']);
      assert.equal(diagnostic.ok, false);
      assert.deepEqual(Object.keys(diagnostic.error), ['kind', 'stage', 'message']);
      assert.equal(diagnostic.error.kind, 'tool-internal');
      assert.equal(diagnostic.error.stage, stage);
      assert.ok(diagnostic.error.message.length > 0);
      const record = JSON.parse(readFileSync(path.join(fixture, 'record.json'), 'utf8'));
      assert.equal(existsSync(record.out), false);
    }, compilerFailure);
  });
}

test('does not hardcode channel error kinds and compacts its JSON', () => {
  withFixture(`process.stdout.write('  {"ok":false,"error":{"kind":"future-kind","message":"fixture"}}  ');`, fixture => {
    const child = processCall(path.join(fixture, 'scripts/factory-qa-invoke.mjs'), '{}');
    assert.equal(child.status, 0);
    assert.equal(child.stderr, '');
    assert.equal(child.stdout, '{"ok":false,"error":{"kind":"future-kind","message":"fixture"}}\n');
  });
});

function generatedFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? generatedFiles(file)
      : /\.(js|tsbuildinfo)$/.test(entry.name) ? [file] : [];
  });
}

test('does not emit files into scripts, shared or guides and compiles working tree sources', () => {
  const locations = ['scripts', 'src/app/shared', 'src/app/guides'].map(dir => path.join(projectRoot, dir));
  const before = locations.flatMap(generatedFiles).sort();
  const result = invokeFactoryQa(JSON.stringify({ guidePath: generic, context: { scope: 'targets', targets: [] } }));
  assert.equal(result.stderr, '');
  assert.deepEqual(locations.flatMap(generatedFiles).sort(), before);
  // La preparación usa el tsconfig y cwd actuales; no ejecuta git ni consulta HEAD.
  const source = readFileSync(launcher, 'utf8');
  assert.ok(source.includes("'-p', path.join(projectRoot, 'tsconfig.factory-qa.json')"));
  assert.ok(!source.includes("from 'git'") && !source.includes('git checkout') && !source.includes('git show'));
});

for (const [name, input, resolution] of [
  ['LIST', '{"operation":"list"}'],
  ['MATCH', '{"operation":"resolve","name":"Copenhague"}', 'MATCH'],
  ['NOT_FOUND', '{"operation":"resolve","name":"Jerez"}', 'NOT_FOUND'],
  ['malformed request', '{}', 'malformed-request'],
]) {
  test(`catalog returns exactly the real channel response for ${name}`, () => {
    const result = invokeFactoryGuideCatalog(input);
    assert.equal(result.stderr, '');
    assert.equal(result.stdout, expectedResponse(input, preparedCatalogChannel));
    const payload = JSON.parse(result.stdout);
    if (resolution === 'malformed-request') {
      assert.equal(payload.ok, false);
      assert.equal(payload.error.kind, resolution);
    } else {
      assert.equal(payload.ok, true);
      if (resolution) assert.equal(payload.resolution, resolution);
      else assert.ok(Array.isArray(payload.entries));
    }
  });
}

function callCatalogFixture(fixture, input, options) {
  return processCall(path.join(fixture, 'scripts/catalog-host.mjs'), input, options);
}

function assertTechnicalFailure(child, stage) {
  assert.equal(child.status, 1);
  assert.equal(child.stdout, '');
  assert.equal(child.stderr, JSON.stringify({
    ok: false,
    error: { kind: 'tool-internal', stage, message: 'No se pudo completar la operación del preparador.' },
  }) + '\n');
}

test('catalog restricts execution, isolates compiler/runtime env, passes raw input and cleans TEMP', () => {
  withFixture('', fixture => {
    const input = ' \n{ "operation": "list", "channel": "qa", "env": {} }\nnot JSON';
    const child = callCatalogFixture(fixture, input, {
      cwd: realpathSync.native(tmpdir()),
      env: {
        NODE_OPTIONS: '--no-warnings', NODE_PATH: 'inert-nonexistent-module-path',
        FACTORY_QA_SECRET_TEST: 'fixture-only', PATH: '', NODE_DISABLE_COMPILE_CACHE: '1',
      },
    });
    assert.equal(child.status, 0);
    assert.equal(child.stderr, '');
    const payload = JSON.parse(child.stdout);
    const probe = JSON.parse(payload.entries[0].path);
    assert.equal(probe.input, input);
    assert.equal(probe.envClean, true);
    assert.equal(probe.compileCacheDisabled, true);
    assert.equal(probe.cwdIsOutput, true);
    for (const code of Object.values(probe.denied)) assert.equal(code, 'ERR_ACCESS_DENIED');
    assert.deepEqual(Object.keys(probe.denied), ['outputWrite', 'otherTempWrite', 'repoRead', 'spawn', 'worker']);
    assert.equal(probe.artifactReadable, true);
    assert.equal(probe.addonsAllowed, false);
    assert.equal(probe.wasiAllowed, false);
    const record = JSON.parse(readFileSync(path.join(fixture, 'record.json'), 'utf8'));
    assert.equal(record.cwd, fixture);
    assert.equal(record.compiler, path.join(fixture, 'node_modules/typescript/bin/tsc'));
    assert.equal(record.envClean, true);
    assert.equal(record.compileCacheDisabled, true);
    assert.deepEqual(record.args, [
      '-p', path.join(fixture, 'tsconfig.factory-qa.json'), '--noEmit', 'false', '--outDir', record.out,
    ]);
    assert.deepEqual(probe.flags, ['--permission', '--allow-fs-read=' + record.out, ...fixedResolution]);
    assert.equal(existsSync(record.out), false);
    assert.equal(existsSync(path.join(fixture, 'forbidden.txt')), false);
  }, false, fixture => `
const fs = require('node:fs');
const path = require('node:path');
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  const denied = {};
  const check = (key, attempt) => { try { attempt(); } catch (error) { denied[key] = error.code; } };
  check('outputWrite', () => fs.writeFileSync(path.join(process.cwd(), 'forbidden.txt'), 'fixture'));
  check('otherTempWrite', () => fs.writeFileSync(${JSON.stringify(path.join(fixture, 'forbidden.txt'))}, 'fixture'));
  check('repoRead', () => fs.readFileSync(${JSON.stringify(path.join(projectRoot, 'AGENTS.md'))}));
  check('spawn', () => require('node:child_process').spawnSync(process.execPath, ['--version']));
  check('worker', () => new (require('node:worker_threads').Worker)('', {eval:true}));
  const probe = {
    input, denied, flags: process.execArgv,
    envClean: !('NODE_OPTIONS' in process.env) && !('NODE_PATH' in process.env) && !('FACTORY_QA_SECRET_TEST' in process.env),
    compileCacheDisabled: process.env.NODE_DISABLE_COMPILE_CACHE === '1',
    cwdIsOutput: process.cwd() === path.dirname(__dirname),
    artifactReadable: fs.readFileSync(__filename, 'utf8').length > 0,
    addonsAllowed: process.permission.has('addons'), wasiAllowed: process.permission.has('wasi')
  };
  process.stdout.write(JSON.stringify({ok:true,entries:[{path:JSON.stringify(probe),name:null}]}) + '\\n');
});`);
});

test('only the two fixed host APIs are exported and CLI selection remains QA', () => {
  assert.deepEqual(Object.keys(launcherExports).sort(), ['invokeFactoryGuideCatalog', 'invokeFactoryQa']);
  const qaSource = 'process.stdout.write(JSON.stringify({ok:true,execution:{channel:"qa"}}));';
  const catalogSource = 'process.stdout.write(JSON.stringify({ok:true,entries:[{path:"catalog",name:null}]}));';
  withFixture(qaSource, fixture => {
    const input = JSON.stringify({ channel: 'catalog', script: 'arbitrary.js', operation: 'list' });
    const qa = processCall(path.join(fixture, 'scripts/factory-qa-invoke.mjs'), input);
    assert.equal(qa.status, 0);
    assert.equal(qa.stderr, '');
    assert.equal(JSON.parse(qa.stdout).execution.channel, 'qa');
    const catalog = callCatalogFixture(fixture, input);
    assert.equal(catalog.status, 0);
    assert.equal(catalog.stderr, '');
    assert.deepEqual(JSON.parse(catalog.stdout).entries, [{ path: 'catalog', name: null }]);
  }, false, catalogSource);
  const source = readFileSync(launcher, 'utf8');
  assert.doesNotMatch(source, /\b(?:listFactoryGuideIdentities|resolveFactoryGuideName|executeFactoryQa|runFactoryQa|Copenhague|Jerez)\b/);
});

for (const [name, source, stage] of [
  ['missing fixed artifact', null, 'execute'],
  ['corrupt fixed artifact', 'this is not JavaScript;', 'execute'],
  ['nonzero exit', 'process.exitCode = 3;', 'execute'],
  ['unexpected stderr', 'process.stderr.write("private fixture"); process.stdout.write("{\\"ok\\":true,\\"entries\\":[]}");', 'response'],
  ['empty stdout', '', 'response'],
  ['invalid JSON', 'process.stdout.write("private fixture");', 'response'],
  ['extra stdout', 'process.stdout.write("{\\"ok\\":true,\\"entries\\":[]}\\nextra");', 'response'],
]) {
  test(`catalog reports ${name} without leaking details and removes its output`, () => {
    withFixture('', fixture => {
      assertTechnicalFailure(callCatalogFixture(fixture, '{}'), stage);
      const record = JSON.parse(readFileSync(path.join(fixture, 'record.json'), 'utf8'));
      assert.equal(existsSync(record.out), false);
    }, false, source);
  });
}

for (const [name, payload] of [
  ['null', null], ['array', []], ['nonboolean ok', { ok: 'true', entries: [] }],
  ['unrecognized success', { ok: true }], ['QA shape', { ok: true, execution: {} }],
  ['non-array entries', { ok: true, entries: {} }],
  ['nonstring path', { ok: true, entries: [{ path: 42, name: null }] }],
  ['nonstring name', { ok: true, entries: [{ path: 'fixture', name: 42 }] }],
  ['extra identity field', { ok: true, entries: [{ path: 'fixture', name: null, guide: {} }] }],
  ['MATCH unnamed identity', { ok: true, resolution: 'MATCH', entry: { path: 'fixture', name: null } }],
  ['MATCH missing entry', { ok: true, resolution: 'MATCH' }],
  ['AMBIGUOUS non-array', { ok: true, resolution: 'AMBIGUOUS', candidates: {} }],
  ['AMBIGUOUS unnamed identity', { ok: true, resolution: 'AMBIGUOUS', candidates: [{ path: 'fixture', name: null }] }],
  ['unknown resolution', { ok: true, resolution: 'future' }],
  ['mixed success variants', { ok: true, resolution: 'NOT_FOUND', entries: [] }],
  ['invalid error kind', { ok: false, error: { kind: 42, message: 'fixture' } }],
  ['invalid error message', { ok: false, error: { kind: 'internal', message: null } }],
  ['extra error stack', { ok: false, error: { kind: 'internal', message: 'fixture', stack: 'private' } }],
  ['missing error', { ok: false }],
]) {
  test(`catalog rejects response shape: ${name}`, () => {
    withFixture('', fixture => {
      assertTechnicalFailure(callCatalogFixture(fixture, '{}'), 'response');
    }, false, `process.stdout.write(${JSON.stringify(JSON.stringify(payload))});`);
  });
}

for (const [name, payload] of [
  ['LIST with null name and original order', { ok: true, entries: [{ path: ' b ', name: null }, { path: 'a', name: ' A ' }] }],
  ['MATCH', { ok: true, resolution: 'MATCH', entry: { path: ' a ', name: ' A ' } }],
  ['AMBIGUOUS', { ok: true, resolution: 'AMBIGUOUS', candidates: [{ path: 'b', name: 'A' }, { path: 'a', name: 'A' }] }],
  ['NOT_FOUND', { ok: true, resolution: 'NOT_FOUND' }],
  ['future controlled error', { ok: false, error: { kind: 'future-kind', message: 'fixture' } }],
]) {
  test(`catalog accepts and compacts ${name} without rewriting values`, () => {
    withFixture('', fixture => {
      const child = callCatalogFixture(fixture, '{}');
      assert.equal(child.status, 0);
      assert.equal(child.stderr, '');
      assert.equal(child.stdout, JSON.stringify(payload) + '\n');
    }, false, `process.stdout.write(${JSON.stringify(' \n' + JSON.stringify(payload, null, 2) + ' \n')});`);
  });
}

test('QA still rejects catalog success shapes', () => {
  withFixture('process.stdout.write("{\\"ok\\":true,\\"entries\\":[]}");', fixture => {
    assertTechnicalFailure(processCall(path.join(fixture, 'scripts/factory-qa-invoke.mjs'), '{}'), 'response');
  });
});

for (const api of ['invokeFactoryQa', 'invokeFactoryGuideCatalog']) {
  test(`${api} preserves valid stdout when cleanup fails`, () => {
    const qaPayload = { ok: true, execution: {} };
    const catalogPayload = { ok: true, entries: [] };
    withFixture(`process.stdout.write(${JSON.stringify(JSON.stringify(qaPayload))});`, fixture => {
      const host = path.join(fixture, 'scripts/cleanup-host.mjs');
      writeFileSync(host, `
import fs from 'node:fs';
import { syncBuiltinESMExports } from 'node:module';
fs.rmSync = () => { throw new Error('Private cleanup fixture'); };
syncBuiltinESMExports();
const { ${api} } = await import('./factory-qa-invoke.mjs');
const result = ${api}('{}');
process.stdout.write(result.stdout);
process.stderr.write(result.stderr);
if (result.stderr) process.exitCode = 1;
`);
      const child = processCall(host, '{}');
      assert.equal(child.status, 1);
      assert.equal(child.stdout, JSON.stringify(api === 'invokeFactoryQa' ? qaPayload : catalogPayload) + '\n');
      assert.equal(child.stderr, JSON.stringify({
        ok: false, error: { kind: 'tool-internal', stage: 'cleanup', message: 'No se pudo completar la operación del preparador.' },
      }) + '\n');
      const record = JSON.parse(readFileSync(path.join(fixture, 'record.json'), 'utf8'));
      assert.equal(existsSync(record.out), true); // La fixture retira el output en finally.
    }, false, `process.stdout.write(${JSON.stringify(JSON.stringify(catalogPayload))});`);
  });

  test(`${api} shares a single 60s deadline across preparation and execution`, () => {
    withFixture('process.stdout.write("{\\"ok\\":true,\\"execution\\":{}}");', fixture => {
      const host = path.join(fixture, 'scripts/deadline-host.mjs');
      writeFileSync(host, `
import fs from 'node:fs';
import cp from 'node:child_process';
import { syncBuiltinESMExports } from 'node:module';
const originalSpawn = cp.spawnSync;
const budgets = [];
cp.spawnSync = (...args) => { budgets.push(args[2].timeout); return originalSpawn(...args); };
syncBuiltinESMExports();
const { ${api} } = await import('./factory-qa-invoke.mjs');
const times = [0, 1, 40000, 40000, 40001];
Object.defineProperty(performance, 'now', { value: () => times.shift() });
const result = ${api}('{}');
fs.writeFileSync(new URL('../budgets.json', import.meta.url), JSON.stringify(budgets));
process.stdout.write(result.stdout);
process.stderr.write(result.stderr);
if (result.stderr) process.exitCode = 1;
`);
      const child = processCall(host, '{}');
      assert.equal(child.status, 0);
      assert.equal(child.stderr, '');
      assert.deepEqual(JSON.parse(readFileSync(path.join(fixture, 'budgets.json'), 'utf8')), [59999, 20000]);
    }, false, 'process.stdout.write("{\\"ok\\":true,\\"entries\\":[]}");');
  });
}

test('catalog emits no JS or build metadata into the repository', () => {
  const locations = ['scripts', 'src/app/shared', 'src/app/guides'].map(dir => path.join(projectRoot, dir));
  const before = locations.flatMap(generatedFiles).sort();
  const result = invokeFactoryGuideCatalog('{"operation":"list"}');
  assert.equal(result.stderr, '');
  assert.deepEqual(locations.flatMap(generatedFiles).sort(), before);
});
