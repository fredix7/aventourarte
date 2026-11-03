# Tarjeta de información práctica · 3 de noviembre de 2026

Implementada localmente para todas las fichas del visor: itinerarios y fichas generales. Sustituye la presentación anterior de contactos y datos prácticos. Orden aprobado por el usuario; pendiente de publicación.

## Comportamiento

- Tarjeta marfil, azul petróleo y verde, con dirección, accesos a Maps, web oficial y reservas cuando esos datos existen.
- Orden aprobado: dirección; cómo llegar; horarios y precios desplegables; reservar; teléfonos; web oficial. Los demás datos prácticos permanecen con los desplegables y el acceso combinado «Web y reservas» ocupa la posición de reservar.
- Un único acceso «Web y reservas» cuando ambos campos apuntan al mismo destino. Los destinos con consultas diferentes se conservan por separado.
- Teléfonos agrupados por entidad, con formato visible, notas y destinos independientes. Se reutiliza el parser ya validado.
- Si la reserva por teléfono coincide con un número visible, esa fila muestra «Reservar» y no se crea otro botón para el mismo número. Si el teléfono no está listado, se muestra «Reservar por teléfono».
- Horarios, precios, precios orientativos, acceso y fechas se conservan íntegros en desplegables nativos independientes. Las fichas que solo tienen datos informativos utilizan una variante compacta.
- Navegación telefónica y de mapas nativos sin nueva pestaña. Los enlaces web abren otra pestaña e incluyen `noopener noreferrer` y un nombre accesible que lo anuncia.
- Se mantiene la medición existente de Maps, web y reservas; no se añaden teléfonos ni direcciones a los eventos. Las llamadas ordinarias conservan su navegación nativa.
- No se inventan botones para reservas ausentes. Las instrucciones y URL inválidas se conservan como texto informativo sin enlace.

## Datos conservados

No se ha modificado el archivo de la guía de Jerez durante esta ampliación. SHA-256 antes y después: `3ab513ff6437691b9602185a73ef1ee32664cbcceb922c904c2c2b468b24fe9c`.

La galería del Alcázar sigue teniendo sus dos fotos reales y las dos portadas provisionales intercaladas en el orden del usuario. El resto del contenido y de los datos editoriales tampoco se ha alterado.

## Validación

- **159/159 pruebas correctas**, incluidas nueve pruebas nuevas de la tarjeta práctica: agrupación, deduplicación, reservas telefónicas, mapas nativos, desplegables, datos ausentes, instrucciones sin enlace y medición. Se comprueba que la aplicación no cancela los clics normales de llamada ni de navegación.
- Compilación de producción y preparación de GitHub Pages correctas. Aviso de tamaño inicial: 3,98 MB frente al presupuesto orientativo de 3 MB, dentro del límite de error.
- Las **16 rutas** responden localmente y renderizan sus guías en Chrome, sin excepciones JavaScript.
- Tarjetas revisadas a **320, 390, 768 y 1440 px**, sin desbordamiento y con objetivos pulsables de al menos 48 px. Todas las pestañas de Jerez revisadas a 320, 390 y 1440 px.
- Teclado: Tab entre números, foco visible y apertura nativa de los desplegables con Enter.
- Comprobados el botón combinado de Tío Pepe, la reserva por teléfono de Venta Esteban y la ausencia de un botón de reserva inventado en Grupo Estévez.
- Conservadas y comprobadas las cuatro entradas de la galería del Alcázar.
- Sin errores de espacios en el diff. No se han iniciado llamadas reales ni se acredita prueba en teléfono físico.

## Paquete y evidencias

- Paquete con el orden aprobado: `main-6IHEI4YO.js`.
- SHA-256: `f20f724652a5b98cd48661f1c06c17ff84b028b540f5e81a0a9225cae051f84a`.
- Las 16 entradas directas apuntan al mismo paquete y existe el fallback 404.
- Pruebas de funcionalidad previas al ajuste final de orden: `tmp/practical-order-tests.log` (159/159).
- Compilación del orden aprobado: `tmp/practical-approved-order-build.log`.
- Revisión completa anterior: `tmp/practical-info-review/checks.json` y `tmp/practical-order-browser.log`. Comprobación del orden aprobado, horarios antes de precios, enlaces y conservación de fotos: `tmp/practical-approved-order-browser.log`.
- La guía de Jerez conserva el mismo SHA-256 indicado arriba tras reordenar.
- Capturas del orden aprobado: `tmp/practical-approved-order/jerez-practica-movil.png`, `tmp/practical-approved-order/jerez-practica-desplegada-movil.png` y `tmp/practical-approved-order/jerez-practica-telefonos-movil.png`.

No se ha creado commit, realizado push ni desplegado esta ampliación.
