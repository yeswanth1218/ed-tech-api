const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subject = sequelize.define('subjects', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  subject_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true, // ✅ Ensure subject_code unique
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1,
  }
}, {
    tableName: 'subjects',
    timestamps: true,        // Sequelize will manage created_at & updated_at
    underscored: true        // Use snake_case column names
  });

module.exports = Subject;
