import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const tempRoot = realpathSync.native(tmpdir());
const prefix = 'factory-fix-phase1-build-';
const resolutionFlags = ['--preserve-symlinks', '--preserve-symlinks-main'];

test('Factory Fix Phases 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9: typecheck, compile and complete suites', { timeout: 1800000 }, t => {
  const outDir = mkdtempSync(path.join(tempRoot, prefix));
  try {
    const compiler = path.join(projectRoot, 'node_modules/typescript/bin/tsc');
    const config = path.join(projectRoot, 'scripts/factory-fix/tsconfig.json');
    for (const args of [[], ['--noEmit', 'false', '--outDir', outDir]]) {
      const compile = spawnSync(process.execPath, [...resolutionFlags, compiler, '-p', config, ...args], {
        cwd: projectRoot, encoding: 'utf8', timeout: 30000,
        env: { NODE_DISABLE_COMPILE_CACHE: '1' }, shell: false
      });
      assert.equal(compile.error, undefined);
      assert.equal(compile.status, 0, compile.stdout + compile.stderr);
    }
    // Compile only the original pure core specs and their dependencies, without Angular/build.
    const core = spawnSync(process.execPath, [...resolutionFlags, compiler, '--target', 'ES2022',
      '--module', 'CommonJS', '--moduleResolution', 'Node', '--lib', 'ES2022', '--strict', '--skipLibCheck',
      '--types', 'node,jasmine', '--rootDir', projectRoot, '--outDir', outDir,
      ...['context', 'rules', 'runner', 'qa', 'catalog', 'catalog-identity', 'executor']
        .map(name => `src/app/shared/guide-factory-${name}.spec.ts`)], {
      cwd: projectRoot, encoding: 'utf8', timeout: 30000, env: { NODE_DISABLE_COMPILE_CACHE: '1' }, shell: false
    });
    assert.equal(core.error, undefined); assert.equal(core.status, 0, core.stdout + core.stderr);
    // Both environment suites deliberately replace the shared per-user lock root in tests.
    // Run files sequentially so their fault injections cannot interfere with each other.
    const suite = spawnSync(process.execPath, [...resolutionFlags, '--test', '--test-concurrency=1',
      'scripts/factory-fix/source-identity.cases.mjs', 'scripts/factory-fix/snapshot.cases.mjs',
      'scripts/factory-fix/candidate.cases.mjs', 'scripts/factory-fix/authorization.cases.mjs',
      'scripts/factory-fix/result.cases.mjs', 'scripts/factory-fix/write-readiness.cases.mjs',
      'scripts/factory-fix/writer.cases.mjs', 'scripts/factory-fix/fixer-launcher.cases.mjs',
      'scripts/factory-fix/execution.cases.mjs'], {
      cwd: projectRoot, encoding: 'utf8', timeout: 1740000, shell: false,
      env: {
        NODE_DISABLE_COMPILE_CACHE: '1', NODE_PATH: path.join(projectRoot, 'node_modules'),
        FACTORY_FIX_OUT_DIR: outDir, TEMP: tempRoot, TMP: tempRoot,
        PATH: process.env.PATH ?? process.env.Path, SystemRoot: process.env.SystemRoot, WINDIR: process.env.WINDIR
      }
    });
    const summary = suite.stdout.split(/\r?\n/).filter(line => /^# (tests|pass|fail|cancelled|skipped|todo|Existing pure Factory core)\b/.test(line));
    t.diagnostic(summary.join('; '));
    const phase9Names = suite.stdout.split(/\r?\n/).filter(line => line.startsWith('# Subtest: Phase 9 '));
    assert.ok(phase9Names.length > 0, 'Phase 9 must execute inside the complete suite.');
    assert.equal(new Set(phase9Names).size, phase9Names.length, 'Phase 9 case names must identify unique cases.');
    t.diagnostic(`Phase 9: ${phase9Names.length} distinct cases inside the complete suite; included in the global total.`);
    assert.equal(suite.error, undefined);
    // Keep failed-case diagnostics reviewable without embedding thousands of passing cases.
    const failures = []; let failing = false;
    for (const line of suite.stdout.split(/\r?\n/)) {
      if (/^not ok /.test(line)) failing = true;
      if (failing) failures.push(line);
      if (failing && /^  \.\.\.$/.test(line)) failing = false;
    }
    assert.equal(suite.status, 0, failures.join('\n') + suite.stderr);
    assert.equal(suite.stderr, '');
  } finally {
    const resolved = realpathSync.native(outDir);
    assert.equal(path.dirname(resolved), tempRoot);
    assert.ok(path.basename(resolved).startsWith(prefix));
    rmSync(resolved, { recursive: true, force: true });
  }
});
