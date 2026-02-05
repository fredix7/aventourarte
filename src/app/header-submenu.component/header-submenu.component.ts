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

  constructor(private router: Router) {}

  selectNode(node: TravelNode) {
    if (!node.hijos || node.hijos.length === 0) {
      if (node.path) {
        this.router.navigate(['/guia', node.path]);
      }
      this.selected.emit(node);
    }
  }
}
