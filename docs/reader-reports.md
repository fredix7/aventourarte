# Avisos y mejoras de lectores

## Conservación acordada por el propietario · 23/10/2026

Responsable: Alfredo Velasco Japón. Contacto público: alfredovejapon@gmail.com. Política: `public/privacidad.html`, enlazada desde el pie, formulario y panel de medición.

Guardar mientras se atiende el aviso y eliminar los datos personales como máximo seis meses después de resolverlo. Conservar propuestas pendientes solo sin datos identificativos. La eliminación es manual: al cerrar, anotar fecha de cierre y límite en Resolución; revisar mensualmente Resueltos, correo y cualquier copia manual. Limpiar datos personales del correo, título, mensaje, resolución, comentarios y tareas relacionadas o eliminar el registro si no se puede anonimizar. La papelera y copias del proveedor tienen su propia retención: mover a papelera no acredita borrado definitivo. No se ha configurado ninguna automatización de borrado.

## Preparado

- Bandeja: https://www.notion.so/28610aa01a944fa192a00c9da3105afa
- Fuente de datos: `852f1b4c-6f27-4497-a3b1-b35acc0b566d`.
- Guía de revisión: https://www.notion.so/401ab8fef67c817f8bdcd0365254a92a
- Estados: Nuevo, En revisión, Resuelto. Vistas: Nuevos, Seguimiento, Sin resolver, Resueltos.
- Categorías: Error, Dato desactualizado, Sugerencia, Otro.
- Número automático, mensaje, guía, URL, correo opcional, fecha, prioridad, responsable, resolución y relación con Tareas AvenTourArte.

El formulario integrado se muestra después de la valoración de cada guía y funciona de forma independiente de la autorización de analítica. No exige nombre ni cuenta. Un envío confirmado devuelve `AVISO-<número>`; no envía confirmaciones por correo ni ofrece un portal público de seguimiento.

En desarrollo se puede probar sin almacenar el mensaje ni enviarlo a Notion o Umami. La confirmación se identifica como prueba. En producción el formulario se oculta hasta que haya un receptor configurado, eliminando también el contenedor para no dejar huecos.

## Configuración y activación

GitHub Pages aloja la web estática. La conexión de Notion de este chat no proporciona una credencial que pueda usar la web en producción. Hay que desplegar el receptor de `server/reader-reports` con un secreto propio; desplegado el 22 de octubre de 2026 en https://aventourarte-reader-reports.alfredovejapon.workers.dev/feedback. La prueba real creó AVISO-1 en Notion y se cerró como prueba técnica.

1. Crear una integración interna en Notion para este receptor con **Read content** e **Insert content**: insertar permite crear el aviso y leer permite obtener la propiedad del número de ticket en la respuesta. Desactivar **Update content**, permisos de comentarios/agentes y seleccionar **No user information**. Conectar exclusivamente la nueva base de avisos mediante sus conexiones. No hacer pública la base ni compartir la clave por chat o dentro del código.
2. En una cuenta de Cloudflare, desplegar `server/reader-reports/worker.mjs` con la configuración de `wrangler.toml`. La web puede continuar en GitHub Pages. El receptor no necesita otro servidor ni base de datos propia.
3. Guardar `NOTION_TOKEN` como secreto del Worker. `NOTION_DATA_SOURCE_ID` y `ALLOWED_ORIGIN` ya están definidos en la configuración pública. Se exige el binding `REPORT_LIMITER` del archivo para aceptar solicitudes.
4. Con Wrangler disponible, desde `server/reader-reports`, ejecutar `wrangler secret put NOTION_TOKEN` y `wrangler deploy`. No pasar el token como argumento de terminal, para evitar guardarlo en el historial. El despliegue del receptor se completó con autorización del usuario, conservando el secreto configurado en Cloudflare.
5. Copiar la URL HTTPS del Worker, seguida de `/feedback`, en `src/app/shared/reader-report.config.ts` → `endpoint`. Mantener la lista de hostnames reales en `allowedHosts`.
6. Completar la política general de privacidad con responsable, contacto, derechos y conservación de avisos. El aviso funcional informa de Notion y del tránsito por Cloudflare. Definir cuándo borrar correos una vez atendidos.
7. Compilar y publicar la web. Hacer una prueba real identificada como tal, comprobar el ticket en la vista Nuevos y cerrar con resolución «Prueba técnica». No confundir una respuesta de prueba local con un ticket recibido.

Workers ofrece una cuota gratuita; verificar condiciones y límites antes del despliegue: https://developers.cloudflare.com/workers/platform/limits/. No se garantiza gratuidad ilimitada.

## Flujo y límites

El cliente envía categoría, mensaje (10–2.000 caracteres), correo opcional, guía, permiso y honeypot al receptor. Este valida el origen, método, tamaño máximo de 12 KiB y campos; comprueba el límite de envíos y crea un registro privado en Notion. La URL de guía se construye en servidor sin aceptar una URL arbitraria del cliente.

El Worker usa la IP proporcionada por Cloudflare como clave temporal del límite de cinco envíos por minuto por IP y ubicación de Cloudflare. El límite es aproximado y no constituye una protección completa contra abuso distribuido. No guarda la IP en el ticket ni registra cuerpos de mensajes en logs propios. Los registros operativos del proveedor quedan sujetos a sus condiciones.

El navegador no recibe el token de Notion ni enlaces de edición de tickets. Respuestas fallidas conservan el texto para reintentar y no muestran un número inventado. No hay reintentos automáticos. Si se pierde una respuesta después de guardar en Notion, un reintento puede generar un duplicado: revisar antes de reenviar. La referencia es informativa y no permite consultar datos de otros avisos.

Umami solo recibe `reader_report` con la categoría y la ruta pública de la guía, después de confirmar el guardado y únicamente si se ha permitido analítica. Nunca recibe el texto ni el correo. Se pueden enviar avisos aunque la medición esté desactivada.

## Validación

- Receptor: `npm.cmd run test:reports` (sin credenciales ni escrituras reales).
- Angular: pruebas de `reader-report.service.spec.ts`, `reader-report.component.spec.ts`, `analytics.service.spec.ts` y `app-layout.spec.ts`.
- Prueba real del receptor completada: AVISO-1 recibido en Notion, estado Resuelto, sin correo ni datos personales.

Referencias: https://developers.notion.com/reference/post-page, https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/.

## Alternativa nativa de Notion

Se ha dejado una vista de formulario cerrada, denominada «Formulario · configuración pendiente». El conector solo creó la pregunta de título; no se ha presentado como un formulario listo. Para utilizar esta alternativa hay que completar sus preguntas en el editor de Notion y compartir únicamente el enlace de respuesta. La interfaz integrada no usa esta vista.

## Publicación verificada · 22 de octubre de 2026

GitHub Pages sirve la compilación conectada al receptor real (commit de publicación 764b25f, paquete main-PSOQYRXG.js). Se excluyeron los cambios locales pendientes de Rota y alérgenos. Las 11 pruebas enfocadas de formulario y diseño pasaron. La compilación avisa del tamaño inicial de 4,05 MB frente al objetivo de 3 MB, sin superar el límite de error. CORS: origen autorizado 204; origen ajeno 403. El receptor devolvió AVISO-1 y se verificó su registro en Notion.

Pendiente de gestión: completar responsable, contacto y plazo de conservación en la política general; comprobar recepción de eventos en el panel privado de Umami.
