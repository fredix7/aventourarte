import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AnalyticsService, UtilityRating, UtilityReason } from '../../shared/analytics.service';

@Component({
  selector: 'app-guide-feedback', standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './guide-feedback.component.html',
  styleUrls: ['./guide-feedback.component.scss'],
})
export class GuideFeedbackComponent implements OnChanges {
  @Input() guidePath = '';
  @Input() guideName = '';
  readonly analytics = inject(AnalyticsService);
  rating: UtilityRating | null = null;
  reason?: UtilityReason;
  busy = false;
  sent = false;
  error = '';
  private revision = 0;
  readonly ratings: { value: UtilityRating; icon: string; label: string; detail: string }[] = [
    { value: 'yes', icon: 'favorite_border', label: '¡Me sirve!', detail: 'Lista para la escapada' },
    { value: 'partly', icon: 'explore', label: 'A medias', detail: 'Le falta un detalle' },
    { value: 'no', icon: 'near_me', label: 'Aún no', detail: 'Buscaba otra cosa' },
  ];
  readonly reasons: { value: UtilityReason; label: string }[] = [
    { value: 'practical-info', label: 'Más información práctica' },
    { value: 'outdated', label: 'Revisar algún dato' },
    { value: 'hard-to-find', label: 'Encontrar las cosas mejor' },
  ];

  ngOnChanges(): void {
    this.revision++;
    this.rating = null;
    this.reason = undefined;
    this.busy = false;
    this.error = '';
    this.sent = this.analytics.hasVoted(this.guidePath);
  }

  choose(rating: UtilityRating): void {
    if (this.busy || this.sent) return;
    this.rating = rating;
    this.reason = undefined;
    this.error = '';
  }

  async submit(): Promise<void> {
    if (!this.rating || this.busy || this.sent) return;
    const revision = this.revision;
    this.busy = true;
    this.error = '';
    const ok = await this.analytics.feedback(this.guidePath, this.rating, this.reason);
    if (revision !== this.revision) return;
    this.busy = false;
    this.sent = ok;
    if (!ok) this.error = 'No hemos podido enviar tu respuesta. Puedes volver a intentarlo.';
  }
}
