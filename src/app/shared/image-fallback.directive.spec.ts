import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMAGE_FALLBACK, ImageFallbackDirective } from './image-fallback.directive';

const PHOTO = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"/>');

@Component({
  standalone: true,
  imports: [ImageFallbackDirective],
  template: '<img appImageFallback [src]="src" [alt]="alt" />'
})
class ImageHost {
  src = PHOTO;
  alt = 'Playa de Rota';
}

describe('ImageFallbackDirective', () => {
  let fixture: ComponentFixture<ImageHost>;
  let image: HTMLImageElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageHost);
    fixture.detectChanges();
    image = fixture.nativeElement.querySelector('img');
  });

  afterEach(() => fixture.destroy());

  it('preserves a working photograph and its accessible description', () => {
    image.dispatchEvent(new Event('load'));
    expect(image.src).toBe(PHOTO);
    expect(image.alt).toBe('Playa de Rota');
    expect(image.classList.contains('image-unavailable')).toBeFalse();
  });

  it('replaces a failed image without depending on another server or retry loop', () => {
    image.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(image.src).toBe(IMAGE_FALLBACK);
    expect(image.alt).toBe('Playa de Rota — Fotografía no disponible');
    expect(image.dataset['imageState']).toBe('unavailable');
    const observer = new MutationObserver(() => {});
    observer.observe(image, { attributes: true, attributeFilter: ['src'] });
    image.dispatchEvent(new Event('error'));
    expect(observer.takeRecords().length).toBe(0);
    observer.disconnect();
  });

  it('recovers when the same element is reused for another gallery photograph', () => {
    image.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    fixture.componentInstance.src = PHOTO + '#next';
    fixture.componentInstance.alt = 'Castillo de Luna';
    fixture.detectChanges();
    expect(image.src).toBe(PHOTO + '#next');
    expect(image.alt).toBe('Castillo de Luna');
    expect(image.dataset['imageState']).toBe('original');
  });

  it('retains the unavailable state when only the description changes', () => {
    image.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    fixture.componentInstance.alt = 'Otra descripción';
    fixture.detectChanges();
    expect(image.src).toBe(IMAGE_FALLBACK);
    expect(image.alt).toBe('Otra descripción — Fotografía no disponible');
  });
});
