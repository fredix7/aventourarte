import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ReaderReportService, REPORT_TYPES, ReportType } from '../../shared/reader-report.service';

@Component({
  selector: 'app-reader-report', standalone: true, imports: [CommonModule, FormsModule],
  templateUrl: './reader-report.component.html', styleUrls: ['./reader-report.component.scss'],
})
export class ReaderReportComponent implements OnChanges {
  @Input() guidePath = '';
  @Input() guideName = '';
  readonly reports = inject(ReaderReportService);
  readonly types = REPORT_TYPES;
  type: ReportType = 'suggestion';
  message = '';
  email = '';
  website = '';
  consent = false;
  busy = false;
  error = '';
  reference = '';
  previewReceipt = false;
  private revision = 0;

  ngOnChanges(): void {
    this.revision++;
    this.type = 'suggestion';
    this.message = this.email = this.website = this.error = this.reference = '';
    this.consent = this.busy = this.previewReceipt = false;
  }

  async submit(form: NgForm): Promise<void> {
    if (this.busy || this.reference) return;
    if (form.invalid || !this.consent || this.message.trim().length < 10) {
      form.control.markAllAsTouched();
      this.error = 'Escribe al menos 10 caracteres y acepta el tratamiento de tu aviso. Si añades correo, comprueba su formato.';
      return;
    }
    const revision = this.revision;
    this.busy = true;
    this.error = '';
    const result = await this.reports.submit({
      type: this.type, message: this.message, email: this.email,
      guidePath: this.guidePath, guideName: this.guideName,
      consent: this.consent, website: this.website,
    });
    if (revision !== this.revision) return;
    this.busy = false;
    if (result.ok) {
      this.reference = result.reference;
      this.previewReceipt = result.preview;
      this.message = this.email = '';
    } else this.error = result.message;
  }
}
