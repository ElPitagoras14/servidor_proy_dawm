var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/", (req, res, next) => {
  models.serviciomantenimiento
    .findAll({})
    .then(servicios => res.send(servicios))
    .catch(err => res.status(400).send(err));
});

router.get("/reporte", (req, res, next) => {
  models.serviciomantenimiento
    .findAll({
      include: [
        {
          model: models.usuarios,
          as: "usuarios",
          association: "id_mecanico_usuario",
        },
        {
          model: models.autos,
          as: "autos",
          association: "id_auto_auto",
        },
      ],
    })
    .then(manteminiento => {
      res.send(manteminiento);
    });
});

router.get("/conteo", (req, res, next) => {
  models.serviciomantenimiento
    .findAll({
      limit: 6,

      attributes: [
        [sequelize.fn("COUNT", sequelize.col("*")), "num_servicios"],
        [sequelize.fn("YEAR", sequelize.col("fecha_pedido")), "año"],
        [sequelize.fn("MONTH", sequelize.col("fecha_pedido")), "mes"],
      ],
      group: [
        sequelize.fn("YEAR", sequelize.col("fecha_pedido")),
        sequelize.fn("MONTH", sequelize.col("fecha_pedido")),
      ],
      order: [
        [sequelize.fn("YEAR", sequelize.col("fecha_pedido")), "DESC"],
        [sequelize.fn("MONTH", sequelize.col("fecha_pedido")), "DESC"],
      ],
    })
    .then(datos => res.send(datos))
    .catch(err => res.status(400).send(err));
});

//PARA EL CLIENTE
router.get("/procesos/:id_auto", (req, res, next) => {
  let consulta = `SELECT id_auto, GENERALT.id_proceso_siguiente, fecha_actual, hora_actual, observacion_mecanico, CONCAT(U.NOMBRES,' ',U.APELLIDOS) mecanico FROM 
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
  WHERE id_auto = ${req.params.id_auto}
  ORDER BY INICIO`;
  sequelize
    .query(consulta, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then(procesosfiltrados => {
      res.send(procesosfiltrados);
    })
    .catch(error => res.status(400).send(error));
});

//POST
router.post("/", (req, res, next) => {
  models.serviciomantenimiento.create(req.body);
  res.redirect("/");
});

router.get("/conteo/:id", (req, res, next) => {
  let id = req.params.id;
  models.serviciomantenimiento
    .findAll({ where: { id_mecanico: id } })
    .then(datos => res.send({ cantidad: datos.length }));
});

//POST: PROCESOS
router.post("/nuevoproceso", (req, res, next) => {
  var idprincipal = 0;
  let consulta = `
  SELECT GENERALT.id_proceso_siguiente FROM 
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
  WHERE id_auto = ${req.body.id_auto}
  ORDER BY id_proceso_siguiente DESC LIMIT 1;
  `;
  sequelize
    .query(consulta, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then(anterior => {
        console.log(anterior);
        
        if (anterior.length == 0) {
           
          models.procesomantenimiento.create({
            fecha_actual: req.body.fecha,
            hora_actual: req.body.hora,
            observacion_mecanico: req.body.observacion,
            tipoMantenimiento: 2
            });
          let consulta2 = `
          select id_proceso from procesomantenimiento order by id_proceso desc limit 1;
          `;
          sequelize
            .query(consulta2, {
              type: sequelize.QueryTypes.SELECT,
            })
            .then(idupdate => {
              console.log("llegó");
              res.send(idupdate);
              models.serviciomantenimiento.create({
                id_auto: req.body.id_auto,
                id_mecanico: 550,
                tipo_movilizacion: 0,
                fecha_pedido: req.body.fecha_pedido,
                precio_total: 28.20,
                id_horario: 4,
                id_proceso_inicial: idupdate[0].id_proceso + 1
              }); 
            });
            
        }else{
          
        idprincipal = anterior[0].id_proceso_siguiente;
        models.procesomantenimiento.create({
        fecha_actual: req.body.fecha,
        hora_actual: req.body.hora,
        observacion_mecanico: req.body.observacion,
        tipoMantenimiento: 2,
        id_proceso_anterior: idprincipal,
      });

      let consulta2 = `
      select id_proceso from procesomantenimiento order by id_proceso desc limit 1;
      `;
      sequelize
        .query(consulta2, {
          type: sequelize.QueryTypes.SELECT,
        })
        .then(idupdate => {
          console.log("llegó");
          res.send(idupdate);
          models.procesomantenimiento.update(
            {
              id_proceso_siguiente: idupdate[0].id_proceso + 1,
            },
            {
              where: { id_proceso: idprincipal },
            }
          );
        });
      }
      
    })
    .catch(error => res.status(400).send(error));
});

//PUT
router.put("/", (req, res, next) => {
  models.serviciomantenimiento
    .update({
      id_auto: req.body.id_auto,
      id_mecanico: req.body.id_mecanico,
      tipo_movilizacion: req.body.tipo_movilizacion,
      fecha_pedido: req.body.fecha_pedido,
      precio_total: req.body.precio_total,
      id_horario: req.body.id_horario,
    })
    .then(response => res.redirect("/"))
    .catch(err => res.status(500).send(err));
});

//DELETE
router.delete("/", (req, res, next) => {
  models.serviciomantenimiento
    .findOne({ where: { id_mantenimiento: req.body.id_mantenimiento } })
    .then(servicio => {
      servicio.destroy();
      res.redirect("/");
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
