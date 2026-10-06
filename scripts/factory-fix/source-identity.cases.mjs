import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync,
  symlinkSync, writeFileSync
} from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const outDir = process.env.FACTORY_FIX_OUT_DIR;
if (!outDir) throw new Error('Test configuration: FACTORY_FIX_OUT_DIR is required.');
const require = createRequire(import.meta.url);
const ts = require('typescript');
const compiledRoot = path.join(outDir, 'scripts/factory-fix');
const {
  listFactoryGuideSourceIdentities, resolveFactoryGuideSourceIdentity, SourceIdentityError
} = require(path.join(compiledRoot, 'source-identity.js'));
const validators = require(path.join(compiledRoot, 'validation.js'));
const catalogPath = 'src/app/shared/guide-factory-catalog.ts';
const catalogText = readFileSync(path.join(projectRoot, catalogPath), 'utf8');
const tempRoot = realpathSync.native(tmpdir());
const fixturePrefix = 'factory-fix-phase1-fixture-';
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

const expected = [
  ['europa/espana/andalucia/cadiz/cadiz', 'europa/espana/andalucia/cadiz/cadiz', 'CADIZ_GUIDE', 'spanish-municipal'],
  ['europa/espana/andalucia/cadiz/chipiona', 'europa/espana/andalucia/cadiz/chipiona', 'CHIPIONA_GUIDE', 'spanish-municipal'],
  ['europa/espana/andalucia/cadiz/jerez-de-la-frontera', 'europa/espana/andalucia/cadiz/jerez', 'JEREZ_GUIDE', 'spanish-municipal'],
  ['europa/espana/andalucia/cadiz/rota', 'europa/espana/andalucia/cadiz/rota', 'ROTA_GUIDE', 'spanish-municipal'],
  ['europa/espana/andalucia/cadiz/san-fernando', 'europa/espana/andalucia/cadiz/san-fernando', 'SAN_FERNANDO_GUIDE', 'spanish-municipal'],
  ['europa/espana/andalucia/cadiz/sanlucar-de-barrameda', 'europa/espana/andalucia/cadiz/sanlucar-barrameda', 'SANLUCAR_BARRAMEDA_GUIDE', 'spanish-municipal'],
  ['europa/espana/andalucia/cadiz/trebujena', 'europa/espana/andalucia/cadiz/trebujena', 'TREBUJENA_GUIDE', 'spanish-municipal'],
  ['europa/espana/andalucia/cadiz/vejer-de-la-frontera', 'europa/espana/andalucia/cadiz/vejer', 'VEJER_GUIDE', 'spanish-municipal'],
  ['europa/espana/andalucia/sevilla/almensilla', 'europa/espana/andalucia/sevilla/almensilla', 'ALMENSILLA_GUIDE', 'spanish-municipal'],
  ['europa/espana/andalucia/sevilla/coria-del-rio', 'europa/espana/andalucia/sevilla/coria', 'CORIA_GUIDE', 'spanish-municipal'],
  ['europa/espana/andalucia/sevilla/mairena-del-aljarafe', 'europa/espana/andalucia/sevilla/mairena-aljarafe', 'MAIRENA_ALJARAFE_GUIDE', 'spanish-municipal'],
  ['europa/dinamarca/copenhague', 'europa/dinamarca/copenhague', 'COPENHAGUE_GUIDE', 'generic'],
  ['europa/suecia/malmo', 'europa/suecia/malmo', 'MALMO_GUIDE', 'generic'],
  ['europa/malta/malta', 'europa/malta/malta', 'MALTA_GUIDE', 'generic'],
  ['europa/italia/roma-vaticano', 'europa/italia/roma-vaticano', 'ROMA_VATICANO_GUIDE', 'generic'],
  ['europa/rumania/bucarest', 'europa/rumania/bucarest', 'BUCAREST_GUIDE', 'generic'],
  ['america/sudamerica/brasil/rio-de-janeiro', 'america/sudamerica/brasil/rio-janeiro', 'RIO_DE_JANEIRO_GUIDE', 'generic']
];

function fixtureCatalog(imports = "import { FIXTURE_GUIDE } from '../guides/fixture.guide';",
  assignments = "[FIXTURE_GUIDE, 'generic']") {
  const source = ts.createSourceFile('catalog.ts', catalogText, ts.ScriptTarget.ES2022, true);
  const importStatements = source.statements.filter(ts.isImportDeclaration);
  const first = importStatements[1].getStart(source);
  const last = importStatements.at(-1).end;
  const assignment = source.statements.filter(ts.isVariableStatement).flatMap(s => s.declarationList.declarations)
    .find(d => d.name.getText(source) === 'guideAssignments').initializer;
  return catalogText.slice(0, first) + imports + catalogText.slice(last, assignment.getStart(source))
    + `[${assignments}]` + catalogText.slice(assignment.end);
}

function withFixture(run, { imports, assignments, source } = {}) {
  const root = mkdtempSync(path.join(tempRoot, fixturePrefix));
  const repoRoot = path.join(root, 'repo');
  const catalogFile = path.join(repoRoot, catalogPath);
  const sourceFile = path.join(repoRoot, 'src/app/guides/fixture.guide.ts');
  mkdirSync(path.dirname(catalogFile), { recursive: true });
  mkdirSync(path.dirname(sourceFile), { recursive: true });
  writeFileSync(catalogFile, fixtureCatalog(imports, assignments));
  writeFileSync(sourceFile, source ?? "export const FIXTURE_GUIDE = { path: 'fixture/path', descripcion: 'fixture' };\n");
  try { return run({ root, repoRoot, catalogFile, sourceFile }); }
  finally {
    const resolved = realpathSync.native(root);
    assert.equal(path.dirname(resolved), tempRoot);
    assert.ok(path.basename(resolved).startsWith(fixturePrefix));
    rmSync(resolved, { recursive: true, force: true });
  }
}

function resolve(repoRoot, guidePath = 'fixture/path') {
  return resolveFactoryGuideSourceIdentity({ repoRoot, guidePath });
}

function rejectsCode(run, code) {
  assert.throws(run, error => error instanceof SourceIdentityError && error.code === code
    && error.message === `Factory source identity: ${code}.`);
}

test('real catalog has exactly the 17 explicit source bindings in catalog order', () => {
  const before = new Map(expected.map(([, stem]) => {
    const sourcePath = `src/app/guides/${stem}.guide.ts`;
    return [sourcePath, sha256(readFileSync(path.join(projectRoot, sourcePath)))];
  }));
  const identities = listFactoryGuideSourceIdentities({ repoRoot: projectRoot });
  assert.equal(identities.length, 17);
  assert.equal(new Set(identities.map(entry => entry.guidePath)).size, 17);
  assert.deepEqual(identities.map(entry => [entry.guidePath, entry.sourcePath, entry.exportName, entry.ruleSet]),
    expected.map(([guidePath, stem, exportName, ruleSet]) =>
      [guidePath, `src/app/guides/${stem}.guide.ts`, exportName, ruleSet]));
  assert.ok(Object.isFrozen(identities));
  const catalogHash = sha256(readFileSync(path.join(projectRoot, catalogPath)));
  identities.forEach((identity, index) => {
    assert.ok(validators.isSourceIdentity(identity));
    assert.ok(Object.isFrozen(identity));
    assert.ok(Object.isFrozen(identity.catalogBinding));
    assert.equal(identity.sourceHash, before.get(identity.sourcePath));
    assert.equal(identity.catalogBinding.catalogHash, catalogHash);
    assert.equal(identity.catalogBinding.assignmentIndex, index);
    assert.equal(identity.catalogBinding.declaredGuidePath, identity.guidePath);
    assert.equal(identity.catalogBinding.importedSymbol, identity.exportName);
    assert.deepEqual(resolve(projectRoot, identity.guidePath), identity);
    assert.equal(sha256(readFileSync(path.join(projectRoot, identity.sourcePath))), before.get(identity.sourcePath));
  });
  assert.equal(sha256(readFileSync(path.join(projectRoot, catalogPath))), catalogHash);
});

for (const guidePath of ['europa/suecia/MALMO', 'europa/suecia/malmö', 'europa/suecia/malmo\u0308',
  'europa/italia/roma', 'europa/italia/vaticano', 'europa/malta/la-valeta']) {
  test(`real catalog uses exact technical identity without name normalization: ${guidePath}`, () =>
    rejectsCode(() => resolve(projectRoot, guidePath), 'GUIDE_NOT_FOUND'));
}

test('valid synthetic binding and unknown exact guide path', () => withFixture(({ repoRoot }) => {
  const identity = resolve(repoRoot);
  assert.equal(identity.sourcePath, 'src/app/guides/fixture.guide.ts');
  assert.equal(identity.exportName, 'FIXTURE_GUIDE');
  rejectsCode(() => resolve(repoRoot, 'fixture/other'), 'GUIDE_NOT_FOUND');
}));

test('duplicate exact guide paths reject the complete catalog', () => withFixture(({ repoRoot }) => {
  writeFileSync(path.join(repoRoot, 'src/app/guides/other.guide.ts'),
    "export const OTHER_GUIDE = { path: 'fixture/path' };");
  rejectsCode(() => resolve(repoRoot), 'DUPLICATE_GUIDE_PATH');
}, {
  imports: "import { FIXTURE_GUIDE } from '../guides/fixture.guide';\nimport { OTHER_GUIDE } from '../guides/other.guide';",
  assignments: "[FIXTURE_GUIDE, 'generic'], [OTHER_GUIDE, 'spanish-municipal']"
}));

for (const [name, options, code] of [
  ['unknown ruleset', { assignments: "[FIXTURE_GUIDE, 'future']" }, 'RULESET_UNSUPPORTED'],
  ['dynamic ruleset', { assignments: '[FIXTURE_GUIDE, getRuleSet()]' }, 'CATALOG_UNSUPPORTED'],
  ['assignment without import', { imports: '' }, 'CATALOG_IMPORT_MISSING'],
  ['ambiguous import', { imports: "import { FIXTURE_GUIDE } from '../guides/fixture.guide';\nimport { FIXTURE_GUIDE } from '../guides/other.guide';" }, 'CATALOG_IMPORT_AMBIGUOUS'],
  ['default import', { imports: "import FIXTURE_GUIDE from '../guides/fixture.guide';" }, 'CATALOG_UNSUPPORTED'],
  ['namespace import', { imports: "import * as FIXTURE_GUIDE from '../guides/fixture.guide';" }, 'CATALOG_UNSUPPORTED'],
  ['aliased import', { imports: "import { ORIGINAL_GUIDE as FIXTURE_GUIDE } from '../guides/fixture.guide';" }, 'CATALOG_UNSUPPORTED'],
  ['unused import', { assignments: '' }, 'CATALOG_UNSUPPORTED'],
  ['duplicate assignment symbol', { assignments: "[FIXTURE_GUIDE, 'generic'], [FIXTURE_GUIDE, 'generic']" }, 'DUPLICATE_GUIDE_PATH'],
  ['spread assignment', { assignments: '...extraAssignments' }, 'CATALOG_UNSUPPORTED']
]) {
  test(name, () => withFixture(({ repoRoot }) => rejectsCode(() => resolve(repoRoot), code), options));
}

for (const moduleSpecifier of ['package', '/outside.guide', '//server/share/file.guide',
  'C:/outside.guide', '\\\\?\\C:\\outside.guide', '../guides/../../../../outside.guide',
  '../../outside.guide', '../shared/outside.guide', '../guides/../shared/outside.guide',
  '../guides/fixture.guide.ts', '../guides/fixture', '../guides/fixture.guide:stream',
  '../guides/con.guide', '../guides/fixture.guide?query', '../guides/fixture\\other.guide']) {
  test(`rejects unsafe or unsupported module resolution: ${moduleSpecifier}`, () => withFixture(({ repoRoot }) =>
    rejectsCode(() => resolve(repoRoot), 'IMPORT_PATH_UNSAFE'), {
    imports: `import { FIXTURE_GUIDE } from ${JSON.stringify(moduleSpecifier)};`
  }));
}

test('missing source has a distinct error', () => withFixture(({ repoRoot, sourceFile }) => {
  rmSync(sourceFile);
  rejectsCode(() => resolve(repoRoot), 'SOURCE_NOT_FOUND');
}));

for (const [name, source, code] of [
  ['missing export', "export const OTHER_GUIDE = { path: 'fixture/path' };", 'EXPORT_NOT_FOUND'],
  ['duplicate export', "export const FIXTURE_GUIDE = { path: 'fixture/path' };\nexport const FIXTURE_GUIDE = {};", 'EXPORT_AMBIGUOUS'],
  ['export is not object literal', 'export const FIXTURE_GUIDE = buildGuide();', 'SOURCE_UNSUPPORTED'],
  ['export uses assertion', "export const FIXTURE_GUIDE = { path: 'fixture/path' } as const;", 'SOURCE_UNSUPPORTED'],
  ['mutable export', "export let FIXTURE_GUIDE = { path: 'fixture/path' };", 'SOURCE_UNSUPPORTED'],
  ['extra source statement', "export const FIXTURE_GUIDE = { path: 'fixture/path' }; globalThis.executed = true;", 'SOURCE_UNSUPPORTED'],
  ['missing path', "export const FIXTURE_GUIDE = { nombre: 'fixture' };", 'PATH_NOT_STATIC'],
  ['duplicate path', "export const FIXTURE_GUIDE = { path: 'fixture/path', path: 'other/path' };", 'PATH_NOT_STATIC'],
  ['computed path', "export const FIXTURE_GUIDE = { ['path']: 'fixture/path' };", 'SOURCE_UNSUPPORTED'],
  ['quoted property name', "export const FIXTURE_GUIDE = { 'path': 'fixture/path' };", 'SOURCE_UNSUPPORTED'],
  ['spread could override path', "export const FIXTURE_GUIDE = { path: 'fixture/path', ...other };", 'SOURCE_UNSUPPORTED'],
  ['getter path', "export const FIXTURE_GUIDE = { get path() { return 'fixture/path'; } };", 'SOURCE_UNSUPPORTED'],
  ['dynamic path', 'export const FIXTURE_GUIDE = { path: currentPath };', 'PATH_NOT_STATIC'],
  ['concatenated path', "export const FIXTURE_GUIDE = { path: 'fixture/' + 'path' };", 'PATH_NOT_STATIC'],
  ['template path', 'export const FIXTURE_GUIDE = { path: `fixture/path` };', 'PATH_NOT_STATIC'],
  ['invalid source syntax', "export const FIXTURE_GUIDE = { path: 'fixture/path';", 'SOURCE_UNSUPPORTED']
]) {
  test(name, () => withFixture(({ repoRoot }) => rejectsCode(() => resolve(repoRoot), code), { source }));
}

test('a different requested path is absent; binding mismatch is rejected independently', () =>
  withFixture(({ repoRoot }) => {
    rejectsCode(() => resolve(repoRoot, 'fixture/requested'), 'GUIDE_NOT_FOUND');
    const identity = resolve(repoRoot);
    rejectsCode(() => validators.assertSourceIdentity({ ...identity, guidePath: 'fixture/requested' }), 'PATH_MISMATCH');
  }));

test('catalog semantics and extra executable statements are checked without execution', () =>
  withFixture(({ repoRoot, catalogFile }) => {
    const original = readFileSync(catalogFile, 'utf8');
    for (const changed of [original + "\nthrow new Error('executed');", original.replace('guidesByPath.get(path)',
      'guidesByPath.get(path.toLowerCase())'), original.replace('const guideAssignments:', 'let guideAssignments:'),
      original.replace('!path.trim()', '~path.trim()'), original.replace('import type {', 'import {'),
      original.replace('readonly (readonly [unknown', 'readonly (keyof [unknown')]) {
      writeFileSync(catalogFile, changed);
      rejectsCode(() => resolve(repoRoot), 'CATALOG_UNSUPPORTED');
    }
  }));

test('editorial concatenations outside path remain opaque and resolve', () => withFixture(({ repoRoot }) => {
  assert.equal(resolve(repoRoot).guidePath, 'fixture/path');
}, { source: "export const FIXTURE_GUIDE = { path: 'fixture/path', contenido: 'one\\n' + 'two', secciones: [] };" }));

for (const expression of ["(() => { throw new Error('executed'); })()", 'getPath()',
  "import('this-module-must-not-be-loaded')", 'new Dangerous()', '`fixture/${getPath()}`']) {
  test(`path expression is never executed: ${expression}`, () => withFixture(({ repoRoot }) =>
    rejectsCode(() => resolve(repoRoot), 'PATH_NOT_STATIC'), {
    source: `export const FIXTURE_GUIDE = { path: ${expression} };`
  }));
}

test('malicious path cannot create a sentinel file', () => withFixture(({ repoRoot, root, sourceFile }) => {
  const sentinel = path.join(root, 'executed.txt');
  const expression = `(() => { require('node:fs').writeFileSync(${JSON.stringify(sentinel)}, 'executed'); return 'fixture/path'; })()`;
  writeFileSync(sourceFile, `export const FIXTURE_GUIDE = { path: ${expression} };`);
  rejectsCode(() => resolve(repoRoot), 'PATH_NOT_STATIC');
  assert.equal(existsSync(sentinel), false);
}));

test('editorial text changes the source snapshot hash without changing logical identity', () =>
  withFixture(({ repoRoot, sourceFile }) => {
    const first = resolve(repoRoot);
    assert.equal(first.sourceHash, sha256(readFileSync(sourceFile)));
    const source = readFileSync(sourceFile, 'utf8');
    const edited = source.replace("descripcion: 'fixture'", "descripcion: 'updated editorial text'");
    assert.notEqual(edited, source);
    writeFileSync(sourceFile, edited);
    const second = resolve(repoRoot);
    for (const field of ['guidePath', 'sourcePath', 'exportName', 'ruleSet']) {
      assert.equal(second[field], first[field]);
    }
    assert.notEqual(second.sourceHash, first.sourceHash);
    assert.equal(second.sourceHash, sha256(readFileSync(sourceFile)));
    assert.deepEqual(second.catalogBinding, first.catalogBinding);
  }));

test('hashes bind actual source/catalog bytes, comments and LF/CRLF', () => withFixture(({ repoRoot, sourceFile, catalogFile }) => {
  const first = resolve(repoRoot);
  const source = readFileSync(sourceFile, 'utf8');
  writeFileSync(sourceFile, source.replace(/\n/g, '\r\n'));
  const crlf = resolve(repoRoot);
  assert.notEqual(first.sourceHash, crlf.sourceHash);
  assert.equal(crlf.sourceHash, sha256(readFileSync(sourceFile)));
  writeFileSync(sourceFile, '// source comment\n' + source);
  const commented = resolve(repoRoot);
  assert.equal(commented.guidePath, first.guidePath);
  assert.notEqual(commented.sourceHash, first.sourceHash);
  const catalog = readFileSync(catalogFile, 'utf8');
  writeFileSync(catalogFile, '// catalog comment\n' + catalog);
  const catalogComment = resolve(repoRoot);
  for (const field of ['guidePath', 'sourcePath', 'exportName', 'ruleSet']) {
    assert.equal(catalogComment[field], commented[field]);
  }
  assert.notEqual(catalogComment.catalogBinding.catalogHash, first.catalogBinding.catalogHash);
  assert.equal(catalogComment.catalogBinding.catalogHash, sha256(readFileSync(catalogFile)));
  assert.equal(catalogComment.sourceHash, commented.sourceHash);
  writeFileSync(catalogFile, catalog.replace(/\r?\n/g, '\n'));
  const catalogLf = resolve(repoRoot);
  writeFileSync(catalogFile, catalog.replace(/\r?\n/g, '\r\n'));
  const catalogCrlf = resolve(repoRoot);
  assert.notEqual(catalogLf.catalogBinding.catalogHash, catalogCrlf.catalogBinding.catalogHash);
  assert.equal(catalogCrlf.catalogBinding.catalogHash, sha256(readFileSync(catalogFile)));
}));

test('UTF-8 BOM participates in byte hash; malformed UTF-8 is rejected', () =>
  withFixture(({ repoRoot, sourceFile }) => {
    const original = readFileSync(sourceFile);
    const first = resolve(repoRoot);
    writeFileSync(sourceFile, Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), original]));
    const withBom = resolve(repoRoot);
    assert.equal(withBom.guidePath, first.guidePath);
    assert.notEqual(withBom.sourceHash, first.sourceHash);
    writeFileSync(sourceFile, Buffer.from([0xff]));
    rejectsCode(() => resolve(repoRoot), 'SOURCE_UNSUPPORTED');
  }));

test('missing catalog and non-regular source are distinguished', () =>
  withFixture(({ repoRoot, sourceFile, catalogFile }) => {
    rmSync(sourceFile);
    mkdirSync(sourceFile);
    rejectsCode(() => resolve(repoRoot), 'IMPORT_PATH_UNSAFE');
    rmSync(catalogFile);
    rejectsCode(() => resolve(repoRoot), 'CATALOG_NOT_FOUND');
  }));

test('source symlink escaping guide root is rejected when host permits creation', t =>
  withFixture(({ repoRoot, root, sourceFile }) => {
    const outside = path.join(root, 'outside.guide.ts');
    writeFileSync(outside, "throw new Error('outside source must not be parsed');");
    rmSync(sourceFile);
    try { symlinkSync(outside, sourceFile, 'file'); }
    catch (error) {
      if (['EPERM', 'EACCES', 'ENOTSUP'].includes(error.code)) {
        t.skip(`Symlink creation unavailable: ${error.code}; containment not accredited by this skipped test.`);
        return;
      }
      throw error;
    }
    assert.ok(lstatSync(sourceFile).isSymbolicLink());
    rejectsCode(() => resolve(repoRoot), 'IMPORT_PATH_UNSAFE');
  }));

test('directory junction/symlink cannot redirect guide reads outside guide root', t =>
  withFixture(({ repoRoot, root, catalogFile }) => {
    const outside = path.join(root, 'outside');
    mkdirSync(outside);
    writeFileSync(path.join(outside, 'fixture.guide.ts'), "throw new Error('outside source');");
    const redirect = path.join(repoRoot, 'src/app/guides/redirect');
    try { symlinkSync(outside, redirect, process.platform === 'win32' ? 'junction' : 'dir'); }
    catch (error) {
      if (['EPERM', 'EACCES', 'ENOTSUP'].includes(error.code)) {
        t.skip(`Directory redirect creation unavailable: ${error.code}.`);
        return;
      }
      throw error;
    }
    writeFileSync(catalogFile, fixtureCatalog("import { FIXTURE_GUIDE } from '../guides/redirect/fixture.guide';"));
    rejectsCode(() => resolve(repoRoot), 'IMPORT_PATH_UNSAFE');
  }));

test('syntactically valid external identity cannot select the source or supply trusted snapshot hashes', () =>
  withFixture(({ repoRoot, sourceFile, catalogFile }) => {
    const forged = {
      ...resolve(repoRoot), sourcePath: 'src/app/guides/other.guide.ts', exportName: 'OTHER_GUIDE',
      sourceHash: '0'.repeat(64), catalogBinding: {
        ...resolve(repoRoot).catalogBinding, moduleSpecifier: '../guides/other.guide',
        importedSymbol: 'OTHER_GUIDE', localSymbol: 'OTHER_GUIDE', catalogHash: '0'.repeat(64)
      }
    };
    assert.doesNotThrow(() => validators.assertSourceIdentity(forged));
    assert.equal(validators.isSourceIdentity(forged), true);
    rejectsCode(() => resolveFactoryGuideSourceIdentity({ repoRoot, ...forged }), 'INVALID_INPUT');
    const observed = resolveFactoryGuideSourceIdentity({ repoRoot, guidePath: forged.guidePath });
    assert.equal(observed.sourcePath, 'src/app/guides/fixture.guide.ts');
    assert.equal(observed.exportName, 'FIXTURE_GUIDE');
    assert.equal(observed.sourceHash, sha256(readFileSync(sourceFile)));
    assert.equal(observed.catalogBinding.catalogHash, sha256(readFileSync(catalogFile)));
    assert.notEqual(observed.sourceHash, forged.sourceHash);
    assert.notEqual(observed.catalogBinding.catalogHash, forged.catalogBinding.catalogHash);
  }));

test('runtime validators reject malformed identity and binding shapes', () => withFixture(({ repoRoot }) => {
  const identity = resolve(repoRoot);
  for (const candidate of [null, [], {}, { ...identity, extra: 'private' },
    { ...identity, sourceHash: 'a'.repeat(63) }, { ...identity, sourceHash: 'a'.repeat(64) + '\n' },
    { ...identity, sourcePath: '../outside.guide.ts' }, { ...identity, exportName: 'default' },
    { ...identity, exportName: 'FIXTURE_GUIDE\n' }, { ...identity, ruleSet: 'future' },
    { ...identity, catalogBinding: { ...identity.catalogBinding, stack: 'private' } },
    { ...identity, catalogBinding: { ...identity.catalogBinding, assignmentIndex: -1 } },
    { ...identity, catalogBinding: { ...identity.catalogBinding, catalogHash: 'invalid' } },
    { ...identity, catalogBinding: { ...identity.catalogBinding, importedSymbol: 'OTHER_GUIDE' } },
    { ...identity, catalogBinding: { ...identity.catalogBinding, ruleSet: 'spanish-municipal' } },
    { ...identity, catalogBinding: { ...identity.catalogBinding, moduleSpecifier: '../guides/other.guide' } }]) {
    assert.equal(validators.isSourceIdentity(candidate), false);
  }
  assert.equal(validators.isSourceIdentity(identity), true);
  assert.equal(validators.isCatalogSourceBinding(identity.catalogBinding), true);
  for (const field of Object.keys(identity.catalogBinding)) {
    const incomplete = { ...identity.catalogBinding };
    delete incomplete[field];
    assert.equal(validators.isCatalogSourceBinding(incomplete), false);
  }
  const accessor = { ...identity };
  Object.defineProperty(accessor, 'guidePath', { get() { throw new Error('accessor executed'); } });
  assert.equal(validators.isSourceIdentity(accessor), false);
}));

for (const guidePath of ['', ' fixture/path', 'fixture/path ', '/fixture/path', 'fixture//path',
  'fixture/../path', 'fixture\\path', 'fixture/path?query', 'fixture/path#fragment', 'fixture/path\n', null, 7]) {
  test(`invalid technical guidePath: ${JSON.stringify(guidePath)}`, () =>
    rejectsCode(() => resolveFactoryGuideSourceIdentity({ repoRoot: projectRoot, guidePath }), 'INVALID_INPUT'));
}

test('request validation rejects extra paths, relative roots and accessors', () => {
  for (const input of [null, [], {}, { repoRoot: '.', guidePath: 'fixture/path' },
    { repoRoot: projectRoot, guidePath: 'fixture/path', sourcePath: 'other' }]) {
    rejectsCode(() => resolveFactoryGuideSourceIdentity(input), 'INVALID_INPUT');
  }
  const input = { repoRoot: projectRoot };
  Object.defineProperty(input, 'guidePath', { get() { throw new Error('accessor executed'); } });
  rejectsCode(() => resolveFactoryGuideSourceIdentity(input), 'INVALID_INPUT');
});
