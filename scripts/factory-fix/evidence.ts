import { fail } from './errors';
import { record, identifier, boundedText, strings, list } from './authorization-data';
import { AUTHORIZATION_LIMITS, type EvidenceBinding, type AuthorizedAction } from './authorization-contracts';
import type { GuideSnapshot, ResolvedTargetRef } from './snapshot-contracts';
import { verifyResolvedTarget } from './target-locator';
import { operationRef, sameRef } from './modification-scope';

export function normalizeEvidence(snapshot: GuideSnapshot, input: unknown): readonly EvidenceBinding[] {
  const ids = new Set<string>();
  return Object.freeze(list(input, AUTHORIZATION_LIMITS.maxEvidenceBindings).map(value => {
    const item = record(value, ['evidenceId', 'actionKey', 'targetRef', 'origin', 'provenanceReference',
      'entity', 'field', 'material', 'findingStatus', 'limitations', 'sourceReferences', 'observedAt']);
    const evidenceId = identifier(item['evidenceId']), actionKey = identifier(item['actionKey']);
    if (ids.has(evidenceId)) fail('AUTHORIZATION_INVALID'); ids.add(evidenceId);
    if (!['Researcher', 'suppliedFact', 'userEvidence'].includes(item['origin'] as string)
      || item['findingStatus'] !== null && !['CONFIRMED', 'SUPPORTED', 'CONFLICTING', 'UNRESOLVED'].includes(item['findingStatus'] as string)
      || item['origin'] !== 'Researcher' && item['findingStatus'] !== null) fail('AUTHORIZATION_INVALID');
    return Object.freeze({ evidenceId, actionKey,
      targetRef: verifyResolvedTarget({ currentSnapshot: snapshot, targetRef: item['targetRef'] as ResolvedTargetRef }),
      origin: item['origin'] as EvidenceBinding['origin'], provenanceReference: boundedText(item['provenanceReference']),
      entity: boundedText(item['entity']), field: item['field'] === null ? null : boundedText(item['field']),
      material: boundedText(item['material'], AUTHORIZATION_LIMITS.maxEvidenceText),
      findingStatus: item['findingStatus'] as EvidenceBinding['findingStatus'],
      limitations: strings(item['limitations'], AUTHORIZATION_LIMITS.maxReferences),
      sourceReferences: strings(item['sourceReferences'], AUTHORIZATION_LIMITS.maxReferences),
      observedAt: item['observedAt'] === null ? null : boundedText(item['observedAt']) });
  }));
}
export function checkEvidence(action: AuthorizedAction, selected: readonly string[], bindings: readonly EvidenceBinding[]): void {
  for (const id of selected) {
    const binding = bindings.find(item => item.evidenceId === id);
    if (!binding) fail('EVIDENCE_UNKNOWN');
    if (!action.evidencePolicy.allowedIds.includes(id) || binding.actionKey !== action.actionKey
      || !sameRef(binding.targetRef, operationRef(action.operation))) fail('EVIDENCE_NOT_ALLOWED');
  }
  if (selected.length < action.evidencePolicy.minimum) fail('EVIDENCE_REQUIRED');
}
