// auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUserFromToken = async (token) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return user;
  } catch (err) {
    return null;
  }
};

module.exports = { getUserFromToken };