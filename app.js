var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require("express-session");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var navRouter = require('./routes/Nav');
const hbs = require("hbs");
const recipesRouter = require("./routes/RecipeRouter")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials")

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

//Session middleware - zwraca atrybuty sesji z zapytania do odpowiedzi
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});


app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', navRouter);
app.use("/recipes", recipesRouter)

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
