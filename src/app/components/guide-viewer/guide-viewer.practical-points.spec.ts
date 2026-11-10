import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ImageService } from '../../shared/image.service';
import { MALTA_GUIDE } from '../../guides/europa/malta/malta.guide';
import { GuideViewerComponent } from './guide-viewer.component';

describe('GuideViewerComponent grouped practical places', () => {
  let fixture: ComponentFixture<GuideViewerComponent>;
  let events: Subject<unknown>;
  let root: HTMLElement;

  const points = (): HTMLElement[] => Array.from(root.querySelectorAll('section[aria-label^="Lugar incluido: "]'));
  const point = (name: string): HTMLElement => {
    const result = points().find(element => element.querySelector('h4')?.textContent?.startsWith(name));
    expect(result).withContext(name).toBeDefined();
    return result!;
  };
  const map = (element: Element): HTMLAnchorElement | null =>
    element.querySelector<HTMLAnchorElement>('.practical-map a');
  const zone = (name: string): HTMLElement => {
    const result = Array.from(root.querySelectorAll<HTMLElement>('.zone-card'))
      .find(element => element.querySelector('h3')?.textContent === name);
    expect(result).withContext(name).toBeDefined();
    return result!;
  };

  beforeEach(async () => {
    events = new Subject();
    const imageService = jasmine.createSpyObj<ImageService>('ImageService', ['url', 'background']);
    imageService.url.and.returnValue('');
    imageService.background.and.returnValue('');
    await TestBed.configureTestingModule({
      imports: [GuideViewerComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {
          paramMap: { get: () => 'europa/malta/malta' },
          queryParamMap: { get: () => null }
        } } },
        { provide: Router, useValue: { url: '/guia/europa/malta/malta', events } },
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
    events.complete();
  });

  it('renders named practical subplaces without adding itinerary cards or duplicating Blue Hole', () => {
    const sourceZones = MALTA_GUIDE.secciones.flatMap<{ zonas?: readonly unknown[] }>(section => section.itinerario ?? [])
      .flatMap(day => day.zonas ?? []);
    expect(root.querySelectorAll('.zone-card').length).toBe(sourceZones.length);
    expect(fixture.componentInstance.totalPlanCount).toBe(sourceZones.length);
    expect(points().length).toBe(14);
    const names = points().map(element => element.querySelector('h4')!.textContent!.trim());
    expect(new Set(names).size).toBe(14);
    expect(names.filter(name => name.startsWith('Blue Hole')).length).toBe(1);
    expect(point('Blue Hole').closest('.zone-card')).toBe(zone('La Ventana Azul (Azure Window)'));
    expect(points().every(element => element.getAttribute('aria-label') ===
      'Lugar incluido: ' + element.querySelector('h4')!.textContent!.trim())).toBeTrue();
  });

  it('preserves the principal pins and gives distinct destinations to beaches, ports and shopping centres', () => {
    const golden = zone('Golden Bay y Għajn Tuffieħa');
    expect(map(golden)!.href).toContain('Golden%20Bay');
    expect(map(point('Għajn Tuffieħa'))!.href).toBe('https://www.google.com/maps?cid=516968802120237521');
    const grotto = zone('Gruta Azul (Blue Grotto)');
    expect(map(grotto)!.getAttribute('href')).toBe('https://maps.app.goo.gl/fc4LD2Wt5XU6FxGn7');
    expect(map(point('Blue Grotto Boat Service'))!.href).toContain('Wied%20iz%20Zurrieq');
    const shopping = zone('Compras y recuerdos');
    expect(map(shopping)!.href).toContain('The%20Point');
    expect(map(point('Bay Street'))!.href).toBe('https://www.google.com/maps/search/?api=1&query=Bay%20Street%20Shopping%20Complex%2C%20St.%20George%27s%20Bay%2C%20St.%20Julian%27s%20STJ%203311%2C%20Malta');
    expect(map(zone('Isla de Gozo (Għawdex)'))!.href).toContain('Mgarr%20Harbour');
    expect(map(point('Ġgantija'))!.href).not.toContain('Mgarr');
    expect(map(point('Fungus Rock'))).toBeNull();
    expect(point('Fungus Rock').textContent).toContain('mapa principal');
    expect(map(zone('La Ventana Azul (Azure Window)'))!.getAttribute('href'))
      .toBe('https://maps.app.goo.gl/ZdQE8AMzRrccdaeH8');
  });

  it('keeps native named external links and scopes museum tickets separately from information and contacts', () => {
    const links = points().flatMap(element => Array.from(element.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')));
    expect(points().filter(element => map(element)).length).toBe(13);
    for (const link of links) {
      const name = link.closest('section')!.querySelector('h4')!.textContent!.trim();
      expect(link.getAttribute('aria-label')).withContext(name).toContain(name);
      expect(link.target).toBe('_blank');
      expect(link.rel).toContain('noopener');
      expect(link.rel).toContain('noreferrer');
      expect(link.tabIndex).toBe(0);
    }
    const cittadella = point('Cittadella / Victoria');
    expect(cittadella.querySelector('h4')!.textContent).toContain('combinado de museos opcional');
    expect(cittadella.querySelector('a[href="https://heritagemalta.mt/store/c260/"]')).not.toBeNull();
    expect(cittadella.querySelector('a[href="https://visitgozo.com/places/cittadella/"]')).not.toBeNull();
    expect(point('Ġgantija').querySelector('a[href="https://heritagemalta.mt/store/c37/"]')).not.toBeNull();
    expect(points().flatMap(element => Array.from(element.querySelectorAll('.primary-action'))).length).toBe(2);
    expect(point('Ta’ Pinu').querySelector('.primary-action')).toBeNull();
    expect(point('Blue Grotto Boat Service').querySelector('.primary-action')).toBeNull();
    expect(map(point('Triq Sant’ Orsla'))!.href).toContain('Department%20of%20Information');
    expect(point('Triq Sant’ Orsla').querySelector('.phone-link')).toBeNull();
    expect(map(point('Blue Hole'))!.href).toContain('query_place_id=ChIJn_ajP4O2DxMRHKw0YgMLX3Y');
  });

  it('leaves the existing rendering unchanged for zones without optional practical subplaces', () => {
    const namesBefore = Array.from(root.querySelectorAll('.zone-card h3')).map(element => element.textContent);
    const component = fixture.componentInstance;
    component.visiblePlanSections = component.visiblePlanSections.map(section => ({
      ...section,
      itinerario: section.itinerario?.map((day: any) => ({
        ...day, zonas: day.zonas.map((item: any) => ({ ...item, puntosPracticos: undefined }))
      }))
    }));
    fixture.detectChanges();
    expect(points().length).toBe(0);
    expect(Array.from(root.querySelectorAll('.zone-card h3')).map(element => element.textContent)).toEqual(namesBefore);
    expect(map(zone('Palazzo Parisio (Merchants Street)'))!.href).toContain('Merchants%20Street');
    expect(zone('Free Tour por La Valeta').textContent).toContain('Sin horario fijo');
    expect(map(zone('Compras y recuerdos'))!.href).toContain('The%20Point');
  });
});
