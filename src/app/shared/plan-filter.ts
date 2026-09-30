import { matchesPlanTypes, PlanTypedItem, PlanTypeId } from './plan-types';

export interface PlanContentGroup {
  lugares?: readonly PlanTypedItem[];
}

export interface PlanDay {
  zonas?: readonly PlanTypedItem[];
}

export interface PlanSection extends PlanContentGroup {
  subsecciones?: readonly PlanContentGroup[];
  itinerario?: readonly PlanDay[];
}

/** Recorre las mismas fichas que presenta el visor, incluidas las paradas. */
export function sectionPlanItems(section: PlanSection): PlanTypedItem[] {
  const groups = section.subsecciones?.length ? section.subsecciones : [section];
  return [
    ...groups.flatMap(group => group.lugares ?? []),
    ...(section.itinerario ?? []).flatMap(day => day.zonas ?? [])
  ];
}

/** Proyección de lectura: conserva las fichas, el orden y los nombres de los días. */
export function filterPlanSections<T extends PlanSection>(
  sections: T[],
  selected: ReadonlySet<PlanTypeId>
): T[] {
  if (!selected.size) return sections;

  const matches = (item: PlanTypedItem) => matchesPlanTypes(item, selected);
  const projected = sections.map(section => {
    const filtered = { ...section };
    if (section.subsecciones?.length) {
      filtered.subsecciones = section.subsecciones
        .map(group => ({ ...group, lugares: group.lugares?.filter(matches) }))
        .filter(group => group.lugares?.length);
      // El visor vuelve a la sección raíz si no quedan subsecciones.
      filtered.lugares = undefined;
    } else if (section.lugares) {
      filtered.lugares = section.lugares.filter(matches);
    }
    if (section.itinerario) {
      filtered.itinerario = section.itinerario
        .map(day => ({ ...day, zonas: day.zonas?.filter(matches) }))
        .filter(day => day.zonas?.length);
    }
    return { original: section, filtered };
  });

  if (!projected.some(({ filtered }) => sectionPlanItems(filtered).length)) return [];

  return projected
    .filter(({ original, filtered }) =>
      !sectionPlanItems(original).length || sectionPlanItems(filtered).length
    )
    .map(({ filtered }) => filtered);
}
