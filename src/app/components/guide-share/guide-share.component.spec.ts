import { TestBed } from '@angular/core/testing';
import { GuideShareComponent, guideShareUrl } from './guide-share.component';

describe('Guide sharing', () => {
  const path = 'europa/espana/andalucia/cadiz/jerez-de-la-frontera';
  const baseUri = 'https://fredix7.github.io/aventourarte/';
  const url = `${baseUri}guia/${path}/`;
  let component: GuideShareComponent;
  let share: jasmine.Spy;
  let writeText: jasmine.Spy;
  let navigator: Navigator;

  beforeEach(() => {
    share = jasmine.createSpy('share').and.returnValue(Promise.resolve());
    writeText = jasmine.createSpy('writeText').and.returnValue(Promise.resolve());
    navigator = { share, clipboard: { writeText } } as unknown as Navigator;
    const document = { baseURI: baseUri, defaultView: { navigator } } as unknown as Document;
    component = new GuideShareComponent(document);
    component.guidePath = path;
    component.guideName = 'Jerez de la Frontera';
    component.ngOnChanges();
  });

  afterEach(() => component.ngOnDestroy());

  it('builds direct URLs at the deployment subpath and the domain root', () => {
    expect(component.url).toBe(url);
    expect(guideShareUrl(path, 'https://example.test/')).toBe(`https://example.test/guia/${path}/`);
    expect(guideShareUrl(path, `${baseUri}?editorial=1#gastronomia`)).toBe(url);
  });

  it('rejects empty, malformed and external paths and non-web origins', () => {
    for (const invalid of ['', '../admin', '/guia/rota', 'rota?editorial=1', 'rota#tab', 'https://evil.test']) {
      expect(guideShareUrl(invalid, baseUri)).withContext(invalid).toBe('');
    }
    expect(guideShareUrl(path, 'file:///tmp/')).toBe('');
    expect(guideShareUrl(path, 'invalid')).toBe('');
  });

  it('opens native sharing with the current title, invitation and clean URL', async () => {
    const pending = component.share();
    expect(share).toHaveBeenCalledOnceWith({
      title: 'Jerez de la Frontera · AvenTourArte',
      text: '¿Nos escapamos a Jerez de la Frontera? Mira esta guía de AvenTourArte.',
      url
    });
    await pending;
    expect(writeText).not.toHaveBeenCalled();
    expect(component.message).toBe('');
    expect(component.busy).toBeFalse();
  });

  it('copies directly when native sharing is unavailable', async () => {
    navigator.share = undefined as unknown as Navigator['share'];
    expect(component.nativeSharing).toBeFalse();
    await component.share();
    expect(writeText).toHaveBeenCalledOnceWith(url);
    expect(component.copied).toBeTrue();
  });

  it('copies directly when canShare declines the payload', async () => {
    navigator.canShare = () => false;
    await component.share();
    expect(share).not.toHaveBeenCalled();
    expect(writeText).toHaveBeenCalledOnceWith(url);
  });

  it('silently cancels without changing the clipboard', async () => {
    share.and.returnValue(Promise.reject(new DOMException('Canceled', 'AbortError')));
    await component.share();
    expect(component.message).toBe('');
    expect(component.nativeSharing).toBeTrue();
    expect(writeText).not.toHaveBeenCalled();
  });

  it('offers an explicit copy action after a native error', async () => {
    share.and.returnValue(Promise.reject(new DOMException('Blocked', 'NotAllowedError')));
    await component.share();
    expect(component.nativeSharing).toBeFalse();
    expect(component.message).toContain('Puedes copiar el enlace');
    expect(writeText).not.toHaveBeenCalled();
    await component.share();
    expect(writeText).toHaveBeenCalledOnceWith(url);
  });

  it('offers a manual link when clipboard permission is denied', async () => {
    writeText.and.returnValue(Promise.reject(new DOMException('Blocked', 'NotAllowedError')));
    await component.copyLink();
    expect(component.copied).toBeFalse();
    expect(component.manualCopy).toBeTrue();
    expect(component.message).toContain('Selecciona y copia');
    expect(component.busy).toBeFalse();
  });

  it('offers a manual link when the clipboard API is missing', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined });
    await component.copyLink();
    expect(component.manualCopy).toBeTrue();
    expect(component.url).toBe(url);
  });

  it('prevents repeated requests while native sharing is pending', async () => {
    let resolve!: () => void;
    share.and.returnValue(new Promise<void>(done => resolve = done));
    const pending = component.share();
    await component.share();
    await component.copyLink();
    expect(share).toHaveBeenCalledTimes(1);
    expect(writeText).not.toHaveBeenCalled();
    resolve();
    await pending;
    expect(component.busy).toBeFalse();
  });

  it('ignores an old clipboard result after changing guides', async () => {
    let resolve!: () => void;
    writeText.and.returnValue(new Promise<void>(done => resolve = done));
    const pending = component.copyLink();
    component.guidePath = 'europa/dinamarca/copenhague';
    component.guideName = 'Copenhague';
    component.ngOnChanges();
    resolve();
    await pending;
    expect(component.url).toBe(`${baseUri}guia/europa/dinamarca/copenhague/`);
    expect(component.message).toBe('');
    expect(component.copied).toBeFalse();
  });

  it('ignores an old sharing error after destruction', async () => {
    let reject!: (error: Error) => void;
    share.and.returnValue(new Promise<void>((_, fail) => reject = fail));
    const pending = component.share();
    component.ngOnDestroy();
    reject(new Error('Late failure'));
    await pending;
    expect(component.message).toBe('');
  });

  it('clears the confirmation after five seconds', async () => {
    jasmine.clock().install();
    try {
      await component.copyLink();
      expect(component.copied).toBeTrue();
      jasmine.clock().tick(5000);
      expect(component.copied).toBeFalse();
      expect(component.message).toBe('');
    } finally {
      jasmine.clock().uninstall();
    }
  });
});

describe('Guide sharing accessibility', () => {
  it('opens native sharing from one labelled button and keeps feedback accessible', async () => {
    await TestBed.configureTestingModule({ imports: [GuideShareComponent] }).compileComponents();
    const fixture = TestBed.createComponent(GuideShareComponent);
    const share = jasmine.createSpy('share').and.returnValue(Promise.resolve());
    spyOnProperty(window, 'navigator', 'get').and.returnValue({ share } as unknown as Navigator);
    fixture.componentRef.setInput('guidePath', 'europa/dinamarca/copenhague');
    fixture.componentRef.setInput('guideName', 'Copenhague');
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const button = root.querySelector<HTMLButtonElement>('button')!;
    expect(button.type).toBe('button');
    expect(button.getAttribute('aria-label')).toContain('Copenhague');
    expect(button.textContent).toContain('Compartir guía');
    expect(root.querySelectorAll('button').length).toBe(1);
    expect(root.querySelectorAll('a').length).toBe(0);
    button.click();
    await fixture.whenStable();
    expect(share).toHaveBeenCalledOnceWith({
      title: 'Copenhague · AvenTourArte',
      text: '¿Nos escapamos a Copenhague? Mira esta guía de AvenTourArte.',
      url: fixture.componentInstance.url
    });
    expect(root.querySelector('[role="status"]')?.getAttribute('aria-live')).toBe('polite');
    fixture.destroy();
  });

  it('copies from the same action when native sharing is unsupported', async () => {
    await TestBed.configureTestingModule({ imports: [GuideShareComponent] }).compileComponents();
    const fixture = TestBed.createComponent(GuideShareComponent);
    const writeText = jasmine.createSpy('writeText').and.returnValue(Promise.resolve());
    spyOnProperty(window, 'navigator', 'get').and.returnValue({ clipboard: { writeText } } as unknown as Navigator);
    fixture.componentRef.setInput('guidePath', 'europa/dinamarca/copenhague');
    fixture.componentRef.setInput('guideName', 'Copenhague');
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const button = root.querySelector<HTMLButtonElement>('button')!;
    expect(root.querySelectorAll('button').length).toBe(1);
    expect(button.textContent).toContain('Copiar enlace');
    button.click();
    // Wait for the clipboard promise without waiting for feedback to expire.
    await Promise.resolve();
    fixture.detectChanges();
    expect(writeText).toHaveBeenCalledOnceWith(fixture.componentInstance.url);
    expect(root.querySelector('[role="status"]')?.textContent).toContain('Enlace copiado');
    fixture.destroy();
  });

  it('focuses and selects the manual link after clipboard failure', async () => {
    await TestBed.configureTestingModule({ imports: [GuideShareComponent] }).compileComponents();
    const fixture = TestBed.createComponent(GuideShareComponent);
    fixture.componentRef.setInput('guidePath', 'europa/dinamarca/copenhague');
    fixture.componentRef.setInput('guideName', 'Copenhague');
    fixture.detectChanges();
    const copy = jasmine.createSpy('writeText').and.returnValue(Promise.reject(new Error('Blocked')));
    spyOnProperty(window, 'navigator', 'get').and.returnValue({ clipboard: { writeText: copy } } as unknown as Navigator);
    await fixture.componentInstance.copyLink();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(document.activeElement).toBe(input);
    expect(input.readOnly).toBeTrue();
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
    expect(fixture.nativeElement.querySelector('label').htmlFor).toBe(input.id);
    fixture.destroy();
  });
});
