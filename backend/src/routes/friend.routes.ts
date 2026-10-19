import {Router} from "express";
import {sendRequest, getReceivedRequests} from "../controllers/friend.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/request", authenticate, sendRequest);
router.get("/requests/received", authenticate, getReceivedRequests);

export default router;