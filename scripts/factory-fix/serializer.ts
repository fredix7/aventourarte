import { fail } from './errors';
import { dataTree, normalizeStaticData, type DataTree } from './static-data';

export interface SerializationFormat {
  readonly eol: '\n' | '\r\n'; readonly indent: string; readonly unit: string;
  readonly multiline: boolean; readonly trailingComma: boolean;
}
export function quoteString(value: string, quote: "'" | '"' = "'"): string {
  let result = quote;
  for (let index = 0; index < value.length; index++) {
    const char = value[index], code = value.charCodeAt(index);
    if (char === quote || char === '\\') result += '\\' + char;
    else if (code < 32 || code === 127 || code === 0x2028 || code === 0x2029
      || code >= 0xd800 && code <= 0xdfff) result += '\\u' + code.toString(16).padStart(4, '0');
    else result += char;
  }
  return result + quote;
}
export function serializeTree(tree: DataTree, format: SerializationFormat, quote: "'" | '"' = "'"): string {
  if (tree.kind === 'scalar') {
    if (typeof tree.value === 'string') return quoteString(tree.value, quote);
    if (tree.value === null) return 'null';
    if (typeof tree.value === 'number') {
      if (!Number.isFinite(tree.value)) fail('SERIALIZATION_FAILED');
      return Object.is(tree.value, -0) ? '-0' : String(tree.value);
    }
    return String(tree.value);
  }
  const object = tree.kind === 'object', open = object ? '{' : '[', close = object ? '}' : ']';
  const childFormat = { ...format, indent: format.indent + format.unit };
  const entries = object ? tree.properties.map(p => {
    const key = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(p.name) ? p.name : quoteString(p.name);
    return key + ': ' + serializeTree(p.tree, childFormat);
  }) : tree.elements.map(element => serializeTree(element, childFormat));
  if (entries.length === 0) return open + close;
  if (!format.multiline) return open + ' ' + entries.join(', ') + (format.trailingComma ? ',' : '') + ' ' + close;
  return open + format.eol + childFormat.indent + entries.join(',' + format.eol + childFormat.indent)
    + (format.trailingComma ? ',' : '') + format.eol + format.indent + close;
}
// Public safe scalar/data serializer; formatting options and raw fragments are intentionally internal.
export function serializeStaticValue(value: unknown): string {
  return serializeTree(dataTree(normalizeStaticData(value)), {
    eol: '\n', indent: '', unit: '  ', multiline: false, trailingComma: false
  });
}
