# Memoria permanente de AvenTourArte

## Objetivo

Reunir la documentación de la fábrica de agentes: restricciones de proceso, reglas editoriales, decisiones, referencias aprobadas y comprobaciones de calidad.

[AGENTS.md](../../AGENTS.md) contiene las restricciones generales de proceso ACTIVE. Existen además decisiones editoriales, de investigación y de QA ACTIVE documentadas en `docs/aventourarte/rules/`, el [registro de decisiones](decisions/decision-log.md) y la [checklist de QA](qa/checklist.md).

El registro de decisiones es la fuente autoritativa del estado ACTIVE / SUPERSEDED / PENDING de cada decisión. No todas las decisiones están cerradas: las reglas PENDING siguen sin ser normativas. No hay todavía una guía completa aprobada como plantilla.

## Lectura y navegación

Consultar los documentos correspondientes al alcance del trabajo:

- [Estructura de guía](rules/guide-structure.md).
- [Qué visitar](rules/que-visitar.md).
- [Gastronomía](rules/gastronomia.md).
- [Dónde comer](rules/donde-comer.md).
- [Cultura y vida local](rules/cultura-vida-local.md).
- [Fiestas](rules/fiestas.md).
- [Mapas, web y reservas](rules/maps-web-reservas.md).
- [Imágenes y Cloudinary](rules/imagenes-cloudinary.md).
- [Estilo editorial](rules/estilo-editorial.md).
- [Investigación](rules/investigacion.md).
- [Registro de decisiones y estados](decisions/decision-log.md).
- [Referencias aprobadas](examples/README.md).
- [Categorías de QA](qa/checklist.md).
- [Matriz de workflows v1](workflows.md).

La matriz v1, aprobada mediante PROC-002, distingue roles/capacidades de siete workflows y selecciona el flujo según intención, alcance y autorización. La creación requiere un futuro contrato Guide Creator; las capacidades conservan sus estados operativos propios. La política de workflows no implementa orquestación.

## Contexto observado

La radiografía del repositorio identificó 17 archivos de guías y 16 entradas activas en el visor. El contenido vive en objetos TypeScript bajo `src/app/guides/`; el árbol de destinos y el registro del visor son estructuras separadas. No existe un contrato global de guía que cubra todo el contenido editorial.

Los hechos recogidos en los documentos de reglas describen el estado observado el 5 de octubre de 2026. No constituyen normas ni implican que los patrones existentes estén aprobados.

## PENDING — Definición de la fábrica

- Aspectos de estructura editorial y contratos de contenido aún pendientes según el registro de decisiones y las reglas específicas.
- Aspectos de reglas editoriales, investigación e implementación y operación de QA que continúan PENDING en sus documentos correspondientes.
- Referencias aprobadas y alcance de cada aprobación.
- Operación e integración de roles y workflows, junto a los contratos y capacidades todavía pendientes.
