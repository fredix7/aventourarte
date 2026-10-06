import { fail, SourceIdentityError } from './errors';
import { normalizeStaticData, dataTree, treeTuple, type StaticData } from './static-data';
import { digest } from './fingerprint';
import { hasExactKeys } from './validation';
import { AUTHORIZATION_LIMITS } from './authorization-contracts';

export function record(value: unknown, keys: readonly string[]): Record<string, unknown> {
  if (!hasExactKeys(value, keys) || ![null, Object.prototype].includes(Object.getPrototypeOf(value))
    || keys.some(key => !Object.getOwnPropertyDescriptor(value, key)?.enumerable)) fail('AUTHORIZATION_INVALID');
  return value;
}
export function authData(value: unknown): unknown {
  try {
    const normalized = normalizeStaticData(value);
    if (Buffer.byteLength(JSON.stringify(normalized), 'utf8') > AUTHORIZATION_LIMITS.maxSerializedBytes) fail('AUTHORIZATION_LIMIT_EXCEEDED');
    return normalized;
  } catch (error) {
    if (error instanceof SourceIdentityError && error.code === 'AUTHORIZATION_LIMIT_EXCEEDED') throw error;
    if (error instanceof SourceIdentityError && error.code === 'CANDIDATE_LIMIT_EXCEEDED') fail('AUTHORIZATION_LIMIT_EXCEEDED');
    fail('AUTHORIZATION_INVALID');
  }
}
export function boundedText(value: unknown, max: number = AUTHORIZATION_LIMITS.maxMetadataString, nonempty = true): string {
  if (typeof value !== 'string' || nonempty && !value.trim()) fail('AUTHORIZATION_INVALID');
  if (value.length > max) fail('AUTHORIZATION_LIMIT_EXCEEDED');
  return value;
}
export function identifier(value: unknown): string {
  const text = boundedText(value, 128);
  if (!/^[A-Za-z0-9][A-Za-z0-9_.:-]*(?![\s\S])/.test(text)) fail('AUTHORIZATION_INVALID');
  return text;
}
export function list(value: unknown, max: number): readonly unknown[] {
  if (!Array.isArray(value)) fail('AUTHORIZATION_INVALID');
  if (value.length > max) fail('AUTHORIZATION_LIMIT_EXCEEDED');
  // Inputs to these helpers have already been descriptor-only normalized by authData.
  return value;
}
export function strings(value: unknown, max: number, ids = false): readonly string[] {
  const result = list(value, max).map(item => ids ? identifier(item) : boundedText(item));
  if (ids && new Set(result).size !== result.length) fail('AUTHORIZATION_INVALID');
  return Object.freeze(result);
}
export function authDigest(value: unknown): string {
  return digest(treeTuple(dataTree(authData(value) as StaticData)));
}
