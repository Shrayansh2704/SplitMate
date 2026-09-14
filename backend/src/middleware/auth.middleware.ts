import {Request, Response , NextFunction} from "express";
import {AppError} from "../utils/app-error.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined");
}

export interface AuthRequest extends Request{
    userId? : number;
}

export const authenticate = async(req : AuthRequest, res : Response, next : NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new AppError("Authenctication required", 401);
    }

    const [scheme, token] = authHeader.split(" ");

    if(scheme !=="Bearer" || !token){
        throw new AppError("Invalid authorization header", 401);
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        if(typeof decoded !=="object" || decoded===null || typeof decoded.userId !== "number"){
            throw new AppError("Invalid token", 401);
        }

        req.userId = decoded.userId;

        next();
    }catch(error){
        if(error instanceof AppError) throw error;;

        throw new AppError("Invalid or Expired token", 401);
    }
};