import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    service = new ImageService();
  });

  it('returns an empty URL for an empty image reference', () => {
    expect(service.url(null)).toBe('');
    expect(service.url(undefined)).toBe('');
    expect(service.url('')).toBe('');
  });

  it('leaves local and absolute image URLs unchanged', () => {
    expect(service.url('assets/images/chipiona.jpg', { w: 900 })).toBe(
      'assets/images/chipiona.jpg',
    );
    expect(service.url('https://flagcdn.com/es.svg', { w: 900 })).toBe(
      'https://flagcdn.com/es.svg',
    );
  });

  it('builds a Cloudinary URL with defaults and requested transformations', () => {
    expect(
      service.url('cld:/guides/chipiona/faro', {
        w: 800,
        h: 600,
        crop: 'fill',
        gravity: 'center',
        dpr: 2,
        effect: 'sepia',
        quality: '80',
        format: 'webp',
      }),
    ).toBe(
      'https://res.cloudinary.com/dre38ikvk/image/upload/' +
        'q_80,f_webp,dpr_2,w_800,h_600,c_fill,g_center,e_sepia/guides/chipiona/faro',
    );
  });

  it('builds mobile and desktop backgrounds and preserves the requested effect', () => {
    expect(service.background('cld:guides/chipiona/hero', true, 'grayscale')).toBe(
      'https://res.cloudinary.com/dre38ikvk/image/upload/' +
        'q_auto,f_auto,dpr_auto,w_1400,c_scale,e_grayscale/guides/chipiona/hero',
    );
    expect(service.background('cld:guides/chipiona/hero', false, 'sepia')).toBe(
      'https://res.cloudinary.com/dre38ikvk/image/upload/' +
        'q_auto,f_auto,dpr_auto,w_2600,c_scale,e_sepia/guides/chipiona/hero',
    );
  });
});
