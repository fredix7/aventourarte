# Automatización de mantenimiento

El workflow `.github/workflows/maintenance.yml` ejecuta las pruebas Angular, las del receptor y la compilación al subir cambios relevantes a developer y en pull requests. No despliega ni modifica contenido.

Los lunes a las 08:17 UTC comprueba también las rutas públicas de todas las guías del registro, el contenido mínimo de la política y CORS del receptor para origen permitido y ajeno. Solo usa GET y OPTIONS: no crea tickets ni contamina Umami. Conserva un informe JSON como artefacto durante 30 días. Esta comprobación no verifica todos los enlaces externos ni los datos editoriales, ni sustituye revisar los resultados del navegador.

El día 23 de cada mes a las 08:23 UTC crea una incidencia pública de revisión mensual con lista de control. Evita duplicarla aunque se vuelva a ejecutar y aunque se haya cerrado. No copia información de Notion, mensajes, correos o credenciales. Notion conserva la tarea y el procedimiento privado; esta automatización no crea tareas en Notion ni elimina datos personales.

GitHub ejecuta los cron sobre la rama predeterminada (developer); puede retrasarlos y desactivarlos por inactividad prolongada del repositorio público. Los avisos dependen de las preferencias de notificaciones de GitHub: seguir el repositorio y revisar Actions/Issues. No se ha contratado un servicio de alertas ni garantizado entrega de correo.

En Actions se puede ejecutar manualmente el workflow; la opción mensual es desactivada por defecto. No necesita secretos adicionales. Solo el trabajo mensual tiene permiso para crear incidencias, mediante el token temporal de GitHub. Una integración mensual con la base de tareas de Notion requeriría una credencial privada separada y acceso a esa base: no ampliar la conexión de avisos sin revisar permisos.

Siguen siendo humanos: responder solicitudes, decidir sobre avisos, anonimizar/eliminar datos y copias, confirmar hechos y derechos de fotos. Un futuro borrado automático necesita fecha de cierre fiable, simulación, revisión y permisos específicos antes de activarlo.
