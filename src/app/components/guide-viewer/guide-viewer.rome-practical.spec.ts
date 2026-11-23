import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { ImageService } from '../../shared/image.service';
import { GuideViewerComponent } from './guide-viewer.component';

describe('GuideViewerComponent Rome practical destinations', () => {
  let fixture: ComponentFixture<GuideViewerComponent>;
  let root: HTMLElement;

  const show = (tab: string): void => {
    fixture.componentInstance.setActiveTab(tab);
    fixture.detectChanges();
  };
  const card = (name: string): HTMLElement => {
    const element = Array.from(root.querySelectorAll<HTMLElement>('.zone-card, .item-card'))
      .find(candidate => candidate.querySelector('h3')?.textContent?.trim() === name);
    expect(element).withContext(name).toBeDefined();
    return element!;
  };
  const point = (name: string): HTMLElement => {
    const element = root.querySelector<HTMLElement>(`section[aria-label="Lugar incluido: ${name}"]`);
    expect(element).withContext(name).not.toBeNull();
    return element!;
  };
  const main = (element: HTMLElement): Element => element.querySelector('app-practical-info')!;
  const mapQuery = (element: Element): string | null => {
    const link = element.querySelector<HTMLAnchorElement>('.practical-map a');
    return link ? new URL(link.href).searchParams.get('query') : null;
  };

  beforeEach(async () => {
    const images = jasmine.createSpyObj<ImageService>('ImageService', ['url', 'background']);
    images.url.and.returnValue('');
    images.background.and.returnValue('');
    await TestBed.configureTestingModule({
      imports: [GuideViewerComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: {
          paramMap: { get: () => 'europa/italia/roma-vaticano' },
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

  it('links the Cavalieri di Malta square and keyhole to the Villa del Priorato information', () => {
    show('que-ver');
    const square = card('Piazza dei Cavalieri di Malta');
    const website = main(square).querySelector<HTMLAnchorElement>('.practical-website a')!;
    expect(website).not.toBeNull();
    expect(website.href).toBe('https://www.turismoroma.it/it/node/2152');
    expect(website.getAttribute('aria-label')).toContain('Piazza dei Cavalieri di Malta');
    expect(square.textContent).toContain('cerradura');
  });

  it('renders branch actions inside their restaurant without assigning a group a single address', () => {
    show('donde-comer');
    const group = card('Pastasciutta');
    expect(main(group).querySelector('.practical-map, .practical-phones, .primary-action')).toBeNull();
    const vatican = point('Pastasciutta Vaticano');
    const trevi = point('Pastasciutta Trevi');
    expect(vatican.closest('.item-card')).toBe(group);
    expect(trevi.closest('.item-card')).toBe(group);
    expect(mapQuery(vatican)).toContain('Via delle Grazie 5');
    expect(mapQuery(trevi)).toContain('Largo Pietro di Brazzà 27');
    expect(vatican.querySelector('a[href="tel:+393492586793"]')).not.toBeNull();
    expect(trevi.querySelector('a[href="tel:+390669327108"]')).not.toBeNull();
    expect(group.querySelector('.primary-action')).toBeNull();
    expect(main(card('Pompi')).querySelector('.practical-map')).toBeNull();
    expect(mapQuery(point('Pompi Plaza de España'))).toContain('Via della Croce 88');
    expect(mapQuery(point('Pompi Albalonga — Re di Roma'))).toContain('Via Albalonga 7b');
  });

  it('keeps table booking scoped to Milky and preserves native accessible outbound links', () => {
    show('donde-comer');
    const group = card('Ba’Ghetto y Su Ghetto (Barrio Judío)');
    expect(main(group).querySelector('.practical-map, .practical-phones, .primary-action')).toBeNull();
    const milky = point('Ba’Ghetto Milky Roma');
    const booking = milky.querySelector<HTMLAnchorElement>('.primary-action')!;
    expect(booking.textContent).toContain('Reservar mesa');
    expect(booking.href).toBe('https://baghettomilky.superbexperience.com/reserve/guests');
    expect(booking.getAttribute('aria-label')).toContain('Ba’Ghetto Milky Roma');
    expect(point('Ba’Ghetto Roma — Carne').querySelector('.primary-action')).toBeNull();
    expect(point('Su Ghetto Roma').querySelector('.primary-action')).toBeNull();
    for (const anchor of Array.from(group.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'))) {
      expect(anchor.target).toBe('_blank');
      expect(anchor.rel).toContain('noopener');
      expect(anchor.rel).toContain('noreferrer');
    }
  });

  it('separates free basilica access, paid dome products, the closed Treasury and a visit request', () => {
    show('que-ver');
    const basilica = card('Basílica de San Pedro y Cúpula');
    expect(main(basilica).querySelector('.primary-action')).toBeNull();
    const lift = point('Cúpula con ascensor — incluye basílica y audioguía');
    const stairs = point('Cúpula por escaleras — incluye basílica y audioguía');
    expect(lift.closest('.zone-card')).toBe(basilica);
    expect(lift.querySelector<HTMLAnchorElement>('.primary-action')!.href).toContain('/52250633/');
    expect(stairs.querySelector<HTMLAnchorElement>('.primary-action')!.href).toContain('/52251275/');
    expect(lift.textContent).toContain('320 escalones');
    expect(stairs.textContent).toContain('551 escalones');
    const treasury = point('Museo del Tesoro — cerrado temporalmente');
    expect(treasury.querySelector('.primary-action')).toBeNull();
    const request = point('Necrópolis Vaticana — solicitud de visita guiada');
    expect(request.querySelector('.primary-action')!.textContent).toContain('Reservar visita');
    expect(request.textContent).toContain('confirma la visita antes del pago');
    const museums = card('Museos Vaticanos y Capilla Sixtina');
    expect(museums.querySelector('.primary-action')).toBeNull();
    expect(museums.querySelectorAll('section[aria-label^="Lugar incluido: "]').length).toBe(0);
  });

  it('adds no independent plan for an embedded service and no actions for uncertain identities', () => {
    show('que-ver');
    expect(root.querySelectorAll('.zone-card').length).toBe(43);
    expect(card('Shopping').querySelector('.practical-map, .primary-action')).toBeNull();
    expect(card('Pausa gastronómica – Pizza rossa romana').querySelector('a[href]')).toBeNull();
    show('donde-comer');
    expect(root.querySelectorAll('.item-card').length).toBe(16);
    expect(card('Da Baffetto (Centro histórico)').querySelector('a[href]')).toBeNull();
    expect(root.querySelector('a[href*="pizzeriabaffetto"]')).toBeNull();
    show('gastronomia');
    expect(root.querySelectorAll('.item-card').length).toBe(17);
  });

  it('keeps the optional pizza pause generic and meal budgets consistent with their restaurants', () => {
    show('que-ver');
    const pause = card('Pausa gastronómica – Pizza rossa romana');
    expect(pause.textContent).toContain('pausa opcional');
    expect(root.textContent).not.toContain('Antichi Sapori');
    const meal = main(card('Última comida en Roma – Da Baffetto o Cantina e Cucina')).textContent!;
    show('donde-comer');
    for (const [name, label] of [
      ['Da Baffetto (Centro histórico)', 'Da Baffetto'],
      ['Cantina e Cucina (Centro histórico)', 'Cantina e Cucina']
    ]) {
      const estimate = main(card(name)).textContent!.match(/\d+€ – \d+€ por persona/)?.[0];
      expect(estimate).withContext(name).toBeDefined();
      expect(meal).toContain(`${label}: ${estimate}`);
    }
  });

  it('uses the museum entrance instead of its centre and does not render unresolved map searches', () => {
    show('que-ver');
    const museums = card('Museos Vaticanos y Capilla Sixtina');
    const map = museums.querySelector<HTMLAnchorElement>('.practical-map a')!;
    expect(new URL(map.href).searchParams.get('query')).toBe('Porta Musei Vaticani');
    expect(new URL(map.href).searchParams.has('query_place_id')).toBeTrue();
    for (const name of ['Fontana di Trevi', 'Foro Romano', 'Coliseo (Anfiteatro Flavio)']) {
      const place = card(name);
      expect(place.querySelector('.practical-map')).withContext(name).toBeNull();
      expect(place.querySelector('.practical-website a')).withContext(name).not.toBeNull();
      expect(place.textContent).withContext(name).toContain('acceso');
    }
  });
});
