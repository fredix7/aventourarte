import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { ANALYTICS_RUNTIME, AnalyticsService } from './analytics.service';
import { READER_REPORT_CONFIG } from './reader-report.config';

export const REPORT_SETTINGS = new InjectionToken('reader.report.settings', {
  providedIn: 'root', factory: () => READER_REPORT_CONFIG,
});
export const REPORT_TYPES = [
  { id: 'error', label: 'Algo no funciona' },
  { id: 'outdated', label: 'Un dato ha cambiado' },
  { id: 'suggestion', label: 'Una idea para mejorar' },
  { id: 'other', label: 'Otro comentario' },
] as const;
export type ReportType = typeof REPORT_TYPES[number]['id'];
export interface ReaderReport {
  type: ReportType; message: string; email: string; guidePath: string; guideName: string;
  consent: boolean; website: string;
}
export type ReportResult = { ok: true; reference: string; preview: boolean } | { ok: false; message: string };

@Injectable({ providedIn: 'root' })
export class ReaderReportService {
  private readonly document = inject(DOCUMENT);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly runtime = inject(ANALYTICS_RUNTIME);
  private readonly config = inject(REPORT_SETTINGS);
  private readonly analytics = inject(AnalyticsService);
  private sequence = 0;

  get preview(): boolean {
    const host = this.document.defaultView?.location.hostname;
    return this.browser && (this.runtime.development || ['localhost', '127.0.0.1', '[::1]'].includes(host ?? ''));
  }

  get available(): boolean {
    if (this.preview) return true;
    try {
      const endpoint = new URL(this.config.endpoint);
      return this.browser && endpoint.protocol === 'https:' && !endpoint.username && !endpoint.password &&
        this.config.allowedHosts.includes(this.document.defaultView?.location.hostname ?? '');
    } catch { return false; }
  }

  async submit(report: ReaderReport): Promise<ReportResult> {
    const message = report.message.trim();
    const email = report.email.trim();
    if (!REPORT_TYPES.some(type => type.id === report.type) || message.length < 10 || message.length > 2000 ||
      !/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/.test(report.guidePath) || !report.consent ||
      (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))))
      return { ok: false, message: 'Revisa el mensaje, el correo y el permiso de envío.' };
    if (report.website) return { ok: false, message: 'No se ha podido enviar el aviso.' };
    if (this.preview) return { ok: true, reference: `PRUEBA-${++this.sequence}`, preview: true };
    if (!this.available) return { ok: false, message: 'El envío de avisos aún no está disponible.' };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await this.document.defaultView!.fetch(this.config.endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...report, message, email }),
        credentials: 'omit', referrerPolicy: 'no-referrer', signal: controller.signal,
      });
      if (response.status === 429) return { ok: false, message: 'Has enviado varios avisos seguidos. Espera un minuto antes de intentarlo de nuevo.' };
      if (!response.ok) return { ok: false, message: 'No hemos podido guardar el aviso. Conservamos el texto para que puedas reintentarlo.' };
      const result: unknown = await response.json();
      const reference = (result as { reference?: unknown })?.reference;
      if (typeof reference !== 'string' || !/^AVISO-\d+$/.test(reference)) throw new Error('Invalid receipt');
      this.analytics.action('reader_report', { category: report.type }, report.guidePath);
      return { ok: true, reference, preview: false };
    } catch {
      return { ok: false, message: 'No hemos podido confirmar la recepción. Tu texto sigue aquí; comprueba la conexión antes de reintentar.' };
    } finally { clearTimeout(timeout); }
  }
}
