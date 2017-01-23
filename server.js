var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

//models
var User = require('./app/models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

router.route('/users')
    .post(function(req,res) {
        console.log(req.body);

        var username = req.body.username;

        console.log(username);
        
        if (!username) return res.json({ error: 'please provide a username' });
        else if (username.indexOf(' ') >= 0) return res.json({ error: 'username cannot contain spaces' });
        else if (!/^[a-z0-9+$]/i.test(username)) return res.json({ error: 'username can only contain letters and numbers' });

        User.create({
            username: req.body.username,
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

app.listen(3000);
