import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsService } from '../../shared/analytics.service';
import { PracticalInfoComponent } from './practical-info.component';

describe('PracticalInfoComponent', () => {
  let fixture: ComponentFixture<PracticalInfoComponent>;
  let root: HTMLElement;
  let cancelledBeforeNavigation: boolean[];
  const setItem = (item: unknown, mapHref = '') => {
    fixture.componentRef.setInput('item', item);
    fixture.componentRef.setInput('mapHref', mapHref);
    fixture.detectChanges();
  };
  const actions = () => [...root.querySelectorAll<HTMLAnchorElement>('.practical-action')];

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalInfoComponent);
    root = fixture.nativeElement;
    cancelledBeforeNavigation = [];
    root.addEventListener('click', event => {
      if (event.target instanceof Element && event.target.closest('a')) {
        cancelledBeforeNavigation.push(event.defaultPrevented);
        event.preventDefault();
      }
    });
  });

  it('groups address, maps, web, bookings and entity-labelled phones without editing the item', () => {
    const item = Object.freeze({
      nombre: 'Bodega', direccion: 'Calle Larga, 1', telefono: 'Centralita: +34 956 123 456 / +34 608 492 097',
      web: 'https://example.test/', reserva: 'https://example.test/reservar'
    });
    setItem(item, 'https://maps.google.com/?q=Calle%20Larga');
    expect(actions().map(anchor => anchor.textContent?.trim())).toHaveSize(3);
    expect(actions().map(anchor => anchor.getAttribute('href'))).toEqual([
      'https://maps.google.com/?q=Calle%20Larga', 'https://example.test/reservar', 'https://example.test/'
    ]);
    expect(root.querySelector('.practical-address')?.textContent).toContain('Calle Larga, 1');
    expect(root.querySelectorAll('.phone-link')).toHaveSize(2);
    expect(root.querySelector('.group-label')?.textContent).toBe('Centralita');
    expect(root.querySelector('.is-embedded')).not.toBeNull();
    expect(item.telefono).toBe('Centralita: +34 956 123 456 / +34 608 492 097');
    for (const anchor of actions()) {
      expect(anchor.target).toBe('_blank');
      expect(anchor.rel).toBe('noopener noreferrer');
      expect(anchor.getAttribute('aria-label')).toContain('Bodega');
    }
  });

  it('combines the same website and booking URL while preserving distinct query destinations', () => {
    setItem({ nombre: 'Visitas', web: 'https://EXAMPLE.test/visitas', reserva: 'https://example.test/visitas/' });
    expect(actions()).toHaveSize(1);
    expect(actions()[0].textContent).toContain('Web y reservas');
    expect(actions()[0].classList.contains('primary-action')).toBeTrue();

    setItem({ web: 'https://example.test/visitas?idioma=es', reserva: 'https://example.test/visitas?idioma=en' });
    expect(actions()).toHaveSize(2);
  });

  it('reuses an existing telephone for reservations and measures only the reservation action', () => {
    const measure = spyOn(TestBed.inject(AnalyticsService), 'action');
    setItem({ nombre: 'Venta', telefono: '+34 956 316 067 / +34 608 908 038', reserva: 'tel:+34956316067' });
    expect(actions()).toHaveSize(0);
    const phones = [...root.querySelectorAll<HTMLAnchorElement>('.phone-link')];
    expect(phones).toHaveSize(2);
    expect(phones[0].textContent).toContain('Reservar');
    expect(phones[0].getAttribute('aria-label')).toContain('Llamar para reservar');
    phones[0].click();
    expect(measure).toHaveBeenCalledOnceWith('outbound', { kind: 'booking' });
    phones[1].click();
    expect(measure).toHaveBeenCalledTimes(1);
    expect(cancelledBeforeNavigation).toEqual([false, false]);
  });

  it('offers direct telephone reservations when that number is not already listed', () => {
    setItem({ nombre: 'Visita', reserva: 'tel:+34 956 123 456' });
    expect(actions()).toHaveSize(1);
    expect(actions()[0].getAttribute('href')).toBe('tel:+34956123456');
    expect(actions()[0].textContent).toContain('Reservar por teléfono');
    expect(actions()[0].getAttribute('target')).toBeNull();
  });

  it('keeps native map navigation and supports map-only records', () => {
    setItem({ nombre: 'Mirador' }, 'geo:0,0?q=Mirador');
    expect(actions()).toHaveSize(1);
    expect(actions()[0].getAttribute('href')).toBe('geo:0,0?q=Mirador');
    expect(actions()[0].getAttribute('target')).toBeNull();
    expect(root.querySelector('.practical-address')).toBeNull();
  });

  it('keeps complete editorial facts in individually expandable native sections', () => {
    const horario = 'Lunes a viernes: 09:00 – 14:00.\n\nConsultar festivos.';
    setItem({ horario, precio: 'General: 5 €\nReducida: 2 €', precioOrientativo: 'Desde 5 €', acceso: 'Reserva previa', fecha: 'Noviembre' });
    const details = [...root.querySelectorAll<HTMLDetailsElement>('details')];
    expect(details).toHaveSize(5);
    expect(details[0].querySelector('p')?.textContent).toBe(horario);
    expect(details[1].querySelector('p')?.textContent).toBe('General: 5 €\nReducida: 2 €');
    expect(details[2].textContent).toContain('Precio orientativo');
    expect(root.querySelector('.practical-heading')).toBeNull();
    expect(details.every(detail => !detail.open)).toBeTrue();
    details[0].querySelector('summary')!.click();
    expect(details[0].open).toBeTrue();
    expect(details[1].open).toBeFalse();
  });

  it('keeps invalid URLs and reservation instructions as text without generating unsafe links', () => {
    setItem({ web: 'javascript:alert(1)', reserva: 'Consultar en recepción' }, 'javascript:alert(1)');
    expect(actions()).toHaveSize(0);
    expect(root.textContent).toContain('javascript:alert(1)');
    expect(root.textContent).toContain('Consultar en recepción');
    setItem({ reserva: 'tel:123' });
    expect(actions()).toHaveSize(0);
    expect(root.textContent).toContain('tel:123');
  });

  it('hides absent records and clears actions when the item changes', () => {
    setItem({ web: 'https://example.test' });
    expect(actions()).toHaveSize(1);
    setItem(null);
    expect(root.querySelector('.practical-card')).toBeNull();
    expect(root.classList.contains('is-empty')).toBeTrue();
    setItem({ precio: 0 });
    expect(root.querySelector('details p')?.textContent).toBe('0');
  });

  it('preserves outbound measurement without passing addresses or phone numbers', () => {
    const measure = spyOn(TestBed.inject(AnalyticsService), 'action');
    setItem({ web: 'https://example.test', reserva: 'https://example.test/entradas' }, 'https://maps.google.com/?q=Jerez');
    for (const anchor of actions()) anchor.click();
    expect(measure.calls.allArgs()).toEqual([
      ['outbound', { kind: 'maps' }], ['outbound', { kind: 'booking' }], ['outbound', { kind: 'web' }]
    ]);
    expect(cancelledBeforeNavigation).toEqual([false, false, false]);
  });
});
