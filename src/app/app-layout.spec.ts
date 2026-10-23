import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ImageService } from './shared/image.service';

describe('Page ending and privacy placement', () => {
  beforeEach(() => {
    const images = jasmine.createSpyObj<ImageService>('ImageService', ['url', 'background']);
    images.url.and.returnValue('');
    images.background.and.returnValue('');
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes), { provide: ImageService, useValue: images }],
    });
  });

  it('ends a guide at the footer without a separate block underneath', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/guia/europa/espana/andalucia/cadiz/rota');
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const footerHost = root.querySelector('app-footer')!;
    const footer = footerHost.querySelector('footer')!;
    expect(footerHost.nextElementSibling).toBeNull();
    expect(root.querySelectorAll('app-measurement-privacy').length).toBe(1);
    expect(footer.querySelector('app-measurement-privacy')).not.toBeNull();
    expect(footer.lastElementChild!.classList.contains('footer-bottom')).toBeTrue();
    expect(Math.abs(root.getBoundingClientRect().bottom - footer.getBoundingClientRect().bottom)).toBeLessThan(1);
    expect(getComputedStyle(footerHost).zIndex).toBe('1');
    expect(footer.querySelector('summary')!.getBoundingClientRect().height).toBeGreaterThan(0);
  });

  it('keeps the expanded privacy notice inside the footer, above the final copyright row', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const footer = root.querySelector('footer')!;
    footer.querySelector('summary')!.click();
    fixture.detectChanges();
    expect(footer.querySelector('details')!.open).toBeTrue();
    const notice = footer.querySelector('.notice')!.getBoundingClientRect();
    const row = footer.querySelector('.footer-bottom')!.getBoundingClientRect();
    expect(notice.height).toBeGreaterThan(0);
    expect(notice.bottom).toBeLessThanOrEqual(row.top);
    expect(Math.abs(root.getBoundingClientRect().bottom - footer.getBoundingClientRect().bottom)).toBeLessThan(1);
  });
});
