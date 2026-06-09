import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TravelNode } from '../data/travel-data';

@Component({
  selector: 'app-header-submenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-submenu.component.html',
  styleUrls: ['./header-submenu.component.scss']
})
export class HeaderSubmenuComponent {
  @Input() node!: TravelNode;

  @Input() isOpen = false;

  openChildKey: string | null = null;

  @Output() toggleOpen = new EventEmitter<string>();
  @Output() selected = new EventEmitter<TravelNode>();

  constructor(private router: Router) {}

  keyOf(n: TravelNode): string {
    return n.path ?? n.nombre;
  }

  nodeIcon(n: TravelNode): string | null {
    if (n.isCapital) return 'star';
    if (n.isImportantCity) return 'location_city';

    return null;
  }

  toggleChild(childKey: string) {
    this.openChildKey = (this.openChildKey === childKey) ? null : childKey;
  }

  onClick(n: TravelNode, event: MouseEvent) {
    event.stopPropagation();

    if (n.hijos?.length) {
      this.toggleOpen.emit(this.keyOf(n));
      return;
    }

    if (n.path) {
      this.router.navigateByUrl(`/guia/${n.path}`);
    }

    this.selected.emit(n);
  }

  onSelected(n: TravelNode) {
    this.selected.emit(n);
  }
}
