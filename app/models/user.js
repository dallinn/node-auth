var Sequelize = require('sequelize');
var sequelize = new Sequelize('nodeAuth','root','');

var User = sequelize.define('user', {
    username: { type: Sequelize.STRING, unique: true },
});

//TODO
sequelize.sync();

module.exports = User;
