import { ROTA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/rota.guide';
import { auditGuideEditorial } from './guide-editorial-audit';

describe('guide editorial audit', () => {
  it('reports the current Rota inventory without relying on global counters', () => {
    const report = auditGuideEditorial(ROTA_GUIDE);

    expect(report.status).toBe('ready-with-warnings');
    expect(report.entities).toEqual({ total: 50, complete: 50 });
    expect(report.photos).toEqual({
      total: 50,
      useful: 15,
      placeholder: 13,
      missing: 22
    });
    expect(report.practical).toEqual({ total: 43, complete: 43 });
    expect(report.links).toEqual({ total: 43, valid: 43 });
    expect(report.allergens).toEqual({ total: 7, complete: 7 });
    expect(report.cloudinary.uniqueReferences).toBe(20);
    expect(report.errors).toEqual([]);
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
});
