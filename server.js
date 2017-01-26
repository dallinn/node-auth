var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//TODO env 'secret' key for jwt
secret = 'temp';

//temp
//TODO import common, checkToken, next
var auth = function(req,res,next) { next(); };

// Routes
var AuthAPI = require('./api/routes/auth');
var Users = require('./api/routes/users');

//API
app.use('/api', auth, [Users,AuthAPI]);

//CLIENT
app.use('/', express.static('client/build/'));
//app.use(express.static('app/public'));

app.listen(3000);
