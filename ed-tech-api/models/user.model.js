// models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('users', {
  name: { type: DataTypes.STRING, allowNull: true },
  class: { type: DataTypes.INTEGER, allowNull: true },
  section: { type: DataTypes.STRING, allowNull: true },
  mobile: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { 
    type: DataTypes.ENUM('STUDENT', 'TEACHER', 'ADMIN'),
    allowNull: false
  }
});

module.exports = User;
