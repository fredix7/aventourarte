import { buildFactoryQaResult, FactoryQaIssue } from './guide-factory-qa';

describe('buildFactoryQaResult', () => {
  it('approves an empty issue list with zero counts', () => {
    expect(buildFactoryQaResult([])).toEqual({
      status: 'APROBADA',
      counts: { blockers: 0, errors: 0, warnings: 0, info: 0 },
      issues: []
    });
  });

  it('approves a result containing only informational issues', () => {
    expect(buildFactoryQaResult([
      { severity: 'INFO', detail: 'Observation' }
    ]).status).toBe('APROBADA');
  });

  it('reports warnings when no blocker or error exists', () => {
    expect(buildFactoryQaResult([
      { severity: 'WARNING', detail: 'Needs review' }
    ]).status).toBe('LISTA_CON_AVISOS');
  });

  it('requires corrections when an error exists', () => {
    expect(buildFactoryQaResult([
      { severity: 'ERROR', detail: 'Needs correction' }
    ]).status).toBe('REQUIERE_CORRECCIONES');
  });

  it('rejects a result containing a blocker', () => {
    expect(buildFactoryQaResult([
      { severity: 'BLOCKER', detail: 'Blocks approval' }
    ]).status).toBe('RECHAZADA');
  });

  it('prioritizes blockers over errors and warnings regardless of order', () => {
    const issues: FactoryQaIssue[] = [
      { severity: 'WARNING', detail: 'Warning' },
      { severity: 'BLOCKER', detail: 'Blocker' },
      { severity: 'ERROR', detail: 'Error' },
      { severity: 'INFO', detail: 'Information' }
    ];

    expect(buildFactoryQaResult(issues).status).toBe('RECHAZADA');
    expect(buildFactoryQaResult([...issues].reverse()).status).toBe('RECHAZADA');
  });

  it('prioritizes errors over warnings regardless of order', () => {
    const issues: FactoryQaIssue[] = [
      { severity: 'ERROR', detail: 'Error' },
      { severity: 'WARNING', detail: 'Warning' },
      { severity: 'INFO', detail: 'Information' }
    ];

    expect(buildFactoryQaResult(issues).status).toBe('REQUIERE_CORRECCIONES');
    expect(buildFactoryQaResult([...issues].reverse()).status).toBe('REQUIERE_CORRECCIONES');
  });

  it('counts every issue in all four severity levels', () => {
    const issues: FactoryQaIssue[] = [
      { severity: 'BLOCKER', detail: 'Blocker 1' },
      { severity: 'INFO', detail: 'Information 1' },
      { severity: 'WARNING', detail: 'Warning 1' },
      { severity: 'ERROR', detail: 'Error 1' },
      { severity: 'BLOCKER', detail: 'Blocker 2' },
      { severity: 'WARNING', detail: 'Warning 2' },
      { severity: 'WARNING', detail: 'Warning 3' },
      { severity: 'INFO', detail: 'Information 2' }
    ];

    expect(buildFactoryQaResult(issues).counts).toEqual({
      blockers: 2, errors: 1, warnings: 3, info: 2
    });
  });

  it('preserves issue order and optional details', () => {
    const issues: FactoryQaIssue[] = [
      { severity: 'INFO', detail: 'First', location: 'root', item: 'Example', category: 'content' },
      { severity: 'ERROR', detail: 'Second' },
      { severity: 'WARNING', detail: 'Third' }
    ];

    expect(buildFactoryQaResult(issues).issues).toEqual(issues);
  });

  it('does not mutate a frozen input array or its issues', () => {
    const issues: readonly FactoryQaIssue[] = Object.freeze([
      Object.freeze({ severity: 'WARNING' as const, detail: 'First' }),
      Object.freeze({ severity: 'BLOCKER' as const, detail: 'Second' })
    ]);
    const before = issues.map(issue => ({ ...issue }));

    const result = buildFactoryQaResult(issues);

    expect(issues).toEqual(before);
    expect(result.issues).toEqual(before);
    expect(result.issues).not.toBe(issues);
    result.issues.pop();
    expect(issues).toEqual(before);
  });
});
