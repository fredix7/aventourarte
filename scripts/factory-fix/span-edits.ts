import * as ts from 'typescript';
import { fail } from './errors';
import { CANDIDATE_LIMITS, type PreparedOperation } from './operations';
import { quoteString, serializeTree, type SerializationFormat } from './serializer';
import { type GuideNode, type SourceSpan } from './snapshot-contracts';

export interface TextEdit {
  readonly start: number; readonly end: number; readonly replacement: string;
  readonly operationId: string; readonly reason: string;
}
interface Item { readonly node: GuideNode; readonly span: SourceSpan }
function items(node: GuideNode): readonly Item[] {
  if (node.nodeKind === 'object') return node.properties.map(p => ({ node: p.node, span: p.span }));
  if (node.nodeKind === 'array') return node.elements.map(child => ({ node: child, span: child.span }));
  fail('OPERATION_UNSUPPORTED');
}
function hasComment(text: string): boolean {
  const scanner = ts.createScanner(ts.ScriptTarget.ES2022, false, ts.LanguageVariant.Standard, text);
  for (let token = scanner.scan(); token !== ts.SyntaxKind.EndOfFileToken; token = scanner.scan()) {
    if (token === ts.SyntaxKind.SingleLineCommentTrivia || token === ts.SyntaxKind.MultiLineCommentTrivia) return true;
  }
  return false;
}
function trivia(text: string, start: number, end: number): readonly number[] {
  const scanner = ts.createScanner(ts.ScriptTarget.ES2022, false, ts.LanguageVariant.Standard, text.slice(start, end));
  const commas: number[] = [];
  for (let token = scanner.scan(); token !== ts.SyntaxKind.EndOfFileToken; token = scanner.scan()) {
    if (token === ts.SyntaxKind.SingleLineCommentTrivia || token === ts.SyntaxKind.MultiLineCommentTrivia) {
      fail('COMMENT_TRIVIA_AMBIGUOUS');
    }
    if (token === ts.SyntaxKind.CommaToken) commas.push(start + scanner.getTokenPos());
    else if (token !== ts.SyntaxKind.WhitespaceTrivia && token !== ts.SyntaxKind.NewLineTrivia) fail('OPERATION_UNSUPPORTED');
  }
  return commas;
}
function lineIndent(text: string, start: number): string {
  const prefix = text.slice(text.lastIndexOf('\n', start - 1) + 1, start);
  return prefix.match(/^[ \t]*/)?.[0] ?? '';
}
function localFormat(text: string, parent: GuideNode, insertionIndex: number): SerializationFormat {
  const list = items(parent), open = parent.span.start + 1, close = parent.span.end - 1;
  const gaps = list.map((item, i) => text.slice(i ? list[i - 1].span.end : open, item.span.start));
  const suffix = text.slice(list.at(-1)?.span.end ?? open, close);
  const multiline = [...gaps, suffix].some(gap => /[\r\n]/.test(gap));
  // Use the exact insertion gap's EOL, not a whole-file majority. Historical children and
  // other gaps may differ and retain their original bytes. Mixed EOLs inside this gap block.
  const separators = gaps[insertionIndex] ?? suffix;
  const crlf = separators.includes('\r\n'), bareLf = /(?<!\r)\n/.test(separators);
  if (crlf && bareLf || /\r(?!\n)/.test(separators)) fail('OPERATION_UNSUPPORTED');
  const eol = crlf ? '\r\n' : '\n';
  const indent = lineIndent(text, parent.span.start);
  let unit = '  ';
  if (multiline && list.length) {
    const childIndents = list.map(item => {
      const before = text.slice(text.lastIndexOf('\n', item.span.start - 1) + 1, item.span.start);
      if (!/^[ \t]*$/.test(before)) fail('OPERATION_UNSUPPORTED');
      return before;
    });
    if (childIndents.some(value => value !== childIndents[0]) || !childIndents[0].startsWith(indent)
      || childIndents[0].length <= indent.length) fail('OPERATION_UNSUPPORTED');
    unit = childIndents[0].slice(indent.length);
  }
  if (multiline && !/^[ \t]*$/.test(text.slice(text.lastIndexOf('\n', close - 1) + 1, close))) {
    fail('OPERATION_UNSUPPORTED');
  }
  const suffixCommas = trivia(text, list.at(-1)?.span.end ?? open, close);
  if (suffixCommas.length > 1) fail('OPERATION_UNSUPPORTED');
  return { eol, indent: indent + unit, unit, multiline, trailingComma: suffixCommas.length === 1 };
}
function edit(prepared: PreparedOperation, start: number, end: number, replacement: string, reason: string): TextEdit {
  return Object.freeze({ start, end, replacement, operationId: prepared.operation.operationId, reason });
}
function add(text: string, prepared: PreparedOperation): readonly TextEdit[] {
  const parent = prepared.node, list = items(parent), index = prepared.insertionIndex!;
  const open = parent.span.start + 1, close = parent.span.end - 1;
  const format = localFormat(text, parent, index);
  let replacement = serializeTree(prepared.tree!, format);
  if (prepared.operation.type === 'ADD_PROPERTY') {
    const name = prepared.operation.propertyName;
    replacement = (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : quoteString(name)) + ': ' + replacement;
  }
  const separator = format.multiline ? format.eol + format.indent : ' ';
  if (!list.length) {
    trivia(text, open, close);
    const prefix = format.multiline ? separator : text.slice(open, close).length ? ' ' : '';
    return [edit(prepared, open, open, prefix + replacement, 'insert into empty container')];
  }
  if (index < list.length) {
    const target = list[index];
    const leading = trivia(text, index ? list[index - 1].span.end : open, target.span.start);
    if (leading.length !== (index ? 1 : 0)) fail('OPERATION_UNSUPPORTED');
    return [edit(prepared, target.span.start, target.span.start, replacement + ',' + separator, 'insert before exact initial child')];
  }
  const last = list.at(-1)!;
  trivia(text, last.span.end, close);
  return [edit(prepared, last.span.end, last.span.end, ',' + separator + replacement, 'append preserving original suffix')];
}
function remove(text: string, prepared: PreparedOperation): readonly TextEdit[] {
  const parent = prepared.parent!, list = items(parent);
  const index = list.findIndex(item => item.node === prepared.node), item = list[index];
  if (!item) fail('OPERATION_INVALID');
  const open = parent.span.start + 1, close = parent.span.end - 1;
  // Leading, trailing or internal comments are never guessed to belong to a removed member.
  if (hasComment(text.slice(item.span.fullStart, item.span.end))) fail('COMMENT_TRIVIA_AMBIGUOUS');
  trivia(text, index ? list[index - 1].span.end : open, item.span.start);
  const trailingEnd = list[index + 1]?.span.start ?? close;
  const following = trivia(text, item.span.end, trailingEnd);
  if (index < list.length - 1) {
    if (following.length !== 1) fail('OPERATION_UNSUPPORTED');
    return [edit(prepared, item.span.fullStart, following[0] + 1, '', 'remove member and following separator')];
  }
  if (list.length > 1) return [edit(prepared, list[index - 1].span.end, item.span.end, '', 'remove final member and preceding separator')];
  if (following.length > 1) fail('OPERATION_UNSUPPORTED');
  return [edit(prepared, item.span.fullStart, following.length ? following[0] + 1 : item.span.end, '', 'remove only member, keep empty container')];
}
export function operationEdits(text: string, prepared: PreparedOperation): readonly TextEdit[] {
  if (prepared.noOp) return Object.freeze([]);
  const operation = prepared.operation;
  if (operation.type === 'ADD_PROPERTY' || operation.type === 'ADD_ELEMENT') return add(text, prepared);
  if (operation.type === 'REMOVE_PROPERTY' || operation.type === 'REMOVE_ELEMENT') return remove(text, prepared);
  if (operation.type === 'UPDATE_VALUE') {
    const span = prepared.node.span, original = text.slice(span.start, span.end);
    if (hasComment(original)) fail('COMMENT_TRIVIA_AMBIGUOUS');
    const quote = original.startsWith('"') ? '"' : "'";
    return [edit(prepared, span.start, span.end, serializeTree(prepared.tree!, {
      eol: '\n', indent: '', unit: '  ', multiline: false, trailingComma: false
    }, quote), 'replace complete scalar property value')];
  }
  if (operation.type !== 'REORDER_ELEMENTS') fail('OPERATION_UNSUPPORTED');
  const list = items(prepared.node), open = prepared.node.span.start + 1, close = prepared.node.span.end - 1;
  list.forEach((item, i) => trivia(text, i ? list[i - 1].span.end : open, item.span.start));
  trivia(text, list.at(-1)?.span.end ?? open, close);
  return Object.freeze(list.flatMap((slot, i) => {
    const ref = operation.order[i];
    if (ref.observedIndex === i) return [];
    const original = list[ref.observedIndex!];
    return [edit(prepared, slot.span.start, slot.span.end, text.slice(original.span.start, original.span.end), 'move original member fragment')];
  }));
}
// Internal utility, never an entry point accepting model edits. Candidate APIs derive every span.
export function applyTextEdits(text: string, input: readonly TextEdit[]): { readonly text: string; readonly edits: readonly TextEdit[] } {
  if (input.length > CANDIDATE_LIMITS.maxEdits) fail('CANDIDATE_LIMIT_EXCEEDED');
  const sorted = [...input].sort((a, b) => a.start - b.start || a.end - b.end);
  let replacementBytes = 0;
  sorted.forEach((item, index) => {
    if (!Number.isSafeInteger(item.start) || !Number.isSafeInteger(item.end) || item.start < 0
      || item.end < item.start || item.end > text.length || typeof item.replacement !== 'string') fail('EDIT_INVALID');
    const previous = sorted[index - 1];
    if (previous && (item.start < previous.end || item.start === previous.start
      || item.start === previous.end && (item.start === item.end || previous.start === previous.end))) fail('EDIT_OVERLAP');
    replacementBytes += Buffer.byteLength(item.replacement, 'utf8');
  });
  if (replacementBytes > CANDIDATE_LIMITS.maxReplacementBytes) fail('CANDIDATE_LIMIT_EXCEEDED');
  let cursor = 0, candidate = '';
  for (const item of sorted) { candidate += text.slice(cursor, item.start) + item.replacement; cursor = item.end; }
  candidate += text.slice(cursor);
  if (Buffer.byteLength(candidate, 'utf8') > CANDIDATE_LIMITS.maxCandidateBytes
    || Buffer.byteLength(candidate, 'utf8') - Buffer.byteLength(text, 'utf8') > CANDIDATE_LIMITS.maxCandidateGrowth) {
    fail('CANDIDATE_LIMIT_EXCEEDED');
  }
  return Object.freeze({ text: candidate, edits: Object.freeze(sorted.map(item => Object.freeze({ ...item }))) });
}
export function verifyOutsideEdits(original: string, candidate: string, edits: readonly TextEdit[]): void {
  let sourceCursor = 0, candidateCursor = 0;
  for (const item of edits) {
    const length = item.start - sourceCursor;
    if (!Buffer.from(original.slice(sourceCursor, item.start)).equals(Buffer.from(candidate.slice(candidateCursor, candidateCursor + length)))) {
      fail('CANDIDATE_STRUCTURE_MISMATCH');
    }
    candidateCursor += length;
    if (candidate.slice(candidateCursor, candidateCursor + item.replacement.length) !== item.replacement) fail('CANDIDATE_STRUCTURE_MISMATCH');
    candidateCursor += item.replacement.length; sourceCursor = item.end;
  }
  if (!Buffer.from(original.slice(sourceCursor)).equals(Buffer.from(candidate.slice(candidateCursor)))) fail('CANDIDATE_STRUCTURE_MISMATCH');
}
