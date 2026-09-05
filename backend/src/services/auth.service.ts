import {db} from "../prisma/db.js";
import bcrypt from "bcrypt";
import {generateOTP} from "../utils/otp.js";
import { Temporal } from "temporal-polyfill";
import { AppError } from "../utils/app-error.js";

export const registerUser = async(
    name : string, 
    email: string, 
    password : string
)=>{
    const existingUser = await db.orm.public.User.where({email}).first();

    if(existingUser){
        throw new AppError("User already exists", 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.orm.public.User.create({
        name,
        email,
        passwordHash,
    });

    const otp = generateOTP();

    const otpHash = await bcrypt.hash(otp, 10);

    await db.orm.public .OtpVerification.create({
        userId : user.id,
        otpHash,
        expiresAt : Temporal.Now.instant().add({minutes : 10}),
    });

    return {
        id : user.id,
        name : user.name,
        email : user.email,
        emailVerified : user.emailVerified,
        otp,
    };
};

export const verifyEmail = async (
    userId: number,
    otp: string,
) => {
    const verification = await db.orm.public.OtpVerification
        .where({ userId })
        .first();

    if (!verification) {
        throw new AppError("OTP not found", 404);
    }

    if (
    Temporal.Instant.compare(verification.expiresAt, Temporal.Now.instant()) < 0){
        await db.orm.public.OtpVerification
            .where({ id: verification.id })
            .delete();

        throw new AppError("OTP expired", 400);
    }

    const isValid = await bcrypt.compare(
        otp,
        verification.otpHash
    );

    if (!isValid) {
        const newAttempts = verification.attempts + 1;
        if(newAttempts > 5){
            await db.orm.public.OtpVerification.where({id : verification.id}).delete();
            throw new AppError("Too many incorrect otp attempts, Please request a new otp", 429);
        }

        await db.orm.public.OtpVerification.where({id : verification.id}).update({
            attempts : newAttempts,
        });

        throw new AppError("Invalid OTP", 400);
    }

    await db.transaction(async (tx) => {
        await tx.orm.public.User
        .where({ id: userId })
        .update({
            emailVerified: true,
            emailVerifiedAt: Temporal.Now.instant(),
        });

        await tx.orm.public.OtpVerification
        .where({ id: verification.id })
        .delete();
    });

    return {
        message: "Email verified successfully",
    };
};

export const resendOtp = async (userId: number) => {
    const user = await db.orm.public.User
        .where({ id: userId })
        .first();

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (user.emailVerified) {
        throw new AppError("Email is already verified", 400);
    }

    await db.orm.public.OtpVerification
        .where({ userId })
        .delete();

    const otp = generateOTP();

    const otpHash = await bcrypt.hash(otp, 10);

    await db.orm.public.OtpVerification.create({
        userId,
        otpHash,
        expiresAt: Temporal.Now.instant().add({ minutes: 10 }),
    });

    return {
        message: "New OTP generated",
        otp,
    };
};