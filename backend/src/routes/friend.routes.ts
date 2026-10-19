import {Router} from "express";
import {sendRequest, getReceivedRequests, acceptRequest} from "../controllers/friend.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = Router();

router.post("/request", authenticate, sendRequest);
router.get("/requests/received", authenticate, getReceivedRequests);
router.post("/requests/:requestId/accept", authenticate, acceptRequest)

export default router;