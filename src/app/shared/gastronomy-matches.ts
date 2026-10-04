import {
  AllergenId,
  DishAllergenProfile,
  GASTRONOMY_ALLERGENS,
  profileHasSelectedAllergen
} from './gastronomy-allergens';
import {
  FoodPreferenceFilterResult,
  FoodPreferenceProfile,
  FoodPreferenceSelection,
  evaluateFoodPreferenceProfile,
  hasFoodPreferenceSelection
} from './gastronomy-preferences';

export interface GastronomyMatch {
  state: FoodPreferenceFilterResult;
  reasons: string[];
}

/** Usa únicamente los criterios activos y conserva la cautela de los filtros existentes. */
export function assessGastronomyMatch(
  food: FoodPreferenceProfile | null,
  allergens: DishAllergenProfile | null,
  selection: FoodPreferenceSelection,
  selectedAllergens: Iterable<AllergenId>
): GastronomyMatch {
  const selected = [...selectedAllergens];
  if (!hasFoodPreferenceSelection(selection) && !selected.length) {
    return { state: 'neutral', reasons: [] };
  }

  const conflicts: string[] = [];
  const unknowns: string[] = [];

  if (selection.diet) {
    const state = evaluateFoodPreferenceProfile(food, {
      diet: selection.diet, avoidAlcohol: false, avoidPork: false
    });
    if (state === 'incompatible') {
      conflicts.push(food?.dieta.certeza === 'confirmado' && food.dieta.compatibilidad === 'ninguno'
        ? 'La receta incluye carne'
        : food?.dieta.certeza === 'confirmado' && food.dieta.compatibilidad === 'pescetariano'
          ? 'La receta incluye pescado o marisco'
          : 'La receta incluye ingredientes de origen animal');
    } else if (state === 'unknown') {
      unknowns.push(food?.dieta.certeza === 'variable'
        ? 'La dieta depende de la variante'
        : 'Falta confirmar el tipo de alimentación');
    }
  }

  for (const restriction of [
    { active: selection.avoidAlcohol, value: food?.alcohol, name: 'alcohol' },
    { active: selection.avoidPork, value: food?.cerdo, name: 'cerdo' }
  ]) {
    if (!restriction.active) continue;
    if (restriction.value === 'contiene') {
      conflicts.push(`Contiene ${restriction.name}`);
    } else if (restriction.value !== 'no-contiene') {
      unknowns.push(restriction.value === 'puede-contener'
        ? `Puede contener ${restriction.name}; confirma la preparación`
        : `Falta confirmar si contiene ${restriction.name}`);
    }
  }

  if (selected.length) {
    if (profileHasSelectedAllergen(allergens, selected)) {
      for (const id of selected) {
        const label = GASTRONOMY_ALLERGENS.find(allergen => allergen.id === id)?.label ?? id;
        if (allergens?.contains.includes(id)) conflicts.push(`Contiene: ${label}`);
        else if (allergens?.possible?.includes(id)) conflicts.push(`Puede contener: ${label}`);
      }
    } else if (!allergens || allergens.status === 'variable') {
      unknowns.push(allergens
        ? 'Los alérgenos dependen de la variante'
        : 'Falta información sobre los alérgenos');
    }
  }

  return {
    state: conflicts.length ? 'incompatible' : unknowns.length ? 'unknown' : 'compatible',
    reasons: [...conflicts, ...unknowns]
  };
}
