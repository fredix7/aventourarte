import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, realpathSync, rmSync, writeFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(import.meta.url), ts = require('typescript');
const outDir = process.env.FACTORY_FIX_OUT_DIR;
if (!outDir) throw new Error('Test configuration: FACTORY_FIX_OUT_DIR is required.');
const compiled = name => require(path.join(outDir, 'scripts/factory-fix', name + '.js'));
const { resolveFactoryGuideSourceIdentity } = compiled('source-identity');
const { buildGuideSnapshot, getSnapshotNode } = compiled('snapshot');
const { getGuideRootRef, listChildTargets } = compiled('target-locator');
const { operationRef } = compiled('modification-scope');
const { guideTree } = compiled('static-data');
const tempRoot = realpathSync.native(tmpdir()), prefix = 'factory-fix-phase9-fixture-';
const { allocateSyntheticExecutionWorkspace, revokeSyntheticExecutionWorkspace, syntheticWorkspaceRepository } = compiled('synthetic-workspace');
const catalogPath = 'src/app/shared/guide-factory-catalog.ts';
const catalogText = readFileSync(path.join(projectRoot, catalogPath), 'utf8');
const correlationKeys = ['schemaVersion', 'requestId', 'nonce', 'responseId', 'guidePath', 'sourceHash',
  'catalogHash', 'snapshotId', 'snapshotFingerprint', 'targetFingerprint', 'actionFingerprint',
  'evidenceFingerprint', 'requestFingerprint'];
const fields = `nombre: 'Fixture', descripcion: 'Original', secret: 'GUIDE_PRIVATE_DO_NOT_SEND',
  info: { telefono: 'old', count: 1, enabled: true, nullable: null, command: 'original' },
  empty: {}, scalars: [1, 2, 3], values: [{ nombre: 'A', descripcion: 'Primero' }, { nombre: 'B', descripcion: 'Segundo' }],
  foto: 'cld:fixture/confirmed',
  secciones: [{ titulo: 'Qué visitar', itinerario: [{ dia: 'Día 9', zonas: [
    { nombre: 'Zona', descripcion: 'Visita útil', tiposPlan: ['ruta'] }
  ] }] }]`;
function fixtureCatalog() {
  const source = ts.createSourceFile('catalog.ts', catalogText, ts.ScriptTarget.ES2022, true);
  const imports = source.statements.filter(ts.isImportDeclaration);
  const assignment = source.statements.filter(ts.isVariableStatement).flatMap(s => s.declarationList.declarations)
    .find(d => d.name.getText(source) === 'guideAssignments').initializer;
  return catalogText.slice(0, imports[1].getStart(source)) + "import { FIXTURE_GUIDE } from '../guides/fixture.guide';"
    + catalogText.slice(imports.at(-1).end, assignment.getStart(source)) + "[[FIXTURE_GUIDE, 'generic']]" + catalogText.slice(assignment.end);
}
async function fixture(run, options = {}) {
  const workspace = allocateSyntheticExecutionWorkspace();
  const { root, repoRoot } = workspace; syntheticWorkspaceRepository(workspace);
  const sourceFile = path.join(repoRoot, 'src/app/guides/fixture.guide.ts'), catalogFile = path.join(repoRoot, catalogPath);
  const guidePath = 'fixture/ciudad-ñ';
  const source = `\uFEFFexport const FIXTURE_GUIDE = { path: '${guidePath}', ${options.fields ?? fields} };\r\n`;
  mkdirSync(path.dirname(sourceFile), { recursive: true }); mkdirSync(path.dirname(catalogFile), { recursive: true });
  writeFileSync(sourceFile, source); writeFileSync(catalogFile, fixtureCatalog());
  try {
    const sourceIdentity = resolveFactoryGuideSourceIdentity({ repoRoot, guidePath });
    await run({ workspace, snapshot: buildGuideSnapshot({ repoRoot, sourceIdentity }), source, sourceFile, catalogFile, repoRoot, guidePath });
    // The genuine synthetic allocation grants fixture ownership, never persistence.
    assert.deepEqual(readdirSync(repoRoot), ['src']);
    assert.deepEqual(readdirSync(path.dirname(sourceFile)), ['fixture.guide.ts']);
  } finally {
    const resolved = realpathSync.native(root);
    assert.equal(path.dirname(resolved), tempRoot); assert.ok(path.basename(resolved).startsWith(prefix));
    syntheticWorkspaceRepository(workspace); revokeSyntheticExecutionWorkspace(workspace);
    rmSync(resolved, { recursive: true, force: true });
  }
}
function refAt(s, ...steps) {
  let ref = getGuideRootRef(s);
  for (const step of steps) {
    const refs = listChildTargets({ snapshot: s, parentRef: ref });
    ref = typeof step === 'number' ? refs[step] : refs.find(r => r.location.at(-1)?.property === step);
    assert.ok(ref, 'Missing synthetic target');
  }
  return ref;
}
function plain(tree) {
  if (tree.kind === 'scalar') return tree.value;
  if (tree.kind === 'array') return tree.elements.map(plain);
  return Object.fromEntries(tree.properties.map(p => [p.name, plain(p.tree)]));
}
const current = (s, ref) => plain(guideTree(getSnapshotNode(s, ref.location)));
const update = (s, steps = ['descripcion'], value = 'Texto útil para viajeros') => ({ type: 'UPDATE_VALUE', targetRef: refAt(s, ...steps), value });
function hostInput(s, ops = [update(s)], options = {}) {
  const actions = ops.map((operation, i) => {
    const ref = operationRef(operation);
    return { actionKey: 'action-' + i, requirement: 'REQUIRED', scopeId: 'scope-' + i, operation,
      preconditions: operation.type === 'ADD_PROPERTY' ? { mode: 'ABSENT_PROPERTY', propertyName: operation.propertyName }
        : ['ADD_ELEMENT', 'REORDER_ELEMENTS'].includes(operation.type)
          ? { mode: 'MEMBERS', expectedOrder: listChildTargets({ snapshot: s, parentRef: ref }) }
          : { mode: 'VALUE', expectedValue: current(s, ref) },
      payloadConstraint: { mode: 'value' in operation ? 'EXACT_VALUE' : 'NO_PAYLOAD' },
      evidencePolicy: { allowedIds: [], minimum: 0 }, dependencies: [], explicitRemoval: operation.type.startsWith('REMOVE') };
  });
  return { snapshot: s, authorization: { allowPartial: false,
    preconditions: { guidePath: s.sourceIdentity.guidePath, sourceIdentity: s.sourceIdentity,
      sourceHash: s.sourceHash, catalogHash: s.sourceIdentity.catalogBinding.catalogHash,
      snapshotId: s.snapshotId, ruleSet: s.sourceIdentity.ruleSet },
    scopeTargets: actions.map(a => ({ scopeId: a.scopeId, ref: operationRef(a.operation),
      extent: a.operation.type === 'ADD_PROPERTY' ? 'OBJECT' : ['ADD_ELEMENT', 'REORDER_ELEMENTS'].includes(a.operation.type)
        ? 'COLLECTION' : a.operation.type === 'REMOVE_ELEMENT' ? 'ELEMENT' : 'PROPERTY',
      allowedDescendants: [], allowedOperations: [a.operation.type] })), actions, evidenceBindings: [] },
    task: 'Corregir solo los campos autorizados con el material aportado.',
    contextTargets: [...new Map(ops.map(op => [operationRef(op).targetId, operationRef(op)])).values()],
    editorialConstraints: ['Aplicar únicamente reglas ACTIVE pertinentes; no inventar hechos.'], timeoutMs: 1000, ...options };
}
function addEvidence(input, i = 0, overrides = {}) {
  const action = input.authorization.actions[i], ref = operationRef(action.operation), last = ref.location.at(-1);
  const binding = { evidenceId: 'evidence-' + i, actionKey: action.actionKey, targetRef: ref, origin: 'Researcher',
    provenanceReference: 'Synthetic supplied finding', entity: 'Synthetic entity',
    field: action.operation.type === 'ADD_PROPERTY' ? action.operation.propertyName : last?.property ?? null,
    material: 'Synthetic fact, no external request', findingStatus: 'SUPPORTED', limitations: ['Synthetic only'],
    sourceReferences: ['Descriptive synthetic reference'], observedAt: '2026-10-15', ...overrides };
  input.authorization.evidenceBindings.push(binding); action.evidencePolicy = { allowedIds: [binding.evidenceId], minimum: 1 };
  return binding;
}
function planFor(request) {
  return { ...Object.fromEntries(correlationKeys.map(k => [k, request[k]])),
    operations: request.actions.map(a => ({ actionId: a.actionId, operation: a.operation.type,
      targetId: operationRef(a.operation).targetId,
      evidence: request.evidence.filter(e => a.evidencePolicy.allowedIds.includes(e.evidenceId))
        .map(e => ({ evidenceId: e.evidenceId, fingerprint: e.fingerprint })),
      ...('value' in a.operation ? { value: a.operation.value } : {}) })), unresolvedActionIds: [] };
}

export { fixture, hostInput, addEvidence, planFor, refAt, update, compiled, projectRoot, tempRoot };
