const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const jwtKey = process.env.JWT_KEY;
  const token = req.headers.authorization;

  if (!token) {
    global.logger.warn('No token provided');
    return res.status(401).send();
  }

  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      global.logger.error('Failed to authenticate token:', err.message);
      return res.status(401).send();
    }
    req.user = decoded;
    next();
  });
}