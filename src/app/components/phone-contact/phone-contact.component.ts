import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { parsePhoneContact, PhoneContactEntry, PhoneContactGroup } from '../../shared/phone-contact';

@Component({
  selector: 'app-phone-contact',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './phone-contact.component.html',
  styleUrls: ['./phone-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-empty]': 'groups.length === 0' }
})
export class PhoneContactComponent implements OnChanges {
  @Input() value: unknown = '';
  @Input() name = '';
  @Input() embedded = false;
  @Input() reservationHref = '';
  @Output() reservationClick = new EventEmitter<void>();
  groups: PhoneContactGroup[] = [];
  phoneCount = 0;
  hasWhatsApp = false;

  ngOnChanges(): void {
    this.groups = parsePhoneContact(this.value);
    this.hasWhatsApp = this.groups.some(group => group.entries.some(entry => entry.channel === 'whatsapp'));
    this.phoneCount = this.groups.reduce(
      (count, group) => count + group.entries.filter(entry => entry.href).length, 0
    );
  }

  onPhoneClick(href: string | null): void {
    if (href && href === this.reservationHref) this.reservationClick.emit();
  }

  actionLabel(group: PhoneContactGroup, entry: PhoneContactEntry): string {
    const { number, note } = entry;
    const entity = /^whatsapp$/iu.test(group.label) ? this.name : group.label || this.name;
    if (entry.channel === 'whatsapp') {
      return `Enviar WhatsApp a ${entity ? entity + ' al ' : ''}${number}`;
    }
    const booking = this.reservationHref && this.groups.some(contact => contact.entries.some(
      entry => entry.number === number && entry.href === this.reservationHref
    ));
    return `${booking ? 'Llamar para reservar' : 'Llamar'}${entity ? ' a ' + entity : ''} al ${number}${note ? '. ' + note : ''}`;
  }
}
