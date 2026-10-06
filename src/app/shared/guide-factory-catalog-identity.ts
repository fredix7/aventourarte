import { listFactoryGuides } from './guide-factory-catalog';

export interface FactoryGuideIdentity {
  readonly path: string;
  readonly name: string | null;
}

type NamedFactoryGuideIdentity = FactoryGuideIdentity & { readonly name: string };

export type FactoryGuideNameResolution =
  | { readonly resolution: 'MATCH'; readonly entry: NamedFactoryGuideIdentity }
  | { readonly resolution: 'AMBIGUOUS'; readonly candidates: readonly NamedFactoryGuideIdentity[] }
  | { readonly resolution: 'NOT_FOUND' };

export function projectFactoryGuideIdentity(
  entry: { readonly path: string; readonly guide: unknown }
): FactoryGuideIdentity {
  const guide = entry.guide;
  const name = typeof guide === 'object' && guide !== null && !Array.isArray(guide)
    && Object.prototype.hasOwnProperty.call(guide, 'nombre')
    ? (guide as Record<string, unknown>)['nombre'] : undefined;

  return { path: entry.path, name: typeof name === 'string' && name.trim() ? name : null };
}

export function listFactoryGuideIdentities(): readonly FactoryGuideIdentity[] {
  return listFactoryGuides().map(projectFactoryGuideIdentity);
}

function comparisonKey(name: string): string {
  return name.trim().normalize('NFC').toLowerCase().normalize('NFC');
}

export function resolveFactoryGuideNameFromIdentities(
  name: string,
  identities: readonly FactoryGuideIdentity[]
): FactoryGuideNameResolution {
  if (typeof name !== 'string' || !name.trim()) {
    throw new TypeError('La resolución Factory requiere un nombre string no vacío.');
  }

  const key = comparisonKey(name);
  const candidates = identities.filter((identity): identity is NamedFactoryGuideIdentity =>
    typeof identity.name === 'string' && comparisonKey(identity.name) === key
  ).map(identity => ({ path: identity.path, name: identity.name }));

  if (candidates.length === 0) return { resolution: 'NOT_FOUND' };
  if (candidates.length === 1) return { resolution: 'MATCH', entry: candidates[0] };
  return { resolution: 'AMBIGUOUS', candidates };
}

export function resolveFactoryGuideName(name: string): FactoryGuideNameResolution {
  return resolveFactoryGuideNameFromIdentities(name, listFactoryGuideIdentities());
}
