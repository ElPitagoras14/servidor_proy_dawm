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

router.get("/reporte",(req,res,next)=>{
  models.serviciomantenimiento.findAll({
    include:[{
      model:models.usuarios,
      as:"usuarios",
      association:"id_mecanico_usuario"
    },{
      model:models.autos,
      as:"autos",
      association:"id_auto_auto"
    }]
  })
  .then(manteminiento =>{
    res.send(manteminiento);
  })
})


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
