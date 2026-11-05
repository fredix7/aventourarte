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

## AVA-76 — entrada y preflight exclusivamente offline (04/11/2026)

`inference-smoke-entry.ts` añade una API host explícita para ensayar el recorrido
COUNT → GENERATION con transcripciones HTTPS sintéticas. Importar el módulo no
crea sesiones ni inicia operaciones. No hay CLI, main, scheduler, flags de
activación, callbacks de transporte ni lectura de claves. El proyecto es siempre
`LAB_PROJECT_ONLY`; no se acepta un proyecto, ruta, solicitud o credencial externos.

Secuencia deliberada del host de laboratorio:

1. `createOfflineSmokeEntry()` construye la fixture sintética existente en TEMP.
2. Tras la quietud inicial de 60 segundos, `preflightOfflineSmoke(entry)` emite
   un recibo privado por identidad, limitado a esa sesión, PID, proyecto sintético,
   request fingerprint, digest de ambos frames, etapa y vencimiento de 30 segundos.
3. El host llama por separado a `approveOfflineSmokeConnectivity`,
   `approveOfflineSmokeProject` y `approveOfflineSmokeBudget`. Se reutilizan los
   emisores A/B/C originales de laboratorio; B genera solo el literal ficticio ya
   existente. C acepta únicamente un máximo **simulado** del recorrido.
4. `runOfflineSmokeStage` consume el preflight y los tres permisos una sola vez,
   valida sus vínculos antes de interpretar la transcripción y reutiliza el
   transporte/decoder/validadores originales. El deadline también queda limitado
   por la caducidad del preflight, aunque A/B/C se emitan después.
5. Tras COUNT, el host debe esperar 60 segundos y llamar expresamente a
   `advanceOfflineSmokeGeneration` con el resultado auténtico. Una copia o una
   transición temprana se rechazan y cierran el recorrido. GENERATION exige nuevo
   preflight y nuevos A/B/C. No se envía nada automáticamente al esperar.
6. El resultado final contiene solo el FixPlan en memoria. Cancelación, expiración
   y fallos posteriores a asumir la entrada cierran el recorrido. La limpieza
   comprueba identidades propias; una sustitución deja cleanup BLOCKED y conserva
   los archivos inciertos. Un envelope inválido rechazado antes de identificar
   la entrada no consume permisos ni inicia un intento.

`OFFLINE_PREFLIGHT_PASS` acredita solo preparación de datos/transcripciones de
laboratorio. `hostTrustAttested` es false y `liveDecision` sigue BLOCKED. Ningún
recibo o permiso nuevo es aceptado por el consumidor HTTPS nativo: el registro
`nativeReviews` continúa vacío, sin emisor real ni caller productivo. La ceremonia
TTY nativa permanece dormida y no se invoca en este recorrido.

Los resultados son `OFFLINE_COUNT_VALID`, `OFFLINE_PLAN_VALID` o `BLOCKED`, con
`mode=LABORATORY_ONLY`, `io=SIMULATED_HTTPS_TRANSCRIPT`,
`realInferencePerformed=false`, `realRequests=0`,
`realSpend=NOT_INCURRED_OFFLINE` y `billingEvidence=UNVERIFIED_NO_PROVIDER_OBSERVATION`.
No existe resultado de inferencia real en esta entrada. COUNT mantiene precio null;
la reserva y el usage del laboratorio no son factura, precio comercial ni permiso
económico. Los campos del presupuesto siguen explícitamente SIMULATED_NOT_BILLING.

Verificación reproducible, sin instalaciones:

```powershell
node --preserve-symlinks --preserve-symlinks-main --test scripts/factory-fix/inference-smoke-entry.test.mjs
```

El runner hace typecheck y compila solo a TEMP; ejecuta las suites entry, manual,
broker, HTTP y adaptador HTTPS con guardas previas para red/procesos, writer,
readiness/leases, lecturas de guías reales y mutaciones fuera del laboratorio.
Compara SHA-256 de las guías reales, catálogo, índice y del informe sin seguimiento
antes/después; estos archivos solo se leen para su digest, nunca como fixtures.
Las pruebas usan tiempo monotónico instrumentado y transcripciones; eso no prueba
el reloj/cuotas del proveedor, TLS/DNS reales ni aislamiento OS. Las guardas son
instrumentación de pruebas, no una frontera frente a código host comprometido.

El timeout global de 900000 ms es nominal: no es un watchdog estricto mientras el
runner usa spawnSync y bloquea el event loop. Los controles filesystem tienen un
timeout de proceso de 420000 ms; sus errores o vencimientos hacen fallar el
wrapper. Los límites secuenciales configurados suman 1260000 ms, sin contar el
resto del trabajo; no se garantiza un techo global de quince minutos. Esto es una
limitación de supervisión, no una medida del tiempo de la ejecución comprobada.

Se excluyen suites de persistencia/writer/readiness/leases, E2E con escritura,
bootstrap 9G, fixtures Git y canales ejecutables. No se declara regresión completa
ni se heredan cifras históricas. El runner informa las cifras realmente ejecutadas.

NO-GO conservados: Fixer operacional y `RUNTIME_NOT_ISOLATED`; emisor/caller real;
confianza y mantenimiento del host; proyecto/modelo/saldo/clave/cuotas; economía
COUNT no acreditada; TLS/DNS reales; exclusividad entre procesos, ledger durable y
recuperación tras gasto incierto. El límite mensual confirmado por soporte no
concede ninguno de esos permisos. Cualquier tráfico real requiere otra revisión,
implementación y autorización expresa; no puede habilitarse desde esta API offline.

### Verificación previa a las correcciones de auditoría, 04/11/2026

Ejecución anterior a las correcciones siguientes: **688 casos PASS, 0 FAIL, 0 SKIP y 0
CANCELLED**, más un wrapper PASS contado por separado: entry 83, manual 238,
broker 108, HTTP 141 y adaptador HTTPS 118. Typecheck Factory Fix, compilación a
TEMP, sintaxis de los tres archivos JS nuevos y comprobación de whitespace sin
errores. No se ejecutaron Jasmine ni las suites excluidas enumeradas arriba.

Los contadores de las cinco suites registraron cero en las API observadas de red,
procesos, capacidades privilegiadas, lecturas de guías y mutaciones prohibidas.
La auditoría posterior demostró omisiones de filesystem en aquella guarda; esos
ceros no acreditaban cobertura completa. Registró mutaciones sintéticas:
1.702 / 4.798 / 2.209 / 2.942 / 1.999; no se está informando un contador vacío de
otro proceso. **20/20 SHA-256 idénticos**: 17 guías, catálogo, índice Git e informe
sin seguimiento. Las guías solo se leyeron para comparar digests en el runner.
No hubo inferencia real, credenciales reales ni gasto. Estos resultados son de
esta ejecución; no suman cifras históricas ni acreditan aislamiento operacional.

### Correcciones acotadas de auditoría — AVA-76 Phase 9

Las cuatro reproducciones previas se realizaron únicamente sobre fixtures nuevas
en TEMP: COUNT aceptaba una fuente cambiada durante el transporte; lutimesSync
modificaba un centinela fuera de owned sin registrarlo; una URL file: permitía leer
una guía ficticia protegida sin contador; cleanup eliminaba un sustituto regular.

El consumidor manual revalida fixture y request tras el transporte y en las
aceptaciones posteriores al decoder. GENERATION y SINGLE comprueban además la
fixture después de la validación y del decode final del plan; en ese punto la
request ya está VALIDATED, no OPEN. La entrada revalida de nuevo antes de publicar
el recibo COUNT. Una deriva cierra sin recibo válido ni transición; una reserva sin
usage válido conserva su importe incierto. No se convierte COUNT en gratuito ni
una estimación del laboratorio en factura.

La fixture registra dev, ino, birthtimeNs y tipo de archivos y directorios propios,
rechaza archivos con enlaces físicos adicionales y verifica todo el conjunto
antes de eliminar nada. Repite la comprobación de ancestros en cada eliminación;
una sustitución, incluso con bytes idénticos, bloquea la limpieza. Se revoca la
capacidad sintética también cuando la limpieza queda bloqueada. No hay borrado
recursivo ni adopción de archivos sustitutos en esta limpieza.

La guarda tiene una política cerrada sobre las funciones públicas de node:fs y
node:fs/promises presentes al cargarla. Permite explícitamente:

- Lectura síncrona readFile/readdir, stat/lstat/statfs, readlink, exists y realpath;
  read/readv/fstat sobre descriptores registrados. Todos con comprobación de ruta.
- readFile/readdir por callback o Promise, con el mismo control, necesarios también
  para que Node cargue módulos ESM. No se emiten FileHandles.
- openSync registrado; closeSync y close por callback, revocando el registro antes
  de liberar el descriptor. Cada apertura sustituye cualquier registro anterior;
  las operaciones comprueban identidad física y permiso de escritura del fd.
- Escrituras síncronas writeFile/appendFile, mkdir/unlink/rmdir/rm/truncate,
  chmod/chown/lchmod/lchown/utimes/lutimes, rename/copyFile y las variantes síncronas
  de write/writev/ftruncate/fchmod/fchown/futimes, solo dentro de owned.
- mkdtempSync exclusivamente con el prefijo sintético fijo. Stats, Dirent y el
  conversor puro _toUnixTimestamp son las excepciones sin IO.

owned contiene únicamente el directorio de compilación recién asignado en TEMP y
las nuevas asignaciones factory-fix-phase9-fixture- hechas por mkdtempSync bajo la
guarda. Sus identidades físicas se fijan al registrarlas; no existe una API pública
para adoptar un directorio externo como propio.

Las demás funciones públicas se rechazan por defecto, incluidas nuevas funciones
presentes en esos exports, streams, watchers, opendir, openAsBlob, creación de
enlaces, copia de árboles y mutaciones asíncronas. forbiddenFilesystemCalls
registra API/tipos no admitidos; forbiddenMutations registra mutaciones denegadas.
No se afirma que una lista de interceptores cubra toda la IO interna de Node.

Las rutas admitidas son string, Buffer UTF-8 sin pérdida y objetos URL file:.
No se convierten objetos arbitrarios a string. Se contrastan ubicación léxica y
destino físico; Windows usa comparación conservadora sin distinción de mayúsculas.
UNC, dispositivos, namespaces, ADS y spellings ambiguos se rechazan antes de IO.
Los hardlinks regulares se rechazan conservadoramente al no tener un pathname
canónico único. Las regresiones de URL, casing, junction y hardlink utilizan
exclusivamente árboles ficticios de guías en TEMP.

inference-smoke-guard.cases.mjs es un supervisor de confianza separado: sus hijos
con la guarda deben registrar cada rechazo y terminar con código 1. El supervisor
verifica la señal de éxito de cada prueba, métricas y preservación de centinelas;
no interpreta cualquier fallo del hijo como un PASS. El runner lo ejecuta aparte
de las cinco suites, cuyos contadores prohibidos deben seguir en cero.

Persisten las carreras entre comprobación y operación, especialmente en IO
asíncrona y cleanup. Referencias guardadas antes del preload, bindings nativos,
addons, cargas posteriores de exports o un host JavaScript modificado quedan fuera
de esta instrumentación. Las ACL, procedencia del host, reparse points y detalles
8.3 no quedan acreditados integralmente por estas pruebas. Cero contadores no
demuestra aislamiento OS ni ausencia global de IO. No se ha habilitado ninguna
capacidad operacional: RUNTIME_NOT_ISOLATED y todos los NO-GO siguen vigentes.

### Verificación histórica de las correcciones, 04/11/2026

Ejecución histórica con Node 22.13.1: **768 casos PASS, 0 FAIL, 0 SKIP y 0 CANCELLED**,
más un wrapper PASS separado. Entrada: 102; ceremonia manual: 238; broker: 108;
HTTP: 141; adaptador HTTPS: 118; controles de guarda: 61. Son 19 regresiones nuevas
en entrada/cleanup y 61 controles de guarda (60 negativos y uno positivo), además
de los 688 casos anteriores. No se suman las pasadas intermedias ni las copias de
resúmenes del wrapper. Las pruebas negativas exigen rechazos y código 1 de sus
hijos; ese código esperado no es un fallo de la suite supervisora.

Typecheck y compilación a TEMP correctos. Las cinco suites focalizadas registraron
cero en los contadores prohibidos, incluido forbiddenFilesystemCalls; mutaciones
sintéticas observadas: 2.093 / 4.798 / 2.209 / 2.942 / 1.999. El wrapper confirmó
20/20 hashes protegidos idénticos. Los centinelas, aliases y sustitutos de las
regresiones pertenecen a TEMP; las guías reales solo se leen para su hash.

Las reproducciones después de corregir bloquean COUNT con contexto alterado,
conservan 4.048 micro-USD simulados inciertos, impiden la transición, rechazan y
registran lutimesSync y URL, y conservan el sustituto con cleanup BLOCKED.
La caducidad se vuelve a comprobar después de la revalidación final del recibo.
No se ejecutó regresión global, Jasmine, writer/readiness/leases, bootstrap 9G,
fixtures Git ni canales operacionales. Estos resultados históricos no superan el
gate operacional.

### Verificación histórica del commit experimental y auditoría final independiente

Ejecución comprobada en Windows previa al commit experimental: **826 casos PASS, 0 FAIL, 0 SKIP y 0
CANCELLED**, más un wrapper PASS contado por separado, con **20/20 hashes
protegidos idénticos**. Entrada: 102; ceremonia manual: 238; broker: 108; HTTP: 141;
adaptador HTTPS: 118; controles filesystem: **119, de los cuales 108 son negativos
y 11 positivos**. Los 826 casos incluyen 19 regresiones de entrada/cleanup y 119
controles filesystem sobre los 688 casos históricos. La ampliación de la guarda
respecto a la ejecución histórica de 768 añade 58 controles: 48 negativos y 10
positivos. No se suman ejecuciones históricas ni se cuenta el wrapper dentro de
los 826 casos.

La auditoría final independiente, exclusivamente estática, concluyó:
**APTA PARA COMMIT EXPERIMENTAL OFFLINE.** No encontró defectos funcionales o de
seguridad bloqueantes dentro de ese alcance. Los 826 tests no se repiten para la
actualización documental y el commit local; no se atribuyen a la última ejecución
versiones, tiempos, costes ni métricas de mutación de las ejecuciones históricas.

Se mantienen las exclusiones de regresión global, Jasmine, writer/readiness/leases,
bootstrap 9G, fixtures Git y canales operacionales, así como los riesgos residuales
de carreras entre comprobación y operación, referencias guardadas, bindings
nativos y host modificado descritos arriba. Los PASS y el dictamen no acreditan
aislamiento operacional ni autorizan tráfico real, credenciales API, gasto o
writer operacional. RUNTIME_NOT_ISOLATED y todos los gates siguen vigentes.
El commit experimental offline no completa Phase 9 ni cambia AVA-76 a Finalizadas.

### Preparación offline: observación del transporte y clasificación de resultados

La vía nativa sigue dormida, sin emisor de nativeReviews ni caller productivo.
El puerto preparado devuelve ahora cuerpo y recibo opaco de observación. El
registro privado del transporte liga el recibo al intento, sesión, request,
fingerprint, etapa, frames, PID, vencimiento, cuerpo exacto y SHA-256 del cuerpo. Su consumidor
quema el recibo antes de contrastar contexto y respuesta; una copia, sustitución
o replay no permite corregir y reintentar. El recibo no es un permiso de llamada,
una credencial, un handoff ni una autorización de escritura.

Una observación de transporte y la validación semántica son hechos separados.
El consumidor preparado distingue NATIVE_COUNT_VALID y NATIVE_PLAN_VALID de los
estados públicos LAB_COUNT_VALID y LAB_PLAN_VALID, que conserva el recorrido de
transcripciones. El prefijo NATIVE identifica el cableado preparado, no prueba
comercial: sus mocks llevan expresamente origin=SIMULATED_NATIVE_HTTPS y evidencia
SIMULATED_NATIVE_TRANSPORT_NOT_PROVIDER_EVIDENCE. Una futura observación nativa
sin confianza independiente del host lleva NATIVE_HTTPS_UNATTESTED; ninguna de
estas etiquetas acredita autenticidad comercial ni aislamiento del proceso.

semanticValidation distingue NOT_VALIDATED, REJECTED, COUNT_VALID y PLAN_VALID.
RESPONSE_OBSERVED no implica JSON válido ni FixPlan aceptado. Fallos, timeout y
cancelación devuelven BLOCKED con outcome=UNCERTAIN; sin observación consumida no
se declara una respuesta observada con éxito. No se emite un recibo COUNT válido
ni un plan de éxito tras esos fallos. Los resultados nativos no son reconocidos
como recibos/resultados LAB ni entran en su transición pública.

La economía distingue SIMULATED_ONLY, UNKNOWN y PENDING_RECONCILIATION.
knownBilledMicroUsd y countPriceMicroUsd permanecen null: no hay fuente de
conciliación auténtica ni prueba suficiente de precio COUNT. Una estimación de
generación calculada con el snapshot histórico de tarifas se identifica como
KNOWN_ESTIMATE_ONLY, nunca como cargo conocido. usageIsBillingEvidence permanece false;
un timeout, cancelación o fallo no transforma incertidumbre en una factura cero.
Las reservas conservan el tratamiento de incertidumbre previo; no se habilita un
ledger económico operativo ni se convierte el presupuesto simulado en dinero.

Las pruebas de esta preparación instrumentan únicamente módulos en memoria e IO
ficticio; no acreditan DNS/TLS externos, procedencia del host ni respuesta comercial.
No se añade acceso de test en los artefactos productivos. Continúan intactos
RUNTIME_NOT_ISOLATED, realExecutionEnabled=false, el FixPlan en memoria y las
exclusiones de writer/readiness/leases, bootstrap 9G y guías reales. Esta entrega
queda pendiente de auditoría independiente, sin staging, commit ni activación.

El presupuesto del supervisor de la suite manual pasa de 120000 a 240000 ms para
acomodar las regresiones de observación: una ejecución completa de 263 casos
terminó en unos 156 segundos tras agotar el límite inicial de 120 segundos. No se
modifica el deadline de inferencia de 30000 ms ni el límite filesystem de 420000 ms;
el timeout exterior de 900000 ms continúa siendo nominal. La ampliación no relaja
aserciones ni acredita aislamiento, rendimiento del proveedor o autorización.

### Verificación de la separación de observación, 05/11/2026

Ejecución completa del wrapper offline con Node 22.13.1 en Windows:
**854 casos PASS, 0 FAIL, 0 SKIP y 0 CANCELLED**, más **un wrapper PASS** separado.
Desglose: entrada 102; manual 266; broker 108; HTTP 141; adaptador HTTPS 118;
controles filesystem 119. Los 28 casos nuevos están incluidos en los 266 manuales;
no se suman las pasadas focalizadas, intermedias ni los resúmenes duplicados.
Los 826 anteriores se conservan como resultado histórico del commit experimental.

Typecheck y compilación solo a TEMP PASS; sintaxis de los tres archivos de pruebas
modificados PASS. Las cinco suites funcionales tienen networkAttempts,
processAttempts, privilegedAttempts, forbiddenGuideReads, forbiddenMutations y
forbiddenFilesystemCalls en cero. Mutaciones sintéticas permitidas observadas:
2.093 / 5.378 / 2.209 / 2.942 / 1.999. Los controles filesystem negativos exigen sus
rechazos deliberados; no se interpretan sus contadores como los ceros de las cinco
suites funcionales. El wrapper confirma **20/20 SHA-256 protegidos idénticos**.

Las nuevas regresiones cubren falsificación, copias/JSON/proxies, consumo único,
replay, cruce de etapa/intento, sesiones y requests auténticas distintas, digest y
fingerprint, cuerpo sustituido, alias UTF-8, caducidad y cancelación. Verifican que
un recibo activo nativo no se reconozca como LAB ni entre en su transición pública;
un transcript o recibo de observación tampoco autoriza otra llamada. Una respuesta
observada inválida se rechaza semánticamente; un plan ya validado cuyo intento
vence después no se publica como éxito. Ninguna estimación se convierte en factura.

Incidencias de las pasadas previas, sin ocultarlas en el total final: una suite
manual alcanzó el límite de supervisor de 120 segundos sin resumen; después
completó 263/263 casos en unos 156 segundos. En una pasada paralela HTTP tuvo
140 PASS y 1 FAIL en el caso preexistente de single flight (BLOCKED en lugar de
PROPOSAL_VALID). Su deadline es 1000 ms y el caso tardó unos 2642 ms; sensibilidad a
carga es una hipótesis, no una causa demostrada. Pasó aislado y en el wrapper
secuencial final, sin modificar su código, aserciones o deadline. Conservar esta
observación para la auditoría y no declarar demostrada la ausencia de flakiness.

No se ejecutaron regresión global, Jasmine, writer/readiness/leases, persistencia,
bootstrap/preflight 9G, fixtures Git ni canales operacionales. No hubo DNS/HTTPS
externos, credenciales reales, inferencia real ni gasto. Los módulos instrumentados
en memoria y los hashes no acreditan aislamiento OS ni procedencia confiable del
host. La implementación permanece sin staging ni commit y pendiente de auditoría
independiente; ningún gate operacional queda superado por estos PASS.
