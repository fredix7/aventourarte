# Estructura de guía

Estado: orden de secciones de guías municipales españolas y contrato mínimo de itinerario internacional opcional **ACTIVE**; demás decisiones estructurales **PENDING**.

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

## ACTIVE — Itinerario internacional opcional

Decisión [EDIT-012](../decisions/decision-log.md), vigente desde el 2026-10-05.

### Alcance y existencia opcional

- Una guía internacional no está obligada a tener itinerario. Puede utilizar `lugares` directos u otra estructura autorizada.
- Si utiliza `itinerario` en «Qué visitar», esa colección debe cumplir el contrato mínimo siguiente. No se convierte en una sección obligatoria.
- `generic` sigue siendo el ruleset actual para estas guías. No se crea todavía `international-itinerary`.
- Malmö es la evidencia actual de una guía internacional sin itinerario; su estructura histórica no define por sí sola un contrato adicional para fichas internacionales con `lugares` directos.

### Colección y entradas de jornada

La estructura mínima es «Qué visitar» → `itinerario[]` → entrada de jornada → `zonas[]`.

- `itinerario`, cuando se utilice, es un array.
- Cada entrada debe ser un objeto.
- `dia` debe existir como string no vacío.
- `zonas` debe existir como array y contener al menos una ficha.
- Cada ficha directamente en `itinerario[i].zonas[j]` es una ficha final de propuesta/visita y cumple el [contrato mínimo de zona](que-visitar.md#active--fichas-de-zona-en-itinerarios-internacionales).

El orden almacenado del array es el orden editorial del itinerario.

### Días y límites del contrato

No se exige empezar en «Día 1», consecutividad, ausencia de saltos, número concreto de días ni formato exacto «Día N – …». Tampoco se establece un mínimo o máximo de jornadas ni se exige que una entrada equivalga exactamente a 24 horas.

No se impiden «Día 7 (y siguientes)», jornadas de llegada o regreso, días flexibles ni excursiones. Estas cuestiones no deben convertirse todavía en errores automáticos. Las reglas automáticas sobre numeración, duplicados semánticos, cronología o correspondencia entre número textual y posición del array permanecen PENDING.

### Excursiones y destinos múltiples

Una guía internacional puede abarcar varias ciudades, islas, territorios, excursiones e incluso otro país dentro del itinerario. No se exige que todas las zonas pertenezcan al destino visible principal.

Los casos actuales Copenhague → Malmö, Malta → Comino / Gozo, Roma → Vaticano, Bucarest → Transilvania y Río → Ilha Grande ilustran esta posibilidad; no son reglas especiales ni plantillas oficiales.

### Consejos prácticos e infoGeneral

En «Consejos prácticos» de guías internacionales las imágenes no son obligatorias ni están prohibidas globalmente: pueden utilizarse excepcionalmente cuando tengan sentido editorial, conforme a las [reglas de imágenes por sección ya aprobadas](donde-comer.md#imágenes) y a [Imágenes y Cloudinary](imagenes-cloudinary.md). No se define aquí estructura obligatoria, número de fichas ni campos obligatorios de esa sección.

Este contrato no amplía `infoGeneral`. En particular, `conduccion` de Malta queda fuera del contrato y no se convierte en campo estándar por existir en esa guía.

## PENDING — Decisiones aún por definir

- Variantes internacionales y obligatoriedad de sus secciones fuera del contrato opcional de EDIT-012.
- Orden de propiedades fuera de los alcances ya aprobados, incluido el orden canónico de propiedades de zona internacional.
- Contratos e interfaces TypeScript y relación entre datos y presentación.
- Identificadores explícitos de sección; otros aspectos de identificadores, títulos y rutas.
- Reglas para destinos que no sean municipios.
- Posibles excepciones justificadas.
- Numeración, duplicados semánticos y cronología de jornadas; correspondencia entre número textual y posición del array.
- Estructura completa de «Consejos prácticos», número de fichas y campos obligatorios.
- Contratos internacionales adicionales para `lugares` directos, subsecciones, alternativas y excursiones fuera del itinerario, salvo reglas ACTIVE ya existentes.
- Obligatoriedad y estructura completa de `guiaRelacionada`, validación contra catálogo, coherencia entre nombre y `path` y cuándo una excursión debe utilizarla.
