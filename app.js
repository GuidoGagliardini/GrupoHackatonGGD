var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mw = require('./middlewares');
const dotenv = require('dotenv');
// CORS Policy
// valida el token y protege las rutas
const jwt = require('jsonwebtoken');
const fs = require('fs');

dotenv.config(); // leer el archivo .env
var indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const panelRouter = require('./routes/panel');
const productoRouter = require('./routes/producto');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/auth',authRouter);
app.use('/users',userRouter);
app.use('/producto',mw.securedProductos, productoRouter);
// middleware -> funciones de ruta (cargar un archivo si y solo si se verifica la funcion middleware)
app.use('/panel' ,panelRouter)

// catch 404 and forward to error handler 
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
