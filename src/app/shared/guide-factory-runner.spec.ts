import type { FactoryReviewContext } from './guide-factory-context';
import type { FactoryQaResult } from './guide-factory-qa';
import { runFactoryQa } from './guide-factory-runner';
import type { FactoryQaRuleSet } from './guide-factory-runner';
import { validateSpanishMunicipalGuideRules } from './guide-factory-rules';

describe('runFactoryQa', () => {
  const fullGuide: FactoryReviewContext = { scope: 'guide' };
  const targets = (...locations: string[]): FactoryReviewContext => ({ scope: 'targets', targets: locations });
  const ruleSets: FactoryQaRuleSet[] = ['generic', 'spanish-municipal'];
  const phrase = 'según nuestra investigación';
  const municipalGuide = () => ({ secciones: [
    { titulo: 'Historia' }, { titulo: 'Geografía y Clima' }, { titulo: 'Qué visitar en Destino' },
    { titulo: 'Gastronomía' }, { titulo: 'Dónde comer en Destino' },
    { titulo: 'Cultura y Vida Local' }, { titulo: 'Fiestas y Festivos Principales' }
  ] });
  const genericIssuesGuide = () => ({ secciones: [{ titulo: 'Gastronomía', platos: [{
    nombre: 'Plato', descripcion: phrase, web: '/relativa', foto: 'cld:'
  }] }] });

  it('returns the current approved FactoryQaResult contract for a valid generic guide', () => {
    const result: FactoryQaResult = runFactoryQa({ nombre: 'Destino', secciones: [{ titulo: 'Consejos prácticos' }] },
      fullGuide, 'generic');
    expect(result).toEqual({ status: 'APROBADA', counts: { blockers: 0, errors: 0, warnings: 0, info: 0 }, issues: [] });
    expect(Object.keys(result).sort()).toEqual(['counts', 'issues', 'status']);
  });
  it('aggregates errors and counts without reinterpreting the result', () => {
    const result = runFactoryQa(genericIssuesGuide(), fullGuide, 'generic');
    expect(result.status).toBe('REQUIERE_CORRECCIONES');
    expect(result.counts).toEqual({ blockers: 0, errors: 4, warnings: 0, info: 0 });
    expect(result.issues.length).toBe(4);
  });
  it('does not infer municipal rules from Spanish paths or municipal section titles for generic', () => {
    const guide = { path: 'europa/espana/andalucia/cadiz/destino', nombre: 'Destino', secciones: [
      { titulo: 'Qué visitar en Destino', lugares: [{}] },
      { titulo: 'Dónde comer en Destino', lugares: [{ foto: 'local' }] }
    ] };
    expect(runFactoryQa(guide, fullGuide, 'generic').issues).toEqual([]);
    expect(validateSpanishMunicipalGuideRules(guide).length).toBeGreaterThan(0);
  });
  it('applies the municipal combined validator exactly once for municipal full guide', () => {
    const guide = { secciones: [{ titulo: 'Dónde comer en Destino', lugares: [{
      foto: 'local', descripcion: '💡 Consejo AvenTourArte:\n🍴 Qué pedir sí o sí:'
    }] }] };
    expect(runFactoryQa(guide, fullGuide, 'spanish-municipal').issues)
      .toEqual(validateSpanishMunicipalGuideRules(guide));
    expect(runFactoryQa(guide, fullGuide, 'spanish-municipal').issues.map(issue => issue.category))
      .toEqual(['structure', 'images', 'restaurant']);
  });
  it('accepts a valid complete municipal guide', () => {
    expect(runFactoryQa(municipalGuide(), fullGuide, 'spanish-municipal').status).toBe('APROBADA');
  });
  for (const ruleSet of ruleSets) {
    it(`omits all municipal rules for ${ruleSet} targets, including selected cards`, () => {
      const guide = { secciones: [{ titulo: 'Dónde comer en Destino', lugares: [{ foto: 'local',
        descripcion: '💡 Consejo AvenTourArte:\n🍴 Qué pedir sí o sí:' }] }] };
      expect(runFactoryQa(guide, targets('secciones[0].lugares[0]'), ruleSet).issues).toEqual([]);
    });
    it(`limits all four scoped validators to a dish target for ${ruleSet}`, () => {
      const badDish = () => ({ descripcion: phrase, maps: '/relativa', fotos: ['cld:'] });
      const guide = { descripcion: phrase, web: '/relativa', foto: 'cld:', secciones: [
        { titulo: 'Gastronomía', platos: [badDish(), badDish()] }
      ] };
      const result = runFactoryQa(guide, targets('secciones[0].platos[1]'), ruleSet);
      expect(result.issues.map(issue => issue.category))
        .toEqual(['gastronomy', 'internal-language', 'technical-url', 'technical-image']);
      expect(result.issues.map(issue => issue.location)).toEqual([
        'secciones[0].platos[1].perfilAlimentario', 'secciones[0].platos[1].descripcion',
        'secciones[0].platos[1].maps', 'secciones[0].platos[1].fotos[0]'
      ]);
    });
    it(`checks only maps for an exact property target with ${ruleSet}`, () => {
      const guide = { secciones: [{ titulo: 'Gastronomía', platos: [{
        descripcion: phrase, web: '/relativa', maps: '/relativa', foto: 'cld:'
      }] }] };
      const result = runFactoryQa(guide, targets('secciones[0].platos[0].maps'), ruleSet);
      expect(result.issues).toEqual([jasmine.objectContaining({
        category: 'technical-url', location: 'secciones[0].platos[0].maps'
      })]);
    });
    it(`checks only the targeted gallery element with ${ruleSet}`, () => {
      const guide = { lugares: [{ descripcion: phrase, web: '/relativa', foto: 'cld:', fotos: ['', 'cld:'] }] };
      const result = runFactoryQa(guide, targets('lugares[0].fotos[1]'), ruleSet);
      expect(result.issues).toEqual([jasmine.objectContaining({
        category: 'technical-image', location: 'lugares[0].fotos[1]'
      })]);
    });
    it(`does not promote a dish description target to food profile review with ${ruleSet}`, () => {
      const result = runFactoryQa(genericIssuesGuide(), targets('secciones[0].platos[0].descripcion'), ruleSet);
      expect(result.issues).toEqual([jasmine.objectContaining({
        category: 'internal-language', location: 'secciones[0].platos[0].descripcion'
      })]);
    });
    it(`does not promote a food profile property target to the dish with ${ruleSet}`, () => {
      expect(runFactoryQa(genericIssuesGuide(), targets('secciones[0].platos[0].perfilAlimentario'), ruleSet).issues)
        .toEqual([]);
    });
    it(`accepts empty explicit targets and selects nothing with ${ruleSet}`, () => {
      expect(runFactoryQa(genericIssuesGuide(), targets(), ruleSet)).toEqual({
        status: 'APROBADA', counts: { blockers: 0, errors: 0, warnings: 0, info: 0 }, issues: []
      });
    });
  }
  it('includes section descendants and excludes other sections', () => {
    const guide = { secciones: [{ lugares: [{ web: '/relativa' }] },
      { titulo: 'Gastronomía', platos: [{}], foto: 'cld:' }] };
    expect(runFactoryQa(guide, targets('secciones[1]'), 'generic').issues.map(issue => issue.location))
      .toEqual(['secciones[1].platos[0].perfilAlimentario', 'secciones[1].foto']);
  });
  it('preserves generic group order and each validator internal order', () => {
    const guide = { secciones: [{ titulo: 'Gastronomía', platos: [
      { descripcion: phrase, maps: '/relativa', fotos: ['', 'cld:'] },
      { descripcion: phrase, web: '/relativa', foto: 'cld:' }
    ] }] };
    const result = runFactoryQa(guide, fullGuide, 'generic');
    expect(result.issues.map(issue => issue.category)).toEqual([
      'gastronomy', 'gastronomy', 'internal-language', 'internal-language',
      'technical-url', 'technical-url', 'technical-image', 'technical-image', 'technical-image'
    ]);
    expect(result.issues.map(issue => issue.location)).toEqual([
      'secciones[0].platos[0].perfilAlimentario', 'secciones[0].platos[1].perfilAlimentario',
      'secciones[0].platos[0].descripcion', 'secciones[0].platos[1].descripcion',
      'secciones[0].platos[0].maps', 'secciones[0].platos[1].web',
      'secciones[0].platos[0].fotos[0]', 'secciones[0].platos[0].fotos[1]', 'secciones[0].platos[1].foto'
    ]);
    expect(runFactoryQa(guide, fullGuide, 'generic')).toEqual(result);
  });
  it('preserves municipal then gastronomy, language, URL and image order deterministically', () => {
    const guide = municipalGuide();
    const secciones: unknown[] = [...guide.secciones];
    secciones[0] = { titulo: 'Historia incorrecta' };
    secciones[3] = genericIssuesGuide().secciones[0];
    const candidate = { secciones };
    const result = runFactoryQa(candidate, fullGuide, 'spanish-municipal');
    expect(result.issues.map(issue => issue.category))
      .toEqual(['structure', 'gastronomy', 'internal-language', 'technical-url', 'technical-image']);
    expect(result.counts.errors).toBe(5);
    expect(runFactoryQa(candidate, fullGuide, 'spanish-municipal')).toEqual(result);
  });
  it('keeps different rule issues about the same content without deduplicating', () => {
    const guide = { secciones: [{ titulo: 'Dónde comer en Destino', lugares: [{
      descripcion: `💡 Consejo AvenTourArte: ${phrase}\n🍴 Qué pedir sí o sí:`
    }] }] };
    const related = runFactoryQa(guide, fullGuide, 'spanish-municipal').issues
      .filter(issue => issue.location === 'secciones[0].lugares[0].descripcion');
    expect(related.map(issue => issue.category)).toEqual(['restaurant', 'internal-language']);
  });

  const invalidContexts: unknown[] = [undefined, null, [], 'guide', 42, {}, { scope: 'unknown' },
    { scope: 'targets' }, { scope: 'targets', targets: null }, { scope: 'targets', targets: 'web' },
    { scope: 'targets', targets: {} }, { scope: 'targets', targets: [42] },
    { scope: 'targets', targets: [null] }, { scope: 'targets', targets: [undefined] },
    { scope: 'targets', targets: [''] }, { scope: 'targets', targets: ['secciones[-1]'] },
    { scope: 'targets', targets: ['secciones[0].'] }, { scope: 'targets', targets: ['web\n'] },
    { scope: 'targets', targets: ['web', 'secciones['] }, { scope: 'targets', targets: Array(1) }];
  for (const [index, value] of invalidContexts.entries()) {
    it(`throws TypeError for invalid context ${index} instead of approving`, () => {
      expect(() => runFactoryQa({}, value as FactoryReviewContext, 'generic')).toThrowError(TypeError);
    });
  }
  for (const [index, value] of [undefined, null, '', 'unknown', 'Generic', false, 42, {}, []].entries()) {
    it(`throws TypeError for invalid rule set ${index} without inferring from the guide`, () => {
      expect(() => runFactoryQa(municipalGuide(), fullGuide, value as FactoryQaRuleSet)).toThrowError(TypeError);
    });
  }
  it('accepts context extra properties without imposing a stricter contract', () => {
    const context = { scope: 'guide' as const, extra: true, targets: 'ignored for guide scope' };
    expect(runFactoryQa({}, context, 'generic').status).toBe('APROBADA');
  });
  it('accepts the existing context location grammar including leading-zero and large indices', () => {
    const context = targets('secciones[0002].lugares[20].maps', 'items[9007199254740993]', '$campo', '_campo');
    expect(() => runFactoryQa({}, context, 'generic')).not.toThrow();
  });
  for (const ruleSet of ruleSets) {
    it(`tolerates malformed unknown guide input with valid arguments for ${ruleSet}`, () => {
      for (const guide of [undefined, null, 42, false, 'texto', [], {}, { secciones: [null, [], false] }]) {
        expect(() => runFactoryQa(guide, fullGuide, ruleSet)).not.toThrow();
      }
    });
    it(`does not mutate frozen guide, context or targets for ${ruleSet}`, () => {
      const photos = Object.freeze(['cld:']);
      const guide = Object.freeze({ secciones: Object.freeze([Object.freeze({ titulo: 'Gastronomía',
        platos: Object.freeze([Object.freeze({ descripcion: phrase, web: '/relativa', fotos: photos })])
      })]) });
      const targetLocations = Object.freeze(['secciones[0].platos[0]']);
      const context = Object.freeze({ scope: 'targets' as const, targets: targetLocations });
      const before = JSON.stringify({ guide, context });
      const result = runFactoryQa(guide, context, ruleSet);
      expect(result.issues.length).toBe(4);
      expect(JSON.stringify({ guide, context })).toBe(before);
      expect(context.targets).toBe(targetLocations);
      expect(guide.secciones[0].platos[0].fotos).toBe(photos);
    });
  }
});
