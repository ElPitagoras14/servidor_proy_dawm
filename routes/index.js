var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

router.get("/usuarios", (req, res, next) => {
  models.usuarios
    .findAll()
    .then(usuarios => res.send(usuarios))
    .catch(err => res.status(400).send(err));
});

router.get("/usuarios/:idTipo", (req, res, next) => {
  models.usuarios
    .findAll({ where: { rol: req.params.idTipo } })
    .then(usuarioSeccion => res.send(usuarioSeccion))
    .catch(err => res.status(400).send(err));
});

router.get("/autos", (req, res, next) => {
  models.autos
    .findAll({ attributes: {} })
    .then(autos => {
      res.send(autos);
    })
    .catch(err => res.status(400).send(err));
});

router.get("/autos/:id", (req, res, next) => {
  models.autos
    .findOne({ where: { propietario: req.params.id } })
    .then(autos => res.send(autos))
    .catch(err => res.status(400).send(err));
});

router.get("/promociones", (req, res, next) => {
  models.promociones
    .findAll({})
    .then(promociones => res.send(promociones))
    .catch(err => res.status(400).send(err));
});

router.get("/serv_mantenimiento", (req, res, next) => {
  models.serviciomantenimiento
    .findAll({})
    .then(servicios => res.send(servicios))
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

router.post("/serv_grua", (req, res, next) => {
  models.serviciogrua.create(req.body);
  res.redirect("/");
});

router.post("/autos", (req, res, next) => {
  models.autos.create(req.body);
  res.redirect("/");
});

router.post("/promociones", (req, res, next) => {
  models.promociones.create(req.body);
  res.redirect("/");
});

router.post("/serv_mantenimiento", (req, res, next) => {
  models.serviciomantenimiento.create(req.body);
  res.redirect("/");
});

// DELETE
router.delete("/usuarios/:id", (req, res, next) => {
  models.usuarios
    .findOne({ where: { id_usuario: req.params.id } })
    .then(usuario => usuario.destroy())
    .catch(err => res.status(400).send(err));
  res.redirect("/");
});

router.delete("/autos/:id", (req, res, next) => {
  models.autos
    .findOne({ where: { id_auto: req.params.id } })
    .then(auto => auto.destroy())
    .catch(err => res.status(400).send(err));
  res.redirect("/");
});

router.delete("/promociones/:id", (req, res, next) => {
  models.promociones
    .findOne({ where: { id_promocion: req.params.id } })
    .then(promocion => promocion.destroy())
    .catch(err => res.status(400).send(err));
});

module.exports = router;
