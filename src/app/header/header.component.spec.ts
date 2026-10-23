import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AnalyticsService } from '../shared/analytics.service';
import { provideRouter, Router, UrlTree } from '@angular/router';

import { TravelNode } from '../data/travel-data';
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
});
