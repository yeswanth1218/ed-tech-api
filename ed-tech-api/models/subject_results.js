// models/SubjectResults.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SubjectResults = sequelize.define('subject_results', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  class: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subject: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  golden_code: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  total_marks: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  obtained_marks: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  feedback: { // ✅ spelling fix: "feedaback" -> "feedback"
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'subject_results',
  timestamps: true,     // Sequelize will use created_at & updated_at
  underscored: true     // columns in snake_case
});

module.exports = SubjectResults;
