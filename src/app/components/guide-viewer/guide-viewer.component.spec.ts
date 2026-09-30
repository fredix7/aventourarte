import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { TravelNode, TRAVEL_TREE } from '../../data/travel-data';
import { ImageService } from '../../shared/image.service';
import { sectionPlanItems } from '../../shared/plan-filter';
import { matchesPlanTypes } from '../../shared/plan-types';
import { GUIDE_REGISTRY, GuideViewerComponent } from './guide-viewer.component';

describe('GuideViewerComponent', () => {
  let component: GuideViewerComponent;
  let imageService: jasmine.SpyObj<ImageService>;
  let routePath: string | null;
  let editorialParam: string | null;
  let routerUrl: string;
  let routerEvents: Subject<NavigationEnd>;

  const setRoute = (path: string | null, editorial = false) => {
    routePath = path;
    editorialParam = editorial ? '1' : null;
    routerUrl = path ? `/guia/${path}${editorial ? '?editorial=1' : ''}` : '/';
  };

  beforeEach(() => {
    routePath = null;
    editorialParam = null;
    routerUrl = '/';
    routerEvents = new Subject<NavigationEnd>();

    const route = {
      snapshot: {
        paramMap: {
          get: (name: string) => name === 'guidePath' ? routePath : null
        },
        queryParamMap: {
          get: (name: string) => name === 'editorial' ? editorialParam : null
        }
      }
    } as unknown as ActivatedRoute;

    const router = {
      get url() {
        return routerUrl;
      },
      events: routerEvents.asObservable()
    } as unknown as Router;

    imageService = jasmine.createSpyObj<ImageService>('ImageService', ['url', 'background']);
    imageService.url.and.callFake(src => src ? `resolved:${src}` : '');
    imageService.background.and.returnValue('resolved:background');

    spyOn(window, 'matchMedia').and.returnValue({ matches: false } as MediaQueryList);
    component = new GuideViewerComponent(route, router, imageService);
  });

  afterEach(() => {
    component.ngOnDestroy();
    routerEvents.complete();
    document.body.style.overflow = '';
  });

  it('loads a registered guide and builds its tabs from a known route', () => {
    setRoute('europa/espana/andalucia/cadiz/jerez-de-la-frontera');

    component.ngOnInit();

    expect(component.guide?.nombre).toBe('Jerez de la Frontera');
    expect(component.requestedGuidePath).toBeNull();
    expect(component.tabs.length).toBeGreaterThan(0);
    expect(component.activeTabId).toBe(component.tabs[0].id);
    expect(imageService.background).toHaveBeenCalled();
  });

  it('enables the editorial panel only through the explicit query parameter', () => {
    setRoute('europa/espana/andalucia/cadiz/rota', true);
    component.ngOnInit();
    expect(component.editorialMode).toBeTrue();

    setRoute('europa/espana/andalucia/cadiz/rota');
    routerEvents.next(new NavigationEnd(1, routerUrl, routerUrl));
    expect(component.editorialMode).toBeFalse();
  });

  it('keeps the requested path and shows no guide for an unknown route', () => {
    setRoute('europa/espana/andalucia/cadiz/destino-pendiente');

    component.ngOnInit();

    expect(component.guide).toBeNull();
    expect(component.requestedGuidePath).toBe(
      'europa/espana/andalucia/cadiz/destino-pendiente'
    );
    expect(component.tabs).toEqual([]);
    expect(component.pageStyle).toEqual({});
  });

  it('reloads on navigation and stops listening when destroyed', () => {
    setRoute('europa/espana/andalucia/cadiz/cadiz');
    component.ngOnInit();
    expect(component.guide?.nombre).toBe('Cádiz');

    setRoute('europa/espana/andalucia/cadiz/rota');
    routerEvents.next(new NavigationEnd(1, routerUrl, routerUrl));
    expect(component.guide?.nombre).toBe('Rota');

    component.ngOnDestroy();
    setRoute('europa/espana/andalucia/cadiz/san-fernando');
    routerEvents.next(new NavigationEnd(2, routerUrl, routerUrl));
    expect(component.guide?.nombre).toBe('Rota');
  });

  it('groups known sections into tabs and keeps uncategorized content available', () => {
    component.guide = {
      path: 'europa/espana/pruebas',
      secciones: [
        { titulo: 'Historia local' },
        { titulo: 'Gastronomía' },
        { titulo: 'Fiestas populares' },
        { titulo: 'Notas adicionales' }
      ]
    };

    const tabs = component.buildGuideTabs();

    expect(tabs.map(tab => tab.id)).toEqual([
      'historia',
      'gastronomia',
      'fiestas',
      'mas-info'
    ]);
    expect(component.activeTabId).toBe('historia');

    component.setActiveTab('mas-info');
    expect(component.activeTabId).toBe('mas-info');
  });

  it('opens a deduplicated gallery, wraps navigation and closes with Escape', () => {
    component.openPhoto('second.jpg', 'Vista', ['first.jpg', 'second.jpg', 'second.jpg']);

    expect(component.expandedPhoto).toEqual({
      src: 'second.jpg',
      alt: 'Vista',
      gallery: ['first.jpg', 'second.jpg'],
      index: 1
    });
    expect(document.body.style.overflow).toBe('hidden');

    component.nextPhoto();
    expect(component.expandedPhoto?.src).toBe('first.jpg');
    component.previousPhoto();
    expect(component.expandedPhoto?.src).toBe('second.jpg');

    component.handlePhotoKeys(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.expandedPhoto).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  it('navigates the lightbox with the keyboard and constrains zoom', () => {
    component.openPhoto('first.jpg', 'Vista', ['first.jpg', 'second.jpg']);

    component.handlePhotoKeys(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(component.expandedPhoto?.src).toBe('second.jpg');
    component.handlePhotoKeys(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(component.expandedPhoto?.src).toBe('first.jpg');

    for (let index = 0; index < 20; index += 1) component.zoomIn();
    expect(component.zoomLevel).toBe(4);

    for (let index = 0; index < 20; index += 1) component.zoomOut();
    expect(component.zoomLevel).toBe(0.5);
    expect(component.panX).toBe(0);
    expect(component.panY).toBe(0);
  });

  it('combines dietary, alcohol and allergen filters conservatively in Almensilla', () => {
    setRoute('europa/espana/andalucia/sevilla/almensilla');
    component.ngOnInit();

    const gastronomy = component.guide.secciones.find(
      (section: any) => section.titulo === 'Gastronomía'
    );
    const dish = (name: string) => gastronomy.platos.find((item: any) => item.nombre === name);

    component.toggleDietaryPreference('vegetariano');
    expect(component.gastronomyFilterState(dish('Galletas fritas y rollitos de masa rellenos de flan')))
      .toBe('compatible');
    expect(component.gastronomyFilterState(dish('Migas con jamón y pasas')))
      .toBe('incompatible');
    expect(component.gastronomyFilterState(dish('Aceitunas de mesa de Almensilla')))
      .toBe('unknown');

    component.toggleDietaryPreference('pescetariano');
    component.toggleAllergen('leche');
    component.toggleAvoidAlcohol();
    expect(
      component.gastronomyFilterState(
        dish('Pan tostado con aceite de oliva y sardinas de La Tostá')
      )
    ).toBe('compatible');
    expect(component.gastronomyFilterState(dish('Mosto de Almensilla')))
      .toBe('incompatible');

    component.clearGastronomyFilters();
    expect(component.hasGastronomyFilterSelection()).toBeFalse();
  });

  it('clears food preference selections when the destination changes', () => {
    setRoute('europa/espana/andalucia/sevilla/almensilla');
    component.ngOnInit();
    component.toggleDietaryPreference('vegano');
    component.toggleAvoidAlcohol();
    component.toggleAvoidPork();

    setRoute('europa/espana/andalucia/cadiz/rota');
    routerEvents.next(new NavigationEnd(1, routerUrl, routerUrl));

    expect(component.selectedDiet).toBeNull();
    expect(component.avoidAlcohol).toBeFalse();
    expect(component.avoidPork).toBeFalse();
  });

  it('filters the Nordic itinerary and nested visits while leaving other tabs intact', () => {
    setRoute('europa/dinamarca/copenhague');
    component.ngOnInit();
    const originalGuide = JSON.stringify(component.guide);
    const originalTabs = component.tabs;
    const options = component.availablePlanTypes;
    component.togglePlanType('playa');
    component.togglePlanType('gratuito');

    const visible = component.visiblePlanSections.flatMap(sectionPlanItems);
    expect(visible.length).toBeGreaterThan(0);
    expect(visible.every(item => item.tiposPlan?.includes('playa') && item.tiposPlan.includes('gratuito'))).toBeTrue();
    expect(component.matchingPlanCount).toBe(visible.length);
    expect(component.matchingPlanCount).toBeLessThan(component.totalPlanCount);
    expect(component.availablePlanTypes).toBe(options);
    expect(component.tabs).toBe(originalTabs);
    expect(JSON.stringify(component.guide)).toBe(originalGuide);

    component.setActiveTab('gastronomia');
    component.toggleAllergen('leche');
    component.setActiveTab('que-ver');
    expect([...component.selectedPlanTypes]).toEqual(['playa', 'gratuito']);
    component.clearPlanFilters();
    expect(component.selectedAllergens.has('leche')).toBeTrue();
    expect(component.matchingPlanCount).toBe(component.totalPlanCount);
    expect(component.visiblePlanSections).toBe(originalTabs.find(tab => tab.id === 'que-ver')!.sections);
  });

  it('separates Chipiona main route from optional plans and combines both without losing visits', () => {
    setRoute('europa/espana/andalucia/cadiz/chipiona');
    component.ngOnInit();
    expect(component.totalPlanCount).toBe(23);
    expect(component.availablePlanTypes.filter(type => type.group === 'recorrido').map(type => type.id))
      .toEqual(['ruta', 'opcional']);

    component.togglePlanType('ruta');
    const main = component.visiblePlanSections.flatMap(sectionPlanItems);
    expect(component.matchingPlanCount).toBe(15);
    expect(main.some(item => item.nombre?.startsWith('Faro de Chipiona'))).toBeTrue();
    expect(main.some(item => item.nombre === 'Santuario de Nuestra Señora de Regla')).toBeTrue();

    component.togglePlanType('opcional');
    expect(component.matchingPlanCount).toBe(23);
    component.togglePlanType('ruta');
    const optional = component.visiblePlanSections.flatMap(sectionPlanItems);
    expect(component.matchingPlanCount).toBe(8);
    expect(optional.some(item => item.nombre === 'Bodega César Florido')).toBeTrue();
    expect(optional.some(item => main.includes(item))).toBeFalse();
  });

  it('resets the plan selection and available types on destination changes and unknown routes', () => {
    setRoute('europa/dinamarca/copenhague');
    component.ngOnInit();
    component.togglePlanType('playa');
    setRoute('europa/suecia/malmo');
    routerEvents.next(new NavigationEnd(1, routerUrl, routerUrl));
    expect(component.selectedPlanTypes.size).toBe(0);
    expect(component.matchingPlanCount).toBe(component.totalPlanCount);

    setRoute('no-existe');
    routerEvents.next(new NavigationEnd(2, routerUrl, routerUrl));
    expect(component.availablePlanTypes).toEqual([]);
    expect(component.visiblePlanSections).toEqual([]);
    expect(component.totalPlanCount).toBe(0);
  });

  it('keeps counts and results consistent for every available filter in every published guide', () => {
    for (const path of Object.keys(GUIDE_REGISTRY)) {
      setRoute(path);
      component.ngOnInit();
      const originalSections = component.tabs.find(tab => tab.id === 'que-ver')?.sections ?? [];
      const allItems = originalSections.flatMap(sectionPlanItems);
      expect(component.totalPlanCount).withContext(path).toBe(allItems.length);
      for (const type of component.availablePlanTypes) {
        component.togglePlanType(type.id);
        const expected = allItems.filter(item => matchesPlanTypes(item, new Set([type.id])));
        expect(component.visiblePlanSections.flatMap(sectionPlanItems)).withContext(`${path}: ${type.id}`).toEqual(expected);
        expect(component.matchingPlanCount).toBe(expected.length);
        component.togglePlanType(type.id);
      }
    }
  });
});

describe('GUIDE_REGISTRY', () => {
  const collectPaths = (nodes: TravelNode[]): string[] => nodes.flatMap(node => [
    ...(node.path ? [node.path] : []),
    ...collectPaths(node.hijos ?? [])
  ]);

  it('registers each published guide under its canonical menu path', () => {
    const menuPaths = new Set(collectPaths(TRAVEL_TREE));

    for (const [path, guide] of Object.entries(GUIDE_REGISTRY)) {
      expect(menuPaths.has(path)).withContext(`${path} is missing from TRAVEL_TREE`).toBeTrue();
      expect(guide.path).withContext(`${path} does not match guide.path`).toBe(path);
      expect(guide.nombre).withContext(`${path} has no guide name`).toBeTruthy();
    }
  });

  it('includes the current Chipiona guide', () => {
    expect(GUIDE_REGISTRY['europa/espana/andalucia/cadiz/chipiona']?.nombre).toBe('Chipiona');
  });

  it('includes the Almensilla guide under Sevilla', () => {
    expect(GUIDE_REGISTRY['europa/espana/andalucia/sevilla/almensilla']?.nombre).toBe(
      'Almensilla'
    );
  });
});
