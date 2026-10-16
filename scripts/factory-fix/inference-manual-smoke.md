# Paso 210 — puente manual HTTPS dormido

Base: `factory/aventourarte-agents`, `cdd3ae86918c0dc52b6acd66b2bb19d1b0c6a850`.
Preparación exclusivamente offline. `RUNTIME_NOT_ISOLATED` permanece vigente.

## Recorrido preparado

`runPreparedNativeSmoke` es privado, sin caller ni emisor operativo de reviews.
Reutiliza la sesión sintética, las autorizaciones privadas A/B/C, las reservas,
el decoder y los validadores originales de `inference-manual.ts`.
El nuevo puerto nativo únicamente consume permisos privados de un uso;
un objeto, flag, variable de entorno, transcript o autorización del laboratorio
no puede emitirlos. La inspección pública siempre devuelve BLOCKED.
El permiso fija también la identidad de la señal de cancelación y el timeout;
el puerto consume y rechaza cualquier sustitución antes de DNS.

Una futura revisión confiable debe acreditar proyecto, proceso, vencimiento,
exclusividad y límites independientes para conteo y generación. Hoy su registro
privado está vacío. Los tests solo lo instrumentan en memoria con datos ficticios.
No se ha implementado una forma pública de declarar esos hechos como verificados.

La ceremonia preparada exige terminal interactivo y desafíos aleatorios separados:
A autoriza una conexión fija, B el uso privado de la clave del proyecto, C el
máximo del intento y del recorrido. Cada etapa requiere A/B/C nuevos de 30 segundos.
La clave se introduce sin eco en modo raw, con límite y restauración del terminal;
no se utiliza argv, entorno, logs, repositorio ni almacenamiento de credenciales.
No se garantiza borrado seguro de strings en memoria JavaScript.
Los errores del terminal se reconstruyen con códigos fijos, sin causas ni stacks
externos. Los fallos de setup disparan la retirada de listeners y cada operación
de restauración se intenta independientemente. Un fallo físico de restauración
del terminal no puede acreditarse resuelto mediante IO falso.

Después del conteo hay una transición humana explícita y un mínimo monotónico de
60 segundos. No hay scheduler, retry ni fallback. Una aprobación anticipada se
rechaza y cierra el recorrido. Una respuesta válida termina en FixPlan en memoria,
sin handoff exportado, writer, readiness, leases, recovery ni persistencia.

## Contratos contrastados el 2026-10-16

- La referencia documenta POST `/v1/responses/input_tokens` y respuesta
  `{object: "response.input_tokens", input_tokens: number}`. Se conservan iguales
  modelo, input, instructions, parallel_tool_calls, reasoning, text, tools,
  tool_choice y truncation en las dos peticiones. Los campos exclusivos de creación
  permanecen solo en generación.
  [Referencia del conteo](https://developers.openai.com/api/reference/typescript/resources/responses/subresources/input_tokens/methods/count),
  [guía](https://developers.openai.com/api/docs/guides/token-counting).
- `gpt-6-luna` documenta Responses, salida estructurada y reasoning `none`.
  Tarifas estándar por millón de tokens: input USD 0,10, caché escrita USD 0,125,
  output USD 0,50. Con 16.000 input y 4.096 output, la cota conservadora de generación
  es 4.048 micro-USD. Esta revisión tiene fuente propia y no promueve la tarjeta
  simulada anterior a tarifa real.
  [Modelo](https://developers.openai.com/api/docs/models/gpt-6-luna),
  [precios](https://developers.openai.com/api/docs/pricing).
- No se confirmó tarifa ni consumo específico de cuota del endpoint de conteo
  en las fuentes consultadas. Su cota sigue siendo null: no se supone gratuito.
- El envelope de generación incluye output y usage; el decoder conserva un perfil
  deliberadamente estricto. Campos legítimos nuevos o metadatos no admitidos
  producirán rechazo sin autoridad; no se garantiza aceptación de toda respuesta
  comercial antes de observar un smoke autorizado.
  [Responses](https://developers.openai.com/api/reference/resources/responses/methods/create).
- Los límites pueden pertenecer al proyecto y organización. El intervalo local
  no acredita el estado de la cuota del proveedor.
  [Límites](https://developers.openai.com/api/docs/guides/rate-limits).

## Exclusividad del smoke y reinicios

No hay mutex interproceso, ledger durable ni servidor local. No se usan leases de
escritura como coordinador de inferencia. Por tanto no existe garantía técnica
global para clientes arbitrarios que compartan proyecto o clave.

El smoke admisible es un único host autorizado, una única clave efímera entregada
solo a ese proceso, sin otros clientes del proyecto y con revisión de cuota de la
organización. La revisión privada queda ligada al PID, vence y se consume una vez;
una copia JSON u otro proceso no hereda esa autorización. Se exigen 60 segundos de
quietud inicial antes del primer intento y 60 tras el conteo, incluidos errores.
El arranque no envía nada automáticamente.

Después de crash, cierre o resultado incierto: abandonar, revisar uso y cuota,
revocar la clave anterior y autorizar un recorrido nuevo. No reanudar ni repetir
automáticamente. Esta es una condición operativa humana, no exclusión global
demostrada. Si no puede garantizarse esa exclusividad para el smoke, NO-GO.

## Condiciones cerradas antes de la primera conexión

1. Confirmar coste/cuota del conteo y vigencia de precios, proyecto y acceso al
   modelo; aprobar máximos numéricos de cada intento y del recorrido.
2. Autorizar saldo API suficiente y una clave efímera del proyecto, entregada solo
   por el canal privado. No comprar ni recargar desde este código.
3. Aprobar la ventana exclusiva y el protocolo anterior de abandono/revocación.
4. Revisar y habilitar expresamente el emisor host que hoy está ausente, el entorno
   limpio y TLS/DNS. No usar bootstrap 9G ni habilitar ejecución local del Fixer.
5. Autorizar individualmente A/B/C para COUNT y, después del intervalo y transición,
   A/B/C para GENERATION; solo el contenido turístico sintético mostrado.

No hay autorización implícita por cumplir parte de esta lista. La preparación no
ejecuta modelos, no contacta la API y no habilita dinero ni escritura.
