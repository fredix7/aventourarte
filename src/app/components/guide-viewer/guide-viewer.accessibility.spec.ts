import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ImageService } from '../../shared/image.service';
import { GuideViewerComponent } from './guide-viewer.component';

describe('GuideViewerComponent gastronomy accessibility', () => {
  let fixture: ComponentFixture<GuideViewerComponent>;
  let events: Subject<unknown>;
  let root: HTMLElement;

  const labelledElements = (element: Element): Element[] =>
    (element.getAttribute('aria-labelledby') ?? '').split(' ').filter(Boolean).map(id => {
      const label = document.getElementById(id);
      expect(label).withContext(`Missing accessible label ${id}`).not.toBeNull();
      return label!;
    });

  const cards = (): HTMLElement[] => Array.from(root.querySelectorAll('.item-card'));
  const select = (label: string) => {
    const button = Array.from(root.querySelectorAll<HTMLButtonElement>('.food-preference-option'))
      .find(item => item.querySelector('span:last-child')?.textContent?.trim() === label)!;
    button.click();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    events = new Subject();
    const imageService = jasmine.createSpyObj<ImageService>('ImageService', ['url', 'background']);
    imageService.url.and.returnValue('');
    imageService.background.and.returnValue('');
    await TestBed.configureTestingModule({
      imports: [GuideViewerComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {
          paramMap: { get: () => 'europa/espana/andalucia/cadiz/rota' },
          queryParamMap: { get: () => null }
        } } },
        { provide: Router, useValue: { url: '/guia/europa/espana/andalucia/cadiz/rota', events } },
        { provide: ImageService, useValue: imageService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(GuideViewerComponent);
    fixture.detectChanges();
    fixture.componentInstance.setActiveTab('gastronomia');
    fixture.detectChanges();
    root = fixture.nativeElement;
  });

  afterEach(() => {
    fixture.destroy();
    events.complete();
  });

  it('associates each dish and image control with its visible heading and global state', () => {
    select('Pescetariano');
    const states = cards().map(card => {
      const heading = card.querySelector('h3')!;
      const status = card.querySelector('.dish-match-banner strong')!;
      expect(labelledElements(card)).toEqual([heading, status]);
      expect(card.querySelectorAll(`[id="${status.id}"]`).length).toBe(1);
      expect(status.closest('[aria-hidden="true"]')).toBeNull();
      const image = card.querySelector('.item-image')!;
      // The self-reference contributes the action label; the other references add context.
      expect(image.getAttribute('aria-label')).toBe('Ampliar imagen');
      expect(labelledElements(image)).toEqual([image, heading, status]);
      return status.textContent?.trim();
    });
    expect(states).toEqual([
      'Compatible con tus filtros', 'Compatible con tus filtros', 'Compatible con tus filtros',
      'Por confirmar', 'Por confirmar', 'No encaja con tus filtros', 'No encaja con tus filtros'
    ]);
  });

  it('updates the associated state after filtering and removes obsolete references when cleared', () => {
    const originalOrder = cards().map(card => card.querySelector('h3')?.textContent);
    select('Pescetariano');
    const urta = cards().find(card => card.querySelector('h3')?.textContent === 'Urta a la roteña')!;
    const titleId = urta.querySelector('h3')!.id;
    const statusId = urta.querySelector('.dish-match-banner strong')!.id;
    select('Alcohol');
    expect(document.getElementById(statusId)?.textContent).toBe('No encaja con tus filtros');
    expect(labelledElements(urta).map(label => label.id)).toEqual([titleId, statusId]);
    root.querySelector<HTMLButtonElement>('.clear-gastronomy-filter')!.click();
    fixture.detectChanges();
    expect(document.getElementById(statusId)).toBeNull();
    expect(cards().map(card => card.querySelector('h3')?.textContent)).toEqual(originalOrder);
    for (const card of cards()) {
      const heading = card.querySelector('h3')!;
      expect(labelledElements(card)).toEqual([heading]);
      const image = card.querySelector('.item-image')!;
      expect(labelledElements(image)).toEqual([image, heading]);
    }
  });

  it('names quick picks descriptively and focuses the corresponding labelled dish card', () => {
    select('Pescetariano');
    const picks = Array.from(root.querySelectorAll<HTMLButtonElement>('.quick-pick'));
    expect(picks.length).toBe(3);
    for (const pick of picks) {
      const name = pick.querySelector('span')!.textContent!.trim();
      expect(pick.getAttribute('aria-label')).toBe(`Ver ficha de ${name}, compatible con tus filtros`);
      const target = document.getElementById(pick.getAttribute('aria-controls')!)!;
      expect(target.getAttribute('tabindex')).toBe('-1');
      spyOn(target, 'scrollIntoView');
      pick.focus();
      pick.click();
      expect(document.activeElement).toBe(target);
      expect(labelledElements(target).map(label => label.textContent?.trim()))
        .toEqual([name, 'Compatible con tus filtros']);
    }
  });

  it('keeps labels unique and stable across subsections, including dishes without photos', () => {
    const dish = () => ({ nombre: 'Sopa', descripcion: 'Receta local', perfilAlimentario: {
      dieta: { certeza: 'confirmado', compatibilidad: 'vegano' },
      alcohol: 'no-contiene', cerdo: 'no-contiene'
    } });
    const section = { titulo: 'Gastronomía', subsecciones: [
      { titulo: 'Primer grupo', platos: [dish()] },
      { titulo: 'Segundo grupo', platos: [dish()] }
    ] };
    fixture.componentInstance.guide = { nombre: 'Prueba', secciones: [section] };
    fixture.componentInstance.tabs = fixture.componentInstance.buildGuideTabs();
    fixture.detectChanges();
    select('Pescetariano');
    const ids = cards().flatMap(card => labelledElements(card).map(label => label.id));
    expect(new Set(ids).size).toBe(4);
    expect(root.querySelectorAll('.item-image').length).toBe(0);
    for (const card of cards()) {
      expect(labelledElements(card).map(label => label.textContent?.trim()))
        .toEqual(['Sopa', 'Compatible con tus filtros']);
    }
    select('Pescetariano');
    expect(cards().map(card => card.querySelector('h4')!.id)).toEqual([ids[0], ids[2]]);
  });
});
