var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//TODO env 'secret' key for jwt
secret = 'temp';

// Routes
var Users = require('./app/routes/users');
var Auth = require('./app/routes/auth');
app.use('/api', Users, Auth);

app.get('/test', function(req,res) {
    return res.json({ status: 'yo' });
});

app.listen(3000);
