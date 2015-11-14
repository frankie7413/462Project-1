var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');


//routes in project 
var routes = require('./routes/index');
var profile = require('./routes/profile');

//passport stuff
var passport = require('passport');
var flash    = require('connect-flash');

//configuration
var config = require('./config/database');
require('./config/passport')(passport); // pass passport for configuration

// uncomment after placing your favicon in /public doesn't work?
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//session 
app.use(session({
  secret: "Kanyewest",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

//required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routes
app.use('/', routes);
app.use('/profile', profile);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

db = mongoose.connect(config.db.test);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log('success');
});


module.exports = app;









































