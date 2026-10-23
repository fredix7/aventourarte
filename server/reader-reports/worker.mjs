const TYPES = { error: 'Error', outdated: 'Dato desactualizado', suggestion: 'Sugerencia', other: 'Otro' };
const MAX_BYTES = 12288;

async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('empty');
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BYTES) { await reader.cancel(); throw new Error('size'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function receiveReport(request, env, send = fetch) {
  const origin = request.headers.get('Origin');
  const allowed = env.ALLOWED_ORIGIN;
  const headers = {
    'Content-Type': 'application/json', 'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff', 'Vary': 'Origin',
    ...(origin && origin === allowed ? { 'Access-Control-Allow-Origin': allowed } : {}),
  };
  const reply = (status, body) => new Response(JSON.stringify(body), { status, headers });
  if (new URL(request.url).pathname !== '/feedback') return reply(404, { error: 'not_found' });
  if (!origin || origin !== allowed) return reply(403, { error: 'origin' });
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: {
    ...headers, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type',
  } });
  if (request.method !== 'POST') return reply(405, { error: 'method' });
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply(415, { error: 'content_type' });
  if (!env.NOTION_TOKEN || !/^[a-f\d-]{36}$/i.test(env.NOTION_DATA_SOURCE_ID ?? '') || !env.REPORT_LIMITER)
    return reply(503, { error: 'not_configured' });
  let report;
  try { report = await readBody(request); }
  catch (error) { return reply(error.message === 'size' ? 413 : 400, { error: 'invalid_body' }); }
  if (!report || typeof report !== 'object' || Array.isArray(report)) return reply(400, { error: 'invalid_body' });
  const { type, guidePath, guideName, consent, website } = report;
  const message = typeof report.message === 'string' ? report.message.trim() : '';
  const email = typeof report.email === 'string' ? report.email.trim() : '';
  if (typeof type !== 'string' || !Object.hasOwn(TYPES, type) || typeof report.email !== 'string' || typeof guidePath !== 'string' ||
      !/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/.test(guidePath) || guidePath.length > 250 ||
      typeof guideName !== 'string' || !guideName.trim() || guideName.length > 120 ||
      message.length < 10 || message.length > 2000 || consent !== true ||
      typeof website !== 'string' || website ||
      (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))))
    return reply(400, { error: 'validation' });
  const rich = content => [{ type: 'text', text: { content } }];
  try {
    const ip = request.headers.get('CF-Connecting-IP');
    if (!ip) return reply(403, { error: 'missing_client' });
    const limit = await env.REPORT_LIMITER.limit({ key: ip });
    if (!limit.success) return reply(429, { error: 'rate_limit' });
    const source = new URL(`/aventourarte/guia/${guidePath}/`, allowed).href;
    const response = await send('https://api.notion.com/v1/pages', {
      method: 'POST', headers: {
        'Authorization': `Bearer ${env.NOTION_TOKEN}`, 'Content-Type': 'application/json', 'Notion-Version': '2025-09-03',
      },
      body: JSON.stringify({
        parent: { type: 'data_source_id', data_source_id: env.NOTION_DATA_SOURCE_ID },
        properties: {
          Asunto: { title: rich(message.replace(/\s+/g, ' ').slice(0, 100)) },
          Tipo: { select: { name: TYPES[type] } },
          Mensaje: { rich_text: rich(message) },
          'Guía': { rich_text: rich(guideName.trim()) },
          'Página de origen': { url: source },
          Correo: { email: email || null },
          Estado: { status: { name: 'Nuevo' } },
        },
      }), signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return reply(503, { error: 'storage_unavailable' });
    const page = await response.json();
    const number = page.properties?.Ticket?.unique_id?.number;
    if (!Number.isSafeInteger(number) || number < 1) return reply(502, { error: 'receipt_unavailable' });
    return reply(201, { reference: `AVISO-${number}` });
  } catch { return reply(503, { error: 'storage_unavailable' }); }
}

export default { fetch: (request, env) => receiveReport(request, env) };
