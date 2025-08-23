const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Classes = sequelize.define('classes', {
  class: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique:true
  },
  status: {
    type: DataTypes.SMALLINT, // PostgreSQL: SMALLINT
    allowNull: false,
    defaultValue: 1
  }
},  {
  tableName: 'classes',
  timestamps: true,        // Sequelize will manage created_at & updated_at
  underscored: true        // Use snake_case column names
});
module.exports = Classes;
