import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { invokeFactoryQa } from './factory-qa-invoke.mjs';

const tool = {
  name: 'factory_qa_review',
  description: 'Ejecuta la QA determinista de AvenTourArte Factory para un guidePath exacto '
    + 'y un FactoryReviewContext explícito. No corrige, no investiga ni selecciona ruleSet.',
  inputSchema: {
    type: 'object',
    additionalProperties: false,
    required: ['guidePath', 'context'],
    properties: {
      guidePath: { type: 'string' },
      context: {
        oneOf: [
          {
            type: 'object', additionalProperties: false, required: ['scope'],
            properties: { scope: { const: 'guide' } },
          },
          {
            type: 'object', additionalProperties: false, required: ['scope', 'targets'],
            properties: {
              scope: { const: 'targets' },
              targets: { type: 'array', items: { type: 'string' } },
            },
          },
        ],
      },
    },
  },
  // Metadata descriptiva: no constituye enforcement de seguridad.
  annotations: {
    readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false,
  },
};

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(value, keys) {
  return isObject(value) && Object.keys(value).length === keys.length
    && keys.every(key => Object.hasOwn(value, key));
}

// La API low-level no ejecuta el inputSchema anunciado. Solo comprobar su forma;
// Factory conserva la autoridad sobre paths, sintaxis de targets y revisión.
function validArguments(value) {
  if (!hasOnlyKeys(value, ['guidePath', 'context']) || typeof value.guidePath !== 'string') return false;
  const context = value.context;
  return (hasOnlyKeys(context, ['scope']) && context.scope === 'guide')
    || (hasOnlyKeys(context, ['scope', 'targets']) && context.scope === 'targets'
      && Array.isArray(context.targets) && context.targets.every(target => typeof target === 'string'));
}

function validPayload(payload) {
  return isObject(payload) && ((payload.ok === true && Object.hasOwn(payload, 'execution'))
    || (payload.ok === false && isObject(payload.error)
      && typeof payload.error.kind === 'string' && typeof payload.error.message === 'string'));
}

function validDiagnostic(payload) {
  return hasOnlyKeys(payload, ['ok', 'error']) && payload.ok === false
    && hasOnlyKeys(payload.error, ['kind', 'stage', 'message'])
    && payload.error.kind === 'tool-internal'
    && ['prepare', 'execute', 'response', 'cleanup'].includes(payload.error.stage)
    && typeof payload.error.message === 'string';
}

function technicalError(stage) {
  return {
    ok: false,
    error: { kind: 'tool-internal', stage, message: 'No se pudo completar la operación MCP de Factory QA.' },
  };
}

function toolResult(payload, isError = false, diagnostics = []) {
  return {
    structuredContent: payload,
    content: [{ type: 'text', text: JSON.stringify(payload) }],
    ...(isError ? { isError: true } : {}),
    ...(diagnostics.length ? { _meta: { 'aventourarte/launcherDiagnostics': diagnostics } } : {}),
  };
}

function launcherResult(result) {
  if (!isObject(result) || typeof result.stdout !== 'string' || typeof result.stderr !== 'string') {
    throw new Error('Invalid launcher streams.');
  }
  // finally del launcher puede producir diagnóstico principal y cleanup en líneas separadas.
  const diagnostics = result.stderr === '' ? [] : result.stderr.trim().split(/\r?\n/).map(line => {
    const diagnostic = JSON.parse(line);
    if (!validDiagnostic(diagnostic)) throw new Error('Invalid launcher diagnostic.');
    return diagnostic;
  });
  if (result.stdout === '') {
    if (!diagnostics.length) throw new Error('Missing launcher response.');
    return toolResult(diagnostics[0], true, diagnostics.slice(1));
  }
  const payload = JSON.parse(result.stdout);
  if (!validPayload(payload) || diagnostics.some(diagnostic => diagnostic.error.stage !== 'cleanup')) {
    throw new Error('Invalid launcher response.');
  }
  // Un fallo técnico sigue señalado; el payload QA permanece intacto y separado.
  return toolResult(payload, diagnostics.length > 0, diagnostics);
}

/** Una sola operación MCP no elimina las otras tools de la sesión Codex consumidora. */
export function createFactoryQaMcpServer() {
  const server = new Server({ name: 'aventourarte-factory-qa', version: '1.0.0' }, {
    capabilities: { tools: {} },
  });
  server.setRequestHandler(ListToolsRequestSchema, () => ({ tools: [tool] }));
  server.setRequestHandler(CallToolRequestSchema, request => {
    if (request.params.name !== tool.name) {
      throw new McpError(ErrorCode.InvalidParams, 'La herramienta solicitada no está disponible.');
    }
    const input = request.params.arguments;
    if (!validArguments(input)) {
      throw new McpError(ErrorCode.InvalidParams, 'La entrada no cumple el schema de factory_qa_review.');
    }
    let result;
    try {
      result = invokeFactoryQa(JSON.stringify({ guidePath: input.guidePath, context: input.context }));
    } catch {
      return toolResult(technicalError('execute'), true);
    }
    try {
      return launcherResult(result);
    } catch {
      return toolResult(technicalError('response'), true);
    }
  });
  return server;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  let server;
  try {
    server = createFactoryQaMcpServer();
    await server.connect(new StdioServerTransport());
  } catch {
    try { await server?.close(); } catch { /* No sustituir el fallo de inicio. */ }
    process.stderr.write(JSON.stringify(technicalError('prepare')) + '\n');
    process.exitCode = 1;
  }
}
