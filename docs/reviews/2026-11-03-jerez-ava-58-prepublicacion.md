# Jerez y AVA-58 · Revisión previa a publicación

La ampliación posterior de la interfaz práctica y su paquete actualizado se documentan en [Tarjeta de información práctica](2026-11-03-tarjeta-informacion-practica.md), con 159 pruebas correctas. Los datos editoriales de Jerez se conservan.

**Preparados técnicamente para subir y desplegar.** Revisión del 3 de noviembre de 2026 en `developer`, base `0446846`. Sin commit, push ni publicación realizados. La rama remota `developer` se ha consultado y coincide con esa base.

## Ajustes realizados durante la revisión

- Se conserva la actualización editorial del usuario y la tarjeta de teléfonos aprobada, incluido su borde superior verde.
- Se corrige la regresión del enlace de Palacio Pemartín: la dirección del Centro Andaluz de Documentación del Flamenco presenta problemas de certificado en el comprobador HTTPS y falla también en la lectura web. Se utiliza su [ficha institucional de la Junta](https://www.juntadeandalucia.es/organismos/culturapatrimoniohistoricoydeporte/servicios/directorio-instituciones/detalle/3763.html), que responde correctamente y publica los contactos, la gratuidad y las modalidades de visita.
- Se reconcilia la prueba de recetas variables con el comportamiento conservador de alérgenos ya existente: los posibles alérgenos del registro no desaparecen por una lista parcial en la ficha. Se añaden tres regresiones sobre prioridad de recetas completas, deduplicación y clasificación. No se modifica el comportamiento existente para satisfacer una prueba antigua.
- Se limpian dos espacios al final de líneas de Jerez. `git diff --check` correcto.
- Se conservan las dos fotos reales y las dos referencias de portada provisional de la galería del Alcázar, en su orden original. Se habían retirado interpretando una nota antigua de Notion; se han repuesto tras la observación del usuario. No se deben retirar fotografías provisionales sin una indicación actual del usuario.

## Validación de la entrega

| Comprobación | Resultado |
| --- | --- |
| Suite completa Angular/Chrome | 150/150 correctas |
| Pruebas de teléfonos incluidas | 11/11 correctas |
| Auditoría de contenido de Jerez | 102/102 fichas completas, cero errores |
| Datos prácticos de Jerez | 81/81 fichas completas |
| Enlaces almacenados de Jerez | 157/157 con formato válido |
| Perfiles de alérgenos | 21/21 disponibles |
| Cobertura fotográfica | 20 fichas con foto específica, 51 con portada provisional, ninguna sin referencia; 31 fichas no sujetas a foto |
| Imágenes remotas | 33/33 referencias únicas disponibles como imagen |
| Teléfonos del proyecto | 247 campos, 294 enlaces válidos en la interpretación actual |
| Teléfonos de Jerez | 59 campos, 88 enlaces independientes |
| Tarjetas responsive | 320, 390, 768 y 1440 px, sin desbordamiento; filas de al menos 48 px |
| Teclado | Tab entre números y foco visible |
| Pestañas de Jerez | Todas revisadas a 320, 390 y 1440 px, sin desbordamiento horizontal de página |
| Rutas directas | Las 16 responden localmente y renderizan su destino en navegador |
| Paquete Pages | Base `/aventourarte/`, 16 entradas directas y fallback 404 |
| JavaScript | Sin excepciones durante la revisión local |

La comprobación de teléfonos acredita que cada número se representa y apunta a su propio destino. Los clics se han interceptado en las pruebas para evitar llamadas reales; no se acredita prueba en teléfono físico ni lector de pantalla real.

## Enlaces externos y revisión de fuentes

La comprobación automática inicial cubre 85 URL únicas de web/reserva y 33 imágenes. Las imágenes y 82 URL respondieron correctamente. Las otras tres incidencias se investigaron:

- **Centro Andaluz de Documentación del Flamenco:** corregido mediante la ficha institucional citada arriba. Los teléfonos publicados coinciden con la guía.
- **Grupo Estévez:** el comprobador Node no verifica su cadena de certificados, pero Chrome abre la página de visitas y obtiene el título «Visitas | Bodegas José Estévez» sin página de error. Se mantiene el enlace oficial.
- **Álvaro Domecq:** el comprobador recibe 403 y Chrome muestra una comprobación antirrobots. La lectura web sí recupera el contenido de [visitas de la bodega](https://www.alvarodomecq.com/visitas/). Se mantiene el enlace; no se presenta como enlace roto ni como una reserva completada.

Se ha realizado un contraste dirigido de cambios prácticos con fuentes primarias:

- [Alcázar · tarifas oficiales](https://www.jerez.es/webs-municipales/conjunto-monumental-del-alcazar/informacion/tarifas): grupos, centros educativos y gratuidad de la visita BIC.
- [Tío Pepe · experiencias y reservas](https://www.tiopepe.com/es/experiencias): nueva URL disponible y modalidades de visita.
- [Yeguada Cartuja · entradas](https://yeguadacartuja.com/entradas/): nueva URL disponible, sesiones, tarifas principales y condiciones.
- [Zoobotánico · información, horarios y tarifas](https://www.zoobotanicojerez.com/horario-tarifas-acceso/informacion-general-horarios-tarifas): edades, horarios y contactos publicados.
- [Parroquia Cuatro Evangelistas · apertura de templos](https://parroquia4evangelistas.es/apertura-templos/): aperturas de San Mateo, San Marcos y San Juan y solicitud de grupos.
- [Bodegas Tradición · visitas](https://bodegastradicion.es/visitas-responsive/): duración y contenido de las distintas modalidades. La guía remite a la venta para tarifas variables.
- [Semana Mundial del Enoturismo · Ayuntamiento](https://www.jerez.es/evento-simple-portada/dia-mundial-del-turismo-jerez) y [Día Internacional del Flamenco · Turismo de Jerez](https://www.turismojerez.com/detalle-fiestas/dia-internacional-del-flamenco-jerez): eventos incorporados y fechas generales.
- [Circuito de Jerez · historia](https://circuitodejerez.com/circuito/): pista operativa e inaugurada en 1985.

Esta revisión dirigida y la auditoría estructural no equivalen a verificar de nuevo cada afirmación histórica o cada precio de toda la guía. La información práctica conserva sus condiciones de consulta y reserva; no se inventan visitas, degustaciones ni fotografías realizadas.

## Paquete final y evidencias

- JavaScript: `main-RBXUV4LT.js`.
- SHA-256: `63022c84798cb1e031fef5f3ee381f0fe99f9ec7b2dd49c2decb72822d54846a`.
- Las 16 entradas de guía incluyen ese mismo archivo.
- Evidencias: `tmp/jerez-ava-58-release-tests.log`, `tmp/jerez-ava-58-release-build.log`, `tmp/jerez-release-audit.json`, `tmp/jerez-release-network.json`, `tmp/jerez-release-package.json`, `tmp/ava-58-review/checks.json` y capturas de la implementación en `tmp/ava-58-review/`.

## Pendientes no bloqueantes y siguiente paso

El paquete inicial sigue en 3,97 MB frente al presupuesto orientativo de 3 MB; la compilación queda dentro del límite de error configurado. Las 51 fotografías provisionales y futuras experiencias personales permanecen como ampliaciones editoriales y no impiden publicar este ciclo.

El siguiente paso es crear el commit de la entrega, subir `developer`, desplegar el paquete de GitHub Pages y comprobar en producción la guía de Jerez, los teléfonos y las rutas directas. AVA-58 debe permanecer En revisión hasta esa validación pública. Este informe no acredita que se haya desplegado.
