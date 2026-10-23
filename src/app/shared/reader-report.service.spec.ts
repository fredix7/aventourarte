import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ANALYTICS_RUNTIME, AnalyticsService } from './analytics.service';
import { ReaderReport, ReaderReportService, REPORT_SETTINGS } from './reader-report.service';

describe('Reader report delivery', () => {
  let service: ReaderReportService;
  let send: jasmine.Spy;
  let measure: jasmine.Spy;
  const report: ReaderReport = {
    type: 'suggestion', message: 'Podríais añadir una ruta accesible.', email: 'lector@example.test',
    guidePath: 'europa/espana/andalucia/cadiz/rota', guideName: 'Rota', consent: true, website: '',
  };

  beforeEach(() => {
    send = jasmine.createSpy().and.resolveTo({ ok: true, json: async () => ({ reference: 'AVISO-42' }) });
    measure = jasmine.createSpy();
    TestBed.configureTestingModule({ providers: [
      { provide: ANALYTICS_RUNTIME, useValue: { development: false } },
      { provide: REPORT_SETTINGS, useValue: { endpoint: 'https://receiver.test/feedback', allowedHosts: ['fredix7.github.io'] } },
      { provide: AnalyticsService, useValue: { action: measure } },
      { provide: DOCUMENT, useValue: { defaultView: { location: { hostname: 'fredix7.github.io' }, fetch: send } } },
    ] });
    service = TestBed.inject(ReaderReportService);
  });

  it('submits to the receiver and measures only the category and public destination', async () => {
    expect(await service.submit(report)).toEqual({ ok: true, reference: 'AVISO-42', preview: false });
    expect(measure).toHaveBeenCalledOnceWith('reader_report', { category: 'suggestion' }, report.guidePath);
    expect(send.calls.first().args[1].credentials).toBe('omit');
    expect(send.calls.first().args[1].referrerPolicy).toBe('no-referrer');
    expect(JSON.stringify(measure.calls.allArgs())).not.toContain(report.message);
    expect(JSON.stringify(measure.calls.allArgs())).not.toContain(report.email);
  });

  it('supports local previews without sending either content or analytics', async () => {
    TestBed.inject(ANALYTICS_RUNTIME).development = true;
    expect(await service.submit(report)).toEqual({ ok: true, reference: 'PRUEBA-1', preview: true });
    expect(send).not.toHaveBeenCalled();
    expect(measure).not.toHaveBeenCalled();
  });

  it('rejects invalid or unsolicited submissions before sending', async () => {
    for (const change of [{ consent: false }, { message: 'short' }, { email: 'wrong' }, { website: 'spam' }]) {
      expect((await service.submit({ ...report, ...change })).ok).toBeFalse();
    }
    expect(send).not.toHaveBeenCalled();
  });

  it('keeps failures honest, including an invalid receipt and a rate limit', async () => {
    send.and.resolveTo({ ok: true, json: async () => ({}) });
    expect((await service.submit(report)).ok).toBeFalse();
    send.and.resolveTo({ ok: false, status: 429 });
    expect((await service.submit(report))).toEqual({ ok: false, message: jasmine.stringMatching('Espera un minuto') });
    send.and.rejectWith(new Error('offline'));
    expect((await service.submit(report)).ok).toBeFalse();
    expect(measure).not.toHaveBeenCalled();
  });

  it('hides the live form when no receiver is configured', () => {
    TestBed.inject(REPORT_SETTINGS).endpoint = '';
    expect(service.available).toBeFalse();
  });
});
