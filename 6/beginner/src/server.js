const createServer = require('./createServer');
const errorHandler = require('./middleware/errorHandler'); 
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');
const createLogger = require('./createLogger');
const { readEnvironment } = require('./main');

readEnvironment();
createLogger();
const app = createServer();
app.use(usersRoutes);
app.use(authRoutes);
app.use(errorHandler);

app.listen(3000, () => {
  global.logger.info('Server started');
});
