# Investigación

Estado: protocolo básico de investigación **ACTIVE**; implementación técnica y mantenimiento aún por definir **PENDING**.

## Objetivo

Recoger las reglas vigentes y las decisiones pendientes para investigar, respaldar y mantener la información de las guías.

## Hechos observados — No normativos

- La auditoría existente revisa campos, enlaces, imágenes y resolución de alérgenos.
- No verifica automáticamente exactitud factual, vigencia, disponibilidad externa o derechos de imagen.
- No hay un contrato global de guía que defina un registro uniforme de fuentes y fechas de comprobación.


La restricción de no inventar información está ACTIVE en [AGENTS.md](../../../AGENTS.md).

## ACTIVE — Protocolo oficial de investigación

Decisión [RES-002](../decisions/decision-log.md), vigente desde el 2026-10-05.

### Principio fundamental

La investigación interna debe producir información suficientemente fiable para publicar una guía útil para el viajero.

No inventar información para completar campos.

Si un dato no puede verificarse con suficiente confianza:

- no debe presentarse como confirmado;
- debe quedar pendiente internamente;
- debe representarse con un modelo de incertidumbre cuando exista;
- o debe omitirse del contenido publicado.

El hecho de que un dato aparezca en una guía antigua NO demuestra que siga siendo correcto.

### Jerarquía de fuentes

Priorizar las fuentes en este orden general:

1. Fuente oficial directa del lugar, establecimiento, monumento, organizador o entidad responsable.
2. Administración pública u organismo oficial competente.
3. Turismo oficial del destino, provincia, comunidad autónoma o país.
4. Canal oficial verificable del establecimiento o entidad, cuando sea el medio realmente utilizado para publicar información actual.
5. Fuentes secundarias fiables y suficientemente identificables.
6. Directorios, agregadores, medios sociales no oficiales, foros, reseñas o contenido generado por usuarios únicamente como apoyo, descubrimiento o contraste.

Una fuente de menor prioridad no debe sustituir automáticamente a una fuente oficial disponible.

Esto no significa que una fuente oficial sea infalible:
si existen contradicciones, deben investigarse.

### Canal oficial

Se considera especialmente valioso el canal que realmente mantiene la información operativa del recurso.

Según el caso puede ser:

- web oficial;
- página oficial de venta/reserva;
- administración competente;
- portal turístico oficial;
- cuenta social oficial claramente identificada;
- comunicación oficial del organizador.

Una red social oficial puede servir como evidencia actual para información que se publique principalmente por ese canal, especialmente:

- eventos;
- cambios puntuales;
- cierres;
- horarios especiales;
- anuncios temporales.

Esto NO convierte automáticamente una red social en sustituto del campo `web` de una ficha.

Las reglas editoriales de `web` siguen dependiendo de [Mapas, web y reservas](maps-web-reservas.md#active--reglas-oficiales).

### Datos especialmente cambiantes

Considerar información dinámica o susceptible de cambiar:

- horarios;
- precios;
- teléfonos;
- URLs;
- reservas;
- cierres;
- restauraciones;
- disponibilidad de visitas;
- días o franjas gratuitas;
- eventos;
- cartas;
- platos disponibles;
- fechas;
- estado operativo de establecimientos.

Cuando uno de estos datos entre en una guía nueva o sea objeto de revisión, debe comprobarse con información suficientemente actual.

No copiar automáticamente un horario, precio o estado operativo de una guía histórica sin volver a comprobarlo cuando forme parte del alcance de la tarea.

La frecuencia exacta de reverificación periódica permanece PENDING.

### Gratuidad

Cuando un lugar sea normalmente de pago y sea relevante para el viajero, investigar si existen:

- días gratuitos;
- franjas gratuitas;
- jornadas de puertas abiertas;
- campañas especiales verificadas.

Si el acceso ordinario ya es gratuito, NO crear información artificial sobre «día gratuito».

Las reglas editoriales concretas de Qué visitar siguen en [Qué visitar](que-visitar.md#active--fichas-estándar-de-guías-municipales-españolas).

### Contradicciones entre fuentes

Cuando dos fuentes relevantes se contradigan:

- no seleccionar arbitrariamente la versión más conveniente;
- comprobar cuál es más reciente;
- valorar cuál tiene autoridad directa sobre el dato;
- buscar confirmación adicional cuando sea necesario;
- conservar internamente la contradicción si no puede resolverse.

Si no puede determinarse una versión suficientemente fiable, no publicar el dato como confirmado.

Una contradicción no resuelta debe pasar al flujo interno de revisión.

### Separación entre investigación y publicación

La investigación puede contener:

- fuentes;
- URLs;
- fechas de consulta;
- dudas;
- contradicciones;
- hipótesis;
- nivel de certeza;
- tareas pendientes;
- notas de agentes;
- razones de inclusión o exclusión.

Ese contenido es INTERNO.

No debe copiarse literalmente a `descripcion`, `contenido`, «Experiencia viajera», «Consejo AvenTourArte» ni otros textos publicados.

Las reglas de lenguaje publicado se encuentran en [Estilo editorial](estilo-editorial.md#active--voz-y-estilo-oficial).

### Procedencia de la información

AvenTourArte debe poder distinguir conceptualmente al menos estas procedencias internas:

#### EXPERIENCIA_PROPIA

Información obtenida mediante una experiencia real de AvenTourArte:
- visita realizada;
- plato probado;
- establecimiento visitado;
- experiencia realizada;
- observación directa relevante.

No debe asignarse este estado si la experiencia no ocurrió realmente.

#### FUENTE_OFICIAL

Información respaldada por una fuente oficial adecuada.

#### FUENTE_SECUNDARIA

Información respaldada principalmente por una fuente secundaria suficientemente fiable.

#### PENDIENTE_VISITA

Lugar, establecimiento, plato o experiencia que puede estar investigado pero que AvenTourArte todavía quiere conocer personalmente.

No significa que la información publicada sea necesariamente incorrecta.

#### PENDIENTE_VERIFICACION

Existe una duda concreta que impide considerar confirmado un dato relevante.

No debe utilizarse como excusa para publicar igualmente el dato como confirmado.

Estos estados son conceptuales por ahora.

NO crees todavía interfaces TypeScript, campos nuevos ni bases de datos para almacenarlos.

La implementación técnica permanece PENDING.

### Experiencia propia

La experiencia propia tiene valor editorial adicional, pero no sustituye la verificación de datos cambiantes.

Ejemplo:

Una visita personal puede confirmar cómo es una experiencia, pero un horario observado meses atrás no debe considerarse permanentemente vigente.

Cuando exista experiencia propia documentada, puede alimentar:

- Experiencia viajera;
- Consejo AvenTourArte;
- selección de platos;
- observaciones prácticas;
- particularidades del lugar.

No convertir automáticamente una opinión personal en hecho objetivo.

### Experiencia investigada

Un lugar puede describirse de forma útil aunque AvenTourArte todavía no lo haya visitado personalmente.

En ese caso:

- no fingir experiencia personal;
- no utilizar primera persona basada en una visita inexistente;
- utilizar información verificable;
- mantener internamente su procedencia investigada.

«Experiencia viajera» NO significa necesariamente «experiencia propia».

### Gastronomía

Para gastronomía, investigar con especial cuidado:

- vinculación real con el destino;
- ingredientes relevantes;
- variantes;
- temporada;
- dieta;
- alcohol;
- cerdo;
- alérgenos.

No dar por confirmado un ingrediente únicamente porque una receta encontrada en Internet lo incluya.

Distinguir receta tradicional, variantes habituales y preparación concreta cuando sea relevante.

Aplicar las [reglas ACTIVE de Gastronomía](gastronomia.md#active--reglas-oficiales).

### Dónde comer

Antes de recomendar un establecimiento, comprobar cuando forme parte del alcance:

- que el establecimiento corresponde realmente al destino;
- que no exista confirmación de cierre definitivo;
- su relación con la recomendación gastronómica;
- datos prácticos publicados;
- platos recomendados cuando se incluyan;
- web/reserva/Maps según las reglas ACTIVE correspondientes.

No inventar «Qué pedir sí o sí», «Experiencia viajera» ni «Consejo AvenTourArte».

Aplicar [Dónde comer](donde-comer.md#active--reglas-oficiales).

### Qué visitar

Investigar según corresponda:

- identidad exacta del lugar;
- acceso;
- horario;
- precio;
- gratuidad;
- dirección;
- Maps;
- web;
- reserva;
- cierres;
- restauraciones;
- visitas concertadas;
- restricciones relevantes.

No asumir que «aparece en Google Maps» significa «puede visitarse».

No asumir que un edificio existe físicamente y es visible significa que su interior sea visitable.

Aplicar [Qué visitar](que-visitar.md#active--fichas-estándar-de-guías-municipales-españolas) y [Mapas, web y reservas](maps-web-reservas.md#active--reglas-oficiales).

### Fecha de comprobación

La investigación interna debe poder conocer cuándo se comprobó un dato que puede cambiar.

La forma técnica de guardar la fecha de consulta o verificación permanece PENDING.

No añadir ahora campos nuevos a las guías.

### Evidencia interna

La futura fábrica debe poder conservar evidencia suficiente para que otro agente pueda revisar por qué un dato se consideró válido.

Esa evidencia puede incluir conceptualmente:

- fuente;
- URL;
- fecha de consulta;
- dato respaldado;
- procedencia;
- observaciones internas;
- contradicciones detectadas.

La estructura técnica definitiva permanece PENDING.

### Agentes investigadores

Un agente investigador:

- investiga;
- compara;
- documenta evidencia;
- identifica incertidumbres;
- propone información.

NO debe convertir una duda en certeza.

NO debe inventar un dato para cerrar una ficha.

NO debe ocultar una contradicción relevante al agente revisor.

La futura distribución exacta de responsabilidades entre agentes permanece PENDING.

### Seguridad de cambios

La detección de información antigua o dudosa NO autoriza una actualización masiva del repositorio.

Debe señalarse para revisión.

Solo se modificarán las guías que estén dentro del alcance explícito de la tarea.

## PENDING — Decisiones aún por definir

- implementación técnica de procedencia/evidencia;
- ubicación de fuentes y notas internas;
- esquema para URLs y fechas de consulta;
- frecuencia concreta de reverificación;
- ventanas de vigencia según tipo de dato;
- número mínimo de fuentes según tipo de afirmación;
- reglas exactas para resolver cada tipo de contradicción;
- almacenamiento de EXPERIENCIA_PROPIA;
- sistema para registrar visitas realizadas;
- sistema para registrar platos probados;
- integración futura con los agentes;
- derechos/licencias de imágenes;
- tratamiento documental de llamadas telefónicas, conversaciones presenciales u otras fuentes no enlazables.
