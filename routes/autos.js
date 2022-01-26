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
  models.autos.create(req.body);
  res.redirect("/");
});

//PUT

//DELETE
router.delete("/:id", (req, res, next) => {
  models.autos
    .findOne({ where: { id_auto: req.params.id } })
    .then(auto => auto.destroy())
    .catch(err => res.status(400).send(err));
  res.redirect("/");
});

module.exports = router;
