# Control de calidad de AvenTourArte

## Objetivo

Documentar la primera especificación oficial de QA, basada únicamente en reglas ACTIVE aprobadas. Las decisiones PENDING no son criterios obligatorios. La implementación y operación futuras siguen PENDING.

Esta especificación conserva el alcance de cada regla: no extiende automáticamente las reglas españolas a guías internacionales ni convierte la revisión en autorización para modificar contenido fuera del alcance solicitado.

## ACTIVE — Especificación oficial de QA

Decisión [QA-002](../decisions/decision-log.md), vigente desde el 2026-10-05.

### Reglas de referencia

- [Restricciones de proceso (PROC-001)](../../../AGENTS.md).
- [Estructura de guía (EDIT-003)](../rules/guide-structure.md).
- [Qué visitar (EDIT-005)](../rules/que-visitar.md).
- [Mapas, web y reservas (EDIT-004)](../rules/maps-web-reservas.md).
- [Imágenes y Cloudinary (EDIT-006)](../rules/imagenes-cloudinary.md).
- [Gastronomía (EDIT-007)](../rules/gastronomia.md).
- [Dónde comer (EDIT-008)](../rules/donde-comer.md).
- [Estilo editorial (EDIT-009)](../rules/estilo-editorial.md).
- [Cultura y Vida Local (EDIT-010)](../rules/cultura-vida-local.md).
- [Fiestas en destinos de España (EDIT-011)](../rules/fiestas.md).
- [Investigación (RES-002)](../rules/investigacion.md).

### Niveles de gravedad ACTIVE

Se establecen estos cuatro niveles:

#### BLOCKER

Problema que impide considerar una guía apta para publicación o aprobación.

Ejemplos conceptuales:

- información inventada;
- referencias internas de IA/auditoría publicadas de forma evidente;
- estructura fundamental incompatible con una regla ACTIVE;
- dato práctico que apunta claramente al lugar equivocado;
- experiencia personal inventada;
- contradicción factual grave conocida.

#### ERROR

Incumplimiento claro de una regla ACTIVE que debe corregirse antes de dar por terminada la revisión.

#### WARNING

Situación que no demuestra por sí misma un incumplimiento, pero necesita revisión humana.

Ejemplos:

- posible placeholder;
- información que puede estar desactualizada;
- relación gastronómica dudosa;
- dato cambiante que necesita nueva comprobación;
- posible duplicación entre secciones.

#### INFO

Observación útil que no requiere necesariamente cambios.

### Principio de aprobación

Una guía NO puede considerarse aprobada si contiene:

- uno o más BLOCKER;
- uno o más ERROR.

Puede existir una guía técnicamente utilizable con WARNING, pero no deben ignorarse:
deben revisarse y justificarse antes de declarar cerrada una revisión editorial.

INFO no bloquea.

La forma futura de registrar aprobaciones, responsables y excepciones permanece PENDING.

### Alcance del QA

La checklist debe revisar como mínimo las siguientes categorías.

### 1. Restricciones de proceso

Comprobar:

- que no se haya modificado contenido fuera del alcance solicitado;
- que no se haya eliminado contenido sin autorización;
- que decisiones PENDING no se hayan utilizado como reglas oficiales;
- que una estructura histórica no se haya convertido automáticamente en norma;
- que no se haya inventado información.

La comprobación completa de alcance puede requerir revisión manual.

### 2. Estructura general — guías municipales españolas

Según [Estructura de guía](../rules/guide-structure.md), comprobar el orden ACTIVE:

1. Historia
2. Geografía y Clima
3. Qué visitar en…
4. Gastronomía
5. Dónde comer en…
6. Cultura y Vida Local
7. Fiestas y Festivos Principales

Comprobar también:

- `descripcion` pertenece a la raíz;
- `infoGeneral`, cuando exista, pertenece a la raíz;
- no considerar estas reglas automáticamente aplicables a internacionales.

Un orden incorrecto en una guía nueva o explícitamente revisada es ERROR.

### 3. Qué visitar

Para fichas estándar municipales españolas comprobar:

Colección estándar:

- `lugares`.

Orden canónico cuando existan los campos:

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

Comprobar:

- `tiposPlan` declarado explícitamente;
- ausencia de lenguaje interno en nombre/descripción;
- no inventar horario o precio;
- gratuidad tratada según las reglas ACTIVE;
- datos prácticos sujetos a [Mapas, web y reservas](../rules/maps-web-reservas.md);
- imagen sujeta a [Imágenes y Cloudinary](../rules/imagenes-cloudinary.md).

No exigir campos que las reglas todavía consideran opcionales o PENDING.

Casos de subsecciones, itinerarios, acceso, duración, etc. deben marcarse para revisión según corresponda, no considerarse automáticamente ERROR.

### 4. Maps y dirección

Comprobar:

- el campo preferente es `maps`;
- `mapaUrl` puede existir históricamente pero no es el formato preferido para contenido nuevo;
- Maps corresponde al lugar exacto;
- dirección y Maps corresponden a la misma entidad;
- no se utiliza una búsqueda genérica cuando existe y se ha identificado una ficha específica;
- no se utiliza una ruta de navegación como sustituto de ficha;
- no hay coordenadas o URLs inventadas.

El fallback técnico del visor NO cuenta como Maps editorialmente verificado.

Un enlace que lleva claramente a otro lugar es al menos ERROR y puede ser BLOCKER si induce de forma grave al viajero.

### 5. Teléfono, web y reserva

Comprobar:

- teléfono verificado cuando se publique;
- `web` representa canal oficial según las reglas ACTIVE;
- `web` y `reserva` no se confunden;
- reserva apunta al sistema oficial/directo cuando exista;
- no se utiliza un agregador si existe canal oficial directo;
- ningún dato práctico se ha inventado.

Casos sin canal oficial o con reserva únicamente por email/teléfono siguen sujetos a decisiones PENDING y no deben considerarse ERROR automáticamente.

### 6. Imágenes y Cloudinary

Comprobar:

- `foto` = imagen única;
- `fotos` = galería;
- referencias Cloudinary usan `cld:`;
- no existen identificadores inventados;
- la imagen corresponde realmente a la ficha;
- las imágenes duplicadas intencionadamente en una galería deben señalarse;
- portada/bandera reutilizada como sustitución debe tratarse como posible placeholder;
- tener referencia de imagen no equivale automáticamente a tener cobertura fotográfica definitiva.

No exigir todavía criterios PENDING como derechos, atribución o alt text.

### 7. Política de imágenes por sección

Comprobar:

#### Qué visitar
Las imágenes están admitidas según sus reglas.

#### Gastronomía
Las imágenes están admitidas según sus reglas.

#### Dónde comer
`foto` y `fotos` están PROHIBIDOS.

Su presencia es ERROR.

Su ausencia NO es error, warning ni falta de cobertura.

#### Cultura y Vida Local
Las imágenes son excepcionales y no obligatorias.

Su ausencia NO es problema.

Una imagen presente debe tener justificación editorial y cumplir [Imágenes y Cloudinary](../rules/imagenes-cloudinary.md).

#### Fiestas y Festivos Principales — destinos de España
`foto` y `fotos` están PROHIBIDOS.

Su presencia es ERROR.

Su ausencia NO es error, warning ni falta de cobertura.

### 8. Gastronomía — vinculación con el destino

Comprobar:

- que los platos/productos tengan vinculación suficiente con el destino;
- evitar listas genéricas repetidas de gastronomía regional;
- que no se haya añadido un plato únicamente porque aparece en la carta de un restaurante;
- temporada indicada cuando sea relevante;
- no inventar receta, ingrediente, temporada o relación local.

Una vinculación dudosa debe ser WARNING para revisión humana, no eliminación automática.

### 9. perfilAlimentario

Para fichas gastronómicas nuevas o explícitamente revisadas:

`perfilAlimentario` es obligatorio.

Debe utilizar:

- `dieta`
- `alcohol`
- `cerdo`

Comprobar que se utilizan los valores existentes del proyecto y que la certeza es prudente.

No aceptar afirmaciones absolutas sin base suficiente.

Ausencia de `perfilAlimentario` en una ficha nueva/revisada es ERROR.

No marques automáticamente como ERROR todas las fichas históricas fuera del alcance.

### 10. Alérgenos

Toda ficha gastronómica debe poder resolver conceptualmente su perfil de alérgenos.

Comprobar:

- `status`;
- `contains`;
- `possible`;

según el sistema vigente.

No exigir todavía que se almacene inline en cada guía.

Comprobar que no se afirma `contains` sin respaldo suficiente.

La implementación técnica definitiva sigue PENDING.

### 11. Dónde comer

Comprobar:

- establecimiento relevante para la guía;
- relación coherente con Gastronomía cuando corresponda;
- no introducir establecimientos solo por cantidad;
- no duplicar establecimientos equivalentes sin motivo;
- establecimiento no confirmado como cerrado definitivamente;
- datos prácticos según reglas comunes.

Cuando existan bloques editoriales, comprobar este orden:

1. 🍴 Qué pedir sí o sí:
2. 🧭 Experiencia viajera:
3. 💡 Consejo AvenTourArte:

No exigir que los tres existan.

Si existen, comprobar:

#### Qué pedir sí o sí

- recomendaciones en líneas independientes con `-`;
- no inventadas;
- asociadas realmente al establecimiento.

#### Experiencia viajera

- aporta utilidad;
- no inventa una experiencia personal;
- no es publicidad vacía.

#### Consejo AvenTourArte

- aporta una recomendación práctica;
- no contiene notas internas.

### 12. Cultura y Vida Local

Comprobar:

- contenido relacionado con identidad viva del destino;
- no duplicar Historia, Qué visitar, Gastronomía, Dónde comer o Fiestas;
- forma estándar municipal `titulo + contenido`;
- `lugares` solo cuando exista justificación editorial;
- ausencia de tópicos regionales genéricos sin relación suficiente con el destino;
- imágenes únicamente de forma excepcional.

Los criterios exactos de uso de `lugares` siguen PENDING, por lo que su presencia no debe producir ERROR automáticamente.

### 13. Fiestas y Festivos Principales — España

Comprobar:

- colección estándar `lugares`;
- orden cuando los campos estén presentes:
  `nombre → descripcion → fecha → precio`;

- evento con relación suficiente con el destino;
- no convertir la sección en agenda exhaustiva;
- no dejar una fecha concreta antigua como si fuera permanente;
- datos de ediciones concretas verificados cuando entren en revisión;
- no inventar fecha o precio;
- sin `foto` ni `fotos`;
- Maps, dirección, teléfono, web y reserva NO son campos estándar.

No considerar automáticamente error la ausencia de `precio`.

### 14. Lenguaje editorial

Esta categoría comprueba explícitamente la presencia de lenguaje interno.

Marcar como ERROR, y como BLOCKER cuando sea especialmente grave o extenso, contenido publicado que revele procesos internos.

Buscar conceptualmente expresiones como:

- «según las fuentes consultadas»
- «según nuestra investigación»
- «tras nuestra investigación»
- «no se ha podido verificar»
- «no se ha podido confirmar»
- «pendiente de verificar»
- «pendiente de comprobar»
- «requiere revisión»
- «durante la auditoría»
- «la auditoría indica»
- «nivel de confianza»
- «el agente ha determinado»
- «Codex»
- «ChatGPT»
- «QA»
- «prompt»

No utilizar una mera búsqueda literal como única prueba:
el contexto importa.

Por ejemplo:
«Los horarios pueden variar según la temporada»
es lenguaje viajero válido.

### 15. Experiencia personal inventada

Marcar como BLOCKER cuando una guía afirme o insinúe una experiencia propia inexistente.

Revisar expresiones como:

- «cuando estuvimos allí»
- «cuando lo probamos»
- «nos encantó»
- «en nuestra visita»
- «comprobamos personalmente»

solo serán válidas si existe procedencia EXPERIENCIA_PROPIA documentada.

La implementación técnica de esa procedencia sigue PENDING, por lo que inicialmente requerirá revisión manual.

### 16. Lenguaje promocional vacío

Detectar expresiones genéricas como:

- «una experiencia única»
- «una joya escondida»
- «un lugar mágico»
- «una explosión de sabores»
- «te transportará en el tiempo»
- «el mejor restaurante»
- «una experiencia inolvidable»

No marcar automáticamente por coincidencia literal.

Marcar WARNING o ERROR según contexto cuando el texto sea promoción vacía sin información concreta.

### 17. Investigación y respaldo factual

Comprobar conceptualmente:

- fuente adecuada;
- prioridad de fuente oficial;
- actualidad en datos cambiantes;
- contradicciones resueltas o señaladas;
- separación entre notas internas y publicación;
- no convertir PENDIENTE_VERIFICACION en dato confirmado;
- no convertir PENDIENTE_VISITA en experiencia propia.

La evidencia técnica todavía no tiene esquema definitivo, por lo que parte de este QA será manual.

### 18. Datos cambiantes

Marcar para comprobación cuando entren en alcance:

- horarios;
- precios;
- teléfonos;
- URLs;
- reservas;
- cierres;
- restauraciones;
- disponibilidad;
- gratuidades;
- eventos;
- cartas;
- platos disponibles;
- fechas;
- estado operativo.

No definir todavía ventanas concretas de caducidad.

### 19. Coherencia entre secciones

Comprobar:

- Gastronomía y Dónde comer coherentes pero no dependientes de forma artificial;
- Cultura no duplica fichas completas de Fiestas o Qué visitar;
- fiestas no se convierten en Cultura duplicada;
- mismo elemento no duplicado innecesariamente;
- cada sección trata el aspecto que le corresponde.

La posible duplicación dudosa debe empezar como WARNING.

### 20. Coherencia código/documentación

Una guía puede funcionar técnicamente y aun incumplir reglas editoriales.

El QA debe distinguir:

- válido técnicamente;
- válido editorialmente.

El funcionamiento del visor, un fallback o la ausencia de error TypeScript NO implica aprobación editorial.

### Comprobaciones automáticas vs manuales

Los controles se clasifican conceptualmente en:

#### Candidatos a automatización
Por ejemplo:

- orden de secciones;
- presencia/ausencia de propiedades;
- orden de propiedades;
- `foto` prohibida en Dónde comer;
- `foto` prohibida en Fiestas españolas;
- `perfilAlimentario` presente en fichas nuevas/revisadas;
- sintaxis básica de URLs;
- referencias `cld:`;
- términos sospechosos de lenguaje interno;
- duplicados estructurales.

#### Revisión humana/agente
Por ejemplo:

- correspondencia real de Maps;
- vinculación gastronómica;
- exactitud factual;
- actualidad;
- calidad de una fuente;
- experiencia viajera;
- publicidad vacía;
- adecuación de un Consejo AvenTourArte;
- imagen realmente correspondiente;
- contradicciones entre fuentes.

Esta especificación no implementa ninguna de estas comprobaciones.

### Resultado de QA

El resultado conceptual puede resumirse como:

- BLOCKER: n
- ERROR: n
- WARNING: n
- INFO: n

y una conclusión:

- RECHAZADA: existe BLOCKER.
- REQUIERE_CORRECCIONES: no hay BLOCKER pero existen ERROR.
- LISTA_CON_AVISOS: no hay BLOCKER ni ERROR, pero existen WARNING.
- APROBADA: no hay BLOCKER, ERROR ni WARNING relevantes pendientes.

Esta especificación no crea interfaces ni código para representar este resultado.

La futura política sobre si una guía con warnings puede considerarse formalmente aprobada permanece PENDING; por ahora `LISTA_CON_AVISOS` debe distinguirse de `APROBADA`.

## Hechos observados — No normativos

El repositorio dispone de una auditoría editorial y tests parciales. La auditoría no comprueba todos los aspectos anteriores y sus resultados no constituyen por sí solos una aprobación editorial.

## PENDING — Operación futura de QA

- implementación de validadores;
- scripts npm;
- integración con tests;
- almacenamiento de resultados;
- identificación estable de códigos de error;
- excepciones justificadas;
- responsable final de aprobación;
- proceso de waiver/aceptación de warnings;
- historial de auditorías;
- integración con agentes;
- ejecución en CI;
- política final para aprobar guías con WARNING;
- accesibilidad completa;
- derechos/licencias de imágenes.
