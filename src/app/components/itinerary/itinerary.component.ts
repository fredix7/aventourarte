import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent {
  @Input() itinerary: any[] = [];

  // control simple para accordion por día (opcional)
  openDays = new Set<number>();

  toggleDay(i: number) {
    if (this.openDays.has(i)) this.openDays.delete(i);
    else this.openDays.add(i);
  }

  isOpen(i: number) {
    return this.openDays.has(i);
  }
}
