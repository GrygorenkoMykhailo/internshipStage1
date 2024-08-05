import { errorHandler } from "./middleware/errorHandler";
import { createServer } from "./createServer";
import { boot } from "./main";
import usersRoutes from './routes/usersRoutes'

boot();
const server = createServer();

server.use(usersRoutes);
server.use(errorHandler);

server.listen(3000, () => {
    console.log('Server started at port 3000');
});


