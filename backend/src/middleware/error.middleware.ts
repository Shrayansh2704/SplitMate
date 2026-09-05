import {Request, Response , NextFunction} from "express";
import {AppError} from "../utils/app-error.js";
export const errorHandler = (err : Error, req : Request, res : Response, next : NextFunction)=>{
    //console.error(err.message);

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            statusCode : err.statusCode,
            message: err.message,
        });
        return;
    }

    res.status(500).json({
        statusCode : 500,
        message : err.message,
    });
}