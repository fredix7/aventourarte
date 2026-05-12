import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TravelNode } from '../data/travel-data';
import { HeaderSubmenuComponent } from '../header-submenu.component/header-submenu.component';

interface QuickDestination {
  node: TravelNode;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderSubmenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() treeData: TravelNode[] = [];

  menuOpen = false;

  openContinentKey: string | null = null;

  readonly mobileQuickDestinations = [
    'EspaÃ±a',
    'Italia',
    'Portugal',
    'Brasil',
    'Estados Unidos',
  ];

  keyOf(n: any) {
    return n.path ?? n.nombre;
  }

  toggleContinent(key: string) {
    this.openContinentKey = (this.openContinentKey === key) ? null : key;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  get quickDestinations(): QuickDestination[] {
    return this.mobileQuickDestinations
      .map((name) => this.findNodeByName(this.treeData, name))
      .map((node) => {
        const path = node ? this.firstGuidePath(node) : null;
        return node && path ? { node, path } : null;
      })
      .filter((destination): destination is QuickDestination => Boolean(destination));
  }

  firstGuidePath(node: TravelNode): string | null {
    if (node.path) {
      return node.path;
    }

    for (const child of node.hijos ?? []) {
      const path = this.firstGuidePath(child);
      if (path) {
        return path;
      }
    }

    return null;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  private findNodeByName(nodes: TravelNode[], name: string): TravelNode | null {
    for (const node of nodes) {
      if (node.nombre === name) {
        return node;
      }

      const found = this.findNodeByName(node.hijos ?? [], name);
      if (found) {
        return found;
      }
    }

    return null;
  }
}
