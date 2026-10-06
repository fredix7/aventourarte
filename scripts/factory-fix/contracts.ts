import type { FactoryQaRuleSet } from '../../src/app/shared/guide-factory-runner';

export type { FactoryQaRuleSet } from '../../src/app/shared/guide-factory-runner';

export const FACTORY_CATALOG_PATH = 'src/app/shared/guide-factory-catalog.ts';
export const FACTORY_GUIDES_ROOT = 'src/app/guides';

export interface CatalogSourceBinding {
  readonly catalogPath: typeof FACTORY_CATALOG_PATH;
  readonly catalogHash: string;
  readonly moduleSpecifier: string;
  readonly importedSymbol: string;
  readonly localSymbol: string;
  readonly assignmentIndex: number;
  readonly ruleSet: FactoryQaRuleSet;
  readonly declaredGuidePath: string;
}

export interface SourceIdentity {
  readonly guidePath: string;
  readonly sourcePath: string;
  readonly exportName: string;
  readonly ruleSet: FactoryQaRuleSet;
  readonly sourceHash: string;
  readonly catalogBinding: CatalogSourceBinding;
}

export interface SourceIdentityRequest {
  readonly repoRoot: string;
  readonly guidePath: string;
}
