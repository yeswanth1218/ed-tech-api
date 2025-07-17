const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('users', {
  name: { type: DataTypes.STRING },
  mobile: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING }
});

module.exports = User;
