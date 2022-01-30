var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
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

//PUT

//DELETE

module.exports = router;
