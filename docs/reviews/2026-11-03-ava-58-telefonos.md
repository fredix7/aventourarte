# AVA-58 · Tarjetas de contacto telefónico

Implementación local en `developer`, revisada el 3 de noviembre de 2026. Tarea: [AVA-58](https://www.notion.so/3caab8fef67c81caa7bcefa58e3386b2). Pendiente de publicación y aceptación en producción.

## Resultado

Las fichas del itinerario y las fichas generales del visor usan el mismo componente de contacto. Fondo marfil, texto azul petróleo, borde superior verde a juego con los enlaces y una fila pulsable por número. El borde cobrizo de la propuesta inicial se ha sustituido tras la revisión visual del usuario. Un único teléfono utiliza la misma tarjeta compacta. No se añade un diálogo previo a la llamada.

El parser conserva el orden, las entidades y las notas editoriales, incluidos WhatsApp, visitas guiadas y extensiones. Interpreta `/`, saltos de línea y etiquetas consecutivas; conserva el formato visible y normaliza únicamente el destino `tel:`. Las notas de WhatsApp siguen siendo información editorial, sin inventar un enlace a ese servicio. Las extensiones quedan visibles para introducirlas durante la llamada.

Los datos ausentes no muestran tarjeta. Las entradas incompletas, fechas, enlaces web y texto no telefónico quedan como texto. No se cambia el esquema de las guías ni sus campos originales. El parsing se ejecuta al cambiar el input y el componente usa detección de cambios OnPush.

## Validación

- Tipos: `tsc --noEmit -p tsconfig.spec.json`, correcto.
- Pruebas nuevas: **11/11 correctas** (8 del parser y 3 del componente con plantilla real).
- Suite completa tras la revisión conjunta con Jerez: **150/150 correctas**.
- Se ha reconciliado la prueba anterior de alérgenos con la fusión conservadora ya implementada: Carbonara variable conserva leche y huevo como posibles. Se añaden regresiones de la prioridad de recetas completas, deduplicación y clasificación de coincidencias. No se cambia el comportamiento de los alérgenos para hacer pasar la prueba.
- Producción: compilación correcta con base `/aventourarte/`, paquete final `main-RBXUV4LT.js`. Aviso de tamaño inicial: 3,97 MB frente al presupuesto orientativo de 3 MB.
- Preparación de GitHub Pages correcta: 16 rutas de guía y fallback 404 generados.
- Inventario del código actual: **247 campos de teléfono, 294 enlaces**; en Jerez, **59 campos y 88 enlaces**, sin entradas telefónicas actuales omitidas por el parser. Esto comprueba interpretación, no la vigencia factual de los números.
- Navegador sobre el paquete de producción local: anchos **320, 390, 768 y 1440 px**, sin desbordamiento de la tarjeta ni de los enlaces; objetivos táctiles de al menos **48 px** de alto.
- Teclado: Tab entre destinos independientes y foco visible. Etiquetas accesibles por entidad, número y nota. Sin errores JavaScript durante la revisión. No sustituye una prueba con lector de pantalla o teléfono físico.
- El ejemplo de Grupo Estévez mantiene los destinos `tel:+34956321004`, `tel:+34608492097` y `tel:+34660842590`. Activación comprobada interceptando los clics para no iniciar llamadas reales.
- Comprobado también el segundo tipo de ficha: 16 tarjetas de restaurantes en Jerez.
- Diff de los archivos de esta entrega sin errores de espacios.

## Evidencias locales

- `tmp/ava-58-tests.log`: suite completa.
- `tmp/ava-58-review/checks.json`: medidas y comprobaciones en navegador.
- `tmp/ava-58-review/jerez-telefonos-movil.png`: tarjeta real con tres números.
- `tmp/ava-58-review/jerez-telefono-unico-movil.png`: tarjeta real con un número.
- `tmp/ava-58-review/jerez-telefonos-escritorio.png`: tarjeta en escritorio.
- `tmp/ava-58-inventory.cjs`: comprobación de todos los campos actuales.
- `tmp/ava-58-allergen-baseline.cjs`: comparación del caso de alérgenos independiente de la UI telefónica.

## Pendiente de entrega

Publicar y comprobar la versión pública antes de marcar AVA-58 como Finalizadas. La revisión técnica conjunta está superada; se detalla en [Jerez y AVA-58 · Prepublicación](2026-11-03-jerez-ava-58-prepublicacion.md). No se ha creado commit, realizado push ni publicado durante esta tarea. Los cambios editoriales de Jerez y el comportamiento de alérgenos se conservan, con la corrección del enlace institucional de Palacio Pemartín y limpieza de dos espacios finales.

AVA-58 figura en Notion como **En revisión**. El registro técnico detallado permanece en este informe local.
