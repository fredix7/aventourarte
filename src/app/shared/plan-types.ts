export type PlanTypeId =
  | 'ruta'
  | 'opcional'
  | 'playa'
  | 'urbano'
  | 'naturaleza'
  | 'museo'
  | 'gratuito'
  | 'de-pago'
  | 'coste-variable';

export type PlanTypeGroup = 'formato' | 'entorno' | 'coste';

export interface PlanTypeDefinition {
  id: PlanTypeId;
  label: string;
  icon: string;
  group: PlanTypeGroup;
}

export interface PlanTypedItem {
  nombre?: string;
  tiposPlan?: readonly PlanTypeId[];
}

export const PLAN_TYPES: readonly PlanTypeDefinition[] = [
  { id: 'ruta', label: 'Ruta', icon: 'route', group: 'formato' },
  { id: 'opcional', label: 'Opcional', icon: 'add_circle_outline', group: 'formato' },
  { id: 'playa', label: 'Playa', icon: 'beach_access', group: 'entorno' },
  { id: 'urbano', label: 'Urbano', icon: 'location_city', group: 'entorno' },
  { id: 'naturaleza', label: 'Naturaleza', icon: 'forest', group: 'entorno' },
  { id: 'museo', label: 'Museo', icon: 'museum', group: 'entorno' },
  { id: 'gratuito', label: 'Gratuito', icon: 'money_off', group: 'coste' },
  { id: 'de-pago', label: 'De pago', icon: 'payments', group: 'coste' },
  { id: 'coste-variable', label: 'Coste variable', icon: 'price_change', group: 'coste' }
];

/**
 * Devuelve exclusivamente la clasificación editorial declarada en la ficha.
 * No interpreta el nombre, la sección, la descripción ni el precio.
 */
export function planTypesFor(item: PlanTypedItem): readonly PlanTypeDefinition[] {
  const ids = new Set<PlanTypeId>(item.tiposPlan ?? []);
  return PLAN_TYPES.filter(planType => ids.has(planType.id));
}
