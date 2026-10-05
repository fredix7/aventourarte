import { buildFactoryQaResult } from './guide-factory-qa';
import type { FactoryReviewContext } from './guide-factory-context';
import {
  validateSpanishMunicipalSectionOrder,
  validateSpanishMunicipalForbiddenImages,
  validateSpanishMunicipalVisitCards,
  validateSpanishMunicipalFestivalCards,
  validateSpanishMunicipalRestaurantEditorialBlocks,
  validateSpanishMunicipalGuideRules,
  validateGastronomyFoodProfiles,
  validatePublishedInternalLanguage,
  validateGuideTechnicalUrls
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

describe('validateSpanishMunicipalRestaurantEditorialBlocks', () => {
  const request = '🍴 Qué pedir sí o sí:';
  const experience = '🧭 Experiencia viajera:';
  const advice = '💡 Consejo AvenTourArte:';
  const validateText = (descripcion: unknown) => validateSpanishMunicipalRestaurantEditorialBlocks(
    guideWithCard('Dónde comer en Rota', { nombre: 'Establecimiento', descripcion })
  );

  const validSequences = [
    [], [request], [experience], [advice], [request, advice],
    [experience, advice], [request, experience], [request, experience, advice]
  ];
  validSequences.forEach((sequence, index) => {
    it(`accepts optional blocks in valid sequence ${index + 1}`, () => {
      expect(validateText(sequence.length ? sequence.join('\nTexto\n') : 'Texto sin bloques')).toEqual([]);
    });
  });

  const invalidSequences = [
    [advice, request], [experience, request], [advice, experience], [request, advice, experience]
  ];
  invalidSequences.forEach((sequence, index) => {
    it(`reports one order error for invalid sequence ${index + 1}`, () => {
      expect(validateText(sequence.join('\n'))).toEqual([jasmine.objectContaining({
        severity: 'ERROR', category: 'restaurant', item: 'Establecimiento',
        location: 'secciones[0].lugares[0].descripcion', detail: jasmine.stringMatching('orden')
      })]);
    });
  });

  [request, experience, advice].forEach(marker => {
    it(`reports a duplicate of ${marker}`, () => {
      expect(validateText(`${marker}\nTexto\n${marker}`)).toEqual([jasmine.objectContaining({
        severity: 'ERROR', category: 'restaurant', detail: jasmine.stringMatching('duplicados')
      })]);
    });
  });

  it('reports only one duplicate issue when several markers are repeated', () => {
    expect(validateText([request, request, experience, experience, advice, advice].join('\n')))
      .toEqual([jasmine.objectContaining({ severity: 'ERROR', detail: jasmine.stringMatching('duplicados') })]);
  });

  it('reports both order and duplicate errors when both conditions occur', () => {
    const issues = validateText([advice, request, request].join('\n'));
    expect(issues).toEqual([
      jasmine.objectContaining({ severity: 'ERROR', detail: jasmine.stringMatching('orden') }),
      jasmine.objectContaining({ severity: 'ERROR', detail: jasmine.stringMatching('duplicados') })
    ]);
  });

  it('ignores ordinary text before, between and after markers', () => {
    expect(validateText(`Introducción ${request}\n- Plato\n${experience}\nTexto\n${advice} Consejo. Final.`))
      .toEqual([]);
  });

  it('does not recognize non-exact variants as official markers', () => {
    const variants = [
      'Qué pedir sí o sí:', 'Experiencia viajera:', 'Consejo AvenTourArte:',
      '🍴 Qué pedir:', '🧭 Experiencia de viaje:', '💡 Consejo Aventourarte:',
      '🍴 Que pedir si o si:', '🧭 experiencia viajera:', '💡 Travel tip:',
      '🍴 Qué pedir sí o sí', '🍴 Qué pedir sí o sí :'
    ];
    for (const variant of variants) {
      expect(validateText(`${advice}\n${variant}\n${variant}`)).toEqual([]);
    }
  });

  it('does not require a string or nonempty description', () => {
    for (const descripcion of [undefined, null, 1, false, {}, [], '', '  ']) {
      expect(validateText(descripcion)).toEqual([]);
    }
    expect(validateSpanishMunicipalRestaurantEditorialBlocks(guideWithCard('Dónde comer en Rota', {})))
      .toEqual([]);
  });

  it('returns no issues when the restaurant section is absent', () => {
    for (const guide of [null, undefined, {}, { secciones: {} }, { secciones: [] },
      guideWithCard('Cultura y Vida Local', { descripcion: `${advice}\n${request}` })]) {
      expect(validateSpanishMunicipalRestaurantEditorialBlocks(guide)).toEqual([]);
    }
  });

  it('returns no issues for missing or invalid lugares', () => {
    for (const lugares of [undefined, null, {}, 'Establecimientos', 1]) {
      expect(validateSpanishMunicipalRestaurantEditorialBlocks({
        secciones: [{ titulo: 'Dónde comer en Rota', lugares }]
      })).toEqual([]);
    }
    expect(validateSpanishMunicipalRestaurantEditorialBlocks({ secciones: [{ titulo: 'Dónde comer en Rota' }] }))
      .toEqual([]);
  });

  it('ignores malformed cards without throwing and locates later errors', () => {
    const guide = { secciones: [null, { titulo: 'Dónde comer en Rota', lugares: [
      null, undefined, false, 1, 'Establecimiento', [], {}, { descripcion: `${advice}\n${request}` }
    ] }] };
    expect(() => validateSpanishMunicipalRestaurantEditorialBlocks(guide)).not.toThrow();
    expect(validateSpanishMunicipalRestaurantEditorialBlocks(guide)).toEqual([
      jasmine.objectContaining({ severity: 'ERROR', location: 'secciones[1].lugares[7].descripcion' })
    ]);
  });

  it('does not mutate frozen guides, arrays or descriptions', () => {
    const guide = Object.freeze({ secciones: Object.freeze([
      Object.freeze({ titulo: 'Dónde comer en Rota', lugares: Object.freeze([
        Object.freeze({ descripcion: `${advice}\n${request}\n${request}` })
      ]) })
    ]) });
    const before = JSON.stringify(guide);
    expect(validateSpanishMunicipalRestaurantEditorialBlocks(guide).length).toBe(2);
    validateSpanishMunicipalGuideRules(guide);
    expect(JSON.stringify(guide)).toBe(before);
  });

  it('does not validate images', () => {
    expect(validateSpanishMunicipalRestaurantEditorialBlocks(guideWithCard('Dónde comer en Rota', {
      foto: 'image', fotos: ['image'], descripcion: request
    }))).toEqual([]);
  });

  it('analyzes only descriptions of direct lugares', () => {
    const invalid = `${advice}\n${request}`;
    expect(validateSpanishMunicipalRestaurantEditorialBlocks({ secciones: [{
      titulo: 'Dónde comer en Rota', contenido: invalid, lugares: [{ nombre: invalid, contenido: invalid }],
      subsecciones: [{ lugares: [{ descripcion: invalid }] }], platos: [{ descripcion: invalid }]
    }] })).toEqual([]);
  });
});

describe('validateGastronomyFoodProfiles', () => {
  const fullGuide: FactoryReviewContext = { scope: 'guide' };
  const profile = () => ({
    dieta: { certeza: 'confirmado', compatibilidad: 'vegano' },
    alcohol: 'no-contiene', cerdo: 'no-contiene'
  });
  const guideWithDishes = (platos: unknown[], titulo = 'Gastronomía') => ({
    secciones: [{ titulo: 'Historia' }, { titulo, platos }]
  });
  const validateProfile = (perfilAlimentario: unknown) => validateGastronomyFoodProfiles(
    guideWithDishes([{ nombre: 'Plato', perfilAlimentario }]), fullGuide
  );
  const expectInvalid = (value: unknown) => {
    expect(validateProfile(value)).toEqual([jasmine.objectContaining({
      severity: 'ERROR', category: 'gastronomy', item: 'Plato',
      location: 'secciones[1].platos[0].perfilAlimentario',
      detail: jasmine.stringMatching('estructura')
    })]);
  };

  it('checks every gastronomic dish for a full guide and keeps real section indices', () => {
    const guide = { secciones: [
      { titulo: 'Historia' }, { titulo: 'Gastronomía', platos: [{}, {}] },
      { titulo: 'Gastronomía de Copenhague', platos: [{}] }
    ] };
    expect(validateGastronomyFoodProfiles(guide, fullGuide).map(issue => issue.location)).toEqual([
      'secciones[1].platos[0].perfilAlimentario', 'secciones[1].platos[1].perfilAlimentario',
      'secciones[2].platos[0].perfilAlimentario'
    ]);
  });

  for (const target of ['secciones[1]', 'secciones[1].platos']) {
    it(`checks all direct dishes under ${target}`, () => {
      expect(validateGastronomyFoodProfiles(guideWithDishes([{}, {}]), {
        scope: 'targets', targets: [target]
      }).length).toBe(2);
    });
  }

  it('checks only the targeted dish and leaves missing sibling profiles untouched', () => {
    expect(validateGastronomyFoodProfiles(guideWithDishes([{}, {}, {}]), {
      scope: 'targets', targets: ['secciones[1].platos[1]']
    })).toEqual([jasmine.objectContaining({ location: 'secciones[1].platos[1].perfilAlimentario' })]);
  });

  for (const target of ['secciones[0]', 'secciones[1].lugares[0]',
    'secciones[1].platos[0].descripcion', 'secciones[1].platos[0].perfilAlimentario']) {
    it(`does not promote unrelated or child target ${target} to a dish`, () => {
      expect(validateGastronomyFoodProfiles(guideWithDishes([{}]), {
        scope: 'targets', targets: [target]
      })).toEqual([]);
    });
  }

  it('does not confuse indices 2 and 20 in either direction', () => {
    const guide = guideWithDishes(Array.from({ length: 21 }, () => ({})));
    for (const index of [2, 20]) {
      expect(validateGastronomyFoodProfiles(guide, {
        scope: 'targets', targets: [`secciones[1].platos[${index}]`]
      }).map(issue => issue.location)).toEqual([`secciones[1].platos[${index}].perfilAlimentario`]);
    }
  });

  it('does not validate invalid profiles outside scope', () => {
    expect(validateGastronomyFoodProfiles(guideWithDishes([{ perfilAlimentario: null }, {}]), {
      scope: 'targets', targets: ['secciones[0]']
    })).toEqual([]);
  });

  it('reports one absence error with the dish name and profile location', () => {
    expect(validateGastronomyFoodProfiles(guideWithDishes([{ nombre: 'Plato' }]), fullGuide))
      .toEqual([jasmine.objectContaining({
        severity: 'ERROR', category: 'gastronomy', item: 'Plato',
        location: 'secciones[1].platos[0].perfilAlimentario',
        detail: jasmine.stringMatching('declarar')
      })]);
  });

  it('does not accept an inherited profile as an explicit declaration', () => {
    const dish = Object.assign(Object.create({ perfilAlimentario: profile() }), { nombre: 'Plato' });
    expect(validateGastronomyFoodProfiles(guideWithDishes([dish]), fullGuide))
      .toEqual([jasmine.objectContaining({ detail: jasmine.stringMatching('declarar') })]);
  });

  [null, undefined, 'perfil', 7, false, [], {}].forEach((value, index) => {
    it(`reports one structural error for malformed profile ${index + 1}`, () => expectInvalid(value));
  });

  for (const field of ['dieta', 'alcohol', 'cerdo']) {
    it(`requires own ${field} in the profile`, () => {
      const value: Record<string, unknown> = profile();
      const inherited = value[field];
      delete value[field];
      expectInvalid(value);
      expectInvalid(Object.assign(Object.create({ [field]: inherited }), value));
    });
  }

  it('reports only one structural error for multiple internal defects', () => {
    expectInvalid({ dieta: { certeza: 'inventado' }, alcohol: false, cerdo: [] });
  });

  for (const compatibilidad of ['vegetariano', 'vegano', 'pescetariano', 'ninguno']) {
    it(`accepts confirmed ${compatibilidad}`, () => {
      expect(validateProfile({ ...profile(), dieta: { certeza: 'confirmado', compatibilidad } })).toEqual([]);
    });
  }

  it('requires own compatibility for a confirmed diet', () => {
    expectInvalid({ ...profile(), dieta: { certeza: 'confirmado' } });
    expectInvalid({ ...profile(), dieta: Object.assign(Object.create({ compatibilidad: 'vegano' }), {
      certeza: 'confirmado'
    }) });
  });

  for (const compatibilidad of ['inventado', 'Vegano', '', null, undefined, 1, []]) {
    it(`rejects confirmed compatibility ${String(compatibilidad)}`, () => {
      expectInvalid({ ...profile(), dieta: { certeza: 'confirmado', compatibilidad } });
    });
  }

  for (const certeza of ['variable', 'desconocido']) {
    it(`accepts ${certeza} without compatibility`, () => {
      expect(validateProfile({ ...profile(), dieta: { certeza } })).toEqual([]);
    });
    it(`does not reject additional compatibility for ${certeza}`, () => {
      expect(validateProfile({ ...profile(), dieta: { certeza, compatibilidad: 'otra información' } }))
        .toEqual([]);
    });
  }

  for (const dieta of [null, undefined, 'vegano', 1, false, [], {},
    { certeza: 'inventado' }, { certeza: 'Confirmado' }, { certeza: null },
    Object.create({ certeza: 'variable' })]) {
    it(`rejects malformed diet ${JSON.stringify(dieta)}`, () => expectInvalid({ ...profile(), dieta }));
  }

  for (const field of ['alcohol', 'cerdo']) {
    for (const state of ['contiene', 'puede-contener', 'no-contiene', 'desconocido']) {
      it(`accepts ${field} state ${state}`, () => {
        expect(validateProfile({ ...profile(), [field]: state })).toEqual([]);
      });
    }
    for (const state of ['inventado', 'Contiene', 'contains', null, undefined, true, 1, []]) {
      it(`rejects ${field} state ${String(state)}`, () => expectInvalid({ ...profile(), [field]: state }));
    }
  }

  for (const title of ['Gastronomía', 'Gastronomía de Copenhague', 'Gastronomía de Malmö',
    '  GASTRONOMIA  DE   Destino  ', '  gAstrOnOmÍa  ']) {
    it(`recognizes structural title ${title}`, () => {
      expect(validateGastronomyFoodProfiles(guideWithDishes([{}], title), fullGuide).length).toBe(1);
    });
  }

  for (const title of ['Gastronomía local', 'Gastronomía de', 'Gastronomía en Rota',
    'Nuestra Gastronomía', 'Gastronomías', 'Qué visitar', 'Dónde comer', 'Gastronomia del destino']) {
    it(`ignores nonmatching title ${title}`, () => {
      expect(validateGastronomyFoodProfiles(guideWithDishes([{}], title), fullGuide)).toEqual([]);
    });
  }

  it('tolerates absent sections and malformed guides or sections', () => {
    for (const guide of [null, undefined, [], {}, { secciones: null }, { secciones: {} },
      { secciones: [] }, { secciones: [null, undefined, 1, [], {}, { titulo: 1, platos: [{}] }] }]) {
      expect(validateGastronomyFoodProfiles(guide, fullGuide)).toEqual([]);
    }
  });

  it('ignores missing or invalid platos', () => {
    for (const platos of [null, undefined, {}, 1, false, 'Platos']) {
      expect(validateGastronomyFoodProfiles({ secciones: [{ titulo: 'Gastronomía', platos }] }, fullGuide))
        .toEqual([]);
    }
    expect(validateGastronomyFoodProfiles({ secciones: [{ titulo: 'Gastronomía' }] }, fullGuide)).toEqual([]);
  });

  it('ignores malformed dishes without throwing and retains later indices', () => {
    const guide = guideWithDishes([null, undefined, 'Plato', 1, false, [], {}]);
    expect(() => validateGastronomyFoodProfiles(guide, fullGuide)).not.toThrow();
    expect(validateGastronomyFoodProfiles(guide, fullGuide)).toEqual([
      jasmine.objectContaining({ location: 'secciones[1].platos[6].perfilAlimentario' })
    ]);
  });

  it('does not inspect lugares, subsecciones or itineraries', () => {
    expect(validateGastronomyFoodProfiles({ secciones: [{
      titulo: 'Gastronomía', platos: [{ perfilAlimentario: profile() }], lugares: [{}],
      subsecciones: [{ titulo: 'Gastronomía', platos: [{}] }], itinerarios: [{}]
    }, { titulo: 'Otra sección', platos: [{}] }] }, fullGuide)).toEqual([]);
  });

  it('allows additional properties in the profile and diet', () => {
    expect(validateProfile({ ...profile(), extra: null,
      dieta: { certeza: 'confirmado', compatibilidad: 'vegano', extra: [] }
    })).toEqual([]);
  });

  it('does not mutate frozen guides, profiles, contexts or arrays', () => {
    const guide = Object.freeze({ secciones: Object.freeze([
      Object.freeze({ titulo: 'Gastronomía', platos: Object.freeze([
        Object.freeze({ nombre: 'Sin perfil' }), Object.freeze({ perfilAlimentario: Object.freeze({
          ...profile(), dieta: Object.freeze(profile().dieta)
        }) }), Object.freeze({ perfilAlimentario: Object.freeze({ dieta: null }) })
      ]) })
    ]) });
    const context: FactoryReviewContext = Object.freeze({
      scope: 'targets', targets: Object.freeze(['secciones[0]'])
    });
    const before = JSON.stringify({ guide, context });
    expect(validateGastronomyFoodProfiles(guide, context).length).toBe(2);
    expect(JSON.stringify({ guide, context })).toBe(before);
  });

  it('omits item when nombre is not a string', () => {
    for (const dish of [{}, { nombre: 1 }, { nombre: null }]) {
      expect(validateGastronomyFoodProfiles(guideWithDishes([dish]), fullGuide)[0].item).toBeUndefined();
    }
  });

  it('does not validate allergens or require their catalog resolution', () => {
    expect(validateGastronomyFoodProfiles(guideWithDishes([{
      nombre: 'Plato sintético sin catálogo', perfilAlimentario: profile(),
      alergenos: 'inválido', posiblesAlergenos: 1, perfilAlergenos: 'inventado',
      contains: null, possible: false, status: 'inventado'
    }]), fullGuide)).toEqual([]);
  });

  it('keeps the municipal combined validator unchanged and without implicit review scope', () => {
    const sections: unknown[] = [...municipalGuide().secciones];
    sections[3] = { titulo: 'Gastronomía', platos: [{}, { perfilAlimentario: null }] };
    const guide = { secciones: sections };
    expect(validateGastronomyFoodProfiles(guide, fullGuide).length).toBe(2);
    expect(validateSpanishMunicipalGuideRules(guide)).toEqual([]);
  });
});

describe('validatePublishedInternalLanguage', () => {
  const fullGuide: FactoryReviewContext = { scope: 'guide' };
  const phrase = 'según nuestra investigación';
  const phrases = [
    phrase, 'tras nuestra investigación', 'según las fuentes consultadas',
    'el agente ha determinado', 'Codex ha detectado', 'durante la auditoría de esta guía',
    'esta guía ha sido generada por ChatGPT'
  ];
  const validateText = (descripcion: unknown) => validatePublishedInternalLanguage({ descripcion }, fullGuide);
  const scopedGuide = () => ({
    descripcion: phrase,
    secciones: [
      { contenido: phrase },
      { contenido: phrase, lugares: [
        { nombre: 'Primera ficha', descripcion: phrase, horario: phrase },
        { nombre: 'Segunda ficha', descripcion: phrase }
      ] }
    ]
  });

  for (const text of phrases) {
    it(`reports the complete phrase ${text}`, () => {
      expect(validateText(text)).toEqual([jasmine.objectContaining({
        severity: 'ERROR', category: 'internal-language', location: 'descripcion',
        detail: 'El contenido publicado expone lenguaje interno del proceso de creación, investigación o validación.'
      })]);
    });
    it(`normalizes case, decomposed accents and whitespace for ${text}`, () => {
      const variant = `  ${text.toUpperCase().normalize('NFD').replace(/ /g, '  \n\t')}  `;
      expect(validateText(variant).length).toBe(1);
      expect(validateText(text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).length).toBe(1);
    });
    it(`respects word boundaries around ${text}`, () => {
      for (const textWithAffix of [`x${text}`, `${text}x`, `ñ${text}`, `${text}漢`,
        `1${text}`, `${text}2`, `_${text}`, `${text}_`]) {
        expect(validateText(textWithAffix)).toEqual([]);
      }
      expect(validateText(`Texto: «${text}».` ).length).toBe(1);
    });
  }

  it('reports only one issue for several or repeated patterns in one property', () => {
    expect(validateText([...phrases, phrase].join('. ')).length).toBe(1);
  });

  it('reports separate issues for separate properties', () => {
    expect(validatePublishedInternalLanguage({ descripcion: phrase, contenido: phrases[1] }, fullGuide)
      .map(issue => issue.location)).toEqual(['descripcion', 'contenido']);
  });

  it('checks the full guide only with explicit guide scope', () => {
    expect(validatePublishedInternalLanguage(scopedGuide(), fullGuide).length).toBe(6);
    expect(validatePublishedInternalLanguage(scopedGuide(), { scope: 'targets', targets: [] })).toEqual([]);
  });

  it('checks section text and descendants without checking other sections or the root', () => {
    expect(validatePublishedInternalLanguage(scopedGuide(), {
      scope: 'targets', targets: ['secciones[1]']
    }).map(issue => issue.location)).toEqual([
      'secciones[1].contenido', 'secciones[1].lugares[0].descripcion',
      'secciones[1].lugares[0].horario', 'secciones[1].lugares[1].descripcion'
    ]);
  });

  it('checks only the targeted card and its descendants', () => {
    expect(validatePublishedInternalLanguage(scopedGuide(), {
      scope: 'targets', targets: ['secciones[1].lugares[0]']
    }).map(issue => issue.location)).toEqual([
      'secciones[1].lugares[0].descripcion', 'secciones[1].lugares[0].horario'
    ]);
  });

  it('reaches a deep property target even when its parent is not in scope', () => {
    expect(validatePublishedInternalLanguage(scopedGuide(), {
      scope: 'targets', targets: ['secciones[1].lugares[1].descripcion']
    })).toEqual([jasmine.objectContaining({ location: 'secciones[1].lugares[1].descripcion' })]);
  });

  it('does not confuse indices 2 and 20', () => {
    const guide = { secciones: [{ lugares: Array.from({ length: 21 }, () => ({ descripcion: phrase })) }] };
    for (const index of [2, 20]) {
      expect(validatePublishedInternalLanguage(guide, {
        scope: 'targets', targets: [`secciones[0].lugares[${index}].descripcion`]
      }).map(issue => issue.location)).toEqual([`secciones[0].lugares[${index}].descripcion`]);
    }
  });

  it('does not scan a sibling field when the target is technical', () => {
    const guide = { secciones: [{ lugares: [{ web: phrase, descripcion: phrase }] }] };
    expect(validatePublishedInternalLanguage(guide, {
      scope: 'targets', targets: ['secciones[0].lugares[0].web']
    })).toEqual([]);
  });

  for (const field of ['nombre', 'titulo', 'descripcion', 'contenido', 'dia', 'horario', 'precio',
    'precioOrientativo', 'fecha', 'acceso', 'direccion']) {
    it(`checks published string field ${field}`, () => {
      expect(validatePublishedInternalLanguage({ [field]: phrase }, fullGuide))
        .toEqual([jasmine.objectContaining({ location: field })]);
    });
  }

  for (const field of ['idioma', 'moneda', 'hora', 'internet', 'electricidad', 'pasaporte', 'visado', 'vacunas']) {
    it(`checks infoGeneral.${field}`, () => {
      expect(validatePublishedInternalLanguage({ infoGeneral: { [field]: phrase } }, fullGuide))
        .toEqual([jasmine.objectContaining({ location: `infoGeneral.${field}` })]);
    });
  }

  it('preserves all locations across known nested editorial structures', () => {
    const guide = { secciones: [null, {}, {
      contenido: phrase, lugares: [null, { descripcion: phrase }], platos: [{ descripcion: phrase }],
      subsecciones: [{ lugares: [null, null, null, { horario: phrase }] }],
      itinerario: [{ dia: phrase, zonas: [null, { descripcion: phrase }] }]
    }, {}, { lugares: [null, { guiaRelacionada: { nombre: phrase, path: phrase } }] }] };
    expect(validatePublishedInternalLanguage(guide, fullGuide).map(issue => issue.location)).toEqual([
      'secciones[2].contenido', 'secciones[2].lugares[1].descripcion',
      'secciones[2].platos[0].descripcion', 'secciones[2].subsecciones[0].lugares[3].horario',
      'secciones[2].itinerario[0].dia', 'secciones[2].itinerario[0].zonas[1].descripcion',
      'secciones[4].lugares[1].guiaRelacionada.nombre'
    ]);
  });

  for (const field of ['web', 'reserva', 'maps', 'mapaUrl', 'telefono', 'foto', 'flag', 'flag2',
    'background', 'path', 'bgPos', 'bgPosMobile', 'bgSize', 'bgSizeMobile', 'flagSize',
    'flagSizeMobile', 'id', 'otroCampo', 'duracion']) {
    it(`ignores technical or unlisted string field ${field}`, () => {
      expect(validatePublishedInternalLanguage({ [field]: phrase }, fullGuide)).toEqual([]);
    });
  }

  it('inspects only guiaRelacionada.nombre without traversing its other fields or descendants', () => {
    const guiaRelacionada = {
      nombre: 'Guía relacionada normal',
      descripcion: 'según nuestra investigación',
      contenido: 'tras nuestra investigación',
      horario: 'Codex ha detectado',
      secciones: [{ contenido: 'el agente ha determinado' }],
      guiaRelacionada: { nombre: 'durante la auditoría de esta guía' }
    };
    const guide = { secciones: [{ lugares: [{ guiaRelacionada }] }] };
    expect(validatePublishedInternalLanguage(guide, fullGuide)).toEqual([]);

    guiaRelacionada.nombre = 'según nuestra investigación';
    expect(validatePublishedInternalLanguage(guide, fullGuide)).toEqual([
      jasmine.objectContaining({
        severity: 'ERROR', category: 'internal-language',
        location: 'secciones[0].lugares[0].guiaRelacionada.nombre'
      })
    ]);
  });

  it('does not walk strings or objects inside technical and unknown properties', () => {
    const hidden = { descripcion: phrase, lugares: [{ nombre: phrase }] };
    expect(validatePublishedInternalLanguage({
      fotos: [phrase, hidden], tiposPlan: [phrase, hidden], perfilAlimentario: hidden,
      alergenos: hidden, posiblesAlergenos: [hidden], perfilAlergenos: phrase,
      otroCampo: hidden, infoGeneral: { otroCampo: hidden, descripcion: phrase }
    }, fullGuide)).toEqual([]);
  });

  const validTexts = [
    'Los horarios pueden variar según la temporada.',
    'Conviene confirmar los horarios antes de la visita.', 'Reserva pendiente de confirmación.',
    'Una fuente de hierro fundido.', 'El dinero generado por el estrecho...',
    'Acceso libre todo el día.', 'Según actividades o aperturas específicas.',
    'Revisión de seguridad.', 'Modelo arquitectónico.', 'Fuente documental histórica.',
    'ChatGPT', 'QA', 'prompt', 'Codex', 'IA', 'audit', 'auditoría', 'TODO', 'FIXME',
    'no se ha podido verificar', 'pendiente de comprobar', 'hemos verificado',
    'requiere revisión', 'nivel de confianza'
  ];
  for (const text of validTexts) {
    it(`does not flag contextual or out-of-scope pattern ${text}`, () => {
      expect(validateText(text)).toEqual([]);
    });
  }

  it('does not flag normal titles, names or other strings', () => {
    expect(validatePublishedInternalLanguage({ nombre: 'Destino', secciones: [{
      titulo: 'Historia', contenido: 'Historia local.', lugares: [{ nombre: 'Fuente monumental', precio: 'Gratis' }]
    }] }, fullGuide)).toEqual([]);
  });

  it('ignores non-string text fields without making them required', () => {
    for (const value of [undefined, null, 1, false, [], {}, { descripcion: phrase }]) {
      expect(validatePublishedInternalLanguage({ descripcion: value, infoGeneral: { internet: value } }, fullGuide))
        .toEqual([]);
    }
  });

  it('ignores malformed guides, collections and records without throwing', () => {
    for (const guide of [null, undefined, [], 1, 'Guía', {}, { infoGeneral: [] },
      { secciones: {} }, { secciones: [null, undefined, [], 1, false, phrase] },
      { secciones: [{ lugares: {}, platos: null, subsecciones: phrase, itinerario: false,
        zonas: 1, guiaRelacionada: [] }] }]) {
      expect(() => validatePublishedInternalLanguage(guide, fullGuide)).not.toThrow();
      expect(validatePublishedInternalLanguage(guide, fullGuide)).toEqual([]);
    }
  });

  it('does not mutate frozen text, guides, arrays or contexts', () => {
    const guide = Object.freeze({ descripcion: phrase, secciones: Object.freeze([
      Object.freeze({ lugares: Object.freeze([Object.freeze({ descripcion: phrase })]) })
    ]) });
    const context: FactoryReviewContext = Object.freeze({ scope: 'targets',
      targets: Object.freeze(['descripcion', 'secciones[0].lugares[0].descripcion']) });
    const before = JSON.stringify({ guide, context });
    expect(validatePublishedInternalLanguage(guide, context).length).toBe(2);
    expect(JSON.stringify({ guide, context })).toBe(before);
  });

  it('uses only the name of the current object as item', () => {
    const issues = validatePublishedInternalLanguage({ nombre: 'Guía', contenido: phrase, secciones: [{
      contenido: phrase, lugares: [{ nombre: 'Ficha', descripcion: phrase }, { nombre: 1, descripcion: phrase }]
    }] }, fullGuide);
    expect(issues.map(issue => issue.item)).toEqual(['Guía', undefined, 'Ficha', undefined]);
  });

  it('handles cycles without suppressing shared objects at different locations', () => {
    const shared: Record<string, unknown> = { descripcion: phrase };
    shared['guiaRelacionada'] = shared;
    expect(validatePublishedInternalLanguage({ secciones: [{ lugares: [shared, shared] }] }, fullGuide)
      .map(issue => issue.location)).toEqual([
        'secciones[0].lugares[0].descripcion', 'secciones[0].lugares[1].descripcion'
      ]);
  });

  it('keeps the municipal combined validator independent and without implicit scope', () => {
    const guide = { ...municipalGuide(), descripcion: phrase };
    expect(validatePublishedInternalLanguage(guide, fullGuide).length).toBe(1);
    expect(validateSpanishMunicipalGuideRules(guide)).toEqual([]);
  });
});

describe('validateGuideTechnicalUrls', () => {
  const context: FactoryReviewContext = { scope: 'guide' };
  const fields = ['web', 'reserva', 'maps', 'mapaUrl'] as const;
  const targets = (...locations: string[]): FactoryReviewContext => ({ scope: 'targets', targets: locations });

  for (const field of fields) {
    for (const value of ['https://example.org/recurso', 'http://example.org/recurso']) {
      it(`accepts ${value} in ${field} without warnings`, () => {
        expect(validateGuideTechnicalUrls({ [field]: value }, context)).toEqual([]);
      });
    }
    for (const value of [null, undefined]) {
      it(`ignores own ${field} with ${value}`, () => {
        expect(validateGuideTechnicalUrls({ [field]: value }, context)).toEqual([]);
      });
    }
    for (const value of ['', ' \t\n ', 42, false, [], {}, Symbol('url'), () => 'https://example.org']) {
      it(`reports one error for unusable ${field} value ${typeof value}`, () => {
        const issues = validateGuideTechnicalUrls({ [field]: value }, context);
        expect(issues.length).toBe(1);
        expect(issues[0]).toEqual(jasmine.objectContaining({
          severity: 'ERROR', category: 'technical-url', location: field
        }));
      });
    }
    for (const value of ['/relativa', 'texto cualquiera', 'https://', '//example.org',
      'ftp://example.org', 'file:///recurso', 'javascript:alert(1)', 'data:text/plain,contenido']) {
      it(`rejects ${value} in ${field}`, () => {
        expect(validateGuideTechnicalUrls({ [field]: value }, context).length).toBe(1);
      });
    }
    it(`ignores inherited ${field}`, () => {
      expect(validateGuideTechnicalUrls(Object.create({ [field]: 'inválido' }), context)).toEqual([]);
    });
  }

  it('does not require any link properties', () => {
    expect(validateGuideTechnicalUrls({ secciones: [{ lugares: [{}] }] }, context)).toEqual([]);
  });

  for (const field of ['web', 'maps', 'mapaUrl'] as const) {
    for (const value of ['tel:956123456', 'mailto:reservas@example.org']) {
      it(`rejects ${value} outside reserva in ${field}`, () => {
        expect(validateGuideTechnicalUrls({ [field]: value }, context).length).toBe(1);
      });
    }
  }

  for (const value of [
    'https://www.google.com/maps/place/Monumento',
    'https://www.google.com/maps/search/?api=1&query=Monumento',
    'https://maps.google.com/?q=36.6,-6.3',
    'https://maps.app.goo.gl/referencia',
    'https://goo.gl/maps/referencia',
    'https://www.google.com/maps?cid=123456',
    'https://www.google.com/maps/@36.6,-6.3,15z',
    'https://www.google.com/maps/search/?api=1&query=Monumento&query_place_id=identificador',
    'http://maps.google.com/?q=Monumento',
    'https://example.org/mapa',
    'https://www.google.com/maps/dir/Origen/Destino'
  ]) {
    it(`accepts the technical maps reference ${value}`, () => {
      expect(validateGuideTechnicalUrls({ maps: value }, context)).toEqual([]);
    });
  }

  it('does not penalize or migrate mapaUrl, or require maps', () => {
    const guide = Object.freeze({ mapaUrl: 'https://example.org/mapa' });
    expect(validateGuideTechnicalUrls(guide, context)).toEqual([]);
    expect(Object.keys(guide)).toEqual(['mapaUrl']);
    expect(guide.mapaUrl).toBe('https://example.org/mapa');
  });

  for (const value of ['https://www.instagram.com/establecimiento', 'https://www.facebook.com/establecimiento']) {
    it(`does not judge officiality of ${value}`, () => {
      expect(validateGuideTechnicalUrls({ web: value }, context)).toEqual([]);
    });
  }

  it('accepts a contact page without certifying direct reservation', () => {
    expect(validateGuideTechnicalUrls({ reserva: 'https://example.org/contacto' }, context)).toEqual([]);
  });

  for (const value of ['tel:956123456', 'tel:+34956123456', 'tel:1234567', 'tel:+123456789012345',
    'tel:%2B34956123456', 'tel:%39%35%36%31%32%33%34%35%36']) {
    it(`accepts compatible reservation phone ${value}`, () => {
      expect(validateGuideTechnicalUrls({ reserva: value }, context)).toEqual([]);
    });
  }
  for (const value of ['tel:123456', 'tel:1234567890123456', 'tel:', 'tel:956 123456',
    'tel:956-123456', 'tel:(956)123456', 'tel:956123456?ext=1', 'tel:956123456#ext',
    'tel:956123456?', 'tel:956123456#', 'tel:956123456texto', 'tel:++34956123456',
    'tel:956\t123456', 'tel:956\n123456', 'tel:956%20123456', 'tel:%ZZ']) {
    it(`rejects invalid reservation phone ${JSON.stringify(value)}`, () => {
      expect(validateGuideTechnicalUrls({ reserva: value }, context).length).toBe(1);
    });
  }

  for (const value of ['mailto:reservas@example.org', 'mailto:reservas@example.org?subject=Reserva&body=Hola',
    'mailto:reservas%40example.org', 'mailto:reservas@example.org#referencia']) {
    it(`preserves auditor mailto compatibility for ${value}`, () => {
      expect(validateGuideTechnicalUrls({ reserva: value }, context)).toEqual([]);
    });
  }
  for (const value of ['mailto:', 'mailto:reservas', 'mailto:reservas@example',
    'mailto:uno@example.org,dos@example.org', 'mailto:uno@example.org;dos@example.org',
    'mailto:%20reservas@example.org', 'mailto:<reservas@example.org>', 'mailto:%ZZ@example.org',
    'mailto:?subject=Reserva', 'sms:956123456']) {
    it(`rejects invalid reservation recipient or protocol ${value}`, () => {
      expect(validateGuideTechnicalUrls({ reserva: value }, context).length).toBe(1);
    });
  }

  const scopedGuide = () => ({
    web: 'inválida',
    secciones: [
      { web: 'inválida', lugares: [{ nombre: 'Primero', maps: 'inválido', reserva: 'inválida' }, { web: 'inválida' }] },
      { platos: [{ web: 'inválida' }] }
    ]
  });

  it('visits all stored references in guide scope', () => {
    expect(validateGuideTechnicalUrls(scopedGuide(), context).map(issue => issue.location)).toEqual([
      'web', 'secciones[0].web', 'secciones[0].lugares[0].reserva',
      'secciones[0].lugares[0].maps', 'secciones[0].lugares[1].web', 'secciones[1].platos[0].web'
    ]);
  });
  it('limits section scope to its properties and descendants', () => {
    expect(validateGuideTechnicalUrls(scopedGuide(), targets('secciones[0]')).map(issue => issue.location)).toEqual([
      'secciones[0].web', 'secciones[0].lugares[0].reserva',
      'secciones[0].lugares[0].maps', 'secciones[0].lugares[1].web'
    ]);
  });
  it('limits card scope and excludes sibling cards', () => {
    expect(validateGuideTechnicalUrls(scopedGuide(), targets('secciones[0].lugares[0]')).map(issue => issue.location))
      .toEqual(['secciones[0].lugares[0].reserva', 'secciones[0].lugares[0].maps']);
  });
  it('checks only the targeted property, reaching it through out-of-scope ancestors', () => {
    expect(validateGuideTechnicalUrls(scopedGuide(), targets('secciones[0].lugares[0].maps')).map(issue => issue.location))
      .toEqual(['secciones[0].lugares[0].maps']);
  });
  it('does not inspect a sibling target with no stored references', () => {
    expect(validateGuideTechnicalUrls(scopedGuide(), targets('secciones[0].lugares[0].nombre'))).toEqual([]);
  });
  it('distinguishes indices 2 and 20', () => {
    const lugares = Array.from({ length: 21 }, () => ({ maps: 'inválido' }));
    const guide = { secciones: [{ lugares }] };
    expect(validateGuideTechnicalUrls(guide, targets('secciones[0].lugares[2]')).map(issue => issue.location))
      .toEqual(['secciones[0].lugares[2].maps']);
    expect(validateGuideTechnicalUrls(guide, targets('secciones[0].lugares[20]')).map(issue => issue.location))
      .toEqual(['secciones[0].lugares[20].maps']);
  });
  it('reaches a deep property without pruning ancestors', () => {
    const guide = { secciones: [{ subsecciones: [{ lugares: [{ web: 'inválida', maps: 'inválido' }] }] }] };
    const location = 'secciones[0].subsecciones[0].lugares[0].web';
    expect(validateGuideTechnicalUrls(guide, targets(location)).map(issue => issue.location)).toEqual([location]);
  });
  it('includes card descendants in card scope', () => {
    const guide = { lugares: [{ web: 'inválida', zonas: [{ maps: 'inválido' }] }, { web: 'inválida' }] };
    expect(validateGuideTechnicalUrls(guide, targets('lugares[0]')).map(issue => issue.location))
      .toEqual(['lugares[0].web', 'lugares[0].zonas[0].maps']);
  });

  it('retains original indices across every known collection and malformed entries', () => {
    const guide = {
      web: 'inválida',
      secciones: [null, 42, {
        lugares: [false, { maps: 'inválido' }],
        platos: [null, [], { web: 'inválida' }],
        subsecciones: [{ lugares: [null, 'texto', { mapaUrl: 'inválido' }] }],
        itinerario: [null, { reserva: 'inválida', zonas: [null, { maps: 'inválido' }] }]
      }]
    };
    expect(validateGuideTechnicalUrls(guide, context).map(issue => issue.location)).toEqual([
      'web', 'secciones[2].lugares[1].maps', 'secciones[2].platos[2].web',
      'secciones[2].subsecciones[0].lugares[2].mapaUrl', 'secciones[2].itinerario[1].reserva',
      'secciones[2].itinerario[1].zonas[1].maps'
    ]);
  });
  for (const collection of ['secciones', 'lugares', 'platos', 'subsecciones', 'itinerario', 'zonas']) {
    it(`allows the known collection ${collection} at the root`, () => {
      expect(validateGuideTechnicalUrls({ [collection]: [{ web: 'inválida' }] }, context).map(issue => issue.location))
        .toEqual([`${collection}[0].web`]);
    });
    for (const value of [null, undefined, 42, 'texto', { web: 'inválida' }]) {
      it(`ignores malformed ${collection} collection of type ${typeof value}`, () => {
        expect(validateGuideTechnicalUrls({ [collection]: value }, context)).toEqual([]);
      });
    }
  }

  for (const field of ['guiaRelacionada', 'infoGeneral', 'perfilAlimentario', 'alergenos', 'desconocido']) {
    it(`does not walk ${field} or collections hidden inside it`, () => {
      const hidden = { web: 'inválida', reserva: 'inválida', maps: 'inválido', mapaUrl: 'inválido',
        secciones: [{ lugares: [{ maps: 'inválido' }] }] };
      const guide = { [field]: hidden, lugares: [{ [field]: hidden }] };
      expect(validateGuideTechnicalUrls(guide, context)).toEqual([]);
    });
  }
  it('does not inspect arbitrary strings, phone numbers, or image references', () => {
    expect(validateGuideTechnicalUrls({ descripcion: 'https://', telefono: 'inválido', foto: 'inválida',
      fotos: ['inválida'], contenido: 'reserva: inválida' }, context)).toEqual([]);
  });

  for (const guide of [null, undefined, true, 42, 'texto', [], [{ web: 'inválida' }]]) {
    it(`ignores malformed guide of type ${typeof guide}`, () => {
      expect(() => validateGuideTechnicalUrls(guide, context)).not.toThrow();
      expect(validateGuideTechnicalUrls(guide, context)).toEqual([]);
    });
  }
  it('does not mutate frozen objects or arrays', () => {
    const card = Object.freeze({ nombre: 'Lugar', maps: 'inválido', mapaUrl: 'https://example.org' });
    const lugares = Object.freeze([card]);
    const section = Object.freeze({ lugares });
    const guide = Object.freeze({ secciones: Object.freeze([section]) });
    const before = JSON.stringify(guide);
    expect(validateGuideTechnicalUrls(guide, context).length).toBe(1);
    expect(JSON.stringify(guide)).toBe(before);
    expect(guide.secciones[0].lugares).toBe(lugares);
    expect(lugares[0]).toBe(card);
  });
  it('uses the current object string name and reports each property once without exposing the value', () => {
    const secret = 'valor privado inválido';
    const issues = validateGuideTechnicalUrls({ nombre: 'Lugar', web: secret, reserva: secret,
      maps: secret, mapaUrl: secret }, context);
    expect(issues.map(issue => issue.location)).toEqual(['web', 'reserva', 'maps', 'mapaUrl']);
    for (const issue of issues) {
      expect(issue.severity).toBe('ERROR');
      expect(issue.category).toBe('technical-url');
      expect(issue.item).toBe('Lugar');
      expect(issue.detail).not.toContain(secret);
    }
  });
  it('does not inherit a parent item name or coerce a non-string name', () => {
    const issues = validateGuideTechnicalUrls({ nombre: 'Guía', lugares: [{ nombre: 42, web: 'inválida' },
      { maps: 'inválido' }] }, context);
    expect(issues.length).toBe(2);
    expect(issues.every(issue => !Object.prototype.hasOwnProperty.call(issue, 'item'))).toBeTrue();
  });
  it('handles cycles and visits shared objects at each distinct location', () => {
    const card: { web: string; zonas?: unknown[] } = { web: 'inválida' };
    card.zonas = [card];
    expect(validateGuideTechnicalUrls({ lugares: [card, card] }, context).map(issue => issue.location))
      .toEqual(['lugares[0].web', 'lugares[1].web']);
  });
  it('leaves the municipal combined validator independent of technical URLs', () => {
    const guide = { ...municipalGuide(), web: 'inválida', maps: 'inválido', reserva: 'inválida', mapaUrl: 'inválido' };
    expect(validateSpanishMunicipalGuideRules(guide)).toEqual([]);
    expect(validateGuideTechnicalUrls(guide, context).length).toBe(4);
  });
  it('does not assume guide scope for empty targets or malformed or absent context', () => {
    const guide = { web: 'inválida' };
    expect(validateGuideTechnicalUrls(guide, targets())).toEqual([]);
    for (const value of [undefined, null, {}, { scope: 'desconocido' }]) {
      expect(validateGuideTechnicalUrls(guide, value as FactoryReviewContext)).toEqual([]);
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

  it('returns structure, images, visits, festivals and restaurant blocks in that order', () => {
    const guide = { secciones: [
      { titulo: 'Dónde comer en Rota', lugares: [{
        foto: 'image', descripcion: '💡 Consejo AvenTourArte:\n🍴 Qué pedir sí o sí:'
      }] },
      { titulo: 'Fiestas y Festivos Principales', lugares: [{ fecha: 'Agosto', nombre: 'Fiesta' }] },
      { titulo: 'Qué visitar en Rota', lugares: [{}] }
    ] };
    const issues = validateSpanishMunicipalGuideRules(guide);
    expect(issues).toEqual([
      ...validateSpanishMunicipalSectionOrder(guide),
      ...validateSpanishMunicipalForbiddenImages(guide),
      ...validateSpanishMunicipalVisitCards(guide),
      ...validateSpanishMunicipalFestivalCards(guide),
      ...validateSpanishMunicipalRestaurantEditorialBlocks(guide)
    ]);
    expect(issues.map(issue => issue.category)).toEqual(['structure', 'images', 'visit', 'festival', 'restaurant']);
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
