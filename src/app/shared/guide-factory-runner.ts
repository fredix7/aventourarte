import type { FactoryReviewContext } from './guide-factory-context';
import { isFactoryLocationInScope } from './guide-factory-context';
import type { FactoryQaIssue, FactoryQaResult } from './guide-factory-qa';
import { buildFactoryQaResult } from './guide-factory-qa';
import {
  validateSpanishMunicipalGuideRules,
  validateGastronomyFoodProfiles,
  validatePublishedInternalLanguage,
  validateGuideTechnicalUrls,
  validateGuideImageReferences
} from './guide-factory-rules';

export type FactoryQaRuleSet = 'generic' | 'spanish-municipal';

function assertReviewContext(value: unknown): asserts value is FactoryReviewContext {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError('Factory QA requiere un contexto de revisión explícito válido.');
  }
  const candidate = value as Record<string, unknown>;
  if (candidate['scope'] === 'guide') return;
  if (candidate['scope'] !== 'targets' || !Array.isArray(candidate['targets'])) {
    throw new TypeError('Factory QA requiere scope guide o targets con un array de targets.');
  }
  for (const target of candidate['targets']) {
    if (typeof target !== 'string'
      || !isFactoryLocationInScope({ scope: 'targets', targets: [target] }, target)) {
      throw new TypeError('Cada target debe ser una location válida de Factory QA.');
    }
  }
}

/** APROBADA se refiere solo a las reglas ejecutadas y al alcance recibido. */
export function runFactoryQa(
  guide: unknown,
  context: FactoryReviewContext,
  ruleSet: FactoryQaRuleSet
): FactoryQaResult {
  assertReviewContext(context);
  if (ruleSet !== 'generic' && ruleSet !== 'spanish-municipal') {
    throw new TypeError('Factory QA requiere un conjunto de reglas explícito válido.');
  }

  const issues: FactoryQaIssue[] = [];
  // El combinado municipal actual no respeta targets; solo se ejecuta para guía completa.
  if (ruleSet === 'spanish-municipal' && context.scope === 'guide') {
    issues.push(...validateSpanishMunicipalGuideRules(guide));
  }
  issues.push(
    ...validateGastronomyFoodProfiles(guide, context),
    ...validatePublishedInternalLanguage(guide, context),
    ...validateGuideTechnicalUrls(guide, context),
    ...validateGuideImageReferences(guide, context)
  );
  return buildFactoryQaResult(issues);
}
