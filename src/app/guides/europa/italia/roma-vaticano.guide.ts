export const ROMA_VATICANO_GUIDE = {
  path: 'europa/italia/roma',
  nombre: 'Roma',
  flag: 'cld:europa/italia/roma/roma-flag',
  background: 'cld:europa/italia/roma/roma-bg',

  // Encuadre escritorio
  bgPos: '50% 50%',
  // Encuadre móvil
  bgPosMobile: '50% 50%',
  bgDim: 0.12,
  flagOpacity: 0.10,
  flagOpacityMobile: 0.16,
  flagSize: '75%',
  flagSizeMobile: '55%',
  bgSize: 'cover',
  bgSizeMobile: 'cover',

  descripcion:
    'Roma es una ciudad única donde cada paseo conecta con siglos de historia. Entre ruinas del Imperio romano, plazas barrocas, iglesias monumentales, barrios con muchísimo ambiente y una gastronomía espectacular, es un destino perfecto para mezclar cultura, arte, paseos y muy buena comida. El Vaticano añade además una dimensión monumental y espiritual incomparable.',

  infoGeneral: {
    idioma: 'Italiano',
    moneda: 'Euro (€)',
    hora: 'UTC +1',
    internet: 'Roaming UE disponible',
    electricidad: '230V – Enchufe tipo C, F y L',
    pasaporte: 'DNI o pasaporte válido',
    visado: 'No necesario para ciudadanos UE',
    vacunas: 'No obligatorias'
  },

  secciones: [
    {
      titulo: 'Historia',
      contenido:
        'Roma fue la capital del mayor imperio de la Antigüedad y sigue siendo una de las ciudades más influyentes de Europa. Su historia se percibe en cada rincón: foros, templos, anfiteatros, basílicas, palacios y plazas que muestran la superposición de la Roma antigua, la ciudad papal, el Renacimiento, el Barroco y la Italia moderna.'
    },
    {
      titulo: 'Geografía y Clima',
      contenido:
        'Situada en el centro de Italia y atravesada por el río Tíber, Roma se extiende sobre sus históricas colinas y combina grandes avenidas con un centro monumental muy caminable. Tiene clima mediterráneo, con veranos calurosos e inviernos suaves. Otoño y primavera suelen ser los mejores momentos para recorrerla a pie.'
    },
    {
      titulo: 'Qué visitar en Roma y el Vaticano',
      itinerario: [
        {
          dia: 'Día 1 – Centro histórico, Roma clásica y Coliseo de noche',
          zonas: [
            {
              nombre: 'Fontana di Trevi',
              descripcion:
                'Empieza el día en uno de los lugares más icónicos de Roma. La Fontana di Trevi impresiona por su tamaño, su teatralidad barroca y el ambiente que siempre la rodea. Es una parada perfecta para arrancar el viaje con fuerza y empezar a sentir la ciudad.\n\n💡 Consejo: si puedes, vuelve también de noche, porque cambia muchísimo.',
              foto: 'cld:europa/italia/roma/fontana-trevi',
              horario: 'Acceso libre todo el día',
              precio: 'Gratis'
            },
            {
              nombre: 'Panteón',
              descripcion:
                'Desde Trevi, lo mejor es seguir caminando por el centro histórico hasta el Panteón. Es uno de los edificios mejor conservados de toda la Antigua Roma y una auténtica maravilla arquitectónica. Su cúpula y el óculo central son de esas cosas que impresionan incluso aunque ya las hayas visto en fotos.',
              foto: 'cld:europa/italia/roma/panteon',
              horario: 'Visita diurna',
              precio: 'Entrada de pago'
            },
            {
              nombre: 'Piazza Navona',
              descripcion:
                'Muy cerca del Panteón aparece Piazza Navona, una de las plazas con más encanto de Roma. Aquí lo ideal es bajar el ritmo, mirar alrededor y disfrutar del ambiente. Entre fuentes, palacios, terrazas y artistas callejeros, es una de las plazas que mejor resumen el espíritu romano.',
              foto: 'cld:europa/italia/roma/piazza-navona',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Campo de’ Fiori',
              descripcion:
                'Continúa el paseo hasta Campo de’ Fiori, una plaza muy viva y con mucha personalidad. Dependiendo de la hora, el ambiente cambia bastante, pero siempre mantiene ese punto auténtico y popular que la hace tan agradable.',
              foto: 'cld:europa/italia/roma/campo-fiori',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Paseo hacia Largo di Torre Argentina',
              descripcion:
                'Desde Campo de’ Fiori puedes acercarte caminando a Largo di Torre Argentina. El trayecto merece la pena porque sigue mostrando esa Roma donde casi cada calle es interesante. Aquí te encuentras con un conjunto arqueológico muy simbólico, tradicionalmente vinculado al asesinato de Julio César.',
              foto: 'cld:europa/italia/roma/torre-argentina',
              horario: 'Exterior visitable',
              precio: 'Gratis exterior'
            },
            {
              nombre: 'Barrio Judío y Gran Sinagoga',
              descripcion:
                'A continuación, merece mucho la pena entrar en el barrio judío, una de las zonas con más personalidad de Roma. Es un barrio con mucha historia, rincones tranquilos y una identidad muy marcada. Aquí destaca también la Gran Sinagoga, uno de los edificios más reconocibles del barrio y un símbolo importante de la comunidad judía romana.',
              fotos: [
                'cld:europa/italia/roma/barrio-judio',
                'cld:europa/italia/roma/gran-sinagoga'
              ],
              horario: 'Zona visitable todo el día',
              precio: 'Gratis exterior'
            },
            {
              nombre: 'Teatro de Marcelo',
              descripcion:
                'Muy cerca del barrio judío está el Teatro de Marcelo, una parada breve pero muy interesante. A menudo se le compara con un pequeño Coliseo, y aunque es menos famoso, tiene muchísimo encanto y una presencia histórica impresionante.',
              foto: 'cld:europa/italia/roma/teatro-marcelo',
              horario: 'Exterior visitable',
              precio: 'Gratis exterior'
            },
            {
              nombre: 'Museos Capitolinos y Piazza del Campidoglio',
              descripcion:
                'La subida hacia el Campidoglio introduce ya de lleno en una Roma monumental y muy potente visualmente. La plaza diseñada por Miguel Ángel es una maravilla en sí misma, y las vistas hacia el Foro Romano desde aquí son de las mejores del centro histórico.\n\n💡 Destaca también la Loba Capitolina, uno de los grandes símbolos de Roma.',
              foto: 'cld:europa/italia/roma/campidoglio',
              horario: 'Visita diurna',
              precio: 'Entrada de pago'
            },
            {
              nombre: 'Monumento a Vittorio Emanuele II',
              descripcion:
                'Desde el Campidoglio, el Monumento a Vittorio Emanuele II aparece como una de las construcciones más impactantes del centro. Su escala y su color blanco lo hacen inconfundible. Puede gustar más o menos, pero desde luego es uno de los grandes iconos visuales de la ciudad.',
              foto: 'cld:europa/italia/roma/vittorio-emanuele',
              horario: 'Exterior visitable',
              precio: 'Gratis exterior'
            },
            {
              nombre: 'Mercado de Trajano',
              descripcion:
                'Muy cerca puedes continuar hacia el Mercado de Trajano, un conjunto arqueológico fascinante que ayuda a imaginar la magnitud de la antigua Roma imperial. Es una parada muy buena antes de entrar de lleno en la zona del Foro.',
              foto: 'cld:europa/italia/roma/mercado-trajano',
              horario: 'Visita diurna',
              precio: 'Entrada de pago'
            },
            {
              nombre: 'Foro Romano',
              descripcion:
                'El Foro Romano es una de las visitas más impresionantes de la ciudad. Aquí estaba el corazón político, social y religioso de la antigua Roma, y recorrerlo permite conectar con la escala real del Imperio.\n\n💡 Consejo: tómalo con calma, porque es uno de los puntos más importantes del viaje.',
              foto: 'cld:europa/italia/roma/foro-romano',
              horario: 'Visita diurna',
              precio: 'Entrada de pago'
            },
            {
              nombre: 'Basílica de San Pietro in Vincoli',
              descripcion:
                'Después del Foro, la parada en San Pietro in Vincoli encaja muy bien. Aquí se encuentra el famoso Moisés de Miguel Ángel, una de las esculturas más impresionantes del Renacimiento y una visita muy recomendable aunque sea breve.',
              foto: 'cld:europa/italia/roma/san-pietro-vincoli',
              horario: 'Horario de culto y visita',
              precio: 'Gratis'
            },
            {
              nombre: 'Coliseo (noche)',
              descripcion:
                'Terminar el día viendo el Coliseo de noche es una manera espectacular de cerrar la jornada. Iluminado, con menos calor y otro ambiente, se convierte en una de esas imágenes que se quedan grabadas del viaje.',
              foto: 'cld:europa/italia/roma/coliseo-noche',
              horario: 'Exterior visitable',
              precio: 'Gratis exterior'
            },
            {
              nombre: 'Barrio Latino',
              descripcion:
                'Si todavía te quedan fuerzas, el final del día puede seguir en el Barrio Latino, una zona con ambiente más local y universitario, ideal para cenar o tomar algo tras una jornada cargadísima de historia.',
              foto: 'cld:europa/italia/roma/barrio-latino',
              horario: 'Noche',
              precio: 'Según consumo'
            }
          ]
        },
        {
          dia: 'Día 2 – Plazas, villas, Roma imperial y noche en Trastévere',
          zonas: [
            {
              nombre: 'Basílica di Santa Maria della Vittoria',
              descripcion:
                'El segundo día puede empezar con una visita breve pero muy potente a Santa Maria della Vittoria. Es una iglesia barroca célebre por albergar el Éxtasis de Santa Teresa de Bernini, una obra que por sí sola ya justifica la parada.',
              foto: 'cld:europa/italia/roma/santa-maria-vittoria',
              horario: 'Horario de culto y visita',
              precio: 'Gratis'
            },
            {
              nombre: 'Trinità dei Monti',
              descripcion:
                'Desde aquí, lo natural es moverse hacia la zona de la Plaza de España y Trinità dei Monti. La iglesia, situada en lo alto de la escalinata, ofrece una de las imágenes más conocidas de Roma y sirve como excelente transición hacia la parte más elegante de la ciudad.',
              foto: 'cld:europa/italia/roma/trinita-dei-monti',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Plaza de España',
              descripcion:
                'La Plaza de España es una de las grandes postales de Roma. Más allá de la foto típica, es una zona muy agradable para pasear, observar el ambiente y seguir conectando con esa Roma más monumental y refinada.',
              foto: 'cld:europa/italia/roma/plaza-espana',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Pastificio Guerra',
              descripcion:
                'Muy buena parada para comer algo rápido y seguir ruta. Pastificio Guerra es muy famoso por sus platos de pasta a precio muy económico, una opción perfecta si no quieres perder mucho tiempo en una comida larga.',
              foto: 'cld:europa/italia/roma/pastificio-guerra',
              horario: 'Hasta 21:00',
              precio: 'Pasta ≈ 5€'
            },
            {
              nombre: 'Pompi',
              descripcion:
                'Después, toca la parada dulce. Pompi es uno de los nombres más conocidos cuando se habla de tiramisú en Roma, así que encaja perfectamente como pequeño capricho entre visitas.',
              foto: 'cld:europa/italia/roma/pompi',
              horario: 'Hasta 21:30',
              precio: 'Según pedido'
            },
            {
              nombre: 'Via del Corso',
              descripcion:
                'La ruta sigue por Via del Corso, una de las grandes avenidas del centro histórico. Aquí el plan es pasear, entrar en tiendas si te apetece y dejar que la ciudad fluya sin demasiada prisa.',
              foto: 'cld:europa/italia/roma/via-del-corso',
              horario: 'Todo el día',
              precio: 'Gratis'
            },
            {
              nombre: 'Piazza del Popolo',
              descripcion:
                'Al final del paseo aparece Piazza del Popolo, una plaza amplia y monumental que sirve como antesala perfecta para subir después al Pincio. Es una parada elegante y muy fotogénica.',
              foto: 'cld:europa/italia/roma/piazza-popolo',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Ara Pacis',
              descripcion:
                'Muy cerca se encuentra el Ara Pacis, una de las piezas más importantes de la Roma de Augusto. La mezcla entre monumento clásico y arquitectura contemporánea del museo le da un contraste muy interesante.',
              foto: 'cld:europa/italia/roma/ara-pacis',
              horario: 'Visita diurna',
              precio: 'Entrada de pago'
            },
            {
              nombre: 'Pincio',
              descripcion:
                'Subir a la terraza del Pincio es una de las mejores formas de ganar perspectiva sobre Roma. Las vistas merecen muchísimo la pena y es un punto perfecto para hacer una pausa antes de seguir con el día.',
              foto: 'cld:europa/italia/roma/pincio',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Galleria Borghese',
              descripcion:
                'La Galleria Borghese es una de las grandes visitas artísticas de Roma. Si te interesa el arte, es una parada espectacular por la calidad de sus obras y por el propio entorno de la villa.',
              foto: 'cld:europa/italia/roma/galleria-borghese',
              horario: 'Visita con reserva',
              precio: 'Entrada de pago'
            },
            {
              nombre: 'Basílica de Santa Maria Maggiore',
              descripcion:
                'A continuación, Santa Maria Maggiore introduce una dimensión mucho más monumental y religiosa del viaje. Es una de las basílicas papales de Roma y una visita muy recomendable por su historia y su interior.',
              foto: 'cld:europa/italia/roma/santa-maria-maggiore',
              horario: 'Horario de culto y visita',
              precio: 'Gratis'
            },
            {
              nombre: 'Coliseo (día)',
              descripcion:
                'Si el día anterior lo viste iluminado, ahora toca disfrutarlo de día y apreciar mejor toda su escala. El Coliseo de día permite entenderlo mucho mejor como gran símbolo de la antigua Roma.',
              foto: 'cld:europa/italia/roma/coliseo-dia',
              horario: 'Visita diurna',
              precio: 'Entrada de pago'
            },
            {
              nombre: 'Arco de Constantino',
              descripcion:
                'Justo al lado del Coliseo, el Arco de Constantino es una parada breve pero muy interesante. Está perfectamente integrado en esta zona monumental y ayuda a reforzar aún más la sensación de estar en pleno corazón de la Roma imperial.',
              foto: 'cld:europa/italia/roma/arco-constantino',
              horario: 'Exterior visitable',
              precio: 'Gratis'
            },
            {
              nombre: 'Foro Romano y Palatino',
              descripcion:
                'Si el día anterior no pudiste verlo con calma o quieres completar el recorrido, el Foro Romano y el Palatino forman una de las grandes visitas arqueológicas de Roma. Aquí se entiende realmente la dimensión imperial de la ciudad.',
              fotos: [
                'cld:europa/italia/roma/foro-romano',
                'cld:europa/italia/roma/palatino'
              ],
              horario: 'Visita diurna',
              precio: 'Entrada de pago'
            },
            {
              nombre: 'Termas de Caracalla',
              descripcion:
                'Después de la zona del Coliseo, las Termas de Caracalla ofrecen otra perspectiva impresionante de la vida romana. Son enormes, muy evocadoras y bastante menos agobiantes que otros puntos más centrales.',
              foto: 'cld:europa/italia/roma/termas-caracalla',
              horario: 'Visita diurna',
              precio: 'Entrada de pago'
            },
            {
              nombre: 'Circo Máximo',
              descripcion:
                'El paseo continúa por el Circo Máximo, un espacio histórico inmenso que hoy puede parecer más sobrio, pero que en su época fue uno de los grandes centros de espectáculo de la ciudad.',
              foto: 'cld:europa/italia/roma/circo-maximo',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Foro Boario',
              descripcion:
                'En esta zona se conserva una Roma más antigua y con muchísimo encanto. Es una transición muy buena hacia la siguiente parada, más curiosa y popular.',
              foto: 'cld:europa/italia/roma/foro-boario',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Santa Maria in Cosmedin (Bocca della Verità)',
              descripcion:
                'La famosa Bocca della Verità convierte esta parada en una de las más curiosas y reconocibles de Roma. Además, la iglesia y el entorno tienen bastante encanto.',
              foto: 'cld:europa/italia/roma/bocca-verita',
              horario: 'Horario de visita',
              precio: 'Gratis / donativo'
            },
            {
              nombre: 'Piazza dei Cavalieri di Malta',
              descripcion:
                'Uno de los rincones más especiales del Aventino. Mirar por la cerradura y ver la cúpula de San Pedro perfectamente enmarcada es una de esas pequeñas experiencias que hacen Roma tan especial.',
              foto: 'cld:europa/italia/roma/cavalieri-malta',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Cena en Trastévere',
              descripcion:
                'Tras un día larguísimo, Trastévere es el sitio ideal para terminar la jornada. Sus calles, su ambiente y la mezcla de turistas y locales hacen que sea uno de los barrios más agradables para cenar en Roma.',
              foto: 'cld:europa/italia/roma/trastevere',
              horario: 'Noche',
              precio: 'Según restaurante'
            },
            {
              nombre: 'Tonnarello',
              descripcion:
                'Uno de los nombres más famosos de Trastévere, muy conocido por su cacio e pepe y por su ambiente. Es una opción muy buena para cenar y disfrutar de una de las pastas más clásicas de Roma.',
              foto: 'cld:europa/italia/roma/tonnarello',
              horario: 'Hasta 24:00',
              precio: 'Moderado'
            },
            {
              nombre: 'Gelato en Dulcis in Fundo',
              descripcion:
                'Como broche final, un buen gelato en Trastévere siempre entra bien. Una forma perfecta de cerrar una jornada intensísima.',
              foto: 'cld:europa/italia/roma/dulcis-in-fundo',
              horario: 'Noche',
              precio: 'Según pedido'
            }
          ]
        },
        {
          dia: 'Día 3 – Vaticano y despedida de Roma',
          zonas: [
            {
              nombre: 'Helado en Giolitti',
              descripcion:
                'El último día puede empezar de forma más relajada con una parada en Giolitti, una de las heladerías más famosas de Roma. Un pequeño capricho que encaja muy bien antes de afrontar la parte final del viaje.',
              foto: 'cld:europa/italia/roma/giolitti',
              horario: 'Según horario del local',
              precio: 'Según pedido'
            },
            {
              nombre: 'Pizzería Da Baffetto o Cantina e Cucina',
              descripcion:
                'Antes o después de la zona del Vaticano, estas dos opciones son muy buenas para comer. Da Baffetto es famosa por sus pizzas, mientras que Cantina e Cucina es muy recomendable para probar clásicos romanos como saltimbocca alla romana, polpette al sugo, bucatini all’amatriciana o lasaña.',
              fotos: [
                'cld:europa/italia/roma/da-baffetto',
                'cld:europa/italia/roma/cantina-cucina'
              ],
              horario: 'Comida',
              precio: 'Moderado'
            },
            {
              nombre: 'Misa del Papa',
              descripcion:
                'Si coincide y te interesa la experiencia, comenzar el día con la misa papal del domingo por la mañana es algo muy especial. Aporta una dimensión completamente distinta al viaje y conecta con el peso espiritual del Vaticano.',
              foto: 'cld:europa/italia/roma/misa-papa',
              horario: 'Domingo temprano',
              precio: 'Gratis'
            },
            {
              nombre: 'Museos Vaticanos y Capilla Sixtina',
              descripcion:
                'Los Museos Vaticanos son una de las grandes visitas del viaje. El recorrido es larguísimo y muy potente, culminando en la Capilla Sixtina, uno de los espacios artísticos más impresionantes del mundo.\n\n💡 Consejo: conviene llegar con reserva y con paciencia, porque es una visita de mucha intensidad.',
              foto: 'cld:europa/italia/roma/museos-vaticanos',
              horario: 'Visita con reserva',
              precio: 'Entrada de pago'
            },
            {
              nombre: 'Basílica de San Pedro',
              descripcion:
                'Tras la parte museística, la Basílica de San Pedro pone el broche monumental al Vaticano. Es uno de esos lugares que impresionan por tamaño, por simbolismo y por belleza.',
              foto: 'cld:europa/italia/roma/basilica-san-pedro',
              horario: 'Horario de visita y culto',
              precio: 'Gratis'
            },
            {
              nombre: 'Castillo Sant’Angelo',
              descripcion:
                'Al salir del Vaticano, el paseo puede continuar hacia el Castillo Sant’Angelo, una fortaleza histórica que domina el entorno del Tíber y que encaja perfectamente como continuación de la jornada.',
              foto: 'cld:europa/italia/roma/castel-santangelo',
              horario: 'Visita diurna',
              precio: 'Entrada de pago'
            },
            {
              nombre: 'Puente Umberto I',
              descripcion:
                'Para terminar esta parte del recorrido, el Puente Umberto I ofrece una de las vistas más clásicas y fotogénicas de Roma, con el río, el castillo y la cúpula de San Pedro al fondo.',
              foto: 'cld:europa/italia/roma/puente-umberto-i',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Shopping',
              descripcion:
                'El cierre del viaje queda perfecto con un poco de tiempo para compras, últimos recuerdos o un paseo final por la ciudad antes de volver. Es el momento de bajar el ritmo y despedirse de Roma con calma.',
              horario: 'Según tu horario de vuelta',
              precio: 'Según compras'
            }
          ]
        }
      ]
    },
    {
      titulo: 'Gastronomía',
      platos: [
        {
          nombre: 'Cacio e pepe',
          descripcion:
            'Una de las pastas más famosas de Roma, elaborada con pecorino y pimienta negra. Sencilla en apariencia, pero espectacular cuando está bien hecha.',
          foto: 'cld:europa/italia/roma/cacio-e-pepe',
          precio: 'Moderado'
        },
        {
          nombre: 'Saltimbocca alla romana',
          descripcion:
            'Uno de los grandes clásicos romanos, normalmente preparado con carne, jamón y salvia. Muy representativo de la cocina local.',
          foto: 'cld:europa/italia/roma/saltimbocca',
          precio: 'Moderado'
        },
        {
          nombre: 'Polpette al sugo',
          descripcion:
            'Albóndigas en salsa de tomate, muy típicas y muy presentes en trattorias y restaurantes de cocina tradicional.',
          foto: 'cld:europa/italia/roma/polpette-sugo',
          precio: 'Moderado'
        },
        {
          nombre: 'Bucatini all’amatriciana',
          descripcion:
            'Otro de los grandes iconos de la gastronomía romana, con tomate, guanciale y pecorino. Una de las pastas imprescindibles del viaje.',
          foto: 'cld:europa/italia/roma/amatriciana',
          precio: 'Moderado'
        },
        {
          nombre: 'Lasaña',
          descripcion:
            'Gran clásico italiano que en Roma también aparece en muchos locales tradicionales.',
          foto: 'cld:europa/italia/roma/lasana',
          precio: 'Moderado'
        },
        {
          nombre: 'Pinsa romana',
          descripcion:
            'Versión ovalada y más ligera de la pizza, muy crujiente y muy popular en Roma.',
          foto: 'cld:europa/italia/roma/pinsa',
          precio: 'Económico-moderado'
        },
        {
          nombre: 'Pizza romana',
          descripcion:
            'Más fina y crujiente que en otras partes de Italia. Imprescindible probar una buena pizza en Roma.',
          foto: 'cld:europa/italia/roma/pizza-romana',
          precio: 'Económico-moderado'
        },
        {
          nombre: 'Panini',
          descripcion:
            'Muy buena opción para comer algo rápido entre visitas sin perder demasiado tiempo.',
          foto: 'cld:europa/italia/roma/panini',
          precio: 'Económico'
        },
        {
          nombre: 'Spritz Aperol',
          descripcion:
            'Uno de los aperitivos más populares de Italia, ideal para tomar algo antes de cenar o mientras picas algo.',
          foto: 'cld:europa/italia/roma/spritz-aperol',
          precio: 'Moderado'
        },
        {
          nombre: 'Tiramisú',
          descripcion:
            'Uno de los postres italianos más famosos del mundo, con muy buenos sitios para probarlo en Roma.',
          foto: 'cld:europa/italia/roma/tiramisu',
          precio: 'Económico'
        },
        {
          nombre: 'Gelato',
          descripcion:
            'El helado italiano es un imprescindible absoluto en cualquier paseo por Roma.',
          foto: 'cld:europa/italia/roma/gelato',
          precio: 'Económico'
        }
      ]
    },
    {
      titulo: 'Dónde comer en Roma',
      lugares: [
        {
          nombre: 'Tonnarello',
          descripcion:
            'Muy famoso en Trastévere, especialmente por su pasta cacio e pepe y por el ambiente del local.',
          horario: 'Hasta 24:00',
          precio: 'Moderado'
        },
        {
          nombre: 'Forno da Milvio',
          descripcion:
            'Muy buena opción para pizzas.',
          horario: 'Hasta 21:00',
          precio: 'Económico-moderado'
        },
        {
          nombre: 'Osteria degli Ubertini',
          descripcion:
            'Muy recomendable para probar buenos menús romanos tradicionales.',
          horario: 'Hasta 23:00',
          precio: 'Moderado'
        },
        {
          nombre: 'Pizzería Da Baffetto',
          descripcion:
            'Uno de los nombres más conocidos para comer pizza en Roma.',
          precio: 'Económico-moderado'
        },
        {
          nombre: 'Cantina e Cucina',
          descripcion:
            'Muy buena opción para probar saltimbocca alla romana, polpette al sugo, bucatini all’amatriciana y lasaña.',
          precio: 'Moderado'
        },
        {
          nombre: 'Bono Bottega Nostrana',
          descripcion:
            'Muy recomendable para paninis, ideal si quieres comer algo rápido entre visitas.',
          horario: 'Hasta 21:00',
          precio: 'Económico'
        },
        {
          nombre: 'Restaurante La Base',
          descripcion:
            'Buen sitio para tomar un spritz Aperol y picar algo, con horario muy amplio.',
          horario: 'Hasta las 04:00',
          precio: 'Moderado'
        },
        {
          nombre: 'La Tavernatta 29 da Tony e Andrea',
          descripcion:
            'Muy recomendable para probar raviolis con salsa de trufa y tiramisú.',
          horario: 'Hasta 22:00',
          precio: 'Moderado'
        },
        {
          nombre: 'La Fraschetta der Panino',
          descripcion:
            'Muy buena opción para probar amatriciana.',
          horario: 'Hasta 23:30',
          precio: 'Moderado'
        },
        {
          nombre: 'Pinsere',
          descripcion:
            'Uno de los sitios más conocidos para probar pinsa romana.',
          horario: 'Hasta 21:00',
          precio: 'Económico-moderado'
        },
        {
          nombre: 'Momart',
          descripcion:
            'Opción de buffet libre y ambiente nocturno.',
          horario: 'Hasta las 02:00',
          precio: 'Moderado'
        },
        {
          nombre: 'Pompi',
          descripcion:
            'Muy famoso por su tiramisú.',
          horario: 'Hasta 21:30',
          precio: 'Económico'
        },
        {
          nombre: 'Pastificio Guerra',
          descripcion:
            'Muy conocido por su pasta a precio muy económico.',
          horario: 'Hasta 21:00',
          precio: 'Pasta ≈ 5€'
        },
        {
          nombre: 'Pastasciutta',
          descripcion:
            'Buena opción informal para comer pasta en Roma.',
          precio: 'Económico-moderado'
        }
      ]
    },
    {
      titulo: 'Consejos prácticos',
      contenido:
        'Roma se disfruta muchísimo caminando, pero conviene organizar bien cada jornada por zonas porque hay muchísimo que ver. Algunas visitas importantes como Museos Vaticanos, Galleria Borghese o Coliseo suelen requerir reserva o tienen bastante afluencia, así que planificar con tiempo ayuda mucho. También merece la pena alternar monumentos con paradas gastronómicas para no saturarte y disfrutar mejor del viaje.'
    }
  ]
};