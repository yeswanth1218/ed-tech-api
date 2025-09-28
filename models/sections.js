const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sections = sequelize.define('sections', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'sections',
  timestamps: true,        // Sequelize will manage created_at & updated_at
  underscored: true        // Use snake_case column names
});

module.exports = Sections;
