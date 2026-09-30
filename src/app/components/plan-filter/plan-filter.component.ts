import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PlanTypeDefinition, PlanTypeGroup, PlanTypeId } from '../../shared/plan-types';

@Component({
  selector: 'app-plan-filter',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './plan-filter.component.html',
  styleUrls: ['./plan-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanFilterComponent implements OnChanges {
  @Input() availableTypes: readonly PlanTypeDefinition[] = [];
  @Input() selected: ReadonlySet<PlanTypeId> = new Set();
  @Input() total = 0;
  @Input() matching = 0;
  @Output() toggleType = new EventEmitter<PlanTypeId>();
  @Output() clearFilters = new EventEmitter<void>();

  groups: { id: PlanTypeGroup; label: string; number: string; types: readonly PlanTypeDefinition[] }[] = [];
  summary = '';

  trackById(_index: number, item: { id: string }): string {
    return item.id;
  }

  ngOnChanges() {
    const definitions: { id: PlanTypeGroup; label: string; number: string }[] = [
      { id: 'recorrido', label: 'Recorrido', number: '01' },
      { id: 'entorno', label: 'Entorno', number: '02' },
      { id: 'coste', label: 'Coste', number: '03' }
    ];
    this.groups = definitions
      .map(group => ({ ...group, types: this.availableTypes.filter(type => type.group === group.id) }))
      .filter(group => group.types.length);
    this.summary = this.groups
      .map(group => group.types.filter(type => this.selected.has(type.id)).map(type => type.filterLabel ?? type.label).join(' o '))
      .filter(Boolean)
      .join(' · ');
  }
}
