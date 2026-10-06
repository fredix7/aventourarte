import { isFactoryLocationInScope, type FactoryReviewContext } from '../../src/app/shared/guide-factory-context';
import { assertGuideSnapshot, getSnapshotNode } from './snapshot';
import type { GuideSnapshot, StructuralLocation } from './snapshot-contracts';
import { normalizeStaticData } from './static-data';
import { RESULT_LIMITS, QA_PREREQUISITES, freezeResult,
  type ChangedTarget, type CoverageReason, type RequiredQaHandoff } from './result-contracts';
import { PreparedResultError } from './result-classification';

// Structural tokens must each be representable in the core's actual grammar. Quoted keys,
// aliases and Unicode normalization cannot be encoded as invented dot paths.
export function qaTargetToken(location: StructuralLocation): string | null {
  if (!location.length) return null;
  let token = '';
  for (const step of location) {
    if (!step || typeof step !== 'object' || Object.keys(step).length !== 1) return null;
    if ('property' in step) {
      if (!/^[A-Za-z_$][A-Za-z0-9_$]*(?![\s\S])/.test(step.property)) return null;
      token += (token ? '.' : '') + step.property;
    } else {
      if (!token || !Number.isSafeInteger(step.element) || step.element < 0) return null;
      token += `[${step.element}]`;
    }
  }
  return isFactoryLocationInScope({ scope: 'targets', targets: [token] }, token) ? token : null;
}
function propertyAt(location: StructuralLocation, i: number, name: string): boolean {
  return (location[i] as { property?: string } | undefined)?.property === name;
}
function textProperty(snapshot: GuideSnapshot, location: StructuralLocation, name: string): string | null {
  const node = getSnapshotNode(snapshot, location);
  if (node?.nodeKind !== 'object') return null;
  const value = node.properties.find(p => p.name === name)?.node;
  return value?.nodeKind === 'string' ? value.value as string : null;
}
function orderedCard(snapshot: GuideSnapshot, parent: StructuralLocation): boolean {
  if (snapshot.sourceIdentity.ruleSet !== 'spanish-municipal' || !propertyAt(parent, 0, 'secciones')) return false;
  const direct = parent.length === 4 && propertyAt(parent, 2, 'lugares');
  const subsection = parent.length === 6 && propertyAt(parent, 2, 'subsecciones') && propertyAt(parent, 4, 'lugares');
  if (!direct && !subsection) return false;
  const title = textProperty(snapshot, parent.slice(0, 2), 'titulo');
  // The core normalizes section roles for validator selection. Only that role is normalized;
  // target locations/indices and identity remain exact. Match its direct/immediate-subsection coverage.
  const role = title?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
  return !!role && (/^que visitar(?: en .+)?$/.test(role) || direct && role === 'fiestas y festivos principales');
}

// Pure recommendation only. This helper is not an authorization or PreparedFixResult factory.
export function deriveQaReviewContext(snapshot: GuideSnapshot, input: readonly ChangedTarget[]): {
  readonly reviewContext: FactoryReviewContext; readonly coverageReasons: readonly CoverageReason[] } {
  assertGuideSnapshot(snapshot);
  // Descriptor-only copy rejects accessors, cycles, functions and external mutable aliases.
  const changes = normalizeStaticData(input) as unknown as readonly ChangedTarget[];
  if (!changes.length) throw new PreparedResultError('QA_HANDOFF_INCONSISTENT');
  if (changes.length > RESULT_LIMITS.maxChangedTargets) throw new PreparedResultError('RESULT_LIMIT_EXCEEDED');
  const targets: string[] = [], reasons = new Set<CoverageReason>(); let fullGuide = false;
  for (const change of changes) {
    let location = change.candidateLocation;
    const before = change.originalLocation;
    if (change.kind === 'REORDER') { reasons.add('ORDER_CHANGED'); location = change.candidateContainerLocation; }
    else if (change.kind === 'ELEMENT_REMOVE') {
      reasons.add('COLLECTION_MEMBERSHIP_CHANGED'); location = change.candidateContainerLocation;
    } else if (change.kind === 'ELEMENT_ADD') {
      reasons.add('COLLECTION_MEMBERSHIP_CHANGED');
      if (change.candidateNodeKind === 'object') reasons.add('NEW_REVIEWED_CARD');
      else location = change.candidateContainerLocation; // e.g. tiposPlan validates the collection, not its scalar.
    } else {
      reasons.add('PROPERTY_CHANGED');
      if (change.kind === 'PROPERTY_REMOVE' && before) {
        location = [...change.candidateContainerLocation, before[before.length - 1]];
      }
    }
    const affected = before ?? location;
    // Municipal section order is deliberately a whole-guide core rule; scoped QA skips it.
    if (snapshot.sourceIdentity.ruleSet === 'spanish-municipal' && affected && propertyAt(affected, 0, 'secciones')
      && (affected.length <= 2 || affected.length === 3 && propertyAt(affected, 2, 'titulo'))) {
      fullGuide = true; reasons.add('SECTION_INVARIANT_AFFECTED');
    }
    if (location && location.length === 3 && propertyAt(location, 0, 'secciones') && propertyAt(location, 2, 'titulo')) {
      location = location.slice(0, 2); reasons.add('SECTION_INVARIANT_AFFECTED');
    }
    // Profile validation and approved property order require the card, not a property token.
    if (location) {
      const profileIndex = location.findIndex(step => 'property' in step && step.property === 'perfilAlimentario');
      if (profileIndex >= 0) { location = location.slice(0, profileIndex); reasons.add('CARD_INVARIANT_AFFECTED'); }
      if ((change.kind === 'PROPERTY_ADD' || change.kind === 'PROPERTY_REMOVE')
        && orderedCard(snapshot, change.originalContainerRef.location)) {
        location = change.candidateContainerLocation; reasons.add('CARD_INVARIANT_AFFECTED');
      }
    }
    const token = location && qaTargetToken(location);
    if (!token) { fullGuide = true; reasons.add('FALLBACK_FULL_GUIDE'); } else targets.push(token);
  }
  const unique = [...new Set(targets)].sort();
  // Delegate containment to the core. Never use string startsWith (index 2 is not index 20).
  const minimal = unique.filter(child => !unique.some(parent => parent !== child
    && isFactoryLocationInScope({ scope: 'targets', targets: [parent] }, child)));
  if (minimal.length > RESULT_LIMITS.maxQaTargets) throw new PreparedResultError('RESULT_LIMIT_EXCEEDED');
  const reviewContext: FactoryReviewContext = fullGuide ? { scope: 'guide' } : { scope: 'targets', targets: minimal };
  return freezeResult({ reviewContext, coverageReasons: [...reasons].sort() });
}
export function buildQaHandoff(snapshot: GuideSnapshot, changes: readonly ChangedTarget[], candidateHash: string): RequiredQaHandoff {
  assertGuideSnapshot(snapshot);
  if (!/^[a-f0-9]{64}(?![\s\S])/.test(candidateHash) || candidateHash === snapshot.sourceHash) {
    throw new PreparedResultError('QA_HANDOFF_INCONSISTENT');
  }
  const copiedChanges = normalizeStaticData(changes) as unknown as readonly ChangedTarget[];
  const coverage = deriveQaReviewContext(snapshot, copiedChanges);
  const identity = snapshot.sourceIdentity, binding = identity.catalogBinding;
  return freezeResult({ required: true, guidePath: identity.guidePath, ...coverage,
    changedOperationIds: [...new Set(copiedChanges.map(c => c.operationId))], expectedSourceHashAfterWrite: candidateHash,
    execute: 'ONLY_AFTER_CONFIRMED_WRITE', prerequisites: QA_PREREQUISITES,
    observedCatalogHash: binding.catalogHash, expectedSourceBinding: {
      sourcePath: identity.sourcePath, exportName: identity.exportName, moduleSpecifier: binding.moduleSpecifier,
      importedSymbol: binding.importedSymbol, localSymbol: binding.localSymbol, assignmentIndex: binding.assignmentIndex
    } });
}
