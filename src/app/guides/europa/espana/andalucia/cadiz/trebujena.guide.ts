export const TREBUJENA_GUIDE = {
  path: 'europa/espana/andalucia/cadiz/trebujena',
  nombre: 'Trebujena',
  flag: 'assets/europa/espana/andalucia/cadiz/trebujena/trebujena-flag.png',
  background: 'assets/europa/espana/andalucia/cadiz/trebujena/trebujena-bg.jpg',

  //Encuadre escritorio
  bgPos: '50% 65%',
  //Encuadre Móvil
  bgPosMobile: '50% 88%',
  bgDim: 0.10,
  flagOverlay: true,
  //Transparencia bandera
  flagOpacity: 0.12,
  flagOpacityMobile: 0.18,
  //Tamaño bandera overlay
  flagSize: '75%',
  flagSizeMobile: '50%',

  descripcion:
    'Trebujena es un municipio gaditano situado junto al río Guadalquivir y las marismas de Doñana. Con una fuerte identidad agrícola y popular, es conocida por su vino mosto, sus fiestas singulares, su paisaje natural y su carácter auténtico.',

  secciones: [
    {
      titulo: 'Historia',
      contenido:
        'Trebujena cuenta con orígenes romanos y andalusíes, favorecidos por la fertilidad de las tierras del bajo Guadalquivir. Durante siglos fue un núcleo agrícola ligado a la vid y al cereal, desarrollando una identidad propia muy marcada que aún se conserva en sus tradiciones, fiestas y forma de vida.'
    },
    {
      titulo: 'Geografía y Clima',
      contenido:
        'Situada en el noroeste de la provincia de Cádiz, Trebujena se extiende entre el río Guadalquivir y las marismas. Disfruta de un clima mediterráneo con influencia atlántica, con veranos cálidos pero suavizados por la brisa y inviernos templados.'
    },
    {
      titulo: 'Qué visitar en Trebujena',
      lugares: [
        {
          nombre: 'Monumento a la Vendimia',
          descripcion:
            'Escultura que rinde homenaje a la tradición vitivinícola del municipio y al trabajo agrícola vinculado al mosto.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/monumento-vendimia.jpg',
        },
        {
          nombre: 'Plaza de España',
          descripcion:
            'Centro neurálgico del municipio, punto de encuentro social donde se celebran actos, fiestas y la vida cotidiana del pueblo.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/plz-espana.jpg',
        },
        {
          nombre: 'Ayuntamiento de Trebujena',
          descripcion:
            'Edificio institucional situado en la Plaza de España con fachada académica inspirada en el estilo neoclásico, estructurado en dos cuerpos bien proporcionados. Representa el corazón de la vida administrativa y social del municipio y se encuentra junto a la emblemática Parroquia de la Purísima Concepción, construida en el siglo XVII.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/ayto-trebujena.jpg',
          horario: 'Exterior visitable'
        },
        {
          nombre: 'Parroquia de la Purísima Concepción',
          descripcion:
            'Principal templo religioso de Trebujena. De estilo barroco, es uno de los edificios más representativos del patrimonio histórico y espiritual del pueblo.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/iglesia-purisima-concepcion.jpg',
          horario: 'Horario de culto',
          precio: 'Gratis'
        },
        {
          nombre: 'Palomar',
          descripcion:
            'Edificación tradicional de mampostería y planta cilíndrica, situada en las proximidades de la Avenida del Guadalquivir. Destaca por su segundo cuerpo cilíndrico con orificios de cerámica destinados a la entrada de palomas, siendo considerado uno de los palomares más interesantes de Andalucía.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/palomar.jpg',
          horario: 'Exterior visitable'
        },
        {
          nombre: 'Castillo de Pérez de Guzmán',
          descripcion:
            'Fortificación medieval construida entre los siglos XIII y comienzos del XIV, con origen en una antigua torre vigía integrada en una red defensiva que controlaba el territorio y el río Guadalquivir. A finales del siglo XIII, Alonso Pérez de Guzmán “Guzmán el Bueno” impulsó su transformación en castillo para asegurar el dominio militar y económico de la zona.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/castillo-trebujena.jpg',
          horario: 'Lunes a viernes de 10:00 a 14:00',
          precio: 'Gratis'
        },
        {
          nombre: 'Parque de la Toya',
          descripcion:
            'Parque urbano situado en la parte más oriental del casco urbano de Trebujena. De forma alargada y cerrado con rejería tradicional, es el principal pulmón verde del municipio y uno de sus espacios sociales más importantes. Uno de sus mayores atractivos es la presencia de fauna urbana: pavos reales que campan libremente por el parque, patos, gallinas y otras aves, lo que lo convierte en un lugar especialmente agradable para pasear y para visitar con niños.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/parque-toya.jpg',
          horario: 'Abierto todo el día',
          precio: 'Gratis'
        },
        {
          nombre: 'Ermita de Nuestra Señora de Palomares',
          descripcion:
            'Templo situado en las afueras del casco urbano, muy ligado a la historia agrícola y espiritual de Trebujena. Está dedicado a la Virgen de Palomares, patrona de la ciudad y es un lugar de especial devoción popular, especialmente durante celebraciones y romerías locales.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/ermita-palomares.jpg',
          horario: 'Horario de culto y eventos puntuales',
          precio: 'Gratis'
        },
        {
          nombre: 'Ruinas del Molino de las Haciendas',
          descripcion:
            'Restos de uno de los mayores molinos de aceite de la zona, situado a unos 2 km del casco urbano en el Camino de las Haciendas. Destaca un gran torreón de unos 10 metros de altura, visible desde varios puntos, junto a lienzos de muralla y restos de la construcción original. Testimonio del pasado agrícola e industrial de Trebujena.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/molino-haciendas.jpg',
          horario: 'Acceso libre',
          precio: 'Gratis'
        },
        {
          nombre: 'Puesta de sol en las Marismas de Trebujena',
          descripcion:
            'Uno de los atardeceres más espectaculares del Bajo Guadalquivir. Este paisaje fue escenario del rodaje de la película “El Imperio del Sol”.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/marismas.jpg',
          horario: 'Atardecer',
          precio: 'Gratis'
        },
      ]
    },
    {
      titulo: 'Gastronomía',
      platos: [
        {
          nombre: 'Mosto de Trebujena',
          descripcion:
            'Vino joven (mosto) elaborado de forma tradicional. Se consume principalmente en invierno en los “mostos” del pueblo, acompañado de tapas y ambiente popular.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/mosto.jpg',
          precio: '1,50 – 2,50 € vaso'
        },
        {
          nombre: 'Trebujito',
          descripcion:
            'Bebida típica festiva elaborada con vino blanco joven del Marco de Jerez, refresco de lima-limón y hielo. Muy refrescante y protagonista en ferias y fiestas como el Trebufest.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/trebujena-flag.png',
          precio: '2,50 – 5 €'
        },
        {
          nombre: 'Tortillitas de camarones',
          descripcion:
            'Plato emblemático de la cocina ribereña. Tortillas finas y crujientes elaboradas con camarones del Guadalquivir, harina, cebolla y perejil.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/tortillita-camarones.jpg',
          precio: '1,90€/unidad'
        },
        {
          nombre: 'Angulas',
          descripcion:
            'Producto histórico ligado al río Guadalquivir. Consideradas un manjar, tradicionalmente formaron parte de la economía y gastronomía local.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/trebujena-flag.png',
          precio: 'Según temporada y mercado'
        },
        {
          nombre: 'Potaje con cardillos',
          descripcion:
            'Guiso de temporada elaborado con legumbres y cardillos silvestres, típico de la cocina tradicional del entorno rural.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/trebujena-flag.png',
          precio: '8 – 12 €'
        },
        {
          nombre: 'Ajo caliente',
          descripcion:
            'Receta humilde y contundente elaborada con pan, ajo, pimentón, aceite y caldo. Muy ligada a la cocina tradicional campesina.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/ajo-caliente.jpg',
          precio: '4 - 6€'
        },
        {
          nombre: 'Garbanzos como conejos',
          descripcion:
            'Plato popular de garbanzos guisados con arroz. Recibe su nombre porque, en tiempos de escasez, los garbanzos “hacían de conejo”. Es el plato estrella de la fiesta gastronómica de diciembre.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/garbanzos-conejos.jpeg',
          precio: 'Gratis en su fiesta'
        },
        {
          nombre: 'Uvas Palominos',
          descripcion:
            'Postre tradicional elaborado a partir de la uva Palomino, símbolo de la cultura vitivinícola de Trebujena.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/trebujena-flag.png',
          precio: 'Precio local'
        },
        {
          nombre: 'Mistela',
          descripcion:
            'Vino dulce tradicional, aromático y fácil de beber. Muy presente en fiestas populares y sobremesas.',
          foto: 'assets/europa/espana/andalucia/cadiz/trebujena/trebujena-flag.png',
          precio: '2 – 4 € copa'
        },
      ]
    },
    {
      titulo: 'Dónde comer en Trebujena',
      lugares: [
        {
          nombre: 'Taberna Manegodor',
          descripcion:
            'Taberna tradicional muy popular, con cocina casera, ambiente local y productos de la tierra. Recomendable Albur de estero a la espalda al estilo de la taberna Manegodor',
          horario: 'Mediodía y noche',
          precio: 'Moderado'
        },
        {
          nombre: 'La Estancia',
          descripcion:
            'Restaurante conocido por sus platos tradicionales, carnes y guisos, en un ambiente acogedor.',
          horario: 'Mediodía',
          precio: 'Económico'
        }
      ]
    },
    {
      titulo: 'Cultura y Vida Local',
      contenido:
        'Trebujena mantiene una intensa vida popular marcada por la convivencia vecinal, el vino mosto, las fiestas singulares y un fuerte sentimiento de identidad colectiva.'
    },
    {
      titulo: 'Fiestas y Festivos Principales',
      contenido:
        'Las fiestas de Trebujena son únicas por su carácter popular, reivindicativo y festivo.',
      lugares: [
        {
          nombre: 'Carnaval',
          descripcion:
            'Uno de los carnavales más singulares de la zona, conocido por la quema de la Bruja Pipi y su carácter crítico y participativo.',
          fecha: 'Febrero',
          precio: 'Gratis'
        },
        {
          nombre: 'Trebufest',
          descripcion:
            'Festival alternativo y festivo donde reina el humor, la música y el ambiente reivindicativo. Tradicionalmente se toma el Trebujito y la Mistela.',
          fecha: 'Verano',
          precio: 'Gratis'
        },
        {
          nombre: 'Fiestas de la Vendimia',
          descripcion:
            'Celebración ligada a la recogida de la uva y al vino mosto, con actividades populares y ambiente festivo.',
          fecha: 'Septiembre',
          precio: 'Gratis'
        },
        {
          nombre: 'Fiesta de los Garbanzos con Conejo',
          descripcion:
            'Fiesta gastronómica muy popular donde se reparten garbanzos con arroz (no lleva conejo) y se bebe mosto.',
          fecha: 'Primera semana de diciembre',
          precio: 'Gratis'
        },
        {
          nombre: 'Navidad',
          descripcion:
            'Celebraciones navideñas con ambiente familiar, encuentros vecinales y tradiciones locales.',
          fecha: 'Diciembre',
          precio: 'Gratis'
        }
      ]
    }
  ]
};
