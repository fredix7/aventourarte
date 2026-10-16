import * as fs from 'node:fs';
import * as path from 'node:path';
import { allocateSyntheticExecutionWorkspace, syntheticWorkspaceRepository, revokeSyntheticExecutionWorkspace } from './synthetic-workspace';
import { CATALOG_SKELETON } from './catalog-grammar';
import { resolveFactoryGuideSourceIdentity } from './source-identity';
import { buildGuideSnapshot } from './snapshot';
import { getGuideRootRef, listChildTargets } from './target-locator';
import { createFixRequest, invalidateFixRequest } from './fixer-launcher';
import type { FixRequest } from './fixer-contracts';

export const MANUAL_FIXTURE_VALUE = 'Texto inventado autorizado para la visita de prueba.';
// Laboratory concern only. The production reader imports pure grammar text,
// never this constructor. Its original catalog validation is unchanged.
function syntheticFixtureCatalogText(): string {
  return CATALOG_SKELETON.replace("import type { FactoryQaRuleSet } from './guide-factory-runner';",
    "import type { FactoryQaRuleSet } from './guide-factory-runner';\nimport { FIXTURE_GUIDE } from '../guides/fixture.guide';")
    .replace('FactoryQaRuleSet])[] = [];', "FactoryQaRuleSet])[] = [[FIXTURE_GUIDE, 'generic']];");
}
// No caller-selected source, root, task, authorization or content. These files
// are ONLY parsed by the existing static constructors, NEVER loaded as modules.
export function createManualSyntheticFixture() {
  if (arguments.length) throw Error('MANUAL_FIXTURE_INPUT_INVALID');
  const workspace = allocateSyntheticExecutionWorkspace(), repo = workspace.repoRoot;
  const dirs = ['src', 'src/app', 'src/app/guides', 'src/app/shared'].map(p => path.join(repo, p));
  const sourceFile = path.join(dirs[2], 'fixture.guide.ts');
  const catalogFile = path.join(dirs[3], 'guide-factory-catalog.ts');
  const source = `export const FIXTURE_GUIDE = { path: 'fixture/ciudad', nombre: 'Fixture', descripcion: 'Texto inicial',
    secciones: [{ titulo: 'Qué visitar', itinerario: [{ dia: 'Día 9', zonas: [
      { nombre: 'Zona inventada', descripcion: 'Visita de prueba', tiposPlan: ['ruta'] }
    ] }] }] };\n`;
  let request: FixRequest | undefined, closed = false;
  function assertData(): void {
    syntheticWorkspaceRepository(workspace);
    for (const dir of dirs) {
      const stat = fs.lstatSync(dir);
      if (!stat.isDirectory() || stat.isSymbolicLink() || fs.realpathSync.native(dir) !== dir) throw Error('MANUAL_FIXTURE_CHANGED');
    }
    for (const [file, text] of [[sourceFile, source], [catalogFile, syntheticFixtureCatalogText()]]) {
      const stat = fs.lstatSync(file);
      if (!stat.isFile() || stat.isSymbolicLink() || fs.realpathSync.native(file) !== file
        || fs.readFileSync(file, 'utf8') !== text) throw Error('MANUAL_FIXTURE_CHANGED');
    }
  }
  function close(): void {
    if (closed) return; closed = true;
    if (request) invalidateFixRequest(request);
    // Known owned files only; rmdir never removes injected/unknown contents.
    // Check physical parents before every deletion, with no recursive rm.
    syntheticWorkspaceRepository(workspace);
    for (const file of [sourceFile, catalogFile]) if (fs.existsSync(file)) {
      const parent = path.dirname(file), stat = fs.lstatSync(file);
      if (fs.realpathSync.native(parent) !== parent || !stat.isFile() || stat.isSymbolicLink()) throw Error('MANUAL_CLEANUP_BLOCKED');
      fs.unlinkSync(file);
    }
    for (const dir of [dirs[3], dirs[2], dirs[1], dirs[0], repo, workspace.root]) if (fs.existsSync(dir)) {
      const stat = fs.lstatSync(dir);
      if (!stat.isDirectory() || stat.isSymbolicLink() || fs.realpathSync.native(dir) !== dir) throw Error('MANUAL_CLEANUP_BLOCKED');
      fs.rmdirSync(dir);
    }
    revokeSyntheticExecutionWorkspace(workspace);
  }
  try {
    for (const dir of dirs) fs.mkdirSync(dir);
    fs.writeFileSync(sourceFile, source, { flag: 'wx', mode: 0o600 });
    fs.writeFileSync(catalogFile, syntheticFixtureCatalogText(), { flag: 'wx', mode: 0o600 });
    assertData();
    const sourceIdentity = resolveFactoryGuideSourceIdentity({ repoRoot: repo, guidePath: 'fixture/ciudad' });
    const snapshot = buildGuideSnapshot({ repoRoot: repo, sourceIdentity });
    const ref = listChildTargets({ snapshot, parentRef: getGuideRootRef(snapshot) })
      .find(r => { const last = r.location.at(-1); return last && 'property' in last && last.property === 'descripcion'; });
    if (!ref) throw Error('MANUAL_FIXTURE_INVALID');
    request = createFixRequest({ snapshot, authorization: { allowPartial: false,
      preconditions: { guidePath: sourceIdentity.guidePath, sourceIdentity, sourceHash: snapshot.sourceHash,
        catalogHash: sourceIdentity.catalogBinding.catalogHash, snapshotId: snapshot.snapshotId, ruleSet: sourceIdentity.ruleSet },
      scopeTargets: [{ scopeId: 'description', ref, extent: 'PROPERTY', allowedDescendants: [], allowedOperations: ['UPDATE_VALUE'] }],
      actions: [{ actionKey: 'description', requirement: 'REQUIRED', scopeId: 'description',
        operation: { type: 'UPDATE_VALUE', targetRef: ref, value: MANUAL_FIXTURE_VALUE },
        preconditions: { mode: 'VALUE', expectedValue: 'Texto inicial' }, payloadConstraint: { mode: 'EXACT_VALUE' },
        evidencePolicy: { allowedIds: [], minimum: 0 }, dependencies: [], explicitRemoval: false }], evidenceBindings: [] },
      task: 'Actualizar exclusivamente la descripción sintética con el texto exacto autorizado.',
      contextTargets: [ref], editorialConstraints: ['Datos turísticos inventados. Aplicar solo el valor exacto autorizado.'], timeoutMs: 30000 });
    return Object.freeze({ request, assertData, close });
  } catch { try { close(); } catch { /* Fail closed; never recursively remove uncertain data. */ }
    throw Error('MANUAL_FIXTURE_FAILED'); }
}
