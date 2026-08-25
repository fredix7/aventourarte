import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';

import { TravelNode } from '../data/travel-data';
import { HeaderSubmenuComponent } from './header-submenu.component';

describe('HeaderSubmenuComponent', () => {
  let component: HeaderSubmenuComponent;
  let fixture: ComponentFixture<HeaderSubmenuComponent>;

  const leafNode: TravelNode = {
    nombre: 'Chipiona',
    path: 'europa/espana/andalucia/cadiz/chipiona',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSubmenuComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderSubmenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('node', leafNode);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a guide link and emits the selected leaf', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const selectedSpy = spyOn(component.selected, 'emit');
    const guideLink = fixture.nativeElement.querySelector('a.menu-btn') as HTMLAnchorElement;

    expect(guideLink).not.toBeNull();
    expect(guideLink.getAttribute('href')).toBe(
      '/guia/europa/espana/andalucia/cadiz/chipiona'
    );

    guideLink.click();

    expect(selectedSpy).toHaveBeenCalledOnceWith(leafNode);
    expect(navigateSpy).toHaveBeenCalledTimes(1);
    const urlTree = navigateSpy.calls.mostRecent().args[0] as UrlTree;
    expect(router.serializeUrl(urlTree)).toBe(
      '/guia/europa/espana/andalucia/cadiz/chipiona'
    );
  });

  it('emits a parent toggle without navigating or selecting it', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const toggleSpy = spyOn(component.toggleOpen, 'emit');
    const selectedSpy = spyOn(component.selected, 'emit');
    const event = jasmine.createSpyObj<MouseEvent>('MouseEvent', ['stopPropagation']);
    const parentNode: TravelNode = {
      nombre: 'Cádiz',
      hijos: [leafNode],
    };

    component.onClick(parentNode, event);

    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(toggleSpy).toHaveBeenCalledOnceWith('Cádiz');
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(selectedSpy).not.toHaveBeenCalled();
  });

  it('returns the correct icon for capitals and important cities', () => {
    expect(component.nodeIcon({ nombre: 'Cádiz', isCapital: true })).toBe('star');
    expect(component.nodeIcon({ nombre: 'Jerez', isImportantCity: true })).toBe(
      'location_city'
    );
    expect(component.nodeIcon(leafNode)).toBeNull();
  });
});
