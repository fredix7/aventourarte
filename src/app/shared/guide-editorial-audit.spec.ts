import { ROTA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/rota.guide';
import { ALMENSILLA_GUIDE } from '../guides/europa/espana/andalucia/sevilla/almensilla.guide';
import { auditGuideEditorial } from './guide-editorial-audit';

describe('guide editorial audit', () => {
  it('reports the current Rota inventory without relying on global counters', () => {
    const report = auditGuideEditorial(ROTA_GUIDE);

    expect(report.status).toBe('ready-with-warnings');
    expect(report.entities).toEqual({ total: 50, complete: 50 });
    expect(report.photos).toEqual({
      total: 28,
      useful: 15,
      placeholder: 13,
      missing: 0,
      notApplicable: 22
    });
    expect(report.practical).toEqual({ total: 43, complete: 43 });
    expect(report.links).toEqual({ total: 43, valid: 43 });
    expect(report.allergens).toEqual({ total: 7, complete: 7 });
    expect(report.cloudinary.uniqueReferences).toBe(20);
    expect(report.errors).toEqual([]);
    expect(report.warnings.length).toBe(13);
  });

  it('keeps the first Almensilla version reviewable while placeholder images remain', () => {
    const report = auditGuideEditorial(ALMENSILLA_GUIDE);

    expect(report.status).toBe('ready-with-warnings');
    expect(report.entities).toEqual({ total: 28, complete: 28 });
    expect(report.practical).toEqual({ total: 19, complete: 19 });
    expect(report.allergens).toEqual({ total: 9, complete: 9 });
    expect(report.errors).toEqual([]);
    expect(report.warnings.length).toBe(13);
    expect(report.warnings.every(issue => issue.category === 'visual')).toBeTrue();
  });

  it('flattens subsections and itineraries and identifies structural problems', () => {
    const report = auditGuideEditorial({
      path: 'europa/espana/pruebas',
      nombre: 'Pruebas',
      descripcion: 'Guía de prueba',
      flag: 'cld:pruebas/flag',
      background: 'cld:pruebas/background',
      secciones: [
        {
          titulo: 'Qué visitar',
          subsecciones: [
            {
              titulo: 'Ruta',
              lugares: [
                {
                  nombre: 'Visita',
                  descripcion: 'Descripción',
                  foto: 'cld:pruebas/flag',
                  horario: '10:00',
                  precio: 'Gratis',
                  direccion: 'Calle 1',
                  mapaUrl: 'https://example.com/mapa'
                }
              ]
            }
          ],
          itinerario: [
            {
              dia: 'Día 1',
              zonas: [{ nombre: 'Zona sin datos', descripcion: '' }]
            }
          ]
        }
      ]
    });

    expect(report.entities.total).toBe(2);
    expect(report.photos.placeholder).toBe(1);
    expect(report.photos.missing).toBe(1);
    expect(report.status).toBe('blocked');
    expect(report.errors.some(issue => issue.item === 'Zona sin datos')).toBeTrue();
  });

  it('does not require photos for restaurants or events in any guide', () => {
    const report = auditGuideEditorial({
      path: 'europa/espana/pruebas',
      nombre: 'Pruebas',
      descripcion: 'Guía de prueba',
      secciones: [
        {
          titulo: 'Dónde comer',
          subsecciones: [
            {
              titulo: 'Marisquerías',
              lugares: [
                {
                  nombre: 'Restaurante',
                  descripcion: 'Descripción',
                  horario: '13:00',
                  precio: '€€',
                  direccion: 'Calle 1',
                  maps: 'https://example.com/restaurante',
                  telefono: '956000000'
                }
              ]
            }
          ]
        },
        {
          titulo: 'Fiestas',
          lugares: [
            {
              nombre: 'Fiesta local',
              descripcion: 'Descripción',
              fecha: 'Agosto',
              precio: 'Gratis'
            }
          ]
        }
      ]
    });

    expect(report.status).toBe('ready');
    expect(report.photos).toEqual({
      total: 0,
      useful: 0,
      placeholder: 0,
      missing: 0,
      notApplicable: 2
    });
    expect(report.warnings).toEqual([]);
  });
});
