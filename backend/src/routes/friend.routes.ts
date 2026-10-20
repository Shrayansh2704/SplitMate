import {Router} from "express";
import {sendRequest, getReceivedRequests, acceptRequest, rejectRequest} from "../controllers/friend.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = Router();

router.post("/request", authenticate, sendRequest);
router.get("/requests/received", authenticate, getReceivedRequests);
router.post("/requests/:requestId/accept", authenticate, acceptRequest);
router.post("/requests/:requestId/reject", authenticate, rejectRequest);

export default router;