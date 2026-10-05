# Mapas, web y reservas

Estado: reglas oficiales de `maps`, `direccion`, `telefono`, `web` y `reserva` **ACTIVE**; decisiones restantes **PENDING**.

## Objetivo

Documentar las reglas vigentes y las decisiones pendientes para ubicación, contacto y enlaces de las fichas.

## Hechos observados — No normativos

- El visor prioriza `maps` sobre `mapaUrl`; si faltan ambos, construye una búsqueda a partir de nombre, dirección y destino.
- `direccion` se muestra como enlace al mapa cuando está presente.
- `telefono` se convierte a `tel:`; si contiene números separados por `/`, se utiliza el primero para llamar.
- `web` se presenta como «Web oficial» y `reserva` como «Reserva / entradas».
- Hay reservas mediante páginas de contacto y `mailto:`; la auditoría admite HTTP(S), `tel:` y `mailto:` para ese campo.
- La auditoría comprueba sintaxis de enlaces, no disponibilidad ni vigencia externa.

## ACTIVE — Reglas oficiales

Decisión [EDIT-004](../decisions/decision-log.md), vigente desde el 2026-10-05.

### Campo de mapa

- El campo oficial para las guías nuevas o fichas que se actualicen es `maps`.
- `mapaUrl` se considera una variante histórica actualmente soportada por el visor, pero no debe utilizarse como formato preferente para contenido nuevo.
- No modificar todavía las fichas existentes que usan `mapaUrl`.

### Google Maps

- El enlace debe llevar al lugar o establecimiento exacto.
- Priorizar una ficha específica de Google Maps cuando exista.
- No utilizar búsquedas genéricas como sustituto de una ficha específica.
- No utilizar enlaces de creación de rutas/direcciones como enlace principal de `maps`.
- No inventar coordenadas ni URLs para completar una ficha.
- Antes de considerar un enlace válido editorialmente, debe comprobarse que corresponde realmente al lugar indicado.
- El fallback automático que genera actualmente el visor cuando no existe `maps` es comportamiento técnico, pero no equivale a tener un mapa editorialmente verificado.

### Dirección

- `direccion` debe corresponder al mismo lugar señalado por `maps`.
- Debe ser suficientemente concreta para identificar correctamente el lugar.
- No inventar una dirección cuando no pueda verificarse.
- No es obligatorio fabricar una dirección postal precisa para lugares naturales o puntos sin dirección postal oficial; estos casos deberán documentarse de forma adecuada cuando se definan reglas específicas.

### Teléfono

- Cuando se publique `telefono`, debe estar verificado.
- Priorizar fuentes oficiales del lugar, establecimiento o entidad.
- No copiar números de agregadores si existe una fuente oficial.
- Si no puede verificarse con fiabilidad, no inventarlo ni presentarlo como confirmado.

### Web

- `web` representa la web oficial del lugar, establecimiento, entidad o recurso correspondiente.
- Priorizar siempre el canal oficial.
- No utilizar TripAdvisor, Google Maps, directorios, agregadores o redes sociales como sustituto de una web oficial si esta existe.
- Si no existe web oficial, no inventar una.
- Los casos en los que una red social oficial pueda utilizarse como referencia alternativa permanecen PENDING hasta definirlos expresamente.

### Reserva

- `reserva` es un campo distinto de `web`.
- Cuando exista un sistema oficial o directo de reserva/compra de entradas, `reserva` debe apuntar directamente a ese sistema siempre que sea posible.
- No utilizar la portada general de la web como `reserva` si existe una URL directa de reserva o compra.
- Priorizar siempre sistemas propios u oficiales.
- No utilizar agregadores de terceros cuando exista un canal oficial directo.
- Una página de contacto, correo electrónico o teléfono no debe tratarse automáticamente como reserva directa.
- Los casos donde el único sistema real de reserva sea teléfono, email o formulario de contacto permanecen PENDING y deberán evaluarse según el tipo de lugar.

### Principio común

- Ningún dato práctico debe inventarse para completar una ficha.
- La existencia técnica de un campo o fallback en el visor no convierte ese comportamiento en norma editorial.
- Si una ficha existente contradice estas reglas ACTIVE, debe señalarse para revisión; no corregirse automáticamente fuera del alcance solicitado.

## PENDING — Decisiones aún por definir

- Qué hacer cuando no existe ficha específica de Google Maps.
- Redes sociales oficiales como sustituto de web.
- Reservas únicamente por teléfono, email o formulario de contacto, según el tipo de lugar.
- Periodicidad con la que deben volver a verificarse enlaces y teléfonos.
- Campos obligatorios según cada tipo de ficha.
- Orden exacto de estas propiedades dentro de los objetos TypeScript.
- Documentación específica de lugares naturales o puntos sin dirección postal oficial.
