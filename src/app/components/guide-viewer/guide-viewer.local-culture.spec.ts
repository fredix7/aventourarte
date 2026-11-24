import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { ImageService } from '../../shared/image.service';
import { sectionPlanItems } from '../../shared/plan-filter';
import { PLAN_TYPES } from '../../shared/plan-types';
import { GuideViewerComponent } from './guide-viewer.component';

for (const [destination, path, expectedCards] of [
  ['Rome', 'europa/italia/roma-vaticano', 2],
  ['Malta', 'europa/malta/malta', 2],
  ['Copenhagen', 'europa/dinamarca/copenhague', 1],
  ['Malmö', 'europa/suecia/malmo', 3]
] as const) {
  describe(`GuideViewerComponent ${destination} local culture`, () => {
    let fixture: ComponentFixture<GuideViewerComponent>;
    let root: HTMLElement;

    beforeEach(async () => {
      const images = jasmine.createSpyObj<ImageService>('ImageService', ['url', 'background']);
      images.url.and.returnValue('');
      images.background.and.returnValue('');
      await TestBed.configureTestingModule({
        imports: [GuideViewerComponent],
        providers: [
          provideRouter([]),
          { provide: ActivatedRoute, useValue: { snapshot: {
            paramMap: { get: () => path }, queryParamMap: { get: () => null }
          } } },
          { provide: ImageService, useValue: images }
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(GuideViewerComponent);
      fixture.detectChanges();
      root = fixture.nativeElement;
    });

    afterEach(() => fixture.destroy());

    it('keeps culture between dining and advice and outside the main route', () => {
      const component = fixture.componentInstance;
      const tabs = component.tabs.map(tab => tab.id);
      expect(tabs.filter(id => id === 'cultura').length).toBe(1);
      expect(tabs.indexOf('cultura')).toBe(tabs.indexOf('donde-comer') + 1);
      expect(tabs.indexOf('consejos')).toBe(tabs.indexOf('cultura') + 1);
      const culture = component.tabs.find(tab => tab.id === 'cultura')!.sections;
      const optional = culture.flatMap(sectionPlanItems);
      const itinerary = component.tabs.find(tab => tab.id === 'que-ver')!.sections.flatMap(sectionPlanItems);
      expect(optional.length).toBe(expectedCards);
      for (const item of optional) {
        expect(item.tiposPlan).toContain('opcional');
        expect(item.tiposPlan).not.toContain('ruta');
        expect(item.tiposPlan!.every(type => PLAN_TYPES.some(valid => valid.id === type))).toBeTrue();
        expect(itinerary).not.toContain(item);
        expect(itinerary.some(stop => stop.nombre === item.nombre)).toBeFalse();
      }
    });

    it('renders cultural text and scoped practical links without adding booking or photo claims', () => {
      fixture.componentInstance.setActiveTab('cultura');
      fixture.detectChanges();
      const cards = Array.from(root.querySelectorAll<HTMLElement>('.item-card'));
      expect(cards.length).toBe(expectedCards);
      expect(root.querySelector('.section-content')?.textContent?.trim()).toBeTruthy();
      if (destination === 'Rome' || destination === 'Malta') {
        expect(root.querySelector('.section-content')!.textContent).toContain('✨ Consejo AvenTourArte:');
      }
      for (const card of cards) {
        expect(card.querySelector('h3')?.textContent?.trim()).toBeTruthy();
        expect(card.querySelector('.practical-website a')).not.toBeNull();
        for (const link of Array.from(card.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'))) {
          expect(link.target).toBe('_blank');
          expect(link.rel).toContain('noopener');
          expect(link.rel).toContain('noreferrer');
          expect(link.getAttribute('aria-label')).toBeTruthy();
        }
        if (destination === 'Rome' || destination === 'Malta') {
          expect(card.textContent).toContain('✨ Consejo AvenTourArte:');
          expect(card.querySelector('.primary-action, .item-image')).toBeNull();
          expect(card.querySelectorAll('section[aria-label^="Lugar incluido: "]').length).toBe(0);
        }
      }
      if (destination === 'Malta') {
        const seasonal = cards.find(card => card.querySelector('h3')?.textContent?.includes('San Lawrenz'))!;
        expect(seasonal.textContent).toContain('programa de la festa del año de tu viaje');
        expect(seasonal.textContent).toContain('se concentran en los días de celebración');
        expect(seasonal.textContent).toContain('El paseo por la plaza y el pueblo es gratuito');
        expect(seasonal.textContent).toContain('Para entrar en la iglesia');
        expect(seasonal.textContent).toContain('consulta el programa para conocer los actos de la festa');
        expect(seasonal.textContent).toContain('Gratuito');
        expect(seasonal.textContent).not.toContain('Coste variable');
        expect(seasonal.querySelector<HTMLAnchorElement>('.practical-map a')!.href)
          .toBe('https://www.google.com/maps/search/?api=1&query=San%20Lawrenz%20Parish%20Church%2C%20San%20Lawrenz%2C%20Gozo%2C%20Malta&query_place_id=ChIJw7dM4i20DxMR3kqzcRoO84o');
        expect(seasonal.querySelector<HTMLAnchorElement>('.practical-website a')!.href)
          .toBe('https://visitgozo.com/experience/cultural-festive-events/');
      }
    });
  });
}
