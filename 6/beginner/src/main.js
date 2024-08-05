const createServer = require('./server');
const readEnvironment = require('./readEnvironment');
const createLogger = require('./createLogger');

const boot = () => {
    readEnvironment();
    createLogger();
    const server = createServer();
    server.listen(3000, () => {
        console.log('Server started on port 3000');
    });
}

boot();