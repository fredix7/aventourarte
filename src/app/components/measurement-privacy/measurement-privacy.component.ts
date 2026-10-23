import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../../shared/analytics.service';

@Component({
  selector: 'app-measurement-privacy', standalone: true, imports: [CommonModule],
  template: `
    <details id="measurement-privacy">
      <summary>Privacidad y medición</summary>
      <div class="notice">
        <h2>Tú eliges qué compartes</h2>
        <p>Responsable: Alfredo Velasco Japón. Contacto: alfredovejapon@gmail.com.
          <a href="privacidad.html" target="_blank" rel="noopener">Política de privacidad y derechos</a>.</p>
        <p>Usamos Umami Cloud para conocer qué guías y acciones resultan útiles.
          La medición de navegación está desactivada hasta que la permitas.</p>
        <p>Si la activas, enviamos la guía consultada, el uso del buscador (sin el texto),
          filtros de tipo de plan, clics en Maps, webs y reservas, y acciones de compartir.
          En estas mediciones no enviamos preferencias alimentarias, alergias, ubicación precisa, nombres ni correos.</p>
        <p>Umami recibe la dirección IP y los datos técnicos que acompañan una conexión web;
          puede derivar de ellos sesiones y ubicación aproximada. No enviamos un identificador propio de visitante.
          Los datos del plan gratuito se conservan seis meses.
          <a href="https://umami.is/privacy" target="_blank" rel="noopener noreferrer">Privacidad de Umami</a>.</p>
        <p>Tu elección se guarda en este navegador, sin un identificador personal.
          Puedes retirarla aquí. Las valoraciones son voluntarias: enviar una respuesta
          no activa el seguimiento de navegación.</p>
        <h3>Avisos y sugerencias</h3>
        <p>Si decides enviarnos un aviso, tratamos el mensaje, la guía y el correo opcional
          para revisarlo y responderte. El envío pasa por Cloudflare y se guarda en una bandeja privada de Notion.
          La dirección IP se usa para limitar envíos repetidos. El mensaje y el correo no se envían a Umami.
          No se envía un correo automático al abrir un ticket.</p>
        <p *ngIf="analytics.preview" class="preview-note">Vista previa local: los controles funcionan, pero no se envían datos a Umami.</p>
        <div *ngIf="analytics.controlsAvailable; else inactive" class="choices">
          <button type="button" [attr.aria-pressed]="analytics.allowed()" (click)="analytics.setConsent(true)">Permitir medición</button>
          <button type="button" [attr.aria-pressed]="!analytics.allowed()" (click)="analytics.setConsent(false)">No permitir medición</button>
        </div>
        <ng-template #inactive><p role="status">{{ analytics.unavailableReason }}</p></ng-template>
        <p *ngIf="analytics.controlsAvailable" role="status">{{ analytics.preview ? (analytics.allowed() ? 'Preferencia de prueba: medición permitida. No se envían datos.' : 'Preferencia de prueba: medición desactivada. No se envían datos.') : (analytics.allowed() ? 'Medición de navegación permitida.' : 'Medición de navegación desactivada.') }}</p>
      </div>
    </details>
  `,
  styles: [`
    :host { display: block; color: inherit; font-size: 13px; }
    details { max-width: 760px; margin: auto; padding: 0; }
    summary { width: fit-content; margin: auto; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; padding: 8px; }
    .notice { margin: 8px 0 16px; padding: 18px 24px; border-radius: 16px; background: #fffaf2; color: #193c4e; line-height: 1.7; }
    h2 { font-family: Georgia, serif; }
    a { color: #235849; }
    .choices { display: flex; flex-wrap: wrap; gap: 12px; }
    .preview-note { padding: 10px 14px; border-radius: 10px; background: #edf2f4; }
    button { padding: 12px 18px; background: transparent; color: #193c4e; border: 1px solid #7a8e89; border-radius: 24px; cursor: pointer; font: inherit; }
    button[aria-pressed=true] { background: #e5efea; border-color: #24584d; }
    button:focus-visible, summary:focus-visible { outline: 3px solid #a96d3d; outline-offset: 4px; }
  `],
})
export class MeasurementPrivacyComponent {
  readonly analytics = inject(AnalyticsService);
}
