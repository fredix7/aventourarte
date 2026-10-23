# AVA-13 · Analítica y feedback

## Identificación confirmada por el propietario

- Responsable: Alfredo Velasco Japón.
- Correo de contacto público: alfredovejapon@gmail.com.
- Datos aportados y autorizados por el propietario para la política de privacidad. Esta anotación documenta la identidad; no implica que la política completa esté publicada ni sustituye la definición pendiente de conservación de avisos.

## Activación

La integración está configurada para `fredix7.github.io`, con el Website ID público aportado por el propietario el 22/10/2026. Se activará al publicar esta versión; la medición de navegación sigue requiriendo permiso del visitante. Desarrollo y otros dominios no envían datos.

Revisión del proveedor (22/10/2026): https://umami.is/privacy y https://umami.is/dpa. El DPA se incorpora al contrato al crear o utilizar la cuenta. Umami actúa como encargado para los datos analíticos; procesa la IP para identificación de sesiones y ubicación aproximada, y puede conservarla en registros operativos separados. El aviso de medición publicado con esta versión informa del proveedor y permite retirar la elección. La región concreta de la cuenta no se ha comprobado. Sigue pendiente completar la política general con responsable, contacto y derechos; no se da por verificada la conformidad legal completa.

1. Crear una web en Umami Cloud (plan Hobby: una web, 100.000 eventos/mes y seis meses de retención, comprobado el 22/10/2026). Las propiedades de eventos también consumen cuota. Revisar condiciones antes de activar: https://umami.is/pricing.
2. Revisar contrato de encargado, región de alojamiento, transferencias, retención y política del proveedor. Completar el aviso legal/política general de AvenTourArte con responsable, contacto y derechos. El bloque «Privacidad y medición» explica esta funcionalidad, pero no sustituye la política general.
3. En `src/app/shared/analytics.config.ts`, introducir el Website ID público y los hostnames reales en `allowedHosts`, sin protocolo ni rutas. Por ejemplo, `fredix7.github.io` si ese es el despliegue elegido. Mantener `endpoint` en `https://gateway.umami.is/api/send`. No hace falta script externo ni API key.
4. Poner `privacyReviewed: true` una vez completada esa revisión. Compilar con `npm.cmd run build:pages`. Desarrollo y localhost muestran una vista previa funcional sin enviar eventos ni votos a Umami. Otros hosts no autorizados y Do Not Track quedan excluidos del envío real. Fuera de la vista previa, el feedback se oculta si la integración no está disponible, eliminando también su contenedor para no dejar huecos en la guía.
5. Validar en el dominio de producción las pruebas de humo de abajo antes de dar la tarea por finalizada. No se ha publicado esta versión ni comprobado la recepción en el panel real.

La API de envío es pública y sin autenticación: https://docs.umami.is/docs/api/sending-stats. El navegador envía su User-Agent normal. No instalamos un segundo tracker que duplique las aperturas. El prefijo de GitHub Pages se obtiene de `document.baseURI`.

## Privacidad y elecciones

La navegación requiere permiso expreso en «Privacidad y medición», al pie de la página. Aceptar y rechazar tienen el mismo tratamiento visual y se puede retirar el permiso. Solo se guarda la preferencia `yes`/`no` en localStorage, sin identificador propio. Si el almacenamiento está bloqueado, la elección funciona en memoria. La revisión editorial (`?editorial=1`) no envía eventos.

Las valoraciones son independientes: elegir una respuesta no la envía. El botón de envío, acompañado de información del destinatario y finalidad, autoriza esa respuesta concreta; no habilita analítica pasiva. Un bloqueo de red o del proveedor muestra un error y permite reintentar. No mostramos confirmaciones de éxito sin respuesta HTTP satisfactoria.

En local, la tarjeta avisa «Vista previa local» y permite completar el formulario mediante «Probar mi respuesta». La confirmación indica explícitamente que solo se guarda en la sesión local; no representa una entrega al proveedor. Los controles de permitir/rechazar también funcionan en local, pero sus cambios no generan peticiones. Un bloqueo real por «No rastrear» o por dominio muestra su causa en el panel de privacidad.

Los payloads se construyen desde una lista de campos permitidos. No se envían texto del buscador, URL real con parámetros, título real, referrer, pantalla, preferencias alimentarias, alergias, email, nombre, coordenadas ni un identificador propio. La IP y User-Agent son visibles para el proveedor como parte de la conexión y Umami puede derivar sesiones y geolocalización aproximada; no se promete anonimato absoluto. No se reutiliza ni almacena el identificador que pueda devolver Umami.

No se presupone una exención por no utilizar cookies. Referencia: https://www.aepd.es/guias/guia-cookies-analiticas-externas.pdf.

## Eventos

El destino queda en la ruta normalizada `/[base]/guia/[path]/`, sin repetirlo como propiedad.

| Evento | Momento | Propiedades |
| --- | --- | --- |
| Pageview (sin nombre) | Apertura de una guía válida | Ninguna |
| `search` | 800 ms sin escribir o al escoger un resultado antes del plazo | `results`: `some` / `none` |
| `plan_filter` | Seleccionar, retirar o limpiar filtros de planes | `action`: `select` / `remove` / `clear`; `plan` cuando corresponda |
| `outbound` | Clic primario o central en enlaces instrumentados | `kind`: `maps` / `web` / `booking` |
| `share` | Compartir nativo resuelto o copia al portapapeles completada | `method`: `native` / `clipboard` |
| `guide_feedback` | Envío explícito de una valoración | `rating`: `yes` / `partly` / `no`; `reason` opcional |

Motivos: `practical-info`, `outdated`, `hard-to-find`. Cancelar el menú nativo, fallar al copiar o mostrar la copia manual no genera un evento de compartir. Una promesa de compartir resuelta no acredita que otra persona haya recibido o leído el enlace. Tampoco un clic en reservar acredita una reserva.

Las aperturas consecutivas idénticas se deduplican; volver tras salir cuenta como nueva apertura. Las búsquedas se agrupan por pausa, no por visitante único. Los votos se deduplican en memoria durante la vida de la aplicación, incluyendo solicitudes simultáneas. Recargar o abrir otra pestaña permite otra valoración. No es un sistema antifraude.

## Lectura semanal

- Aperturas por destino y evolución semanal.
- Acciones Maps/web/reserva por destino. Comparar clics con aperturas como indicador de actividad, sin llamarlo conversión de personas únicas.
- Búsquedas sin resultados respecto al total de búsquedas medidas, sin conocer los términos.
- Uso de filtros y acciones de compartir.
- Respuestas útiles (`yes` / total de respuestas), mostrando siempre número de votos y distribución completa. Pocas respuestas son una señal exploratoria.

Las métricas pasivas solo representan tráfico que permite medición y no la bloquea. Los votos pueden proceder de visitantes que no permiten analítica pasiva: no dividir votos entre visitas y presentarlo como tasa de toda la audiencia. No hay datos históricos anteriores a la activación. Revisar cuota antes de agotar los 100.000 eventos; no se habilita una suscripción de pago desde el código.

## Validación

Automatizadas: permiso y retirada; exclusión editorial y desarrollo; limpieza de payloads; deduplicación de aperturas; feedback voluntario independiente; votos simultáneos; fallo de red/HTTP y reintento; cambio de guía durante un envío; controles accesibles del formulario.

Prueba de humo con cuenta real parcialmente comprobada; quedan por contrastar los eventos y casos siguientes:

1. Abrir una guía sin permiso y comprobar que no hay peticiones a Umami.
2. Permitir medición y verificar una sola apertura en Network y en el panel.
3. Cambiar de guía, usar buscador, planes y enlaces; contrastar nombres y propiedades.
4. Cancelar compartir y comprobar que no cuenta; copiar un enlace y verificar `share`.
5. Retirar permiso: la navegación deja de enviar; todavía se puede enviar una valoración explícita.
6. Bloquear el endpoint y comprobar navegación funcional, error de envío honesto y posibilidad de reintentar.
7. Abrir `?editorial=1` y comprobar ausencia de peticiones.

No marcar AVA-13 finalizada hasta tener configuración real, revisión de privacidad y prueba de humo satisfactoria.

## Comprobación con el propietario · 23/10/2026

La web pública está publicada con el ID configurado. El propietario comprobó en Red que uBlock Origin bloqueaba las solicitudes a `gateway.umami.is`. Tras desactivarlo para esta web, confirmó recepción en Umami con una captura que muestra un visitante, una visita y una vista. Esto acredita la recepción de visitas, pero no verifica todavía todos los eventos personalizados.

El permiso dentro de la web no anula los bloqueadores del navegador. Al revisar métricas hay que considerar que faltan las visitas sin consentimiento, con Do Not Track o con bloqueadores: los totales no equivalen a toda la audiencia y ese sesgo no se corrige con un porcentaje supuesto. La web debe seguir funcionando cuando el envío se bloquea; no se intentará eludirlo.

Para diagnosticar: comprobar la dirección pública, permiso, periodo y web seleccionados en Umami y la petición en Red. Un mensaje «Bloqueado por uBlock Origin» identifica un bloqueo local. Para una prueba voluntaria se puede pausar el bloqueador solo para esta web y restaurarlo después. No pedir a todos los visitantes que lo desactiven.

Durante el diagnóstico también se envió un evento técnico `integration_check`, aceptado por el endpoint. Excluirlo al interpretar el uso real del producto. Pendiente: contrastar los eventos de acciones/valoración en el panel y completar la información general de privacidad.

El propietario aportó después una captura de Events que confirma `search`, `outbound` y `guide_feedback`, con un evento de cada tipo, además del `integration_check` técnico. Quedan comprobadas búsqueda, enlace externo y valoración en producción. La captura no acredita todavía `share`, `plan_filter`, las propiedades detalladas de los eventos ni todos los casos de retirada de permiso/exclusión editorial. La información general de privacidad sigue pendiente.

Una segunda captura de Events del propietario confirma también `share` y `plan_filter` (uno de cada uno). Queda acreditada la recepción de las cinco acciones principales probadas: búsqueda, enlace externo, compartir, filtros de planes y valoración. Los recuentos de estas capturas corresponden a pruebas del propietario; no son una muestra de audiencia real. Siguen pendientes la información general de privacidad y la comprobación manual restante de propiedades, retirada de permiso y exclusión editorial; estos comportamientos tienen cobertura automatizada, pero las capturas no los verifican en producción.

El propietario confirmó después que, tras retirar el permiso al pie de la web y repetir las acciones, Umami dejó de registrar actividad. Se registra como comprobación manual de retirada de consentimiento para la medición de navegación. La valoración voluntaria conserva su autorización independiente al pulsar enviar: esta observación no verifica ni modifica esa distinción. Permanecen pendientes la información general de privacidad y la revisión manual de propiedades/exclusión editorial.

## Cierre de implementación · 23/10/2026

Política publicada en `privacidad.html` con identidad/contacto autorizados, derechos, proveedores y conservación manual de avisos durante su atención y como máximo seis meses desde su resolución. Las condiciones generales de Umami contemplan DPA y cláusulas contractuales tipo (https://umami.is/dpa). Notion documenta alojamiento por defecto en Estados Unidos salvo migración confirmada (https://www.notion.com/help/data-residency); la política no promete residencia exclusiva en la UE. No se ha accedido a ajustes privados de región ni se certifica cumplimiento jurídico integral.

Revisión del envío: campos construidos por lista permitida, ruta canónica sin parámetros, texto/correo excluidos, exclusión editorial, consentimiento y retirada cubiertos por pruebas; envío fallido no bloquea navegación. Evidencia de producción aportada por el propietario: visitas, cinco acciones principales, retirada del permiso y AVISO-2. El resto se acredita por revisión del código y pruebas automatizadas, no por una nueva sesión manual de producción.

Suite conjunta 136/136; receptor 8/8; build correcto con advertencia de 4,11 MB frente al objetivo de 3 MB. Publicación 0b473e3 comprobada mediante el paquete main-GH4ERN4P.js, con formulario y enlace de privacidad. Fuente subida a developer (19429c1). El seguimiento de cuota, solicitudes de derechos, revisión mensual de avisos y cambios en condiciones de proveedores son tareas continuadas de gestión, no automatizaciones implementadas.
