var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/serv_mantenimiento", (req, res, next) => {
    models.serviciomantenimiento
      .findAll({})
      .then(servicios => res.send(servicios))
      .catch(err => res.status(400).send(err));
});

//POST
router.post("/serv_mantenimiento", (req, res, next) => {
    models.serviciomantenimiento.create(req.body);
    res.redirect("/");
});

//PUT

//DELETE

module.exports = router;
