const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Import your sequelize instance

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
}, {
  timestamps: true,       // Adds createdAt & updatedAt
  underscored: true       // Maps to created_at, updated_at
});

module.exports = User;
