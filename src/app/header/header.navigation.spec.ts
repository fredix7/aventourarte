import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

// Interaction regressions for AVA-27; destination/search coverage stays in the existing spec.
describe('Header responsive navigation', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let media: MediaQueryList;
  let background: HTMLElement;

  beforeEach(async () => {
    media = {
      matches: true,
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
    } as unknown as MediaQueryList;
    spyOn(window, 'matchMedia').and.returnValue(media);
    spyOn(window, 'scrollTo');
    await TestBed.configureTestingModule({ imports: [HeaderComponent], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentRef.setInput('treeData', [{ nombre: 'Europa', hijos: [{ nombre: 'España', hijos: [{ nombre: 'Lebrija', path: 'europa/espana/andalucia/sevilla/lebrija' }] }] }]);
    background = document.createElement('main');
    fixture.nativeElement.parentElement.appendChild(background);
    fixture.detectChanges();
  });

  afterEach(() => { fixture.destroy(); background.remove(); });

  function open(): void {
    fixture.nativeElement.querySelector('.menu-toggle').click();
    fixture.detectChanges();
    tick();
  }

  it('opens a named modal, locks the page, and focuses its visible close button', fakeAsync(() => {
    open();
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('role')).toBe('dialog');
    expect(nav.getAttribute('aria-modal')).toBe('true');
    expect(background.inert).toBeTrue();
    expect(document.body.style.position).toBe('fixed');
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('.menu-close'));
    expect(fixture.nativeElement.querySelector('.header-actions').inert).toBeTrue();
  }));

  it('Escape restores body styles, background access, trigger focus and collapsed branches', fakeAsync(() => {
    const originalTop = document.body.style.top;
    document.body.style.top = '7px';
    open();
    fixture.componentInstance.openContinentKey = 'Europa';
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.menuOpen).toBeFalse();
    expect(fixture.componentInstance.openContinentKey).toBeNull();
    expect(background.inert).toBeFalse();
    expect(document.body.style.top).toBe('7px');
    expect(document.body.style.position).not.toBe('fixed');
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('.menu-toggle'));
    document.body.style.top = originalTop;
  }));

  it('backdrop closes the drawer and preserves pre-existing inert state', fakeAsync(() => {
    background.inert = true;
    open();
    fixture.nativeElement.querySelector('.backdrop').click();
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.menuOpen).toBeFalse();
    expect(background.inert).toBeTrue();
    expect(fixture.nativeElement.querySelector('.backdrop')).toBeNull();
  }));

  it('changing to desktop releases the scroll lock and closes mobile state', fakeAsync(() => {
    open();
    const change = (media.addEventListener as jasmine.Spy).calls.mostRecent().args[1];
    change({ matches: false });
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.compact).toBeFalse();
    expect(fixture.componentInstance.menuOpen).toBeFalse();
    expect(background.inert).toBeFalse();
    expect(document.body.style.position).not.toBe('fixed');
    expect(fixture.nativeElement.querySelector('nav').hasAttribute('aria-modal')).toBeFalse();
  }));

  it('destroying an open drawer restores the page and removes the media listener', fakeAsync(() => {
    open();
    fixture.destroy();
    expect(background.inert).toBeFalse();
    expect(document.body.style.position).not.toBe('fixed');
    expect(media.removeEventListener).toHaveBeenCalled();
  }));
});
