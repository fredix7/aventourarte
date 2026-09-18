import {
  APP_BASE_HREF,
  LocationStrategy,
  PathLocationStrategy,
  PlatformLocation
} from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { ANIMATION_MODULE_TYPE, DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatExpansionPanel } from '@angular/material/expansion';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { ImageService } from '../../shared/image.service';
import { GUIDE_REGISTRY, GuideViewerComponent } from './guide-viewer.component';

describe('Related guides navigation', () => {
  const baseHref = '/aventourarte/';
  const copenhagenPath = 'europa/dinamarca/copenhague';
  const malmoPath = 'europa/suecia/malmo';
  let harness: RouterTestingHarness;
  let platformLocation: MockPlatformLocation;

  beforeEach(async () => {
    platformLocation = new MockPlatformLocation({
      startUrl: `https://example.test${baseHref}`,
      appBaseHref: baseHref
    });

    await TestBed.configureTestingModule({
      imports: [GuideViewerComponent],
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
      ],
      teardown: { destroyAfterEach: true }
    }).compileComponents();

    harness = await RouterTestingHarness.create();
  });

  const relatedLink = (name: string): DebugElement => {
    const link = harness.routeDebugElement?.queryAll(By.css('a')).find(element =>
      element.nativeElement.textContent.includes(`Ver la guía de ${name}`)
    );
    if (!link) throw new Error(`Missing related guide link to ${name}`);

    // Require Angular navigation before dispatching a real click in the test browser.
    if (!link.injector.get(RouterLink, null)) {
      throw new Error(`The related guide link to ${name} must use RouterLink`);
    }
    return link;
  };

  const openLinkPanel = async (link: DebugElement) => {
    const panel = harness.routeDebugElement?.queryAll(By.directive(MatExpansionPanel))
      .find(element => element.nativeElement.contains(link.nativeElement));
    if (panel) {
      panel.componentInstance.open();
      harness.detectChanges();
      await harness.fixture.whenStable();
    }
    return panel;
  };

  const followLink = async (link: DebugElement, destinationPath: string) => {
    const anchor = link.nativeElement as HTMLAnchorElement;
    const expectedHref = `${baseHref}guia/${destinationPath}`;
    expect(anchor.getAttribute('href')).toBe(expectedHref);

    const click = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
    harness.fixture.ngZone!.run(() => anchor.dispatchEvent(click));
    expect(click.defaultPrevented).withContext('RouterLink must prevent a document reload').toBeTrue();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe(`/guia/${destinationPath}`);
    expect(platformLocation.pathname).toBe(expectedHref);
  };

  it('links Copenhagen day 3 to Malmö and back while retaining the Pages base path', async () => {
    const viewer = await harness.navigateByUrl(
      `/guia/${copenhagenPath}`,
      GuideViewerComponent
    );
    expect(viewer.guide).toBe(GUIDE_REGISTRY[copenhagenPath]);
    expect(viewer.guide?.nombre).toBe('Copenhague');

    viewer.setActiveTab('que-ver');
    harness.detectChanges();
    const toMalmo = relatedLink('Malmö');
    const dayPanel = await openLinkPanel(toMalmo);
    expect(dayPanel).withContext('The Malmö excursion belongs to the day 3 itinerary').toBeDefined();
    expect(dayPanel?.nativeElement.querySelector('mat-panel-title')?.textContent.trim())
      .toMatch(/^Día 3\b/);

    viewer.toggleDietaryPreference('vegetariano');
    await followLink(toMalmo, malmoPath);

    expect(harness.routeDebugElement?.componentInstance).toBe(viewer);
    expect(viewer.guide).toBe(GUIDE_REGISTRY[malmoPath]);
    expect(viewer.guide?.nombre).toBe('Malmö');
    expect(harness.routeNativeElement?.querySelector('.city-title')?.textContent).toBe('Malmö');
    expect(viewer.selectedDiet).toBeNull();
    expect(viewer.activeTabId).toBe(viewer.tabs[0].id);

    viewer.setActiveTab('que-ver');
    harness.detectChanges();
    const toCopenhagen = relatedLink('Copenhague');
    await openLinkPanel(toCopenhagen);
    await followLink(toCopenhagen, copenhagenPath);

    expect(harness.routeDebugElement?.componentInstance).toBe(viewer);
    expect(viewer.guide).toBe(GUIDE_REGISTRY[copenhagenPath]);
    expect(harness.routeNativeElement?.querySelector('.city-title')?.textContent).toBe('Copenhague');
    expect(viewer.activeTabId).toBe(viewer.tabs[0].id);
  });
});
