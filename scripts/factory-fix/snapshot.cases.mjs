import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const outDir = process.env.FACTORY_FIX_OUT_DIR;
if (!outDir) throw new Error('Test configuration: FACTORY_FIX_OUT_DIR is required.');
const require = createRequire(import.meta.url), ts = require('typescript');
const compiled = name => require(path.join(outDir, 'scripts/factory-fix', `${name}.js`));
const { listFactoryGuideSourceIdentities, resolveFactoryGuideSourceIdentity, SourceIdentityError,
  MAX_GUIDE_SOURCE_BYTES } = compiled('source-identity');
const { buildGuideSnapshot, getSnapshotNode } = compiled('snapshot');
const { createTargetLocator, getGuideRootRef, isTargetLocator, listChildTargets, resolveTarget,
  verifyResolvedTarget } = compiled('target-locator');
const { READ_LIMITS, SNAPSHOT_SCHEMA_VERSION } = compiled('snapshot-contracts');
const { isSourceIdentity } = compiled('validation');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const catalogPath = 'src/app/shared/guide-factory-catalog.ts';
const catalogText = readFileSync(path.join(projectRoot, catalogPath), 'utf8');
const tempRoot = realpathSync.native(tmpdir()), prefix = 'factory-fix-phase2-fixture-';
const guideSource = fields => `export const FIXTURE_GUIDE = { path: 'fixture/path', ${fields} };\n`;
const defaultSource = guideSource(`
  nombre: 'Fixture', descripcion: 'editorial', infoGeneral: { contenido: 'practical', precio: 0 },
  secciones: [
    { titulo: 'Historia', contenido: 'history' },
    { titulo: 'Qué visitar', lugares: [
      { nombre: 'Same', fecha: 'A', descripcion: 'one', meta: { web: 'literal' } },
      { nombre: 'Same', fecha: 'B', descripcion: 'two' },
      { nombre: 'Único 🧭', descripcion: '\${process.exit()}' }
    ] },
    { titulo: 'Gastronomía', platos: [{ nombre: 'Plato', descripcion: 'food' }] },
    { titulo: 'Dónde comer', lugares: [{ nombre: 'Restaurante', descripcion: 'meal' }] },
    { titulo: 'Fiestas', lugares: [{ nombre: 'Fiesta', fecha: 'date' }] },
    { titulo: 'Itinerario', itinerario: [
      { dia: 'Llegada', zonas: [{ nombre: 'Zona', descripcion: 'first' }, { nombre: 'Zona', descripcion: 'second' }] },
      { dia: 'Llegada', zonas: [{ nombre: 'Otro', descripcion: 'third' }] }
    ] }
  ], empty: [], scalars: [1, 1, null]
`);

function fixtureCatalog() {
  const source = ts.createSourceFile('catalog.ts', catalogText, ts.ScriptTarget.ES2022, true);
  const imports = source.statements.filter(ts.isImportDeclaration);
  const assignment = source.statements.filter(ts.isVariableStatement).flatMap(s => s.declarationList.declarations)
    .find(d => d.name.getText(source) === 'guideAssignments').initializer;
  return catalogText.slice(0, imports[1].getStart(source))
    + "import { FIXTURE_GUIDE } from '../guides/fixture.guide';" + catalogText.slice(imports.at(-1).end,
      assignment.getStart(source)) + "[[FIXTURE_GUIDE, 'generic']]" + catalogText.slice(assignment.end);
}
function withFixture(run, source = defaultSource) {
  const root = mkdtempSync(path.join(tempRoot, prefix)), repoRoot = path.join(root, 'repo');
  const sourceFile = path.join(repoRoot, 'src/app/guides/fixture.guide.ts');
  const catalogFile = path.join(repoRoot, catalogPath);
  mkdirSync(path.dirname(sourceFile), { recursive: true });
  mkdirSync(path.dirname(catalogFile), { recursive: true });
  writeFileSync(sourceFile, source); writeFileSync(catalogFile, fixtureCatalog());
  try { return run({ root, repoRoot, sourceFile, catalogFile }); }
  finally {
    const resolved = realpathSync.native(root);
    assert.equal(path.dirname(resolved), tempRoot); assert.ok(path.basename(resolved).startsWith(prefix));
    rmSync(resolved, { recursive: true, force: true });
  }
}
const identity = ctx => resolveFactoryGuideSourceIdentity({ repoRoot: ctx.repoRoot, guidePath: 'fixture/path' });
function snapshot(ctx, sourceIdentity = identity(ctx)) {
  const before = readFileSync(ctx.sourceFile), catalogBefore = readFileSync(ctx.catalogFile);
  try { return buildGuideSnapshot({ repoRoot: ctx.repoRoot, sourceIdentity }); }
  finally {
    assert.deepEqual(readFileSync(ctx.sourceFile), before);
    assert.deepEqual(readFileSync(ctx.catalogFile), catalogBefore);
  }
}
function rejectsCode(run, code) {
  assert.throws(run, error => error instanceof SourceIdentityError && error.code === code
    && error.message === `Factory source identity: ${code}.`);
}
const refIdentity = ref => ({ snapshotId: ref.snapshotId, targetId: ref.targetId, nodeKind: ref.nodeKind,
  location: ref.location, fingerprint: ref.fingerprint });
const node = (s, ref) => getSnapshotNode(s, ref.location);
function roundtrip(s, ref) {
  const locator = createTargetLocator({ snapshot: s, targetRef: ref });
  assert.equal(isTargetLocator(locator), true); assert.ok(Object.isFrozen(locator));
  assert.deepEqual(resolveTarget({ snapshot: s, locator }), ref);
  assert.deepEqual(verifyResolvedTarget({ currentSnapshot: s, targetRef: ref }), ref);
  return ref;
}
function property(s, parentRef, name) {
  const children = listChildTargets({ snapshot: s, parentRef });
  const ref = children.find(child => child.location.at(-1)?.property === name);
  assert.ok(ref, `Observed property missing: ${name}`); return roundtrip(s, ref);
}
function elementLocator(s, parent, discriminators, selector = {}) {
  return { snapshotSchemaVersion: SNAPSHOT_SCHEMA_VERSION, snapshotId: s.snapshotId,
    targetType: 'array-element', parent: refIdentity(parent), containerFingerprint: parent.fingerprint,
    expectedKind: 'object', expectedFingerprint: null,
    selector: { discriminators, fingerprint: null, observedIndex: null, ...selector } };
}
function element(s, parent, discriminators, selector) {
  return resolveTarget({ snapshot: s, locator: elementLocator(s, parent, discriminators, selector) });
}
const exact = (property, value) => [{ property, value }];
const rootProperty = (s, name) => property(s, getGuideRootRef(s), name);
const section = (s, title) => element(s, rootProperty(s, 'secciones'), exact('titulo', title));
const places = s => property(s, section(s, 'Qué visitar'), 'lugares');
function allRefs(s) {
  const result = [];
  const visit = ref => { result.push(ref); listChildTargets({ snapshot: s, parentRef: ref }).forEach(visit); };
  visit(getGuideRootRef(s)); return result;
}

const realIdentities = listFactoryGuideSourceIdentities({ repoRoot: projectRoot });
for (const sourceIdentity of realIdentities) {
  test(`real guide reads safely and source bytes remain unchanged: ${sourceIdentity.guidePath}`, () => {
    const sourceFile = path.join(projectRoot, sourceIdentity.sourcePath), before = readFileSync(sourceFile);
    const catalogBefore = readFileSync(path.join(projectRoot, catalogPath));
    const s = buildGuideSnapshot({ repoRoot: projectRoot, sourceIdentity });
    assert.equal(s.sourceHash, sha256(before)); assert.equal(s.root.nodeKind, 'object');
    assert.equal(node(s, rootProperty(s, 'path')).value, sourceIdentity.guidePath);
    const sections = rootProperty(s, 'secciones'); assert.equal(sections.nodeKind, 'array');
    for (const ref of listChildTargets({ snapshot: s, parentRef: sections })) {
      roundtrip(s, ref); assert.equal(ref.discriminators[0].property, 'titulo');
    }
    const refs = allRefs(s);
    assert.equal(new Set(refs.map(ref => ref.targetId)).size, refs.length);
    assert.equal(refs.length, s.nodes.length);
    assert.deepEqual(readFileSync(sourceFile), before);
    assert.deepEqual(readFileSync(path.join(projectRoot, catalogPath)), catalogBefore);
  });
}
function realSnapshot(guidePath) {
  const sourceIdentity = realIdentities.find(i => i.guidePath === guidePath);
  assert.ok(sourceIdentity); return buildGuideSnapshot({ repoRoot: projectRoot, sourceIdentity });
}
test('Jerez resolves root, sections, municipal visit, gastronomy, restaurant and fiesta', () => {
  const s = realSnapshot('europa/espana/andalucia/cadiz/jerez-de-la-frontera');
  assert.equal(rootProperty(s, 'descripcion').nodeKind, 'string');
  if (s.root.properties.some(p => p.name === 'infoGeneral')) rootProperty(s, 'infoGeneral');
  roundtrip(s, section(s, 'Historia'));
  for (const [title, collection] of [['Qué visitar en Jerez de la Frontera', 'lugares'],
    ['Gastronomía', 'platos'], ['Dónde comer en Jerez', 'lugares'],
    ['Fiestas y Festivos Principales', 'lugares']]) {
    const parent = property(s, section(s, title), collection);
    const observed = listChildTargets({ snapshot: s, parentRef: parent }); assert.ok(observed.length > 0);
    const ref = roundtrip(s, observed[0]); assert.ok(ref.discriminators.some(d => d.property === 'nombre'));
    const name = node(s, property(s, ref, 'nombre')).value;
    const duplicates = observed.filter(r => r.discriminators.some(d => d.property === 'nombre' && d.value === name));
    if (duplicates.length === 1) assert.equal(element(s, parent, exact('nombre', name)).targetId, ref.targetId);
  }
});
test('Mairena reads a different municipal shape with places inside Geography', () => {
  const s = realSnapshot('europa/espana/andalucia/sevilla/mairena-del-aljarafe');
  const parent = property(s, section(s, 'Geografía y Clima'), 'lugares');
  assert.ok(listChildTargets({ snapshot: s, parentRef: parent }).length > 0);
});
for (const guidePath of ['europa/dinamarca/copenhague', 'europa/malta/malta', 'europa/italia/roma-vaticano',
  'europa/rumania/bucarest', 'america/sudamerica/brasil/rio-de-janeiro']) {
  test(`real nested itinerary/day/zone: ${guidePath}`, () => {
    const s = realSnapshot(guidePath); rootProperty(s, 'infoGeneral');
    const visit = s.root.properties.find(p => p.name === 'secciones').node.elements
      .find(n => n.properties.some(p => p.name === 'itinerario'));
    const title = visit.properties.find(p => p.name === 'titulo').node.value;
    const itinerary = property(s, section(s, title), 'itinerario');
    const day = roundtrip(s, listChildTargets({ snapshot: s, parentRef: itinerary })[0]);
    assert.ok(day.discriminators.some(d => d.property === 'dia'));
    const zone = roundtrip(s, listChildTargets({ snapshot: s, parentRef: property(s, day, 'zonas') })[0]);
    property(s, zone, 'descripcion'); assert.ok(zone.discriminators.some(d => d.property === 'nombre'));
  });
}
test('Copenhague also reads subsections and direct places without imposing one universal shape', () => {
  const s = realSnapshot('europa/dinamarca/copenhague');
  const subsections = property(s, section(s, 'Qué visitar en Copenhague'), 'subsecciones');
  const child = listChildTargets({ snapshot: s, parentRef: subsections })[0];
  assert.ok(listChildTargets({ snapshot: s, parentRef: property(s, child, 'lugares') }).length > 0);
});
test('Malmö uses technical guidePath and exact accented section discriminators', () => {
  const s = realSnapshot('europa/suecia/malmo');
  assert.equal(node(s, rootProperty(s, 'nombre')).value, 'Malmö');
  const visit = section(s, 'Qué visitar en Malmö'); property(s, visit, 'lugares');
  rejectsCode(() => section(s, 'Qué visitar en Malmo'), 'TARGET_NOT_FOUND');
});

test('root/object property and whole collection have structured locations', () => withFixture(ctx => {
  const s = snapshot(ctx), root = roundtrip(s, getGuideRootRef(s));
  const desc = rootProperty(s, 'descripcion'); assert.equal(desc.targetType, 'root-property');
  assert.deepEqual(desc.location, [{ property: 'descripcion' }]);
  const nested = property(s, rootProperty(s, 'infoGeneral'), 'contenido');
  assert.equal(nested.targetType, 'object-property'); assert.equal(node(s, nested).value, 'practical');
  const empty = rootProperty(s, 'empty'); assert.equal(empty.targetType, 'collection');
  assert.deepEqual(listChildTargets({ snapshot: s, parentRef: empty }), []);
  assert.deepEqual(listChildTargets({ snapshot: s, parentRef: desc }), []); assert.equal(root.parent, null);
}));
test('exact section and unique array name resolve without normalization', () => withFixture(ctx => {
  const s = snapshot(ctx); roundtrip(s, section(s, 'Historia'));
  const place = element(s, places(s), exact('nombre', 'Único 🧭'));
  assert.equal(place.observedIndex, 2); property(s, place, 'descripcion');
  rejectsCode(() => element(s, places(s), exact('nombre', 'Unico 🧭')), 'TARGET_NOT_FOUND');
}));
test('duplicate name is ambiguous, extra exact discriminator identifies one', () => withFixture(ctx => {
  const s = snapshot(ctx), parent = places(s);
  rejectsCode(() => element(s, parent, exact('nombre', 'Same')), 'TARGET_AMBIGUOUS');
  const a = element(s, parent, [{ property: 'nombre', value: 'Same' }, { property: 'fecha', value: 'A' }]);
  const b = element(s, parent, [{ property: 'nombre', value: 'Same' }, { property: 'fecha', value: 'B' }]);
  assert.notEqual(a.fingerprint, b.fingerprint); assert.notEqual(a.targetId, b.targetId);
  assert.equal(node(s, property(s, a, 'descripcion')).value, 'one');
}));
test('explicit initial snapshot index requires fingerprint and parent; no retargeting', () => withFixture(ctx => {
  const s = snapshot(ctx), parent = places(s);
  const first = listChildTargets({ snapshot: s, parentRef: parent })[0];
  roundtrip(s, first);
  rejectsCode(() => element(s, parent, exact('nombre', 'Same'),
    { fingerprint: first.fingerprint, observedIndex: 1 }), 'TARGET_STALE');
  const indexOnly = elementLocator(s, parent, [], { observedIndex: 0 });
  assert.equal(isTargetLocator(indexOnly), false);
  rejectsCode(() => resolveTarget({ snapshot: s, locator: indexOnly }), 'LOCATOR_INVALID');
}));
test('identical elements remain ambiguous unless explicitly bound to the initial index and fingerprint', () =>
  withFixture(ctx => {
    const s = snapshot(ctx), parent = rootProperty(s, 'items');
    const refs = listChildTargets({ snapshot: s, parentRef: parent });
    assert.equal(refs[0].fingerprint, refs[1].fingerprint); assert.notEqual(refs[0].targetId, refs[1].targetId);
    rejectsCode(() => element(s, parent, exact('nombre', 'same'), { fingerprint: refs[0].fingerprint }), 'TARGET_AMBIGUOUS');
    assert.equal(element(s, parent, exact('nombre', 'same'),
      { fingerprint: refs[1].fingerprint, observedIndex: 1 }).targetId, refs[1].targetId);
  }, guideSource("items: [{ nombre: 'same' }, { nombre: 'same' }]")));
test('missing properties and elements never choose a fallback', () => withFixture(ctx => {
  const s = snapshot(ctx), root = getGuideRootRef(s);
  const locator = { ...createTargetLocator({ snapshot: s, targetRef: rootProperty(s, 'descripcion') }),
    property: 'missing', expectedFingerprint: null };
  rejectsCode(() => resolveTarget({ snapshot: s, locator }), 'TARGET_NOT_FOUND');
  rejectsCode(() => element(s, places(s), exact('nombre', 'missing')), 'TARGET_NOT_FOUND');
  assert.equal(listChildTargets({ snapshot: s, parentRef: root }).length, s.root.properties.length);
}));
test('kind mismatch blocks wrong property, collection and parent kinds', () => withFixture(ctx => {
  const s = snapshot(ctx), desc = rootProperty(s, 'descripcion');
  const locator = createTargetLocator({ snapshot: s, targetRef: desc });
  for (const changed of [{ ...locator, expectedKind: 'number' }, { ...locator, targetType: 'collection' },
    { ...locator, targetType: 'object-property' }, elementLocator(s, desc, exact('nombre', 'x'))]) {
    rejectsCode(() => resolveTarget({ snapshot: s, locator: changed }), 'TARGET_KIND_MISMATCH');
  }
}));
test('target, parent, container and span drift in externally supplied refs is rejected', () => withFixture(ctx => {
  const s = snapshot(ctx), ref = rootProperty(s, 'descripcion');
  for (const changed of [{ ...ref, fingerprint: '0'.repeat(64) }, { ...ref, targetId: '0'.repeat(64) },
    { ...ref, parent: { ...ref.parent, fingerprint: '0'.repeat(64) } },
    { ...ref, containerFingerprint: '0'.repeat(64) }, { ...ref, span: { ...ref.span, start: ref.span.start + 1 } },
    { ...ref, propertySpan: null }, { ...ref, location: [{ property: 'infoGeneral' }] },
    { ...ref, discriminators: exact('nombre', 'invented') }]) {
    rejectsCode(() => verifyResolvedTarget({ currentSnapshot: s, targetRef: changed }), 'TARGET_STALE');
  }
  const locator = createTargetLocator({ snapshot: s, targetRef: ref });
  for (const changed of [{ ...locator, expectedFingerprint: '0'.repeat(64) },
    { ...locator, parent: { ...locator.parent, targetId: '0'.repeat(64) } },
    { ...locator, containerFingerprint: '0'.repeat(64) }]) {
    rejectsCode(() => resolveTarget({ snapshot: s, locator: changed }), 'TARGET_STALE');
  }
  rejectsCode(() => verifyResolvedTarget({ currentSnapshot: s,
    targetRef: { ...ref, location: [{ property: 'missing' }] } }), 'TARGET_NOT_FOUND');
}));
test('old SourceIdentity blocks changed source instead of refreshing silently', () => withFixture(ctx => {
  const old = identity(ctx); writeFileSync(ctx.sourceFile, defaultSource.replace("'editorial'", "'edited'"));
  rejectsCode(() => snapshot(ctx, old), 'SOURCE_STALE');
  assert.notEqual(snapshot(ctx).sourceHash, old.sourceHash);
}));
test('catalog byte drift also invalidates the consumed identity', () => withFixture(ctx => {
  const old = identity(ctx); writeFileSync(ctx.catalogFile, '// comment\n' + fixtureCatalog());
  rejectsCode(() => snapshot(ctx, old), 'SOURCE_STALE');
}));
test('shape-valid external SourceIdentity and serialized snapshot do not acquire host provenance', () => withFixture(ctx => {
  const trusted = identity(ctx); assert.equal(isSourceIdentity({ ...trusted }), true);
  rejectsCode(() => snapshot(ctx, { ...trusted }), 'INVALID_INPUT');
  const s = snapshot(ctx), fake = JSON.parse(JSON.stringify(s));
  rejectsCode(() => getGuideRootRef(fake), 'SNAPSHOT_INVALID');
  rejectsCode(() => buildGuideSnapshot({ repoRoot: ctx.root, sourceIdentity: trusted }), 'INVALID_INPUT');
}));
test('same exact bytes give deterministic versioned snapshot and unique deterministic target IDs', () => withFixture(ctx => {
  const a = snapshot(ctx), b = snapshot(ctx); assert.equal(a.snapshotSchemaVersion, 2);
  assert.equal(a.snapshotId, b.snapshotId); assert.equal(a.sourceHash, sha256(readFileSync(ctx.sourceFile)));
  const refsA = allRefs(a), refsB = allRefs(b);
  assert.deepEqual(refsA, refsB); assert.equal(new Set(refsA.map(ref => ref.targetId)).size, refsA.length);
  assert.ok(refsA.every(ref => /^[a-f0-9]{64}$/.test(ref.targetId)));
  const root = a.sourceIdentity, binding = root.catalogBinding;
  const expected = ['guide-snapshot', 2, [root.guidePath, root.sourcePath, root.exportName, root.ruleSet, root.sourceHash],
    [binding.catalogPath, binding.catalogHash, binding.moduleSpecifier, binding.importedSymbol, binding.localSymbol,
      binding.assignmentIndex, binding.ruleSet, binding.declaredGuidePath], a.root.fingerprint];
  assert.equal(a.snapshotId, sha256(JSON.stringify(expected)));
  expected[1] = 3; assert.notEqual(a.snapshotId, sha256(JSON.stringify(expected)));
}));
for (const [name, change, structuralSame] of [
  ['editorial', source => source.replace("'editorial'", "'edited'"), false],
  ['whitespace-only', source => source.replace('descripcion:', 'descripcion :'), true],
  ['comment-only', source => '// comment\n' + source, true],
  ['BOM/CRLF', source => '\ufeff' + source.replace(/\n/g, '\r\n'), true]
]) {
  test(`${name} bytes create a new snapshot; old locators and refs are stale`, () => withFixture(ctx => {
    const a = snapshot(ctx), ref = rootProperty(a, 'descripcion');
    const locator = createTargetLocator({ snapshot: a, targetRef: ref });
    writeFileSync(ctx.sourceFile, change(defaultSource)); const b = snapshot(ctx);
    assert.notEqual(a.sourceHash, b.sourceHash); assert.notEqual(a.snapshotId, b.snapshotId);
    assert.equal(a.root.fingerprint === b.root.fingerprint, structuralSame);
    rejectsCode(() => resolveTarget({ snapshot: b, locator }), 'TARGET_STALE');
    rejectsCode(() => verifyResolvedTarget({ currentSnapshot: b, targetRef: ref }), 'TARGET_STALE');
  }));
}
test('fingerprints preserve object property order and array order, not formatting', () => withFixture(ctx => {
  const a = snapshot(ctx); const object = rootProperty(a, 'infoGeneral');
  writeFileSync(ctx.sourceFile, defaultSource.replace("contenido: 'practical', precio: 0", "precio: 0, contenido: 'practical'"));
  const b = snapshot(ctx); assert.notEqual(object.fingerprint, rootProperty(b, 'infoGeneral').fingerprint);
  writeFileSync(ctx.sourceFile, defaultSource.replace('scalars: [1, 1, null]', 'scalars: [null, 1, 1]'));
  const c = snapshot(ctx); assert.notEqual(rootProperty(a, 'scalars').fingerprint, rootProperty(c, 'scalars').fingerprint);
}));
test('safe literal concatenation produces exact value and retains original expression span', () => withFixture(ctx => {
  const s = snapshot(ctx), ref = rootProperty(s, 'contenido'), source = readFileSync(ctx.sourceFile, 'utf8');
  assert.equal(node(s, ref).value, 'foobarbaz'); assert.equal(source.slice(ref.span.start, ref.span.end), "('foo' + 'bar') + `baz`");
}, guideSource("contenido: ('foo' + 'bar') + `baz`")));
test('numbers, booleans, null, no-substitution template and safe quoted nested properties remain data', () => withFixture(ctx => {
  const s = snapshot(ctx), payload = rootProperty(s, 'payload');
  assert.equal(node(s, property(s, payload, 'n')).value, 125);
  assert.equal(node(s, property(s, payload, 'yes')).value, true);
  assert.equal(node(s, property(s, payload, 'no')).value, false);
  assert.equal(node(s, property(s, payload, 'nil')).value, null);
  assert.equal(node(s, property(s, payload, '__proto__')).value, 'plain data');
}, guideSource("payload: { n: 1.25e2, yes: true, no: false, nil: null, '__proto__': `plain data` }")));
test('ordinary strings preserve Unicode, emoji, interpolation-looking text and malicious JS', () => withFixture(ctx => {
  const malicious = "Malmö 🧭 ${process.exit()} require('node:fs').writeFileSync('sentinel', 'x')";
  writeFileSync(ctx.sourceFile, guideSource(`descripcion: ${JSON.stringify(malicious)}`));
  const s = snapshot(ctx); assert.equal(node(s, rootProperty(s, 'descripcion')).value, malicious);
}));

for (const [name, expression] of [
  ['call', 'dangerous()'], ['constructor', 'new Dangerous()'], ['arrow', '() => process.exit()'],
  ['function', 'function () { process.exit(); }'], ['identifier', 'untrusted'],
  ['process property access', 'process.env.SECRET'], ['dynamic import', "import('malicious')"],
  ['template interpolation', '`x${process.exit()}`'], ['tagged template', 'dangerous`x`'],
  ['conditional', "true ? 'a' : 'b'"], ['numeric addition', '1 + 2'], ['identifier concatenation', "untrusted + 'x'"],
  ['call concatenation', "dangerous() + 'x'"], ['mixed concatenation', "'a' + 1"], ['non-plus binary', "'a' * 'b'"],
  ['sparse array', '[1,,2]'], ['array spread', '[...untrusted]'], ['object spread', '{ ...untrusted }'],
  ['computed property', "{ ['nombre']: 'x' }"], ['getter', "{ get nombre() { return 'x'; } }"],
  ['setter', '{ set nombre(x) { process.exit(); } }'], ['method', '{ nombre() { process.exit(); } }'],
  ['shorthand', '{ untrusted }'], ['assertion', "'x' as string"], ['satisfies', "'x' satisfies string"],
  ['nonfinite number', '1e999'], ['duplicate property', "{ nombre: 'a', nombre: 'b' }"],
  ['duplicate escaped property', "{ nombre: 'a', 'nom\\u0062re': 'b' }"], ['numeric property key', "{ 1: 'x' }"],
  ['unsafe unary expression', '-dangerous()'], ['parenthesized number', '(1)'], ['eval-like', "eval('process.exit()')"]
]) {
  test(`static reader rejects unsupported executable/ambiguous form: ${name}`, () => withFixture(ctx =>
    rejectsCode(() => snapshot(ctx), 'STATIC_VALUE_UNSUPPORTED'), guideSource(`payload: ${expression}`)));
}
test('IIFE cannot create an execution sentinel', () => withFixture(ctx => {
  const sentinel = path.join(ctx.root, 'executed.txt');
  writeFileSync(ctx.sourceFile, guideSource(`payload: (() => { require('node:fs').writeFileSync(${JSON.stringify(sentinel)}, 'x'); return 'x'; })()`));
  rejectsCode(() => snapshot(ctx), 'STATIC_VALUE_UNSUPPORTED'); assert.equal(existsSync(sentinel), false);
}));
test('duplicate section title never chooses first', () => withFixture(ctx => {
  const s = snapshot(ctx); rejectsCode(() => section(s, 'Same'), 'TARGET_AMBIGUOUS');
}, guideSource("secciones: [{ titulo: 'Same', contenido: 'a' }, { titulo: 'Same', contenido: 'b' }]")));
test('duplicate itinerary dia blocks; snapshot refs and parent context resolve nested zones', () => withFixture(ctx => {
  const s = snapshot(ctx), itinerary = property(s, section(s, 'Itinerario'), 'itinerario');
  rejectsCode(() => element(s, itinerary, exact('dia', 'Llegada')), 'TARGET_AMBIGUOUS');
  const days = listChildTargets({ snapshot: s, parentRef: itinerary });
  const day = roundtrip(s, days[0]), zones = property(s, day, 'zonas');
  rejectsCode(() => element(s, zones, exact('nombre', 'Zona')), 'TARGET_AMBIGUOUS');
  const zoneRefs = listChildTargets({ snapshot: s, parentRef: zones });
  roundtrip(s, zoneRefs[0]); roundtrip(s, zoneRefs[1]); property(s, zoneRefs[0], 'descripcion');
  const otherZones = property(s, roundtrip(s, days[1]), 'zonas');
  assert.equal(element(s, otherZones, exact('nombre', 'Otro')).parent.targetId, otherZones.targetId);
}));
test('comments, property trivia, node and separator context spans are retained without ownership decisions', () =>
  withFixture(ctx => {
    const source = readFileSync(ctx.sourceFile, 'utf8'), s = snapshot(ctx), items = rootProperty(s, 'items');
    const refs = listChildTargets({ snapshot: s, parentRef: items }), first = refs[0];
    assert.ok(source.slice(first.span.fullStart, first.span.start).includes('leading item'));
    assert.ok(source.slice(first.span.end, first.span.contextEnd).includes(','));
    const title = property(s, first, 'nombre');
    assert.ok(source.slice(title.propertySpan.fullStart, title.propertySpan.start).includes('name trivia'));
    assert.equal(source.slice(title.span.start, title.span.end), "'one'");
    assert.deepEqual(title.parentSpan, first.span);
    const second = refs[1]; assert.ok(source.slice(second.span.fullStart, second.span.start).includes('between items'));
    assert.ok(source.slice(refs.at(-1).span.end, refs.at(-1).span.contextEnd).includes('trailing item'));
  }, guideSource(`items: [
    // leading item
    { /* name trivia */ nombre: 'one' },
    // between items
    { nombre: 'two' } // trailing item
  ]`)));
test('BOM/CRLF UTF-16 spans point to exact Unicode expressions', () => withFixture(ctx => {
  const s = snapshot(ctx), ref = rootProperty(s, 'descripcion'), source = readFileSync(ctx.sourceFile, 'utf8');
  assert.equal(source.slice(ref.span.start, ref.span.end), "'Malmö 🧭'");
  assert.equal(node(s, ref).value, 'Malmö 🧭');
}, '\ufeff' + guideSource("descripcion: 'Malmö 🧭'").replace(/\n/g, '\r\n')));
test('snapshots, nodes, refs, locations, selectors and nested metadata are deeply immutable', () => withFixture(ctx => {
  const s = snapshot(ctx), ref = element(s, places(s), exact('nombre', 'Único 🧭'));
  const locator = createTargetLocator({ snapshot: s, targetRef: ref });
  const visited = new Set();
  function check(value) {
    if (value === null || typeof value !== 'object' || visited.has(value)) return;
    visited.add(value); assert.ok(Object.isFrozen(value)); Object.values(value).forEach(check);
  }
  check(s); check(ref); check(locator);
  assert.throws(() => { s.root.properties[0].node.value = 'changed'; }, TypeError);
  assert.throws(() => { ref.location.push({ element: 999 }); }, TypeError);
  assert.throws(() => { locator.selector.observedIndex = 999; }, TypeError);
  roundtrip(s, ref);
}));
test('syntactically valid copied model locator can resolve data but carries no authorization', () => withFixture(ctx => {
  const s = snapshot(ctx), ref = rootProperty(s, 'descripcion');
  const fromModel = JSON.parse(JSON.stringify(createTargetLocator({ snapshot: s, targetRef: ref })));
  assert.equal(isTargetLocator(fromModel), true); assert.deepEqual(resolveTarget({ snapshot: s, locator: fromModel }), ref);
  assert.equal('authorized' in ref, false); assert.equal('action' in ref, false);
  assert.equal(isTargetLocator({ ...fromModel, authorized: true }), false);
}));
test('locator shapes reject private extras, getters, invalid refs and insufficient selectors', () => withFixture(ctx => {
  const s = snapshot(ctx), parent = places(s), locator = elementLocator(s, parent, exact('nombre', 'Same'));
  for (const candidate of [null, [], {}, { ...locator, stack: 'private' }, { ...locator, snapshotSchemaVersion: 3 },
    { ...locator, parent: { ...locator.parent, extra: 'x' } }, { ...locator, expectedKind: 'future' },
    { ...locator, parent: { ...locator.parent, location: [{ property: 'secciones' }, {}] } },
    { ...locator, selector: { ...locator.selector, discriminators: [{ property: 'nombre', value: [] }] } },
    { ...locator, selector: { ...locator.selector, discriminators: [...exact('nombre', 'a'), ...exact('nombre', 'b')] } },
    { ...locator, selector: { discriminators: [], fingerprint: null, observedIndex: null } },
    { ...locator, selector: { ...locator.selector, observedIndex: -1 } }]) {
    assert.equal(isTargetLocator(candidate), false);
    rejectsCode(() => resolveTarget({ snapshot: s, locator: candidate }), 'LOCATOR_INVALID');
  }
  const accessor = { ...locator }; Object.defineProperty(accessor, 'targetType', { get() { throw new Error('executed'); } });
  assert.equal(isTargetLocator(accessor), false);
  const parentAccessor = { ...locator.parent };
  Object.defineProperty(parentAccessor, 'fingerprint', { get() { throw new Error('executed'); } });
  assert.equal(isTargetLocator({ ...locator, parent: parentAccessor }), false);
}));

for (const [name, fields] of [
  ['nesting depth', 'payload: ' + '['.repeat(READ_LIMITS.maxDepth + 1) + '0' + ']'.repeat(READ_LIMITS.maxDepth + 1)],
  ['array length', 'payload: [' + Array(READ_LIMITS.maxArrayElements + 1).fill('0').join(',') + ']'],
  ['object properties', 'payload: {' + Array.from({ length: READ_LIMITS.maxObjectProperties + 1 }, (_, i) => `p${i}: 0`).join(',') + '}'],
  ['single string length', 'payload: ' + JSON.stringify('x'.repeat(READ_LIMITS.maxStringLength + 1))],
  ['concatenated string length', 'payload: ' + JSON.stringify('x'.repeat(READ_LIMITS.maxStringLength / 2))
    + '+' + JSON.stringify('x'.repeat(READ_LIMITS.maxStringLength / 2 + 1))],
  ['total node count', 'payload: [' + Array(5000).fill('{a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0}').join(',') + ']'],
  ['total string length', 'payload: [' + Array(5).fill(JSON.stringify('x'.repeat(1000000))).join(',') + ']']
]) {
  test(`bounded reader rejects excessive ${name}`, () => withFixture(ctx =>
    rejectsCode(() => snapshot(ctx), 'SNAPSHOT_LIMIT_EXCEEDED'), guideSource(fields)));
}
test('source byte size is bounded before the Phase 2 parse', () => withFixture(ctx => {
  const source = guideSource('payload: 0') + ' '.repeat(MAX_GUIDE_SOURCE_BYTES);
  writeFileSync(ctx.sourceFile, source); rejectsCode(() => snapshot(ctx), 'SNAPSHOT_LIMIT_EXCEEDED');
}));
test('bounded depth does not impose unlimited recursion on parser failures', () => withFixture(ctx => {
  writeFileSync(ctx.sourceFile, guideSource('payload: ' + '['.repeat(5000) + '0' + ']'.repeat(5000)));
  assert.throws(() => snapshot(ctx), error => error instanceof SourceIdentityError);
}));
test('symlink redirect introduced after resolution cannot change snapshot source', t => withFixture(ctx => {
  const old = identity(ctx), outside = path.join(ctx.root, 'outside.guide.ts');
  writeFileSync(outside, "throw new Error('never execute');"); rmSync(ctx.sourceFile);
  try { symlinkSync(outside, ctx.sourceFile, 'file'); }
  catch (error) { if (['EPERM', 'EACCES', 'ENOTSUP'].includes(error.code)) { t.skip(error.code); return; } throw error; }
  rejectsCode(() => buildGuideSnapshot({ repoRoot: ctx.repoRoot, sourceIdentity: old }), 'IMPORT_PATH_UNSAFE');
}));
