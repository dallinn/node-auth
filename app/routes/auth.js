var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Common = require('../common');

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

        var errors = Common.sanitize([username, password],['username','password']);
        if (errors.length > 0) return res.json({ errors });

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

        var errors = Common.sanitize(token, 'token');
        if (errors.length > 0) return res.json({ errors });

        if(Common.checkToken(token, User, jwt, res)) {
            return res.json({ status: 200 });
        }
    })
    .delete(function(req,res) {
        var token = req.body.token;
        var username = req.body.username; 

        var errors = Common.sanitize([username, token],['username','token']);
        if (errors.length > 0) return res.json({ errors });

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
