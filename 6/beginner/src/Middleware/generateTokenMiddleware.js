require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_KEY;

module.exports = function generateTokenMiddleware(req, res, next) {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json();
    }

    const payload = {
        username,
        email,
    };

    const token = jwt.sign(payload, jwtKey, { expiresIn: '24h' });
    res.json({ token });
}