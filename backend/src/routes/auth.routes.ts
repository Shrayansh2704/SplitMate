import {Router} from "express";
import {register, verifyEmailController, resendOtpController, login, getMe} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmailController);
router.post("/resend-otp", resendOtpController);
router.post("/login", login);
router.get("/me", authenticate, getMe);

export default router;