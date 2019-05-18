var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
var http= require('http');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var flash = require("connect-flash");
var passport = require('passport');
mongoose.Promise = global.Promise; // mongoDB 버전 4.11 이상부터 해주어야 에러 안남

const mongoDB = 'mongodb://127.0.0.1:27017/todolist';
mongoose.connect(mongoDB,{useNewUrlParser:true});
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/user', usersRouter);

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
