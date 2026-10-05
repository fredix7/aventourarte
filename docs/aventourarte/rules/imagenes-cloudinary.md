# Imágenes y Cloudinary

Estado: reglas básicas de imágenes y Cloudinary **ACTIVE**; demás decisiones **PENDING**.

## Objetivo

Recoger las reglas vigentes y las decisiones pendientes sobre referencias de imagen, galerías y uso de Cloudinary.

## Hechos observados — No normativos

- `foto` contiene una referencia individual y `fotos` una colección de referencias.
- El visor puede combinar ambos campos y eliminar duplicados en la galería ampliada; no se encontraron fichas que declaren ambos simultáneamente.
- `cld:` identifica un recurso público que `ImageService` convierte en URL de entrega de Cloudinary con transformaciones.
- También existen referencias locales, utilizadas por Río.
- Algunas fichas reutilizan portada o bandera; la auditoría las identifica como placeholders.
- La auditoría actual aplica cobertura fotográfica a visitas y platos, no a restaurantes o fiestas.

## ACTIVE — Reglas oficiales

Decisión [EDIT-006](../decisions/decision-log.md), vigente desde el 2026-10-05.

### foto y fotos

- `foto` representa una única imagen asociada a la ficha.
- `fotos` representa una galería de imágenes asociadas a la ficha.
- Cuando una ficha tenga una sola imagen se utilizará `foto`.
- Cuando una ficha tenga varias imágenes se utilizará `fotos`.
- No inventar referencias de imagen para completar una ficha.
- No duplicar intencionadamente la misma imagen varias veces dentro de una galería.
- La coexistencia oficial de `foto` y `fotos` en una misma ficha permanece PENDING, aunque el visor actualmente pueda soportarla.

### Cloudinary

- El formato oficial para referenciar recursos almacenados en Cloudinary dentro del contenido de AvenTourArte es el prefijo `cld:`.
- `cld:` representa el identificador público del recurso de Cloudinary, no una URL HTTP completa ni una ruta local del sistema.
- Para contenido nuevo basado en Cloudinary no escribir manualmente URLs transformadas de Cloudinary: debe utilizarse la referencia `cld:` y dejar que `ImageService` genere la URL final.
- No inventar identificadores `cld:` de imágenes que todavía no existan.
- La organización exacta de carpetas/public IDs de Cloudinary permanece PENDING salvo convenciones que se documenten expresamente más adelante.

### Correspondencia de la imagen

- Una imagen asociada a una ficha debe corresponder realmente al lugar, plato, monumento, producto o contenido que representa.
- No utilizar como imagen definitiva una fotografía de otro lugar o elemento solo porque sea visualmente parecida.
- La existencia técnica de una imagen no demuestra que sea la imagen correcta para esa ficha.

### Placeholders

- Una portada, bandera u otra imagen reutilizada como sustitución se considera placeholder cuando no representa específicamente la ficha.
- Un placeholder puede utilizarse temporalmente durante el desarrollo.
- La presencia de un placeholder no significa que la cobertura fotográfica de esa ficha esté terminada.
- Los agentes y controles de QA deben poder distinguir en el futuro entre «tiene una referencia de imagen» y «tiene una imagen específica válida».
- No reemplazar automáticamente placeholders existentes fuera del alcance solicitado.

### Recursos locales

- El proyecto actualmente admite referencias locales además de Cloudinary.
- Su existencia histórica no convierte las imágenes locales en el formato preferente para contenido nuevo.
- La política definitiva sobre cuándo admitir recursos locales permanece PENDING.

### Principio de seguridad

- No eliminar, sustituir ni renombrar referencias de imágenes existentes sin que la tarea lo requiera.
- No realizar migraciones masivas de imágenes únicamente para ajustarlas a estas reglas.
- Si una imagen parece incorrecta, duplicada o un placeholder, señalarla para revisión en lugar de inventar una sustitución.

## PENDING — Decisiones aún por definir

- Coexistencia oficial de `foto` y `fotos`.
- Convención exacta de carpetas y public IDs de Cloudinary.
- Política definitiva de imágenes locales.
- Cobertura mínima obligatoria por tipo de ficha.
- Criterios exactos para considerar una imagen «definitiva».
- Derechos de uso.
- Atribución.
- Licencias.
- Texto alternativo y accesibilidad.
- Evidencia/procedimiento para verificar que una imagen corresponde realmente a una ficha.
- Tratamiento de recorte y `noCropGallery`.
