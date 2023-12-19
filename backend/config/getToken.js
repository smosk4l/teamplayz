const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Okres ważności tokena - tutaj 30 dni
  });
};

module.exports = generateToken;
