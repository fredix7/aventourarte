import { GUIDE_REGISTRY } from '../components/guide-viewer/guide-viewer.component';
import { PLAN_TYPES, PlanTypeId, planTypesFor } from './plan-types';

describe('plan types', () => {
  it('defines a stable and unique taxonomy for future filters', () => {
    expect(PLAN_TYPES.map(type => type.id)).toEqual([
      'ruta',
      'opcional',
      'playa',
      'urbano',
      'naturaleza',
      'museo',
      'gratuito',
      'de-pago',
      'coste-variable'
    ]);
    expect(new Set(PLAN_TYPES.map(type => type.id)).size).toBe(PLAN_TYPES.length);
    expect(PLAN_TYPES.every(type => type.label && type.icon && type.group)).toBeTrue();
  });

  it('returns explicit types in a stable order without duplicates', () => {
    const types = planTypesFor({
      nombre: 'Playa de Ipanema',
      tiposPlan: ['gratuito', 'playa', 'ruta', 'playa']
    });

    expect(types.map(type => type.id)).toEqual(['ruta', 'playa', 'gratuito']);
  });

  it('allows explicit editorial metadata on any card', () => {
    const types = planTypesFor({
      nombre: 'Actividad especial',
      tiposPlan: ['opcional', 'coste-variable']
    });

    expect(types.map(type => type.id)).toEqual(['opcional', 'coste-variable']);
  });

  it('never infers a type from names or prices', () => {
    const types = planTypesFor({ nombre: 'Museo con entrada de 12 €' });

    expect(types).toEqual([]);
  });

  it('declares valid plan types explicitly on every visit card', () => {
    const validIds = new Set(PLAN_TYPES.map(type => type.id));
    const cards: { guide: string; item: any }[] = [];
    const normalize = (value: string) =>
      value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    for (const guide of Object.values(GUIDE_REGISTRY)) {
      for (const section of guide.secciones ?? []) {
        for (const day of section.itinerario ?? []) {
          for (const item of day.zonas ?? day.actividades ?? []) {
            cards.push({ guide: guide.nombre, item });
          }
        }

        if (!/\b(visitar|que ver|ruta|rutas|itinerario|recorrido)\b/.test(normalize(section.titulo))) {
          continue;
        }

        const groups = section.subsecciones?.length ? section.subsecciones : [section];
        for (const group of groups) {
          for (const item of group.lugares ?? []) cards.push({ guide: guide.nombre, item });
        }
      }
    }

    expect(cards.length).toBe(420);
    for (const { guide, item } of cards) {
      const context = `${guide}: ${item.nombre}`;
      expect(item.tiposPlan?.length).withContext(`${context} no declara tiposPlan`).toBeGreaterThan(0);
      expect(new Set(item.tiposPlan).size)
        .withContext(`${context} contiene tipos duplicados`)
        .toBe(item.tiposPlan.length);
      expect(item.tiposPlan.every((id: string) => validIds.has(id as PlanTypeId)))
        .withContext(`${context} contiene un tipo desconocido`)
        .toBeTrue();
    }
  });

  it('keeps ambiguous Coria access out of the paid category and uses the optional badge', () => {
    const coria = GUIDE_REGISTRY['europa/espana/andalucia/sevilla/coria-del-rio'];
    const places = coria.secciones.find((section: any) => section.titulo.startsWith('Qué visitar')).lugares;
    const placeByName = (name: string) =>
      places.find((item: any) => item.nombre === name);
    const typesOf = (name: string) => placeByName(name).tiposPlan;

    expect(
      typesOf('Centro Cultural de la Villa Pastora Soler y Sala Temática Japonesa Virginio Carvajal Japón')
    ).toEqual(['urbano', 'coste-variable']);
    expect(
      typesOf('Cerro de San Juan y Ermita de San Juan Bautista o de la Vera Cruz')
    ).toEqual(['urbano']);

    const dehesa = placeByName('Dehesa de la Atalaya');
    expect(dehesa.nombre).not.toContain('(Opcional)');
    expect(dehesa.tiposPlan).toEqual(['opcional', 'naturaleza']);

    for (const name of [
      'Centro Cultural de la Villa Pastora Soler y Sala Temática Japonesa Virginio Carvajal Japón',
      'Cerro de San Juan y Ermita de San Juan Bautista o de la Vera Cruz',
      'Dehesa de la Atalaya'
    ]) {
      expect(typesOf(name)).not.toContain('de-pago');
    }
  });
});
