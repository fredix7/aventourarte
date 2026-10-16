import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const scope = process.env.FACTORY_INFERENCE_REGRESSION_SCOPE ?? process.env.FACTORY_9D_REGRESSION_SCOPE ?? 'all';
// Writer and successful Phase 9 persistence cases are intentionally excluded: 9D
// explicitly forbids invoking the writer, including against a synthetic repository.
// Explicit runner: do not auto-discover it beside the full suite, whose Phase 6
// fixtures modify the same cooperative lock root. Scope is visible in test output.
test(`Offline inference regressions without writer (scope: ${scope})`, { timeout: 1800000 }, t => {
  assert.ok(['all', 'fix', 'channels', 'safe', 'channel-case'].includes(scope), 'Unknown regression scope');
  const channelsOnly = scope === 'channels' || scope === 'channel-case';
  const temp = realpathSync.native(tmpdir()), out = mkdtempSync(path.join(temp, 'factory-fix-9d-regression-'));
  const flags = ['--preserve-symlinks', '--preserve-symlinks-main'];
  const env = { NODE_DISABLE_COMPILE_CACHE: '1', NODE_PATH: path.join(root, 'node_modules'),
    FACTORY_FIX_OUT_DIR: out, FACTORY_QA_OUT_DIR: out, TEMP: temp, TMP: temp,
    PATH: process.env.PATH ?? process.env.Path, SystemRoot: process.env.SystemRoot, WINDIR: process.env.WINDIR,
    // Same loader flags already used by the repository's launchers. These avoid Node's
    // unnecessary ancestor realpath on Windows; OS sandbox permissions remain intact.
    NODE_OPTIONS: '--preserve-symlinks --preserve-symlinks-main' };
  const failed = [];
  function run(name, args, timeout = 60000, continueOnFailure = false) {
    const r = spawnSync(process.execPath, [...flags, ...args], { cwd: root, shell: false, encoding: 'utf8',
      timeout, maxBuffer: 8 * 1024 * 1024, env });
    const lines = r.stdout.split(/\r?\n/);
    const summary = lines.filter(l => /^# (tests|pass|fail|cancelled|skipped|Existing pure Factory core)\b/.test(l));
    t.diagnostic(name + ': ' + summary.join('; '));
    process.stdout.write('# Completed ' + name + ': ' + summary.join('; ') + '\n');
    const failures = []; let failing = false;
    for (const line of lines) {
      if (/^not ok /.test(line)) failing = true;
      if (failing) failures.push(line);
      if (failing && /^  \.\.\.$/.test(line)) failing = false;
    }
    if (continueOnFailure && (r.error || r.status !== 0)) {
      failed.push(name + ': ' + (r.error?.code ?? '') + '\n' + failures.join('\n') + r.stderr); return;
    }
    assert.equal(r.error, undefined); assert.equal(r.status, 0, failures.join('\n') + r.stderr);
  }
  try {
    const tsc = 'node_modules/typescript/bin/tsc';
    run('Factory Fix noEmit', [tsc, '-p', 'scripts/factory-fix/tsconfig.json', '--noEmit']);
    run('Factory Fix compile to TEMP', [tsc, '-p', 'scripts/factory-fix/tsconfig.json', '--noEmit', 'false', '--outDir', out]);
    run('QA noEmit', [tsc, '-p', 'tsconfig.factory-qa.json', '--noEmit']);
    run('QA compile to TEMP', [tsc, '-p', 'tsconfig.factory-qa.json', '--noEmit', 'false', '--outDir', out]);
    if (!channelsOnly) run('Pure core specs compile', [tsc, '--target', 'ES2022', '--module', 'CommonJS', '--moduleResolution', 'Node',
      '--lib', 'ES2022', '--strict', '--skipLibCheck', '--types', 'node,jasmine', '--rootDir', root, '--outDir', out,
      ...['context', 'rules', 'runner', 'qa', 'catalog', 'catalog-identity', 'executor'].map(n => `src/app/shared/guide-factory-${n}.spec.ts`)]);
    const guard = path.join(out, 'no-writer.cjs');
    writeFileSync(guard, `let calls=0; const deny=()=>{calls++;throw Error('Forbidden persistence capability in offline regressions')};require('./scripts/factory-fix/writer.js').persistPreparedFix=deny;${scope === 'safe' || channelsOnly ? "require('./scripts/factory-fix/write-readiness.js').inspectWriteReadiness=deny;require('./scripts/factory-fix/source-lock.js').acquireSourceLock=deny;" : ''}process.on('exit',()=>{if(calls)process.exitCode=1});`);
    // Phase 9E forbids acquiring leases too. Do not run Phase 6 readiness cases in
    // safe scope; keep their existing strict tests intact for an authorized phase.
    const tests = ['source-identity', 'snapshot', 'candidate', 'authorization', 'result',
      ...(scope === 'safe' ? [] : ['write-readiness']), 'fixer-launcher', 'inference-broker', 'inference-http'];
    if (!channelsOnly) run(`Fix permitted suites + broker + core (Phase 6 ${scope === 'safe' ? 'excluded: no leases' : 'included'})`, ['--require', guard, '--test', '--test-concurrency=1',
      ...tests.map(n => `scripts/factory-fix/${n}.cases.mjs`)], 900000, true);
    const guards = 'Phase 9 (?:policy:|capabilities:|TEMP: (?:malicious response blocks before writing:|real runtime remains blocked:|request invalidation during generation blocks preparation|late response after timeout cannot revive a finished session|a plan from another authentic request cannot be replayed))';
    if (!channelsOnly) run('Phase 9 non-writing guards only', ['--require', guard, '--test', '--test-concurrency=1', '--test-name-pattern', guards,
      'scripts/factory-fix/execution.cases.mjs'], 180000, true);
    if (scope === 'channel-case') run('Isolated reproduction of QA subprocess timeout', ['--require', guard, '--test',
      '--test-name-pattern', '^does not normalize or infer path " europa/espana/andalucia/cadiz/jerez-de-la-frontera"$',
      'scripts/factory-qa-channel.test.mjs'], 60000, true);
    else if (scope !== 'fix') {
      // Separate reports and aggregate ceilings; existing assertions and the QA
      // subprocess's own 15-second timeout remain unchanged.
      for (const file of ['factory-guide-catalog-channel', 'factory-qa-channel', 'factory-qa-invoke', 'factory-qa-mcp']) {
        run(file, ['--require', guard, '--test', `scripts/${file}.test.mjs`], 900000, true);
      }
    }
    assert.deepEqual(failed, [], failed.join('\n'));
  } finally {
    const resolved = realpathSync.native(out);
    assert.equal(path.dirname(resolved), temp); assert.ok(path.basename(resolved).startsWith('factory-fix-9d-regression-'));
    rmSync(resolved, { recursive: true, force: true });
  }
});
