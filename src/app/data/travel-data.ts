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
          { nombre: 'Tréveris/Trier', path: 'europa/alemania/treveris' }
        ]
      },
      {
        nombre: 'Andorra',
        flag: 'https://flagcdn.com/ad.svg',
        path: 'europa/andorra/andorra'
      },
      {
        nombre: 'Ciudad del Vaticano',
        flag: 'https://flagcdn.com/va.svg',
        path: 'europa/italia/roma-vaticano'
      },
      {
        nombre: 'Dinamarca',
        flag: 'https://flagcdn.com/dk.svg',
        hijos: [
          { nombre: 'Copenhague', path: 'europa/dinamarca/copenhague', isCapital: true }
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
                nombre: 'Almería',
                hijos: [
                  { nombre: 'Almería ciudad', path: 'europa/espana/andalucia/almeria/almeria-ciudad', isCapital: true }
                ]
              },
              {
                nombre: 'Cádiz',
                hijos: [
                  { nombre: 'Cádiz ciudad', path: 'europa/espana/andalucia/cadiz/cadiz', isCapital: true },
                  { nombre: 'Chipiona', path: 'europa/espana/andalucia/cadiz/chipiona' },
                  { nombre: 'Grazalema', path: 'europa/espana/andalucia/cadiz/grazalema' },
                  { nombre: 'Jerez de la Frontera', path: 'europa/espana/andalucia/cadiz/jerez-de-la-frontera', isImportantCity: true },
                  { nombre: 'Rota', path: 'europa/espana/andalucia/cadiz/rota' },
                  { nombre: 'San Fernando', path: 'europa/espana/andalucia/cadiz/san-fernando' },
                  { nombre: 'Sanlúcar de Barrameda', path: 'europa/espana/andalucia/cadiz/sanlucar-de-barrameda' },
                  { nombre: 'Setenil de las Bodegas', path: 'europa/espana/andalucia/cadiz/setenil-de-las-bodegas' },
                  { nombre: 'Trebujena', path: 'europa/espana/andalucia/cadiz/trebujena' },
                  { nombre: 'Vejer de la Frontera', path: 'europa/espana/andalucia/cadiz/vejer-de-la-frontera' }
                ]
              },
              {
                nombre: 'Córdoba',
                hijos: [
                  { nombre: 'Córdoba ciudad', path: 'europa/espana/andalucia/cordoba/cordoba-ciudad', isCapital: true }
                ]
              },
              {
                nombre: 'Granada',
                hijos: [
                  { nombre: 'Granada ciudad', path: 'europa/espana/andalucia/granada/granada-ciudad', isCapital: true }
                ]
              },
              {
                nombre: 'Huelva',
                hijos: [
                  { nombre: 'Huelva ciudad', path: 'europa/espana/andalucia/huelva/huelva-ciudad', isCapital: true },
                  { nombre: 'Palos de la Frontera', path: 'europa/espana/andalucia/huelva/palos' }
                ]
              },
              {
                nombre: 'Jaén',
                hijos: [
                  { nombre: 'Jaén ciudad', path: 'europa/espana/andalucia/jaen/jaen-ciudad', isCapital: true }
                ]
              },
              {
                nombre: 'Málaga',
                hijos: [
                  { nombre: 'Málaga ciudad', path: 'europa/espana/andalucia/malaga/malaga-ciudad', isCapital: true }
                ]
              },
              {
                nombre: 'Sevilla',
                hijos: [
                  { nombre: 'Almensilla', path: 'europa/espana/andalucia/sevilla/almensilla' },
                  { nombre: 'Castilblanco de los Arroyos', path: 'europa/espana/andalucia/sevilla/castilblanco-de-los-arroyos' },
                  { nombre: 'Coria del Río', path: 'europa/espana/andalucia/sevilla/coria-del-rio' },
                  { nombre: 'Isla Mayor', path: 'europa/espana/andalucia/sevilla/isla-mayor' },
                  { nombre: 'Mairena del Aljarafe', path: 'europa/espana/andalucia/sevilla/mairena-del-aljarafe' },
                  { nombre: 'Palomares del Río', path: 'europa/espana/andalucia/sevilla/palomares-del-rio' },
                  { nombre: 'Real de la Jara, El', path: 'europa/espana/andalucia/sevilla/real-de-la-jara' },
                  { nombre: 'Santiponce', path: 'europa/espana/andalucia/sevilla/santiponce' },
                  { nombre: 'Sevilla ciudad', path: 'europa/espana/andalucia/sevilla/sevilla-ciudad', isCapital: true }
                ]
              }
            ]
          },
          {
            nombre: 'Cataluña',
            hijos: [
              {
                nombre: 'Gerona',
                hijos: [
                  { nombre: 'Gerona ciudad', path: 'europa/espana/cataluna/gerona/gerona-ciudad', isCapital: true }
                ]
              }
            ]
          },
          {
            nombre: 'Ceuta',
            hijos: [
              { nombre: 'Ceuta ciudad', path: 'europa/espana/ceuta/ceuta-ciudad' }
            ]
          },
          {
            nombre: 'Comunidad de Madrid',
            hijos: [
              { nombre: 'Madrid', path: 'europa/espana/madrid/madrid-ciudad', isCapital: true }
            ]
          },
          {
            nombre: 'Extremadura',
            hijos: [
              {
                nombre: 'Badajoz',
                hijos: [
                  {
                    nombre: 'Badajoz ciudad',
                    path: 'europa/espana/extremadura/badajoz/badajoz-ciudad',
                    isCapital: true
                  },
                  {
                    nombre: 'Mérida',
                    path: 'europa/espana/extremadura/badajoz/merida',
                    isCapital: true
                  },
                ]
              },
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
            nombre: 'Islas Baleares',
            hijos: [
                  { nombre: 'Mallorca', path: 'europa/espana/baleares/mallorca' }
                ]
          },
          {
            nombre: 'Islas Canarias',
            hijos: [
                  { nombre: 'Tenerife', path: 'europa/espana/canarias/tenerife' }
                ]
          },
          {
            nombre: 'La Rioja',
            hijos: [
              { nombre: 'Logroño', path: 'europa/espana/rioja/logrono', isCapital: true }
            ]
          },
          {
            nombre: 'Murcia',
            hijos: [
              { nombre: 'Cartagena', path: 'europa/espana/murcia/cartagena', isImportantCity: true },
              { nombre: 'Murcia ciudad', path: 'europa/espana/murcia/murcia-ciudad', isCapital: true }
            ]
          },
          {
            nombre: 'Navarra',
            hijos: [
              { nombre: 'Pamplona', path: 'europa/espana/navarra/pamplona', isCapital: true }
            ]
          },
          {
            nombre: 'País Vasco',
            hijos: [
              {
                nombre: 'Álava',
                hijos: [
                  { nombre: 'Vitoria-Gasteiz', path: 'europa/espana/pais-vasco/alava/vitoria', isCapital: true }
                ]
              },
              {
                nombre: 'Guipúzcoa',
                hijos: [
                  { nombre: 'San Sebastián/Donostia', path: 'europa/espana/pais-vasco/guipuzcoa/san-sebastian', isCapital: true }
                ]
              },
              {
                nombre: 'Vizcaya',
                hijos: [
                  { nombre: 'Bilbao', path: 'europa/espana/pais-vasco/vizcaya/bilbao', isCapital: true }
                ]
              }
            ]
          }
        ]
      },
      {
        nombre: 'Gibraltar',
        flag: 'https://flagcdn.com/gi.svg',
        path: 'europa/gibraltar/gibraltar'
      },
      {
        nombre: 'Irlanda',
        flag: 'https://flagcdn.com/ie.svg',
        hijos: [
          { nombre: 'Dublín', path: 'europa/irlanda/dublin', isCapital: true }
        ]
      },
      {
        nombre: 'Italia',
        flag: 'https://flagcdn.com/it.svg',
        hijos: [
          {
            nombre: 'Roma',
            path: 'europa/italia/roma-vaticano',
            isCapital: true
          }
        ]
      },
      {
        nombre: 'Malta',
        flag: 'https://flagcdn.com/mt.svg',
        path: 'europa/malta/malta'
      },
      {
        nombre: 'Países Bajos',
        flag: 'https://flagcdn.com/nl.svg',
        hijos: [
          { nombre: 'Ámsterdam', path: 'europa/paises-bajos/amsterdam', isCapital: true }
        ]
      },
      {
        nombre: 'Polonia',
        flag: 'https://flagcdn.com/pl.svg',
        hijos: [
          { nombre: 'Cracovia', path: 'europa/polonia/cracovia', isImportantCity: true },
          { nombre: 'Varsovia', path: 'europa/polonia/varsovia', isCapital: true }
        ]
      },
      {
        nombre: 'Portugal',
        flag: 'https://flagcdn.com/pt.svg',
        hijos: [
          { nombre: 'Lisboa', path: 'europa/portugal/lisboa', isCapital: true }
        ]
      },
      {
        nombre: 'República Checa',
        flag: 'https://flagcdn.com/cz.svg',
        hijos: [
          { nombre: 'Praga', path: 'europa/republica-checa/praga', isCapital: true }
        ]
      },
      {
        nombre: 'Rumania',
        flag: 'https://flagcdn.com/ro.svg',
        hijos: [
          { nombre: 'Bucarest', path: 'europa/rumania/bucarest', isCapital: true }
        ]
      },
      {
        nombre: 'Suecia',
        flag: 'https://flagcdn.com/se.svg',
        hijos: [
          { nombre: 'Malmö', path: 'europa/suecia/malmo', isImportantCity: true }
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
          { nombre: 'Asilah/Arcila', path: 'africa/marruecos/asilah' },
          { nombre: 'Chefchaouen/Chauen', path: 'africa/marruecos/chefchaouen' },
          { nombre: 'Tánger', path: 'africa/marruecos/tanger', isImportantCity: true },
          { nombre: 'Tetuán', path: 'africa/marruecos/tetuan', isImportantCity: true }
        ]
      }
    ]
  },
  {
    nombre: 'América',
    hijos: [
      {
        nombre: 'Caribe',
        hijos: [
          
        ]
      },
      {
        nombre: 'Centroamérica',
        hijos: [
          
        ]
      },
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
                path: 'america/norteamerica/mexico/riviera-maya'
              }
            ]
          }
        ],
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
          { nombre: 'Estambul', path: 'asia/turquia/estambul', isImportantCity: true }
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
