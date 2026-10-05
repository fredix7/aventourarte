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
    it(`selects municipal target rules only for the municipal rule set: ${ruleSet}`, () => {
      const guide = { secciones: [{ titulo: 'Dónde comer en Destino', lugares: [{ foto: 'local',
        descripcion: '💡 Consejo AvenTourArte:\n🍴 Qué pedir sí o sí:' }] }] };
      const issues = runFactoryQa(guide, targets('secciones[0].lugares[0]'), ruleSet).issues;
      if (ruleSet === 'generic') {
        expect(issues).toEqual([]);
      } else {
        expect(issues.map(issue => issue.category)).toEqual(['images', 'restaurant']);
      }
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

  it('applies tiposPlan and card order only to the selected municipal visit card', () => {
    const guide = { secciones: [{ titulo: 'Qué visitar en Destino', lugares: [
      { web: 'https://example.org', maps: 'https://example.org/mapa' },
      { web: 'https://example.org', maps: 'https://example.org/mapa' }
    ] }] };
    const result = runFactoryQa(guide, targets('secciones[0].lugares[1]'), 'spanish-municipal');
    expect(result.issues.map(issue => issue.location))
      .toEqual(['secciones[0].lugares[1].tiposPlan', 'secciones[0].lugares[1]']);
    expect(result.issues.map(issue => issue.category)).toEqual(['visit', 'visit']);
    expect(result.counts.errors).toBe(2);
  });
  it('does not pull historical visit types or order into an exact maps target', () => {
    const guide = { secciones: [{ titulo: 'Qué visitar', lugares: [{ web: 'https://example.org', maps: '/relativa' }] }] };
    const result = runFactoryQa(guide, targets('secciones[0].lugares[0].maps'), 'spanish-municipal');
    expect(result.issues).toEqual([jasmine.objectContaining({
      category: 'technical-url', location: 'secciones[0].lugares[0].maps'
    })]);
  });
  it('checks selected restaurant description blocks without checking historical images', () => {
    const guide = { secciones: [{ titulo: 'Dónde comer', lugares: [{ foto: 'local',
      descripcion: '💡 Consejo AvenTourArte:\n🍴 Qué pedir sí o sí:' }] }] };
    expect(runFactoryQa(guide, targets('secciones[0].lugares[0].descripcion'), 'spanish-municipal').issues)
      .toEqual([jasmine.objectContaining({ category: 'restaurant', location: 'secciones[0].lugares[0].descripcion' })]);
  });
  it('retains editorial and technical image errors separately for a selected restaurant photo', () => {
    const guide = { secciones: [{ titulo: 'Dónde comer', lugares: [{ foto: 'cld:' }] }] };
    const location = 'secciones[0].lugares[0].foto';
    const result = runFactoryQa(guide, targets(location), 'spanish-municipal');
    expect(result.issues.map(issue => issue.category)).toEqual(['images', 'technical-image']);
    expect(result.issues.map(issue => issue.location)).toEqual([location, location]);
  });
  it('detects a technically valid but editorially prohibited photo', () => {
    const guide = { secciones: [{ titulo: 'Dónde comer', lugares: [{ foto: 'cld:existing-reference' }] }] };
    expect(runFactoryQa(guide, targets('secciones[0].lugares[0].foto'), 'spanish-municipal').issues
      .map(issue => issue.category)).toEqual(['images']);
  });
  it('does not promote a restaurant gallery element target to the image prohibition', () => {
    const guide = { secciones: [{ titulo: 'Dónde comer', lugares: [{ fotos: ['cld:', ''] }] }] };
    expect(runFactoryQa(guide, targets('secciones[0].lugares[0].fotos[0]'), 'spanish-municipal').issues)
      .toEqual([jasmine.objectContaining({ category: 'technical-image', location: 'secciones[0].lugares[0].fotos[0]' })]);
  });
  it('checks festival order for a card target but not a fecha target', () => {
    const guide = { secciones: [{ titulo: 'Fiestas y Festivos Principales', lugares: [{ fecha: 'Agosto', nombre: 'Fiesta' }] }] };
    expect(runFactoryQa(guide, targets('secciones[0].lugares[0]'), 'spanish-municipal').issues)
      .toEqual([jasmine.objectContaining({ category: 'festival', location: 'secciones[0].lugares[0]' })]);
    expect(runFactoryQa(guide, targets('secciones[0].lugares[0].fecha'), 'spanish-municipal').issues).toEqual([]);
  });
  it('never applies global section order even when targets selects all sections', () => {
    expect(runFactoryQa({ secciones: [{ titulo: 'Historia' }] }, targets('secciones'), 'spanish-municipal').issues).toEqual([]);
    expect(runFactoryQa({}, targets('secciones'), 'spanish-municipal').issues).toEqual([]);
  });
  it('keeps municipal target groups before the four generic groups without duplicating overlaps', () => {
    const guide = { secciones: [
      { titulo: 'Qué visitar', lugares: [{}] },
      { titulo: 'Gastronomía', platos: [{ descripcion: phrase, web: '/relativa', foto: 'cld:' }] },
      { titulo: 'Dónde comer', lugares: [{ foto: 'local', descripcion: '💡 Consejo AvenTourArte:\n🍴 Qué pedir sí o sí:' }] },
      { titulo: 'Fiestas y Festivos Principales', lugares: [{ fecha: 'Agosto', nombre: 'Fiesta' }] }
    ] };
    const context = targets('secciones', 'secciones[0]', 'secciones[0].lugares[0]');
    const result = runFactoryQa(guide, context, 'spanish-municipal');
    expect(result.issues.map(issue => issue.category)).toEqual([
      'images', 'visit', 'festival', 'restaurant', 'gastronomy', 'internal-language', 'technical-url', 'technical-image'
    ]);
    expect(result.counts.errors).toBe(8);
    expect(runFactoryQa(guide, context, 'spanish-municipal')).toEqual(result);
  });
  it('keeps generic section targets free of municipal rules', () => {
    const guide = { secciones: [{ titulo: 'Qué visitar', lugares: [{}] },
      { titulo: 'Dónde comer', lugares: [{ foto: 'local', descripcion: '💡 Consejo AvenTourArte:\n🍴 Qué pedir sí o sí:' }] },
      { titulo: 'Fiestas y Festivos Principales', lugares: [{ fecha: 'Agosto', nombre: 'Fiesta' }] }] };
    expect(runFactoryQa(guide, targets('secciones'), 'generic').issues).toEqual([]);
  });

  it('checks municipal visit cards under a subsection target without including sibling subsections', () => {
    const guide = { secciones: [{ titulo: 'Qué visitar', subsecciones: [
      { lugares: [{}] }, { lugares: [{}] }
    ] }] };
    expect(runFactoryQa(guide, targets('secciones[0].subsecciones[0]'), 'spanish-municipal').issues)
      .toEqual([jasmine.objectContaining({ category: 'visit',
        location: 'secciones[0].subsecciones[0].lugares[0].tiposPlan' })]);
  });
  it('checks typesPlan before order for an exact municipal nested card target', () => {
    const guide = { secciones: [{ titulo: 'Qué visitar', subsecciones: [{ lugares: [
      { web: 'https://example.org', maps: 'https://example.org/map' }, {}
    ] }] }] };
    const location = 'secciones[0].subsecciones[0].lugares[0]';
    expect(runFactoryQa(guide, targets(location), 'spanish-municipal').issues).toEqual([
      jasmine.objectContaining({ category: 'visit', location: `${location}.tiposPlan` }),
      jasmine.objectContaining({ category: 'visit', location })
    ]);
  });
  it('checks only the technical URL for nested maps without promoting municipal card review', () => {
    const guide = { secciones: [{ titulo: 'Qué visitar', subsecciones: [{ lugares: [
      { web: 'https://example.org', maps: '/relative' }
    ] }] }] };
    const location = 'secciones[0].subsecciones[0].lugares[0].maps';
    expect(runFactoryQa(guide, targets(location), 'spanish-municipal').issues)
      .toEqual([jasmine.objectContaining({ category: 'technical-url', location })]);
  });
  it('does not execute municipal visits for generic guides with immediate subsections', () => {
    const guide = { secciones: [{ titulo: 'Qué visitar', subsecciones: [{ lugares: [
      { web: 'https://example.org', maps: 'https://example.org/map' }
    ] }] }] };
    for (const context of [fullGuide, targets('secciones[0].subsecciones[0]'),
      targets('secciones[0].subsecciones[0].lugares[0]')]) {
      expect(runFactoryQa(guide, context, 'generic').issues).toEqual([]);
    }
  });

  it('runs international itinerary before gastronomy, language, URLs and images for generic guide scope', () => {
    const guide = { secciones: [
      { titulo: 'Qué visitar', itinerario: [{ dia: '', zonas: [{ nombre: 'Visita', descripcion: 'Visita', tiposPlan: ['ruta'] }] }] },
      ...genericIssuesGuide().secciones
    ] };
    const result = runFactoryQa(guide, fullGuide, 'generic');
    expect(result.issues.map(issue => issue.category))
      .toEqual(['itinerary', 'gastronomy', 'internal-language', 'technical-url', 'technical-image']);
    expect(result.issues[0].location).toBe('secciones[0].itinerario[0].dia');
    expect(result.counts.errors).toBe(5);
  });
  it('runs itinerary structure for generic itinerary targets without including other sections', () => {
    const guide = { secciones: [{ titulo: 'Qué visitar', itinerario: [{ zonas: [] }] },
      ...genericIssuesGuide().secciones] };
    const result = runFactoryQa(guide, targets('secciones[0].itinerario'), 'generic');
    expect(result.issues.map(issue => issue.category)).toEqual(['itinerary', 'itinerary']);
    expect(result.issues.map(issue => issue.location))
      .toEqual(['secciones[0].itinerario[0].dia', 'secciones[0].itinerario[0].zonas']);
  });
  it('checks a generic zone maps target technically without promoting itinerary structure', () => {
    const guide = { secciones: [{ titulo: 'Qué visitar', itinerario: [{ zonas: [{ maps: '/relative' }] }] }] };
    const location = 'secciones[0].itinerario[0].zonas[0].maps';
    expect(runFactoryQa(guide, targets(location), 'generic').issues).toEqual([
      jasmine.objectContaining({ severity: 'ERROR', category: 'technical-url', location })
    ]);
  });
  it('does not apply international EDIT-012 to municipal guide or target reviews', () => {
    const guide = { secciones: municipalGuide().secciones.map((section, index) =>
      index === 2 ? { ...section, itinerario: [{ dia: '', zonas: [{}] }] } : section) };
    for (const context of [fullGuide, targets('secciones[2].itinerario')]) {
      expect(runFactoryQa(guide, context, 'spanish-municipal').issues).toEqual([]);
    }
    expect(runFactoryQa(guide, fullGuide, 'generic').issues.length).toBe(4);
  });
  it('preserves municipal results and ordering when an international-style malformed itinerary is present', () => {
    const original = { secciones: [{ titulo: 'Qué visitar', lugares: [{}] },
      ...genericIssuesGuide().secciones] };
    const withItinerary = { secciones: [{ ...original.secciones[0], itinerario: null },
      ...original.secciones.slice(1)] };
    for (const context of [fullGuide, targets('secciones')]) {
      expect(runFactoryQa(withItinerary, context, 'spanish-municipal'))
        .toEqual(runFactoryQa(original, context, 'spanish-municipal'));
    }
  });
  it('does not introduce an international-itinerary ruleset', () => {
    expect(() => runFactoryQa({}, fullGuide, 'international-itinerary' as FactoryQaRuleSet)).toThrowError(TypeError);
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
