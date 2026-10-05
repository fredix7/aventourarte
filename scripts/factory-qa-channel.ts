import type { FactoryReviewContext } from '../src/app/shared/guide-factory-context';
import type { FactoryQaExecution } from '../src/app/shared/guide-factory-executor';

type ChannelErrorKind = 'malformed-request' | 'guide-not-found' | 'invalid-context' | 'internal';
type ChannelResponse =
  | { ok: true; execution: FactoryQaExecution }
  | { ok: false; error: { kind: ChannelErrorKind; message: string } };

function failure(kind: ChannelErrorKind): ChannelResponse {
  const messages: Record<ChannelErrorKind, string> = {
    'malformed-request': 'La petición JSON no tiene el formato requerido.',
    'guide-not-found': 'No se pudo resolver el path exacto proporcionado.',
    'invalid-context': 'El contexto de revisión no es válido.',
    internal: 'No se pudo completar la ejecución del canal.',
  };
  return { ok: false, error: { kind, message: messages[kind] } };
}

async function handleRequest(input: string): Promise<ChannelResponse> {
  let request: unknown;
  try {
    request = JSON.parse(input);
  } catch {
    return failure('malformed-request');
  }

  if (typeof request !== 'object' || request === null || Array.isArray(request)) {
    return failure('malformed-request');
  }
  const envelope = request as Record<string, unknown>;
  if (!Object.hasOwn(envelope, 'guidePath') || typeof envelope['guidePath'] !== 'string'
    || !Object.hasOwn(envelope, 'context')) {
    return failure('malformed-request');
  }

  let executor: typeof import('../src/app/shared/guide-factory-executor').executeFactoryQa;
  try {
    const module = await import('../src/app/shared/guide-factory-executor');
    executor = module.executeFactoryQa;
  } catch {
    // Los fallos de carga/inicialización nunca son errores del contexto.
    return failure('internal');
  }

  try {
    // La validación runtime del contexto pertenece a Factory, no al transporte.
    const execution = executor(envelope['guidePath'], envelope['context'] as FactoryReviewContext);
    return execution === undefined ? failure('guide-not-found') : { ok: true, execution };
  } catch (error) {
    // Si Factory añade otro TypeError interno durante ejecución, revisar esta clasificación.
    return error instanceof TypeError
      ? failure('invalid-context')
      : failure('internal');
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
