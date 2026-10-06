# AvenTourArte Factory — Matriz de workflows v1

Estado: política de workflows **ACTIVE** mediante [PROC-002](decisions/decision-log.md). Este documento define selección, autorización, composición de capacidades y condiciones de término; no implementa runtime, workflow engine ni state machine técnica.

Los estados de los roles se conservan: Coordinator y Fixer/Editor **DEFINED / NOT YET OPERATIONAL**; QA Reviewer **DEFINED / NOT YET OPERATIONAL**, con **TOOL CHAIN READY**. Researcher existing-guide sigue **OPERATIONAL exclusivamente mediante su perfil controlado aprobado** por RES-004; NewDestinationResearchRequest tiene contrato RES-005 y operación RES-006, **OPERATIONAL exclusivamente mediante el mismo perfil controlado aprobado**. [Guide Creator v1](agents/guide-creator.md) tiene contrato CREATE-001 y está **DEFINED / NOT YET OPERATIONAL**, sin executor ni runtime aprobados.

## Autoridad y principio central

Consultar [AGENTS.md](../../AGENTS.md), la [memoria Factory](README.md), las reglas ACTIVE aplicables y la [checklist de QA](qa/checklist.md). El [registro de decisiones](decisions/decision-log.md) determina los estados oficiales. PENDING no es normativa; una estructura histórica no se convierte en regla.

**ROLE/CAPABILITY != WORKFLOW.** Catalog/identity, Factory QA, Researcher, Fixer y Guide Creator definido y no operativo son capacidades. Los workflows describen la finalidad del encargo y combinan únicamente las capacidades pertinentes y disponibles.

No existe una secuencia universal Researcher → Fixer → QA. Una revisión puede terminar en informe; una explicación puede no necesitar ejecución; una actualización con evidencia suficiente puede no necesitar research.

[Coordinator](agents/coordinator.md) selecciona workflow por intención, contexto, objeto, scope, autorización y materiales. No investiga, edita, realiza auditoría editorial manual ni simula capacidades inexistentes. Los contratos de [Researcher](agents/researcher.md), [Fixer/Editor](agents/fixer-editor.md), [Guide Creator](agents/guide-creator.md) y [QA Reviewer](agents/qa-reviewer.md) conservan sus límites.

## Taxonomía principal y submodos

Se aprueban exactamente siete workflows principales:

| Workflow | Finalidad |
| --- | --- |
| REVIEW_EXISTING | Evaluar una guía existente y entregar informe sin modificarla. |
| UPDATE_EXISTING | Aplicar cambios editoriales delimitados y autorizados sobre una guía existente. |
| REVIEW_AND_FIX | Revisar primero y convertir exclusivamente candidatos autorizados en modificaciones. |
| MIGRATE_EXISTING | Adaptar deliberadamente contenido histórico a reglas ACTIVE seleccionadas. |
| CREATE_NEW | Crear una guía y sus conexiones necesarias mediante una futura capacidad específica. |
| COMPARE_DRAFT_WITH_REPO | Comparar versiones sin elegir ni sincronizar automáticamente. |
| EXPLAIN_ONLY | Explicar resultados, reglas o recomendaciones sin modificar. |

| Principal | Submodos |
| --- | --- |
| REVIEW_EXISTING | deterministic/general review; VERIFY_ONLY; FRESHNESS_REVIEW; editorial/human review; PRE_PUBLISH_REVIEW. |
| UPDATE_EXISTING | practical/current data; EDITORIAL_IMPROVEMENT; COMPLETE_INCOMPLETE; FIX_KNOWN_ISSUES; ADD_SINGLE_ITEM; REMOVE_OR_REPLACE; TECHNICAL_DATA_REPAIR. |
| CREATE_NEW | research-first; CREATE_FROM_USER_DRAFT. |

La evidencia humana es una dimensión de input aplicable a review, update y create, no otro workflow principal. Alcance localizado/global y periodo también delimitan el encargo. Batch es organización futura de requests independientes, no workflow editorial principal v1.

## Selección de intención

No clasificar únicamente por verbos. Interpretar el resultado buscado y las restricciones junto con el contexto ya disponible:

- «Comprueba» normalmente solicita diagnóstico o evidencia read-only.
- «Revisa y corrige» combina revisión y modificación autorizada.
- «Actualiza» permite modificar el objeto definido, pero no implica automáticamente toda la guía.
- «Termina» permite completar los huecos identificados, sin rehacer contenido existente por defecto.
- «Mejora la redacción» delimita una intervención editorial preservando hechos.
- «Hazla mejor» requiere precisión si el contexto no distingue redacción, hechos o selección editorial.
- «He visitado este restaurante» aporta evidencia, no autorización de modificación por sí misma.
- «Qué cambiarías» solicita recomendación, no aplicación.

Resolver solo decisiones materiales que no puedan determinarse razonablemente por contexto. No preguntar de nuevo identidad, autorización, evidencia o restricciones ya conocidas y aplicables. Conservar separados alcance humano, QA, research y modificación; un scope de revisión no concede escritura.

## Autorización conceptual

| Autorización | Alcance |
| --- | --- |
| READ_ONLY | Revisión, verificación, comparación o explicación sin escritura. |
| MODIFICATION_AUTHORIZED | Modificación dentro del alcance del usuario, concretada en manifiesto Fixer antes de la fase de escritura. |
| MIGRATION_AUTHORIZED | Revisión deliberada de contenido histórico dentro del scope de migración y reglas ACTIVE seleccionadas, sin imponer PENDING. |
| CREATE_AUTHORIZED | Exclusivamente los artefactos necesarios para esa guía bajo CREATE-001; contrato Creator definido y no operativo. |

REVIEW_EXISTING, COMPARE_DRAFT_WITH_REPO y EXPLAIN_ONLY son READ_ONLY. UPDATE_EXISTING requiere MODIFICATION_AUTHORIZED; MIGRATE_EXISTING requiere MIGRATION_AUTHORIZED; CREATE_NEW requiere CREATE_AUTHORIZED. REVIEW_AND_FIX comienza con revisión READ_ONLY y conserva por separado la autorización de corrección para el manifiesto posterior.

Estas categorías no crean tipos TypeScript ni permisos técnicos. Ninguna concede commit, push, deploy, publicación o cambios arbitrarios de infraestructura. REMOVE continúa necesitando autorización explícita de eliminación.

Una issue QA, finding Researcher o regla ACTIVE no amplía autorización. El manifiesto conserva las acciones y targets permitidos; el modelo no puede autoampliarlo. Un encargo global editorial sigue excluyendo imports, catálogo, otros archivos e infraestructura.

## REVIEW_EXISTING

Caso conceptual: «Ya hemos terminado Jerez. Revisa si está todo correcto».

Flujo: identidad exacta → scope de revisión → comprobaciones pertinentes → informe.

| Dimensión | Cobertura |
| --- | --- |
| Estructura y comprobaciones deterministas | Factory QA con contexto explícito y presentación fiel de su resultado. |
| Exactitud y vigencia factual | Researcher cuando falte evidencia suficiente, con preguntas acotadas. |
| Revisión editorial/semántica | Usuario/humano o capacidad futura específica. Coordinator y QA Reviewer no fingen auditoría manual completa. |
| Experiencia personal | Solo evidencia humana real; investigación externa no acredita visita propia. |

Entregar resultados y pendientes separados, indicando qué se comprobó y qué no. No afirmar cobertura absoluta ni transformar APROBADA automatizada en guía completa o verdad factual.

REVIEW no inicia Fixer automáticamente. Si después existe autorización de corrección, se inicia UPDATE_EXISTING o REVIEW_AND_FIX según el encargo.

### VERIFY_ONLY y FRESHNESS_REVIEW

VERIFY_ONLY es factual read-only: identidad → preguntas/campos → Researcher → informe. QA solo se usa si aporta una comprobación pertinente; no valida por sí sola oficialidad o vigencia externa.

FRESHNESS_REVIEW selecciona datos realmente cambiantes y pertinentes → Researcher → comparación con la guía → informe que distingue:

- Cambio respaldado.
- Coincidencia respaldada para la misma entidad, periodo y condiciones.
- CONFLICTING o UNRESOLVED.
- No comprobado por cobertura o capacidad insuficiente.

Antigüedad no significa error; ausencia de novedades encontradas no confirma ausencia de cambios. No establecer caducidad universal ni crawler permanente. Sin autorización de update, no escribir. Si también se pidió actualizar, pasar únicamente cambios cubiertos y respaldados al manifiesto de modificación.

### PRE_PUBLISH_REVIEW

Submodo de cobertura amplia: QA → verificación factual actual pertinente → revisión editorial/humana → informe de pendientes.

«Lista para publicar» no autoriza corregir todo automáticamente. Una fase de fix requiere autorización. APROBADA de Factory QA conserva su ruleset, scope y límites: no acredita verdad absoluta, experiencia humana, derechos de imágenes ni autorización de publicación. No deploy.

## UPDATE_EXISTING

Flujo: identidad → delimitar modificación → evidencia suficiente → manifiesto cerrado → Fixer cuando sea operativo → FixerResult → QA pertinente → informe.

Puede ser acotado o global sobre el contenido editorial de una guía con autorización global explícita. Nunca se extiende automáticamente a imports, catálogo, otros archivos o infraestructura. «Actualiza Chipiona» necesita un objeto de actualización sustentado por el contexto, no un fallback silencioso a toda la guía.

Researcher participa solo cuando faltan hechos suficientemente sustentados para el cambio. Evidencia aportada por el usuario puede evitar research redundante. Coordinator selecciona evidenceBindings autosuficientes según el contrato Fixer, sin persistencia automática de provenance ni copia literal de notas internas a la guía.

Antes de Fixer, cerrar manifiesto, targets, objetivos, versión y precondiciones. EDIT-013 conserva una guía existente y catalogada, un source file y una transacción por request, target limpio y minimal patch. El modelo produce FixPlan sin escribir; el futuro executor valida y aplica. Hoy la fase dependiente de esa capacidad no puede simularse.

### Submodos de UPDATE_EXISTING

| Submodo | Flujo y límite |
| --- | --- |
| practical/current data | Actualizar datos definidos con evidencia aplicable a entidad, modalidad y periodo; no revisar todo por antigüedad. |
| EDITORIAL_IMPROVEMENT | Mejorar redacción u orden autorizado preservando hechos. Researcher no requerido salvo duda factual material y derivación dentro del encargo permitida por Coordinator. |
| COMPLETE_INCOMPLETE | Completar únicamente huecos/ámbitos autorizados mediante ADD/UPDATE. No rehacer lo existente ni inventar opcionales. |
| FIX_KNOWN_ISSUES | Issues originales o puntos identificados → manifiesto explícito → evidencia si falta → Fixer → QA de revalidación. La issue no es autorización; no corregir adyacentes. |
| ADD_SINGLE_ITEM | ADD de restaurante, plato, lugar o fiesta concreto; cumplir ACTIVE pertinente sin completar automáticamente el resto de la sección. |
| REMOVE_OR_REPLACE | REMOVE explícito; UPDATE si es la misma entidad; REMOVE + ADD si cambia la entidad; REORDER si solo cambia el orden. Un finding de cierre no concede REMOVE. |
| TECHNICAL_DATA_REPAIR | Maps/web/reserva/teléfono u otros datos editoriales técnicos autorizados; Researcher comprueba correspondencia factual cuando hace falta. No revisar toda la ficha ni reparar infraestructura fuera del scope. |

Si una duda factual aparece durante mejora editorial, no investigar ni ampliar el alcance por iniciativa del modelo. Devolverla a Coordinator. Si cumplir ACTIVE exige modificar contenido adicional no autorizado, bloquear lo afectado y comunicar qué falta.

## REVIEW_AND_FIX

Workflow separado con cuatro fases:

1. READ_ONLY: QA, Researcher y revisión pertinente según cobertura solicitada y capacidades.
2. Conjunto cerrado de findings/cambios candidatos.
3. Coordinator convierte exclusivamente cambios cubiertos por la autorización del usuario en manifiesto Fixer.
4. Fixer cuando sea operativo → QA posterior pertinente → informe.

«Corrige todo lo que esté mal» puede autorizar corrección editorial global de la guía si objeto e intención son claros. No incluye infraestructura, obligaciones PENDING, migración técnica, REMOVE material ambiguo ni otros archivos. Resolver las decisiones que excedan esa autorización, sin repetir permisos ya claros.

Un hallazgo posterior no se añade silenciosamente al manifiesto congelado. La fase de revisión y su cobertura no sustituyen las acciones concretas de modificación.

## Evidencia humana como input

Puede alimentar review, update o create conservando origen, entidad, fecha y condiciones conocidos:

| Material | Límite |
| --- | --- |
| Observación personal fechada | Respalda lo observado bajo esas condiciones, no disponibilidad permanente. |
| Comunicación verbal recibida | Conservar qué se dijo y su emisor/contexto; no transformar el anuncio en hecho futuro confirmado. |
| Foto/carta/ticket | Mantener entidad, fecha y respaldo material pertinentes, sin inventar contexto ausente. |
| URL aportada | No demuestra apertura o verificación; requiere comprobación si se usa como evidencia web material. |
| Recuerdo sin contexto suficiente | Conservar límites y resolver precisión solo si es material para el encargo. |

No convertir experiencia del usuario en experiencia propia de IA/AvenTourArte ni opinión en hecho objetivo. Evidencia humana u oficial no gana automáticamente: resolver entidad, periodo, condiciones y conflictos conforme a RES-002 y al contrato Researcher.

Si el material basta para un cambio autorizado, no obligar a research redundante. CONFIRMED no obliga a publicar; SUPPORTED conserva límites; CONFLICTING no permite escoger certeza silenciosa; UNRESOLVED no se inventa. PENDIENTE_VISITA no se resuelve mediante research externo.

## MIGRATE_EXISTING

Workflow separado: guía y reglas objetivo → MIGRATION_AUTHORIZED → cambios candidatos → evidencia faltante → manifiesto → Fixer → QA.

Permite ampliar deliberadamente el scope sobre contenido histórico para adoptar reglas ACTIVE seleccionadas. No es mantenimiento por defecto, no impone PENDING ni crea excepciones editoriales. Las eliminaciones deben seguir autorizadas explícitamente.

Puede utilizar Fixer para una única guía/source file cuando encaje en EDIT-013 y su transacción segura. Si exige varios archivos, shared structures o una transacción incompatible con Fixer v1, detener esa fase como BLOCKED / CAPABILITY_UNAVAILABLE. No descomponer silenciosamente el encargo para eludir sus límites. No se crea Migrator separado en v1.

## CREATE_NEW

Flujo conceptual: destino exacto → comprobación de solapamientos → CREATE_AUTHORIZED → materiales / Researcher new-destination cuando haga falta mediante el perfil aprobado RES-006 → Guide Creator cuando sea operativo → creación controlada → incorporación técnica necesaria → QA → Coordinator. CREATE-001 aprueba el contrato Creator sin operación; RES-005 aprueba el handoff y RES-006 acredita la operación de research de destino nuevo. La fase de investigación está disponible bajo el perfil aprobado, pero CREATE_NEW aún no puede terminar en escritura y se detiene como CAPABILITY_UNAVAILABLE si necesita Creator.

Catalog REQUIRED significa consultar la autoridad de catálogo para detectar identidades/solapamientos existentes antes de crear y registrar/resolver la nueva identidad cuando la creación exista. **No significa que una guía nueva deba tener previamente un guidePath resoluble.** No crear una entrada vacía para engañar al flujo.

La tool de catálogo existente es read-only; no registra nuevas entradas. La futura incorporación técnica necesita autorización y capacidad propias dentro del contrato Creator. Fixer v1 no participa como Creator ni recibe permiso multarchivo por seleccionar CREATE_NEW.

### CREATE_FROM_USER_DRAFT

El draft trabajado con el usuario es **INPUT PRIMARIO**. Preservar selección, estructura editorial autorizada, textos, orden, imágenes/material disponible y evidencia humana.

Researcher solo verifica datos cambiantes, resuelve dudas concretas y completa huecos autorizados. No reinvestigar todo por defecto ni sustituir silenciosamente decisiones editoriales trabajadas con el usuario. Cumplir ACTIVE y reportar incompatibilidades materiales antes de decidir.

Después actúa Guide Creator cuando sea operativo → QA. La conversión técnica no autoriza nueva selección editorial arbitraria ni copia de notas internas a contenido publicado.

### Researcher para destino no catalogado — operacional bajo RES-006

ExistingGuideResearchRequest conserva guidePath resuelto y operación RES-004. [NewDestinationResearchRequest v1](agents/researcher.md#newdestinationresearchrequest-v1--contrato-res-005) tiene contrato RES-005: DestinationIdentity resuelta, research scope/questions, periodo/constraints y user evidence/URLs pertinentes, sin guidePath ni autorización CREATE o technical binding.

RES-006 acredita esa modalidad OPERATIONAL exclusivamente mediante el perfil controlado Researcher, tras demostrar handoff/schema, ejecución, web trazable, aislamiento y output estructurado. RES-004 no la acredita automáticamente. No inventar guidePath ni simular capacidades: su fase de research está disponible cuando sea necesaria y la invocación cumpla el perfil y las condiciones efectivas del host; Creator sigue sin operación aprobada y bloquea su fase dependiente como CAPABILITY_UNAVAILABLE. PROC-002 conserva su política y no se redefine.

## COMPARE_DRAFT_WITH_REPO

READ_ONLY: identificar guía y versiones → comparación local → clasificación → informe sin sincronización.

Clasificar coincidencias, diferencias de redacción, solo draft, solo repo, estructura/orden, contradicciones y posibles datos stale. La diferencia textual no prueba qué versión es correcta; ninguna gana automáticamente.

La comparación semántica/editorial completa puede requerir humano o capacidad todavía no definida. Coordinator no la asume como auditoría manual. El contraste factual externo, si corresponde al encargo, pertenece a Researcher.

Una sincronización posterior se convierte en UPDATE_EXISTING con autorización y manifiesto explícitos. «Dime qué falta/cambia» no concede escritura.

## EXPLAIN_ONLY

READ_ONLY: explicar regla, issue, status, alternativa o recomendación. Preservar resultados Factory originales y distinguir un resultado anterior de una comprobación actual.

«Qué cambiarías» es recomendación, no autorización. QA/Researcher solo se invocan si hacen falta datos actuales para la explicación solicitada, dentro de sus respectivos permisos. Explicar no permite inventar datos para resolver una issue.

## Lifecycle fuera de v1

No forzar estas operaciones en UPDATE_EXISTING ni Fixer v1:

- DELETE_WHOLE_GUIDE.
- Rename/move de identidad de guía.
- Split de guía.
- Merge de guías.
- Cambios de jerarquía geográfica que exijan identidad/catálogo multarchivo.

Son operaciones destructivas/multarchivo de lifecycle y permanecen FUTURE/PENDING. REMOVE de Fixer elimina únicamente contenido editorial autorizado dentro de una guía; **no elimina la guía completa**. Incluso con intención explícita, el contrato actual puede impedir la ejecución: informar del bloqueo y de la necesidad de una capacidad futura, sin usar Creator como atajo.

## Batch y ambigüedad new/existing

Batch autónomo queda fuera de operación v1. Una petición multi-guía puede descomponerse conceptualmente en requests con identidad, scope, autorización, transacción y resultados independientes por guía. No una transacción gigante ni autorización implícita sobre shared files. No inventar un resultado global que oculte cobertura parcial.

Antes de CREATE comprobar catálogo y solapamientos. NOT_FOUND no demuestra automáticamente que haya que crear: puede tratarse de nombre incompleto, guía no catalogada, destino padre u otro alcance.

Ejemplos conceptuales: Malta país/isla/ciudad/guía existente; Jerez frente a Jerez de la Frontera. No usar fuzzy matching para conceder identidad ni inventar aliases. Una asociación previamente confirmada solo sirve si sigue sustentada. Ante una decisión material NEW vs EXISTING, establecer checkpoint antes de escribir; no crear duplicados silenciosos.

## Capabilities matrix

REQUIRED indica necesidad conceptual de la capacidad/autoridad; OPTIONAL depende del encargo y pasa a requerida si es indispensable; NOT USED excluye su uso en ese flujo; FUTURE/UNAVAILABLE identifica capacidad necesaria aún no operativa. No son nuevos estados de roles.

Catalog REQUIRED no exige repetir una llamada si ya hay evidencia exacta actual de identidad. Para CREATE_NEW tiene el significado previo/posterior descrito arriba. QA representa infraestructura determinista disponible, no QA Reviewer autónomo OPERATIONAL. La disponibilidad efectiva de sesión sigue siendo necesaria. Researcher conserva su perfil aprobado; evidencia suficiente aplicable puede evitar otra ejecución.

| Workflow | Catalog | QA | Researcher | Fixer | Guide Creator | Human checkpoint | Writes? | Typical output |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| REVIEW_EXISTING general | REQUIRED | REQUIRED | OPTIONAL | NOT USED | NOT USED | OPTIONAL; REQUIRED si falta revisión humana necesaria | No | Informe QA/factual/editorial y cobertura separada. |
| VERIFY_ONLY | REQUIRED | OPTIONAL | REQUIRED | NOT USED | NOT USED | OPTIONAL | No | Findings, condiciones y pendientes. |
| FRESHNESS_REVIEW | REQUIRED | OPTIONAL | REQUIRED | NOT USED | NOT USED | OPTIONAL | No | Cambio/coincidencia respaldados y conflicting/unresolved/no comprobado. |
| PRE_PUBLISH_REVIEW | REQUIRED | REQUIRED | OPTIONAL | NOT USED | NOT USED | REQUIRED para cierre editorial humano | No | Informe de preparación y pendientes; no publicación. |
| UPDATE_EXISTING | REQUIRED | OPTIONAL | OPTIONAL | FUTURE/UNAVAILABLE | NOT USED | OPTIONAL | Sí, cuando Fixer sea operativo | FixerResult y QA pertinente. |
| REVIEW_AND_FIX | REQUIRED | REQUIRED | OPTIONAL | FUTURE/UNAVAILABLE | NOT USED | OPTIONAL; REQUIRED ante decisión material | Sí, fase futura | Informe inicial, manifiesto, cambios observados y revalidación. |
| MIGRATE_EXISTING | REQUIRED | REQUIRED | OPTIONAL | FUTURE/UNAVAILABLE | NOT USED | OPTIONAL | Sí, fase futura | Scope migrado y cobertura QA, o bloqueo/parcial explícito. |
| CREATE_NEW | REQUIRED | REQUIRED tras integración | OPTIONAL; operacional bajo RES-006 mediante el perfil aprobado | NOT USED | FUTURE/UNAVAILABLE | OPTIONAL; REQUIRED ante elección material | Sí, fase futura | Artefactos/identidad integrados, validación y QA. |
| COMPARE_DRAFT_WITH_REPO | REQUIRED | NOT USED | OPTIONAL si contraste factual solicitado | NOT USED | NOT USED | OPTIONAL; humano/capacidad pendiente para cobertura semántica | No | Diferencias clasificadas, sin sync. |
| EXPLAIN_ONLY | OPTIONAL | OPTIONAL | OPTIONAL | NOT USED | NOT USED | OPTIONAL | No | Explicación/recomendaciones, sin aplicación. |

Los submodos se rigen por las condiciones descritas, no añaden workflows principales. OPTIONAL en Human checkpoint no garantiza cobertura editorial automatizada: si esa cobertura es necesaria y no existe capacidad, solicitar intervención material o informar del bloqueo. No considerar implementada la comparación automatizada por aparecer en la tabla.

## Terminal conditions y bloqueo transversal

| Workflow/submodo | Condición de término |
| --- | --- |
| REVIEW_EXISTING | Informe entregado con cobertura realizada y pending explícitos. |
| VERIFY_ONLY / FRESHNESS_REVIEW | Findings terminales entregados, incluso UNRESOLVED, con cobertura real. |
| UPDATE_EXISTING | FixerResult observado y QA cuando corresponda; acciones omitidas y pendientes comunicadas, o BLOCKED por capacidad ausente. |
| REVIEW_AND_FIX | Fases autorizadas completadas y pendientes separados; no afirmar completada la fase de fix si no existió ejecución. |
| MIGRATE_EXISTING | Scope autorizado aplicado/revalidado, o bloqueo/parcial explícito. |
| CREATE_NEW | Cuando exista capacidad: artefactos/identidad creados e integrados, validación técnica y QA; pendientes comunicados. |
| COMPARE_DRAFT_WITH_REPO | Informe comparativo entregado, sin sync. |
| EXPLAIN_ONLY | Explicación entregada. |

Terminal transversal: **BLOCKED / CAPABILITY_UNAVAILABLE** cuando una capacidad necesaria aún no existe, una decisión material no está resuelta o el contrato actual prohíbe continuar. CAPABILITY_UNAVAILABLE identifica el motivo de capacidad; una decisión material pendiente debe comunicar su motivo real, sin disfrazarla de fallo técnico.

Clasificar correctamente un workflow no significa poder completarlo hoy. Detener la fase dependiente, conservar avances read-only útiles y autorizados y comunicar qué falta. No pedir permiso para simular una capacidad. Estos términos describen el tratamiento del workflow, no una state machine implementada ni estados/severidades QA.

Researcher COMPLETE no completa automáticamente el workflow padre: puede incluir UNRESOLVED. Terminar una ejecución tampoco significa cumplir todo el objetivo editorial. Informe parcial, PARTIALLY_APPLIED o QA con incidencias deben conservar sus límites; no presentarlos como guía terminada. No iniciar ciclos ilimitados de corrección ni ampliar manifiestos para conseguir aprobación.

## Human checkpoints

Volver al usuario cuando exista una decisión material:

- Identidad/scope ambiguo o NEW vs EXISTING real.
- Conflicto factual que no puede resolverse con la evidencia disponible.
- REMOVE material ambiguo.
- Alternativas editoriales con consecuencias.
- PENDING bloqueante o contradicción ACTIVE/código.
- Experiencia personal indispensable.
- Decisión destructiva/lifecycle, cuya ejecución sigue fuera de v1.

No volver a pedir identidad exacta ya resuelta, autorización clara, hechos suficientes o aprobación de pasos técnicos rutinarios autorizados. No preguntar otra vez información disponible. Una aclaración o autorización no crea por sí sola una capacidad ni cambia el estado oficial de PENDING.

## Recomendación Guide Creator v1

PROC-002 aprobó la recomendación de que Factory v1 necesita un contrato Guide Creator antes de considerar cubiertas sus actividades centrales, sin aprobar ese contrato, schema o runtime ni ampliar Fixer. [CREATE-001](agents/guide-creator.md) aprueba ahora exclusivamente el contrato Guide Creator v1, DEFINED / NOT YET OPERATIONAL; su executor/runtime y schemas permanecen pendientes. RES-005 aprueba por separado el handoff new-destination y RES-006 acredita su operación exclusivamente mediante el perfil controlado Researcher.

Frontera mínima para el futuro diseño: CREATE_AUTHORIZED; destino/solapamientos comprobados; draft primario cuando exista; artefactos técnicos explícitos; modelo sin escritura directa; aplicación confiable; QA posterior; sin commit/deploy. No se diseña aquí implementación ni transacción multarchivo.

## PENDING preservados

- Coordinator operational runtime.
- Fixer execution y sus mecanismos pendientes según EDIT-013.
- Guide Creator executor/runtime y schemas definitivos.
- Automated semantic/editorial review y automated draft comparison.
- Create integration y multi-file recovery/transaction.
- Guide lifecycle operations y batch autónomo.
- Provenance persistence y publish authorization.
- PENDING editoriales existentes en EDIT-001, EDIT-002 y reglas específicas, así como RES-001, EX-001 y QA-001 en sus alcances abiertos.

No decidir caducidad universal de datos, derechos pendientes, excepciones de publicación ni convenciones editoriales nuevas. Los contratos y decisiones existentes conservan su autoridad. Formalizar esta matriz no declara operación nueva ni crea infraestructura.
