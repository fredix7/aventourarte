# Dónde comer

Estado: reglas editoriales básicas de «Dónde comer» **ACTIVE**; demás decisiones **PENDING**.

## Objetivo

Recoger las reglas vigentes y las decisiones pendientes para seleccionar y describir establecimientos.

## Hechos observados — No normativos

- La colección utilizada es `lugares`, a veces precedida de `contenido`.
- Algunas fichas contienen solo `nombre`, `descripcion`, `horario` y `precio`.
- Otras añaden `direccion`, mapas, `telefono`, `web` y `reserva`, con diferencias de orden.
- Los restaurantes analizados no tienen fotografías ni `perfilAlimentario` declarado.

## ACTIVE — Reglas oficiales

Decisión [EDIT-008](../decisions/decision-log.md), vigente desde el 2026-10-05.

### Alcance de la sección

«Dónde comer» debe contener establecimientos que aporten valor real a la guía del destino. No añadir establecimientos únicamente para aumentar el número de fichas.

Priorizar establecimientos que permitan:

- Probar platos o productos relevantes de la gastronomía del destino.
- Cubrir especialidades que todavía no estén representadas por otros establecimientos.
- Experimentar una tradición gastronómica o local especialmente vinculada al destino.
- Cubrir categorías útiles para el viajero cuando estén justificadas: desayuno, tapas, restaurante, pastelería, heladería, bodega u otras equivalentes.

No es necesario que todos los establecimientos sean restaurantes tradicionales. La selección debe evitar repeticiones innecesarias cuando varios establecimientos aporten exactamente lo mismo sin una razón editorial clara.

### Colección

- La colección estándar es `lugares`.
- Puede existir un `contenido` introductorio cuando aporte contexto útil.
- La obligatoriedad y formato exacto de ese `contenido` permanecen PENDING.

### Relación con Gastronomía

Siempre que sea posible, la selección de establecimientos debe ayudar a cubrir la gastronomía documentada para el destino.

No es obligatorio que todos los platos de Gastronomía tengan un establecimiento asociado si eso obliga a inventar recomendaciones o incluir sitios poco justificables. Tampoco debe introducirse un plato en Gastronomía únicamente porque aparezca en la carta de un establecimiento.

Gastronomía y Dónde comer son secciones distintas:

- Gastronomía documenta platos, productos y elaboraciones vinculadas al destino.
- Dónde comer recomienda establecimientos concretos donde probar parte de esa gastronomía o vivir experiencias gastronómicas relevantes.

### Bloques editoriales internos de la ficha

Cuando existan estos bloques, el orden oficial es:

1. 🍴 Qué pedir sí o sí:
2. 🧭 Experiencia viajera:
3. 💡 Consejo AvenTourArte:

Este orden es obligatorio cuando aparezcan dos o más de estos bloques. No alterar el orden aunque una ficha histórica utilice otra disposición.

No es obligatorio inventar los tres bloques. Si no existe información suficiente y fiable para uno de ellos, se omite.

### 🍴 Qué pedir sí o sí:

Cuando la ficha incluya recomendaciones concretas de platos, deben presentarse con este encabezado exacto:

```text
🍴 Qué pedir sí o sí:
- plato
- plato
- plato
```

Cada recomendación debe aparecer en una línea independiente con guion. No sustituir este formato por listas separadas por comas, texto corrido, otros títulos inventados, tablas o lenguaje de auditoría.

Las recomendaciones deben corresponder a platos, productos o bebidas realmente asociados al establecimiento o suficientemente verificados. No inventar platos para completar el bloque. No es obligatorio incluir un número concreto de recomendaciones.

### 🧭 Experiencia viajera:

Cuando exista información útil y suficientemente fiable, la ficha debe ayudar al viajero a entender cómo es realmente la experiencia de ir al establecimiento.

Puede explicar, cuando sea relevante:

- Qué tipo de experiencia ofrece.
- Por qué merece la pena incluirlo en la guía.
- Qué especialidad, producto, formato o rasgo lo diferencia.
- Si encaja mejor para desayuno, tapeo, comida, merienda, cena u otra experiencia.
- Cuándo puede ser mejor ir.
- Si conviene reservar.
- Ambiente o carácter del establecimiento cuando sea significativo.
- Relación con la cultura o gastronomía local.
- Si merece un desplazamiento específico o encaja mejor dentro de una ruta por la zona.
- Particularidades prácticas que ayuden a decidir si encaja con el viajero.

La experiencia viajera debe aportar utilidad real. No convertirla en lenguaje promocional genérico. Evitar expresiones vacías como «una experiencia única», «un lugar imprescindible», «una explosión de sabores», «te transportará» o «el mejor restaurante», salvo que el texto tenga una justificación editorial concreta y verificable.

No inventar experiencias personales. Si AvenTourArte no ha realizado una visita propia, no redactar el texto como si el autor hubiera estado allí.

La información investigada puede utilizarse para describir características verificables, pero debe redactarse de forma natural para el viajero, sin lenguaje interno de investigación.

La futura trazabilidad interna entre experiencia propia, investigación oficial, investigación secundaria, pendiente de visita y pendiente de comprobar permanece PENDING y se definirá en [Investigación](investigacion.md).

### 💡 Consejo AvenTourArte:

Cuando exista, debe contener una recomendación práctica y concreta que pueda mejorar la visita.

Puede incluir, por ejemplo:

- Qué elegir.
- Cuándo ir.
- Qué preguntar.
- Cómo pedir.
- Si reservar.
- Particularidades del local.
- Disponibilidad variable de un producto.
- Otra recomendación práctica relevante.

No utilizar el Consejo AvenTourArte para introducir notas internas, tareas pendientes, dudas de investigación, advertencias de auditoría o lenguaje de IA o QA. No inventar un consejo únicamente para completar la estructura.

### Dirección, Maps, teléfono, web y reserva

Las fichas deben cumplir las [reglas ACTIVE de mapas, web y reservas](maps-web-reservas.md#active--reglas-oficiales). Ese documento regula la prioridad del canal oficial, la distinción entre `web` y `reserva`, la reserva directa oficial, la correspondencia entre establecimiento, `direccion` y `maps`, la verificación del teléfono publicado y la prohibición de inventar datos prácticos. La normativa común se mantiene en ese documento.

### Horarios y precios

- No inventar horarios ni precios.
- Cuando se publiquen, deben corresponder al establecimiento correcto.
- La obligatoriedad, formato y frecuencia de actualización de `horario` y `precio` permanecen PENDING.

### Estado operativo

- No recomendar conscientemente como establecimiento activo un negocio que se haya confirmado como cerrado definitivamente.
- Cuando existan dudas razonables sobre si sigue operativo, debe investigarse antes de presentarlo como recomendación vigente.
- La metodología y frecuencia exacta de comprobación pertenece a [Investigación](investigacion.md) y permanece PENDING.

### Lenguaje editorial

La ficha está escrita para el viajero. No incluir lenguaje interno como:

- «según las fuentes consultadas».
- «tras nuestra investigación».
- «no se ha podido verificar».
- «pendiente de comprobar».
- «durante la auditoría».
- «el agente ha determinado».
- Referencias a ChatGPT, Codex, IA, QA o procesos internos.

Las dudas deben quedar en documentación interna o provocar una revisión, no convertirse en texto publicado.

### Perfil alimentario y alérgenos

No se declara todavía obligatorio `perfilAlimentario` a nivel de establecimiento. Las reglas actuales de `perfilAlimentario` y alérgenos se aplican a las fichas de Gastronomía según [Gastronomía](gastronomia.md#active--reglas-oficiales).

La futura información dietética a nivel de restaurante permanece PENDING. Esta decisión no crea un modelo nuevo.

### Imágenes

La sección «Dónde comer» no utiliza fotografías. Las fichas de establecimientos no deben incluir `foto` ni `fotos`.

Esta regla se aplica a restaurantes, bares, cafeterías, pastelerías, bodegas, heladerías y cualquier otro establecimiento incluido dentro de «Dónde comer».

La ausencia de fotografía en una ficha de «Dónde comer»:

- No es un error.
- No es un aviso.
- No significa falta de cobertura.
- No debe provocar que un agente intente buscar o añadir una imagen.

Las fotografías se reservan editorialmente para «Qué visitar» y «Gastronomía». Pueden utilizarse excepcionalmente, cuando exista una razón editorial, en «Cultura y Vida Local» y «Consejos prácticos» de guías internacionales. Las reglas concretas de esas dos excepciones no se definen aquí; se documentarán en sus archivos correspondientes.

Si alguna ficha histórica de «Dónde comer» tuviera `foto` o `fotos`, no modificarla automáticamente: debe señalarse para revisión cuando esa guía entre en alcance.

### Seguridad y alcance

- Estas reglas se aplican a contenido nuevo y establecimientos que entren explícitamente en revisión.
- No realizar una migración masiva de los restaurantes existentes.
- Una ficha histórica que contradiga estas reglas debe señalarse para revisión.
- No eliminar establecimientos automáticamente por no cumplir todavía el formato nuevo.
- No modificar recomendaciones gastronómicas existentes fuera del alcance solicitado.

## PENDING — Decisiones aún por definir

- Orden exacto de propiedades TypeScript de las fichas.
- Campos estrictamente obligatorios y opcionales, incluidos `horario` y `precio`.
- Obligatoriedad y formato exacto de `contenido`.
- Formato de `horario`.
- Formato de `precio`.
- Frecuencia de comprobación de apertura, horarios, precios, teléfonos y enlaces.
- Metodología exacta de comprobación del estado operativo.
- Número mínimo/máximo de establecimientos.
- Criterios exactos de diversidad de tipos de establecimiento.
- `perfilAlimentario` a nivel de establecimiento.
- Alérgenos a nivel de establecimiento.
- Tratamiento de cartas estacionales o platos que cambian frecuentemente.
- Trazabilidad interna de experiencia propia frente a información investigada.
- Reglas específicas para guías internacionales.
