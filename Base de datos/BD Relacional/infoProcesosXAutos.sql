SELECT * FROM USUARIOS;
SELECT id_auto, GENERALT.id_proceso_siguiente, fecha_actual, hora_actual, observacion_mecanico, CONCAT(U.NOMBRES,' ',U.APELLIDOS) mecanico FROM 
((SELECT id_proceso inicio, id_proceso id_proceso_siguiente FROM PROCESOMANTENIMIENTO P LIMIT 50)
UNION
SELECT id_proceso inicio, id_proceso_siguiente FROM PROCESOMANTENIMIENTO P WHERE P.ID_PROCESO_ANTERIOR IS NULL
UNION
SELECT INICIO.inicio, P.id_proceso_siguiente FROM PROCESOMANTENIMIENTO P, 
(SELECT id_proceso inicio, id_proceso_siguiente FROM PROCESOMANTENIMIENTO P WHERE P.ID_PROCESO_ANTERIOR IS NULL) INICIO 
WHERE INICIO.ID_PROCESO_SIGUIENTE = P.ID_PROCESO AND P.ID_PROCESO_SIGUIENTE IS NOT NULL) GENERALT 
JOIN SERVICIOMANTENIMIENTO SM ON SM.ID_PROCESO_INICIAL = GENERALT.INICIO
JOIN PROCESOMANTENIMIENTO PM ON PM.ID_PROCESO = GENERALT.ID_PROCESO_SIGUIENTE
JOIN USUARIOS U ON SM.ID_MECANICO = U.ID_USUARIO
ORDER BY INICIO;

