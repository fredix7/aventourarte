import { buildFactoryQaResult } from './guide-factory-qa';
import {
  validateSpanishMunicipalSectionOrder,
  validateSpanishMunicipalForbiddenImages,
  validateSpanishMunicipalGuideRules
} from './guide-factory-rules';

const municipalGuide = () => ({
  secciones: [
    { titulo: 'Historia' },
    { titulo: 'Geografía y Clima' },
    { titulo: 'Qué visitar en Rota' },
    { titulo: 'Gastronomía' },
    { titulo: 'Dónde comer en Rota' },
    { titulo: 'Cultura y Vida Local' },
    { titulo: 'Fiestas y Festivos Principales' }
  ]
});

const guideWithCard = (titulo: string, card: unknown) => ({
  secciones: [{ titulo, lugares: [card] }]
});

describe('validateSpanishMunicipalSectionOrder', () => {
  it('accepts the seven official sections in order', () => {
    expect(validateSpanishMunicipalSectionOrder(municipalGuide())).toEqual([]);
  });

  it('reports a missing section', () => {
    const guide = municipalGuide();
    guide.secciones.splice(3, 1);
    expect(validateSpanishMunicipalSectionOrder(guide)).toEqual([
      jasmine.objectContaining({ severity: 'ERROR', category: 'structure', location: 'secciones' })
    ]);
  });

  it('reports swapped sections', () => {
    const guide = municipalGuide();
    [guide.secciones[0], guide.secciones[1]] = [guide.secciones[1], guide.secciones[0]];
    expect(validateSpanishMunicipalSectionOrder(guide)).toEqual([
      jasmine.objectContaining({ severity: 'ERROR', location: 'secciones[0].titulo' })
    ]);
  });

  it('reports an additional section', () => {
    const guide = municipalGuide();
    guide.secciones.push({ titulo: 'Otra sección' });
    expect(validateSpanishMunicipalSectionOrder(guide)[0].severity).toBe('ERROR');
  });

  it('recognizes accents, case and variable municipality names', () => {
    const guide = municipalGuide();
    guide.secciones[1].titulo = 'GEOGRAFIA Y CLIMA';
    guide.secciones[2].titulo = 'QUÉ VISITAR EN Jerez de la Frontera';
    guide.secciones[3].titulo = 'GASTRONOMÍA';
    guide.secciones[4].titulo = 'DÓNDE COMER EN Sanlúcar de Barrameda';
    expect(validateSpanishMunicipalSectionOrder(guide)).toEqual([]);
  });

  it('reports absent or invalid sections without throwing', () => {
    for (const guide of [null, undefined, {}, { secciones: null }, { secciones: {} },
      { secciones: 'Historia' }, { secciones: [] }]) {
      expect(validateSpanishMunicipalSectionOrder(guide)).toEqual([
        jasmine.objectContaining({ severity: 'ERROR', category: 'structure' })
      ]);
    }
  });

  it('rejects duplicate sections and malformed titles', () => {
    const guide = municipalGuide();
    guide.secciones[1] = { titulo: 'Historia' };
    expect(validateSpanishMunicipalSectionOrder(guide)[0].severity).toBe('ERROR');
    for (const section of [null, {}, { titulo: 12 }, { titulo: 'Dónde comercios en Rota' }]) {
      const sections: unknown[] = [...municipalGuide().secciones];
      sections[4] = section;
      expect(validateSpanishMunicipalSectionOrder({ secciones: sections })[0].severity).toBe('ERROR');
    }
  });
});

describe('validateSpanishMunicipalForbiddenImages', () => {
  for (const field of ['foto', 'fotos'] as const) {
    it(`reports a restaurant with ${field}`, () => {
      const issues = validateSpanishMunicipalForbiddenImages(guideWithCard(
        'Dónde comer en Rota', { nombre: 'Establecimiento', [field]: field === 'foto' ? 'image' : ['image'] }
      ));
      expect(issues).toEqual([jasmine.objectContaining({
        severity: 'ERROR', category: 'images', item: 'Establecimiento', location: 'secciones[0].lugares[0]'
      })]);
    });

    it(`reports a festival with ${field}`, () => {
      expect(validateSpanishMunicipalForbiddenImages(guideWithCard(
        'Fiestas y Festivos Principales', { [field]: field === 'foto' ? 'image' : ['image'] }
      ))).toEqual([jasmine.objectContaining({ severity: 'ERROR', category: 'images' })]);
    });
  }

  it('reports only one issue per prohibited card containing both properties', () => {
    for (const title of ['Dónde comer', 'Fiestas y Festivos Principales']) {
      expect(validateSpanishMunicipalForbiddenImages(guideWithCard(
        title, { foto: 'image', fotos: ['image'] }
      )).length).toBe(1);
    }
  });

  it('does not emit any issue when prohibited sections have no image properties', () => {
    for (const title of ['Dónde comer en Rota', 'Fiestas y Festivos Principales']) {
      expect(validateSpanishMunicipalForbiddenImages(guideWithCard(title, { nombre: 'Ficha' }))).toEqual([]);
    }
  });

  for (const title of ['Qué visitar en Rota', 'Gastronomía', 'Cultura y Vida Local']) {
    it(`does not flag images in ${title}`, () => {
      expect(validateSpanishMunicipalForbiddenImages(guideWithCard(
        title, { foto: 'image', fotos: ['image'] }
      ))).toEqual([]);
    });
  }

  it('detects prohibited properties even when their values are empty', () => {
    for (const card of [{ foto: undefined }, { foto: null }, { foto: '' }, { fotos: [] }]) {
      expect(validateSpanishMunicipalForbiddenImages(guideWithCard('Dónde comer en Rota', card)).length).toBe(1);
    }
  });

  it('normalizes prohibited section titles and retains card locations without names', () => {
    expect(validateSpanishMunicipalForbiddenImages({ secciones: [
      { titulo: 'DÓNDE COMER EN Sanlúcar de Barrameda', lugares: [{}, { foto: 'image' }] },
      { titulo: 'FIESTAS Y FESTIVOS PRINCIPALES', lugares: [{ fotos: ['image'] }] }
    ] }).map(issue => issue.location)).toEqual(['secciones[0].lugares[1]', 'secciones[1].lugares[0]']);
  });

  it('tolerates incomplete guides, invalid collections and malformed cards', () => {
    for (const guide of [null, undefined, {}, { secciones: {} }, { secciones: [null, {}] },
      { secciones: [{ titulo: 'Dónde comer', lugares: {} }] },
      { secciones: [{ titulo: 'Fiestas y Festivos Principales', lugares: [null, undefined, 7, []] }] }]) {
      expect(validateSpanishMunicipalForbiddenImages(guide)).toEqual([]);
    }
  });
});

describe('validateSpanishMunicipalGuideRules', () => {
  it('returns structure issues before image issues', () => {
    const guide = guideWithCard('Dónde comer en Rota', { foto: 'image' });
    const issues = validateSpanishMunicipalGuideRules(guide);
    expect(issues).toEqual([
      ...validateSpanishMunicipalSectionOrder(guide),
      ...validateSpanishMunicipalForbiddenImages(guide)
    ]);
    expect(issues.map(issue => issue.category)).toEqual(['structure', 'images']);
  });

  it('does not mutate the guide or its arrays in any validator', () => {
    const guide = Object.freeze({ secciones: Object.freeze([
      ...municipalGuide().secciones.slice(0, 4).map(section => Object.freeze(section)),
      Object.freeze({ titulo: 'Dónde comer en Rota', lugares: Object.freeze([
        Object.freeze({ nombre: 'Establecimiento', foto: 'image', fotos: Object.freeze(['image']) })
      ]) }),
      ...municipalGuide().secciones.slice(5).map(section => Object.freeze(section))
    ]) });
    const before = JSON.stringify(guide);
    for (const validate of [validateSpanishMunicipalSectionOrder,
      validateSpanishMunicipalForbiddenImages, validateSpanishMunicipalGuideRules]) {
      validate(guide);
      expect(JSON.stringify(guide)).toBe(before);
    }
  });

  it('converts a prohibited image error into a result requiring corrections', () => {
    const guide = municipalGuide();
    const sections: unknown[] = [...guide.secciones];
    sections[4] = { titulo: 'Dónde comer en Rota', lugares: [{ foto: 'image' }] };
    const result = buildFactoryQaResult(validateSpanishMunicipalGuideRules({ secciones: sections }));
    expect(result.status).toBe('REQUIERE_CORRECCIONES');
    expect(result.counts).toEqual({ blockers: 0, errors: 1, warnings: 0, info: 0 });
  });
});
