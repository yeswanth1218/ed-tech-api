const sequelize = require('../config/db');
const User = require('./user.model');

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync({ alter: true }); // Auto-create table
    console.log('Tables synced');
  } catch (error) {
    console.error('Database error:', error);
  }
};

module.exports = { initDb, User };
