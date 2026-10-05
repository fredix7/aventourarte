import { getFactoryGuide, listFactoryGuides } from './guide-factory-catalog';
import type { FactoryGuideEntry } from './guide-factory-catalog';
import { CADIZ_GUIDE } from '../guides/europa/espana/andalucia/cadiz/cadiz.guide';
import { CHIPIONA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/chipiona.guide';
import { JEREZ_GUIDE } from '../guides/europa/espana/andalucia/cadiz/jerez.guide';
import { ROTA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/rota.guide';
import { SAN_FERNANDO_GUIDE } from '../guides/europa/espana/andalucia/cadiz/san-fernando.guide';
import { SANLUCAR_BARRAMEDA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/sanlucar-barrameda.guide';
import { TREBUJENA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/trebujena.guide';
import { VEJER_GUIDE } from '../guides/europa/espana/andalucia/cadiz/vejer.guide';
import { ALMENSILLA_GUIDE } from '../guides/europa/espana/andalucia/sevilla/almensilla.guide';
import { CORIA_GUIDE } from '../guides/europa/espana/andalucia/sevilla/coria.guide';
import { MAIRENA_ALJARAFE_GUIDE } from '../guides/europa/espana/andalucia/sevilla/mairena-aljarafe.guide';
import { COPENHAGUE_GUIDE } from '../guides/europa/dinamarca/copenhague.guide';
import { MALMO_GUIDE } from '../guides/europa/suecia/malmo.guide';
import { MALTA_GUIDE } from '../guides/europa/malta/malta.guide';
import { ROMA_VATICANO_GUIDE } from '../guides/europa/italia/roma-vaticano.guide';
import { BUCAREST_GUIDE } from '../guides/europa/rumania/bucarest.guide';
import { RIO_DE_JANEIRO_GUIDE } from '../guides/america/sudamerica/brasil/rio-janeiro.guide';

describe('Factory guide catalog', () => {
  const spanishGuides = [
    CADIZ_GUIDE, CHIPIONA_GUIDE, JEREZ_GUIDE, ROTA_GUIDE, SAN_FERNANDO_GUIDE,
    SANLUCAR_BARRAMEDA_GUIDE, TREBUJENA_GUIDE, VEJER_GUIDE,
    ALMENSILLA_GUIDE, CORIA_GUIDE, MAIRENA_ALJARAFE_GUIDE
  ];
  const internationalGuides = [
    COPENHAGUE_GUIDE, MALMO_GUIDE, MALTA_GUIDE, ROMA_VATICANO_GUIDE,
    BUCAREST_GUIDE, RIO_DE_JANEIRO_GUIDE
  ];
  const expectedGuides = [...spanishGuides, ...internationalGuides];

  it('lists exactly the 17 expected guides in explicit order', () => {
    const entries = listFactoryGuides();
    expect(entries.length).toBe(17);
    entries.forEach((entry, index) => expect(entry.guide).toBe(expectedGuides[index]));
  });

  it('uses unique non-empty string paths taken exactly from the guide objects', () => {
    const entries = listFactoryGuides();
    expect(new Set(entries.map(entry => entry.path)).size).toBe(17);
    entries.forEach(entry => {
      expect(typeof entry.path).toBe('string');
      expect(entry.path.trim().length).toBeGreaterThan(0);
      expect(entry.path).toBe((entry.guide as { path: string }).path);
    });
  });

  it('exposes only path, guide and ruleSet on each entry', () => {
    listFactoryGuides().forEach(entry =>
      expect(Object.keys(entry).sort()).toEqual(['guide', 'path', 'ruleSet'])
    );
  });

  expectedGuides.forEach(guide => {
    it(`resolves ${guide.path} to the same entry and original guide reference`, () => {
      const entry = listFactoryGuides().find(candidate => candidate.guide === guide);
      expect(entry).toBeDefined();
      expect(getFactoryGuide(guide.path)).toBe(entry);
      expect(getFactoryGuide(guide.path)?.guide).toBe(guide);
    });
  });

  spanishGuides.forEach(guide => {
    it(`assigns spanish-municipal explicitly to ${guide.nombre}`, () => {
      expect(getFactoryGuide(guide.path)?.ruleSet).toBe('spanish-municipal');
    });
  });

  internationalGuides.forEach(guide => {
    it(`assigns generic explicitly to ${guide.nombre}`, () => {
      expect(getFactoryGuide(guide.path)?.ruleSet).toBe('generic');
    });
  });

  it('includes Río, resolves its own path and assigns generic', () => {
    const entry = listFactoryGuides().find(candidate => candidate.guide === RIO_DE_JANEIRO_GUIDE);
    expect(entry).toBeDefined();
    expect(getFactoryGuide(RIO_DE_JANEIRO_GUIDE.path)).toBe(entry);
    expect(entry?.guide).toBe(RIO_DE_JANEIRO_GUIDE);
    expect(entry?.ruleSet).toBe('generic');
  });

  ['unknown/path', '', 'toString', '__proto__', 'constructor', 'Jerez', 'Jerez de la Frontera']
    .forEach(path => {
      it(`returns undefined for the unknown exact path ${JSON.stringify(path)}`, () => {
        expect(getFactoryGuide(path)).toBeUndefined();
      });
    });

  [
    JEREZ_GUIDE.path.toUpperCase(),
    ` ${JEREZ_GUIDE.path}`,
    `${JEREZ_GUIDE.path} `,
    `/${JEREZ_GUIDE.path}`,
    `${JEREZ_GUIDE.path}/`
  ].forEach(path => {
    it(`does not normalize ${JSON.stringify(path)}`, () => {
      expect(getFactoryGuide(JEREZ_GUIDE.path)?.guide).toBe(JEREZ_GUIDE);
      expect(getFactoryGuide(path)).toBeUndefined();
    });
  });

  it('returns a frozen array and frozen entries', () => {
    expect(Object.isFrozen(listFactoryGuides())).toBeTrue();
    listFactoryGuides().forEach(entry => expect(Object.isFrozen(entry)).toBeTrue());
  });

  it('prevents adding or deleting entries in the internal array', () => {
    const entries = listFactoryGuides();
    const before = [...entries];
    const mutable = entries as FactoryGuideEntry[];
    expect(() => mutable.push(entries[0])).toThrowError(TypeError);
    expect(() => mutable.pop()).toThrowError(TypeError);
    expect(() => mutable.splice(0, 1)).toThrowError(TypeError);
    expect(listFactoryGuides()).toEqual(before);
  });

  it('prevents replacing array entries or changing entry properties', () => {
    const entries = listFactoryGuides();
    expect(Reflect.set(entries, '0', entries[1])).toBeFalse();
    expect(Reflect.set(entries[0], 'path', 'changed')).toBeFalse();
    expect(Reflect.set(entries[0], 'guide', {})).toBeFalse();
    expect(Reflect.set(entries[0], 'ruleSet', 'generic')).toBeFalse();
    expect(getFactoryGuide(CADIZ_GUIDE.path)).toBe(entries[0]);
    expect(entries[0].guide).toBe(CADIZ_GUIDE);
    expect(entries[0].ruleSet).toBe('spanish-municipal');
  });

  it('does not freeze or clone the original guides or their section arrays', () => {
    expectedGuides.forEach(guide => {
      expect(getFactoryGuide(guide.path)?.guide).toBe(guide);
      expect(Object.isFrozen(guide)).toBeFalse();
      expect(Object.isFrozen(guide.secciones)).toBeFalse();
    });
  });

  it('does not mutate any guide when listing or resolving', () => {
    const before = expectedGuides.map(guide => JSON.stringify(guide));
    listFactoryGuides().forEach(entry => getFactoryGuide(entry.path));
    listFactoryGuides();
    expect(expectedGuides.map(guide => JSON.stringify(guide))).toEqual(before);
  });

  it('keeps deterministic order across repeated lists and lookups', () => {
    const before = listFactoryGuides().map(entry => entry.path);
    [...before].reverse().forEach(path => getFactoryGuide(path));
    getFactoryGuide('unknown/path');
    expect(listFactoryGuides().map(entry => entry.path)).toEqual(before);
    expect(listFactoryGuides().map(entry => entry.path)).toEqual(expectedGuides.map(guide => guide.path));
  });
});
