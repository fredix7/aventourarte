import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

type ImgOpts = {
  w?: number;
  h?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'pad' | 'crop';
  gravity?: string;

  format?: string;   // 'auto'
  quality?: string;  // 'auto'

  dpr?: string | number;     // 'auto' o 2
  effect?: string;           // 'grayscale', 'sepia', etc
};

@Injectable({ providedIn: 'root' })
export class ImageService {
  private cloud = environment.cloudinary.cloudName;

  url(src: string | undefined | null, opts: ImgOpts = {}): string {
    if (!src) return '';

    // Local o URL absoluta
    if (!src.startsWith('cld:')) return src;

    const publicId = src.replace(/^cld:/, '').replace(/^\/+/, '');

    const q = opts.quality ?? 'auto';
    const f = opts.format ?? 'auto';

    const transforms: string[] = [`q_${q}`, `f_${f}`];

    if (opts.dpr) transforms.push(`dpr_${opts.dpr}`);
    if (opts.w) transforms.push(`w_${opts.w}`);
    if (opts.h) transforms.push(`h_${opts.h}`);
    if (opts.crop) transforms.push(`c_${opts.crop}`);
    if (opts.gravity) transforms.push(`g_${opts.gravity}`);
    if (opts.effect) transforms.push(`e_${opts.effect}`);

    const t = transforms.join(',');

    return `https://res.cloudinary.com/${this.cloud}/image/upload/${t}/${publicId}`;
  }

  background(src: string | undefined | null, isMobile: boolean, effect?: string): string {
    const w = isMobile ? 1400 : 2600;
    return this.url(src, {
      w,
      crop: 'scale',
      quality: 'auto',
      format: 'auto',
      dpr: 'auto',
      effect,
    });
  }
}
