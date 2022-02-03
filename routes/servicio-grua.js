var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/", (req, res, next) => {
  models.serviciogrua
    .findAll({})
    .then(servicios => res.send(servicios))
    .catch(err => res.status(400).send(err));
});

router.get("/conteo", (req, res, next) => {
  models.serviciogrua
    .findAll({
      limit: 6,
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("*")), "num_servicios"],
        [sequelize.fn("YEAR", sequelize.col("fecha")), "año"],
        [sequelize.fn("MONTH", sequelize.col("fecha")), "mes"],
      ],
      group: [
        sequelize.fn("YEAR", sequelize.col("fecha")),
        sequelize.fn("MONTH", sequelize.col("fecha")),
      ],
      order: [
        [sequelize.fn("YEAR", sequelize.col("fecha")), "DESC"],
        [sequelize.fn("MONTH", sequelize.col("fecha")), "DESC"],
      ],
    })
    .then(datos => res.send(datos))
    .catch(err => res.status(400).send(err));
});

//POST
router.post("/", (req, res, next) => {
  console.log(req.body);
  models.serviciogrua
    .create(req.body)
    .then(response => res.redirect("/"))
    .catch(err => res.status(403).send(err));
});

//PUT
router.put("/", (req, res, next) => {
  models.serviciogrua
    .update(
      {
        id_conductor: req.body.id_conductor,
        id_auto: req.body.id_auto,
        ubicacion_latitud: req.body.ubicacion_latitud,
        ubicacion_longitud: req.body.ubicacion_longitud,
        fecha: req.body.fecha,
        hora_inicio: req.body.hora_inicio,
        hora_final: req.body.hora_final,
        id_promocion: req.body.id_promocion,
      },
      { where: { id_servicio_grua: id_servicio_grua } }
    )
    .then(response => res.redirect("/"))
    .catch(err => res.status(500).send(err));
});

//DELETE
router.delete("/", (req, res, next) => {
  models.serviciogrua
    .findOne({
      where: { id_servicio_grua: req.body.id_servicio_grua },
    })
    .then(servicio => {
      servicio.destroy();
      res.redirect("/");
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
