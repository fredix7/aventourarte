# Estilo editorial

Estado: voz y estilo básicos **ACTIVE**; convenciones restantes **PENDING**.

## Objetivo

Documentar la voz editorial vigente y las convenciones de contenido publicado, distinguiendo las decisiones aún pendientes.

## Hechos observados — No normativos

- El contenido se almacena principalmente en `descripcion` y `contenido`, con párrafos y saltos de línea dentro de cadenas.
- Algunas guías incorporan consejos, experiencias viajeras y encabezados con emojis dentro del texto.
- Los títulos presentan variantes de capitalización y subtítulos descriptivos.

Las restricciones de proceso vigentes, incluida la exclusión del lenguaje interno de investigación, auditoría o IA del contenido publicado, están en [AGENTS.md](../../../AGENTS.md).

## ACTIVE — Voz y estilo oficial

Decisión [EDIT-009](../decisions/decision-log.md), vigente desde el 2026-10-05.

### Voz de AvenTourArte

El contenido publicado de AvenTourArte debe estar escrito para una persona que está preparando o realizando un viaje.

La prioridad es que el texto sea:

- Claro.
- Natural.
- Útil.
- Concreto.
- Informativo.
- Fácil de consultar durante un viaje.

Debe aportar contexto suficiente para entender por qué algo merece atención y, cuando corresponda, ayudar a decidir:

- Si visitar un lugar.
- Qué probar.
- Cuándo ir.
- Cómo organizar la visita.
- Qué particularidad merece conocer el viajero.

AvenTourArte no debe sonar como una auditoría, una base de datos, un informe técnico, una respuesta de IA, un documento académico o un folleto publicitario genérico.

### Orientación viajera

Siempre que sea útil, el contenido debe ir más allá de enumerar datos. Debe explicar el interés real para el viajero:

- Qué hace especial al lugar, plato, experiencia o celebración.
- Qué puede esperar.
- Qué merece especialmente la atención.
- Qué información práctica puede mejorar la experiencia.

No convertir esta orientación viajera en opinión inventada. No escribir experiencias personales que AvenTourArte no haya realizado.

### Prohibición de lenguaje interno

El contenido publicado no debe revelar el proceso interno utilizado para construir o revisar la guía.

Considerar error editorial expresiones como:

- «según las fuentes consultadas».
- «según nuestra investigación».
- «tras nuestra investigación».
- «durante la investigación».
- «hemos comprobado».
- «hemos verificado».
- «no se ha podido verificar».
- «no se ha podido confirmar».
- «pendiente de comprobar».
- «pendiente de verificar».
- «requiere revisión».
- «durante la auditoría».
- «la auditoría indica».
- «nivel de confianza».
- «según el análisis».
- «el agente ha determinado».
- «Codex ha detectado».
- «ChatGPT».
- «Codex».
- «IA».
- «QA».
- «prompt».
- «modelo».
- «fuentes revisadas».

Estas expresiones constituyen error cuando se utilicen para describir el proceso interno de creación o validación del contenido. La lista no es exhaustiva: ningún mecanismo interno de investigación, auditoría, agentes, desarrollo o validación debe aparecer en la guía publicada.

### Información incierta

La incertidumbre factual no debe transformarse en lenguaje de auditoría para el viajero. Si un dato no está suficientemente confirmado:

- Debe investigarse.
- Debe representarse mediante el modelo de certeza correspondiente cuando exista.
- Debe mantenerse como asunto interno pendiente.
- O debe omitirse si no puede publicarse con fiabilidad.

No publicar frases internas del tipo «no hemos podido comprobar si abre los domingos».

Esto no impide redactar información útil para el viajero cuando la propia realidad sea variable. Ejemplo conceptual válido: «Los horarios pueden variar según la temporada.» Describe una característica útil para el viajero, no el estado interno de la investigación.

### No inventar experiencia personal

No redactar en primera persona ni insinuar experiencia directa si AvenTourArte no dispone de una experiencia propia documentada.

No utilizar expresiones como:

- «cuando estuvimos allí».
- «cuando lo probamos».
- «nos encantó».
- «comprobamos personalmente».
- «en nuestra visita».

Solo puede utilizarse ese enfoque cuando exista realmente una experiencia propia de AvenTourArte que lo autorice. La trazabilidad interna de experiencia propia frente a información investigada se definirá en [Investigación](investigacion.md) y permanece PENDING.

### Evitar lenguaje promocional vacío

Evitar superlativos y fórmulas publicitarias genéricas que no aporten información. Ejemplos a evitar cuando carezcan de justificación concreta:

- «una experiencia única».
- «una joya escondida».
- «un lugar mágico».
- «una visita imprescindible».
- «una explosión de sabores».
- «te transportará en el tiempo».
- «un lugar que no te puedes perder».
- «el mejor restaurante».
- «una experiencia inolvidable».

No se prohíbe transmitir entusiasmo. Sí se exige que el entusiasmo esté apoyado por información concreta sobre aquello que hace interesante la experiencia.

### Precisión frente a relleno

No añadir frases genéricas únicamente para alargar una descripción. Cada párrafo debe aportar al menos una de estas funciones:

- Contexto.
- Interés histórico o cultural.
- Utilidad para la visita.
- Explicación gastronómica.
- Experiencia viajera.
- Información práctica.
- Relación con el destino.

Evitar repetir la misma información en varios campos o párrafos sin necesidad.

### Tono

Utilizar español natural y cercano, manteniendo una voz editorial cuidada. Evitar:

- Tono burocrático.
- Lenguaje excesivamente académico.
- Lenguaje técnico innecesario.
- Exageración turística.
- Tono robótico.
- Frases propias de informes internos.

No infantilizar al lector. No utilizar jerga interna del proyecto.

### Consejo AvenTourArte

«Consejo AvenTourArte» representa una recomendación editorial útil para mejorar la experiencia del viajero. No es una nota interna, una advertencia para desarrolladores, un recordatorio de investigación ni un campo donde esconder información no verificada.

Cuando exista, debe contener una recomendación concreta y útil. Las reglas específicas de su ubicación dentro de «Dónde comer» se definen en [Dónde comer](donde-comer.md#active--reglas-oficiales).

### Experiencia viajera

«Experiencia viajera» debe describir información útil sobre cómo se vive o encaja una experiencia desde la perspectiva del viajero. No debe confundirse con experiencia personal de AvenTourArte.

Puede redactarse a partir de información verificable sin afirmar que AvenTourArte ha realizado personalmente esa experiencia. Las reglas específicas de «Experiencia viajera» en «Dónde comer» se encuentran en [Dónde comer](donde-comer.md#active--reglas-oficiales).

### Emojis

Los emojis pueden utilizarse cuando formen parte de convenciones editoriales expresamente definidas, como:

- 🍴 Qué pedir sí o sí:
- 🧭 Experiencia viajera:
- 💡 Consejo AvenTourArte:

No introducir emojis decorativos arbitrarios en títulos o descripciones únicamente para hacer el texto más llamativo. Las convenciones adicionales de emojis permanecen PENDING.

### Coherencia

- Una misma clase de contenido debe mantener terminología y estructura coherentes entre guías.
- No cambiar arbitrariamente nombres de bloques ya definidos oficialmente.
- Si existe una regla ACTIVE específica de una sección, esa regla tiene prioridad sobre una decisión estilística genérica de este documento.

### Seguridad editorial

Si un agente detecta cualquiera de los siguientes casos, debe señalarlo como problema editorial:

- Texto de auditoría.
- Lenguaje interno.
- Referencias a IA.
- Una experiencia personal inventada.
- Texto promocional vacío.
- Notas pendientes publicadas.
- Contenido manifiestamente de desarrollo.

No debe conservarlo únicamente porque ya estuviera publicado en una guía antigua. Tampoco debe modificar masivamente guías fuera del alcance de la tarea.

## PENDING — Decisiones aún por definir

- Extensión estándar de cada tipo de descripción.
- Número recomendado de párrafos.
- Reglas completas de capitalización.
- Reglas completas de puntuación.
- Convenciones adicionales de emojis.
- Uso de primera o segunda persona como voz general.
- Tratamiento editorial concreto de citas históricas.
- Terminología para nombres oficiales frente a nombres populares.
- Trazabilidad interna de experiencia propia.
- Tratamiento preciso de información factual cambiante.
- Variantes estilísticas para guías internacionales.
