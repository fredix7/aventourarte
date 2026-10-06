# Roles de AvenTourArte Factory

## Propósito

Esta carpeta contiene las definiciones de roles de AvenTourArte Factory. Una definición documenta responsabilidades, entradas, salidas y permisos; no constituye por sí sola un agente ejecutable.

Se distinguen cinco capas:

| Capa | Responsabilidad |
| --- | --- |
| Reglas oficiales/editoriales | La [memoria documental](../README.md), sus reglas y decisiones establecen la normativa aplicable. |
| Lógica determinista Factory | Los módulos TypeScript existentes ejecutan las comprobaciones y construyen el resultado QA. |
| Definición del rol | Estos documentos delimitan cómo un agente consume y comunica ese resultado. |
| Canal/herramienta de ejecución | Permite invocar Factory con permisos efectivos; no se crea mediante un documento Markdown. |
| Orquestación futura | Coordinará roles y encargos sin sustituir la normativa ni el motor QA. |

## Autoridad

Los agentes obedecen [AGENTS.md](../../../AGENTS.md), leen la [memoria documental](../README.md) y consultan las reglas aplicables bajo `docs/aventourarte/rules/`, enlazadas desde esa memoria. Consultan también la [checklist de QA](../qa/checklist.md).

El [registro de decisiones](../decisions/decision-log.md) es la fuente autoritativa de los estados ACTIVE, SUPERSEDED y PENDING. Los documentos de rol y sus futuros prompts no copian ni redefinen las reglas oficiales. Una decisión PENDING no es una obligación.

Si existe una contradicción entre documentación ACTIVE y código o instrucciones del rol, el agente no decide por su cuenta: sigue AGENTS.md e informa de la contradicción antes de decidir. No altera el resultado Factory para resolverla.

## Roles

- [Coordinator](coordinator.md) — orquesta identidad, alcance y autorización; contrato v1 definido; **DEFINED / NOT YET OPERATIONAL**.
- [Factory QA Reviewer](qa-reviewer.md) — presenta fielmente QA determinista; **DEFINED / NOT YET OPERATIONAL**; **TOOL CHAIN READY**.
- [Researcher](researcher.md) — reúne evidencia externa o aportada por el usuario para preguntas concretas; contrato v1 aprobado mediante RES-003 y operación mediante RES-004; **OPERATIONAL mediante el perfil controlado `codex exec`**.

- [Fixer/Editor](fixer-editor.md) — contrato v1 aprobado mediante EDIT-013 para cambios editoriales autorizados sobre guías existentes; **DEFINED / NOT YET OPERATIONAL**.

El modelo Fixer/Editor produce un FixPlan sin escribir en el repositorio. Un futuro Trusted Fix Executor deberá validar identidad, autorización, scope, precondiciones, candidate y diff antes de aplicar cambios. El contrato no implementa ni aprueba ese executor o su runtime.

## Estado operativo

Factory QA Reviewer sigue **DEFINED / NOT YET OPERATIONAL**. Su cadena técnica está implementada y probada de extremo a extremo: canal JSON, launcher controlado y adapter MCP local por stdio. La operación estructurada prevista es `factory_qa_review`, con `guidePath` exacto y `context` explícito, y puede producir resultados QA actuales reales mediante `executeFactoryQa()`.

La tool chain está lista (**TOOL CHAIN READY**); esto describe la infraestructura, no un nuevo estado formal del rol ni una autorización de publicación. La activación del agente autónomo depende de verificar la superficie real de herramientas de la plataforma: todavía no está acreditada la ausencia efectiva de shell, editor/write, git, web/browser, delegación y otras tools incompatibles. Las annotations MCP y el prompt no constituyen enforcement suficiente. La prueba final de aislamiento de sesión permanece pendiente.

Mientras ese aislamiento no esté demostrado, el contrato del Reviewer puede utilizarse como rol lógico de presentación sobre resultados de `factory_qa_review` dentro de una futura orquestación/Coordinator, sin declarar al Reviewer autónomo OPERATIONAL.

Coordinator v1 está definido como [contrato](coordinator.md) de control de flujo, identidad, alcance y autorización. Sigue **DEFINED / NOT YET OPERATIONAL**: todavía carece de sesión, configuración y superficie de herramientas operativa propia. La definición documental no implementa el agente ni ejecuta Researcher o Fixer/Editor.

El adapter MCP local ya expone `factory_guide_catalog` para identidad y `factory_qa_review` como única operación QA. La existencia de estas herramientas no demuestra conexión ni permisos efectivos de una sesión de los roles.

Researcher v1 es **OPERATIONAL mediante el perfil controlado `codex exec`** descrito en su [contrato y runtime aprobado](researcher.md#runtime-profile-operativo-aprobado). Los smoke tests acreditaron búsqueda y apertura web trazable, handoff estructurado y las garantías del threat model aceptado, con la limitación conocida de que `exec` no expone un inventario runtime completo verificable. Es una invocación delimitada del modelo, no cualquier sesión Codex ni un agente persistente separado; no se crea `factory_research` propia. Su output es un paquete de evidencia validado mediante schema y recibido por `--output-last-message`, con estados independientes de QA y sin persistencia automática en guías.

Flujo conceptual: Coordinator → identidad exacta → autorización → Researcher cuando haga falta mediante el perfil aprobado → modelo Fixer/Editor → futuro Trusted Fix Executor → FixerResult → Coordinator → QA cuando Coordinator determine que corresponde. Coordinator conserva el manifiesto de modificación, entrega evidencia seleccionada y recibe cambios observados; Researcher no edita ni inicia QA o Fixer automáticamente. Fixer/Editor sigue DEFINED / NOT YET OPERATIONAL. La operación de Researcher no declara Coordinator OPERATIONAL.
