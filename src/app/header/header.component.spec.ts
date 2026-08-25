import { ComponentFixture, TestBed } from '@angular/core/testing';
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
