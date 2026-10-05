import { buildFactoryQaResult } from './guide-factory-qa';
import {
  validateSpanishMunicipalSectionOrder,
  validateSpanishMunicipalForbiddenImages,
  validateSpanishMunicipalVisitCards,
  validateSpanishMunicipalFestivalCards,
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

describe('validateSpanishMunicipalVisitCards', () => {
  const validateCard = (card: unknown) => validateSpanishMunicipalVisitCards(
    guideWithCard('Qué visitar en Rota', card)
  );

  it('accepts an explicitly declared valid plan type', () => {
    expect(validateCard({ nombre: 'Visita', tiposPlan: ['ruta'], descripcion: 'Descripción' })).toEqual([]);
  });

  it('requires tiposPlan without inferring it from price or description', () => {
    expect(validateCard({ nombre: 'Museo', descripcion: 'Ruta urbana gratuita', precio: 'Gratis' }))
      .toEqual([jasmine.objectContaining({ severity: 'ERROR', location: 'secciones[0].lugares[0].tiposPlan' })]);
  });

  it('rejects tiposPlan values that are not arrays', () => {
    for (const tiposPlan of [null, undefined, 'ruta', {}, 1]) {
      expect(validateCard({ tiposPlan })).toEqual([jasmine.objectContaining({ severity: 'ERROR' })]);
    }
  });

  it('rejects an empty tiposPlan array', () => {
    expect(validateCard({ tiposPlan: [] })).toEqual([jasmine.objectContaining({ severity: 'ERROR' })]);
  });

  it('rejects unknown or malformed plan types including sparse arrays', () => {
    for (const tiposPlan of [['ruta', 'inventado'], [null], [12], ['RUTA'], new Array(1)]) {
      expect(validateCard({ tiposPlan })).toEqual([jasmine.objectContaining({ severity: 'ERROR' })]);
    }
  });

  it('accepts several valid types from the existing catalog', () => {
    expect(validateCard({ tiposPlan: ['ruta', 'museo', 'de-pago'] })).toEqual([]);
  });

  it('does not accept inherited tiposPlan as an explicit declaration', () => {
    const card = Object.assign(Object.create({ tiposPlan: ['ruta'] }), { nombre: 'Visita' });
    expect(validateCard(card)).toEqual([jasmine.objectContaining({ severity: 'ERROR' })]);
  });

  it('accepts all canonical properties in order', () => {
    expect(validateCard({
      nombre: 'Visita', tiposPlan: ['ruta'], descripcion: 'Descripción', foto: 'image',
      horario: 'Horario', precio: 'Precio', direccion: 'Dirección', maps: 'Mapa',
      telefono: 'Teléfono', web: 'Web', reserva: 'Reserva'
    })).toEqual([]);
  });

  it('accepts missing optional properties while preserving relative order', () => {
    expect(validateCard({ tiposPlan: ['ruta'], web: 'Web' })).toEqual([]);
  });

  it('reports address before price as a property order error', () => {
    expect(validateCard({ tiposPlan: ['ruta'], direccion: 'Dirección', precio: 'Precio' }))
      .toEqual([jasmine.objectContaining({ severity: 'ERROR', location: 'secciones[0].lugares[0]' })]);
  });

  it('reports website before maps as a property order error', () => {
    expect(validateCard({ tiposPlan: ['ruta'], web: 'Web', maps: 'Mapa' }))
      .toEqual([jasmine.objectContaining({ severity: 'ERROR' })]);
  });

  it('emits only one order issue for multiple ordering mistakes', () => {
    expect(validateCard({ tiposPlan: ['ruta'], web: 'Web', maps: 'Mapa', direccion: 'Dirección', precio: 'Precio' }))
      .toEqual([jasmine.objectContaining({ severity: 'ERROR', location: 'secciones[0].lugares[0]' })]);
  });

  for (const field of ['foto', 'fotos'] as const) {
    it(`accepts ${field} in the image position`, () => {
      expect(validateCard({ tiposPlan: ['ruta'], descripcion: 'Descripción', [field]: 'image', precio: 'Precio' }))
        .toEqual([]);
    });
  }

  it('assigns foto and fotos the same rank without deciding coexistence', () => {
    for (const images of [{ foto: 'image', fotos: ['image'] }, { fotos: ['image'], foto: 'image' }]) {
      expect(validateCard({ tiposPlan: ['ruta'], descripcion: 'Descripción', ...images, horario: 'Horario' }))
        .toEqual([]);
    }
  });

  it('ignores special properties interleaved between canonical fields', () => {
    expect(validateCard({
      nombre: 'Visita', tiposPlan: ['ruta'], descripcion: 'Descripción', acceso: 'Acceso',
      horario: 'Horario', duracion: 'Duración', precio: 'Precio', noCropGallery: true,
      direccion: 'Dirección', guiaRelacionada: 'Ruta', maps: 'Mapa', otroCampo: 'Especial'
    })).toEqual([]);
  });

  it('ignores historical mapaUrl in the preferred property sequence', () => {
    expect(validateCard({ mapaUrl: 'Mapa histórico', nombre: 'Visita', tiposPlan: ['ruta'], precio: 'Precio' }))
      .toEqual([]);
  });

  it('returns no issues when the visit section is absent', () => {
    for (const guide of [null, undefined, {}, { secciones: [] }, guideWithCard('Dónde comer en Rota', {})]) {
      expect(validateSpanishMunicipalVisitCards(guide)).toEqual([]);
    }
  });

  it('returns no issues for absent or invalid lugares', () => {
    for (const lugares of [undefined, null, {}, 'Visitas']) {
      expect(validateSpanishMunicipalVisitCards({ secciones: [{ titulo: 'Qué visitar en Rota', lugares }] }))
        .toEqual([]);
    }
  });

  it('tolerates malformed cards and still validates subsequent objects', () => {
    const guide = { secciones: [{ titulo: 'Qué visitar en Rota', lugares: [null, undefined, 1, 'Visita', [], {}] }] };
    expect(() => validateSpanishMunicipalVisitCards(guide)).not.toThrow();
    expect(validateSpanishMunicipalVisitCards(guide)).toEqual([
      jasmine.objectContaining({ severity: 'ERROR', location: 'secciones[0].lugares[5].tiposPlan' })
    ]);
  });

  it('ignores subsections and itineraries while validating direct lugares', () => {
    expect(validateSpanishMunicipalVisitCards({ secciones: [{
      titulo: 'Qué visitar en Rota', lugares: [{ tiposPlan: ['ruta'] }],
      subsecciones: [{ lugares: [{}] }], itinerario: [{ zonas: [{}] }]
    }] })).toEqual([]);
  });

  it('does not mutate frozen cards, collections or property order', () => {
    const card = Object.freeze({ tiposPlan: Object.freeze(['ruta']), web: 'Web', maps: 'Mapa' });
    const guide = Object.freeze({ secciones: Object.freeze([
      Object.freeze({ titulo: 'Qué visitar en Rota', lugares: Object.freeze([card]) })
    ]) });
    const before = JSON.stringify(guide);
    expect(validateSpanishMunicipalVisitCards(guide).length).toBe(1);
    validateSpanishMunicipalGuideRules(guide);
    expect(JSON.stringify(guide)).toBe(before);
  });
});

describe('validateSpanishMunicipalFestivalCards', () => {
  const validateCard = (card: unknown) => validateSpanishMunicipalFestivalCards(
    guideWithCard('Fiestas y Festivos Principales', card)
  );

  const orderedCards = [
    { nombre: 'Fiesta', descripcion: 'Descripción', fecha: 'Agosto', precio: 'Precio' },
    { nombre: 'Fiesta', descripcion: 'Descripción', fecha: 'Agosto' },
    { nombre: 'Fiesta', fecha: 'Agosto' },
    { descripcion: 'Descripción', fecha: 'Agosto' }
  ];
  orderedCards.forEach((card, index) => {
    it(`accepts ordered present fields in example ${index + 1}`, () => {
      expect(validateCard(card)).toEqual([]);
    });
  });

  it('reports description after date as one order error', () => {
    expect(validateCard({ nombre: 'Fiesta', fecha: 'Agosto', descripcion: 'Descripción' })).toEqual([
      jasmine.objectContaining({
        severity: 'ERROR', category: 'festival', item: 'Fiesta', location: 'secciones[0].lugares[0]'
      })
    ]);
  });

  it('reports price before date as one order error', () => {
    expect(validateCard({ precio: 'Precio', fecha: 'Agosto' })).toEqual([
      jasmine.objectContaining({ severity: 'ERROR', category: 'festival' })
    ]);
  });

  it('emits only one order issue for multiple ordering mistakes', () => {
    expect(validateCard({ precio: 'Precio', fecha: 'Agosto', descripcion: 'Descripción', nombre: 'Fiesta' }))
      .toEqual([jasmine.objectContaining({ severity: 'ERROR', category: 'festival' })]);
  });

  it('ignores unknown properties interleaved between recognized fields', () => {
    expect(validateCard({
      nombre: 'Fiesta', especial: true, descripcion: 'Descripción', maps: 'Mapa',
      fecha: 'Agosto', otroCampo: 'Otro', precio: 'Precio'
    })).toEqual([]);
  });

  it('does not validate foto or fotos', () => {
    expect(validateCard({ foto: 'image', nombre: 'Fiesta', fotos: ['image'], fecha: 'Agosto' })).toEqual([]);
  });

  it('does not require any recognized field or validate its value', () => {
    for (const card of [{}, { nombre: null }, { descripcion: 1 }, { fecha: 'Sin formato' }, { precio: undefined }]) {
      expect(validateCard(card)).toEqual([]);
    }
  });

  it('returns no issues when the festival section is absent', () => {
    for (const guide of [null, undefined, {}, { secciones: {} }, { secciones: [] },
      guideWithCard('Cultura y Vida Local', { fecha: 'Agosto', nombre: 'Tradición' })]) {
      expect(validateSpanishMunicipalFestivalCards(guide)).toEqual([]);
    }
  });

  it('returns no issues for absent or invalid lugares', () => {
    for (const lugares of [undefined, null, {}, 'Fiestas', 1]) {
      expect(validateSpanishMunicipalFestivalCards({
        secciones: [{ titulo: 'Fiestas y Festivos Principales', lugares }]
      })).toEqual([]);
    }
    expect(validateSpanishMunicipalFestivalCards({ secciones: [{ titulo: 'Fiestas y Festivos Principales' }] }))
      .toEqual([]);
  });

  it('ignores malformed cards without throwing and locates subsequent errors', () => {
    const guide = { secciones: [null, { titulo: 7 }, {
      titulo: 'Fiestas y Festivos Principales',
      lugares: [null, undefined, 'Fiesta', 1, false, [], {}, { fecha: 'Agosto', nombre: 'Fiesta' }]
    }] };
    expect(() => validateSpanishMunicipalFestivalCards(guide)).not.toThrow();
    expect(validateSpanishMunicipalFestivalCards(guide)).toEqual([
      jasmine.objectContaining({ severity: 'ERROR', location: 'secciones[2].lugares[7]' })
    ]);
  });

  it('does not inspect other collections or nested festival cards', () => {
    expect(validateSpanishMunicipalFestivalCards({ secciones: [{
      titulo: 'Fiestas y Festivos Principales',
      lugares: [{}], subsecciones: [{ lugares: [{ fecha: 'Agosto', nombre: 'Fiesta' }] }],
      platos: [{ fecha: 'Agosto', nombre: 'Fiesta' }]
    }] })).toEqual([]);
  });

  it('does not mutate frozen guides, cards or arrays', () => {
    const guide = Object.freeze({ secciones: Object.freeze([
      Object.freeze({ titulo: 'Fiestas y Festivos Principales', lugares: Object.freeze([
        Object.freeze({ fecha: 'Agosto', nombre: 'Fiesta', fotos: Object.freeze(['image']) })
      ]) })
    ]) });
    const before = JSON.stringify(guide);
    expect(validateSpanishMunicipalFestivalCards(guide).length).toBe(1);
    validateSpanishMunicipalGuideRules(guide);
    expect(JSON.stringify(guide)).toBe(before);
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

  it('returns structure, forbidden image and visit issues in that order', () => {
    const guide = { secciones: [
      { titulo: 'Qué visitar en Rota', lugares: [{}] },
      { titulo: 'Dónde comer en Rota', lugares: [{ foto: 'image' }] }
    ] };
    const issues = validateSpanishMunicipalGuideRules(guide);
    expect(issues).toEqual([
      ...validateSpanishMunicipalSectionOrder(guide),
      ...validateSpanishMunicipalForbiddenImages(guide),
      ...validateSpanishMunicipalVisitCards(guide)
    ]);
    expect(issues.map(issue => issue.category)).toEqual(['structure', 'images', 'visit']);
  });

  it('returns structure, images, visits and festivals in that order', () => {
    const guide = { secciones: [
      { titulo: 'Fiestas y Festivos Principales', lugares: [{ fecha: 'Agosto', nombre: 'Fiesta', foto: 'image' }] },
      { titulo: 'Qué visitar en Rota', lugares: [{}] }
    ] };
    const issues = validateSpanishMunicipalGuideRules(guide);
    expect(issues).toEqual([
      ...validateSpanishMunicipalSectionOrder(guide),
      ...validateSpanishMunicipalForbiddenImages(guide),
      ...validateSpanishMunicipalVisitCards(guide),
      ...validateSpanishMunicipalFestivalCards(guide)
    ]);
    expect(issues.map(issue => issue.category)).toEqual(['structure', 'images', 'visit', 'festival']);
  });

  it('keeps image and festival order errors in their respective validators', () => {
    const sections: unknown[] = [...municipalGuide().secciones];
    sections[6] = { titulo: 'Fiestas y Festivos Principales', lugares: [
      { nombre: 'Fiesta', fecha: 'Agosto', descripcion: 'Descripción', foto: 'image', fotos: ['image'] }
    ] };
    const guide = { secciones: sections };
    expect(validateSpanishMunicipalForbiddenImages(guide)).toEqual([
      jasmine.objectContaining({ severity: 'ERROR', category: 'images' })
    ]);
    expect(validateSpanishMunicipalFestivalCards(guide)).toEqual([
      jasmine.objectContaining({ severity: 'ERROR', category: 'festival' })
    ]);
    expect(validateSpanishMunicipalGuideRules(guide)).toEqual([
      ...validateSpanishMunicipalForbiddenImages(guide),
      ...validateSpanishMunicipalFestivalCards(guide)
    ]);
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
