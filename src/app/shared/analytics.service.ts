import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, InjectionToken, isDevMode, PLATFORM_ID, signal } from '@angular/core';
import { ANALYTICS_CONFIG } from './analytics.config';
import { PLAN_TYPES } from './plan-types';

export const ANALYTICS_SETTINGS = new InjectionToken('analytics.settings', {
  providedIn: 'root', factory: () => ANALYTICS_CONFIG,
});
export const ANALYTICS_RUNTIME = new InjectionToken('analytics.runtime', {
  providedIn: 'root', factory: () => ({ development: isDevMode() }),
});
export type UtilityRating = 'yes' | 'partly' | 'no';
export type UtilityReason = 'practical-info' | 'outdated' | 'hard-to-find';
type Action = 'search' | 'plan_filter' | 'outbound' | 'share' | 'reader_report';
type ActionData = {
  results?: 'none' | 'some';
  plan?: string;
  action?: 'select' | 'remove' | 'clear';
  kind?: 'maps' | 'web' | 'booking';
  method?: 'native' | 'clipboard';
  category?: 'error' | 'outdated' | 'suggestion' | 'other';
};
const CONSENT_KEY = 'aventourarte.measurement.v1';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly config = inject(ANALYTICS_SETTINGS);
  private readonly runtime = inject(ANALYTICS_RUNTIME);
  readonly allowed = signal(this.readConsent());
  private currentGuide = '';
  private navigationKey = '';
  private editorial = false;
  private readonly votes = new Set<string>();
  private readonly pendingVotes = new Set<string>();

  get configured(): boolean {
    return this.config.privacyReviewed &&
      /^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(this.config.websiteId) &&
      this.config.endpoint === 'https://gateway.umami.is/api/send' &&
      this.config.allowedHosts.length > 0;
  }

  get available(): boolean {
    const view = this.document.defaultView;
    return this.browser && this.configured && !this.preview && !!view &&
      this.config.allowedHosts.includes(view.location.hostname) &&
      view.navigator.doNotTrack !== '1';
  }

  /** Exercise the complete interface locally without touching production analytics. */
  get preview(): boolean {
    const view = this.document.defaultView;
    return this.browser && this.configured && !!view &&
      (this.runtime.development || ['localhost', '127.0.0.1', '[::1]'].includes(view.location.hostname));
  }

  get controlsAvailable(): boolean { return this.available || this.preview; }

  get unavailableReason(): string {
    const view = this.document.defaultView;
    if (!this.configured) return 'La medición todavía no está configurada.';
    if (view?.navigator.doNotTrack === '1')
      return 'Tu navegador tiene activada la opción «No rastrear». La respetamos y no enviamos datos.';
    return 'La medición no está disponible en esta dirección.';
  }

  setConsent(allow: boolean): void {
    const changed = this.allowed() !== allow;
    this.allowed.set(allow);
    try { this.document.defaultView?.localStorage.setItem(CONSENT_KEY, allow ? 'yes' : 'no'); }
    catch { /* In-memory preference still works when storage is blocked. */ }
    if (!changed) return;
    this.navigationKey = '';
    if (allow) this.visit(this.currentGuide, this.editorial);
  }

  visit(guide: string, editorial = false): void {
    this.currentGuide = this.validGuide(guide) ? guide : '';
    this.editorial = editorial;
    const key = `${this.currentGuide}|${editorial}`;
    if (key === this.navigationKey) return;
    this.navigationKey = key;
    if (this.currentGuide) void this.send('', this.currentGuide);
  }

  action(name: Action, data: ActionData = {}, guide = this.currentGuide): void {
    // Construct the payload from an allowlist. Search text and health preferences never enter it.
    let safe: Record<string, string> = {};
    if (name === 'search' && ['none', 'some'].includes(data.results ?? '')) safe = { results: data.results! };
    else if (name === 'plan_filter' && data.action === 'clear') safe = { action: 'clear' };
    else if (name === 'plan_filter' && ['select', 'remove'].includes(data.action ?? '') && PLAN_TYPES.some(plan => plan.id === data.plan))
      safe = { plan: data.plan!, action: data.action! };
    else if (name === 'outbound' && ['maps', 'web', 'booking'].includes(data.kind ?? '')) safe = { kind: data.kind! };
    else if (name === 'share' && ['native', 'clipboard'].includes(data.method ?? '')) safe = { method: data.method! };
    else if (name === 'reader_report' && ['error', 'outdated', 'suggestion', 'other'].includes(data.category ?? '')) safe = { category: data.category! };
    else return;
    void this.send(name, guide, safe);
  }

  hasVoted(guide: string): boolean { return this.votes.has(guide); }

  async feedback(guide: string, rating: UtilityRating, reason?: UtilityReason): Promise<boolean> {
    if (this.votes.has(guide) || this.pendingVotes.has(guide)) return false;
    if (!['yes', 'partly', 'no'].includes(rating)) return false;
    if (reason && !['practical-info', 'outdated', 'hard-to-find'].includes(reason)) return false;
    if (!this.validGuide(guide) || this.editorial) return false;
    if (this.preview) {
      this.votes.add(guide);
      return true;
    }
    this.pendingVotes.add(guide);
    try {
      const sent = await this.send('guide_feedback', guide, { rating, ...(reason && rating !== 'yes' ? { reason } : {}) }, true);
      if (sent) this.votes.add(guide);
      return sent;
    } finally { this.pendingVotes.delete(guide); }
  }

  private async send(name: string, guide: string, data?: Record<string, string>, voluntary = false): Promise<boolean> {
    const view = this.document.defaultView;
    if (!this.available || (!this.allowed() && !voluntary) || this.editorial || !view) return false;
    if (name !== 'search' && !this.validGuide(guide)) return false;
    const basePath = new URL(this.document.baseURI).pathname.replace(/\/$/, '');
    const payload = {
      website: this.config.websiteId,
      hostname: view.location.hostname,
      url: this.validGuide(guide) ? `${basePath}/guia/${guide}/` : `${basePath}/`,
      // No actual URL, title, referrer, screen, search text, or visitor ID is forwarded.
      ...(name ? { name } : {}),
      ...(data ? { data } : {}),
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    try {
      const response = await view.fetch(this.config.endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'event', payload }),
        credentials: 'omit', referrerPolicy: 'no-referrer', keepalive: true,
        signal: controller.signal,
      });
      return response.ok;
    } catch { return false; }
    finally { clearTimeout(timeout); }
  }

  private validGuide(guide: string): boolean {
    return /^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/.test(guide);
  }

  private readConsent(): boolean {
    if (!this.browser) return false;
    try { return this.document.defaultView?.localStorage.getItem(CONSENT_KEY) === 'yes'; }
    catch { return false; }
  }
}
