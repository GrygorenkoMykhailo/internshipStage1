const jwt = require('jsonwebtoken');

const generateToken = (req, res, next) => {
    const jwtKey = process.env.JWT_KEY;
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

module.exports = {
    generateToken
}