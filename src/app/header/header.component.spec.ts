import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AnalyticsService } from '../shared/analytics.service';
import { provideRouter, Router, UrlTree } from '@angular/router';

import { TRAVEL_TREE, TravelNode } from '../data/travel-data';
import { GUIDE_REGISTRY } from '../components/guide-viewer/guide-viewer.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const treeData: TravelNode[] = [
    {
      nombre: 'Europa',
      hijos: [
        {
          nombre: 'España',
          flag: 'https://flag.test/es.svg',
          hijos: [
            {
              nombre: 'Cádiz',
              hijos: [
                {
                  nombre: 'Chipiona',
                  path: 'europa/espana/andalucia/cadiz/chipiona',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('treeData', treeData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('measures a completed search without recording keystrokes or search text', fakeAsync(() => {
    const measure = spyOn(TestBed.inject(AnalyticsService), 'action');
    component.onSearchInput({ target: { value: 'chi' } } as unknown as Event);
    tick(300);
    component.onSearchInput({ target: { value: 'chipiona' } } as unknown as Event);
    tick(799);
    expect(measure).not.toHaveBeenCalled();
    tick(1);
    expect(measure).toHaveBeenCalledOnceWith('search', { results: 'some' });
    component.closeMenu();
    expect(measure).toHaveBeenCalledTimes(1);
  }));

  it('flushes a pending search when choosing a result and cancels empty queries', fakeAsync(() => {
    const measure = spyOn(TestBed.inject(AnalyticsService), 'action');
    component.onSearchInput({ target: { value: 'missing destination' } } as unknown as Event);
    component.closeMenu();
    tick(1000);
    expect(measure).toHaveBeenCalledOnceWith('search', { results: 'none' });
    component.onSearchInput({ target: { value: 'chi' } } as unknown as Event);
    component.onSearchInput({ target: { value: '' } } as unknown as Event);
    tick(1000);
    expect(measure).toHaveBeenCalledTimes(1);
  }));

  it('finds nested destinations without accents and preserves their inherited flag', () => {
    component.searchQuery = 'cadiz';

    expect(component.searchResults).toEqual([
      {
        name: 'Chipiona',
        path: 'europa/espana/andalucia/cadiz/chipiona',
        breadcrumb: 'Europa / España / Cádiz',
        flag: 'https://flag.test/es.svg',
      },
    ]);
  });

  it('navigates to a search result and closes the open menus', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    component.menuOpen = true;
    component.languageMenuOpen = true;
    component.searchQuery = 'chipiona';
    fixture.detectChanges();

    const resultLink = fixture.nativeElement.querySelector(
      'a.search-result'
    ) as HTMLAnchorElement;

    expect(resultLink).not.toBeNull();
    expect(resultLink.getAttribute('href')).toBe(
      '/guia/europa/espana/andalucia/cadiz/chipiona'
    );

    resultLink.click();

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    const urlTree = navigateSpy.calls.mostRecent().args[0] as UrlTree;
    expect(router.serializeUrl(urlTree)).toBe(
      '/guia/europa/espana/andalucia/cadiz/chipiona'
    );
    expect(component.menuOpen).toBeFalse();
    expect(component.languageMenuOpen).toBeFalse();
    expect(component.searchQuery).toBe('');
  });

  it('suggests the published Jerez guide from the real navigation tree', () => {
    fixture.componentRef.setInput('treeData', TRAVEL_TREE);
    component.searchQuery = 'Jerez';
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a.search-result') as HTMLAnchorElement;
    expect(component.searchResults.map(result => result.path)).toEqual([
      'europa/espana/andalucia/cadiz/jerez-de-la-frontera'
    ]);
    expect(link.getAttribute('href')).toBe(
      '/guia/europa/espana/andalucia/cadiz/jerez-de-la-frontera'
    );
    expect(link.tabIndex).toBe(0);
  });

  for (const query of ['Lebrija', 'Nueva York']) {
    it(`shows no suggestions for ${query}, which has no published guide`, () => {
      fixture.componentRef.setInput('treeData', TRAVEL_TREE);
      component.searchQuery = query;
      fixture.detectChanges();

      expect(component.searchResults).toEqual([]);
      expect(fixture.nativeElement.querySelector('a.search-result')).toBeNull();
      expect(fixture.nativeElement.querySelector('.search-empty')?.textContent)
        .toContain(component.text.searchEmpty);
    });
  }

  it('indexes exactly the published paths and keeps planned destinations in the menu', () => {
    const originalTree = JSON.stringify(TRAVEL_TREE);
    fixture.componentRef.setInput('treeData', TRAVEL_TREE);
    fixture.detectChanges();

    expect([...new Set(component.allDestinations.map(result => result.path))].sort())
      .toEqual(Object.keys(GUIDE_REGISTRY).sort());
    const plannedLink = fixture.nativeElement.querySelector(
      '.main-menu a[href="/guia/america/norteamerica/usa/new-york"]'
    ) as HTMLAnchorElement;
    expect(plannedLink?.textContent).toContain('Nueva York');
    expect(plannedLink?.tabIndex).toBe(0);
    expect(JSON.stringify(TRAVEL_TREE)).toBe(originalTree);

    const toggle = fixture.nativeElement.querySelector('.menu-toggle') as HTMLButtonElement;
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('.main-menu.open')).not.toBeNull();
  });
});
