import type { FactoryQaIssue } from './guide-factory-qa';
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

export function validateSpanishMunicipalGuideRules(guide: unknown): FactoryQaIssue[] {
  return [
    ...validateSpanishMunicipalSectionOrder(guide),
    ...validateSpanishMunicipalForbiddenImages(guide),
    ...validateSpanishMunicipalVisitCards(guide),
    ...validateSpanishMunicipalFestivalCards(guide)
  ];
}
