import test from 'node:test';
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
const tempRoot = realpathSync.native(tmpdir()), prefix = 'factory-fix-phase5-fixture-';
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
function synthetic(name, run, options) { test(`Phase 5 synthetic: ${name}`, () => fixture(run, options)); }
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

const { prepareFixResult, assertPreparedCandidateConsistency, assertResultLimits } = compiled('prepared-result');
const { deriveQaReviewContext, buildQaHandoff, qaTargetToken } = compiled('qa-handoff');
const { ERROR_CLASSIFICATION, PREPARED_ERROR_CODES, PreparedResultError, classifyFixError, buildFixFailure } = compiled('result-classification');
const { RESULT_LIMITS, QA_PREREQUISITES } = compiled('result-contracts');
const { SOURCE_IDENTITY_ERROR_CODES } = compiled('errors');
const { isFactoryLocationInScope } = require(path.join(outDir, 'src/app/shared/guide-factory-context.js'));
const sha = text => createHash('sha256').update(text, 'utf8').digest('hex');
const prepare = (s, m, operations = proposals(m), requestDigest = m.requestDigest) =>
  prepareFixResult({ snapshot: s, manifest: m, operations, requestDigest });
const prepared = (s, ...ops) => prepare(s, manifest(s, request(s, ops)));
const steps = location => location.map(p => 'property' in p ? p.property : p.element);
function frozen(value) {
  if (value && typeof value === 'object') { assert.ok(Object.isFrozen(value)); Object.values(value).forEach(frozen); }
}
function blocked(result, code) {
  assert.equal(result.status, 'BLOCKED'); assert.equal(result.diagnostics[0].code, code);
  assert.deepEqual(result.qaHandoff, { required: false, reason: 'NO_WRITE' });
  for (const field of ['candidateText', 'candidateHash', 'changedTargets', 'preconditionChecks', 'activeValidation']) assert.equal(field in result, false);
}
function ready(result) {
  assert.equal(result.status, 'READY_TO_WRITE'); assert.ok(result.changedTargets.length > 0);
  assert.equal(result.candidateHash, sha(result.candidateText)); assert.notEqual(result.candidateHash, result.sourceHash);
  assert.equal(result.qaHandoff.required, true); assert.equal(result.qaHandoff.expectedSourceHashAfterWrite, result.candidateHash);
}
function covers(result, token) { assert.ok(isFactoryLocationInScope(result.qaHandoff.reviewContext, token), token); }

synthetic('simple READY with observable gates and explicit pre-write limitations', ctx => {
  const r = unchanged(ctx, () => prepared(ctx.snapshot, update(ctx.snapshot, ['info', 'telefono'], 'new'))); ready(r);
  assert.equal(r.schemaVersion, 1); assert.equal(r.diagnostics.persistence, 'NOT_ATTEMPTED');
  assert.equal(r.diagnostics.currentFilesystemRevalidated, false); assert.equal(r.diagnostics.qaExecuted, false);
  assert.equal(r.preconditionChecks.snapshot, true); assert.equal(r.activeValidation.status, 'VALID');
  assert.deepEqual(r.qaHandoff.reviewContext, { scope: 'targets', targets: ['info.telefono'] });
});
synthetic('simple NO_CHANGE retains every required objective and same hash', ({ snapshot: s }) => {
  const r = prepared(s, update(s, ['info', 'telefono'], 'old'));
  assert.equal(r.status, 'NO_CHANGE'); assert.equal(r.candidateHash, s.sourceHash);
  assert.deepEqual(r.changedTargets, []); assert.deepEqual(r.candidateOperationIds, []);
  assert.equal(r.authorizedActionResults[0].outcome, 'NO_OP'); assert.equal(r.noOpOperationIds.length, 1);
  assert.equal('candidateText' in r, false); assert.deepEqual(r.qaHandoff, { required: false, reason: 'NO_CHANGE' });
});
synthetic('empty valid request is NO_CHANGE', ({ snapshot: s }) => assert.equal(prepared(s).status, 'NO_CHANGE'));
synthetic('required omission cannot be NO_CHANGE', ({ snapshot: s }) => {
  const m = manifest(s, request(s, [update(s, ['descripcion'], 'original')])); blocked(prepare(s, m, []), 'ACTION_REQUIRED_MISSING');
});
synthetic('optional omission and selected no-op are separately accounted', ({ snapshot: s }) => {
  const req = request(s, [update(s, ['descripcion'], 'original'), update(s, ['info', 'telefono'], 'new')]);
  req.actions[1].requirement = 'OPTIONAL'; const m = manifest(s, req), r = prepare(s, m, proposals(m).slice(0, 1));
  assert.equal(r.status, 'NO_CHANGE'); assert.equal(r.authorizedActionResults[1].outcome, 'OMITTED_OPTIONAL');
  assert.equal(r.authorizedActionResults[1].operationId, null); assert.equal(r.authorizedActionResults[1].changed, false);
});
synthetic('optional proposed invalid action blocks whole request', ({ snapshot: s }) => {
  const req = request(s, [update(s, ['descripcion'], 'new'), update(s, ['info', 'telefono'], 'new')]); req.actions[1].requirement = 'OPTIONAL';
  const m = manifest(s, req), p = proposals(m); p[1].operation = wire(s, update(s, ['info2', 'telefono'], 'new'));
  blocked(prepare(s, m, p), 'ACTION_BINDING_MISMATCH');
});
synthetic('unauthorized proposal blocks with no candidate leak', ({ snapshot: s }) => {
  const m = manifest(s, request(s, [update(s, ['descripcion'], 'new')])), p = proposals(m); p[0].actionId = 'unknown';
  blocked(prepare(s, m, p), 'UNAUTHORIZED_ACTION');
});
synthetic('duplicate action proposal cannot grant partial success', ({ snapshot: s }) => {
  const m = manifest(s, request(s, [update(s, ['descripcion'], 'new')])), p = proposals(m); blocked(prepare(s, m, [...p, ...p]), 'UNAUTHORIZED_ACTION');
});
synthetic('stale manifest on a newly captured snapshot blocks even no-op', ctx => {
  const s = ctx.snapshot, m = manifest(s, request(s, [update(s, ['descripcion'], 'original')]));
  writeFileSync(ctx.sourceFile, ctx.source + '// changed fixture bytes\n');
  const fresh = buildGuideSnapshot({ repoRoot: ctx.repoRoot, sourceIdentity: resolveFactoryGuideSourceIdentity({ repoRoot: ctx.repoRoot, guidePath: ctx.guidePath }) });
  blocked(prepare(fresh, m), 'PRECONDITION_FAILED');
});
synthetic('captured result never claims a later filesystem freshness check', ctx => {
  const m = manifest(ctx.snapshot, request(ctx.snapshot, [update(ctx.snapshot, ['descripcion'], 'new')]));
  writeFileSync(ctx.sourceFile, ctx.source + '// external TEMP drift\n');
  const bytes = readFileSync(ctx.sourceFile), r = prepare(ctx.snapshot, m); ready(r);
  assert.equal(r.diagnostics.currentFilesystemRevalidated, false); assert.deepEqual(readFileSync(ctx.sourceFile), bytes);
});
synthetic('ACTIVE violation returns BLOCKED', ({ snapshot: s }) => {
  blocked(prepared(s, update(s, ['secciones', 4, 'lugares', 0, 'descripcion'], '💡 Consejo AvenTourArte: Texto\n🍴 Qué pedir sí o sí: Texto')), 'ACTIVE_CONFLICT');
}, municipal);
synthetic('missing evidence returns BLOCKED', ({ snapshot: s }) => {
  const req = request(s, [update(s, ['info', 'telefono'], 'new')]); evidence(req); const m = manifest(s, req), p = proposals(m);
  p[0].evidenceIds = []; blocked(prepare(s, m, p), 'EVIDENCE_REQUIRED');
});
synthetic('partial unsupported before manifest is a classified BLOCKED result', ({ snapshot: s }) => {
  try { manifest(s, request(s, [], { allowPartial: true })); assert.fail('Must block'); }
  catch (error) { blocked(buildFixFailure(error, { snapshot: s, requestId: 'fixture-request' }), 'PARTIAL_UNSUPPORTED'); }
});
synthetic('digest mismatch blocks', ({ snapshot: s }) => {
  const m = manifest(s, request(s, [])); blocked(prepare(s, m, [], '0'.repeat(64)), 'REQUEST_DIGEST_MISMATCH');
});
synthetic('fake snapshot blocks without asserting a source identity', ({ snapshot: s }) => {
  const m = manifest(s, request(s, [])), r = prepare({ ...s }, m); blocked(r, 'SNAPSHOT_INVALID'); assert.equal(r.sourceIdentity, null);
});
for (const fake of ['spread', 'serialized']) synthetic(`manifest ${fake} carries no host authority`, ({ snapshot: s }) => {
  const m = manifest(s, request(s, [])); blocked(prepare(s, fake === 'spread' ? { ...m } : JSON.parse(JSON.stringify(m)), [], m.requestDigest), 'AUTHORIZATION_INVALID');
});
synthetic('same-gap ADDs are expected BLOCKED conflicts', ({ snapshot: s }) => {
  blocked(prepared(s, addProperty(s, ['info'], 'x', 1), addProperty(s, ['info'], 'y', 2)), 'EDIT_OVERLAP');
});
synthetic('known internal invariant gives safe FAILED without candidate or stack', ({ snapshot: s }) => {
  const error = new SourceIdentityError('CANDIDATE_STRUCTURE_MISMATCH'); error.message = 'private source'; error.stack = 'private stack';
  const r = buildFixFailure(error, { snapshot: s, requestId: 'fixture-request' });
  assert.equal(r.status, 'FAILED'); assert.equal(r.diagnostics[0].category, 'INVARIANT');
  assert.equal('candidateText' in r, false); assert.equal('candidateHash' in r, false);
  assert.doesNotMatch(JSON.stringify(r), /private source|private stack/); assert.equal(r.qaHandoff.required, false); frozen(r);
});
for (const error of [new TypeError('programmer'), new Error('unknown bug'), { code: 'READ_FAILED' }, new SourceIdentityError('future-code')]) {
  test(`unknown/programmer error remains visible: ${error.constructor.name}`, () => assert.throws(() => buildFixFailure(error), e => e === error));
}
for (const input of [null, [], {}, { snapshot: null, manifest: null, operations: [], requestDigest: '', candidateText: 'unapproved' }]) {
  test(`invalid API envelope throws TypeError ${JSON.stringify(input)}`, () => assert.throws(() => prepareFixResult(input), TypeError));
}
synthetic('outer getter never executes and throws API TypeError', ({ snapshot: s }) => {
  let calls = 0; const m = manifest(s, request(s, [])), input = { snapshot: s, manifest: m, operations: [], requestDigest: m.requestDigest };
  Object.defineProperty(input, 'manifest', { enumerable: true, get() { calls++; throw new Error('private'); } });
  assert.throws(() => prepareFixResult(input), TypeError); assert.equal(calls, 0);
});
synthetic('nested proposal getter never executes and is controlled BLOCKED', ({ snapshot: s }) => {
  let calls = 0; const m = manifest(s, request(s, [update(s, ['descripcion'], 'new')])), p = proposals(m);
  Object.defineProperty(p[0], 'operation', { enumerable: true, get() { calls++; throw new Error('private'); } });
  blocked(prepare(s, m, p), 'AUTHORIZATION_INVALID'); assert.equal(calls, 0);
});

for (const [name, mutate, noOp = false] of [
  ['ready with no changed targets', r => { r.changedTargets = []; }],
  ['no-change with changed target', r => { r.changedTargets = [{ operationId: 'foreign' }]; }, true],
  ['candidate hash', r => { r.candidateHash = '0'.repeat(64); }],
  ['source hash', r => { r.sourceHash = '0'.repeat(64); }],
  ['snapshot ID', r => { r.snapshotId = '0'.repeat(64); }],
  ['request identity', r => { r.requestId = 'foreign'; }],
  ['missing action', r => { r.authorizedActionResults = []; }],
  ['duplicated action', r => { r.authorizedActionResults.push(r.authorizedActionResults[0]); }],
  ['orphan action', r => { r.authorizedActionResults[0].actionId = 'foreign'; }],
  ['false omission of required', r => { r.authorizedActionResults[0].outcome = 'OMITTED'; }],
  ['missing changed operation', r => { r.appliedOperationIds = []; }],
  ['orphan operation', r => { r.appliedOperationIds.push('foreign'); }],
  ['missing attribution', r => { r.diffAttribution = []; }],
  ['orphan attribution action', r => { r.diffAttribution[0].actionId = 'foreign'; }],
  ['orphan changed target', r => { r.changedTargets[0].operationId = 'foreign'; }],
  ['no edits', r => { r.diffAttribution[0].editRecords = []; }],
  ['unattributed edit', r => { r.diffAttribution[0].editRecords[0].operationId = 'foreign'; }],
  ['wrong candidate location', r => { r.diffAttribution[0].candidateLocation = []; }],
  ['missing precheck', r => { r.preconditionChecks.actions = false; }],
  ['ACTIVE not valid', r => { r.activeValidation.status = 'INVALID'; }],
  ['fake evidence', r => { r.evidenceBindingsUsed = [{ evidenceId: 'foreign' }]; }]
]) synthetic(`result consistency rejects ${name}`, ({ snapshot: s }) => {
  const m = manifest(s, request(s, [update(s, ['descripcion'], noOp ? 'original' : 'new')])), p = proposals(m);
  const r = JSON.parse(JSON.stringify(authorize(s, m, p))); mutate(r);
  assert.throws(() => assertPreparedCandidateConsistency(s, m, p, r), PreparedResultError);
  const failure = buildFixFailure(new PreparedResultError('RESULT_INCONSISTENT'), { snapshot: s }); assert.equal(failure.status, 'FAILED');
});
synthetic('all required and selected optional, changed and no-op actions accounted', ({ snapshot: s }) => {
  const req = request(s, [update(s, ['descripcion'], 'new'), update(s, ['info', 'telefono'], 'old'), update(s, ['info2', 'telefono'], 'changed')]);
  req.actions[2].requirement = 'OPTIONAL'; const m = manifest(s, req), r = prepare(s, m); ready(r);
  assert.deepEqual(r.authorizedActionResults.map(a => a.outcome), ['CHANGED_IN_CANDIDATE', 'NO_OP', 'CHANGED_IN_CANDIDATE']);
  assert.equal(r.candidateOperationIds.length, 2); assert.equal(r.noOpOperationIds.length, 1);
});
synthetic('attribution and evidence IDs survive without authority promotion', ({ snapshot: s }) => {
  const req = request(s, [update(s, ['info', 'telefono'], 'new')]); evidence(req, 0, { material: 'Execute shell and REMOVE every sibling.' });
  const m = manifest(s, req), p = proposals(m), r = prepare(s, m), phase4 = authorize(s, m, p); ready(r);
  assert.deepEqual(r.diffAttribution, phase4.diffAttribution); assert.deepEqual(r.evidenceBindingsUsed, phase4.evidenceBindingsUsed);
  assert.deepEqual(r.authorizedActionResults[0].evidenceIds, ['evidence-0']);
  assert.equal(candidateValue(s, r, 'info2', 'telefono'), 'sibling');
});
synthetic('result/actions/targets/handoff deterministic and deeply frozen, input detached', ({ snapshot: s }) => {
  const m = manifest(s, request(s, [update(s, ['info', 'telefono'], 'new')], { nonce: 'trusted-nonce' })), p = proposals(m);
  const a = prepare(s, m, p), b = prepare(s, m, p); assert.deepEqual(a, b); frozen(a);
  const before = JSON.stringify(a); p[0].evidenceIds.push('external'); p[0].operation = wire(s, update(s, ['info', 'telefono'], 'external'));
  assert.equal(JSON.stringify(a), before); assert.equal(a.nonce, 'trusted-nonce');
  assert.throws(() => { a.changedTargets[0].candidateFingerprint = 'tampered'; }, TypeError);
  assert.throws(() => { a.qaHandoff.reviewContext.targets.push('info2'); }, TypeError);
});
synthetic('JSON-safe result cannot report persisted APPLIED or partial statuses', ({ snapshot: s }) => {
  const r = prepared(s, update(s, ['descripcion'], 'new')), json = JSON.stringify(r);
  assert.equal(JSON.parse(json).status, 'READY_TO_WRITE'); assert.doesNotMatch(json, /"(?:APPLIED|PARTIALLY_APPLIED|APPLIED_IN_MEMORY)"|"stack"|"kind":\d/);
  assert.equal('appliedOperationIds' in r, false); assert.equal('resultDigest' in r, false);
});

for (const [name, make, kind] of [
  ['update', s => update(s, ['descripcion'], 'new'), 'VALUE'],
  ['add property', s => addProperty(s, ['info'], 'extra', 'new'), 'PROPERTY_ADD'],
  ['remove property', s => remove(s, ['info', 'count']), 'PROPERTY_REMOVE'],
  ['add element', s => addElement(s, ['values'], { nombre: 'New', telefono: 'new' }), 'ELEMENT_ADD'],
  ['remove element', s => remove(s, ['values', 0], 'REMOVE_ELEMENT'), 'ELEMENT_REMOVE'],
  ['reorder', s => reorder(s, ['values'], [2, 0, 1]), 'REORDER']
]) synthetic(`before/after observed identity ${name}`, ({ snapshot: s }) => {
  const r = prepared(s, make(s)); ready(r); const c = r.changedTargets[0]; assert.equal(c.kind, kind);
  assert.equal(c.actionId, r.authorizedActionResults[0].actionId); assert.equal(c.operationId, r.candidateOperationIds[0]);
  assert.equal(c.originalContainerRef.snapshotId, s.snapshotId); assert.equal('candidateTargetId' in c, false);
  if (kind.endsWith('ADD')) { assert.equal(c.originalTargetRef, null); assert.equal(c.originalLocation, null); assert.equal(c.beforeFingerprint, null); }
  else { assert.equal(c.originalTargetRef.snapshotId, s.snapshotId); assert.equal(c.beforeFingerprint, c.originalTargetRef.fingerprint); }
  if (kind.endsWith('REMOVE')) { assert.equal(c.candidateLocation, null); assert.equal(c.candidateFingerprint, null); }
  else {
    let node = readCandidateRoot(s, r.candidateText); for (const step of steps(c.candidateLocation)) node = typeof step === 'number' ? node.elements[step] : node.properties.find(p => p.name === step).node;
    assert.equal(node.fingerprint, c.candidateFingerprint);
  }
});
synthetic('shifted candidate index does not reuse original identity', ({ snapshot: s }) => {
  const r = prepared(s, remove(s, ['values', 0], 'REMOVE_ELEMENT'), update(s, ['values', 2, 'telefono'], 'new')); ready(r);
  assert.deepEqual(steps(r.changedTargets[1].originalLocation), ['values', 2, 'telefono']);
  assert.deepEqual(steps(r.changedTargets[1].candidateLocation), ['values', 1, 'telefono']); covers(r, 'values[1].telefono');
});

for (const [name, make, expected] of [
  ['root property', s => update(s, ['descripcion'], 'new'), ['descripcion']],
  ['nested property', s => update(s, ['info', 'telefono'], 'new'), ['info.telefono']],
  ['visit property', s => update(s, ['secciones', 2, 'lugares', 0, 'descripcion'], 'new'), ['secciones[2].lugares[0].descripcion']],
  ['visit card property insertion', s => addProperty(s, ['secciones', 2, 'lugares', 0], 'telefono', 'new'), ['secciones[2].lugares[0]']],
  ['new visit', s => addElement(s, ['secciones', 2, 'lugares'], { nombre: 'Nueva', descripcion: 'Texto', tiposPlan: ['ruta'] }), ['secciones[2].lugares[2]']],
  ['remove visit', s => remove(s, ['secciones', 2, 'lugares', 0], 'REMOVE_ELEMENT'), ['secciones[2].lugares']],
  ['visit reorder', s => reorder(s, ['secciones', 2, 'lugares'], [1, 0]), ['secciones[2].lugares']],
  ['gastronomy property', s => update(s, ['secciones', 3, 'platos', 0, 'descripcion'], 'new'), ['secciones[3].platos[0].descripcion']],
  ['gastronomy profile invariant', s => update(s, ['secciones', 3, 'platos', 0, 'perfilAlimentario', 'alcohol'], 'contiene'), ['secciones[3].platos[0]']],
  ['new dish', s => addElement(s, ['secciones', 3, 'platos'], { nombre: 'Nuevo', descripcion: 'Texto', perfilAlimentario: profile }), ['secciones[3].platos[2]']],
  ['new restaurant', s => addElement(s, ['secciones', 4, 'lugares'], { nombre: 'Nuevo', descripcion: 'Texto' }), ['secciones[4].lugares[1]']],
  ['restaurant markers property', s => update(s, ['secciones', 4, 'lugares', 0, 'descripcion'], '💡 Consejo AvenTourArte: Texto'), ['secciones[4].lugares[0].descripcion']],
  ['new fiesta', s => addElement(s, ['secciones', 6, 'lugares'], { nombre: 'Nueva', fecha: 'Enero' }), ['secciones[6].lugares[1]']],
  ['fiesta property order', s => addProperty(s, ['secciones', 6, 'lugares', 0], 'precio', 'Texto'), ['secciones[6].lugares[0]']],
  ['remove optional visit property', s => remove(s, ['secciones', 2, 'lugares', 0, 'web']), ['secciones[2].lugares[0]']]
]) synthetic(`QA mapping ${name}`, ({ snapshot: s }) => {
  const r = prepared(s, make(s)); ready(r); assert.deepEqual(r.qaHandoff.reviewContext, { scope: 'targets', targets: expected });
  assert.equal(r.qaHandoff.guidePath, s.sourceIdentity.guidePath); assert.equal('ruleSet' in r.qaHandoff, false);
}, municipal);
synthetic('fiesta reorder QA collection', ({ snapshot: s }) => {
  const r = prepared(s, reorder(s, ['secciones', 6, 'lugares'], [1, 0])); ready(r);
  assert.deepEqual(r.qaHandoff.reviewContext.targets, ['secciones[6].lugares']);
}, { ...municipal, fields: baseFields.replace("fecha: 'Agosto' }", "fecha: 'Agosto' }, { nombre: 'Otra', fecha: 'Enero' }") });

for (const [name, make, expected] of [
  ['zone property', s => update(s, ['secciones', 0, 'itinerario', 0, 'zonas', 0, 'descripcion'], 'new'), 'secciones[0].itinerario[0].zonas[0].descripcion'],
  ['day property', s => update(s, ['secciones', 0, 'itinerario', 0, 'dia'], 'Regreso'), 'secciones[0].itinerario[0].dia'],
  ['zone ADD optional property', s => addProperty(s, ['secciones', 0, 'itinerario', 0, 'zonas', 0], 'precio', 'Texto'), 'secciones[0].itinerario[0].zonas[0].precio'],
  ['new zone', s => addElement(s, ['secciones', 0, 'itinerario', 0, 'zonas'], zone), 'secciones[0].itinerario[0].zonas[1]'],
  ['new day', s => addElement(s, ['secciones', 0, 'itinerario'], { dia: 'Regreso', zonas: [zone] }), 'secciones[0].itinerario[1]'],
  ['remove optional itinerary', s => remove(s, ['secciones', 0, 'itinerario']), 'secciones[0].itinerario'],
  ['new type scalar needs collection', s => addElement(s, ['secciones', 0, 'itinerario', 0, 'zonas', 0, 'tiposPlan'], 'urbano'), 'secciones[0].itinerario[0].zonas[0].tiposPlan'],
  ['section role requires section', s => update(s, ['secciones', 0, 'titulo'], 'Qué visitar en Fixture'), 'secciones[0]']
]) synthetic(`QA itinerary ${name}`, ({ snapshot: s }) => {
  const r = prepared(s, make(s)); ready(r); assert.deepEqual(r.qaHandoff.reviewContext.targets, [expected]);
}, international);
for (const name of ['zones reorder', 'zone remove']) synthetic(`QA ${name} reviews collection invariant`, ({ snapshot: s }) => {
  const loc = ['secciones', 0, 'itinerario', 0, 'zonas'];
  const r = prepared(s, name === 'zones reorder' ? reorder(s, loc, [1, 0]) : remove(s, [...loc, 0], 'REMOVE_ELEMENT')); ready(r);
  assert.deepEqual(r.qaHandoff.reviewContext.targets, ['secciones[0].itinerario[0].zonas']);
}, { fields: international.fields.replace(JSON.stringify(zone), `${JSON.stringify(zone)}, ${JSON.stringify({ ...zone, nombre: 'Otra' })}`) });

// Mapper-only observations do not mint writer authority; exercise structural coverage fallbacks.
function changeAt(s, location, kind = 'VALUE', overrides = {}) {
  const ref = getGuideRootRef(s), structured = location.map(p => typeof p === 'string' ? { property: p } : { element: p });
  return { actionId: 'a', operationId: 'o', kind, originalTargetRef: ref, originalLocation: structured,
    originalContainerRef: ref, candidateLocation: structured, candidateContainerLocation: structured.slice(0, -1),
    beforeFingerprint: ref.fingerprint, candidateFingerprint: '0'.repeat(64), candidateNodeKind: 'string', ...overrides };
}
for (const location of [['secciones'], ['secciones', 2], ['secciones', 2, 'titulo']]) synthetic(`municipal global invariant ${location.join('/')}`, ({ snapshot: s }) => {
  const h = buildQaHandoff(s, [changeAt(s, location)], '0'.repeat(64));
  assert.deepEqual(h.reviewContext, { scope: 'guide' }); assert.ok(h.coverageReasons.includes('SECTION_INVARIANT_AFFECTED'));
}, municipal);
for (const key of ['a.b', 'a[2]', 'é', ' phone', '']) synthetic(`unrepresentable exact key ${JSON.stringify(key)} falls back`, ({ snapshot: s }) => {
  const h = buildQaHandoff(s, [changeAt(s, ['info', key])], '0'.repeat(64));
  assert.deepEqual(h.reviewContext, { scope: 'guide' }); assert.equal(h.guidePath, s.sourceIdentity.guidePath);
  assert.ok(h.coverageReasons.includes('FALLBACK_FULL_GUIDE'));
});
synthetic('root structural observation falls back to full guide', ({ snapshot: s }) => assert.equal(buildQaHandoff(s, [changeAt(s, [])], '0'.repeat(64)).reviewContext.scope, 'guide'));
synthetic('parent containment and duplicate targets rely on exact core tokens', ({ snapshot: s }) => {
  const locations = [['values', 20, 'telefono'], ['values', 2, 'telefono'], ['values', 2], ['values', 2, 'telefono']];
  const { reviewContext } = deriveQaReviewContext(s, locations.map((loc, i) => changeAt(s, loc, 'VALUE', { operationId: 'o' + i })));
  assert.deepEqual(reviewContext, { scope: 'targets', targets: ['values[20].telefono', 'values[2]'] });
  assert.equal(isFactoryLocationInScope({ scope: 'targets', targets: ['values[2]'] }, 'values[20].telefono'), false);
  assert.equal(isFactoryLocationInScope(reviewContext, 'values[3].telefono'), false);
});
synthetic('QA targets sorted deterministically regardless observation order', ({ snapshot: s }) => {
  const changes = [changeAt(s, ['info', 'telefono']), changeAt(s, ['descripcion'])];
  assert.deepEqual(deriveQaReviewContext(s, changes), deriveQaReviewContext(s, [...changes].reverse()));
});
synthetic('unrelated siblings stay outside exact property QA context', ({ snapshot: s }) => {
  const r = prepared(s, update(s, ['info', 'telefono'], 'new')); covers(r, 'info.telefono');
  assert.equal(isFactoryLocationInScope(r.qaHandoff.reviewContext, 'info2.telefono'), false);
  assert.equal(isFactoryLocationInScope(r.qaHandoff.reviewContext, 'info.web'), false);
  assert.notDeepEqual(r.activeValidation.validationTargets, r.qaHandoff.reviewContext);
});
test('token encoder uses exact observed indices and no aliases/normalization', () => {
  assert.equal(qaTargetToken([{ property: 'infoGeneral' }, { property: 'web' }]), 'infoGeneral.web');
  assert.equal(qaTargetToken([{ property: 'values' }, { element: 20 }]), 'values[20]');
  for (const location of [[{ property: 'é' }], [{ property: 'a.b' }], [{ element: 2 }], [{ property: 'x' }, { element: -1 }], [{ property: 'x' }, { element: 1.5 }], [{ property: 'x', element: 2 }]]) assert.equal(qaTargetToken(location), null);
  assert.equal(isFactoryLocationInScope({ scope: 'targets', targets: ['values[02]'] }, 'values[2].telefono'), true);
});
synthetic('QA property order covers immediate visit subsection card', ({ snapshot: s }) => {
  const loc = ['secciones', 2, 'subsecciones', 0, 'lugares', 0];
  const r = prepared(s, addProperty(s, loc, 'telefono', 'fixture', { mode: 'before', anchorRef: refAt(s, ...loc, 'web') }));
  ready(r); assert.deepEqual(r.qaHandoff.reviewContext.targets, ['secciones[2].subsecciones[0].lugares[0]']);
}, { ...municipal, fields: baseFields.replace(`lugares: [${JSON.stringify(visit)},`, `subsecciones: [{ titulo: 'Parte', lugares: [${JSON.stringify(visit)}] }], lugares: [${JSON.stringify(visit)},`) });
synthetic('QA role selection matches core case/diacritics without normalizing target tokens', ({ snapshot: s }) => {
  const ref = refAt(s, 'secciones', 2, 'lugares', 0), c = changeAt(s, ['secciones', 2, 'lugares', 0, 'telefono'], 'PROPERTY_ADD', {
    originalLocation: null, originalTargetRef: null, originalContainerRef: ref,
    candidateContainerLocation: ref.location, beforeFingerprint: null
  });
  const h = buildQaHandoff(s, [c], '0'.repeat(64)); assert.deepEqual(h.reviewContext.targets, ['secciones[2].lugares[0]']);
}, { ...municipal, fields: baseFields.replace('Qué visitar en Fixture', '  QUÉ VISITAR EN FIXTURE  ') });
synthetic('handoff requires verified future persistence, readback, identity and catalog', ({ snapshot: s }) => {
  const r = prepared(s, update(s, ['descripcion'], 'new')), h = r.qaHandoff; ready(r);
  assert.equal(h.execute, 'ONLY_AFTER_CONFIRMED_WRITE'); assert.deepEqual(h.prerequisites, QA_PREREQUISITES);
  assert.equal(h.observedCatalogHash, s.sourceIdentity.catalogBinding.catalogHash);
  assert.equal(h.expectedSourceBinding.sourcePath, s.sourceIdentity.sourcePath);
  assert.equal('sourceIdentity' in h, false); assert.equal('ruleSet' in h.expectedSourceBinding, false);
  assert.equal('status' in h, false); assert.equal('issues' in h, false);
});
synthetic('unknown/fake guide cannot create handoff', ({ snapshot: s }) => {
  assert.throws(() => buildQaHandoff({ ...s, sourceIdentity: { ...s.sourceIdentity, guidePath: 'unknown' } }, [changeAt(s, ['descripcion'])], '0'.repeat(64)), e => e.code === 'SNAPSHOT_INVALID');
});
synthetic('handoff rejects no changes or source hash posing as future candidate', ({ snapshot: s }) => {
  assert.throws(() => buildQaHandoff(s, [], '0'.repeat(64)), PreparedResultError);
  assert.throws(() => buildQaHandoff(s, [changeAt(s, ['descripcion'])], s.sourceHash), PreparedResultError);
});
synthetic('mapper/handoff deeply frozen and detached from mutable observations', ({ snapshot: s }) => {
  const changes = [changeAt(s, ['info', 'telefono'])], h = buildQaHandoff(s, changes, '0'.repeat(64)), json = JSON.stringify(h); frozen(h);
  changes[0].candidateLocation[0].property = 'info2'; assert.equal(JSON.stringify(h), json);
});
synthetic('handoff accessor never executed', ({ snapshot: s }) => {
  const changes = [changeAt(s, ['descripcion'])]; let calls = 0;
  Object.defineProperty(changes[0], 'candidateLocation', { enumerable: true, get() { calls++; throw new Error('private'); } });
  assert.throws(() => buildQaHandoff(s, changes, '0'.repeat(64))); assert.equal(calls, 0);
});

for (const [name, mutate] of [
  ['diagnostics count', r => { r.diagnostics = Array(RESULT_LIMITS.maxDiagnostics + 1).fill({ message: 'fixture' }); }],
  ['diagnostic text', r => { r.diagnostics = [{ message: 'x'.repeat(RESULT_LIMITS.maxDiagnosticText + 1) }]; }],
  ['actions', r => { r.authorizedActionResults = Array(RESULT_LIMITS.maxActionResults + 1).fill({}); }],
  ['changed targets', r => { r.changedTargets = Array(RESULT_LIMITS.maxChangedTargets + 1).fill({}); }],
  ['QA targets', r => { r.qaHandoff.reviewContext = { scope: 'targets', targets: Array(RESULT_LIMITS.maxQaTargets + 1).fill('descripcion') }; }],
  ['serialized metadata', r => { r.extra = 'x'.repeat(RESULT_LIMITS.maxSerializedMetadataBytes); }]
]) synthetic(`result budget ${name}`, ({ snapshot: s }) => {
  const r = JSON.parse(JSON.stringify(prepared(s, update(s, ['descripcion'], 'new')))); mutate(r);
  assert.throws(() => assertResultLimits(r), e => e.code === 'RESULT_LIMIT_EXCEEDED');
});
synthetic('metadata budget excludes candidate text without duplicate diagnostics', ({ snapshot: s }) => {
  const r = JSON.parse(JSON.stringify(prepared(s, update(s, ['descripcion'], 'new')))); r.candidateText = 'x'.repeat(RESULT_LIMITS.maxSerializedMetadataBytes + 1);
  assert.doesNotThrow(() => assertResultLimits(r)); assert.equal('candidateText' in r.diagnostics, false);
});
synthetic('Qa mapper changed target budget is enforced', ({ snapshot: s }) => {
  assert.throws(() => deriveQaReviewContext(s, Array(RESULT_LIMITS.maxChangedTargets + 1).fill(changeAt(s, ['descripcion']))), e => e.code === 'RESULT_LIMIT_EXCEEDED');
});

const expectedFailures = ['READ_FAILED', 'DUPLICATE_TARGET_REF', 'SERIALIZATION_FAILED', 'EDIT_INVALID', 'CANDIDATE_INVALID',
  'CANDIDATE_STRUCTURE_MISMATCH', 'MINIMAL_DIFF_VIOLATION', 'DIFF_UNATTRIBUTED'];
test('classification table contains exactly every Phase 1–4 error code', () => assert.deepEqual(Object.keys(ERROR_CLASSIFICATION).sort(), [...SOURCE_IDENTITY_ERROR_CODES].sort()));
for (const code of SOURCE_IDENTITY_ERROR_CODES) test(`exhaustive intentional code classification ${code}`, () => {
  const error = new SourceIdentityError(code); error.message = 'private'; error.stack = 'private';
  const c = classifyFixError(error), r = buildFixFailure(error, { requestId: 'test-request' });
  assert.equal(c.status, expectedFailures.includes(code) ? 'FAILED' : 'BLOCKED'); assert.equal(c.code, code);
  assert.equal(r.status, c.status); assert.equal(r.diagnostics[0].stage, c.stage);
  assert.equal(r.requestId, 'test-request'); assert.equal(r.qaHandoff.required, false);
  assert.equal('candidateText' in r, false); assert.doesNotMatch(JSON.stringify(r), /private/); frozen(r);
});
for (const code of PREPARED_ERROR_CODES) test(`Phase 5 invariant classification ${code}`, () => {
  const r = buildFixFailure(new PreparedResultError(code)); assert.equal(r.status, 'FAILED');
  assert.equal(r.diagnostics[0].stage, code === 'QA_HANDOFF_INCONSISTENT' ? 'QA_HANDOFF' : 'RESULT_CONSISTENCY');
});
synthetic('known action/operation/ref retained for an observed consistency failure', ({ snapshot: s }) => {
  const m = manifest(s, request(s, [update(s, ['descripcion'], 'new')])), a = m.authorizedActions[0];
  const r = buildFixFailure(new PreparedResultError('RESULT_INCONSISTENT', a.actionId, a.operation.operationId, operationRef(a.operation)), { snapshot: s });
  assert.equal(r.diagnostics[0].actionId, a.actionId); assert.equal(r.diagnostics[0].operationId, a.operation.operationId);
  assert.deepEqual(r.diagnostics[0].target, operationRef(a.operation));
});
synthetic('consistency checker attaches the known action and target to its real diagnostic', ({ snapshot: s }) => {
  const m = manifest(s, request(s, [update(s, ['descripcion'], 'new')])), p = proposals(m);
  const tampered = JSON.parse(JSON.stringify(authorize(s, m, p))); tampered.diffAttribution[0].actionId = 'foreign';
  try { assertPreparedCandidateConsistency(s, m, p, tampered); assert.fail('Must reject'); }
  catch (error) {
    const r = buildFixFailure(error, { snapshot: s }); assert.equal(r.status, 'FAILED');
    assert.equal(r.diagnostics[0].actionId, m.authorizedActions[0].actionId);
    assert.equal(r.diagnostics[0].operationId, p[0].operation.operationId);
    assert.deepEqual(r.diagnostics[0].target, operationRef(p[0].operation));
  }
});

const realIdentities = listFactoryGuideSourceIdentities({ repoRoot: projectRoot });
const realBefore = new Map(realIdentities.map(i => [i.sourcePath, readFileSync(path.join(projectRoot, i.sourcePath))]));
const realSnapshot = identity => buildGuideSnapshot({ repoRoot: projectRoot, sourceIdentity: identity });
const jerezIdentity = realIdentities.find(i => i.guidePath.endsWith('/jerez-de-la-frontera'));
const jerez = () => realSnapshot(jerezIdentity);
const sectionSteps = (s, prefix) => ['secciones', getSnapshotNode(s, [{ property: 'secciones' }]).elements.findIndex(n => n.properties.some(p => p.name === 'titulo' && p.node.nodeKind === 'string' && p.node.value.startsWith(prefix)))];
test('real Jerez UPDATE READY exact context, hash and untouched sibling', () => {
  const s = jerez(), loc = [...sectionSteps(s, 'Qué visitar'), 'lugares', 0, 'descripcion'];
  const r = prepared(s, update(s, loc, 'Fixture factual text in memory.')); ready(r);
  assert.equal(r.qaHandoff.guidePath, jerezIdentity.guidePath); covers(r, qaTargetToken(refAt(s, ...loc).location));
  assert.equal(r.sourceIdentity.sourcePath, jerezIdentity.sourcePath);
  const parent = loc.slice(0, -2); assert.deepEqual(candidateValue(s, r, ...parent, 1), current(s, refAt(s, ...parent, 1)));
});
test('real Jerez exact satisfied objective NO_CHANGE and no QA', () => {
  const s = jerez(), ref = refAt(s, 'descripcion'), r = prepared(s, update(s, ['descripcion'], current(s, ref)));
  assert.equal(r.status, 'NO_CHANGE'); assert.equal(r.candidateHash, s.sourceHash); assert.equal(r.qaHandoff.required, false);
});
for (const [name, make] of [
  ['new visit', s => addElement(s, [...sectionSteps(s, 'Qué visitar'), 'lugares'], { nombre: 'Fixture', descripcion: 'Texto', tiposPlan: ['ruta'] })],
  ['fiesta reorder', s => { const loc = [...sectionSteps(s, 'Fiestas'), 'lugares'], refs = children(s, refAt(s, ...loc)); return reorder(s, loc, refs.map((_, i) => refs.length - i - 1)); }],
  ['gastronomy property', s => update(s, [...sectionSteps(s, 'Gastronomía'), 'platos', 0, 'descripcion'], 'Fixture factual text.')],
  ['restaurant markers', s => update(s, [...sectionSteps(s, 'Dónde comer'), 'lugares', 0, 'descripcion'], '💡 Consejo AvenTourArte: Fixture.')]
]) test(`real Jerez municipal QA coverage ${name}`, () => {
  const s = jerez(), r = prepared(s, make(s)); ready(r);
  const c = r.changedTargets[0]; covers(r, qaTargetToken(c.candidateLocation));
});
function realZones() {
  for (const i of realIdentities.filter(i => i.ruleSet === 'generic')) {
    const s = realSnapshot(i), node = s.nodes.find(n => n.nodeKind === 'array' && n.location.at(-1)?.property === 'zonas'
      && n.elements.length > 1 && n.elements.every(e => e.nodeKind === 'object' && e.properties.some(p => p.name === 'descripcion')));
    if (node) return { s, loc: steps(node.location), count: node.elements.length };
  }
  assert.fail('Expected existing international zones.');
}
for (const name of ['UPDATE', 'ADD_PROPERTY', 'REORDER']) test(`real international zone ${name}`, () => {
  const { s, loc, count } = realZones();
  const op = name === 'UPDATE' ? update(s, [...loc, 0, 'descripcion'], 'Fixture factual text.')
    : name === 'ADD_PROPERTY' ? addProperty(s, [...loc, 0], ['web', 'telefono', 'reserva'].find(k => !getSnapshotNode(s, refAt(s, ...loc, 0).location).properties.some(p => p.name === k)), 'https://fixture.example/')
      : reorder(s, loc, Array.from({ length: count }, (_, i) => count - i - 1));
  const r = prepared(s, op); ready(r); covers(r, qaTargetToken(r.changedTargets[0].candidateLocation));
});
test('Phase 5 leaves all 17 repository sources and catalog byte-identical', () => {
  for (const [file, bytes] of realBefore) assert.deepEqual(readFileSync(path.join(projectRoot, file)), bytes);
  assert.equal(readFileSync(path.join(projectRoot, catalogPath), 'utf8'), catalogText);
});
test('Phase 5 runtime grants no write/process/network/model/MCP or QA invocation capability', () => {
  for (const name of ['result-contracts', 'result-classification', 'prepared-result', 'qa-handoff']) {
    const source = readFileSync(path.join(projectRoot, 'scripts/factory-fix', name + '.ts'), 'utf8');
    assert.doesNotMatch(source, /\b(?:writeFile|rename|unlink|appendFile|copyFile|spawn|spawnSync|execFile|fetch|Date\.now|Math\.random)\b/);
    assert.doesNotMatch(source, /(?:node:(?:fs|child_process|http|https|net)|factory-qa-invoke|factory-mcp|executeFactoryQa|runFactoryQa|codex exec)/);
  }
});
test('Phase 5 regression: existing catalog, catalog identity and executor specs', async t => {
  const jasmineCore = require('jasmine-core'), jasmine = jasmineCore.core(jasmineCore), env = jasmine.getEnv();
  const bindings = jasmineCore.interface(jasmine, env), saved = new Map();
  Object.entries(bindings).forEach(([key, value]) => { saved.set(key, Object.getOwnPropertyDescriptor(globalThis, key)); globalThis[key] = value; });
  const failures = []; let count = 0;
  try {
    env.configure({ random: false });
    const done = new Promise(resolve => env.addReporter({
      specDone(result) { count++; if (result.status !== 'passed') failures.push(result.fullName + ': ' + result.failedExpectations.map(e => e.message).join('; ')); },
      jasmineDone(result) { if (result.overallStatus !== 'passed') failures.push(...result.failedExpectations.map(e => e.message)); resolve(result.overallStatus); }
    }));
    for (const name of ['catalog', 'catalog-identity', 'executor']) require(path.join(outDir, 'src/app/shared', `guide-factory-${name}.spec.js`));
    env.execute(); const status = await done;
    t.diagnostic(`Existing pure Factory core catalog/executor: ${count} specs; status ${status}`);
    assert.equal(status, 'passed', failures.join('\n')); assert.deepEqual(failures, []);
  } finally {
    for (const [key, descriptor] of saved) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; }
  }
});
