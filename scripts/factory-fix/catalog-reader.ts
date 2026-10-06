import * as ts from 'typescript';
import type { FactoryQaRuleSet } from './contracts';
import { fail } from './errors';
import { parseTypeScript, syntaxShape } from './syntax';
import { isExportName, isFactoryRuleSet, isGuideModuleSpecifier } from './validation';

export interface CatalogAssignment {
  readonly localSymbol: string;
  readonly importedSymbol: string;
  readonly moduleSpecifier: string;
  readonly ruleSet: FactoryQaRuleSet;
  readonly assignmentIndex: number;
}

// The complete supported catalog skeleton is checked, including how its public index is built.
// Imports and assignment elements are the only variable parts; comments/whitespace are trivia.
const CATALOG_SKELETON = `
import type { FactoryQaRuleSet } from './guide-factory-runner';
export interface FactoryGuideEntry {
  readonly path: string;
  readonly guide: unknown;
  readonly ruleSet: FactoryQaRuleSet;
}
const guideAssignments: readonly (readonly [unknown, FactoryQaRuleSet])[] = [];
const paths = new Set<string>();
const catalog: readonly FactoryGuideEntry[] = Object.freeze(guideAssignments.map(([guide, ruleSet]) => {
  const path = typeof guide === 'object' && guide !== null && !Array.isArray(guide)
    ? (guide as Record<string, unknown>)['path'] : undefined;
  if (typeof path !== 'string' || !path.trim()) {
    throw new Error('Cada guía del catálogo Factory debe declarar un path string no vacío.');
  }
  if (paths.has(path)) {
    throw new Error(\`El catálogo Factory contiene un path duplicado: \${path}\`);
  }
  paths.add(path);
  return Object.freeze({ path, guide, ruleSet });
}));
const guidesByPath = new Map(catalog.map(entry => [entry.path, entry]));
export function getFactoryGuide(path: string): FactoryGuideEntry | undefined {
  return guidesByPath.get(path);
}
export function listFactoryGuides(): readonly FactoryGuideEntry[] {
  return catalog;
}
`;

const supported = parseTypeScript(CATALOG_SKELETON, 'supported-catalog.ts', 'CATALOG_UNSUPPORTED');

function assignmentsDeclaration(statement: ts.Statement): ts.VariableDeclaration | undefined {
  if (!ts.isVariableStatement(statement) || statement.declarationList.declarations.length !== 1) return;
  const declaration = statement.declarationList.declarations[0];
  return ts.isIdentifier(declaration.name) && declaration.name.text === 'guideAssignments'
    ? declaration : undefined;
}

function assignmentShape(statement: ts.Statement): string {
  const declaration = assignmentsDeclaration(statement);
  if (!declaration?.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) {
    fail('CATALOG_UNSUPPORTED');
  }
  const emptyAssignment = ts.factory.updateVariableDeclaration(declaration, declaration.name,
    declaration.exclamationToken, declaration.type, ts.factory.createArrayLiteralExpression());
  if (!ts.isVariableStatement(statement)) fail('CATALOG_UNSUPPORTED');
  const emptyStatement = ts.factory.updateVariableStatement(statement, statement.modifiers,
    ts.factory.updateVariableDeclarationList(statement.declarationList, [emptyAssignment]));
  return syntaxShape(emptyStatement);
}

type CatalogImport = Pick<CatalogAssignment, 'localSymbol' | 'importedSymbol' | 'moduleSpecifier'>;

function readImports(imports: readonly ts.ImportDeclaration[]): Map<string, CatalogImport[]> {
  const bindings = new Map<string, CatalogImport[]>();
  for (const statement of imports) {
    const clause = statement.importClause;
    if (!clause || clause.isTypeOnly || clause.name || statement.attributes
      || !clause.namedBindings || !ts.isNamedImports(clause.namedBindings)
      || clause.namedBindings.elements.length !== 1 || !ts.isStringLiteral(statement.moduleSpecifier)) {
      fail('CATALOG_UNSUPPORTED');
    }
    const element = clause.namedBindings.elements[0];
    if (element.isTypeOnly || element.propertyName || !isExportName(element.name.text)) {
      fail('CATALOG_UNSUPPORTED');
    }
    if (!isGuideModuleSpecifier(statement.moduleSpecifier.text)) fail('IMPORT_PATH_UNSAFE');
    const symbol = element.name.text;
    const entries = bindings.get(symbol) ?? [];
    entries.push({ localSymbol: symbol, importedSymbol: symbol,
      moduleSpecifier: statement.moduleSpecifier.text });
    bindings.set(symbol, entries);
  }
  if ([...bindings.values()].some(entries => entries.length !== 1)) fail('CATALOG_IMPORT_AMBIGUOUS');
  return bindings;
}

export function readCatalogAssignments(text: string): readonly CatalogAssignment[] {
  const source = parseTypeScript(text, 'guide-factory-catalog.ts', 'CATALOG_UNSUPPORTED');
  const statements = [...source.statements];
  if (!statements[0] || syntaxShape(statements[0]) !== syntaxShape(supported.statements[0])) {
    fail('CATALOG_UNSUPPORTED');
  }
  let next = 1;
  const imports: ts.ImportDeclaration[] = [];
  while (statements[next] && ts.isImportDeclaration(statements[next])) {
    const statement = statements[next];
    if (!ts.isImportDeclaration(statement)) fail('CATALOG_UNSUPPORTED');
    imports.push(statement);
    next += 1;
  }
  const bindings = readImports(imports);
  const body = statements.slice(next);
  const expectedBody = supported.statements.slice(1);
  if (body.length !== expectedBody.length) fail('CATALOG_UNSUPPORTED');
  body.forEach((statement, index) => {
    const expected = expectedBody[index];
    const shape = index === 1 ? assignmentShape(statement) : syntaxShape(statement);
    const expectedShape = index === 1 ? assignmentShape(expected) : syntaxShape(expected);
    if (shape !== expectedShape) fail('CATALOG_UNSUPPORTED');
  });
  const declaration = assignmentsDeclaration(body[1]);
  if (!declaration?.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) {
    fail('CATALOG_UNSUPPORTED');
  }
  const used = new Set<string>();
  const result = declaration.initializer.elements.map((element, assignmentIndex): CatalogAssignment => {
    if (!ts.isArrayLiteralExpression(element) || element.elements.length !== 2) fail('CATALOG_UNSUPPORTED');
    const [symbol, ruleSet] = element.elements;
    if (!ts.isIdentifier(symbol) || !ts.isStringLiteral(ruleSet)) fail('CATALOG_UNSUPPORTED');
    if (!isFactoryRuleSet(ruleSet.text)) fail('RULESET_UNSUPPORTED');
    const binding = bindings.get(symbol.text)?.[0];
    if (!binding) fail('CATALOG_IMPORT_MISSING');
    used.add(symbol.text);
    return { ...binding, ruleSet: ruleSet.text, assignmentIndex };
  });
  if (used.size !== bindings.size) fail('CATALOG_UNSUPPORTED');
  return result;
}
