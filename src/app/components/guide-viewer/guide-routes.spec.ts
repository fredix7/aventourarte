import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy, PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { ANIMATION_MODULE_TYPE } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { TRAVEL_TREE, TravelNode } from '../../data/travel-data';
import { HeaderComponent } from '../../header/header.component';
import { ImageService } from '../../shared/image.service';
import { GUIDE_REGISTRY, GuideViewerComponent } from './guide-viewer.component';

describe('Published, planned and unknown destination routes', () => {
  const baseHref = '/aventourarte/';
  const jerezPath = 'europa/espana/andalucia/cadiz/jerez-de-la-frontera';
  const plannedPath = 'america/norteamerica/usa/new-york';
  const unknownPath = 'europa/espana/andalucia/cadiz/destino-que-no-existe';
  let platformLocation: MockPlatformLocation;

  const collectPaths = (nodes: TravelNode[]): string[] => nodes.flatMap(node => [
    ...(node.path ? [node.path] : []),
    ...collectPaths(node.hijos ?? [])
  ]);

  beforeEach(async () => {
    platformLocation = new MockPlatformLocation({
      startUrl: `https://example.test${baseHref}`,
      appBaseHref: baseHref
    });
    await TestBed.configureTestingModule({
      imports: [GuideViewerComponent, HeaderComponent],
      providers: [
        provideRouter(routes),
        { provide: ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' },
        { provide: APP_BASE_HREF, useValue: baseHref },
        { provide: PlatformLocation, useValue: platformLocation },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        {
          provide: ImageService,
          useValue: {
            url: () => 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            background: () => ''
          }
        }
      ]
    }).compileComponents();
  });

  for (const [path, guide] of Object.entries(GUIDE_REGISTRY)) {
    it(`loads the published guide at /guia/${path}/ on initial navigation`, async () => {
      const harness = await RouterTestingHarness.create(`/guia/${path}/`);
      const viewer = harness.routeDebugElement?.componentInstance as GuideViewerComponent;

      expect(viewer.guide).toBe(guide);
      expect(harness.routeNativeElement?.querySelector('.city-title')?.textContent)
        .toBe(guide.nombre);
      expect(harness.routeNativeElement?.textContent).not.toContain('Guía en preparación');
      expect(platformLocation.pathname).toBe(`${baseHref}guia/${path}/`);
    });
  }

  it('navigates from a Jerez search suggestion to its published guide', async () => {
    const harness = await RouterTestingHarness.create('/');
    const header = TestBed.createComponent(HeaderComponent);
    header.componentRef.setInput('treeData', TRAVEL_TREE);
    header.detectChanges();
    const input = header.nativeElement.querySelector('input[type="search"]') as HTMLInputElement;
    input.value = 'Jerez';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    header.detectChanges();
    const link = header.debugElement.query(By.css('a.search-result'));
    expect(link.injector.get(RouterLink, null)).not.toBeNull();
    header.ngZone!.run(() => link.nativeElement.click());
    await header.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe(`/guia/${jerezPath}`);
    expect(harness.routeNativeElement?.querySelector('.city-title')?.textContent)
      .toBe('Jerez de la Frontera');
    expect(header.componentInstance.searchQuery).toBe('');
  });

  it('keeps every registered unpublished destination in preparation, including New York', async () => {
    const harness = await RouterTestingHarness.create(`/guia/${plannedPath}/`);
    expect(harness.routeNativeElement?.querySelector('h2')?.textContent).toBe('Guía en preparación');

    const unpublishedPaths = [...new Set(collectPaths(TRAVEL_TREE))]
      .filter(path => !Object.hasOwn(GUIDE_REGISTRY, path));
    expect(unpublishedPaths).toContain(plannedPath);
    for (const path of unpublishedPaths) {
      const viewer = await harness.navigateByUrl(`/guia/${path}/`, GuideViewerComponent);
      expect(viewer.guide).withContext(path).toBeNull();
      expect(harness.routeNativeElement?.querySelector('h2')?.textContent)
        .withContext(path).toBe('Guía en preparación');
    }
  });

  for (const url of [`/guia/${unknownPath}/`, '/destino-que-no-existe/', '/guia/', `/${jerezPath}/`]) {
    it(`shows an accessible not-found page and a working home link for ${url}`, async () => {
      const harness = await RouterTestingHarness.create(url);
      expect(harness.routeNativeElement?.querySelector('h2')?.textContent)
        .toBe('Página no encontrada');
      expect(harness.routeNativeElement?.textContent).not.toContain('Guía en preparación');
      const link = harness.routeDebugElement!.query(By.css('a'));
      expect(link).not.toBeNull();
      if (!link) return;
      expect(link.injector.get(RouterLink, null)).not.toBeNull();
      const anchor = link.nativeElement as HTMLAnchorElement;
      expect(anchor.getAttribute('href')).toBe(baseHref);
      expect(anchor.textContent).toContain('Volver a la portada');
      expect(anchor.tabIndex).toBe(0);
      anchor.focus();
      expect(document.activeElement).toBe(anchor);

      const click = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
      harness.fixture.ngZone!.run(() => anchor.dispatchEvent(click));
      expect(click.defaultPrevented).toBeTrue();
      await harness.fixture.whenStable();
      harness.detectChanges();
      expect(TestBed.inject(Router).url).toBe('/');
      expect(platformLocation.pathname).toBe(baseHref);
      expect(harness.routeNativeElement?.querySelector('h2')?.textContent)
        .toBe('Bienvenido a AvenTourArte');
    });
  }

  it('updates the visual state when navigating between published, planned and unknown guides', async () => {
    const harness = await RouterTestingHarness.create(`/guia/${jerezPath}`);
    await harness.navigateByUrl(`/guia/${plannedPath}`, GuideViewerComponent);
    expect(harness.routeNativeElement?.querySelector('h2')?.textContent).toBe('Guía en preparación');
    await harness.navigateByUrl(`/guia/${unknownPath}`, GuideViewerComponent);
    expect(harness.routeNativeElement?.querySelector('h2')?.textContent).toBe('Página no encontrada');
    await harness.navigateByUrl(`/guia/${jerezPath}`, GuideViewerComponent);
    expect(harness.routeNativeElement?.querySelector('.city-title')?.textContent)
      .toBe('Jerez de la Frontera');
    expect(harness.routeNativeElement?.textContent).not.toContain('Página no encontrada');
  });
});
