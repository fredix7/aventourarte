import { RIO_DE_JANEIRO_GUIDE } from '../guides/america/sudamerica/brasil/rio-janeiro.guide';
import { CADIZ_GUIDE } from '../guides/europa/espana/andalucia/cadiz/cadiz.guide';
import { CHIPIONA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/chipiona.guide';
import { JEREZ_GUIDE } from '../guides/europa/espana/andalucia/cadiz/jerez.guide';
import { ROTA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/rota.guide';
import { SAN_FERNANDO_GUIDE } from '../guides/europa/espana/andalucia/cadiz/san-fernando.guide';
import { SANLUCAR_BARRAMEDA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/sanlucar-barrameda.guide';
import { TREBUJENA_GUIDE } from '../guides/europa/espana/andalucia/cadiz/trebujena.guide';
import { VEJER_GUIDE } from '../guides/europa/espana/andalucia/cadiz/vejer.guide';
import { ALMENSILLA_GUIDE } from '../guides/europa/espana/andalucia/sevilla/almensilla.guide';
import { MAIRENA_ALJARAFE_GUIDE } from '../guides/europa/espana/andalucia/sevilla/mairena-aljarafe.guide';
import { ROMA_VATICANO_GUIDE } from '../guides/europa/italia/roma-vaticano.guide';
import { LA_VALETA_GUIDE } from '../guides/europa/malta/la-valeta.guide';
import { BUCAREST_GUIDE } from '../guides/europa/rumania/bucarest.guide';
import {
  GASTRONOMY_ALLERGENS,
  dishAllergenProfile,
  profileAvoidsSelectedAllergens,
  profileHasSelectedAllergen
} from './gastronomy-allergens';

describe('gastronomy allergens', () => {
  const guides: any[] = [
    RIO_DE_JANEIRO_GUIDE,
    CADIZ_GUIDE,
    CHIPIONA_GUIDE,
    JEREZ_GUIDE,
    ROTA_GUIDE,
    SAN_FERNANDO_GUIDE,
    SANLUCAR_BARRAMEDA_GUIDE,
    TREBUJENA_GUIDE,
    VEJER_GUIDE,
    ALMENSILLA_GUIDE,
    MAIRENA_ALJARAFE_GUIDE,
    ROMA_VATICANO_GUIDE,
    LA_VALETA_GUIDE,
    BUCAREST_GUIDE
  ];

  it('defines the 14 EU allergens without duplicate identifiers', () => {
    expect(GASTRONOMY_ALLERGENS.length).toBe(14);
    expect(new Set(GASTRONOMY_ALLERGENS.map(allergen => allergen.id)).size).toBe(14);
  });

  it('has a profile for every published gastronomy card', () => {
    const gastronomyCards = guides.flatMap(guide =>
      guide.secciones
        .filter((section: any) => section.titulo === 'Gastronomía')
        .flatMap((section: any) => section.platos ?? [])
        .map((dish: any) => ({ guidePath: guide.path, name: dish.nombre }))
    );
    const missingProfiles = gastronomyCards.filter(
      dish => !dishAllergenProfile(dish.name, dish.guidePath)
    );

    expect(gastronomyCards.length).toBeGreaterThan(0);
    expect(missingProfiles).toEqual([]);
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

  it('does not highlight variable profiles or recipes with possible matches', () => {
    const variableProfile = dishAllergenProfile('Gelato', 'europa/italia/roma');
    const carbonara = dishAllergenProfile('Carbonara', 'europa/italia/roma');
    const sarmale = dishAllergenProfile('Sarmale', 'europa/rumania/bucarest');

    expect(profileAvoidsSelectedAllergens(variableProfile, ['pescado'])).toBeFalse();
    expect(profileAvoidsSelectedAllergens(carbonara, ['pescado'])).toBeTrue();
    expect(profileAvoidsSelectedAllergens(sarmale, ['leche'])).toBeFalse();
    expect(profileHasSelectedAllergen(sarmale, ['leche'])).toBeTrue();
  });
});
