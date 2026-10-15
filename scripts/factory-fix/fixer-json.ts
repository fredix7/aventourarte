import { digest, type CanonicalValue } from './fingerprint';
import { types } from 'node:util';
import { FIXER_LIMITS, FixerError } from './fixer-contracts';
import { SourceIdentityError } from './errors';
import { READ_LIMITS } from './snapshot-contracts';
import { AUTHORIZATION_LIMITS } from './authorization-contracts';
import { normalizeStaticData, type StaticData } from './static-data';

// Phase 8 accepts inert data only. Descriptor inspection alone is insufficient for Proxies:
// even getPrototypeOf/ownKeys can execute caller code before the legacy data normalizer runs.
export function normalizeFixerData(input: unknown): StaticData {
  let nodes = 0; const ancestors = new Set<object>();
  const invalid = (): never => { throw new FixerError('PLAN_INVALID'); };
  const limit = (): never => { throw new FixerError('OUTPUT_LIMIT_EXCEEDED'); };
  const inspect = (value: unknown, depth: number): void => {
    if (++nodes > READ_LIMITS.maxNodes || depth > READ_LIMITS.maxDepth) limit();
    if (typeof value === 'string') { if (!wellFormed(value)) invalid(); return; }
    if (value === null || typeof value !== 'object') return;
    if (types.isProxy(value) || ancestors.has(value)) invalid();
    const array = Array.isArray(value), prototype = Object.getPrototypeOf(value);
    if (array ? prototype !== Array.prototype : prototype !== null && prototype !== Object.prototype) invalid();
    const keys = Reflect.ownKeys(value);
    if (keys.length > (array ? READ_LIMITS.maxArrayElements + 1 : READ_LIMITS.maxObjectProperties)) limit();
    const descriptors = Object.getOwnPropertyDescriptors(value);
    ancestors.add(value);
    for (const key of keys) {
      if (typeof key !== 'string' || !wellFormed(key)) return invalid();
      const descriptor = descriptors[key];
      if (!('value' in descriptor) || !(array && key === 'length') && !descriptor.enumerable) invalid();
      if (!(array && key === 'length')) inspect(descriptor.value, depth + 1);
    }
    ancestors.delete(value);
  };
  try { inspect(input, 0); return normalizeStaticData(input); }
  catch (error) {
    if (error instanceof FixerError) throw error;
    if (error instanceof SourceIdentityError) {
      throw new FixerError(error.code === 'CANDIDATE_LIMIT_EXCEEDED' ? 'OUTPUT_LIMIT_EXCEEDED' : 'PLAN_INVALID');
    }
    throw new FixerError('INFRASTRUCTURE_ERROR');
  }
}
// Ordered tuples with sorted record keys; arrays and signed zero keep their meaning.
export function fixerFingerprint(value: unknown): string {
  const tuple = (v: StaticData): CanonicalValue => {
    if (v === null || typeof v !== 'object') return ['scalar', typeof v, Object.is(v, -0) ? ['-0'] : v];
    if (Array.isArray(v)) return ['array', v.map(tuple)];
    return ['record', Object.keys(v).sort().map(k => [k, tuple((v as Record<string, StaticData>)[k])])];
  };
  return digest(['fixer-canonical', 1, tuple(normalizeFixerData(value))]);
}
// Canonical JSON also preserves -0, unlike JSON.stringify of an entire object.
export function serializeFixerData(value: unknown): string {
  const data = normalizeFixerData(value), tokens: string[] = []; let bytes = 0;
  const emit = (token: string): void => {
    bytes += Buffer.byteLength(token, 'utf8');
    if (bytes > AUTHORIZATION_LIMITS.maxSerializedBytes) throw new FixerError('OUTPUT_LIMIT_EXCEEDED');
    tokens.push(token);
  };
  const encode = (v: StaticData): void => {
    if (v === null || typeof v !== 'object') { emit(Object.is(v, -0) ? '-0' : JSON.stringify(v)); return; }
    const array = Array.isArray(v), keys = array ? v.map((_, i) => String(i)) : Object.keys(v).sort();
    emit(array ? '[' : '{');
    keys.forEach((key, i) => {
      if (i) emit(','); if (!array) { emit(JSON.stringify(key)); emit(':'); }
      encode((v as Record<string, StaticData>)[key]);
    });
    emit(array ? ']' : '}');
  };
  encode(data); return tokens.join('');
}
function wellFormed(text: string): boolean {
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c >= 0xd800 && c <= 0xdbff) {
      const next = text.charCodeAt(++i); if (!(next >= 0xdc00 && next <= 0xdfff)) return false;
    } else if (c >= 0xdc00 && c <= 0xdfff) return false;
  }
  return true;
}
export function isFixerText(value: unknown, max: number, multiline = true): value is string {
  return typeof value === 'string' && value.length <= max && wellFormed(value)
    && !(multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/ : /[\u0000-\u001f\u007f]/).test(value);
}
// Parse directly rather than JSON.parse + reviver: revivers cannot detect duplicate keys.
// Only bounded strings enter this parser; it has no IO, evaluation, callbacks or tooling.
export function decodeFixerJson(text: unknown): StaticData {
  const bad = (): never => { throw new FixerError('JSON_MALFORMED'); };
  const limit = (): never => { throw new FixerError('OUTPUT_LIMIT_EXCEEDED'); };
  if (typeof text !== 'string') return bad();
  if (text.length > FIXER_LIMITS.maxResponseBytes || Buffer.byteLength(text, 'utf8') > FIXER_LIMITS.maxResponseBytes) return limit();
  let at = 0, nodes = 0;
  const ws = (): void => { while (/[ \r\n\t]/.test(text[at] ?? 'x')) at++; };
  const string = (): string => {
    const start = at++; let escaped = false;
    while (at < text.length) {
      const c = text[at++];
      if (!escaped && c === '"') {
        let result: unknown;
        try { result = JSON.parse(text.slice(start, at)); } catch { return bad(); }
        if (!isFixerText(result, FIXER_LIMITS.maxStringLength)) {
          if (typeof result === 'string' && result.length > FIXER_LIMITS.maxStringLength) return limit();
          return bad();
        }
        return result;
      }
      if (!escaped && c === '\\') escaped = true; else escaped = false;
      if (at - start > FIXER_LIMITS.maxStringLength * 6 + 2) return limit();
    }
    return bad();
  };
  const read = (depth: number): StaticData => {
    if (++nodes > FIXER_LIMITS.maxNodes || depth > FIXER_LIMITS.maxDepth) return limit();
    ws(); const c = text[at];
    if (c === '"') return string();
    if (c === '{') {
      at++; ws(); const object: Record<string, StaticData> = Object.create(null), keys = new Set<string>();
      if (text[at] === '}') { at++; return Object.freeze(object); }
      while (at < text.length) {
        ws(); if (text[at] !== '"') return bad(); const key = string();
        if (keys.has(key) || ['__proto__', 'prototype', 'constructor'].includes(key)) return bad();
        keys.add(key); if (keys.size > FIXER_LIMITS.maxObjectKeys) return limit();
        ws(); if (text[at++] !== ':') return bad(); object[key] = read(depth + 1); ws();
        const end = text[at++]; if (end === '}') return Object.freeze(object); if (end !== ',') return bad();
      }
      return bad();
    }
    if (c === '[') {
      at++; ws(); const array: StaticData[] = [];
      if (text[at] === ']') { at++; return Object.freeze(array); }
      while (at < text.length) {
        if (array.length >= FIXER_LIMITS.maxArrayLength) return limit();
        array.push(read(depth + 1)); ws(); const end = text[at++];
        if (end === ']') return Object.freeze(array); if (end !== ',') return bad();
      }
      return bad();
    }
    for (const [literal, value] of [['null', null], ['true', true], ['false', false]] as const) {
      if (text.startsWith(literal, at)) { at += literal.length; return value; }
    }
    const match = /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/.exec(text.slice(at));
    if (!match || match[0].length > 128) return bad();
    at += match[0].length; const number = Number(match[0]);
    if (!Number.isFinite(number) || Number.isInteger(number) && !Number.isSafeInteger(number)
      || number === 0 && /[1-9]/.test(match[0].split(/[eE]/)[0])) return bad();
    // Keep ordinary JSON decimals/exponents but reject extra precision silently rounded by
    // Number(), including a fractional contract version that would otherwise become 1.
    const decimal = (token: string): string => {
      const [mantissa, exponent = '0'] = token.toLowerCase().split('e');
      const [integer, fraction = ''] = mantissa.split('.');
      let coefficient = (integer + fraction).replace(/^-/, '').replace(/^0+/, '');
      let scale = Number(exponent) - fraction.length;
      while (coefficient.endsWith('0')) { coefficient = coefficient.slice(0, -1); scale++; }
      return (token.startsWith('-') ? '-' : '') + coefficient + 'e' + scale;
    };
    if (number !== 0 && decimal(match[0]) !== decimal(String(number))) return bad();
    return number;
  };
  const result = read(0); ws(); if (at !== text.length) return bad(); return result;
}
