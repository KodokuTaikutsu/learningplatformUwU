// authHelpers.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign({ userId: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken
};
