import { Directive, HostListener, inject, Input } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Directive({ selector: 'a[appMeasureLink]', standalone: true })
export class MeasureLinkDirective {
  @Input() appMeasureLink!: 'maps' | 'web' | 'booking';
  private readonly analytics = inject(AnalyticsService);

  @HostListener('click', ['$event'])
  @HostListener('auxclick', ['$event'])
  measure(event: MouseEvent): void {
    if (event.type === 'auxclick' && event.button !== 1) return;
    this.analytics.action('outbound', { kind: this.appMeasureLink });
  }
}
