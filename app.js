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
//const setUpPassPort = require("./setuppasspot");
mongoose.Promise = global.Promise; // mongoDB 버전 4.11 이상부터 해주어야 에러 안남
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const mongoDB = 'mongodb://TodoList:k13579@ds145786.mlab.com:45786/heroku_h74qf4ml';
mongoose.connect(mongoDB,{useNewUrlParser:true});
//setUpPassPort();
//app.set("port",process.env.PORT || 3000);
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
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret:"TKRvOIJs=HyqrvagQ#&!f!%V]Ww/4KiVs$s,<<MX",//임의의 문자
//   resave:true,
//   saveUninitialized:true
// }));

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
app.listen(process.env.PORT || 5000);
module.exports = app;
