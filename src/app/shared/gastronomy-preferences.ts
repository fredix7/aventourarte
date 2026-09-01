export type DietaryPreferenceId = 'vegetariano' | 'vegano' | 'pescetariano';

export type DietaryCompatibility = DietaryPreferenceId | 'ninguno';

export type FoodPreferenceFilterResult =
  | 'neutral'
  | 'compatible'
  | 'incompatible'
  | 'unknown';

export interface DietaryPreferenceDefinition {
  id: DietaryPreferenceId;
  label: string;
  symbol: string;
}

export type DietProfile =
  | { certeza: 'confirmado'; compatibilidad: DietaryCompatibility }
  | { certeza: 'variable' | 'desconocido' };

export type AlcoholProfile = 'contiene' | 'puede-contener' | 'no-contiene' | 'desconocido';
export type PorkProfile = 'contiene' | 'puede-contener' | 'no-contiene' | 'desconocido';

export interface FoodPreferenceProfile {
  dieta: DietProfile;
  alcohol: AlcoholProfile;
  cerdo: PorkProfile;
}

export interface FoodPreferenceSelection {
  diet: DietaryPreferenceId | null;
  avoidAlcohol: boolean;
  avoidPork: boolean;
}

export const DIETARY_PREFERENCES: readonly DietaryPreferenceDefinition[] = [
  { id: 'vegetariano', label: 'Vegetariano', symbol: '🥕' },
  { id: 'vegano', label: 'Vegano', symbol: '🌱' },
  { id: 'pescetariano', label: 'Pescetariano', symbol: '🐟' }
];

const DIET_COMPATIBILITY_RANK: Record<DietaryCompatibility, number> = {
  vegano: 0,
  vegetariano: 1,
  pescetariano: 2,
  ninguno: 3
};

export function evaluateFoodPreferenceProfile(
  profile: FoodPreferenceProfile | null,
  selection: FoodPreferenceSelection
): FoodPreferenceFilterResult {
  if (!selection.diet && !selection.avoidAlcohol && !selection.avoidPork) return 'neutral';
  if (!profile) return 'unknown';

  const results: FoodPreferenceFilterResult[] = [];

  if (selection.diet) {
    if (profile.dieta.certeza !== 'confirmado') {
      results.push('unknown');
    } else {
      const profileRank = DIET_COMPATIBILITY_RANK[profile.dieta.compatibilidad];
      const selectedRank = DIET_COMPATIBILITY_RANK[selection.diet];
      results.push(profileRank <= selectedRank ? 'compatible' : 'incompatible');
    }
  }

  if (selection.avoidAlcohol) {
    if (profile.alcohol === 'contiene') {
      results.push('incompatible');
    } else if (profile.alcohol === 'no-contiene') {
      results.push('compatible');
    } else {
      results.push('unknown');
    }
  }

  if (selection.avoidPork) {
    if (profile.cerdo === 'contiene') {
      results.push('incompatible');
    } else if (profile.cerdo === 'no-contiene') {
      results.push('compatible');
    } else {
      results.push('unknown');
    }
  }

  if (results.includes('incompatible')) return 'incompatible';
  if (results.includes('unknown')) return 'unknown';
  return 'compatible';
}

export function hasFoodPreferenceSelection(selection: FoodPreferenceSelection): boolean {
  return Boolean(selection.diet || selection.avoidAlcohol || selection.avoidPork);
}
