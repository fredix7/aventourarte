import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

import {
  auditGuideEditorial,
  EditorialAuditIssue,
  GuideEditorialAudit
} from '../../shared/guide-editorial-audit';

@Component({
  selector: 'app-guide-editorial-audit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guide-editorial-audit.component.html',
  styleUrls: ['./guide-editorial-audit.component.scss']
})
export class GuideEditorialAuditComponent implements OnChanges {
  @Input({ required: true }) guide: Record<string, any> | null = null;

  report: GuideEditorialAudit = auditGuideEditorial(null);

  ngOnChanges(): void {
    this.report = auditGuideEditorial(this.guide);
  }

  statusLabel(): string {
    if (this.report.status === 'blocked') return 'Requiere correcciones';
    if (this.report.status === 'ready-with-warnings') return 'Lista con avisos';
    return 'Sin bloqueos automáticos';
  }

  percentage(value: number, total: number): number {
    return total ? Math.round((value / total) * 100) : 100;
  }

  trackByIssue(_: number, issue: EditorialAuditIssue): string {
    return `${issue.location}:${issue.detail}`;
  }
}
