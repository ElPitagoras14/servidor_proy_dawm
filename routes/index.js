var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

router.get("/autos", (req, res, next) => {
  models.autos
    .findAll({ attributes: {} })
    .then(autos => {
      res.send(autos);
    })
    .catch(err => res.status(400).send(err));
});

/* POST para verificar usuario */
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  models.login
    .findOne({ where: { correo: email, contrasenia: password } })
    .then(cliente => {
      if (cliente) {
        res.send(cliente);
      }
      throw err;
    })
    .catch(err => {
      res.send("Usuario no encontrado");
    });
});

module.exports = router;
