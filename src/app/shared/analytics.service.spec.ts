import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AnalyticsService, ANALYTICS_SETTINGS, ANALYTICS_RUNTIME } from './analytics.service';

describe('Privacy and analytics delivery', () => {
  const guide = 'europa/espana/andalucia/cadiz/rota';
  let service: AnalyticsService;
  let send: jasmine.Spy;
  let stored: Map<string, string>;

  beforeEach(() => {
    stored = new Map();
    send = jasmine.createSpy('fetch').and.resolveTo({ ok: true });
    TestBed.configureTestingModule({ providers: [
      { provide: ANALYTICS_RUNTIME, useValue: { development: false } },
      { provide: DOCUMENT, useValue: {
        baseURI: 'https://example.test/aventourarte/',
        defaultView: {
          location: { hostname: 'example.test' }, navigator: {}, fetch: send,
          localStorage: { getItem: (key: string) => stored.get(key), setItem: (key: string, value: string) => stored.set(key, value) },
        },
      } },
      { provide: ANALYTICS_SETTINGS, useValue: {
        websiteId: '11111111-1111-1111-1111-111111111111',
        endpoint: 'https://gateway.umami.is/api/send', allowedHosts: ['example.test'], privacyReviewed: true,
      } },
    ] });
    service = TestBed.inject(AnalyticsService);
  });

  it('sends nothing before permission and stops after withdrawal', () => {
    service.visit(guide);
    service.action('outbound', { kind: 'maps' });
    expect(send).not.toHaveBeenCalled();
    service.setConsent(true);
    expect(send).toHaveBeenCalledTimes(1);
    service.setConsent(true);
    expect(send).toHaveBeenCalledTimes(1);
    service.setConsent(false);
    service.action('outbound', { kind: 'maps' });
    service.visit('europa/malta/malta');
    expect(send).toHaveBeenCalledTimes(1);
    expect([...stored.values()]).toEqual(['no']);
  });

  it('deduplicates consecutive openings while counting a return to a guide', () => {
    service.setConsent(true);
    service.visit(guide);
    service.visit(guide);
    expect(send).toHaveBeenCalledTimes(1);
    service.visit('');
    service.visit(guide);
    expect(send).toHaveBeenCalledTimes(2);
  });

  it('never sends editorial visits, even after permission', async () => {
    service.visit(guide, true);
    service.setConsent(true);
    service.action('outbound', { kind: 'web' });
    expect(await service.feedback(guide, 'yes')).toBeFalse();
    expect(send).not.toHaveBeenCalled();
  });

  it('strips arbitrary data and URL parameters and includes the GitHub Pages base path', () => {
    service.setConsent(true);
    service.visit(guide);
    service.action('search', { results: 'none', query: 'private text', allergy: 'milk' } as any);
    const [endpoint, options] = send.calls.mostRecent().args;
    const body = JSON.parse(options.body);
    expect(endpoint).toBe('https://gateway.umami.is/api/send');
    expect(body.payload.url).toBe(`/aventourarte/guia/${guide}/`);
    expect(body.payload.data).toEqual({ results: 'none' });
    expect(options.referrerPolicy).toBe('no-referrer');
    expect(options.credentials).toBe('omit');
    expect(options.body).not.toContain('private text');
    expect(body.payload.id).toBeUndefined();
    service.action('plan_filter', { action: 'select', plan: 'allergy-milk' });
    expect(send).toHaveBeenCalledTimes(2);
  });

  it('accepts an explicit rating without enabling passive analytics and rejects repeat votes', async () => {
    service.visit(guide);
    expect(await service.feedback(guide, 'partly', 'outdated')).toBeTrue();
    expect(service.allowed()).toBeFalse();
    expect(service.hasVoted(guide)).toBeTrue();
    expect(await service.feedback(guide, 'yes')).toBeFalse();
    service.action('outbound', { kind: 'maps' });
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('does not claim success on blocked requests and permits retry', async () => {
    send.and.rejectWith(new Error('offline'));
    expect(await service.feedback(guide, 'no')).toBeFalse();
    expect(service.hasVoted(guide)).toBeFalse();
    send.and.resolveTo({ ok: true });
    expect(await service.feedback(guide, 'no')).toBeTrue();
  });

  it('rejects HTTP failures and concurrent duplicate votes', async () => {
    let finish!: (value: { ok: boolean }) => void;
    send.and.returnValue(new Promise(resolve => finish = resolve));
    const first = service.feedback(guide, 'yes');
    expect(await service.feedback(guide, 'yes')).toBeFalse();
    finish({ ok: false });
    expect(await first).toBeFalse();
    expect(service.hasVoted(guide)).toBeFalse();
  });

  it('does not activate on development builds', () => {
    TestBed.inject(ANALYTICS_RUNTIME).development = true;
    service.setConsent(true);
    service.visit(guide);
    expect(send).not.toHaveBeenCalled();
  });

  it('keeps the local interface usable without sending production events or feedback', async () => {
    TestBed.inject(ANALYTICS_RUNTIME).development = true;
    expect(service.controlsAvailable).toBeTrue();
    expect(service.preview).toBeTrue();
    service.setConsent(true);
    service.visit(guide);
    service.action('outbound', { kind: 'maps' });
    expect(await service.feedback(guide, 'yes')).toBeTrue();
    expect(service.hasVoted(guide)).toBeTrue();
    expect(send).not.toHaveBeenCalled();
  });

  it('also previews a production build on localhost without sending any requests', async () => {
    const view = TestBed.inject(DOCUMENT).defaultView!;
    (view.location as { hostname: string }).hostname = 'localhost';
    TestBed.inject(ANALYTICS_SETTINGS).allowedHosts.push('localhost');
    service.setConsent(true);
    service.visit(guide);
    expect(await service.feedback(guide, 'partly')).toBeTrue();
    expect(service.available).toBeFalse();
    expect(service.controlsAvailable).toBeTrue();
    expect(send).not.toHaveBeenCalled();
  });

  it('explains Do Not Track and unavailable production domains', async () => {
    const view = TestBed.inject(DOCUMENT).defaultView!;
    Object.assign(view.navigator, { doNotTrack: '1' });
    expect(service.controlsAvailable).toBeFalse();
    expect(service.unavailableReason).toContain('No rastrear');
    expect(await service.feedback(guide, 'yes')).toBeFalse();
    Object.assign(view.navigator, { doNotTrack: '0' });
    (view.location as { hostname: string }).hostname = 'other.test';
    expect(service.controlsAvailable).toBeFalse();
    expect(service.unavailableReason).toContain('esta dirección');
    expect(send).not.toHaveBeenCalled();
  });
});
