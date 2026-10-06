import { createHash } from 'node:crypto';
import type { NodeIdentityRef, SourceSpan, StructuralLocation } from './snapshot-contracts';

// Canonical inputs are explicit ordered tuples, never arbitrary object enumeration.
export type CanonicalValue = string | number | boolean | null | readonly CanonicalValue[];
export function digest(value: CanonicalValue): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}
export function locationTuple(location: StructuralLocation): CanonicalValue {
  return location.map(step => 'property' in step ? ['property', step.property] : ['element', step.element]);
}
export function locationKey(location: StructuralLocation): string { return JSON.stringify(locationTuple(location)); }
export function identityTuple(ref: NodeIdentityRef): CanonicalValue {
  return [ref.snapshotId, ref.targetId, ref.nodeKind, locationTuple(ref.location), ref.fingerprint];
}
export function spanTuple(span: SourceSpan): CanonicalValue {
  return [span.fullStart, span.start, span.end, span.contextEnd];
}
