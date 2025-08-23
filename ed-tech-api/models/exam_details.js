const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ExamDetails = sequelize.define('ExamDetails', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  examination_code: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  class: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  exam_date: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  subject_code: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  evaluator_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.SMALLINT, // PostgreSQL: SMALLINT
    allowNull: false,
    defaultValue: 1
  },
  golden_code: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'exam_details',
  timestamps: true, // Sequelize will use created_at & updated_at
  underscored: true // column names in snake_case
});

module.exports = ExamDetails;
