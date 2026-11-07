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

  it('renders individual WhatsApp notes with a messaging action and preserves text escaping', () => {
    fixture.componentRef.setInput('value', 'Reservas: +34 615 433 192 (WhatsApp)');
    fixture.detectChanges();
    expect(element.querySelector('.phone-note')?.textContent).toBe('(WhatsApp)');
    expect(element.querySelector('a')?.getAttribute('href')).toBe('https://wa.me/34615433192');
    expect(element.querySelector('a')?.getAttribute('aria-label')).toBe('Enviar WhatsApp a Reservas al +34 615 433 192');
    expect(element.querySelector('.call-action')?.textContent).toContain('Enviar WhatsApp');

    fixture.componentRef.setInput('value', '<img src=x onerror=alert(1)>');
    fixture.detectChanges();
    expect(element.querySelector('img')).toBeNull();
    expect(element.textContent).toContain('<img src=x onerror=alert(1)>');
  });

  it('renders Coria as two different native link actions under an accurate contact heading', async () => {
    fixture.componentRef.setInput('value', '+34 955 65 69 90 / WhatsApp: +34 699 62 85 24');
    fixture.componentRef.setInput('name', 'Museo de la Autonomía');
    fixture.componentRef.setInput('embedded', true);
    fixture.detectChanges();
    const anchors = [...element.querySelectorAll<HTMLAnchorElement>('a')];
    expect(anchors.map(anchor => anchor.getAttribute('href'))).toEqual([
      'tel:+34955656990', 'https://wa.me/34699628524'
    ]);
    expect(anchors[0].textContent).toContain('Llamar');
    expect(anchors[0].querySelector('mat-icon')?.textContent).toBe('call');
    expect(anchors[1].textContent).toContain('Enviar WhatsApp');
    expect(anchors[1].textContent).not.toContain('Llamar');
    expect(anchors[1].getAttribute('aria-label')).toBe('Enviar WhatsApp a Museo de la Autonomía al +34 699 62 85 24');
    expect(element.querySelector('.embedded-heading')?.textContent).toContain('Contacto');
    expect(element.querySelector('[role="group"]')?.getAttribute('aria-label')).toBe('Contacto de Museo de la Autonomía');
    const logo = anchors[1].querySelector<HTMLImageElement>('img')!;
    expect(logo.getAttribute('src')).toBe('assets/icons/whatsapp.svg');
    expect(logo.getAttribute('alt')).toBe('');
    expect(logo.getAttribute('aria-hidden')).toBe('true');
    expect(anchors[1].querySelector('mat-icon')).toBeNull();
    await logo.decode();
    expect(logo.naturalWidth).toBeGreaterThan(0);
    for (const anchor of anchors) {
      expect(anchor.tabIndex).toBe(0);
      expect(anchor.getAttribute('role')).toBeNull();
      anchor.focus();
      expect(document.activeElement).toBe(anchor);
      expect(getComputedStyle(anchor).outlineStyle).toBe('solid');
      expect(getComputedStyle(anchor).outlineWidth).toBe('3px');
    }
  });

  it('does not emit a telephone reservation event for messaging or normal contact links', () => {
    fixture.componentRef.setInput('value', '+34 955 65 69 90 / WhatsApp: +34 699 62 85 24');
    fixture.componentRef.setInput('reservationHref', 'tel:+34955656990');
    fixture.detectChanges();
    const emit = spyOn(fixture.componentInstance.reservationClick, 'emit');
    const anchors = [...element.querySelectorAll<HTMLAnchorElement>('a')];
    element.addEventListener('click', event => event.preventDefault());
    anchors[1].click();
    expect(emit).not.toHaveBeenCalled();
    anchors[0].click();
    expect(emit).toHaveBeenCalledTimes(1);
  });

  it('does not label a subsequent unmarked number as either WhatsApp or a call to WhatsApp', () => {
    fixture.componentRef.setInput('value', 'WhatsApp: +34 699 62 85 24 / +34 955 65 69 90');
    fixture.detectChanges();
    const anchors = [...element.querySelectorAll<HTMLAnchorElement>('a')];
    expect(anchors[0].getAttribute('href')).toBe('https://wa.me/34699628524');
    expect(anchors[1].getAttribute('href')).toBe('tel:+34955656990');
    expect(anchors[1].textContent).toContain('Llamar');
    expect(anchors[1].getAttribute('aria-label')).toBe('Llamar a Bodegas Real Tesoro y Valdespino al +34 955 65 69 90');
  });

  it('keeps explicitly marked contacts without international prefixes visible but unlinked', () => {
    fixture.componentRef.setInput('value', 'WhatsApp: 699 62 85 24');
    fixture.detectChanges();
    expect(element.querySelectorAll('a')).toHaveSize(0);
    expect(element.querySelector('.contact-text')?.textContent).toBe('699 62 85 24');
    expect(element.querySelector('.group-label')?.textContent).toBe('WhatsApp');
    expect(element.querySelector('.contact-title')?.textContent).toBe('Contacto');
  });

  it('keeps the messaging logo, action and number inside narrow cards at normal and enlarged text sizes', async () => {
    fixture.componentRef.setInput('value', '+34 955 65 69 90 / WhatsApp: +34 699 62 85 24');
    fixture.detectChanges();
    const frame = document.createElement('iframe');
    frame.width = '320';
    frame.height = '600';
    frame.title = 'Responsive contact test';
    document.body.append(frame);
    try {
      const doc = frame.contentDocument!;
      for (const style of document.head.querySelectorAll('style')) doc.head.append(style.cloneNode(true));
      doc.body.style.cssText = 'margin:0;padding:16px;box-sizing:border-box';
      doc.body.append(element.cloneNode(true));
      for (const size of ['16px', '32px']) {
        doc.documentElement.style.fontSize = size;
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
        expect(doc.documentElement.scrollWidth).withContext(size).toBeLessThanOrEqual(320);
        for (const anchor of doc.querySelectorAll<HTMLElement>('.phone-link')) {
          const link = anchor.getBoundingClientRect();
          const action = anchor.querySelector<HTMLElement>('.call-action')!.getBoundingClientRect();
          const copy = anchor.querySelector<HTMLElement>('.phone-copy')!.getBoundingClientRect();
          expect(action.right).withContext(size).toBeLessThanOrEqual(link.right);
          expect(action.left).withContext(size).toBeGreaterThanOrEqual(link.left);
          expect(copy.right <= action.left || copy.bottom <= action.top).withContext(size).toBeTrue();
        }
        const logo = doc.querySelector<HTMLElement>('.whatsapp-icon')!.getBoundingClientRect();
        expect(logo.width).toBe(20);
        expect(logo.height).toBe(20);
      }
    } finally { frame.remove(); }
  });
});
