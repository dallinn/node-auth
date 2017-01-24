var Sequelize = require('sequelize');
var sequelize = new Sequelize('nodeAuth','root','');

var User = sequelize.define('user', {
    username: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING },
});

//TODO
sequelize.sync();

module.exports = User;
