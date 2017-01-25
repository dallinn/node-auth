var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
var Users = require('./app/routes/users');
var Auth = require('./app/routes/auth');
app.use('/api', Users, Auth);

app.listen(3000);
