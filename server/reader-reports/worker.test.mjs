import test from 'node:test';
import assert from 'node:assert/strict';
import { receiveReport } from './worker.mjs';

const origin = 'https://fredix7.github.io';
const report = {
  type: 'outdated', message: 'La dirección del museo ha cambiado.', email: 'lector@example.test',
  guidePath: 'europa/espana/andalucia/cadiz/rota', guideName: 'Rota', consent: true, website: '',
};
const settings = () => ({
  ALLOWED_ORIGIN: origin, NOTION_TOKEN: 'test-secret',
  NOTION_DATA_SOURCE_ID: '852f1b4c-6f27-4497-a3b1-b35acc0b566d',
  REPORT_LIMITER: { limit: async () => ({ success: true }) },
});
const request = (body = report, headers = {}) => new Request('https://receiver.example.test/feedback', {
  method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1', ...headers },
  body: JSON.stringify(body),
});
const saved = () => Response.json({ properties: { Ticket: { unique_id: { prefix: 'AVISO', number: 42 } } } });

test('creates a private ticket with canonical source and returns only its public reference', async () => {
  let payload;
  const response = await receiveReport(request({ ...report, url: 'https://evil.test?secret=1', Estado: 'Resuelto' }), settings(), async (url, options) => {
    assert.equal(url, 'https://api.notion.com/v1/pages');
    assert.equal(options.headers.Authorization, 'Bearer test-secret');
    payload = JSON.parse(options.body);
    return saved();
  });
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { reference: 'AVISO-42' });
  assert.equal(payload.parent.data_source_id, settings().NOTION_DATA_SOURCE_ID);
  assert.equal(payload.properties.Estado.status.name, 'Nuevo');
  assert.equal(payload.properties['Página de origen'].url, `${origin}/aventourarte/guia/${report.guidePath}/`);
  assert.equal(payload.properties.Correo.email, report.email);
  assert.equal(payload.properties.Mensaje.rich_text[0].text.content, report.message);
});

test('rejects foreign origins without exposing a CORS allowance', async () => {
  const response = await receiveReport(request(report, { Origin: 'https://evil.test' }), settings(), () => assert.fail('must not store'));
  assert.equal(response.status, 403);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
});

test('handles the browser CORS preflight', async () => {
  const response = await receiveReport(new Request('https://receiver.test/feedback', { method: 'OPTIONS', headers: { Origin: origin } }), settings());
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin);
});

test('rejects invalid categories, message lengths, origin paths, email, consent and honeypots', async () => {
  for (const change of [
    { type: '__proto__' }, { type: { toString: null } }, { message: 'short' }, { message: 'a'.repeat(2001) },
    { guidePath: '../../secret' }, { email: 'not-email' }, { consent: false }, { website: 'bot' },
  ]) {
    const response = await receiveReport(request({ ...report, ...change }), settings(), () => assert.fail('must not store'));
    assert.equal(response.status, 400, JSON.stringify(change));
  }
});

test('bounds the body size even when Content-Length is missing', async () => {
  const response = await receiveReport(request({ message: 'a'.repeat(15000) }), settings(), () => assert.fail('must not store'));
  assert.equal(response.status, 413);
});

test('limits submissions before sending their content to Notion', async () => {
  const env = settings();
  env.REPORT_LIMITER.limit = async () => ({ success: false });
  const response = await receiveReport(request(), env, () => assert.fail('must not store'));
  assert.equal(response.status, 429);
});

test('does not claim receipt when Notion fails or omits the ticket number', async () => {
  const failure = await receiveReport(request(), settings(), async () => new Response('private upstream error', { status: 401 }));
  assert.equal(failure.status, 503);
  assert.equal((await failure.text()).includes('private upstream error'), false);
  const noReceipt = await receiveReport(request(), settings(), async () => Response.json({}));
  assert.equal(noReceipt.status, 502);
});

test('fails closed without secrets and supports submissions without email', async () => {
  const env = settings();
  delete env.NOTION_TOKEN;
  assert.equal((await receiveReport(request(), env)).status, 503);
  const response = await receiveReport(request({ ...report, email: '' }), settings(), async (_, options) => {
    assert.equal(JSON.parse(options.body).properties.Correo.email, null);
    return saved();
  });
  assert.equal(response.status, 201);
});
