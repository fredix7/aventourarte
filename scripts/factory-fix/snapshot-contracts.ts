import type { SourceIdentity } from './contracts';

// Version 2 distinguishes signed finite numbers, including negative zero.
export const SNAPSHOT_SCHEMA_VERSION = 2;
export const READ_LIMITS = Object.freeze({
  maxDepth: 64, maxArrayElements: 10000, maxObjectProperties: 1000,
  maxStringLength: 2 * 1024 * 1024, maxNodes: 50000, maxTotalStringLength: 4 * 1024 * 1024
});

export type StaticScalar = string | number | boolean | null;
export type NodeKind = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';
export type LocationStep = { readonly property: string } | { readonly element: number };
export type StructuralLocation = readonly LocationStep[];
// UTF-16 offsets into the decoded source (including BOM); contextEnd ends at the next sibling/container.
// Trivia/separator ranges are observations, not ownership rules for future mutations.
export interface SourceSpan {
  readonly fullStart: number; readonly start: number; readonly end: number; readonly contextEnd: number;
}
export interface Discriminator { readonly property: string; readonly value: StaticScalar }
interface NodeBase {
  readonly location: StructuralLocation;
  readonly parentLocation: StructuralLocation | null;
  readonly observedIndex: number | null;
  readonly span: SourceSpan;
  readonly fingerprint: string;
  readonly discriminators: readonly Discriminator[];
}
export type GuideNode = NodeBase & (
  | { readonly nodeKind: 'string' | 'number' | 'boolean' | 'null'; readonly value: StaticScalar }
  | { readonly nodeKind: 'object'; readonly properties: readonly {
    readonly name: string; readonly node: GuideNode; readonly span: SourceSpan;
  }[] }
  | { readonly nodeKind: 'array'; readonly elements: readonly GuideNode[] }
);
export interface GuideSnapshot {
  readonly snapshotSchemaVersion: typeof SNAPSHOT_SCHEMA_VERSION;
  readonly snapshotId: string;
  readonly sourceIdentity: SourceIdentity;
  readonly sourceHash: string;
  readonly root: GuideNode;
  readonly nodes: readonly GuideNode[];
}
export interface NodeIdentityRef {
  readonly snapshotId: string;
  readonly targetId: string;
  readonly nodeKind: NodeKind;
  readonly location: StructuralLocation;
  readonly fingerprint: string;
}
export type TargetType = 'root' | 'root-property' | 'object-property' | 'array-element' | 'collection';
export interface ResolvedTargetRef extends NodeIdentityRef {
  readonly targetType: TargetType;
  readonly parent: NodeIdentityRef | null;
  readonly containerFingerprint: string | null;
  readonly observedIndex: number | null;
  readonly discriminators: readonly Discriminator[];
  readonly span: SourceSpan;
  readonly parentSpan: SourceSpan | null;
  readonly propertySpan: SourceSpan | null;
}
export interface ElementSelector {
  readonly discriminators: readonly Discriminator[];
  readonly fingerprint: string | null;
  readonly observedIndex: number | null;
}
interface LocatorBase {
  readonly snapshotSchemaVersion: typeof SNAPSHOT_SCHEMA_VERSION;
  readonly snapshotId: string;
  readonly expectedKind: NodeKind;
  readonly expectedFingerprint: string | null;
}
// Resolution/shape validation never grants editorial permission. Only a trusted preparer
// may place a locator in a future authorization manifest (outside Phase 2).
export type TargetLocator = LocatorBase & (
  | { readonly targetType: 'root'; readonly parent: null; readonly containerFingerprint: null }
  | { readonly targetType: 'root-property' | 'object-property' | 'collection';
    readonly parent: NodeIdentityRef; readonly containerFingerprint: string; readonly property: string }
  | { readonly targetType: 'array-element'; readonly parent: NodeIdentityRef;
    readonly containerFingerprint: string; readonly selector: ElementSelector }
);
