import type { FactoryQaIssue } from './guide-factory-qa';
import type { FactoryReviewContext } from './guide-factory-context';
import { isFactoryLocationInScope } from './guide-factory-context';
import { DIETARY_PREFERENCES } from './gastronomy-preferences';
import type { AlcoholProfile, PorkProfile } from './gastronomy-preferences';
import { PLAN_TYPES } from './plan-types';

const SECTION_ORDER = [
  'historia',
  'geografia y clima',
  'que visitar',
  'gastronomia',
  'donde comer',
  'cultura y vida local',
  'fiestas y festivos principales'
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sectionsOf(guide: unknown): unknown[] | null {
  return isRecord(guide) && Array.isArray(guide['secciones']) ? guide['secciones'] : null;
}

function sectionTitle(section: unknown): string {
  if (!isRecord(section) || typeof section['titulo'] !== 'string') return '';
  return section['titulo'].normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim().replace(/\s+/g, ' ');
}

function sectionRole(section: unknown): string {
  const title = sectionTitle(section);
  if (/^que visitar(?: en .+)?$/.test(title)) return 'que visitar';
  if (/^donde comer(?: en .+)?$/.test(title)) return 'donde comer';
  return title;
}

/** El llamador debe haber establecido que se trata de una guía municipal española. */
export function validateSpanishMunicipalSectionOrder(guide: unknown): FactoryQaIssue[] {
  const sections = sectionsOf(guide);
  if (!sections) {
    return [{
      severity: 'ERROR', category: 'structure', location: 'secciones',
      detail: 'La guía municipal española debe tener un array de secciones.'
    }];
  }

  if (sections.length !== SECTION_ORDER.length) {
    return [{
      severity: 'ERROR', category: 'structure', location: 'secciones',
      detail: 'La guía municipal española debe contener exactamente las siete secciones oficiales.'
    }];
  }

  const mismatch = SECTION_ORDER.findIndex((expected, index) =>
    sectionRole(sections[index]) !== expected
  );
  return mismatch < 0 ? [] : [{
    severity: 'ERROR', category: 'structure', location: `secciones[${mismatch}].titulo`,
    detail: 'Las secciones no siguen el orden oficial de las guías municipales españolas.'
  }];
}

/** Comprueba las fichas de lugares de Dónde comer y Fiestas, sin inferir el ámbito. */
export function validateSpanishMunicipalForbiddenImages(guide: unknown): FactoryQaIssue[] {
  const issues: FactoryQaIssue[] = [];
  const sections = sectionsOf(guide) ?? [];
  sections.forEach((section, sectionIndex) => {
    const role = sectionRole(section);
    if (role !== 'donde comer' && role !== 'fiestas y festivos principales') return;
    if (!isRecord(section) || !Array.isArray(section['lugares'])) return;

    section['lugares'].forEach((item: unknown, itemIndex: number) => {
      if (!isRecord(item)) return;
      if (!Object.prototype.hasOwnProperty.call(item, 'foto')
        && !Object.prototype.hasOwnProperty.call(item, 'fotos')) return;

      issues.push({
        severity: 'ERROR', category: 'images',
        location: `secciones[${sectionIndex}].lugares[${itemIndex}]`,
        ...(typeof item['nombre'] === 'string' ? { item: item['nombre'] } : {}),
        detail: role === 'donde comer'
          ? 'Las fichas de Dónde comer no deben incluir foto ni fotos.'
          : 'Las fichas de Fiestas y Festivos Principales no deben incluir foto ni fotos.'
      });
    });
  });
  return issues;
}

const VISIT_PROPERTY_ORDER = new Map<string, number>([
  ['nombre', 0], ['tiposPlan', 1], ['descripcion', 2],
  ['foto', 3], ['fotos', 3], ['horario', 4], ['precio', 5],
  ['direccion', 6], ['maps', 7], ['telefono', 8], ['web', 9], ['reserva', 10]
]);
const VALID_PLAN_TYPES = new Set<string>(PLAN_TYPES.map(type => type.id));

/** Valida solo lugares directos de Qué visitar; el ámbito lo establece el llamador. */
export function validateSpanishMunicipalVisitCards(guide: unknown): FactoryQaIssue[] {
  const issues: FactoryQaIssue[] = [];
  (sectionsOf(guide) ?? []).forEach((section, sectionIndex) => {
    if (sectionRole(section) !== 'que visitar'
      || !isRecord(section) || !Array.isArray(section['lugares'])) return;

    section['lugares'].forEach((item: unknown, itemIndex: number) => {
      if (!isRecord(item)) return;
      const location = `secciones[${sectionIndex}].lugares[${itemIndex}]`;
      const label = typeof item['nombre'] === 'string' ? { item: item['nombre'] } : {};
      const types = item['tiposPlan'];
      if (!Object.prototype.hasOwnProperty.call(item, 'tiposPlan')
        || !Array.isArray(types) || types.length === 0
        || !Array.from(types).every(type => typeof type === 'string' && VALID_PLAN_TYPES.has(type))) {
        issues.push({
          severity: 'ERROR', category: 'visit', location: `${location}.tiposPlan`, ...label,
          detail: 'La ficha debe declarar tiposPlan como un array no vacío de valores del catálogo vigente.'
        });
      }

      let previousRank = -1;
      for (const key of Object.keys(item)) {
        const rank = VISIT_PROPERTY_ORDER.get(key);
        if (rank === undefined) continue;
        if (rank < previousRank) {
          issues.push({
            severity: 'ERROR', category: 'visit', location, ...label,
            detail: 'Las propiedades presentes de la ficha no respetan el orden canónico de Qué visitar.'
          });
          break;
        }
        previousRank = rank;
      }
    });
  });
  return issues;
}

const FESTIVAL_PROPERTY_ORDER = new Map<string, number>([
  ['nombre', 0], ['descripcion', 1], ['fecha', 2], ['precio', 3]
]);

/** Comprueba solo el orden de lugares directos de Fiestas; no exige campos. */
export function validateSpanishMunicipalFestivalCards(guide: unknown): FactoryQaIssue[] {
  const issues: FactoryQaIssue[] = [];
  (sectionsOf(guide) ?? []).forEach((section, sectionIndex) => {
    if (sectionRole(section) !== 'fiestas y festivos principales'
      || !isRecord(section) || !Array.isArray(section['lugares'])) return;

    section['lugares'].forEach((item: unknown, itemIndex: number) => {
      if (!isRecord(item)) return;
      let previousRank = -1;
      for (const key of Object.keys(item)) {
        const rank = FESTIVAL_PROPERTY_ORDER.get(key);
        if (rank === undefined) continue;
        if (rank < previousRank) {
          issues.push({
            severity: 'ERROR', category: 'festival',
            location: `secciones[${sectionIndex}].lugares[${itemIndex}]`,
            ...(typeof item['nombre'] === 'string' ? { item: item['nombre'] } : {}),
            detail: 'Las propiedades presentes de la ficha no respetan el orden canónico de Fiestas y Festivos Principales.'
          });
          break;
        }
        previousRank = rank;
      }
    });
  });
  return issues;
}

const RESTAURANT_EDITORIAL_MARKERS = [
  '🍴 Qué pedir sí o sí:',
  '🧭 Experiencia viajera:',
  '💡 Consejo AvenTourArte:'
] as const;

/** Valida solo el orden y las repeticiones de marcadores exactos en descripcion. */
export function validateSpanishMunicipalRestaurantEditorialBlocks(guide: unknown): FactoryQaIssue[] {
  const issues: FactoryQaIssue[] = [];
  (sectionsOf(guide) ?? []).forEach((section, sectionIndex) => {
    if (sectionRole(section) !== 'donde comer'
      || !isRecord(section) || !Array.isArray(section['lugares'])) return;

    section['lugares'].forEach((item: unknown, itemIndex: number) => {
      if (!isRecord(item) || typeof item['descripcion'] !== 'string') return;
      const description = item['descripcion'];
      const occurrences: { position: number; rank: number }[] = [];
      let duplicated = false;
      RESTAURANT_EDITORIAL_MARKERS.forEach((marker, rank) => {
        let count = 0;
        let position = description.indexOf(marker);
        while (position !== -1) {
          occurrences.push({ position, rank });
          count += 1;
          position = description.indexOf(marker, position + marker.length);
        }
        if (count > 1) duplicated = true;
      });
      occurrences.sort((a, b) => a.position - b.position);
      const location = `secciones[${sectionIndex}].lugares[${itemIndex}].descripcion`;
      const label = typeof item['nombre'] === 'string' ? { item: item['nombre'] } : {};
      if (occurrences.some((occurrence, index) =>
        index > 0 && occurrence.rank < occurrences[index - 1].rank
      )) {
        issues.push({
          severity: 'ERROR', category: 'restaurant', location, ...label,
          detail: 'Los bloques editoriales presentes de Dónde comer no respetan el orden oficial.'
        });
      }
      if (duplicated) {
        issues.push({
          severity: 'ERROR', category: 'restaurant', location, ...label,
          detail: 'La descripción contiene marcadores editoriales oficiales duplicados.'
        });
      }
    });
  });
  return issues;
}

const VALID_DIET_COMPATIBILITIES = new Set<string>([
  ...DIETARY_PREFERENCES.map(preference => preference.id), 'ninguno'
]);
const FOOD_INGREDIENT_STATES: readonly (AlcoholProfile | PorkProfile)[] = [
  'contiene', 'puede-contener', 'no-contiene', 'desconocido'
];
const VALID_FOOD_INGREDIENT_STATES = new Set<string>(FOOD_INGREDIENT_STATES);

function hasValidFoodProfileStructure(profile: unknown): boolean {
  if (!isRecord(profile)
    || !['dieta', 'alcohol', 'cerdo'].every(key => Object.prototype.hasOwnProperty.call(profile, key))) {
    return false;
  }
  const diet = profile['dieta'];
  if (!isRecord(diet) || !Object.prototype.hasOwnProperty.call(diet, 'certeza')) return false;
  if (diet['certeza'] === 'confirmado') {
    if (!Object.prototype.hasOwnProperty.call(diet, 'compatibilidad')
      || typeof diet['compatibilidad'] !== 'string'
      || !VALID_DIET_COMPATIBILITIES.has(diet['compatibilidad'])) return false;
  } else if (diet['certeza'] !== 'variable' && diet['certeza'] !== 'desconocido') {
    return false;
  }
  return ['alcohol', 'cerdo'].every(key =>
    typeof profile[key] === 'string' && VALID_FOOD_INGREDIENT_STATES.has(profile[key])
  );
}

/** Valida solo perfiles de platos directos incluidos explícitamente en la revisión. */
export function validateGastronomyFoodProfiles(
  guide: unknown,
  context: FactoryReviewContext
): FactoryQaIssue[] {
  const issues: FactoryQaIssue[] = [];
  (sectionsOf(guide) ?? []).forEach((section, sectionIndex) => {
    if (!/^gastronomia(?: de .+)?$/.test(sectionTitle(section))
      || !isRecord(section) || !Array.isArray(section['platos'])) return;

    section['platos'].forEach((dish: unknown, dishIndex: number) => {
      if (!isRecord(dish)) return;
      const location = `secciones[${sectionIndex}].platos[${dishIndex}]`;
      if (!isFactoryLocationInScope(context, location)) return;
      const present = Object.prototype.hasOwnProperty.call(dish, 'perfilAlimentario');
      if (present && hasValidFoodProfileStructure(dish['perfilAlimentario'])) return;
      issues.push({
        severity: 'ERROR',
        category: 'gastronomy',
        location: `${location}.perfilAlimentario`,
        ...(typeof dish['nombre'] === 'string' ? { item: dish['nombre'] } : {}),
        detail: present
          ? 'El perfilAlimentario no respeta la estructura mínima del modelo vigente.'
          : 'La ficha gastronómica en revisión debe declarar perfilAlimentario.'
      });
    });
  });
  return issues;
}

function normalizePublishedText(text: string): string {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, ' ').trim();
}

const INTERNAL_LANGUAGE_PATTERNS = [
  'según nuestra investigación',
  'tras nuestra investigación',
  'según las fuentes consultadas',
  'el agente ha determinado',
  'Codex ha detectado',
  'durante la auditoría de esta guía',
  'esta guía ha sido generada por ChatGPT'
].map(phrase => new RegExp(
  `(?:^|[^\\p{L}\\p{N}_])${normalizePublishedText(phrase)}(?=$|[^\\p{L}\\p{N}_])`, 'u'
));
const PUBLISHED_TEXT_FIELDS = [
  'nombre', 'titulo', 'descripcion', 'contenido', 'dia', 'horario', 'precio',
  'precioOrientativo', 'fecha', 'acceso', 'direccion'
] as const;
const PUBLISHED_GENERAL_INFO_FIELDS = [
  'idioma', 'moneda', 'hora', 'internet', 'electricidad', 'pasaporte', 'visado', 'vacunas'
] as const;
const EDITORIAL_COLLECTIONS = [
  'secciones', 'lugares', 'platos', 'subsecciones', 'itinerario', 'zonas'
] as const;

/** Examina solo campos publicados conocidos, con alcance explícito por propiedad. */
export function validatePublishedInternalLanguage(
  guide: unknown,
  context: FactoryReviewContext
): FactoryQaIssue[] {
  const issues: FactoryQaIssue[] = [];
  const ancestors = new WeakSet<object>();
  const childLocation = (parent: string, field: string) => parent ? `${parent}.${field}` : field;
  const inspectText = (object: Record<string, unknown>, location: string, fields: readonly string[]) => {
    for (const field of fields) {
      const value = object[field];
      const propertyLocation = childLocation(location, field);
      if (typeof value !== 'string' || !isFactoryLocationInScope(context, propertyLocation)) continue;
      const normalized = normalizePublishedText(value);
      if (!INTERNAL_LANGUAGE_PATTERNS.some(pattern => pattern.test(normalized))) continue;
      issues.push({
        severity: 'ERROR', category: 'internal-language', location: propertyLocation,
        ...(typeof object['nombre'] === 'string' ? { item: object['nombre'] } : {}),
        detail: 'El contenido publicado expone lenguaje interno del proceso de creación, investigación o validación.'
      });
    }
  };
  const visit = (object: unknown, location: string): void => {
    if (!isRecord(object) || ancestors.has(object)) return;
    ancestors.add(object);
    inspectText(object, location, PUBLISHED_TEXT_FIELDS);
    if (isRecord(object['infoGeneral'])) {
      inspectText(object['infoGeneral'], childLocation(location, 'infoGeneral'), PUBLISHED_GENERAL_INFO_FIELDS);
    }
    for (const collection of EDITORIAL_COLLECTIONS) {
      const values = object[collection];
      if (!Array.isArray(values)) continue;
      values.forEach((value: unknown, index: number) =>
        visit(value, `${childLocation(location, collection)}[${index}]`)
      );
    }
    if (isRecord(object['guiaRelacionada'])) {
      inspectText(object['guiaRelacionada'], childLocation(location, 'guiaRelacionada'), ['nombre']);
    }
    ancestors.delete(object);
  };
  visit(guide, '');
  return issues;
}

/** Valida referencias almacenadas propias, solo dentro del alcance explícito. */
export function validateGuideTechnicalUrls(
  guide: unknown,
  context: FactoryReviewContext
): FactoryQaIssue[] {
  const issues: FactoryQaIssue[] = [];
  const ancestors = new WeakSet<object>();
  const childLocation = (parent: string, field: string) => parent ? `${parent}.${field}` : field;
  const isValidReference = (value: unknown, field: string): boolean => {
    if (typeof value !== 'string' || !value.trim()) return false;
    try {
      const url = new URL(value);
      if (url.protocol === 'http:' || url.protocol === 'https:') return true;
      if (field !== 'reserva') return false;
      if (url.protocol === 'tel:') {
        return !/\s/.test(value) && !value.includes('?') && !value.includes('#')
          && !url.search && !url.hash
          && /^\+?[0-9]{7,15}$/.test(decodeURIComponent(url.pathname));
      }
      if (url.protocol === 'mailto:') {
        return /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(decodeURIComponent(url.pathname));
      }
      return false;
    } catch {
      return false;
    }
  };
  const visit = (object: unknown, location: string): void => {
    if (!isRecord(object) || ancestors.has(object)) return;
    ancestors.add(object);
    for (const field of ['web', 'reserva', 'maps', 'mapaUrl'] as const) {
      if (!Object.prototype.hasOwnProperty.call(object, field)) continue;
      const propertyLocation = childLocation(location, field);
      if (!isFactoryLocationInScope(context, propertyLocation)) continue;
      const value = object[field];
      if (value === null || value === undefined || isValidReference(value, field)) continue;
      issues.push({
        severity: 'ERROR',
        category: 'technical-url',
        location: propertyLocation,
        ...(typeof object['nombre'] === 'string' ? { item: object['nombre'] } : {}),
        detail: 'La referencia proporcionada no es una URL técnica válida para este campo.'
      });
    }
    for (const collection of EDITORIAL_COLLECTIONS) {
      const values = object[collection];
      if (!Array.isArray(values)) continue;
      values.forEach((value: unknown, index: number) =>
        visit(value, `${childLocation(location, collection)}[${index}]`)
      );
    }
    ancestors.delete(object);
  };
  visit(guide, '');
  return issues;
}

/** Comprueba referencias de imagen propias sin imponer cobertura ni verificar recursos. */
export function validateGuideImageReferences(
  guide: unknown,
  context: FactoryReviewContext
): FactoryQaIssue[] {
  const issues: FactoryQaIssue[] = [];
  const ancestors = new WeakSet<object>();
  const childLocation = (parent: string, field: string) => parent ? `${parent}.${field}` : field;
  const isValidReference = (value: unknown): boolean => {
    if (typeof value !== 'string' || !value.trim()) return false;
    if (!value.startsWith('cld:')) return true;
    return value.slice(4).replace(/^\/+/, '').trim().length > 0;
  };
  const report = (object: Record<string, unknown>, location: string, detail: string): void => {
    issues.push({
      severity: 'ERROR',
      category: 'technical-image',
      location,
      ...(typeof object['nombre'] === 'string' ? { item: object['nombre'] } : {}),
      detail
    });
  };
  const visit = (object: unknown, location: string): void => {
    if (!isRecord(object) || ancestors.has(object)) return;
    ancestors.add(object);
    const fields = location === '' ? ['foto', 'flag', 'flag2', 'background'] : ['foto'];
    for (const field of fields) {
      if (!Object.prototype.hasOwnProperty.call(object, field)) continue;
      const propertyLocation = childLocation(location, field);
      if (!isFactoryLocationInScope(context, propertyLocation)) continue;
      const value = object[field];
      if (value === null || value === undefined || isValidReference(value)) continue;
      report(object, propertyLocation, 'La referencia de imagen proporcionada no es técnicamente válida.');
    }
    if (Object.prototype.hasOwnProperty.call(object, 'fotos')) {
      const photos = object['fotos'];
      const propertyLocation = childLocation(location, 'fotos');
      if (photos !== null && photos !== undefined) {
        if (Array.isArray(photos)) {
          photos.forEach((value: unknown, index: number) => {
            const elementLocation = `${propertyLocation}[${index}]`;
            if (isFactoryLocationInScope(context, elementLocation) && !isValidReference(value)) {
              report(object, elementLocation, 'La referencia de imagen proporcionada no es técnicamente válida.');
            }
          });
        } else if (isFactoryLocationInScope(context, propertyLocation)) {
          report(object, propertyLocation, 'La galería proporcionada debe ser un array de referencias de imagen.');
        }
      }
    }
    for (const collection of EDITORIAL_COLLECTIONS) {
      const values = object[collection];
      if (!Array.isArray(values)) continue;
      values.forEach((value: unknown, index: number) =>
        visit(value, `${childLocation(location, collection)}[${index}]`)
      );
    }
    ancestors.delete(object);
  };
  visit(guide, '');
  return issues;
}

export function validateSpanishMunicipalGuideRules(guide: unknown): FactoryQaIssue[] {
  return [
    ...validateSpanishMunicipalSectionOrder(guide),
    ...validateSpanishMunicipalForbiddenImages(guide),
    ...validateSpanishMunicipalVisitCards(guide),
    ...validateSpanishMunicipalFestivalCards(guide),
    ...validateSpanishMunicipalRestaurantEditorialBlocks(guide)
  ];
}
