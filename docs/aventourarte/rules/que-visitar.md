# Qué visitar

Estado: reglas de fichas estándar de guías municipales españolas **ACTIVE**; demás decisiones **PENDING**.

## Objetivo

Recoger las reglas vigentes para fichas estándar y las decisiones pendientes sobre visitas, rutas, alternativas e itinerarios.

## Hechos observados — No normativos

- Existen listas `lugares`, rutas en `subsecciones` e itinerarios con `dia` y `zonas`.
- San Fernando organiza dos rutas mediante subsecciones; Copenhague combina días y alternativas.
- Las fichas suelen comenzar por `nombre`, `tiposPlan` y `descripcion`; las imágenes y los datos prácticos presentan variantes de presencia y orden.
- `tiposPlan` clasifica recorrido, entorno y coste de forma explícita; el código no deduce la clasificación del precio o la descripción.
- Hay campos particulares como `acceso`, `duracion`, `noCropGallery` y `guiaRelacionada`.

## ACTIVE — Fichas estándar de guías municipales españolas

Decisión [EDIT-005](../decisions/decision-log.md), vigente desde el 2026-10-05.

### Alcance

Estas reglas se aplican a las fichas normales de «Qué visitar» de las guías municipales españolas. No convierten todavía en norma los itinerarios por días, la estructura internacional, las rutas temáticas mediante subsecciones, las alternativas, las excursiones ni los campos `guiaRelacionada`, `duracion`, `acceso` y `noCropGallery`. Esos casos permanecen PENDING.

### Colección estándar

- Para una guía municipal española normal, la sección «Qué visitar en…» utiliza `lugares` como colección estándar de fichas.
- Las `subsecciones` solo deben utilizarse cuando exista una razón editorial real para dividir el contenido en rutas o bloques diferenciados. No deben introducirse simplemente para organizar una lista larga.
- Los itinerarios con `dia` y `zonas` no son la estructura estándar de una guía municipal española.

### Orden oficial de propiedades de una ficha

Cuando los campos estén presentes, el orden editorial oficial es:

1. `nombre`
2. `tiposPlan`
3. `descripcion`
4. `foto` o `fotos`
5. `horario`
6. `precio`
7. `direccion`
8. `maps`
9. `telefono`
10. `web`
11. `reserva`

- Este es el orden canónico para contenido nuevo y para fichas que se revisen.
- Que un campo sea opcional no altera el orden de los demás campos.
- No inventar un campo únicamente para completar la secuencia.
- `mapaUrl` permanece como compatibilidad histórica, pero `maps` es el campo oficial según las [reglas ACTIVE de mapas, web y reservas](maps-web-reservas.md#active--reglas-oficiales).
- Las reglas concretas de dirección, Maps, teléfono, web y reserva se rigen por ese documento.

### nombre

- `nombre` identifica de forma clara el lugar, monumento, espacio o experiencia.
- No introducir información de auditoría, estado de investigación o comentarios internos en el nombre.

### tiposPlan

- `tiposPlan` forma parte de la clasificación funcional de la ficha.
- En las fichas normales de visita de las guías municipales españolas debe declararse explícitamente.
- No debe deducirse automáticamente a partir de `precio`, `descripcion` u otros campos.
- Los valores concretos disponibles siguen siendo los definidos por el sistema actual de tipos de plan. Este documento no redefine el catálogo.

### descripcion

- `descripcion` es contenido publicado para el viajero.
- Debe describir el interés real del lugar y aportar información útil para decidir o preparar la visita.
- No debe contener lenguaje interno de investigación, auditoría, IA, revisión, QA o desarrollo.
- No debe incluir frases como «según las fuentes consultadas», «tras nuestra investigación», «no se ha podido verificar», «durante la auditoría», «hemos comprobado» o «se recomienda verificar» cuando expresen el proceso interno y no información útil para el viajero.
- Las dudas de investigación deben resolverse o permanecer en documentación interna; no trasladarse al texto publicado como lenguaje de auditoría.

### foto / fotos

- `foto` representa una imagen individual.
- `fotos` representa una galería.
- No inventar referencias de imagen.
- Las reglas de Cloudinary y convenciones concretas de imagen continúan en [Imágenes y Cloudinary](imagenes-cloudinary.md), cuyas decisiones siguen PENDING.
- La coexistencia oficial de `foto` y `fotos` permanece PENDING.

### horario

- Debe representar información útil para realizar la visita cuando exista horario aplicable.
- No inventar horarios.
- La vigencia y metodología de comprobación se regularán en [Investigación](investigacion.md).
- Casos como espacios permanentemente abiertos, acceso libre o visitas únicamente concertadas permanecen PENDING para una regla más específica.

### precio

- Debe reflejar correctamente si el acceso ordinario es gratuito o de pago cuando la información sea aplicable.
- Si el acceso ordinario es gratuito, no añadir un supuesto «día gratuito» o «franja gratuita», porque la gratuidad ya es ordinaria.
- Para lugares normalmente de pago, investigar jornadas, días o franjas gratuitas cuando sean relevantes y estén verificadas.
- No inventar precios ni gratuidades.
- El formato exacto del campo `precio` permanece PENDING.

### Datos prácticos

- `direccion`, `maps`, `telefono`, `web` y `reserva` deben cumplir las [reglas ACTIVE de mapas, web y reservas](maps-web-reservas.md#active--reglas-oficiales).
- La existencia de un fallback técnico del visor no sustituye la verificación editorial de `maps`.

### Principio de alcance

- Una ficha existente que no siga este orden puede señalarse para revisión.
- No debe reordenarse o modificarse automáticamente fuera del alcance solicitado.
- Estas reglas no autorizan una migración masiva de las guías existentes.

## PENDING — Decisiones aún por definir

- Criterios exactos para usar `subsecciones`.
- Rutas temáticas y rutas alternativas.
- Itinerarios por días y zonas.
- Excursiones.
- `guiaRelacionada`.
- `duracion`.
- `acceso`.
- `noCropGallery`.
- Coexistencia oficial de `foto` y `fotos`.
- Obligatoriedad exacta de horario y precio según el tipo de lugar.
- Formato estándar de horario y precio.
- Casos de acceso libre, visitas concertadas o apertura irregular.
- Reglas específicas para guías internacionales.
