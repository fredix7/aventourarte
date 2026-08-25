import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { TravelNode, TRAVEL_TREE } from '../../data/travel-data';
import { ImageService } from '../../shared/image.service';
import { GUIDE_REGISTRY, GuideViewerComponent } from './guide-viewer.component';

describe('GuideViewerComponent', () => {
  let component: GuideViewerComponent;
  let imageService: jasmine.SpyObj<ImageService>;
  let routePath: string | null;
  let routerUrl: string;
  let routerEvents: Subject<NavigationEnd>;

  const setRoute = (path: string | null) => {
    routePath = path;
    routerUrl = path ? `/guia/${path}` : '/';
  };

  beforeEach(() => {
    routePath = null;
    routerUrl = '/';
    routerEvents = new Subject<NavigationEnd>();

    const route = {
      snapshot: {
        paramMap: {
          get: (name: string) => name === 'guidePath' ? routePath : null
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
});
