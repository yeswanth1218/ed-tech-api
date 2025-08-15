const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Import your sequelize instance

const ExamName = sequelize.define('exam_name', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique:true
  },
  status: {
    type: DataTypes.SMALLINT,   // MySQL: TINYINT, PostgreSQL will map to SMALLINT
    allowNull: false,
    defaultValue: 1
  }
}, {
    tableName: 'exam_name',
    timestamps: true,        // Sequelize will manage created_at & updated_at
    underscored: true        // Use snake_case column names
  });

module.exports = ExamName;
