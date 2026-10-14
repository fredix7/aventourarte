# Revisión previa a publicación · Jerez y compartir guías

Fecha: 14 de octubre de 2026. Rama: `developer`. Base de revisión: `8d13001` y cambios locales; no se ha creado commit, subido la rama ni publicado.

La entrega está preparada técnicamente para revisión de aceptación. Todavía necesita prueba en móvil real, revisión visual y comprobación de producción tras publicar. No debe confundirse con el cierre completo de Jerez.

## Alcance y estados de Notion

Se consultaron todos los registros de Tareas AvenTourArte en En curso, En revisión o Bloqueado, y de Guías y destinos en En ampliación, En redacción o En revisión. Las consultas no tenían más resultados.

| Registro | Estado final | Motivo |
| --- | --- | --- |
| [AVA-50 · Compartir una guía](https://www.notion.so/3c6ab8fef67c8195bcb6c430df1ff692) | En revisión | Implementación y pruebas terminadas; pendiente de móvil y publicación. |
| [AVA-66 · Actualizar Jerez](https://www.notion.so/3f0ab8fef67c810787a5e8e3418eb7e2) | En revisión | Ciclo incremental preparado, sin dar por hechas nuevas visitas, pruebas o fotos. |
| [Jerez de la Frontera](https://www.notion.so/3a7ab8fef67c81199861dfa0ab7db305) | En ampliación | Conserva 53 fotografías específicas pendientes y posteriores experiencias personales. |
| [Nueva York](https://www.notion.so/3a7ab8fef67c810bbe7dc825f54828ee) | Planificada | Recuperación aplazada; no hay guía registrada en la copia actual. |
| [Río de Janeiro](https://www.notion.so/3a7ab8fef67c815ebe41c84cf273386f) | Planificada | Fichero legacy excluido del registro actual; recuperación aplazada. |

## Correcciones realizadas

- La reserva de la Real Escuela usaba `https://www.ventas.realescuela.org/`, que falló por certificado caducado. La [venta oficial sin www](https://ventas.realescuela.org/) responde HTTP 200.
- La web del Centro Andaluz de Documentación del Flamenco no pudo verificarse por su cadena de certificados. Se sustituyó por la [ficha institucional de la Junta](https://www.juntadeandalucia.es/organismos/culturapatrimoniohistoricoydeporte/servicios/directorio-instituciones/detalle/3763.html), que responde HTTP 200 y contiene la información de acceso y contacto.
- Se eliminaron tres espacios al final de líneas en Jerez. `git diff --check` queda limpio.
- Se añadió una prueba de regresión para el cambio ya presente en alérgenos: una receta con lista de alérgenos pero sin estado explícito completo permanece incierta y no se declara compatible.
- Se actualizaron las cifras antiguas de Notion y los estados que mantenían como activos los destinos aplazados.

## Validación

- Suite completa: **104/104 pruebas correctas**. Comando: `npm.cmd test -- --watch=false --browsers=ChromeHeadless`.
- Producción: `npm.cmd run build:pages` correcto; **16 rutas** y fallback de GitHub Pages generados.
- Aviso no bloqueante: paquete inicial **3,98 MB** frente al presupuesto orientativo de **3 MB**. No se ha ampliado el alcance a una optimización global.
- Jerez: **103/103 fichas completas**, **82/82 fichas prácticas completas**, **165/165 enlaces con formato válido**, **21/21 platos con perfil de alérgenos**, **0 errores estructurales**.
- Fotografías de Jerez: **19 fichas con foto específica**, **53 con portada provisional**, **0 sin referencia asignada**; **31 fichas de restaurantes o eventos** no requieren foto según el auditor.
- Las **30 referencias únicas de Cloudinary** de Jerez responden. Esto no acredita derechos de uso ni fotografías definitivas.
- Comprobación remota inicial: **90 enlaces web/reserva y 30 imágenes**. 116 respuestas correctas y cuatro incidencias. Dos corregidas y verificadas; Álvaro Domecq devolvió 403 al comprobador pero su página respondió con la herramienta web. Grupo Estévez sigue pendiente de verificación manual por cadena de certificados.
- La validez sintáctica de enlaces y los campos prácticos completos no son una verificación exhaustiva de cada precio, horario o contenido histórico.

## Pendiente antes del cierre de aceptación

- Probar compartir en móvil real, elegir una aplicación y abrir el enlace recibido; probar cancelación y copia.
- Revisar la cabecera y el contenido en móvil/escritorio, con teclado y lector de pantalla. No hay navegador conectado a la sesión para acreditar esta revisión visual.
- Comprobar en navegador el [enlace oficial de Grupo Estévez](https://www.grupoestevez.com/visitas/). La herramienta de red falló con `UNABLE_TO_VERIFY_LEAF_SIGNATURE`; no demuestra por sí sola que todos los navegadores lo rechacen.
- Tras publicar, comprobar Jerez y las rutas directas de las otras guías. Cerrar AVA-50 y AVA-66 únicamente cuando se haya aceptado la entrega.

## Pendientes que no bloquean este ciclo

- Las 53 fotografías específicas se enumeran abajo; la imagen de portada actual es provisional.
- Nuevas visitas y pruebas gastronómicas no se han declarado completadas. La base Experiencias pendientes no devolvió registros asociados a Jerez; no se ha inferido un avance personal individual.
- El parche de lectura móvil de las 21 descripciones de Gastronomía está expresamente diferido en AVA-66. No se ha reabierto la auditoría factual ni cambiado sus perfiles alimentarios.
- AVA-8, cierre de Jerez como guía de demostración, sigue fuera de este cierre incremental.
- Nueva York y Río quedan fuera del registro publicable. Un HTTP 200 de una revisión antigua no acredita que hoy se renderice una guía válida.
- La auditoría general de las 16 guías revela carencias editoriales previas en ocho guías fuera de este ciclo; no se han presentado como resueltas ni corregido en bloque.

## Fotografías específicas pendientes en Jerez

- Iglesia de San Lucas · Real Santuario Diocesano
- Palacio de Campo Real
- Bodegas Fundador
- Plaza del Arroyo, Palacio Bertemati y Puerta del Arroyo
- Bodegas Tío Pepe · González Byass
- Alcázar de Jerez
- Antiguo Convento de San Agustín · Centro de Negocios
- Palacio del Virrey Laserna
- Bodegas Álvaro Domecq
- Estación de Ferrocarril de Jerez
- Bodegas Lustau
- Plaza de Toros de Jerez
- Museo del Belén de Jerez
- Palacio Domecq
- Palacio del Tiempo · Museos de la Atalaya
- Murallas medievales de Jerez · Calle Ancha y Calle Muro
- Iglesia de San Mateo
- Bodegas Tradición · Colección Joaquín Rivero
- Plaza del Mercado y Palacio Riquelme
- Museo Arqueológico Municipal de Jerez
- Iglesia de San Juan de los Caballeros
- Palacio Pemartín · Centro Andaluz de Documentación del Flamenco
- Iglesia de San Marcos
- Basílica de Nuestra Señora del Carmen Coronada
- Plaza del Banco y Biblioteca Municipal Central
- Iglesia de San Dionisio y Torre de la Atalaya
- Plaza de la Asunción y Cabildo Antiguo
- The Sherry Gallery · Palacio de San Dionisio
- Zoobotánico Jerez · Alberto Durán
- Bodegas Real Tesoro y Valdespino · Suite Vollard de Picasso
- Circuito de Jerez · Ángel Nieto
- Bodegas Luis Pérez · Hacienda Vistahermosa
- Rancho Cortesano · Museo de la Miel y las Abejas
- Cartuja de Santa María de la Defensión
- Yeguada Cartuja · Hierro del Bocado
- Reserva Natural Laguna de Medina
- Montes de Propios de Jerez
- Riñones al Jerez
- Cola de toro al Jerez
- Menudo a la jerezana
- Alcauciles a la jerezana
- Tagarninas esparragás
- Aneto jerezano
- Tocino de cielo
- Carmelas de Jerez (Carmelitas)
- Pocitos de Jerez
- Vinagre de Jerez
- Vino Fino
- Vino Oloroso
- Vino Palo Cortado
- Vino Pedro Ximénez (PX)
- Vino Cream
- Brandy de Jerez

La [maqueta del futuro rediseño](../design/aventourarte-mobile-share-redesign-reference.png) queda guardada como referencia; no representa una captura de la web actual.

