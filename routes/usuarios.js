var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/usuarios", (req, res, next) => {
  models.usuarios
    .findAll()
    .then(usuarios => res.send(usuarios))
    .catch(err => res.status(400).send(err));
});

router.get("/usuarios/:nom_rol", (req, res, next) => {
  models.usuarios
    .findAll({ where: { rol: req.params.nom_rol } })
    .then(usuarioSeccion => res.send(usuarioSeccion))
    .catch(err => res.status(400).send(err));
});

//POST

//PUT

//DELETE
router.delete("/usuarios/:id", (req, res, next) => {
  models.usuarios
    .findOne({ where: { id_usuario: req.params.id } })
    .then(usuario => usuario.destroy())
    .catch(err => res.status(400).send(err));
  res.redirect("/");
});

module.exports = router;
