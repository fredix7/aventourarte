export interface TravelNode {
  nombre: string;
  path?: string;
  fullPath?: string;
  flag?: string;
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
          { nombre: 'Andorra', path: 'europa/andorra/andorra' },
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
                  { nombre: 'Huelva ciudad', path: 'europa/espana/andalucia/huelva/huelva-ciudad' },
                  { nombre: 'Palos de la Frontera', path: 'europa/espana/andalucia/huelva/palos' },
                ]
              },
              {
                nombre: 'Cádiz',
                hijos: [
                  { nombre: 'Cádiz ciudad', path: 'europa/espana/andalucia/cadiz/cadiz-ciudad' },
                  { nombre: 'Grazalema', path: 'europa/espana/andalucia/cadiz/grazalema' },
                  { nombre: 'Jerez de la Frontera', path: 'europa/espana/andalucia/cadiz/jerez-de-la-frontera' },
                  { nombre: 'San Fernando', path: 'europa/espana/andalucia/cadiz/san-fernando' },
                  { nombre: 'Setenil de las Bodegas', path: 'europa/espana/andalucia/cadiz/setenil-de-las-bodegas' },
                  { nombre: 'Trebujena', path: 'europa/espana/andalucia/cadiz/trebujena' }
                ]
              },
              {
                nombre: 'Sevilla',
                hijos: [
                  { nombre: 'Sevilla ciudad', path: 'europa/espana/andalucia/sevilla/sevilla-ciudad' },
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
                  { nombre: 'Córdoba ciudad', path: 'europa/espana/andalucia/cordoba/cordoba-ciudad' },
                ]
              },
              {
                nombre: 'Málaga',
                hijos: [
                  { nombre: 'Málaga ciudad', path: 'europa/espana/andalucia/malaga/malaga-ciudad' },
                ]
              },
              {
                nombre: 'Jaén',
                hijos: [
                  { nombre: 'Jaén ciudad', path: 'europa/espana/andalucia/jaen/jaen-ciudad' },
                ]
              },
              {
                nombre: 'Granada',
                hijos: [
                  { nombre: 'Granada ciudad', path: 'europa/espana/andalucia/granada/granada-ciudad' },
                ]
              },
              {
                nombre: 'Almería',
                hijos: [
                  { nombre: 'Almería ciudad', path: 'europa/espana/andalucia/almeria/almeria-ciudad' },
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
                  { nombre: 'Gerona', path: 'europa/espana/cataluna/gerona/gerona-ciudad' },
                ]
              }
            ]
          },
          {
            nombre: 'Extremadura',
            hijos: [
              { nombre: 'Mérida', path: 'europa/espana/extremadura/merida/merida-ciudad' },
              { nombre: 'Badajoz', path: 'europa/espana/extremadura/badajoz/badajoz-ciudad' },
              {
                nombre: 'Cáceres',
                hijos: [
                  {
                    nombre: 'Cáceres ciudad',
                    path: 'europa/espana/extremadura/caceres/caceres-ciudad'
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
              { nombre: 'Madrid', path: 'europa/espana/madrid/madrid-ciudad' },
            ]
          },
          {
            nombre: 'Murcia',
            hijos: [
              { nombre: 'Murcia', path: 'europa/espana/murcia/murcia-ciudad' },
              { nombre: 'Cartagena', path: 'europa/espana/murcia/cartagena' },
            ]
          },
          {
            nombre: 'Navarra',
            hijos: [
              { nombre: 'Pamplona', path: 'europa/espana/murcia/murcia-ciudad' },
            ]
          },
          {
            nombre: 'País Vasco',
            hijos: [
              {
                nombre: 'Álava',
                hijos: [
                  { nombre: 'Vitoria-Gasteiz', path: 'europa/espana/pais-vasco/alava/vitoria' },
                ]
              },
              {
                nombre: 'Guipúzcoa',
                hijos: [
                  { nombre: 'San Sebastián/Donostia', path: 'europa/espana/pais-vasco/guipuzcoa/san-sebastian' },
                ]
              },
              {
                nombre: 'Vizcaya',
                hijos: [
                  { nombre: 'Bilbao', path: 'europa/espana/pais-vasco/vizcaya/bilbao' },
                ]
              }
            ]
          },
          {
            nombre: 'La Rioja',
            hijos: [
              { nombre: 'Logroño', path: 'europa/espana/rioja/logrono' },
            ]
          },
          {
            nombre: 'Ceuta',
            hijos: [
              { nombre: 'Ceuta', path: 'europa/espana/ceuta/ceuta-ciudad' },
            ]
          },
        ]
      },
      {
        nombre: 'Gibraltar',
        flag: 'https://flagcdn.com/gi.svg',
        hijos: [
          { nombre: 'Gibraltar', path: 'europa/gibraltar/gibraltar' },
        ]
      },
      {
        nombre: 'Irlanda',
        flag: 'https://flagcdn.com/ie.svg',
        hijos: [
          { nombre: 'Dublin', path: 'europa/irlanda/dublin' },
        ]
      },
      {
        nombre: 'Italia',
        flag: 'https://flagcdn.com/it.svg',
        hijos: [
          { nombre: 'Roma y Ciudad del Vaticano', path: 'europa/italia/roma-vaticano' },
        ]
      },
      {
        nombre: 'Países Bajos',
        flag: 'https://flagcdn.com/nl.svg',
        hijos: [
          { nombre: 'Ámsterdam', path: 'europa/paises-bajos/amsterdam' },
        ]
      },
      {
        nombre: 'Portugal',
        flag: 'https://flagcdn.com/pt.svg',
        hijos: [
          { nombre: 'Lisboa', path: 'europa/portugal/lisboa' },
        ]
      },
      {
        nombre: 'Rumania',
        flag: 'https://flagcdn.com/ro.svg',
        hijos: [
          { nombre: 'Bucarest', path: 'europa/rumania/bucarest' },
        ]
      },
      {
        nombre: 'Polonia',
        flag: 'https://flagcdn.com/pl.svg',
        hijos: [
          { nombre: 'Varsovia', path: 'europa/polonia/varsovia' },
          { nombre: 'Cracovia', path: 'europa/polonia/cracovia' },
        ]
      },
      {
        nombre: 'República Checa',
        flag: 'https://flagcdn.com/cz.svg',
        hijos: [
          { nombre: 'Praga', path: 'europa/andorra/praga' },
        ]
      },
      {
        nombre: 'Turquía',
        flag: 'https://flagcdn.com/tr.svg',
        hijos: [
          { nombre: 'Estambul', path: 'europa/turquia/estambul' },
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
          { nombre: 'Tánger', path: 'africa/marruecos/tanger' },
          { nombre: 'Asilah/Arcila', path: 'africa/marruecos/asilah' },
          { nombre: 'Tetuán', path: 'africa/marruecos/tetuan' }, 
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
              { nombre: 'Nueva York', path: 'america/norteamerica/usa/new-york' }
            ]
          },
          {
            nombre: 'México',
            flag: 'https://flagcdn.com/mx.svg',
            hijos: [
              {
              nombre: 'Riviera Maya',
                hijos: [
                  { nombre: 'Cancún', path: 'america/norteamerica/mexico/riviera-maya/cancun' }
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
              { nombre: 'Río de Janeiro', path: 'america/sudamerica/brasil/rio-de-janeiro' }
            ]
          },
        ],
        
      },
    ]
  },

  {
    nombre: 'Asia',
  
  }, 
  {
    nombre: 'Oceanía',

  }, 
  {
    nombre: 'Antártida',

  }, 
];
