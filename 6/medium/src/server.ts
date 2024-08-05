import express, { Request, Response } from "express"
import bodyParser from "body-parser";
import usersRoutes from './routes/usersRoutes';
import { errorHandler } from "./middleware/errorHandler";

export default () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(usersRoutes);
    app.use(errorHandler);
    return app;
}