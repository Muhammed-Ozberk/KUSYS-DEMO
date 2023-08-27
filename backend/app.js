var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// Routes
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');

// Middlewares
const tokenMiddleware = require('./middlewares/tokenMiddleware');

var app = express();

// View engine setup (using Twig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Routes
app.use('/', authRouter);

// Middleware to check JWT token
app.use(tokenMiddleware);

// Additional routes
app.use('/users', userRouter);
app.use('/courses', courseRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error'); // Assuming you have a Twig template named 'error'
});

module.exports = app;
