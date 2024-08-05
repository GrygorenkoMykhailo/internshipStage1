import { RequestHandler, Request, Response, NextFunction } from "express";

export const asyncErrorHandler = (func: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
    try{
        await func(req, res, next);
    }catch(e){
        next(e);
    }
}