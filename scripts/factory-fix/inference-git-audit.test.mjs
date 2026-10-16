import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import Module, { createRequire } from 'node:module';
import { mkdtempSync, realpathSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
test('Phase 9D audit: real Git inspector preserves 17 copied guides, catalog and index in an owned TEMP repository', { timeout: 180000 }, t => {
  const temp = realpathSync.native(tmpdir()), owner = mkdtempSync(path.join(temp, 'factory-fix-9d-git-audit-'));
  const out = path.join(owner, 'out'), repoRoot = path.join(owner, 'repo');
  const previousNodePath = process.env.NODE_PATH;
  const env = { PATH: process.env.PATH ?? process.env.Path, SystemRoot: process.env.SystemRoot, WINDIR: process.env.WINDIR,
    TEMP: temp, TMP: temp, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: process.platform === 'win32' ? 'NUL' : '/dev/null',
    GIT_TERMINAL_PROMPT: '0', GIT_OPTIONAL_LOCKS: '0', GIT_NO_LAZY_FETCH: '1', GIT_NO_REPLACE_OBJECTS: '1' };
  try {
    const build = spawnSync(process.execPath, ['--preserve-symlinks', '--preserve-symlinks-main',
      'node_modules/typescript/bin/tsc', '-p', 'scripts/factory-fix/tsconfig.json', '--noEmit', 'false', '--outDir', out],
    { cwd: root, shell: false, encoding: 'utf8', timeout: 60000, env });
    assert.equal(build.error, undefined); assert.equal(build.status, 0, build.stdout + build.stderr);
    // Resolve the existing compiler dependency from TEMP; process-local test setup only.
    process.env.NODE_PATH = path.join(root, 'node_modules'); Module._initPaths();
    const require = createRequire(import.meta.url), compiled = name => require(path.join(out, 'scripts/factory-fix', name + '.js'));
    const { listFactoryGuideSourceIdentities } = compiled('source-identity');
    const { inspectRepositoryRoot, observeSourcePath } = compiled('path-safety');
    const { inspectGitTargetState } = compiled('git-inspection');
    const identities = listFactoryGuideSourceIdentities({ repoRoot: root }); assert.equal(identities.length, 17);
    const files = [...identities.map(i => i.sourcePath), 'src/app/shared/guide-factory-catalog.ts'];
    const realBefore = new Map([...files, '.git/index'].map(f => [f, readFileSync(path.join(root, f))]));
    for (const f of files) {
      const destination = path.join(repoRoot, f); mkdirSync(path.dirname(destination), { recursive: true });
      writeFileSync(destination, realBefore.get(f));
    }
    function git(args, input) {
      assert.equal(path.dirname(realpathSync.native(repoRoot)), realpathSync.native(owner));
      const r = spawnSync('git', ['--no-optional-locks', '-c', 'core.autocrlf=false', '-c', 'core.fsmonitor=false',
        '-c', 'core.hooksPath=/dev/null', '-c', 'user.name=Offline audit fixture', '-c', 'user.email=fixture@example.invalid', ...args],
      { cwd: repoRoot, shell: false, windowsHide: true, encoding: 'utf8', timeout: 10000, maxBuffer: 1024 * 1024, env, input });
      assert.equal(r.error, undefined); assert.equal(r.status, 0, r.stderr); return r.stdout.trim();
    }
    git(['init', '--quiet', '--template=']); git(['add', '--all']);
    // Synthetic HEAD only. No commit, index update or configuration write in the real repository.
    const tree = git(['write-tree']), head = git(['commit-tree', tree], 'Owned TEMP fixture baseline\n');
    git(['update-ref', 'HEAD', head]);
    const repository = inspectRepositoryRoot(repoRoot), copied = listFactoryGuideSourceIdentities({ repoRoot });
    assert.equal(copied.length, 17);
    const identity = copied.find(i => i.guidePath.endsWith('/jerez-de-la-frontera')); assert.ok(identity);
    const index = readFileSync(path.join(repoRoot, '.git/index'));
    const first = inspectGitTargetState(repository, identity.sourcePath);
    assert.equal(first.state, 'TRACKED_CLEAN'); assert.equal(first.headOid, head);
    assert.deepEqual(inspectGitTargetState(repository, identity.sourcePath), first);
    assert.equal(observeSourcePath(repository, identity.sourcePath).sourceHash, identity.sourceHash);
    assert.deepEqual(readFileSync(path.join(repoRoot, '.git/index')), index);
    for (const f of files) assert.deepEqual(readFileSync(path.join(repoRoot, f)), realBefore.get(f));
    for (const [f, bytes] of realBefore) assert.deepEqual(readFileSync(path.join(root, f)), bytes);
    // Read-only environmental diagnosis, never an ownership override or a substituted PASS.
    const realProbe = spawnSync('git', ['--no-optional-locks', 'rev-parse', '--show-toplevel'],
      { cwd: root, shell: false, windowsHide: true, encoding: 'utf8', timeout: 10000, env });
    assert.equal(realProbe.error, undefined);
    t.diagnostic(`Real repository hermetic Git: exit=${realProbe.status}; dubiousOwnership=${/dubious ownership/i.test(realProbe.stderr)}. Real-repository coverage is reported separately.`);
  } finally {
    if (previousNodePath === undefined) delete process.env.NODE_PATH; else process.env.NODE_PATH = previousNodePath;
    Module._initPaths();
    const resolved = realpathSync.native(owner);
    assert.equal(path.dirname(resolved), temp); assert.ok(path.basename(resolved).startsWith('factory-fix-9d-git-audit-'));
    rmSync(resolved, { recursive: true, force: true });
  }
});
