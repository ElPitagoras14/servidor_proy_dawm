var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

router.get("/dash", (req, res, next) => {
  res.render("index");
});

module.exports = router;
