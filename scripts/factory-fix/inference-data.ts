import { normalizeFixerData } from './fixer-json';
import { inferenceFail } from './inference-contracts';
import type { StaticData } from './static-data';
import { types } from 'node:util';

export function inferenceEnvelope(value: unknown, keys: readonly string[]): Record<string, unknown> {
  if (!value || typeof value !== 'object' || types.isProxy(value)
    || ![null, Object.prototype].includes(Object.getPrototypeOf(value))) inferenceFail('INFERENCE_INPUT_INVALID');
  const descriptors = Object.getOwnPropertyDescriptors(value), names = Reflect.ownKeys(descriptors);
  if (names.length !== keys.length || keys.some(k => !Object.hasOwn(descriptors, k))
    || names.some(k => typeof k !== 'string' || !('value' in descriptors[k]) || !descriptors[k].enumerable)) inferenceFail('INFERENCE_INPUT_INVALID');
  return Object.fromEntries(keys.map(k => [k, descriptors[k].value]));
}

// Normalize before reading a caller property: rejects Proxies, accessors, symbols,
// functions, sparse arrays and class instances without invoking supplied code.
export function inferenceRecord(value: unknown, keys: readonly string[]): Record<string, StaticData> {
  const data = normalizeFixerData(value);
  if (!data || typeof data !== 'object' || Array.isArray(data)
    || Object.keys(data).length !== keys.length || keys.some(k => !Object.hasOwn(data, k))) inferenceFail('INFERENCE_INPUT_INVALID');
  return data as Record<string, StaticData>;
}
