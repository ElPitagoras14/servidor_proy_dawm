var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/", (req, res, next) => {
  models.autos
    .findAll({ attributes: {} })
    .then(autos => {
      res.send(autos);
    })
    .catch(err => res.status(400).send(err));
});

router.get("/:id", (req, res, next) => {
  models.autos
    .findOne({ where: { propietario: req.params.id } })
    .then(autos => res.send(autos))
    .catch(err => res.status(400).send(err));
});

//POST
router.post("/", (req, res, next) => {
  models.autos.create({
      placa: req.body.placa,
      marca: req.body.marca,
      modelo: req.body.modelo,
      color: req.body.color,
      clave_llave: req.body.clave,
      propietario: req.body.id_propietario
  });
  res.redirect("/");
});

//PUT
router.put("/", (req, res, next) => {
  models.autos
    .update({
      placa: req.body.placa,
      marca: req.body.marca,
      modelo: req.body.modelo,
      color: req.body.color,
      clave_llave: req.body.clave,
      propietario: req.body.id_propietario,
    })
    .then(response => res.redirect("/"))
    .catch(err => res.status(500).send(err));
});

//DELETE
router.delete("/:id", (req, res, next) => {
  models.autos
    .findOne({ where: { id_auto: req.params.id } })
    .then(auto => {
      auto.destroy();
      res.redirect("/");
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
