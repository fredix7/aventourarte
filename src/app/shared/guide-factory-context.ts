export type FactoryReviewContext =
  | { readonly scope: 'guide' }
  | { readonly scope: 'targets'; readonly targets: readonly string[] };

function parseLocation(location: unknown): string[] | null {
  if (typeof location !== 'string') return null;
  const match = /^[A-Za-z_$][A-Za-z0-9_$]*(?:\[\d+\]|\.[A-Za-z_$][A-Za-z0-9_$]*)*$/.exec(location);
  if (!match || match[0] !== location) return null;

  const tokens = location.match(/[A-Za-z_$][A-Za-z0-9_$]*|\[\d+\]/g);
  // Compara índices numéricos sin pérdida de precisión, incluso con ceros iniciales.
  return tokens?.map(token => token.replace(/^\[0+(?=\d)/, '[')) ?? null;
}

/** El alcance es explícito; esta función no consulta ni interpreta la guía. */
export function isFactoryLocationInScope(context: unknown, location: unknown): boolean {
  const locationTokens = parseLocation(location);
  if (!locationTokens || typeof context !== 'object' || context === null || Array.isArray(context)) {
    return false;
  }

  const candidate = context as Record<string, unknown>;
  if (candidate['scope'] === 'guide') return true;
  if (candidate['scope'] !== 'targets' || !Array.isArray(candidate['targets'])) return false;

  return candidate['targets'].some((target: unknown) => {
    const targetTokens = parseLocation(target);
    return targetTokens !== null && targetTokens.length <= locationTokens.length
      && targetTokens.every((token, index) => token === locationTokens[index]);
  });
}
