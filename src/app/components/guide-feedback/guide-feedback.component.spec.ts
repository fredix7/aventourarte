import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AnalyticsService } from '../../shared/analytics.service';
import { GuideFeedbackComponent } from './guide-feedback.component';

describe('Guide feedback', () => {
  let analytics: { controlsAvailable: boolean; preview: boolean; allowed: ReturnType<typeof signal<boolean>>; hasVoted: jasmine.Spy; feedback: jasmine.Spy };

  beforeEach(() => {
    analytics = { controlsAvailable: true, preview: false, allowed: signal(false), hasVoted: jasmine.createSpy().and.returnValue(false), feedback: jasmine.createSpy().and.resolveTo(true) };
    TestBed.configureTestingModule({ imports: [GuideFeedbackComponent], providers: [{ provide: AnalyticsService, useValue: analytics }] });
  });

  it('lets visitors explicitly send feedback without enabling navigation measurement', async () => {
    const fixture = TestBed.createComponent(GuideFeedbackComponent);
    fixture.componentRef.setInput('guidePath', 'europa/malta/malta');
    fixture.componentRef.setInput('guideName', 'Malta');
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('h2')!.textContent).toContain('Malta');
    const ratings = root.querySelectorAll<HTMLButtonElement>('.ratings button');
    ratings[1].click();
    fixture.detectChanges();
    expect(ratings[1].getAttribute('aria-pressed')).toBe('true');
    root.querySelector<HTMLInputElement>('input[value="outdated"]')!.click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.send')!.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(analytics.feedback).toHaveBeenCalledOnceWith('europa/malta/malta', 'partly', 'outdated');
    expect(analytics.allowed()).toBeFalse();
    expect(root.querySelector('[role="status"]')!.textContent).toContain('¡Postal recibida!');
    expect(root.querySelector('.ratings')).toBeNull();
  });

  it('keeps the response retryable when delivery fails', async () => {
    analytics.feedback.and.resolveTo(false);
    const fixture = TestBed.createComponent(GuideFeedbackComponent);
    fixture.detectChanges();
    fixture.componentInstance.choose('yes');
    await fixture.componentInstance.submit();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('volver a intentarlo');
    expect(fixture.componentInstance.sent).toBeFalse();
    expect(fixture.componentInstance.busy).toBeFalse();
  });

  it('ignores an old delivery response after changing destinations', async () => {
    let finish!: (value: boolean) => void;
    analytics.feedback.and.returnValue(new Promise(resolve => finish = resolve));
    const fixture = TestBed.createComponent(GuideFeedbackComponent);
    fixture.componentRef.setInput('guidePath', 'europa/malta/malta');
    fixture.detectChanges();
    fixture.componentInstance.choose('yes');
    const pending = fixture.componentInstance.submit();
    fixture.componentRef.setInput('guidePath', 'europa/suecia/malmo');
    fixture.detectChanges();
    finish(true);
    await pending;
    expect(fixture.componentInstance.sent).toBeFalse();
    expect(fixture.componentInstance.rating).toBeNull();
  });

  it('hides feedback when the integration is inactive', () => {
    analytics.controlsAvailable = false;
    const fixture = TestBed.createComponent(GuideFeedbackComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section')).toBeNull();
    expect(getComputedStyle(fixture.nativeElement).display).toBe('none');
    expect(fixture.nativeElement.getBoundingClientRect().height).toBe(0);
  });

  it('labels local interactions as previews and never claims delivery to Umami', async () => {
    analytics.preview = true;
    const fixture = TestBed.createComponent(GuideFeedbackComponent);
    fixture.detectChanges();
    fixture.componentInstance.choose('yes');
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.preview-note')!.textContent).toContain('no se enviará');
    expect(root.querySelector('.send')!.textContent).toContain('Probar mi respuesta');
    await fixture.componentInstance.submit();
    fixture.detectChanges();
    expect(root.querySelector('[role="status"]')!.textContent).toContain('No se ha enviado a Umami');
    expect(root.textContent).not.toContain('¡Postal recibida!');
  });
});
