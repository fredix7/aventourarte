import { TestBed } from '@angular/core/testing';
import { ReaderReportService } from '../../shared/reader-report.service';
import { ReaderReportComponent } from './reader-report.component';

describe('Reader report form', () => {
  let submit: jasmine.Spy;
  beforeEach(() => {
    submit = jasmine.createSpy().and.resolveTo({ ok: true, reference: 'AVISO-42', preview: false });
    TestBed.configureTestingModule({ imports: [ReaderReportComponent], providers: [
      { provide: ReaderReportService, useValue: { available: true, preview: false, submit: (...args: unknown[]) => submit(...args) } },
    ] });
  });

  async function create() {
    const fixture = TestBed.createComponent(ReaderReportComponent);
    fixture.componentRef.setInput('guidePath', 'europa/espana/andalucia/cadiz/rota');
    fixture.componentRef.setInput('guideName', 'Rota');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('summary').click();
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('validates the message and consent before creating a ticket', async () => {
    const fixture = await create();
    fixture.nativeElement.querySelector('button[type=submit]').click();
    fixture.detectChanges();
    expect(submit).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain('10 caracteres');
  });

  it('sends one ticket with automatic guide context and shows its reference', async () => {
    const fixture = await create();
    const component = fixture.componentInstance;
    component.message = 'La dirección del museo ha cambiado.';
    component.consent = true;
    fixture.detectChanges();
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('button[type=submit]') as HTMLButtonElement;
    button.click();
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit.calls.first().args[0].guidePath).toBe('europa/espana/andalucia/cadiz/rota');
    expect(fixture.nativeElement.querySelector('[role=status]').textContent).toContain('AVISO-42');
    expect(component.email).toBe('');
    expect(component.message).toBe('');
  });

  it('preserves a failed message for retry instead of showing a receipt', async () => {
    submit.and.resolveTo({ ok: false, message: 'No se ha podido guardar.' });
    const fixture = await create();
    fixture.componentInstance.message = 'La dirección del museo ha cambiado.';
    fixture.componentInstance.consent = true;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.nativeElement.querySelector('button[type=submit]').click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.message).toContain('museo');
    expect(fixture.nativeElement.querySelector('[role=status]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain('guardar');
  });

  it('keeps the form within a narrow layout', async () => {
    const fixture = await create();
    const root = fixture.nativeElement as HTMLElement;
    root.style.width = '360px';
    fixture.detectChanges();
    expect(root.querySelector('textarea')!.getBoundingClientRect().width).toBeGreaterThan(0);
    expect(root.scrollWidth).toBeLessThanOrEqual(360);
  });
});
