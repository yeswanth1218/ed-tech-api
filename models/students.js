const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('students', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  student_id: {
    type: DataTypes.STRING,
    allowNull: true, // ✅ allow null true
    unique: true     // roll number must be unique
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  class: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  admission_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  parent_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.SMALLINT,   // MySQL: TINYINT, PostgreSQL will map to SMALLINT
    allowNull: false,
    defaultValue: 1
  },
}, {
  tableName: 'students',
  timestamps: true,
  underscored: true
});


module.exports = Student;
