# Gastronomía

Estado: reglas editoriales básicas de Gastronomía **ACTIVE**; demás decisiones **PENDING**.

## Objetivo

Documentar las reglas vigentes y las decisiones pendientes de fichas gastronómicas y de información alimentaria.

## Hechos observados — No normativos

- Las secciones utilizan `platos`, con `contenido` introductorio en algunas guías.
- Las fichas combinan `nombre`, `descripcion`, imagen, precio y, en ocasiones, `fecha` o `perfilAlimentario`; el orden varía.
- De 181 fichas gastronómicas, 46 declaran `perfilAlimentario`, repartidas entre Almensilla, Coria, Rota, Chipiona, Copenhague y Malmö.
- El perfil contiene `dieta`, `alcohol` y `cerdo`. La dieta distingue certeza confirmada, variable o desconocida; alcohol y cerdo distinguen contiene, puede contener, no contiene y desconocido.
- Los alérgenos se resuelven desde un catálogo compartido y excepciones por guía; las guías no declaran actualmente los campos inline admitidos por el resolver.
- El visor combina criterios de dieta, alcohol, cerdo y alérgenos y prioriza las fichas por compatibilidad.

## ACTIVE — Reglas oficiales

Decisión [EDIT-007](../decisions/decision-log.md), vigente desde el 2026-10-05.

### Alcance de Gastronomía

La sección Gastronomía debe representar la gastronomía realmente vinculada al destino.

Priorizar:

- Platos propios de la localidad.
- Productos especialmente vinculados al destino.
- Variantes locales reconocibles.
- Dulces, bebidas o elaboraciones con relación clara con el lugar.
- Platos de ámbito provincial o regional cuando tengan una presencia o relevancia especialmente justificable en ese destino.

No añadir automáticamente platos únicamente porque sean comunes en Andalucía, Cádiz, Sevilla, España o la región correspondiente. Un plato regional genérico solo debe incluirse cuando exista una justificación suficiente para su presencia en la guía concreta.

La sección no debe convertirse en una lista genérica de gastronomía regional repetida entre municipios. Las dudas sobre si un plato tiene vinculación suficiente deben tratarse durante investigación y revisión, no resolverse inventando una relación local.

### Colección

- La colección estándar de la sección es `platos`.
- El posible `contenido` introductorio puede existir cuando aporte contexto útil, pero su obligatoriedad y formato exacto permanecen PENDING.

### perfilAlimentario

- Toda ficha gastronómica nueva o revisada debe disponer de `perfilAlimentario`.
- El perfil utiliza los conceptos ya existentes en el proyecto: `dieta`, `alcohol` y `cerdo`.
- No crear un sistema alternativo incompatible con el existente.

### dieta

- La información dietética debe utilizar niveles de certeza prudentes.
- Cuando la compatibilidad esté realmente confirmada puede utilizarse la compatibilidad correspondiente del sistema: `vegano`, `vegetariano`, `pescetariano` o `ninguno`.
- Cuando dependa de receta, establecimiento, variante o preparación no debe afirmarse como confirmada. En esos casos debe utilizarse el nivel de certeza adecuado del modelo existente: `variable` o `desconocido`.
- No inferir de forma absoluta que una receta tradicional es vegana, vegetariana o pescetariana únicamente por su nombre.

### alcohol y cerdo

- Los campos de alcohol y cerdo deben utilizar los estados existentes: `contiene`, `puede-contener`, `no-contiene` y `desconocido`.
- No utilizar `no-contiene` salvo que haya base suficiente para afirmarlo.
- Cuando la receta pueda variar o existan versiones habituales con y sin ese ingrediente, utilizar un estado prudente.
- No ocultar la posible presencia de alcohol o cerdo para hacer que un plato resulte compatible con más filtros.

### Alérgenos

- Toda ficha gastronómica debe poder resolver un perfil de alérgenos mediante el sistema de AvenTourArte.
- El perfil conceptual utiliza `status`, `contains` y `possible`.
- No afirmar un alérgeno como `contains` sin base suficiente.
- Utilizar `possible` cuando pueda aparecer razonablemente por receta, variante o preparación pero no pueda garantizarse en todos los casos.
- Cuando la composición varíe de forma relevante, el estado debe reflejar esa variabilidad.
- La ubicación técnica definitiva de esta información (catálogo compartido, excepción por guía, datos inline u otra solución compatible) permanece PENDING.
- Esta decisión no autoriza una migración del sistema actual de alérgenos.

### Temporada

- Cuando un plato, producto o dulce tenga una temporada de consumo relevante para el viajero, debe indicarse.
- En la estructura actual puede utilizarse `fecha` para expresar esa temporada.
- Ejemplos conceptuales: primavera, Cuaresma / Semana Santa, temporada de caracoles, Feria y Navidad.
- No inventar una temporada.
- No añadir `fecha` a platos cuyo consumo no tenga una estacionalidad relevante únicamente para completar el campo.
- El futuro nombre definitivo del campo de temporada permanece PENDING; actualmente `fecha` es compatible con el modelo existente.

### Precio

- No inventar precios.
- La obligatoriedad de `precio`, su formato y si debe representar precio aproximado por ración, tapa, unidad u otra medida permanecen PENDING.

### Imágenes

Las fichas gastronómicas deben cumplir las [reglas ACTIVE de Imágenes y Cloudinary](imagenes-cloudinary.md#active--reglas-oficiales). Las reglas de Cloudinary se mantienen en ese documento y no se duplican aquí.

### Lenguaje editorial

La descripción debe estar escrita para el viajero. No incluir lenguaje interno como:

- «según las fuentes consultadas».
- «tras nuestra investigación».
- «no se ha podido verificar».
- «nivel de confianza».
- «durante la auditoría».
- «el agente ha determinado».
- Referencias a ChatGPT, Codex, IA, QA o procesos internos.

La incertidumbre debe representarse en los campos y modelos apropiados o quedar en documentación interna, no filtrarse como lenguaje de auditoría en el texto publicado.

### Seguridad y alcance

- No inventar recetas, ingredientes, compatibilidades, alérgenos, temporadas o relaciones locales.
- No modificar masivamente fichas gastronómicas existentes solo porque todavía no cumplan las nuevas reglas.
- Una ficha antigua que no cumpla estas reglas debe señalarse para revisión.
- Las reglas ACTIVE deben aplicarse a contenido gastronómico nuevo y a fichas que entren explícitamente en revisión.

## PENDING — Decisiones aún por definir

- Orden exacto de propiedades de una ficha gastronómica.
- Obligatoriedad de `foto`.
- Obligatoriedad y formato de `precio`, incluida la medida de referencia: ración, tapa, unidad u otra.
- Obligatoriedad y formato de `contenido` introductorio.
- Nombre definitivo del campo de temporada frente al actual `fecha`.
- Criterios cuantitativos exactos para decidir cuándo un plato regional merece entrar en una guía local.
- Ubicación técnica definitiva de los perfiles de alérgenos.
- Posible incorporación futura de trazabilidad/fuente de la información alimentaria.
- Tratamiento de platos con múltiples recetas tradicionales claramente diferenciadas.
- Reglas específicas para gastronomía internacional.
