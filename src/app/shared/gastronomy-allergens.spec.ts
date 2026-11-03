import { GUIDE_REGISTRY } from '../components/guide-viewer/guide-viewer.component';
import {
  GASTRONOMY_ALLERGENS,
  dishAllergenProfile,
  resolveDishAllergenProfile,
  profileAvoidsSelectedAllergens,
  profileHasSelectedAllergen,
  classifySelectedAllergens
} from './gastronomy-allergens';

describe('gastronomy allergens', () => {
  const collectDishes = (section: any): any[] => [
    ...(section.platos ?? []),
    ...(section.subsecciones ?? []).flatMap(collectDishes)
  ];
  const gastronomyCards = Object.values(GUIDE_REGISTRY).flatMap(guide =>
    guide.secciones.flatMap(collectDishes)
      .map((dish: any) => ({ guidePath: guide.path, dish }))
  );

  it('defines the 14 EU allergens without duplicate identifiers', () => {
    expect(GASTRONOMY_ALLERGENS.length).toBe(14);
    expect(new Set(GASTRONOMY_ALLERGENS.map(allergen => allergen.id)).size).toBe(14);
  });

  it('has a profile for every published gastronomy card', () => {
    const missingProfiles = gastronomyCards.filter(
      card => !resolveDishAllergenProfile(card.dish, card.guidePath)
    );

    expect(gastronomyCards.length).toBeGreaterThan(0);
    expect(missingProfiles).toEqual([]);
    expect(gastronomyCards.filter(card => card.guidePath === 'europa/dinamarca/copenhague').length)
      .toBe(11);
    expect(gastronomyCards.filter(card => card.guidePath === 'europa/suecia/malmo').length)
      .toBe(6);
  });

  it('uses valid, distinct allergen identifiers on all published dishes', () => {
    const validIds = new Set(GASTRONOMY_ALLERGENS.map(allergen => allergen.id));
    for (const card of gastronomyCards) {
      const profile = resolveDishAllergenProfile(card.dish, card.guidePath);
      if (!profile) continue;
      const ids = [...profile.contains, ...(profile.possible ?? [])];
      expect(ids.every(id => validIds.has(id))).withContext(card.dish.nombre).toBeTrue();
      expect(new Set(ids).size).withContext(card.dish.nombre).toBe(ids.length);
    }
  });

  it('normalizes accents and applies guide-specific recipe variants', () => {
    const tortillitas = dishAllergenProfile('Tortillitas de camarones');

    expect(tortillitas?.contains).toContain('crustaceos');
    expect(tortillitas?.contains).toContain('gluten');
    expect(
      dishAllergenProfile(
        'Papas aliñás',
        'europa/espana/andalucia/cadiz/cadiz'
      )?.possible
    ).toContain('huevo');
    expect(
      dishAllergenProfile(
        'Papas aliñás',
        'europa/espana/andalucia/cadiz/san-fernando'
      )?.possible
    ).not.toContain('huevo');
  });

  it('keeps the card ingredients and preserves registry risks for variable recipes', () => {
    const profile = resolveDishAllergenProfile({
      nombre: 'Carbonara',
      alergenos: ['gluten'],
      perfilAlergenos: 'variable',
      posiblesAlergenos: ['leche']
    });

    expect(profile?.contains).toEqual(['gluten']);
    expect(profile?.possible).toEqual(['leche', 'huevo']);
    expect(profileAvoidsSelectedAllergens(profile, ['pescado'])).toBeFalse();
    expect(profileHasSelectedAllergen(profile, ['leche'])).toBeTrue();
    expect(profileHasSelectedAllergen(profile, ['huevo'])).toBeTrue();
    expect(resolveDishAllergenProfile({ nombre: 'Carbonara' }))
      .toEqual(dishAllergenProfile('Carbonara'));
    expect(resolveDishAllergenProfile(null)).toBeNull();
  });

  it('lets explicitly complete recipes override registry variants', () => {
    const profile = resolveDishAllergenProfile({
      nombre: 'Carbonara', alergenos: ['gluten'], perfilAlergenos: 'complete',
      posiblesAlergenos: ['leche']
    });
    expect(profile).toEqual({ status: 'complete', contains: ['gluten'], possible: ['leche'] });
    expect(profileAvoidsSelectedAllergens(profile, ['huevo'])).toBeTrue();
  });

  it('deduplicates inline and registry allergens without listing confirmed ingredients as possible', () => {
    const profile = resolveDishAllergenProfile({
      nombre: 'Carbonara', alergenos: ['gluten', 'huevo', 'gluten'],
      perfilAlergenos: 'variable', posiblesAlergenos: ['leche', 'huevo', 'leche']
    });
    expect(profile).toEqual({ status: 'variable', contains: ['gluten', 'huevo'], possible: ['leche'] });
  });

  it('distinguishes confirmed and possible allergens from missing data and no selection', () => {
    const variable = { status: 'variable' as const, contains: ['gluten'] as const, possible: ['huevo'] as const };
    const profile = { ...variable, contains: [...variable.contains], possible: [...variable.possible] };
    expect(classifySelectedAllergens(profile, [])).toBe('sin-filtro');
    expect(classifySelectedAllergens(null, ['huevo'])).toBe('sin-datos');
    expect(classifySelectedAllergens(profile, ['gluten', 'huevo'])).toBe('contiene');
    expect(classifySelectedAllergens(profile, ['huevo'])).toBe('posible');
    expect(classifySelectedAllergens(profile, ['leche'])).toBe('sin-datos');
    expect(classifySelectedAllergens({ ...profile, status: 'complete' }, ['leche']))
      .toBe('no-identificado-en-receta');
  });

  it('does not highlight variable profiles or recipes with possible matches', () => {
    const variableProfile = dishAllergenProfile('Gelato', 'europa/italia/roma');
    const carbonara = dishAllergenProfile('Carbonara', 'europa/italia/roma');
    const sarmale = dishAllergenProfile('Sarmale', 'europa/rumania/bucarest');

    expect(profileAvoidsSelectedAllergens(variableProfile, ['pescado'])).toBeFalse();
    expect(profileAvoidsSelectedAllergens(carbonara, ['pescado'])).toBeTrue();
    expect(profileAvoidsSelectedAllergens(sarmale, ['leche'])).toBeFalse();
    expect(profileHasSelectedAllergen(sarmale, ['leche'])).toBeTrue();
  });

  it('requires an explicit complete status before treating an inline recipe as compatible', () => {
    const unconfirmed = resolveDishAllergenProfile({ nombre: 'Receta sin confirmar', alergenos: [] });
    expect(unconfirmed?.status).toBe('variable');
    expect(profileAvoidsSelectedAllergens(unconfirmed, ['gluten'])).toBeFalse();

    const confirmed = resolveDishAllergenProfile({
      nombre: 'Receta confirmada', alergenos: [], perfilAlergenos: 'complete'
    });
    expect(confirmed?.status).toBe('complete');
    expect(profileAvoidsSelectedAllergens(confirmed, ['gluten'])).toBeTrue();
  });
});
