const winston = require('winston');

module.exports = () => {
    global.logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'log.log' }),
        ],
    });
}

