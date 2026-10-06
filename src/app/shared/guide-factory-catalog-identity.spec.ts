import { listFactoryGuides } from './guide-factory-catalog';
import {
  listFactoryGuideIdentities,
  projectFactoryGuideIdentity,
  resolveFactoryGuideName,
  resolveFactoryGuideNameFromIdentities
} from './guide-factory-catalog-identity';
import type { FactoryGuideIdentity } from './guide-factory-catalog-identity';

describe('Factory guide catalog identity', () => {
  it('projects every current entry in catalog order with exact paths and only identity fields', () => {
    const entries = listFactoryGuides();
    const identities = listFactoryGuideIdentities();
    expect(identities.length).toBe(entries.length);
    expect(new Set(identities.map(identity => identity.path)).size).toBe(entries.length);
    identities.forEach((identity, index) => {
      expect(identity.path).toBe(entries[index].path);
      expect(Object.keys(identity).sort()).toEqual(['name', 'path']);
      expect(identity).not.toBe(entries[index] as unknown as FactoryGuideIdentity);
    });
  });

  it('observes valid original names in all current catalog entries', () => {
    const entries = listFactoryGuides();
    listFactoryGuideIdentities().forEach((identity, index) => {
      const name = (entries[index].guide as { nombre: unknown }).nombre;
      expect(typeof name).toBe('string');
      expect((name as string).trim().length).toBeGreaterThan(0);
      expect(identity.name).toBe(name as string);
    });
  });

  it('returns fresh arrays and identity objects on every list', () => {
    const first = listFactoryGuideIdentities();
    const second = listFactoryGuideIdentities();
    expect(first).toEqual(second);
    expect(first).not.toBe(second);
    first.forEach((identity, index) => expect(identity).not.toBe(second[index]));
  });

  const invalidGuides: readonly unknown[] = [
    null, undefined, [], Object.assign([], { nombre: 'Array label' }), {}, 7, 'Guide',
    { nombre: 7 }, { nombre: null }, { nombre: '' }, { nombre: ' \t\n ' },
    Object.create({ nombre: 'Inherited label' })
  ];
  invalidGuides.forEach((guide, index) => {
    it(`projects invalid or inherited guide name ${index} to null without inventing a label`, () => {
      const entry = Object.freeze({ path: ' Exact/path/ ', guide });
      const identity = projectFactoryGuideIdentity(entry);
      expect(identity).toEqual({ path: ' Exact/path/ ', name: null });
      expect(Object.keys(identity).sort()).toEqual(['name', 'path']);
    });
  });

  it('preserves a valid original name and literal path from frozen objects', () => {
    const guide = Object.freeze({ nombre: '  COPENHAGUE\t', hasOwnProperty: null });
    const entry = Object.freeze({ path: ' Exact/PATH/ ', guide });
    const before = JSON.stringify(entry);
    const identity = projectFactoryGuideIdentity(entry);
    expect(identity).toEqual({ path: entry.path, name: guide.nombre });
    expect(JSON.stringify(entry)).toBe(before);
    const result = resolveFactoryGuideNameFromIdentities('copenhague', Object.freeze([identity]));
    expect(result).toEqual({ resolution: 'MATCH', entry: { path: entry.path, name: guide.nombre } });
    if (result.resolution !== 'MATCH') fail('Expected MATCH');
    else expect(result.entry === identity).toBeFalse();
  });

  const matches: readonly (readonly [string, string])[] = [
    ['Copenhague', 'Copenhague'],
    ['COPENHAGUE', 'Copenhague'],
    [' \tCopenhague\n ', 'Copenhague'],
    ['Cádiz', 'Cádiz'],
    ['Ca\u0301diz', 'Cádiz'],
    ['Río de Janeiro', 'Río de Janeiro'],
    ['Malmö', 'Malmö'],
    ['Jerez de la Frontera', 'Jerez de la Frontera'],
    ['La Valeta', 'La Valeta'],
    ['Roma y Ciudad del Vaticano', 'Roma y Ciudad del Vaticano'],
    ['Sanlúcar de Barrameda', 'Sanlúcar de Barrameda']
  ];
  matches.forEach(([query, originalName]) => {
    it(`matches the whole normalized name ${JSON.stringify(query)} while preserving original identity`, () => {
      const identity = listFactoryGuideIdentities().find(entry => entry.name === originalName)!;
      expect(identity).toBeDefined();
      const result = resolveFactoryGuideName(query);
      expect(result).toEqual({ resolution: 'MATCH', entry: { path: identity.path, name: originalName } });
      expect(Object.keys(result).sort()).toEqual(['entry', 'resolution']);
      if (result.resolution !== 'MATCH') fail('Expected MATCH');
      else {
        expect(Object.keys(result.entry).sort()).toEqual(['name', 'path']);
        expect(result.entry.name).toBe(originalName);
        expect(result.entry.path).toBe(identity.path);
      }
    });
  });

  ['Jerez', 'Malta', 'Roma', 'Rio de Janeiro', 'Malmo', 'Cadiz',
    'Sanlucar de Barrameda', 'La  Valeta', 'unknown destination'].forEach(query => {
    it(`returns only NOT_FOUND for ${JSON.stringify(query)} without aliases or suggestions`, () => {
      const result = resolveFactoryGuideName(query);
      expect(result).toEqual({ resolution: 'NOT_FOUND' });
      expect(Object.keys(result)).toEqual(['resolution']);
    });
  });

  it('does not resolve names by path', () => {
    const identity = listFactoryGuideIdentities().find(entry => entry.name === 'Copenhague')!;
    expect(resolveFactoryGuideName(identity.path)).toEqual({ resolution: 'NOT_FOUND' });
  });

  [null, undefined, 7, {}, [], new String('Copenhague'), '', ' \t\n '].forEach((input, index) => {
    it(`throws TypeError for invalid name input ${index} in both resolution functions`, () => {
      expect(() => resolveFactoryGuideName(input as unknown as string)).toThrowError(TypeError);
      expect(() => resolveFactoryGuideNameFromIdentities(input as unknown as string, []))
        .toThrowError(TypeError);
    });
  });

  it('returns all ambiguous case/NFC matches in source order with original names and fresh projections', () => {
    const identities = Object.freeze([
      Object.freeze({ path: 'z/first', name: 'CA\u0301DIZ', extra: 'must not leak' }),
      Object.freeze({ path: 'unrelated', name: 'Copenhague' }),
      Object.freeze({ path: 'a/second', name: ' Cádiz ' }),
      Object.freeze({ path: 'missing', name: null }),
      Object.freeze({ path: 'm/third', name: 'cádiz' })
    ]);
    const before = JSON.stringify(identities);
    const result = resolveFactoryGuideNameFromIdentities('CÁDIZ', identities);
    expect(result).toEqual({
      resolution: 'AMBIGUOUS',
      candidates: [
        { path: 'z/first', name: 'CA\u0301DIZ' },
        { path: 'a/second', name: ' Cádiz ' },
        { path: 'm/third', name: 'cádiz' }
      ]
    });
    expect(Object.keys(result).sort()).toEqual(['candidates', 'resolution']);
    if (result.resolution !== 'AMBIGUOUS') fail('Expected AMBIGUOUS');
    else result.candidates.forEach((candidate, index) => {
      expect(Object.keys(candidate).sort()).toEqual(['name', 'path']);
      expect(candidate === identities[[0, 2, 4][index]]).toBeFalse();
    });
    expect(JSON.stringify(identities)).toBe(before);
  });

  it('ignores null and empty names and handles an empty collection', () => {
    const identities: readonly FactoryGuideIdentity[] = Object.freeze([
      Object.freeze({ path: 'unknown', name: null }),
      Object.freeze({ path: 'blank', name: ' \t ' }),
      Object.freeze({ path: 'empty', name: '' })
    ]);
    expect(resolveFactoryGuideNameFromIdentities('unknown', identities))
      .toEqual({ resolution: 'NOT_FOUND' });
    expect(resolveFactoryGuideNameFromIdentities('Copenhague', Object.freeze([])))
      .toEqual({ resolution: 'NOT_FOUND' });
  });

  it('does not apply compatibility normalization or full Unicode case folding', () => {
    const identities = Object.freeze([
      Object.freeze({ path: 'sharp-s', name: 'Straße' }),
      Object.freeze({ path: 'fullwidth', name: 'Ｃopenhague' })
    ]);
    expect(resolveFactoryGuideNameFromIdentities('STRASSE', identities))
      .toEqual({ resolution: 'NOT_FOUND' });
    expect(resolveFactoryGuideNameFromIdentities('Copenhague', identities))
      .toEqual({ resolution: 'NOT_FOUND' });
  });

  it('does not mutate catalog entries, guides or order when listing and resolving', () => {
    const entries = listFactoryGuides();
    const originalEntries = [...entries];
    const before = entries.map(entry => JSON.stringify(entry.guide));
    const identities = listFactoryGuideIdentities();
    identities.forEach(identity => {
      if (identity.name !== null) resolveFactoryGuideName(identity.name);
    });
    listFactoryGuideIdentities();
    expect(listFactoryGuides()).toBe(entries);
    expect(entries.map(entry => JSON.stringify(entry.guide))).toEqual(before);
    entries.forEach((entry, index) => expect(entry).toBe(originalEntries[index]));
    expect(listFactoryGuideIdentities()).toEqual(identities);
  });
});
