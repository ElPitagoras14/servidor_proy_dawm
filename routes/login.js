var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/login", (req, res, next) => {
  models.login
    .findAll({
      include: [{
        association: 
      }]
    })
    .then(cliente => {
        res.send(cliente);
    })
    .catch(err => {
      res.send("Usuario no encontrado");
    });
});
//POST
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

//PUT

//DELETE


module.exports = router;