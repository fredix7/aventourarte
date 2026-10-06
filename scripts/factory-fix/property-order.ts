import { fail } from './errors';
import { getSnapshotNode } from './snapshot';
import { type GuideNode, type GuideSnapshot } from './snapshot-contracts';
import { type DataTree } from './static-data';

const visitOrder = ['nombre', 'tiposPlan', 'descripcion', 'foto', 'fotos', 'horario', 'precio',
  'direccion', 'maps', 'telefono', 'web', 'reserva'] as const;
const fiestaOrder = ['nombre', 'descripcion', 'fecha', 'precio'] as const;
function scalarProperty(node: GuideNode | undefined, key: string): unknown {
  const child = node?.nodeKind === 'object' ? node.properties.find(p => p.name === key)?.node : undefined;
  return child && 'value' in child ? child.value : undefined;
}
// Only the exact ACTIVE Spanish contexts. Titles classify an already resolved container;
// they never resolve a target. International zones and gastronomy have no canonical order here.
export function activeOrder(snapshot: GuideSnapshot, container: GuideNode): readonly string[] | null {
  const location = container.location;
  const collectionLocation = location.at(-1) && 'element' in location.at(-1)! ? location.slice(0, -1) : location;
  if (collectionLocation.length !== 3 || !('property' in collectionLocation[0])
    || collectionLocation[0].property !== 'secciones' || !('element' in collectionLocation[1])
    || !('property' in collectionLocation[2]) || collectionLocation[2].property !== 'lugares') return null;
  const section = getSnapshotNode(snapshot, collectionLocation.slice(0, 2));
  const title = scalarProperty(section, 'titulo');
  if (snapshot.sourceIdentity.ruleSet === 'spanish-municipal'
    && title === `Qué visitar en ${scalarProperty(snapshot.root, 'nombre')}`) return visitOrder;
  if (snapshot.sourceIdentity.guidePath.startsWith('europa/espana/')
    && title === 'Fiestas y Festivos Principales') return fiestaOrder;
  return null;
}
function photoConflict(names: readonly string[], order: readonly string[]): void {
  if (order === visitOrder && names.includes('foto') && names.includes('fotos')) fail('OPERATION_UNSUPPORTED');
}
function rank(order: readonly string[], key: string): number {
  const index = order.indexOf(key);
  // foto/fotos share one ACTIVE slot; coexistence is PENDING and never resolved here.
  return order === visitOrder && key === 'fotos' ? order.indexOf('foto') : index;
}
export function propertyInsertionIndex(names: readonly string[], name: string, order: readonly string[] | null): number | null {
  if (!order) return null;
  photoConflict([...names, name], order);
  const desired = rank(order, name);
  if (desired < 0) return null;
  let lower = 0, upper = names.length;
  names.forEach((existing, index) => {
    const r = rank(order, existing);
    if (r >= 0 && r < desired) lower = Math.max(lower, index + 1);
    if (r > desired) upper = Math.min(upper, index);
  });
  if (lower > upper) fail('OPERATION_UNSUPPORTED');
  return upper < names.length ? upper : lower;
}
export function orderNewTree(tree: DataTree, order: readonly string[] | null): DataTree {
  if (!order || tree.kind !== 'object') return tree;
  photoConflict(tree.properties.map(p => p.name), order);
  const known = tree.properties.filter(p => rank(order, p.name) >= 0)
    .sort((a, b) => rank(order, a.name) - rank(order, b.name));
  return Object.freeze({ kind: 'object', properties: Object.freeze([
    ...known, ...tree.properties.filter(p => rank(order, p.name) < 0)
  ]) });
}
