import { readFile, mkdir, writeFile } from 'node:fs/promises';

// Read-only checks: never submit tickets or emit analytics events.
const base = 'https://fredix7.github.io/aventourarte/';
const receiver = 'https://aventourarte-reader-reports.alfredovejapon.workers.dev/feedback';
const source = await readFile(new URL('../src/app/components/guide-viewer/guide-viewer.component.ts', import.meta.url), 'utf8');
const start = source.indexOf('export const GUIDE_REGISTRY');
const end = source.indexOf('\n};', start);
if (start < 0 || end < 0) throw new Error('No se encuentra el registro de guías');
const paths = [...source.slice(start, end).matchAll(/^\s*'([a-z0-9/-]+)':\s*[A-Z][A-Z0-9_]+,?\s*$/gm)].map(m => m[1]);
if (!paths.length) throw new Error('No se detectaron guías para comprobar');
const checks = [
  { url: base, status: 200, includes: '<app-root' },
  ...paths.map(path => ({ url: `${base}guia/${path}/`, status: 200, includes: '<app-root' })),
  { url: `${base}privacidad.html`, status: 200, includes: 'seis meses' },
  { url: receiver, method: 'OPTIONS', origin: 'https://fredix7.github.io', status: 204, cors: 'https://fredix7.github.io' },
  { url: receiver, method: 'OPTIONS', origin: 'https://example.com', status: 403, cors: null },
];
const results = [];
const queue = [...checks];
async function worker() {
  while (queue.length) {
    const check = queue.shift();
    let result;
    // A transient network error gets one retry. Only GET / OPTIONS are used.
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await fetch(check.url, {
          method: check.method || 'GET',
          headers: check.origin ? { Origin: check.origin } : {},
          signal: AbortSignal.timeout(15000),
        });
        const body = check.includes ? await response.text() : '';
        if (!check.includes) await response.body?.cancel();
        const ok = response.status === check.status &&
          (!check.includes || body.includes(check.includes)) &&
          (!Object.hasOwn(check, 'cors') || response.headers.get('access-control-allow-origin') === check.cors);
        result = { url: check.url, method: check.method || 'GET', origin: check.origin, status: response.status, ok };
        if (ok || response.status < 500) break;
      } catch (error) { result = { url: check.url, method: check.method || 'GET', ok: false, error: error.name }; }
    }
    results.push(result);
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
await mkdir('maintenance-report', { recursive: true });
await writeFile('maintenance-report/production.json', JSON.stringify({ at: new Date().toISOString(), results }, null, 2));
for (const result of results) console.log(`${result.ok ? 'OK' : 'FAIL'} ${result.method} ${result.url} ${result.status ?? result.error}`);
if (results.some(result => !result.ok)) process.exitCode = 1;
