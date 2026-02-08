import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TravelNode } from '../data/travel-data';
import { HeaderSubmenuComponent } from '../header-submenu.component/header-submenu.component';

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

  keyOf(n: any) {
    return n.path ?? n.nombre;
  }

  toggleContinent(key: string) {
    this.openContinentKey = (this.openContinentKey === key) ? null : key;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
