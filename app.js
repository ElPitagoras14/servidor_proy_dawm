var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var loginRouter = require('./routes/login');
var autosRouter = require('./routes/autos');
var promocionesRouter = require('./routes/promociones');
var servgruaRouter = require('./routes/servicio-grua');
var servmantRouter = require('./routes/servicio-mantenimiento');

var app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usuariosRouter);
app.use('/', loginRouter);
app.use('/', autosRouter);
app.use('/', promocionesRouter);
app.use('/', servgruaRouter);
app.use('/', servmantRouter);

module.exports = app;
