import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderSubmenuComponent } from './header-submenu.component';

describe('Destination branch navigation', () => {
  let fixture: ComponentFixture<HeaderSubmenuComponent>;
  const node = { nombre: 'España', hijos: [{ nombre: 'Lebrija', path: 'europa/espana/andalucia/sevilla/lebrija' }] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HeaderSubmenuComponent], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(HeaderSubmenuComponent);
    fixture.componentRef.setInput('node', node);
    fixture.detectChanges();
  });
  afterEach(() => fixture.destroy());

  it('keeps collapsed descendants inert and resets their open branch when closing', () => {
    const panel = fixture.nativeElement.querySelector('.submenu') as HTMLElement;
    expect(panel.inert).toBeTrue();
    fixture.componentRef.setInput('compact', true);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    expect(panel.inert).toBeFalse();
    fixture.componentInstance.openChildKey = 'previous-child';
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
    expect(panel.inert).toBeTrue();
    expect(fixture.componentInstance.openChildKey).toBeNull();
  });

  it('opens with the keyboard, focuses a child, and Escape returns to its trigger', fakeAsync(() => {
    const toggle = spyOn(fixture.componentInstance.toggleOpen, 'emit');
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(toggle).toHaveBeenCalledOnceWith('España');
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    tick(20);
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(document.activeElement).toBe(link);
    link.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(toggle).toHaveBeenCalledTimes(2);
    expect(document.activeElement).toBe(button);
  }));

  it('flips a desktop flyout near the right edge and keeps it inside the viewport', fakeAsync(() => {
    const wrapper = document.createElement('div');
    wrapper.className = 'submenu';
    fixture.nativeElement.parentElement.insertBefore(wrapper, fixture.nativeElement);
    wrapper.appendChild(fixture.nativeElement);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const viewport = document.documentElement.clientWidth;
    spyOn(button, 'getBoundingClientRect').and.returnValue({ left: viewport - 120, right: viewport - 20, top: 30, bottom: 74 } as DOMRect);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    tick(20);
    const panel = fixture.nativeElement.querySelector('.submenu') as HTMLElement;
    expect(panel.classList.contains('opens-left')).toBeTrue();
    expect(parseFloat(panel.style.left)).toBeGreaterThanOrEqual(8);
    expect(parseFloat(panel.style.left) + parseFloat(panel.style.width)).toBeLessThanOrEqual(viewport - 8);
    wrapper.parentElement!.insertBefore(fixture.nativeElement, wrapper);
    wrapper.remove();
  }));

  it('closes floating descendants when their scrollable parent moves', () => {
    const component = fixture.componentInstance;
    component.openChildKey = 'child';
    const panel = fixture.nativeElement.querySelector('.submenu-list');
    panel.dispatchEvent(new Event('scroll'));
    expect(component.openChildKey).toBeNull();
  });

  it('lets touch users close an open desktop branch with a second tap', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    const toggle = spyOn(fixture.componentInstance.toggleOpen, 'emit');
    fixture.nativeElement.querySelector('button').dispatchEvent(new PointerEvent('click', {
      pointerType: 'touch', detail: 1, bubbles: true,
    }));
    expect(toggle).toHaveBeenCalledOnceWith('España');
  });
});
