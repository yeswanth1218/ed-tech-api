const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const QuestionPapers = sequelize.define('question_papers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  exam_detail_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  question_number: {
    type: DataTypes.INTEGER,
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
  marks: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  question_type: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['OBJECTIVE', 'SUBJECTIVE', 'short_answer', 'essay', 'calculation']]
    }
  },
  ruberics: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.SMALLINT,   // MySQL: TINYINT, PostgreSQL will map to SMALLINT
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'question_papers',
  timestamps: true,
  underscored: true
});

module.exports = QuestionPapers;
