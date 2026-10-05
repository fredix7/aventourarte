import { spawnSync } from 'node:child_process';
import { lstatSync, mkdtempSync, realpathSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const launcherPath = realpathSync.native(fileURLToPath(import.meta.url));
const projectRoot = path.dirname(path.dirname(launcherPath));
const resolutionFlags = ['--preserve-symlinks', '--preserve-symlinks-main'];

function diagnostic(stage) {
  return JSON.stringify({
    ok: false,
    error: { kind: 'tool-internal', stage, message: 'No se pudo completar la operación del preparador.' },
  }) + '\n';
}

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative === '' || (!path.isAbsolute(relative) && relative !== '..'
    && !relative.startsWith('..' + path.sep));
}

function runChild(args, cwd, input, deadline) {
  const remaining = Math.ceil(deadline - performance.now());
  if (remaining <= 0) throw new Error('Invocation budget exhausted.');
  const child = spawnSync(process.execPath, args, {
    cwd,
    input,
    encoding: 'utf8',
    shell: false,
    // El tool host debe iniciar también este launcher con entorno confiable.
    env: { NODE_DISABLE_COMPILE_CACHE: '1' },
    timeout: remaining,
    killSignal: 'SIGKILL',
  });
  // spawnSync espera el cierre; SIGKILL evita depender de handlers del hijo.
  if (child.error || child.signal || child.status !== 0 || performance.now() >= deadline) {
    throw new Error('Child did not complete normally.');
  }
  return child;
}

function validateResponse(child) {
  if (child.stderr !== '' || !child.stdout) throw new Error('Invalid channel output.');
  const payload = JSON.parse(child.stdout);
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    throw new Error('Invalid response envelope.');
  }
  if (payload.ok === true && Object.hasOwn(payload, 'execution')) return payload;
  if (payload.ok === false && typeof payload.error === 'object' && payload.error !== null
    && !Array.isArray(payload.error) && typeof payload.error.kind === 'string'
    && typeof payload.error.message === 'string') return payload;
  throw new Error('Invalid response envelope.');
}

/** Host API: texto JSON sin transformar; devuelve los dos streams, no un wrapper QA. */
export function invokeFactoryQa(input) {
  const deadline = performance.now() + 60000;
  let stage = 'prepare';
  let tempRoot;
  let outputDir;
  let createdDirectory;
  let stdout = '';
  let stderr = '';
  try {
    if (typeof input !== 'string') throw new Error('Input must be text.');
    const compiler = path.join(projectRoot, 'node_modules/typescript/bin/tsc');
    if (!statSync(compiler).isFile()) throw new Error('Local compiler missing.');
    // El temporal procede del host confiable; no existe override desde el request.
    tempRoot = realpathSync.native(tmpdir());
    if (isInside(projectRoot, tempRoot)) throw new Error('Temporary root must be outside project.');
    outputDir = mkdtempSync(path.join(tempRoot, 'aventourarte-factory-qa-invoke-'));
    createdDirectory = lstatSync(outputDir);
    runChild([
      ...resolutionFlags, compiler,
      '-p', path.join(projectRoot, 'tsconfig.factory-qa.json'),
      '--noEmit', 'false', '--outDir', outputDir,
    ], projectRoot, undefined, deadline);

    const channel = path.join(outputDir, 'scripts/factory-qa-channel.js');
    if (!statSync(channel).isFile()) throw new Error('Compiled channel missing.');
    stage = 'execute';
    const child = runChild([
      '--permission', '--allow-fs-read=' + outputDir, ...resolutionFlags, channel,
    ], outputDir, input, deadline);
    stage = 'response';
    stdout = JSON.stringify(validateResponse(child)) + '\n';
  } catch {
    stderr = diagnostic(stage);
  } finally {
    if (outputDir) {
      try {
        const current = lstatSync(outputDir);
        if (!current.isDirectory() || current.isSymbolicLink()
          || current.dev !== createdDirectory.dev || current.ino !== createdDirectory.ino
          || realpathSync.native(outputDir) !== outputDir
          || path.dirname(outputDir) !== tempRoot
          || !path.basename(outputDir).startsWith('aventourarte-factory-qa-invoke-')) {
          throw new Error('Unexpected cleanup target.');
        }
        rmSync(outputDir, { recursive: true, force: true });
      } catch {
        // Conserva stdout válido o el diagnóstico principal; cleanup es secundario.
        stderr += diagnostic('cleanup');
      }
    }
  }
  return { stdout, stderr };
}

async function main() {
  let result;
  try {
    process.stdin.setEncoding('utf8');
    let input = '';
    for await (const chunk of process.stdin) input += chunk;
    result = invokeFactoryQa(input);
  } catch {
    result = { stdout: '', stderr: diagnostic('prepare') };
  }
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
  if (result.stderr) process.exitCode = 1;
}

let direct = false;
if (process.argv[1]) {
  try { direct = realpathSync.native(path.resolve(process.argv[1])) === launcherPath; }
  catch { /* Importar el módulo no ejecuta stdin. */ }
}
if (direct) await main();
