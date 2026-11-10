import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { ImageService } from '../../shared/image.service';
import { GuideViewerComponent } from './guide-viewer.component';

describe('GuideViewerComponent itinerary layout', () => {
  let fixture: ComponentFixture<GuideViewerComponent>;
  let frame: HTMLIFrameElement;
  let routePath: string;

  beforeEach(async () => {
    const images = jasmine.createSpyObj<ImageService>('ImageService', ['url', 'background']);
    images.url.and.returnValue('');
    images.background.and.returnValue('');
    await TestBed.configureTestingModule({
      imports: [GuideViewerComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: {
          paramMap: { get: () => routePath }, queryParamMap: { get: () => null }
        } } },
        { provide: ImageService, useValue: images }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    fixture?.destroy();
    frame?.remove();
  });

  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise<void>(resolve => frame.contentWindow!.requestAnimationFrame(() => resolve()));
    await Promise.all(frame.contentDocument!.getAnimations()
      .filter(animation => animation.effect?.getComputedTiming().iterations !== Infinity)
      .map(animation => animation.finished.catch(() => undefined)));
  };

  const render = async (width: number) => {
    fixture = TestBed.createComponent(GuideViewerComponent);
    fixture.detectChanges();
    fixture.componentInstance.setActiveTab('que-ver');
    fixture.detectChanges();
    frame = document.createElement('iframe');
    frame.style.cssText = `position:fixed;left:-2000px;top:0;width:${width}px;height:800px;border:0`;
    const loaded = new Promise<void>(resolve => frame.onload = () => resolve());
    frame.src = 'about:blank';
    document.body.appendChild(frame);
    await loaded;
    const doc = frame.contentDocument!;
    // Give the component a real viewport, including its media queries and Material theme.
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
    await Promise.all(styles.map(style => {
      const copy = style.cloneNode(true) as HTMLElement;
      const ready = copy.tagName === 'LINK'
        ? new Promise<void>((resolve, reject) => {
            copy.onload = () => resolve();
            copy.onerror = () => reject(new Error('Could not load layout-test stylesheet'));
          })
        : Promise.resolve();
      doc.head.appendChild(copy);
      return ready;
    }));
    doc.body.appendChild(fixture.nativeElement);
    await settle();
    expect(frame.contentWindow!.innerWidth).toBe(width);
    expect(frame.contentWindow!.innerHeight).toBe(800);
    return fixture.nativeElement as HTMLElement;
  };

  const checkHeaders = (headers: HTMLElement[]) => {
    headers.forEach((header, index) => {
      const title = header.querySelector<HTMLElement>('mat-panel-title')!;
      const label = title.textContent!.trim();
      const box = header.getBoundingClientRect();
      const text = title.getBoundingClientRect();
      const indicator = header.querySelector<HTMLElement>('.mat-expansion-indicator')!.getBoundingClientRect();
      expect(text.height).withContext(label).toBeGreaterThan(0);
      expect(text.top).withContext(label + ' top').toBeGreaterThanOrEqual(box.top - 1);
      expect(text.bottom).withContext(label + ' bottom').toBeLessThanOrEqual(box.bottom + 1);
      expect(text.right).withContext(label + ' indicator').toBeLessThanOrEqual(indicator.left + 1);
      expect(title.scrollHeight).withContext(label + ' clipped title').toBeLessThanOrEqual(title.clientHeight + 1);
      if (headers[index + 1]) {
        expect(box.bottom).withContext(label + ' next header')
          .toBeLessThanOrEqual(headers[index + 1].getBoundingClientRect().top + 1);
      }
    });
  };

  for (const width of [320, 768, 1440]) {
    for (const path of ['europa/malta/malta', 'europa/dinamarca/copenhague', 'europa/suecia/malmo']) {
      it(`keeps ${path} readable when collapsed and expanded at ${width} x 800`, async () => {
        routePath = path;
        const root = await render(width);
        const headers = Array.from(root.querySelectorAll<HTMLElement>('.itinerary-accordion mat-expansion-panel-header'));
        if (path.endsWith('/malmo')) {
          expect(headers.length).toBe(0);
          const cards = Array.from(root.querySelectorAll<HTMLElement>('.item-card'));
          expect(cards.length).toBeGreaterThan(0);
          cards.forEach(card => {
            const title = card.querySelector<HTMLElement>('h3, h4')!;
            expect(title.getBoundingClientRect().height).toBeGreaterThan(0);
            expect(title.getBoundingClientRect().right).toBeLessThanOrEqual(card.getBoundingClientRect().right + 1);
          });
          return;
        }
        expect(headers.length).toBe(path.includes('/malta/') ? 4 : 5);
        checkHeaders(headers);
        // Exercise both the longest and shortest real day headings in each guide.
        const byLength = [...headers].sort((a, b) => a.textContent!.length - b.textContent!.length);
        for (const header of [byLength[0], byLength[byLength.length - 1]]) {
          header.click();
          await settle();
          expect(header.getAttribute('aria-expanded')).toBe('true');
          checkHeaders(headers);
          header.click();
          await settle();
          expect(header.getAttribute('aria-expanded')).toBe('false');
          checkHeaders(headers);
        }
      });
    }
  }
});
