import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const workspace = process.cwd();
const outputDirectory = path.join(workspace, 'dist', 'aventourarte', 'browser');
const registryPath = path.join(
  workspace,
  'src',
  'app',
  'components',
  'guide-viewer',
  'guide-viewer.component.ts'
);

const [indexHtml, registrySource] = await Promise.all([
  readFile(path.join(outputDirectory, 'index.html'), 'utf8'),
  readFile(registryPath, 'utf8')
]);

const registryStart = registrySource.indexOf('export const GUIDE_REGISTRY');
const registryEnd = registrySource.indexOf('\n};', registryStart);

if (registryStart < 0 || registryEnd < 0) {
  throw new Error('No se pudo localizar GUIDE_REGISTRY para generar las rutas publicables.');
}

const registryBlock = registrySource.slice(registryStart, registryEnd);
const guidePaths = [...registryBlock.matchAll(/^\s*'([^']+)':\s*[A-Z][A-Z0-9_]+,?\s*$/gm)]
  .map(match => match[1]);

if (guidePaths.length === 0) {
  throw new Error('GUIDE_REGISTRY no contiene rutas publicables.');
}

for (const guidePath of guidePaths) {
  const segments = guidePath.split('/');
  if (segments.some(segment => !/^[a-z0-9-]+$/.test(segment))) {
    throw new Error(`Ruta de guía no segura: ${guidePath}`);
  }

  const routeDirectory = path.join(outputDirectory, 'guia', ...segments);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, 'index.html'), indexHtml, 'utf8');
}

await writeFile(path.join(outputDirectory, '404.html'), indexHtml, 'utf8');
await writeFile(path.join(outputDirectory, '.nojekyll'), '', 'utf8');

console.log(`Preparadas ${guidePaths.length} rutas de guía y el fallback 404 para GitHub Pages.`);
