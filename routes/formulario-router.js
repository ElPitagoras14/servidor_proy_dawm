var express = require("express");
var router = express.Router();
const nodemailer = require('nodemailer');

router.post('/formulario', (req, res) => {
    
  var transporter = nodemailer.createTransport({
    //service: 'gmail',
    //auth: {
     // user: 'tuemail@gmail.com', // Cambialo por tu email
     // pass: 'tupassword' // Cambialo por tu password
    //}
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "39b658d7b59084",
      pass: "6d16d721c6e95a"
    }
  });

  const mailOptions = {
    from: '"Example Team" <hola@example.com>',
    to: 'user@user.com', // Cambia esta parte por el destinatario
    subject: "Hola",
    html: `
    <strong>Nombre:</strong> ${req.body.name} <br/>
    <strong>E-mail:</strong> ${req.body.email}  <br/>
    <strong>Mensaje:</strong> ${req.body.message}
    `
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });

    res.status(200).send();
 })

module.exports = router;