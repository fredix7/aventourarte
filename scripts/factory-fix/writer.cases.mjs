import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawnSync, spawn } from 'node:child_process';
import { once } from 'node:events';
import * as fs from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url), mutableFs = require('node:fs'), ts = require('typescript');
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const outDir = process.env.FACTORY_FIX_OUT_DIR;
if (!outDir) throw new Error('FACTORY_FIX_OUT_DIR is required.');
const compiled = name => require(path.join(outDir, 'scripts/factory-fix', name + '.js'));
const { resolveFactoryGuideSourceIdentity } = compiled('source-identity');
const { buildGuideSnapshot } = compiled('snapshot');
const { getGuideRootRef, listChildTargets } = compiled('target-locator');
const { createAuthorizationManifest } = compiled('authorization');
const { prepareFixResult } = compiled('prepared-result');
const { inspectWriteReadiness, releaseWriteLease, isPreparedWriteLeaseActive } = compiled('write-readiness');
const { persistPreparedFix } = compiled('writer');
const tempRoot = fs.realpathSync.native(tmpdir()), prefix = 'factory-fix-phase7-';
const sourcePath = 'src/app/guides/fixture.guide.ts', catalogPath = 'src/app/shared/guide-factory-catalog.ts';
const catalogTemplate = fs.readFileSync(path.join(projectRoot, catalogPath), 'utf8');
const ast = ts.createSourceFile('catalog.ts', catalogTemplate, ts.ScriptTarget.ES2022, true);
const imports = ast.statements.filter(ts.isImportDeclaration);
const assignment = ast.statements.filter(ts.isVariableStatement).flatMap(s => s.declarationList.declarations)
  .find(d => d.name.getText(ast) === 'guideAssignments').initializer;
// The skeleton is read-only reference material; all bindings and all source bytes are synthetic.
const syntheticCatalog = catalogTemplate.slice(0, imports[1].getStart(ast))
  + "import { FIXTURE_GUIDE } from '../guides/fixture.guide';"
  + catalogTemplate.slice(imports.at(-1).end, assignment.getStart(ast))
  + "[[FIXTURE_GUIDE, 'generic']]" + catalogTemplate.slice(assignment.end);
function ownedRepo(repo) {
  const owner = path.dirname(repo);
  assert.equal(path.dirname(owner), tempRoot); assert.ok(path.basename(owner).startsWith(prefix));
  assert.equal(fs.realpathSync.native(repo), repo); assert.notEqual(repo, projectRoot);
}
function git(repo, args) {
  ownedRepo(repo);
  const child = spawnSync('git', ['--no-optional-locks', '-c', 'core.autocrlf=false', '-c', 'core.fsmonitor=false',
    '-c', 'core.hooksPath=/dev/null', '-c', 'user.name=Factory Fixture', '-c', 'user.email=fixture@example.invalid', ...args], {
    cwd: repo, shell: false, windowsHide: true, encoding: 'utf8', timeout: 10000,
    env: { PATH: process.env.PATH ?? process.env.Path, SystemRoot: process.env.SystemRoot, WINDIR: process.env.WINDIR,
      GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: process.platform === 'win32' ? 'NUL' : '/dev/null',
      GIT_TERMINAL_PROMPT: '0', GIT_OPTIONAL_LOCKS: '0', TEMP: tempRoot, TMP: tempRoot } });
  assert.equal(child.error, undefined); assert.equal(child.status, 0, child.stdout + child.stderr); return child.stdout.trim();
}
function prepared(ctx, options = {}) {
  const sourceIdentity = resolveFactoryGuideSourceIdentity({ repoRoot: ctx.repoRoot, guidePath: 'fixture/path' });
  const snapshot = buildGuideSnapshot({ repoRoot: ctx.repoRoot, sourceIdentity });
  const ref = listChildTargets({ snapshot, parentRef: getGuideRootRef(snapshot) })
    .find(r => r.location.at(-1)?.property === 'descripcion');
  const operation = { type: 'UPDATE_VALUE', targetRef: ref, value: options.noChange ? 'original' : 'Cádiz 🌍 — información útil' };
  const manifest = createAuthorizationManifest({ snapshot, request: {
    requestId: options.requestId ?? 'phase7-fixture', nonce: null, allowPartial: false,
    preconditions: { guidePath: sourceIdentity.guidePath, sourceIdentity, sourceHash: snapshot.sourceHash,
      catalogHash: sourceIdentity.catalogBinding.catalogHash, snapshotId: snapshot.snapshotId, ruleSet: sourceIdentity.ruleSet },
    scopeTargets: [{ scopeId: 'description', ref, extent: 'PROPERTY', allowedDescendants: [], allowedOperations: ['UPDATE_VALUE'] }],
    actions: [{ actionKey: 'description', requirement: 'REQUIRED', scopeId: 'description', operation,
      preconditions: { mode: 'VALUE', expectedValue: 'original' }, payloadConstraint: { mode: 'EXACT_VALUE' },
      evidencePolicy: { allowedIds: [], minimum: 0 }, dependencies: [], explicitRemoval: false }], evidenceBindings: []
  } });
  return prepareFixResult({ snapshot, manifest, requestDigest: manifest.requestDigest,
    operations: manifest.authorizedActions.map(a => ({ actionId: a.actionId, operation: a.operation, evidenceIds: [] })) });
}
async function fixture(run, options = {}) {
  const root = fs.mkdtempSync(path.join(tempRoot, prefix)), repoRoot = path.join(root, 'repo con espacios ü');
  fs.mkdirSync(repoRoot); ownedRepo(repoRoot);
  const sourceFile = path.join(repoRoot, sourcePath), catalogFile = path.join(repoRoot, catalogPath);
  fs.mkdirSync(path.dirname(sourceFile), { recursive: true }); fs.mkdirSync(path.dirname(catalogFile), { recursive: true });
  const eol = options.crlf ? '\r\n' : '\n';
  const source = (options.bom ? '\uFEFF' : '') + ["export const FIXTURE_GUIDE = {", "  path: 'fixture/path',",
    "  nombre: 'Fixture ü',", "  descripcion: 'original',", "  secciones: []", '};', ''].join(eol);
  fs.writeFileSync(sourceFile, source); fs.writeFileSync(catalogFile, syntheticCatalog);
  const leases = [], locks = new Map();
  const ctx = { root, repoRoot, sourceFile, catalogFile, source, sourceBytes: Buffer.from(source),
    sidecars: () => fs.readdirSync(path.dirname(sourceFile)).filter(n => n.startsWith('.factory-fix-')) };
  try {
    git(repoRoot, ['init']); git(repoRoot, ['add', '--all']); git(repoRoot, ['commit', '-m', 'Synthetic baseline']);
    ctx.indexBytes = fs.readFileSync(path.join(repoRoot, '.git/index'));
    ctx.prepared = prepared(ctx, options); assert.equal(ctx.prepared.status, options.noChange ? 'NO_CHANGE' : 'READY_TO_WRITE');
    ctx.ready = () => {
      const result = patched('openSync', original => function(file, flags, ...args) {
        const fd = original(file, flags, ...args);
        if (flags === 'wx' && String(file).endsWith('.lock')) locks.set(String(file), fs.fstatSync(fd, { bigint: true }));
        return fd;
      }, () => inspectWriteReadiness({ repoRoot, preparedResult: ctx.prepared }));
      assert.equal(result.report.status, 'WRITE_READY', JSON.stringify(result.report));
      leases.push(result.lease); ctx.lease = result.lease; ctx.report = result.report; return result;
    };
    ctx.persist = (overrides = {}) => persistPreparedFix({ repoRoot, preparedResult: ctx.prepared, lease: ctx.lease, ...overrides });
    ctx.lockPath = () => [...locks.keys()].at(-1);
    return await run(ctx);
  } finally {
    leases.forEach(releaseWriteLease);
    // Fault tests can deliberately make release fail. Delete only the exact captured TEMP
    // inode after restoring injected fs methods. Never remove another process's lock.
    for (const [filename, owned] of locks) if (fs.existsSync(filename)) {
      const named = fs.lstatSync(filename, { bigint: true });
      assert.equal(named.ino, owned.ino); assert.equal(named.dev, owned.dev);
      assert.equal(path.dirname(filename), path.join(tempRoot, 'aventourarte-factory-fix-locks-v1'));
      fs.unlinkSync(filename);
    }
    const resolved = fs.realpathSync.native(root);
    assert.equal(path.dirname(resolved), tempRoot); assert.ok(path.basename(resolved).startsWith(prefix));
    fs.rmSync(resolved, { recursive: true, force: true });
  }
}
const scenario = (name, run, options) => test('Phase 7 TEMP: ' + name, t => fixture(ctx => run(ctx, t), options));
function patched(key, replacement, run) {
  const original = mutableFs[key]; mutableFs[key] = replacement(original);
  try { return run(); } finally { mutableFs[key] = original; }
}
const ioError = () => Object.assign(new Error('PRIVATE injected path/token/stack'), { code: 'EACCES' });
const isCandidate = file => String(file).endsWith('-candidate.tmp');
const isBackup = file => String(file).endsWith('-original.tmp');
function renameHook(ctx, before, after, run = () => ctx.persist()) {
  let fired = false;
  return patched('renameSync', original => function(from, to) {
    if (!fired && isCandidate(from) && to === ctx.sourceFile) {
      fired = true; before?.(from, to); const result = original(from, to); after?.(from, to); return result;
    }
    return original(from, to);
  }, () => { const result = run(); assert.equal(fired, true); return result; });
}
const hasCode = (r, code) => assert.ok(r.diagnostics.some(d => d.code === code), JSON.stringify(r));
function unchanged(ctx, r, code) {
  assert.notEqual(r.status, 'APPLIED'); if (code) hasCode(r, code);
  assert.deepEqual(fs.readFileSync(ctx.sourceFile), ctx.sourceBytes);
  assert.equal(r.recovery.status, 'NOT_NEEDED'); assert.equal(r.replaceCompleted, false);
  assert.equal(r.persistenceVerified, false); assert.equal(r.qaHandoff, null);
}
function applied(ctx, r) {
  assert.equal(r.status, 'APPLIED', JSON.stringify(r)); assert.equal(r.persistenceVerified, true);
  assert.equal(r.readbackHash, ctx.prepared.candidateHash); assert.equal(r.sourceIdentity.sourceHash, r.candidateHash);
  assert.equal(r.sourceIdentity.sourcePath, sourcePath); assert.equal(r.fileIdentity.nlink, '1');
  assert.notEqual(r.fileIdentity.ino, ctx.report.preconditions.filesystem.file.ino);
  assert.equal(r.replaceCompleted, true); assert.equal(r.recovery.status, 'NOT_NEEDED');
  assert.equal(r.qaHandoff, ctx.prepared.qaHandoff); assert.equal(r.qaHandoff.reviewContext, ctx.prepared.qaHandoff.reviewContext);
  assert.deepEqual(r.persistedOperationIds, ctx.prepared.candidateOperationIds);
  assert.deepEqual(fs.readFileSync(ctx.sourceFile), Buffer.from(ctx.prepared.candidateText));
  assert.deepEqual(fs.readFileSync(ctx.catalogFile), Buffer.from(syntheticCatalog));
  assert.deepEqual(fs.readFileSync(path.join(ctx.repoRoot, '.git/index')), ctx.indexBytes);
  assert.equal(r.guarantees.directoryDurability, 'NOT_GUARANTEED'); assert.equal(r.guarantees.toctouEliminated, false);
  assert.equal(isPreparedWriteLeaseActive(ctx.lease), false);
}

scenario('real replace of existing file, readback, identity, QA handoff, cleanup and privacy', ctx => {
  ctx.ready(); const r = ctx.persist(); applied(ctx, r); assert.equal(r.cleanup, 'COMPLETE'); assert.deepEqual(ctx.sidecars(), []);
  assert.equal(r.lockRelease.status, 'RELEASED'); assert.equal(fs.existsSync(ctx.lockPath()), false);
  const json = JSON.stringify(r); assert.doesNotMatch(json, /candidateText|token|PRIVATE|\.tmp|\.lock|stack|qaStatus/);
  const frozen = v => { if (v && typeof v === 'object') { assert.ok(Object.isFrozen(v)); Object.values(v).forEach(frozen); } }; frozen(r);
  assert.equal(ctx.persist().status, 'BLOCKED');
});
for (const options of [{ crlf: true }, { bom: true }, { crlf: true, bom: true }, {}]) {
  scenario('exact UTF-8/Unicode/spaces/BOM/EOL ' + JSON.stringify(options), ctx => {
    ctx.ready(); const r = ctx.persist(); applied(ctx, r);
    assert.equal(fs.readFileSync(ctx.sourceFile).subarray(0, 3).equals(Buffer.from([239, 187, 191])), !!options.bom);
    if (options.crlf) assert.doesNotMatch(fs.readFileSync(ctx.sourceFile, 'utf8').replace(/\r\n/g, ''), /\n/);
  }, options);
}
scenario('NO_CHANGE rejects without staging, lease claim or filesystem writes', ctx => {
  const r = patched('openSync', original => function(file, flags, ...args) {
    assert.ok(!String(flags).includes('w')); return original(file, flags, ...args);
  }, () => ctx.persist({ lease: {} }));
  unchanged(ctx, r, 'NO_CHANGE_NOT_WRITABLE'); assert.deepEqual(ctx.sidecars(), []);
}, { noChange: true });
for (const kind of ['spread', 'json', 'fake-ready', 'proxy', 'fix-plan']) scenario('forged prepared result ' + kind, ctx => {
  ctx.ready();
  const forged = kind === 'spread' ? { ...ctx.prepared } : kind === 'json' ? JSON.parse(JSON.stringify(ctx.prepared))
    : kind === 'proxy' ? new Proxy(ctx.prepared, {}) : kind === 'fix-plan' ? { path: ctx.sourceFile, text: 'evil' } : { ...ctx.report };
  unchanged(ctx, ctx.persist({ preparedResult: forged }), 'WRITER_INPUT_INVALID');
  assert.equal(isPreparedWriteLeaseActive(ctx.lease), true); assert.deepEqual(ctx.sidecars(), []);
});
for (const kind of ['spread', 'report', 'json-report', 'proxy', 'empty']) scenario('forged lease ' + kind, ctx => {
  ctx.ready(); const forged = kind === 'spread' ? { ...ctx.lease } : kind === 'report' ? ctx.report
    : kind === 'json-report' ? JSON.parse(JSON.stringify(ctx.report)) : kind === 'proxy' ? new Proxy(ctx.lease, {}) : {};
  unchanged(ctx, ctx.persist({ lease: forged }), 'LEASE_INVALID'); assert.equal(isPreparedWriteLeaseActive(ctx.lease), true);
});
scenario('authentic different request/result cannot borrow a lease', ctx => {
  ctx.ready(); const other = prepared(ctx, { requestId: 'different-request' });
  unchanged(ctx, ctx.persist({ preparedResult: other }), 'LEASE_INVALID'); assert.equal(isPreparedWriteLeaseActive(ctx.lease), true);
});
scenario('same metadata in a freshly prepared authentic result still cannot borrow the lease', ctx => {
  ctx.ready(); unchanged(ctx, ctx.persist({ preparedResult: prepared(ctx) }), 'LEASE_INVALID');
});
scenario('released lease cannot write', ctx => { ctx.ready(); releaseWriteLease(ctx.lease); unchanged(ctx, ctx.persist(), 'LEASE_INVALID'); });
scenario('repoRoot cannot redirect authentic capabilities', ctx => {
  ctx.ready(); unchanged(ctx, ctx.persist({ repoRoot: ctx.repoRoot + path.sep + '..' }), 'LEASE_INVALID');
});
test('Phase 7 API rejects path/text/callback extensions and accessors without executing them', () => {
  for (const input of [null, {}, { repoRoot: '.', preparedResult: {}, lease: {}, path: 'anything' },
    { repoRoot: '.', preparedResult: {}, lease: {}, fault: () => assert.fail() },
    Object.defineProperty({ preparedResult: {}, lease: {} }, 'repoRoot', { enumerable: true, get() { assert.fail(); } })]) {
    assert.throws(() => persistPreparedFix(input), TypeError);
  }
});
for (const drift of ['source-write', 'source-replace-identical', 'catalog', 'index', 'head', 'hardlink', 'casing', 'parent']) {
  scenario('pre-replace external drift ' + drift, ctx => {
    ctx.ready();
    if (drift === 'source-write') fs.writeFileSync(ctx.sourceFile, ctx.source + '// external\n');
    if (drift === 'source-replace-identical') { fs.writeFileSync(ctx.sourceFile + '.new', ctx.source); fs.renameSync(ctx.sourceFile + '.new', ctx.sourceFile); }
    if (drift === 'catalog') fs.appendFileSync(ctx.catalogFile, '\n// external catalog\n');
    if (drift === 'index') { fs.writeFileSync(path.join(ctx.repoRoot, 'unrelated'), 'external'); git(ctx.repoRoot, ['add', '--', 'unrelated']); }
    if (drift === 'head') git(ctx.repoRoot, ['commit', '--allow-empty', '-m', 'External HEAD']);
    if (drift === 'hardlink') fs.linkSync(ctx.sourceFile, ctx.sourceFile + '.link');
    if (drift === 'casing') fs.renameSync(ctx.sourceFile, ctx.sourceFile.replace('fixture.guide', 'FIXTURE.guide'));
    if (drift === 'parent') { const parent = path.dirname(ctx.sourceFile); fs.renameSync(parent, parent + '.old'); fs.mkdirSync(parent); fs.writeFileSync(ctx.sourceFile, ctx.source); }
    const before = fs.existsSync(ctx.sourceFile) ? fs.readFileSync(ctx.sourceFile) : null;
    const r = ctx.persist(); assert.equal(r.status, 'BLOCKED', JSON.stringify(r)); assert.equal(r.recovery.status, 'NOT_NEEDED');
    assert.deepEqual(ctx.sidecars(), []); if (before) assert.deepEqual(fs.readFileSync(ctx.sourceFile), before);
  });
}
scenario('lock content loss before staging does not delete foreign lock', ctx => {
  ctx.ready(); const file = ctx.lockPath(); fs.writeFileSync(file, 'foreign');
  unchanged(ctx, ctx.persist(), 'LOCK_OWNERSHIP_LOST'); assert.equal(fs.readFileSync(file, 'utf8'), 'foreign');
});
scenario('cooperating concurrent request blocked and no double release removes newer lock', ctx => {
  ctx.ready(); const blocked = inspectWriteReadiness({ repoRoot: ctx.repoRoot, preparedResult: ctx.prepared });
  assert.equal(blocked.report.status, 'BLOCKED'); assert.equal(blocked.report.diagnostics[0].code, 'LOCK_CONTENDED');
  const old = ctx.lease; releaseWriteLease(old); ctx.ready(); assert.equal(releaseWriteLease(old).status, 'ALREADY_RELEASED');
  applied(ctx, ctx.persist());
});
for (const point of ['before-staging', 'after-create', 'partial-write', 'after-verified-staging', 'after-backup', 'before-replace', 'fsync']) {
  scenario('fault injection before replace: ' + point, ctx => {
    ctx.ready(); let fired = false;
    const key = point === 'before-staging' || point === 'after-verified-staging' ? 'openSync'
      : point === 'after-create' ? 'fstatSync' : point === 'partial-write' ? 'writeSync'
        : point === 'fsync' || point === 'after-backup' ? 'fsyncSync' : 'renameSync';
    let candidateFd, backupFd;
    const r = patched('openSync', original => function(file, flags, ...args) {
      const fd = original(file, flags, ...args);
      if (flags === 'wx' && isCandidate(file)) candidateFd = fd;
      if (flags === 'wx' && isBackup(file)) backupFd = fd;
      return fd;
    }, () => patched(key, original => function(...args) {
      const hit = point === 'before-staging' ? args[1] === 'wx' && isCandidate(args[0])
        : point === 'after-verified-staging' ? args[1] === 'wx' && isBackup(args[0])
        : point === 'after-create' || point === 'partial-write' || point === 'fsync' ? args[0] === candidateFd
        : point === 'after-backup' ? args[0] === backupFd
        : isCandidate(args[0]);
      if (!fired && hit) {
        fired = true;
        if (point === 'partial-write') { original(args[0], args[1], args[2], Math.min(9, args[3])); throw ioError(); }
        if (point === 'after-backup') original(...args);
        throw ioError();
      }
      return original(...args);
    }, () => ctx.persist()));
    assert.equal(fired, true); unchanged(ctx, r);
  });
}
scenario('candidate staging hash corruption blocks replacement and preserves changed sidecar', ctx => {
  ctx.ready(); let filename;
  const r = patched('openSync', original => function(file, flags, ...args) {
    if (flags === 'wx' && isCandidate(file)) filename = String(file);
    if (filename && file === filename && flags !== 'wx') { fs.writeFileSync(filename, 'FOREIGN staging'); filename = null; }
    return original(file, flags, ...args);
  }, () => ctx.persist());
  unchanged(ctx, r, 'STAGING_HASH_MISMATCH'); assert.equal(r.cleanup, 'FAILED'); hasCode(r, 'CLEANUP_FAILED');
  assert.ok(r.recovery.reference); assert.ok(ctx.sidecars().some(n => isCandidate(n)));
});
scenario('a sidecar name collision is never overwritten', ctx => {
  ctx.ready(); let foreign;
  const r = patched('openSync', original => function(file, flags, ...args) {
    if (!foreign && flags === 'wx' && isCandidate(file)) { foreign = String(file); fs.writeFileSync(file, 'existing foreign'); }
    return original(file, flags, ...args);
  }, () => ctx.persist());
  unchanged(ctx, r, 'STAGING_FAILED'); assert.equal(fs.readFileSync(foreign, 'utf8'), 'existing foreign');
});
scenario('externally replaced staging with identical bytes is blocked and not deleted', ctx => {
  ctx.ready(); let candidateFile, fired = false;
  const r = patched('openSync', original => function(file, flags, ...args) {
    if (flags === 'wx' && isCandidate(file)) candidateFile = String(file);
    if (!fired && flags === 'wx' && isBackup(file)) {
      fired = true; fs.renameSync(candidateFile, candidateFile + '.own'); fs.writeFileSync(candidateFile, ctx.prepared.candidateText);
    }
    return original(file, flags, ...args);
  }, () => ctx.persist());
  unchanged(ctx, r, 'STAGING_HASH_MISMATCH'); assert.equal(r.cleanup, 'FAILED');
  assert.equal(fs.readFileSync(candidateFile, 'utf8'), ctx.prepared.candidateText);
});
scenario('corrupted original backup blocks replacement and survives cleanup', ctx => {
  ctx.ready(); let backupFile, fired = false;
  const r = patched('openSync', original => function(file, flags, ...args) {
    if (flags === 'wx' && isBackup(file)) backupFile = String(file);
    else if (!fired && backupFile && file === backupFile) { fired = true; fs.writeFileSync(backupFile, 'foreign backup'); }
    return original(file, flags, ...args);
  }, () => ctx.persist());
  unchanged(ctx, r, 'STAGING_HASH_MISMATCH'); assert.equal(r.cleanup, 'FAILED'); assert.equal(fs.readFileSync(backupFile, 'utf8'), 'foreign backup');
});
scenario('source changed while original backup is being created is revalidated', ctx => {
  ctx.ready(); const external = ctx.source + '// VS Code saved\n'; let fired = false;
  const r = patched('openSync', original => function(file, flags, ...args) {
    const fd = original(file, flags, ...args);
    if (!fired && flags === 'wx' && isBackup(file)) { fired = true; fs.writeFileSync(ctx.sourceFile, external); }
    return fd;
  }, () => ctx.persist());
  assert.notEqual(r.status, 'APPLIED'); assert.equal(r.recovery.status, 'NOT_NEEDED'); assert.equal(fs.readFileSync(ctx.sourceFile, 'utf8'), external);
});
scenario('replace EACCES makes one attempt without unlinking source', ctx => {
  ctx.ready(); let calls = 0;
  const r = patched('unlinkSync', original => function(file) { assert.notEqual(file, ctx.sourceFile); return original(file); },
    () => renameHook(ctx, () => { calls++; throw ioError(); }));
  unchanged(ctx, r, 'REPLACE_FAILED'); assert.equal(calls, 1); assert.equal(r.cleanup, 'COMPLETE');
});
scenario('exception after completed rename is recognized and restored with verified identity', ctx => {
  ctx.ready(); const r = renameHook(ctx, null, () => { throw ioError(); });
  assert.equal(r.status, 'FAILED'); assert.equal(r.replaceCompleted, true); assert.equal(r.recovery.status, 'RESTORED', JSON.stringify(r));
  assert.deepEqual(fs.readFileSync(ctx.sourceFile), ctx.sourceBytes); assert.equal(r.sourceIdentity.sourceHash, ctx.prepared.sourceHash);
  assert.equal(r.recovery.readbackHash, ctx.prepared.sourceHash);
  assert.equal(r.qaHandoff, null); assert.deepEqual(ctx.sidecars(), []);
});
scenario('transient readback read error restores original, never claims APPLIED', ctx => {
  ctx.ready(); let after = false, fired = false;
  const r = patched('openSync', original => function(file, flags, ...args) {
    if (after && !fired && file === ctx.sourceFile) { fired = true; throw ioError(); } return original(file, flags, ...args);
  }, () => renameHook(ctx, null, () => { after = true; }));
  assert.equal(fired, true); hasCode(r, 'READBACK_FAILED'); assert.equal(r.recovery.status, 'RESTORED', JSON.stringify(r));
  assert.deepEqual(fs.readFileSync(ctx.sourceFile), ctx.sourceBytes);
});
for (const drift of ['write', 'replace', 'replace-identical', 'same-inode-identical', 'catalog', 'index', 'head', 'lock']) {
  scenario('after replace external ' + drift + ' is never rolled back', ctx => {
    ctx.ready(); let external;
    const r = renameHook(ctx, null, () => {
      if (drift === 'write' || drift === 'replace') external = ctx.source + '// external after replace\n';
      if (drift === 'write') fs.writeFileSync(ctx.sourceFile, external);
      if (drift === 'replace' || drift === 'replace-identical') {
        external ??= ctx.prepared.candidateText; fs.writeFileSync(ctx.sourceFile + '.external', external); fs.renameSync(ctx.sourceFile + '.external', ctx.sourceFile);
      }
      if (drift === 'same-inode-identical') { external = ctx.prepared.candidateText; fs.writeFileSync(ctx.sourceFile, external); fs.utimesSync(ctx.sourceFile, new Date(1), new Date(1)); }
      if (drift === 'catalog') fs.appendFileSync(ctx.catalogFile, '\n// external\n');
      if (drift === 'index') { fs.writeFileSync(path.join(ctx.repoRoot, 'extra'), 'external'); git(ctx.repoRoot, ['add', '--', 'extra']); }
      if (drift === 'head') git(ctx.repoRoot, ['commit', '--allow-empty', '-m', 'External HEAD']);
      if (drift === 'lock') fs.writeFileSync(ctx.lockPath(), 'foreign lock');
    });
    assert.notEqual(r.status, 'APPLIED', JSON.stringify(r)); assert.equal(r.recovery.status, 'UNSAFE', JSON.stringify(r));
    assert.equal(r.qaHandoff, null); assert.equal(r.recovery.artifactsRetained, true); assert.ok(r.recovery.reference);
    assert.equal(fs.readFileSync(ctx.sourceFile, 'utf8'), external ?? ctx.prepared.candidateText);
    const original = ctx.sidecars().find(isBackup); assert.ok(original); assert.deepEqual(fs.readFileSync(path.join(path.dirname(ctx.sourceFile), original)), ctx.sourceBytes);
  });
}
scenario('readback byte/hash mismatch is explicit and no hash-only rollback', ctx => {
  ctx.ready(); const r = renameHook(ctx, null, () => {
    const stat = fs.statSync(ctx.sourceFile); fs.writeFileSync(ctx.sourceFile, 'x'.repeat(Buffer.byteLength(ctx.prepared.candidateText)));
    fs.utimesSync(ctx.sourceFile, stat.atime, stat.mtime);
  });
  assert.notEqual(r.status, 'APPLIED'); assert.equal(r.recovery.status, 'UNSAFE');
  assert.equal(fs.readFileSync(ctx.sourceFile, 'utf8'), 'x'.repeat(Buffer.byteLength(ctx.prepared.candidateText)));
});
scenario('incorrect readback hash cannot emit APPLIED even when next read recovers original', ctx => {
  ctx.ready(); let after = false, sourceFd, fired = false;
  const r = patched('openSync', original => function(file, ...args) {
    const fd = original(file, ...args); if (after && file === ctx.sourceFile) sourceFd = fd; return fd;
  }, () => patched('readSync', original => function(fd, buffer, offset, length, position) {
    const n = original(fd, buffer, offset, length, position);
    if (after && !fired && fd === sourceFd && n > 0) { fired = true; buffer[offset] ^= 1; }
    return n;
  }, () => renameHook(ctx, null, () => { after = true; })));
  assert.equal(fired, true); hasCode(r, 'READBACK_HASH_MISMATCH'); assert.equal(r.status, 'FAILED');
  assert.equal(r.recovery.status, 'RESTORED', JSON.stringify(r)); assert.deepEqual(fs.readFileSync(ctx.sourceFile), ctx.sourceBytes);
});
scenario('permanent source inspection failure has UNKNOWN recovery and retains backup', ctx => {
  ctx.ready(); let after = false;
  const r = patched('openSync', original => function(file, ...args) { if (after && file === ctx.sourceFile) throw ioError(); return original(file, ...args); },
    () => renameHook(ctx, null, () => { after = true; }));
  assert.equal(r.recovery.status, 'UNKNOWN', JSON.stringify(r)); assert.equal(r.recovery.artifactsRetained, true); hasCode(r, 'RECOVERY_UNKNOWN');
});
scenario('rollback rename failure retains the verified original for manual intervention', ctx => {
  ctx.ready(); const r = patched('renameSync', original => function(from, to) {
    if (isBackup(from)) throw ioError(); const result = original(from, to); if (isCandidate(from)) throw ioError(); return result;
  }, () => ctx.persist());
  assert.equal(r.recovery.status, 'FAILED', JSON.stringify(r)); hasCode(r, 'RECOVERY_FAILED');
  assert.equal(fs.readFileSync(ctx.sourceFile, 'utf8'), ctx.prepared.candidateText); assert.ok(ctx.sidecars().find(isBackup));
});
scenario('recovery readback failure cannot claim RESTORED', ctx => {
  ctx.ready(); let restoring = false, fired = false;
  const r = patched('openSync', original => function(file, ...args) {
    if (restoring && !fired && file === ctx.sourceFile) { fired = true; throw ioError(); }
    return original(file, ...args);
  }, () => patched('renameSync', original => function(from, to) {
    const result = original(from, to);
    if (isCandidate(from)) throw ioError();
    if (isBackup(from)) restoring = true;
    return result;
  }, () => ctx.persist()));
  assert.equal(fired, true); assert.equal(r.recovery.status, 'FAILED'); hasCode(r, 'RECOVERY_FAILED');
  assert.equal(r.persistenceVerified, false); assert.equal(r.qaHandoff, null); assert.ok(r.recovery.reference);
});
scenario('cleanup failure remains explicit after verified APPLIED and retains recovery record', ctx => {
  ctx.ready(); const r = patched('unlinkSync', original => function(file) { if (isBackup(file)) throw ioError(); return original(file); }, () => ctx.persist());
  applied(ctx, r); assert.equal(r.cleanup, 'FAILED'); hasCode(r, 'CLEANUP_FAILED'); assert.ok(r.recovery.reference);
});
scenario('lock release failure is explicit, with no rollback of verified persistence', ctx => {
  ctx.ready(); const r = patched('unlinkSync', original => function(file) { if (String(file).endsWith('.lock')) throw ioError(); return original(file); }, () => ctx.persist());
  applied(ctx, r); assert.equal(r.lockRelease.status, 'FAILED'); hasCode(r, 'LOCK_RELEASE_FAILED'); assert.ok(fs.existsSync(ctx.lockPath()));
});
scenario('ownership lost during cleanup invalidates APPLIED and preserves backup', ctx => {
  ctx.ready(); let fired = false;
  const r = patched('openSync', original => function(file, flags, ...args) {
    if (!fired && isBackup(file) && flags !== 'wx'
      && fs.readFileSync(ctx.sourceFile, 'utf8') === ctx.prepared.candidateText) {
      fired = true; fs.writeFileSync(ctx.lockPath(), 'foreign during cleanup');
    }
    return original(file, flags, ...args);
  }, () => ctx.persist());
  assert.equal(fired, true); assert.equal(r.status, 'FAILED'); hasCode(r, 'LOCK_OWNERSHIP_LOST');
  assert.equal(r.persistenceVerified, false); assert.equal(r.recovery.status, 'UNSAFE');
  assert.ok(ctx.sidecars().find(isBackup)); assert.equal(fs.readFileSync(ctx.lockPath(), 'utf8'), 'foreign during cleanup');
});
scenario('source changed just after cleanup is preserved and fails final readback', ctx => {
  ctx.ready(); const external = ctx.source + '// external during cleanup\n'; let fired = false;
  const r = patched('unlinkSync', original => function(file) {
    const result = original(file);
    if (!fired && isBackup(file)) { fired = true; fs.writeFileSync(ctx.sourceFile, external); }
    return result;
  }, () => ctx.persist());
  assert.equal(fired, true); assert.equal(r.status, 'FAILED'); assert.equal(r.persistenceVerified, false);
  assert.equal(r.recovery.status, 'UNSAFE'); assert.ok(r.recovery.reference); assert.equal(r.qaHandoff, null);
  assert.equal(fs.readFileSync(ctx.sourceFile, 'utf8'), external);
});
scenario('sidecar replaced during cleanup is never deleted', ctx => {
  ctx.ready(); let fired = false, foreign;
  const r = patched('lstatSync', original => function(file, ...args) {
    if (!fired && isBackup(file) && fs.readFileSync(ctx.sourceFile, 'utf8') === ctx.prepared.candidateText) {
      fired = true; foreign = String(file); fs.renameSync(file, file + '.owned'); fs.writeFileSync(file, 'FOREIGN cleanup');
    }
    return original(file, ...args);
  }, () => ctx.persist());
  assert.equal(fired, true); assert.equal(r.cleanup, 'FAILED'); assert.equal(fs.readFileSync(foreign, 'utf8'), 'FOREIGN cleanup');
});
scenario('lost lock directory after replace blocks rollback and preserves originals', ctx => {
  ctx.ready(); const lockFile = ctx.lockPath(), lockRoot = path.dirname(lockFile), moved = lockRoot + '-phase7-' + process.pid;
  let didMove = false;
  try {
    const r = renameHook(ctx, null, () => {
      fs.renameSync(lockRoot, moved); didMove = true; fs.mkdirSync(lockRoot); fs.writeFileSync(lockFile, 'foreign root lock');
    });
    assert.equal(r.recovery.status, 'UNSAFE'); assert.equal(fs.readFileSync(lockFile, 'utf8'), 'foreign root lock');
    assert.equal(fs.readFileSync(ctx.sourceFile, 'utf8'), ctx.prepared.candidateText);
  } finally {
    if (didMove) { fs.unlinkSync(lockFile); fs.rmdirSync(lockRoot); fs.renameSync(moved, lockRoot); }
  }
});
scenario('directory junction introduced after readiness is rejected', (ctx, t) => {
  ctx.ready(); const parent = path.dirname(ctx.sourceFile), old = parent + '.old';
  fs.renameSync(parent, old);
  try { fs.symlinkSync(old, parent, process.platform === 'win32' ? 'junction' : 'dir'); }
  catch (e) { fs.renameSync(old, parent); if (['EPERM', 'EACCES', 'ENOTSUP'].includes(e.code)) return t.skip('Junction unavailable: NOT ACCREDITED.'); throw e; }
  try { assert.equal(ctx.persist().status, 'BLOCKED'); assert.deepEqual(fs.readFileSync(ctx.sourceFile), ctx.sourceBytes); }
  finally { fs.unlinkSync(parent); fs.renameSync(old, parent); }
});

for (const kind of ['candidate', 'original']) scenario('AUDIT: final stat cannot adopt a foreign ' + kind + ' inode', ctx => {
  ctx.ready(); let checks = 0, fired = false, foreign;
  const match = kind === 'candidate' ? isCandidate : isBackup;
  const r = patched('lstatSync', original => function(file, ...args) {
    if (!fired && match(file) && ++checks === 3) {
      fired = true; foreign = String(file); fs.renameSync(file, file + '.owned');
      fs.writeFileSync(file, kind === 'candidate' ? ctx.prepared.candidateText : ctx.sourceBytes);
    }
    return original(file, ...args);
  }, () => ctx.persist());
  assert.equal(fired, true); unchanged(ctx, r); assert.ok(fs.existsSync(foreign));
  assert.deepEqual(fs.readFileSync(foreign), kind === 'candidate' ? Buffer.from(ctx.prepared.candidateText) : ctx.sourceBytes);
});
scenario('AUDIT: WRITE_READY material is immutable and altered copies cannot borrow authority', ctx => {
  ctx.ready();
  for (const [key, value] of [['candidateText', 'external'], ['candidateHash', '0'.repeat(64)],
    ['sourceHash', '0'.repeat(64)], ['requestDigest', '0'.repeat(64)]]) {
    assert.equal(Reflect.set(ctx.prepared, key, value), false);
    unchanged(ctx, ctx.persist({ preparedResult: { ...ctx.prepared, [key]: value } }), 'WRITER_INPUT_INVALID');
    assert.equal(isPreparedWriteLeaseActive(ctx.lease), true);
  }
  assert.equal(Reflect.set(ctx.prepared.sourceIdentity, 'sourcePath', '../other.guide.ts'), false);
  assert.equal(Reflect.set(ctx.prepared.sourceIdentity.catalogBinding, 'catalogHash', '0'.repeat(64)), false);
  applied(ctx, ctx.persist());
});
scenario('AUDIT: a second consumer and caller release cannot interrupt a claimed lease', ctx => {
  ctx.ready(); let fired = false;
  const r = patched('openSync', original => function(file, flags, ...args) {
    if (!fired && flags === 'wx' && isCandidate(file)) {
      fired = true; unchanged(ctx, ctx.persist(), 'LEASE_INVALID');
      assert.equal(releaseWriteLease(ctx.lease).status, 'BLOCKED');
      assert.equal(isPreparedWriteLeaseActive(ctx.lease), true);
    }
    return original(file, flags, ...args);
  }, () => ctx.persist());
  assert.equal(fired, true); applied(ctx, r); assert.equal(ctx.persist().status, 'BLOCKED');
});
scenario('AUDIT: staging changed after its final byte read is rejected before replace', ctx => {
  ctx.ready(); let reads = 0, fd, stagingFile, fired = false;
  const r = patched('openSync', original => function(file, flags, ...args) {
    const opened = original(file, flags, ...args);
    if (isCandidate(file) && flags !== 'wx' && ++reads === 3) { fd = opened; stagingFile = String(file); }
    return opened;
  }, () => patched('readSync', original => function(descriptor, ...args) {
    const n = original(descriptor, ...args);
    if (!fired && descriptor === fd && n === 0) {
      fired = true; const altered = Buffer.from(ctx.prepared.candidateText); altered[0] ^= 1; fs.writeFileSync(stagingFile, altered);
    }
    return n;
  }, () => ctx.persist()));
  assert.equal(fired, true); unchanged(ctx, r);
});
scenario('AUDIT: backup changed during recovery sync cannot be restored', ctx => {
  ctx.ready(); let backupFile, writeFd, recoveryFd, fired = false;
  const r = patched('openSync', original => function(file, flags, ...args) {
    const fd = original(file, flags, ...args);
    if (isBackup(file) && flags === 'wx') { backupFile = String(file); writeFd = fd; }
    if (isBackup(file) && typeof flags === 'number' && (flags & fs.constants.O_RDWR)) recoveryFd = fd;
    return fd;
  }, () => patched('closeSync', original => function(fd) {
    const result = original(fd);
    if (fd === writeFd) { writeFd = undefined; fs.utimesSync(backupFile, 1, 1); }
    return result;
  }, () => patched('fsyncSync', original => function(fd) {
    const result = original(fd);
    if (!fired && fd === recoveryFd) {
      fired = true; fs.writeFileSync(backupFile, ctx.source.replace('original', 'external')); fs.utimesSync(backupFile, 1, 1);
    }
    return result;
  }, () => renameHook(ctx, null, () => { throw ioError(); }))));
  assert.equal(fired, true); assert.equal(r.recovery.status, 'UNSAFE', JSON.stringify(r));
  assert.equal(fs.readFileSync(ctx.sourceFile, 'utf8'), ctx.prepared.candidateText);
});
scenario('AUDIT: lock ownership loss at release invalidates RESTORED', ctx => {
  ctx.ready(); const bridge = compiled('write-readiness'), original = bridge.finishPreparedWriteLease;
  bridge.finishPreparedWriteLease = lease => { fs.writeFileSync(ctx.lockPath(), 'foreign after restoration'); return original(lease); };
  let r;
  try { r = renameHook(ctx, null, () => { throw ioError(); }); }
  finally { bridge.finishPreparedWriteLease = original; }
  assert.equal(r.lockRelease.status, 'BLOCKED'); assert.equal(r.recovery.status, 'UNSAFE');
  assert.equal(r.sourceIdentity, null); assert.equal(r.fileIdentity, null); assert.equal(r.qaHandoff, null);
  assert.deepEqual(fs.readFileSync(ctx.sourceFile), ctx.sourceBytes);
});
scenario('AUDIT: cleanup does not depend on fresh entropy before releasing consumed lease', ctx => {
  ctx.ready(); const crypto = require('node:crypto'), originalRandom = crypto.randomBytes;
  let cleanupFailed = false, lateEntropyRequests = 0;
  crypto.randomBytes = (...args) => { if (cleanupFailed) { lateEntropyRequests++; throw ioError(); } return originalRandom(...args); };
  let r;
  try { r = patched('unlinkSync', original => function(file) {
    if (isBackup(file)) { cleanupFailed = true; throw ioError(); } return original(file);
  }, () => ctx.persist()); }
  finally { crypto.randomBytes = originalRandom; }
  assert.equal(cleanupFailed, true); assert.equal(lateEntropyRequests, 0);
  assert.equal(r.cleanup, 'FAILED'); assert.equal(r.lockRelease.status, 'RELEASED');
  assert.equal(isPreparedWriteLeaseActive(ctx.lease), false); assert.equal(fs.existsSync(ctx.lockPath()), false);
  assert.ok(r.recovery.reference); assert.equal(ctx.persist().status, 'BLOCKED');
});
scenario('AUDIT: transient close failure on a verification reader does not leak its descriptor', ctx => {
  ctx.ready(); const opened = new Map(); let fired = false;
  try {
    const r = patched('openSync', original => function(file, flags, ...args) {
      const fd = original(file, flags, ...args); opened.set(fd, { file: String(file), flags, stat: fs.fstatSync(fd, { bigint: true }) }); return fd;
    }, () => patched('closeSync', original => function(fd) {
      const entry = opened.get(fd);
      if (!fired && entry && isCandidate(entry.file) && entry.flags !== 'wx') { fired = true; throw ioError(); }
      const result = original(fd); opened.delete(fd); return result;
    }, () => ctx.persist()));
    assert.equal(fired, true); unchanged(ctx, r); assert.equal(opened.size, 0, 'Writer-owned reader descriptor leaked');
    assert.equal(ctx.persist().status, 'BLOCKED');
  } finally {
    for (const [fd, entry] of opened) {
      const stat = fs.fstatSync(fd, { bigint: true }); assert.equal(stat.dev, entry.stat.dev); assert.equal(stat.ino, entry.stat.ino); fs.closeSync(fd);
    }
  }
});
scenario('AUDIT: uncertain rollback with unreadable target reports UNKNOWN', ctx => {
  const oldTemp = process.env.TEMP, oldTmp = process.env.TMP;
  // Isolate the lock root while this focused fault case may run beside the full suite.
  process.env.TEMP = ctx.root; process.env.TMP = ctx.root;
  let uncertain = false;
  try {
    ctx.ready();
    const r = patched('openSync', original => function(file, ...args) {
      if (uncertain && file === ctx.sourceFile) throw ioError(); return original(file, ...args);
    }, () => patched('renameSync', original => function(from, to) {
      const result = original(from, to);
      if (isCandidate(from)) throw ioError();
      if (isBackup(from)) { uncertain = true; throw ioError(); }
      return result;
    }, () => ctx.persist()));
    assert.equal(uncertain, true); assert.equal(r.status, 'FAILED'); assert.equal(r.recovery.status, 'UNKNOWN');
    hasCode(r, 'RECOVERY_UNKNOWN'); assert.equal(r.sourceIdentity, null); assert.equal(r.qaHandoff, null);
    assert.deepEqual(fs.readFileSync(ctx.sourceFile), ctx.sourceBytes); assert.ok(r.recovery.reference);
  } finally {
    if (oldTemp === undefined) delete process.env.TEMP; else process.env.TEMP = oldTemp;
    if (oldTmp === undefined) delete process.env.TMP; else process.env.TMP = oldTmp;
  }
});

test('Phase 7 Windows: destination open by Node in another process (real sharing semantics)', { skip: process.platform !== 'win32' },
  async () => fixture(async ctx => {
    ctx.ready(); const child = spawn(process.execPath, ['-e', "const fs=require('fs');const fd=fs.openSync(process.argv[1],'r');process.stdout.write('ready');process.stdin.resume();process.stdin.on('end',()=>{fs.closeSync(fd);process.exit(0)});", ctx.sourceFile],
      { shell: false, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
    try {
      await once(child.stdout, 'data'); const r = ctx.persist();
      if (r.status === 'APPLIED') applied(ctx, r); else unchanged(ctx, r, 'REPLACE_FAILED');
    } finally { child.stdin.end(); await once(child, 'exit'); }
  }));
test('Phase 7 Windows: native deny-delete handle in another process rejects rename', { skip: process.platform !== 'win32' }, async t => {
  const probe = spawnSync('python', ['-c', 'import ctypes'], { shell: false, windowsHide: true, timeout: 10000 });
  if (probe.error || probe.status !== 0) return t.skip('Existing Python ctypes unavailable; native sharing test NOT ACCREDITED.');
  await fixture(async ctx => {
    ctx.ready();
    const code = `import ctypes,sys\nk=ctypes.WinDLL('kernel32',use_last_error=True)\nk.CreateFileW.argtypes=[ctypes.c_wchar_p,ctypes.c_uint32,ctypes.c_uint32,ctypes.c_void_p,ctypes.c_uint32,ctypes.c_uint32,ctypes.c_void_p]\nk.CreateFileW.restype=ctypes.c_void_p\nh=k.CreateFileW(sys.argv[1],0x80000000,1,None,3,0,None)\nassert h!=ctypes.c_void_p(-1).value,ctypes.get_last_error()\nprint('ready',flush=True)\nsys.stdin.read()\nk.CloseHandle.argtypes=[ctypes.c_void_p]\nk.CloseHandle(h)\n`;
    const child = spawn('python', ['-u', '-c', code, ctx.sourceFile], { shell: false, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
    try { await once(child.stdout, 'data'); unchanged(ctx, ctx.persist(), 'REPLACE_FAILED'); }
    finally { child.stdin.end(); await once(child, 'exit'); }
  });
});
test('Phase 7 Windows: readonly destination rejects replacement without delete fallback', { skip: process.platform !== 'win32' },
  () => fixture(ctx => {
    fs.chmodSync(ctx.sourceFile, 0o444); ctx.ready();
    try { unchanged(ctx, ctx.persist(), 'REPLACE_FAILED'); }
    finally { fs.chmodSync(ctx.sourceFile, 0o666); }
  }));
test('Phase 7 Windows: ACL denial / real Defender interference / power-loss directory durability',
  { skip: 'NOT ACCREDITED: no ACL mutation, Defender configuration or power-loss experiment is performed.' }, () => {});

test('Phase 7 capability audit: only bound writer exported; no shell, network, model, MCP, QA or mutating Git runtime', () => {
  assert.deepEqual(Object.keys(compiled('writer')), ['persistPreparedFix']);
  const runtime = fs.readFileSync(path.join(projectRoot, 'scripts/factory-fix/writer.ts'), 'utf8');
  assert.doesNotMatch(runtime, /from ['"](?:node:child_process|node:https?|node:net|node:vm)|\beval\s*\(|\bnew Function\b/);
  assert.doesNotMatch(runtime, /factory_qa_review\s*\(|spawnSync\s*\(|execSync\s*\(|fetch\s*\(/);
  assert.doesNotMatch(runtime, /export function (?!persistPreparedFix)/);
  assert.doesNotMatch(runtime, /unlinkSync\(source\)|rmSync\(|rmdirSync\(/);
});
