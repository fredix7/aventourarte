export const ROMA_VATICANO_GUIDE = {
  path: 'europa/italia/roma-vaticano',
  nombre: 'Roma y Ciudad del Vaticano',
  flag: 'cld:europa/italia/roma/roma-flag',
  flag2: 'cld:europa/italia/roma/vaticano-flag',
  background: 'cld:europa/italia/italia-bg',

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
  'Roma no es solo una ciudad, es un viaje continuo a través del tiempo. Aquí no visitas monumentos, caminas literalmente sobre más de 2.000 años de historia.\n\nCada calle, cada plaza y cada rincón conecta con una civilización que marcó el mundo: el Imperio romano. Pero Roma no se quedó ahí. A esa base se le superpone la Roma papal, el arte del Renacimiento, la explosión barroca y la vida italiana actual.\n\nEl resultado es una ciudad caótica, monumental, elegante y profundamente viva.\n\nPuedes estar viendo una ruina del siglo I, girar la esquina y encontrarte una iglesia barroca espectacular, y terminar el día cenando en un barrio lleno de ambiente como Trastevere.\n\nEl Vaticano añade otra dimensión completamente distinta: espiritual, artística y monumental. Aquí se concentran algunas de las obras más importantes de la historia del arte y uno de los centros religiosos más influyentes del mundo.\n\nRoma no se visita… se siente. Y cuanto más caminas, más te atrapa.',

  infoGeneral: {
    idioma: 'Italiano',
    moneda: 'Euro (€)',
    hora: 'UTC +1 en invierno y UTC +2 en verano (igual que España peninsular)',
    internet: 'Italia: roaming UE según tu tarifa. En territorio vaticano, comprueba la red y las condiciones de tu operador antes de usar datos.',
    electricidad: '230V – Enchufe tipo C, F y L',
    pasaporte: 'Ciudadanos españoles y de la UE: DNI o pasaporte válido para viajar a Italia. Otras nacionalidades: consulta los requisitos correspondientes.',
    visado: 'No necesario para ciudadanos UE',
    vacunas: 'No obligatorias'
  },

  secciones: [
    {
      titulo: 'Historia',
      contenido:
        'La historia de Roma es, en gran parte, la historia de Europa.\n\nSegún la leyenda, fue fundada en el 753 a.C. por Rómulo y Remo. Con el paso de los siglos, pasó de ser una pequeña ciudad a convertirse en el centro del Imperio romano, una de las civilizaciones más poderosas que han existido.\n\nDesde aquí se gobernaba un territorio que abarcaba desde Hispania hasta Oriente Medio. El Foro Romano, el Coliseo o el Palatino no son solo ruinas: eran el corazón político, social y económico del mundo antiguo.\n\nTras la caída del Imperio, Roma no desaparece. Se transforma.\n\nSe convierte en el centro del cristianismo y sede del Papado, dando lugar a la Roma medieval y posteriormente a la Roma renacentista y barroca, donde artistas como Miguel Ángel, Bernini o Rafael dejaron algunas de las obras más importantes de la historia.\n\nEl Vaticano nace como estado independiente en 1929, consolidando su papel como centro espiritual del mundo católico.\n\nHoy, Roma es una mezcla única de todas esas épocas. Aquí no hay una sola ciudad, hay muchas superpuestas. Y eso es precisamente lo que la hace tan especial.'
    },
    {
      titulo: 'Geografía y Clima',
      contenido:
        'Roma se encuentra en el centro de Italia, atravesada por el río Tíber y construida sobre sus famosas siete colinas históricas.\n\nLa ciudad combina dos caras muy marcadas: un centro histórico denso, monumental y perfectamente caminable, y una Roma más amplia y moderna que se extiende en todas direcciones.\n\nMoverse a pie es la mejor forma de descubrirla, porque muchas de sus mejores sorpresas no están en los mapas, sino entre callejones, plazas escondidas y pequeñas iglesias.\n\nEl clima es típicamente mediterráneo:\n\n• Veranos: calurosos y secos (especialmente julio y agosto)\n• Invierno: suave, aunque con algo de lluvia\n• Primavera y otoño: las mejores épocas para viajar, con temperaturas agradables y menos aglomeraciones\n\n💡 Consejo viajero:\nRoma exige caminar bastante, así que es clave organizar el itinerario por zonas y combinar visitas culturales con paradas para comer o descansar.\n\nEs una ciudad intensa, pero si sabes dosificarla, la disfrutas muchísimo más.'
    },
    {
      titulo: 'Qué visitar en Roma y el Vaticano',
      itinerario: [
        {
          dia: 'Día 1 – Centro histórico, Roma clásica y Coliseo: interior de día y exterior iluminado de noche',
          zonas: [
            {
              nombre: 'Fontana di Trevi',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'La Fontana di Trevi es uno de los lugares más icónicos para comenzar un primer día en Roma y una de las grandes obras maestras del Barroco italiano. Más que una fuente, es un auténtico escenario monumental donde arquitectura, escultura y agua se combinan de forma espectacular.\n\nFue diseñada en el siglo XVIII y marca el punto final del antiguo acueducto Aqua Virgo, construido en el año 19 a.C., conectando directamente este lugar con la Roma imperial. En el centro aparece Océano dominando la composición sobre un carro tirado por caballos marinos, simbolizando el poder y la fuerza del océano.\n\nLlegar aquí impresiona incluso aunque la hayas visto mil veces en fotos. La plaza se abre de repente y la fuente aparece enorme, luminosa y llena de detalles. De noche, con la iluminación y el sonido del agua, la experiencia cambia por completo y se vuelve todavía más especial.\n\n💰 Tradición viajera:\nLanzar una moneda significa volver a Roma, dos monedas traen amor y tres matrimonio. Cada día se recogen miles de euros que se destinan a causas sociales.\n\n💡 Consejo AvenTourArte:\nSi puedes, visítala dos veces: una de día para apreciar todos los detalles y otra de noche para vivir la atmósfera completa. Son dos momentos totalmente distintos.\n\n⚠️ Importante:\nDesde febrero de 2026 el acceso a la zona más cercana a la fuente está regulado para controlar el aforo.',
              foto: 'cld:europa/italia/roma/fontana-trevi',
              horario:
                'Zona regulada: lunes y viernes 11:30–22:00; resto de días 09:00–22:00. Último acceso 21:00. Mantenimiento y eventos pueden cambiar la apertura: consulta los avisos oficiales. Fuera del horario de visita la fuente sigue visible gratuitamente.',
              precio:
                'Zona baja: 2€. Plaza superior: gratis. Zona regulada gratuita para residentes en Roma y su área metropolitana con documento; menores de 6 años; personas con discapacidad y acompañante, y otras categorías oficiales. Consulta la documentación exigida.',
              web: 'https://www.fontanaditrevi.roma.it/',
              reserva: 'https://fontanaditrevi.vivaticket.it/',
              tipoReserva: 'entradas',
              acceso: 'Taquilla y entrada por Via della Stamperia; salida por Via dei Crociferi. Billete open, sin turno reservado. Compra online o en puntos autorizados; en el acceso solo se paga con tarjeta. Hay escalones para bajar al perímetro interior.'
            },
            {
              nombre: 'Panteón de Agripa',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Desde la Fontana di Trevi, lo mejor es dejarte llevar por las calles del centro histórico en dirección al Panteón. Ese paseo ya forma parte de la experiencia: callejuelas estrechas, plazas escondidas y ese ambiente tan característico de Roma que mezcla historia y vida diaria.\n\nDe repente, entre edificios aparentemente normales, aparece el Panteón. Y es uno de esos momentos en los que Roma golpea fuerte.\n\nConstruido originalmente por Agripa en el 27 a.C. y reconstruido por el emperador Adriano, es el edificio mejor conservado de toda la Antigua Roma. Lo que ves hoy es prácticamente el mismo espacio que hace casi 2.000 años.\n\nAl entrar, todo cambia. El ruido desaparece y te envuelve una sensación de equilibrio y grandeza difícil de explicar. La cúpula, perfectamente proporcionada, y el óculo central de 9 metros convierten el espacio en una obra de ingeniería adelantada a su tiempo.\n\n☀️ Momento clave del itinerario:\nLa luz que entra por el óculo cambia con la fecha, la hora y el tiempo. Si coincide con tu visita, el haz puede iluminar el interior como un foco natural.\n\n💡 Detalles que marcan la diferencia:\n• En días de lluvia, el agua cae dentro del templo y desaparece por los drenajes del suelo\n• Aquí está enterrado Rafael, uno de los grandes artistas del Renacimiento\n• El edificio funciona como una iglesia activa, lo que le da un ambiente aún más especial\n\n✨ Consejo AvenTourArte:\nColócate justo debajo del óculo y mira hacia arriba unos segundos. Es uno de esos momentos que no se olvidan.',
              foto: 'cld:europa/italia/roma/panteon',
              horario:
                'Visita turística: 09:00–19:00; último acceso individual 18:30, taquilla hasta 18:00 y grupos hasta 18:00. Cerrado 1 de enero y 25 de diciembre. Culto: sábado 17:00; domingo/festivos 10:30. Las visitas se suspenden durante las celebraciones.',
              precio:
                'General: 7€. Reducida UE de 18 años hasta cumplir 25: 2€. Menores de 18 y otras categorías oficiales: gratis. Primer domingo del mes: acceso gratuito sin reserva online.',
              direccion: 'Panteón — Piazza della Rotonda, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Pante%C3%B3n%20%E2%80%94%20Piazza%20della%20Rotonda%2C%20Roma',
              web: 'https://direzionemuseiroma.cultura.gov.it/pantheon/',
              telefono: '+39 06 68300230',
              acceso: 'Billete nominativo y documento. Compra oficial en Musei Italiani o en las cajas y tótems del monumento; comprueba el canal desde la web oficial. Acceso adaptado por Via della Minerva. La asistencia al culto se rige por sus propias condiciones.'
            },
            {
              nombre: 'Piazza Navona',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              foto: 'cld:europa/italia/roma/piazza-navona',
              descripcion:
                'Tras la calma y la perfección del Panteón, el paseo continúa por pequeñas calles hasta desembocar en uno de los espacios más vibrantes de Roma: la Piazza Navona.\n\nEl cambio es inmediato. Pasas de un lugar silencioso y casi espiritual a una plaza llena de vida, artistas callejeros, música y movimiento.\n\nPero más allá de su ambiente, Navona es pura historia. Bajo tus pies se encuentra el antiguo estadio de Domiciano, construido en el siglo I, cuya forma alargada sigue definiendo la plaza actual.\n\nEn el centro destaca la Fontana dei Quattro Fiumi, una de las grandes obras de Bernini, representando los ríos del mundo conocido: el Nilo, el Ganges, el Danubio y el Río de la Plata.\n\nJusto enfrente, la iglesia de Sant’Agnese in Agone, iniciada por los arquitectos Rainaldi y transformada por Borromini, crea un contraste fascinante con la Fontana dei Quattro Fiumi de Bernini.\n\nNavona es uno de esos lugares donde apetece parar sin mirar el reloj. Por la mañana, la luz resalta cada detalle arquitectónico y permite disfrutarla con calma. Al atardecer y por la noche, la plaza se transforma y se llena de artistas, pintores y un ambiente muy auténtico.\n\nAunque la plaza es gratuita, conviene evitar las terrazas del centro si no quieres pagar precios elevados; basta con alejarse un par de calles para encontrar opciones mucho mejores.',
              horario:
                'Plaza: abierta 24h. La iglesia y los museos tienen horarios y entradas propios: consulta cada punto incluido.',
              precio:
                'Plaza: gratis. Sant’Agnese: visita ordinaria gratuita, donativo voluntario. Estadio de Domiciano y Museo de Roma: tarifas independientes según recorrido o exposición.',
              direccion: 'Piazza Navona, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Piazza%20Navona%2C%20Roma',
              acceso: 'El acceso a la plaza no incluye los interiores. El estadio y Palazzo Braschi requieren su propio billete.',
              puntosPracticos: [
                {
                  nombre: 'Sant’Agnese in Agone',
                  direccion: 'Sant’Agnese in Agone — entrada por Piazza Navona, Roma',
                  maps: 'https://www.google.com/maps/search/?api=1&query=Sant%E2%80%99Agnese%20in%20Agone%20%E2%80%94%20entrada%20por%20Piazza%20Navona%2C%20Roma',
                  web: 'https://www.santagneseinagone.org/orari-dapertura-e-recapiti/',
                  telefono: '+39 06 68192134',
                  horario: 'Lunes cerrado. Martes–viernes 09:00–13:00 y 15:00–19:00; sábado y domingo 09:00–13:00 y 15:00–20:00. Respeta las celebraciones.'
                },
                {
                  nombre: 'Estadio de Domiciano',
                  web: 'https://www.sovraintendenzaroma.it/node/13883',
                  acceso: 'Consulta las condiciones de visita del estadio, su entrada y la tarifa; no es una entrada a la plaza.'
                },
                {
                  nombre: 'Museo de Roma — Palazzo Braschi',
                  web: 'https://museodiroma.it/it/informazioni_pratiche/biglietti_e_audioguide',
                  telefono: '+39 060608',
                  acceso: 'Museo, exposiciones y billetes combinados tienen condiciones distintas. Confirma el acceso indicado para tu producto: Piazza San Pantaleo 10 o Piazza Navona 2.'
                }
              ]
            },
            {
              nombre: 'Campo de’ Fiori',
              tiposPlan: ['ruta', 'urbano', 'gratuito'],
              descripcion:
                'Después de la elegancia barroca de Piazza Navona, el recorrido continúa hacia Campo de’ Fiori, donde Roma cambia de registro y se vuelve más cotidiana, más auténtica y también más cruda.\n\nEn apenas unos minutos a pie pasas de fuentes monumentales y artistas callejeros a una plaza abierta con mucha más vida local. Campo de’ Fiori significa literalmente “campo de flores”, porque en la Edad Media esta zona era un prado. Con el tiempo se transformó en uno de los mercados más importantes de la ciudad.\n\n💡 Lo más interesante de esta plaza es su doble personalidad.\n\n🌞 Por la mañana se llena de puestos de fruta, verduras, especias, flores, aceites, pastas y productos locales. Aunque hoy tiene bastante presencia turística, sigue siendo un lugar muy bueno para ver el ritmo cotidiano de Roma.\n\n⚔️ En el centro se alza la estatua de Giordano Bruno, filósofo quemado vivo por la Inquisición en 1600 exactamente en este mismo lugar. Eso le da a la plaza un carácter distinto al de otras plazas romanas: menos monumental, más rebelde y más austero.\n\n🌆 Cuando el mercado recoge y la plaza se despeja, Campo de’ Fiori cambia por completo. A partir de la tarde se convierte en un punto clásico para el aperitivo, cenar o tomar algo al aire libre.\n\n🥖 Parada imprescindible:\nForno Campo de’ Fiori, una de las panaderías más famosas de Roma.\n\n💡 Qué probar:\nLa pizza bianca recién hecha, simple pero espectacular, perfecta para seguir la ruta sin perder tiempo.\n\n✨ Consejo AvenTourArte:\nSi quieres sentir la plaza de verdad, ve por la mañana para verla con mercado y, si puedes, vuelve de noche para notar el cambio de ambiente. Son dos lugares completamente distintos en el mismo espacio.',
              foto: 'cld:europa/italia/roma/campo-de-fiori',
              horario:
                'Plaza: acceso libre. Para ver el mercado, confirma los días y horas de los puestos; el Forno tiene su propio horario.',
              precio:
                'Plaza y mercado: gratis\nForno Campo de’ Fiori: precio económico-moderado',
              direccion: 'Campo de’ Fiori, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Campo%20de%E2%80%99%20Fiori%2C%20Roma',
              web: 'https://www.turismoroma.it/it/luoghi/mercato-rionale-regola-i-campo-de-fiori',
              acceso: 'El paseo por la plaza es gratuito; las compras y consumiciones en el mercado o el horno se pagan aparte.'
            },
            {
              nombre: 'Largo di Torre Argentina',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Después del ambiente local y cotidiano de Campo de’ Fiori, el recorrido continúa hacia uno de los lugares más sorprendentes de Roma: Largo di Torre Argentina.\n\nA simple vista parece solo una plaza con ruinas, pero estás en uno de los puntos más importantes de la historia de la humanidad.\n\nAquí, en el año 44 a.C., fue asesinado Julio César.\n\n💡 Contexto histórico:\nEl magnicidio tuvo lugar en la Curia de Pompeyo, cuyos restos se encuentran dentro de este complejo arqueológico. Este hecho aceleró la crisis final de la República romana, que culminaría con el ascenso de Augusto y el establecimiento del Principado en el 27 a.C.\n\n🏛️ Qué ver:\nEn la plaza encontrarás cuatro templos republicanos (siglos IV–II a.C.), identificados como A, B, C y D. Son algunas de las estructuras más antiguas que se conservan en Roma.\n\n🚶 Experiencia actual:\nDurante años solo se podía ver desde arriba, pero ahora puedes bajar al nivel de las ruinas gracias a una pasarela que permite recorrer el yacimiento desde dentro.\n\n🐱 Curiosidad única:\nEste lugar también es famoso por su santuario de gatos. Decenas de gatos viven entre las ruinas, cuidados por voluntarios. Es uno de los rincones más curiosos y entrañables de la ciudad.\n\n💡 Experiencia viajera:\nEl contraste es brutal: estás en el centro de una ciudad caótica, rodeado de tráfico, y de repente miras abajo y ves más de 2.000 años de historia.\n\n💡 Consejo viajero:\nSi vas justo de tiempo, no es imprescindible bajar. Desde arriba se aprecia muy bien todo el conjunto.\n\n✨ Consejo AvenTourArte:\nEste es uno de esos lugares donde Roma te golpea con su historia sin avisar. Dedica unos minutos a entender lo que pasó aquí.',
              foto: 'cld:europa/italia/roma/torre-argentina',
              horario:
                'Martes–domingo 09:30–16:00 con horario de invierno; hasta 19:00 con horario de verano. Último acceso 15 minutos antes. Lunes, 1 de mayo y 25 de diciembre cerrado. 24 y 31 de diciembre hasta 14:00. Consulta avisos. El santuario felino tiene gestión y horario propios.',
              precio:
                'Recorrido con exposición: 9€ general / 6€ reducida. Combinado con realidad virtual: 14€ general. Preventa: 1€. Gratuidades y reducciones según categorías municipales, no para todos los menores de 18. Vista desde la calle: gratis.',
              direccion: 'Área Sacra di Largo Argentina — entrada por Via di San Nicola de’ Cesarini, frente al 10, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=%C3%81rea%20Sacra%20di%20Largo%20Argentina%20%E2%80%94%20entrada%20por%20Via%20di%20San%20Nicola%20de%E2%80%99%20Cesarini%2C%20frente%20al%2010%2C%20Roma',
              web: 'https://sovraintendenzaroma.it/node/118247',
              telefono: '+39 060608',
              acceso: 'Entrada al recorrido por Via di San Nicola de’ Cesarini, frente al 10; taquilla en Torre del Papito, Piazza dei Calcarari. El recorrido arqueológico no equivale a una visita al santuario de gatos.'
            },
            {
              nombre: 'Pausa gastronómica – Pizza rossa romana',
              tiposPlan: ['ruta', 'urbano', 'de-pago'],
              descripcion:
                'Tras el paseo por Largo di Torre Argentina, esta es una pausa opcional para probar pizza rossa en algún horno o establecimiento de la zona.\n\n🍕 La pizza rossa:\nUna preparación con tomate para un bocado rápido. La masa, los ingredientes y el tamaño de las porciones pueden variar: consulta la oferta del horno que elijas.\n\n💡 Experiencia viajera:\nEs el típico bocado romano que no sale en las guías, pero que forma parte del día a día local.\n\n💡 Consejo PRO:\nPídela caliente si no está recién hecha. Cambia totalmente la experiencia.\n\n💡 Tip AvenTourArte:\nCómela caminando, sin prisas pero sin parar demasiado. Es justo ese tipo de parada que encaja perfecto entre visitas.',
              foto: 'cld:europa/italia/roma/pizza-rossa',
              horario:
                'Pausa opcional: el horario depende del horno o establecimiento que elijas en la zona.',
              precio:
                'Presupuesto orientativo: 3€ – 5€ aprox. por porción (según peso)\nConfirma precios y servicios incluidos con el establecimiento.',
              acceso: 'Elige un horno o establecimiento de la zona y comprueba su oferta y precios antes de pedir.'
            },
            {
              nombre: 'Su Ghetto Kosher Restaurant (Alternativa)',
              tiposPlan: ['ruta', 'urbano', 'de-pago'],
              descripcion:
                '💡 Alternativa para una comida sentada:\n\nSi en lugar de un snack rápido prefieres sentarte a comer con calma, a pocos pasos del Largo di Torre Argentina puedes adentrarte en el Barrio Judío de Roma y descubrir Su Ghetto Kosher Restaurant.\n\nEste restaurante es una de las mejores puertas de entrada a la cocina judeo-romana, una tradición gastronómica única nacida dentro del antiguo gueto.\n\n🏛️ Contexto:\nEl Barrio Judío es una de las zonas más históricas de Roma, donde durante siglos se desarrolló una cocina propia basada en ingredientes sencillos pero técnicas muy características.\n\n🍽️ Platos imprescindibles:\n• Carciofi alla Giudia ⭐ → alcachofas fritas enteras, crujientes como una flor (de lo mejor de Roma)\n• Baccalà fritto → bacalao rebozado muy típico\n• Pastas kosher → versiones de la cocina romana adaptadas a sus normas\n\n💡 Experiencia viajera:\nAquí el ritmo cambia. Pasas del bullicio del centro a una zona más tranquila, con un ambiente muy auténtico.\n\n💡 Consejo PRO:\nSi puedes, siéntate en la terraza con vistas al Pórtico de Octavia. Es una experiencia top.\n\n✨ Consejo AvenTourArte:\nElige según tu ritmo:\n• Poco tiempo → pausa rápida con pizza rossa\n• Experiencia gastronómica → Su Ghetto (más completo)',
              horario:
                'Consulta directamente con Su Ghetto sus horarios y condiciones durante Shabbat y festividades judías.',
              precio:
                'Presupuesto orientativo: 6€ – 25€ por plato\nConfirma precios y servicios incluidos con el establecimiento.',
              direccion: 'Su Ghetto — Via del Portico d’Ottavia 1/C, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Su%20Ghetto%20%E2%80%94%20Via%20del%20Portico%20d%E2%80%99Ottavia%201%2FC%2C%20Roma',
              web: 'https://www.baghetto.com/contatti-ristorante-kosher/',
              telefono: '+39 06 68805605',
              acceso: 'Para consultar mesa, contacta con Su Ghetto en su propio teléfono. Los servicios y reservas de Ba’Ghetto y Milky son independientes.'
            },
            {
              nombre: 'Gran Sinagoga de Roma (Tempio Maggiore)',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Después de haber descubierto la gastronomía del Barrio Judío, el siguiente paso natural es entender su historia y su identidad.\n\nA apenas unos minutos caminando se encuentra la Gran Sinagoga de Roma, el principal templo de la comunidad judía y uno de los símbolos más importantes del Ghetto.\n\nSu cúpula cuadrada, única en toda Roma, destaca sobre el skyline de la ciudad y representa la presencia de una de las comunidades judías más antiguas de Europa.\n\n🏛️ Contexto histórico:\nLa comunidad judía de Roma tiene más de 2.000 años de historia. Durante siglos vivió confinada en el Ghetto, y este templo se construyó tras su emancipación en el siglo XIX como símbolo de libertad y reconstrucción.\n\n🎧 Visita:\nEl acceso se realiza a través del Museo Judío de Roma e incluye una visita guiada al interior de la sinagoga.\n\n💡 Experiencia viajera:\nNo es solo una visita arquitectónica, es una forma de entender una parte menos visible pero fundamental de Roma.\n\n💡 Consejo PRO:\nLas explicaciones de los guías son clave. Merece mucho la pena hacer la visita completa.\n\n⚠️ Importante:\nLos controles de seguridad son estrictos (tipo aeropuerto), así que calcula algo de tiempo extra.\n\n✨ Consejo AvenTourArte:\nEste punto cierra perfectamente la experiencia del Ghetto: primero lo saboreas y luego lo entiendes.',
              foto: 'cld:europa/italia/roma/sinagoga-roma',
              horario:
                'Consulta los horarios actuales y el último acceso en el calendario del Museo Judío de Roma antes de tu visita. Cerrado los sábados (Shabbat); revisa también los cierres y cambios de horario por festividades judías.',
              precio:
                'Museo + visita guiada al Tempio Maggiore: 12€ general; estudiantes hasta 25 años con acreditación: 6€. Online: 1€ de reserva. Menores de 10 años: gratis, salvo condiciones específicas de grupos escolares.',
              direccion: 'Museo Judío de Roma — entrada por Via Catalana, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Museo%20Jud%C3%ADo%20de%20Roma%20%E2%80%94%20entrada%20por%20Via%20Catalana%2C%20Roma',
              web: 'https://museoebraico.roma.it/tariffe/',
              telefono: '+39 06 68400661',
              reserva: 'https://prenotazioni.museoebraico.roma.it/en/negozio/prenotazioni-en/single-visitor/',
              tipoReserva: 'entradas',
              acceso: 'Se entra a través del Museo Judío por Via Catalana. El billete incluye el museo y la visita guiada a la sinagoga; sigue las instrucciones de seguridad y el horario elegido.'
            },
            {
              nombre: 'Teatro de Marcelo',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Después de comprender la historia del Barrio Judío en la Gran Sinagoga, el recorrido continúa hacia uno de los rincones más sorprendentes y menos masificados de Roma: el Teatro de Marcelo.\n\nA primera vista puede recordarte al Coliseo, y no es casualidad.\n\n🏛️ Contexto histórico:\nConstruido en el siglo I a.C. por orden de Julio César y terminado por el emperador Augusto, este teatro es en realidad anterior al Coliseo y sirvió como modelo para su diseño.\n\nPodía albergar a más de 15.000 espectadores y era uno de los grandes centros culturales de la Roma antigua.\n\n🏗️ Evolución única:\nCon el paso de los siglos, el teatro fue transformándose:\n\n• Edad Media → fortaleza\n• Renacimiento → palacio de la familia Orsini\n• Actualidad → viviendas privadas sobre la estructura romana\n\n💡 Detalle curioso:\nSi miras hacia arriba, verás ventanas y balcones con flores. Sí, hay gente viviendo literalmente encima de un teatro romano de más de 2.000 años.\n\n📸 Experiencia viajera:\nEs uno de esos lugares donde Roma vuelve a sorprender: menos gente, más autenticidad y una mezcla brutal de épocas.\n\n💡 Consejo PRO:\nFíjate en las columnas:\n• Dórico (abajo)\n• Jónico (medio)\n• Corintio (arriba, originalmente)\n\nEs exactamente el esquema que luego se replicó en el Coliseo.\n\n🌅 Mejor momento:\nAl atardecer, cuando la piedra se vuelve dorada, es uno de los sitios más bonitos para fotos.\n\n✨ Consejo AvenTourArte:\nEste punto cierra perfectamente el recorrido por esta zona: historia antigua, cultura y vida actual conviviendo en el mismo lugar.',
              foto: 'cld:europa/italia/roma/teatro-marcelo',
              horario:
                'El paseo exterior y el recinto arqueológico tienen condiciones distintas. Confirma con la Sovrintendenza la apertura del recorrido antes de bajar al recinto.',
              precio:
                'Gratis (zona exterior) | Conciertos Tempietto: precio variable',
              web: 'https://www.sovraintendenzaroma.it/content/visita-al-teatro-di-marcello',
              acceso: 'Las visitas al recinto se organizan en fechas concretas. Consulta las próximas aperturas anunciadas. Para conciertos Tempietto, consulta el programa y las condiciones de la sesión.'
            },
            {
              nombre: 'Piazza del Campidoglio y Museos Capitolinos',
              tiposPlan: ['ruta', 'urbano', 'museo', 'coste-variable'],
              descripcion:
                'Desde el Teatro de Marcelo, el itinerario asciende hacia uno de los lugares más elegantes y simbólicos de Roma: la colina del Capitolio.\n\nAquí te espera la Piazza del Campidoglio, un espacio diseñado por Miguel Ángel que transforma completamente la percepción de la ciudad.\n\n🏛️ Contexto histórico:\nEl Capitolio fue una de las siete colinas de la antigua Roma y el centro político y religioso de la ciudad.\n\nSiglos después, en pleno Renacimiento, Miguel Ángel rediseñó completamente la plaza para convertirla en un símbolo del poder de la nueva Roma, orientándola hacia el Vaticano en lugar de hacia el Foro.\n\n✨ La plaza (gratis):\n\n• Pavimento en forma de estrella, uno de los diseños más icónicos del Renacimiento\n• Estatua ecuestre de Marco Aurelio (réplica; la original está dentro del museo)\n• Palacios perfectamente simétricos que crean una sensación de equilibrio única\n\n🐺 La Loba Capitolina:\n\nAquí encontrarás dos versiones:\n\n• Exterior (gratis) → una réplica en una columna junto al Palazzo Senatorio\n• Interior (original) → dentro de los Museos Capitolinos\n\n💡 Detalle clave:\nLa escultura representa a Rómulo y Remo, símbolo del origen de Roma.\n\n📸 Vistas al Foro:\n\nJusto detrás del Palazzo Senatorio tienes uno de los mejores miradores gratuitos de Roma sobre el Foro Romano.\n\n💡 Experiencia viajera:\nEs uno de esos lugares donde entiendes la grandeza de Roma sin necesidad de entrar a ningún monumento.\n\n🏛️ Museos Capitolinos:\n\nConsiderados el museo público más antiguo del mundo (1471), albergan algunas de las piezas más importantes de la ciudad.\n\n⭐ Imprescindibles:\n• Loba Capitolina original\n• Estatua original de Marco Aurelio\n• Espinario (niño con la espina)\n• Medusa de Bernini\n\n💡 Extra brutal:\nLos edificios están conectados por el Tabularium, desde donde tienes vistas interiores espectaculares del Foro.\n\n☕ Experiencia TOP:\nLa Terrazza Caffarelli ofrece una de las mejores vistas de Roma. Consulta las condiciones de acceso antes de subir; comprueba si puedes acceder sin entrada al museo.\n\n💡 Consejo PRO:\nSube por la Cordonata, la rampa monumental diseñada para subir a caballo. Es parte de la experiencia.\n\n✨ Consejo AvenTourArte:\nEste punto es clave: combina historia antigua, arte renacentista y vistas únicas en un solo lugar.',
              fotos: [
                'cld:europa/italia/roma/piazza-campidoglio',
                'cld:europa/italia/roma/marco-aurelio',
                'cld:europa/italia/roma/loba-capitolina',
                'cld:europa/italia/roma/basilica-maria-aracoeli'
              ],
              horario:
                'Plaza: acceso libre. Museos: 09:30–19:30, último acceso 18:30. 24 y 31 de diciembre hasta 14:00. Cerrados 1 de mayo y 25 de diciembre; consulta aperturas especiales.',
              precio:
                'Plaza: gratis. Solo museo, en ausencia de exposiciones: 15€ general / 9,50€ reducida. Museo con la exposición Angeli (prorrogada hasta el 10/01/2027): 16,50€ / 11€. Las exposiciones temporales y entradas combinadas pueden tener precios diferentes; consulta la tarifa oficial para la fecha de tu visita. Residentes en Roma y área metropolitana: gratuidad con documento; otras categorías según normativa municipal, no todos los menores de 18.',
              direccion: 'Museos Capitolinos — Piazza del Campidoglio 1, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Museos%20Capitolinos%20%E2%80%94%20Piazza%20del%20Campidoglio%201%2C%20Roma',
              web: 'https://www.museicapitolini.org/it/informazioni_pratiche/biglietti_e_audioguide',
              telefono: '+39 060608',
              reserva: 'https://museiincomuneroma.vivaticket.it/it/tour/musei-capitolini/2381',
              tipoReserva: 'entradas',
              acceso: 'El enlace de entradas permite elegir entre museo con exposiciones y muestras independientes: para ver la colección, elige un producto que incluya los Musei Capitolini. La plaza es gratuita. Consulta las condiciones de acceso de Terrazza Caffarelli antes de subir.'
            },
            {
              nombre: 'Monumento a Vittorio Emanuele II (Vittoriano)',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Después de recorrer la Piazza del Campidoglio y disfrutar de sus vistas sobre el Foro, el itinerario desciende hacia la Piazza Venezia, donde aparece uno de los monumentos más imponentes de toda Roma: el Vittoriano.\n\nCon su mármol blanco brillante, este edificio contrasta completamente con las ruinas antiguas que acabas de ver.\n\n🏛️ Contexto histórico:\nFue construido a finales del siglo XIX para homenajear a Vittorio Emanuele II, el primer rey de la Italia unificada.\n\nPor eso, más que un monumento romano, representa el nacimiento de la Italia moderna.\n\n💡 Curiosidad:\nLos romanos lo apodan “la tarta de bodas” por su color blanco y su aspecto monumental.\n\n🔥 Qué ver:\n\n• Altar de la Patria → con la llama eterna y el Soldado Desconocido\n• Estatua ecuestre gigante de Vittorio Emanuele II\n• Terrazas con vistas al Foro Romano y la Columna de Trajano\n\n💡 Detalle brutal:\nSe dice que dentro del caballo de la estatua se celebró una cena con más de 20 personas.\n\n🌆 Experiencia viajera:\nDesde sus terrazas tienes una perspectiva distinta del Foro, más cercana y frontal, sin necesidad de entrar al yacimiento.\n\n🚡 Ascensor panorámico (Roma dal Cielo):\nSi subes arriba del todo, tendrás una vista 360º espectacular de Roma.\n\n💡 Consejo PRO:\nSi ya has subido al Campidoglio, el ascensor es opcional, pero las vistas siguen siendo de las mejores de la ciudad.\n\n⚠️ Importante:\nLos guardias son muy estrictos:\n• No sentarse en escaleras\n• No comer ni beber\n\n✨ Consejo AvenTourArte:\nEste punto marca el contraste perfecto del viaje: pasas de la Roma imperial a la Italia moderna en solo unos pasos.',
              foto: 'cld:europa/italia/roma/vittoriano',
              horario:
                'Terraza panorámica: 09:30–19:30; último acceso 19:00 y cierre de taquilla 18:45. Los espacios del VIVE tienen condiciones propias; consulta avisos y festivos.',
              precio:
                'Zonas exteriores gratuitas. Billete conjunto VIVE: 18€; reducida UE de 18 años hasta cumplir 25: 5€. Incluye terraza panorámica y los espacios de pago indicados por el gestor; vigencia de 7 días. Menores de 18 y otras categorías oficiales: gratis. Consulta qué exposiciones incluye.',
              direccion: 'Vittoriano — entrada por Piazza Venezia, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Vittoriano%20%E2%80%94%20entrada%20por%20Piazza%20Venezia%2C%20Roma',
              web: 'https://vive.cultura.gov.it/it/info-e-orari-1',
              acceso: 'Entrada al Vittoriano desde Piazza Venezia. El ascensor/terraza y los museos de pago se integran en el producto VIVE; no son la visita gratuita al exterior.'
            },
            {
              nombre: 'Mercados de Trajano (Museo de los Foros Imperiales)',
              tiposPlan: ['ruta', 'urbano', 'museo', 'coste-variable'],
              descripcion:
                'Después de contemplar el Vittoriano y la monumentalidad de esta zona, el recorrido continúa cruzando hacia uno de los complejos más sorprendentes de la ciudad: los Mercados de Trajano.\n\nA primera vista pueden parecer solo ruinas, pero en realidad estás ante lo que muchos consideran el primer “centro comercial” cubierto de la historia.\n\n🏛️ Contexto histórico:\nConstruidos en el siglo II d.C. durante el reinado del emperador Trajano, este complejo formaba parte de su gran foro y albergaba decenas de tabernae (tiendas), oficinas y espacios administrativos.\n\nEra un auténtico centro de actividad económica y política de la antigua Roma.\n\n🚶 Experiencia única:\nA diferencia del Foro Romano, aquí puedes caminar por dentro del complejo:\n\n• Recorrer la Via Biberatica, una calle romana perfectamente conservada\n• Entrar en antiguas tiendas (tabernae)\n• Subir a distintos niveles con vistas espectaculares\n\n💡 Qué lo hace especial:\nEs mucho más inmersivo y mucho menos masificado que el Coliseo o el Foro.\n\n📸 Vistas TOP:\nDesde los niveles superiores tienes vistas increíbles a:\n• Columna de Trajano\n• Foro Romano\n• Piazza Venezia\n\n💡 Experiencia viajera:\nAquí no solo ves ruinas, las recorres.\n\n💡 Consejo PRO:\nSi te gusta la historia, merece muchísimo la pena entrar. Es uno de los sitios más infravalorados de Roma.\n\n💡 Alternativa gratis:\nDesde la Via IV Novembre puedes ver gran parte del complejo desde arriba sin pagar.\n\n✨ Consejo AvenTourArte:\nEste punto es perfecto antes de entrar en el Foro: te ayuda a entender cómo funcionaba realmente la ciudad.',
              fotos: [
                'cld:europa/italia/roma/mercados-trajano',
                'cld:europa/italia/roma/columna-trajano',
                'cld:europa/italia/roma/basilica-ulpia',
                'cld:europa/italia/roma/mercati-traiano'
              ],
              horario:
                '09:30–19:30; último acceso una hora antes. 24 y 31 de diciembre 09:30–14:00. Cerrado 1 de mayo y 25 de diciembre; consulta avisos y apertura del 1 de enero para el año de tu visita.',
              precio:
                'Solo museo: 15€ general / 9,50€ reducida. Preventa: 1€. Exposiciones y gratuidades según las condiciones municipales del producto y la fecha. Comprueba los descuentos vigentes.',
              direccion: 'Mercati di Traiano — Via IV Novembre 94, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Mercati%20di%20Traiano%20%E2%80%94%20Via%20IV%20Novembre%2094%2C%20Roma',
              web: 'https://www.mercatiditraiano.it/it/informazioni_pratiche/biglietti_e_videoguide',
              telefono: '+39 060608',
              acceso: 'Entrada por Via IV Novembre 94. Comprueba si eliges solo museo o un billete con exposición.'
            },
            {
              nombre: 'Basílica de San Pietro in Vincoli',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'A pocos minutos cuesta arriba, una parada más tranquila rompe el ritmo del recorrido sin perder intensidad: la Basílica de San Pietro in Vincoli.\n\nEste templo discreto por fuera esconde una de las mayores obras maestras de la historia del arte.\n\n🏛️ Contexto:\nAunque por fuera es una iglesia sobria, en su interior se encuentra una pieza que por sí sola justificaría el viaje a Roma.\n\n🎨 El Moisés de Miguel Ángel:\nLa gran joya de la basílica. Forma parte del mausoleo inacabado del Papa Julio II y es una de las esculturas más impresionantes jamás creadas.\n\n💡 Detalle brutal:\nLa escultura es tan realista que, según la leyenda, Miguel Ángel la golpeó diciendo:\n“¿Por qué no hablas?”\n\n💡 Consejo PRO:\nConsulta en el templo si hay iluminación opcional del Moisés y sus condiciones.\n\n⛓️ Las cadenas de San Pedro:\nBajo el altar mayor se conservan las cadenas con las que, según la tradición, San Pedro fue encarcelado.\n\n💡 Curiosidad:\nSe dice que las cadenas de Jerusalén y Roma se unieron milagrosamente al juntarlas.\n\n🌿 Experiencia viajera:\nEn medio del bullicio arqueológico, este lugar ofrece un momento de calma, arte y recogimiento.\n\n⚠️ Importante:\nAl ser una iglesia activa:\n• Hombros cubiertos\n• Evitar ropa muy corta\n\n✨ Consejo AvenTourArte:\nEste es uno de esos lugares donde Roma te recuerda que no solo fue poder, también fue arte eterno.',
              foto: 'cld:europa/italia/roma/san-pietro-vincoli',
              horario:
                'Lunes–sábado 07:00–12:20; domingo 09:00–12:00. Tardes desde 15:00 hasta 17:50 con horario solar o 18:50 con horario de verano. Visitas sujetas a celebraciones.',
              precio:
                'Entrada gratuita. Consulta en el templo las condiciones de cualquier iluminación opcional.',
              direccion: 'Basílica de San Pietro in Vincoli — Piazza di San Pietro in Vincoli 4/A, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Bas%C3%ADlica%20de%20San%20Pietro%20in%20Vincoli%20%E2%80%94%20Piazza%20di%20San%20Pietro%20in%20Vincoli%204%2FA%2C%20Roma',
              web: 'https://www.lateranensi.org/san-pietro-in-vincoli/',
              acceso: 'Es una iglesia activa: respeta el culto y el código de vestimenta.'
            },
            {
              nombre: 'Foro Romano',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Tras asombrarte con el Moisés de Miguel Ángel, llega el momento de adentrarse en el verdadero corazón de la Antigua Roma: el Foro Romano.\n\nTodo lo que has visto hasta ahora… aquí es donde ocurría.\n\n🏛️ Contexto histórico:\nEl Foro era el centro político, religioso y social de Roma. Aquí se tomaban decisiones clave, se celebraban ceremonias y se desarrollaba la vida pública.\n\nEra, literalmente, el núcleo del mundo romano.\n\n🚶 Qué vas a recorrer:\nEntrar al Foro es como caminar por una ciudad antigua detenida en el tiempo.\n\n⭐ Imprescindibles:\n• Via Sacra → la calle principal por donde desfilaban los generales victoriosos\n• Arco de Tito → símbolo de la victoria romana sobre Jerusalén\n• Templo de Saturno → sus columnas son una de las imágenes más icónicas del Foro\n• Curia Julia → sede del Senado romano, uno de los edificios mejor conservados\n• Casa de las Vestales → residencia de las sacerdotisas que mantenían el fuego sagrado de Roma\n\n💡 Experiencia viajera:\nAquí no solo visitas ruinas, caminas por el centro del poder del Imperio Romano.\n\n🌆 Conexión visual:\nDesde el Campidoglio ya lo viste desde arriba; ahora estás dentro.\n\n💡 Consejo PRO (clave):\nElige el acceso según tu billete y el recorrido previsto:\n• Foro Romano: Largo della Salara Vecchia 5/6\n• Palatino: Via di San Gregorio 30\n\nLas colas y los controles pueden variar.\n\n👟 Importante:\nEl suelo es original romano, muy irregular.\n• Lleva zapatillas cómodas\n• Evita sandalias finas\n\n💧 Agua:\nDentro hay fuentes (nasoni). Lleva botella para rellenar.\n\n☀️ Consejo verano:\nHay muy poca sombra → gorra + agua imprescindible.\n\n💡 Alternativa gratis:\nSi no entras, las vistas desde el Campidoglio siguen siendo de las mejores de Roma.\n\n✨ Consejo AvenTourArte:\nEste es el punto donde Roma deja de ser una ciudad y se convierte en historia viva.',
              foto: 'cld:europa/italia/roma/foro-romano',
              horario:
                'Apertura 09:00. Del 25/10/2026 al 28/02/2027: cierre 16:30; último acceso 15:30. Cerrado 1 de enero y 25 de diciembre. Para otras fechas, consulta el calendario oficial.',
              precio:
                'El billete 24h Coliseo–Foro–Palatino y las distintas Full Experience son productos diferentes. Consulta la tarifa y las condiciones actuales en la web oficial; no todas las modalidades incluyen arena, subterráneos o Ático.',
              web: 'https://colosseo.it/come-arrivare/',
              telefono: '+39 06 21115843',
              acceso: 'Acceso indicado: Largo della Salara Vecchia 5/6. Otra entrada al Foro–Palatino es Via di San Gregorio 30. Entrada nominativa: lleva documento de identidad. El Coliseo exige turno; se puede comprar online por el canal oficial o presencialmente el billete 24h en Piazza del Colosseo, sujeto a disponibilidad. Las taquillas del Foro venden Forum Pass SUPER, que no incluye el Coliseo. Las variantes Full Experience Arena, Subterráneos y Ático tienen recorridos propios; comprueba qué incluye la elegida.'
            },
            {
              nombre: 'Monte Palatino',
              tiposPlan: ['ruta', 'naturaleza', 'coste-variable'],
              descripcion:
                'Después de recorrer el Foro Romano y entender cómo funcionaba el corazón político y social de la ciudad, el itinerario continúa subiendo hacia el lugar donde todo comenzó: el Monte Palatino.\n\nAquí Roma deja de ser solo ruinas y se convierte en historia fundacional.\n\n🏛️ Contexto histórico:\nEl Palatino es una de las siete colinas de Roma y, según la leyenda, el lugar exacto donde la loba amamantó a Rómulo y Remo.\n\nEs, literalmente, el origen de la ciudad.\n\nCon el tiempo, se convirtió en la zona más exclusiva del Imperio, donde vivían los emperadores.\n\n👑 Qué encontrarás:\nMás que un yacimiento, es una ciudad dentro de otra.\n\n• Domus Flavia y Domus Augustana → los palacios imperiales\n• Estadio Palatino → parte del complejo del emperador\n• Cabañas de Rómulo → restos vinculados a la Roma más primitiva\n\n🌿 Experiencia viajera:\nA diferencia del Foro, aquí el ambiente cambia completamente.\n\nMás espacio, más calma, más vegetación.\n\nEs el lugar perfecto para pasear sin prisas y asimilar todo lo que acabas de ver abajo.\n\n🌄 Vistas únicas:\nDesde el Palatino tendrás las mejores vistas del Foro Romano.\n\nAquí es donde todo cobra sentido.\n\n💡 Conexión con el itinerario:\nDespués de ver el Foro desde dentro y desde los miradores del Campidoglio, subir al Palatino es el paso lógico para entender la magnitud real de la antigua Roma.\n\n💡 Consejo viajero:\nLa entrada del Palatino está en Via di San Gregorio 30; comprueba el acceso de tu billete y calcula tiempo para los controles.\n\n✨ Consejo AvenTourArte:\nNo lo recorras con prisa. Este es uno de los pocos lugares de Roma donde puedes parar, sentarte y simplemente imaginar cómo era la ciudad hace más de 2.000 años.',
              foto: 'cld:europa/italia/roma/palatino',
              horario:
                'Apertura 09:00. Del 25/10/2026 al 28/02/2027: cierre 16:30; último acceso 15:30. Cerrado 1 de enero y 25 de diciembre. Para otras fechas, consulta el calendario oficial.',
              precio:
                'El billete 24h Coliseo–Foro–Palatino y las distintas Full Experience son productos diferentes. Consulta la tarifa y las condiciones actuales en la web oficial; no todas las modalidades incluyen arena, subterráneos o Ático.',
              direccion: 'Palatino — entrada por Via di San Gregorio 30, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Via%20di%20San%20Gregorio%2030%2C%20Roma',
              web: 'https://colosseo.it/come-arrivare/',
              telefono: '+39 06 21115843',
              acceso: 'Entrada por Via di San Gregorio 30. Entrada nominativa: lleva documento de identidad. El Coliseo exige turno; se puede comprar online por el canal oficial o presencialmente el billete 24h en Piazza del Colosseo, sujeto a disponibilidad. Las taquillas del Foro venden Forum Pass SUPER, que no incluye el Coliseo. Las variantes Full Experience Arena, Subterráneos y Ático tienen recorridos propios; comprueba qué incluye la elegida.'
            },
            {
              nombre: 'Arco de Constantino',
              tiposPlan: ['ruta', 'urbano', 'gratuito'],
              descripcion:
                'Después de recorrer el Foro, el Palatino y la zona del Coliseo, el recorrido continúa hacia uno de los elementos más simbólicos de este entorno: el Arco de Constantino.\n\nSituado justo junto al Coliseo, este monumento funciona como un puente entre distintas épocas de la historia de Roma.\n\n🏛️ Contexto histórico:\nFue construido en el año 315 d.C. para conmemorar la victoria de Constantino en la batalla del Puente Milvio.\n\nEste hecho marcó un antes y un después en la historia del Imperio Romano, ya que abrió el camino hacia la expansión del cristianismo.\n\n🎨 Un detalle único:\nEl arco es, en realidad, un “collage” de la historia de Roma.\n\nMuchos de sus relieves fueron reutilizados de monumentos anteriores de emperadores como Trajano, Adriano o Marco Aurelio, conectando simbólicamente a Constantino con la grandeza del pasado.\n\n📸 Experiencia viajera:\nCon el Coliseo de fondo, este es uno de los mejores puntos para fotografía de toda la ciudad.\n\n💡 Consejo viajero:\nNo pases de largo. Dedica unos minutos a rodearlo y fijarte en los detalles.\n\n✨ Consejo AvenTourArte:\nAl atardecer y de noche, con el Coliseo iluminado, este lugar se convierte en uno de los rincones más mágicos de Roma.',
              foto: 'cld:europa/italia/roma/arco-constantino',
              horario:
                'Acceso libre 24h (iluminado por la noche)',
              precio:
                'Gratis',
              direccion: 'Arco de Constantino — Piazza del Colosseo, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Arco%20de%20Constantino%20%E2%80%94%20Piazza%20del%20Colosseo%2C%20Roma',
              web: 'https://colosseo.it/area/arco-di-costantino-e-meta-sudans/',
              acceso: 'Contemplación exterior gratuita; no requiere entrada al Coliseo.'
            },
            {
              nombre: 'Coliseo (Anfiteatro Flavio)',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Después de recorrer la Roma más antigua —Foro, templos, poder imperial y obras maestras como el Moisés de Miguel Ángel— el día culmina en el lugar más icónico de la ciudad: el Coliseo.\n\nAquí no solo estás viendo un monumento: estás entrando en el escenario donde Roma mostraba su poder al mundo.\n\nAdemás de ser el gran símbolo de Roma, el Coliseo fue reconocido como una de las Nuevas 7 Maravillas del Mundo, lo que refuerza aún más su papel como uno de los monumentos más célebres y admirados del planeta.\n\n🏛️ Contexto histórico:\nConstruido en el siglo I d.C., el Coliseo podía albergar hasta 65.000 espectadores.\n\nAquí tenían lugar:\n• Combates de gladiadores\n• Cacerías de animales exóticos\n• Ejecuciones públicas\n• Espectáculos masivos para el pueblo romano\n\nEra, literalmente, el entretenimiento del Imperio.\n\n⚔️ Experiencia dentro:\nAl recorrerlo, puedes imaginar la arena cubierta de madera, el público rugiendo y los gladiadores esperando su destino.\n\n💡 Experiencia TOP:\nSi te interesa la arena o los subterráneos, comprueba la variante Full Experience correspondiente: cada producto incluye un recorrido distinto y no da acceso automáticamente a todas las zonas.\n\n🌇 Momento mágico:\nVisitarlo a última hora del día cambia completamente la experiencia:\n• Menos gente\n• Luz dorada sobre la piedra\n• Ambiente mucho más épico\n\n💡 Consejo viajero:\nDesde el exterior, al atardecer o de noche iluminado, también es espectacular.\n\n⚠️ Importante:\nEl turno de entrada al Coliseo es obligatorio. Puedes comprar online por el canal oficial o el billete 24h presencialmente en Piazza del Colosseo, sujeto a disponibilidad.\n\n⏱️ Organización:\nEl billete 24h incluye Coliseo, Foro y Palatino; las variantes Full Experience tienen su propia vigencia y zonas incluidas. Organiza cada acceso según las condiciones del producto.\n\n💡 Consejo PRO:\nLlega 15 minutos antes de tu hora y consulta las condiciones de puntualidad del billete y el reglamento vigente.\n\n✨ Consejo AvenTourArte:\nEste es el final perfecto del día: después de entender Roma, aquí la sientes.',
              foto: 'cld:europa/italia/roma/coliseo',
              horario:
                'Apertura 08:30. Del 25/10/2026 al 28/02/2027: cierre 16:30; último acceso 15:30. Cerrado 1 de enero y 25 de diciembre. Para otras fechas, consulta el calendario oficial.',
              precio:
                'El billete 24h Coliseo–Foro–Palatino y las distintas Full Experience son productos diferentes. Consulta la tarifa y las condiciones actuales en la web oficial; no todas las modalidades incluyen arena, subterráneos o Ático.',
              web: 'https://colosseo.it/en/opening-times-and-tickets/',
              telefono: '+39 06 21115843',
              acceso: 'El acceso ordinario es Sperone Valadier, en Piazza del Colosseo; sigue el acceso escrito en tu billete si eliges otra modalidad. Entrada nominativa: lleva documento de identidad. El Coliseo exige turno; se puede comprar online por el canal oficial o presencialmente el billete 24h en Piazza del Colosseo, sujeto a disponibilidad. Las taquillas del Foro venden Forum Pass SUPER, que no incluye el Coliseo. Las variantes Full Experience Arena, Subterráneos y Ático tienen recorridos propios; comprueba qué incluye la elegida. Teléfono de información e incidencias, no de reservas.'
            }
          ]
        },
        {
          dia: 'Día 2 – Roma imperial y noche en Trastévere',
          zonas: [
            {
              nombre: 'Basílica Santa Maria della Vittoria – Éxtasis de Santa Teresa',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'El segundo día comienza con un cambio total de registro: del peso monumental de la Roma clásica al impacto emocional del barroco.\n\nEn una iglesia discreta por fuera se esconde una de las obras más impresionantes de toda Roma.\n\n🎨 Contexto artístico:\nSanta Maria della Vittoria es una de las máximas expresiones del barroco romano, un estilo que buscaba emocionar, impactar y envolver al espectador.\n\nY aquí lo consigue como en pocos lugares.\n\n✨ La obra clave:\nEl Éxtasis de Santa Teresa, de Gian Lorenzo Bernini.\n\nNo es solo una escultura, es una escena teatral completa:\n• Mármol esculpido con un nivel de detalle increíble\n• Luz natural entrando por una ventana oculta\n• Rayos dorados que simulan lo divino\n\nLa obra representa el momento místico en el que Santa Teresa siente la presencia de Dios.\n\n💡 Experiencia viajera:\nCuando la ves en directo, entiendes por qué el barroco no era solo arte, era emoción pura.\n\n💡 Detalle curioso:\nA los lados de la escena, Bernini esculpió a miembros de la familia Cornaro como si estuvieran en palcos de teatro observando la escena.\n\n💡 Consejo PRO:\nConsulta en la iglesia si se ofrece iluminación opcional y cuáles son sus condiciones.\n\n✨ Consejo AvenTourArte:\nEmpieza el día aquí temprano. Es un lugar pequeño y, sin gente, se disfruta muchísimo más.',
              foto: 'cld:europa/italia/roma/santa-maria-vittoria',
              horario:
                'Visitas: lunes–sábado 08:00–12:00 y 16:00–18:00; domingo 09:00–12:00 y 16:00–18:00. Suspendidas durante oración y celebraciones.',
              precio:
                'Entrada gratuita. Consulta en el templo cualquier servicio opcional de iluminación.',
              direccion: 'Santa Maria della Vittoria — Via XX Settembre 17, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Santa%20Maria%20della%20Vittoria%20%E2%80%94%20Via%20XX%20Settembre%2017%2C%20Roma',
              web: 'https://www.carmelitanicentroitalia.it/dove-siamo/conventi-della-provincia/s-maria-della-vittoria-roma/',
              telefono: '+39 06 42740571',
              acceso: 'El horario de culto no equivale al de visitas turísticas.'
            },
            {
              nombre: 'Trinità dei Monti y descenso a Plaza de España',
              tiposPlan: ['ruta', 'urbano', 'gratuito'],
              descripcion:
                'Después de comenzar el día con el arte barroco, el siguiente paso es uno de los grandes momentos visuales de Roma, pero vivido desde arriba.\n\nEn lugar de llegar desde la plaza, la experiencia empieza en lo alto, en la iglesia de Trinità dei Monti.\n\n⛪ La llegada:\nLlegar directamente arriba cambia completamente la perspectiva. Desde aquí, Roma se abre ante ti con una de las vistas más elegantes de la ciudad.\n\nFrente a la iglesia encontrarás el Obelisco Salustiano y un mirador privilegiado sobre la Plaza de España y la Via Condotti.\n\n💡 Experiencia viajera:\nEste es el momento de parar, mirar y entender la ciudad desde arriba antes de bajar.\n\n🏛️ La iglesia:\nTrinità dei Monti, de origen francés, tiene un interior sencillo pero muy interesante. Si puedes, entra unos minutos antes de continuar.\n\n🌇 El descenso:\nDespués de disfrutar las vistas, comienza uno de los paseos más icónicos de Roma: bajar la escalinata de la Plaza de España.\n\nSon 135 peldaños que conectan la calma de la parte alta con el bullicio de la ciudad.\n\nA medida que desciendes:\n• La perspectiva cambia\n• El ambiente se intensifica\n• Roma se vuelve más viva\n\n💡 Punto final:\nAbajo te espera la Fontana della Barcaccia, obra de Bernini, marcando el final perfecto del recorrido.\n\n⚠️ Importante:\nEstá prohibido sentarse en las escaleras (multas frecuentes).\n\n✨ Consejo AvenTourArte:\nEste recorrido no es solo un desplazamiento, es una transición perfecta entre la Roma tranquila y la Roma vibrante.',
              fotos: ['cld:europa/italia/roma/trinita-dei-monti',
                'cld:europa/italia/roma/plaza-españa'
              ],
              horario:
                'Iglesia: lunes–sábado 10:15–19:45, salvo miércoles desde 12:00; domingo 09:00–19:30. Visitas suspendidas durante celebraciones. Escalinata: acceso exterior libre.',
              precio:
                'Gratis',
              direccion: 'Trinità dei Monti — Piazza Trinità dei Monti 3, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Trinit%C3%A0%20dei%20Monti%20%E2%80%94%20Piazza%20Trinit%C3%A0%20dei%20Monti%203%2C%20Roma',
              web: 'https://trinitadeimonti.net/it/orari/',
              acceso: 'Visita autónoma a la iglesia y paseo por la escalinata: gratuitos. Las visitas guiadas al convento son un producto diferente.'
            },
            {
              nombre: 'Pastificio Guerra',
              tiposPlan: ['ruta', 'urbano', 'de-pago'],
              descripcion:
                'Después de bajar desde Trinità dei Monti y llegar al ambiente vibrante de la Plaza de España, es el momento perfecto para hacer una pausa rápida antes de continuar la ruta.\n\nA apenas 2 minutos andando se encuentra uno de los secretos mejor valorados de Roma: Pastificio Guerra.\n\n🍝 ¿Qué lo hace especial?\nNo es un restaurante tradicional, sino una antigua fábrica de pasta donde cada día se prepara pasta fresca casera.\n\nEl concepto es simple y brutalmente efectivo:\n• Solo 2 tipos de pasta al día\n• Recetas clásicas (carbonara, cacio e pepe, amatriciana…)\n• Servicio rápido y sin complicaciones\n\n💡 Experiencia viajera:\nTe sirven una bandeja generosa y comes de pie, como un local más, en plena calle.\n\nSin postureo. Solo pasta increíble.\n\n💡 Detalle top:\nA veces incluyen un vasito de vino en el precio 🍷\n\n💡 Consejo importante:\nNO comas en la escalinata de Plaza de España.\n\n⚠️ Está prohibido y multan.\n\n🎯 Dónde comerlo:\n• Calles cercanas\n• Caminando hacia la siguiente parada\n• O en algún rincón tranquilo cercano\n\n✨ Consejo AvenTourArte:\nEste es el típico sitio que no parece nada, pero te deja uno de los mejores recuerdos del viaje.',
              foto: 'cld:europa/italia/roma/pastificio-guerra',
              horario:
                'Confirma directamente con Pastificio Guerra la apertura del día antes de organizar la parada.',
              precio:
                'Presupuesto orientativo: ≈ 5€ (pasta fresca, a veces incluye vino)\nConfirma precios y servicios incluidos con el establecimiento.'
            },
            {
              nombre: 'Pompi – El rey del tiramisú',
              tiposPlan: ['ruta', 'urbano', 'de-pago'],
              descripcion:
                'Después de la parada en Pastificio Guerra, toca el broche perfecto: el postre.\n\nEn Via della Croce 88 se encuentra Pompi, conocido como el “Rey del Tiramisú”.\n\n🍰 La experiencia:\nAquí vienes a coger tu tiramisú y seguir explorando Roma.\n\nTe lo sirven en una cajita individual con cuchara, listo para disfrutar caminando.\n\n💡 Sabores:\n• Clásico (imprescindible)\n• Fresa (muy top y más ligero)\n• Pistacho\n• Avellana\n• Plátano con chocolate\n\nEste es el típico momento perfecto de viaje:\n• Acabas de comer algo increíble\n• Te llevas un tiramisú en la mano\n• Y sigues descubriendo Roma sin parar\n\n💡 Consejo importante:\nAl igual que con la pasta, no te sientes en la escalinata de Plaza de España.\n\n⚠️ Multas frecuentes.\n\n🎯 Dónde comerlo:\n• Caminando hacia la siguiente parada\n• Calles cercanas\n• O dirección mirador del Pincio\n\n💡 Tip PRO:\nSi hace calor, cómetelo pronto. Pierde textura si pasa mucho tiempo fuera del frío.\n\n✨ Consejo AvenTourArte:\nEste es uno de esos pequeños momentos que convierten un itinerario en una experiencia real.',
              foto: 'cld:europa/italia/roma/pompi-tiramisu',
              horario:
                'Sede de Via della Croce 88: domingo–jueves 10:00–22:00; viernes y sábado 10:00–22:30.',
              precio:
                'Presupuesto orientativo: ≈ 5€ por tiramisú individual\nConfirma precios y servicios incluidos con el establecimiento.',
              direccion: 'Pompi Spagna — Via della Croce 88, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Pompi%20Spagna%20%E2%80%94%20Via%20della%20Croce%2088%2C%20Roma',
              web: 'https://barpompi.it/pompi-roma-via-della-croce/',
              telefono: '+39 06 24304431'
            },
            {
              nombre: 'Via del Corso – Paseo y shopping en el corazón de Roma',
              tiposPlan: ['ruta', 'urbano', 'gratuito'],
              descripcion:
                'Después del combo perfecto de pasta y tiramisú, el recorrido continúa de forma natural por una de las calles más importantes de Roma: Via del Corso.\n\nAquí el ambiente se vuelve más dinámico.\n\nPasas de la experiencia gastronómica a un paseo lleno de vida, tiendas y movimiento constante.\n\n🏙️ Qué es Via del Corso:\nEs la gran arteria del centro histórico, una calle recta de más de 1,5 km que conecta Piazza del Popolo con Piazza Venezia.\n\n💡 Experiencia viajera:\nNo es solo una calle, es un flujo continuo de gente, locales y viajeros mezclándose.\n\n🛍️ Qué encontrarás:\n• Tiendas internacionales (Zara, Nike, Mango…)\n• Marcas italianas\n• Ambiente animado a cualquier hora\n\n🏛️ Detalles que no debes perderte:\n• Galleria Alberto Sordi → galería preciosa con techos de cristal\n• Palazzo Doria Pamphilj → joya artística escondida\n• Columna de Marco Aurelio (Piazza Colonna)\n\n💡 Consejo viajero:\nSi te agobia la cantidad de gente, escápate por calles paralelas como:\n• Via del Babuino\n• Via Margutta (mucho más tranquila y con encanto)\n\n🚶 Experiencia dentro del itinerario:\nEste tramo no es una parada fija, sino un paseo que conecta puntos clave del día mientras sigues descubriendo Roma.\n\n✨ Consejo AvenTourArte:\nNo tengas prisa aquí. Camina, observa y mezcla lo cotidiano con lo histórico, porque eso también es Roma.',
              foto: 'cld:europa/italia/roma/via-del-corso',
              horario:
                'Calle accesible todo el día. Cada tienda tiene su propio calendario de apertura.',
              precio:
                'Gratis (solo compras si quieres)',
              direccion: 'Via del Corso, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Via%20del%20Corso%2C%20Roma',
              web: 'https://www.turismoroma.it/it/luoghi/del-corso'
            },
            {
              nombre: 'Ara Pacis Augustae – El altar de la paz de Augusto',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Después del ambiente animado de Via del Corso, el recorrido continúa hacia un lugar completamente distinto: el Ara Pacis.\n\nPasas del bullicio de la ciudad a un espacio tranquilo, luminoso y cargado de significado histórico.\n\n🏛️ Contexto histórico:\nEl Ara Pacis fue construido en el año 13 a.C. para celebrar la paz instaurada por el emperador Augusto tras sus campañas.\n\nMás que un monumento, es propaganda política en mármol.\n\n✨ Qué lo hace especial:\nHoy se encuentra dentro de un museo moderno diseñado por Richard Meier.\n\nEl contraste es brutal:\n• Exterior minimalista y contemporáneo\n• Interior con una de las obras más importantes de la Roma imperial\n\n🎨 Qué ver:\n• Relieves detalladísimos en mármol\n• La procesión imperial con Augusto y su familia\n• La figura de Tellus (Madre Tierra), símbolo de prosperidad\n\n💡 Experiencia viajera:\nEs un lugar perfecto para hacer una pausa:\n• Aire acondicionado (clave en verano 😅)\n• Ambiente tranquilo\n• Visita rápida pero muy interesante\n\n💡 Extra:\nSi coincide con tu fecha, consulta la programación y el producto de “Ara Com’era”, una experiencia con condiciones propias que recrea los colores originales del altar.\n\n🏛️ Alrededor:\nJusto al lado se encuentra el Mausoleo de Augusto, completando el contexto histórico del lugar.\n\n✨ Consejo AvenTourArte:\nEste punto equilibra el día: menos turismo masivo, más historia y calma.',
              horario:
                'Todos los días 09:30–19:30; último acceso una hora antes. 24 y 31 de diciembre 09:30–14:00. Cerrado 1 de mayo y 25 de diciembre. Consulta avisos y aperturas especiales para la fecha de visita.',
              precio:
                'Solo museo: 14€ general / 8,50€ reducida. Exposiciones y experiencias tienen tarifas propias. Consulta las categorías municipales de reducción y gratuidad; no todos los menores de 18 entran gratis.',
              direccion: 'Museo dell’Ara Pacis — entrada al museo por Lungotevere in Augusta, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Museo%20dell%E2%80%99Ara%20Pacis%20%E2%80%94%20entrada%20al%20museo%20por%20Lungotevere%20in%20Augusta%2C%20Roma',
              web: 'https://www.arapacis.it/it/informazioni_pratiche/biglietti_e_audioguide',
              telefono: '+39 060608',
              reserva: 'https://museiincomuneroma.vivaticket.it/it/tour/museo-dell-ara-pacis/2383',
              tipoReserva: 'entradas',
              acceso: 'Para ver el altar, selecciona «Ingresso Museo». Entrada al museo por Lungotevere in Augusta; las exposiciones pueden usar Via di Ripetta 180. «Ara Com’era» tiene programación y producto propios: consulta las fechas antes de organizar una visita nocturna.'
            },
            {
              nombre: 'Piazza del Popolo y Terrazza del Pincio',
              tiposPlan: ['ruta', 'urbano', 'gratuito'],
              descripcion:
                'Después de la calma y el contexto histórico del Ara Pacis, el recorrido se abre hacia uno de los espacios más monumentales de Roma: la Piazza del Popolo.\n\nEl cambio de escala es inmediato. Pasas de un espacio recogido a una plaza amplia, simétrica y llena de luz.\n\n🏛️ Contexto histórico:\nDurante siglos, este fue el punto de entrada a Roma para quienes llegaban desde el norte. Era la primera imagen de la ciudad.\n\nEn cierto modo, aquí empezaba Roma.\n\n✨ El conjunto:\nEn el centro se alza el Obelisco Flaminio, traído desde Egipto en época de Augusto.\n\nAlrededor encontrarás:\n• Iglesias gemelas → Santa Maria dei Miracoli y Montesanto\n• Santa Maria del Popolo → imprescindible (Caravaggio dentro)\n• Porta del Popolo → antigua entrada a la ciudad\n\n💡 Experiencia viajera:\nEs uno de los pocos lugares donde Roma respira amplitud y equilibrio.\n\n🌇 El siguiente paso (imprescindible):\nSube hacia la Terrazza del Pincio.\n\nEn pocos minutos pasas del nivel de la ciudad a uno de los miradores más espectaculares de Roma.\n\nDesde arriba tendrás:\n• Vista completa de la plaza\n• La Via del Corso extendiéndose hacia el centro\n• La cúpula de San Pedro en el horizonte\n\n🌄 Momento clave:\nEl atardecer.\n\nLa luz dorada transforma completamente la ciudad y convierte este punto en uno de los momentos más memorables del viaje.\n\n🌿 Extra:\nPuedes pasear por el Pincio y conectar con Villa Borghese si quieres alargar el recorrido.\n\n✨ Consejo AvenTourArte:\nNo es solo una parada para fotos. Quédate unos minutos, siéntate y observa cómo Roma cambia de luz. Es uno de esos momentos que se recuerdan.',
              fotos: ['cld:europa/italia/roma/piazza-del-popolo',
                'cld:europa/italia/roma/pincio'
              ],
              horario:
                'Plaza y Pincio: acceso exterior libre. Para visitar Santa Maria del Popolo, consulta sus franjas turísticas.',
              precio:
                'Plaza y mirador del Pincio: gratis. Consulta las condiciones de visitas y servicios de la iglesia.',
              direccion: 'Piazza del Popolo — acceso al Pincio por Salita del Pincio, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Piazza%20del%20Popolo%20%E2%80%94%20acceso%20al%20Pincio%20por%20Salita%20del%20Pincio%2C%20Roma',
              web: 'https://www.turismoroma.it/it/node/1915',
              puntosPracticos: [
                {
                  nombre: 'Santa Maria del Popolo',
                  direccion: 'Santa Maria del Popolo — Piazza del Popolo 12, Roma',
                  maps: 'https://www.google.com/maps/search/?api=1&query=Santa%20Maria%20del%20Popolo%20%E2%80%94%20Piazza%20del%20Popolo%2012%2C%20Roma',
                  web: 'https://santamariadelpopoloroma.it/',
                  telefono: '+39 339 7942350',
                  horario: 'Visitas en días laborables: 08:30–09:45, 10:30–12:00 y 16:00–18:00. Festivos: 16:30–18:00. Suspendidas durante misas.'
                }
              ]
            },
            {
              nombre: 'Galería Borghese',
              tiposPlan: ['ruta', 'urbano', 'museo', 'de-pago'],
              descripcion:
                'Si todavía te quedan ganas de seguir, desde el Pincio puedes adentrarte en Villa Borghese para llegar a uno de los museos más impresionantes del mundo: la Galería Borghese.\n\nEste punto funciona como una extensión opcional del día y merece la pena sobre todo si ya llevas la entrada reservada con antelación.\n\n🏛️ El lugar:\nLa galería se encuentra dentro de una villa del siglo XVII rodeada de jardines, lo que la convierte en una visita mucho más tranquila y exclusiva que otros museos de la ciudad.\n\n🎨 Qué la hace especial:\nNo es un museo enorme, pero sí uno de los más impactantes. Aquí el arte no se acumula, se disfruta.\n\n✨ Obras imprescindibles:\n• Bernini → Apolo y Dafne, Rapto de Proserpina, David\n• Caravaggio → David con la cabeza de Goliat, Baco enfermo (Bacchino malato)\n• Canova → Paulina Borghese como Venus\n• Rafael → El entierro de Cristo\n\n💡 Experiencia viajera:\nLas esculturas de Bernini son lo que realmente marca la diferencia. El mármol parece blando, vivo, como si estuviera en movimiento.\n\n⏱️ Importante:\nLa visita tiene una duración máxima de dos horas, salvo los turnos finales de 17:30/17:45, que son más breves. Respeta la hora de salida indicada en tu billete.\n\n⚠️ Punto clave:\nReserva obligatoria.\n\nSin entrada previa no podrás acceder.\n\n💡 Consejo PRO:\nLlega al menos 30 minutos antes para dejar tus cosas en la consigna.\n\n✨ Consejo AvenTourArte:\nSi te gusta el arte, este es uno de los lugares que más te va a impactar de todo el viaje.',
              foto: 'cld:europa/italia/roma/galeria-borghese',
              horario:
                'Martes–domingo 09:00–19:00; último turno 17:45. Lunes, 1 de enero y 25 de diciembre cerrado. Comprueba turnos y aperturas especiales.',
              precio:
                'General: 18€; último turno: 13€. Reducida UE de 18 años hasta cumplir 25: 2€. Exposiciones y categorías gratuitas según condiciones oficiales. Consulta los gastos y el producto al reservar.',
              direccion: 'Galleria Borghese — Piazzale Scipione Borghese 5, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Galleria%20Borghese%20%E2%80%94%20Piazzale%20Scipione%20Borghese%205%2C%20Roma',
              web: 'https://galleriaborghese.cultura.gov.it/visita/info-biglietti/',
              telefono: '+39 06 8413979',
              acceso: 'Reserva de turno obligatoria y billete nominativo con documento. La duración máxima ordinaria es de dos horas; los turnos finales de 17:30/17:45 son más breves. Consulta en la web oficial el canal de venta disponible para la fecha de tu visita. El teléfono indicado es informativo, no una taquilla de reservas.'
            },
            {
              nombre: 'Basílica de Santa María la Mayor',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Al caer la tarde, el recorrido introduce un cambio de ambiente completamente distinto.\n\nDejamos atrás el bullicio del centro para llegar a uno de los lugares más antiguos y solemnes de la ciudad: la Basílica de Santa María la Mayor.\n\n🏛️ Contexto histórico:\nConstruida en el siglo V, es la única de las cuatro basílicas mayores de Roma que conserva su estructura paleocristiana original.\n\nEs uno de los templos cristianos más antiguos del mundo que siguen en uso.\n\n✨ Qué la hace especial:\nAquí Roma no impresiona por tamaño, sino por historia acumulada.\n\n🎨 Imprescindibles:\n• Mosaicos del siglo V → de los más antiguos del cristianismo\n• Techo dorado → vinculado al primer oro traído de América\n• Ábside → la Coronación de la Virgen (obra maestra medieval)\n\n⛪ Elementos únicos:\n• La Sacra Culla → reliquia del pesebre de Jesús\n\n⚰️ Personajes históricos:\nAquí descansan figuras clave:\n• Papa Francisco\n• Bernini\n• Papas históricos como Sixto V o Clemente VIII\n\n💡 Experiencia viajera:\nDespués de todo un día de estímulos visuales, este lugar se siente diferente.\n\nMás tranquilo. Más solemne. Más profundo.\n\nEs el sitio perfecto para bajar revoluciones antes de seguir con la parte más tranquila y nocturna del itinerario.\n\n💡 Curiosidad:\nCada 5 de agosto se celebra el “Milagro de la Nieve”, recreado con pétalos blancos cayendo desde el techo.\n\n✨ Consejo AvenTourArte:\nAntes de acercarte al final del día, consulta el horario de acceso y las celebraciones para disponer de tiempo de visita.',
              fotos: ['cld:europa/italia/roma/santa-maria-maggiore-posterior',
                'cld:europa/italia/roma/santa-maria-maggiore-francisco',
                'cld:europa/italia/roma/santa-maria-maggiore-interior',
                'cld:europa/italia/roma/santa-maria-maggiore-frontal',
              ],
              horario:
                'Basílica: consulta el horario vigente y las celebraciones en la web oficial antes de acudir. El Polo Liberiano tiene un calendario independiente.',
              precio:
                'Basílica: entrada gratuita. Museo, logia y otros circuitos: consulta la tarifa y el contenido de cada visita.',
              direccion: 'Basílica de Santa María la Mayor — Piazza di Santa Maria Maggiore, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Bas%C3%ADlica%20de%20Santa%20Mar%C3%ADa%20la%20Mayor%20%E2%80%94%20Piazza%20di%20Santa%20Maria%20Maggiore%2C%20Roma',
              web: 'https://www.basilicasantamariamaggiore.va/it/visite/info-contatti.html',
              acceso: 'La entrada ordinaria a la basílica no incluye todos los circuitos del Polo Liberiano. Las visitas turísticas están sujetas al culto.',
              puntosPracticos: [
                {
                  nombre: 'Polo Museale Liberiano',
                  web: 'https://www.basilicasantamariamaggiore.va/it/visite/info-contatti.html',
                  horario: 'Lunes–sábado 08:00–18:30, último acceso 18:00; domingo 12:30–17:00. Consulta qué circuito se ofrece y sus condiciones.',
                  acceso: 'Confirma el punto de encuentro al elegir museo, logia u otra visita; no se trata de una única entrada universal.'
                }
              ]
            },
            {
              nombre: 'Termas de Caracalla',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Después de la parte más céntrica y monumental del día, el itinerario se aleja ligeramente del bullicio para descubrir uno de los espacios más impresionantes —y menos saturados— de la Roma antigua: las Termas de Caracalla.\n\nAquí Roma vuelve a sorprender, pero desde otra perspectiva.\n\n🏛️ Contexto histórico:\nInauguradas en el año 216 d.C., estas termas no eran solo un lugar para bañarse.\n\nEran un complejo gigantesco donde los romanos pasaban horas entre deporte, cultura y ocio.\n\nUn auténtico centro social de la antigüedad.\n\n💡 Para que te hagas una idea:\nPodían acoger a más de 1.500 personas al mismo tiempo.\n\n🔥 Qué ver:\n• Frigidarium, Tepidarium y Calidarium → salas de agua fría, templada y caliente\n• Natatio → enorme piscina al aire libre con muros de más de 20 metros\n• Mosaicos originales → aún visibles en el suelo\n• Subterráneos → túneles donde trabajaban los esclavos; acceso según programación especial\n• Mitreo → templo oculto dedicado al dios Mitra; visita solo cuando la modalidad ofrecida lo incluya\n\n🏗️ Experiencia viajera:\nA diferencia del Coliseo o el Foro, aquí puedes caminar con calma.\n\nSin multitudes.\n\nSin prisas.\n\nY entendiendo realmente la escala del Imperio.\n\n💡 Sensación clave:\nEs uno de los pocos lugares donde puedes imaginar de verdad cómo era la vida cotidiana en Roma.\n\n✨ Experiencia extra:\nEn verano, estas ruinas se transforman en un escenario de ópera al aire libre.\n\nVer una representación aquí, bajo las estrellas, es algo único.\n\n💡 Consejo viajero:\nConsulta si se ofrece realidad virtual para tu fecha y qué modalidad la incluye.\n\n✨ Consejo AvenTourArte:\nEste es el contraste perfecto del día: después del caos del centro, aquí Roma respira.\n\nTómate tu tiempo.',
              foto: 'cld:europa/italia/roma/termas-caracalla',
              horario:
                'Horario de invierno desde el 25/10/2026: martes–domingo 09:00–16:30; último acceso 15:30. Lunes cerrado. Consulta otras temporadas y aperturas extraordinarias.',
              precio:
                'Con la exposición vigente: 10€ general / 4€ reducida UE de 18 años hasta cumplir 25 (base 8€/2€ + 2€ de exposición). La compra oficial no lleva coste de preventa. Menores de 18 y otras gratuidades según normativa estatal.',
              direccion: 'Termas de Caracalla — Viale delle Terme di Caracalla 52, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Termas%20de%20Caracalla%20%E2%80%94%20Viale%20delle%20Terme%20di%20Caracalla%2052%2C%20Roma',
              web: 'https://soprintendenzaspecialeroma.it/luoghi/terme-di-caracalla/',
              telefono: '+39 348 7964477',
              acceso: 'Billete nominativo por Musei Italiani, enlazado desde el gestor, o tótems presenciales con tarjeta. Subterráneos y Mitreo requieren programación y producto específicos; no están siempre incluidos en la visita ordinaria. Consulta también la disponibilidad de realidad virtual.'
            },
            {
              nombre: 'Circo Máximo',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Después de recorrer las imponentes Termas de Caracalla, el itinerario continúa hacia un lugar que hoy parece tranquilo, pero que en su momento fue el epicentro del espectáculo en la Antigua Roma: el Circo Máximo.\n\nAquí no quedan grandes estructuras en pie.\n\nPero lo que sí queda es el espacio.\n\nY eso lo cambia todo.\n\n🏛️ Contexto histórico:\nEl Circo Máximo fue el estadio más grande de Roma, con capacidad para más de 250.000 espectadores.\n\nAquí se celebraban las famosas carreras de carros, uno de los espectáculos más populares y emocionantes del Imperio.\n\n🔥 Qué ver hoy:\n• La forma de la pista → aún perfectamente reconocible\n• Torre medieval (Moletta) → contraste entre épocas\n• Vistas al Palatino → los palacios imperiales dominando el paisaje\n\n💡 Experiencia viajera:\nEste lugar no impresiona por lo que ves, sino por lo que imaginas.\n\nEstás caminando exactamente donde miles de personas gritaban, apostaban y celebraban.\n\nHoy, en cambio, es uno de los espacios más tranquilos del centro de Roma.\n\n🌇 Momento clave:\nAl atardecer, con la luz cayendo sobre el Palatino y el Aventino, el ambiente aquí es espectacular.\n\n💡 Extra recomendado:\nLa “Circo Maximo Experience” te permite ver el estadio en su máximo esplendor mediante realidad aumentada.\n\n✨ Consejo viajero:\nEs un sitio perfecto para parar, sentarte o simplemente caminar sin rumbo después de un día intenso.\n\n✨ Consejo AvenTourArte:\nDespués de todo lo que has visto hoy, este es el lugar para respirar Roma.',
              foto: 'cld:europa/italia/roma/circo-maximo',
              horario:
                'Espacio exterior: acceso libre. La experiencia de realidad virtual y el recinto arqueológico tienen calendario propio.',
              precio:
                'Paseo por el espacio exterior: gratis. La realidad virtual y la visita del recinto arqueológico son modalidades distintas.',
              direccion: 'Circo Massimo — espacio exterior, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Circo%20Massimo%20%E2%80%94%20espacio%20exterior%2C%20Roma',
              puntosPracticos: [
                {
                  nombre: 'Circo Maximo Experience — realidad virtual',
                  direccion: 'Circo Maximo Experience — entrada por Viale Aventino, Roma',
                  maps: 'https://www.google.com/maps/search/?api=1&query=Circo%20Maximo%20Experience%20%E2%80%94%20entrada%20por%20Viale%20Aventino%2C%20Roma',
                  web: 'https://www.circomaximoexperience.it/#info',
                  precio: 'Programa 2026: 12€ general / 10€ reducida; consulta categorías y calendario vigente.',
                  horario: 'Lunes cerrado; consulta las sesiones disponibles en la web oficial.',
                  acceso: 'Documento de identidad en depósito. Menores de 14 años acompañados por un adulto con autorización. La experiencia no equivale al paseo gratuito exterior.'
                }
              ]
            },
            {
              nombre: 'Foro Boario',
              tiposPlan: ['ruta', 'urbano', 'gratuito'],
              descripcion:
                'Después del paseo por el Circo Máximo, el itinerario continúa hacia una de las zonas más antiguas y menos masificadas de Roma: el Foro Boario.\n\nAquí la ciudad cambia completamente.\n\nMenos turistas. Más autenticidad.\n\n🏛️ Contexto histórico:\nEl Foro Boario fue el antiguo mercado de ganado de Roma, situado junto al río Tíber.\n\nEra uno de los centros comerciales más importantes de la ciudad primitiva, donde llegaban mercancías y se desarrollaba la actividad económica diaria.\n\n🏛️ Qué ver:\nEste pequeño conjunto reúne algunos de los templos mejor conservados de la época republicana.\n\n• Templo de Hércules Víctor → templo circular de mármol (siglo II a.C.)\n• Templo de Portuno → templo rectangular dedicado al dios de los puertos\n• Arco de Jano → estructura de cuatro caras utilizada como refugio comercial\n\n💡 Detalle importante:\nEstos templos se conservan tan bien porque fueron reutilizados como iglesias en la Edad Media.\n\n🌿 Experiencia viajera:\nEs un lugar muy distinto al resto de Roma.\n\nMás tranquilo, más abierto y con una sensación mucho más auténtica.\n\nAquí puedes caminar sin agobios y disfrutar de la historia sin multitudes.\n\n📍 Conexión con la ruta:\nEstás justo en el punto donde Roma empezó a crecer como ciudad comercial.\n\n💡 Curiosidad histórica:\nSe cree que aquí tuvo lugar el primer combate de gladiadores de Roma en el año 264 a.C.\n\n✨ Consejo AvenTourArte:\nNo es un lugar espectacular a primera vista, pero es de los que más valor tienen cuando entiendes lo que estás viendo.',
              foto: 'cld:europa/italia/roma/foro-boario',
              horario:
                'Acceso exterior libre 24h\nInteriores: generalmente no visitables',
              precio:
                'Gratis',
              direccion: 'Foro Boario — Piazza della Bocca della Verità, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Foro%20Boario%20%E2%80%94%20Piazza%20della%20Bocca%20della%20Verit%C3%A0%2C%20Roma',
              web: 'https://soprintendenzaspecialeroma.it/luoghi/tempio-di-portunus/',
              acceso: 'Paseo exterior gratuito. El interior del templo de Portuno abre en ocasiones extraordinarias; consulta la programación. Las condiciones de Hércules Víctor son independientes.'
            },
            {
              nombre: 'Boca de la Verdad y Santa María in Cosmedin',
              tiposPlan: ['ruta', 'urbano', 'de-pago'],
              descripcion:
                'Después de recorrer el Foro Boario, donde Roma muestra su lado más antiguo y comercial, el itinerario continúa hacia uno de los puntos más curiosos y reconocibles de la ciudad: la Boca de la Verdad.\n\nA solo unos pasos, en el pórtico de la iglesia de Santa María in Cosmedin, te espera una de las tradiciones más famosas de Roma.\n\n🗿 La Boca de la Verdad:\nSe trata de una enorme máscara de mármol del siglo I d.C., probablemente representando al dios Océano.\n\nPero lo que la ha hecho famosa no es su origen, sino su leyenda.\n\nSegún la tradición medieval, si introduces la mano en su boca y dices una mentira, esta se cerrará y te la morderá.\n\n🎬 Cultura popular:\nSe convirtió en un icono mundial gracias a la película “Vacaciones en Roma”.\n\nDesde entonces, es una parada obligatoria para los viajeros.\n\n⛪ Santa María in Cosmedin:\nMuchos visitantes se quedan solo con la foto, pero la iglesia es una auténtica joya medieval.\n\n• Suelo cosmatesco → uno de los más bonitos de Roma\n• Reliquia de San Valentín → el patrón de los enamorados\n• Cripta → pequeña y muy especial; consulta su apertura y condiciones propias\n• Campanario → el más alto de época medieval en Roma\n\n💡 Experiencia viajera:\nAquí Roma mezcla perfectamente historia, leyenda y cultura popular.\n\nEs una parada breve, pero con mucho significado.\n\n💡 Consejo viajero:\nSi quieres evitar colas largas, ven temprano o a última hora.\n\nSi solo quieres verla sin foto, puedes observarla desde fuera sin esperar.\n\n✨ Consejo AvenTourArte:\nSi la visita turística está permitida, dedica unos minutos a la iglesia; el acceso a la cripta se consulta por separado.',
              fotos: ['cld:europa/italia/roma/bocca-della-verita-cosmedin',
                'cld:europa/italia/roma/santa-maria-in-cosmedin'
              ],
              horario:
                'Basílica: 09:30–17:50; cerrada el 1 de enero. Consulta por separado las condiciones del pórtico y la cripta.',
              precio:
                'Consulta en el templo los donativos y servicios opcionales. No presupongas una entrada combinada a pórtico, iglesia y cripta.',
              direccion: 'Santa Maria in Cosmedin — Piazza della Bocca della Verità 18, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Santa%20Maria%20in%20Cosmedin%20%E2%80%94%20Piazza%20della%20Bocca%20della%20Verit%C3%A0%2018%2C%20Roma',
              web: 'https://cosmedin.org/contact-us/',
              telefono: '+39 06 6787759',
              acceso: 'La Boca de la Verdad está en el pórtico. Basílica y cripta son espacios diferentes: confirma la apertura de cada uno y respeta las celebraciones.'
            },
            {
              nombre: 'Piazza dei Cavalieri di Malta',
              tiposPlan: ['ruta', 'urbano', 'gratuito'],
              descripcion:
                'El recorrido asciende ahora hacia una de las colinas más tranquilas y especiales de Roma: el Aventino.\n\nAquí el ritmo cambia por completo.\n\nMenos ruido. Menos gente. Más magia.\n\n🔐 El secreto de Roma:\nEn la Piazza dei Cavalieri di Malta se encuentra uno de los lugares más curiosos de la ciudad.\n\nUna simple puerta de madera, con una de las vistas más sorprendentes de Roma.\n\n👁️ El “buco della serratura”:\nSi miras por la cerradura, verás una imagen perfectamente encuadrada de la cúpula de San Pedro al fondo, alineada entre setos perfectamente recortados.\n\nUna de las vistas más únicas que puedes tener en la ciudad.\n\n🌍 Una perspectiva única:\nDesde una plaza de Roma, en Italia, puedes mirar a través de la famosa cerradura de la Villa Magistral de la Orden de Malta. La vista enmarca los jardines de la villa y, al fondo, la cúpula de la basílica de San Pedro, en el Vaticano.\n\n🌿 Experiencia viajera:\nEl contraste con el centro es total.\n\nAquí todo es silencio, equilibrio y calma.\n\n💡 Qué hacer cerca:\n• Jardín de los Naranjos → uno de los mejores miradores de Roma\n• Basílica de Santa Sabina → iglesia paleocristiana impresionante\n\n🌇 Momento clave:\nEl atardecer desde esta zona es simplemente brutal.\n\n💡 Consejo viajero:\nPuede haber cola para la cerradura, pero suele avanzar rápido.\n\n✨ Consejo AvenTourArte:\nEste no es solo un sitio para ver, es un sitio para sentir Roma de otra manera.',
              foto: 'cld:europa/italia/roma/cerradura-calavieri-di-malta',
              horario:
                'Acceso libre 24h (mejor durante el día para la vista por la cerradura)',
              precio:
                'Gratis',
              direccion: 'Piazza dei Cavalieri di Malta — cerradura del portón de la Villa del Priorato di Malta, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Piazza%20dei%20Cavalieri%20di%20Malta%20%E2%80%94%20cerradura%20del%20port%C3%B3n%20de%20la%20Villa%20del%20Priorato%20di%20Malta%2C%20Roma',
              web: 'https://www.turismoroma.it/it/node/2152',
              acceso: 'La vista por la cerradura se disfruta desde la plaza; no da acceso a los jardines privados. El cercano Jardín de los Naranjos tiene horario estacional propio.'
            },
            {
              nombre: 'Cena en Trastevere – Tonnarello',
              tiposPlan: ['ruta', 'urbano', 'de-pago'],
              descripcion:
                'Después de un día intenso recorriendo la Roma monumental, el itinerario termina cruzando el río Tíber hacia uno de los barrios con más alma de la ciudad: Trastevere.\n\nCalles estrechas, luces cálidas, músicos callejeros y un ambiente que mezcla lo local con lo viajero.\n\n🍝 Parada obligatoria: Tonnarello\n\nTonnarello es uno de los restaurantes más famosos de Roma y una experiencia en sí misma.\n\nUbicado en pleno corazón de Trastevere, es el lugar perfecto para cerrar el día con auténtica cocina romana.\n\n🍽️ Qué probar:\n• Cacio e Pepe → su plato estrella, servido en sartén\n• Carbonara → cremosa, potente y con guanciale crujiente\n• Amatriciana → otro clásico imprescindible\n• Polpette → albóndigas en diferentes versiones\n• Pinsa romana → más ligera y crujiente que la pizza tradicional\n\n💡 Experiencia viajera:\nAquí no vienes solo a cenar, vienes a vivir el ambiente romano.\n\nMesas llenas, camareros rápidos, ruido, risas y platos abundantes.\n\n⏳ Importante:\nLa sede principal en Trastevere no acepta reservas.\n\nPrepárate para esperar entre 30 y 60 minutos en horas punta.\n\n💡 Consejo viajero:\n• Ve antes de las 19:30 o sobre las 12:00\n• O prueba otras sedes si quieres evitar colas\n\n🍰 Bonus final:\nSu tiramisú (servido en cafetera o copa) es el cierre perfecto del día.\n\n✨ Consejo AvenTourArte:\nDespués de cenar, pierde el rumbo por Trastevere.\n\nRoma no se termina cuando acaba el itinerario, empieza a sentirse.',
              fotos: ['cld:europa/italia/roma/trastevere',
                'cld:europa/italia/roma/tonnarello'
              ],
              horario:
                'Todos los días: 11:30 – 23:00 (otras sedes pueden variar)',
              precio:
                'Presupuesto orientativo: 20€ – 30€ por persona aprox.\nConfirma precios y servicios incluidos con el establecimiento.',
              direccion: 'Tonnarello — Via della Paglia 1/2/3, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Tonnarello%20%E2%80%94%20Via%20della%20Paglia%201%2F2%2F3%2C%20Roma',
              web: 'https://tonnarello.it/',
              acceso: 'Sede principal de Via della Paglia: sin reservas, por orden de llegada. Las otras sedes figuran por separado en «Dónde comer».'
            },
            {
              nombre: 'Gelato en Isla Tiberina',
              tiposPlan: ['ruta', 'naturaleza', 'de-pago'],
              descripcion:
                'Después de una jornada intensa entre historia, ruinas y miradores, el itinerario cruza el río Tíber hacia uno de los lugares más especiales y simbólicos de Roma: la Isla Tiberina.\n\nAquí el ritmo cambia.\n\nEl ruido de la ciudad desaparece ligeramente, el agua fluye a ambos lados y todo invita a parar.\n\n🍦 Parada dulce:\nEn el centro de la isla, Tiberino es el sitio perfecto para disfrutar de un gelato mientras paseas junto al río.\n\n💡 Experiencia viajera:\nEs ese momento en el que bajas revoluciones, te sientas un rato y empiezas a sentir Roma de verdad.\n\n🏛️ Contexto histórico:\nEsta isla siempre ha estado ligada a la medicina y la curación.\n\nSegún la leyenda, en el año 293 a.C., una serpiente (símbolo del dios Esculapio) llegó hasta aquí durante una epidemia. Desde entonces, este lugar se convirtió en un punto dedicado a la salud.\n\nHoy en día, esa tradición continúa con el hospital Fatebenefratelli.\n\n🚶 Qué ver alrededor:\n• Puente Fabricio (62 a.C.), el más antiguo de Roma en uso\n• Basílica de San Bartolomeo, construida sobre el antiguo templo\n• Vistas al río y al mítico Ponte Rotto\n\n🌉 Conexión del recorrido:\nLa isla conecta directamente el Ghetto Judío con Trastevere, siendo un paso natural en el itinerario.\n\n✨ Consejo AvenTourArte:\nSi puedes, quédate unos minutos junto al río al atardecer.\n\nEste es uno de esos momentos donde el viaje deja de ser un plan y se convierte en recuerdo.',
              foto: 'cld:europa/italia/roma/isla-tiberina',
              horario:
                'Isla: acceso exterior libre. Tiberino publica: lunes 08:30–16:30; martes–sábado 10:00–00:00; domingo 11:00–16:30. Confirma el servicio de heladería al llegar.',
              precio:
                'Presupuesto orientativo: Gelato: 3€ – 5€ aprox.\nConfirma precios y servicios incluidos con el establecimiento.',
              direccion: 'Tiberino — Via Ponte Quattro Capi 17–18, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Tiberino%20%E2%80%94%20Via%20Ponte%20Quattro%20Capi%2017%E2%80%9318%2C%20Roma',
              web: 'https://www.tiberinoroma.it/contatti/',
              telefono: '+39 06 6877662',
              acceso: 'El contacto corresponde a Tiberino. La reserva de su restaurante no es necesaria para este paseo con gelato; consulta disponibilidad y precios del mostrador.'
            },
            {
              nombre: 'Iglesia de San Ignacio de Loyola (Paseo nocturno)',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Para cerrar el día, el recorrido vuelve al corazón del centro histórico y regala un último impacto visual inesperado: la Iglesia de San Ignacio de Loyola.\n\nAquí el ritmo vuelve a cambiar.\n\n🌙 Ambiente nocturno:\nPor la noche, la plaza se vuelve mucho más tranquila, con una luz cálida y una atmósfera casi teatral que prepara perfectamente lo que vas a ver dentro.\n\n🎨 El efecto WOW:\nNada más entrar, levanta la vista.\n\n• La cúpula que ves… no existe.\nEs completamente plana, pintada con una perspectiva perfecta que engaña al ojo.\n\n• El techo parece abrirse al cielo.\nLa obra de Andrea Pozzo crea una ilusión de profundidad que te envuelve por completo.\n\n💡 Experiencia viajera:\nEs uno de esos lugares donde Roma juega con tu percepción y gana.\n\nHay un espejo en el centro que te permite ver el fresco sin forzar el cuello.\n\n✨ Consejo AvenTourArte:\nBusca el punto marcado en el suelo para ver la “cúpula” perfecta y, antes de irte, sal a la plaza y quédate unos minutos en silencio.',
              foto: 'cld:europa/italia/roma/san-ignacio-loyola',
              horario:
                'Todos los días: 09:00 – 23:30',
              precio:
                'Entrada gratuita. Consulta en la iglesia cualquier servicio opcional.',
              direccion: 'Sant’Ignazio di Loyola — Via del Caravita 8/A, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Sant%E2%80%99Ignazio%20di%20Loyola%20%E2%80%94%20Via%20del%20Caravita%208%2FA%2C%20Roma',
              web: 'https://chiesasantignazio.it/orari-contatti/',
              telefono: '+39 06 6794406',
              acceso: 'Visita autónoma sujeta a celebraciones. Teléfono de secretaría: lunes–viernes 09:00–13:00.'
            },
            {
              nombre: 'Quattro Fontane (Paseo nocturno final)',
              tiposPlan: ['ruta', 'urbano', 'gratuito'],
              descripcion:
                'Después de la magia visual de San Ignacio, el paseo nocturno continúa hacia uno de esos rincones discretos que resumen perfectamente el alma de Roma: las Quattro Fontane.\n\nAquí no hay colas ni grandes multitudes, pero sí una ciudad pensada al detalle.\n\n💧 El cruce:\nEn cada esquina encontrarás una fuente distinta:\n\n• El Tíber → símbolo de Roma\n• El Arno → símbolo de Florencia\n• Diana → la pureza\n• Juno → la fidelidad\n\nUn conjunto pequeño, pero con un equilibrio perfecto.\n\n🏛️ Detalle urbanístico:\nDesde las aceras puedes apreciar las perspectivas que se abren en distintas direcciones hacia algunos de los obeliscos de Roma. Observa el conjunto desde lugares peatonales seguros y utiliza los pasos señalizados para cambiar de esquina.\n\nNada está colocado al azar.\n\n⛪ Imprescindible:\nSan Carlo alle Quattro Fontane (Borromini), una de las obras más innovadoras del barroco.\n\n💡 Experiencia viajera:\nEste es el tipo de lugar que no aparece en todos los itinerarios, pero que te hace sentir que estás descubriendo Roma de verdad.\n\n✨ Consejo AvenTourArte:\nDe noche, la luz cálida da al conjunto una atmósfera especial para cerrar el día. Disfrútalo desde las aceras y cruza solo por los pasos señalizados.',
              fotos: ['cld:europa/italia/roma/quattro-fontane-tiber',
                'cld:europa/italia/roma/quattro-fontane-arno',
                'cld:europa/italia/roma/quattro-fontane-diana',
                'cld:europa/italia/roma/quattro-fontane-juno'
              ],
              horario:
                'Acceso libre: 24 horas',
              precio:
                'Gratis',
              direccion: 'Quattro Fontane — cruce de Via delle Quattro Fontane y Via XX Settembre, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Quattro%20Fontane%20%E2%80%94%20cruce%20de%20Via%20delle%20Quattro%20Fontane%20y%20Via%20XX%20Settembre%2C%20Roma',
              web: 'https://www.turismoroma.it/it/luoghi/le-quattro-fontane'
            }
          ]
        },
        {
          dia: 'Día 3 – Vaticano y despedida de Roma',
          zonas: [
            {
              nombre: 'Giolitti – Helado camino al Vaticano',
              tiposPlan: ['ruta', 'urbano', 'de-pago'],
              descripcion:
                'Si no madrugas en exceso o te encaja bien por ruta antes de comenzar la parte más intensa del día, hay una parada que eleva el plan desde el primer momento: Giolitti.\n\nSu historia comenzó en 1890 como lechería; hoy es una de las heladerías históricas más conocidas de Roma. Entrar aquí es como viajar a otra época: vitrinas clásicas, ambiente bullicioso y una tradición que sigue intacta.\n\n🍦 Experiencia viajera:\nEste no es solo un helado, es ese pequeño momento que convierte un día intenso en algo especial desde el inicio.\n\nAdemás, encaja muy bien en el recorrido: está muy cerca del Panteón y puede funcionar como arranque agradable antes de encaminarte hacia el Vaticano.\n\n🍨 Qué probar:\n• Pistacho → intenso y de gran calidad\n• Champagne → refrescante y diferente\n• Riso → sabor tipo arroz con leche frío\n• Clásicos → chocolate, stracciatella, avellana\n\n💡 Detalle imprescindible:\nPide “panna” (nata montada) arriba. Es casera y marca la diferencia.\n\n💡 Experiencia AvenTourArte:\nPide tu helado para llevar y disfrútalo caminando. Es uno de esos momentos simples, pero perfectos del viaje.',
              horario:
                'Todos los días: 07:30 – 00:00',
              precio:
                'Presupuesto orientativo: 3€ – 6€ aprox. según tamaño\n⚠️ Precio más alto si te sientas en mesa\nConfirma precios y servicios incluidos con el establecimiento.',
              direccion: 'Giolitti — Via degli Uffici del Vicario 40, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Giolitti%20%E2%80%94%20Via%20degli%20Uffici%20del%20Vicario%2040%2C%20Roma',
              web: 'https://www.giolitti.it/il-locale/',
              telefono: '+39 06 6991243'
            },
            {
              nombre: 'Encuentros con el Papa — Ángelus, audiencia y misas',
              tiposPlan: ['ruta', 'urbano', 'gratuito'],
              descripcion:
                'Si tu viaje coincide con una celebración papal, asistir a una misa o encuentro con el Papa es una de las experiencias más especiales que puedes vivir en Roma.\n\nNo es solo un acto religioso, es un momento único, cargado de historia, emoción y simbolismo.\n\n⛪ Tipos de encuentros:\n\n• Ángelus (habitualmente domingos 12:00, según calendario)\nLa asistencia ordinaria no requiere entrada. Confirma la fecha y el lugar antes de acudir.\n\n• Audiencia General (fecha, hora y lugar según calendario)\nNo es misa, sino catequesis.\nSÍ requiere entrada gratuita.\n\n• Misas solemnes (Navidad, Semana Santa, canonizaciones)\nLas más especiales… y también las más difíciles de conseguir.\nComprueba los requisitos de entrada y solicitud de cada celebración en el calendario oficial.\n\n🎟️ Cómo conseguir entradas:\n\nLas entradas son SIEMPRE gratuitas.\n\n⚠️ Nunca pagues por ellas.\n\nLa Prefectura de la Casa Pontificia ofrece un portal de solicitud para laicos, con registro previo. Elige el acto y sigue las instrucciones de confirmación, acceso y recogida. La solicitud no equivale a una entrada confirmada. Los sacerdotes que quieran concelebrar utilizan un canal separado.\n\n⏱️ Organización clave:\n\n• Llega mínimo 1,5 – 2 horas antes\n• Controles de seguridad tipo aeropuerto\n• Mucha afluencia en fechas importantes\n\n👕 Código de vestimenta (OBLIGATORIO):\n\n• Hombros cubiertos\n• Pantalón o falda por debajo de la rodilla\n\nSi no cumples, no entras aunque tengas entrada.\n\n💡 Experiencia viajera:\nEstar en la Plaza de San Pedro, rodeado de miles de personas de todo el mundo, esperando al Papa… es algo difícil de explicar.\n\nEs uno de esos momentos que no se olvidan.\n\n⚠️ Importante para organizar el día:\nAsistir a este tipo de evento puede condicionar bastante el resto del itinerario, así que conviene encajarlo con margen.\n\n✨ Consejo AvenTourArte:\nSi no consigues entradas, consulta si hay Ángelus abierto al público durante tu estancia.\nEs gratuito, mucho más sencillo y sigue siendo una experiencia muy especial.',
              foto: 'cld:europa/italia/vaticano/plaza-san-pedro-misa-papa',
              horario:
                'Ángelus: habitualmente domingos 12:00, según calendario. Audiencia General y misas: consulta la fecha, hora y lugar de cada acto; no tienen un horario semanal único garantizado.',
              precio:
                'GRATIS (todas las entradas oficiales)\n⚠️ No pagar a terceros',
              web: 'https://www.vatican.va/content/vatican/it/prenotazione-celebrazioni-udienze.html',
              reserva: 'https://eventi.pontificalisdomus.va/',
              tipoReserva: 'inscripcion',
              acceso: 'Ángelus ordinario: sin entrada, sujeto al calendario y a controles. Audiencias y celebraciones: solicitud gratuita para laicos en el portal de la Prefectura; requiere registro y está sujeta a las indicaciones de cada acto. La solicitud no garantiza plaza. Los sacerdotes concelebrantes tienen un canal distinto. Sigue la confirmación para acceso y recogida.'
            },
            {
              nombre: 'Museos Vaticanos y Capilla Sixtina',
              tiposPlan: ['ruta', 'urbano', 'museo', 'coste-variable'],
              descripcion:
                'Los Museos Vaticanos son uno de los complejos culturales más impresionantes del mundo. Aquí se conserva la enorme colección de arte reunida por los papas durante siglos.\n\nEs un viaje por la historia del arte occidental.\n\n🎨 Lo imprescindible:\n\n• Capilla Sixtina (⭐ punto final)\nCon los frescos de Miguel Ángel:\n– La creación de Adán\n– El Juicio Final\n\n⚠️ Importante:\n– Prohibido hablar\n– Prohibidas fotos y vídeos\n\n• Estancias de Rafael\nDestaca “La Escuela de Atenas”, una de las obras más importantes del Renacimiento.\n\n• Galería de los Mapas\nUn pasillo espectacular de 120 metros con mapas pintados de Italia.\n\n• Patio del Belvedere y Patio de la Piña\nAquí verás esculturas clave como:\n– Laocoonte\n– Apolo de Belvedere\n\n• Escalera de Caracol (Momo)\nLa icónica salida del museo, una de las fotos más famosas.\n\n⏱️ Duración real:\nNecesitarás mínimo 3–4 horas para ver lo principal sin prisas.\n\n🚨 Consejo CLAVE:\nValora reservar con antelación desde el canal enlazado por los Museos Vaticanos. La compra en taquilla está sujeta a disponibilidad y puede haber esperas.\n\n📍 Ubicación importante:\n\nLa entrada NO está en la Plaza de San Pedro.\n\n👉 Está en Viale Vaticano\n\n💡 Organización:\nLa basílica tiene acceso y controles propios. No presupongas que una visita guiada a los Museos permita pasar directamente desde la Sixtina.\n\n👕 Código de vestimenta:\n\n• Hombros cubiertos\n• Pantalones/falda por debajo de la rodilla\n\n❌ Si no cumples, no entras\n\n💡 Experiencia viajera:\nEste lugar impresiona, pero también puede saturar.\n\nHay muchísima gente, salas interminables y estímulos constantes.\n\n✨ Consejo AvenTourArte:\nNo intentes verlo TODO.\n\nVe directo a lo importante, disfruta las obras clave y no te quemes.\n\nMenos cantidad, más experiencia.',
              horario:
                'Lunes–sábado 08:00–20:00; último acceso 18:00. Domingos cerrado, salvo el último domingo gratuito: 09:00–14:00, último acceso 12:30, sujeto al calendario oficial de cierres y excepciones.',
              precio:
                'Museos + Capilla Sixtina: 20€ general / 10€ reducida en taquilla; con reserva online, 5€ adicionales (25€/15€). Menores de 7 años: gratis. Reducciones y otras gratuidades según requisitos oficiales. Audioguías y visitas guiadas son servicios distintos: consulta el producto.',
              direccion: 'Museos Vaticanos — entrada por Viale Vaticano, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Porta%20Musei%20Vaticani&query_place_id=ChIJx9HiojxhLxMR1Jy1-cnXjaQ',
              web: 'https://www.museivaticani.va/content/museivaticani/it/organizza-visita/tariffe-e-biglietti.html',
              telefono: '+39 06 69883145',
              acceso: 'Se entra por Viale Vaticano, no por la Plaza de San Pedro. La Sixtina se incluye en el billete de Museos para el mismo día; no requiere una entrada independiente. Compra las entradas a través del portal oficial de los Museos Vaticanos (tickets.museivaticani.va), accesible desde su web. La visita no garantiza paso directo a la basílica.'
            },
            {
              nombre: 'Basílica de San Pedro y Cúpula',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Después de los Museos Vaticanos, el recorrido continúa hacia el gran corazón del Vaticano: la Basílica de San Pedro, uno de los templos más impresionantes del mundo.\n\nA diferencia de los Museos Vaticanos, aquí la entrada es gratuita, pero la experiencia es igual o incluso más impactante.\n\nNada más entrar, la escala del lugar te sobrepasa.\n\n🏛️ Qué ver dentro:\n\n• La Piedad de Miguel Ángel\nUna de las esculturas más emocionantes de la historia.\n\n• Baldaquino de Bernini\nGigantesco y espectacular, justo sobre el altar mayor.\n\n• Cúpula interior\nDiseñada por Miguel Ángel, domina todo el espacio.\n\n• Grutas Vaticanas\nDonde se encuentran las tumbas de los papas.\n\n💡 Experiencia viajera:\nAquí no solo visitas un monumento, sientes el peso de la historia, el arte y la espiritualidad en un mismo lugar.\n\n🌇 Subida a la Cúpula (TOP del Vaticano):\n\nUna de las mejores vistas de toda Roma.\n\n⚠️ Importante:\nLos últimos tramos son estrechos e inclinados.\nNo recomendable si tienes claustrofobia.\n\n💡 Recompensa:\nVista 360º de Roma con la Plaza de San Pedro a tus pies.\n\n🚨 Consejos clave (muy importante):\n\n• Consulta los horarios y llega con margen para los controles\n• La afluencia puede variar; madrugar no garantiza ausencia de colas\n\n⚠️ Celebraciones y audiencias:\nPueden alterar el acceso. Consulta los avisos de la basílica para la fecha concreta.\n\n👕 Código de vestimenta:\n\n• Hombros cubiertos\n• Rodillas cubiertas\n\n❌ Si no cumples → no entras (aunque hayas hecho cola)\n\n🚫 Ojo con esto:\n\nLa entrada ordinaria a la basílica es gratuita. También hay servicios oficiales de pago con hora y audioguía, como los paquetes de cúpula. No eliminan los controles de seguridad.\n\n✨ Consejo AvenTourArte:\nSi puedes, entra temprano y sube a la cúpula justo después.\n\nEs uno de los momentos más brutales de todo el viaje.',
              foto: 'cld:europa/italia/vaticano/basilica-san-pedro',
              horario:
                'Del 26/10/2026 al 28/03/2027: basílica 07:00–19:00; cúpula 07:30–17:00. Consulta el calendario para otras fechas y posibles cambios por celebraciones.',
              precio:
                'Entrada ordinaria a la basílica: gratis. Cúpula: de pago, con opciones de escaleras o ascensor y servicios propios; consulta la tarifa de la modalidad elegida. Tesoro: cerrado temporalmente por obras. Necrópolis: visita guiada de pago mediante solicitud independiente.',
              direccion: 'Basílica de San Pedro — controles de acceso desde Piazza San Pietro, Ciudad del Vaticano',
              maps: 'https://www.google.com/maps/search/?api=1&query=Piazza%20San%20Pietro%2C%20Citt%C3%A0%20del%20Vaticano',
              web: 'https://www.basilicasanpietro.va/it/orari',
              acceso: 'Controles de seguridad obligatorios para todos los visitantes. El acceso gratuito ordinario no equivale a los servicios oficiales con hora y audioguía. Celebraciones y audiencias pueden modificar recorridos y horarios. Para la cúpula, sigue el orden y el punto de acceso indicados en el QR y la confirmación.',
              puntosPracticos: [
                {
                  nombre: 'Cúpula con ascensor — incluye basílica y audioguía',
                  web: 'https://www.basilicasanpietro.va/it/products/la-cupola',
                  reserva: 'https://booking.basilicasanpietro.va/it/idea/52250633/cupola-con-ascensore-include-basilica-',
                  tipoReserva: 'entradas',
                  telefono: '+39 06 96124006',
                  acceso: 'Paquete oficial con hora, basílica y audioguía digital. Ascensor hasta la terraza; quedan 320 escalones. La visita a la basílica se asigna una hora antes o después. Seguridad obligatoria. Consulta precio, disponibilidad y condiciones del paquete; no es el acceso ordinario gratuito.'
                },
                {
                  nombre: 'Cúpula por escaleras — incluye basílica y audioguía',
                  web: 'https://www.basilicasanpietro.va/it/products/la-cupola',
                  reserva: 'https://booking.basilicasanpietro.va/it/idea/52251275/-cupola-con-scale-include-basilica-',
                  tipoReserva: 'entradas',
                  acceso: 'Paquete oficial con hora, basílica y audioguía digital; 551 escalones en total. El orden de las visitas figura en la confirmación. Seguridad obligatoria. Consulta precio y condiciones del paquete.'
                },
                {
                  nombre: 'Museo del Tesoro — cerrado temporalmente',
                  web: 'https://www.basilicasanpietro.va/it/products/museo-del-tesoro',
                  acceso: 'El museo permanece cerrado temporalmente por obras según la última información consultada, sin fecha de reapertura confirmada. Comprueba si ha reabierto antes de tu visita.'
                },
                {
                  nombre: 'Necrópolis Vaticana — solicitud de visita guiada',
                  reserva: 'https://visite.basilicasanpietro.va/it/booking/necropolivaticana',
                  tipoReserva: 'visita',
                  precio: 'Canal actual: 20€ general / 14€ de 10 a 17 años; incluye guía. Pago con tarjeta tras la confirmación.',
                  acceso: 'Solo desde los 10 años. La fecha y hora solicitadas son orientativas: el Ufficio Visite confirma la visita antes del pago. La confirmación indica el acceso. No confundir con las Grutas Vaticanas ni con la entrada a la basílica.'
                }
              ]
            },
            {
              nombre: 'Castillo de Sant’Angelo y Puente Sant’Angelo',
              tiposPlan: ['ruta', 'urbano', 'coste-variable'],
              descripcion:
                'Tras la parte del itinerario dedicada al Vaticano, el recorrido continúa hacia el río Tíber, tanto si has visitado interiores como si has paseado por el exterior.\n\nAquí Roma vuelve a cambiar de perspectiva.\n\nDejas atrás la monumentalidad del Vaticano y entras en una Roma más abierta, más tranquila y visualmente espectacular.\n\n🌉 El puente de entrada:\n\nAntes de llegar al castillo, cruzarás el Puente Sant’Angelo.\n\nUno de los más bonitos de Roma.\n\nLas esculturas de ángeles, diseñadas por Bernini, crean un paseo casi escenográfico que te prepara para lo que viene.\n\n📸 Consejo:\nEste es uno de los mejores puntos para fotos con la cúpula de San Pedro al fondo.\n\n🏰 El castillo:\n\nLo que ves hoy comenzó como el mausoleo del emperador Adriano,\n\npero Roma, como siempre, lo transformó.\n\nFortaleza, refugio papal, prisión y ahora museo.\n\nAquí la historia no se conserva, evoluciona.\n\n🔥 Qué no te puedes perder:\n\n• Terraza del Ángel ⭐\nEl momento clave de la visita.\n\nDesde arriba tendrás una de las mejores vistas de Roma:\n– El Vaticano frente a ti\n– El río cruzando la ciudad\n– El skyline romano completo\n\n💡 Sensación:\nEs uno de esos lugares donde entiendes Roma desde otra perspectiva.\n\n• Apartamentos papales\nSalas con frescos que reflejan el poder y la vida dentro del castillo.\n\n• Pasetto di Borgo\nEl corredor secreto que conecta directamente con el Vaticano.\n\n💡 Aquí los papas escapaban en momentos de peligro.\n\n(⚠️ No siempre visitable)\n\n☕ Experiencia TOP:\n\nEn la parte superior hay una cafetería con terraza.\n\nSi la cafetería está abierta, tomarte algo aquí, tras el recorrido por el Vaticano, con San Pedro frente a ti, es uno de los momentos más especiales del viaje.\n\n💡 Experiencia viajera:\nEste lugar funciona como transición perfecta:\n\nDe la intensidad del Vaticano → a un momento de calma, vistas y disfrute.\n\n💡 Consejo viajero:\nSi vas en temporada alta, compra la entrada online.\n\nComprueba el producto y sus condiciones antes de comprar.\n\n✨ Consejo AvenTourArte:\nUn lugar para parar, mirar Roma desde arriba y empezar a despedirte poco a poco de la ciudad.',
              fotos: ['cld:europa/italia/roma/puente-sant-angelo',
                'cld:europa/italia/roma/castillo-sant-angelo'
              ],
              horario:
                'Museo: martes–domingo 09:00–19:30, último acceso 18:30. En 2026 hay aperturas de lunes con reglas y fechas específicas: consulta los avisos antes de acudir. El puente exterior tiene acceso independiente.',
              precio:
                'Museo: 18€ general; reducida UE de 18 años hasta cumplir 25: 2€; menores de 18 y otras categorías oficiales: gratis. Consulta el producto y cualquier servicio adicional. Puente: paseo exterior gratuito.',
              direccion: 'Castel Sant’Angelo — Lungotevere Castello 50, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Castel%20Sant%E2%80%99Angelo%20%E2%80%94%20Lungotevere%20Castello%2050%2C%20Roma',
              web: 'https://direzionemuseiroma.cultura.gov.it/category/luoghi-della-cultura/',
              telefono: '+39 06 6819111',
              acceso: 'La entrada de pago corresponde al museo. El Passetto di Borgo no está siempre incluido: consulta modalidad y programación. Compra oficial por Musei Italiani desde la web oficial.',
              puntosPracticos: [
                {
                  nombre: 'Puente Sant’Angelo',
                  direccion: 'Ponte Sant’Angelo, Roma',
                  maps: 'https://www.google.com/maps/search/?api=1&query=Ponte%20Sant%E2%80%99Angelo%2C%20Roma',
                  acceso: 'Paseo exterior gratuito, separado del billete y los horarios del castillo.'
                }
              ]
            },
            {
              nombre: 'Puente Umberto I',
              tiposPlan: ['ruta', 'urbano', 'gratuito'],
              descripcion:
                'Después de recorrer el Castillo de Sant’Angelo y cruzar su puente, el paseo continúa de forma natural siguiendo el río Tíber hasta llegar a uno de los puntos más especiales para despedirse de Roma: el Puente Umberto I.\n\nAquí todo encaja.\n\nDejas atrás el Vaticano, el castillo y el bullicio… y de repente el espacio se abre.\n\n🌉 La vista:\n\nDesde este puente se crea una de las imágenes más icónicas de toda Roma:\n\n• El río Tíber en primer plano\n• El Puente Sant’Angelo en el centro\n• La cúpula de San Pedro al fondo\n\nEs, literalmente, la postal perfecta del viaje.\n\n💡 Experiencia viajera:\nEste no es solo un sitio para hacer una foto.\n\nEs el momento en el que paras, miras atrás…\ny entiendes todo lo que acabas de vivir.\n\n🌇 Momento perfecto:\n\nAl atardecer.\n\nCuando:\n• El cielo empieza a caer\n• Se encienden las luces del Vaticano\n• El reflejo aparece en el agua\n\n👉 Aquí Roma se vuelve mágica.\n\n🏛️ Detalle curioso:\n\nA un lado verás el enorme Palacio de Justicia.\n\nLos romanos lo llaman “Il Palazzaccio” (el palacio feo), aunque hoy forma parte del paisaje clásico de la ciudad.\n\n✨ Consejo AvenTourArte:\nNo pases rápido por aquí.\n\nQuédate unos minutos.\n\nEste es el punto donde el viaje deja de ser itinerario… y se convierte en recuerdo.',
              foto: 'cld:europa/italia/roma/puente-umberto-I',
              horario:
                'Acceso libre 24h',
              precio:
                'Gratis',
              direccion: 'Ponte Umberto I, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Ponte%20Umberto%20I%2C%20Roma',
              web: 'https://www.turismoroma.it/it/luoghi/ponte-umberto-i'
            },
            {
              nombre: 'Shopping',
              tiposPlan: ['ruta', 'urbano'],
              descripcion:
                'Si todavía te queda algo de tiempo antes de volver, este es el momento perfecto para hacer compras, buscar últimos recuerdos, dar un paseo final o recuperar alguna visita que se te haya quedado en el tintero. Es un tramo pensado para bajar el ritmo y despedirse de Roma con calma.',
              horario: 'Según tu horario de vuelta',
              precio: 'Según compras'
            },
            {
              nombre: 'Última comida en Roma – Da Baffetto o Cantina e Cucina',
              tiposPlan: ['ruta', 'urbano', 'de-pago'],
              descripcion:
                'Después de recorrer el Vaticano, cruzar el Tíber y disfrutar de una de las mejores vistas de Roma desde el Puente Umberto I, llega el último momento del viaje.\n\nEse en el que ya no hay prisas.\n\nEse en el que sabes que Roma se está terminando.\n\nY aquí hay una decisión importante:\n\n👉 Pizza o pasta.\n\n🍕 Opción 1 – Da Baffetto:\n\nLa pizzería más icónica de Roma.\n\nAquí no vienes a relajarte, vienes a vivir una experiencia auténtica.\n\n• Ambiente caótico, ruidoso y lleno de vida\n• Mesas compartidas\n• Consulta las condiciones de mesa directamente con Da Baffetto\n\n💡 Pero cuando llega la pizza… todo tiene sentido.\n\n🔥 Estilo:\nPizza romana clásica → fina, crujiente y potente.\n\n⭐ Imprescindible:\nPizza Baffetto (huevo, alcachofas, champiñones y salchicha)\n\n💡 Experiencia viajera:\nEs el típico sitio que no es perfecto, pero es inolvidable.\n\n🍝 Opción 2 – Cantina e Cucina:\n\nA solo unos pasos, el plan cambia completamente.\n\nAquí todo es más calmado, más cuidado y más de “última comida del viaje”.\n\n• Decoración rústica muy bonita\n• Servicio más atento\n• Ambiente relajado\n\n🔥 Qué probar:\n• Carbonara ⭐\n• Focaccia\n• Polpette (albóndigas)\n\n💡 Experiencia viajera:\nPerfecto para sentarte, brindar y cerrar el viaje como se merece.\n\n⚖️ Decisión rápida:\n\n• Quieres experiencia romana real → Da Baffetto\n• Quieres cierre tranquilo y especial → Cantina e Cucina\n\n📍 Ubicación:\nAmbos están en Via del Governo Vecchio, a pocos minutos de Piazza Navona.\n\nPerfecto para encajarlo antes de volver al alojamiento o ir al aeropuerto.\n\n💡 Consejo viajero:\nSi vas justo de tiempo:\n👉 Cantina e Cucina es más predecible\n\nSi tienes margen:\n👉 Da Baffetto merece la experiencia\n\n✨ Consejo AvenTourArte:\nNo pienses en el plan.\nNo mires el reloj.\n\nEste es el último momento.\n\nPide algo que te apetezca de verdad y despídete de Roma como se merece.',
              horario:
                'Da Baffetto: confirma directamente el horario antes de ir. Cantina e Cucina: todos los días 11:00–23:30.',
              precio:
                'Presupuesto orientativo: Da Baffetto: 20€ – 25€ por persona.\nCantina e Cucina: 25€ – 35€ por persona.\nConfirma los precios actuales y los servicios incluidos con el establecimiento.',
              acceso: 'Son dos establecimientos diferentes. Consulta «Dónde comer» para sus datos y confirma las condiciones de mesa con cada local.'
            }
          ]
        }
      ]
    },
    {
      titulo: 'Gastronomía',
      platos: [
        {
          nombre: 'Carbonara',
          descripcion:
            'Uno de los platos más emblemáticos de Roma y probablemente la pasta más famosa de Italia. La auténtica carbonara NO lleva nata, ni cebolla, ni ajo.\n\nSe elabora con pasta (normalmente spaghetti o rigatoni), huevo, queso pecorino romano, guanciale (papada de cerdo curada) y pimienta negra.\n\nLa clave está en la técnica: el huevo se emulsiona con el queso y la grasa del guanciale para crear una salsa cremosa sin cocinar directamente el huevo.\n\n💡 Experiencia viajera:\nEs un plato potente, intenso y muy sabroso. Cuando está bien hecha, es probablemente uno de los mejores platos que probarás en Roma.',
          foto: 'cld:europa/italia/roma/carbonara',
          precio: 'Moderado'
        },
        {
          nombre: 'Cacio e pepe',
          descripcion:
            'Una de las pastas más famosas y representativas de Roma. Se prepara con pasta, pecorino romano rallado y abundante pimienta negra.\n\nLa clave está en emulsionar el queso con el agua de cocción de la pasta para crear una salsa cremosa sin necesidad de nata.\n\nSencilla en apariencia, pero espectacular cuando está bien hecha.',
          foto: 'cld:europa/italia/roma/cacio-e-pepe',
          precio: 'Moderado'
        },
        {
          nombre: 'Bucatini all’amatriciana',
          descripcion:
            'Otra de las grandes joyas de la gastronomía romana. Se prepara con bucatini (pasta larga hueca), salsa de tomate, guanciale y queso pecorino romano.\n\nEn la receta tradicional NO lleva cebolla (aunque algunos sitios la usan).\n\nEl guanciale aporta un sabor profundo que se mezcla con el tomate creando una salsa intensa y muy característica.',
          foto: 'cld:europa/italia/roma/amatriciana',
          precio: 'Moderado'
        },
        {
          nombre: 'Lasaña',
          descripcion:
            'Gran clásico de la cocina italiana que también aparece en muchos locales tradicionales de Roma. Se hace por capas de pasta con ragú de carne, bechamel y queso gratinado.\n\nEs un plato contundente y muy reconfortante, aunque más típico de otras regiones de Italia que de Roma.',
          foto: 'cld:europa/italia/roma/lasana',
          precio: 'Moderado'
        },
        {
          nombre: 'Pizza romana',
          descripcion:
            'La pizza típica de Roma se caracteriza por ser más fina, crujiente y ligera que en otras partes de Italia.\n\nEs muy distinta a la napolitana, donde la masa es más gruesa y esponjosa.\n\nPuede llevar ingredientes clásicos como mozzarella, tomate, champiñones, prosciutto, alcachofas o anchoas.\n\n💡 Extra importante:\nTambién existe la versión “pizza al taglio”, que se vende al corte en panaderías y es muy típica para comer rápido.',
          precio: 'Económico-moderado'
        },
        {
          nombre: 'Pizza bianca / pizza rossa',
          descripcion:
            'Dos de las opciones más típicas de comida rápida en Roma.\n\n• Pizza bianca → masa de pan crujiente con aceite de oliva y sal\n• Pizza rossa → la misma base con salsa de tomate (sin queso)\n\nSe venden al peso en panaderías y se comen caminando.\n\n💡 Experiencia viajera:\nEs lo más auténtico para picar algo rápido como un romano.',
          foto: 'cld:europa/italia/roma/pizza-rossa',
          precio: 'Económico'
        },
        {
          nombre: 'Pinsa romana',
          descripcion:
            'Variante romana de la pizza, con forma ovalada y una masa más ligera, aireada y crujiente.\n\nSe elabora con una mezcla de harinas y fermentación larga, lo que la hace más digestiva.\n\nMuy popular tanto para comer sentado como para algo rápido.',
          foto: 'cld:europa/italia/roma/pinsa',
          precio: 'Económico-moderado'
        },
        {
          nombre: 'Focaccia',
          descripcion:
            'Pan plano típico italiano, similar a una masa de pizza pero más gruesa, esponjosa y con un interior muy aireado.\n\nSe elabora con harina, aceite de oliva, sal y levadura, y suele llevar por encima ingredientes sencillos como sal gruesa, romero o tomate.\n\nEs más típica del norte de Italia, pero en Roma se encuentra fácilmente como entrante o acompañamiento.',
          precio: 'Económico'
        },
        {
          nombre: 'Panini',
          descripcion:
            'Bocadillos italianos preparados normalmente con pan crujiente o chapata y rellenos de ingredientes como prosciutto, mortadela, mozzarella, tomate, rúcula, pesto o verduras.\n\nMuchas veces se preparan al momento en panaderías o “alimentari”.\n\nSon una opción perfecta para comer rápido entre visitas.',
          precio: 'Económico'
        },
        {
          nombre: 'Supplì',
          descripcion:
            'Croqueta de arroz típica romana, rellena de mozzarella y normalmente con tomate.\n\nSe fríe hasta quedar crujiente por fuera y cremosa por dentro.\n\n💡 Detalle clave:\nAl partirlo, el queso se estira formando un hilo (por eso se llama “al telefono”).\n\n💡 Experiencia viajera:\nEl snack callejero más típico de Roma.',
          precio: 'Económico'
        },
        {
          nombre: 'Carciofi alla giudia',
          descripcion:
            'Alcachofas fritas al estilo judío-romano, abiertas como una flor y muy crujientes.\n\nSe preparan enteras, fritas hasta quedar doradas por fuera y tiernas por dentro.\n\nMuy típicas del barrio judío de Roma.',
          precio: 'Moderado'
        },
        {
          nombre: 'Fiori di zucca fritti',
          descripcion:
            'Flores de calabacín rellenas de mozzarella y anchoa, rebozadas y fritas.\n\nCrujientes por fuera y suaves por dentro, son uno de los aperitivos más típicos de Roma.',
          precio: 'Moderado'
        },
        {
          nombre: 'Saltimbocca alla romana',
          descripcion:
            'Uno de los grandes clásicos de la cocina romana. Se elabora con filetes finos de ternera, jamón (prosciutto) y salvia, cocinados con vino.\n\nTiene un sabor intenso y muy característico.',
          precio: 'Moderado'
        },
        {
          nombre: 'Polpette al sugo',
          descripcion:
            'Albóndigas de carne en salsa de tomate, hechas con carne picada, pan, huevo y especias.\n\n💡 Importante:\nEn Italia no suelen servirse con pasta, sino como plato independiente.\n\nMuy típicas en trattorias tradicionales.',
          precio: 'Moderado'
        },
        {
          nombre: 'Spritz Aperol',
          descripcion:
            'Uno de los aperitivos más populares de Italia.\n\nSe prepara con Aperol, prosecco y agua con gas, servido con hielo y una rodaja de naranja.\n\nLigero, refrescante y perfecto antes de cenar.',
          foto: 'cld:europa/italia/roma/spritz-aperol',
          precio: 'Moderado'
        },
        {
          nombre: 'Tiramisú',
          descripcion:
            'Uno de los postres italianos más famosos del mundo.\n\nSe elabora con bizcochos empapados en café, crema de mascarpone, huevo, azúcar y cacao.\n\n💡 En Roma es muy común encontrarlo en formato individual para llevar.\n\nCremoso, suave y el final perfecto de cualquier comida.',
          foto: 'cld:europa/italia/roma/tiramisu',
          precio: 'Económico'
        },
        {
          nombre: 'Gelato',
          descripcion:
            'El helado italiano es un imprescindible absoluto en Roma.\n\nTiene una textura más densa y cremosa, y suele elaborarse con ingredientes muy naturales.\n\nSabores como pistacho, avellana o stracciatella son un clásico.',
          foto: 'cld:europa/italia/roma/gelato',
          precio: 'Económico'
        }
      ]
    },
    {
      titulo: 'Dónde comer en Roma',
      lugares: [
        {
          nombre: 'Tonnarello (Trastevere)',
          descripcion:
            'Hablar de Tonnarello es hablar del restaurante más viral y concurrido de Trastevere.\n\nAquí no vienes solo a comer… vienes a vivir el ambiente romano en su máximo nivel.\n\nMesas llenas, camareros corriendo, platos saliendo sin parar y ese caos organizado que hace que todo funcione.\n\n🍝 Qué lo hace especial:\n\nSu nombre viene del “tonnarello”, una pasta fresca al huevo similar al spaghetti pero más gruesa y con forma cuadrada, perfecta para retener la salsa.\n\nLos platos se sirven directamente en sartenes de aluminio, lo que le da ese toque tan característico.\n\n⭐ Imprescindibles:\n\n• Cacio e pepe → su plato estrella, extremadamente cremoso\n• Carbonara → receta tradicional (sin nata, con huevo, pecorino y guanciale crujiente)\n• Polpette → albóndigas muy recomendadas como entrante\n\n💡 Experiencia viajera:\nEs uno de esos lugares donde todo es intenso: el ruido, el ritmo, la comida… y justo por eso es tan memorable.\n\nNo es un restaurante tranquilo, es una experiencia.\n\n⏳ Importante:\n\nNo aceptan reservas.\n\nLas colas son inevitables, sobre todo por la noche, pero avanzan bastante rápido porque el local es grande y tienen varias sedes cercanas.\n\n📍 Sedes:\n\n• Principal → Via della Paglia (junto a Santa Maria in Trastevere)\n• Tonnarello Scala y Calisto → misma zona, ayudan a reducir esperas\n• Tonnarello San Pietro → opción cerca del Vaticano\n\n💡 Consejo AvenTourArte:\n\n• Ve antes de las 19:30 o a mediodía para evitar largas colas\n• Si ves demasiada gente, prueba en alguna de sus otras sedes\n\n⚡ Alternativa directa:\n\nNannarella (en Piazza di S. Calisto)\n\nMismo estilo, mismo tipo de comida y muchas veces con menos espera.\n\n✨ Conclusión:\n\nSi quieres vivir Trastevere de verdad, este es tu sitio.\n\nSi buscas algo tranquilo… mejor otro plan 😄',
          horario:
            'Todos los días: 11:30 – 23:00',
          precio:
            'Presupuesto orientativo: 20€ – 30€ por persona aprox.\nConfirma precios y servicios incluidos con el establecimiento.',
          direccion: 'Tonnarello principal — Via della Paglia 1/2/3, Roma',
          maps: 'https://www.google.com/maps/search/?api=1&query=Tonnarello%20principal%20%E2%80%94%20Via%20della%20Paglia%201%2F2%2F3%2C%20Roma',
          web: 'https://tonnarello.it/',
          acceso: 'Via della Paglia y las sedes siguientes atienden por orden de llegada, sin reservas. Los horarios indicados corresponden a cada local.',
          puntosPracticos: [
            {
              nombre: 'Tonnarello Scala',
              direccion: 'Tonnarello Scala — Piazza della Scala 19–21, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Tonnarello%20Scala%20%E2%80%94%20Piazza%20della%20Scala%2019%E2%80%9321%2C%20Roma',
              web: 'https://tonnarello.it/',
              horario: '11:30–23:00; sin reservas.'
            },
            {
              nombre: 'Tonnarello Calisto',
              direccion: 'Tonnarello Calisto — Piazza San Calisto 10, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Tonnarello%20Calisto%20%E2%80%94%20Piazza%20San%20Calisto%2010%2C%20Roma',
              web: 'https://tonnarello.it/',
              horario: '11:30–23:00; sin reservas.'
            },
            {
              nombre: 'Tonnarello San Pietro',
              direccion: 'Tonnarello San Pietro — Via del Mascherino 80, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Tonnarello%20San%20Pietro%20%E2%80%94%20Via%20del%20Mascherino%2080%2C%20Roma',
              web: 'https://tonnarello.it/',
              horario: '11:30–23:00; sin reservas.'
            }
          ]
        },
        {
          nombre: 'Tavernetta 29 da Tony e Andrea',
          descripcion:
            'Tavernetta 29 da Tony e Andrea es una de esas joyas que no destacan por fuera… pero que te ganan cuando entras.\n\nUbicada en una calle tranquila de Trastevere, es la opción perfecta si buscas una experiencia romana auténtica, familiar y alejada del bullicio de los restaurantes más virales.\n\n🏡 El ambiente:\n\n• Local pequeño, acogedor y rústico\n• Trato cercano y muy humano\n• Sensación de estar comiendo en casa de alguien local\n\nAquí no hay prisas.\n\nAquí se viene a disfrutar.\n\n🍝 Qué comer:\n\n• Carbonara → muy equilibrada y cremosa (de las mejores del barrio)\n• Amatriciana y Gricia → clásicos romanos bien ejecutados\n• Coda alla vaccinara → rabo de toro cocinado a fuego lento\n• Fiori di zucca → flores de calabacín fritas, crujientes y rellenas de mozzarella y anchoas ⭐\n\n💡 Experiencia viajera:\n\nEs el contrapunto perfecto a sitios como Tonnarello.\n\nMenos ruido.\nMás autenticidad.\nMás conexión con la cocina romana real.\n\n🍷 Detalle importante:\n\nEl vino de la casa es sencillo pero muy bien integrado en la experiencia.\n\n👥 Ideal para:\n\n• Cena tranquila\n• Plan en pareja\n• Comer bien sin prisas\n\n📍 Ubicación:\n\nEn Via della Pelliccia, una de las calles más bonitas y menos transitadas de Trastevere.\n\n✨ Consejo AvenTourArte:\n\nSi quieres sentir que estás comiendo en la Roma de verdad… este es tu sitio.',
          horario:
            'Confirma por teléfono el horario y los días de cierre antes de acudir.',
          precio:
            'Presupuesto orientativo: 25€ – 35€ por persona\nConfirma precios y servicios incluidos con el establecimiento.',
          direccion: 'La Tavernetta 29 da Tony e Andrea — Via della Pelliccia 29/A, Roma',
          maps: 'https://www.google.com/maps/search/?api=1&query=La%20Tavernetta%2029%20da%20Tony%20e%20Andrea%20%E2%80%94%20Via%20della%20Pelliccia%2029%2FA%2C%20Roma',
          web: 'https://www.turismoroma.it/it/accoglienza/la-tavernetta-29-da-tony-e-andrea',
          telefono: '+39 331 1173123'
        },
        {
          nombre: 'Pastificio Guerra',
          descripcion:
            'Pastificio Guerra es uno de los lugares más emblemáticos de Roma para comer bien, rápido y por muy poco dinero.\n\nNo es un restaurante.\n\nEs una experiencia.\n\n🏭 El concepto:\n\nUna antigua fábrica de pasta que cada día cocina solo dos platos con pasta fresca.\n\nNada más.\n\n👉 Simple… y espectacular.\n\n🍝 Cómo funciona:\n\n• Solo 2 opciones diarias (según lo que preparen ese día)\n• Pasta recién hecha\n• Te la sirven en bandeja para llevar\n• Puedes añadir pecorino por encima\n\n💡 Ejemplos típicos:\n\n• Carbonara\n• Amatriciana\n• Lasaña\n• Cacio e pepe\n\n🔥 Lo que lo hace único:\n\nCalidad + precio.\n\n👉 Probablemente la mejor relación calidad-precio del centro de Roma.\n\n💡 Experiencia viajera:\n\nAquí comes como un local:\n\n• De pie\n• En la calle\n• Sin complicaciones\n\n⚠️ No hay sitio para sentarse y puede haber cola en horas punta\n\nPero con una pasta brutal.\n\n📍 Ubicación:\n\nA 1 minuto de Plaza de España.\n\nPerfecto para encajarlo en ruta.\n\n👟 Plan típico:\n\nPides tu pasta → te la llevas → y la comes paseando o en una plaza cercana.\n\n🍷 Detalle curioso:\n\nA veces incluyen un pequeño vaso de vino por el mismo precio o con un suplemento mínimo.\n\n✨ Consejo AvenTourArte:\n\nSi quieres comer increíble sin gastar casi nada en pleno centro…\n\neste es uno de los mejores sitios de todo Roma.',
          horario:
            'Confirma directamente con Pastificio Guerra la apertura del día antes de organizar la parada.',
          precio:
            'Presupuesto orientativo: 5€ – 7€ por persona\nConfirma precios y servicios incluidos con el establecimiento.'
        },
        {
          nombre: 'Pastasciutta',
          descripcion:
            'Pastasciutta es una de las mejores opciones en Roma para comer pasta fresca, rápida y barata sin renunciar a calidad.\n\nEs el concepto perfecto de “comida callejera gourmet”.\n\n🍝 El concepto:\n\nPasta artesanal cocinada al momento y servida en envases prácticos.\n\n👉 Como un take-away… pero de pasta italiana real.\n\n🔥 Qué lo hace especial:\n\n• Pasta fresca hecha al momento\n• Cocina visible → ves cómo la preparan\n• Servicio rapidísimo\n• Precios muy económicos\n\n🍴 Qué pedir:\n\nSiempre tienen clásicos romanos:\n\n• Carbonara\n• Amatriciana\n• Cacio e pepe\n\nY además:\n\n• Ragù\n• Pesto\n• Opciones del día\n\n👉 Más variedad que otros sitios similares.\n\n💡 Experiencia viajera:\n\nEste es el típico sitio donde comes bien sin perder tiempo:\n\n• De pie o en barra\n• Para llevar\n• Sin esperas largas\n\nPerfecto para días intensos de turismo.\n\n📍 Ubicaciones clave:\n\n• Vaticano → ideal tras museos\n• Fontana di Trevi → pleno centro\n• Piazza del Popolo / Flaminio → conexión con Borghese\n\n👉 Muy fácil de encajar en cualquier ruta.\n\n👟 Plan típico:\n\nPides tu pasta → te la llevas → y la comes en una plaza cercana.\n\n✨ Consejo AvenTourArte:\n\nSi quieres comer pasta buena, rápida y barata en cualquier momento del día…\n\neste es uno de los mejores comodines de Roma.',
          horario:
            'Los horarios varían por sede: consulta los puntos siguientes.',
          precio:
            'Presupuesto orientativo: 9€ – 11€ por persona\nConfirma precios y servicios incluidos con el establecimiento.',
          web: 'https://www.pastasciuttaroma.it/',
          acceso: 'Las sedes oficiales no aceptan reservas.',
          puntosPracticos: [
            {
              nombre: 'Pastasciutta Vaticano',
              direccion: 'Pastasciutta Vaticano — Via delle Grazie 5, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Pastasciutta%20Vaticano%20%E2%80%94%20Via%20delle%20Grazie%205%2C%20Roma',
              web: 'https://www.pastasciuttaroma.it/',
              telefono: '+39 349 2586793',
              horario: '10:00–22:00; sin reservas.'
            },
            {
              nombre: 'Pastasciutta Trevi',
              direccion: 'Pastasciutta Trevi — Largo Pietro di Brazzà 27, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Pastasciutta%20Trevi%20%E2%80%94%20Largo%20Pietro%20di%20Brazz%C3%A0%2027%2C%20Roma',
              web: 'https://www.pastasciuttaroma.it/',
              telefono: '+39 06 69327108',
              horario: '10:00–22:00; sin reservas.'
            },
            {
              nombre: 'Pastasciutta Flaminio',
              direccion: 'Pastasciutta Flaminio — Piazzale Flaminio 10, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Pastasciutta%20Flaminio%20%E2%80%94%20Piazzale%20Flaminio%2010%2C%20Roma',
              web: 'https://www.pastasciuttaroma.it/',
              telefono: '+39 06 69336353',
              horario: '11:00–22:00; sin reservas.'
            }
          ]
        },
        {
          nombre: 'Pompi',
          descripcion:
            'Pompi es, probablemente, el lugar más famoso de Roma para probar tiramisú.\n\nAquí vienes directamente a por uno de los mejores tiramisús de Roma.\n\n🍰 Qué lo hace especial:\n\nSu tiramisú.\n\nCremoso, equilibrado y con ingredientes de gran calidad:\n\n• Bizcocho savoiardi empapado en café\n• Crema de mascarpone muy suave\n• Cacao puro por encima\n\n👉 Sencillo… pero perfectamente ejecutado.\n\n⭐ Qué pedir:\n\n• Tiramisú clásico → imprescindible\n• Tiramisú de pistacho → más cremoso y con toque salado\n• Tiramisú de fresa → más ligero y refrescante\n\n💡 Experiencia viajera:\n\nEste no es un sitio para sentarse.\n\n👉 Es para coger tu cajita y seguir descubriendo Roma.\n\nUno de esos momentos de viaje que se disfrutan caminando.\n\n📍 Dónde encontrarlo:\n\n• Plaza de España → perfecto en ruta turística\n• Zona Panteón/Navona → ideal si estás en el centro\n• Sede original (Re di Roma) → más local\n\n🥄 Formato:\n\n• Take-away\n• Cajita individual con cuchara incluida\n\n👉 Listo para comer en cualquier sitio.\n\n🍦 Extra:\n\nTambién tienen helados muy buenos, aunque el tiramisú es el protagonista absoluto.\n\n✨ Consejo AvenTourArte:\n\nCómpralo para llevar y disfrútalo caminando.\n\nEste es uno de esos pequeños momentos que hacen el viaje.'
        ,
          horario:
            'Consulta los horarios por sede en los puntos siguientes. Para la referencia de Via de’ Pastini 102, confirma con Pompi la ubicación y apertura antes de desplazarte.'
        ,
          precio:
            'Presupuesto orientativo: 6€ – 8€ por persona\nConfirma precios y servicios incluidos con el establecimiento.',
          web: 'https://barpompi.it/',
          acceso: 'Las sedes tienen direcciones y horarios propios. Para la zona Panteón/Navona, consulta el listado vigente del gestor; no presupongas que Via de’ Pastini 102 sigue siendo una sede disponible.',
          puntosPracticos: [
            {
              nombre: 'Pompi Plaza de España',
              direccion: 'Pompi Spagna — Via della Croce 88, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Pompi%20Spagna%20%E2%80%94%20Via%20della%20Croce%2088%2C%20Roma',
              web: 'https://barpompi.it/pompi-roma-via-della-croce/',
              telefono: '+39 06 24304431',
              horario: 'Domingo–jueves 10:00–22:00; viernes y sábado 10:00–22:30.'
            },
            {
              nombre: 'Pompi Albalonga — Re di Roma',
              direccion: 'Pompi Albalonga — Via Albalonga 7b, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Pompi%20Albalonga%20%E2%80%94%20Via%20Albalonga%207b%2C%20Roma',
              web: 'https://barpompi.it/pompi-roma-via-albalonga/',
              telefono: '+39 06 96006237',
              horario: 'Domingo–jueves 07:00–00:00; viernes y sábado 07:00–01:00.'
            }
          ]
        },
        {
          nombre: 'Ba’Ghetto y Su Ghetto (Barrio Judío)',
          descripcion:
            'En el Gueto Judío de Roma, comer aquí no es solo una cuestión gastronómica… es entender una parte muy auténtica y diferente de la ciudad.\n\nEl nombre de referencia es Ba’Ghetto (junto a su restaurante hermano Su Ghetto), donde podrás descubrir la cocina judeo-romana, una tradición única con siglos de historia.\n\n💡 Importante antes de ir:\n\nEstos restaurantes siguen las normas kosher, lo que significa que se dividen en locales de carne y locales de lácteos (no se mezclan).\n\n🍽️ Opciones principales:\n\n🥩 Ba’Ghetto (Carne)\n\nEl más famoso y el más tradicional.\n\nAquí es donde tienes que venir si quieres probar la esencia del barrio.\n\n⭐ Imprescindibles:\n• Carciofi alla giudia → alcachofa frita, crujiente como una flor (de lo mejor de Roma)\n• Carbonara kosher → versión sin cerdo, usando carne seca de buey\n• Couscous → influencia norteafricana con cordero y verduras\n\n🥛 Ba’Ghetto Milky (Lácteos)\n\nSi prefieres algo más ligero o con queso.\n\nAquí no sirven carne.\n\n• Pastas con pecorino\n• Pizzas artesanales\n• Pescados\n• Postres tradicionales\n\n🍷 Su Ghetto Kosher Restaurant\n\nUna opción más tranquila e íntima, también centrada en la cocina tradicional.\n\nPerfecto si buscas una experiencia más relajada dentro del mismo barrio.\n\n💡 Consejos AvenTourArte:\n\n• Reserva si puedes, sobre todo en Ba’Ghetto (Carne)\n• Mejor ir entre semana o pronto para evitar esperas\n\n📍 Ubicación:\n\nTodos están en Via del Portico d’Ottavia, frente a los restos del antiguo Pórtico.\n\nCenar en terraza aquí, rodeado de historia, es una experiencia top.',
          horario:
            'Consulta el calendario de cada local, especialmente durante Shabbat y festividades judías.',
          precio:
            'Presupuesto orientativo: 20€ – 35€ por persona aprox.\nConfirma precios y servicios incluidos con el establecimiento.',
          web: 'https://www.baghetto.com/contatti-ristorante-kosher/',
          acceso: 'Cada restaurante tiene contacto propio. El menú prepagado de Shabbat de Ba’Ghetto Roma es un producto diferente de una reserva ordinaria; no presupongas el mismo cierre o servicio en las tres sedes.',
          puntosPracticos: [
            {
              nombre: 'Ba’Ghetto Roma — Carne',
              direccion: 'Ba’Ghetto Roma — Via del Portico d’Ottavia 57, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Ba%E2%80%99Ghetto%20Roma%20%E2%80%94%20Via%20del%20Portico%20d%E2%80%99Ottavia%2057%2C%20Roma',
              web: 'https://www.baghetto.com/contatti-ristorante-kosher/',
              telefono: '+39 06 68892868',
              acceso: 'Consulta mesa y servicio con esta sede; el portal oficial distingue experiencias y puede exigir verificación antes de mostrarlas.'
            },
            {
              nombre: 'Ba’Ghetto Milky Roma',
              direccion: 'Ba’Ghetto Milky — Via del Portico d’Ottavia 2/A, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Ba%E2%80%99Ghetto%20Milky%20%E2%80%94%20Via%20del%20Portico%20d%E2%80%99Ottavia%202%2FA%2C%20Roma',
              web: 'https://www.baghetto.com/contatti-ristorante-kosher/',
              telefono: '+39 06 68300077',
              reserva: 'https://baghettomilky.superbexperience.com/reserve/guests',
              tipoReserva: 'mesa',
              acceso: 'Reserva de mesa específica de Milky; confirma el servicio y las condiciones de la fecha elegida.'
            },
            {
              nombre: 'Su Ghetto Roma',
              direccion: 'Su Ghetto — Via del Portico d’Ottavia 1/C, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Su%20Ghetto%20%E2%80%94%20Via%20del%20Portico%20d%E2%80%99Ottavia%201%2FC%2C%20Roma',
              web: 'https://www.baghetto.com/contatti-ristorante-kosher/',
              telefono: '+39 06 68805605',
              acceso: 'Consulta disponibilidad de mesa directamente con Su Ghetto; no uses el producto de otro restaurante.'
            }
          ]
        },
        {
          nombre: 'Da Baffetto (Centro histórico)',
          descripcion:
            'Si hablamos de pizza romana auténtica, Da Baffetto es uno de los nombres más legendarios de la ciudad.\n\nAquí no hay decoración cuidada ni experiencia tranquila.\n\nHay mesas compartidas, ruido, camareros que van a mil… y pizzas que salen sin parar.\n\nY eso es exactamente lo que lo hace especial.\n\n🍕 Qué lo hace diferente:\n\nSu pizza es estilo romano puro: extremadamente fina, crujiente y ligera.\n\nEse tipo de masa que hace “crack” al morder.\n\n⭐ Imprescindibles:\n\n• Pizza Baffetto → tomate, mozzarella, champiñones, salchicha, alcachofas, pimientos, cebolla y huevo\n• Margherita → simple, pero perfecta\n• Capricciosa → otro clásico muy completo\n\n💡 Experiencia viajera:\n\nAquí no vienes a relajarte.\n\nVienes a vivir una pizzería romana de verdad.\n\nMesas compartidas, ritmo rápido y ese punto de caos que forma parte del encanto.\n\n💡 Importante:\n\nEl servicio es muy rápido (a veces brusco), pero es parte del estilo del sitio.\n\n⏳ Organización clave:\n\n• Confirma directamente las condiciones de mesa\n• Puede haber cola en horas punta\n\n💡 Consejo PRO:\n\nConfirma la apertura del turno de cena antes de acercarte; la espera depende de la afluencia.\n\n📍 Alternativa directa:\n\nBaffetto 2 es otro establecimiento: comprueba su ubicación y condiciones propias antes de elegirlo como alternativa.\n\n💸 Precio:\n\nMuy razonable para estar en pleno centro de Roma.\n\n✨ Consejo AvenTourArte:\n\nEste no es un sitio para todos.\n\nPero si quieres probar una pizza romana auténtica en un lugar con historia… merece totalmente la pena.',
          horario:
            'Confirma directamente con Da Baffetto el horario y las condiciones de mesa antes de acudir.',
          precio:
            'Presupuesto orientativo: 20€ – 25€ por persona\nConfirma precios y servicios incluidos con el establecimiento.',
          acceso: 'Da Baffetto y Baffetto 2 son establecimientos distintos; confirma la sede antes de organizar la visita.'
        },
        {
          nombre: 'Cantina e Cucina (Centro histórico)',
          descripcion:
            'Si buscas un sitio acogedor, con buen trato y comida muy bien hecha en pleno centro de Roma, Cantina e Cucina es una apuesta segura.\n\nEstá ubicado en una de las calles más bonitas cerca de Piazza Navona, y desde que entras notas la diferencia:\n\nAmbiente cálido, decoración rústica y un servicio que cuida mucho al cliente.\n\n🍷 Qué lo hace especial:\n\nAquí la experiencia es más relajada y cuidada que en otros sitios del centro.\n\nIncluso es habitual que te ofrezcan una copa de prosecco mientras esperas en la cola.\n\n⭐ Imprescindibles:\n\n• Carbonara → muy cremosa, con guanciale crujiente\n• Polpette → albóndigas caseras con salsa de tomate\n• Focaccia → perfecta como entrante para compartir\n\nTambién encontrarás:\n\n• Pastas clásicas (amatriciana, gricia…)\n• Pizzas y focaccias\n• Tablas de embutidos\n\n💡 Experiencia viajera:\n\nAquí vienes a sentarte, disfrutar sin prisas y comer bien.\n\nEs el contrapunto perfecto a sitios más caóticos como Da Baffetto.\n\n⏳ Importante:\n\n• Consulta con el local las condiciones de mesa\n• Suele haber cola, especialmente por la noche\n\n💡 Diferencia clave:\n\nAunque tengas que esperar, el trato es mucho más amable y organizado.\n\n📍 Ubicación:\n\nVia del Governo Vecchio, una de las calles con más encanto del centro, perfecta para pasear antes o después de comer.\n\n💡 Consejo AvenTourArte:\n\nIdeal para:\n\n• Cena tranquila en el centro\n• Última comida del viaje\n• Plan más relajado sin renunciar a buena comida\n\n✨ Conclusión:\n\nSi quieres comer muy bien en el centro, con buen ambiente y sin el caos de otros sitios… este es tu sitio.',
          horario:
            'Todos los días: 11:00 – 23:30 (cocina ininterrumpida)',
          precio:
            'Presupuesto orientativo: 25€ – 35€ por persona\nConfirma precios y servicios incluidos con el establecimiento.',
          direccion: 'Cantina e Cucina — Via del Governo Vecchio 87, Roma',
          maps: 'https://www.google.com/maps/search/?api=1&query=Cantina%20e%20Cucina%20%E2%80%94%20Via%20del%20Governo%20Vecchio%2087%2C%20Roma',
          web: 'https://cantinaecucina.it/',
          acceso: 'Consulta con el local la disponibilidad y las condiciones de mesa.'
        },
        {
          nombre: 'Forno da Milvio (Monti)',
          descripcion:
            'Si buscas un bocado rápido, auténtico y de calidad en pleno centro de Roma, este es uno de esos sitios que no fallan.\n\nUbicado en el barrio de Monti, entre el Coliseo y Via Nazionale, Forno da Milvio es una parada perfecta para comer bien sin perder tiempo.\n\nAquí no vienes a sentarte… vienes a comer como un romano.\n\n🍕 Qué lo hace especial:\n\nEs un horno tradicional especializado en pizza al taglio (al corte) y productos de panadería.\n\nVes las bandejas, eliges lo que quieres, te lo cortan al peso… y listo.\n\n⭐ Imprescindibles:\n\n• Pizza al taglio → base crujiente por fuera y esponjosa por dentro\n  – Patata y romero (top)\n  – Margarita (clásico que nunca falla)\n\n• Supplì → croqueta de arroz con mozzarella fundida\n\n• Dulces artesanales → galletas y productos típicos para llevar\n\n💡 Experiencia viajera:\n\nEste es el típico sitio que no parece nada especial… hasta que pruebas la comida.\n\nRápido, barato y auténtico.\n\n💡 El plan perfecto:\n\nCompra varios trozos de pizza + un supplì\n\ny vete andando a la Piazza della Madonna dei Monti.\n\nAhí, en los escalones de la fuente, es donde realmente ocurre la experiencia:\n\nGente local, ambiente relajado y uno de los rincones más vivos del barrio.\n\n💡 Consejo AvenTourArte:\n\n• Ideal entre visitas (no pierdes tiempo)\n• Perfecto para comer sin gastar mucho\n• Mejor probar varias pizzas en lugar de solo una\n\n✨ Conclusión:\n\nNo es un restaurante… es una parada.\n\nY de las mejores que puedes hacer en Roma.',
          horario:
            'Confirma directamente con Forno da Milvio el horario y la dirección antes de acudir.',
          precio:
            'Presupuesto orientativo: 5€ – 10€ por persona aprox. (según cantidad)\nConfirma precios y servicios incluidos con el establecimiento.'
        },
        {
          nombre: 'Osteria degli Ubertini (Pigneto)',
          descripcion:
            'Si quieres salirte completamente del circuito turístico y descubrir la Roma más auténtica, este es uno de esos sitios que marcan el viaje.\n\nUbicada en el barrio de Pigneto, una zona alternativa y mucho menos turística que el centro, esta osteria es el tipo de lugar donde comen los romanos de verdad.\n\nAquí no hay postureo.\n\nHay comida casera, ambiente ruidoso y mesas llenas de gente local.\n\n🍝 Qué lo hace especial:\n\nEs una taberna tradicional donde el menú cambia cada día según lo que compran en el mercado.\n\nNo hay carta fija.\n\nLo que hay… es lo que se come.\n\n⭐ Qué puedes encontrar:\n\n• Pastas romanas clásicas → carbonara, amatriciana, gricia\n• Platos de cuchara → como pasta e fagioli\n• Carnes tradicionales → polpette, cordero (abbacchio), tripa a la romana\n\n🍷 Vino:\n\nSe sirve en jarras (fogliette), sencillo pero perfecto para acompañar la comida.\n\n💸 Relación calidad-precio:\n\nDe las mejores de Roma.\n\nAquí comes increíble por mucho menos que en el centro.\n\n⏱️ Consejo clave:\n\n• Reserva si puedes → siempre está lleno de gente local\n• Ideal para comida (menú del día brutal)\n\n🍽️ Menú de mediodía:\n\nEntre semana puedes comer un menú completo (primero, segundo, guarnición, agua y café) por un precio muy difícil de encontrar en Roma.\n\n✨ Consejo AvenTourArte:\n\nEste sitio no es para todos.\n\nPero si quieres vivir Roma más allá del centro… es imprescindible.',
          horario:
            'Confirma directamente con Osteria degli Ubertini los turnos de comida, cena y días de cierre.',
          precio:
            'Presupuesto orientativo: Menú mediodía: 12€ – 15€\nCena: 20€ – 25€ por persona aprox.\nConfirma precios y servicios incluidos con el establecimiento.'
        },
        {
          nombre: 'Bono Bottega Nostrana',
          descripcion:
            'Bono Bottega Nostrana es una de las mejores opciones de street food en Roma si buscas comer rápido, pero con producto de altísima calidad.\n\nAquí no vienes a cualquier bocadillo.\n\nVienes a un panino gourmet.\n\n🥪 Qué lo hace especial:\n\nTrabajan con ingredientes seleccionados de distintas regiones de Italia:\n\n• Porchetta de Ariccia\n• Quesos curados con denominación de origen\n• Embutidos italianos de alta calidad\n• Trufa y productos premium\n\nTodo servido en un pan crujiente por fuera y tierno por dentro que marca la diferencia.\n\n⭐ Qué pedir:\n\n• Panino gourmet → la opción estrella\n• Taglieri → tablas de embutidos y quesos para compartir\n• Pizza blanca rellena → muy típica y diferente\n\n💡 Experiencia viajera:\n\nEs el típico sitio donde comes rápido… pero comes MUY bien.\n\nPerfecto para no perder tiempo sin renunciar a calidad.\n\n⚡ Concepto:\n\n• Comer de pie o en taburete\n• Servicio rápido\n• Ambiente informal pero muy cuidado\n\n📍 Ubicaciones clave:\n\n• San Pietro → ideal si estás por el Vaticano\n• Piazza di Spagna → perfecto en ruta por el centro\n\n⏳ Horario amplio:\n\nConsulta la apertura y el servicio de cocina de la sede San Pietro antes de organizar una comida temprana o tardía.\n\n💡 Consejo viajero:\n\nSi está lleno, pídelo para llevar y cómetelo en una plaza cercana.\n\n👉 Plan perfecto y muy romano.\n\n✨ Consejo AvenTourArte:\n\nIdeal para:\n\n• Comida rápida entre visitas\n• Plan improvisado sin perder calidad\n• Días intensos donde no quieres parar mucho tiempo',
          horario:
            'Consulta la apertura y el servicio de cocina de la sede elegida antes de organizar una comida tardía.',
          precio:
            'Presupuesto orientativo: 12€ – 18€ por persona\nConfirma precios y servicios incluidos con el establecimiento.',
          web: 'https://www.botteganostrana.com/contatti/',
          acceso: 'Los contactos corresponden a locales distintos; consulta disponibilidad de mesa directamente con cada sede.',
          puntosPracticos: [
            {
              nombre: 'Bono San Pietro',
              direccion: 'Bono San Pietro — Via di Porta Cavalleggeri 109/111, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Bono%20San%20Pietro%20%E2%80%94%20Via%20di%20Porta%20Cavalleggeri%20109%2F111%2C%20Roma',
              web: 'https://www.botteganostrana.com/contatti/',
              telefono: '+39 06 89236830'
            },
            {
              nombre: 'Bono Spagna',
              direccion: 'Bono Spagna — Largo della Fontanella di Borghese 85, Roma',
              maps: 'https://www.google.com/maps/search/?api=1&query=Bono%20Spagna%20%E2%80%94%20Largo%20della%20Fontanella%20di%20Borghese%2085%2C%20Roma',
              web: 'https://www.botteganostrana.com/contatti/',
              telefono: '+39 351 7111955'
            }
          ]
        },
        {
          nombre: 'La Base',
          descripcion:
            'La Base es uno de esos lugares que no parecen imprescindibles… hasta que lo necesitas.\n\nY entonces se convierte en oro.\n\nUbicado en el barrio de Monti, muy cerca del Coliseo, es uno de los pocos restaurantes del centro de Roma con servicio de comida hasta tarde; confirma la apertura de cocina para la fecha de tu visita.\n\n🕒 Lo que lo hace único:\n\nSu horario.\n\n👉 El horario de cocina y el de sala son distintos.\n\nSi quieres cenar tras ver el Coliseo de noche o salir a tomar algo, consulta antes hasta qué hora se aceptan pedidos.\n\n🍝 Qué comer:\n\n• Pastas clásicas → carbonara, amatriciana, lasaña\n• Calzones → uno de sus puntos fuertes, grandes y muy contundentes\n• Pizzas → estilo romano, finas y crujientes\n• Hamburguesas → opción alternativa si quieres variar\n\n💡 Experiencia viajera:\n\nNo es un restaurante “romántico” ni gourmet.\n\nEs un sitio práctico, animado y muy útil.\n\nEl típico lugar donde terminas un día largo… o alargas la noche.\n\n🎧 Ambiente:\n\n• Decoración ecléctica con luces de neón y objetos retro\n• Ambiente joven, ruidoso y desenfadado\n• Servicio rápido y sin complicaciones\n\n👥 Ideal para:\n\n• Grupos de amigos\n• Cenas tardías\n• Planes improvisados\n\n📍 Ubicación:\n\nEn Via Cavour, una de las arterias que conecta directamente con los Foros y el Coliseo.\n\nMuy fácil de encajar en cualquier momento del viaje.\n\n✨ Consejo AvenTourArte:\n\nEste es tu “plan B” perfecto en Roma.\n\nPara una cena tardía, confirma antes el servicio de cocina.',
          horario:
            'Consulta con el local la hora de cierre de cocina y de sala; son horarios distintos.',
          precio:
            'Presupuesto orientativo: 22€ – 30€ por persona\nConfirma precios y servicios incluidos con el establecimiento.',
          direccion: 'La Base — Via Cavour 268/270/272, Roma',
          maps: 'https://www.google.com/maps/search/?api=1&query=La%20Base%20%E2%80%94%20Via%20Cavour%20268%2F270%2F272%2C%20Roma',
          web: 'https://www.labaseristorante.it/',
          acceso: 'Para cenar de madrugada, confirma que la cocina siga atendiendo antes de desplazarte.'
        },
        {
          nombre: 'La Fraschetta der Panino',
          descripcion:
            'La Fraschetta der Panino es uno de esos sitios que representan la esencia más sencilla y auténtica de Roma.\n\nUbicado en el barrio de Monti, muy cerca del Coliseo, es el lugar perfecto para comer rápido, barato y con producto local de verdad.\n\n🏡 El concepto:\n\nEstá inspirado en las antiguas “fraschette”, tabernas típicas de los Castelli Romani donde se servía vino y comida sencilla.\n\nAquí todo gira en torno al producto.\n\nSin complicaciones.\n\n🥪 Qué comer:\n\n• Panino con porchetta ⭐ → su gran especialidad\n• Embutidos y quesos locales → producto del Lazio\n• Lasaña o pasta del día → opción caliente y económica\n• Taglieri → tablas para compartir\n\n🔥 La estrella:\n\nLa porchetta.\n\nCerdo asado lentamente con hierbas, jugoso por dentro y crujiente por fuera, servido en pan rústico.\n\n👉 Simple… y brutal.\n\n🍷 Acompañamiento típico:\n\nVino de los Castelli Romani, servido de forma sencilla, como manda la tradición.\n\n💡 Experiencia viajera:\n\nEste es el típico sitio donde comes como un local:\n\n• Rápido\n• Barato\n• Sin postureo\n\nPero con mucho sabor.\n\n📍 Ubicación:\n\nEn Via Cavour, muy cerca del Coliseo y en la misma zona que La Base.\n\nPerfecto para encajarlo entre visitas.\n\n👟 Plan típico:\n\nPides tu panino → te lo llevas → y te lo comes caminando o en alguna plaza cercana.\n\n✨ Consejo AvenTourArte:\n\nSi quieres probar la Roma más auténtica sin gastar casi nada… este es tu sitio.',
          horario:
            'Confirma directamente con La Fraschetta der Panino la dirección y la apertura del día.',
          precio:
            'Presupuesto orientativo: 10€ – 15€ por persona\nConfirma precios y servicios incluidos con el establecimiento.'
        },
        {
          nombre: 'Pinsere',
          descripcion:
            'Pinsere es una parada obligatoria en Roma si quieres probar la auténtica pinsa romana, una variante de la pizza tradicional mucho más ligera, crujiente y digestiva.\n\nAquí no vienes solo a comer… vienes a probar algo diferente.\n\n🍕 ¿Qué es la pinsa?\n\nA diferencia de la pizza:\n\n• Forma ovalada\n• Masa más aireada y ligera\n• Mezcla de harinas (trigo, arroz y soja)\n• Fermentación larga → más digestiva\n\n👉 Resultado: crujiente por fuera, esponjosa por dentro y mucho más ligera.\n\n🥇 Qué lo hace especial:\n\nLa calidad de la masa.\n\nEs el motivo por el que este sitio se ha hecho tan famoso entre locales y viajeros.\n\n🍴 Qué pedir:\n\n• Pinsas clásicas → margherita, básicas pero muy bien ejecutadas\n• Pinsas gourmet → con trufa, quesos, flores de calabacín o embutidos\n\n💡 Consejo PRO:\n\nSi vas con alguien, pide dos distintas y comparte.\n\n👉 Es la mejor forma de probar más sabores.\n\n💡 Experiencia viajera:\n\nEste es un sitio de street food auténtico:\n\n• Comes de pie o en mesas altas\n• Servicio rápido\n• Ambiente dinámico (muy de trabajadores locales)\n\n📍 Ubicación:\n\nCerca de Termini y la zona de Via Veneto.\n\nPerfecto si estás en esa zona o como comida rápida entre visitas.\n\n⏳ Importante:\n\n• Solo abre entre semana\n• Hora punta fuerte (13:00 – 14:00)\n\n✨ Consejo AvenTourArte:\n\nSi quieres probar algo diferente a la pizza clásica… este sitio es un acierto seguro.',
          horario:
            'Cerrado sábados y domingos. Confirma por teléfono las horas de apertura entre semana.',
          precio:
            'Presupuesto orientativo: 10€ – 12€ por persona\nConfirma precios y servicios incluidos con el establecimiento.',
          direccion: 'Pinsere — Via Flavia 98, Roma',
          maps: 'https://www.google.com/maps/search/?api=1&query=Pinsere%20%E2%80%94%20Via%20Flavia%2098%2C%20Roma',
          web: 'https://www.turismoroma.it/en/node/130651',
          telefono: '+39 06 42020924'
        },
        {
          nombre: 'Momart Café',
          descripcion:
            'Momart Café es uno de los sitios más conocidos de Roma para vivir el auténtico “apericena”, una de las experiencias sociales más típicas de la ciudad.\n\nAquí no vienes solo a cenar.\n\nVienes a empezar la noche.\n\n🍸 ¿Qué es el apericena?\n\nUn concepto muy italiano:\n\n• Pides una bebida\n• Y tienes acceso a un buffet muy completo\n\n👉 Tan abundante que puede sustituir perfectamente a una cena.\n\n🔥 Qué lo hace especial:\n\nSu buffet.\n\nMucho más cuidado que la media:\n\n• Pizzas recién hechas en horno de leña\n• Pastas\n• Platos calientes\n• Ensaladas\n• Postres\n\n👉 Calidad alta para ser formato buffet.\n\n🍹 Bebidas:\n\n• Cócteles bien preparados\n• Spritz, vinos y combinados\n\n💡 Experiencia viajera:\n\nEste sitio representa la Roma moderna:\n\n• Ambiente joven y animado\n• Música, movimiento y gente local\n• Perfecto para socializar\n\n🌆 Cuándo ir:\n\nEl aperitivo se ofrece de 18:00 a 22:30; consulta las condiciones del servicio.\n\n👉 Es el momento clave.\n\n👥 Ideal para:\n\n• Plan con amigos\n• Empezar la noche\n• Cenas informales con ambiente\n\n📍 Ubicación:\n\nZona Nomentana / Piazza Bologna, fuera del centro turístico.\n\n👉 Más local, menos turístico.\n\n✨ Consejo AvenTourArte:\n\nSi quieres vivir Roma como un local joven…\n\neste plan es imprescindible al menos una noche.',
          horario:
            'Restaurante: domingo–jueves 12:00–01:00; viernes y sábado 12:00–01:30. Pizzería: domingo–jueves 12:00–01:30; viernes y sábado 12:00–02:30. Aperitivo: todos los días 18:00–22:30.',
          precio:
            'Presupuesto orientativo: 20€ – 25€ por persona (apericena con bebida)\nConfirma precios y servicios incluidos con el establecimiento.',
          direccion: 'Momart Café — Viale XXI Aprile 19, Roma',
          maps: 'https://www.google.com/maps/search/?api=1&query=Momart%20Caf%C3%A9%20%E2%80%94%20Viale%20XXI%20Aprile%2019%2C%20Roma',
          web: 'https://www.momartcafe.it/contatti',
          telefono: '+39 06 86391656',
          acceso: 'Consulta y reserva el servicio concreto: restaurante, pizzería o aperitivo tienen franjas diferentes.'
        },
        {
          nombre: 'Gelateria Giolitti',
          descripcion:
            'Giolitti es una de las heladerías históricas más conocidas de Roma; su historia comenzó en 1890 como lechería.\n\nNo es solo un sitio para comer helado.\n\nEs parte de la historia de la ciudad.\n\n🏛️ El lugar:\n\n• Decoración clásica y elegante\n• Camareros con uniforme tradicional\n• Ambiente caótico pero auténtico\n\n👉 Aquí se mezcla tradición + ritmo romano real.\n\n🍦 Qué lo hace especial:\n\nLa calidad del gelato.\n\nTextura cremosa, sabores intensos y una elaboración muy cuidada.\n\n⭐ Sabores imprescindibles:\n\n• Pistacho → uno de los mejores de Roma\n• Riso → sabor tipo arroz con leche, muy original\n• Sabores de fruta → muy frescos y naturales\n\n🔥 Detalle clave:\n\nLa “panna” (nata montada).\n\n👉 Cremosa, casera y gratuita o con suplemento mínimo.\n\n💡 Cómo pedir (muy importante):\n\n1. Pagas primero en caja (Cassa)\n2. Te dan un ticket\n3. Vas al mostrador\n4. Pides sabores\n\n👉 Si no lo sabes, te lías seguro 😅\n\n💡 Experiencia viajera:\n\nAquí tienes dos formas de vivirlo:\n\n• Take-away → rápido, barato y perfecto para seguir la ruta\n• Sentado → más caro, pero experiencia elegante\n\n📍 Ubicación:\n\nMuy cerca del Panteón, en pleno centro histórico.\n\n👉 Ideal para encajar en cualquier momento del día.\n\n🍰 Extra:\n\nTambién tienen pastelería tradicional italiana muy buena.\n\n✨ Consejo AvenTourArte:\n\nPídelo para llevar y disfrútalo caminando.\n\nEs uno de esos pequeños placeres que hacen Roma especial.',
          horario:
            'Todos los días: 07:30 – 00:00',
          precio:
            'Presupuesto orientativo: 4€ – 6€ por persona\nConfirma precios y servicios incluidos con el establecimiento.',
          direccion: 'Giolitti — Via degli Uffici del Vicario 40, Roma',
          maps: 'https://www.google.com/maps/search/?api=1&query=Giolitti%20%E2%80%94%20Via%20degli%20Uffici%20del%20Vicario%2040%2C%20Roma',
          web: 'https://www.giolitti.it/il-locale/',
          telefono: '+39 06 6991243'
        }
      ]
    },
    {
      titulo: 'Consejos prácticos',
      contenido:
        'Roma se disfruta muchísimo caminando, pero precisamente por eso conviene organizar cada día por zonas y no intentar abarcar demasiado de golpe. La ciudad está llena de historia, detalles y paradas que apetece improvisar, así que dejar algo de margen en la ruta también forma parte de disfrutarla.\n\nAlgunas visitas clave como los Museos Vaticanos, la Galleria Borghese o el Coliseo suelen requerir reserva previa o tienen mucha afluencia, por lo que planificar con antelación te ahorrará colas, tiempo y bastante energía.\n\nTambién merece mucho la pena alternar monumentos, paseos y paradas gastronómicas. Roma no se disfruta solo viendo cosas: también se vive sentándote en una plaza, comiendo algo al paso, parando a por un helado o dejándote sorprender por una iglesia, una calle o un rincón inesperado.\n\n💡 Consejo AvenTourArte:\nNo intentes correr Roma. Es una ciudad para saborearla.'
    }
  ]
};
