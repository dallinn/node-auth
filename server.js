var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//TODO env 'secret' key for jwt
secret = 'temp';

//temp
//TODO import common, checkToken, next
var auth = function(req, res, next) { next(); };

// Routes
var AuthAPI = require('./app/routes/auth');
var Users = require('./app/routes/users');

app.use('/api', auth, [Users,AuthAPI]);

app.get('/test', function(req,res) {
    return res.json({ status: 'yo' });
});

app.listen(3000);
