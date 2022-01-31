var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/", (req, res, next) => {
  models.promociones
    .findAll({})
    .then(promociones => res.send(promociones))
    .catch(err => res.status(400).send(err));
});

//POST
router.post("/", (req, res, next) => {
  models.promociones
    .create(req.body)
    .then(response => res.redirect("/"))
    .catch(err => res.status(500).send(err));
});

//PUT
router.put("/", (req, res, next) => {
  models.update(
    {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
    },
    { where: { id_promocion: req.body.id } }
  );
});

//DELETE
router.delete("/:id", (req, res, next) => {
  models.promociones
    .findOne({ where: { id_promocion: req.params.id } })
    .then(promocion => promocion.destroy())
    .catch(err => res.status(400).send(err));
});

module.exports = router;
