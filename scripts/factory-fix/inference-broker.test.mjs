import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
test('Phase 9D standalone: offline broker typecheck and tests, no writer regressions', { timeout: 180000 }, t => {
  const temp = realpathSync.native(tmpdir()), out = mkdtempSync(path.join(temp, 'factory-fix-9d-build-'));
  const flags = ['--preserve-symlinks', '--preserve-symlinks-main'];
  try {
    for (const args of [[], ['--noEmit', 'false', '--outDir', out]]) {
      const r = spawnSync(process.execPath, [...flags, 'node_modules/typescript/bin/tsc', '-p', 'scripts/factory-fix/tsconfig.json', ...args],
        { cwd: root, encoding: 'utf8', timeout: 30000, shell: false, env: { NODE_DISABLE_COMPILE_CACHE: '1' } });
      assert.equal(r.status, 0, r.stdout + r.stderr); assert.equal(r.error, undefined);
    }
    // Provider text is a complete JSON document, not one Factory scalar. Keep the
    // 512 KiB envelope cap without accidentally imposing a 64 KiB cap on the plan.
    const require = createRequire(import.meta.url);
    const json = require(path.join(out, 'scripts/factory-fix/fixer-json.js'));
    const inner = JSON.stringify({ a: 'x'.repeat(40000), b: 'y'.repeat(40000) });
    const wrapped = json.decodeProviderEnvelopeJson(JSON.stringify({ text: inner }));
    assert.equal(wrapped.text, inner); assert.equal(json.decodeFixerJson(wrapped.text).b.length, 40000);
    assert.throws(() => json.decodeFixerJson(JSON.stringify({ a: 'x'.repeat(65537) })), e => e.code === 'OUTPUT_LIMIT_EXCEEDED');
    assert.throws(() => json.decodeProviderEnvelopeJson('{"text":"one","text":"two"}'), e => e.code === 'JSON_MALFORMED');
    const r = spawnSync(process.execPath, [...flags, '--test', '--test-concurrency=1', 'scripts/factory-fix/inference-broker.cases.mjs',
      'scripts/factory-fix/inference-http.cases.mjs', 'scripts/factory-fix/inference-https-adapter.cases.mjs',
      'scripts/factory-fix/inference-preflight.cases.mjs'], {
      cwd: root, encoding: 'utf8', timeout: 120000, shell: false, maxBuffer: 4 * 1024 * 1024,
      env: { NODE_DISABLE_COMPILE_CACHE: '1', NODE_PATH: path.join(root, 'node_modules'), FACTORY_FIX_OUT_DIR: out,
        TEMP: temp, TMP: temp, PATH: process.env.PATH ?? process.env.Path, SystemRoot: process.env.SystemRoot, WINDIR: process.env.WINDIR }
    });
    t.diagnostic(r.stdout.split(/\r?\n/).filter(s => /^# (tests|pass|fail|skipped|cancelled)\b/.test(s)).join('; '));
    const failures = []; let failing = false;
    for (const line of r.stdout.split(/\r?\n/)) {
      if (/^not ok /.test(line)) failing = true;
      if (failing) failures.push(line);
      if (failing && /^  \.\.\.$/.test(line)) failing = false;
    }
    assert.equal(r.status, 0, failures.join('\n') + r.stderr); assert.equal(r.error, undefined);
  } finally {
    const resolved = realpathSync.native(out);
    assert.equal(path.dirname(resolved), temp); assert.ok(path.basename(resolved).startsWith('factory-fix-9d-build-'));
    rmSync(resolved, { recursive: true, force: true });
  }
});
