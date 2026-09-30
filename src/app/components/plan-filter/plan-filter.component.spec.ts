import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLAN_TYPES } from '../../shared/plan-types';
import { PlanFilterComponent } from './plan-filter.component';

describe('PlanFilterComponent', () => {
  let fixture: ComponentFixture<PlanFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PlanFilterComponent] }).compileComponents();
    fixture = TestBed.createComponent(PlanFilterComponent);
    fixture.componentRef.setInput('availableTypes', PLAN_TYPES);
    fixture.componentRef.setInput('total', 20);
    fixture.componentRef.setInput('matching', 20);
    fixture.detectChanges();
  });

  it('emits selections and preserves focused buttons when the selected state changes', () => {
    const toggle = spyOn(fixture.componentInstance.toggleType, 'emit');
    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('.plan-filter-option'));
    const beach = buttons.find(button => button.textContent?.includes('Playa'))!;
    beach.focus();
    beach.click();
    expect(toggle).toHaveBeenCalledWith('playa');
    fixture.componentRef.setInput('selected', new Set(['playa', 'naturaleza', 'gratuito']));
    fixture.componentRef.setInput('matching', 3);
    fixture.detectChanges();

    expect(document.activeElement).toBe(beach);
    expect(beach.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('3 de 20 planes');
    expect(fixture.nativeElement.querySelector('.plan-filter-summary').textContent).toContain('Playa o Naturaleza · Gratuito');
  });

  it('announces no matches, keeps every option available and offers a reset', () => {
    fixture.componentRef.setInput('selected', new Set(['playa', 'de-pago']));
    fixture.componentRef.setInput('matching', 0);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.plan-filter-empty').textContent).toContain('Prueba otra combinación');
    expect(fixture.nativeElement.querySelectorAll('.plan-filter-option').length).toBe(9);
    const clear = spyOn(fixture.componentInstance.clearFilters, 'emit');
    fixture.nativeElement.querySelector('.plan-filter-clear').click();
    expect(clear).toHaveBeenCalled();
  });

  it('labels the route choices clearly and keeps the selected route in the summary', () => {
    const group: HTMLElement = fixture.nativeElement.querySelector('[data-plan-group="recorrido"]');
    expect(group.querySelector('h3')?.textContent).toContain('Recorrido');
    expect(Array.from(group.querySelectorAll('button span')).map(span => span.textContent?.trim()))
      .toEqual(['Ruta principal', 'Planes opcionales']);
    fixture.componentRef.setInput('selected', new Set(['opcional']));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.plan-filter-summary').textContent).toContain('Planes opcionales');
  });
});
