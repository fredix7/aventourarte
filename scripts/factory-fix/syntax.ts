import * as ts from 'typescript';
import { fail, type SourceIdentityErrorCode } from './errors';

export function parseTypeScript(text: string, fileName: string, code: SourceIdentityErrorCode): ts.SourceFile {
  let source: ts.SourceFile;
  try { source = ts.createSourceFile(fileName, text, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS); }
  catch { fail(code); }
  // createSourceFile exposes parser diagnostics at runtime; reject if that contract changes.
  const diagnostics: unknown = Reflect.get(source, 'parseDiagnostics');
  if (!Array.isArray(diagnostics) || diagnostics.length !== 0) fail(code);
  return source;
}

export function syntaxShape(node: ts.Node): string {
  const parts: string[] = [];
  const visit = (current: ts.Node): void => {
    parts.push(`(${current.kind}`);
    if (ts.isIdentifier(current) || ts.isLiteralExpression(current) || ts.isTemplateLiteralToken(current)) {
      parts.push(JSON.stringify(current.text));
    }
    if (ts.isVariableDeclarationList(current)) {
      parts.push(`flags:${current.flags & (ts.NodeFlags.Const | ts.NodeFlags.Let)}`);
    }
    if (ts.isPrefixUnaryExpression(current) || ts.isPostfixUnaryExpression(current)
      || ts.isTypeOperatorNode(current)) {
      parts.push(`operator:${current.operator}`);
    }
    if (ts.isImportClause(current) || ts.isImportSpecifier(current) || ts.isExportSpecifier(current)
      || ts.isExportDeclaration(current)) {
      parts.push(`typeOnly:${current.isTypeOnly}`);
    }
    ts.forEachChild(current, visit);
    parts.push(')');
  };
  visit(node);
  return parts.join('|');
}
