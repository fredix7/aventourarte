# AVA-76: diagnóstico de arranque Windows — EXPERIMENTAL OFFLINE

Base de revisión: `626bf03d8785c986d76eb77942f1bba28dacaf2c`.
Dictamen de revisión independiente: **APTA PARA COMMIT EXPERIMENTAL OFFLINE**.
**C# NO COMPILADO. NORMAL/DEADLINE NO EJECUTADOS. HOST NO ACREDITADO.**
No se ha cargado el ensamblado del helper ni ejecutado ningún modo del ensayo.
Esta preparación no acredita que funcione en Windows: la compilación, las APIs
nativas, las rutas de volumen GUID y el comportamiento de Node están SIN VERIFICAR.

`RUNTIME_NOT_ISOLATED`, `realExecutionEnabled: false` y todos los bloqueos
comerciales siguen vigentes. Este directorio no se conecta al launcher, bootstrap
9G, inferencia, writer, readiness o leases. No completa AVA-76.
Conservar estos fuentes no autoriza inferencia real, uso de credenciales, gasto
ni writer.

## Cinco archivos y cambio de preparación

- `supervise.ps1`: supervisor Windows PowerShell 5.1 x64. No contiene Add-Type,
  compilación, LoadFrom, lectura de DLL por pathname ni generación de aprobaciones.
- `WindowsObserver.cs`: fuente para un helper compilado **en una fase externa
  separada**, revisado como binario y aprobado mediante un hash anterior al ensayo.
  Solo usa framework y APIs Windows; no requiere paquetes ni instalaciones.
- `diagnostic-child.cjs`: protocolo local inerte sin imports ni llamadas explícitas
  a filesystem, red, endpoints, procesos secundarios o APIs de la fábrica. Node
  necesita leer este archivo para cargarlo; eso no constituye aislamiento.
- `approval.example.json`: plantilla v2 deliberadamente inválida, no aprobación.
- Este README documenta las condiciones, resultados y límites de los anteriores.

El supervisor recibe el ensamblado como `byte[] ObserverAssemblyBytes` ya adquirido
por un procedimiento externo de confianza. Exige además el hash literal externo
`ApprovedObserverAssemblySha256`, clona el array, compara su SHA-256 y carga esa
misma copia con Assembly.Load(byte[]). No obtiene el binario del repositorio, del
hijo o de un pathname que todavía no pueda validar. Rechaza tipos Ava76 preexistentes.
La entrega del byte[] y la procedencia de PowerShell/CLR siguen siendo condiciones
externas; este script no autentica el procedimiento que lo invoca.

**NO-GO actual:** no se entrega DLL ni un launcher verificado para adquirir esos
bytes y arrancar la sesión limpia. No hay invocación autónoma lista para copiar.
No sustituir esa dependencia por ReadAllBytes/Get-Content/Get-FileHash sobre una
ruta sin validar. Resolverla exige preparación externa y autorización posteriores.

## Compilación externa y aprobación humana independiente

No compilar como parte del ensayo. Una futura preparación separada necesitaría:

1. Revisión del fuente y procedencia del compilador/framework, sin descargas,
   paquetes, consultas de certificados, revocación o actualizaciones de red.
2. Una ubicación local controlada ya existente fuera del repositorio, guías y
   archivos protegidos, con temporales explícitos revisados; usuario no elevado,
   entorno limpio y ninguna modificación de ACL/políticas/configuración Windows.
   Si no pueden acreditarse esas condiciones, **no compilar**.
3. Compilar únicamente el helper para .NET Framework compatible con Windows
   PowerShell 5.1 x64 y APIs Windows documentadas. No ejecutar el resultado.
   Revisar por separado los bytes resultantes, dependencias y registro de toolchain.
4. Aprobar externamente el hash del binario, además del fuente. El campo build
   vincula referencias revisadas, pero no prueba correspondencia fuente/binario,
   reproducción de build, ausencia de inyección ni autenticidad del compilador.
5. Aprobar Node y su versión contra una referencia independiente anterior. Obtener
   un hash solo mide; nunca sustituye esa revisión.

Una persona debe revisar todos los fuentes ejecutables y el binario separado,
crear la copia completa del manifiesto v2 fuera del working tree y aprobar el
SHA-256 de esa copia por un canal independiente anterior al arranque. El hash
literal externo del binario debe coincidir también con el manifiesto.

El revisor/fecha/toolchain escritos en JSON son **metadatos, no autenticación**.
La autoridad independiente permanece UNKNOWN en la evidencia. No autoaprobar
con el hash recién calculado de un archivo mutable. La plantilla incompleta y
codexSandboxUsersSid=null no permiten preparar una ejecución.

El supervisor tampoco puede autenticarse a sí mismo después de empezar.
El operador debe aprobar y proteger sus bytes **antes** de invocarlo desde una
sesión confiable. Su hash interno es defensa adicional. Cambios de los fuentes
invalidan sus aprobaciones anteriores. baselineCommit identifica la base revisada,
no autoriza integrar ni modificar HEAD.

## Preflight antes de cargar código externo

Antes de abrir ningún artefacto o cargar el helper:

- Exige Windows PowerShell Desktop x64, identidad autenticada, no SYSTEM/anónima
  y rol Administrator deshabilitado mediante WindowsIdentity/WindowsPrincipal.
  Una consulta fallida bloquea. Es una barrera conservadora, no inventario de
  privilegios ni prueba de integridad del host.
- Exige SystemRoot y WINDIR iguales a ApprovedWindowsDirectory, referencia externa.
  Solo admite además TEMP, TMP y los ocho nombres Windows indicados abajo, todos
  ausentes o vacíos. Cualquier otro nombre o valor no vacío bloquea. No publica
  valores desconocidos. Deshabilita autoload de módulos en esta sesión.
- Exige el hash externo del array privado antes de Assembly.Load. No compila,
  no crea temporales y no modifica el entorno del sistema.
- Después de cargar los bytes aprobados, contrasta TokenElevation mediante Windows
  antes de tocar rutas. UNKNOWN o elevación bloquean, sin crear Node.

Estas comprobaciones ocurren después del arranque de PowerShell/CLR. No eliminan
código ya ejecutado por perfiles, instrumentación, profilers, políticas del host
o un invocador manipulado. El procedimiento externo debe entregar una sesión nueva,
no elevada, sin perfiles, sin secretos ni esas superficies; si no puede revisarse,
NO-GO. No usar ExecutionPolicy Bypass ni cambiar políticas para conseguir el arranque.

## Rutas locales, bytes consumidos y DACL

LocalFiles no lee primero File.Exists/GetAttributes/GetAccessControl por la ruta
del operador. Su política es cerrada y deliberadamente poco compatible:

1. Valida léxicamente rutas absolutas X:\, componentes, nombres reservados, ADS,
   dispositivos, UNC, separadores ambiguos y spellings con puntos/espacios finales.
2. QueryDosDevice debe indicar **un único** mapeo directo
   \Device\HarddiskVolumeN. Rechaza SUBST (\??\...), MUP/redirectores SMB, mappings
   múltiples, desconocidos o errores antes de abrir contenido. La apertura utiliza
   el dispositivo NT capturado, sin volver a resolver la letra para abrirlo.
3. Abre cada componente desde el nombre NT capturado mediante CreateFile
   OPEN_EXISTING + OPEN_REPARSE_POINT + BACKUP_SEMANTICS. Recorre de raíz a hoja,
   reteniendo handles sin compartir escritura/borrado antes de descender.
   Rechaza junctions, mount points, symlinks, archivos offline/recall y reparse points.
4. Por cada handle, NtQueryVolumeInformationFile(FileFsDeviceInformation) exige
   FILE_DEVICE_DISK (7) y ausencia de FILE_REMOTE_DEVICE. Contrasta el nombre NT
   final por handle; cualquier indisponibilidad, alias no normalizado o discrepancia
   bloquea. Estas comprobaciones no acreditan disco fijo, localidad física del
   almacenamiento ni aislamiento.
5. Rechaza archivos con más de un hardlink y archivos mayores de 512 MiB. Guarda
   identidad de volumen/file ID y obtiene la ruta final de volumen GUID por handle.
   Esa ruta GUID es la consumida por CreateProcess, Node y cwd, sin depender del
   mapeo mutable de una letra. Revalida mapping y nombres finales antes de cada
   arranque y al terminar. Hashes y manifiesto se leen desde los mismos handles
   retenidos; el manifiesto tiene un máximo de 16384 bytes.
6. Recoge owner/DACL de esos handles sin traducir SIDs a cuentas ni consultar red.
   DACL no legible, NULL DACL o ALLOW de escritura observado para el SID revisado
   bloquean antes del primer hijo. No cambia permisos ni trata DENY como una
   reparación. Ausencia de ALLOW directo no acredita acceso efectivo: UNKNOWN.

Las comprobaciones cubren manifiesto, Node, supervisor, fuente C#, hijo, Windows,
cwd y temporal aprobado. TEMP/TMP deben apuntar a un directorio existente, validado
igual y sin solapamiento físico con el repositorio (ni ancestro ni descendiente).
El ensayo no crea ese directorio y no escribe archivos allí.

Se usa un SID local revisado externamente, también pasado como parámetro
ReviewedCodexSandboxUsersSid. Debe coincidir con el manifiesto; no se inventa ni
resuelve automáticamente. El Modify histórico de CodexSandboxUsers en el
repositorio puede mantener este procedimiento bloqueado: **no corregir ACL para
hacer pasar el ensayo**. hostTrust permanece UNKNOWN incluso sin una exposición.

Esto reduce carreras de pathname bajo el modelo de un kernel/filesystem confiable
y handles respetados. No equivale a CreateProcess por un handle aprobado ni impide
mappings GUID alterados con privilegios, escrituras por mappings de memoria previos,
minifiltros hostiles, inyección o manipulación de DLL/OS. Tampoco prueba que el disco
local no use iSCSI, virtualización o almacenamiento remoto subyacente. Si esas
condiciones materiales son inciertas, o se exige ausencia garantizada de tráfico,
NO-GO: se necesita una frontera/infraestructura revisada por separado. No se crea aquí.

## Ciclo del hijo, ownership y cleanup

Run recibe un Trial creado y registrado por PowerShell **antes** de crear el hijo.
Todo el ciclo está dentro de try/finally. Tras Process.Start se registra el PID
antes de preparar handles, lectores u observaciones. Si la preparación falla,
la limpieza intenta terminar el proceso y conserva PID, fallo y resultado parcial.
Si Process.Start lanza antes de devolver éxito, se intenta recuperar el PID enlazado
al objeto Process. Si no está disponible, CreationUncertain y el fallo de limpieza
quedan registrados: no se inventa un PID ni se afirma que no se creara un proceso.

El controlador y el watchdog tienen duplicados independientes no heredables del
handle, con ownership SafeHandle. P/Invoke retiene su referencia durante cada
llamada. El hilo del watchdog libera exclusivamente su duplicado al finalizar.
Un join fallido nunca permite cerrar su handle desde otro hilo.

No hay Tasks ni lectores asíncronos con un IntPtr de proceso. El supervisor posee
dos lectores de pipes en su propio hilo: PeekNamedPipe comprueba disponibilidad
y ReadFile consume como máximo esos bytes, en bloques de 512 y hasta 8192 por canal.
Solo existe un consumidor por pipe; un lector nunca termina un proceso.
Al parar el ciclo no quedan lectores pendientes que cancelar. Después se drena
hasta EOF durante un máximo nominal de 250 ms; sin EOF, fallo explícito. Los pipes
y buffers se cierran individualmente. La lectura UTF-8 es estricta.

Cada acción de terminación, cancelación del watchdog, join, drenaje, cierre de
stdio/handles/buffers y Dispose está capturada por separado. No se puede omitir
el resto por una excepción anterior. El resultado conserva CleanupFailed,
CleanupErrors y confirmaciones de finalización; una limpieza fallida no permite
PASS ni un segundo hijo. Los locks se liberan individualmente al final, antes de
calcular procedure.complete.

Los errores catastróficos del proceso supervisor (muerte, OS/CLR averiado, falta
extrema de memoria, una llamada nativa que nunca retorna) no quedan contenidos.
Peek/ReadFile y CreateProcess no constituyen una garantía de tiempo real. El
watchdog no necesita locks de los lectores ni espera su cleanup; sigue en su hilo.
No existe Job Object ni contención de descendientes. Pipes retenidos por un
descendiente impiden confirmar EOF. Un hijo sin terminación confirmada bloquea el
siguiente y requiere inspección externa del PID; no se declara limpieza exitosa.
Tampoco se acredita un inventario/allowlist de handles heredables del invocador:
ProcessStartInfo en este diseño no constituye esa frontera. Los handles propios
del validador y los duplicados del watchdog no son heredables, pero si se exige
descartar cualquier otro handle ambiental hace falta otro launcher revisado; NO-GO.

## NORMAL, DEADLINE y tiempos verificables

Ambos modos usan exactamente los mismos ejecutable, fuente, flags y entorno.
NORMAL recibe un nonce público por stdin. DEADLINE no recibe nada y debe ser
terminado externamente. El autoexit 3 a los 20 segundos es emergencia, nunca PASS.

El origen monotónico es inmediatamente antes de Process.Start. Se registran:

- StartReturnedMs: retorno de creación, con PID ya registrado.
- DeadlineMs=10000: vencimiento nominal desde ese origen.
- WatchdogFiredMs: observación del vencimiento por el hilo.
- KillRequestedMs: instante inmediatamente anterior a TerminateProcess(124).
- ExitObservedMs: primera observación del handle señalado, no hora exacta del kernel.
- ElapsedMs: incluye supervisión y cleanup; no sustituye los eventos anteriores.

DEADLINE exige WatchdogFiredMs >=10000, KillRequestedMs >=WatchdogFiredMs,
KillRequestedMs <=10250 y ExitObservedMs entre KillRequestedMs y
KillRequestedMs+2000, además de TimedOut, KillSucceeded, salida 124, stdout vacío,
stderr vacío, EOF, joins y cleanup correctos. La duración total debe ser <=15000,
como límite adicional, nunca como única prueba del plazo.

Los 250 ms son una tolerancia fija para despacho del hilo de un ensayo diagnóstico;
los 2000 ms permiten observar terminación asíncrona y completar/cancelar IO de Windows.
No son SLA ni garantías de tiempo real demostradas. Carga excesiva que los exceda
produce FAIL: no se amplían automáticamente ni se reinterpretan como PASS.
Si CreateProcess bloquea antes de disponer de handle/PID, este watchdog no puede
garantizar terminación: el límite global de creación sigue siendo NO-GO si se exige.

NORMAL exige salida 0 observada antes de 10000 ms, sin watchdog, nonce y PID
contrastados, padre Windows correcto, imagen NT igual al archivo fijado y contexto
de SID/elevación/integridad contrastado con el supervisor. Versión, argv, cwd,
entorno y módulo único son declaraciones del hijo contrastadas, no atestación
OS de memoria o actividad. Para execPath/cwd/argv se admiten solo los spellings
fijados original y GUID; flags siguen siendo --no-addons --no-global-search-paths.
La compatibilidad real de Node con estos spellings está pendiente, sin fallback
automático a una ruta menos protegida.

El entorno de Node se construye vacío: SystemRoot/WINDIR y TEMP/TMP usan las rutas
GUID fijadas, NODE_DISABLE_COMPILE_CACHE=1 y HOMEDRIVE, HOMEPATH, LOGONSERVER, PATH,
SYSTEMDRIVE, USERDOMAIN, USERNAME, USERPROFILE explícitamente vacías.
No se transmiten NODE_OPTIONS, NODE_PATH, coverage, proxy, OpenSSL, keylog ni secretos.
Un entorno vacío no revoca permisos de disco, red o acceso a credenciales del usuario.

## Estados y evidencia

attemptedCalls cuenta llamadas a Run; startedProcesses cuenta creaciones observadas;
verifiedTrials solo aumenta cuando **todas** las comprobaciones obligatorias del
modo son PASS. Una observación UNKNOWN de imagen, padre o token detiene la secuencia.
No se completa con afirmaciones del hijo.

procedure.complete se calcula después de cleanup: FAIL ante cualquier FAIL
obligatorio, UNKNOWN ante un UNKNOWN obligatorio o menos de dos modos verificados,
PASS solo con los dos modos y todos sus criterios obligatorios acreditados.
Los límites de host, acceso efectivo, aprobación externa e infraestructura se
etiquetan por separado como no acreditados localmente; no conceden autoridad.

overall es FAIL si hay cualquier FAIL, UNKNOWN si queda cualquier UNKNOWN y PASS
solo sin ninguno de ellos. Los códigos son 1, 2 y 0 respectivamente. Este diseño
conserva UNKNOWN sobre límites externos incluso cuando procedure.complete pase.
DACL FAIL jamás concluye host confiable ni permite lanzar Node.

El JSON no incluye stdout/stderr crudos, valores desconocidos ni mensajes de
excepción. Sí incluye rutas, SIDs, DACL, PID y tiempos: compartirlo requiere revisar
su contenido. La evidencia debe escribirse externamente en una ubicación local
prevalidada, fuera del repo/protegidos; la redirección del invocador queda fuera de
este script y también requiere revisión. No usar destinos remotos.

## NO-GO y bloqueos inalterados

- Ninguna autorización de ejecución, compilación, commit o publicación nace de este
  documento. Una aprobación de commit experimental no autoriza el ensayo.
- Sin preparación externa verificable del helper y sesión, permisos existentes
  adecuados y nuevas aprobación/auditoría independientes: no ejecutar.
- No se leen almacenes de credenciales ni se llaman endpoints, inferencia o writer
  en estos fuentes. No se acredita imposibilidad de hacerlo bajo el token normal.
- No se modifican ACL, firewall, certificados, políticas, configuración Windows,
  repositorio, guías, production.json, .git/info/exclude o developer para superar gates.
- No hay token restringido, AppContainer, VM, contenedor, frontera de red o
  aislamiento operacional acreditados. Las DLL, framework, kernel, almacenamiento
  y proceso padre son dependencias de confianza externas.
- No se verifican TLS, precios, cuotas, presupuesto, identidad de proyecto,
  facturación, autenticidad de proveedor ni exclusividad comercial.
- No se emiten nativeReviews ni se activan cliente nativo, smoke remoto, Fixer,
  writer, readiness o leases. RUNTIME_NOT_ISOLATED y todos los NO-GO comerciales
  permanecen. Phase 9 y AVA-76 no se declaran finalizadas.

## Referencias de las APIs (documentación, no evidencia de ejecución)

- [QueryDosDevice](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-querydosdevicew),
  [CreateFile y OPEN_REPARSE_POINT](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfilew),
  [GetFinalPathNameByHandle](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-getfinalpathnamebyhandlew).
- [NtQueryVolumeInformationFile](https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/ntifs/nf-ntifs-ntqueryvolumeinformationfile).
- [PeekNamedPipe y sus límites](https://learn.microsoft.com/en-us/windows/win32/api/namedpipeapi/nf-namedpipeapi-peeknamedpipe),
  [TerminateProcess y terminación asíncrona](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-terminateprocess).
