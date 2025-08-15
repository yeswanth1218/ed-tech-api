const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (username, password, res) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  // Set token in cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  });

  return {
    message: 'Login successful',
    user: { id: user.id, username: user.username, role: user.role ,token:token},
  };
};

const register = async (username, password, role) => {
  const existingUser = await User.findOne({ where: { username ,} });
  if (existingUser) throw new Error('Username already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, password: hashedPassword, role });
  console.log(`>>>>newUser${JSON.stringify(newUser)}`)

  return { id: newUser.id, username: newUser.username, role: newUser.role };
};

module.exports = { login, register };
