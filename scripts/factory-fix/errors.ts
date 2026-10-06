export const SOURCE_IDENTITY_ERROR_CODES = [
  'INVALID_INPUT', 'GUIDE_NOT_FOUND', 'DUPLICATE_GUIDE_PATH',
  'CATALOG_NOT_FOUND', 'CATALOG_UNSUPPORTED', 'CATALOG_IMPORT_MISSING',
  'CATALOG_IMPORT_AMBIGUOUS', 'IMPORT_PATH_UNSAFE', 'SOURCE_NOT_FOUND',
  'SOURCE_UNSUPPORTED', 'EXPORT_NOT_FOUND', 'EXPORT_AMBIGUOUS',
  'PATH_NOT_STATIC', 'PATH_MISMATCH', 'RULESET_UNSUPPORTED', 'READ_FAILED',
  'SOURCE_STALE', 'GUIDE_ROOT_UNSUPPORTED', 'STATIC_VALUE_UNSUPPORTED',
  'TARGET_NOT_FOUND', 'TARGET_AMBIGUOUS', 'TARGET_KIND_MISMATCH', 'TARGET_STALE',
  'DUPLICATE_TARGET_REF', 'SNAPSHOT_INVALID', 'LOCATOR_INVALID', 'SNAPSHOT_LIMIT_EXCEEDED'
] as const;

export type SourceIdentityErrorCode = typeof SOURCE_IDENTITY_ERROR_CODES[number];

export class SourceIdentityError extends Error {
  constructor(readonly code: SourceIdentityErrorCode) {
    super(`Factory source identity: ${code}.`);
    this.name = 'SourceIdentityError';
  }
}

export function fail(code: SourceIdentityErrorCode): never {
  throw new SourceIdentityError(code);
}
