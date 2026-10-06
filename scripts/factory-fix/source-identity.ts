import { createHash } from 'node:crypto';
import { lstatSync, readFileSync, realpathSync } from 'node:fs';
import * as path from 'node:path';
import { TextDecoder } from 'node:util';
import * as ts from 'typescript';
import { readCatalogAssignments } from './catalog-reader';
import { FACTORY_CATALOG_PATH, type SourceIdentity, type SourceIdentityRequest } from './contracts';
import { fail, SourceIdentityError, type SourceIdentityErrorCode } from './errors';
import { parseTypeScript } from './syntax';
import {
  assertSourceIdentity, hasExactKeys, isGuidePath, isSourceIdentityRequest, sourcePathFromModuleSpecifier
} from './validation';

export { SourceIdentityError } from './errors';
export type { SourceIdentity, CatalogSourceBinding, SourceIdentityRequest } from './contracts';

// Runtime provenance, not a brand that an external shape validator can confer.
const resolvedRoots = new WeakMap<SourceIdentity, string>();
export const MAX_GUIDE_SOURCE_BYTES = 8 * 1024 * 1024;

function errorCode(error: unknown): unknown {
  return typeof error === 'object' && error !== null ? Reflect.get(error, 'code') : undefined;
}

function canonicalRoot(repoRoot: string): string {
  if (typeof repoRoot !== 'string' || !path.isAbsolute(repoRoot) || repoRoot.includes('\0')) {
    fail('INVALID_INPUT');
  }
  try {
    const root = realpathSync.native(repoRoot);
    if (!lstatSync(root).isDirectory()) fail('INVALID_INPUT');
    return root;
  } catch (error) {
    if (error instanceof SourceIdentityError) throw error;
    fail('INVALID_INPUT');
  }
}

function contained(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return relative !== '' && !path.isAbsolute(relative) && relative !== '..'
    && !relative.startsWith(`..${path.sep}`);
}

function readContainedFile(root: string, relativePath: string, missing: SourceIdentityErrorCode): Buffer {
  const candidate = path.resolve(root, ...relativePath.split('/'));
  if (!contained(root, candidate)) fail('IMPORT_PATH_UNSAFE');
  try {
    let current = root;
    const segments = relativePath.split('/');
    for (const [index, segment] of segments.entries()) {
      current = path.join(current, segment);
      const stat = lstatSync(current);
      if (stat.isSymbolicLink() || (index < segments.length - 1 ? !stat.isDirectory() : !stat.isFile())) {
        fail('IMPORT_PATH_UNSAFE');
      }
      const physical = realpathSync.native(current);
      if (!contained(root, physical) || path.relative(candidate, physical) !== ''
        && index === segments.length - 1) fail('IMPORT_PATH_UNSAFE');
    }
    // Phase 1 checks the observed path; it does not provide race-proof file handles.
    return readFileSync(candidate);
  } catch (error) {
    if (error instanceof SourceIdentityError) throw error;
    if (errorCode(error) === 'ENOENT' || errorCode(error) === 'ENOTDIR') fail(missing);
    fail('READ_FAILED');
  }
}

function decode(bytes: Buffer, code: SourceIdentityErrorCode): string {
  // Preserve BOM in decoded text so source spans remain offsets into the original text.
  try { return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes); }
  catch { fail(code); }
}

function sha256(bytes: Buffer): string {
  return createHash('sha256').update(bytes).digest('hex');
}

function isExported(statement: ts.VariableStatement): boolean {
  return statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) === true;
}

export function inspectGuideExport(source: ts.SourceFile, exportName: string): {
  root: ts.ObjectLiteralExpression; guidePath: string;
} {
  const matching = source.statements.filter(ts.isVariableStatement).flatMap(statement =>
    isExported(statement) ? statement.declarationList.declarations.filter(declaration =>
      ts.isIdentifier(declaration.name) && declaration.name.text === exportName
    ) : []
  );
  if (matching.length === 0) fail('EXPORT_NOT_FOUND');
  if (matching.length !== 1) fail('EXPORT_AMBIGUOUS');
  const statement = source.statements[0];
  if (source.statements.length !== 1 || !ts.isVariableStatement(statement)
    || statement.modifiers?.length !== 1 || !isExported(statement)
    || (statement.declarationList.flags & ts.NodeFlags.Const) === 0
    || statement.declarationList.declarations.length !== 1) fail('SOURCE_UNSUPPORTED');
  const declaration = matching[0];
  if (declaration.type || declaration.exclamationToken || !declaration.initializer
    || !ts.isObjectLiteralExpression(declaration.initializer)) fail('SOURCE_UNSUPPORTED');
  const names = new Set<string>();
  let guidePath: string | undefined;
  for (const property of declaration.initializer.properties) {
    if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) fail('SOURCE_UNSUPPORTED');
    const name = property.name.text;
    if (names.has(name)) fail(name === 'path' ? 'PATH_NOT_STATIC' : 'SOURCE_UNSUPPORTED');
    names.add(name);
    if (name === 'path') {
      if (!ts.isStringLiteral(property.initializer) || !isGuidePath(property.initializer.text)) {
        fail('PATH_NOT_STATIC');
      }
      guidePath = property.initializer.text;
    }
  }
  if (guidePath === undefined) fail('PATH_NOT_STATIC');
  // Other property initializers remain opaque AST: no data conversion or execution in Phase 1.
  return { root: declaration.initializer, guidePath };
}

export function listFactoryGuideSourceIdentities(input: { readonly repoRoot: string }): readonly SourceIdentity[] {
  if (!hasExactKeys(input, ['repoRoot']) || typeof input['repoRoot'] !== 'string') {
    fail('INVALID_INPUT');
  }
  const root = canonicalRoot(input.repoRoot);
  const catalogBytes = readContainedFile(root, FACTORY_CATALOG_PATH, 'CATALOG_NOT_FOUND');
  const catalogHash = sha256(catalogBytes);
  const assignments = readCatalogAssignments(decode(catalogBytes, 'CATALOG_UNSUPPORTED'));
  const seen = new Set<string>();
  const identities = assignments.map((assignment): SourceIdentity => {
    const sourcePath = sourcePathFromModuleSpecifier(assignment.moduleSpecifier);
    const bytes = readContainedFile(root, sourcePath, 'SOURCE_NOT_FOUND');
    const source = parseTypeScript(decode(bytes, 'SOURCE_UNSUPPORTED'), 'guide.ts', 'SOURCE_UNSUPPORTED');
    const { guidePath } = inspectGuideExport(source, assignment.importedSymbol);
    if (seen.has(guidePath)) fail('DUPLICATE_GUIDE_PATH');
    seen.add(guidePath);
    const identity: SourceIdentity = {
      guidePath, sourcePath, exportName: assignment.importedSymbol, ruleSet: assignment.ruleSet,
      sourceHash: sha256(bytes), catalogBinding: Object.freeze({
        catalogPath: FACTORY_CATALOG_PATH, catalogHash, moduleSpecifier: assignment.moduleSpecifier,
        importedSymbol: assignment.importedSymbol, localSymbol: assignment.localSymbol,
        assignmentIndex: assignment.assignmentIndex, ruleSet: assignment.ruleSet, declaredGuidePath: guidePath
      })
    };
    assertSourceIdentity(identity);
    Object.freeze(identity);
    resolvedRoots.set(identity, root);
    return identity;
  });
  return Object.freeze(identities);
}

export function resolveFactoryGuideSourceIdentity(input: SourceIdentityRequest): SourceIdentity {
  if (!isSourceIdentityRequest(input)) {
    fail('INVALID_INPUT');
  }
  const identities = listFactoryGuideSourceIdentities({ repoRoot: input.repoRoot });
  const identity = identities.find(entry => entry.guidePath === input.guidePath);
  if (!identity) fail('GUIDE_NOT_FOUND');
  return identity;
}

// Shared internal bridge: only identities emitted by Phase 1 can select a source.
// Read/hash/parse the target once here; no silent refresh of an old identity.
export function readResolvedGuideSource(input: {
  readonly repoRoot: string; readonly sourceIdentity: SourceIdentity;
}): { sourceFile: ts.SourceFile; root: ts.ObjectLiteralExpression; bytes: Buffer } {
  if (!hasExactKeys(input, ['repoRoot', 'sourceIdentity'])) fail('INVALID_INPUT');
  assertSourceIdentity(input.sourceIdentity);
  const root = canonicalRoot(input.repoRoot);
  if (resolvedRoots.get(input.sourceIdentity) !== root) fail('INVALID_INPUT');
  const identity = input.sourceIdentity;
  const bytes = readContainedFile(root, identity.sourcePath, 'SOURCE_NOT_FOUND');
  if (sha256(bytes) !== identity.sourceHash) fail('SOURCE_STALE');
  if (sha256(readContainedFile(root, FACTORY_CATALOG_PATH, 'CATALOG_NOT_FOUND'))
    !== identity.catalogBinding.catalogHash) fail('SOURCE_STALE');
  if (bytes.length > MAX_GUIDE_SOURCE_BYTES) fail('SNAPSHOT_LIMIT_EXCEEDED');
  const sourceFile = parseTypeScript(decode(bytes, 'GUIDE_ROOT_UNSUPPORTED'), identity.sourcePath,
    'GUIDE_ROOT_UNSUPPORTED');
  const exported = inspectGuideExport(sourceFile, identity.exportName);
  if (exported.guidePath !== identity.guidePath) fail('PATH_MISMATCH');
  return { sourceFile, root: exported.root, bytes };
}
