var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/", (req, res, next) => {
  models.login
    .findAll()
    .then(cliente => {
      res.send(cliente);
    })
    .catch(err => {
      res.send("Usuario no encontrado");
    });
});
//POST
router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  models.login
    .findAll({
      include: [
        {
          model: models.usuarios,
          as: "usuario",
          where: { correo: email },
        },
      ],
      where: { correo: email, contrasenia: password },
    })
    .then(cliente => {
      if (cliente) {
        res.send(cliente);
      } else {
        throw err;
      }
    })
    .catch(err => {
      res.send({ Error: "Usuario no encontrado" });
    });
});

//PUT

//DELETE

module.exports = router;
