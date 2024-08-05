const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler'); 
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');

module.exports = () => {
    const app = express();
    app.use(usersRoutes);
    app.use(authRoutes);
    app.use(errorHandler);
    app.use(bodyParser.json());
    return app;
}