import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneContactComponent } from './phone-contact.component';

describe('PhoneContactComponent', () => {
  let fixture: ComponentFixture<PhoneContactComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneContactComponent);
    element = fixture.nativeElement;
    fixture.componentRef.setInput('name', 'Bodegas Real Tesoro y Valdespino');
  });

  it('renders three independently named call destinations under their entities', () => {
    fixture.componentRef.setInput('value', 'Grupo Estévez: +34 956 321 004 / +34 608 492 097.\nReservas Valdespino: +34 660 842 590');
    fixture.detectChanges();
    const anchors = [...element.querySelectorAll<HTMLAnchorElement>('a')];
    expect(anchors.map(anchor => anchor.getAttribute('href'))).toEqual([
      'tel:+34956321004', 'tel:+34608492097', 'tel:+34660842590'
    ]);
    expect(anchors[1].getAttribute('aria-label')).toBe('Llamar a Grupo Estévez al +34 608 492 097');
    expect(anchors[2].getAttribute('aria-label')).toBe('Llamar a Reservas Valdespino al +34 660 842 590');
    expect(element.querySelectorAll('.contact-group')).toHaveSize(2);
    expect(element.querySelector('.contact-title')?.textContent).toBe('Contacto telefónico');
  });

  it('updates the same card for a single telephone, plain text and absent data', () => {
    fixture.componentRef.setInput('value', '+34 956 321 004');
    fixture.detectChanges();
    expect(element.querySelectorAll('a')).toHaveSize(1);
    expect(element.querySelector('.contact-title')?.textContent).toBe('Teléfono');
    expect(element.querySelector('a')?.getAttribute('aria-label')).toContain('Bodegas Real Tesoro y Valdespino');

    fixture.componentRef.setInput('value', 'Consultar con la oficina de turismo');
    fixture.detectChanges();
    expect(element.querySelectorAll('a')).toHaveSize(0);
    expect(element.textContent).toContain('Consultar con la oficina de turismo');

    fixture.componentRef.setInput('value', '  ');
    fixture.detectChanges();
    expect(element.querySelector('.phone-contact')).toBeNull();
    expect(element.classList.contains('is-empty')).toBeTrue();
  });

  it('renders editorial notes as text and includes them in accessible call names', () => {
    fixture.componentRef.setInput('value', 'Reservas: +34 615 433 192 (WhatsApp)');
    fixture.detectChanges();
    expect(element.querySelector('.phone-note')?.textContent).toBe('(WhatsApp)');
    expect(element.querySelector('a')?.getAttribute('href')).toBe('tel:+34615433192');
    expect(element.querySelector('a')?.getAttribute('aria-label')).toContain('Reservas al +34 615 433 192. (WhatsApp)');

    fixture.componentRef.setInput('value', '<img src=x onerror=alert(1)>');
    fixture.detectChanges();
    expect(element.querySelector('img')).toBeNull();
    expect(element.textContent).toContain('<img src=x onerror=alert(1)>');
  });
});
