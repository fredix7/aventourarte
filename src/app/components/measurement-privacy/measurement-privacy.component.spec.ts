import { TestBed } from '@angular/core/testing';
import { AnalyticsService, ANALYTICS_RUNTIME } from '../../shared/analytics.service';
import { GuideFeedbackComponent } from '../guide-feedback/guide-feedback.component';
import { MeasurementPrivacyComponent } from './measurement-privacy.component';

describe('Measurement interface in the local application', () => {
  let previousChoice: string | null;
  let fetch: jasmine.Spy;

  beforeEach(() => {
    previousChoice = localStorage.getItem('aventourarte.measurement.v1');
    localStorage.removeItem('aventourarte.measurement.v1');
    fetch = spyOn(window, 'fetch').and.rejectWith(new Error('Unexpected network request'));
    TestBed.configureTestingModule({
      imports: [MeasurementPrivacyComponent, GuideFeedbackComponent],
      providers: [{ provide: ANALYTICS_RUNTIME, useValue: { development: true } }],
    });
  });

  afterEach(() => {
    if (previousChoice === null) localStorage.removeItem('aventourarte.measurement.v1');
    else localStorage.setItem('aventourarte.measurement.v1', previousChoice);
  });

  it('opens the privacy panel with working allow and reject buttons in local development', () => {
    const fixture = TestBed.createComponent(MeasurementPrivacyComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    root.querySelector('summary')!.click();
    fixture.detectChanges();
    expect(root.querySelector('details')!.open).toBeTrue();
    const buttons = root.querySelectorAll<HTMLButtonElement>('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].getBoundingClientRect().height).toBeGreaterThan(0);
    buttons[0].click();
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    expect(root.querySelector('[role="status"]')!.textContent).toContain('medición permitida');
    buttons[1].click();
    fixture.detectChanges();
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
    expect(TestBed.inject(AnalyticsService).allowed()).toBeFalse();
    expect(root.querySelector('[role="status"]')!.textContent).toContain('No se envían datos');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('shows and completes a real local feedback preview without sending an event', async () => {
    const fixture = TestBed.createComponent(GuideFeedbackComponent);
    fixture.componentRef.setInput('guidePath', 'europa/espana/andalucia/cadiz/rota');
    fixture.componentRef.setInput('guideName', 'Rota');
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.postcard')).not.toBeNull();
    root.querySelector<HTMLButtonElement>('.ratings button')!.click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.send')!.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(root.querySelector('[role="status"]')!.textContent).toContain('¡Prueba completada!');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('keeps the feedback card within a narrow screen width', () => {
    const fixture = TestBed.createComponent(GuideFeedbackComponent);
    fixture.componentRef.setInput('guideName', 'Jerez de la Frontera');
    const root = fixture.nativeElement as HTMLElement;
    root.style.width = '360px';
    fixture.detectChanges();
    root.querySelectorAll<HTMLElement>('.ratings button').forEach(button => {
      expect(button.getBoundingClientRect().width).toBeGreaterThan(0);
      expect(button.getBoundingClientRect().right).toBeLessThanOrEqual(root.getBoundingClientRect().right);
    });
    expect(root.scrollWidth).toBeLessThanOrEqual(360);
  });
});
