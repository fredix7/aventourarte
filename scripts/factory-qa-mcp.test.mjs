import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { createFactoryQaMcpServer } from './factory-qa-mcp.mjs';
import { invokeFactoryQa, invokeFactoryGuideCatalog } from './factory-qa-invoke.mjs';

const adapter = fileURLToPath(new URL('./factory-qa-mcp.mjs', import.meta.url));
const projectRoot = path.dirname(path.dirname(adapter));
const municipal = 'europa/espana/andalucia/cadiz/jerez-de-la-frontera';
const generic = 'europa/dinamarca/copenhague';
const requestOptions = { timeout: 75000 };

async function withClient(entry, run) {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: ['--preserve-symlinks', '--preserve-symlinks-main', entry],
    cwd: realpathSync.native(tmpdir()),
    env: { NODE_DISABLE_COMPILE_CACHE: '1' },
    stderr: 'pipe',
  });
  const client = new Client({ name: 'factory-qa-test', version: '1.0.0' });
  const protocolErrors = [];
  client.onerror = error => protocolErrors.push(error);
  let pid;
  // Consumir stderr sin exigir silencio de posibles diagnósticos propios del SDK.
  transport.stderr.on('data', () => {});
  try {
    await client.connect(transport, { timeout: 15000 });
    pid = transport.pid;
    assert.ok(pid);
    return await run(client);
  } finally {
    pid ??= transport.pid;
    await client.close();
    await transport.close();
    if (pid) {
      const deadline = Date.now() + 10000;
      let stopped = false;
      while (Date.now() < deadline) {
        try { process.kill(pid, 0); }
        catch (error) {
          if (error.code !== 'ESRCH') throw error;
          stopped = true;
          break;
        }
        await delay(50);
      }
      assert.equal(stopped, true, 'MCP process must close after client teardown');
    }
    assert.deepEqual(protocolErrors, [], 'stdout must contain only MCP protocol messages');
  }
}

function call(client, input, name = 'factory_qa_review') {
  return client.callTool({ name, arguments: input }, undefined, requestOptions);
}

test('importing the adapter creates no transport', async () => {
  const server = createFactoryQaMcpServer();
  assert.equal(server.transport, undefined);
  await server.close();
});

test('real stdio MCP handshake, exactly two tools and QA equivalence with the launcher', { timeout: 300000 }, async t => {
  await withClient(adapter, async client => {
    assert.deepEqual(client.getServerCapabilities(), { tools: {} });
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map(tool => tool.name), ['factory_qa_review', 'factory_guide_catalog']);
    assert.deepEqual(tools[0].annotations, {
      readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false,
    });
    const schema = tools[0].inputSchema;
    assert.equal(schema.additionalProperties, false);
    assert.deepEqual(schema.required, ['guidePath', 'context']);
    assert.deepEqual(Object.keys(schema.properties), ['guidePath', 'context']);
    assert.deepEqual(schema.properties.context.oneOf, [
      { type: 'object', additionalProperties: false, required: ['scope'], properties: { scope: { const: 'guide' } } },
      {
        type: 'object', additionalProperties: false, required: ['scope', 'targets'],
        properties: { scope: { const: 'targets' }, targets: { type: 'array', items: { type: 'string' } } },
      },
    ]);
    assert.deepEqual(tools[1].annotations, {
      readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false,
    });
    assert.deepEqual(tools[1].inputSchema, {
      type: 'object', additionalProperties: false, required: ['operation'],
      properties: {
        operation: { type: 'string', enum: ['list', 'resolve'] },
        name: { type: 'string', minLength: 1 },
      },
      oneOf: [
        {
          type: 'object', additionalProperties: false, required: ['operation'],
          properties: { operation: { const: 'list' } },
        },
        {
          type: 'object', additionalProperties: false, required: ['operation', 'name'],
          properties: { operation: { const: 'resolve' }, name: { type: 'string', minLength: 1 } },
        },
      ],
    });
    for (const [name, input, expectedKind] of [
      ['municipal guide', { guidePath: municipal, context: { scope: 'guide' } }],
      ['generic guide', { guidePath: generic, context: { scope: 'guide' } }],
      ['targets', { guidePath: municipal, context: { scope: 'targets', targets: ['secciones[3].platos[2]'] } }],
      ['empty targets', { guidePath: generic, context: { scope: 'targets', targets: [] } }],
      ['Rio', { guidePath: 'america/sudamerica/brasil/rio-de-janeiro', context: { scope: 'guide' } }],
      ['unknown path', { guidePath: 'unknown/guide', context: { scope: 'guide' } }, 'guide-not-found'],
      ['invalid target syntax reaches Factory', { guidePath: municipal, context: { scope: 'targets', targets: ['secciones[-1]'] } }, 'invalid-context'],
    ]) {
      await t.test(name, async () => {
        const actual = await call(client, input);
        const reference = invokeFactoryQa(JSON.stringify(input));
        assert.equal(reference.stderr, '');
        const payload = JSON.parse(reference.stdout);
        assert.deepEqual(actual.structuredContent, payload);
        assert.deepEqual(actual.content, [{ type: 'text', text: JSON.stringify(payload) }]);
        assert.notEqual(actual.isError, true, 'valid channel errors are not launcher failures');
        if (expectedKind) assert.equal(payload.error.kind, expectedKind);
        else assert.equal(payload.ok, true);
      });
    }
  });
});

async function withFixture(launcherBody, run, catalogBody = 'throw new Error("Catalog launcher must not be reached");') {
  const root = realpathSync.native(tmpdir());
  const fixture = mkdtempSync(path.join(root, 'factory-qa-mcp-test-'));
  try {
    let source = readFileSync(adapter, 'utf8');
    for (const specifier of [
      '@modelcontextprotocol/sdk/server/index.js',
      '@modelcontextprotocol/sdk/server/stdio.js',
      '@modelcontextprotocol/sdk/types.js',
    ]) {
      source = source.replace(`'${specifier}'`, JSON.stringify(import.meta.resolve(specifier)));
    }
    const copiedAdapter = path.join(fixture, 'factory-qa-mcp.mjs');
    writeFileSync(copiedAdapter, source);
    // Copia controlada: no hay inyección ni opciones de test en producción.
    writeFileSync(path.join(fixture, 'factory-qa-invoke.mjs'), `
import { appendFileSync } from 'node:fs';
export function invokeFactoryQa(input) {
  appendFileSync(new URL('./calls.jsonl', import.meta.url), input + '\\n');
  ${launcherBody}
}
export function invokeFactoryGuideCatalog(input) {
  appendFileSync(new URL('./catalog-calls.jsonl', import.meta.url), input + '\\n');
  ${catalogBody}
}
`);
    return await withClient(copiedAdapter, client => run(client, fixture));
  } finally {
    const resolved = realpathSync.native(fixture);
    assert.equal(path.dirname(resolved), root);
    assert.ok(path.basename(resolved).startsWith('factory-qa-mcp-test-'));
    rmSync(resolved, { recursive: true, force: true });
  }
}

test('rejects invalid schema and unknown tools without invoking the launcher', { timeout: 30000 }, async t => {
  await withFixture('throw new Error("Launcher must not be reached");', async (client, fixture) => {
    for (const [name, input] of [
      ['missing guidePath', { context: { scope: 'guide' } }],
      ['extra command', { guidePath: municipal, context: { scope: 'guide' }, command: 'fixture' }],
      ['extra ruleSet', { guidePath: municipal, context: { scope: 'guide' }, ruleSet: 'generic' }],
      ['extra env', { guidePath: municipal, context: { scope: 'guide' }, env: {} }],
      ['guide with extra targets', { guidePath: municipal, context: { scope: 'guide', targets: [] } }],
      ['targets is not array', { guidePath: municipal, context: { scope: 'targets', targets: 'secciones[3]' } }],
      ['target is not string', { guidePath: municipal, context: { scope: 'targets', targets: [3] } }],
      ['missing context', { guidePath: municipal }],
      ['null context', { guidePath: municipal, context: null }],
      ['invalid scope', { guidePath: municipal, context: { scope: 'other' } }],
    ]) {
      await t.test(name, async () => {
        await assert.rejects(call(client, input), error => error.code === ErrorCode.InvalidParams);
        assert.equal(existsSync(path.join(fixture, 'calls.jsonl')), false);
      });
    }
    await assert.rejects(call(client, { guidePath: municipal, context: { scope: 'guide' } }, 'shell'),
      error => error.code === ErrorCode.InvalidParams);
    assert.equal(existsSync(path.join(fixture, 'calls.jsonl')), false);
  });
});

test('preserves exact path, target values and order before delegation', { timeout: 30000 }, async () => {
  await withFixture(`return {stdout: JSON.stringify({ok:true,execution:{input:JSON.parse(input)}}), stderr:''};`, async (client, fixture) => {
    const input = { guidePath: ' Human\\path/ ', context: { scope: 'targets', targets: ['secciones[03]', 'bad syntax', 'secciones[03]'] } };
    const actual = await call(client, input);
    assert.deepEqual(actual.structuredContent.execution.input, input);
    assert.equal(readFileSync(path.join(fixture, 'calls.jsonl'), 'utf8'), JSON.stringify(input) + '\n');
  });
});

const diagnostic = stage => ({ ok: false, error: { kind: 'tool-internal', stage, message: 'Controlled fixture diagnostic.' } });
const qaPayload = {
  ok: true,
  execution: {
    path: 'fixture/path', ruleSet: 'fixture',
    result: {
      status: 'APROBADA', counts: { blockers: 0, errors: 0, warnings: 0, info: 1 },
      issues: [{ severity: 'INFO', detail: 'Original fixture issue', category: 'future-category' }],
    },
  },
};

test('preserves payload and exposes cleanup separately as a technical error', { timeout: 30000 }, async () => {
  const cleanup = diagnostic('cleanup');
  await withFixture(`return ${JSON.stringify({ stdout: JSON.stringify(qaPayload) + '\n', stderr: JSON.stringify(cleanup) + '\n' })};`, async client => {
    const actual = await call(client, { guidePath: 'fixture', context: { scope: 'guide' } });
    assert.deepEqual(actual.structuredContent, qaPayload);
    assert.deepEqual(actual.content, [{ type: 'text', text: JSON.stringify(qaPayload) }]);
    assert.equal(actual.isError, true);
    assert.deepEqual(actual._meta, { 'aventourarte/launcherDiagnostics': [cleanup] });
  });
});

test('preserves primary launcher error and secondary cleanup diagnostic', { timeout: 30000 }, async () => {
  const primary = diagnostic('prepare');
  const cleanup = diagnostic('cleanup');
  await withFixture(`return ${JSON.stringify({ stdout: '', stderr: JSON.stringify(primary) + '\n' + JSON.stringify(cleanup) + '\n' })};`, async client => {
    const actual = await call(client, { guidePath: 'fixture', context: { scope: 'guide' } });
    assert.equal(actual.isError, true);
    assert.deepEqual(actual.structuredContent, primary);
    assert.deepEqual(actual._meta, { 'aventourarte/launcherDiagnostics': [cleanup] });
  });
});

test('valid future channel error is preserved without treating it as a launcher failure', { timeout: 30000 }, async () => {
  const payload = { ok: false, error: { kind: 'future-channel-kind', message: 'Fixture channel response.' } };
  await withFixture(`return ${JSON.stringify({ stdout: JSON.stringify(payload), stderr: '' })};`, async client => {
    const actual = await call(client, { guidePath: 'fixture', context: { scope: 'guide' } });
    assert.deepEqual(actual.structuredContent, payload);
    assert.notEqual(actual.isError, true);
  });
});

test('controlled launcher failures are MCP tool errors, never QA issues', { timeout: 30000 }, async t => {
  for (const stage of ['prepare', 'execute', 'response', 'cleanup']) {
    await t.test(stage, async () => {
      const payload = diagnostic(stage);
      await withFixture(`return ${JSON.stringify({ stdout: '', stderr: JSON.stringify(payload) + '\n' })};`, async client => {
        const actual = await call(client, { guidePath: 'fixture', context: { scope: 'guide' } });
        assert.equal(actual.isError, true);
        assert.deepEqual(actual.structuredContent, payload);
        assert.deepEqual(actual.content, [{ type: 'text', text: JSON.stringify(payload) }]);
      });
    });
  }
});

for (const [name, launcherBody, stage] of [
  ['unexpected stderr', `return ${JSON.stringify({ stdout: JSON.stringify(qaPayload), stderr: 'private-path and stack fixture' })};`, 'response'],
  ['empty stdout', `return {stdout:'',stderr:''};`, 'response'],
  ['invalid stdout JSON', `return {stdout:'private-path and stack fixture',stderr:''};`, 'response'],
  ['null envelope', `return {stdout:'null',stderr:''};`, 'response'],
  ['array envelope', `return {stdout:'[]',stderr:''};`, 'response'],
  ['missing execution', `return {stdout:'{"ok":true}',stderr:''};`, 'response'],
  ['invalid channel error', `return {stdout:'{"ok":false,"error":{}}',stderr:''};`, 'response'],
  ['invalid launcher streams', `return null;`, 'response'],
  ['exception', `throw new Error('private-path and stack fixture');`, 'execute'],
]) {
  test(`reports ${name} without leaking private output`, { timeout: 30000 }, async () => {
    await withFixture(launcherBody, async client => {
      const actual = await call(client, { guidePath: 'fixture', context: { scope: 'guide' } });
      assert.equal(actual.isError, true);
      assert.equal(actual.structuredContent.error.kind, 'tool-internal');
      assert.equal(actual.structuredContent.error.stage, stage);
      assert.deepEqual(Object.keys(actual.structuredContent), ['ok', 'error']);
      assert.deepEqual(Object.keys(actual.structuredContent.error), ['kind', 'stage', 'message']);
      assert.ok(!JSON.stringify(actual).includes('private-path'));
      assert.deepEqual(actual.content, [{ type: 'text', text: JSON.stringify(actual.structuredContent) }]);
    });
  });
}

test('real catalog protocol calls preserve launcher LIST, MATCH and NOT_FOUND results', { timeout: 300000 }, async t => {
  await withClient(adapter, async client => {
    for (const [name, input, resolution] of [
      ['LIST', { operation: 'list' }],
      ['MATCH Copenhague', { operation: 'resolve', name: 'Copenhague' }, 'MATCH'],
      ['MATCH uppercase', { operation: 'resolve', name: 'COPENHAGUE' }, 'MATCH'],
      ['NOT_FOUND Jerez', { operation: 'resolve', name: 'Jerez' }, 'NOT_FOUND'],
      ['NOT_FOUND Malta', { operation: 'resolve', name: 'Malta' }, 'NOT_FOUND'],
    ]) {
      await t.test(name, async () => {
        const actual = await call(client, input, 'factory_guide_catalog');
        const reference = invokeFactoryGuideCatalog(JSON.stringify(input));
        assert.equal(reference.stderr, '');
        const payload = JSON.parse(reference.stdout);
        assert.equal(payload.ok, true);
        assert.deepEqual(actual.structuredContent, payload);
        assert.deepEqual(actual.content, [{ type: 'text', text: JSON.stringify(payload) }]);
        assert.notEqual(actual.isError, true);
        if (resolution) {
          assert.equal(payload.resolution, resolution);
          assert.deepEqual(Object.keys(payload), resolution === 'MATCH'
            ? ['ok', 'resolution', 'entry'] : ['ok', 'resolution']);
          if (resolution === 'MATCH') assert.deepEqual(Object.keys(payload.entry), ['path', 'name']);
        } else {
          assert.deepEqual(Object.keys(payload), ['ok', 'entries']);
          assert.ok(Array.isArray(payload.entries));
          payload.entries.forEach(entry => assert.deepEqual(Object.keys(entry), ['path', 'name']));
        }
      });
    }
  });
});

function withCatalogFixture(body, run) {
  return withFixture('throw new Error("QA launcher must not be reached");', run, body);
}

test('catalog rejects invalid arguments without reaching either launcher', { timeout: 30000 }, async t => {
  await withCatalogFixture('throw new Error("Catalog launcher must not be reached");', async (client, fixture) => {
    for (const [name, input] of [
      ['missing arguments', undefined], ['null', null], ['array', []], ['string', 'list'],
      ['empty object', {}], ['unknown operation', { operation: 'unknown' }],
      ['nonstring operation', { operation: 42 }],
      ['operation only inside prototype data', JSON.parse('{"__proto__":{"operation":"list"}}')],
      ['list with name', { operation: 'list', name: 'Copenhague' }],
      ['list with extra', { operation: 'list', extra: true }],
      ['resolve without name', { operation: 'resolve' }],
      ['resolve numeric name', { operation: 'resolve', name: 42 }],
      ['resolve null name', { operation: 'resolve', name: null }],
      ['resolve empty name', { operation: 'resolve', name: '' }],
      ['resolve whitespace name', { operation: 'resolve', name: ' \t\n ' }],
      ['resolve with extra', { operation: 'resolve', name: 'Copenhague', extra: true }],
      ...['path', 'guidePath', 'context', 'ruleSet', 'fuzzy', 'locale', 'aliases', 'limit', 'query', 'options']
        .map(field => [`forbidden field ${field}`, { operation: 'resolve', name: 'Copenhague', [field]: 'fixture' }]),
    ]) {
      await t.test(name, async () => {
        await assert.rejects(call(client, input, 'factory_guide_catalog'), error => error.code === ErrorCode.InvalidParams);
        assert.equal(existsSync(path.join(fixture, 'calls.jsonl')), false);
        assert.equal(existsSync(path.join(fixture, 'catalog-calls.jsonl')), false);
      });
    }
  });
});

test('QA retains original SDK parsing for non-object arguments', { timeout: 30000 }, async () => {
  await withFixture('throw new Error("QA launcher must not be reached");', async (client, fixture) => {
    for (const input of [null, [], 'guide']) {
      await assert.rejects(call(client, input), error => error.code === ErrorCode.InternalError);
      assert.equal(existsSync(path.join(fixture, 'calls.jsonl')), false);
      assert.equal(existsSync(path.join(fixture, 'catalog-calls.jsonl')), false);
    }
  });
});

test('dispatches each tool only to its own launcher and preserves original names', { timeout: 30000 }, async () => {
  await withFixture(`return ${JSON.stringify({ stdout: JSON.stringify(qaPayload), stderr: '' })};`, async (client, fixture) => {
    const qaInput = { guidePath: 'fixture', context: { scope: 'guide' } };
    const qa = await call(client, qaInput);
    assert.deepEqual(qa.structuredContent, qaPayload);
    assert.equal(readFileSync(path.join(fixture, 'calls.jsonl'), 'utf8'), JSON.stringify(qaInput) + '\n');
    assert.equal(existsSync(path.join(fixture, 'catalog-calls.jsonl')), false);
    const list = await call(client, { operation: 'list' }, 'factory_guide_catalog');
    assert.deepEqual(list.structuredContent, { ok: true, entries: [] });
    const requests = [{ operation: 'list' }];
    for (const name of ['  COPENHAGUE  ', 'Ca\u0301diz']) {
      const request = { operation: 'resolve', name };
      requests.push(request);
      const actual = await call(client, request, 'factory_guide_catalog');
      assert.deepEqual(actual.structuredContent, {
        ok: true, resolution: 'MATCH', entry: { path: 'fixture', name },
      });
      assert.notEqual(actual.isError, true);
    }
    assert.equal(readFileSync(path.join(fixture, 'catalog-calls.jsonl'), 'utf8'),
      requests.map(request => JSON.stringify(request) + '\n').join(''));
    assert.equal(readFileSync(path.join(fixture, 'calls.jsonl'), 'utf8'), JSON.stringify(qaInput) + '\n');
  }, `
const request = JSON.parse(input);
const payload = request.operation === 'list' ? {ok:true,entries:[]}
  : {ok:true,resolution:'MATCH',entry:{path:'fixture',name:request.name}};
return {stdout:JSON.stringify(payload),stderr:''};
`);
});

test('catalog preserves AMBIGUOUS candidates exactly using a launcher fixture', { timeout: 30000 }, async () => {
  const payload = {
    ok: true, resolution: 'AMBIGUOUS',
    candidates: [{ path: 'fixture/b', name: ' Stored Name ' }, { path: 'fixture/a', name: 'Stored Name' }],
  };
  await withCatalogFixture(`return ${JSON.stringify({ stdout: JSON.stringify(payload), stderr: '' })};`, async client => {
    const actual = await call(client, { operation: 'resolve', name: 'Stored Name' }, 'factory_guide_catalog');
    assert.deepEqual(actual.structuredContent, payload);
    assert.deepEqual(actual.content, [{ type: 'text', text: JSON.stringify(payload) }]);
    assert.notEqual(actual.isError, true);
  });
});

for (const kind of ['malformed-request', 'internal', 'future-channel-kind']) {
  test(`catalog preserves controlled channel error ${kind} as a normal result`, { timeout: 30000 }, async () => {
    const payload = { ok: false, error: { kind, message: 'Fixture channel response.' } };
    await withCatalogFixture(`return ${JSON.stringify({ stdout: JSON.stringify(payload), stderr: '' })};`, async client => {
      const actual = await call(client, { operation: 'list' }, 'factory_guide_catalog');
      assert.deepEqual(actual.structuredContent, payload);
      assert.deepEqual(actual.content, [{ type: 'text', text: JSON.stringify(payload) }]);
      assert.notEqual(actual.isError, true);
    });
  });
}

test('catalog exposes technical launcher diagnostics without reinterpreting them', { timeout: 30000 }, async t => {
  for (const stage of ['prepare', 'execute', 'response', 'cleanup']) {
    await t.test(stage, async () => {
      const payload = diagnostic(stage);
      await withCatalogFixture(`return ${JSON.stringify({ stdout: '', stderr: JSON.stringify(payload) + '\n' })};`, async client => {
        const actual = await call(client, { operation: 'list' }, 'factory_guide_catalog');
        assert.equal(actual.isError, true);
        assert.deepEqual(actual.structuredContent, payload);
        assert.deepEqual(actual.content, [{ type: 'text', text: JSON.stringify(payload) }]);
      });
    });
  }
});

test('catalog preserves valid stdout and separates cleanup diagnostics into metadata', { timeout: 30000 }, async () => {
  const payload = { ok: true, entries: [{ path: 'fixture', name: null }] };
  const cleanup = diagnostic('cleanup');
  await withCatalogFixture(`return ${JSON.stringify({ stdout: JSON.stringify(payload), stderr: JSON.stringify(cleanup) + '\n' })};`, async client => {
    const actual = await call(client, { operation: 'list' }, 'factory_guide_catalog');
    assert.deepEqual(actual.structuredContent, payload);
    assert.deepEqual(actual.content, [{ type: 'text', text: JSON.stringify(payload) }]);
    assert.equal(actual.isError, true);
    assert.deepEqual(actual._meta, { 'aventourarte/launcherDiagnostics': [cleanup] });
  });
});

test('catalog preserves primary technical error and secondary cleanup diagnostic', { timeout: 30000 }, async () => {
  const primary = diagnostic('prepare');
  const cleanup = diagnostic('cleanup');
  await withCatalogFixture(`return ${JSON.stringify({ stdout: '', stderr: JSON.stringify(primary) + '\n' + JSON.stringify(cleanup) + '\n' })};`, async client => {
    const actual = await call(client, { operation: 'list' }, 'factory_guide_catalog');
    assert.equal(actual.isError, true);
    assert.deepEqual(actual.structuredContent, primary);
    assert.deepEqual(actual._meta, { 'aventourarte/launcherDiagnostics': [cleanup] });
  });
});

for (const [name, body, stage] of [
  ['unexpected stderr', `return ${JSON.stringify({ stdout: '{"ok":true,"entries":[]}', stderr: 'private-path and stack fixture' })};`, 'response'],
  ['empty stdout', `return {stdout:'',stderr:''};`, 'response'],
  ['invalid stdout JSON', `return {stdout:'private-path and stack fixture',stderr:''};`, 'response'],
  ['contaminated stdout', `return {stdout:'{"ok":true,"entries":[]}private-path',stderr:''};`, 'response'],
  ['null envelope', `return {stdout:'null',stderr:''};`, 'response'],
  ['array envelope', `return {stdout:'[]',stderr:''};`, 'response'],
  ['QA envelope', `return {stdout:'{"ok":true,"execution":{}}',stderr:''};`, 'response'],
  ['nonboolean ok', `return {stdout:'{"ok":"true","entries":[]}',stderr:''};`, 'response'],
  ['entries not array', `return {stdout:'{"ok":true,"entries":{}}',stderr:''};`, 'response'],
  ['identity extra field', `return {stdout:'{"ok":true,"entries":[{"path":"fixture","name":null,"stack":"private-path"}]}',stderr:''};`, 'response'],
  ['unnamed MATCH', `return {stdout:'{"ok":true,"resolution":"MATCH","entry":{"path":"fixture","name":null}}',stderr:''};`, 'response'],
  ['invalid AMBIGUOUS', `return {stdout:'{"ok":true,"resolution":"AMBIGUOUS","candidates":[{"path":42,"name":"fixture"}]}',stderr:''};`, 'response'],
  ['NOT_FOUND extra field', `return {stdout:'{"ok":true,"resolution":"NOT_FOUND","stack":"private-path"}',stderr:''};`, 'response'],
  ['error extra field', `return {stdout:'{"ok":false,"error":{"kind":"internal","message":"fixture","stack":"private-path"}}',stderr:''};`, 'response'],
  ['invalid channel error', `return {stdout:'{"ok":false,"error":{}}',stderr:''};`, 'response'],
  ['invalid launcher streams', `return null;`, 'response'],
  ['payload with non-cleanup diagnostic', `return ${JSON.stringify({ stdout: '{"ok":true,"entries":[]}', stderr: JSON.stringify(diagnostic('execute')) })};`, 'response'],
  ['exception', `throw new Error('private-path and stack fixture');`, 'execute'],
]) {
  test(`catalog reports ${name} without leaking private output`, { timeout: 30000 }, async () => {
    await withCatalogFixture(body, async client => {
      const actual = await call(client, { operation: 'list' }, 'factory_guide_catalog');
      assert.equal(actual.isError, true);
      assert.deepEqual(actual.structuredContent, {
        ok: false, error: {
          kind: 'tool-internal', stage, message: 'No se pudo completar la operación MCP de catálogo Factory.',
        },
      });
      assert.ok(!JSON.stringify(actual).includes('private-path'));
      assert.deepEqual(actual.content, [{ type: 'text', text: JSON.stringify(actual.structuredContent) }]);
    });
  });
}

test('adapter imports only the SDK, fixed launcher and path/url utilities', () => {
  const source = readFileSync(adapter, 'utf8');
  const imports = [...source.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g)].map(match => match[1]);
  assert.deepEqual(imports, [
    '@modelcontextprotocol/sdk/server/index.js', '@modelcontextprotocol/sdk/server/stdio.js',
    '@modelcontextprotocol/sdk/types.js', 'node:path', 'node:url', './factory-qa-invoke.mjs',
  ]);
  assert.doesNotMatch(source, /\b(?:require|import)\s*\(|\b(?:executeFactoryQa|runFactoryQa|listFactoryGuideIdentities|resolveFactoryGuideName)\b/);
});
