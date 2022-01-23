var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET

//POST
router.post("/serv_grua", (req, res, next) => {
    models.serviciogrua.create(req.body);
    res.redirect("/");
});

//PUT

//DELETE

module.exports = router;
