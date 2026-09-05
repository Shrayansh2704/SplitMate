import {Request, Response} from "express";
import {registerUser, verifyEmail, resendOtp} from "../services/auth.service.js";

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