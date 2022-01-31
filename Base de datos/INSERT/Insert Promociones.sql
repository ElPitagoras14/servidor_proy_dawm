use gruasyerovi;

ALTER TABLE PROMOCIONES MODIFY TITULO VARCHAR(100) NOT NULL;
ALTER TABLE PROMOCIONES MODIFY DESCRIPCION VARCHAR(1000) NOT NULL;

INSERT INTO PROMOCIONES (titulo,descripcion,precio) VALUES
	('Promoción Viaja Seguro Este Feriado','Tu seguridad es lo más importante para nosotros por lo que para este feriado tenemos una promoción para tí en donde te ofrecemos: ABC de frenos, reajuste de carrocería, revisión de presión de neumáticos, mantenimiento de batería, revisión de luces y un chequeo de las plumas del limpia parabrisas por solo',27.99),
    ('Promoción Mantenimiento Express','Sabemos que como cliente no siempre tienes tiempo, por lo que en esta ocasión tenemos la promoción de mantenimiento express en donde te realizamos: cambio de aceite, filtro de motor, reajuste de suspensión y te regalamos el servicio de lavado express, chequeo de filtros y bujías y revisión de fluidos.',34.99),
    ('Promoción Cambio de Aceite y Filtro','Dentro de esta promoción te ofrecemos el cambio de aceite (de las mejores marcas) y cambio de filtro de aceite, y no solo eso sino que también te regalamos el chequeo de niveles, análisis de fluidos, revisión de luces, revisión de presión de neumáticos y un lavado express.',26.99);