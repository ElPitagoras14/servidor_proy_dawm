var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

router.get("/autos", function (req, res, next) {
  models.autos
    .findAll({ attributes: {} })
    .then(autos => {
      res.send(autos);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
