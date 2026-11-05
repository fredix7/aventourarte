import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, realpathSync, readdirSync, readFileSync, lstatSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
test('AVA-76 offline smoke entry: isolated synthetic suites, no network/writer/real-guide fixtures', { timeout: 900000 }, t => {
  const temp = realpathSync.native(tmpdir()), out = mkdtempSync(path.join(temp, 'factory-fix-smoke-entry-'));
  const protectedFiles = [];
  function inventory(dir) {
    for (const item of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, item.name);
      assert.equal(item.isSymbolicLink(), false);
      if (item.isDirectory()) inventory(p); else protectedFiles.push(p);
    }
  }
  inventory(path.join(root, 'src/app/guides'));
  protectedFiles.push(...['src/app/shared/guide-factory-catalog.ts', '.git/index', 'maintenance-report/production.json'].map(f => path.join(root, f)));
  const hash = p => createHash('sha256').update(readFileSync(p)).digest('hex');
  const before = new Map(protectedFiles.map(p => [p, hash(p)]));
  const env = { NODE_DISABLE_COMPILE_CACHE: '1', NODE_PATH: path.join(root, 'node_modules'), FACTORY_FIX_OUT_DIR: out,
    TEMP: temp, TMP: temp, PATH: process.env.PATH ?? process.env.Path,
    SystemRoot: process.env.SystemRoot, WINDIR: process.env.WINDIR };
  const flags = ['--preserve-symlinks', '--preserve-symlinks-main'], failures = [];
  function run(name, args, timeout, guarded = false) {
    const r = spawnSync(process.execPath, [...flags, ...args], { cwd: root, shell: false, windowsHide: true,
      encoding: 'utf8', timeout, maxBuffer: 8 * 1024 * 1024, env });
    const lines = (r.stdout ?? '').split(/\r?\n/);
    const summary = lines.filter(l => /^# (tests|pass|fail|skipped|cancelled|Offline boundary evidence)\b/.test(l));
    process.stdout.write('# Completed ' + name + ': ' + summary.join('; ') + '\n');
    t.diagnostic(name + ': ' + summary.join('; '));
    if (r.error || r.status !== 0) failures.push(name + ': ' + (r.error?.code ?? '') + '\n' + r.stdout + r.stderr);
    if (guarded) {
      const evidence = lines.filter(l => l.startsWith('# Offline boundary evidence '));
      assert.equal(evidence.length, 1, 'Require evidence from the SAME process that executes the cases');
      const metrics = JSON.parse(evidence[0].slice('# Offline boundary evidence '.length));
      for (const [key, value] of Object.entries(metrics)) {
        if (key === 'laboratoryMutations') assert.ok(value > 0, 'Fixture writes must exercise the guard');
        else assert.equal(value, 0, key);
      }
    }
    return r.status === 0 && !r.error;
  }
  try {
    assert.ok(run('Factory Fix typecheck', ['node_modules/typescript/bin/tsc', '-p', 'scripts/factory-fix/tsconfig.json', '--noEmit'], 60000), failures.join('\n'));
    assert.ok(run('Compile only to owned TEMP', ['node_modules/typescript/bin/tsc', '-p', 'scripts/factory-fix/tsconfig.json', '--noEmit', 'false', '--outDir', out], 60000), failures.join('\n'));
    for (const suite of ['inference-smoke-entry', 'inference-manual', 'inference-broker', 'inference-http', 'inference-https-adapter']) {
      run(suite, ['--require', path.join(root, 'scripts/factory-fix/inference-smoke-guard.cjs'),
        // node:test also runs directly. Avoid an extra --test worker: the guard,
        // cases, counters and timeout ownership must live in the same process.
        // The manual suite includes the additional observation regressions and
        // completed in ~156s under the guarded Windows host. This is a test
        // supervisor budget only; the inference deadline remains <=30000ms.
        `scripts/factory-fix/${suite}.cases.mjs`], suite === 'inference-manual' ? 240000 : 120000, true);
    }
    // This trusted supervisor launches guarded children and expects deliberate
    // denials/nonzero exits. It must not inherit the child's process tripwire.
    run('Filesystem guard negative controls', ['scripts/factory-fix/inference-smoke-guard.cases.mjs'], 420000);
    assert.deepEqual(failures, [], failures.join('\n'));
  } finally {
    let preserved = 0;
    for (const [p, expected] of before) { assert.equal(hash(p), expected, 'Protected file changed: ' + p); preserved++; }
    t.diagnostic(`Protected SHA-256: ${preserved}/${before.size} identical; real guides used only for digest comparison, never as fixtures.`);
    // Validate the exact owned absolute path before recursive TEMP cleanup.
    const resolved = realpathSync.native(out);
    assert.equal(path.dirname(resolved), temp); assert.ok(path.basename(resolved).startsWith('factory-fix-smoke-entry-'));
    assert.equal(lstatSync(out).isSymbolicLink(), false); assert.equal(resolved, out);
    rmSync(resolved, { recursive: true, force: true });
  }
});
