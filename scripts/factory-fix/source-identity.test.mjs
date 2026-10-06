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

test('Factory Fix Phases 1 + 2 + 3 + 4 + 5: typecheck, compile and complete in-memory suites', { timeout: 180000 }, t => {
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
    const suite = spawnSync(process.execPath, [...resolutionFlags, '--test',
      'scripts/factory-fix/source-identity.cases.mjs', 'scripts/factory-fix/snapshot.cases.mjs',
      'scripts/factory-fix/candidate.cases.mjs', 'scripts/factory-fix/authorization.cases.mjs',
      'scripts/factory-fix/result.cases.mjs'], {
      cwd: projectRoot, encoding: 'utf8', timeout: 120000, shell: false,
      env: {
        NODE_DISABLE_COMPILE_CACHE: '1', NODE_PATH: path.join(projectRoot, 'node_modules'),
        FACTORY_FIX_OUT_DIR: outDir, TEMP: tempRoot, TMP: tempRoot
      }
    });
    const summary = suite.stdout.split(/\r?\n/).filter(line => /^# (tests|pass|fail|cancelled|skipped|todo|Existing pure Factory core)\b/.test(line));
    t.diagnostic(summary.join('; '));
    assert.equal(suite.error, undefined);
    assert.equal(suite.status, 0, suite.stdout + suite.stderr);
    assert.equal(suite.stderr, '');
  } finally {
    const resolved = realpathSync.native(outDir);
    assert.equal(path.dirname(resolved), tempRoot);
    assert.ok(path.basename(resolved).startsWith(prefix));
    rmSync(resolved, { recursive: true, force: true });
  }
});
