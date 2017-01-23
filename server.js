var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

//models
var User = require('./app/models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

router.get('/', function(req,res) {
    res.json({ message: 'json up and running' });
});

router.route('/users')
    .post(function(req,res) {
        console.log(req.body);
        
        if (!req.body.username) return res.json({ error: 'please provide valid username' });

        User.create({
            username: req.body.username,
        });

        res.json({ status: 'okay' });
    })
    .get(function(req,res){
        res.send('get users');
    });

app.listen(3000);
