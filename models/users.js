const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Import your sequelize instance

const User = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  class: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.SMALLINT,   // MySQL: TINYINT, PostgreSQL will map to SMALLINT
    allowNull: false,
    defaultValue: 1
  },
  role: {
    type: DataTypes.ENUM('STUDENT', 'TEACHER', 'ADMIN'),
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true,        // Sequelize will manage created_at & updated_at
  underscored: true        // Use snake_case column names
});

module.exports = User;
