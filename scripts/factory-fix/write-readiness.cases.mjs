import test from 'node:test';
import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(import.meta.url), ts = require('typescript');
const outDir = process.env.FACTORY_FIX_OUT_DIR;
if (!outDir) throw new Error('Test configuration: FACTORY_FIX_OUT_DIR is required.');
const compiled = name => require(path.join(outDir, 'scripts/factory-fix', name + '.js'));
const { resolveFactoryGuideSourceIdentity, listFactoryGuideSourceIdentities } = compiled('source-identity');
const { buildGuideSnapshot, getSnapshotNode, getSnapshotSourceText } = compiled('snapshot');
const { getGuideRootRef, listChildTargets } = compiled('target-locator');
const { createCandidateOperation, prepareCandidateOperation } = compiled('operations');
const { buildCandidate } = compiled('candidate');
const { createAuthorizationManifest } = compiled('authorization');
const { authorizeCandidate } = compiled('authorized-candidate');
const { enforceMinimalDiff, readCandidateRoot } = compiled('minimal-diff');
const { enforceScope, operationRef } = compiled('modification-scope');
const { guideTree } = compiled('static-data');
const { AUTHORIZATION_LIMITS } = compiled('authorization-contracts');
const { authDigest } = compiled('authorization-data');
const { SourceIdentityError } = compiled('errors');
const tempRoot = realpathSync.native(tmpdir()), prefix = 'factory-fix-phase6-fixture-';
const catalogPath = 'src/app/shared/guide-factory-catalog.ts';
const catalogText = readFileSync(path.join(projectRoot, catalogPath), 'utf8');
const profile = { dieta: { certeza: 'desconocido' }, alcohol: 'desconocido', cerdo: 'desconocido' };
const visit = { nombre: 'Nuevo', tiposPlan: ['ruta', 'urbano'], descripcion: 'Texto útil', foto: 'cld:fixture/image', web: 'https://example.test/' };
const zone = { nombre: 'Zona', descripcion: 'Visita útil', tiposPlan: ['ruta'] };
const municipal = { guidePath: 'europa/espana/fixture', ruleSet: 'spanish-municipal' };
const baseFields = `nombre: 'Fixture', descripcion: 'original',
  info: { web: 'https://old.example/', telefono: 'old', count: 1, enabled: true, nullable: null },
  info2: { telefono: 'sibling' }, empty: {}, scalars: [1, 2, 3],
  values: [{ nombre: 'Repeated', telefono: 'A' }, { nombre: 'Repeated', telefono: 'B' }, { nombre: 'C', telefono: 'C' }],
  secciones: [
    { titulo: 'Historia' }, { titulo: 'Geografía y Clima' },
    { titulo: 'Qué visitar en Fixture', lugares: [${JSON.stringify(visit)}, { web: '/historical', descripcion: 'según nuestra investigación' }] },
    { titulo: 'Gastronomía', platos: [{ nombre: 'Plato', descripcion: 'Texto', perfilAlimentario: ${JSON.stringify(profile)} }, { nombre: 'Histórico' }] },
    { titulo: 'Dónde comer en Fixture', lugares: [{ nombre: 'Bar', descripcion: 'Texto útil', web: 'https://example.test/' }] },
    { titulo: 'Cultura y Vida Local' },
    { titulo: 'Fiestas y Festivos Principales', lugares: [{ nombre: 'Fiesta', descripcion: 'Texto', fecha: 'Agosto' }] }
  ]`;
const international = { fields: `nombre: 'Fixture', descripcion: 'original', info: { telefono: 'old' },
  secciones: [{ titulo: 'Qué visitar', itinerario: [{ dia: 'Día 9', zonas: [${JSON.stringify(zone)}] }] }]` };
function fixtureCatalog(ruleSet) {
  const source = ts.createSourceFile('catalog.ts', catalogText, ts.ScriptTarget.ES2022, true);
  const imports = source.statements.filter(ts.isImportDeclaration);
  const assignment = source.statements.filter(ts.isVariableStatement).flatMap(s => s.declarationList.declarations)
    .find(d => d.name.getText(source) === 'guideAssignments').initializer;
  return catalogText.slice(0, imports[1].getStart(source))
    + "import { FIXTURE_GUIDE } from '../guides/fixture.guide';" + catalogText.slice(imports.at(-1).end, assignment.getStart(source))
    + `[[FIXTURE_GUIDE, '${ruleSet}']]` + catalogText.slice(assignment.end);
}
function fixture(run, options = {}) {
  const root = mkdtempSync(path.join(tempRoot, prefix)), repoRoot = path.join(root, 'repo');
  const sourceFile = path.join(repoRoot, 'src/app/guides/fixture.guide.ts'), catalogFile = path.join(repoRoot, catalogPath);
  const guidePath = options.guidePath ?? 'fixture/path';
  const source = options.source ?? `export const FIXTURE_GUIDE = { path: '${guidePath}', ${options.fields ?? baseFields} };\n`;
  mkdirSync(path.dirname(sourceFile), { recursive: true }); mkdirSync(path.dirname(catalogFile), { recursive: true });
  writeFileSync(sourceFile, source); writeFileSync(catalogFile, fixtureCatalog(options.ruleSet ?? 'generic'));
  try {
    const sourceIdentity = resolveFactoryGuideSourceIdentity({ repoRoot, guidePath });
    return run({ snapshot: buildGuideSnapshot({ repoRoot, sourceIdentity }), source, sourceFile, catalogFile, repoRoot, guidePath });
  } finally {
    const resolved = realpathSync.native(root);
    assert.equal(path.dirname(resolved), tempRoot); assert.ok(path.basename(resolved).startsWith(prefix));
    rmSync(resolved, { recursive: true, force: true });
  }
}
function synthetic(name, run, options) { test(`Phase 6 synthetic: ${name}`, () => fixture(run, options)); }
function refAt(s, ...steps) {
  let ref = getGuideRootRef(s);
  for (const step of steps) {
    const refs = listChildTargets({ snapshot: s, parentRef: ref });
    ref = typeof step === 'number' ? refs[step] : refs.find(ref => ref.location.at(-1)?.property === step);
    assert.ok(ref, 'Missing fixture ref: ' + step);
  }
  return ref;
}
const children = (s, ref) => listChildTargets({ snapshot: s, parentRef: ref });
const wire = (s, op) => createCandidateOperation({ snapshot: s, operation: op });
const update = (s, steps, value) => ({ type: 'UPDATE_VALUE', targetRef: refAt(s, ...steps), value });
const addProperty = (s, steps, propertyName, value, placement = { mode: 'auto' }) =>
  ({ type: 'ADD_PROPERTY', parentRef: refAt(s, ...steps), propertyName, value, placement });
const addElement = (s, steps, value, placement = { mode: 'append' }) =>
  ({ type: 'ADD_ELEMENT', parentRef: refAt(s, ...steps), value, placement });
const remove = (s, steps, type = 'REMOVE_PROPERTY') => ({ type, targetRef: refAt(s, ...steps) });
const reorder = (s, steps, indices) => {
  const parentRef = refAt(s, ...steps), refs = children(s, parentRef);
  return { type: 'REORDER_ELEMENTS', parentRef, order: indices.map(i => refs[i]) };
};
function plain(tree) {
  if (tree.kind === 'scalar') return tree.value;
  if (tree.kind === 'array') return tree.elements.map(plain);
  return Object.fromEntries(tree.properties.map(p => [p.name, plain(p.tree)]));
}
const current = (s, ref) => plain(guideTree(getSnapshotNode(s, ref.location)));
function request(s, ops, overrides = {}) {
  const actions = ops.map((op, i) => {
    const ref = operationRef(op);
    return { actionKey: 'action-' + i, requirement: 'REQUIRED', scopeId: 'scope-' + i, operation: op,
      preconditions: op.type === 'ADD_PROPERTY' ? { mode: 'ABSENT_PROPERTY', propertyName: op.propertyName }
        : ['ADD_ELEMENT', 'REORDER_ELEMENTS'].includes(op.type) ? { mode: 'MEMBERS', expectedOrder: children(s, ref) }
        : { mode: 'VALUE', expectedValue: current(s, ref) },
      payloadConstraint: { mode: 'value' in op ? 'EXACT_VALUE' : 'NO_PAYLOAD' },
      evidencePolicy: { allowedIds: [], minimum: 0 }, dependencies: [], explicitRemoval: op.type.startsWith('REMOVE') };
  });
  return { requestId: 'fixture-request', nonce: null, allowPartial: false,
    preconditions: { guidePath: s.sourceIdentity.guidePath, sourceIdentity: s.sourceIdentity,
      sourceHash: s.sourceHash, catalogHash: s.sourceIdentity.catalogBinding.catalogHash,
      snapshotId: s.snapshotId, ruleSet: s.sourceIdentity.ruleSet },
    scopeTargets: actions.map(a => ({ scopeId: a.scopeId, ref: operationRef(a.operation),
      extent: a.operation.type === 'ADD_PROPERTY' ? 'OBJECT' : ['ADD_ELEMENT', 'REORDER_ELEMENTS'].includes(a.operation.type)
        ? 'COLLECTION' : a.operation.type === 'REMOVE_ELEMENT' ? 'ELEMENT' : 'PROPERTY',
      allowedDescendants: [], allowedOperations: [a.operation.type] })), actions, evidenceBindings: [], ...overrides };
}
function manifest(s, r) { return createAuthorizationManifest({ snapshot: s, request: r }); }
const proposals = m => m.authorizedActions.map(a => ({ actionId: a.actionId, operation: a.operation, evidenceIds: [...a.evidencePolicy.allowedIds] }));
const authorize = (s, m, ops = proposals(m), requestDigest = m.requestDigest) => authorizeCandidate({ snapshot: s, manifest: m, requestDigest, operations: ops });
const run = (s, ...ops) => authorize(s, manifest(s, request(s, ops)));
function rejects(fn, code) {
  assert.throws(fn, error => error instanceof SourceIdentityError && error.code === code
    && error.message === `Factory source identity: ${code}.`);
}
function evidence(r, i = 0, overrides = {}) {
  const a = r.actions[i], ref = operationRef(a.operation), last = ref.location.at(-1);
  const binding = { evidenceId: 'evidence-' + i, actionKey: a.actionKey, targetRef: ref, origin: 'Researcher',
    provenanceReference: 'request-scoped finding fixture', entity: 'Fixture entity',
    field: a.operation.type === 'ADD_PROPERTY' ? a.operation.propertyName : last?.property ?? null,
    material: 'Supplied factual fixture material', findingStatus: 'SUPPORTED', limitations: ['Fixture only'],
    sourceReferences: ['Descriptive source reference'], observedAt: '2026-10-06', ...overrides };
  r.evidenceBindings.push(binding); a.evidencePolicy = { allowedIds: [binding.evidenceId], minimum: 1 }; return binding;
}
function candidateValue(s, result, ...steps) {
  let value = plain(guideTree(readCandidateRoot(s, result.candidateText)));
  for (const step of steps) value = value[step]; return value;
}
function unchanged(ctx, fn) {
  const guide = readFileSync(ctx.sourceFile), catalog = readFileSync(ctx.catalogFile);
  const result = fn(); assert.deepEqual(readFileSync(ctx.sourceFile), guide); assert.deepEqual(readFileSync(ctx.catalogFile), catalog); return result;
}

const mutableFs = require('node:fs'), mutableProcess = require('node:child_process');
const { prepareFixResult } = compiled('prepared-result');
const { inspectWriteReadiness, releaseWriteLease, isPreparedWriteLeaseActive } = compiled('write-readiness');
const { inspectRepositoryRoot, observeSourcePath, validateSourcePath, assertSameFilesystem } = compiled('path-safety');
const { inspectGitTargetState, parseGitIndex, parseGitStatus, parseGitCachedChanges } = compiled('git-inspection');
const { acquireSourceLock, releaseSourceLock, isSourceLockHeld } = compiled('source-lock');
const { WORKSPACE_ERROR_CODES, WORKSPACE_CLASSIFICATION, WORKSPACE_LIMITS, WorkspaceError } = compiled('workspace-contracts');
// Mutation helpers are test-only and assert TEMP ownership. Production has no callbacks or generic Git runner.
function gitFixture(repoRoot, args, input, expected = 0) {
  const owner = path.dirname(repoRoot);
  assert.equal(path.dirname(owner), tempRoot); assert.ok(path.basename(owner).startsWith(prefix));
  const child = spawnSync('git', ['--no-optional-locks', '-c', 'core.autocrlf=false', '-c', 'core.fsmonitor=false',
    '-c', 'core.hooksPath=/dev/null', '-c', 'user.name=Factory Fixture', '-c', 'user.email=fixture@example.invalid', ...args], {
    cwd: repoRoot, shell: false, windowsHide: true, encoding: 'utf8', input, timeout: 10000, maxBuffer: 2 * 1024 * 1024,
    env: { PATH: process.env.PATH ?? process.env.Path, SystemRoot: process.env.SystemRoot, WINDIR: process.env.WINDIR,
      GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: process.platform === 'win32' ? 'NUL' : '/dev/null',
      GIT_TERMINAL_PROMPT: '0', GIT_OPTIONAL_LOCKS: '0', TEMP: tempRoot, TMP: tempRoot } });
  assert.equal(child.error, undefined); assert.equal(child.status, expected, child.stdout + child.stderr); return child.stdout.trim();
}
function freshPrepared(ctx, noOp = false) {
  const sourceIdentity = resolveFactoryGuideSourceIdentity({ repoRoot: ctx.repoRoot, guidePath: ctx.guidePath });
  const s = buildGuideSnapshot({ repoRoot: ctx.repoRoot, sourceIdentity });
  const m = manifest(s, request(s, [update(s, ['descripcion'], noOp ? current(s, refAt(s, 'descripcion')) : 'Fixture candidate.')]));
  return prepareFixResult({ snapshot: s, manifest: m, operations: proposals(m), requestDigest: m.requestDigest });
}
function withGit(run, options = {}) {
  return fixture(ctx => {
    gitFixture(ctx.repoRoot, ['init']); gitFixture(ctx.repoRoot, ['add', '--all']);
    if (options.untracked) gitFixture(ctx.repoRoot, ['rm', '--cached', '--', 'src/app/guides/fixture.guide.ts']);
    gitFixture(ctx.repoRoot, ['commit', '-m', 'Fixture baseline']);
    ctx.repository = inspectRepositoryRoot(ctx.repoRoot); ctx.prepared = freshPrepared(ctx);
    const leases = [];
    ctx.inspect = () => { const result = inspectWriteReadiness({ repoRoot: ctx.repoRoot, preparedResult: ctx.prepared }); if (result.lease) leases.push(result.lease); return result; };
    try { return run(ctx); }
    finally { leases.forEach(releaseWriteLease); }
  }, options);
}
const environmentCase = (name, run, options) => test(`Phase 6 environment: ${name}`, () => withGit(run, options));
const blocked = (r, code) => { assert.equal(r.report.status, 'BLOCKED'); if (code) assert.equal(r.report.diagnostics[0].code, code); assert.equal('lease' in r, false); };
function checkReady(result, ctx) {
  assert.equal(result.report.status, 'WRITE_READY', JSON.stringify(result.report));
  assert.equal(result.report.candidateHash, ctx.prepared.candidateHash); assert.equal(result.report.sourceHash, ctx.prepared.sourceHash);
  assert.equal(result.report.requestDigest, ctx.prepared.requestDigest); assert.equal(result.report.sourcePath, ctx.prepared.sourceIdentity.sourcePath);
  assert.equal(result.report.repository.digest, ctx.repository.digest); assert.equal(isPreparedWriteLeaseActive(result.lease), true);
  const visit = value => { if (value && typeof value === 'object') { assert.ok(Object.isFrozen(value)); Object.values(value).forEach(visit); } }; visit(result.report);
}
function patched(object, key, replacement, run) { const old = object[key]; object[key] = replacement(old); try { return run(); } finally { object[key] = old; } }
function afterExclusiveLock(mutate, run) {
  let fired = false;
  return patched(mutableFs, 'openSync', original => function(file, flags, ...args) {
    const result = original(file, flags, ...args);
    if (!fired && flags === 'wx' && String(file).endsWith('.lock')) { fired = true; mutate(String(file)); }
    return result;
  }, () => { const result = run(); assert.equal(fired, true); return result; });
}
function removeOwnedTestLock(file) {
  assert.equal(path.dirname(file), path.join(realpathSync.native(tempRoot), 'aventourarte-factory-fix-locks-v1'));
  assert.match(path.basename(file), /^[a-f0-9]{64}\.lock$/); fs.unlinkSync(file);
}

environmentCase('tracked clean target, frozen JSON-safe report, source/index unchanged', ctx => {
  const source = readFileSync(ctx.sourceFile), catalog = readFileSync(ctx.catalogFile), index = readFileSync(path.join(ctx.repoRoot, '.git/index'));
  const r = ctx.inspect(); checkReady(r, ctx); assert.equal(r.report.preconditions.git.state, 'TRACKED_CLEAN');
  const json = JSON.stringify(r.report); assert.doesNotMatch(json, /token|\.lock|APPLIED/);
  assert.equal(r.report.diagnostics.toctouEliminated, false); assert.equal(r.report.diagnostics.sourceWrite, false);
  assert.deepEqual(readFileSync(ctx.sourceFile), source); assert.deepEqual(readFileSync(ctx.catalogFile), catalog);
  assert.deepEqual(readFileSync(path.join(ctx.repoRoot, '.git/index')), index); assert.equal(releaseWriteLease(r.lease).status, 'RELEASED');
});
environmentCase('unrelated unstaged, staged and untracked files are permitted', ctx => {
  writeFileSync(path.join(ctx.repoRoot, 'other.txt'), 'one'); gitFixture(ctx.repoRoot, ['add', '--', 'other.txt']);
  writeFileSync(path.join(ctx.repoRoot, 'other.txt'), 'two'); writeFileSync(path.join(ctx.repoRoot, 'untracked.txt'), 'three'); checkReady(ctx.inspect(), ctx);
});
for (const state of ['unstaged', 'staged', 'both']) environmentCase(`target ${state} dirty is rejected`, ctx => {
  writeFileSync(ctx.sourceFile, ctx.source + '\n// target changed\n');
  if (state !== 'unstaged') gitFixture(ctx.repoRoot, ['add', '--', 'src/app/guides/fixture.guide.ts']);
  if (state === 'both') fs.appendFileSync(ctx.sourceFile, '// another change\n');
  ctx.prepared = freshPrepared(ctx); blocked(ctx.inspect(), state === 'unstaged' ? 'TARGET_DIRTY_WORKTREE' : 'TARGET_DIRTY_INDEX');
});
environmentCase('target untracked is rejected without auto-add', ctx => blocked(ctx.inspect(), 'TARGET_UNTRACKED'), { untracked: true });
environmentCase('ignored untracked target is rejected', ctx => {
  writeFileSync(path.join(ctx.repoRoot, '.gitignore'), 'src/app/guides/fixture.guide.ts\n'); blocked(ctx.inspect(), 'TARGET_UNTRACKED');
}, { untracked: true });
environmentCase('source deletion blocks and Git reports deleted', ctx => {
  fs.unlinkSync(ctx.sourceFile); blocked(ctx.inspect());
  assert.throws(() => inspectGitTargetState(ctx.repository, 'src/app/guides/fixture.guide.ts'), e => e.code === 'TARGET_DELETED');
});
environmentCase('staged rename blocks, old path never silently follows', ctx => {
  gitFixture(ctx.repoRoot, ['mv', '--', 'src/app/guides/fixture.guide.ts', 'src/app/guides/moved.guide.ts']); blocked(ctx.inspect());
  assert.throws(() => inspectGitTargetState(ctx.repository, 'src/app/guides/fixture.guide.ts'), e => e.code === 'TARGET_RENAMED');
});
environmentCase('index symlink/typechange is blocked with regular source bytes unchanged', ctx => {
  const oid = gitFixture(ctx.repoRoot, ['hash-object', '-w', '--stdin'], 'link-target');
  gitFixture(ctx.repoRoot, ['update-index', '--cacheinfo', `120000,${oid},src/app/guides/fixture.guide.ts`]);
  blocked(ctx.inspect(), 'TARGET_TYPE_CHANGED');
});
environmentCase('unmerged target is recognized from real Git conflict stages', ctx => {
  const originalBranch = gitFixture(ctx.repoRoot, ['rev-parse', '--abbrev-ref', 'HEAD']);
  gitFixture(ctx.repoRoot, ['checkout', '-b', 'fixture-side']); writeFileSync(ctx.sourceFile, ctx.source.replace("descripcion: 'original'", "descripcion: 'side'"));
  gitFixture(ctx.repoRoot, ['add', '--all']); gitFixture(ctx.repoRoot, ['commit', '-m', 'Side']);
  gitFixture(ctx.repoRoot, ['checkout', originalBranch]); writeFileSync(ctx.sourceFile, ctx.source.replace("descripcion: 'original'", "descripcion: 'main'"));
  gitFixture(ctx.repoRoot, ['add', '--all']); gitFixture(ctx.repoRoot, ['commit', '-m', 'Main']); gitFixture(ctx.repoRoot, ['merge', 'fixture-side'], undefined, 1);
  assert.throws(() => inspectGitTargetState(ctx.repository, 'src/app/guides/fixture.guide.ts'), e => e.code === 'TARGET_CONFLICT'); blocked(ctx.inspect());
});
for (const flag of ['--assume-unchanged', '--skip-worktree']) environmentCase(`index flag ${flag} cannot conceal dirty source`, ctx => {
  gitFixture(ctx.repoRoot, ['update-index', flag, '--', 'src/app/guides/fixture.guide.ts']); blocked(ctx.inspect(), 'INDEX_FLAGS_UNSAFE');
});
environmentCase('gitlink/submodule ancestor rejected', ctx => {
  const oid = gitFixture(ctx.repoRoot, ['rev-parse', 'HEAD']);
  gitFixture(ctx.repoRoot, ['rm', '--cached', '--', 'src/app/guides/fixture.guide.ts']);
  gitFixture(ctx.repoRoot, ['update-index', '--add', '--cacheinfo', `160000,${oid},src/app/guides`]);
  assert.throws(() => inspectGitTargetState(ctx.repository, 'src/app/guides/fixture.guide.ts'), e => e.code === 'TARGET_TYPE_CHANGED');
});
test('non-Git source repository blocks', () => fixture(ctx => {
  const r = inspectWriteReadiness({ repoRoot: ctx.repoRoot, preparedResult: freshPrepared(ctx) }); blocked(r, 'REPO_INVALID');
}));
environmentCase('nested directory cannot inherit a parent repository implicitly', ctx => {
  const nested = path.join(ctx.repoRoot, 'nested'); mkdirSync(nested);
  assert.throws(() => inspectGitTargetState(inspectRepositoryRoot(nested), 'src/app/guides/fixture.guide.ts'), e => e.code === 'REPO_IDENTITY_MISMATCH');
});
environmentCase('byte-identical different repository cannot consume original prepared result', ctx => withGit(other => {
  assert.equal(other.prepared.sourceHash, ctx.prepared.sourceHash);
  blocked(inspectWriteReadiness({ repoRoot: other.repoRoot, preparedResult: ctx.prepared }), 'REPO_IDENTITY_MISMATCH');
}));
environmentCase('valid Git worktree with .git file is supported', ctx => {
  const worktree = path.join(path.dirname(ctx.repoRoot), 'worktree'); gitFixture(ctx.repoRoot, ['worktree', 'add', '--detach', worktree, 'HEAD']);
  const copy = { ...ctx, repoRoot: worktree, sourceFile: path.join(worktree, 'src/app/guides/fixture.guide.ts') };
  copy.prepared = freshPrepared(copy); copy.repository = inspectRepositoryRoot(worktree);
  const r = inspectWriteReadiness({ repoRoot: worktree, preparedResult: copy.prepared });
  try { checkReady(r, copy); assert.equal(fs.lstatSync(path.join(worktree, '.git')).isFile(), true); }
  finally { if (r.lease) releaseWriteLease(r.lease); }
});
environmentCase('enabled worktreeConfig is inspected, including unsafe worktree-local filters', ctx => {
  gitFixture(ctx.repoRoot, ['config', 'extensions.worktreeConfig', 'true']);
  const worktree = path.join(path.dirname(ctx.repoRoot), 'configured-worktree');
  gitFixture(ctx.repoRoot, ['worktree', 'add', '--detach', worktree, 'HEAD']);
  const copy = { ...ctx, repoRoot: worktree, sourceFile: path.join(worktree, 'src/app/guides/fixture.guide.ts') };
  copy.prepared = freshPrepared(copy); copy.repository = inspectRepositoryRoot(worktree);
  const r = inspectWriteReadiness({ repoRoot: worktree, preparedResult: copy.prepared });
  try { checkReady(r, copy); } finally { if (r.lease) releaseWriteLease(r.lease); }
  gitFixture(worktree, ['config', '--worktree', 'filter.fixture.clean', 'must-not-execute-fixture-command']);
  blocked(inspectWriteReadiness({ repoRoot: worktree, preparedResult: copy.prepared }), 'GIT_CONFIG_UNSAFE');
});

for (const file of ['-foo.guide.ts', 'with spaces.guide.ts', 'Cádiz-日本.guide.ts', 'quote;$(fixture).guide.ts']) {
  environmentCase(`Git literal path data: ${file}`, ctx => {
    const logical = 'src/app/guides/' + file, filename = path.join(ctx.repoRoot, ...logical.split('/'));
    writeFileSync(filename, ctx.source); gitFixture(ctx.repoRoot, ['add', '--', logical]); gitFixture(ctx.repoRoot, ['commit', '-m', 'Extra literal filename']);
    assert.equal(inspectGitTargetState(ctx.repository, logical).state, 'TRACKED_CLEAN');
  });
}
for (const unsafe of ['../outside.guide.ts', 'src/app/guides/../../outside.guide.ts', '/src/app/guides/x.guide.ts',
  'C:/outside.guide.ts', '\\\\server\\share\\x.guide.ts', '\\\\?\\C:\\x.guide.ts', '\\\\.\\C:\\x.guide.ts',
  'src/app/guides/x.guide.ts:stream', 'src/app/guides/dir./x.guide.ts', 'src/app/guides/dir /x.guide.ts',
  'src/app/guides//x.guide.ts', 'src/app/guides/./x.guide.ts', 'src/app/shared/x.guide.ts',
  'src/app/guides/x\u0000.guide.ts', 'src/app/guides/x\n.guide.ts', 'src/app/guides/x\\y.guide.ts',
  ...['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM9', 'LPT1', 'LPT9'].map(n => `src/app/guides/${n}.guide.ts`)]) {
  test(`Phase 6 lexical Windows path rejection ${JSON.stringify(unsafe)}`, () => assert.throws(() => validateSourcePath(unsafe), e => e.code === 'PATH_UNSAFE'));
}
test('bounded paths and absolute repo roots', () => {
  assert.throws(() => validateSourcePath('src/app/guides/' + 'x'.repeat(WORKSPACE_LIMITS.maxPathLength) + '.guide.ts'), e => e.code === 'PATH_UNSAFE');
  for (const root of ['.', '', '\\\\?\\C:\\repo', 'C:\\bad\0repo']) assert.throws(() => inspectRepositoryRoot(root), WorkspaceError);
});
environmentCase('tracked casing must match exactly', ctx => {
  assert.throws(() => inspectGitTargetState(ctx.repository, 'src/app/guides/Fixture.guide.ts'), e => e.code === 'PATH_IDENTITY_MISMATCH');
  assert.throws(() => observeSourcePath(ctx.repository, 'src/app/guides/Fixture.guide.ts'), e => e.code === 'PATH_IDENTITY_MISMATCH');
});
environmentCase('simultaneous index case aliases cannot silently name the same source', ctx => {
  const entries = gitFixture(ctx.repoRoot, ['ls-files', '--stage']);
  const target = entries.split('\n').find(e => e.endsWith('\tsrc/app/guides/fixture.guide.ts'));
  gitFixture(ctx.repoRoot, ['update-index', '--index-info'], target.replace('fixture.guide.ts', 'Fixture.guide.ts') + '\n');
  assert.throws(() => inspectGitTargetState(ctx.repository, 'src/app/guides/fixture.guide.ts'), e => e.code === 'PATH_IDENTITY_MISMATCH');
});
environmentCase('directory cannot masquerade as final source', ctx => {
  fs.unlinkSync(ctx.sourceFile); mkdirSync(ctx.sourceFile); blocked(ctx.inspect(), 'TARGET_TYPE_CHANGED');
});
environmentCase('hardlink target rejected when observable', ctx => {
  fs.linkSync(ctx.sourceFile, path.join(path.dirname(ctx.repoRoot), 'alias.guide.ts')); blocked(ctx.inspect(), 'HARDLINK_UNSAFE');
});
for (const kind of ['source symlink', 'parent symlink', 'parent junction']) test(`Phase 6 filesystem redirect ${kind}`, t => withGit(ctx => {
  try {
    if (kind === 'source symlink') {
      const moved = path.join(path.dirname(ctx.repoRoot), 'original.guide.ts'); fs.renameSync(ctx.sourceFile, moved); fs.symlinkSync(moved, ctx.sourceFile, 'file');
    } else {
      const parent = path.dirname(ctx.sourceFile), moved = path.join(path.dirname(ctx.repoRoot), 'original-guides'); fs.renameSync(parent, moved);
      fs.symlinkSync(moved, parent, kind === 'parent junction' && process.platform === 'win32' ? 'junction' : 'dir');
    }
  } catch (error) { if (['EPERM', 'EACCES', 'ENOTSUP'].includes(error.code)) { t.skip(`Redirect fixture unavailable: ${error.code}`); return; } throw error; }
  blocked(ctx.inspect());
}));
environmentCase('regular file identity and size/hash are explicit observations', ctx => {
  const obs = observeSourcePath(ctx.repository, 'src/app/guides/fixture.guide.ts');
  assert.equal(obs.sourceHash, ctx.prepared.sourceHash); assert.equal(obs.file.nlink, '1'); assert.notEqual(obs.file.ino, '0');
  assert.equal(obs.file.size, String(readFileSync(ctx.sourceFile).length)); assert.equal(obs.file.realPath, realpathSync.native(ctx.sourceFile));
});

environmentCase('source drift after preparation is blocked', ctx => { fs.appendFileSync(ctx.sourceFile, '// drift\n'); blocked(ctx.inspect(), 'WRITE_PRECONDITION_FAILED'); });
environmentCase('catalog byte drift after preparation is blocked', ctx => { fs.appendFileSync(ctx.catalogFile, '// drift\n'); blocked(ctx.inspect(), 'CATALOG_STALE'); });
for (const mutation of ['export binding', 'source binding', 'ruleset']) environmentCase(`catalog ${mutation} drift is blocked`, ctx => {
  const text = readFileSync(ctx.catalogFile, 'utf8');
  if (mutation === 'export binding') {
    const source = readFileSync(ctx.sourceFile, 'utf8').replace('FIXTURE_GUIDE', 'CHANGED_GUIDE'); writeFileSync(ctx.sourceFile, source);
    writeFileSync(ctx.catalogFile, text.replaceAll('FIXTURE_GUIDE', 'CHANGED_GUIDE'));
  } else if (mutation === 'source binding') {
    writeFileSync(path.join(path.dirname(ctx.sourceFile), 'other.guide.ts'), ctx.source); writeFileSync(ctx.catalogFile, text.replace('../guides/fixture.guide', '../guides/other.guide'));
  } else writeFileSync(ctx.catalogFile, text.replace("[[FIXTURE_GUIDE, 'generic']]", "[[FIXTURE_GUIDE, 'spanish-municipal']]"));
  blocked(ctx.inspect());
});
environmentCase('restored identical bytes on same inode permit readiness despite mtime', ctx => {
  writeFileSync(ctx.sourceFile, ctx.source + '// temporary drift\n'); writeFileSync(ctx.sourceFile, ctx.source); checkReady(ctx.inspect(), ctx);
});
for (const mutation of ['source', 'catalog', 'replacement', 'hardlink', 'restore']) environmentCase(`post-lock synthetic race ${mutation}`, ctx => {
  const originalBytes = readFileSync(ctx.sourceFile), catalogBytes = readFileSync(ctx.catalogFile);
  const r = afterExclusiveLock(() => {
    if (mutation === 'source') fs.appendFileSync(ctx.sourceFile, '// race\n');
    if (mutation === 'catalog') fs.appendFileSync(ctx.catalogFile, '// race\n');
    if (mutation === 'replacement') { fs.renameSync(ctx.sourceFile, ctx.sourceFile + '.original'); writeFileSync(ctx.sourceFile, originalBytes); }
    if (mutation === 'hardlink') fs.linkSync(ctx.sourceFile, ctx.sourceFile + '.alias');
    if (mutation === 'restore') { writeFileSync(ctx.sourceFile, ctx.source + '// transient\n'); writeFileSync(ctx.sourceFile, originalBytes); }
  }, () => ctx.inspect());
  if (mutation === 'restore') checkReady(r, ctx);
  else {
    blocked(r, mutation === 'source' ? 'WRITE_PRECONDITION_FAILED' : mutation === 'catalog' ? 'CATALOG_STALE' : mutation === 'replacement' ? 'FILESYSTEM_DRIFT' : 'HARDLINK_UNSAFE');
    if (mutation === 'hardlink') fs.unlinkSync(ctx.sourceFile + '.alias');
    if (mutation === 'replacement') { fs.unlinkSync(ctx.sourceFile); fs.renameSync(ctx.sourceFile + '.original', ctx.sourceFile); }
    writeFileSync(ctx.sourceFile, originalBytes); writeFileSync(ctx.catalogFile, catalogBytes);
    checkReady(ctx.inspect(), ctx); // failed readiness released only its own lock.
  }
});
environmentCase('post-lock parent redirection is blocked', ctx => {
  const parent = path.dirname(ctx.sourceFile), moved = path.join(path.dirname(ctx.repoRoot), 'race-guides');
  const r = afterExclusiveLock(() => { fs.renameSync(parent, moved); fs.symlinkSync(moved, parent, process.platform === 'win32' ? 'junction' : 'dir'); }, () => ctx.inspect());
  blocked(r); fs.unlinkSync(parent); fs.renameSync(moved, parent); checkReady(ctx.inspect(), ctx);
});
environmentCase('post-lock HEAD drift detected even with unchanged source', ctx => {
  const r = afterExclusiveLock(() => {
    writeFileSync(path.join(ctx.repoRoot, 'other.txt'), 'committed concurrent change'); gitFixture(ctx.repoRoot, ['add', '--', 'other.txt']); gitFixture(ctx.repoRoot, ['commit', '-m', 'Concurrent unrelated commit']);
  }, () => ctx.inspect()); blocked(r, 'GIT_STATE_DRIFT');
});
environmentCase('audit regression: unrelated index drift after lock blocks', ctx => {
  const r = afterExclusiveLock(() => {
    writeFileSync(path.join(ctx.repoRoot, 'other.txt'), 'concurrent staging');
    gitFixture(ctx.repoRoot, ['add', '--', 'other.txt']);
  }, () => ctx.inspect()); blocked(r, 'GIT_STATE_DRIFT');
});
environmentCase('audit regression: stat-cache config cannot conceal same-size dirty bytes', ctx => {
  const timestamp = 1000000000;
  fs.utimesSync(ctx.sourceFile, timestamp, timestamp); gitFixture(ctx.repoRoot, ['update-index', '--refresh']);
  gitFixture(ctx.repoRoot, ['config', 'core.trustctime', 'false']); gitFixture(ctx.repoRoot, ['config', 'core.checkStat', 'minimal']);
  writeFileSync(ctx.sourceFile, ctx.source.replace("descripcion: 'original'", "descripcion: 'changed!'"));
  fs.utimesSync(ctx.sourceFile, timestamp, timestamp); ctx.prepared = freshPrepared(ctx);
  blocked(ctx.inspect(), 'TARGET_DIRTY_WORKTREE');
});
function privateFixtureTemp(ctx, run) {
  const oldTemp = process.env.TEMP, oldTmp = process.env.TMP, privateTemp = path.dirname(ctx.repoRoot);
  assert.equal(path.dirname(privateTemp), tempRoot); assert.ok(path.basename(privateTemp).startsWith(prefix));
  try { process.env.TEMP = privateTemp; process.env.TMP = privateTemp; return run(privateTemp); }
  finally {
    if (oldTemp === undefined) delete process.env.TEMP; else process.env.TEMP = oldTemp;
    if (oldTmp === undefined) delete process.env.TMP; else process.env.TMP = oldTmp;
  }
}
environmentCase('audit regression: changed lock root identity never grants release ownership', ctx => privateFixtureTemp(ctx, () => {
  let lockPath; const a = afterExclusiveLock(file => { lockPath = file; }, () => acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts'));
  const root = path.dirname(lockPath), moved = root + '.original';
  fs.renameSync(root, moved); mkdirSync(root, { mode: 0o700 }); fs.renameSync(path.join(moved, path.basename(lockPath)), lockPath);
  assert.equal(releaseSourceLock(a).status, 'BLOCKED'); assert.equal(fs.existsSync(lockPath), true);
}));
environmentCase('audit regression: lost lock ownership before WRITE_READY blocks without deleting foreign content', ctx => {
  let lockPath, roots = 0, r;
  try {
    r = afterExclusiveLock(file => { lockPath = file; }, () => patched(mutableProcess, 'spawnSync', original => (exe, args, options) => {
      if (args.includes('--show-toplevel') && ++roots === 2) writeFileSync(lockPath, 'foreign token');
      return original(exe, args, options);
    }, () => ctx.inspect()));
    blocked(r, 'LOCK_INVALID'); assert.equal(readFileSync(lockPath, 'utf8'), 'foreign token');
  } finally { if (r?.lease) releaseWriteLease(r.lease); if (lockPath) removeOwnedTestLock(lockPath); }
});
test('audit regression: malformed porcelain OID length is not accepted', () => {
  assert.throws(() => parseGitStatus(`1 .. N... 100644 100644 100644 ${'a'.repeat(41)} ${'b'.repeat(40)} unrelated\0`), e => e.code === 'GIT_OUTPUT_INVALID');
});
for (const [label, matches, output] of [
  ['config key', args => args.includes('--local'), 'notakey\0'],
  ['flag record', args => args.includes('-v'), 'garbage\0'],
  ['empty root', args => args.includes('--show-toplevel'), '']
]) environmentCase(`audit regression: malformed ${label} is FAILED`, ctx => {
  const r = patched(mutableProcess, 'spawnSync', original => (exe, args, options) => {
    if (matches(args)) return { stdout: Buffer.from(output), stderr: Buffer.alloc(0), status: 0, signal: null };
    return original(exe, args, options);
  }, () => ctx.inspect());
  assert.equal(r.report.status, 'FAILED'); assert.equal(r.report.diagnostics[0].code, 'GIT_OUTPUT_INVALID');
});

environmentCase('source lock acquire/release and independent source locks', ctx => {
  const a = acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts');
  const b = acquireSourceLock(ctx.repository, 'src/app/guides/other.guide.ts');
  try { assert.equal(isSourceLockHeld(a), true); assert.throws(() => acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts'), e => e.code === 'LOCK_CONTENDED'); }
  finally { assert.equal(releaseSourceLock(a).status, 'RELEASED'); assert.equal(releaseSourceLock(b).status, 'RELEASED'); }
});
environmentCase('different repos with same relative source lock independently', ctx => withGit(other => {
  const a = acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts'), b = acquireSourceLock(other.repository, 'src/app/guides/fixture.guide.ts');
  try { assert.notEqual(ctx.repository.digest, other.repository.digest); } finally { releaseSourceLock(a); releaseSourceLock(b); }
}));
environmentCase('separate Factory process cannot acquire held source lock', ctx => {
  const a = acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts');
  try {
    const script = "const p=require(process.argv[1]); const l=require(process.argv[2]); try { l.acquireSourceLock(p.inspectRepositoryRoot(process.argv[3]), 'src/app/guides/fixture.guide.ts'); process.exitCode=2; } catch(e) { if(e.code !== 'LOCK_CONTENDED') throw e; console.log(e.code); }";
    const child = spawnSync(process.execPath, ['--preserve-symlinks', '--preserve-symlinks-main', '-e', script,
      path.join(outDir, 'scripts/factory-fix/path-safety.js'), path.join(outDir, 'scripts/factory-fix/source-lock.js'), ctx.repoRoot], {
      cwd: projectRoot, shell: false, encoding: 'utf8', timeout: 10000,
      env: { NODE_PATH: path.join(projectRoot, 'node_modules'), TEMP: tempRoot, TMP: tempRoot, SystemRoot: process.env.SystemRoot } });
    assert.equal(child.error, undefined); assert.equal(child.status, 0, child.stderr); assert.equal(child.stdout.trim(), 'LOCK_CONTENDED');
  } finally { releaseSourceLock(a); }
});
environmentCase('existing old/dead-PID lock is never automatically removed', ctx => {
  let lockPath; const a = afterExclusiveLock(file => { lockPath = file; }, () => acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts'));
  writeFileSync(lockPath, JSON.stringify({ pid: 2147483647, createdAt: '1900-01-01', token: 'foreign' }));
  try {
    assert.throws(() => acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts'), e => e.code === 'LOCK_CONTENDED');
    assert.equal(releaseSourceLock(a).status, 'BLOCKED'); assert.equal(fs.existsSync(lockPath), true);
  } finally { removeOwnedTestLock(lockPath); }
});
environmentCase('foreign replacement lock inode/content is not deleted', ctx => {
  let lockPath; const a = afterExclusiveLock(file => { lockPath = file; }, () => acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts'));
  fs.renameSync(lockPath, lockPath + '.own'); writeFileSync(lockPath, 'foreign');
  try { assert.equal(releaseSourceLock(a).status, 'BLOCKED'); assert.equal(readFileSync(lockPath, 'utf8'), 'foreign'); }
  finally { removeOwnedTestLock(lockPath); fs.unlinkSync(lockPath + '.own'); }
});
environmentCase('double release does not remove a newer lock', ctx => {
  const a = acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts'); releaseSourceLock(a);
  const b = acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts');
  try { assert.equal(releaseSourceLock(a).status, 'ALREADY_RELEASED'); assert.equal(isSourceLockHeld(b), true); }
  finally { releaseSourceLock(b); }
});
environmentCase('release infrastructure failure is explicit and leaves the owned entry for manual recovery', ctx => {
  let lockPath; const a = afterExclusiveLock(file => { lockPath = file; }, () => acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts'));
  try {
    const result = patched(mutableFs, 'unlinkSync', () => () => { const e = new Error('private failure'); e.code = 'EACCES'; throw e; }, () => releaseSourceLock(a));
    assert.deepEqual(result, { status: 'FAILED', code: 'LOCK_RELEASE_FAILED' }); assert.equal(fs.existsSync(lockPath), true);
  } finally { removeOwnedTestLock(lockPath); }
});
test('forged source handle and forged lease are inert', () => {
  assert.equal(releaseSourceLock({}).code, 'LOCK_INVALID'); assert.equal(releaseWriteLease({}).code, 'LOCK_INVALID');
});
environmentCase('lease and lock capability cannot be serialized or cloned as authority', ctx => {
  const r = ctx.inspect(); checkReady(r, ctx); assert.throws(() => JSON.stringify(r.lease), TypeError);
  const copy = JSON.parse(JSON.stringify(r.report)); assert.equal(releaseWriteLease(copy).code, 'LOCK_INVALID');
  assert.equal(releaseWriteLease({ ...r.lease }).code, 'LOCK_INVALID'); assert.equal(isPreparedWriteLeaseActive(r.lease), true);
  assert.equal(releaseWriteLease(r.lease).status, 'RELEASED'); assert.equal(isPreparedWriteLeaseActive(r.lease), false);
});
for (const mode of ['JSON', 'spread', 'NO_CHANGE', 'BLOCKED', 'FAILED']) environmentCase(`only host READY candidate accepted: ${mode}`, ctx => {
  const value = mode === 'JSON' ? JSON.parse(JSON.stringify(ctx.prepared)) : mode === 'spread' ? { ...ctx.prepared }
    : mode === 'NO_CHANGE' ? freshPrepared(ctx, true) : { status: mode };
  blocked(inspectWriteReadiness({ repoRoot: ctx.repoRoot, preparedResult: value }), 'READINESS_INPUT_INVALID');
});
environmentCase('report detached/frozen and candidate text never persisted', ctx => {
  const bytes = readFileSync(ctx.sourceFile), r = ctx.inspect(); checkReady(r, ctx);
  assert.throws(() => { r.report.preconditions.filesystem.file.ino = '0'; }, TypeError);
  assert.throws(() => { r.report.candidateHash = '0'; }, TypeError); assert.deepEqual(readFileSync(ctx.sourceFile), bytes);
});
environmentCase('lock pathname is digest-derived outside source and never caller supplied', ctx => {
  let lockPath; const r = afterExclusiveLock(file => { lockPath = file; }, () => ctx.inspect()); checkReady(r, ctx);
  assert.match(path.basename(lockPath), /^[a-f0-9]{64}\.lock$/); assert.equal(path.dirname(lockPath).startsWith(ctx.repoRoot), false);
  assert.throws(() => inspectWriteReadiness({ repoRoot: ctx.repoRoot, preparedResult: ctx.prepared, lockRoot: ctx.repoRoot }), TypeError);
  assert.throws(() => acquireSourceLock(ctx.repository, '../escape.guide.ts'), e => e.code === 'PATH_UNSAFE');
});
for (const name of ['filter.fixture.clean', 'include.path', 'remote.fixture.promisor']) environmentCase(`unsafe Git config blocked before status/filter execution ${name}`, ctx => {
  gitFixture(ctx.repoRoot, ['config', name, name.startsWith('filter') ? 'must-not-execute-fixture-command' : '../missing.config']);
  blocked(ctx.inspect(), 'GIT_CONFIG_UNSAFE');
});

environmentCase('fixed production Git executable/argv/env, no shell and no ambient secrets', ctx => {
  const seen = [];
  const r = patched(mutableProcess, 'spawnSync', original => function(exe, args, options) { seen.push({ exe, args, options }); return original(exe, args, options); }, () => ctx.inspect()); checkReady(r, ctx);
  assert.ok(seen.length >= 18);
  for (const call of seen) {
    assert.equal(path.isAbsolute(call.exe), true); assert.equal(path.basename(call.exe), process.platform === 'win32' ? 'git.exe' : 'git');
    assert.equal(call.options.shell, false); assert.equal(call.options.stdio[0], 'ignore');
    assert.equal(call.options.env.GIT_TERMINAL_PROMPT, '0'); assert.equal(call.options.env.GIT_OPTIONAL_LOCKS, '0');
    assert.equal(call.options.env.GIT_NO_LAZY_FETCH, '1'); assert.equal(call.options.env.GIT_NO_REPLACE_OBJECTS, '1');
    assert.equal(call.options.timeout, WORKSPACE_LIMITS.gitTimeoutMs); assert.equal(call.options.maxBuffer, WORKSPACE_LIMITS.maxGitOutputBytes);
    assert.doesNotMatch(call.args.join(' '), /\b(?:update-index|checkout|add|commit|apply|stash|reset|restore|clean|merge|push|fetch)\b/);
    assert.equal(call.options.env.GIT_DIR, undefined); assert.equal(call.options.env.GIT_WORK_TREE, undefined);
    assert.equal(call.options.cwd, ctx.repoRoot);
  }
});
environmentCase('worktree executable is not selected from cwd or a leading repo PATH entry', ctx => {
  const originalPath = process.env.PATH ?? process.env.Path;
  writeFileSync(path.join(ctx.repoRoot, process.platform === 'win32' ? 'git.exe' : 'git'), 'fixture data, never executable');
  const seen = [];
  try {
    process.env.PATH = ctx.repoRoot + path.delimiter + originalPath;
    const r = patched(mutableProcess, 'spawnSync', original => (exe, args, options) => { seen.push(exe); return original(exe, args, options); }, () => ctx.inspect());
    checkReady(r, ctx); assert.ok(seen.length); assert.ok(seen.every(exe => path.dirname(exe) !== ctx.repoRoot));
  } finally { process.env.PATH = originalPath; }
});
for (const [code, expected] of [['ENOENT', 'GIT_UNAVAILABLE'], ['ETIMEDOUT', 'GIT_TIMEOUT'], ['ENOBUFS', 'GIT_OUTPUT_LIMIT']]) environmentCase(`classified child process error ${code}`, ctx => {
  const r = patched(mutableProcess, 'spawnSync', () => () => ({ error: Object.assign(new Error('secret stderr'), { code }), stdout: Buffer.alloc(0), stderr: Buffer.alloc(0), status: null, signal: null }), () => ctx.inspect());
  assert.equal(r.report.status, 'FAILED'); assert.equal(r.report.diagnostics[0].code, expected); assert.doesNotMatch(JSON.stringify(r.report), /secret/);
});
for (const stream of ['stdout', 'stderr']) environmentCase(`Git ${stream} limit fails safely`, ctx => {
  const r = patched(mutableProcess, 'spawnSync', original => (...args) => {
    const result = original(...args); result[stream] = Buffer.alloc(WORKSPACE_LIMITS.maxGitOutputBytes + 1, 65); return result;
  }, () => ctx.inspect()); assert.equal(r.report.status, 'FAILED'); assert.equal(r.report.diagnostics[0].code, 'GIT_OUTPUT_LIMIT');
});
environmentCase('unexpected diff exit fails, while diff exit 1 is a dirty state', ctx => {
  const r = patched(mutableProcess, 'spawnSync', original => (exe, args, options) => {
    if (args.includes('diff')) return { stdout: Buffer.alloc(0), stderr: Buffer.from('secret'), status: 2, signal: null };
    return original(exe, args, options);
  }, () => ctx.inspect()); assert.equal(r.report.status, 'FAILED'); assert.equal(r.report.diagnostics[0].code, 'GIT_INSPECTION_FAILED'); assert.doesNotMatch(JSON.stringify(r.report), /secret/);
});
environmentCase('synthetic diff exit 1 is controlled dirty index', ctx => {
  const r = patched(mutableProcess, 'spawnSync', original => (exe, args, options) => {
    if (args.includes('diff') && args.includes('--quiet')) return { stdout: Buffer.alloc(0), stderr: Buffer.alloc(0), status: 1, signal: null };
    return original(exe, args, options);
  }, () => ctx.inspect()); blocked(r, 'TARGET_DIRTY_INDEX');
});
environmentCase('unexpected programmer exception remains visible', ctx => {
  const error = new TypeError('programmer'); assert.throws(() => patched(mutableProcess, 'spawnSync', () => () => { throw error; }, () => ctx.inspect()), e => e === error);
});
test('stable Git parsers reject malformed NUL records and preserve exact unusual paths', () => {
  assert.equal(parseGitIndex(`100644 ${'a'.repeat(40)} 0\todd space-日本\0`)[0].path, 'odd space-日本');
  for (const bad of ['human output', '100644 short 0\tfile\0', '100644 ' + 'a'.repeat(40) + ' 4\tfile\0']) assert.throws(() => parseGitIndex(bad), e => e.code === 'GIT_OUTPUT_INVALID');
  for (const bad of ['human output', '1 malformed\0', '2 malformed\0', 'u malformed\0']) assert.throws(() => parseGitStatus(bad), e => e.code === 'GIT_OUTPUT_INVALID');
});
environmentCase('audit: all ambient Git/config/helper environment redirects are excluded', ctx => {
  const keys = ['GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE', 'GIT_OBJECT_DIRECTORY', 'GIT_ALTERNATE_OBJECT_DIRECTORIES',
    'GIT_COMMON_DIR', 'GIT_CONFIG', 'GIT_CONFIG_GLOBAL', 'GIT_CONFIG_SYSTEM', 'GIT_CONFIG_COUNT', 'GIT_CONFIG_KEY_0', 'GIT_CONFIG_VALUE_0',
    'GIT_CONFIG_PARAMETERS', 'GIT_EXEC_PATH', 'GIT_EXTERNAL_DIFF', 'GIT_DIFF_OPTS', 'GIT_ASKPASS', 'SSH_ASKPASS',
    'GIT_SSH', 'GIT_SSH_COMMAND', 'GIT_PROXY_COMMAND', 'GIT_CEILING_DIRECTORIES', 'GIT_DISCOVERY_ACROSS_FILESYSTEM',
    'GIT_LITERAL_PATHSPECS', 'GIT_GLOB_PATHSPECS', 'GIT_NOGLOB_PATHSPECS', 'GIT_ICASE_PATHSPECS', 'GIT_SHALLOW_FILE',
    'GIT_TRACE', 'GIT_TRACE2_EVENT', 'HOME', 'USERPROFILE', 'XDG_CONFIG_HOME', 'GIT_TERMINAL_PROMPT'];
  const originals = new Map(keys.map(k => [k, process.env[k]])), seen = [];
  try {
    keys.forEach(k => { process.env[k] = 'fixture-must-not-be-inherited'; });
    process.env.GIT_CONFIG_COUNT = '1'; process.env.GIT_CONFIG_KEY_0 = 'core.worktree'; process.env.GIT_TERMINAL_PROMPT = '1';
    checkReady(patched(mutableProcess, 'spawnSync', original => (exe, args, options) => {
      seen.push(options.env); return original(exe, args, options);
    }, () => ctx.inspect()), ctx);
    for (const env of seen) {
      for (const key of keys) {
        if (key === 'GIT_CONFIG_GLOBAL') assert.equal(env[key], process.platform === 'win32' ? 'NUL' : '/dev/null');
        else if (key === 'GIT_TERMINAL_PROMPT') assert.equal(env[key], '0');
        else assert.equal(env[key], undefined, key);
      }
      assert.ok(Object.keys(env).every(k => ['PATH', 'GIT_CONFIG_NOSYSTEM', 'GIT_CONFIG_GLOBAL', 'GIT_TERMINAL_PROMPT',
        'GIT_OPTIONAL_LOCKS', 'GIT_NO_LAZY_FETCH', 'GIT_NO_REPLACE_OBJECTS', 'LC_ALL', 'LANG', 'TEMP', 'TMP', 'SystemRoot', 'WINDIR'].includes(k)));
    }
  } finally { for (const [key, value] of originals) { if (value === undefined) delete process.env[key]; else process.env[key] = value; } }
});
environmentCase('audit: fsmonitor, external diff, textconv, hooks and aliases cannot execute helpers', ctx => {
  for (const key of ['core.fsmonitor', 'diff.external', 'diff.fixture.command', 'diff.fixture.textconv', 'core.hooksPath', 'alias.diff']) {
    gitFixture(ctx.repoRoot, ['config', key, 'fixture-helper-must-not-execute']);
  }
  writeFileSync(path.join(ctx.repoRoot, '.gitattributes'), '*.guide.ts diff=fixture\n');
  const calls = [];
  checkReady(patched(mutableProcess, 'spawnSync', original => (exe, args, options) => { calls.push(args); return original(exe, args, options); }, () => ctx.inspect()), ctx);
  for (const args of calls) {
    assert.ok(args.includes('core.fsmonitor=false')); assert.ok(args.includes('core.hooksPath=/dev/null'));
    assert.equal(args.includes('status'), false);
    if (args.includes('diff')) { assert.ok(args.includes('--cached')); assert.ok(args.includes('--no-ext-diff')); assert.ok(args.includes('--no-textconv')); }
  }
});
environmentCase('audit: newly configured filter cannot execute during cached object inspection', ctx => {
  writeFileSync(path.join(ctx.repoRoot, '.gitattributes'), '*.guide.ts filter=fixture\n');
  let changed = false;
  const r = patched(mutableProcess, 'spawnSync', original => (exe, args, options) => {
    if (!changed && args.includes('--name-status')) {
      changed = true; gitFixture(ctx.repoRoot, ['config', 'filter.fixture.clean', 'fixture-helper-must-not-execute']);
    }
    assert.equal(args.includes('status'), false); if (args.includes('diff')) assert.ok(args.includes('--cached'));
    return original(exe, args, options);
  }, () => ctx.inspect());
  assert.equal(changed, true); blocked(r, 'GIT_CONFIG_UNSAFE');
});
for (const filename of ['--help.guide.ts', '--exec-path=fixture.guide.ts', '-c.guide.ts', '; calc.guide.ts',
  '&& fixture.guide.ts', '$(fixture).guide.ts', '`fixture`.guide.ts']) environmentCase(`audit: argv-looking filename is literal data ${filename}`, ctx => {
  const logical = 'src/app/guides/' + filename;
  writeFileSync(path.join(ctx.repoRoot, ...logical.split('/')), ctx.source);
  gitFixture(ctx.repoRoot, ['add', '--', logical]); gitFixture(ctx.repoRoot, ['commit', '-m', 'Literal fixture']);
  assert.equal(inspectGitTargetState(ctx.repository, logical).state, 'TRACKED_CLEAN');
});
test('audit: raw options, shell fragments and magic pathspecs never become source paths', () => {
  for (const value of ['--help', '--exec-path=fixture', '-c', '; calc', '&& fixture', '$(fixture)', '`fixture`',
    ':(glob)src/app/guides/*.guide.ts', 'src/app/guides/:(glob)x.guide.ts']) assert.throws(() => validateSourcePath(value), e => e.code === 'PATH_UNSAFE');
});
environmentCase('audit: intent-to-add is not a tracked clean source', ctx => {
  gitFixture(ctx.repoRoot, ['add', '--intent-to-add', '--', 'src/app/guides/fixture.guide.ts']); blocked(ctx.inspect());
}, { untracked: true });
environmentCase('audit: sparse checkout cannot hide an excluded target', ctx => {
  gitFixture(ctx.repoRoot, ['sparse-checkout', 'init', '--cone']);
  gitFixture(ctx.repoRoot, ['sparse-checkout', 'set', 'src/app/shared']);
  blocked(ctx.inspect());
  assert.throws(() => inspectGitTargetState(ctx.repository, 'src/app/guides/fixture.guide.ts'), e => e.code === 'INDEX_FLAGS_UNSAFE');
});
environmentCase('audit: exact included target remains valid in sparse checkout', ctx => {
  gitFixture(ctx.repoRoot, ['sparse-checkout', 'init', '--cone']); gitFixture(ctx.repoRoot, ['sparse-checkout', 'set', 'src/app']);
  checkReady(ctx.inspect(), ctx);
});
environmentCase('audit: wrong repo-root casing is rejected rather than canonicalized by folding', ctx => {
  const wrong = path.join(path.dirname(ctx.repoRoot), 'REPO');
  if (process.platform === 'win32') assert.throws(() => inspectRepositoryRoot(wrong), e => e.code === 'PATH_IDENTITY_MISMATCH');
  else assert.throws(() => inspectRepositoryRoot(wrong), e => e.code === 'REPO_INVALID');
});
environmentCase('audit: repo-root junction cannot masquerade as original physical repo', ctx => {
  const alias = path.join(path.dirname(ctx.repoRoot), 'repo-alias');
  fs.symlinkSync(ctx.repoRoot, alias, process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => inspectRepositoryRoot(alias), e => e.code === 'REPARSE_UNSAFE');
});
environmentCase('audit: fsmonitor-valid flag cannot hide a target', ctx => {
  gitFixture(ctx.repoRoot, ['update-index', '--fsmonitor', '--fsmonitor-valid', '--', 'src/app/guides/fixture.guide.ts']);
  writeFileSync(ctx.sourceFile, ctx.source.replace("descripcion: 'original'", "descripcion: 'changed!'")); ctx.prepared = freshPrepared(ctx);
  const r = ctx.inspect(); blocked(r); assert.ok(['INDEX_FLAGS_UNSAFE', 'TARGET_DIRTY_WORKTREE'].includes(r.report.diagnostics[0].code));
});
environmentCase('audit regression: unrelated index flags changed after lock also block', ctx => {
  writeFileSync(path.join(ctx.repoRoot, 'other.txt'), 'fixture'); gitFixture(ctx.repoRoot, ['add', '--', 'other.txt']);
  gitFixture(ctx.repoRoot, ['commit', '-m', 'Unrelated tracked fixture']);
  const r = afterExclusiveLock(() => gitFixture(ctx.repoRoot, ['update-index', '--assume-unchanged', '--', 'other.txt']), () => ctx.inspect());
  blocked(r, 'GIT_STATE_DRIFT');
});
for (const eol of ['lf', 'crlf']) environmentCase(`audit: supported text/${eol} CRLF normalization is byte checked`, ctx => {
  writeFileSync(path.join(ctx.repoRoot, '.gitattributes'), `*.guide.ts text eol=${eol}\n`);
  writeFileSync(ctx.sourceFile, ctx.source.replace(/\n/g, '\r\n')); ctx.prepared = freshPrepared(ctx);
  checkReady(ctx.inspect(), ctx);
});
environmentCase('audit: CRLF is not silently normalized when text conversion is disabled', ctx => {
  gitFixture(ctx.repoRoot, ['config', 'core.autocrlf', 'false']);
  writeFileSync(path.join(ctx.repoRoot, '.gitattributes'), '*.guide.ts -text\n');
  writeFileSync(ctx.sourceFile, ctx.source.replace(/\n/g, '\r\n')); ctx.prepared = freshPrepared(ctx);
  blocked(ctx.inspect(), 'TARGET_DIRTY_WORKTREE');
});
environmentCase('audit: installed text default is read as data without loading system helpers', ctx => {
  writeFileSync(ctx.sourceFile, ctx.source.replace(/\n/g, '\r\n')); ctx.prepared = freshPrepared(ctx);
  const r = patched(mutableProcess, 'spawnSync', original => (exe, args, options) => args.includes('--system')
    ? { stdout: Buffer.from('core.autocrlf\ntrue\0'), stderr: Buffer.alloc(0), status: 0, signal: null }
    : original(exe, args, options), () => ctx.inspect()); checkReady(r, ctx);
});
environmentCase('audit: system reader cannot silently accept keys outside its fixed selection', ctx => {
  const r = patched(mutableProcess, 'spawnSync', original => (exe, args, options) => args.includes('--system')
    ? { stdout: Buffer.from('core.fsmonitor\nfixture\0'), stderr: Buffer.alloc(0), status: 0, signal: null }
    : original(exe, args, options), () => ctx.inspect());
  assert.equal(r.report.status, 'FAILED'); assert.equal(r.report.diagnostics[0].code, 'GIT_OUTPUT_INVALID');
});
for (const attribute of ['ident', 'working-tree-encoding=UTF-16']) environmentCase(`audit: unsupported conversion ${attribute} fails closed`, ctx => {
  writeFileSync(path.join(ctx.repoRoot, '.gitattributes'), `*.guide.ts ${attribute}\n`); blocked(ctx.inspect(), 'GIT_CONFIG_UNSAFE');
});
environmentCase('audit: candidate bytes are never accepted as original current source', ctx => {
  writeFileSync(ctx.sourceFile, ctx.prepared.candidateText); blocked(ctx.inspect(), 'WRITE_PRECONDITION_FAILED');
});
environmentCase('audit: catalog transient edit restored byte-identically is not historical detection', ctx => {
  const bytes = readFileSync(ctx.catalogFile);
  checkReady(afterExclusiveLock(() => { fs.appendFileSync(ctx.catalogFile, '// transient\n'); writeFileSync(ctx.catalogFile, bytes); }, () => ctx.inspect()), ctx);
});
environmentCase('audit: target index changes after lock block without changing source bytes', ctx => {
  const r = afterExclusiveLock(() => {
    const oid = gitFixture(ctx.repoRoot, ['hash-object', '-w', '--stdin'], ctx.source + '// index-only change\n');
    gitFixture(ctx.repoRoot, ['update-index', '--cacheinfo', `100644,${oid},src/app/guides/fixture.guide.ts`]);
  }, () => ctx.inspect()); blocked(r, 'TARGET_DIRTY_INDEX');
});
environmentCase('audit: copy record involving original target is not unrelated', ctx => {
  const r = patched(mutableProcess, 'spawnSync', original => (exe, args, options) => args.includes('--name-status')
    ? { stdout: Buffer.from('C100\0src/app/guides/fixture.guide.ts\0other.guide.ts\0'), stderr: Buffer.alloc(0), status: 0, signal: null }
    : original(exe, args, options), () => ctx.inspect()); blocked(r, 'TARGET_RENAMED');
});
environmentCase('audit: inherited capabilities, copied symbols and fabricated prepared results are inert', ctx => {
  const r = ctx.inspect(); checkReady(r, ctx);
  for (const fake of [Object.create(r.lease), Object.assign({}, r.lease), { [Symbol('leaseBrand')]: true }]) {
    assert.equal(isPreparedWriteLeaseActive(fake), false); assert.equal(releaseWriteLease(fake).code, 'LOCK_INVALID');
  }
  for (const fake of [Object.create(ctx.prepared), Object.assign({}, ctx.prepared, { [Symbol('prepared')]: true })]) {
    blocked(inspectWriteReadiness({ repoRoot: ctx.repoRoot, preparedResult: fake }), 'READINESS_INPUT_INVALID');
  }
  assert.equal(isPreparedWriteLeaseActive(r.lease), true); releaseWriteLease(r.lease);
  assert.equal(isPreparedWriteLeaseActive(r.lease), false); assert.equal(releaseWriteLease(r.lease).status, 'ALREADY_RELEASED');
});
for (const redirect of ['junction', 'file']) environmentCase(`audit: unsafe lock root ${redirect} blocks before lock metadata write`, ctx => privateFixtureTemp(ctx, temp => {
  const root = path.join(temp, 'aventourarte-factory-fix-locks-v1'), destination = path.join(temp, 'redirect-destination');
  if (redirect === 'file') writeFileSync(root, 'foreign');
  else { mkdirSync(destination); fs.symlinkSync(destination, root, process.platform === 'win32' ? 'junction' : 'dir'); }
  assert.throws(() => acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts'), e => e.code === 'LOCK_INVALID');
  if (redirect !== 'file') assert.deepEqual(fs.readdirSync(destination), []);
}));
for (const mutation of ['hardlink', 'directory', 'root junction']) environmentCase(`audit: replaced lock ${mutation} is never deleted`, ctx => privateFixtureTemp(ctx, temp => {
  let file; const a = afterExclusiveLock(p => { file = p; }, () => acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts'));
  if (mutation === 'hardlink') fs.linkSync(file, file + '.alias');
  if (mutation === 'directory') { fs.renameSync(file, file + '.own'); mkdirSync(file); }
  if (mutation === 'root junction') {
    const root = path.dirname(file), moved = path.join(temp, 'original-lock-root'); fs.renameSync(root, moved);
    fs.symlinkSync(moved, root, process.platform === 'win32' ? 'junction' : 'dir');
  }
  assert.equal(releaseSourceLock(a).status, 'BLOCKED'); assert.equal(fs.existsSync(file), true);
}));
environmentCase('audit: failed acquisition does not unlink externally changed partial metadata', ctx => privateFixtureTemp(ctx, () => {
  let file;
  assert.throws(() => afterExclusiveLock(p => { file = p; }, () => patched(mutableFs, 'writeSync', () => () => {
    writeFileSync(file, 'foreign partial metadata'); const error = new Error('fixture'); error.code = 'EIO'; throw error;
  }, () => acquireSourceLock(ctx.repository, 'src/app/guides/fixture.guide.ts'))), e => e.code === 'LOCK_ACQUISITION_FAILED');
  assert.equal(readFileSync(file, 'utf8'), 'foreign partial metadata');
}));
for (const [label, matches, output] of [
  ['truncated index', args => args.includes('--stage'), Buffer.from('100644 ' + 'a'.repeat(40) + ' 0\tfile')],
  ['unknown cached change', args => args.includes('--name-status'), Buffer.from('Z\0other\0')],
  ['missing rename path', args => args.includes('--name-status'), Buffer.from('R100\0original\0')],
  ['missing attributes', args => args.includes('check-attr'), Buffer.alloc(0)],
  ['invalid UTF-8', args => args.includes('--local'), Buffer.from([255])],
  ['BOM config', args => args.includes('--local'), Buffer.from('\ufeffcore.bare\nfalse\0')]
]) environmentCase(`audit: malformed ${label} fails rather than clean`, ctx => {
  const r = patched(mutableProcess, 'spawnSync', original => (exe, args, options) => matches(args)
    ? { stdout: output, stderr: Buffer.alloc(0), status: 0, signal: null } : original(exe, args, options), () => ctx.inspect());
  assert.equal(r.report.status, 'FAILED'); assert.equal(r.report.diagnostics[0].code, 'GIT_OUTPUT_INVALID');
});
test('audit: cached change parser is strict and preserves copy/rename paths', () => {
  assert.equal(parseGitCachedChanges('R100\0old 日本\0new space\0')[0].original, 'old 日本');
  assert.equal(parseGitCachedChanges('C90\0original\0copy\0')[0].path, 'copy');
  assert.equal(parseGitCachedChanges('R098\0original\0renamed\0')[0].original, 'original');
  for (const bad of ['M file', 'Z\0file\0', 'M\0', 'R101\0old\0new\0', 'R100\0old\0']) assert.throws(() => parseGitCachedChanges(bad), e => e.code === 'GIT_OUTPUT_INVALID');
});
environmentCase('audit: actual edited rename with zero-padded score is a controlled target block', ctx => {
  const source = ctx.source + Array.from({ length: 100 }, (_, i) => `// fixture line ${i}\n`).join('');
  writeFileSync(ctx.sourceFile, source); gitFixture(ctx.repoRoot, ['add', '--all']); gitFixture(ctx.repoRoot, ['commit', '-m', 'Rename fixture']);
  const moved = path.join(path.dirname(ctx.sourceFile), 'moved.guide.ts');
  gitFixture(ctx.repoRoot, ['mv', '--', 'src/app/guides/fixture.guide.ts', 'src/app/guides/moved.guide.ts']);
  writeFileSync(moved, source.replace('fixture line 50', 'modified line 50')); gitFixture(ctx.repoRoot, ['add', '--all']);
  assert.match(gitFixture(ctx.repoRoot, ['diff', '--cached', '--name-status', '-z', '--find-renames']), /^R0[0-9]{2}\0/);
  assert.throws(() => inspectGitTargetState(ctx.repository, 'src/app/guides/fixture.guide.ts'), e => e.code === 'TARGET_RENAMED');
});
for (const kind of ['timeout', 'stdout', 'stderr']) environmentCase(`audit: actual bounded child ${kind} is terminated`, ctx => {
  let child;
  const script = kind === 'timeout' ? 'setInterval(() => {}, 1000)' : `for (let i=0;i<1000;i++) process.${kind}.write('x'.repeat(65536));`;
  const r = patched(mutableProcess, 'spawnSync', () => (_exe, _args, options) => {
    child = spawnSync(process.execPath, ['-e', script], { ...options, timeout: kind === 'timeout' ? 100 : options.timeout }); return child;
  }, () => ctx.inspect());
  assert.equal(r.report.status, 'FAILED'); assert.equal(r.report.diagnostics[0].code, kind === 'timeout' ? 'GIT_TIMEOUT' : 'GIT_OUTPUT_LIMIT');
  assert.ok(child.error); assert.throws(() => process.kill(child.pid, 0), e => e.code === 'ESRCH');
});
for (const code of WORKSPACE_ERROR_CODES) test(`Phase 6 intentional classification ${code}`, () => {
  const failed = ['GIT_UNAVAILABLE', 'GIT_INSPECTION_FAILED', 'GIT_OUTPUT_INVALID', 'GIT_TIMEOUT', 'GIT_OUTPUT_LIMIT',
    'FILESYSTEM_INSPECTION_FAILED', 'LOCK_ACQUISITION_FAILED', 'LOCK_RELEASE_FAILED'];
  assert.equal(WORKSPACE_CLASSIFICATION[code], failed.includes(code) ? 'FAILED' : 'BLOCKED');
  assert.equal(new WorkspaceError(code).message, `Factory environment: ${code}.`);
});

test('real repo read-only Git/path inspection preserves all 17 source bytes and catalog', () => {
  const identities = listFactoryGuideSourceIdentities({ repoRoot: projectRoot }), before = new Map([catalogPath, ...identities.map(i => i.sourcePath)].map(p => [p, readFileSync(path.join(projectRoot, p))]));
  const hashes = new Map([...before].map(([file, bytes]) => [file, createHash('sha256').update(bytes).digest('hex')]));
  const repo = inspectRepositoryRoot(projectRoot), identity = identities.find(i => i.guidePath.endsWith('/jerez-de-la-frontera'));
  assert.equal(identities.length, 17);
  const first = inspectGitTargetState(repo, identity.sourcePath), index = path.join(first.gitDirectory, 'index'), indexBytes = readFileSync(index);
  const lock = acquireSourceLock(repo, identity.sourcePath);
  try {
    assert.equal(first.state, 'TRACKED_CLEAN'); assert.deepEqual(inspectGitTargetState(repo, identity.sourcePath), first);
    assert.equal(observeSourcePath(repo, identity.sourcePath).sourceHash, identity.sourceHash);
  } finally { assert.equal(releaseSourceLock(lock).status, 'RELEASED'); }
  for (const [file, bytes] of before) {
    const after = readFileSync(path.join(projectRoot, file)); assert.deepEqual(after, bytes);
    assert.equal(createHash('sha256').update(after).digest('hex'), hashes.get(file));
  }
  assert.deepEqual(readFileSync(index), indexBytes);
});
test('Phase 6 runtime capability audit: only Git inspector spawns, only lock module writes', () => {
  for (const name of ['workspace-contracts', 'path-safety', 'git-inspection', 'source-lock', 'write-readiness']) {
    const source = readFileSync(path.join(projectRoot, 'scripts/factory-fix', name + '.ts'), 'utf8');
    assert.doesNotMatch(source, /\b(?:execFile|execSync|fetch|renameSync|truncateSync|appendFileSync|copyFileSync|writeFileSync|chmodSync|utimesSync)\s*\(|(?<![.\w])exec\s*\(/);
    assert.doesNotMatch(source, /(?:node:(?:https?|net)|factory-qa-invoke|factory-mcp|executeFactoryQa|runFactoryQa|codex exec)/);
    if (name !== 'source-lock') assert.doesNotMatch(source, /\b(?:unlinkSync|writeSync|mkdirSync)\b/);
    if (name !== 'git-inspection') assert.doesNotMatch(source, /node:child_process|\bspawnSync\b/);
  }
});
