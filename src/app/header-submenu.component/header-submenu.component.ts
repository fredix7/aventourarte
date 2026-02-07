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
  @Output() selected = new EventEmitter<TravelNode>();

  // Solo un hijo abierto en ESTE nivel
  private openChildKey: string | null = null;

  constructor(private router: Router) {}

  private keyOf(n: TravelNode): string {
    // Si tienes un id mejor, úsalo aquí. Si no, path/nombre vale.
    return n.path ?? n.nombre;
  }

  isOpen(n: TravelNode): boolean {
    return this.openChildKey === this.keyOf(n);
  }

  onClick(n: TravelNode, event: MouseEvent) {
    event.stopPropagation();

    // Si tiene hijos: acordeón (abre uno y cierra el resto)
    if (n.hijos?.length) {
      const k = this.keyOf(n);
      this.openChildKey = (this.openChildKey === k) ? null : k;
      return;
    }

    // Si es hoja: navegar
    if (n.path) {
      this.router.navigate(['/guia', n.path]);
    }
    this.selected.emit(n);
  }
}