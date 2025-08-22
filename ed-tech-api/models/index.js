const sequelize = require('../config/db');
const User = require('./users');
const ExamName = require('./exam_name');
const Ruberics  = require('./ruberics');
const Classes  = require('./classes');
const Sections = require('./sections');
const ExamDetails = require('./exam_details');
const QuestionPapers = require('./question_paper');
const Evaluations = require('./evaluations');






const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');

    // Automatically update tables based on model changes
    await sequelize.sync({ alter: true }); 
    console.log('Tables synced (auto-updated)');
    
  } catch (error) {
    console.error('Database error:', error);
  }
};

module.exports = { initDb, User, ExamName,Ruberics,Classes,Sections,ExamDetails,QuestionPapers,Evaluations };
