import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { ImageService } from '../../shared/image.service';
import { GuideViewerComponent } from './guide-viewer.component';

describe('GuideViewerComponent practical subplaces in ordinary cards', () => {
  let fixture: ComponentFixture<GuideViewerComponent>;
  let root: HTMLElement;

  const points = (): HTMLElement[] => Array.from(root.querySelectorAll('section[aria-label^="Lugar incluido: "]'));
  const point = (name: string): HTMLElement => root.querySelector<HTMLElement>(`section[aria-label="Lugar incluido: ${name}"]`)!;
  const card = (name: string): HTMLElement => Array.from(root.querySelectorAll<HTMLElement>('.item-card'))
    .find(element => element.querySelector('.card-copy h3, .card-copy h4')?.textContent === name)!;

  beforeEach(async () => {
    const imageService = jasmine.createSpyObj<ImageService>('ImageService', ['url', 'background']);
    imageService.url.and.returnValue('');
    imageService.background.and.returnValue('');
    await TestBed.configureTestingModule({
      imports: [GuideViewerComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: {
          paramMap: { get: () => 'europa/suecia/malmo' }, queryParamMap: { get: () => null }
        } } },
        { provide: ImageService, useValue: imageService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(GuideViewerComponent);
    fixture.detectChanges();
    fixture.componentInstance.setActiveTab('que-ver');
    fixture.detectChanges();
    root = fixture.nativeElement;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('renders each secondary once inside its parent without creating additional plan cards', () => {
    expect(root.querySelectorAll('.item-card').length).toBe(14);
    expect(fixture.componentInstance.totalPlanCount).toBe(14);
    expect(points().length).toBe(12);
    expect(point('Teknikens och sjöfartens hus').closest('.item-card'))
      .toBe(card('Castillo de Malmö — Malmöhus y sus museos'));
    expect(point('Apoteket Lejonet').closest('.item-card'))
      .toBe(card('Stortorget, Ayuntamiento y Apoteket Lejonet'));
    expect(points().every(element => element.querySelector('h4')?.textContent ===
      element.getAttribute('aria-label')?.replace('Lugar incluido: ', ''))).toBeTrue();
  });

  it('preserves principal destinations and gives the secondaries named safe native links', () => {
    const castle = card('Castillo de Malmö — Malmöhus y sus museos');
    const square = card('Stortorget, Ayuntamiento y Apoteket Lejonet');
    expect(castle.querySelector<HTMLAnchorElement>('.practical-map a')!.href).toContain('cid=16168063994645506825');
    expect(square.querySelector<HTMLAnchorElement>('.practical-map a')!.href).toContain('ChIJw8nvUxSjU0YRzkaVToJNZlw');
    expect(point('Teknikens och sjöfartens hus').querySelector<HTMLAnchorElement>('.practical-map a')!.href)
      .toContain('Teknikens%20och%20Sj%C3%B6fartens');
    expect(point('Apoteket Lejonet').querySelector<HTMLAnchorElement>('.practical-map a')!.href)
      .toContain('Stortorget%208');
    for (const element of points()) {
      const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'));
      expect(links.length).toBe(2);
      for (const link of links) {
        expect(link.getAttribute('aria-label')).toContain(element.querySelector('h4')!.textContent!);
        expect(link.target).toBe('_blank');
        expect(link.rel).toContain('noopener');
        expect(link.rel).toContain('noreferrer');
        expect(link.tabIndex).toBe(0);
      }
    }
    expect(point('Apoteket Lejonet').querySelector('a[href="https://www.apoteket.se/apotek/apoteket-lejonet-malmo/"]')).not.toBeNull();
  });

  it('distinguishes museum products without a misleading booking action and preserves pharmacy facts', () => {
    const museum = point('Teknikens och sjöfartens hus');
    expect(museum.textContent).toContain('Entrada individual solo al Museo Técnico: adultos 60 SEK');
    expect(museum.textContent).toContain('Ninguna de esas dos entradas incluye una sesión de Wisdome');
    expect(museum.textContent).toContain('reservar su horario');
    expect(museum.querySelector('a[href="tel:+4640344400"]')).not.toBeNull();
    expect(points().some(element => element.querySelector('.primary-action'))).toBeFalse();
    const square = card('Stortorget, Ayuntamiento y Apoteket Lejonet');
    expect(square.textContent).toContain('Apoteket Lejonet: Stortorget 8');
    expect(square.textContent).toContain('Apoteket Lejonet: lunes–viernes 09:00–18:00; sábado 10:00–15:00; domingo cerrado');
    expect(point('Apoteket Lejonet').querySelector('.practical-address')).toBeNull();
  });

  it('supports optional children in generic cards, including parents without facts and subsection headings', () => {
    const component = fixture.componentInstance;
    const places = [
      { nombre: 'Sin secundarios' },
      { nombre: 'Lista vacía', puntosPracticos: [] },
      { nombre: 'Solo secundarios', puntosPracticos: [{ nombre: 'Punto de ejemplo', web: 'https://example.org/' }] }
    ];
    component.visiblePlanSections = [{ titulo: 'Ejemplo', lugares: places }];
    fixture.detectChanges();
    expect(root.querySelectorAll('.item-card').length).toBe(3);
    expect(points().length).toBe(1);
    expect(card('Sin secundarios').querySelector('app-practical-info')).toBeNull();
    expect(card('Lista vacía').querySelector('app-practical-info')).toBeNull();
    expect(point('Punto de ejemplo').querySelector('h4')).not.toBeNull();
    expect(point('Punto de ejemplo').querySelector('a[href="https://example.org/"]')).not.toBeNull();
    component.visiblePlanSections = [{ titulo: 'Ejemplo', subsecciones: [{ titulo: 'Grupo', lugares: places }] }];
    fixture.detectChanges();
    expect(points().length).toBe(1);
    expect(point('Punto de ejemplo').querySelector('h5')).not.toBeNull();
    expect(card('Solo secundarios').querySelector('.card-copy h4')).not.toBeNull();
  });
});
