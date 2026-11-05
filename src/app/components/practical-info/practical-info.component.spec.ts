import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsService } from '../../shared/analytics.service';
import { CHIPIONA_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/chipiona.guide';
import { JEREZ_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/jerez.guide';
import { PracticalInfoItem, TipoReserva } from '../../shared/practical-info';
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

  const bookingLabels: [TipoReserva, string][] = [
    ['entradas', 'Comprar entradas'],
    ['mesa', 'Reservar mesa'],
    ['visita', 'Reservar visita'],
    ['inscripcion', 'Inscribirse']
  ];

  for (const [tipoReserva, label] of bookingLabels) {
    it(`labels HTTP reservations as ${label} without changing navigation or measurement`, () => {
      const measure = spyOn(TestBed.inject(AnalyticsService), 'action');
      const item = Object.freeze({
        nombre: 'Destino', reserva: 'https://example.test/reservar', tipoReserva
      } satisfies PracticalInfoItem);
      setItem(item);
      const anchor = actions()[0];

      expect(actions()).toHaveSize(1);
      expect(anchor.querySelector('span')?.textContent).toBe(label);
      expect(anchor.getAttribute('aria-label')).toBe(`${label}: Destino (se abre en otra pestaña)`);
      expect(anchor.getAttribute('href')).toBe(item.reserva);
      expect(anchor.target).toBe('_blank');
      expect(anchor.rel).toBe('noopener noreferrer');
      expect(anchor.classList.contains('primary-action')).toBeTrue();
      expect(anchor.tabIndex).toBe(0);
      anchor.click();
      expect(measure).toHaveBeenCalledOnceWith('outbound', { kind: 'booking' });
      expect(cancelledBeforeNavigation).toEqual([false]);
      expect(item.tipoReserva).toBe(tipoReserva);
    });
  }

  it('keeps the default label for old cards and unrecognized reservation types', () => {
    for (const tipoReserva of [undefined, null, 'otro', 'constructor', '__proto__', 42]) {
      setItem({ reserva: 'http://example.test/reservar', tipoReserva });
      expect(actions()[0].querySelector('span')?.textContent).toBe('Reservar');
      expect(actions()[0].getAttribute('href')).toBe('http://example.test/reservar');
    }
  });

  it('keeps the combined web label when a contextual booking type is present', () => {
    for (const [tipoReserva] of bookingLabels) {
      setItem({ web: 'https://example.test/visita', reserva: 'https://example.test/visita/', tipoReserva });
      expect(actions()).toHaveSize(1);
      expect(actions()[0].querySelector('span')?.textContent).toBe('Web y reservas');
      expect(actions()[0].getAttribute('href')).toBe('https://example.test/visita/');
      expect(actions()[0].getAttribute('aria-label')).toBe('Web y reservas (se abre en otra pestaña)');
    }
  });

  it('keeps email and telephone reservation labels when a contextual type is present', () => {
    const measure = spyOn(TestBed.inject(AnalyticsService), 'action');
    for (const [reserva, label] of [
      ['mailto:reservas@example.test', 'Reservar por correo'],
      ['tel:+34956123456', 'Reservar por teléfono']
    ]) {
      setItem({ reserva, tipoReserva: 'entradas' });
      expect(actions()).toHaveSize(1);
      expect(actions()[0].querySelector('span')?.textContent).toBe(label);
      expect(actions()[0].getAttribute('href')).toBe(reserva);
      expect(actions()[0].getAttribute('target')).toBeNull();
      actions()[0].click();
    }
    expect(measure.calls.allArgs()).toEqual([
      ['outbound', { kind: 'booking' }], ['outbound', { kind: 'booking' }]
    ]);
    expect(cancelledBeforeNavigation).toEqual([false, false]);
    setItem({ telefono: '+34 956 123 456 / +34 608 908 038', reserva: 'tel:+34956123456', tipoReserva: 'mesa' });
    expect(actions()).toHaveSize(0);
    expect(root.querySelectorAll('.phone-link')).toHaveSize(2);
    expect(root.querySelector('.phone-link')?.getAttribute('aria-label')).toContain('Llamar para reservar');
  });

  it('offers Comprar entradas for the current Jerez Cathedral card with its original URLs', () => {
    const cathedral = JEREZ_GUIDE.secciones.flatMap<PracticalInfoItem & { maps?: string }>(section => section.lugares ?? [])
      .find(item => item.nombre === 'Catedral de Jerez · Nuestro Señor San Salvador')!;
    expect(cathedral).toBeDefined();
    const before = JSON.stringify(cathedral);
    const item = Object.freeze({ ...cathedral });
    setItem(item, item.maps);

    expect(actions().map(anchor => anchor.getAttribute('href'))).toEqual([
      'https://www.google.com/maps/place/?q=place_id:ChIJN2WzkJDGDQ0R0YPpZOmXExw',
      'https://catedraldejerez.es/comprar-entradas/',
      'https://catedraldejerez.es/'
    ]);
    expect(root.querySelector('.primary-action span')?.textContent).toBe('Comprar entradas');
    expect(JSON.stringify(cathedral)).toBe(before);
  });

  it('renders the Chipiona email reservations as independent booking actions without changing the cards', () => {
    const measure = spyOn(TestBed.inject(AnalyticsService), 'action');
    const restaurants = CHIPIONA_GUIDE.secciones.find(section => section.titulo === 'Dónde comer en Chipiona')!.lugares!;
    for (const [name, href] of [
      ['Restaurante Casa Paco', 'mailto:restaurantepacomuelle@gmail.com'],
      ['Restaurante El Quinto Pino', 'mailto:hrquintopino@gmail.com']
    ]) {
      const restaurant = restaurants.find(restaurant => restaurant.nombre === name)!;
      if (!('maps' in restaurant) || !('web' in restaurant)) throw new Error(`Missing contact data: ${name}`);
      const item = Object.freeze({ ...restaurant });
      const before = JSON.stringify(item);
      setItem(item, item.maps);
      const booking = root.querySelector<HTMLAnchorElement>('.practical-actions:not(.practical-map):not(.practical-website) .practical-action');
      expect(booking).withContext(name).not.toBeNull();
      expect(booking?.getAttribute('href')).toBe(href);
      expect(booking?.textContent).toContain('Reservar por correo');
      expect(booking?.getAttribute('aria-label')).toBe(`Reservar por correo: ${name}`);
      expect(booking?.getAttribute('target')).toBeNull();
      expect(booking?.getAttribute('rel')).toBeNull();
      expect(booking?.querySelector('.action-arrow')).toBeNull();
      expect(root.querySelector('.practical-website a')?.getAttribute('href')).toBe(item.web);
      expect(root.querySelectorAll('.phone-link')).toHaveSize(1);
      expect(root.querySelectorAll('.practical-fact')).toHaveSize(2);
      booking?.click();
      expect(JSON.stringify(item)).toBe(before);
    }
    expect(measure.calls.allArgs()).toEqual([
      ['outbound', { kind: 'booking' }], ['outbound', { kind: 'booking' }]
    ]);
    expect(cancelledBeforeNavigation).toEqual([false, false]);
  });

  it('preserves encoded email reservation fields while keeping mailto out of website and map actions', () => {
    const href = 'mailto:reservas@example.test?subject=Mesa%20para%20dos&body=Hola%2C%20gracias';
    setItem({ nombre: 'Restaurante', web: 'mailto:web@example.test', reserva: href }, 'mailto:mapa@example.test');
    expect(actions()).toHaveSize(1);
    expect(actions()[0].getAttribute('href')).toBe(href);
    expect(actions()[0].textContent).toContain('Reservar por correo');
    expect(root.querySelector('.practical-map')).toBeNull();
    expect(root.querySelector('.practical-website')).toBeNull();
    expect(root.textContent).toContain('mailto:web@example.test');
  });

  it('keeps malformed email reservations and unsupported protocols as non-executable text', () => {
    for (const reserva of [
      'Consultar en recepción', 'javascript:alert(1)', 'data:text/html,<script>alert(1)</script>',
      'file:///tmp/reserva', 'mailto:', 'mailto:sin-arroba', 'mailto:mal%20correo@example.test',
      'mailto:a@example.test,b@example.test', 'mailto:reservas@example.test#fragment',
      'mailto:reservas@example.test?subject=Hola%0D%0ABcc:otro@example.test',
      'mailto:reservas@example.test?subject=%ZZ', 'mailto:reservas@example.test\n?subject=Hola'
    ]) {
      setItem({ reserva });
      expect(root.querySelectorAll('a')).withContext(reserva).toHaveSize(0);
      expect(root.querySelector('.practical-fact p')?.textContent).toBe(reserva);
    }
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
