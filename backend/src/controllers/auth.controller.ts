import {Request, Response} from "express";
import {registerUser, verifyEmail, resendOtp, loginUser} from "../services/auth.service.js";
import {AppError} from "../utils/app-error.js";
import {AuthRequest} from "../middleware/auth.middleware.js";
import { db } from "../prisma/db.js";

export const register = async (req : Request, res : Response)=>{
    const {name, email, password} = req.body;
    const result = await registerUser(name, email, password);
    res.json(result);
};

export const verifyEmailController = async(req : Request, res : Response)=>{
    const{userId, otp} = req.body;
    const result = await verifyEmail(userId, otp);
    res.json(result);
}

export const resendOtpController = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const result = await resendOtp(userId);

  res.json(result);
};


export const login = async(req : Request, res : Response)=>{
    const {email, password} = req.body;

    const result = await loginUser(email, password);

    res.json(result);
}


export const getMe = async(req : AuthRequest, res : Response)=>{
    const user = await db.orm.public.User.where({ id : req.userId! }).first();

    if(!user){
        throw new AppError("User not found", 404);
    }

    res.json({
        id : user.id,
        name : user.name,
        email : user.email,
        emailVerified : user.emailVerified,
    });
};

