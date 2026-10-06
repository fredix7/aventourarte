import { fail } from './errors';
import { digest, locationKey, locationTuple } from './fingerprint';
import { readResolvedGuideSource } from './source-identity';
import { hasExactKeys } from './validation';
import { readStaticGuideRoot } from './static-value';
import {
  SNAPSHOT_SCHEMA_VERSION, type GuideNode, type GuideSnapshot, type StructuralLocation
} from './snapshot-contracts';
import type { SourceIdentity } from './contracts';

const indexes = new WeakMap<GuideSnapshot, ReadonlyMap<string, GuideNode>>();

export function nodeTargetId(snapshotId: string, node: GuideNode): string {
  return digest(['target', SNAPSHOT_SCHEMA_VERSION, snapshotId, locationTuple(node.location), node.fingerprint]);
}

export function buildGuideSnapshot(input: {
  readonly repoRoot: string; readonly sourceIdentity: SourceIdentity;
}): GuideSnapshot {
  if (!hasExactKeys(input, ['repoRoot', 'sourceIdentity'])) fail('INVALID_INPUT');
  const { sourceFile, root: astRoot } = readResolvedGuideSource(input);
  const root = readStaticGuideRoot(astRoot, sourceFile);
  if (root.nodeKind !== 'object') fail('GUIDE_ROOT_UNSUPPORTED');
  const identity = input.sourceIdentity, binding = identity.catalogBinding;
  const snapshotId = digest(['guide-snapshot', SNAPSHOT_SCHEMA_VERSION,
    [identity.guidePath, identity.sourcePath, identity.exportName, identity.ruleSet, identity.sourceHash],
    [binding.catalogPath, binding.catalogHash, binding.moduleSpecifier, binding.importedSymbol,
      binding.localSymbol, binding.assignmentIndex, binding.ruleSet, binding.declaredGuidePath], root.fingerprint]);
  const nodes: GuideNode[] = [];
  const index = new Map<string, GuideNode>();
  const ids = new Set<string>();
  const visit = (node: GuideNode): void => {
    const key = locationKey(node.location), id = nodeTargetId(snapshotId, node);
    if (index.has(key) || ids.has(id)) fail('DUPLICATE_TARGET_REF');
    index.set(key, node); ids.add(id); nodes.push(node);
    if (node.nodeKind === 'object') node.properties.forEach(property => visit(property.node));
    if (node.nodeKind === 'array') node.elements.forEach(visit);
  };
  visit(root);
  const snapshot: GuideSnapshot = Object.freeze({ snapshotSchemaVersion: SNAPSHOT_SCHEMA_VERSION,
    snapshotId, sourceIdentity: identity, sourceHash: identity.sourceHash, root, nodes: Object.freeze(nodes) });
  indexes.set(snapshot, index);
  return snapshot;
}

// Internal lookups only accept host-built immutable snapshots, never a deserialized lookalike.
export function assertGuideSnapshot(value: unknown): asserts value is GuideSnapshot {
  if (typeof value !== 'object' || value === null || !indexes.has(value as GuideSnapshot)) {
    fail('SNAPSHOT_INVALID');
  }
}
export function getSnapshotNode(snapshot: GuideSnapshot, location: StructuralLocation): GuideNode | undefined {
  assertGuideSnapshot(snapshot);
  return indexes.get(snapshot)?.get(locationKey(location));
}
