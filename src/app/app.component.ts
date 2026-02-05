import { Component } from '@angular/core';
import { TravelNode, TRAVEL_TREE } from './data/travel-data';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  treeData: TravelNode[] = TRAVEL_TREE;
  selectedPlace: string = '';

  onSelected(node: TravelNode) {
    this.selectedPlace = node.nombre;
  }
}
