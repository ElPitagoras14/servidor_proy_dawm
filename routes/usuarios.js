var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/", (req, res, next) => {
  models.usuarios
    .findAll()
    .then(usuarios => {
      res.send(usuarios);
    })
    .catch(err => res.status(400).send(err));
});

router.get("/auto/:id", (req, res, next) => {
  models.usuarios
    .findAll({
      where: { id_usuario: req.params.id },
      include: { model: models.autos, as: "autos", foreignKey: "propietario" },
    })
    .then(autos => res.send(autos))
    .catch(err => res.send(err));
});

router.get("/ubicacion/:id", (req, res, next) => {
  models.usuarios
    .findOne({
      where: { id_usuario: req.params.id },
      include: {
        model: models.ubicacion,
        as: "ubicacion_ubicacion",
        foreignKey: "ubicacion",
      },
    })
    .then(ubicacion => res.send(ubicacion))
    .catch(err => res.send(err));
});

router.get("/:nom_rol", (req, res, next) => {
  models.usuarios
    .findAll({ where: { rol: req.params.nom_rol } })
    .then(usuarioSeccion => res.send(usuarioSeccion))
    .catch(err => res.status(400).send(err));
});

router.get("/id/:id", (req, res, next) => {
  let id = req.params.id;
  models.usuarios
    .findOne({ where: { id_usuario: id } })
    .then(usuarioSeccion => res.send(usuarioSeccion))
    .catch(err => res.status(400).send(err));
});

router.get("/ubicacion/:id", (req, res, next) => {
  let id = req.params.id;
  models.ubicacion
    .findOne({ where: { id_ubicacion: id } })
    .then(usuarioSeccion => res.send(usuarioSeccion))
    .catch(err => res.status(400).send(err));
});
router.post("/token", verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET, (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.json({
        authData,
      });
    }
  });
});

//POST

router.post("/", (req, res, next) => {
  console.log("SI");
  models.usuarios
    .create(req.body)
    .then(response => res.redirect("/dash"))
    .catch(err => res.status(500).send(err));
});

//PUT
router.put("/", (req, res, next) => {
  sequelize.query(
    `update login set correo = '${req.body.correo}' where correo = '${req.body.correo_anterior}'`
  );
  sequelize
    .query(
      `update usuarios set celular='${req.body.celular}', nombres='${req.body.nombres}',apellidos='${req.body.apellidos}',fecha_nacimiento='${req.body.fecha_nacimiento}', correo = '${req.body.correo}' where id_usuario = ${req.body.idx}`
    )
    .catch(err => console.log(err));
});

//DELETE
router.delete("/:id", (req, res, next) => {
  models.usuarios
    .findOne({ where: { id_usuario: req.params.id } })
    .then(usuario => usuario.destroy())
    .catch(err => res.status(400).send(err));
  res.redirect("/");
});

//Registrar
router.put("/registro", (req, res, next) => {
  models.login.create({
    correo: req.body.correo,
    contrasenia: req.body.contrasenia,
  });

  models.ubicacion
    .create({
      provincia: req.body.provincia,
      ciudad: req.body.ciudad,
      referencia: req.body.referencia,
    })
    .then(response => {
      models.usuarios.create({
        cedula: req.body.cedula,
        nombres: req.body.nombre,
        apellidos: req.body.apellido,
        fecha_nacimiento: req.body.fecha,
        foto: "",
        celular: req.body.celular,
        rol: req.body.rol,
        correo: req.body.correo,
        ubicacion: response.dataValues.id_ubicacion,
      });
    })
    .then(response => res.send({ Usuario: "creado" }))
    .catch(err => res.status(400).send(err));
});

router.put("/registrarUbicacion", (req, res, next) => {
  sequelize
    .query(
      `Insert into Ubicacion(id_ubicacion,provincia,ciudad,referencia) values (Default, '${req.body.provincia}','${req.body.ciudad}','${req.body.referencia}')`
    )
    .catch(error => {
      res.status(400).send(error);
    });
});

//TOKEN
// authorization: Bearer <token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader != "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
module.exports = router;
