import { assessGastronomyMatch } from './gastronomy-matches';
import { FoodPreferenceProfile, FoodPreferenceSelection } from './gastronomy-preferences';

describe('gastronomy match explanations', () => {
  const vegan: FoodPreferenceProfile = {
    dieta: { certeza: 'confirmado', compatibilidad: 'vegano' },
    alcohol: 'no-contiene', cerdo: 'no-contiene'
  };
  const selection: FoodPreferenceSelection = {
    diet: 'vegano', avoidAlcohol: true, avoidPork: true
  };

  it('only requires information for the selected criteria', () => {
    expect(assessGastronomyMatch(vegan, null, selection, [])).toEqual({
      state: 'compatible', reasons: []
    });
    expect(assessGastronomyMatch(null, { status: 'complete', contains: [] }, {
      diet: null, avoidAlcohol: false, avoidPork: false
    }, ['gluten'])).toEqual({ state: 'compatible', reasons: [] });
  });

  it('keeps missing profiles neutral until filters are selected', () => {
    expect(assessGastronomyMatch(null, null, {
      diet: null, avoidAlcohol: false, avoidPork: false
    }, [])).toEqual({ state: 'neutral', reasons: [] });
  });

  it('lists all missing selected information without declaring a match', () => {
    const match = assessGastronomyMatch(null, null, selection, ['gluten']);
    expect(match.state).toBe('unknown');
    expect(match.reasons).toEqual([
      'Falta confirmar el tipo de alimentación',
      'Falta confirmar si contiene alcohol',
      'Falta confirmar si contiene cerdo',
      'Falta información sobre los alérgenos'
    ]);
  });

  it('distinguishes possible allergens from confirmed ingredients and blocks both', () => {
    const match = assessGastronomyMatch(vegan, {
      status: 'complete', contains: ['leche'], possible: ['gluten']
    }, selection, ['gluten', 'leche']);
    expect(match.state).toBe('incompatible');
    expect(match.reasons).toEqual(['Puede contener: Cereales con gluten', 'Contiene: Leche']);
  });

  it('prioritizes a known conflict over uncertainties and explains both', () => {
    const match = assessGastronomyMatch({ ...vegan, cerdo: 'contiene', alcohol: 'puede-contener' },
      null, selection, ['gluten']);
    expect(match.state).toBe('incompatible');
    expect(match.reasons).toEqual([
      'Contiene cerdo',
      'Puede contener alcohol; confirma la preparación',
      'Falta información sobre los alérgenos'
    ]);
  });

  it('keeps variable recipes pending even without a declared allergen conflict', () => {
    const match = assessGastronomyMatch({ ...vegan, dieta: { certeza: 'variable' } }, {
      status: 'variable', contains: ['pescado']
    }, { diet: 'vegetariano', avoidAlcohol: false, avoidPork: false }, ['leche']);
    expect(match.state).toBe('unknown');
    expect(match.reasons).toEqual([
      'La dieta depende de la variante', 'Los alérgenos dependen de la variante'
    ]);
  });

  it('explains the dietary ingredient responsible for a mismatch', () => {
    expect(assessGastronomyMatch({ ...vegan,
      dieta: { certeza: 'confirmado', compatibilidad: 'pescetariano' }
    }, null, selection, []).reasons).toEqual(['La receta incluye pescado o marisco']);
    expect(assessGastronomyMatch({ ...vegan,
      dieta: { certeza: 'confirmado', compatibilidad: 'vegetariano' }
    }, null, selection, []).reasons).toEqual(['La receta incluye ingredientes de origen animal']);
  });
});
