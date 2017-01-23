var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('nodeAuth','root','');

var User = sequelize.define('user', {
    name: Sequelize.STRING,
    username: Sequelize.STRING,
    email: Sequelize.STRING
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

router.get('/', function(req,res) {
    res.json({ message: 'json up and running' });
});


app.listen(3000);

