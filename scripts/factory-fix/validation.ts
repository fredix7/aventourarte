import * as ts from 'typescript';
import * as path from 'node:path';
import {
  FACTORY_CATALOG_PATH, FACTORY_GUIDES_ROOT,
  type CatalogSourceBinding, type FactoryQaRuleSet, type SourceIdentity, type SourceIdentityRequest
} from './contracts';
import { fail } from './errors';

export function hasExactKeys(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const ownKeys = Reflect.ownKeys(value);
  return ownKeys.length === keys.length && keys.every(key =>
    Object.prototype.hasOwnProperty.call(value, key)
    && Object.getOwnPropertyDescriptor(value, key)?.get === undefined
    && Object.getOwnPropertyDescriptor(value, key)?.set === undefined
  );
}

export function isGuidePath(value: unknown): value is string {
  return typeof value === 'string'
    && /^[\p{L}\p{M}\p{N}_-]+(?:\/[\p{L}\p{M}\p{N}_-]+)*(?![\s\S])/u.test(value);
}

export function isFactoryRuleSet(value: unknown): value is FactoryQaRuleSet {
  return value === 'generic' || value === 'spanish-municipal';
}

export function isSha256(value: unknown): value is string {
  return typeof value === 'string' && /^[a-f0-9]{64}(?![\s\S])/.test(value);
}

export function isExportName(value: unknown): value is string {
  if (typeof value !== 'string' || !/^[A-Za-z_$][A-Za-z0-9_$]*(?![\s\S])/.test(value)) return false;
  const scanner = ts.createScanner(ts.ScriptTarget.ES2022, true, ts.LanguageVariant.Standard, value);
  return scanner.scan() === ts.SyntaxKind.Identifier && scanner.scan() === ts.SyntaxKind.EndOfFileToken;
}

function isGuideModuleStem(value: string): boolean {
  return isGuidePath(value) && value.split('/').every(segment =>
    !/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(segment)
  );
}

export function isGuideModuleSpecifier(value: unknown): value is string {
  if (typeof value !== 'string' || !value.startsWith('../guides/') || !value.endsWith('.guide')) {
    return false;
  }
  return isGuideModuleStem(value.slice('../guides/'.length, -'.guide'.length));
}

export function isSourcePath(value: unknown): value is string {
  if (typeof value !== 'string' || !value.startsWith(`${FACTORY_GUIDES_ROOT}/`)
    || !value.endsWith('.guide.ts')) return false;
  return isGuideModuleStem(value.slice(FACTORY_GUIDES_ROOT.length + 1, -'.guide.ts'.length));
}

export function sourcePathFromModuleSpecifier(moduleSpecifier: string): string {
  if (!isGuideModuleSpecifier(moduleSpecifier)) fail('IMPORT_PATH_UNSAFE');
  return `${FACTORY_GUIDES_ROOT}/${moduleSpecifier.slice('../guides/'.length)}.ts`;
}

export function isCatalogSourceBinding(value: unknown): value is CatalogSourceBinding {
  if (!hasExactKeys(value, ['catalogPath', 'catalogHash', 'moduleSpecifier', 'importedSymbol',
    'localSymbol', 'assignmentIndex', 'ruleSet', 'declaredGuidePath'])) return false;
  return value['catalogPath'] === FACTORY_CATALOG_PATH && isSha256(value['catalogHash'])
    && isGuideModuleSpecifier(value['moduleSpecifier']) && isExportName(value['importedSymbol'])
    && isExportName(value['localSymbol']) && value['localSymbol'] === value['importedSymbol']
    && Number.isSafeInteger(value['assignmentIndex']) && typeof value['assignmentIndex'] === 'number'
    && value['assignmentIndex'] >= 0 && isFactoryRuleSet(value['ruleSet'])
    && isGuidePath(value['declaredGuidePath']);
}

// Shape and internal consistency only, not filesystem/provenance verification.
// Resolve from caller-trusted repoRoot + guidePath before treating external data as authoritative.
export function assertSourceIdentity(value: unknown): asserts value is SourceIdentity {
  if (!hasExactKeys(value, ['guidePath', 'sourcePath', 'exportName', 'ruleSet', 'sourceHash',
    'catalogBinding']) || !isGuidePath(value['guidePath']) || !isSourcePath(value['sourcePath'])
    || !isExportName(value['exportName']) || !isSha256(value['sourceHash'])
    || !isCatalogSourceBinding(value['catalogBinding'])) fail('INVALID_INPUT');
  if (!isFactoryRuleSet(value['ruleSet'])) fail('RULESET_UNSUPPORTED');
  const binding = value['catalogBinding'];
  if (value['guidePath'] !== binding.declaredGuidePath) fail('PATH_MISMATCH');
  if (value['ruleSet'] !== binding.ruleSet || value['exportName'] !== binding.importedSymbol
    || value['sourcePath'] !== sourcePathFromModuleSpecifier(binding.moduleSpecifier)) fail('INVALID_INPUT');
}

export function isSourceIdentity(value: unknown): value is SourceIdentity {
  try { assertSourceIdentity(value); return true; }
  catch { return false; }
}

export function isSourceIdentityRequest(value: unknown): value is SourceIdentityRequest {
  return hasExactKeys(value, ['repoRoot', 'guidePath']) && isGuidePath(value['guidePath'])
    && typeof value['repoRoot'] === 'string' && path.isAbsolute(value['repoRoot'])
    && !value['repoRoot'].includes('\0');
}
