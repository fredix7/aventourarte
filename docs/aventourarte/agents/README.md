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

- [Factory QA Reviewer](qa-reviewer.md) — definición disponible; **DEFINED / NOT YET OPERATIONAL**.

Coordinator, Researcher y Fixer/Editor son roles futuros mencionados conceptualmente. No se definen aquí como agentes existentes.

## Estado operativo

Factory QA Reviewer sigue **DEFINED / NOT YET OPERATIONAL**. Su cadena técnica está implementada y probada de extremo a extremo: canal JSON, launcher controlado y adapter MCP local por stdio. La operación estructurada prevista es `factory_qa_review`, con `guidePath` exacto y `context` explícito, y puede producir resultados QA actuales reales mediante `executeFactoryQa()`.

La tool chain está lista (**TOOL CHAIN READY**); esto describe la infraestructura, no un nuevo estado formal del rol ni una autorización de publicación. La activación del agente autónomo depende de verificar la superficie real de herramientas de la plataforma: todavía no está acreditada la ausencia efectiva de shell, editor/write, git, web/browser, delegación y otras tools incompatibles. Las annotations MCP y el prompt no constituyen enforcement suficiente. La prueba final de aislamiento de sesión permanece pendiente.

Mientras ese aislamiento no esté demostrado, el contrato del Reviewer puede utilizarse como rol lógico de presentación sobre resultados de `factory_qa_review` dentro de una futura orquestación/Coordinator. Esto no significa que Coordinator exista ya ni define su contrato.
