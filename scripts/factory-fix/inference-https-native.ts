import { request as httpsRequest, type RequestOptions } from 'node:https';
import { lookup } from 'node:dns/promises';
import { checkServerIdentity, rootCertificates, TLSSocket } from 'node:tls';
import { InferenceError, inferenceFail } from './inference-contracts';
import { FixerError } from './fixer-contracts';
import { OFFLINE_HTTPS_POLICY, type OfflineHttpRequests } from './inference-http';
import { createHttpsResponseSession, selectPinnedHttpsAddress } from './inference-https-adapter';
import { consumePreparedManualHttpsAttempt } from './inference-manual';

// Dormant implementation. This module is NOT imported by the broker. There is no
// operational issuer, registration hook, CLI or environment activation.
// A later phase must review host bootstrap, count billing/quota and durable spend
// reservation BEFORE adding any issuer or operational call path.
const liveCapabilities = new WeakSet<object>(); // Deliberately never populated.
export const DORMANT_HTTPS_CLIENT_POLICY = Object.freeze({ implemented: true, enabled: false,
  exportedInvocation: true, guardedManualBridgeOnly: true, capabilityIssuer: false, credentialStorage: false,
  dnsTlsSocketsVerified: false, runtimeStatus: 'RUNTIME_NOT_ISOLATED' } as const);

async function dormantHttpsRequest(capability: object, frame: OfflineHttpRequests['count'], count: boolean,
  bearer: string, signal: AbortSignal, timeoutMs: number): Promise<string> {
  if (!liveCapabilities.has(capability)) throw new FixerError('RUNTIME_NOT_ISOLATED');
  return fixedHttpsRequest(frame, count, bearer, signal, timeoutMs);
}
// Consumption happens before touching frame/signal or creating DNS/socket state.
// Only the dormant manual host closure can produce this private one-shot permit.
export async function receivePreparedManualHttpsAttempt(permit: object, frame: OfflineHttpRequests['count'], count: boolean,
  signal: AbortSignal, timeoutMs: number): Promise<string> {
  return fixedHttpsRequest(frame, count, consumePreparedManualHttpsAttempt(permit, frame, count, signal, timeoutMs), signal, timeoutMs);
}
async function fixedHttpsRequest(frame: OfflineHttpRequests['count'], count: boolean,
  bearer: string, signal: AbortSignal, timeoutMs: number): Promise<string> {
  // Even a future authentic grant needs a clean trusted host environment. Agent
  // false bypasses global agents/proxy policy; explicit bundled CA, verification,
  // SNI and one pinned IPv4 destination avoid environment CA/TLS overrides here.
  if (!/^[A-Za-z0-9_-]{16,256}$/.test(bearer) || !Number.isSafeInteger(timeoutMs)
    || timeoutMs < 1 || timeoutMs > OFFLINE_HTTPS_POLICY.maxTimeoutMs) inferenceFail('INFERENCE_INPUT_INVALID');
  const session = createHttpsResponseSession(frame, count, bearer);
  return new Promise<string>((resolve, reject) => {
    let done = false, socketSeen = false, req: ReturnType<typeof httpsRequest> | undefined;
    let response: import('node:http').IncomingMessage | undefined;
    const finish = (error?: unknown, body?: string): void => {
      if (done) return; done = true; clearTimeout(timer); signal.removeEventListener('abort', abort);
      // No raw provider/Node errors, stacks, cause, request object or auth headers.
      const safe = error instanceof InferenceError || error instanceof FixerError ? error : new InferenceError('HTTPS_CONNECTION_FAILED');
      response?.destroy(); req?.destroy(); session.discard(); bearer = '';
      if (error) reject(safe); else resolve(body!);
    };
    const abort = (): void => finish(new InferenceError('INFERENCE_CANCELLED'));
    const timer = setTimeout(() => finish(new FixerError('TIMEOUT')), timeoutMs);
    signal.addEventListener('abort', abort, { once: true });
    if (signal.aborted) { abort(); return; }
    // DNS itself cannot be reliably cancelled by Node lookup. Its late result is
    // ignored after settlement; no socket is opened and no credentials are sent.
    void lookup('api.openai.com', { family: 4, all: true, verbatim: true }).then(addresses => {
      if (done) return;
      try {
        const address = selectPinnedHttpsAddress(addresses); session.resolved(address);
        const options: RequestOptions & { autoSelectFamily: false } = {
          protocol: 'https:', hostname: 'api.openai.com', port: 443, method: 'POST', path: frame.path,
          servername: 'api.openai.com', rejectUnauthorized: true, minVersion: 'TLSv1.2',
          ca: [...rootCertificates], checkServerIdentity: (_host, cert) => checkServerIdentity('api.openai.com', cert),
          agent: false, family: 4, autoSelectFamily: false, maxHeaderSize: OFFLINE_HTTPS_POLICY.maxHeaderBytes,
          insecureHTTPParser: false, joinDuplicateHeaders: false,
          headers: { 'content-type': 'application/json', accept: 'application/json',
            'content-length': String(frame.bodyBytes), authorization: 'Bearer ' + bearer, connection: 'close' },
          lookup: (_hostname, _options, callback) => callback(null, address, 4)
        };
        req = httpsRequest(options, incoming => {
          // Retain an error sink even for a response delivered after settlement,
          // or an early status/header rejection. Repeated late errors are inert.
          incoming.on('error', () => { if (!done) finish(new InferenceError('HTTPS_CONNECTION_FAILED')); });
          response = incoming; if (done) { incoming.destroy(); return; }
          try {
            const headers = [];
            for (let i = 0; i < incoming.rawHeaders.length; i += 2) headers.push({ name: incoming.rawHeaders[i], value: incoming.rawHeaders[i + 1] });
            session.headers(incoming.statusCode ?? 0, headers);
          } catch (error) { finish(error); return; }
          incoming.on('data', (chunk: Buffer) => { if (!done) try { session.data(chunk); } catch (error) { finish(error); } });
          incoming.once('end', () => { if (!done) try { finish(undefined, session.end(incoming.complete)); } catch (error) { finish(error); } });
          incoming.once('aborted', () => finish(new InferenceError('HTTPS_UNEXPECTED_CLOSE')));
          incoming.once('close', () => { if (!done) finish(new InferenceError('HTTPS_UNEXPECTED_CLOSE')); });
        });
        req.on('socket', socket => {
          if (done || socketSeen) {
            socket.destroy();
            if (!done) finish(new InferenceError('HTTPS_EVENT_INVALID'));
            return;
          }
          socketSeen = true;
          if (!(socket instanceof TLSSocket)) { finish(new InferenceError('HTTPS_TLS_INVALID')); return; }
          socket.once('secureConnect', () => {
            if (done) return;
            try {
              const identityError = checkServerIdentity('api.openai.com', socket.getPeerCertificate());
              if (identityError) inferenceFail('HTTPS_HOSTNAME_INVALID');
              session.connected({ address: socket.remoteAddress ?? '', hostname: 'api.openai.com', port: socket.remotePort ?? 0,
                encrypted: socket.encrypted, authorized: socket.authorized });
              // No request body/Authorization is flushed before peer validation.
              req!.end(frame.body, 'utf8');
            } catch (error) { finish(error); }
          });
        });
        req.on('error', error => {
          if (done) return;
          const code = (error as NodeJS.ErrnoException).code;
          finish(new InferenceError(code === 'ERR_TLS_CERT_ALTNAME_INVALID' ? 'HTTPS_HOSTNAME_INVALID'
            : /CERT|TLS|SSL/.test(code ?? '') ? 'HTTPS_TLS_INVALID' : 'HTTPS_CONNECTION_FAILED'));
        });
        req.once('close', () => { if (!done && !response) finish(new InferenceError('HTTPS_UNEXPECTED_CLOSE')); });
      } catch (error) { finish(error); }
    }, () => finish(new InferenceError('HTTPS_DNS_FAILED')));
  });
}
