import { filterPlanSections, sectionPlanItems } from './plan-filter';
import { matchesPlanTypes, PlanTypeId, PlanTypedItem } from './plan-types';

describe('plan filtering', () => {
  const selection = (...ids: PlanTypeId[]) => new Set(ids);
  const beach: PlanTypedItem = { nombre: 'Playa', tiposPlan: ['ruta', 'playa', 'gratuito'] };
  const park: PlanTypedItem = { nombre: 'Parque', tiposPlan: ['opcional', 'naturaleza', 'gratuito'] };
  const museum: PlanTypedItem = { nombre: 'Museo', tiposPlan: ['ruta', 'museo', 'de-pago'] };

  it('accepts alternatives within a group and requires every selected group', () => {
    const selected = selection('playa', 'naturaleza', 'gratuito');
    expect(matchesPlanTypes(beach, selected)).toBeTrue();
    expect(matchesPlanTypes(park, selected)).toBeTrue();
    expect(matchesPlanTypes(museum, selected)).toBeFalse();
    expect(matchesPlanTypes(park, selection('ruta', 'naturaleza', 'gratuito'))).toBeFalse();
    expect(matchesPlanTypes(park, selection('ruta', 'opcional', 'naturaleza', 'gratuito'))).toBeTrue();
  });

  it('never infers missing or variable prices as free admission', () => {
    expect(matchesPlanTypes({ nombre: 'Museo gratis' }, selection('gratuito'))).toBeFalse();
    expect(matchesPlanTypes({ tiposPlan: ['coste-variable'] }, selection('gratuito'))).toBeFalse();
    expect(matchesPlanTypes({}, selection())).toBeTrue();
  });

  it('filters all card layouts without mutating frozen sources or renumbering days', () => {
    const sections = [
      { titulo: 'Visitas', lugares: [beach, museum] },
      { titulo: 'Rutas', subsecciones: [
        { titulo: 'Centro', lugares: [museum] },
        { titulo: 'Costa', lugares: [beach, park] }
      ] },
      { titulo: 'Itinerario', itinerario: [
        { dia: 'Día 1', zonas: [museum] },
        { dia: 'Día 2', zonas: [beach, museum, park] }
      ] },
      { titulo: 'Consejos de ruta', contenido: 'Lleva agua' }
    ];
    const freeze = (value: any) => {
      if (value && typeof value === 'object') {
        Object.values(value).forEach(freeze);
        Object.freeze(value);
      }
    };
    freeze(sections);
    const result = filterPlanSections(sections, selection('gratuito'));
    expect(result.map(section => section.titulo)).toEqual(['Visitas', 'Rutas', 'Itinerario', 'Consejos de ruta']);
    expect(result[0].lugares).toEqual([beach]);
    expect(result[1].subsecciones?.map(group => group.titulo)).toEqual(['Costa']);
    expect(result[2].itinerario?.map(day => day.dia)).toEqual(['Día 2']);
    expect(result[2].itinerario?.[0].zonas).toEqual([beach, park]);
    expect(result[0].lugares?.[0]).toBe(beach);
    expect(result.flatMap(sectionPlanItems).length).toBe(5);
    expect(filterPlanSections(sections, selection())).toBe(sections);
  });

  it('removes empty sections and narratives when there are no matching plans', () => {
    const sections = [
      { titulo: 'Visitas', lugares: [museum] },
      { titulo: 'Ruta', subsecciones: [{ lugares: [museum] }] },
      { titulo: 'Consejos' }
    ];
    expect(filterPlanSections(sections, selection('gratuito'))).toEqual([]);
  });
});
