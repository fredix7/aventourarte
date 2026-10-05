import { FactoryReviewContext, isFactoryLocationInScope } from './guide-factory-context';

describe('isFactoryLocationInScope', () => {
  const guide: FactoryReviewContext = { scope: 'guide' };
  const section: FactoryReviewContext = { scope: 'targets', targets: ['secciones[3]'] };
  const card: FactoryReviewContext = { scope: 'targets', targets: ['secciones[3].platos[2]'] };

  it('includes every valid location for a full guide', () => {
    for (const location of ['nombre', 'secciones', 'secciones[3]', 'secciones[3].platos',
      'secciones[3].platos[2]', 'secciones[4].lugares[1].descripcion']) {
      expect(isFactoryLocationInScope(guide, location)).toBeTrue();
    }
  });

  it('includes the targeted section itself', () => {
    expect(isFactoryLocationInScope(section, 'secciones[3]')).toBeTrue();
  });

  it('includes every descendant of a targeted section', () => {
    for (const location of ['secciones[3].platos[0]', 'secciones[3].lugares[2]',
      'secciones[3].subsecciones[1].lugares[2].fotos[0]']) {
      expect(isFactoryLocationInScope(section, location)).toBeTrue();
    }
  });

  it('excludes other sections', () => {
    expect(isFactoryLocationInScope(section, 'secciones[2]')).toBeFalse();
    expect(isFactoryLocationInScope(section, 'secciones[4].platos[0]')).toBeFalse();
    expect(isFactoryLocationInScope(section, 'secciones[30]')).toBeFalse();
  });

  it('includes the targeted card itself', () => {
    expect(isFactoryLocationInScope(card, 'secciones[3].platos[2]')).toBeTrue();
  });

  it('includes properties descending from a targeted card', () => {
    expect(isFactoryLocationInScope(card, 'secciones[3].platos[2].descripcion')).toBeTrue();
    expect(isFactoryLocationInScope(card, 'secciones[3].platos[2].perfilAlimentario.dieta')).toBeTrue();
  });

  it('excludes sibling cards', () => {
    expect(isFactoryLocationInScope(card, 'secciones[3].platos[1]')).toBeFalse();
    expect(isFactoryLocationInScope(card, 'secciones[3].platos[3]')).toBeFalse();
    expect(isFactoryLocationInScope(card, 'secciones[3].lugares[2]')).toBeFalse();
  });

  it('never confuses index 2 with index 20', () => {
    expect(isFactoryLocationInScope(card, 'secciones[3].platos[20]')).toBeFalse();
    expect(isFactoryLocationInScope(card, 'secciones[3].platos[20].descripcion')).toBeFalse();
    expect(isFactoryLocationInScope(
      { scope: 'targets', targets: ['secciones[3].platos[20]'] }, 'secciones[3].platos[2]'
    )).toBeFalse();
  });

  it('includes a location when any of multiple targets contains it', () => {
    const context: FactoryReviewContext = {
      scope: 'targets', targets: ['secciones[1]', 'secciones[3].platos[2]', 'secciones[4].lugares[1]']
    };
    expect(isFactoryLocationInScope(context, 'secciones[3].platos[2].descripcion')).toBeTrue();
    expect(isFactoryLocationInScope(context, 'secciones[4].lugares[1]')).toBeTrue();
    expect(isFactoryLocationInScope(context, 'secciones[0]')).toBeFalse();
  });

  it('allows a parent target to cover a child card', () => {
    expect(isFactoryLocationInScope(section, 'secciones[3].platos[2]')).toBeTrue();
    expect(isFactoryLocationInScope({ scope: 'targets', targets: ['secciones'] }, 'secciones[3]')).toBeTrue();
  });

  it('does not extend a child target to its parents', () => {
    for (const location of ['secciones', 'secciones[3]', 'secciones[3].platos']) {
      expect(isFactoryLocationInScope(card, location)).toBeFalse();
    }
  });

  it('rejects invalid locations even when the whole guide is in scope', () => {
    for (const location of [null, undefined, 3, {}, [], '', ' ', 'secciones.', '.secciones',
      'secciones[-1]', 'secciones[1.2]', 'secciones[]', 'secciones[3', 'secciones[3]platos',
      'secciones..platos', 'secciones["3"]', 'secciones [3]', 'secciones[3]\n']) {
      expect(() => isFactoryLocationInScope(guide, location)).not.toThrow();
      expect(isFactoryLocationInScope(guide, location)).toBeFalse();
      expect(isFactoryLocationInScope(section, location)).toBeFalse();
    }
  });

  it('ignores invalid targets and continues checking valid targets', () => {
    const context = { scope: 'targets', targets: [null, 1, {}, '', 'secciones[', 'secciones[3]'] };
    expect(isFactoryLocationInScope(context, 'secciones[3].platos[2]')).toBeTrue();
    expect(isFactoryLocationInScope(context, 'secciones[4]')).toBeFalse();
    expect(isFactoryLocationInScope({ scope: 'targets', targets: ['secciones['] }, 'secciones[3]')).toBeFalse();
  });

  it('returns false safely for empty or invalid contexts', () => {
    for (const context of [null, undefined, {}, [], 'guide', 1, { scope: 'unknown' },
      { scope: 'targets' }, { scope: 'targets', targets: [] }, { scope: 'targets', targets: 'secciones[3]' }]) {
      expect(() => isFactoryLocationInScope(context, 'secciones[3]')).not.toThrow();
      expect(isFactoryLocationInScope(context, 'secciones[3]')).toBeFalse();
    }
  });

  it('does not mutate frozen contexts or target arrays', () => {
    const context: FactoryReviewContext = Object.freeze({
      scope: 'targets', targets: Object.freeze(['secciones[3]', 'secciones[4].lugares[1]'])
    });
    const before = JSON.stringify(context);
    expect(isFactoryLocationInScope(context, 'secciones[3].platos[2]')).toBeTrue();
    expect(isFactoryLocationInScope(context, 'secciones[2]')).toBeFalse();
    expect(JSON.stringify(context)).toBe(before);
    expect(isFactoryLocationInScope(Object.freeze(guide), 'nombre')).toBeTrue();
  });

  it('respects property boundaries and case', () => {
    const context: FactoryReviewContext = { scope: 'targets', targets: ['secciones[3].platos'] };
    expect(isFactoryLocationInScope(context, 'secciones[3].platos[2]')).toBeTrue();
    expect(isFactoryLocationInScope(context, 'secciones[3].platosExtra[2]')).toBeFalse();
    expect(isFactoryLocationInScope(context, 'secciones[3].Platos[2]')).toBeFalse();
  });

  it('compares numeric indices without precision loss', () => {
    expect(isFactoryLocationInScope(card, 'secciones[03].platos[002]')).toBeTrue();
    const context: FactoryReviewContext = { scope: 'targets', targets: ['items[9007199254740992]'] };
    expect(isFactoryLocationInScope(context, 'items[9007199254740993]')).toBeFalse();
  });
});
