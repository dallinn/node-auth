var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Common = require('../common');

router.route('/auth')
    /*
     * Authentication router
     * POST creates new jwt
     * PUT checks jwt
     * DELETE destroys jwt
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
                //TODO env secret key
                var token = jwt.sign({ username: user.username }, 'temp', { expiresIn: '8h' });
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
        //TODO env secret key
        var decoded = jwt.verify(token, 'temp');
        res.send({ decoded });
    })
    .delete(function(req,res) {
    });

module.exports = router;
