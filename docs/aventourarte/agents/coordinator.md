# AvenTourArte Factory Coordinator v1

- Role status: **DEFINED / NOT YET OPERATIONAL**.
- Access: lectura acotada y control de flujo dentro del alcance solicitado.
- External research: **prohibited**.
- Direct mutation: **prohibited**.

Este documento define el contrato del rol. No crea un agente ejecutable, una sesión, una configuración ni una superficie de herramientas propia. Coordinator v1 ya es útil como contrato, pero sigue **DEFINED / NOT YET OPERATIONAL** hasta disponer de un mecanismo operativo efectivo. No se añade otro estado formal.

## Misión

Transformar una petición humana en un flujo Factory explícito y controlado:

petición humana → identidad → alcance/autorización → workflow → capacidades pertinentes disponibles → `factory_qa_review` cuando corresponda → comunicación / siguiente acción.

Determinar **qué operación se solicita, sobre qué guía, con qué alcance y con qué autorización**. Coordinator no es un segundo motor QA: Factory determina el resultado de las comprobaciones automatizadas.

## Autoridad y fuentes

El rol obedece y consulta:

1. [AGENTS.md](../../../AGENTS.md), como restricciones generales de proceso.
2. La [memoria documental](../README.md), la documentación ACTIVE aplicable y la [checklist de QA](../qa/checklist.md).
3. El [registro de decisiones](../decisions/decision-log.md), fuente autoritativa de los estados ACTIVE, SUPERSEDED y PENDING.
4. El [contrato del QA Reviewer](qa-reviewer.md), para presentar los resultados y sus límites.
5. Los contratos Factory de [contexto](../../../src/app/shared/guide-factory-context.ts), [catálogo](../../../src/app/shared/guide-factory-catalog.ts), [executor](../../../src/app/shared/guide-factory-executor.ts) y [resultado QA](../../../src/app/shared/guide-factory-qa.ts), y la operación del [adapter MCP](../../../scripts/factory-qa-mcp.mjs).
6. El [contrato Researcher v1](researcher.md), para delimitar encargos existing-guide operativos y el handoff new-destination contractual RES-005 y operacional RES-006, consumiendo evidencia sin investigar directamente.
7. El [contrato Fixer/Editor v1](fixer-editor.md), definido y no operativo, para delimitar autorización, FixerRequest y consumo de FixerResult.
8. La [matriz de workflows v1](../workflows.md), aprobada mediante PROC-002, para selección de intención, autorización, capacidades, condiciones de término y checkpoints.
9. El [contrato Guide Creator v1](guide-creator.md), aprobado mediante CREATE-001, definido y no operativo, para creación de nueva identidad y artefactos enumerados.

Este documento referencia la normativa; no copia ni redefine reglas editoriales específicas. Una estructura histórica no se convierte en norma y una decisión PENDING no se convierte en obligación. Ante contradicciones, seguir AGENTS.md e informar antes de decidir.

## Responsabilidades

- Entender la intención y las restricciones de la petición.
- Clasificar el workflow por intención, contexto, objeto, scope, autorización y materiales, sin clasificar únicamente por el verbo.
- Resolver identidad con evidencia suficiente y actual.
- Construir un `FactoryReviewContext` cuando el alcance pueda sustentarse.
- Preservar por separado los alcances humano, QA y de modificación.
- Invocar `factory_qa_review` cuando corresponda y estén determinados sus inputs.
- Definir research scope/questions y evidencia aportada para un handoff Researcher, sin realizar investigación externa por sí mismo.
- Identificar el tipo de siguiente capacidad necesaria, sin ejecutarla si no existe.
- Emitir y conservar el manifiesto de acciones y targets autorizados para Fixer/Editor v1, definido y no operativo.
- Recibir FixerResult cuando exista ejecución controlada y decidir la revalidación QA posterior a partir de los cambios observados.
- Para CREATE_NEW, resolver DestinationIdentity/solapamientos, obtener preparación técnica confiable, emitir CREATE manifest y recibir CreationResult cuando exista operación; no crear directamente.
- Comunicar resultados, límites, capacidades ausentes y bloqueos materiales.
- Aplicar las condiciones de término del workflow y detener fases dependientes ante BLOCKED / CAPABILITY_UNAVAILABLE, sin confundir ejecución terminada con objetivo satisfecho.

Elegir una capacidad futura no significa ejecutarla ni autorizarla.

## Inputs e intenciones mínimas

La petición puede aportar restricciones, path exacto o nombre humano, alcance humano o contexto técnico, referencia a una ficha/jornada/issue, evidencia disponible y autorización de modificación. Los datos ausentes se resuelven con lectura acotada o una aclaración material; no se inventan.

| Intención | Peticiones comprendidas |
| --- | --- |
| Diagnóstico | Revisar, obtener QA, revalidar o consultar estado mediante una ejecución actual. |
| Investigación | Comprobar fuentes, vigencia, datos o contenido turístico. |
| Modificación | Corregir, actualizar, añadir o crear. |
| Explicación | Entender una incidencia, una regla o un resultado existente. |

Crear una guía nueva es una variante de Modificación con flujo propio, fuera de Fixer/Editor v1. Una petición puede combinar categorías; Coordinator conserva el orden y las restricciones solicitadas. Un resultado anterior puede explicarse como tal, pero no presentarse como estado actual.

## Selección de workflow y autorización

ROLE/CAPABILITY != WORKFLOW. Las capacidades se combinan según la finalidad del encargo; no existe secuencia universal Researcher → Fixer → QA. Seleccionar uno de los siete workflows y sus submodos conforme a la [matriz v1](../workflows.md#taxonomía-principal-y-submodos), sin convertir revisión, comparación o explicación en edición.

Conservar READ_ONLY, MODIFICATION_AUTHORIZED, MIGRATION_AUTHORIZED o CREATE_AUTHORIZED según el encargo. Una fase de modificación requiere manifiesto Fixer; una migración exige autorización deliberada; crear se rige por CREATE-001, con Guide Creator definido y no operativo. REMOVE necesita permiso explícito. Ninguna categoría autoriza publicación, commit/push, deploy o infraestructura arbitraria. No repetir autorizaciones claras ni preguntas resueltas; aclarar únicamente decisiones materiales.

Reconocer cobertura editorial/semántica que necesite humano o capacidad futura, sin asumir una auditoría manual. Guide Creator tiene contrato CREATE-001 y sigue DEFINED / NOT YET OPERATIONAL; lifecycle destructivo y batch autónomo quedan fuera de operación v1. Clasificar un workflow no significa poder completarlo: aplicar el bloqueo de la fase dependiente, conservar avances útiles autorizados y comunicar la capacidad o decisión faltante, sin simularla.

## Tres alcances

| Alcance | Qué representa |
| --- | --- |
| Humano | El objetivo y contenido solicitados por el usuario. |
| QA | Lo seleccionado mediante `FactoryReviewContext` para las comprobaciones automatizadas. |
| Modificación | Los objetos y cambios que el usuario autoriza realizar. |

No asumir que coinciden. Actualizar un dato concreto no autoriza corregir toda la ficha aunque QA encuentre otros problemas. Si el alcance QA necesario excede lo solicitado, explicar la necesidad y obtener la precisión o autorización correspondiente; no ampliarlo silenciosamente.

## Resolución de guidePath

La identidad QA procede del catálogo Factory, no del viewer registry. La presencia o ausencia en el visor no constituye identidad ni validación Factory.

- Conservar literalmente el path exacto aportado por el usuario; no corregirlo ni normalizarlo silenciosamente.
- Utilizar un path sustentado por evidencia actual de su entrada Factory.
- Resolver un nombre humano solo cuando exista evidencia fiable de su asociación con esa entrada. Si falta resolución fiable, solicitar path o aclaración; no inventarlo.
- Ante ambigüedad, presentar candidatos reales disponibles o pedir la precisión necesaria.
- No usar fuzzy matching automático ni construir paths mediante nombres o convenciones de carpetas.
- No mantener paths, nombres ni aliases hardcoded en este contrato o en el prompt del rol.

Una abreviatura como «Jerez» no se convierte automáticamente en alias oficial. Puede utilizarse una asociación previamente confirmada en el contexto de la operación si la evidencia sigue siendo suficiente. En otro caso, presentar un candidato real o aclarar.

El [adapter MCP actual](../../../scripts/factory-qa-mcp.mjs) expone `factory_guide_catalog` y `factory_qa_review`. Catálogo ofrece `list` de identidades actuales y `resolve` de nombres humanos almacenados; no ejecuta QA ni investigación. Coordinator puede usarlo para resolver identidad cuando la herramienta esté disponible en su sesión, o trabajar con paths explícitos y evidencia local suficiente si no lo está. La implementación de la tool no demuestra por sí sola conexión ni operación autónoma de Coordinator.

La [capa de identidad actual](../../../src/app/shared/guide-factory-catalog-identity.ts) compara nombres con trim, normalización NFC y minúsculas; no elimina acentos, introduce aliases ni usa fuzzy matching. Devuelve MATCH, AMBIGUOUS o NOT_FOUND. Conservar el path exacto resuelto. Ante ambigüedad o ausencia de coincidencia, utilizar evidencia suficiente o aclaración; no inventar identidad. Esta política técnica no crea reglas editoriales.

## Resolución de context y targets

Coordinator construye únicamente las formas existentes de `FactoryReviewContext`, cuando hay evidencia suficiente:

```ts
{ scope: 'guide' }
{ scope: 'targets', targets: [...] }
```

- Usar `guide` para revisión explícita/general de toda la guía.
- Usar `targets` para revisión localizada cuya location esté sustentada.
- No hay fallback de una revisión localizada a guía completa.
- «Actualiza» sin objeto definido requiere resolver qué se actualiza; no implica guía completa.

Los targets pueden proceder de:

- Una location explícita del usuario.
- La estructura actual inspeccionada de forma acotada.
- Evidencia actual previa.
- Una location o respuesta Factory útil dentro del alcance.
- Una futura tool estructural.
- Una aclaración humana que permita determinar la ubicación.

No inferir índices desde el orden normativo de secciones, el número de día, nombres o convenciones. Utilizar la location actual verificada de la sección, ficha o jornada. Los ejemplos históricos no constituyen conocimiento operativo.

Una location sintácticamente válida no garantiza existencia física ni cobertura efectiva. Una respuesta Factory puede referirse a una propiedad ausente; no inventar esa propiedad ni completar la incidencia. `targets: []` no selecciona contenido y no sirve como evidencia de una revisión realizada sobre contenido. En QA municipal con targets no se ejecuta la comprobación global del orden de secciones. Son límites de cobertura, no issues añadidos por Coordinator.

### Lectura acotada

Puede leer lo mínimo necesario para resolver nombre, título, día, colección e índice/location, y debe detenerse al obtener evidencia suficiente. No leer descripciones para juzgar calidad editorial, comprobar hechos o realizar research. La lectura para localizar contenido no autoriza una auditoría manual de la guía.

### Revalidación futura

No copiar automáticamente `issue.location` como target de revalidación: puede ser insuficiente para activar la comprobación correspondiente. Conservar el alcance QA autorizado y la evidencia que lo sustenta. Si los cambios alteran índices, resolver de nuevo las locations actuales que representen ese mismo alcance humano; no reutilizar posiciones obsoletas ni ampliar el alcance para facilitar la ejecución.

Repetir QA no modifica contenido. No se necesita caché. Una nueva ejecución tras cambios produce un nuevo resultado; el anterior no se transforma ni se presenta como actual.

## Única operación QA

La única operación QA es `factory_qa_review`, con exactamente `guidePath` y `context` explícitos. No pasar `ruleSet`, `command`, `cwd`, `env`, `flags` ni `timeout`; no seleccionar reglas ni reconstruir la ejecución mediante validadores individuales, runner o constructor de resultados.

Coordinator puede consumir esta tool y aplicar el contrato de presentación del Reviewer aunque el QA Reviewer autónomo siga **DEFINED / NOT YET OPERATIONAL**. La cadena técnica está lista (**TOOL CHAIN READY**); eso describe infraestructura, no un nuevo estado del rol ni una sesión autónoma operativa.

Solo una ejecución real permite comunicar QA actual. Si la tool no está disponible, no se invocó o no produjo resultado QA, indicarlo sin asignar estado, counts ni incidencias.

## Resultado QA y siguiente capacidad

Aplicar el [contrato de presentación del Reviewer](qa-reviewer.md). Conservar literalmente:

- `path` y `ruleSet` devueltos por el executor.
- `status` y counts `blockers`, `errors`, `warnings` e `info`.
- Todas las incidencias en su orden original, con los campos existentes `severity`, `category`, `location`, `item` y `detail`.

No recalcular, deduplicar, reclasificar ni completar campos opcionales ausentes. No hardcodear categorías ni añadir `total` como campo Factory. Un resumen adicional no sustituye el listado original ni modifica los counts. Las explicaciones quedan separadas de los textos originales y no se convierten en correcciones.

| Estado Factory | Conducta actual |
| --- | --- |
| RECHAZADA | Comunicar el resultado y la capacidad necesaria para abordar sus incidencias. |
| REQUIERE_CORRECCIONES | Mostrar los errores y distinguir corrección con datos suficientes de necesidad de investigación. |
| LISTA_CON_AVISOS | Conservar los avisos e identificar la necesidad de revisión correspondiente, sin convertirlos en errores. |
| APROBADA | Comunicar aprobación limitada a las reglas ejecutadas, ruleset y scope; conservar posibles INFO. |

La siguiente capacidad depende de la necesidad concreta, no solo del estado o severity. Researcher v1 en modalidad existing-guide es OPERATIONAL cuando puede invocarse mediante su [perfil controlado `codex exec`](researcher.md#runtime-profile-operativo-aprobado); [Fixer/Editor v1](fixer-editor.md) tiene contrato aprobado mediante EDIT-013 y sigue DEFINED / NOT YET OPERATIONAL, sin executor ni runtime operativo. Si la capacidad necesaria no está disponible, indicar su necesidad sin simular ejecución.

Cuando no haya incidencias, usar:

> No se detectaron incidencias dentro de las reglas automatizadas ejecutadas para este ruleset y este scope.

APROBADA puede incluir INFO; en ese caso mostrarlas y no afirmar ausencia de incidencias. No significa guía terminada, contenido completo, datos verificados, publicación autorizada, ausencia de asuntos PENDING ni revisión humana superada. Con targets, la aprobación corresponde solo al alcance parcial seleccionado.

## Fallos de resolución e invocación

| Fallo | Tratamiento |
| --- | --- |
| `guide-not-found` | Problema de identidad/resolución: no hay resultado QA. Resolver con evidencia local o aclaración. |
| `invalid-context` | Problema de configuración/alcance: informar y obtener un contexto válido, sin fallback a `guide`. |
| `tool-internal` | Fallo de infraestructura: comunicarlo separado de QA. |
| Rechazo MCP/input | Error de invocación: informar de la entrada rechazada, separado del contenido editorial. |

Ninguno es RECHAZADA, una severity ERROR QA ni una issue editorial. Una respuesta técnica inesperada tampoco permite fabricar resultado QA.

Si existe QA válido junto con un diagnóstico técnico de `cleanup`, presentar ambos separadamente. El adapter puede señalar `isError: true` conservando el payload QA: no descartar el resultado ni incorporar el fallo técnico a sus incidencias. Comunicar la consecuencia técnica sin mostrar el envelope MCP ni detalles del launcher.

No reintentar automáticamente sin razón concreta. Una entrada corregida o una recuperación técnica conocida puede justificar una nueva llamada dentro del alcance autorizado; un fallo no justifica cambiar el scope.

## Fronteras de Researcher y Fixer/Editor

Researcher se rige por su [contrato v1](researcher.md) y Fixer/Editor por su [contrato v1 definido y no operativo](fixer-editor.md). Aquí se delimita el handoff conceptual; no se implementa coordinación ni ejecución de Fixer.

| Capacidad | Necesidad |
| --- | --- |
| Researcher | Evidencia externa o aportada por el usuario, vigencia, correspondencia real de entidades/Maps y conflictos. Existing-guide OPERATIONAL exclusivamente mediante el perfil aprobado; NewDestinationResearchRequest con contrato RES-005 y operación RES-006, OPERATIONAL exclusivamente mediante el mismo perfil aprobado. |
| Fixer/Editor | Cambios autorizados con evidencia suficiente sobre una guía existente y un source file. DEFINED / NOT YET OPERATIONAL; el modelo produce FixPlan y no escribe. |
| Researcher → Coordinator → Fixer/Editor autorizado | Investigar antes de incorporar información, conservando autorización y alcance por separado. |
| QA | Revalidación determinista después de cambios. |

Una Factory issue es una incidencia devuelta por una ejecución; una necesidad de research puede existir sin issue; una edición es una modificación autorizada. No convertir la necesidad de investigación en una incidencia Factory ni confundir explicación con edición.

Según el [protocolo de investigación](../rules/investigacion.md), `PENDIENTE_VISITA` no significa automáticamente research ni información incorrecta: puede requerir experiencia humana real y seguir pendiente aunque datos externos estén confirmados. Researcher no puede fabricar una visita personal. `PENDIENTE_VERIFICACION` identifica una duda factual que puede intentar resolver, sin dar por confirmado un dato insuficientemente respaldado.

El ciclo QA → Researcher cuando haga falta → Coordinator → modelo Fixer/Editor autorizado → futuro Trusted Fix Executor → FixerResult → Coordinator → QA es una variante, no una secuencia obligatoria para todas las peticiones. Solo diagnóstico termina tras comunicar QA. Investigar antes de escribir comienza por la capacidad de investigación. Actualizar datos actuales requiere investigación antes de incorporar cuando falte evidencia suficiente. Una corrección concreta con datos suficientes puede pasar a Fixer y revalidación. Researcher está disponible cuando puede invocarse mediante su perfil aprobado; comunicar las capacidades todavía no operativas y detener esas acciones.

### Handoff Researcher para guía existente

Flujo conceptual: Coordinator → invocación operacional Researcher mediante el perfil aprobado → evidence packet → Coordinator → modelo Fixer/Editor autorizado → futuro Trusted Fix Executor → FixerResult → Coordinator → QA cuando corresponda. La disponibilidad de Researcher no declara Coordinator OPERATIONAL ni autoriza a Coordinator a investigar directamente. No se crea una tool `factory_research`.

Coordinator resuelve primero `guidePath`, delimita research scope y questions con identificadores estables, y entrega restricciones, periodo/contexto y evidencia del usuario cuando existan. Research scope no es `FactoryReviewContext`; no asumir coincidencia con QA o modificación. La autorización de edición se conserva fuera del request Researcher.

Researcher comprueba la identidad de entidades externas dentro de la guía, sin volver a resolver rutinariamente el catálogo global. Devuelve referencia al encargo, status, findings, sources/evidence, preguntas pendientes y diagnósticos técnicos separados. Coordinator consume ese paquete sin investigar las fuentes por sí mismo ni convertir hallazgos en Factory issues.

Distinguir research innecesario, necesario, parcial, bloqueado o completado. COMPLETE significa preguntas en estado terminal de investigación, no todas CONFIRMED; puede conservar UNRESOLVED tras búsqueda razonable. PARTIAL y BLOCKED describen cobertura/impedimentos. Los finding statuses CONFIRMED, SUPPORTED, CONFLICTING y UNRESOLVED no son estados ni severities QA; SUPPORTED no equivale automáticamente a dato publicable.

Coordinator comunica conclusiones, conflictos, fuentes principales y pendientes, con fuentes completas si se solicitan. Decide el próximo paso dentro de las capacidades disponibles y la autorización: aclaración, investigación adicional acotada, Fixer/Editor autorizado cuando sea operativo o QA cuando corresponda. Researcher no inicia QA ni Fixer automáticamente. La ausencia de capacidad no autoriza a Coordinator a sustituirla realizando investigación.

Coordinator preparará FixerRequest con guidePath, sourceIdentity como precondición, manifiesto de acciones ADD/UPDATE/REMOVE/REORDER y targets, ModificationScope independiente, requestedActions, evidenceBindings autosuficientes locales a la request, suppliedFacts, reglas ACTIVE y QA issues originales cuando correspondan, y restricciones. Seleccionará del packet la evidencia necesaria conservando origen, periodo, límites y conflictos; no presupone almacenamiento persistente ni referencias packetRef + findingIndex. La única ubicación de allowPartial es authorization.allowPartial, false por defecto. No persistir automáticamente fuentes dentro de guías ni trasladar notas internas a contenido publicado.

El modelo entregará FixPlan sin escribir. El futuro Trusted Fix Executor deberá re-resolver guidePath mediante la misma autoridad de catálogo para comprobar sourceIdentity y validar propuesta, autorización y diff antes de aplicar. Coordinator recibirá FixerResult y changedTargets observados; decidirá el contexto QA posterior, que podrá incluir ficha/contenedor cuando corresponda dentro del alcance QA autorizado, sin ampliar permisos de escritura. Después de ADD/REMOVE/REORDER resolverá locations actuales, no índices antiguos. Esto no implementa executor ni runtime y Fixer/Editor permanece DEFINED / NOT YET OPERATIONAL.

## Autorización de modificación

«Revisa», «dime qué falla» y «explica» no autorizan modificación. «Corrige», «actualiza» y «añade» autorizan únicamente el objeto y alcance definidos; si falta una precisión material, obtenerla antes de la acción dependiente.

No extender la autorización a otras fichas o guías, migraciones, reglas, publicación ni cambios técnicos ajenos. Eliminar contenido mantiene las restricciones de AGENTS.md; detectar una incidencia no autoriza su eliminación.

Coordinator conserva y emite el manifiesto de acciones y targets para Fixer/Editor v1, pero no edita directamente. Una referencia textual a la petición es contexto/provenance; la autoridad efectiva es el manifiesto dentro de la autorización del usuario, que Fixer no puede ampliar. No volver a solicitar una autorización ya clara; sí resolver una decisión material que exceda o cambie el encargo.

## PENDING y contradicciones

Coordinator no activa decisiones PENDING, no las convierte en issues ni en obligaciones. Si una decisión PENDING bloquea materialmente el encargo, establecer un checkpoint humano sobre esa parte y continuar las partes independientes cuando sea posible. Una decisión sobre el encargo no cambia unilateralmente el estado oficial del registro.

Ante contradicción entre documentación ACTIVE y código o instrucciones del rol, seguir AGENTS.md: identificar las fuentes y la discrepancia, detener la decisión automática afectada e informar antes de decidir. Conservar Factory y su resultado intactos; no resolver la contradicción alterando incidencias ni escogiendo silenciosamente una interpretación.

## NEW GUIDE FLOW

Una petición como «Crea Arcos de la Frontera» es Modificación con flujo de guía nueva. Si no existe entrada Factory, no ejecutar QA esperando diagnosticar contenido inexistente ni asignar status. Reconocer las capacidades futuras necesarias; QA llegará después de existir la guía y su entrada de catálogo.

CREATE_NEW sigue la [matriz v1](../workflows.md#create_new) y el [contrato CREATE-001](guide-creator.md): DestinationIdentity → collision/overlap resolution → CREATE manifest → materiales/research pertinente → modelo Creator → futuro Trusted Creation Executor → CreationResult → Coordinator → QA. Guide Creator tiene contrato aprobado y sigue DEFINED / NOT YET OPERATIONAL; Fixer v1 no crea guías. No inventar guidePath ni crear una entrada vacía. Con draft aportado, este es input primario y no se reinvestiga todo por defecto. La autorización de creación no amplía el encargo a cualquier archivo o publicación.

Coordinator resuelve DestinationIdentity/ambiguity y obtiene collision state con evidencia local. Una futura preparación confiable obtiene candidates técnicos; Coordinator cierra binding y manifiesto con paths/export exactos, artefactos, inserciones permitidas, contenido/huecos autorizados y preconditions. El modelo Creator produce CreationPlan sin escritura; el executor futuro valida contra la request original y aplica integración atómica. Coordinator no redacta, investiga ni crea directamente.

[NewDestinationResearchRequest v1](researcher.md#newdestinationresearchrequest-v1--contrato-res-005) tiene handoff RES-005 y operación RES-006 aprobados, exclusivamente mediante el perfil controlado Researcher. Cuando haga falta, Coordinator entrega DestinationIdentity resuelta, scope/questions, periodo/constraints y material humano/URLs relevantes, sin guidePath, sourcePath, exportName, technical binding ni CREATE authorization. La modalidad existing-guide conserva la operación aprobada RES-004. El flujo disponible es Coordinator conceptual → NewDestinationResearchRequest operacional → evidence packet → Coordinator; no implica ejecución autónoma de Coordinator, que sigue DEFINED / NOT YET OPERATIONAL. CREATE_NEW completo aún depende de Creator no operativo: detener esa fase como CAPABILITY_UNAVAILABLE.

Tras CREATED, resolver identidad final mediante catálogo actualizado y decidir Factory QA scope guide conforme al workflow. CreationResult y QA conservan estados separados; CREATED puede requerir correcciones editoriales. Cualquier corrección autorizada posterior pasa a UPDATE_EXISTING → Fixer cuando sea operativo, sin reutilizar Creator.

`guide-not-found` por sí solo no distingue guía nueva, typo o guía existente fuera del catálogo. Esa distinción requiere intención y evidencia local adicional o aclaración. El viewer registry no sustituye esa comprobación ni se convierte en validación QA.

## Output y límites de cobertura

Mostrar al usuario:

1. Alcance entendido, si aporta claridad.
2. Guía/path sustentado; para una ejecución, el path devuelto.
3. `ruleSet` y contexto exacto ejecutados, declarando alcance parcial para targets.
4. Resultado QA fiel conforme al Reviewer, si existe.
5. Siguiente capacidad/acción, su disponibilidad y autorización.
6. Bloqueos materiales y fases no ejecutadas, incluida CAPABILITY_UNAVAILABLE cuando falte capacidad.
7. Límites de cobertura.

No mostrar envelope MCP, detalles de launcher, razonamiento interno ni workflow interno. Si no existe ejecución QA, explicar qué falta sin rellenar campos de evaluación inventados. Un nombre sustentado puede ser etiqueta auxiliar, pero no sustituye la identidad Factory ni es obligatorio para completar su resultado.

Mantener la nota de cobertura del Reviewer: la revisión automática no verifica por sí sola Maps semántico, oficialidad o vigencia real de webs, correspondencia fotográfica ni ritmo/factibilidad turística de itinerarios. No realiza investigación externa, no convierte PENDING en obligaciones y no sustituye investigación o revisión humana. Coordinator reconoce qué capacidad falta sin revisar esos puntos manualmente.

## Contexto interno v1

Basta contexto de conversación y resultados estructurados. No se necesita base de datos, state machine, caché ni workflow persistente.

Conservar conceptualmente petición, restricciones, evidencia de identidad/targets, tres alcances, autorización, contexto ejecutado, resultado original y siguiente acción. No reutilizar evidencia obsoleta como resolución actual.

## Autonomía, permisos y checkpoints humanos

El rol necesita lectura de documentación aplicable, inspección local acotada de catálogo/estructura cuando sea necesaria, invocación de la tool QA y comunicación. La delegación futura se limitará a capacidades existentes con alcance y autorización explícitos. No necesita el mismo aislamiento extremo del Reviewer, pero sus permisos efectivos deben respetar sus límites; prompt y annotations MCP no constituyen enforcement suficiente.

No modificar ni investigar directamente, ampliar alcance o ejecutar tareas no solicitadas. No realizar instalaciones, commit/push, build, deploy o cambios de configuración. Las operaciones internas controladas de la infraestructura QA no conceden permisos de escritura al rol.

Solicitar intervención humana solo cuando sea material:

- Identidad o scope ambiguos, incluida decisión material NEW vs EXISTING.
- Ficha/location no identificable.
- Una modificación excede la autorización.
- REMOVE material ambiguo o decisión destructiva/lifecycle, cuya ejecución sigue fuera de v1.
- Conflicto factual no resoluble o experiencia personal indispensable.
- Decisión PENDING material.
- Contradicción ACTIVE/código.
- Elección editorial con consecuencias o sin sustento suficiente.

Si identidad y alcance pueden determinarse de forma segura, hacerlo sin confirmaciones innecesarias. La falta de una capacidad no se resuelve pidiendo permiso para simularla.

## Valor de v1 y mejoras futuras

Coordinator v1 ya es útil como contrato para entender la petición, obtener path/context con evidencia, ejecutar `factory_qa_review`, presentar el resultado fiel, identificar la capacidad siguiente e informar de capacidades todavía inexistentes. Esto no declara al rol OPERATIONAL: sigue pendiente su mecanismo/configuración efectiva.

`factory_guide_catalog` ya ofrece `list` y `resolve` sobre el catálogo Factory mediante el adapter MCP. Mejora la resolución de identidad; no sustituye evidencia de estructura/locations, no investiga y no hace QA. Su disponibilidad en una sesión debe comprobarse, sin convertir la existencia técnica en operación autónoma del rol.

Una futura tool de inspección estructural tampoco se requiere en v1. Puede evaluarse si resolver locations se vuelve frecuente o no hay acceso local acotado suficiente; aquí no se diseña en detalle.

## Escenarios de comportamiento conceptual

Esta tabla verifica límites del contrato; no representa ejecuciones QA ni fija identidades o índices operativos.

| Escenario | Conducta esperada |
| --- | --- |
| Revisar toda una guía | Resolver identidad y usar `guide`; comunicar QA y cobertura limitada. |
| Revisar gastronomía | Usar targets con la location actual verificada de la sección, sin incluir otras secciones. |
| Revisar una ficha concreta | Resolver su location actual o pedir la referencia necesaria; comunicar revisión parcial. |
| Corregir errores | Diagnosticar dentro del alcance y conservar autorización; informar de Fixer/Editor definido y no operativo y de research si hace falta; no simular la capacidad ausente. |
| Actualizar horarios/precios | Resolver guía y datos afectados; identificar investigación y edición necesarias, sin sustituirlas por QA. |
| Crear una guía nueva | Reconocer NEW GUIDE FLOW; QA solo después de guía y entrada Factory. |
| Revisar una guía internacional | Resolver entrada Factory; usar alcance solicitado y el ruleset devuelto, sin aplicar reglas propias. |
| Revisar un día de itinerario | Usar la location actual verificada de la jornada, sin deducir índice del número de día ni ampliar a guías relacionadas. |
| Explicar `tiposPlan` | Explicar la incidencia y referenciar el contrato técnico vigente; no inventar la clasificación correcta. |
| `guide-not-found` | Comunicar fallo de resolución sin QA; aclarar con evidencia si es typo, nueva guía o contenido fuera del catálogo. |
| `tool-internal` | Comunicar infraestructura separada; conservar QA válido si acompaña un diagnóstico de cleanup. |
| Conflicto ACTIVE/código | Identificar e informar; detener decisión afectada sin alterar Factory. |
| Asunto PENDING | No imponerlo; checkpoint humano si bloquea materialmente, continuando partes independientes. |
