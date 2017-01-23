var Sequelize = require('sequelize');
var sequelize = new Sequelize('nodeAuth','root','');

var User = sequelize.define('user', {
    username: Sequelize.STRING,
});

sequelize.sync();

module.exports = User;
