import type {
  FactoryGuideIdentity, FactoryGuideNameResolution
} from '../src/app/shared/guide-factory-catalog-identity';

type ChannelRequest =
  | { operation: 'list' }
  | { operation: 'resolve'; name: string };
type ChannelErrorKind = 'malformed-request' | 'internal';
type ChannelResponse =
  | { ok: true; entries: readonly FactoryGuideIdentity[] }
  | ({ ok: true } & FactoryGuideNameResolution)
  | { ok: false; error: { kind: ChannelErrorKind; message: string } };

function failure(kind: ChannelErrorKind): ChannelResponse {
  const messages: Record<ChannelErrorKind, string> = {
    'malformed-request': 'La petición JSON no tiene el formato requerido.',
    internal: 'No se pudo completar la ejecución del canal de catálogo.',
  };
  return { ok: false, error: { kind, message: messages[kind] } };
}

function validRequest(value: unknown): value is ChannelRequest {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const envelope = value as Record<string, unknown>;
  if (!Object.hasOwn(envelope, 'operation')) return false;
  const keys = Object.keys(envelope);
  return (envelope['operation'] === 'list' && keys.length === 1)
    || (envelope['operation'] === 'resolve' && keys.length === 2
      && Object.hasOwn(envelope, 'name') && typeof envelope['name'] === 'string'
      && envelope['name'].trim().length > 0);
}

async function handleRequest(input: string): Promise<ChannelResponse> {
  let request: unknown;
  try {
    request = JSON.parse(input);
  } catch {
    return failure('malformed-request');
  }
  if (!validRequest(request)) return failure('malformed-request');

  let identity: typeof import('../src/app/shared/guide-factory-catalog-identity');
  try {
    identity = await import('../src/app/shared/guide-factory-catalog-identity');
  } catch {
    return failure('internal');
  }

  try {
    return request.operation === 'list'
      ? { ok: true, entries: identity.listFactoryGuideIdentities() }
      : { ok: true, ...identity.resolveFactoryGuideName(request.name) };
  } catch {
    return failure('internal');
  }
}

async function main(): Promise<void> {
  let output: string;
  try {
    process.stdin.setEncoding('utf8');
    let input = '';
    for await (const chunk of process.stdin) input += chunk;
    output = JSON.stringify(await handleRequest(input));
  } catch {
    output = JSON.stringify(failure('internal'));
  }
  process.stdout.write(output + '\n');
}

void main();
