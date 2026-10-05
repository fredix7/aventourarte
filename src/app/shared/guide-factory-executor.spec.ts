import { executeFactoryQa } from './guide-factory-executor';
import type { FactoryQaExecution } from './guide-factory-executor';
import { getFactoryGuide } from './guide-factory-catalog';
import { runFactoryQa } from './guide-factory-runner';
import type { FactoryReviewContext } from './guide-factory-context';
import { JEREZ_GUIDE } from '../guides/europa/espana/andalucia/cadiz/jerez.guide';
import { COPENHAGUE_GUIDE } from '../guides/europa/dinamarca/copenhague.guide';
import { RIO_DE_JANEIRO_GUIDE } from '../guides/america/sudamerica/brasil/rio-janeiro.guide';

describe('executeFactoryQa', () => {
  const fullGuide: FactoryReviewContext = { scope: 'guide' };
  const cases = [
    { guide: JEREZ_GUIDE, ruleSet: 'spanish-municipal' },
    { guide: COPENHAGUE_GUIDE, ruleSet: 'generic' },
    { guide: RIO_DE_JANEIRO_GUIDE, ruleSet: 'generic' }
  ] as const;

  for (const { guide, ruleSet } of cases) {
    it(`resolves the original catalog identity and ruleSet for ${guide.nombre}`, () => {
      const entry = getFactoryGuide(guide.path)!;
      expect(entry).toBeDefined();
      expect(entry.guide).toBe(guide);
      const expected = runFactoryQa(entry.guide, fullGuide, entry.ruleSet);
      const execution: FactoryQaExecution | undefined = executeFactoryQa(guide.path, fullGuide);
      expect(execution).toBeDefined();
      expect(execution?.path).toBe(entry.path);
      expect(execution?.path).toBe(guide.path);
      expect(execution?.ruleSet).toBe(ruleSet);
      expect(execution?.ruleSet).toBe(entry.ruleSet);
      expect(execution?.result).toEqual(expected);
    });

    it(`preserves guide and catalog entry during execution for ${guide.nombre}`, () => {
      const entry = getFactoryGuide(guide.path)!;
      const before = JSON.stringify(guide);
      const sections = guide.secciones;
      const context = Object.freeze({ scope: 'guide' as const });
      executeFactoryQa(guide.path, context);
      expect(JSON.stringify(guide)).toBe(before);
      expect(guide.secciones).toBe(sections);
      expect(getFactoryGuide(guide.path)).toBe(entry);
      expect(entry.guide).toBe(guide);
      expect(entry.path).toBe(guide.path);
      expect(entry.ruleSet).toBe(ruleSet);
      expect(context).toEqual({ scope: 'guide' });
    });
  }

  it('returns only path, ruleSet and result without exposing content or context', () => {
    const execution = executeFactoryQa(JEREZ_GUIDE.path, fullGuide)!;
    expect(Object.keys(execution).sort()).toEqual(['path', 'result', 'ruleSet']);
    for (const field of ['guide', 'entry', 'context', 'nombre', 'filename', 'timestamp']) {
      expect(Object.prototype.hasOwnProperty.call(execution, field)).toBeFalse();
    }
  });

  it('passes a real dish target to the runner without widening the review', () => {
    const entry = getFactoryGuide(JEREZ_GUIDE.path)!;
    const location = 'secciones[3].platos[0]';
    const context: FactoryReviewContext = { scope: 'targets', targets: [location] };
    const expected = runFactoryQa(entry.guide, context, entry.ruleSet);
    const execution = executeFactoryQa(entry.path, context);
    expect(execution?.result).toEqual(expected);
    expect(execution?.path).toBe(entry.path);
    expect(execution?.ruleSet).toBe(entry.ruleSet);
  });

  it('passes an exact itinerary field target on a real generic guide without promoting scope', () => {
    const entry = getFactoryGuide(COPENHAGUE_GUIDE.path)!;
    const context: FactoryReviewContext = {
      scope: 'targets', targets: ['secciones[2].itinerario[0].zonas[0].maps']
    };
    expect(executeFactoryQa(entry.path, context)?.result)
      .toEqual(runFactoryQa(entry.guide, context, entry.ruleSet));
  });

  for (const { guide } of cases) {
    it(`keeps empty explicit targets valid for ${guide.nombre}`, () => {
      const entry = getFactoryGuide(guide.path)!;
      const context: FactoryReviewContext = { scope: 'targets', targets: [] };
      expect(executeFactoryQa(entry.path, context)?.result)
        .toEqual(runFactoryQa(entry.guide, context, entry.ruleSet));
      expect(executeFactoryQa(entry.path, context)?.result.issues).toEqual([]);
    });
  }

  const unknownPaths = ['unknown/path', '', 'Jerez', 'Jerez de la Frontera',
    JEREZ_GUIDE.path.toUpperCase(), ` ${JEREZ_GUIDE.path}`, `${JEREZ_GUIDE.path} `,
    `/${JEREZ_GUIDE.path}`, `${JEREZ_GUIDE.path}/`,
    JEREZ_GUIDE.path.replace('/', '//'), 'toString', '__proto__', 'constructor'];
  for (const path of unknownPaths) {
    it(`returns undefined for the exact unresolved path ${JSON.stringify(path)}`, () => {
      expect(executeFactoryQa(path, fullGuide)).toBeUndefined();
    });
  }

  const invalidContexts: unknown[] = [undefined, null, {}, { scope: 'unknown' },
    { scope: 'targets', targets: ['secciones[-1]'] }];
  for (const [index, context] of invalidContexts.entries()) {
    it(`delegates invalid context ${index} to the runner for a known path`, () => {
      expect(() => executeFactoryQa(JEREZ_GUIDE.path, context as FactoryReviewContext)).toThrowError(TypeError);
    });
    it(`resolves an unknown path before evaluating invalid context ${index}`, () => {
      expect(() => executeFactoryQa('unknown/path', context as FactoryReviewContext)).not.toThrow();
      expect(executeFactoryQa('unknown/path', context as FactoryReviewContext)).toBeUndefined();
    });
  }

  it('accepts frozen context and targets without changing references or contents', () => {
    const entry = getFactoryGuide(JEREZ_GUIDE.path)!;
    const targets = Object.freeze(['secciones[3].platos[0]', 'secciones[3].platos[1]']);
    const context = Object.freeze({ scope: 'targets' as const, targets });
    const before = JSON.stringify({ guide: entry.guide, context });
    const expected = runFactoryQa(entry.guide, context, entry.ruleSet);
    expect(executeFactoryQa(entry.path, context)?.result).toEqual(expected);
    expect(JSON.stringify({ guide: entry.guide, context })).toBe(before);
    expect(context.targets).toBe(targets);
    expect(context.targets).toEqual(['secciones[3].platos[0]', 'secciones[3].platos[1]']);
  });
});
