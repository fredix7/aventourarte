export const BUCAREST_GUIDE = {
  path: 'europa/rumania/bucarest',
  nombre: 'Bucarest',
  flag: 'cld:europa/rumania/bucarest/bucarest-flag',
  background: 'cld:europa/rumania/rumania-flag',

  //Encuadre escritorio
  bgPos: '50% 65%',
  //Encuadre Móvil
  bgPosMobile: '50% 65%',
  bgDim: 0.10,
  //Transparencia bandera
  flagOpacity: 0.12,
  flagOpacityMobile: 0.18,
  //Tamaño bandera overlay
  flagSize: '75%',
  flagSizeMobile: '50%',
  //Tamaño del fondo
  bgSize: 'cover',
  bgSizeMobile: 'cover',

  descripcion:
    'Bucarest, capital de Rumanía, combina grandes edificios monumentales, barrios históricos, cafés con encanto, iglesias ortodoxas, palacios y una intensa vida cultural y nocturna. Es una ciudad ideal para mezclar historia, gastronomía, arquitectura y excursiones cercanas.',

  infoGeneral: {
    idioma: 'Rumano',
    moneda: 'Leu rumano (RON) — 1 € ≈ 5 RON',
    hora: 'UTC +2 (+1h respecto a España)',
    internet: 'Roaming UE disponible',
    electricidad: '230V – Enchufe tipo C y F',
    pasaporte: 'DNI o pasaporte válido',
    visado: 'No necesario para ciudadanos UE',
    vacunas: 'No obligatorias'
  },

  secciones: [
    {
      titulo: 'Historia',
      contenido:
        'Bucarest ha sido durante siglos el principal centro político, económico y cultural de Rumanía. Su historia mezcla influencias otomanas, francesas, comunistas y modernas, lo que se refleja en su arquitectura y en el contraste entre grandes bulevares, iglesias ortodoxas, palacios y barrios tradicionales.'
    },
    {
      titulo: 'Geografía y Clima',
      contenido:
        'Situada en el sureste de Rumanía, Bucarest tiene un clima continental, con inviernos fríos y veranos cálidos. La primavera y el otoño suelen ser las mejores épocas para disfrutar de la ciudad a pie.'
    },
    {
      titulo: 'Qué visitar en Bucarest',
      itinerario: [
        {
          dia: 'Día 1 – Bucarest monumental',
          zonas: [
            {
              nombre: 'Free tour por Bucarest',
              descripcion:
                'Empieza el día con un free tour para entender el contexto histórico, político y arquitectónico de la ciudad. Es la mejor forma de descubrir los contrastes de Bucarest, desde su pasado comunista hasta su evolución actual.\n\n💡 Consejo: intenta reservar a primera hora para luego continuar el día con el resto de visitas.',
              horario: 'Según reserva',
              precio: 'Aportación voluntaria'
            },
            {
              nombre: 'Palacio del Parlamento de Bucarest',
              descripcion:
                'Uno de los edificios más impresionantes del mundo y el más pesado jamás construido. Levantado durante la época de Nicolae Ceaușescu, este gigantesco palacio es símbolo del poder y la ambición del régimen comunista. Su interior está lleno de salas monumentales, mármol, alfombras gigantes y decoración ostentosa. La visita permite recorrer parte del edificio y entender mejor la historia reciente de Rumanía.\n\n 💡 Importante: solo se puede visitar mediante tour guiado oficial.\n\n💡 Consejo: se recomienda reservar con al menos 24h de antelación, ya que el acceso es limitado y puede haber cambios por eventos oficiales.\n\n💡 Consejo: intenta ir a primera hora para evitar grupos grandes y aprovechar mejor la visita.',
              foto: 'cld:europa/rumania/bucarest/palacio-parlamento',
              acceso: 'DNI o pasaporte obligatorio. Control de seguridad tipo aeropuerto',
              horario:
                'Mar–Oct: 09:00–17:00 | Nov–Feb: 10:00–16:00',
              precio:
                '≈ 12€ adultos | Estudiantes: 6€ | Niños: 4€ | Menores de 7: gratis\nTerraza: +3–4€ aprox.'
            },
            {
              nombre: 'Parque Izvor',
              descripcion:
                'Gran espacio abierto junto al Palacio del Parlamento, ideal para pasear y disfrutar de las vistas del edificio desde otra perspectiva. Es una buena parada para descansar tras la visita.',
              foto: 'cld:europa/rumania/bucarest/parque-izvor',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Palacio del Patriarcado',
              descripcion:
                'Edificio neoclásico situado junto a la catedral, utilizado actualmente como sede administrativa de la Iglesia Ortodoxa Rumana y centro de conferencias.\n\nAunque no es un museo como tal, permite ver parte del conjunto institucional y entender el papel de la Iglesia en la vida política e histórica del país.\n\n💡 Importante: el acceso puede estar limitado o restringido según eventos oficiales o conferencias.',
              foto: 'cld:europa/rumania/bucarest/palacio-patriarcal',
              horario:
                'Lun–Vie: 09:00–16:00 | Sáb–Dom: cerrado',
              precio:
                'Generalmente gratis (acceso limitado)'
            },
            {
              nombre: 'Catedral Patriarcal de Bucarest',
              descripcion:
                'Principal templo de la Iglesia Ortodoxa Rumana y uno de los lugares religiosos más importantes del país. Situada en una colina con vistas a la ciudad, destaca por su arquitectura tradicional y su ambiente espiritual.\n\nEs un lugar de culto activo, por lo que se respira un ambiente muy auténtico y local. \n\n👕 Vestimenta: al ser un recinto religioso, se recomienda vestir con respeto (hombros cubiertos y evitar ropa demasiado corta). \n\n💡 Consejo: si solo quieres visitarla como turista, es mejor evitar las horas de liturgia para disfrutarla con más tranquilidad.',
              foto: 'cld:europa/rumania/bucarest/catedral-patriarcal',
              horario:
                'Todos los días: 07:00–20:00',
              precio:
                'Gratis'
            },
            {
              nombre: 'Parque Cișmigiu',
              descripcion:
                'El parque más antiguo y emblemático del centro de Bucarest. Perfecto para desconectar, pasear entre sus senderos o sentarse junto al lago.\n\nUn oasis verde en medio de la ciudad.',
              foto: 'cld:europa/rumania/bucarest/parque-cismigiu',
              horario: 'Acceso libre',
              precio: 'Gratis'
            },
            {
              nombre: 'Catedral de la Salvación del Pueblo (Catedral Nacional)',
              descripcion:
                'La iglesia ortodoxa más grande y alta del mundo, situada justo detrás del Palacio del Parlamento. Es uno de los proyectos más ambiciosos de la Rumanía moderna y símbolo de la fe ortodoxa en el país.\n\nAunque fue consagrada en 2018, su interior sigue en proceso de finalización, destacando los impresionantes mosaicos en desarrollo.\n\nCon una altura de 120 metros y capacidad para más de 5.000 personas, combina elementos bizantinos con la tradición rumana.\n\n💡 Destaca: alberga la campana balanceante más grande del mundo (25 toneladas).\n\n💡 Consejo: al estar aún en construcción parcial, algunas zonas pueden no ser accesibles o tener restricciones.\n\n👕 Vestimenta: es obligatorio vestir con respeto (hombros y rodillas cubiertos).\n\n📸 Fotos: el exterior se puede fotografiar sin problema, pero en el interior puede haber restricciones.\n\n📍 Acceso: entrada principal por la zona de Calea 13 Septembrie, junto al Parlamento.',
              foto: 'cld:europa/rumania/bucarest/catedral-nacional',
              horario:
                'General: 08:00–18:00 | Domingos (liturgia): 09:00–12:00',
              precio:
                'Gratis'
            },
            {
              nombre: 'Palacio Cotroceni (Museo Nacional Cotroceni)',
              descripcion:
                'Antigua residencia real y actual sede de la Presidencia de Rumanía. Este palacio combina historia, arquitectura elegante y contexto político, permitiendo entender la evolución del país desde la monarquía hasta la actualidad.\n\nLa visita se realiza exclusivamente mediante tour guiado por sus salones históricos, decorados con mobiliario original y elementos de gran valor artístico.\n\n💡 Importante: es obligatorio reservar con al menos 24h de antelación.\n\n💡 Consejo: algunos días pueden tener horarios reducidos o restricciones por eventos oficiales, por lo que es recomendable confirmar al hacer la reserva.\n\n📍 Acceso: la entrada para visitantes se realiza por la Șoseaua Cotroceni, justo frente al Jardín Botánico, una visita muy recomendable para combinar después.',
              foto: 'cld:europa/rumania/bucarest/palacio-cotroceni',
              acceso: 'Es imprescindible presentar DNI o pasaporte original físico (no valen copias ni fotos), ya que se pasa un control de seguridad.',
              horario:
                'Mar–Dom: 09:00–17:00 (última visita ~15:30–16:00) | Lun: cerrado\nMiércoles: posible horario reducido | Jueves: consultar disponibilidad',
              precio:
                '≈ 12€ adultos | Estudiantes: 6€ | Niños: 4€\n(Fotografía profesional con suplemento)'
            },
            {
              nombre: 'Fuentes de la Plaza de la Unión (Fântânile Piața Unirii)',
              descripcion:
                'Uno de los espectáculos más impresionantes de Bucarest. Estas fuentes forman un sistema coreografiado que atraviesa el centro de la ciudad a lo largo de más de 1,4 km, reconocido como el más largo del mundo.\n\nDurante los meses de mayo a octubre se celebra el espectáculo “Simfonia Apei” (Sinfonía del Agua), donde chorros de agua “bailan” al ritmo de música clásica y moderna, acompañados de luces LED y proyecciones láser.\n\nEs un plan perfecto para terminar el día, con un ambiente animado y muy visual en pleno centro de la ciudad.\n\n💡 Consejo: llega con algo de antelación para coger buen sitio, especialmente en verano. El espectáculo comienza al anochecer y el horario cambia según la época del año.',
              foto: 'cld:europa/rumania/bucarest/fuentes-unirii',
              horario:
                'Vie–Dom al anochecer (horario variable según puesta de sol) | Duración: ~45 min',
              precio: 'Gratis'
            }
          ]
        },
        {
          dia: 'Día 2 – Centro histórico y cultura en Bucarest',
          zonas: [
            {
              nombre: 'Ateneo Rumano',
              descripcion:
                'Uno de los grandes símbolos de Bucarest y epicentro cultural del país. Construido a finales del siglo XIX, este edificio neoclásico alberga la Filarmónica George Enescu. Su interior circular, decorado con frescos que narran la historia de Rumanía, es tan impresionante como su fachada. Una visita imprescindible para entender la importancia cultural del país.',
              foto: 'cld:europa/rumania/bucarest/ateneo-rumano',
              horario: 'Mar–Vie: 14:00–16:00 (si no hay eventos) | Fines de semana por la mañana',
              precio: 'Entrada ≈ 6,50€ (sin concierto)'
            },
            {
              nombre: 'Biblioteca Central Universitaria',
              descripcion:
                'Elegante edificio académico situado frente al Palacio Real. Fue reconstruido tras sufrir daños durante la Revolución de 1989 y hoy representa el centro intelectual de Bucarest. Su fachada y entorno forman parte del conjunto monumental más importante de la ciudad.',
              foto: 'cld:europa/rumania/bucarest/biblioteca-central',
            },
            {
              nombre: 'Palacio Real y Museo Nacional de Arte',
              descripcion:
                'Antigua residencia de los reyes de Rumanía, hoy convertido en el principal museo de arte del país. En su interior alberga colecciones de arte europeo y rumano, incluyendo obras medievales y modernas. El edificio también fue testigo directo de la caída del régimen comunista en 1989.',
              foto: 'cld:europa/rumania/bucarest/palacio-real',
              horario: 'Mié–Vie: 10:00–18:00 | Sáb–Dom: 11:00–19:00 | Lun–Mar: cerrado',
              precio: '≈ 6,50€ adultos | Gratis el primer miércoles de cada mes'
            },
            {
              nombre: 'Plaza de la Revolución (Piața Revoluției)',
              descripcion:
                'Uno de los lugares más importantes de la historia reciente de Rumanía. Aquí se produjeron las protestas que acabaron con la dictadura de Nicolae Ceaușescu en 1989. En la plaza puedes ver el antiguo edificio del Comité Central desde donde dio su último discurso antes de huir.',
              foto: 'cld:europa/rumania/bucarest/plaza-revolucion',
            },
            {
              nombre: 'Pasajul Victoria',
              descripcion:
                'Pequeño pasaje urbano decorado con paraguas de colores suspendidos en el aire. Es uno de los rincones más fotogénicos de Bucarest y refleja el lado más moderno y creativo de la ciudad.',
              foto: 'cld:europa/rumania/bucarest/pasajul-victoria',
            },
            {
              nombre: 'Banco Nacional de Rumania',
              descripcion:
                'Institución clave en la historia económica del país. Su sede histórica, de estilo neoclásico, refleja el desarrollo financiero de Rumanía desde el siglo XIX. Se puede visitar mediante tour guiado, aunque su exterior ya impresiona por su arquitectura.',
              foto: 'cld:europa/rumania/bucarest/banco-nacional',
            },
            {
              nombre: 'Pasaje Macca-Vilacrosse (Bemolle Café)',
              descripcion:
                'Pasaje cubierto del siglo XIX con una característica cubierta de cristal amarillenta. Este lugar fue originalmente una zona comercial y hoy alberga cafeterías y bares. Ideal para hacer una pausa y disfrutar del ambiente en lugares como Bemolle Café.',
              foto: 'cld:europa/rumania/bucarest/macca-vilacrosse',
            },
            {
              nombre: 'Palacio CEC',
              descripcion:
                'Uno de los edificios más elegantes y fotogénicos de Bucarest. Construido a finales del siglo XIX, destaca por su espectacular cúpula de vidrio y metal, inspirada en la arquitectura francesa de la época. Aunque no se puede visitar por dentro al funcionar como banco (el más antiguo), su exterior es impresionante y una parada imprescindible para fotos.',
              foto: 'cld:europa/rumania/bucarest/palacio-cec',
              horario: 'Exterior visitable todo el día',
            },
            {
              nombre: 'Museo de Historia Nacional de Rumanía',
              descripcion:
                'Este museo justo enfrente del Palacio CEC recorre la historia de Rumanía desde la antigüedad hasta la época moderna. Destaca especialmente por albergar el Tesoro Nacional, con impresionantes piezas de oro, y por la reproducción a tamaño real de la base de la Columna de Trajano.\n\nEs una visita muy interesante para entender el pasado del país y se integra perfectamente en un recorrido por el centro histórico.',
              foto: 'cld:europa/rumania/bucarest/museo-historia-nacional',
              horario: 'Mié–Dom: 09:00–17:00 | Lun–Mar: cerrado',
              precio: '≈ 5€ adultos | Gratis el primer miércoles de cada mes'
            },
            {
              nombre: 'Monasterio Stavropoleos',
              descripcion:
                'Pequeña joya de la arquitectura ortodoxa del siglo XVIII. Destaca por sus detalles en piedra tallada y su tranquilo patio interior. Es uno de los lugares más especiales y con más encanto del casco antiguo.',
              foto: 'cld:europa/rumania/bucarest/stavropoleos',
            },
            {
              nombre: 'Librería Cărturești Carusel',
              descripcion:
                'Considerada una de las librerías más bonitas de Europa. Su interior blanco de varios pisos con balcones curvos crea un espacio único. Más que una librería, es una experiencia visual imprescindible en Bucarest.',
              foto: 'cld:europa/rumania/bucarest/carturesti-carusel',
            },
            {
              nombre: 'Hanul lui Manuc',
              descripcion:
                'Antigua posada del siglo XIX que servía como punto de encuentro para comerciantes. Hoy es un restaurante tradicional donde puedes tomar algo en un entorno histórico con patio interior.',
              fotos: ['cld:europa/rumania/bucarest/hanul-lui-manuc',
                'cld:europa/rumania/bucarest/hanul-lui-manuc-2'
              ],
              precio: 'Económico-moderado'
            },
            {
              nombre: 'Curtea Veche',
              descripcion:
                'Antigua corte principesca de Bucarest, asociada a Vlad Tepes (Drácula). Aunque hoy quedan solo ruinas, es uno de los lugares más históricos de la ciudad y muestra el origen medieval de la capital.',
              foto: 'cld:europa/rumania/bucarest/curtea-veche',
            },
            {
              nombre: 'Iglesia de San Antonio (St. Anthony’s Church)',
              descripcion:
                'La iglesia más antigua de Bucarest, construida en el siglo XVI. Está vinculada a la corte de Vlad Tepes y sigue siendo un importante lugar de culto y tradición local.',
              foto: 'cld:europa/rumania/bucarest/st-anthony',
            },
            {
              nombre: 'Cena en La Plăcinte (Mici)',
              descripcion:
                'Perfecto para cerrar el día probando comida tradicional rumana. Aquí puedes degustar los famosos mici, unas salchichas a la parrilla muy populares, acompañadas de mostaza y pan. Una opción auténtica, económica y muy local.',
              foto: 'cld:europa/rumania/bucarest/mici',
              horario: 'Noche',
              precio: 'Económico'
            }
          ]
        },
        {
          dia: 'Día 3 – Barrio judío, sinagogas y termas de Bucarest',
          zonas: [
            {
              nombre: 'Barrio judío y sinagogas de Bucarest',
              descripcion:
                'Recorre una de las zonas con más historia de la ciudad, donde se conserva el legado de la comunidad judía. Aquí se mezclan edificios históricos, sinagogas y un ambiente diferente al centro turístico.',
              horario: 'Mañana',
            },
            {
              nombre: 'Iglesia Rusa de Bucarest (Sfântul Nicolae)',
              descripcion:
                'Templo ortodoxo de influencia rusa construido a principios del siglo XX. Destaca por sus cúpulas doradas y su estilo arquitectónico diferente al resto de iglesias de Bucarest, simbolizando la conexión histórica y cultural entre Rumanía y el mundo eslavo.',
              foto: 'cld:europa/rumania/bucarest/iglesia-rusa',
              horario:
                'Mar–Sáb: 08:00–18:00 | Lun: 09:00–16:00 | Dom: 08:00–13:00',
              precio: 'Gratis'
            },
            {
              nombre: 'Templo Coral',
              descripcion:
                'La sinagoga más importante de Bucarest, construida en el siglo XIX e inspirada en la de Viena. Representa el centro espiritual de la comunidad judía de la ciudad y destaca por su interior elegante y su valor histórico.\n\nEs uno de los mejores lugares para entender la presencia judía en Bucarest.\n\n💡 Importante: el acceso incluye control de seguridad y puede requerir DNI o pasaporte. Se recomienda vestir con respeto (hombros y rodillas cubiertos).',
              foto: 'cld:europa/rumania/bucarest/templo-coral',
              horario:
                'Lun–Jue: 10:00–14:30 | Vie: 10:00–12:30 | Sáb–Dom: cerrado',
              precio:
                '≈ 6€ adultos | Estudiantes: 3–4€ (incluye breve visita guiada)'
            },
            {
              nombre: 'Templul Unirea Sfântă (Museo de Historia Judía)',
              descripcion:
                'Antiguo templo judío que hoy alberga el Museo de Historia de la Comunidad Judía de Rumanía. Es una visita muy interesante para conocer la evolución, tradiciones y legado de la comunidad judía en el país.\n\nEn su interior se exponen objetos rituales, documentos históricos y trajes tradicionales, ofreciendo una visión más completa que otras sinagogas de la ciudad.\n\n💡 Importante: puede haber control de seguridad en el acceso, por lo que se recomienda llevar DNI o pasaporte.\n\n💡 Consejo: es recomendable llegar al menos 45 minutos antes del cierre para poder ver bien toda la exposición.',
              foto: 'cld:europa/rumania/bucarest/templul-unirea-sfanta',
              horario:
                'Lun–Jue: 10:00–15:00 | Dom: 09:00–12:00 | Vie–Sáb: cerrado',
              precio:
                '≈ 3–4€ adultos | Estudiantes: ≈ 2€'
            },
            {
              nombre: 'Gran Sinagoga de Bucarest (Museo del Holocausto)',
              descripcion:
                'Uno de los edificios más importantes del legado judío en Bucarest. Actualmente funciona principalmente como Museo del Holocausto de Rumanía, ofreciendo una visita con gran carga histórica y emocional.\n\nEn su interior se pueden ver exposiciones sobre la comunidad judía y un memorial dedicado a las víctimas, además de admirar su arquitectura de estilo neomorisco.\n\n💡 Importante: es obligatorio presentar DNI o pasaporte para acceder y pasar el control de seguridad. No se permiten mochilas grandes.',
              foto: 'cld:europa/rumania/bucarest/gran-sinagoga',
              horario:
                'Lun–Jue: 09:00–14:00 | Vie: 09:00–12:00 | Sáb–Dom: cerrado',
              precio: '≈ 6€ adultos (30 RON)'
            },
            {
              nombre: 'Panadería Ana Pan – Cozonac',
              descripcion:
                'Una de las mejores opciones para probar el cozonac, el dulce tradicional rumano similar a un brioche relleno de cacao, nueces o crema. Ana Pan es una cadena muy popular en Bucarest, conocida por su calidad y por ofrecer productos recién hechos.\n\nPerfecto para hacer una pausa durante el recorrido y probar uno de los sabores más típicos del país.\n\n💡 Consejo: también puedes comprar porciones individuales si no quieres llevarte un cozonac entero.',
              foto: 'cld:europa/rumania/bucarest/cozonac',
              horario:
                'Ana Pan – Coposu (zona Unirii): Lun–Vie: 08:00–19:30 | Sáb: 09:00–15:00 | Dom: cerrado\n(Otros locales pueden tener horarios distintos)',
              precio: '≈ 12€ – 24€/kg (60–120 RON)'
            },
            {
              nombre: 'Termas de Bucarest (Therme București)',
              descripcion:
                'Uno de los complejos termales más grandes y modernos de Europa, ideal para relajarse tras varios días de turismo. Cuenta con diferentes zonas según el tipo de experiencia:\n\n• Galaxy: zona familiar con toboganes y piscina de olas.\n• The Palm: área de relax con palmeras (solo +14 años).\n• Elysium: zona premium con saunas temáticas y bienestar.\n\n💡 Consejo: si buscas relajarte, lo más recomendable es acceder a The Palm o Elysium.\n\n💡 Importante: al entrar te darán una pulsera inteligente para abrir tu taquilla y pagar consumiciones dentro del recinto.\n\n💡 Consejo viajero: es obligatorio llevar bañador, chanclas y toalla. Si no los llevas, tendrás que alquilarlos allí (toalla ~29 RON, albornoz ~37 RON), como nos pasó a nosotros 😅.\n\n📍 Ubicación: a las afueras de Bucarest, cerca del aeropuerto (20–30 min).\n\n🚗 Transporte:\n• Bus gratuito desde Piața Romană (cada ~2h, recomendable llegar con antelación).\n• Uber/Bolt: 14–20€ aprox. desde el centro.\n• Bus público 442 (opción más económica).\n\n💡 Consejo: es muy recomendable comprar la entrada online, especialmente fines de semana o días nublados.',
              foto: 'cld:europa/rumania/bucarest/termas-bucarest',
              horario:
                'Lun–Jue: 10:00–23:00 | Vie–Sáb: 09:00–00:00 | Dom: 09:00–23:00',
              precio:
                'Galaxy: 13–15€ (3h) | The Palm: 21–25€ (4,5h) | Elysium: desde 30€ aprox.'
            }
          ]
        },
        {
          dia: 'Día 4 – Excursión a Transilvania (castillos y Brasov)',
          zonas: [
            {
              nombre: 'Salida temprana desde Bucarest',
              descripcion:
                'Las excursiones a Transilvania son largas (unas 12 horas), por lo que es imprescindible salir temprano. Lo habitual es comenzar entre las 06:30 y 07:30 desde Bucarest.\n\n 💡 Consejo: duerme bien, lleva algo de desayuno o snacks y prepárate para un día intenso pero espectacular.',
              horario: '06:30 – 07:30',
              precio: 'Excursión completa ≈ 30–40€ por persona'
            },
            {
              nombre: 'Desayuno en Luca – Covrig',
              descripcion:
                'Antes de salir o para llevar, haz una parada rápida en Luca. Sus covrigi son el desayuno típico rumano: baratos, rápidos y perfectos para comer en ruta mientras sales de la ciudad.',
              foto: 'cld:europa/rumania/bucarest/luca-covrigi',
              horario: 'Antes de la salida',
              precio: 'Muy económico (0.40-1.90€)'
            },
            {
              nombre: 'Ruta hacia los Cárpatos',
              descripcion:
                'El trayecto hacia Transilvania atraviesa paisajes rurales y zonas de montaña. Son varias horas de carretera, pero el paisaje ya empieza a marcar el ambiente del viaje.',
              horario: 'Mañana',
              precio: 'Incluido en excursión'
            },
            {
              nombre: 'Palacio Pelișor',
              descripcion:
                'Primera parada del día. Este pequeño palacio real es más íntimo que Peleș pero muy elegante. Fue residencia de los reyes Fernando y María y destaca por su estilo art nouveau. Es una visita rápida que sirve como introducción perfecta al complejo real.',
              foto: 'cld:europa/rumania/bucarest/palacio-pelisor',
              horario: 'Media mañana',
              precio: 'Entrada aparte (≈ 6€)'
            },
            {
              nombre: 'Castillo de Peleș',
              descripcion:
                'A pocos metros se encuentra la joya del día: el Castillo de Peleș. Considerado uno de los castillos más bonitos de Europa, parece sacado de un cuento. Rodeado de naturaleza y con interiores espectaculares, fue la residencia de verano de la monarquía rumana.\n\n 💡 Consejo: si puedes entrar, hazlo.',
              foto: 'cld:europa/rumania/bucarest/castillo-peles',
              horario: 'Media mañana',
              precio: 'Entrada aparte (≈ 20€)'
            },
            {
              nombre: 'Academia Nevermore (Miércoles Addams)',
              descripcion:
                'De camino hacia Bran, pasarás por una localización asociada con la estética de la serie "Wednesday". Aunque no siempre es una visita oficial, es una parada curiosa para fotos y para los fans de la serie.',
              foto: 'cld:europa/rumania/bucarest/nevermore',
              horario: 'Parada breve',
              precio: 'Gratis exterior'
            },
            {
              nombre: 'Castillo de Bran (Drácula)',
              descripcion:
                'El castillo más famoso de Rumanía. Su relación con Drácula es más leyenda que realidad, pero su ubicación entre montañas y su estética medieval lo convierten en un imprescindible. \n\n 💡 Consejo: suele haber bastante gente, así que tómalo con calma.',
              foto: 'cld:europa/rumania/bucarest/castillo-bran',
              horario: 'Tarde',
              precio: 'Incluido en excursión'
            },
            {
              nombre: 'Brașov – casco histórico y comida',
              descripcion:
                'Última gran parada del día. Pasea por la Plaza del Consejo (Piața Sfatului), rodeada de edificios de colores, y visita la Iglesia Negra. Es el lugar perfecto para parar, descansar y comer algo. Aquí puedes probar cocina local o sitios como Twist. Ambiente tranquilo y muy europeo.',
              fotos: [
                'cld:europa/rumania/bucarest/brasov',
                'cld:europa/rumania/bucarest/brasov-plz-consejo',
                'cld:europa/rumania/bucarest/brasov-iglesia-negra-1',
                'cld:europa/rumania/bucarest/brasov-iglesia-negra-2',
              ],
              horario: 'Tarde',
              precio: 'Comida moderada'
            },
            {
              nombre: 'Regreso a Bucarest',
              descripcion:
                'Tras un día intenso recorriendo Transilvania, comienza el regreso a Bucarest. El trayecto suele ser largo y puede variar según el tráfico, especialmente a la entrada de la ciudad. Lo habitual es llegar entre las 20:00 y las 22:00, por lo que es buen momento para relajarse en el transporte y recargar energía para la noche.',
              horario: 'Noche',
              precio: 'Incluido en excursión'
            },
            {
              nombre: 'Cena en Caru’ cu Bere',
              descripcion:
                'Ya en Bucarest, la mejor forma de cerrar el día es cenar en Caru’ cu Bere, uno de los restaurantes más emblemáticos de la ciudad. Su interior histórico y su ambiente animado lo convierten en una experiencia en sí misma. Es el lugar perfecto para probar platos tradicionales como los sarmale acompañados de cerveza local.',
              horario: 'Noche',
              precio: 'Moderado'
            },
            {
              nombre: 'Paseo nocturno – Canal del Dâmbovița y la Loba Capitolina',
              descripcion:
                'Después de la cena, un paseo por el centro es el broche perfecto para el día. Muy cerca, el río Dâmbovița recorre la ciudad canalizado, fruto de las transformaciones urbanísticas impulsadas durante la etapa comunista por Nicolae Ceaușescu. Este tipo de proyectos buscaban modernizar Bucarest, aunque supusieron la desaparición de parte de su patrimonio histórico.\n\nHoy, el canal forma parte del paisaje urbano y ofrece un entorno agradable para caminar, especialmente por la noche, cuando la ciudad está iluminada y el ambiente es más tranquilo.\n\nA pocos minutos se encuentra la Loba Capitolina, símbolo del origen latino del pueblo rumano. La estatua representa a Rómulo y Remo siendo amamantados por la loba, un icono muy presente en la identidad cultural del país.\n\nUn plan ideal para terminar el día con calma, combinando historia, paseo y ambiente nocturno.',
              fotos: [
                'cld:europa/rumania/bucarest/canal-dambovita',
                'cld:europa/rumania/bucarest/loba-capitolina'
              ]
            }
          ]
        },
        {
          dia: 'Día 5 – Shopping, parques y barrio Primăverii',
          zonas: [
            {
              nombre: 'Shopping en Bucarest',
              descripcion:
                'Empieza el día con tiempo libre para compras, ya sea en centros comerciales, tiendas del centro o buscando recuerdos del viaje. Es un buen momento para pasear sin prisas y aprovechar las últimas horas en la ciudad.',
              horario: 'Mañana (horario comercial habitual: 10:00–21:00)',
            },
            {
              nombre: 'Arco del Triunfo',
              descripcion:
                'Uno de los monumentos más emblemáticos de Bucarest, construido para conmemorar la victoria de Rumanía en la Primera Guerra Mundial. Inspirado en los grandes arcos triunfales europeos, es un símbolo de la unidad nacional y una parada imprescindible en la zona norte de la ciudad.\n\n💡 Lo mejor de la visita es subir a la parte superior, desde donde se obtienen muy buenas vistas del Parque Herăstrău y de la Avenida Kiseleff.\n\n💡 Importante: el acceso al interior puede verse restringido por eventos oficiales, por lo que conviene confirmarlo antes de ir.',
              foto: 'cld:europa/rumania/bucarest/arco-triunfo',
              horario:
                'Mar–Dom: 09:00–17:00 | Lun: cerrado',
              precio:
                '≈ 4–5€ adultos | Estudiantes y alumnos: descuento | Exterior: gratis'
            },
            {
              nombre: 'Parque Rey Miguel I (Parcul Regele Mihai I)',
              descripcion:
                'El parque más grande y espectacular de Bucarest, situado alrededor del lago Herăstrău. Es el lugar perfecto para desconectar del ritmo de la ciudad, pasear entre naturaleza y disfrutar de una de las zonas más agradables de la capital.\n\n💡 Puedes recorrerlo caminando, alquilar una bicicleta o incluso dar un paseo en barco por el lago durante los meses de verano.\n\n🍴 Gastronomía: dentro del parque encontrarás muchas terrazas y restaurantes. Destaca Berăria H, la cervecería más grande del sureste de Europa, o el Hard Rock Cafe.\n\n💡 Recomendación: es una zona ideal para probar la varză călită (col frita), muy típica en la cocina rumana.',
              foto: 'cld:europa/rumania/bucarest/parque-rey-miguel',
              horario: 'Abierto 24h todos los días',
              precio:
                'Gratis | Barcas: ≈ 2–4€ | Bicicletas: alquiler por horas (≈ 2–5€)'
            },
            {
              nombre: 'Museo Satului (Museo Nacional de la Aldea “Dimitrie Gusti”)',
              descripcion:
                'Uno de los museos al aire libre más grandes y antiguos de Europa, situado dentro del Parque Rey Miguel I. Reúne más de 300 construcciones tradicionales (casas, iglesias de madera, molinos) traídas de todas las regiones de Rumanía entre los siglos XVII y XX.\n\nEs una visita imprescindible para entender la vida rural rumana y su evolución histórica, todo en un entorno natural muy agradable.\n\n💡 Consejo: dedica al menos 2–3 horas, ya que el recinto es bastante grande y merece la pena recorrerlo con calma.\n\n💡 Extra: los fines de semana suelen organizar ferias de artesanía y talleres donde puedes comprar productos tradicionales auténticos.',
              foto: 'cld:europa/rumania/bucarest/museo-satului',
              horario:
                'Todos los días: 09:00–17:00 | Verano: hasta 19:00\n(Último acceso a interiores: 30 min antes del cierre)',
              precio:
                '≈ 6€ adultos (30 RON) | Pensionistas: ≈ 3€ | Estudiantes: ≈ 1.5€\nAudioguía: +3–4€ opcional'
            },
            {
              nombre: 'Barrio Primăverii',
              descripcion:
                'El barrio más exclusivo y elegante de Bucarest, situado al norte de la ciudad. Conocido por su historia política, sus calles arboladas y sus villas de lujo, representa la cara más sofisticada y tranquila de la capital.\n\nPasear por Primăverii es una experiencia en sí misma: muchas de sus calles llevan nombres de capitales europeas y están rodeadas de embajadas y residencias históricas, creando un ambiente muy distinto al centro de la ciudad.\n\n💡 Qué ver: destaca la arquitectura de sus villas, antiguas residencias de la élite política, y el contraste entre tradición y modernidad.\n\n💡 Extra: en la zona se encuentra el Museo de Arte Reciente (MARe), con una interesante colección de arte contemporáneo rumano.\n\n💡 Consejo: es un barrio ideal para pasear sin prisas y parar en alguna cafetería o restaurante elegante.\n\n🍴 Recomendación gastronómica: buena zona para probar la tochitură, uno de los platos más típicos rumanos.',
              horario: 'Zona urbana visitable todo el día\nMARe: Mié–Lun 11:00–19:00 | Mar: cerrado',
              precio: 'Gratis (barrio) | MARe ≈ 5–7€'
            },
            {
              nombre: 'Mansión de Ceaușescu (Palacio Primăverii)',
              descripcion:
                'Residencia privada del dictador Nicolae Ceaușescu y su familia durante más de 25 años. Hoy convertida en museo, es una de las visitas más impactantes de Bucarest por el contraste entre el lujo extremo en el que vivía la élite comunista y la realidad del país en esa época.\n\nEn su interior se pueden recorrer más de 80 estancias, incluyendo un cine privado, una piscina interior con impresionantes mosaicos, un búnker y baños con grifos de oro. Los jardines también forman parte de la visita y cuentan incluso con pavos reales.\n\n💡 Importante: la visita solo se puede realizar mediante tour guiado.\n\n💡 Consejo: reserva con al menos 24–48h de antelación, ya que los grupos son reducidos y se suele llenar.',
              foto: 'cld:europa/rumania/bucarest/mansion-ceausescu',
              horario:
                'Mar–Dom: 10:00–17:00 | Lun: cerrado',
              precio:
                '≈ 12€ adultos (60 RON) | Estudiantes/Pensionistas: ≈ 8€\n(Tour en inglés puede ser ligeramente más caro)'
            },
            {
              nombre: 'Comida de despedida – City Grill (Barrio Primăverii)',
              descripcion:
                'Una forma perfecta de cerrar el viaje es con una comida o cena especial en el barrio Primăverii, una de las zonas más elegantes de Bucarest.\n\nEn el restaurante City Grill puedes probar platos típicos rumanos en un ambiente más cuidado y moderno. Durante la visita, destacan sabores tradicionales como la zacuscă (crema de verduras) y la ciorbă de văcuță, una sopa de ternera muy popular.\n\nEl broche final lo pone el postre: una pavlova preparada en directo en la mesa, tipo show cooking, que convierte la experiencia en algo diferente y memorable.',
              fotos: ['cld:europa/rumania/bucarest/zacusca-y-ciorba-vacuna',
                'cld:europa/rumania/bucarest/pavlova'
              ],
              horario:
                'Comida y cena (aprox. 12:00–23:00)',
              precio:
                '≈ 15–25€ por persona'
            }
          ]
        }
      ]
    },
    {
      titulo: 'Gastronomía',
      platos: [
        {
          nombre: 'Sarmale',
          descripcion:
            'Rollitos de col rellenos de carne y arroz, uno de los platos más emblemáticos de la cocina rumana.',
          foto: 'cld:europa/rumania/bucarest/sarmale',
          precio: 'Moderado'
        },
        {
          nombre: 'Mici',
          descripcion:
            'Pequeñas salchichas de carne especiada a la parrilla, uno de los grandes clásicos de la comida callejera rumana.',
          foto: 'cld:europa/rumania/bucarest/mici',
          precio: 'Económico'
        },
        {
          nombre: 'Covrigi',
          descripcion:
            'Rosquillas saladas muy populares en Rumanía, ideales para desayunar o tomar algo rápido durante el día.',
          foto: 'cld:europa/rumania/bucarest/luca-covrigi',
          precio: 'Muy económico (0.40–1.90€)'
        },
        {
          nombre: 'Covrig relleno (Twist)',
          descripcion:
            'El covrig es uno de los snacks más típicos de Rumanía, similar a un pretzel. Esta versión tipo “twist” es una variante moderna, con masa crujiente por fuera y rellena normalmente de queso. Muy popular como comida rápida en ciudades como Brașov.',
          foto: 'cld:europa/rumania/bucarest/twist',
          precio: 'Muy económico (1–3€)'
        },
        {
          nombre: 'Zacuscă',
          descripcion:
            'Pasta vegetal tradicional elaborada con pimientos, berenjenas y tomate, muy típica para untar en pan.',
          foto: 'cld:europa/rumania/bucarest/zacusca',
          precio: 'Económico'
        },
        {
          nombre: 'Ciorbă de fasole',
          descripcion:
            'Sopa de alubias muy típica y reconfortante, una de las preparaciones más populares de la cocina rumana.',
          foto: 'cld:europa/rumania/bucarest/ciorba-fasole',
          precio: 'Moderado'
        },
        {
          nombre: 'Varză călită',
          descripcion:
            'Col frita o rehogada, guarnición muy habitual en la gastronomía rumana.',
          foto: 'cld:europa/rumania/bucarest/varza-calita',
          precio: 'Económico'
        },
        {
          nombre: 'Plăcintă',
          descripcion:
            'Pastel o masa rellena, muy popular en la cocina rumana y moldava, con versiones dulces y saladas.',
          foto: 'cld:europa/rumania/bucarest/placinta',
          precio: 'Económico'
        },
        {
          nombre: 'Cozonac',
          descripcion:
            'Dulce tradicional rumano, especialmente típico en celebraciones, con masa esponjosa y rellenos variados.',
          foto: 'cld:europa/rumania/bucarest/cozonac',
          precio: 'Económico'
        },
        {
          nombre: 'Palinca',
          descripcion:
            'Aguardiente tradicional de frutas, muy presente en la gastronomía y cultura popular de Rumanía.',
          foto: 'cld:europa/rumania/bucarest/palinca',
          precio: 'Según local'
        },
        {
          nombre: 'Ensalada de berenjenas',
          descripcion:
            'Crema tradicional elaborada con berenjena asada, muy popular en mercados y restaurantes locales.',
          precio: 'Económico'
        },
        {
          nombre: 'Tochitură',
          descripcion:
            'Guiso tradicional rumano de carne, contundente y sabroso, muy representativo de la cocina local.',
          precio: 'Moderado'
        },
      ]
    },
    {
      titulo: 'Dónde comer en Bucarest',
      lugares: [
        {
          nombre: 'Caru’ cu Bere',
          descripcion:
            'Caru’ cu Bere es, probablemente, el restaurante más emblemático de Bucarest. Situado en pleno casco antiguo, en un espectacular edificio neogótico de 1879, no es solo un restaurante, es una experiencia completa que mezcla historia, gastronomía y cultura rumana.\n\nNada más entrar te envuelve su decoración: madera tallada, vitrales de colores y un ambiente que parece sacado de otra época.\n\n🍽️ Qué probar (imprescindible):\nLos sarmale, el plato más representativo de Rumanía. Se sirven de forma tradicional con mămăligă (polenta), panceta ahumada, crema agria (smântână) y un pimiento picante.\n\n💡 Experiencia TOP: es un plato contundente, sabroso y muy auténtico. Perfecto para entender la gastronomía rumana de verdad.\n\n🍰 Postre recomendado: los papanăși (donas rumanas con queso, nata y mermelada). De los mejores de la ciudad.\n\n🎭 Ambiente:\nPor la noche, el restaurante cobra vida con espectáculos de bailes folclóricos rumanos en directo, lo que convierte la cena en una experiencia cultural completa.\n\n💡 Consejo viajero:\n• Para ambiente tranquilo → ve a mediodía.\n• Para experiencia completa → cena con espectáculo.\n\n💡 IMPORTANTE: es uno de los sitios más demandados de Bucarest, por lo que es muy recomendable reservar con antelación.',
          horario:
            'Todos los días: 10:00–24:00\nEspectáculos: desde ~19:30–20:00',
          precio:
            '≈ 10–13€ (50–65 RON por los sarmale)\nPrecio general: moderado',
        },
        {
          nombre: 'Hanul lui Manuc',
          descripcion:
            'Hanul lui Manuc es la posada en funcionamiento más antigua de Bucarest (1808) y uno de los lugares más especiales para cenar en la ciudad. Situado en pleno casco antiguo, combina historia, arquitectura tradicional y gastronomía rumana en un mismo espacio.\n\n🏛️ Historia y ambiente:\nEl edificio es una auténtica joya arquitectónica, con un gran patio interior rodeado de balcones de madera tallada. Aquí se firmó el Tratado de Bucarest en 1812, lo que lo convierte en un lugar clave en la historia de la ciudad.\n\n🌙 Experiencia:\nCenar en su patio, especialmente por la noche, es una de las experiencias más auténticas de Bucarest. El ambiente, la iluminación y la música hacen que parezca un viaje al pasado.\n\n🎭 Por la noche:\nSuelen tener música en directo y bailes tradicionales rumanos, creando una atmósfera muy similar (pero más tranquila) que Caru’ cu Bere.\n\n🍽️ Qué pedir:\n• Platos tradicionales rumanos\n• Carnes a la brasa\n• Platos de caza (muy recomendados)\n\n💡 Consejo viajero:\nSi buscas una experiencia más tranquila y auténtica que Caru’ cu Bere, este es tu sitio.\n\n💡 Recomendación TOP:\nReserva mesa en el patio interior, especialmente en verano. Es donde está la magia.',
          horario:
            'Dom–Jue: 10:00–00:00\nVie–Sáb: 10:00–02:00',
          precio:
            '≈ 10–18€ por plato principal (50–90 RON)\nRango: medio-alto',
        },
        {
          nombre: 'LUCA',
          descripcion:
            'Las Simigeria LUCA son una auténtica institución en Bucarest. No son una panadería tradicional, sino puestos de street food especializados en covrigi, una especie de pretzel rumano que se sirve siempre caliente y recién hecho.\n\nEs uno de los desayunos y snacks más típicos del país, perfecto para comer algo rápido, barato y muy local mientras recorres la ciudad.\n\n🥨 Qué pedir:\n• Covrigi clásicos (cu susan o cu sare): los más tradicionales, con sésamo o sal.\n• Luca tradicional: relleno de jamón y queso o queso con aceitunas (muy top).\n• Covridog: versión tipo hot dog envuelto en masa de covrig.\n• Covripuici: relleno de pollo, queso y especias.\n• Opciones dulces: manzana, chocolate o cereza.\n\n💡 Experiencia real: siempre hay cola, pero avanza rapidísimo. La rotación es tan alta que te lo dan recién hecho, literalmente quemando 😅.\n\n💡 Consejo viajero: ideal para desayunar antes de empezar el día o para llevarte algo rápido si vas con prisa.\n\n💡 Tip local: acompáñalo con un café para tener el combo completo como un rumano más.',
          horario:
            'Lun–Vie: 06:00–21:00 | Fin de semana: 07:00–21:00',
          precio:
            'Muy económico: ≈ 0.50€ – 3€ (2–15 RON)',
        },
        {
          nombre: 'Ana Pan',
          descripcion:
            'Si Luca es el rey del street food rápido, Ana Pan es la reina de la repostería en Bucarest. Fundada en 1990, es una de las marcas más queridas por los locales para comprar productos horneados de alta calidad.\n\n🍰 Producto estrella:\nEl Cozonac, el pan dulce tradicional rumano (similar al panettone pero más denso y trenzado).\n\n💡 Qué probar:\n• Cozonac de nuez y cacao (el más típico)\n• Versiones con pasas o delicias turcas (rahat)\n\nLa masa es muy esponjosa, con mucho relleno y sabor intenso a mantequilla.\n\n🍩 Otros dulces recomendados:\n• Amandine (pastel de chocolate muy jugoso)\n• Pasca (típico en Pascua, con queso dulce)\n• Plăcinte dulces de manzana o queso\n\n📍 Dónde encontrarlo:\n• Zona Dorobanți (cerca de Primăverii)\n• Victoriei (cerca del Museo del Campesino)\n• Centro (Piața Romană)\n\n💡 Consejo viajero:\nSi quieres llevarte un souvenir gastronómico, el Cozonac es de lo mejor que puedes comprar. Aguanta bien varios días y es muy típico.',
          horario: '08:00 – 20:00 (aprox.) | Algunos locales hasta 21:00 | Fines de semana cierre algo más temprano',
          precio: 'Cozonac entero: 14–19€ (70–95 RON) | Porciones individuales disponibles'
        },
        {
          nombre: 'Barrio Primăverii',
          descripcion:
            'Si quieres probar la gastronomía rumana en un entorno más elegante y tranquilo, el barrio de Primăverii es uno de los mejores lugares de Bucarest.\n\nAquí la experiencia cambia respecto al centro: menos turismo, mejor producto y restaurantes frecuentados por locales.\n\n🍖 Plato imprescindible en esta zona:\nLa tochitură, uno de los platos más contundentes de la cocina rumana.\n\nSe trata de un guiso de carne de cerdo con salchichas, huevo frito y queso, servido sobre mămăligă (polenta). Es potente, sabroso y muy tradicional.\n\n\n📍 Mejores sitios para probarla:\n\n• Zexe Zahana ⭐ (experiencia premium)\nUno de los restaurantes más prestigiosos de Bucarest.\n\n💡 Concepto:\nReinterpretación de recetas tradicionales de la burguesía rumana en un entorno elegante.\n\n🍲 Imprescindible:\nLa ciorbă de fasole servida en pan (ciorbă în pâine), una de las experiencias más icónicas del país.\n\n💡 Su tochitură utiliza ingredientes de alta calidad con una presentación más cuidada.\n\n• City Grill Primăverii ⭐ (mejor calidad-precio)\nLa opción más equilibrada del barrio.\n\n💡 Experiencia personal:\nAquí probamos zacuscă, ciorbă de văcuță y una pavlova preparada en mesa.\n\nLa tochitură es abundante, fiel a la receta tradicional y perfecta si buscas algo auténtico sin pagar precios elevados.',          
          horario:
            'Zexe Zahana: Lun y Mié–Dom 12:00–00:00 | Mar 14:00–00:00\nCity Grill: 08:00–22:00 (hasta 23:00 fines de semana)',
          precio:
            'Tochitură: 11–17€ (55–85 RON)\nZexe: medio-alto | City Grill: 10–14€'
        },
        {
          nombre: 'La Plăcinte',
          descripcion:
            'La Plăcinte es una de las cadenas más queridas de Bucarest y una parada imprescindible si quieres probar comida tradicional con sabor casero.\n\nOriginaria de Moldavia, este restaurante ofrece una experiencia auténtica, sencilla y muy reconfortante, con recetas que recuerdan a la cocina de la abuela.\n\n🥟 Especialidad imprescindible:\nLas plăcinte, unos pasteles de masa fina rellenos.\n\n📍 Qué probar:\n• Queso con eneldo (la más típica)\n• Patata, carne o calabaza\n• Dulces de cereza o manzana\n\n🍲 Otros platos:\n• Zeamă (sopa moldava)\n• Mămăligă con queso\n• Postre Guguriță\n\n💡 Consejo: acompáñalo con limonada casera o té de frutas del bosque.',
          horario: 'Todos los días: 10:00 – 22:00 (aprox.)',
          precio: 'Plăcinte: 5–7€ | Comida completa: 10–14€'
        },
        {
          nombre: 'Ciorbărie',
          descripcion:
            'Si quieres probar la cocina rumana más auténtica y reconfortante, Ciorbărie es una parada obligatoria. Esta cadena local está especializada en ciorbă, las sopas tradicionales rumanas, conocidas por su sabor intenso y su toque ligeramente ácido.\n\nEl concepto es tipo fast-casual, pero con comida casera de verdad. Cada día ofrecen entre 8 y 10 sopas diferentes, lo que lo convierte en un sitio perfecto para repetir o probar distintos sabores.\n\n🍲 Experiencia TOP: el goulash aquí se sirve al estilo rumano, como una ciorbă de ternera espesa, con patatas, pimentón y comino. Es contundente, sabroso y perfecto para reponer energía después de un día de turismo.\n\n💡 Cómo se come: acompaña la sopa con smântână (crema agria) y un ardei iute (guindilla picante). Es la forma más auténtica de disfrutarla.\n\n💡 Detalle local: normalmente te incluyen pan rústico gratis, ideal para mojar.\n\n💡 Consejo viajero: el menú cambia cada día, así que puedes consultar sus redes sociales por la mañana para ver qué sopas hay disponibles.\n\nEs una opción perfecta para comer rápido, barato y muy local, lejos de los restaurantes más turísticos.',
          horario:
            'Lun–Vie: 11:00–20:00 (o hasta agotar existencias)\nFines de semana: horario reducido según local',
          precio:
            'Muy económico: ≈ 4–5€ (18–25 RON por ración)',
        },
        {
          nombre: 'Parque Rey Miguel I',
          descripcion:
            'Si estás paseando por el Parque Rey Miguel I (Herăstrău), este es uno de los mejores lugares de Bucarest para hacer una parada gastronómica con vistas al lago.\n\nAquí puedes probar la varză călită, un plato tradicional rumano de col/repollo cocinado lentamente, muy sabroso y reconfortante.\n\n🍽️ Mejores opciones dentro del parque:\n\n1️⃣ Restaurante Pescăruș\nUn clásico de Bucarest fundado en 1938, con una terraza espectacular junto al lago.\n\n💡 Qué pedir:\nVarză călită acompañada de pato (rață pe varză) o costillas.\n\n💡 Experiencia:\nAmbiente elegante pero relajado, ideal para comer tranquilo con vistas.\n\n\n2️⃣ Berăria H\nLa cervecería más grande del sureste de Europa, con un ambiente totalmente distinto.\n\n💡 Qué pedir:\nVarză călită con salchichas o costillas, acompañado de cerveza.\n\n💡 Experiencia:\nAmbiente muy animado, música en directo y rollo festivo.\n\n\n💡 Consejo viajero:\n• Si buscas algo tranquilo → Pescăruș\n• Si quieres ambiente y fiesta → Berăria H\n\nEs una parada perfecta para combinar con el paseo por el parque o después de visitar el Museo Satului.',
          horario:
            'Pescăruș: 09:00–23:00 (Vie–Sáb hasta 00:00)\nBerăria H: desde 12:00 hasta 01:00 (hasta 03:00 fines de semana)',
          precio:
            '≈ 9–12€ (45–60 RON por plato)',
        },
        {
          nombre: 'Mercado de Obor - Terasa Obor',
          descripcion:
            'El Mercado de Obor es el mercado más grande y tradicional de Bucarest y uno de los mejores lugares para vivir la esencia local.\n\nAquí se mezcla todo: puestos de agricultores, productos tradicionales, comida callejera y un ambiente muy auténtico.\n\nPero si hay algo que hace famoso a este lugar, es su zona exterior de parrillas, donde se encuentra Terasa Obor.\n\n\n🔥 Experiencia imprescindible:\nComer mici en Terasa Obor\n\nEs probablemente el sitio más icónico de Bucarest para probar estos famosos rollitos de carne a la parrilla.\n\nEs rápido, caótico y 100% local.\n\n\n🍖 Qué pedir:\n• Mici (3–5 por persona)\n• Mostaza (incluida)\n• Pan\n\n💡 Recomendación TOP:\nNo te vayas sin probar la ensalada de berenjenas (salată de vinete), uno de los sabores más típicos de Rumanía.\n\n💡 Consejos viajeros:\n\n• Mejor ir al mediodía\n• Fines de semana → cola de 15–20 min (avanza rápido)\n• Lleva efectivo para el mercado (aunque Terasa acepta tarjeta)\n\n\n💡 Extra:\nAprovecha para comprar productos locales: quesos, miel, embutidos o fruta a muy buen precio.\n\nEs uno de los lugares más auténticos de toda la ciudad.',         
          horario:
            'Mercado: Lun–Vie 07:00–19:00 | Sáb 07:00–18:00 | Dom 07:00–16:00\nTerasa Obor: Lun–Vie 09:00–18:00 | Sáb–Dom 09:00–17:00',
          precio:
            'Entrada gratuita | Mici: 1€ aprox. (5–6 RON/unidad) | Muy económico'
        },
        {
          nombre: 'Mercado Amzei y feria del Museo del Campesino Rumano',
          descripcion:
            'Si quieres probar zacuscă auténtica en Bucarest, esta es una de las mejores zonas. Muy cerca del Museo del Campesino Rumano tienes varias opciones para encontrar productos tradicionales, especialmente esta famosa pasta vegetal rumana.\n\nLa opción más cómoda es el Mercado Amzei, un mercado céntrico con productos de muy buena calidad. Aquí encontrarás puestos con frutas, verduras, quesos locales y frascos de zacuscă artesanal.\n\n💡 Experiencia TOP: si tu visita coincide en fin de semana, el mejor plan es la feria que se monta en el patio del Museo del Campesino. Productores de todo el país vienen a vender productos caseros, incluyendo diferentes tipos de zacuscă.\n\n💡 Extra: dentro del propio museo suele haber una pequeña tienda con productos tradicionales (miel, mermeladas y zacuscă de calidad).\n\n💡 Recomendación: prueba la zacuscă de vinete (berenjena), la más clásica, o la de ghebe (setas), que es más especial y menos común.\n\n💡 Consejo viajero: si vas entre semana o el museo está cerrado, el Mercado Amzei es la mejor alternativa cercana. Si quieres más variedad todavía, el Mercado de Obor sigue siendo la opción más completa.',
          horario:
            'Mercado Amzei:\nLun–Vie: 06:00–21:00 | Sáb: 06:00–19:00 | Dom: 06:00–15:00\n\nFeria del museo (fin de semana):\nVie–Dom: 10:00–18:00\n\nTienda del museo:\nMar–Dom: 10:00–18:00',
          precio:
            'Acceso gratuito | Productos económicos–moderados'
        },
        
      ]
    },
    {
      titulo: 'Consejos prácticos',
      contenido:
        'Bucarest combina monumentos dispersos con zonas muy caminables, por lo que conviene organizar bien cada jornada. El centro histórico se puede recorrer a pie, pero para distancias más largas resulta útil combinar metro, taxi o apps de transporte. La gastronomía local merece mucho la pena y es recomendable reservar en algunos restaurantes muy demandados.'
    }
  ]
};