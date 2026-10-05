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
import { invokeFactoryQa } from './factory-qa-invoke.mjs';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const launcher = path.join(projectRoot, 'scripts/factory-qa-invoke.mjs');
const outDir = process.env.FACTORY_QA_OUT_DIR;
if (!outDir) throw new Error('Test configuration: FACTORY_QA_OUT_DIR is required.');
const preparedChannel = path.resolve(outDir, 'scripts/factory-qa-channel.js');
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

function expectedResponse(input) {
  const child = spawnSync(process.execPath, [
    '--permission', '--allow-fs-read=' + path.resolve(outDir), ...fixedResolution, preparedChannel,
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

function withFixture(channelSource, run, compilerFailure = false) {
  const root = realpathSync.native(tmpdir());
  const fixture = mkdtempSync(path.join(root, 'factory-qa-invoke-test-'));
  try {
    mkdirSync(path.join(fixture, 'scripts'));
    mkdirSync(path.join(fixture, 'node_modules/typescript/bin'), { recursive: true });
    copyFileSync(launcher, path.join(fixture, 'scripts/factory-qa-invoke.mjs'));
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
fs.writeFileSync(path.join(out, 'scripts/factory-qa-channel.js'), ${JSON.stringify(channelSource)});`}
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
