var nodemailer = require('nodemailer');
var express = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    .then(user => {
      if (user) {
        const accessToken = generateAccessToken(user[0]);
        res.header('authorization',accessToken).json({
          token:accessToken,
          rol:user[0]["usuario"]["rol"]
        })
      } else {
        throw err;
      }
    })
    .catch(err => {
      console.log(err)
      res.send({ Error: "Usuario no encontrado"});
    });
});

//PUT
router.put("/",(req,res,next)=>{
  models.login.create({
    correo:req.body.correo,
    contrasenia:req.body.contrasenia
  }).then(response => res.redirect("/"))
  .catch(err => console.log(err));
})
//DELETE


//TOKEN
function generateAccessToken(user){
  var login = {
    correo:user.correo,
    id:user.usuario.id_usuario,
    tipo:user.usuario.rol
  }
  return jwt.sign(login,process.env.SECRET,{
    expiresIn:60*60*24
  });
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "gruasyerovibot@gmail.com", // generated ethereal user
      pass: "ytgvwrctyacmstvu", // generated ethereal password
    },
});

transporter.verify().then(()=>{
    console.log("Ready for send emails");
});

router.post("/email",(req,res,next)=>{
      // send mail with defined transport object
    transporter.sendMail({
    from: `${req.body.correo} <gruasyerovibot@gmail.com>`, // sender address
    to: "geovanny_rl14@hotmail.com", // list of receivers
    subject: "Solicitud de contacto", // Subject line
    html: `<b>Has recibido una solicitud de contacto para Gruas Yerovi</b><br>
            <b>El mensaje es el siguiente:</b><br>
            Nombre: <i>${req.body.nombre}</i><br>
            Correo: <i>${req.body.correo}</i><br>
            Nacido en: <i>${req.body.fecha}</i><br>
            Origen: <i>${req.body.origen}</i><br>
            Mensaje: <b>${req.body.mensaje}</b>
        `, // html body
  }).catch(err => console.log(err));
})
module.exports = router;
