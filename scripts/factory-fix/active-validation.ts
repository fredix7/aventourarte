import type { FactoryReviewContext } from '../../src/app/shared/guide-factory-context';
import {
  validateSpanishMunicipalSectionOrder, validateSpanishMunicipalForbiddenImagesScoped,
  validateSpanishMunicipalVisitCardsScoped, validateSpanishMunicipalFestivalCardsScoped,
  validateSpanishMunicipalRestaurantEditorialBlocksScoped, validateGuideItineraryStructure,
  validateGastronomyFoodProfiles, validatePublishedInternalLanguage, validateGuideTechnicalUrls,
  validateGuideImageReferences
} from '../../src/app/shared/guide-factory-rules';
import type { FactoryQaIssue } from '../../src/app/shared/guide-factory-qa';
import { fail } from './errors';
import type { GuideNode, GuideSnapshot, StructuralLocation } from './snapshot-contracts';
import type { PreparedOperation } from './operations';
import { candidateLocation, changedLocation, readCandidateRoot } from './minimal-diff';
import { guideTree, type DataTree } from './static-data';

function plain(tree: DataTree): unknown {
  if (tree.kind === 'scalar') return tree.value;
  if (tree.kind === 'array') return Object.freeze(tree.elements.map(plain));
  const result: Record<string, unknown> = Object.create(null);
  tree.properties.forEach(p => { result[p.name] = plain(p.tree); }); return Object.freeze(result);
}
function locationText(location: StructuralLocation): string {
  // The core's QA location grammar cannot distinguish quoted dots/brackets from structure.
  // Refuse that projection instead of checking a different target or broadening validation.
  if (location.some(step => 'property' in step && !/^[A-Za-z_$][A-Za-z0-9_$]*(?![\s\S])/.test(step.property))) fail('ACTIVE_CONFLICT');
  return location.map((step, i) => 'element' in step ? '[' + step.element + ']'
    : (i ? '.' : '') + step.property).join('');
}
function context(locations: readonly StructuralLocation[]): Extract<FactoryReviewContext, { scope: 'targets' }> {
  const targets = [...new Set(locations.map(locationText))];
  if (targets.some(target => !/^[A-Za-z_$][A-Za-z0-9_$]*(?:\[\d+\]|\.[A-Za-z_$][A-Za-z0-9_$]*)*(?![\s\S])/.test(target))) fail('ACTIVE_CONFLICT');
  return Object.freeze({ scope: 'targets', targets: Object.freeze(targets) });
}
function nodeAt(root: GuideNode, location: StructuralLocation): GuideNode | undefined {
  let node: GuideNode | undefined = root;
  for (const step of location) node = 'property' in step ? node?.nodeKind === 'object'
    ? node.properties.find(p => p.name === step.property)?.node : undefined
    : node?.nodeKind === 'array' ? node.elements[step.element] : undefined;
  return node;
}
// Existing QA tolerates malformed historical rows. Newly materialized cards must be
// records before those scoped validators can inspect them. No additional fields are required.
function checkAddedCards(node: GuideNode, location: StructuralLocation): void {
  const top = location[0], last = location.at(-1), parent = location.at(-2);
  const inSection = top && 'property' in top && top.property === 'secciones';
  const isCard = inSection && last && 'element' in last && parent && 'property' in parent
    && ['lugares', 'platos'].includes(parent.property);
  const isCards = inSection && last && 'property' in last && ['lugares', 'platos'].includes(last.property);
  if (isCard && node.nodeKind !== 'object' || isCards && node.nodeKind !== 'array') fail('ACTIVE_CONFLICT');
  if (node.nodeKind === 'object') node.properties.forEach(p => checkAddedCards(p.node, [...location, { property: p.name }]));
  if (node.nodeKind === 'array') node.elements.forEach((element, i) => checkAddedCards(element, [...location, { element: i }]));
}
export function validateActiveCandidate(snapshot: GuideSnapshot, candidateText: string, prepared: readonly PreparedOperation[]) {
  const root = readCandidateRoot(snapshot, candidateText), data = plain(guideTree(root));
  const exact: StructuralLocation[] = [], structures: StructuralLocation[] = [], itineraries: StructuralLocation[] = [];
  const itineraryMembership: StructuralLocation[] = [];
  const restaurantRoles: { initial: StructuralLocation; candidate: StructuralLocation }[] = [];
  const collections: StructuralLocation[] = [], imageProperties: StructuralLocation[] = [];
  let municipalStructure = false;
  for (const item of prepared) {
    const op = item.operation, final = changedLocation(item, prepared);
    const parent = item.parent ? candidateLocation(item.parent.location, prepared) : null;
    if (final && (op.type === 'ADD_PROPERTY' || op.type === 'ADD_ELEMENT')) checkAddedCards(nodeAt(root, final)!, final);
    if (final) exact.push(final);
    else if (op.type === 'REMOVE_PROPERTY') {
      // Removed field stays in the validator's selection so required fields can be diagnosed.
      if (parent) exact.push(Object.freeze([...parent, item.node.location.at(-1)!]));
    }
    const directStructure = op.type === 'ADD_PROPERTY' ? candidateLocation(item.node.location, prepared)
      : op.type === 'ADD_ELEMENT' ? final : null;
    if (directStructure && directStructure.length) structures.push(directStructure);
    const path = item.node.location;
    const top = path[0], last = path.at(-1);
    if (path.length === 3 && top && 'property' in top && top.property === 'secciones'
      && last && 'property' in last && last.property === 'titulo' && parent) {
      structures.push(parent);
      if (op.type === 'UPDATE_VALUE') restaurantRoles.push({ initial: item.parent!.location, candidate: parent });
    }
    if (op.type === 'ADD_PROPERTY' && path.length === 2 && top && 'property' in top
      && top.property === 'secciones' && op.propertyName === 'titulo') {
      restaurantRoles.push({ initial: path, candidate: candidateLocation(path, prepared)! });
    }
    const collection = op.type === 'REMOVE_ELEMENT' ? item.parent : ['ADD_ELEMENT', 'REORDER_ELEMENTS'].includes(op.type) ? item.node : null;
    const collectionKey = collection?.location.at(-1);
    if (collection && collectionKey && 'property' in collectionKey) {
      const location = candidateLocation(collection.location, prepared)!;
      if (collectionKey.property === 'tiposPlan') collections.push(location);
      if (collectionKey.property === 'fotos') imageProperties.push(location);
    }
    if (op.type === 'ADD_PROPERTY' && (path.length === 0 && op.propertyName === 'secciones'
      || path.length === 2 && top && 'property' in top && top.property === 'secciones' && op.propertyName === 'titulo')) municipalStructure = true;
    if (top && 'property' in top && top.property === 'secciones') {
      if (path.length === 1 && ['ADD_ELEMENT', 'REORDER_ELEMENTS', 'REMOVE_PROPERTY'].includes(op.type)
        || path.length === 2 && op.type === 'REMOVE_ELEMENT'
        || path.length === 3 && last && 'property' in last && last.property === 'titulo') municipalStructure = true;
    }
    // Profile internals must be checked as one existing profile, without broadening write scope.
    const profileIndex = path.findIndex(step => 'property' in step && step.property === 'perfilAlimentario');
    if (profileIndex >= 0) structures.push(candidateLocation(path.slice(0, profileIndex), prepared)!);
    const zoneIndex = path.findIndex(step => 'property' in step && step.property === 'zonas');
    if (zoneIndex >= 0 && op.type === 'REMOVE_ELEMENT' && path.length === zoneIndex + 2) {
      // Membership can break the collection's nonempty invariant, not retained sibling fields.
      itineraryMembership.push(candidateLocation(path.slice(0, zoneIndex + 1), prepared)!);
    }
    if (op.type === 'ADD_ELEMENT' && final && last && 'property' in last && last.property === 'itinerario') itineraries.push(final);
    // Reordering a full array cannot change old member content. Transverse validation therefore
    // selects no old siblings; municipal section order is the global invariant it can break.
    if (op.type === 'REORDER_ELEMENTS') exact.pop();
  }
  const exactContext = context(exact), structuralContext = context([...exact, ...structures, ...collections]);
  const itineraryContext = context([...exact, ...structures, ...itineraries, ...collections]);
  const issues: FactoryQaIssue[] = [
    ...validatePublishedInternalLanguage(data, exactContext), ...validateGuideTechnicalUrls(data, exactContext),
    ...validateGuideImageReferences(data, exactContext),
    ...validateGastronomyFoodProfiles(data, structuralContext)
  ];
  if (snapshot.sourceIdentity.ruleSet === 'spanish-municipal') {
    issues.push(...validateSpanishMunicipalForbiddenImagesScoped(data, context([...exact, ...structures, ...imageProperties])),
      ...validateSpanishMunicipalVisitCardsScoped(data, structuralContext),
      ...validateSpanishMunicipalFestivalCardsScoped(data, structuralContext),
      ...validateSpanishMunicipalRestaurantEditorialBlocksScoped(data, exactContext));
    // A title can activate the restaurant rule. Compare core diagnostics, without duplicating
    // its role/marker grammar or requiring repair of unchanged debt when the role stays the same.
    const original = restaurantRoles.length ? plain(guideTree(snapshot.root)) : null;
    for (const role of restaurantRoles) {
      const previous = validateSpanishMunicipalRestaurantEditorialBlocksScoped(original, context([role.initial]));
      const before = locationText(role.initial), after = locationText(role.candidate);
      issues.push(...validateSpanishMunicipalRestaurantEditorialBlocksScoped(data, context([role.candidate]))
        .filter(issue => !previous.some(old => old.detail === issue.detail && old.location !== undefined
          && issue.location !== undefined && old.location.slice(before.length) === issue.location.slice(after.length))));
    }
    if (municipalStructure) issues.push(...validateSpanishMunicipalSectionOrder(data));
  } else {
    issues.push(...validateGuideItineraryStructure(data, itineraryContext));
    const membershipContext = context(itineraryMembership);
    issues.push(...validateGuideItineraryStructure(data, membershipContext)
      .filter(issue => issue.location !== undefined && membershipContext.targets.includes(issue.location)));
  }
  // No Factory QA result/status is produced: this is only the existing automated normative subset.
  const findings = Object.freeze(issues.map(issue => Object.freeze({ category: issue.category ?? 'active',
    location: issue.location ?? '', detail: issue.detail })));
  if (findings.length) fail('ACTIVE_CONFLICT');
  return Object.freeze({ status: 'VALID' as const, findings, validationTargets: Object.freeze({
    properties: exactContext.targets, structures: structuralContext.targets, itinerary: itineraryContext.targets,
    municipalSectionOrder: municipalStructure && snapshot.sourceIdentity.ruleSet === 'spanish-municipal'
  }), coverage: 'existing-automated-ACTIVE-validators' as const });
}
