import {Router} from "express";
import {register, verifyEmailController, resendOtpController} from "../controllers/auth.controller.js";


const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmailController);
router.post("/resend-otp", resendOtpController);

export default router;