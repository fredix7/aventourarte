// Supported catalog grammar, shared as inert text. No fixture construction,
// caller paths, IO, registration or source-identity authority lives here.
export const CATALOG_SKELETON = `
import type { FactoryQaRuleSet } from './guide-factory-runner';
export interface FactoryGuideEntry {
  readonly path: string;
  readonly guide: unknown;
  readonly ruleSet: FactoryQaRuleSet;
}
const guideAssignments: readonly (readonly [unknown, FactoryQaRuleSet])[] = [];
const paths = new Set<string>();
const catalog: readonly FactoryGuideEntry[] = Object.freeze(guideAssignments.map(([guide, ruleSet]) => {
  const path = typeof guide === 'object' && guide !== null && !Array.isArray(guide)
    ? (guide as Record<string, unknown>)['path'] : undefined;
  if (typeof path !== 'string' || !path.trim()) {
    throw new Error('Cada guía del catálogo Factory debe declarar un path string no vacío.');
  }
  if (paths.has(path)) {
    throw new Error(\`El catálogo Factory contiene un path duplicado: \${path}\`);
  }
  paths.add(path);
  return Object.freeze({ path, guide, ruleSet });
}));
const guidesByPath = new Map(catalog.map(entry => [entry.path, entry]));
export function getFactoryGuide(path: string): FactoryGuideEntry | undefined {
  return guidesByPath.get(path);
}
export function listFactoryGuides(): readonly FactoryGuideEntry[] {
  return catalog;
}
`;
