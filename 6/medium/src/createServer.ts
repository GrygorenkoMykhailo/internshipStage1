import express, { Request, Response } from "express"
import bodyParser from "body-parser";

export const createServer = () => {
    const app = express();
    app.use(bodyParser.json());
    return app;
}