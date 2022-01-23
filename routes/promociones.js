var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/promociones", (req, res, next) => {
    models.promociones
      .findAll({})
      .then(promociones => res.send(promociones))
      .catch(err => res.status(400).send(err));
});

//POST
router.post("/promociones", (req, res, next) => {
    models.promociones.create(req.body);
    res.redirect("/");
});

//PUT

//DELETE
router.delete("/promociones/:id", (req, res, next) => {
    models.promociones
      .findOne({ where: { id_promocion: req.params.id } })
      .then(promocion => promocion.destroy())
      .catch(err => res.status(400).send(err));
});


module.exports = router;