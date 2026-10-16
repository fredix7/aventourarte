import type { FixRequest } from './fixer-contracts';
import type { StaticData } from './static-data';
import { normalizeFixerData, serializeFixerData } from './fixer-json';
import { inferenceFail } from './inference-contracts';
import { operationRef } from './modification-scope';

// Provider subset reviewed in Phase 9C: strict objects, required properties, nested
// anyOf, enums; <=10 data levels, 5000 properties, 1000 enum values, 120000 key/enum chars.
// Conservative profile: homogeneous arrays only for exact array payloads. Other valid
// Factory requests are explicitly blocked, never coerced or sent with a relaxed schema.
type Schema = { [key: string]: StaticData };
export const FIX_CORRELATION_KEYS = ['schemaVersion', 'requestId', 'nonce', 'responseId', 'guidePath',
  'sourceHash', 'catalogHash', 'snapshotId', 'snapshotFingerprint', 'targetFingerprint',
  'actionFingerprint', 'evidenceFingerprint', 'requestFingerprint'] as const;
const object = (properties: Record<string, StaticData>): Schema => ({ type: 'object', properties,
  required: Object.keys(properties), additionalProperties: false });
const literal = (value: StaticData): Schema => {
  if (value === null) return { type: 'null' };
  if (typeof value !== 'object') {
    // JSON Schema numeric equality conflates both signs of zero. Neither exact +0
    // nor exact -0 is representable, including inside an object or array payload.
    // The existing Factory decoder and authorization retain signed-zero semantics.
    if (typeof value === 'number' && value === 0) inferenceFail('SCHEMA_UNREPRESENTABLE');
    return { type: typeof value, enum: [value] };
  }
  if (Array.isArray(value)) {
    const items = value.map(v => literal(v));
    if (items.some(s => serializeFixerData(s) !== serializeFixerData(items[0]))) inferenceFail('SCHEMA_UNREPRESENTABLE');
    return { type: 'array', items: items[0] ?? { type: 'null' }, minItems: value.length, maxItems: value.length };
  }
  return object(Object.fromEntries(Object.entries(value).map(([k, v]) => [k, literal(v)])));
};
export function buildInferenceSchema(request: FixRequest): StaticData {
  const variants = request.actions.map(action => {
    const properties: Record<string, StaticData> = {
      actionId: literal(action.actionId), operation: literal(action.operation.type),
      targetId: literal(operationRef(action.operation).targetId),
      evidence: { type: 'array', maxItems: request.evidence.length, items: object({
        evidenceId: { type: 'string' }, fingerprint: { type: 'string' } }) }
    };
    const constraint = action.payloadConstraint;
    if ('value' in action.operation) {
      properties['value'] = constraint.mode === 'MODEL_VALUE_WITHIN_TYPE'
        ? { type: constraint.kind === 'null' ? 'null' : constraint.kind,
          ...(constraint.kind === 'string' ? { maxLength: constraint.maxStringLength } : {}) }
        : literal(action.operation.value);
    }
    return object(properties);
  });
  const schema = object({ ...Object.fromEntries(FIX_CORRELATION_KEYS.map(k => [k, literal(request[k])])),
    operations: { type: 'array', maxItems: 128, items: { anyOf: variants } },
    unresolvedActionIds: { type: 'array', maxItems: 128, items: { type: 'string' } } });
  let properties = 0, enums = 0, characters = 0;
  const inspect = (s: Schema, depth: number): void => {
    if (depth > 10) inferenceFail('SCHEMA_UNREPRESENTABLE');
    if (s['properties']) for (const [key, child] of Object.entries(s['properties'])) {
      properties++; characters += key.length; inspect(child as Schema, depth + 1);
    }
    if (s['items']) inspect(s['items'] as Schema, depth + 1);
    if (s['anyOf']) for (const child of s['anyOf'] as Schema[]) inspect(child, depth);
    if (s['enum']) for (const value of s['enum'] as StaticData[]) { enums++; if (typeof value === 'string') characters += value.length; }
  };
  inspect(schema, 1);
  if (properties > 5000 || enums > 1000 || characters > 120000) inferenceFail('SCHEMA_UNREPRESENTABLE');
  return normalizeFixerData(schema);
}
