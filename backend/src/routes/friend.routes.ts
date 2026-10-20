import {Router} from "express";
import {sendRequest, getReceivedRequests, acceptRequest, rejectRequest, getFriendsList} from "../controllers/friend.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = Router();

router.post("/requests", authenticate, sendRequest);
router.get("/requests/received", authenticate, getReceivedRequests);
router.post("/requests/:requestId/accept", authenticate, acceptRequest);
router.post("/requests/:requestId/reject", authenticate, rejectRequest);
router.get("/", authenticate, getFriendsList);

export default router;