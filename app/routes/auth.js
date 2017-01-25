var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Common = require('../common');
//TODO env 'secret' key for jwt
//TODO add to Common.sanitize to get rid of repeated code, DRY...
var secret = 'temp'

router.route('/auth')
    /*
     * Authentication router
     * POST creates new jwt (login)
     * PUT checks jwt
     * DELETE destroys jwt (logout)
    */ 
    .post(function(req,res) {
        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            return res.json({ error: 'You must provide a username and password for authentication' });
        }

        var error = Common.sanitize(username, 'username', res);
        var errors = error.concat(Common.sanitize(password, 'password', res));

        if (errors.length > 0) {
            return res.json({ errors });
        }

        User.findOne({ where: {username: username} })
        .then(function(user) {
            if (bcrypt.compareSync(password, user.password)) {
                var token = jwt.sign({ username: user.username }, secret, { expiresIn: '8h' });
                user.update({ token: token });
                res.send({ token });
            } else {
                res.send({ error: 'incorrect password' });
            }
        }).catch(function(err) {
            res.json({ error: err }); 
        });
    })
    .put(function(req,res) {
        var token = req.body.token;
        var username = req.body.username; 

        if (!username || !token) {
            return res.json({ error: 'You must provide a username and token to check authentication' });
        }

        var errors = Common.sanitize(username, 'username', res);

        if (errors.length > 0) {
            return res.json({ errors });
        }

        User.findOne({ where: { username: username }})
        .then(function(user) {
            if (token == user.token) {
                return res.send({ status: 200 });
            } else {
                return res.send({ status: 'error, please log in again' });
            }
        }).catch(function(err) {
            res.json({ error: err });
        });
    })
    .delete(function(req,res) {
        var token = req.body.token;
        var username = req.body.username; 

        if (!username || !token) {
            return res.json({ error: 'You must provide a username and token to delete authentication' });
        }

        var errors = Common.sanitize(username, 'username', res);

        if (errors.length > 0) {
            return res.json({ errors });
        }

        User.findOne({ where: { username: username }})
        .then(function(user) {
            if (token == user.token) {
                user.update({ token: null });
                return res.send({ status: 200 });
            } else {
                return res.send({ status: 'error, please log in again' });
            }
               // var decoded = jwt.verify(token, secret);
        }).catch(function(err) {
            res.json({ error: err });
        });
    });

module.exports = router;
