var router = require('express').Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var Common = require('../common');

router.route('/users')
    .post(function(req,res) {

        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            return res.json({ error: 'You must provide a username and password for account creation' });
        }

        var error = Common.sanitize(username, 'username', res);
        var errors = error.concat(Common.sanitize(password, 'password', res));

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

module.exports = router;
