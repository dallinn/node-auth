var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var bcrypt = require('bcrypt');

//models
var User = require('./app/models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

router.route('/users')
    .post(function(req,res) {

        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            return res.json({ error: 'You must provide a username and password for account creation' });
        }

        var error = sanitize(username, 'username', res);
        var errors = error.concat(sanitize(password, 'password', res));

        if (errors.length > 0) {
            return res.json({ errors });
        }

        //password hashing
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        User.create({
            username: username,
            password: password
        }).then(function(user){
            res.json({
                status: "User Created"
            });
        }).catch(function(err) {
            res.json({
                error: err.errors[0].message
            });
        });
    })
    .get(function(req,res) {
        User.findAll({ attributes: ['id','username'] }).then(function(users) { res.send(users)  }); 
    })
//end /users

router.route('/users/:user_id')
    .get(function(req,res) {
        User.findById(req.params.user_id)
        .then(function(user){
            res.json({ user });
        }).catch(function(err) {
            res.json({ err }); 
        });
    })
    .put(function(req,res) {
        User.update(
            //TODO sanitize (above)
            { username: req.body.username },
            { where: { id: req.params.user_id } }
        ).then(function(user) {
            res.json({ status: "Username Updated" });
        }).catch(function(err) {
            res.json({ err });
        });
    })
    .delete(function(req,res){
        User.destroy({
            where: { id: req.params.user_id }
        }).then(function(user){
            res.json({ status: "User Deleted" });
        }).catch(function(err) {
            res.json({ err }); 
        });
    });
//end /users/:user_id

router.route('/auth')
    .post(function(req,res) {
        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            return res.json({ error: 'You must provide a username and password for account creation' });
        }

        var error = sanitize(username, 'username', res);
        var errors = error.concat(sanitize(password, 'password', res));

        if (errors.length > 0) {
            return res.json({ errors });
        }

        User.findOne({ where: {username: username} })
        .then(function(user) {
            if (bcrypt.compareSync(password, user.password)) {
                res.send({ user: user.id });
            } else {
                res.send({ error: 'incorrect password' });
            }
        }).catch(function(err) {
            res.json({ error: err }); 
        });
    })
    .delete(function(req,res) {
        res.send({ msg: 'user logged out' });
    });
//end /auth

app.listen(3000);

function sanitize(param, name, res) {
    var error = [];
    if (!param) error.push(name + ' cannot be empty');
    if (param.indexOf(' ') >= 0) error.push(name + ' cannot contain spaces');
    if (name != 'password') {
        if (!/^[a-z0-9]+$/i.test(param)) error.push(name + ' can only contain letters and numbers');
    }
    return error;
};
