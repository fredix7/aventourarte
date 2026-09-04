export type AllergenId =
  | 'gluten'
  | 'crustaceos'
  | 'huevo'
  | 'pescado'
  | 'cacahuetes'
  | 'soja'
  | 'leche'
  | 'frutos-cascara'
  | 'apio'
  | 'mostaza'
  | 'sesamo'
  | 'sulfitos'
  | 'altramuces'
  | 'moluscos';

export interface AllergenDefinition {
  id: AllergenId;
  label: string;
  shortLabel: string;
  symbol: string;
}

export interface DishAllergenProfile {
  /** Solo los perfiles completos pueden considerarse compatibles con una selección. */
  status?: 'complete' | 'variable';
  /** Ingredientes alergénicos propios de la receta tradicional descrita. */
  contains: AllergenId[];
  /** Ingredientes que dependen de la variante, el relleno o la preparación. */
  possible?: AllergenId[];
}

export const GASTRONOMY_ALLERGENS: readonly AllergenDefinition[] = [
  { id: 'gluten', label: 'Cereales con gluten', shortLabel: 'Gl', symbol: '🌾' },
  { id: 'crustaceos', label: 'Crustáceos', shortLabel: 'Cr', symbol: '🦐' },
  { id: 'huevo', label: 'Huevo', shortLabel: 'Hu', symbol: '🥚' },
  { id: 'pescado', label: 'Pescado', shortLabel: 'Pe', symbol: '🐟' },
  { id: 'cacahuetes', label: 'Cacahuetes', shortLabel: 'Ca', symbol: '🥜' },
  { id: 'soja', label: 'Soja', shortLabel: 'So', symbol: '🌱' },
  { id: 'leche', label: 'Leche', shortLabel: 'Le', symbol: '🥛' },
  { id: 'frutos-cascara', label: 'Frutos de cáscara', shortLabel: 'Fr', symbol: '🌰' },
  { id: 'apio', label: 'Apio', shortLabel: 'Ap', symbol: '🥬' },
  { id: 'mostaza', label: 'Mostaza', shortLabel: 'Mo', symbol: '🟡' },
  { id: 'sesamo', label: 'Sésamo', shortLabel: 'Se', symbol: '⚪' },
  { id: 'sulfitos', label: 'Sulfitos', shortLabel: 'Su', symbol: '🍷' },
  { id: 'altramuces', label: 'Altramuces', shortLabel: 'Al', symbol: '🌼' },
  { id: 'moluscos', label: 'Moluscos', shortLabel: 'Ml', symbol: '🐚' }
];

const complete = (
  contains: AllergenId[] = [],
  possible: AllergenId[] = []
): DishAllergenProfile => ({ status: 'complete', contains, possible });

const variable = (
  contains: AllergenId[] = [],
  possible: AllergenId[] = []
): DishAllergenProfile => ({ status: 'variable', contains, possible });

const DISH_ALLERGEN_PROFILES: Record<string, DishAllergenProfile> = Object.fromEntries(
  ([
    // Río de Janeiro
    ['Caipirinha', complete()],
    ['Picanha (corte de carne brasileña)', complete()],
    ['Brigadeiro', complete(['leche'], ['soja'])],
    ['Feijoada', complete()],
    ['Moqueca', complete([], ['pescado', 'crustaceos', 'moluscos'])],
    ['Guayaba (fruta local)', complete()],

    // Roma
    ['Carbonara', complete(['gluten', 'huevo', 'leche'])],
    ['Cacio e pepe', complete(['gluten', 'leche'])],
    ['Bucatini all’amatriciana', complete(['gluten', 'leche'])],
    ['Lasaña', complete(['gluten', 'leche'], ['huevo', 'apio', 'sulfitos'])],
    ['Pizza romana', variable(['gluten'], ['leche', 'pescado'])],
    ['Pizza bianca / pizza rossa', complete(['gluten'])],
    ['Pinsa romana', variable(['gluten'], ['soja', 'leche', 'pescado'])],
    ['Focaccia', complete(['gluten'])],
    ['Panini', variable(['gluten'], ['leche'])],
    ['Supplì', complete(['leche'], ['gluten', 'huevo'])],
    ['Carciofi alla giudia', complete()],
    ['Fiori di zucca fritti', complete(['leche', 'pescado'], ['gluten', 'huevo'])],
    ['Saltimbocca alla romana', complete([], ['sulfitos'])],
    ['Polpette al sugo', complete(['gluten', 'huevo'], ['leche'])],
    ['Spritz Aperol', complete(['sulfitos'])],
    ['Tiramisú', complete(['gluten', 'huevo', 'leche'])],
    ['Gelato', variable([], ['leche', 'huevo', 'frutos-cascara', 'soja'])],

    // Malta
    ['🐇 Fenek (Conejo Maltés)', complete([], ['gluten', 'sulfitos'])],
    ['🐟 Pescado y Marisco Maltés', variable([], ['pescado', 'moluscos', 'crustaceos', 'gluten', 'sulfitos'])],
    ['🥖 Ftira', complete(['gluten'], ['pescado', 'leche'])],
    ['🥐 Pastizzi', complete(['gluten'], ['leche'])],
    ['🥟 Qassatat', variable(['gluten'], ['leche'])],
    ['🧀 Ġbejna', complete(['leche'], ['gluten'])],
    ['🍰 Imqaret', complete(['gluten'], ['leche', 'huevo', 'soja'])],

    // Bucarest
    ['Sarmale', complete([], ['leche'])],
    ['Mici', complete([], ['mostaza', 'gluten'])],
    ['Covrigi', complete(['gluten'], ['sesamo', 'leche'])],
    ['Covrig relleno (Twist)', variable(['gluten'], ['leche'])],
    ['Zacuscă', complete([], ['gluten'])],
    ['Ciorbă de fasole', variable([], ['gluten', 'apio'])],
    ['Varză călită', complete()],
    ['Plăcintă', variable(['gluten'], ['leche', 'huevo'])],
    ['Cozonac', variable(['gluten'], ['huevo', 'leche', 'frutos-cascara'])],
    ['Palinca', complete()],
    ['Ensalada de berenjenas', variable([], ['gluten', 'huevo', 'mostaza'])],
    ['Tochitură', variable(['huevo', 'leche'])],

    // Cádiz
    ['Pescaíto frito', variable(['pescado'], ['gluten', 'moluscos'])],
    ['Cazón en adobo', complete(['pescado'], ['gluten'])],
    ['Ortiguillas fritas', complete([], ['gluten'])],
    ['Huevas aliñadas', complete(['pescado'], ['sulfitos'])],
    ['Dobladillo de caballa', complete(['gluten', 'pescado', 'huevo'], ['mostaza'])],
    ['Caballa con piriñaca', complete(['pescado'], ['sulfitos'])],
    ['Caballa con babetas o fideos con caballa', complete(['gluten', 'pescado'])],
    ['Menudo gaditano', variable([], ['gluten'])],
    ['Papas con choco', complete(['moluscos'], ['sulfitos', 'gluten'])],
    ['Chicharrones especiales de Cádiz', variable([], ['gluten'])],
    ['Ropa vieja gaditana', variable([], ['sulfitos', 'pescado'])],
    ['Carne al toro', complete([], ['sulfitos', 'gluten'])],
    ['Pollo a la canilla', complete([], ['sulfitos'])],
    ['Pan de Cádiz o turrón de Cádiz', complete(['huevo', 'frutos-cascara'])],
    ['Erizos de mar y ostiones del Carnaval', complete(['moluscos'])],
    ['Panizas y huevos de fraile', variable()],

    // Jerez
    ['Riñones al Jerez', complete([], ['sulfitos', 'gluten'])],
    ['Berza jerezana', variable([], ['gluten'])],
    ['Ajo jerezano o ajo caliente', complete(['gluten'], ['huevo'])],
    ['Chicharrones de Jerez', variable([], ['gluten'])],
    ['Alcauciles a la jerezana', complete([], ['sulfitos', 'gluten'])],
    ['Aneto jerezano', variable([], ['gluten', 'huevo', 'leche', 'sulfitos'])],
    ['Tocino de cielo', complete(['huevo'])],
    ['Vinagre de Jerez', complete([], ['sulfitos'])],
    ['Vino Fino', complete([], ['sulfitos'])],
    ['Vino Amontillado', complete([], ['sulfitos'])],
    ['Vino Oloroso', complete([], ['sulfitos'])],
    ['Vino Palo Cortado', complete([], ['sulfitos'])],
    ['Vino Pedro Ximénez (PX)', complete([], ['sulfitos'])],
    ['Vino Cream', complete([], ['sulfitos'])],
    ['Vino Mosto de Jerez', complete([], ['sulfitos'])],
    ['Brandy de Jerez', variable()],

    // Rota
    ['Arranque roteño', complete(['gluten'])],
    ['Berza roteña', variable([], ['apio'])],
    ['Urta a la roteña', complete(['pescado'], ['sulfitos'])],
    ['Pizza roteña', variable(['gluten', 'leche'], ['pescado', 'crustaceos', 'huevo'])],
    ['Arroz al Shorty’s', variable(['crustaceos'], ['huevo', 'soja', 'gluten'])],
    ['Mayetito', variable(['huevo', 'frutos-cascara'], ['gluten', 'leche', 'soja'])],
    ['Tintilla de Rota', complete([], ['sulfitos'])],

    // Chipiona
    ['Moscatel de Chipiona', complete([], ['sulfitos'])],
    ['Langostinos de Chipiona', complete(['crustaceos'])],
    ['Galeras y sopa de galeras', variable(['crustaceos'], ['gluten'])],
    ['Pescados de costa de Chipiona', variable(['pescado'], ['gluten', 'sulfitos'])],
    ['Corvina al horno', complete(['pescado'], ['sulfitos'])],
    ['Frituras marineras de Chipiona', variable(['pescado', 'moluscos'], ['gluten', 'sulfitos'])],
    ['Cazón en tomate o en amarillo', variable(['pescado'], ['gluten', 'sulfitos'])],
    ['Raya en pimentón', variable(['pescado'], ['gluten', 'sulfitos'])],
    ['Menudo de choco', variable(['moluscos'], ['gluten', 'sulfitos'])],
    ['Tomates de Chipiona', complete()],
    ['Berza chipionera', variable([], ['apio', 'gluten', 'sulfitos'])],
    ['Carne ibérica al moscatel', variable(['sulfitos'], ['gluten'])],
    ['Cachitos', variable(['gluten'], ['leche', 'soja', 'mostaza', 'sulfitos'])],
    ['Poleá con coscorrones', variable(['gluten'], ['leche'])],

    // San Fernando
    ['Camarón de la Bahía', complete(['crustaceos'])],
    ['Cañaílla', complete(['moluscos'])],
    ['Bienmesabe (Cazón en adobo)', complete(['pescado'], ['gluten', 'sulfitos'])],
    ['Bocas de La Isla y mariscos de caños y esteros', complete(['crustaceos', 'moluscos'])],
    ['Pescados de estero', variable(['pescado'], ['gluten', 'sulfitos'])],
    ['Sal marina virgen y flor de sal de San Fernando', complete()],
    ['Papas con chocos', complete(['moluscos'], ['sulfitos', 'gluten'])],
    ['Papas guisadas con anguila en amarillo', variable(['pescado'], ['gluten', 'sulfitos'])],
    ['Caballa isleña: con tomate y fideos, en adobo y asada con piriñaca', variable(['pescado'], ['gluten', 'sulfitos'])],
    ['Coquinas a la marinera', complete(['moluscos'], ['gluten', 'sulfitos'])],
    ['Churros', variable(['gluten'], ['huevo', 'leche'])],
    ['Roscos de Semana Santa', variable(['gluten', 'huevo'], ['leche'])],
    
    // Sanlúcar
    ['Langostino de Sanlúcar', complete(['crustaceos'])],
    ['Tortillitas de Camarones', complete(['gluten', 'crustaceos'])],
    ['Papas Aliñás', variable([], ['sulfitos', 'pescado'])],
    ['Salpicón de Marisco', variable([], ['crustaceos', 'moluscos', 'pescado', 'sulfitos'])],
    ['Guisos Marineros', variable([], ['gluten', 'pescado', 'crustaceos', 'moluscos', 'sulfitos'])],
    ['Sopa de Galeras', variable(['crustaceos'], ['moluscos', 'sulfitos'])],
    ['Alpisteras de Sanlúcar', complete(['gluten', 'huevo'])],
    ['Manzanilla de Sanlúcar', complete([], ['sulfitos'])],

    // Trebujena
    ['Garbanzos como conejo', complete([], ['sulfitos'])],
    ['Ajo caliente o ajo trebujenero', complete(['gluten'])],
    ['Garbanzos con cardos de aporcar', variable([], ['gluten', 'sulfitos'])],
    ['Habas en cuero', complete()],
    ['Papa con asadura', variable([], ['sulfitos'])],
    ['Papas con alcauciles', complete(['gluten'], ['sulfitos'])],
    ['Sangre con tomate', variable([], ['sulfitos'])],
    ['Sopa de tomate', variable(['gluten'], ['huevo'])],
    ['Albur de estero (lisa de estero)', variable(['pescado'], ['gluten', 'sulfitos'])],
    ['Espoleá', complete(['gluten', 'leche'])],
    ['Hornazo de Trebujena', complete(['gluten', 'sesamo'], ['sulfitos'])],
    ['Castañas con arroz', complete()],
    ['Mosto de Trebujena', complete([], ['sulfitos'])],
    ['Trebujito', complete([], ['sulfitos'])],
    ['Mistela', complete([], ['sulfitos'])],

    // Vejer
    ['Lomo en manteca', complete([], ['gluten'])],
    ['Almuerzo campero', complete([], ['sulfitos', 'gluten'])],
    ['Berza vejeriega', variable([], ['gluten'])],
    ['Ternera de La Janda y carne retinta', variable([], ['gluten', 'huevo', 'leche', 'sulfitos'])],
    ['Atún rojo de almadraba', variable(['pescado'])],
    ['Pan duro', variable([], ['gluten', 'sesamo', 'sulfitos'])],
    ['Tortas vejeriegas', complete(['gluten'])],
    ['Rosquetes vejeriegos', complete(['gluten', 'huevo'], ['sesamo'])],
    ['Vinos de Vejer y Tierra de Cádiz', complete([], ['sulfitos'])],

     // Almensilla
    ['Aceitunas de mesa de Almensilla', variable([], ['sulfitos'])],
    ['Pan tostado con aceite de oliva y sardinas de La Tostá', complete(['gluten', 'pescado'], ['sesamo'])],
    ['Sopeao de Almensilla y piri', variable(['gluten', 'huevo', 'pescado'])],
    ['Migas con jamón y pasas', complete(['gluten'], ['sulfitos'])],
    ['Alcauciles rellenos de carne de cerdo', variable([], ['gluten', 'huevo', 'leche', 'sulfitos'])],
    ['Liebre almensillera: sopa y arroz', variable([], ['gluten', 'huevo', 'sulfitos'])],
    ['Galletas fritas y rollitos de masa rellenos de flan', variable(['gluten'], ['huevo', 'leche', 'soja'])],
    ['Repostería de Semana Santa: hojuelas, torrijas, rosquitos, pestiños, rosas y empanadillas', variable(['gluten'], ['huevo', 'leche', 'sesamo', 'sulfitos', 'frutos-cascara'])],
    ['Mosto de Almensilla', complete([], ['sulfitos'])],

    // Coria del Río
    ['Albures de Coria y sus preparaciones tradicionales', variable(['pescado'], ['gluten', 'crustaceos', 'sulfitos'])],
    ['Torteritos de albur', variable(['pescado', 'gluten'], ['huevo'])],
    ['Camarones de Coria', variable(['crustaceos'], ['gluten', 'huevo'])],
    ['Arroz con cangrejo', variable(['crustaceos'], ['moluscos', 'pescado', 'sulfitos'])],
    ['Orejitas de Abad', variable(['gluten', 'huevo'], ['sesamo'])],
    ['Keicho Sake o Sake de Coria', complete(['leche'])],
    
    // Mairena del Aljarafe
    ['Mosto del Aljarafe', variable([], ['sulfitos'])],
    ['Sopeao del Aljarafe', complete(['gluten'])],
    ['Aliños, picadillos y ensaladas del Aljarafe', variable([], ['pescado', 'huevo', 'crustaceos', 'moluscos'])],
    ['Aceitunas Manzanilla y Gordal de Sevilla', variable([], ['pescado', 'frutos-cascara'])],
    ['Caldereta del Aljarafe', variable([], ['sulfitos'])],
    ['Menudo con garbanzos', variable([], ['gluten'])],
    ['Carrillada', variable([], ['sulfitos'])],
    ['Cola de toro', variable([], ['sulfitos', 'gluten', 'huevo', 'leche'])],
    ['Ropa vieja de puchero', variable()],
    ['Tostón de sardinas', complete(['gluten', 'pescado'], ['leche'])],

  ] as [string, DishAllergenProfile][]).map(([name, profile]) => [normalizeDishName(name), profile])
);

const GUIDE_DISH_ALLERGEN_OVERRIDES: Record<string, DishAllergenProfile> = {
  [guideDishKey('europa/espana/andalucia/cadiz/cadiz', 'Pescaíto frito')]:
    variable(['pescado'], ['gluten', 'moluscos']),
  [guideDishKey('europa/espana/andalucia/cadiz/cadiz', 'Papas aliñás')]:
    variable([], ['pescado', 'huevo', 'sulfitos']),
  [guideDishKey('europa/espana/andalucia/cadiz/san-fernando', 'Pescaíto frito')]:
    variable(['pescado'], ['gluten', 'moluscos', 'sulfitos']),
  [guideDishKey('europa/espana/andalucia/cadiz/san-fernando', 'Papas aliñás')]:
    variable([], ['pescado', 'sulfitos'])
};

export function dishAllergenProfile(name: string, guidePath = ''): DishAllergenProfile | null {
  const guideProfile = GUIDE_DISH_ALLERGEN_OVERRIDES[guideDishKey(guidePath, name)];
  if (guideProfile) return guideProfile;

  return DISH_ALLERGEN_PROFILES[normalizeDishName(name)] ?? null;
}

export function profileAvoidsSelectedAllergens(
  profile: DishAllergenProfile | null,
  selectedAllergens: Iterable<AllergenId>
): boolean {
  const selected = new Set(selectedAllergens);
  if (!selected.size || !profile || profile.status === 'variable') return false;

  return ![...profile.contains, ...(profile.possible ?? [])]
    .some(allergenId => selected.has(allergenId));
}

export function profileHasSelectedAllergen(
  profile: DishAllergenProfile | null,
  selectedAllergens: Iterable<AllergenId>
): boolean {
  const selected = new Set(selectedAllergens);
  if (!selected.size || !profile) return false;

  return [...profile.contains, ...(profile.possible ?? [])]
    .some(allergenId => selected.has(allergenId));
}

function guideDishKey(guidePath: string, name: string): string {
  return `${(guidePath || '').toLowerCase()}|${normalizeDishName(name)}`;
}

function normalizeDishName(name: string): string {
  return (name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase();
}
