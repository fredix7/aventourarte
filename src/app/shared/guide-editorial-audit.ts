import { dishAllergenProfile } from './gastronomy-allergens';

export type EditorialItemKind = 'visit' | 'dish' | 'restaurant' | 'event';
export type EditorialIssueSeverity = 'error' | 'warning';

export interface EditorialAuditIssue {
  severity: EditorialIssueSeverity;
  category: 'content' | 'visual' | 'practical' | 'links' | 'allergens';
  item: string;
  location: string;
  detail: string;
}

export interface GuideEditorialAudit {
  status: 'ready' | 'ready-with-warnings' | 'blocked';
  entities: {
    total: number;
    complete: number;
  };
  photos: {
    total: number;
    useful: number;
    placeholder: number;
    missing: number;
    notApplicable: number;
  };
  practical: {
    total: number;
    complete: number;
  };
  links: {
    total: number;
    valid: number;
  };
  allergens: {
    total: number;
    complete: number;
  };
  cloudinary: {
    references: number;
    uniqueReferences: number;
  };
  errors: EditorialAuditIssue[];
  warnings: EditorialAuditIssue[];
}

interface NormalizedEditorialItem {
  value: any;
  kind: EditorialItemKind;
  location: string;
  sectionTitle: string;
}

const normalize = (value: string): string => (value ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

const nonEmpty = (value: unknown): boolean => typeof value === 'string'
  ? value.trim().length > 0
  : value !== null && value !== undefined;

const priceValue = (item: any): unknown => item.precio ?? item.precioOrientativo;
const mapValue = (item: any): unknown => item.maps ?? item.mapaUrl;

function itemKind(sectionTitle: string, collection: 'lugares' | 'platos' | 'zonas'): EditorialItemKind {
  if (collection === 'platos') return 'dish';

  const title = normalize(sectionTitle);
  if (title.includes('donde comer')) return 'restaurant';
  if (title.includes('fiesta') || title.includes('festivo')) return 'event';
  return 'visit';
}

function collectEditorialItems(guide: any): NormalizedEditorialItem[] {
  const items: NormalizedEditorialItem[] = [];

  const collectSection = (
    section: any,
    location: string,
    inheritedTitle = '',
    inheritedKind?: EditorialItemKind
  ) => {
    const sectionTitle = String(section?.titulo ?? inheritedTitle);
    const detectedKind = itemKind(sectionTitle, 'lugares');
    const sectionKind = inheritedKind === 'restaurant' || inheritedKind === 'event'
      ? inheritedKind
      : detectedKind;

    for (const collection of ['lugares', 'platos'] as const) {
      const values = Array.isArray(section?.[collection]) ? section[collection] : [];
      values.forEach((value: any, index: number) => items.push({
        value,
        kind: collection === 'platos' ? 'dish' : sectionKind,
        location: `${location}.${collection}[${index}]`,
        sectionTitle
      }));
    }

    const subsections = Array.isArray(section?.subsecciones) ? section.subsecciones : [];
    subsections.forEach((subsection: any, index: number) =>
      collectSection(subsection, `${location}.subsecciones[${index}]`, sectionTitle, sectionKind)
    );

    const itinerary = Array.isArray(section?.itinerario) ? section.itinerario : [];
    itinerary.forEach((day: any, dayIndex: number) => {
      const zones = Array.isArray(day?.zonas) ? day.zonas : [];
      zones.forEach((value: any, zoneIndex: number) => items.push({
        value,
        kind: sectionKind,
        location: `${location}.itinerario[${dayIndex}].zonas[${zoneIndex}]`,
        sectionTitle
      }));
    });
  };

  const sections = Array.isArray(guide?.secciones) ? guide.secciones : [];
  sections.forEach((section: any, index: number) =>
    collectSection(section, `secciones[${index}]`)
  );

  return items;
}

function photoReferences(item: any): string[] {
  return [item?.foto, ...(Array.isArray(item?.fotos) ? item.fotos : [])]
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);
}

function isValidWebUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function collectStoredLinks(item: any): { field: string; value: string }[] {
  return ['web', 'reserva', 'maps', 'mapaUrl']
    .filter(field => nonEmpty(item?.[field]))
    .map(field => ({ field, value: String(item[field]) }));
}

function missingPracticalFields(item: NormalizedEditorialItem): string[] {
  const missing: string[] = [];

  if (item.kind === 'visit' || item.kind === 'restaurant') {
    if (!nonEmpty(item.value.horario)) missing.push('horario');
    if (!nonEmpty(item.value.direccion)) missing.push('direccion');
    if (!nonEmpty(mapValue(item.value))) missing.push('mapa');
    if (!nonEmpty(priceValue(item.value))) missing.push('precio');
  }

  if (item.kind === 'restaurant' && !nonEmpty(item.value.telefono) && !nonEmpty(item.value.web)) {
    missing.push('telefono o web');
  }

  if (item.kind === 'event') {
    if (!nonEmpty(item.value.fecha)) missing.push('fecha');
    if (!nonEmpty(priceValue(item.value))) missing.push('precio');
  }

  return missing;
}

export function auditGuideEditorial(guide: any): GuideEditorialAudit {
  const errors: EditorialAuditIssue[] = [];
  const warnings: EditorialAuditIssue[] = [];
  const safeGuide = guide ?? {};
  const items = collectEditorialItems(safeGuide);
  const heroReferences = new Set(
    [safeGuide.flag, safeGuide.flag2, safeGuide.background]
      .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
  );

  for (const field of ['path', 'nombre', 'descripcion']) {
    if (!nonEmpty(safeGuide[field])) {
      errors.push({
        severity: 'error',
        category: 'content',
        item: String(safeGuide.nombre ?? 'Guía'),
        location: field,
        detail: `Falta ${field}.`
      });
    }
  }

  if (!Array.isArray(safeGuide.secciones) || safeGuide.secciones.length === 0) {
    errors.push({
      severity: 'error',
      category: 'content',
      item: String(safeGuide.nombre ?? 'Guía'),
      location: 'secciones',
      detail: 'La guía no contiene secciones.'
    });
  }

  let completeEntities = 0;
  let usefulPhotos = 0;
  let placeholderPhotos = 0;
  let missingPhotos = 0;
  let photosNotApplicable = 0;
  let practicalTotal = 0;
  let practicalComplete = 0;
  let linkTotal = 0;
  let validLinks = 0;
  let allergenTotal = 0;
  let allergenComplete = 0;
  const cloudinaryReferences: string[] = [];

  for (const item of items) {
    const name = String(item.value?.nombre ?? 'Ficha sin nombre');
    const contentMissing = [
      !nonEmpty(item.value?.nombre) ? 'nombre' : null,
      !nonEmpty(item.value?.descripcion) ? 'descripcion' : null
    ].filter(Boolean) as string[];

    if (contentMissing.length === 0) {
      completeEntities += 1;
    } else {
      errors.push({
        severity: 'error',
        category: 'content',
        item: name,
        location: item.location,
        detail: `Faltan ${contentMissing.join(', ')}.`
      });
    }

    const photos = photoReferences(item.value);
    cloudinaryReferences.push(...photos.filter(photo => photo.startsWith('cld:')));
    const dedicatedPhotos = photos.filter(photo => !heroReferences.has(photo));

    const requiresPhoto = item.kind === 'visit' || item.kind === 'dish';
    if (!requiresPhoto) {
      photosNotApplicable += 1;
    } else {
      if (photos.length === 0) {
        missingPhotos += 1;
        warnings.push({
          severity: 'warning',
          category: 'visual',
          item: name,
          location: item.location,
          detail: 'No tiene fotografía asignada.'
        });
      } else if (dedicatedPhotos.length === 0) {
        placeholderPhotos += 1;
        warnings.push({
          severity: 'warning',
          category: 'visual',
          item: name,
          location: item.location,
          detail: 'Reutiliza una imagen de portada como placeholder.'
        });
      } else {
        usefulPhotos += 1;
      }
    }

    if (item.kind !== 'dish') {
      practicalTotal += 1;
      const missingFields = missingPracticalFields(item);
      if (missingFields.length === 0) {
        practicalComplete += 1;
      } else {
        errors.push({
          severity: 'error',
          category: 'practical',
          item: name,
          location: item.location,
          detail: `Faltan ${missingFields.join(', ')}.`
        });
      }
    }

    if (item.kind === 'dish') {
      allergenTotal += 1;
      const profile = dishAllergenProfile(name, String(safeGuide.path ?? ''));
      if (profile) {
        allergenComplete += 1;
      } else {
        errors.push({
          severity: 'error',
          category: 'allergens',
          item: name,
          location: item.location,
          detail: 'No tiene perfil de alérgenos.'
        });
      }
    }

    for (const link of collectStoredLinks(item.value)) {
      linkTotal += 1;
      if (!isValidWebUrl(link.value)) {
        errors.push({
          severity: 'error',
          category: 'links',
          item: name,
          location: `${item.location}.${link.field}`,
          detail: `${link.field} no contiene una URL válida.`
        });
        continue;
      }

      validLinks += 1;
      if (new URL(link.value).protocol !== 'https:') {
        warnings.push({
          severity: 'warning',
          category: 'links',
          item: name,
          location: `${item.location}.${link.field}`,
          detail: `${link.field} usa HTTP en lugar de HTTPS.`
        });
      }
    }

    if (nonEmpty(item.value?.telefono)) {
      const invalidPhones = String(item.value.telefono)
        .split('/')
        .map(phone => phone.trim())
        .filter(phone => phone.replace(/\D/g, '').length < 7);

      if (invalidPhones.length) {
        errors.push({
          severity: 'error',
          category: 'practical',
          item: name,
          location: `${item.location}.telefono`,
          detail: 'Contiene un teléfono con menos de siete dígitos.'
        });
      }
    }
  }

  return {
    status: errors.length ? 'blocked' : warnings.length ? 'ready-with-warnings' : 'ready',
    entities: { total: items.length, complete: completeEntities },
    photos: {
      total: usefulPhotos + placeholderPhotos + missingPhotos,
      useful: usefulPhotos,
      placeholder: placeholderPhotos,
      missing: missingPhotos,
      notApplicable: photosNotApplicable
    },
    practical: { total: practicalTotal, complete: practicalComplete },
    links: { total: linkTotal, valid: validLinks },
    allergens: { total: allergenTotal, complete: allergenComplete },
    cloudinary: {
      references: cloudinaryReferences.length,
      uniqueReferences: new Set(cloudinaryReferences).size
    },
    errors,
    warnings
  };
}
