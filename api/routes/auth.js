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

        Common.checkToken(token, User, jwt, res);
    })
    .delete(function(req,res) {
        var token = req.body.token;

        var errors = Common.sanitize(token, 'token');
        if (errors.length > 0) return res.json({ errors });
        
        try {
            var decoded = jwt.verify(token, secret);
        } catch(err) {
            return res.json({ error: err.message });
        }
        User.findOne({ where: { username: decoded.username }})
        .then(function(user) {
            if (token == user.token) {
                user.update({ token: null })
                res.json({ status: 200 });
            } else {
                res.json({ error: 'error, please log in again' });
            }
        }).catch(function(err) {
            res.json({ error: err });
        });
    });

module.exports = router;
