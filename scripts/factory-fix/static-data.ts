import { fail } from './errors';
import { type CanonicalValue } from './fingerprint';
import { READ_LIMITS, type GuideNode, type StaticScalar } from './snapshot-contracts';

export type StaticData = StaticScalar | readonly StaticData[] | { readonly [key: string]: StaticData };
export type DataTree =
  | { readonly kind: 'scalar'; readonly value: StaticScalar }
  | { readonly kind: 'object'; readonly properties: readonly { readonly name: string; readonly tree: DataTree }[] }
  | { readonly kind: 'array'; readonly elements: readonly DataTree[] };

export function assertPropertyName(name: unknown): asserts name is string {
  if (typeof name !== 'string' || name.length > READ_LIMITS.maxStringLength
    || ['__proto__', 'prototype', 'constructor'].includes(name)) fail('VALUE_UNSUPPORTED');
}

// Copy data descriptors, never call accessors or toJSON. Own-key order is a technical
// serialization policy, not an editorial order for unruled collections.
export function normalizeStaticData(input: unknown): StaticData {
  let nodes = 0, strings = 0;
  const ancestors = new Set<object>();
  const countString = (value: string): void => {
    strings += value.length;
    if (value.length > READ_LIMITS.maxStringLength || strings > READ_LIMITS.maxTotalStringLength) {
      fail('CANDIDATE_LIMIT_EXCEEDED');
    }
  };
  const read = (value: unknown, depth: number): StaticData => {
    if (++nodes > READ_LIMITS.maxNodes || depth > READ_LIMITS.maxDepth) fail('CANDIDATE_LIMIT_EXCEEDED');
    if (value === null || typeof value === 'boolean') return value;
    if (typeof value === 'string') { countString(value); return value; }
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value !== 'object' || value === null || ancestors.has(value)) fail('VALUE_UNSUPPORTED');
    const prototype = Object.getPrototypeOf(value);
    const array = Array.isArray(value);
    if (array ? prototype !== Array.prototype : prototype !== null && prototype !== Object.prototype) {
      fail('VALUE_UNSUPPORTED');
    }
    const keys = Reflect.ownKeys(value);
    const descriptors = Object.getOwnPropertyDescriptors(value);
    if (keys.some(key => typeof key !== 'string' || !('value' in descriptors[key])
      || !(array && key === 'length') && !descriptors[key].enumerable)) fail('VALUE_UNSUPPORTED');
    // Compiler nodes are never accepted as structured payloads, even plain fabricated nodes.
    if (!array && typeof descriptors['kind']?.value === 'number'
      && typeof descriptors['pos']?.value === 'number' && typeof descriptors['end']?.value === 'number') {
      fail('VALUE_UNSUPPORTED');
    }
    ancestors.add(value);
    let result: StaticData;
    if (array) {
      if (value.length > READ_LIMITS.maxArrayElements) fail('CANDIDATE_LIMIT_EXCEEDED');
      if (keys.length !== value.length + 1 || keys.some(key => key !== 'length'
        && (typeof key !== 'string' || !/^(0|[1-9][0-9]*)$/.test(key) || Number(key) >= value.length))) {
        fail('VALUE_UNSUPPORTED');
      }
      result = Object.freeze(Array.from({ length: value.length }, (_, index) => {
        const descriptor = descriptors[String(index)];
        if (!descriptor || !('value' in descriptor)) fail('VALUE_UNSUPPORTED');
        return read(descriptor.value, depth + 1);
      }));
    } else {
      if (keys.length > READ_LIMITS.maxObjectProperties) fail('CANDIDATE_LIMIT_EXCEEDED');
      const object: Record<string, StaticData> = Object.create(null);
      for (const key of keys) {
        assertPropertyName(key); countString(key);
        object[key] = read(descriptors[key].value, depth + 1);
      }
      result = Object.freeze(object);
    }
    ancestors.delete(value);
    return result;
  };
  return read(input, 0);
}

export function dataTree(value: StaticData): DataTree {
  if (value === null || typeof value !== 'object') return Object.freeze({ kind: 'scalar', value });
  if (Array.isArray(value)) return Object.freeze({ kind: 'array', elements: Object.freeze(value.map(dataTree)) });
  return Object.freeze({ kind: 'object', properties: Object.freeze(Object.keys(value).map(name =>
    Object.freeze({ name, tree: dataTree((value as Record<string, StaticData>)[name]) }))) });
}
export function guideTree(node: GuideNode): DataTree {
  if ('value' in node) return Object.freeze({ kind: 'scalar', value: node.value });
  if (node.nodeKind === 'array') return Object.freeze({ kind: 'array', elements: Object.freeze(node.elements.map(guideTree)) });
  return Object.freeze({ kind: 'object', properties: Object.freeze(node.properties.map(p =>
    Object.freeze({ name: p.name, tree: guideTree(p.node) }))) });
}
export function treeTuple(tree: DataTree): CanonicalValue {
  if (tree.kind === 'scalar') return ['scalar', tree.value === null ? 'null' : typeof tree.value,
    Object.is(tree.value, -0) ? ['negative-zero'] : tree.value];
  if (tree.kind === 'array') return ['array', tree.elements.map(treeTuple)];
  return ['object', tree.properties.map(p => [p.name, treeTuple(p.tree)])];
}
export function sameTree(a: DataTree, b: DataTree): boolean {
  return JSON.stringify(treeTuple(a)) === JSON.stringify(treeTuple(b));
}
