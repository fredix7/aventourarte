import { getFactoryGuide } from './guide-factory-catalog';
import { runFactoryQa } from './guide-factory-runner';
import type { FactoryQaRuleSet } from './guide-factory-runner';
import type { FactoryReviewContext } from './guide-factory-context';
import type { FactoryQaResult } from './guide-factory-qa';

export interface FactoryQaExecution {
  readonly path: string;
  readonly ruleSet: FactoryQaRuleSet;
  readonly result: FactoryQaResult;
}

/** Resuelve un path exacto y delega el alcance y las reglas al runner. */
export function executeFactoryQa(
  path: string,
  context: FactoryReviewContext
): FactoryQaExecution | undefined {
  const entry = getFactoryGuide(path);
  if (entry === undefined) return undefined;

  const result = runFactoryQa(entry.guide, context, entry.ruleSet);
  return { path: entry.path, ruleSet: entry.ruleSet, result };
}
