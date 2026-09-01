import {
  FoodPreferenceProfile,
  evaluateFoodPreferenceProfile,
  hasFoodPreferenceSelection
} from './gastronomy-preferences';
import { ALMENSILLA_GUIDE } from '../guides/europa/espana/andalucia/sevilla/almensilla.guide';

describe('gastronomy preferences', () => {
  const profile = (
    compatibility: 'vegano' | 'vegetariano' | 'pescetariano' | 'ninguno',
    alcohol: FoodPreferenceProfile['alcohol'] = 'no-contiene',
    pork: FoodPreferenceProfile['cerdo'] = 'no-contiene'
  ): FoodPreferenceProfile => ({
    dieta: { certeza: 'confirmado', compatibilidad: compatibility },
    alcohol,
    cerdo: pork
  });

  it('applies the dietary compatibility hierarchy', () => {
    expect(
      evaluateFoodPreferenceProfile(profile('vegano'), {
        diet: 'vegetariano',
        avoidAlcohol: false,
        avoidPork: false
      })
    ).toBe('compatible');
    expect(
      evaluateFoodPreferenceProfile(profile('vegetariano'), {
        diet: 'vegano',
        avoidAlcohol: false,
        avoidPork: false
      })
    ).toBe('incompatible');
    expect(
      evaluateFoodPreferenceProfile(profile('vegetariano'), {
        diet: 'pescetariano',
        avoidAlcohol: false,
        avoidPork: false
      })
    ).toBe('compatible');
  });

  it('requires confirmed absence of alcohol', () => {
    expect(
      evaluateFoodPreferenceProfile(profile('vegano', 'contiene'), {
        diet: null,
        avoidAlcohol: true,
        avoidPork: false
      })
    ).toBe('incompatible');
    expect(
      evaluateFoodPreferenceProfile(profile('vegano', 'puede-contener'), {
        diet: null,
        avoidAlcohol: true,
        avoidPork: false
      })
    ).toBe('unknown');
    expect(
      evaluateFoodPreferenceProfile(profile('vegano', 'no-contiene'), {
        diet: null,
        avoidAlcohol: true,
        avoidPork: false
      })
    ).toBe('compatible');
  });

  it('never treats missing or variable information as compatible', () => {
    expect(
      evaluateFoodPreferenceProfile(null, {
        diet: 'vegano',
        avoidAlcohol: false,
        avoidPork: false
      })
    ).toBe('unknown');
    expect(
      evaluateFoodPreferenceProfile(
        { dieta: { certeza: 'variable' }, alcohol: 'no-contiene', cerdo: 'no-contiene' },
        { diet: 'vegetariano', avoidAlcohol: false, avoidPork: false }
      )
    ).toBe('unknown');
  });

  it('combines diet and alcohol restrictions', () => {
    expect(
      evaluateFoodPreferenceProfile(profile('vegano', 'contiene'), {
        diet: 'vegano',
        avoidAlcohol: true,
        avoidPork: false
      })
    ).toBe('incompatible');
    expect(
      evaluateFoodPreferenceProfile(profile('vegano', 'no-contiene'), {
        diet: 'vegano',
        avoidAlcohol: true,
        avoidPork: false
      })
    ).toBe('compatible');
  });

  it('requires confirmed absence of pork', () => {
    expect(
      evaluateFoodPreferenceProfile(profile('vegano', 'no-contiene', 'contiene'), {
        diet: null,
        avoidAlcohol: false,
        avoidPork: true
      })
    ).toBe('incompatible');
    expect(
      evaluateFoodPreferenceProfile(profile('vegano', 'no-contiene', 'puede-contener'), {
        diet: null,
        avoidAlcohol: false,
        avoidPork: true
      })
    ).toBe('unknown');
    expect(
      evaluateFoodPreferenceProfile(profile('vegano', 'no-contiene', 'no-contiene'), {
        diet: null,
        avoidAlcohol: false,
        avoidPork: true
      })
    ).toBe('compatible');
  });

  it('keeps the neutral state until a filter is selected', () => {
    const selection = { diet: null, avoidAlcohol: false, avoidPork: false } as const;

    expect(hasFoodPreferenceSelection(selection)).toBeFalse();
    expect(evaluateFoodPreferenceProfile(null, selection)).toBe('neutral');
  });

  it('profiles every gastronomy card in the Almensilla pilot', () => {
    const gastronomyCards = ALMENSILLA_GUIDE.secciones
      .filter(section => section.titulo === 'Gastronomía')
      .flatMap(section => section.platos ?? []);

    expect(gastronomyCards.length).toBe(9);
    expect(gastronomyCards.every(item => 'perfilAlimentario' in item)).toBeTrue();
    expect(gastronomyCards.every(item => 'cerdo' in item.perfilAlimentario)).toBeTrue();
  });
});
