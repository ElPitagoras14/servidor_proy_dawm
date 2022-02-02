var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/", (req, res, next) => {
  model.tipomantenimiento
    .findAll({})
    .then(tipos => res.send(tipos))
    .catch(err => res.status(500).send(err));
});

router.get("/conteo", (req, res, next) => {
  models.tipomantenimiento
    .findAll({
      attributes: [
        "id_tipoMantenimiento",
        [sequelize.fn("COUNT", sequelize.col("id_proceso")), "cantidad"],
        "descripcion",
      ],
      include: {
        model: models.procesomantenimiento,
        as: "procesomantenimientos",
        foreignKey: "tipoMantenimiento",
      },
      group: ["id_tipoMantenimiento"],
    })
    .then(datos => res.send(datos))
    .catch(err => res.status(400).send(err));
});

//POST
router.post("/", (req, res, next) => {
  models.tipomantenimiento
    .create(req.body)
    .then(response => res.redirect("/"))
    .catch(err => res.status(403).send(err));
});

//PUT
router.put("/", (req, res, next) => {
  model.tipomantenimiento
    .update({
      descripcion: req.body.descripcion,
      precio: req.body.precio,
    })
    .then(response => res.redirect("/"))
    .catch(err => res.status(400).send(err));
});

//DELETE
router.delete("/", (req, res, next) => {
  models.tipomantenimiento
    .findOne({ where: { id_tipoMantenimiento: req.body.id_tipoMantenimiento } })
    .then(tipo => tipo.destroy())
    .catch(err => res.status(500).send(err));
});

module.exports = router;
