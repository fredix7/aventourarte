import type { FactoryQaRuleSet } from './guide-factory-runner';
import { CADIZ_GUIDE } from '../guides/europa/espana/andalucia/cadiz/cadiz.guide';
import { CHIPIONA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/chipiona.guide';
import { JEREZ_GUIDE } from '../guides/europa/espana/andalucia/cadiz/jerez.guide';
import { ROTA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/rota.guide';
import { SAN_FERNANDO_GUIDE } from '../guides/europa/espana/andalucia/cadiz/san-fernando.guide';
import { SANLUCAR_BARRAMEDA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/sanlucar-barrameda.guide';
import { TREBUJENA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/trebujena.guide';
import { VEJER_GUIDE } from '../guides/europa/espana/andalucia/cadiz/vejer.guide';
import { ALMENSILLA_GUIDE } from '../guides/europa/espana/andalucia/sevilla/almensilla.guide';
import { CORIA_GUIDE } from '../guides/europa/espana/andalucia/sevilla/coria.guide';
import { MAIRENA_ALJARAFE_GUIDE } from '../guides/europa/espana/andalucia/sevilla/mairena-aljarafe.guide';
import { COPENHAGUE_GUIDE } from '../guides/europa/dinamarca/copenhague.guide';
import { MALMO_GUIDE } from '../guides/europa/suecia/malmo.guide';
import { MALTA_GUIDE } from '../guides/europa/malta/malta.guide';
import { ROMA_VATICANO_GUIDE } from '../guides/europa/italia/roma-vaticano.guide';
import { BUCAREST_GUIDE } from '../guides/europa/rumania/bucarest.guide';
import { RIO_DE_JANEIRO_GUIDE } from '../guides/america/sudamerica/brasil/rio-janeiro.guide';

export interface FactoryGuideEntry {
  readonly path: string;
  readonly guide: unknown;
  readonly ruleSet: FactoryQaRuleSet;
}

const guideAssignments: readonly (readonly [unknown, FactoryQaRuleSet])[] = [
  [CADIZ_GUIDE, 'spanish-municipal'],
  [CHIPIONA_GUIDE, 'spanish-municipal'],
  [JEREZ_GUIDE, 'spanish-municipal'],
  [ROTA_GUIDE, 'spanish-municipal'],
  [SAN_FERNANDO_GUIDE, 'spanish-municipal'],
  [SANLUCAR_BARRAMEDA_GUIDE, 'spanish-municipal'],
  [TREBUJENA_GUIDE, 'spanish-municipal'],
  [VEJER_GUIDE, 'spanish-municipal'],
  [ALMENSILLA_GUIDE, 'spanish-municipal'],
  [CORIA_GUIDE, 'spanish-municipal'],
  [MAIRENA_ALJARAFE_GUIDE, 'spanish-municipal'],
  [COPENHAGUE_GUIDE, 'generic'],
  [MALMO_GUIDE, 'generic'],
  [MALTA_GUIDE, 'generic'],
  [ROMA_VATICANO_GUIDE, 'generic'],
  [BUCAREST_GUIDE, 'generic'],
  [RIO_DE_JANEIRO_GUIDE, 'generic']
];

const paths = new Set<string>();
const catalog: readonly FactoryGuideEntry[] = Object.freeze(guideAssignments.map(([guide, ruleSet]) => {
  const path = typeof guide === 'object' && guide !== null && !Array.isArray(guide)
    ? (guide as Record<string, unknown>)['path'] : undefined;
  if (typeof path !== 'string' || !path.trim()) {
    throw new Error('Cada guía del catálogo Factory debe declarar un path string no vacío.');
  }
  if (paths.has(path)) {
    throw new Error(`El catálogo Factory contiene un path duplicado: ${path}`);
  }
  paths.add(path);
  return Object.freeze({ path, guide, ruleSet });
}));

// El índice se construye solo después de validar todas las identidades.
const guidesByPath = new Map(catalog.map(entry => [entry.path, entry]));

export function getFactoryGuide(path: string): FactoryGuideEntry | undefined {
  return guidesByPath.get(path);
}

export function listFactoryGuides(): readonly FactoryGuideEntry[] {
  return catalog;
}
