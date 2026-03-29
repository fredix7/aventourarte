// src/app/guides/america/sudamerica/brasil/rio-de-janeiro/rio-janeiro.guide.ts
export const RIO_DE_JANEIRO_GUIDE = {
  path: 'america/sudamerica/brasil/rio-de-janeiro',
  nombre: 'Río de Janeiro',
  flag: 'assets/america/sudamerica/brasil/rio/rio-flag.png',
  background: 'assets/america/sudamerica/brasil/rio/rio-bg.jpg',
  bgPos: '50% 35%',
  bgPosMobile: '50% 30%',
  flagOverlay: true,
  flagOpacity: 0.10,
  flagSize: '55%',
  bgBrightness: 0.85,

  descripcion:
    'Río de Janeiro, la "Cidade Maravilhosa", es famosa por sus playas icónicas (Copacabana, Ipanema), el Cristo Redentor y su vibrante vida cultural y carnavalesca.',
  
  infoGeneral: {
    idioma: 'Portugués',
    moneda: 'Real Brasileño (BRL) — 1 € ≈ 6 BRL',
    hora: 'UTC -3 (−4h respecto a España)',
    internet: 'Roaming fuera de la UE. Recomendada eSIM local.',
    electricidad: '127V/220V – Enchufe tipo N',
    pasaporte: 'Requerido',
    visado: 'No necesario hasta 90 días',
    vacunas: 'Fiebre amarilla recomendada'
  },
  
  secciones: [
    {
      titulo: 'Historia',
      contenido:
        'Fundada en el siglo XVI, Río fue capital de Brasil hasta 1960. Su historia mezcla influencias indígenas, coloniales portuguesas y modernas transformaciones urbanas que la convirtieron en un importante centro cultural y turístico.'
    },
    {
      titulo: 'Geografía y Clima',
      contenido:
        'Situada entre montañas y el océano Atlántico, Río tiene un clima tropical atlántico: veranos calurosos y húmedos (diciembre–marzo) y inviernos suaves (junio–agosto).'
    },
    {
      titulo: 'Qué visitar en Río de Janeiro',
      itinerario: [
        {
          dia: 'Día 1 – Centro histórico y samba',
          zonas: [
            {
              nombre: 'Praça da República / Campo de Santana',
              descripcion:
                'También conocido como Campo de Santana, este parque en el Centro Viejo es un oasis verde en plena ciudad. Alberga fauna urbana como agutíes (cutias), patos y pavos reales. Ideal para un paseo relajado tras la llegada a Río.',
              fotos: [
                'assets/america/sudamerica/brasil/rio/rio-praca-republica.jpg',
                'assets/america/sudamerica/brasil/rio/rio-agutis.jpg',
              ],
              horario: 'Acceso libre todo el día',
              precio: 'Gratis'
            },
            {
              nombre: 'Real Gabinete Português de Leitura',
              descripcion:
                'Una joya arquitectónica fundada por la comunidad portuguesa. Considerada una de las bibliotecas más bellas del mundo, con estanterías talladas y miles de volúmenes raros.',
              fotos: [
                'assets/america/sudamerica/brasil/rio/rio-gabinete-portugues-leitura.jpg',
              ],
              horario: '10:00–18:00 (consultar horarios actualizados)',
              precio: 'Gratis o simbólico'
            },
            {
              nombre: 'Confiteria Colombo',
              descripcion:
                'Clásico café literario inaugurado en 1894. Famoso por su decoración art nouveau, sus vitrinas de dulces y su ambiente elegante. Aquí puedes degustar el mejor brigadeiro de Río.',
              fotos: [
                'assets/america/sudamerica/brasil/rio/rio-cafeteria-colombo.jpg',
              ],
              horario: 'Lunes a sábado 09:00–18:00',
              precio: 'Consumo en local'
            },
            {
              nombre: 'Museu do Amanhã',
              descripcion:
                'Museo de ciencia y futuro diseñado por Santiago Calatrava, situado en la zona portuaria. Muestra exposiciones sobre sostenibilidad, cambio climático y el futuro del planeta.',
              fotos: [
                'assets/america/sudamerica/brasil/rio/rio-museo-amanha.jpg',
              ],
              horario: 'Martes a domingo 10:00–18:00',
              precio: 'Entrada ≈ 30 BRL'
            },
            {
              nombre: 'Pedra do Sal',
              descripcion:
                'Lugar histórico de la cultura afro-carioca y cuna de la samba. Cada lunes por la noche hay música en vivo y espectáculos de samba gratuitos en la calle.',
              fotos: [
                'assets/america/sudamerica/brasil/rio/rio-pedra-do-sal.jpg',
              ],
              horario: 'Lunes desde las 20:00',
              precio: 'Gratis (solo consumo)'
            }
          ],
        },
        {
          dia: 'Día 2 - Santa Teresa y Lapa',
          zonas: [
            {
              nombre: 'Tranvía amarillo de Santa Teresa (Bonde)',
              descripcion:
                'El histórico tranvía amarillo conecta el centro de Río con el barrio de Santa Teresa cruzando los Arcos da Lapa. Es un viaje emblemático con vistas únicas y mucho encanto local.',
              foto: 'assets/rio/rio-bonde.jpg',
              horario: 'Cada 15-20 min, de 8:00 a 17:00',
              precio: '≈ 20 BRL por trayecto'
            },
            {
              nombre: 'Largo dos Guimarães',
              descripcion:
                'Corazón del barrio bohemio de Santa Teresa, repleto de bares, galerías y cafés artísticos. Ideal para pasear y disfrutar del ambiente relajado y colorido.',
              foto: 'assets/rio/rio-largo-guimaraes.jpg',
              horario: 'Acceso libre todo el día',
              precio: 'Gratis'
            },
            {
              nombre: 'Almuerzo en Bar do Mineiro',
              descripcion:
                'Restaurante icónico de Santa Teresa famoso por su feijoada, platos de Minas Gerais y ambiente acogedor lleno de arte local.',
              foto: 'assets/rio/rio-bar-do-mineiro.jpg',
              horario: 'Martes a domingo 11:00–00:00',
              precio: 'Plato principal ≈ 40–70 BRL'
            },
            {
              nombre: 'Parque das Ruínas',
              descripcion:
                'Centro cultural y mirador ubicado en una antigua mansión restaurada. Ofrece vistas espectaculares de la bahía y el centro de Río.',
              foto: 'assets/rio/rio-parque-ruinas.jpg',
              horario: 'Martes a domingo 8:00–18:00',
              precio: 'Gratis'
            },
            {
              nombre: 'Arcos da Lapa',
              descripcion:
                'El antiguo acueducto del siglo XVIII es uno de los símbolos más reconocibles de la ciudad. Hoy sostiene la vía del tranvía de Santa Teresa.',
              foto: 'assets/rio/rio-arcos-lapa.jpg',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Escadaria Selarón',
              descripcion:
                'Colorida escalera de más de 2000 azulejos creada por el artista chileno Jorge Selarón. Representa un homenaje al pueblo brasileño y a la humanidad.',
              foto: 'assets/rio/rio-selaron.jpg',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Cena en Restaurante Nova Capela',
              descripcion:
                'Clásico restaurante carioca fundado en 1903, ubicado en Lapa. Famoso por su picanha al ajo, cabrito asado y platos tradicionales brasileños. Ideal para cerrar el día con una buena cena en un entorno auténtico y animado.',
              foto: 'assets/rio/rio-nova-capela.jpg',
              horario: 'Abierto todos los días 11:30–03:00',
              precio: 'Platos principales ≈ 60–120 BRL'
            }
          ]
        },
        {
          dia: 'Día 3 – Centro histórico y playa de Copacabana',
          zonas: [
            {
              nombre: 'Catedral de San Sebastián',
              descripcion:
                'La catedral principal de Río de Janeiro, de estilo neogótico con detalles modernos. Se ubica en el corazón del centro histórico y destaca por su arquitectura religiosa y su relevancia en la vida eclesiástica de la ciudad.',
              foto: 'assets/rio/rio-catedral-san-sebastian.jpg',
              horario: '09:00-17:00',
              precio: 'Gratis (donaciones voluntarias)'
            },
            {
              nombre: 'Biblioteca Nacional',
              descripcion:
                'Una de las mayores bibliotecas de América Latina. Alberga una vasta colección de documentos históricos, manuscritos, libros raros y fuentes culturales brasileñas.',
              foto: 'assets/rio/rio-biblioteca-nacional.jpg',
              horario: '10:00-17:00',
              precio: 'Entrada gratuita'
            },
            {
              nombre: 'Teatro Municipal de Río',
              descripcion:
                'Majestuoso teatro de estilo inspirado en la Ópera de París, símbolo cultural de la ciudad. Ofrece visitas guiadas y ocasionalmente espectáculos de música y baile.',
              foto: 'assets/rio/rio-teatro-municipal.jpg',
              horario: '10:00-17:00 (visitas guiadas)',
              precio: 'Entrada ≈ 20-30 BRL (según actividad)'
            },
            {
              nombre: 'Palacio Tiradentes',
              descripcion:
                'Sede simbólica de la Asamblea Legislativa de Río. Ubicado en la Praça XV, es un edificio histórico con importancia política y patrimonial.',
              foto: 'assets/rio/rio-palacio-tiradentes.jpg',
              horario: '10:00-17:00',
              precio: 'Entrada gratuita o simbólica'
            },
            {
              nombre: 'Palacio Imperial / Praça XV (mercadillo)',
              descripcion:
                'En la Plaza XV de Novembro se encuentra el Paço Imperial, sede cultural con exposiciones y eventos. En los alrededores organizan mercadillos de artesanía y cultura local en días determinados.',
              foto: 'assets/rio/rio-paco-imperial-centro.jpg',
              horario: 'Durante el día, mercadillo por la tarde',
              precio: 'Gratis (solo compras si compras algo)'
            },
            {
              nombre: 'Puerto histórico de la Praça XV y Marina da Glória',
              descripcion:
                'Zona portuaria tradicional frente a la Praça XV, donde se aprecian las vistas de la Bahía de Guanabara y los ferris que cruzan hacia Niterói. Es ideal para dar un paseo junto al mar y ver el movimiento de barcos deportivos en la cercana Marina da Glória.',
              foto: 'assets/rio/rio-marina-gloria.jpg',
              horario: 'Abierto todo el día',
              precio: 'Gratis'
            },
            {
              nombre: 'Playa de Copacabana (tarde)',
              descripcion:
                'Para cerrar el día con calma, relájate en la famosa playa de Copacabana. Pasea por la orilla, disfruta del mar, los quioscos y el ambiente carioca al atardecer.',
              foto: 'assets/rio/rio-copacabana-beach.jpg',
              horario: 'Acceso libre 24h',
              precio: 'Gratis'
            }
          ]
        },
        {
          dia: 'Día 4 – Cristo Redentor, Parque Lage e Ipanema',
          zonas: [
            {
              nombre: 'Cristo Redentor (Corcovado)',
              descripcion:
                'Una de las Siete Maravillas del Mundo Moderno. La estatua de 30 metros de altura domina la ciudad desde el monte Corcovado. Se recomienda visitar temprano y en un día despejado para disfrutar de las mejores vistas panorámicas de Río y la bahía.',
              foto: 'assets/rio/rio-cristo-redentor.jpg',
              horario: '08:00–18:00',
              precio: 'Ticket tren o furgoneta oficial ≈ 90–130 BRL según temporada'
            },
            {
              nombre: 'Parque Lage y Mansión Lage',
              descripcion:
                'Hermoso parque al pie del Corcovado con senderos naturales, grutas, un pequeño acuario y fauna local (capibaras, monos y aves tropicales). En su centro se encuentra una mansión histórica con un café muy popular y vistas al Cristo. Es ideal para relajarse tras la visita al Corcovado.',
              foto: 'assets/rio/rio-parque-lage.jpg',
              horario: 'Diario 08:00–17:00',
              precio: 'Gratis'
            },
            {
              nombre: 'Almuerzo en Garota de Ipanema',
              descripcion:
                'Restaurante famoso donde Vinícius de Moraes escribió la célebre canción “Garota de Ipanema”. Ofrece platos típicos brasileños como la picanha a la brasa, feijoada y moqueca, con un ambiente local muy animado. Se recomienda reservar con antelación, especialmente los fines de semana.',
              foto: 'assets/rio/rio-garota-ipanema.jpg',
              horario: '11:00–00:00',
              precio: 'Plato principal ≈ 60–100 BRL'
            },
            {
              nombre: 'Playa de Ipanema',
              descripcion:
                'Considerada una de las playas más famosas del mundo, Ipanema ofrece un ambiente joven y cosmopolita. Ideal para disfrutar de la tarde tomando el sol, bañarse en el Atlántico o unirse a los partidos de futvóley locales. No olvides probar una auténtica caipirinha en el quiosco Astor Beach 83, frente al Posto 9.',
              foto: 'assets/rio/rio-ipanema.jpg',
              horario: 'Acceso libre 24h',
              precio: 'Gratis'
            },
            {
              nombre: 'Barrio de Leblon',
              descripcion:
                'Zona elegante y tranquila contigua a Ipanema, con tiendas, bares y cafeterías frente al mar. Ideal para dar un paseo al final del día antes de subir al mirador.',
              foto: 'assets/rio/rio-leblon.jpg',
              horario: 'Todo el día',
              precio: 'Gratis'
            },
            {
              nombre: 'Mirador de Arpoador (puesta de sol)',
              descripcion:
                'Roca entre Ipanema y Copacabana desde la que se contempla una de las puestas de sol más espectaculares de Río, con aplausos colectivos al atardecer. Un cierre perfecto para el día.',
              foto: 'assets/rio/rio-arpoador.jpg',
              horario: 'Abierto todo el día (mejor al atardecer)',
              precio: 'Gratis'
            }
          ]
        },
        {
          dia: 'Día 5 – Favela, Barrio de Urca y atardecer en el Pan de Azúcar',
          zonas: [
            {
              nombre: 'Tour por la Favela Rocinha',
              descripcion:
                'Rocinha es la favela más grande de Brasil y una de las más conocidas del mundo. Se puede visitar con guías locales que muestran el día a día de sus habitantes, el arte urbano, los miradores y los proyectos sociales que buscan transformar la comunidad. Se recomienda hacerlo siempre con una agencia oficial o guía certificado.',
              foto: 'assets/rio/rio-rocinha.jpg',
              horario: 'Tours guiados entre 9:00 y 13:00',
              precio: '≈ 120–200 BRL (según operador y duración)'
            },
            {
              nombre: 'Tour por el Sambódromo Marquês de Sapucaí',
              descripcion:
                'El Sambódromo es el corazón del Carnaval de Río de Janeiro, donde desfilan las escuelas de samba durante las festividades. Durante el año se pueden realizar visitas guiadas para conocer la historia del carnaval, ver los trajes y carrozas, e incluso participar en talleres de percusión o baile. Ideal para sentir el espíritu del carnaval aunque no sea febrero.',
              foto: 'assets/rio/rio-sambodromo.jpg',
              horario: 'De lunes a sábado, 10:00–17:00',
              precio: 'Entrada ≈ 60 BRL (con guía ≈ 100 BRL)',
              duracion: 'Aprox. 1 hora'
            },
            {
              nombre: 'Tour por el Estadio Maracaná',
              descripcion:
                'Uno de los estadios más emblemáticos del mundo y sede de finales históricas de fútbol. El recorrido incluye acceso al campo, los vestuarios, la sala de prensa y el pequeño museo donde se exhiben camisetas y objetos de leyendas como Pelé y Garrincha. Perfecto para los amantes del fútbol.',
              foto: 'assets/rio/rio-maracana.jpg',
              horario: 'Todos los días, 9:00–17:00',
              precio: 'Entrada ≈ 80–100 BRL',
              duracion: 'Aprox. 1 hora'
            },
            {
              nombre: 'Almuerzo en Garota de Urca',
              descripcion:
                'Restaurante tradicional frente a la bahía de Guanabara. Famoso por su picanha, pescados frescos y ambiente local relajado. Ideal para disfrutar de una comida con vistas al mar antes de la tarde en la playa.',
              foto: 'assets/rio/rio-garota-urca.jpg',
              horario: '11:00–23:00',
              precio: 'Plato principal ≈ 60–90 BRL'
            },
            {
              nombre: 'Praia Vermelha (Playa Roja)',
              descripcion:
                'Pequeña playa al pie del Pan de Azúcar, muy tranquila y con vistas impresionantes a los morros de Urca. Perfecta para descansar, bañarse o disfrutar de una caipirinha antes de subir al teleférico. Desde aquí parte el paseo hacia el Pan de Azúcar.',
              foto: 'assets/rio/rio-praia-vermelha.jpg',
              horario: 'Acceso libre todo el día',
              precio: 'Gratis'
            },
            {
              nombre: 'Subida al Pan de Azúcar (Pão de Açúcar) al atardecer',
              descripcion:
                'Una experiencia imprescindible. El teleférico conecta Praia Vermelha con el Morro da Urca y luego con el Pan de Azúcar. Desde arriba se obtiene una de las vistas más icónicas del mundo, especialmente al atardecer cuando la ciudad se ilumina frente al océano.',
              foto: 'assets/rio/rio-pao-de-acucar-sunset.jpg',
              horario: '08:00–20:00 (última subida recomendada antes de las 18:00)',
              precio: 'Ticket teleférico ≈ 120 BRL (ida y vuelta)'
            }
          ]
        },
        {
          dia: 'Día 6 – Naturaleza en Tijuca y samba en Rio Scenarium',
          zonas: [
            {
              nombre: 'Parque Nacional da Tijuca',
              descripcion:
                'Uno de los mayores bosques urbanos del mundo, el Parque Nacional da Tijuca es un auténtico pulmón verde en el corazón de Río de Janeiro. Está lleno de cascadas, senderos, miradores y fauna tropical (como monos titís, capibaras, tucanes y otras aves entre otras muchas especies). Ideal para disfrutar de la naturaleza sin salir de la ciudad.',
              foto: 'assets/rio/rio-tijuca.jpg',
              horario: 'Todos los días, 8:00–17:00',
              precio: 'Acceso gratuito',
            },
            {
              nombre: 'Cascatinha Taunay',
              descripcion:
                'Una de las cascadas más bonitas y accesibles del parque, con 35 metros de caída rodeada de vegetación exuberante. Es un punto perfecto para hacer fotos o descansar antes de continuar alguna de las rutas de senderismo cercanas.',
              foto: 'assets/rio/rio-cascatinha-taunay.jpg',
              horario: 'Acceso libre durante el día',
              precio: 'Gratis',
            },
            {
              nombre: 'Mirador Vista Chinesa',
              descripcion:
                'Uno de los puntos panorámicos más impresionantes de Río, con una pagoda de estilo chino construida en el siglo XIX. Desde aquí se puede contemplar el Corcovado, el Pan de Azúcar y las playas de Ipanema y Leblon. Se llega por una carretera escénica entre la selva atlántica.',
              foto: 'assets/rio/rio-vista-chinesa.jpg',
              horario: 'Acceso libre durante el día',
              precio: 'Gratis',
            },
            {
              nombre: 'Ruta de Pedra Bonita',
              descripcion:
                'Sendero muy popular dentro del parque que lleva a una cima desde donde se pueden ver el Pan de Azúcar, la Lagoa Rodrigo de Freitas y la playa de São Conrado. Desde aquí también despegan los parapentes y alas delta que sobrevuelan la costa. Nivel de dificultad moderado (1h30 aprox.).',
              foto: 'assets/rio/rio-pedra-bonita.jpg',
              horario: '6:00–17:00',
              precio: 'Gratis',
            },
            {
              nombre: 'Cena con espectáculo de samba en Rio Scenarium',
              descripcion:
                'Un clásico absoluto de la vida nocturna carioca. Rio Scenarium es un restaurante y casa de espectáculos ubicada en un antiguo almacén en el barrio de Lapa. Decorado con objetos antiguos y lleno de música en vivo, ofrece una experiencia completa: buena comida brasileña, caipirinhas y samba en directo hasta la madrugada.',
              foto: 'assets/rio/rio-scenarium.jpg',
              horario: 'Miércoles a domingo, 19:00–3:00',
              precio: 'Entrada ≈ 65 BRL (sin consumo)',
            }
          ]
        },
        {
          dia: 'Día 7 (y siguientes) – Escapada a Ilha Grande',
          zonas: [
            {
              nombre: 'Ilha Grande – Vila do Abraão',
              descripcion:
                'Principal localidad de Ilha Grande y punto de partida de la mayoría de excursiones. Un lugar encantador sin coches, con calles de arena, posadas y restaurantes frente al mar. Desde aquí parten las rutas y barcos hacia las playas y lagunas más hermosas de la isla.',
              foto: 'assets/rio/ilha-abraao.jpg',
              horario: 'Acceso libre (barcos desde Angra dos Reis, Conceição de Jacareí o Mangaratiba)',
              precio: 'Traslado marítimo ≈ 40–80 BRL por trayecto',
            },
            {
              nombre: 'Excursión a Lagoa Azul, Lagoa Verde y Gruta de Acaiá',
              descripcion:
                'Tour en lancha o barco que recorre algunas de las zonas más famosas de Ilha Grande. La Lagoa Azul y la Lagoa Verde destacan por sus aguas cristalinas, ideales para hacer snorkel y avistar peces y delfines. La Gruta de Acaiá es una cueva submarina con un curioso efecto luminoso turquesa.',
              foto: 'assets/rio/ilha-lagoa-azul.jpg',
              horario: 'Excursiones diarias, 9:00–15:00',
              precio: '≈ 150–250 BRL según tipo de embarcación',
            },
            {
              nombre: 'Praia Lopes Mendes',
              descripcion:
                'Considerada una de las playas más bonitas de Brasil, Lopes Mendes se alcanza tras una caminata de unas 2 horas desde Vila do Abraão o tomando un barco hasta Praia do Pouso y caminando 20 minutos más. Arena blanca, olas perfectas para surfistas y un entorno virgen hacen de esta playa un paraíso natural.',
              foto: 'assets/rio/ilha-lopes-mendes.jpg',
              horario: 'Acceso libre durante el día',
              precio: 'Gratis',
            },
            {
              nombre: 'Sendero a Praia da Feiticeira',
              descripcion:
                'Trilha (sendero) de dificultad moderada que parte desde Vila do Abraão y conduce a una pequeña cascada y a la playa de la Feiticeira, ideal para nadar y relajarse. Se puede combinar con paseo en taxi-boat de regreso.',
              foto: 'assets/rio/ilha-feiticeira.jpg',
              horario: 'Acceso libre (mejor entre 8:00 y 16:00)',
              precio: 'Gratis (opcional taxi-boat ≈ 30 BRL)',
            },
            {
              nombre: 'Saco do Céu y Freguesia de Santana',
              descripcion:
                'Pequeñas bahías y pueblos con encanto accesibles por barco o kayak. Saco do Céu es famoso por sus aguas tranquilas y restaurantes sobre el mar. Freguesia de Santana alberga una antigua iglesia colonial y playas perfectas para hacer snorkel.',
              foto: 'assets/rio/ilha-saco-do-ceu.jpg',
              horario: 'Excursiones diarias desde Vila do Abraão',
              precio: '≈ 100–180 BRL (tour en barco)',
            },
            {
              nombre: 'Trilha a Dois Rios',
              descripcion:
                'Una de las caminatas más largas de Ilha Grande (cerca de 3 horas desde Abraão), conduce al antiguo pueblo de Dois Rios y su playa paradisíaca. Antiguamente aquí se encontraba una prisión hoy abandonada. Ideal para los amantes del senderismo y la naturaleza salvaje.',
              foto: 'assets/rio/ilha-dois-rios.jpg',
              horario: '8:00–17:00',
              precio: 'Gratis',
            },
            {
              nombre: 'Actividades adicionales',
              descripcion:
                'Además de las excursiones, en Ilha Grande puedes practicar kayak, paddle surf o snorkel cerca de Vila do Abraão. Es un destino ideal para relajarse varios días, disfrutar de mariscos frescos, atardeceres sobre el mar y el ambiente isleño.',
              foto: 'assets/rio/ilha-kayak.jpg',
              horario: 'Según actividad (mañana y tarde)',
              precio: 'Kayak/snorkel ≈ 50–100 BRL',
            }
          ]
        }

      ]
    },
    {
      titulo: 'Gastronomía',
      platos: [
        {
          nombre: 'Caipirinha',
          descripcion:
            'El cóctel nacional de Brasil preparado con cachaça, lima, azúcar y hielo picado. Refrescante y potente, se disfruta especialmente en los chiringuitos de playa como el Astor Beach 83 en Ipanema.',
          foto: 'assets/rio/rio-caipirinha.jpg',
          precio: '15–25 BRL según el bar'
        },
        
        {
          nombre: 'Picanha (corte de carne brasileña)',
          descripcion:
            'Corte de carne muy tradicional en Brasil, parte de la parrillada. Suele servirse en los “churrascos” locales: carne tierna, con sabor pronunciado y a veces acompañada de guarniciones como arroz, farofa o verduras.',
          foto: 'assets/rio/rio-picanha.jpg',
          precio: 'Depende del restaurante, moderado-alto según calidad'
        },
        {
          nombre: 'Brigadeiro',
          descripcion:
            'Dulce típico brasileño hecho a base de leche condensada, cacao, mantequilla y cubierto con chocolate granulado. En la Confiteria Colombo tienes que degustar “el mejor brigadeiro de Río” como parte de tu paseo culinario.',
          foto: 'assets/rio/rio-brigadeiro.jpg',
          precio: 'Precio local de un dulce, asequible'
        },
        {
          nombre: 'Feijoada',
          descripcion:
            'Guiso tradicional brasileño a base de frijoles negros y carne, normalmente acompañado de arroz, farofa y naranja.',
          foto: 'assets/rio/rio-feijoada.jpg',
          precioOrientativo: '30–70 BRL'
        },
        {
          nombre: 'Moqueca',
          descripcion:
            'Estofado de pescado o marisco con leche de coco, aceite de dendê y cilantro, típico de la cocina brasileña costera. Muy aromático y servido en cazuela de barro.',
          foto: 'assets/rio/rio-moqueca.jpg',
          precio: '40–90 BRL'
        },
        {
          nombre: 'Guayaba (fruta local)',
          descripcion:
            'Fruta tropical abundante en Brasil. La guayaba es jugosa y puede encontrarse en mercados callejeros; excelente para un snack fresco entre paseos.',
          foto: 'assets/rio/rio-guayaba.jpg',
          precio: 'Muy económica (venta callejera)'
        },
      ]
    },
    {
      titulo: 'Cultura y Tradiciones',
      contenido:
        'Río es mundialmente famosa por su Carnaval, samba, escuelas de samba y una escena musical y artística muy activa. También destacan festivales, teatro y la mezcla cultural de sus barrios.'
    },
    {
      titulo: 'Consejos prácticos',
      contenido:
        'Evita llevar objetos de valor a la vista en zonas muy turísticas; usa transporte autorizado por la noche; cambia moneda en lugares oficiales; y prueba los mercados locales para gastronomía y artesanía.'
    }
  ]
};
