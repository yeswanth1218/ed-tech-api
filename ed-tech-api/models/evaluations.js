const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Evaluations = sequelize.define('evaluations', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  marks_obtained: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  max_possible_marks: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  question_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  golden_code: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  strengths: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  areas_for_improvement: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.SMALLINT, // PostgreSQL: SMALLINT
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'evaluations',
  timestamps: true, // Sequelize will use created_at & updated_at
  underscored: true // column names in snake_case
});

module.exports = Evaluations;
