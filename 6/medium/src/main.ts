import dbConnection from "./dbConnection";
import readEnvironment from "./readEnvironment";
import createServer from "./server";

const boot = () => {
    readEnvironment();
    dbConnection();
    const server = createServer();
    server.listen(3000, () => {
        console.log('Server started at port 3000');
    });
}

boot();