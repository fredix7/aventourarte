import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewChecked, Component, ElementRef, Inject, Input, OnChanges, OnDestroy, ViewChild
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export function guideShareUrl(path: string, baseUri: string): string {
  if (!/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(path)) return '';
  try {
    const url = new URL(`guia/${path}/`, baseUri);
    return /^https?:$/.test(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

@Component({
  selector: 'app-guide-share',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './guide-share.component.html',
  styleUrls: ['./guide-share.component.scss']
})
export class GuideShareComponent implements OnChanges, OnDestroy, AfterViewChecked {
  @Input() guidePath = '';
  @Input() guideName = '';
  @ViewChild('manualLink') manualLink?: ElementRef<HTMLInputElement>;

  url = '';
  busy = false;
  copied = false;
  message = '';
  manualCopy = false;
  private nativeUnavailable = false;
  private focusManualLink = false;
  private revision = 0;
  private resetTimer?: ReturnType<typeof setTimeout>;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  get nativeSharing(): boolean {
    return !this.nativeUnavailable && typeof this.navigator?.share === 'function';
  }

  get invitation(): string {
    return `¿Nos escapamos a ${this.guideName}? Mira esta guía de AvenTourArte.`;
  }

  private get navigator(): Navigator | undefined {
    return this.document.defaultView?.navigator;
  }

  ngOnChanges(): void {
    this.revision++;
    this.clearFeedback();
    this.busy = false;
    this.nativeUnavailable = false;
    this.url = guideShareUrl(this.guidePath, this.document.baseURI);
  }

  ngOnDestroy(): void {
    this.revision++;
    clearTimeout(this.resetTimer);
  }

  ngAfterViewChecked(): void {
    if (this.focusManualLink && this.manualLink) {
      this.focusManualLink = false;
      this.manualLink.nativeElement.focus();
      this.manualLink.nativeElement.select();
    }
  }

  async share(): Promise<void> {
    if (this.busy || !this.url) return;
    const navigator = this.navigator;
    const data: ShareData = {
      title: `${this.guideName} · AvenTourArte`,
      text: this.invitation,
      url: this.url
    };
    if (!this.nativeSharing || (navigator?.canShare && !navigator.canShare(data))) {
      this.nativeUnavailable = true;
      await this.copyLink();
      return;
    }
    this.clearFeedback();
    this.busy = true;
    const revision = this.revision;
    try {
      // Invoke directly from the click: native sharing needs user activation.
      await navigator!.share(data);
    } catch (error) {
      if (revision !== this.revision) return;
      if ((error as { name?: string } | null)?.name !== 'AbortError') {
        this.nativeUnavailable = true;
        this.message = 'No se pudo abrir el menú de compartir. Puedes copiar el enlace.';
      }
    } finally {
      if (revision === this.revision) this.busy = false;
    }
  }

  async copyLink(): Promise<void> {
    if (this.busy || !this.url) return;
    this.clearFeedback();
    this.busy = true;
    const revision = this.revision;
    try {
      const clipboard = this.navigator?.clipboard;
      if (!clipboard?.writeText) throw new Error('Clipboard unavailable');
      await clipboard.writeText(this.url);
      if (revision !== this.revision) return;
      this.copied = true;
      this.message = 'Enlace copiado. Ya puedes enviarlo a quien se apunta al viaje.';
      this.resetTimer = setTimeout(() => {
        this.copied = false;
        this.message = '';
      }, 5000);
    } catch {
      if (revision !== this.revision) return;
      this.manualCopy = true;
      this.focusManualLink = true;
      this.message = 'No se pudo copiar automáticamente. Selecciona y copia este enlace.';
    } finally {
      if (revision === this.revision) this.busy = false;
    }
  }

  selectLink(event: Event): void {
    (event.target as HTMLInputElement).select();
  }

  private clearFeedback(): void {
    clearTimeout(this.resetTimer);
    this.copied = false;
    this.message = '';
    this.manualCopy = false;
    this.focusManualLink = false;
  }
}
