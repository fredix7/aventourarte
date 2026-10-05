export type FactoryQaSeverity = 'BLOCKER' | 'ERROR' | 'WARNING' | 'INFO';

export type FactoryQaStatus =
  | 'RECHAZADA'
  | 'REQUIERE_CORRECCIONES'
  | 'LISTA_CON_AVISOS'
  | 'APROBADA';

export interface FactoryQaIssue {
  severity: FactoryQaSeverity;
  detail: string;
  location?: string;
  item?: string;
  category?: string;
}

export interface FactoryQaCounts {
  blockers: number;
  errors: number;
  warnings: number;
  info: number;
}

export interface FactoryQaResult {
  status: FactoryQaStatus;
  counts: FactoryQaCounts;
  issues: FactoryQaIssue[];
}

export function buildFactoryQaResult(issues: readonly FactoryQaIssue[]): FactoryQaResult {
  const counts: FactoryQaCounts = { blockers: 0, errors: 0, warnings: 0, info: 0 };

  for (const issue of issues) {
    switch (issue.severity) {
      case 'BLOCKER': counts.blockers += 1; break;
      case 'ERROR': counts.errors += 1; break;
      case 'WARNING': counts.warnings += 1; break;
      case 'INFO': counts.info += 1; break;
    }
  }

  const status: FactoryQaStatus = counts.blockers > 0 ? 'RECHAZADA'
    : counts.errors > 0 ? 'REQUIERE_CORRECCIONES'
    : counts.warnings > 0 ? 'LISTA_CON_AVISOS'
    : 'APROBADA';

  return { status, counts, issues: [...issues] };
}
