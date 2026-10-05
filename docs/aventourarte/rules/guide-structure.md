# Estructura de guía

Estado: orden de secciones de guías municipales españolas **ACTIVE**; demás decisiones estructurales **PENDING**.

## Objetivo

Documentar las reglas vigentes y las decisiones pendientes sobre la estructura de una guía, los modelos de contenido y la presentación.

## Hechos observados — No normativos

- Las guías son objetos TypeScript exportados; no hay una interfaz global de guía.
- La raíz suele contener `path`, `nombre`, imágenes y ajustes visuales, `descripcion`, opcionalmente `infoGeneral`, y `secciones`.
- Las guías españolas siguen Historia → Geografía y Clima → Qué visitar → Gastronomía → Dónde comer → Cultura y Vida Local → Fiestas.
- Las internacionales presentan variantes con Consejos prácticos y ausencia de algunas secciones.
- El visor agrupa las secciones por palabras del título y construye su propio orden de pestañas.

## ACTIVE — Guías municipales españolas

Decisión [EDIT-003](../decisions/decision-log.md), vigente desde el 2026-10-05.

Para las guías municipales españolas de AvenTourArte, el orden oficial de secciones es exactamente:

1. Historia
2. Geografía y Clima
3. Qué visitar en…
4. Gastronomía
5. Dónde comer en…
6. Cultura y Vida Local
7. Fiestas y Festivos Principales

- Este orden es obligatorio para las guías municipales españolas.
- No debe cambiarse porque otra guía histórica tenga una variante.
- `descripcion` pertenece a la raíz de la guía y no forma parte de `secciones`.
- `infoGeneral`, cuando corresponda, pertenece a la raíz y no forma parte de `secciones`.
- Estas reglas no se convierten todavía en una obligación para guías internacionales.
- Esta decisión no modifica los títulos concretos de las guías actuales.

## PENDING — Decisiones aún por definir

- Variantes internacionales y qué secciones internacionales son obligatorias.
- Orden de propiedades, incluido el orden interno de las fichas.
- Contratos e interfaces TypeScript y relación entre datos y presentación.
- Identificadores explícitos de sección; otros aspectos de identificadores, títulos y rutas.
- Reglas para destinos que no sean municipios.
- Posibles excepciones justificadas.
