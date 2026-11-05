import { ChangeDetectionStrategy, Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PhoneContactComponent } from '../phone-contact/phone-contact.component';
import { parsePhoneContact } from '../../shared/phone-contact';
import { AnalyticsService } from '../../shared/analytics.service';
import { MeasureLinkDirective } from '../../shared/measure-link.directive';

interface PracticalAction {
  label: string;
  icon: string;
  href: string;
  kind: 'maps' | 'web' | 'booking';
  external: boolean;
  primary: boolean;
}

interface PracticalFact { label: string; icon: string; value: string; }

@Component({
  selector: 'app-practical-info',
  standalone: true,
  imports: [CommonModule, MatIconModule, PhoneContactComponent, MeasureLinkDirective],
  templateUrl: './practical-info.component.html',
  styleUrls: ['./practical-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-empty]': '!hasContent' }
})
export class PracticalInfoComponent implements OnChanges {
  @Input() item: any = null;
  @Input() mapHref = '';
  private readonly analytics = inject(AnalyticsService);
  actions: PracticalAction[] = [];
  mapActions: PracticalAction[] = [];
  bookingActions: PracticalAction[] = [];
  websiteActions: PracticalAction[] = [];
  facts: PracticalFact[] = [];
  name = '';
  address = '';
  telephone = '';
  reservationPhone = '';
  hasContent = false;
  hasContact = false;

  ngOnChanges(): void {
    const item = this.item ?? {};
    this.name = this.text(item.nombre);
    this.address = this.text(item.direccion);
    this.telephone = this.text(item.telefono);
    this.actions = [];
    this.facts = [];
    this.reservationPhone = '';
    const web = this.webUrl(item.web);
    const booking = this.webUrl(item.reserva);
    const emailBooking = this.emailReservationUrl(item.reserva);
    const map = this.mapUrl(this.mapHref);
    const sameWebsite = Boolean(web && booking && this.comparable(web) === this.comparable(booking));

    if (map) this.actions.push({ label: 'Cómo llegar', icon: 'near_me', href: map, kind: 'maps', external: /^https?:/i.test(map), primary: false });
    if (web && !sameWebsite) this.actions.push({ label: 'Web oficial', icon: 'language', href: web, kind: 'web', external: true, primary: false });
    if (booking) this.actions.push({ label: sameWebsite ? 'Web y reservas' : 'Reservar', icon: 'confirmation_number', href: booking, kind: 'booking', external: true, primary: true });
    if (emailBooking) this.actions.push({ label: 'Reservar por correo', icon: 'mail', href: emailBooking, kind: 'booking', external: false, primary: true });

    const reservation = this.text(item.reserva);
    if (/^tel:[+\d\s().-]+$/i.test(reservation)) {
      const contacts = parsePhoneContact(reservation.slice(4)).flatMap(group => group.entries);
      const href = contacts.length === 1 ? contacts[0].href : null;
      if (href) {
        const alreadyVisible = parsePhoneContact(this.telephone).some(group => group.entries.some(entry => entry.href === href));
        if (alreadyVisible) this.reservationPhone = href;
        else this.actions.push({ label: 'Reservar por teléfono', icon: 'call', href, kind: 'booking', external: false, primary: true });
      }
    }

    const addFact = (label: string, icon: string, value: unknown) => {
      const text = this.text(value);
      if (text) this.facts.push({ label, icon, value: text });
    };
    addFact('Horarios', 'schedule', item.horario);
    addFact('Precios', 'payments', item.precio);
    addFact('Precio orientativo', 'payments', item.precioOrientativo);
    addFact('Acceso y condiciones', 'badge', item.acceso);
    addFact('Fechas', 'event', item.fecha);
    if (this.text(item.web) && !web) addFact('Web', 'language', item.web);
    if (reservation && !booking && !this.reservationPhone && !this.actions.some(action => action.kind === 'booking')) {
      addFact('Reservas', 'confirmation_number', reservation);
    }
    this.mapActions = this.actions.filter(action => action.kind === 'maps');
    this.bookingActions = this.actions.filter(action => action.kind === 'booking');
    this.websiteActions = this.actions.filter(action => action.kind === 'web');
    this.hasContact = Boolean(this.address || this.telephone || this.actions.length);
    this.hasContent = this.hasContact || this.facts.length > 0;
  }

  measurePhoneReservation(): void {
    this.analytics.action('outbound', { kind: 'booking' });
  }

  actionLabel(action: PracticalAction): string {
    const label = action.label === 'Reservar por teléfono' ? 'Llamar para reservar' : action.label;
    return `${label}${this.name ? ': ' + this.name : ''}${action.external ? ' (se abre en otra pestaña)' : ''}`;
  }

  private text(value: unknown): string {
    return typeof value === 'string' ? value.trim() : typeof value === 'number' && Number.isFinite(value) ? String(value) : '';
  }

  private webUrl(value: unknown): string {
    const text = this.text(value);
    if (!/^https?:\/\//i.test(text)) return '';
    try {
      const url = new URL(text);
      return url.username || url.password ? '' : url.href;
    } catch { return ''; }
  }

  private mapUrl(value: string): string {
    return this.webUrl(value) || (/^geo:-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?(?:\?[^\s]*)?$/i.test(value) ? value : '');
  }

  private emailReservationUrl(value: unknown): string {
    const text = this.text(value);
    if (!/^mailto:/i.test(text)) return '';
    try {
      const url = new URL(text);
      const recipient = decodeURIComponent(url.pathname);
      // Only a single recipient; reject malformed escapes and raw or encoded controls.
      if (url.hash || /[\u0000-\u001f\u007f]/.test(decodeURIComponent(text)) ||
          !/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(recipient)) return '';
      return url.href;
    } catch { return ''; }
  }

  private comparable(value: string): string {
    const url = new URL(value);
    return url.origin + url.pathname.replace(/\/+$/, '') + url.search + url.hash;
  }
}
