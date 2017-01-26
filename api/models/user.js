var Sequelize = require('sequelize');
var sequelize = new Sequelize('nodeAuth','root','');

var User = sequelize.define('user', {
    username: { type: Sequelize.STRING, unique: true, required: true },
    password: { type: Sequelize.STRING, required: true },
    token: { type: Sequelize.STRING }
});

//TODO
sequelize.sync();

module.exports = User;
