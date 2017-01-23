var Sequelize = require('sequelize');
var sequelize = new Sequelize('nodeAuth','root','');

var User = sequelize.define('user', {
    username: Sequelize.STRING,
});

//TODO
sequelize.sync();

module.exports = User;
