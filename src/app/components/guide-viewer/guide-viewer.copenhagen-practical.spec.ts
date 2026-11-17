import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { COPENHAGUE_GUIDE } from '../../guides/europa/dinamarca/copenhague.guide';
import { ImageService } from '../../shared/image.service';
import { GuideViewerComponent } from './guide-viewer.component';

describe('GuideViewerComponent Copenhagen practical corrections', () => {
  let fixture: ComponentFixture<GuideViewerComponent>;
  let root: HTMLElement;

  const show = (tab: string): void => {
    fixture.componentInstance.setActiveTab(tab);
    fixture.detectChanges();
  };
  const card = (name: string): HTMLElement => {
    const result = Array.from(root.querySelectorAll<HTMLElement>('.zone-card, .item-card'))
      .find(element => element.querySelector('h3, h4')?.textContent?.trim() === name);
    expect(result).withContext(name).toBeDefined();
    return result!;
  };
  const point = (name: string): HTMLElement => {
    const result = root.querySelector<HTMLElement>(`section[aria-label="Lugar incluido: ${name}"]`);
    expect(result).withContext(name).not.toBeNull();
    return result!;
  };
  const href = (element: Element, selector: string): string | null =>
    element.querySelector<HTMLAnchorElement>(selector)?.getAttribute('href') ?? null;

  beforeEach(async () => {
    const images = jasmine.createSpyObj<ImageService>('ImageService', ['url', 'background']);
    images.url.and.returnValue('');
    images.background.and.returnValue('');
    await TestBed.configureTestingModule({
      imports: [GuideViewerComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: {
          paramMap: { get: () => 'europa/dinamarca/copenhague' },
          queryParamMap: { get: () => null }
        } } },
        { provide: ImageService, useValue: images }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(GuideViewerComponent);
    fixture.detectChanges();
    root = fixture.nativeElement;
  });

  afterEach(() => fixture.destroy());

  it('keeps one Bastard plan and scopes maps, contacts and table bookings to each venue', () => {
    show('cultura');
    const parent = card('Bastard Café · juegos de mesa');
    expect(root.querySelectorAll('.item-card').length).toBe(1);
    expect(parent.querySelectorAll('section[aria-label^="Lugar incluido: "]').length).toBe(2);
    const general = parent.querySelector('app-practical-info')!;
    expect(general.querySelector('.practical-map, .primary-action')).toBeNull();
    const norrebro = point('Bastard Café Nørrebro');
    const valby = point('Bastard Café Valby');
    expect(href(norrebro, '.practical-map a')).toContain('ChIJWQDEbbZTUkYRvCe9DBWaFhI');
    const valbyMap = new URL(href(valby, '.practical-map a')!);
    expect(valbyMap.searchParams.get('query'))
      .toBe('Bastard Café Valby, Valby Kulturhus, Valgårdsvej 4, 2500 Valby, Dinamarca');
    expect(valbyMap.pathname).toBe('/maps/search/');
    expect(href(valby, '.practical-map a')).not.toEqual(href(norrebro, '.practical-map a'));
    expect(href(norrebro, '.primary-action')).toBe('https://bastardcafe.dk/product/reservation-bastard-cafe-in-norrebro/');
    expect(href(valby, '.primary-action')).toBe('https://bastardcafe.dk/product/reservation-valby/');
    for (const venue of [norrebro, valby]) {
      expect(venue.querySelector('.primary-action')!.textContent).toContain('Reservar mesa');
      expect(venue.querySelector('a[href="tel:+4542746642"]')).not.toBeNull();
      for (const link of Array.from(venue.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'))) {
        expect(link.target).toBe('_blank');
        expect(link.rel).toContain('noopener');
        expect(link.rel).toContain('noreferrer');
        expect(link.getAttribute('aria-label')).toContain(venue.querySelector('h4')!.textContent!);
      }
    }
    expect(norrebro.textContent).toContain('En 2026 se anuncia apertura experimental el 25 y 26 de diciembre');
    expect(valby.textContent).toContain('Cerrado el 24, 25, 26 y 31 de diciembre');
  });

  it('does not generate geographic actions for the digital card or flexible last morning', () => {
    show('consejos');
    const digital = card('Copenhagen Card Discover · condiciones oficiales');
    expect(digital.querySelector('.practical-address, .practical-map, .primary-action')).toBeNull();
    expect(digital.textContent).toContain('Tarjeta digital');
    expect(digital.querySelector('a[href="https://copenhagencard.com/view/faq?lang=EN"]')).not.toBeNull();
    show('que-ver');
    const last = card('Última mañana · pendientes, compras y despedida de Copenhague');
    expect(last.querySelector('.practical-address, .practical-map')).toBeNull();
    const visit = COPENHAGUE_GUIDE.secciones.find(section => 'itinerario' in section)!;
    expect(visit.itinerario!.map(day => day.zonas.length)).toEqual([14, 7, 1, 4, 1]);
  });

  it('distinguishes suspended dome tours and the former museum address from open temple and garden visits', () => {
    show('que-ver');
    const church = card('Iglesia de Mármol · Frederikskirken');
    expect(church.textContent).toContain('visitas suspendidas por reparación de la cubierta');
    expect(church.textContent).toContain('sin fecha de reapertura anunciada');
    expect(church.textContent).toContain('Interior: gratis');
    expect(church.querySelector('.primary-action')).toBeNull();
    const museum = card('Jardín Botánico y Museo de Historia Natural');
    expect(museum.textContent).toContain('Øster Voldgade 5–7 cerró el 1 de noviembre de 2026');
    expect(museum.textContent).toContain('6 de marzo de 2027');
    expect(museum.textContent).toContain('El jardín y la Casa de las Palmeras siguen abiertos');
    expect(museum.textContent).toContain('no incluye el nuevo Museo de Historia Natural');
    expect(museum.textContent).toContain('los precios y la disponibilidad de entradas para tu fecha');
    expect(museum.textContent).not.toContain('su venta de entradas todavía no está abierta');
    expect(href(museum, '.primary-action')).toBe('https://webshop.snm.dk/en/billet-til-palmehuset');
  });

  it('keeps Reffen seasonal and limits contact booking to groups without implying instant confirmation', () => {
    show('que-ver');
    const itinerary = card('Reffen · cena junto al puerto');
    expect(itinerary.textContent).toContain('Cierre invernal habitual de noviembre a febrero');
    expect(itinerary.textContent).toContain('reapertura anunciada para marzo de 2027');
    expect(itinerary.textContent).toContain('grupos de 8 a 150 personas');
    expect(href(itinerary, '.primary-action')).toBe('mailto:info@reffen.dk');
    expect(itinerary.querySelector('.primary-action')!.textContent).toContain('Reservar por correo');
    expect(itinerary.textContent).toContain('Espera la confirmación');
    show('donde-comer');
    const food = card('Reffen · Copenhagen Street Food');
    expect(food.textContent).toContain('reapertura anunciada para marzo de 2027');
    expect(food.querySelector('.primary-action')).toBeNull();
    const paludan = card('Paludan Bog & Café');
    expect(paludan.textContent).toContain('grupos de seis o más personas que vayan a comer');
    expect(paludan.textContent).toContain('espera la confirmación del café');
    expect(href(paludan, '.primary-action')).toBe('https://www.paludanbogcafe.com/contact');
  });

  it('preserves approved products and labels paid entries separately from optional visits and attraction passes', () => {
    show('que-ver');
    for (const [name, destination, label] of [
      ['Museo Thorvaldsen · alternativa de arte', 'https://billetto.dk/e/thorvaldsens-museum-entrebillet-billetter-1787928', 'Comprar entradas'],
      ['Biblioteca Real · el Diamante Negro', 'https://billet.kb.dk/webshop/webticket/shop?page=timeslot&tsproduction=11', 'Reservar visita'],
      ['SMK · Galería Nacional de Dinamarca', 'https://shop.smk.dk/en/dagsbillet', 'Comprar entradas'],
      ['Jardines Tívoli', 'https://www.tivoli.dk/en/shop/entrance-and-ride-pass', 'Comprar entradas'],
      ['Kastellet · la fortaleza estrella de Copenhague', 'https://www.kastelletsvenner.dk/j4/index.php/om-foreningen/rundvisning', 'Reservar visita'],
      ['Bakken y Jægersborg Dyrehave', 'https://shop.bakken.dk/en/', 'Comprar pases de atracciones']
    ]) {
      const place = card(name);
      expect(href(place, '.primary-action')).withContext(name).toBe(destination);
      expect(place.querySelector('.primary-action')!.textContent).withContext(name).toContain(label);
      expect(href(place, '.practical-website a')).withContext(name).not.toBe(destination);
    }
    expect(href(card('Louisiana Museum of Modern Art · Humlebæk'), '.primary-action'))
      .toBe('https://billet.louisiana.dk/en/tickets');
    const kronborg = card('Castillo de Kronborg · Helsingør');
    expect(kronborg.textContent).toContain('En diciembre de 2026');
    expect(kronborg.textContent).toContain('No des por hecho que este horario especial se repetirá en otros años');
  });

  it('adds only accredited information for Roskilde cathedral and Lejre Museum, without invented maps or purchases', () => {
    show('que-ver');
    const cathedral = point('Catedral de Roskilde');
    expect(cathedral.querySelector('.practical-map, .primary-action')).toBeNull();
    expect(cathedral.textContent).toContain('se compra en la catedral');
    expect(href(cathedral, '.practical-website a')).toBe('https://roskildedomkirke.dk/english/tickets');
    const lejre = point('Lejre Museum');
    expect(lejre.querySelector('.practical-map, .primary-action')).toBeNull();
    expect(lejre.querySelector('a[href="tel:+4546316537"]')).not.toBeNull();
    expect(lejre.textContent).toContain('16 de febrero de 2027');
    expect(href(card('Roskilde · Catedral y Museo de los Barcos Vikingos'), '.primary-action'))
      .toContain('vikingeskibsmuseet.dk');
    expect(href(card('Lejre · museo e historia al aire libre'), '.primary-action'))
      .toBe('https://sagnlandet.dk/en/buy-a-ticket/');
  });
});
