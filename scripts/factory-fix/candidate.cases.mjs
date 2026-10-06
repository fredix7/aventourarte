import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(import.meta.url), ts = require('typescript');
const outDir = process.env.FACTORY_FIX_OUT_DIR;
if (!outDir) throw new Error('Test configuration: FACTORY_FIX_OUT_DIR is required.');
const compiled = name => require(path.join(outDir, 'scripts/factory-fix', name + '.js'));
const { listFactoryGuideSourceIdentities, resolveFactoryGuideSourceIdentity, inspectGuideExport } = compiled('source-identity');
const { buildGuideSnapshot, getSnapshotNode, getSnapshotSourceText } = compiled('snapshot');
const { getGuideRootRef, listChildTargets } = compiled('target-locator');
const { createCandidateOperation, CANDIDATE_LIMITS, PROTECTED_ROOT_PROPERTIES } = compiled('operations');
const { buildCandidate, verifyCandidateStructure } = compiled('candidate');
const { serializeStaticValue } = compiled('serializer');
const { applyTextEdits, verifyOutsideEdits } = compiled('span-edits');
const { guideTree, dataTree, normalizeStaticData, sameTree } = compiled('static-data');
const { readStaticGuideRoot } = compiled('static-value');
const { SourceIdentityError } = compiled('errors');
const { READ_LIMITS, SNAPSHOT_SCHEMA_VERSION } = compiled('snapshot-contracts');
const sha = text => createHash('sha256').update(text).digest('hex');
const tempRoot = realpathSync.native(tmpdir()), prefix = 'factory-fix-phase3-fixture-';
const catalogPath = 'src/app/shared/guide-factory-catalog.ts';
const catalogText = readFileSync(path.join(projectRoot, catalogPath), 'utf8');
const baseFields = `nombre: 'Fixture', descripcion: 'original',
  info: { web: 'https://old.example/', telefono: 'old', count: 1, enabled: true, nullable: null },
  empty: {}, values: [{ nombre: 'A', web: 'a' }, { nombre: 'B', web: 'b' }, { nombre: 'C', web: 'c' }],
  scalars: [1, 2, 3], other: [{ nombre: 'Foreign' }],
  secciones: [{ titulo: 'Qué visitar en Fixture', lugares: [{ nombre: 'Card', descripcion: 'text', foto: 'image', maps: 'url', reserva: 'book' }] },
    { titulo: 'Fiestas y Festivos Principales', lugares: [{ nombre: 'Fiesta', descripcion: 'text', precio: 'free' }] },
    { titulo: 'Gastronomía', lugares: [] }]`;
const guideSource = (fields = baseFields, guidePath = 'fixture/path') => `export const FIXTURE_GUIDE = { path: '${guidePath}', ${fields} };\n`;
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
  const sourceFile = path.join(repoRoot, 'src/app/guides/fixture.guide.ts');
  const catalogFile = path.join(repoRoot, catalogPath);
  const guidePath = options.guidePath ?? 'fixture/path';
  const source = options.source ?? guideSource(options.fields ?? baseFields, guidePath);
  mkdirSync(path.dirname(sourceFile), { recursive: true }); mkdirSync(path.dirname(catalogFile), { recursive: true });
  writeFileSync(sourceFile, source); writeFileSync(catalogFile, fixtureCatalog(options.ruleSet ?? 'generic'));
  try {
    const sourceIdentity = resolveFactoryGuideSourceIdentity({ repoRoot, guidePath });
    const snapshot = buildGuideSnapshot({ repoRoot, sourceIdentity });
    return run({ snapshot, source, sourceFile, catalogFile, repoRoot, guidePath });
  } finally {
    const resolved = realpathSync.native(root);
    assert.equal(path.dirname(resolved), tempRoot); assert.ok(path.basename(resolved).startsWith(prefix));
    rmSync(resolved, { recursive: true, force: true });
  }
}
const municipal = { guidePath: 'europa/espana/fixture', ruleSet: 'spanish-municipal' };
function refAt(snapshot, ...steps) {
  let ref = getGuideRootRef(snapshot);
  for (const step of steps) {
    const children = listChildTargets({ snapshot, parentRef: ref });
    ref = typeof step === 'number' ? children[step] : children.find(child => child.location.at(-1)?.property === step);
    assert.ok(ref, `Fixture ref missing: ${step}`);
  }
  return ref;
}
const children = (s, ref) => listChildTargets({ snapshot: s, parentRef: ref });
const operation = (snapshot, request) => createCandidateOperation({ snapshot, operation: request });
const build = (snapshot, ...requests) => buildCandidate({ snapshot, operations: requests.map(request => operation(snapshot, request)) });
const update = (s, steps, value) => ({ type: 'UPDATE_VALUE', targetRef: refAt(s, ...steps), value });
const addProperty = (s, steps, propertyName, value, placement = { mode: 'auto' }) =>
  ({ type: 'ADD_PROPERTY', parentRef: refAt(s, ...steps), propertyName, value, placement });
const addElement = (s, steps, value, placement = { mode: 'append' }) =>
  ({ type: 'ADD_ELEMENT', parentRef: refAt(s, ...steps), value, placement });
const removeProperty = (s, steps) => ({ type: 'REMOVE_PROPERTY', targetRef: refAt(s, ...steps) });
const removeElement = (s, steps) => ({ type: 'REMOVE_ELEMENT', targetRef: refAt(s, ...steps) });
const reorder = (s, steps, indices) => {
  const parentRef = refAt(s, ...steps), refs = children(s, parentRef);
  return { type: 'REORDER_ELEMENTS', parentRef, order: indices.map(i => refs[i]) };
};
function parseCandidate(text, exportName = 'FIXTURE_GUIDE') {
  const source = ts.createSourceFile('candidate.ts', text, ts.ScriptTarget.ES2022, true);
  assert.equal(source.parseDiagnostics.length, 0);
  return readStaticGuideRoot(inspectGuideExport(source, exportName).root, source);
}
function nodeAt(root, ...steps) {
  let node = root;
  for (const step of steps) node = typeof step === 'number' ? node.elements[step] : node.properties.find(p => p.name === step)?.node;
  assert.ok(node); return node;
}
const candidateNode = (result, ...steps) => nodeAt(parseCandidate(result.candidateText), ...steps);
const names = node => node.properties.map(p => p.name);
const arrayValues = node => node.elements.map(e => 'value' in e ? e.value : nodeAt(e, 'nombre').value);
function rejects(run, code) {
  assert.throws(run, error => error instanceof SourceIdentityError && error.code === code
    && error.message === `Factory source identity: ${code}.`);
}
function unchanged(ctx, run) {
  const source = readFileSync(ctx.sourceFile), catalog = readFileSync(ctx.catalogFile);
  const result = run();
  assert.deepEqual(readFileSync(ctx.sourceFile), source); assert.deepEqual(readFileSync(ctx.catalogFile), catalog);
  return result;
}
function synthetic(name, run, options) { test(`synthetic: ${name}`, () => fixture(run, options)); }

synthetic('UPDATE string', ({ snapshot: s }) => assert.equal(candidateNode(build(s, update(s, ['info', 'telefono'], 'new')), 'info', 'telefono').value, 'new'));
synthetic('UPDATE URL', ({ snapshot: s }) => assert.equal(candidateNode(build(s, update(s, ['info', 'web'], 'https://example.test/?a=1&b=2')), 'info', 'web').value, 'https://example.test/?a=1&b=2'));
synthetic('UPDATE concatenated value to one literal', ({ snapshot: s }) => {
  const r = build(s, update(s, ['descripcion'], 'exact')); assert.equal(candidateNode(r, 'descripcion').value, 'exact');
  assert.equal(r.editRecords[0].replacement, "'exact'");
}, { fields: "descripcion: ('old' + ' concat')" });
synthetic('UPDATE identical no-op', ({ snapshot: s, source }) => {
  const r = build(s, update(s, ['descripcion'], 'original')); assert.equal(r.candidateText, source);
  assert.equal(r.noOpOperations.length, 1); assert.equal(r.editRecords.length, 0); assert.equal(r.changedTargets.length, 0);
});
synthetic('ADD property to empty object', ({ snapshot: s }) => assert.deepEqual(names(candidateNode(build(s, addProperty(s, ['empty'], 'web', 'url')), 'empty')), ['web']));
synthetic('ADD property to populated object appends without canon', ({ snapshot: s }) => {
  const before = names(getSnapshotNode(s, refAt(s, 'info').location));
  assert.deepEqual(names(candidateNode(build(s, addProperty(s, ['info'], 'extra', 1)), 'info')), [...before, 'extra']);
});
synthetic('ADD duplicate is an absence failure, not no-op', ({ snapshot: s }) => rejects(() => build(s, addProperty(s, ['info'], 'web', 'same')), 'PROPERTY_ALREADY_EXISTS'));
synthetic('ACTIVE visit property insertion preserves historical bytes', ({ snapshot: s }) => {
  const r = build(s, addProperty(s, ['secciones', 0, 'lugares', 0], 'telefono', 'fixture'));
  assert.deepEqual(names(candidateNode(r, 'secciones', 0, 'lugares', 0)), ['nombre', 'descripcion', 'foto', 'maps', 'telefono', 'reserva']);
}, municipal);
synthetic('ACTIVE fiesta property insertion', ({ snapshot: s }) => {
  const r = build(s, addProperty(s, ['secciones', 1, 'lugares', 0], 'fecha', 'fixture'));
  assert.deepEqual(names(candidateNode(r, 'secciones', 1, 'lugares', 0)), ['nombre', 'descripcion', 'fecha', 'precio']);
}, municipal);
synthetic('ADD without approved order supports exact before property anchor', ({ snapshot: s }) => {
  const r = build(s, addProperty(s, ['info'], 'extra', false, { mode: 'before', anchorRef: refAt(s, 'info', 'count') }));
  assert.deepEqual(names(candidateNode(r, 'info')), ['web', 'telefono', 'extra', 'count', 'enabled', 'nullable']);
});
for (const [name, placementMode, anchorIndex, expected] of [
  ['append', 'append', null, ['A', 'B', 'C', 'D']], ['before', 'before', 1, ['A', 'D', 'B', 'C']], ['after', 'after', 1, ['A', 'B', 'D', 'C']]
]) synthetic(`ADD element ${name}`, ({ snapshot: s }) => {
  const placement = anchorIndex === null ? { mode: placementMode } : { mode: placementMode, anchorRef: refAt(s, 'values', anchorIndex) };
  assert.deepEqual(arrayValues(candidateNode(build(s, addElement(s, ['values'], { nombre: 'D' }, placement)), 'values')), expected);
});
synthetic('stale anchor rejected', ({ snapshot: s }) => rejects(() => build(s, addElement(s, ['values'], {}, {
  mode: 'before', anchorRef: { ...refAt(s, 'values', 0), fingerprint: '0'.repeat(64) }
})), 'ANCHOR_STALE'));
synthetic('foreign anchor rejected', ({ snapshot: s }) => rejects(() => build(s, addElement(s, ['values'], {}, {
  mode: 'after', anchorRef: refAt(s, 'other', 0)
})), 'ANCHOR_STALE'));
for (const [name, index] of [['first', 0], ['middle', 1], ['last', 2]]) {
  synthetic(`REMOVE property ${name}`, ({ snapshot: s }) => {
    const key = ['a', 'b', 'c'][index];
    assert.deepEqual(names(candidateNode(build(s, removeProperty(s, ['info', key])), 'info')), ['a', 'b', 'c'].filter(k => k !== key));
  }, { fields: 'info: { a: 1, b: 2, c: 3 }' });
  synthetic(`REMOVE element ${name}`, ({ snapshot: s }) =>
    assert.deepEqual(arrayValues(candidateNode(build(s, removeElement(s, ['scalars', index])), 'scalars')), [1, 2, 3].filter((_, i) => i !== index)));
}
synthetic('REMOVE only element keeps empty parent', ({ snapshot: s }) => {
  const r = build(s, removeElement(s, ['scalars', 0])); assert.deepEqual(arrayValues(candidateNode(r, 'scalars')), []);
}, { fields: 'scalars: [1,]' });
synthetic('REMOVE only property keeps empty object', ({ snapshot: s }) => assert.deepEqual(names(candidateNode(build(s, removeProperty(s, ['info', 'a'])), 'info')), []), { fields: 'info: { a: 1, }' });
synthetic('leading comment blocks remove', ({ snapshot: s }) => rejects(() => build(s, removeElement(s, ['scalars', 0])), 'COMMENT_TRIVIA_AMBIGUOUS'), { fields: 'scalars: [\n // ownership unknown\n 1, 2\n]' });
synthetic('inline comment outside UPDATE preserved', ({ snapshot: s }) => {
  const r = build(s, update(s, ['info', 'a'], 'new')); assert.ok(r.candidateText.includes("a: 'new' /* historic */"));
}, { fields: "info: { a: 'old' /* historic */, b: 'other' }" });
synthetic('inline comment blocks destructive remove', ({ snapshot: s }) => rejects(() => build(s, removeProperty(s, ['info', 'a'])), 'COMMENT_TRIVIA_AMBIGUOUS'), { fields: "info: { a: 'old' /* historic */, b: 'other' }" });
synthetic('comment inside concatenation blocks UPDATE', ({ snapshot: s }) => rejects(() => build(s, update(s, ['descripcion'], 'new')), 'COMMENT_TRIVIA_AMBIGUOUS'), { fields: "descripcion: 'a' /* historic */ + 'b'" });
synthetic('REORDER two preserves raw quotes and concatenation', ({ snapshot: s, source }) => {
  const r = build(s, reorder(s, ['values'], [1, 0]));
  assert.deepEqual(arrayValues(candidateNode(r, 'values')), ['B', 'A']);
  for (const fragment of ['{ nombre: "A", web: \'x\' + \'y\' }', "{ nombre: 'B', web: `z` }"]) assert.ok(r.candidateText.includes(fragment));
  assert.notEqual(r.candidateText, source);
}, { fields: 'values: [{ nombre: "A", web: \'x\' + \'y\' }, { nombre: \'B\', web: `z` }]' });
synthetic('REORDER many full permutation', ({ snapshot: s }) => assert.deepEqual(arrayValues(candidateNode(build(s, reorder(s, ['scalars'], [2, 0, 1])), 'scalars')), [3, 1, 2]));
synthetic('REORDER already ordered no-op', ({ snapshot: s, source }) => {
  const r = build(s, reorder(s, ['values'], [0, 1, 2])); assert.equal(r.candidateText, source); assert.equal(r.noOpOperations.length, 1);
});
synthetic('REORDER duplicate ref rejected', ({ snapshot: s }) => rejects(() => build(s, reorder(s, ['values'], [0, 0, 2])), 'OPERATION_INVALID'));
synthetic('REORDER missing member rejected', ({ snapshot: s }) => rejects(() => build(s, reorder(s, ['values'], [0, 1])), 'OPERATION_INVALID'));
synthetic('REORDER foreign parent rejected', ({ snapshot: s }) => rejects(() => build(s, { type: 'REORDER_ELEMENTS', parentRef: refAt(s, 'values'),
  order: [refAt(s, 'values', 0), refAt(s, 'values', 1), refAt(s, 'other', 0)] }), 'OPERATION_INVALID'));
synthetic('REORDER ambiguous gap comment rejected', ({ snapshot: s }) => rejects(() => build(s, reorder(s, ['scalars'], [1, 0])), 'COMMENT_TRIVIA_AMBIGUOUS'), { fields: 'scalars: [1, /* unknown owner */ 2]' });
synthetic('REORDER internal comments move within exact fragment', ({ snapshot: s }) => {
  const r = build(s, reorder(s, ['values'], [1, 0])); assert.ok(r.candidateText.includes("{ nombre: 'A', /* internal */ web: 'a' }"));
}, { fields: "values: [{ nombre: 'A', /* internal */ web: 'a' }, { nombre: 'B' }]" });
synthetic('parent/child conflict', ({ snapshot: s }) => rejects(() => build(s, removeElement(s, ['values', 0]), update(s, ['values', 0, 'web'], 'new')), 'OPERATION_CONFLICT'));
synthetic('same-target conflicting updates', ({ snapshot: s }) => rejects(() => build(s, update(s, ['descripcion'], 'one'), update(s, ['descripcion'], 'two')), 'OPERATION_CONFLICT'));
synthetic('independent updates', ({ snapshot: s }) => {
  const r = build(s, update(s, ['info', 'web'], 'new web'), update(s, ['values', 2, 'web'], 'new child'));
  assert.equal(candidateNode(r, 'info', 'web').value, 'new web'); assert.equal(candidateNode(r, 'values', 2, 'web').value, 'new child');
});
synthetic('UPDATE + REMOVE conflict', ({ snapshot: s }) => rejects(() => build(s, update(s, ['info', 'web'], 'new'), removeProperty(s, ['info', 'web'])), 'OPERATION_CONFLICT'));
synthetic('ADD + REORDER conflict', ({ snapshot: s }) => rejects(() => build(s, addElement(s, ['values'], {}), reorder(s, ['values'], [2, 1, 0])), 'OPERATION_CONFLICT'));
synthetic('REORDER + REMOVE conflict', ({ snapshot: s }) => rejects(() => build(s, reorder(s, ['values'], [2, 1, 0]), removeElement(s, ['values', 1])), 'OPERATION_CONFLICT'));
synthetic('duplicate operation rejected', ({ snapshot: s }) => {
  const op = operation(s, update(s, ['descripcion'], 'new')); rejects(() => buildCandidate({ snapshot: s, operations: [op, op] }), 'OPERATION_CONFLICT');
});
for (const [name, value] of [
  ['malicious text', "'); process.exit(); //"], ['interpolation text', '${process.exit()}'], ['backtick', '`quoted`'],
  ['apostrophe', "l'été"], ['backslash', 'C:\\temp\\guide'], ['multiline', 'a\r\nb\nc\td'], ['emoji', '🧭 🌍 👨‍👩‍👧'],
  ['Unicode', 'Cádiz 日本語 e\u0301'], ['Unicode separators', 'a\u2028b\u2029c'], ['controls', '\u0000\u0001\u001f\u007f'],
  ['lone surrogates', '\ud800X\udfff'], ['markdown', '**text** [link](https://x.test/)'], ['URLs', 'https://x.test/?q=\'a\'&x=${b}`']
]) synthetic(`safe string roundtrip: ${name}`, ({ snapshot: s }) => {
  const r = build(s, update(s, ['descripcion'], value)); assert.equal(candidateNode(r, 'descripcion').value, value);
  assert.equal(parseCandidate(guideSource('payload: ' + serializeStaticValue(value))).properties.find(p => p.name === 'payload').node.value, value);
});
for (const [name, eol, bom, final] of [['CRLF', '\r\n', false, true], ['LF', '\n', false, true], ['BOM', '\n', true, true],
  ['trailing newline', '\n', false, true], ['no trailing newline', '\n', false, false]]) {
  const source = (bom ? '\ufeff' : '') + ["export const FIXTURE_GUIDE = {", "  path: 'fixture/path',", '  info: {', "    a: 'one',", '  },', '};'].join(eol) + (final ? eol : '');
  synthetic(`preserve ${name}`, ({ snapshot: s }) => {
    const r = build(s, addProperty(s, ['info'], 'b', { text: 'fixture' }));
    assert.equal(r.candidateText.startsWith('\ufeff'), bom); assert.equal(r.candidateText.endsWith(eol), final);
    if (eol === '\r\n') assert.equal(/(?<!\r)\n/.test(r.candidateText), false);
    verifyOutsideEdits(source, r.candidateText, r.editRecords);
  }, { source });
}
synthetic('candidate valid and static-readable data grammar', ({ snapshot: s }) => {
  const value = { text: 'data', count: -4.5, zero: -0, truth: false, nil: null, nested: [1, {}, []] };
  const r = build(s, addProperty(s, ['empty'], 'payload', value));
  assert.ok(sameTree(guideTree(candidateNode(r, 'empty', 'payload')), dataTree(normalizeStaticData(value))));
});
synthetic('path unchanged and protected UPDATE', ({ snapshot: s }) => rejects(() => build(s, update(s, ['path'], 'other/path')), 'TARGET_PROTECTED'));
synthetic('export and imports outside root byte-identical', ({ snapshot: s, source }) => {
  const r = build(s, update(s, ['descripcion'], 'new')); const beforeRoot = s.root.span.start, afterRoot = s.root.span.end;
  assert.equal(r.candidateText.slice(0, beforeRoot), source.slice(0, beforeRoot));
  assert.ok(r.candidateText.endsWith(source.slice(afterRoot))); assert.ok(r.candidateText.includes('export const FIXTURE_GUIDE ='));
}, { source: '// retained prefix/import area (no imports in supported Phase 1 guides)\n' + guideSource() });
synthetic('unintended sibling change detected independently of edits', ({ snapshot: s, source }) => rejects(() =>
  verifyCandidateStructure(s, source.replace("telefono: 'old'", "telefono: 'tampered'"), guideTree(s.root)), 'CANDIDATE_STRUCTURE_MISMATCH'));
synthetic('outside-edit tamper detected', ({ snapshot: s, source }) => {
  const r = build(s, update(s, ['descripcion'], 'new'));
  rejects(() => verifyOutsideEdits(source, r.candidateText.replace('count: 1', 'count: 9'), r.editRecords), 'CANDIDATE_STRUCTURE_MISMATCH');
});
const internalEdit = (start, end, replacement = '') => ({ start, end, replacement, operationId: 'internal-test', reason: 'test' });
synthetic('overlapping edits rejected', () => rejects(() => applyTextEdits('abcdef', [internalEdit(1, 4), internalEdit(3, 5)]), 'EDIT_OVERLAP'));
synthetic('same-span inserts rejected', () => rejects(() => applyTextEdits('abc', [internalEdit(1, 1, 'x'), internalEdit(1, 1, 'y')]), 'EDIT_OVERLAP'));
synthetic('span out of range rejected', () => rejects(() => applyTextEdits('abc', [internalEdit(0, 4)]), 'EDIT_INVALID'));
synthetic('negative span rejected', () => rejects(() => applyTextEdits('abc', [internalEdit(-1, 0)]), 'EDIT_INVALID'));
synthetic('caller cannot supply spans', ({ snapshot: s }) => rejects(() => operation(s, { ...update(s, ['descripcion'], 'new'), start: 0, end: 100 }), 'OPERATION_INVALID'));
synthetic('caller cannot supply raw patch', ({ snapshot: s }) => rejects(() => operation(s, { type: 'RAW_PATCH', replacement: 'process.exit()' }), 'OPERATION_INVALID'));
synthetic('dynamic AST value rejected', ({ snapshot: s }) => rejects(() => build(s, addProperty(s, ['empty'], 'x', ts.factory.createCallExpression(ts.factory.createIdentifier('dangerous'), undefined, []))), 'VALUE_UNSUPPORTED'));
synthetic('fabricated AST rejected', ({ snapshot: s }) => rejects(() => build(s, addProperty(s, ['empty'], 'x', { kind: 123, pos: 0, end: 5 })), 'VALUE_UNSUPPORTED'));
for (const key of ['__proto__', 'prototype', 'constructor']) synthetic(`prototype pollution rejected: ${key}`, ({ snapshot: s }) => {
  const value = Object.create(null); value[key] = 'bad'; rejects(() => build(s, addProperty(s, ['empty'], 'payload', value)), 'VALUE_UNSUPPORTED');
});
synthetic('sparse payload array rejected', ({ snapshot: s }) => rejects(() => build(s, addProperty(s, ['empty'], 'x', [1, , 3])), 'VALUE_UNSUPPORTED'));
for (const [name, value] of [['Infinity', Infinity], ['NaN', NaN], ['undefined', undefined], ['bigint', 1n], ['symbol', Symbol('x')],
  ['function', () => 1], ['Date', new Date(0)], ['RegExp', /x/], ['Map', new Map()], ['Set', new Set()], ['class', new (class X {})()]]) {
  synthetic(`unsupported payload ${name}`, ({ snapshot: s }) => rejects(() => build(s, addProperty(s, ['empty'], 'x', value)), 'VALUE_UNSUPPORTED'));
}
synthetic('getters never invoked', ({ snapshot: s }) => {
  let called = false; const value = {}; Object.defineProperty(value, 'x', { enumerable: true, get() { called = true; throw new Error('secret'); } });
  rejects(() => build(s, addProperty(s, ['empty'], 'x', value)), 'VALUE_UNSUPPORTED'); assert.equal(called, false);
});
synthetic('setter rejected', ({ snapshot: s }) => {
  const value = {}; Object.defineProperty(value, 'x', { enumerable: true, set(_) {} });
  rejects(() => build(s, addProperty(s, ['empty'], 'x', value)), 'VALUE_UNSUPPORTED');
});
synthetic('cyclic payload rejected', ({ snapshot: s }) => {
  const value = {}; value.self = value; rejects(() => build(s, addProperty(s, ['empty'], 'x', value)), 'VALUE_UNSUPPORTED');
});
synthetic('very long allowed string', ({ snapshot: s }) => {
  const value = 'x'.repeat(300000); assert.equal(candidateNode(build(s, update(s, ['descripcion'], value)), 'descripcion').value, value);
});
synthetic('source files remain unchanged after every operation family', ctx => unchanged(ctx, () => {
  const s = ctx.snapshot;
  for (const request of [update(s, ['descripcion'], 'new'), addProperty(s, ['info'], 'extra', 'x'), addElement(s, ['values'], {}),
    removeProperty(s, ['info', 'web']), removeElement(s, ['values', 1]), reorder(s, ['values'], [2, 1, 0])]) build(s, request);
}));
synthetic('candidate and changedTargets deterministic', ({ snapshot: s }) => {
  const request = update(s, ['descripcion'], 'new'); assert.deepEqual(build(s, request), build(s, request));
});
synthetic('sourceHash original and candidateHash changes', ({ snapshot: s, source }) => {
  const r = build(s, update(s, ['descripcion'], 'new')); assert.equal(r.sourceHash, sha(Buffer.from(source))); assert.equal(r.sourceHash, s.sourceHash);
  assert.equal(r.candidateHash, sha(Buffer.from(r.candidateText))); assert.notEqual(r.candidateHash, r.sourceHash);
});
synthetic('no-op hash equals original', ({ snapshot: s }) => assert.equal(build(s, update(s, ['descripcion'], 'original')).candidateHash, s.sourceHash));
synthetic('snapshot stale rejected', ctx => {
  const old = operation(ctx.snapshot, update(ctx.snapshot, ['descripcion'], 'new'));
  writeFileSync(ctx.sourceFile, ctx.source.replace("descripcion: 'original'", "descripcion: 'changed'"));
  const identity = resolveFactoryGuideSourceIdentity({ repoRoot: ctx.repoRoot, guidePath: ctx.guidePath });
  const current = buildGuideSnapshot({ repoRoot: ctx.repoRoot, sourceIdentity: identity });
  rejects(() => buildCandidate({ snapshot: current, operations: [old] }), 'TARGET_STALE');
});
synthetic('target fingerprint stale rejected', ({ snapshot: s }) => rejects(() => operation(s, {
  ...update(s, ['descripcion'], 'new'), targetRef: { ...refAt(s, 'descripcion'), fingerprint: '0'.repeat(64) }
}), 'TARGET_STALE'));
synthetic('operation ID cannot be retargeted', ({ snapshot: s }) => {
  const op = operation(s, update(s, ['descripcion'], 'new'));
  rejects(() => buildCandidate({ snapshot: s, operations: [{ ...op, targetRef: refAt(s, 'info', 'telefono') }] }), 'OPERATION_INVALID');
});
synthetic('action metadata cannot broaden semantics', ({ snapshot: s }) => {
  const op = operation(s, update(s, ['descripcion'], 'new'));
  rejects(() => buildCandidate({ snapshot: s, operations: [{ ...op, contractualAction: 'REMOVE' }] }), 'OPERATION_INVALID');
});
synthetic('operation snapshot metadata checked', ({ snapshot: s }) => {
  const op = operation(s, update(s, ['descripcion'], 'new'));
  rejects(() => buildCandidate({ snapshot: s, operations: [{ ...op, expectedSnapshotId: '0'.repeat(64) }] }), 'TARGET_STALE');
});
synthetic('full object UPDATE unsupported', ({ snapshot: s }) => rejects(() => build(s, update(s, ['info'], { web: 'new' })), 'OPERATION_UNSUPPORTED'));
synthetic('array UPDATE unsupported', ({ snapshot: s }) => rejects(() => build(s, update(s, ['scalars'], [4, 5])), 'OPERATION_UNSUPPORTED'));
synthetic('kind change rejected', ({ snapshot: s }) => rejects(() => build(s, update(s, ['info', 'count'], 'new')), 'TARGET_KIND_MISMATCH'));
synthetic('root REMOVE unsupported', ({ snapshot: s }) => rejects(() => build(s, { type: 'REMOVE_PROPERTY', targetRef: getGuideRootRef(s) }), 'OPERATION_UNSUPPORTED'));
synthetic('protected root property cannot be added', ({ snapshot: s }) => rejects(() => build(s, addProperty(s, [], 'background', 'new')), 'TARGET_PROTECTED'));
for (const propertyName of PROTECTED_ROOT_PROPERTIES) synthetic(`protected root ${propertyName}`, ({ snapshot: s }) =>
  rejects(() => build(s, update(s, [propertyName], 'new')), 'TARGET_PROTECTED'), { fields: propertyName === 'path' ? '' : `${propertyName}: 'technical'` });
synthetic('nested path remains data, not source identity', ({ snapshot: s }) => {
  const r = build(s, update(s, ['info', 'path'], 'other')); assert.equal(candidateNode(r, 'info', 'path').value, 'other');
}, { fields: "info: { path: 'related' }" });
synthetic('visit new object keys use ACTIVE order', ({ snapshot: s }) => {
  const value = { reserva: 'r', web: 'w', telefono: 't', maps: 'm', direccion: 'd', precio: 'p', horario: 'h',
    foto: 'f', descripcion: 'desc', tiposPlan: [], nombre: 'New' };
  const r = build(s, addElement(s, ['secciones', 0, 'lugares'], value));
  assert.deepEqual(names(candidateNode(r, 'secciones', 0, 'lugares', 1)), ['nombre', 'tiposPlan', 'descripcion', 'foto', 'horario', 'precio', 'direccion', 'maps', 'telefono', 'web', 'reserva']);
}, municipal);
synthetic('fiesta new object keys use ACTIVE order', ({ snapshot: s }) => {
  const r = build(s, addElement(s, ['secciones', 1, 'lugares'], { precio: 'p', fecha: 'f', descripcion: 'd', nombre: 'n' }));
  assert.deepEqual(names(candidateNode(r, 'secciones', 1, 'lugares', 1)), ['nombre', 'descripcion', 'fecha', 'precio']);
}, municipal);
synthetic('new gastronomy object preserves trusted input order', ({ snapshot: s }) => {
  const r = build(s, addElement(s, ['secciones', 2, 'lugares'], { web: 'w', descripcion: 'd', nombre: 'n' }));
  assert.deepEqual(names(candidateNode(r, 'secciones', 2, 'lugares', 0)), ['web', 'descripcion', 'nombre']);
}, municipal);
synthetic('foto/fotos conflict on ADD_PROPERTY blocked', ({ snapshot: s }) => rejects(() => build(s,
  addProperty(s, ['secciones', 0, 'lugares', 0], 'fotos', [])), 'OPERATION_UNSUPPORTED'), municipal);
synthetic('foto/fotos conflict on new card blocked', ({ snapshot: s }) => rejects(() => build(s,
  addElement(s, ['secciones', 0, 'lugares'], { foto: 'x', fotos: [] })), 'OPERATION_UNSUPPORTED'), municipal);
synthetic('contradictory historical visit order cannot be silently migrated', ({ snapshot: s }) => rejects(() => build(s,
  addProperty(s, ['secciones', 0, 'lugares', 0], 'telefono', 't')), 'OPERATION_UNSUPPORTED'), {
  ...municipal, fields: "nombre: 'Fixture', secciones: [{ titulo: 'Qué visitar en Fixture', lugares: [{ nombre: 'n', web: 'w', maps: 'm' }] }]"
});
synthetic('ACTIVE conflicting explicit placement rejected', ({ snapshot: s }) => rejects(() => build(s,
  addProperty(s, ['secciones', 0, 'lugares', 0], 'telefono', 't', { mode: 'append' })), 'OPERATION_UNSUPPORTED'), municipal);
synthetic('no free-index placement', ({ snapshot: s }) => rejects(() => build(s,
  addElement(s, ['values'], {}, { mode: 'index', index: 0 })), 'OPERATION_INVALID'));
synthetic('operation array getter never invoked', ({ snapshot: s }) => {
  let called = false; const operations = [null]; Object.defineProperty(operations, '0', { get() { called = true; } });
  rejects(() => buildCandidate({ snapshot: s, operations }), 'OPERATION_INVALID'); assert.equal(called, false);
});
synthetic('ref location getter never invoked', ({ snapshot: s }) => {
  let called = false; const location = [null];
  Object.defineProperty(location, '0', { get() { called = true; throw new Error('secret'); } });
  rejects(() => operation(s, { ...update(s, ['descripcion'], 'new'),
    targetRef: { ...refAt(s, 'descripcion'), location } }), 'LOCATOR_INVALID');
  assert.equal(called, false);
});
synthetic('new imported source is already unsupported by Phase 1', () => {
  rejects(() => fixture(() => {}, { source: "import { X } from 'unused';\n" + guideSource() }), 'SOURCE_UNSUPPORTED');
});
synthetic('two ADDs cannot introduce foto/fotos via independent operations', ({ snapshot: s }) => {
  rejects(() => build(s, addProperty(s, ['secciones', 0, 'lugares', 0], 'foto', 'f'),
    addProperty(s, ['secciones', 0, 'lugares', 0], 'fotos', [])), 'OPERATION_UNSUPPORTED');
}, { ...municipal, fields: "nombre: 'Fixture', secciones: [{ titulo: 'Qué visitar en Fixture', lugares: [{ nombre: 'n' }] }]" });
synthetic('candidate byte size limit enforced', () => rejects(() =>
  applyTextEdits('a'.repeat(CANDIDATE_LIMITS.maxCandidateBytes), [internalEdit(1, 1, 'x')]), 'CANDIDATE_LIMIT_EXCEEDED'));
synthetic('accumulated payload string budget enforced', ({ snapshot: s }) => {
  const value = 'x'.repeat(1500000);
  const ops = [update(s, ['descripcion'], value), update(s, ['info', 'web'], value), update(s, ['info', 'telefono'], value)];
  rejects(() => build(s, ...ops), 'CANDIDATE_LIMIT_EXCEEDED');
});
synthetic('accumulated payload node budget enforced', ({ snapshot: s }) => {
  const value = Array(READ_LIMITS.maxArrayElements).fill(null);
  const payload = [value, value, value];
  rejects(() => build(s, addProperty(s, ['empty'], 'one', payload), addProperty(s, ['info'], 'two', payload)), 'CANDIDATE_LIMIT_EXCEEDED');
});
synthetic('integer and explicit unusual keys roundtrip as data', ({ snapshot: s }) => {
  const value = { '2': 'number key', '1': 'first', 'a-b': 'dash', '': 'empty key', 'é': 'Unicode key', default: 'keyword' };
  const r = build(s, addProperty(s, ['empty'], 'x', value));
  assert.ok(sameTree(guideTree(candidateNode(r, 'empty', 'x')), dataTree(normalizeStaticData(value))));
});
synthetic('negative-zero no-op preserves original bytes', ({ snapshot: s, source }) => {
  const r = build(s, update(s, ['info', 'count'], -0)); assert.equal(r.candidateText, source); assert.equal(r.noOpOperations.length, 1);
}, { fields: 'info: { count: -0 }' });
synthetic('array extra property rejected', ({ snapshot: s }) => {
  const value = [1]; value.extra = 'hidden';
  rejects(() => build(s, addProperty(s, ['empty'], 'x', value)), 'VALUE_UNSUPPORTED');
});
synthetic('string range or renamed property cannot be supplied', ({ snapshot: s }) => {
  rejects(() => operation(s, { ...update(s, ['descripcion'], 'new'), propertyName: 'other' }), 'OPERATION_INVALID');
  rejects(() => operation(s, { ...update(s, ['descripcion'], 'new'), substring: [1, 3] }), 'OPERATION_INVALID');
});
synthetic('object key count limit enforced', ({ snapshot: s }) => {
  const value = Object.fromEntries(Array.from({ length: READ_LIMITS.maxObjectProperties + 1 }, (_, i) => ['k' + i, i]));
  rejects(() => build(s, addProperty(s, ['empty'], 'x', value)), 'CANDIDATE_LIMIT_EXCEEDED');
});
synthetic('symbol payload key rejected', ({ snapshot: s }) => rejects(() => build(s,
  addProperty(s, ['empty'], 'x', { [Symbol('private')]: 'hidden' })), 'VALUE_UNSUPPORTED'));
synthetic('non-enumerable payload key rejected', ({ snapshot: s }) => {
  const value = {}; Object.defineProperty(value, 'length', { value: 1, enumerable: false });
  rejects(() => build(s, addProperty(s, ['empty'], 'x', value)), 'VALUE_UNSUPPORTED');
});
synthetic('immutable operations, edits and result', ({ snapshot: s }) => {
  const payload = { nested: ['before'] }, op = operation(s, addProperty(s, ['empty'], 'payload', payload)); payload.nested[0] = 'after';
  const r = buildCandidate({ snapshot: s, operations: [op] }); assert.equal(candidateNode(r, 'empty', 'payload', 'nested', 0).value, 'before');
  const visit = value => { if (value && typeof value === 'object') { assert.ok(Object.isFrozen(value)); Object.values(value).forEach(visit); } };
  visit(op); visit(r); assert.throws(() => { r.editRecords[0].replacement = 'tampered'; }, TypeError);
});
synthetic('signed numbers roundtrip and distinct -0 fingerprint', ({ snapshot: s }) => {
  const r = build(s, update(s, ['info', 'count'], -0)); assert.ok(Object.is(candidateNode(r, 'info', 'count').value, -0));
  const original = parseCandidate(guideSource('zero: 0, minus: -0, plus: +2, negative: -3.5'));
  assert.notEqual(nodeAt(original, 'zero').fingerprint, nodeAt(original, 'minus').fingerprint);
  assert.equal(nodeAt(original, 'plus').value, 2); assert.equal(SNAPSHOT_SCHEMA_VERSION, 2);
});
synthetic('double quote UPDATE retains safe style', ({ snapshot: s }) => assert.equal(build(s, update(s, ['descripcion'], 'new "text"')).editRecords[0].replacement, '"new \\"text\\""'), { fields: 'descripcion: "old"' });
synthetic('mixed local indentation blocks ADD', ({ snapshot: s }) => rejects(() => build(s, addProperty(s, ['info'], 'c', 'new')), 'OPERATION_UNSUPPORTED'), {
  fields: "info: {\n    a: 'a',\n   b: 'b'\n  }"
});
synthetic('mixed EOL inside insertion gap blocks ADD', ({ snapshot: s }) => rejects(() => build(s, addProperty(s, ['info'], 'b', 'new')), 'OPERATION_UNSUPPORTED'), {
  source: "export const FIXTURE_GUIDE = {\r\n  path: 'fixture/path',\r\n  info: {\r\n    a: 'a'\r\n\n  }\r\n};"
});
synthetic('empty multiline array ADD respects local close', ({ snapshot: s }) => {
  const r = build(s, addElement(s, ['values'], { nombre: 'New' })); assert.deepEqual(arrayValues(candidateNode(r, 'values')), ['New']);
}, { source: "export const FIXTURE_GUIDE = {\n  path: 'fixture/path',\n  values: [\n  ]\n};\n" });
synthetic('ADD ambiguous comment blocked', ({ snapshot: s }) => rejects(() => build(s, addElement(s, ['scalars'], 3)), 'COMMENT_TRIVIA_AMBIGUOUS'), { fields: 'scalars: [1, 2 /* trailing */]' });
synthetic('multiple independent additions use disjoint original gaps', ({ snapshot: s }) => {
  const r = build(s, addProperty(s, ['info'], 'x', 1, { mode: 'before', anchorRef: refAt(s, 'info', 'count') }),
    addProperty(s, ['info'], 'y', 2, { mode: 'append' }));
  assert.deepEqual(names(candidateNode(r, 'info')), ['web', 'telefono', 'x', 'count', 'enabled', 'nullable', 'y']);
});
synthetic('same-gap ADDs rejected instead of last-write-wins', ({ snapshot: s }) => rejects(() => build(s,
  addProperty(s, ['info'], 'x', 1), addProperty(s, ['info'], 'y', 2)), 'EDIT_OVERLAP'));
synthetic('candidate malformed syntax rejected', ({ snapshot: s }) => rejects(() => verifyCandidateStructure(s, 'export const FIXTURE_GUIDE = {', guideTree(s.root)), 'CANDIDATE_INVALID'));
synthetic('candidate dynamic code rejected without executing', ({ snapshot: s, source }) => rejects(() => verifyCandidateStructure(s,
  source.replace("descripcion: 'original'", 'descripcion: process.exit()'), guideTree(s.root)), 'CANDIDATE_INVALID'));
synthetic('candidate changed export rejected', ({ snapshot: s, source }) => rejects(() => verifyCandidateStructure(s, source.replace('FIXTURE_GUIDE', 'OTHER'), guideTree(s.root)), 'CANDIDATE_INVALID'));
synthetic('candidate changed path rejected', ({ snapshot: s, source }) => rejects(() => verifyCandidateStructure(s, source.replace('fixture/path', 'other/path'), guideTree(s.root)), 'CANDIDATE_INVALID'));
synthetic('operations limit enforced', ({ snapshot: s }) => {
  const op = operation(s, update(s, ['descripcion'], 'new'));
  rejects(() => buildCandidate({ snapshot: s, operations: Array(CANDIDATE_LIMITS.maxOperations + 1).fill(op) }), 'CANDIDATE_LIMIT_EXCEEDED');
});
synthetic('edits limit enforced', () => rejects(() => applyTextEdits('abc', Array(CANDIDATE_LIMITS.maxEdits + 1).fill(internalEdit(1, 1))), 'CANDIDATE_LIMIT_EXCEEDED'));
synthetic('replacement byte limit enforced', () => rejects(() => applyTextEdits('abc', [internalEdit(1, 2, 'é'.repeat(CANDIDATE_LIMITS.maxReplacementBytes))]), 'CANDIDATE_LIMIT_EXCEEDED'));
synthetic('growth limit enforced', () => {
  const cap = CANDIDATE_LIMITS.maxCandidateGrowth;
  assert.ok(cap < CANDIDATE_LIMITS.maxReplacementBytes);
  rejects(() => applyTextEdits('abc', [internalEdit(1, 1, 'x'.repeat(cap + 1))]), 'CANDIDATE_LIMIT_EXCEEDED');
});
synthetic('payload string limit enforced', ({ snapshot: s }) => rejects(() => build(s, update(s, ['descripcion'], 'x'.repeat(READ_LIMITS.maxStringLength + 1))), 'CANDIDATE_LIMIT_EXCEEDED'));
synthetic('payload depth limit enforced', ({ snapshot: s }) => {
  let value = 'x'; for (let i = 0; i <= READ_LIMITS.maxDepth; i++) value = [value];
  rejects(() => build(s, addProperty(s, ['empty'], 'x', value)), 'CANDIDATE_LIMIT_EXCEEDED');
});
synthetic('payload array limit enforced', ({ snapshot: s }) => rejects(() => build(s, addProperty(s, ['empty'], 'x', Array(READ_LIMITS.maxArrayElements + 1).fill(1))), 'CANDIDATE_LIMIT_EXCEEDED'));
synthetic('snapshot lookalike rejected', ({ snapshot: s }) => rejects(() => buildCandidate({ snapshot: { ...s }, operations: [] }), 'SNAPSHOT_INVALID'));
synthetic('empty operations valid unchanged candidate', ({ snapshot: s, source }) => {
  const r = buildCandidate({ snapshot: s, operations: [] }); assert.equal(r.candidateText, source); assert.equal(r.candidateHash, s.sourceHash);
});
synthetic('initial index semantics survive independent remove and update', ({ snapshot: s }) => {
  const r = build(s, removeElement(s, ['values', 0]), update(s, ['values', 2, 'web'], 'new C'));
  assert.deepEqual(arrayValues(candidateNode(r, 'values')), ['B', 'C']); assert.equal(candidateNode(r, 'values', 1, 'web').value, 'new C');
});
synthetic('captured source is immutable and candidate performs no re-read', ctx => {
  const s = ctx.snapshot; writeFileSync(ctx.sourceFile, 'external drift, TEMP only');
  const r = build(s, update(s, ['descripcion'], 'new'));
  assert.equal(getSnapshotSourceText(s), ctx.source); assert.ok(r.candidateText.includes("descripcion: 'new'"));
  // Re-checking the actual source before a future write belongs to Phase 4, never masked as idempotency.
});

const realIdentities = listFactoryGuideSourceIdentities({ repoRoot: projectRoot });
assert.equal(realIdentities.length, 17);
const realBefore = new Map(realIdentities.map(identity => [identity.sourcePath, readFileSync(path.join(projectRoot, identity.sourcePath))]));
const realSnapshots = new Map();
for (const identity of realIdentities) test(`real read-only/in-memory compatibility: ${identity.guidePath}`, () => {
  const s = buildGuideSnapshot({ repoRoot: projectRoot, sourceIdentity: identity }); realSnapshots.set(identity.guidePath, s);
  const r = build(s, update(s, ['descripcion'], nodeAt(s.root, 'descripcion').value + '\nFixture in memory.'));
  assert.equal(nodeAt(parseCandidate(r.candidateText, identity.exportName), 'descripcion').value.endsWith('Fixture in memory.'), true);
  assert.deepEqual(readFileSync(path.join(projectRoot, identity.sourcePath)), realBefore.get(identity.sourcePath));
});
const jerezIdentity = realIdentities.find(i => i.guidePath.endsWith('/jerez-de-la-frontera'));
const jerez = () => realSnapshots.get(jerezIdentity.guidePath) ?? buildGuideSnapshot({ repoRoot: projectRoot, sourceIdentity: jerezIdentity });
function realCandidate(s, request) {
  const result = build(s, request); assert.deepEqual(readFileSync(path.join(projectRoot, s.sourceIdentity.sourcePath)), realBefore.get(s.sourceIdentity.sourcePath));
  return parseCandidate(result.candidateText, s.sourceIdentity.exportName);
}
function sectionIndex(s, title) { return nodeAt(s.root, 'secciones').elements.findIndex(e => nodeAt(e, 'titulo').value === title); }
test('real Jerez UPDATE visit property', () => {
  const s = jerez(), section = sectionIndex(s, 'Qué visitar en Jerez de la Frontera');
  assert.equal(nodeAt(realCandidate(s, update(s, ['secciones', section, 'lugares', 0, 'precio'], 'fixture')), 'secciones', section, 'lugares', 0, 'precio').value, 'fixture');
});
test('real Jerez ADD optional visit property using ACTIVE order', () => {
  const s = jerez(), section = sectionIndex(s, 'Qué visitar en Jerez de la Frontera');
  const cards = nodeAt(s.root, 'secciones', section, 'lugares').elements;
  const index = cards.findIndex(card => !names(card).includes('telefono'));
  assert.ok(index >= 0);
  const root = realCandidate(s, addProperty(s, ['secciones', section, 'lugares', index], 'telefono', 'fixture'));
  const keys = names(nodeAt(root, 'secciones', section, 'lugares', index));
  assert.ok(keys.indexOf('telefono') > keys.indexOf('precio'));
  if (keys.includes('maps')) assert.ok(keys.indexOf('telefono') > keys.indexOf('maps'));
  if (keys.includes('web')) assert.ok(keys.indexOf('telefono') < keys.indexOf('web'));
});
test('real Jerez ADD synthetic visit card in memory', () => {
  const s = jerez(), section = sectionIndex(s, 'Qué visitar en Jerez de la Frontera');
  const count = nodeAt(s.root, 'secciones', section, 'lugares').elements.length;
  const root = realCandidate(s, addElement(s, ['secciones', section, 'lugares'], { web: 'fixture', descripcion: 'fixture', nombre: 'Synthetic' }));
  assert.deepEqual(names(nodeAt(root, 'secciones', section, 'lugares', count)), ['nombre', 'descripcion', 'web']);
});
test('real Jerez REMOVE one property without deleting card', () => {
  const s = jerez(), section = sectionIndex(s, 'Qué visitar en Jerez de la Frontera');
  const root = realCandidate(s, removeProperty(s, ['secciones', section, 'lugares', 0, 'precio']));
  assert.equal(names(nodeAt(root, 'secciones', section, 'lugares', 0)).includes('precio'), false);
  assert.equal(nodeAt(root, 'secciones', section, 'lugares').elements.length, nodeAt(s.root, 'secciones', section, 'lugares').elements.length);
});
test('real municipal fiesta ADD present keys in ACTIVE order', () => {
  const s = jerez(), section = sectionIndex(s, 'Fiestas y Festivos Principales'); assert.ok(section >= 0);
  const index = nodeAt(s.root, 'secciones', section, 'lugares').elements.length;
  const root = realCandidate(s, addElement(s, ['secciones', section, 'lugares'], { precio: 'fixture', fecha: 'fixture', descripcion: 'fixture', nombre: 'fixture' }));
  assert.deepEqual(names(nodeAt(root, 'secciones', section, 'lugares', index)), ['nombre', 'descripcion', 'fecha', 'precio']);
});
function internationalZones() {
  for (const identity of realIdentities.filter(i => i.ruleSet === 'generic')) {
    const s = realSnapshots.get(identity.guidePath) ?? buildGuideSnapshot({ repoRoot: projectRoot, sourceIdentity: identity });
    const array = s.nodes.find(node => node.nodeKind === 'array' && node.location.at(-1)?.property === 'zonas'
      && node.elements.length > 1 && node.elements.every(e => e.nodeKind === 'object' && names(e).includes('descripcion')));
    if (array) return { s, steps: array.location.map(step => 'property' in step ? step.property : step.element) };
  }
  assert.fail('Expected existing stable international zones collection.');
}
test('real international UPDATE zone property', () => {
  const { s, steps } = internationalZones(), root = realCandidate(s, update(s, [...steps, 0, 'descripcion'], 'fixture'));
  assert.equal(nodeAt(root, ...steps, 0, 'descripcion').value, 'fixture');
});
test('real international ADD optional zone property preserves observed order', () => {
  const { s, steps } = internationalZones(), original = nodeAt(s.root, ...steps, 0);
  const propertyName = ['web', 'telefono', 'reserva'].find(key => !names(original).includes(key)); assert.ok(propertyName);
  const root = realCandidate(s, addProperty(s, [...steps, 0], propertyName, 'fixture'));
  assert.deepEqual(names(nodeAt(root, ...steps, 0)), [...names(original), propertyName]);
});
test('real international REORDER zone raw fragments', () => {
  const { s, steps } = internationalZones(), array = nodeAt(s.root, ...steps);
  const root = realCandidate(s, reorder(s, steps, array.elements.map((_, i) => array.elements.length - i - 1)));
  assert.deepEqual(nodeAt(root, ...steps).elements.map(e => e.fingerprint), array.elements.map(e => e.fingerprint).reverse());
});
test('all 17 real sources and catalog remain byte-identical', () => {
  for (const [file, bytes] of realBefore) assert.deepEqual(readFileSync(path.join(projectRoot, file)), bytes);
  assert.equal(readFileSync(path.join(projectRoot, catalogPath), 'utf8'), catalogText);
});
test('Phase 3 runtime has no writes, child processes, network, model launcher or MCP', () => {
  for (const name of ['candidate', 'operations', 'serializer', 'static-data', 'property-order', 'span-edits']) {
    const source = readFileSync(path.join(projectRoot, 'scripts/factory-fix', name + '.ts'), 'utf8');
    assert.doesNotMatch(source, /\b(?:writeFile|rename|unlink|appendFile|copyFile|spawn|spawnSync|execFile|fetch)\b/);
    assert.doesNotMatch(source, /(?:node:(?:fs|child_process|http|https|net)|factory-qa-invoke|factory-mcp|codex exec)/);
  }
});
