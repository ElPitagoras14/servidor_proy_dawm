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
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("*")), "num_pedidos"],
        [sequelize.fn("YEAR", sequelize.col("fecha")), "año"],
        [sequelize.fn("MONTH", sequelize.col("fecha")), "mes"],
      ],
      group: [
        sequelize.fn("YEAR", sequelize.col("fecha")),
        sequelize.fn("MONTH", sequelize.col("fecha")),
      ],
      order: [
        [sequelize.fn("YEAR", sequelize.col("fecha")), "DESC"],
        [sequelize.fn("MONTH", sequelize.col("fecha")), "ASC"],
      ],
    })
    .then(datos => res.send(datos))
    .catch(err => res.status(400).send(err));
});

//POST
router.post("/", (req, res, next) => {
  models.serviciogrua.create(req.body);
  res.redirect("/");
});

//PUT

//DELETE

module.exports = router;
