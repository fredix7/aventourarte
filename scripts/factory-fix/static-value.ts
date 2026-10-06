import * as ts from 'typescript';
import { fail } from './errors';
import { digest, scalarFingerprint } from './fingerprint';
import {
  READ_LIMITS, type Discriminator, type GuideNode, type SourceSpan,
  type StaticScalar, type StructuralLocation
} from './snapshot-contracts';

export function readStaticGuideRoot(root: ts.ObjectLiteralExpression, source: ts.SourceFile): GuideNode {
  let totalNodes = 0;
  let totalStringLength = 0;
  const limit = (condition: boolean): void => { if (condition) fail('SNAPSHOT_LIMIT_EXCEEDED'); };
  const count = (depth: number): void => {
    limit(depth > READ_LIMITS.maxDepth || ++totalNodes > READ_LIMITS.maxNodes);
  };
  const text = (value: string): string => {
    totalStringLength += value.length;
    limit(value.length > READ_LIMITS.maxStringLength || totalStringLength > READ_LIMITS.maxTotalStringLength);
    return value;
  };
  const span = (node: ts.Node, contextEnd: number): SourceSpan => Object.freeze({
    fullStart: node.getFullStart(), start: node.getStart(source), end: node.end, contextEnd
  });
  const concat = (node: ts.Expression, depth: number): string => {
    count(depth);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return text(node.text);
    if (ts.isParenthesizedExpression(node)) return concat(node.expression, depth + 1);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const left = concat(node.left, depth + 1), right = concat(node.right, depth + 1);
      limit(left.length + right.length > READ_LIMITS.maxStringLength);
      return left + right;
    }
    fail('STATIC_VALUE_UNSUPPORTED');
  };
  const read = (node: ts.Expression, location: StructuralLocation, parentLocation: StructuralLocation | null,
    observedIndex: number | null, contextEnd: number, depth: number): GuideNode => {
    count(depth);
    const base = { location, parentLocation, observedIndex, span: span(node, contextEnd) };
    if (ts.isObjectLiteralExpression(node)) {
      limit(node.properties.length > READ_LIMITS.maxObjectProperties);
      const names = new Set<string>();
      const properties = node.properties.map((property, index) => {
        if (!ts.isPropertyAssignment(property) || (!ts.isIdentifier(property.name)
          && !ts.isStringLiteral(property.name))) fail('STATIC_VALUE_UNSUPPORTED');
        const name = text(property.name.text);
        if (names.has(name)) fail('STATIC_VALUE_UNSUPPORTED');
        names.add(name);
        const end = node.properties[index + 1]?.getFullStart() ?? node.end;
        const childLocation = Object.freeze([...location, Object.freeze({ property: name })]);
        return Object.freeze({ name, span: span(property, end),
          node: read(property.initializer, childLocation, location, null, end, depth + 1) });
      });
      const discriminators: Discriminator[] = [];
      for (const { name, node: child } of properties) {
        if (['nombre', 'titulo', 'dia'].includes(name) && 'value' in child) {
          discriminators.push(Object.freeze({ property: name, value: child.value }));
        }
      }
      return Object.freeze({ ...base, nodeKind: 'object', properties: Object.freeze(properties),
        discriminators: Object.freeze(discriminators),
        fingerprint: digest(['object', properties.map(p => [p.name, p.node.fingerprint])]) });
    }
    if (ts.isArrayLiteralExpression(node)) {
      limit(node.elements.length > READ_LIMITS.maxArrayElements);
      const elements = node.elements.map((element, index) => read(element,
        Object.freeze([...location, Object.freeze({ element: index })]), location, index,
        node.elements[index + 1]?.getFullStart() ?? node.end, depth + 1));
      return Object.freeze({ ...base, nodeKind: 'array', elements: Object.freeze(elements),
        discriminators: Object.freeze([]), fingerprint: digest(['array', elements.map(e => e.fingerprint)]) });
    }
    let value: StaticScalar;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) value = text(node.text);
    else if (ts.isBinaryExpression(node) || ts.isParenthesizedExpression(node)) value = concat(node, depth + 1);
    else if (ts.isNumericLiteral(node)) {
      value = Number(node.text);
      if (!Number.isFinite(value)) fail('STATIC_VALUE_UNSUPPORTED');
    } else if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand)
      && (node.operator === ts.SyntaxKind.MinusToken || node.operator === ts.SyntaxKind.PlusToken)) {
      value = Number(node.operand.text) * (node.operator === ts.SyntaxKind.MinusToken ? -1 : 1);
      if (!Number.isFinite(value)) fail('STATIC_VALUE_UNSUPPORTED');
    } else if (node.kind === ts.SyntaxKind.TrueKeyword) value = true;
    else if (node.kind === ts.SyntaxKind.FalseKeyword) value = false;
    else if (node.kind === ts.SyntaxKind.NullKeyword) value = null;
    else fail('STATIC_VALUE_UNSUPPORTED');
    const nodeKind = value === null ? 'null' : typeof value as 'string' | 'number' | 'boolean';
    return Object.freeze({ ...base, nodeKind, value, discriminators: Object.freeze([]),
      fingerprint: scalarFingerprint(nodeKind, value) });
  };
  return read(root, Object.freeze([]), null, null, source.end, 0);
}
