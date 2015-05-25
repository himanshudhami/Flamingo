var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var passport = require('passport');

var createSendToken = require('./services/jwt.js');
var localStrategy = require('./services/localStrategy.js');
var products = require('./services/products.js');
var emailVerification = require('./services/emailVerification.js');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
});

passport.use('local-register', localStrategy.register);
passport.use('local-login', localStrategy.login);

app.post('/register', passport.authenticate('local-register'), function (req, res) {
    emailVerification.send(req.user.email);
    createSendToken(req.user, res);

});

app.get('/auth/verifyEmail', emailVerification.handler);

app.post('/login', passport.authenticate('local-login'), function (req, res) {
	createSendToken(req.user, res);
});

app.get('/products', products);

mongoose.connect('mongodb://localhost/tokens');

var server = app.listen(3000, function () {
	console.log('api listening on ', server.address().port);
});