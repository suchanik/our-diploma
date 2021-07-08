const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require("express-session");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require("hbs");
const fileUpload = require('express-fileupload')

const indexRouter = require('./routes/HomeRouter');
const usersRouter = require('./routes/UsersRouter');
const recipesRouter = require("./routes/RecipeRouter")
const ingredientsRouter = require("./routes/IngredientsRouter");
const categoryRouter = require("./routes/CategoryRouter");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials")

app.use(fileUpload());
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
  if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.locals.session = req.session;
  next();

});


app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/categories", categoryRouter);

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
