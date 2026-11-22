import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

// Self-contained: a failed CDN must not require another network request to recover.
export const IMAGE_FALLBACK = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="paper" x2="1" y2="1"><stop stop-color="#f8f3e9"/><stop offset="1" stop-color="#e5efed"/></linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#123a5a" stroke-opacity=".035"/></pattern>
  </defs>
  <path fill="url(#paper)" d="M0 0h800v600H0z"/><path fill="url(#grid)" d="M0 0h800v600H0z"/>
  <g fill="none" stroke="#123a5a" stroke-opacity=".08" stroke-width="2">
    <path d="M-40 470Q140 300 300 470T840 420M-40 500Q140 330 300 500T840 450M-40 530Q140 360 300 530T840 480"/>
    <circle cx="400" cy="238" r="72"/><circle cx="400" cy="238" r="88" stroke-dasharray="2 12"/>
  </g>
  <g transform="translate(400 238)"><path d="M0-48 19 0 0 48-19 0Z" fill="#123a5a" opacity=".85"/><path d="M0-48 19 0H0Z" fill="#c9854d"/><circle r="5" fill="#fffaf2"/></g>
  <g text-anchor="middle" font-family="Arial,Helvetica,sans-serif" fill="#123a5a">
    <text x="400" y="373" font-size="27" font-weight="600">Fotografía no disponible</text>
    <text x="400" y="411" font-size="19" fill="#52676c">El viaje continúa en la guía</text>
  </g>
</svg>`);

@Directive({
  selector: 'img[appImageFallback]',
  standalone: true,
  exportAs: 'imageFallback',
  host: {
    '[class.image-unavailable]': 'failed',
    '[attr.data-image-state]': 'failed ? "unavailable" : "original"'
  }
})
export class ImageFallbackDirective implements OnChanges {
  @Input() src: string | null | undefined;
  @Input() alt = '';
  failed = false;

  constructor(private element: ElementRef<HTMLImageElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['src']) {
      this.failed = false;
      if (this.src) this.renderer.setAttribute(this.element.nativeElement, 'src', this.src);
      else this.renderer.removeAttribute(this.element.nativeElement, 'src');
    }
    this.updateAlt();
  }

  @HostListener('error')
  onError() {
    if (this.failed) return;
    this.failed = true;
    this.updateAlt();
    this.renderer.setAttribute(this.element.nativeElement, 'src', IMAGE_FALLBACK);
  }

  private updateAlt() {
    const alt = this.failed
      ? [this.alt, 'Fotografía no disponible'].filter(Boolean).join(' — ')
      : this.alt;
    this.renderer.setAttribute(this.element.nativeElement, 'alt', alt);
  }
}
