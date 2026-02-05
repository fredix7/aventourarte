import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-general',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-general.component.html',
  styleUrls: ['./info-general.component.scss']
})
export class InfoGeneralComponent {
  @Input() infoGeneral!: {
    idioma?: string;
    moneda?: string;
    hora?: string;
    internet?: string;
    electricidad?: string;
    pasaporte?: string;
    visado?: string;
    vacunas?: string;
  };
}
