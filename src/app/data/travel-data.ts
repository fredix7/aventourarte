export interface TravelNode {
  nombre: string;
  path?: string;
  fullPath?: string;
  flag?: string;
  isCapital?: boolean;
  isImportantCity?: boolean;
  hijos?: TravelNode[];
}

export const TRAVEL_TREE: TravelNode[] = [
  {
    nombre: 'Europa',
    hijos: [
      {
        nombre: 'Alemania',
        flag: 'https://flagcdn.com/de.svg',
        hijos: [
          { nombre: 'Aachen/Aquisgrán', path: 'europa/alemania/aachen' },
          { nombre: 'Bonn', path: 'europa/alemania/bonn' },
          { nombre: 'Colonia', path: 'europa/alemania/colonia' },
          { nombre: 'Dortmund', path: 'europa/alemania/dortmund' },
          { nombre: 'Düsseldorf', path: 'europa/alemania/dusseldorf' },
          { nombre: 'Fráncfort del Meno', path: 'europa/alemania/francfort' },
          { nombre: 'Heidelberg', path: 'europa/alemania/heidelberg' },
          { nombre: 'Idstein', path: 'europa/alemania/idstein' },
          { nombre: 'Münster', path: 'europa/alemania/munster' },
          { nombre: 'Tréveris/Trier', path: 'europa/alemania/treveris' },
        ]
      },
      {
        nombre: 'Andorra',
        flag: 'https://flagcdn.com/ad.svg',
        hijos: [
          { nombre: 'Andorra', path: 'europa/andorra/andorra', isCapital: true },
        ]
      },
      {
        nombre: 'España',
        flag: 'https://flagcdn.com/es.svg',
        hijos: [
          {
            nombre: 'Andalucía',
            hijos: [
              {
                nombre: 'Huelva',
                hijos: [
                  { nombre: 'Huelva ciudad', path: 'europa/espana/andalucia/huelva/huelva-ciudad', isCapital: true },
                  { nombre: 'Palos de la Frontera', path: 'europa/espana/andalucia/huelva/palos' },
                ]
              },
              {
                nombre: 'Cádiz',
                hijos: [
                  { nombre: 'Cádiz ciudad', path: 'europa/espana/andalucia/cadiz/cadiz-ciudad', isCapital: true },
                  { nombre: 'Grazalema', path: 'europa/espana/andalucia/cadiz/grazalema' },
                  { nombre: 'Rota', path: 'europa/espana/andalucia/cadiz/rota' },
                  { nombre: 'Jerez de la Frontera', path: 'europa/espana/andalucia/cadiz/jerez-de-la-frontera', isImportantCity: true },
                  { nombre: 'San Fernando', path: 'europa/espana/andalucia/cadiz/san-fernando' },
                  { nombre: 'Sanlúcar de Barrameda', path: 'europa/espana/andalucia/cadiz/sanlucar-de-barrameda' },
                  { nombre: 'Setenil de las Bodegas', path: 'europa/espana/andalucia/cadiz/setenil-de-las-bodegas' },
                  { nombre: 'Trebujena', path: 'europa/espana/andalucia/cadiz/trebujena' },
                  { nombre: 'Vejer de la Frontera', path: 'europa/espana/andalucia/cadiz/vejer-de-la-frontera' },
                ]
              },
              {
                nombre: 'Sevilla',
                hijos: [
                  { nombre: 'Sevilla ciudad', path: 'europa/espana/andalucia/sevilla/sevilla-ciudad', isCapital: true },
                  { nombre: 'Castilblanco de los Arroyos', path: 'europa/espana/andalucia/sevilla/castilblanco-de-los-arroyos' },
                  { nombre: 'Coria del Río', path: 'europa/espana/andalucia/sevilla/coria-del-rio' },
                  { nombre: 'Isla Mayor', path: 'europa/espana/andalucia/sevilla/isla-mayor' },
                  { nombre: 'Mairena del Aljarafe', path: 'europa/espana/andalucia/sevilla/mairena-del-aljarafe' },
                  { nombre: 'Palomares del Río', path: 'europa/espana/andalucia/sevilla/palomares-del-rio' },
                  { nombre: 'El Real de la Jara', path: 'europa/espana/andalucia/sevilla/real-de-la-jara' },
                  { nombre: 'Santiponce', path: 'europa/espana/andalucia/sevilla/santiponce' },
                ]
              },
              {
                nombre: 'Córdoba',
                hijos: [
                  { nombre: 'Córdoba ciudad', path: 'europa/espana/andalucia/cordoba/cordoba-ciudad', isCapital: true },
                ]
              },
              {
                nombre: 'Málaga',
                hijos: [
                  { nombre: 'Málaga ciudad', path: 'europa/espana/andalucia/malaga/malaga-ciudad', isCapital: true },
                ]
              },
              {
                nombre: 'Jaén',
                hijos: [
                  { nombre: 'Jaén ciudad', path: 'europa/espana/andalucia/jaen/jaen-ciudad', isCapital: true },
                ]
              },
              {
                nombre: 'Granada',
                hijos: [
                  { nombre: 'Granada ciudad', path: 'europa/espana/andalucia/granada/granada-ciudad', isCapital: true },
                ]
              },
              {
                nombre: 'Almería',
                hijos: [
                  { nombre: 'Almería ciudad', path: 'europa/espana/andalucia/almeria/almeria-ciudad', isCapital: true },
                ]
              },
            ]
          },
          {
            nombre: 'Islas Baleares',
            hijos: [
                  { nombre: 'Mallorca', path: 'europa/espana/baleares/mallorca' },
                ]
          },
          {
            nombre: 'Islas Canarias',
            hijos: [
                  { nombre: 'Tenerife', path: 'europa/espana/canarias/tenerife' },
                ]
          },
          {
            nombre: 'Cataluña',
            hijos: [
              {
                nombre: 'Gerona',
                hijos: [
                  { nombre: 'Gerona', path: 'europa/espana/cataluna/gerona/gerona-ciudad', isCapital: true },
                ]
              }
            ]
          },
          {
            nombre: 'Extremadura',
            hijos: [
              { nombre: 'Mérida', path: 'europa/espana/extremadura/merida/merida-ciudad', isCapital: true },
              { nombre: 'Badajoz', path: 'europa/espana/extremadura/badajoz/badajoz-ciudad', isImportantCity: true },
              {
                nombre: 'Cáceres',
                hijos: [
                  {
                    nombre: 'Cáceres ciudad',
                    path: 'europa/espana/extremadura/caceres/caceres-ciudad',
                    isCapital: true
                  },
                  {
                    nombre: 'Coria',
                    path: 'europa/espana/extremadura/caceres/coria'
                  },
                  {
                    nombre: 'Plasencia',
                    path: 'europa/espana/extremadura/caceres/plasencia'
                  },
                  {
                    nombre: 'Trujillo',
                    path: 'europa/espana/extremadura/caceres/trujillo'
                  }
                ]
              }
            ]
          },
          {
            nombre: 'Comunidad Madrid',
            hijos: [
              { nombre: 'Madrid', path: 'europa/espana/madrid/madrid-ciudad', isCapital: true },
            ]
          },
          {
            nombre: 'Murcia',
            hijos: [
              { nombre: 'Murcia', path: 'europa/espana/murcia/murcia-ciudad', isCapital: true },
              { nombre: 'Cartagena', path: 'europa/espana/murcia/cartagena', isImportantCity: true },
            ]
          },
          {
            nombre: 'Navarra',
            hijos: [
              { nombre: 'Pamplona', path: 'europa/espana/murcia/murcia-ciudad', isCapital: true },
            ]
          },
          {
            nombre: 'País Vasco',
            hijos: [
              {
                nombre: 'Álava',
                hijos: [
                  { nombre: 'Vitoria-Gasteiz', path: 'europa/espana/pais-vasco/alava/vitoria', isCapital: true },
                ]
              },
              {
                nombre: 'Guipúzcoa',
                hijos: [
                  { nombre: 'San Sebastián/Donostia', path: 'europa/espana/pais-vasco/guipuzcoa/san-sebastian', isCapital: true },
                ]
              },
              {
                nombre: 'Vizcaya',
                hijos: [
                  { nombre: 'Bilbao', path: 'europa/espana/pais-vasco/vizcaya/bilbao', isCapital: true },
                ]
              }
            ]
          },
          {
            nombre: 'La Rioja',
            hijos: [
              { nombre: 'Logroño', path: 'europa/espana/rioja/logrono', isCapital: true },
            ]
          },
          {
            nombre: 'Ceuta',
            hijos: [
              { nombre: 'Ceuta', path: 'europa/espana/ceuta/ceuta-ciudad', isCapital: true },
            ]
          },
        ]
      },
      {
        nombre: 'Gibraltar',
        flag: 'https://flagcdn.com/gi.svg',
        hijos: [
          { nombre: 'Gibraltar', path: 'europa/gibraltar/gibraltar', isCapital: true },
        ]
      },
      {
        nombre: 'Irlanda',
        flag: 'https://flagcdn.com/ie.svg',
        hijos: [
          { nombre: 'Dublin', path: 'europa/irlanda/dublin', isCapital: true },
        ]
      },
      {
        nombre: 'Italia',
        flag: 'https://flagcdn.com/it.svg',
        hijos: [
          { nombre: 'Roma y Ciudad del Vaticano', path: 'europa/italia/roma-vaticano', isCapital: true },
        ]
      },
      {
        nombre: 'Malta',
        flag: 'https://flagcdn.com/mt.svg',
        hijos: [
          { nombre: 'La Valeta', path: 'europa/malta/la-valeta', isCapital: true },
        ]
      },
      {
        nombre: 'Países Bajos',
        flag: 'https://flagcdn.com/nl.svg',
        hijos: [
          { nombre: 'Ámsterdam', path: 'europa/paises-bajos/amsterdam', isCapital: true },
        ]
      },
      {
        nombre: 'Portugal',
        flag: 'https://flagcdn.com/pt.svg',
        hijos: [
          { nombre: 'Lisboa', path: 'europa/portugal/lisboa', isCapital: true },
        ]
      },
      {
        nombre: 'Rumania',
        flag: 'https://flagcdn.com/ro.svg',
        hijos: [
          { nombre: 'Bucarest', path: 'europa/rumania/bucarest', isCapital: true },
        ]
      },
      {
        nombre: 'Polonia',
        flag: 'https://flagcdn.com/pl.svg',
        hijos: [
          { nombre: 'Varsovia', path: 'europa/polonia/varsovia', isCapital: true },
          { nombre: 'Cracovia', path: 'europa/polonia/cracovia', isImportantCity: true },
        ]
      },
      {
        nombre: 'República Checa',
        flag: 'https://flagcdn.com/cz.svg',
        hijos: [
          { nombre: 'Praga', path: 'europa/republica-checa/praga', isCapital: true },
        ]
      },
    ]
  },
  {
    nombre: 'África',
    hijos: [
      {
        nombre: 'Marruecos',
        flag: 'https://flagcdn.com/ma.svg',
        hijos: [
          { nombre: 'Tánger', path: 'africa/marruecos/tanger', isImportantCity: true },
          { nombre: 'Asilah/Arcila', path: 'africa/marruecos/asilah' },
          { nombre: 'Tetuán', path: 'africa/marruecos/tetuan', isImportantCity: true }, 
          { nombre: 'Chefchaouen/Chauen', path: 'africa/marruecos/chefchaouen' }
        ]
      }
    ]
  },
  {
    nombre: 'América',
    hijos: [
      {
        nombre: 'Norteamérica',
        hijos: [
          {
            nombre: 'Estados Unidos',
            flag: 'https://flagcdn.com/us.svg',
            hijos: [
              { nombre: 'Nueva York', path: 'america/norteamerica/usa/new-york', isImportantCity: true }
            ]
          },
          {
            nombre: 'México',
            flag: 'https://flagcdn.com/mx.svg',
            hijos: [
              {
              nombre: 'Riviera Maya',
                hijos: [
                  { nombre: 'Cancún', path: 'america/norteamerica/mexico/riviera-maya/cancun', isImportantCity: true }
                ]
              } 
            ]
          },
        ],
      },
      {
        nombre: 'Centroamérica',
        hijos: [
          // añadir ciudades si quieres
        ]
      },
      {
        nombre: 'Sudamérica',
        hijos: [
          {
            nombre: 'Brasil',
            flag: 'https://flagcdn.com/br.svg',
            hijos: [
              { nombre: 'Río de Janeiro', path: 'america/sudamerica/brasil/rio-de-janeiro', isImportantCity: true }
            ]
          },
        ],
        
      },
    ]
  },
  {
    nombre: 'Asia',
    hijos: [
      {
        nombre: 'Turquía',
        flag: 'https://flagcdn.com/tr.svg',
        hijos: [
          { nombre: 'Estambul', path: 'europa/turquia/estambul', isImportantCity: true },
        ]
      },
    ],
  }, 
  {
    nombre: 'Oceanía',

  }, 
  {
    nombre: 'Antártida',

  }, 
];
