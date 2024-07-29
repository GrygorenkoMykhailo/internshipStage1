require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_KEY;

module.exports = function createVerifyTokenMidlleware(logger) {
    return (req, res, next) => {
      const token = req.headers.authorization;
  
      if (!token) {
        logger.warn('No token provided');
        return res.status(401).send();
      }
    
      jwt.verify(token, jwtKey, (err, decoded) => {
        if (err) {
          logger.error('Failed to authenticate token:', err.message);
          return res.status(401).send();
        }
        req.user = decoded;
        next();
      });
    }
  }