var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');

var register = require('./routes/register.route.js');

// Import, Configure and Initialize Mongoose.
var mongoose = require('mongoose');
mongoose.connect(config.database.mongo.uri, function(error) {
  (error) ? console.log('Database Connection Error: ' + error) : console.log('Successfully Connected to MongoLab!');
});

//Initialize Express App
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/join', register);
//var payment = require('./routes/payment.route.js');
//app.use('/payment', payment);

//app.post('/join', function (req, res) {
//  console.log('POST request to the join-page');
//  res.send('POST request to the join-page');
//});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  });
}

// production error handler - no stacktrace leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: {} });
});

module.exports = app;
