import {Response} from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { sendFriendRequest, getFriendRequest } from "../services/friend.service";

export const sendRequest = async(req : AuthRequest, res : Response)=>{
    const { receiverId } = req.body;
    const result = await sendFriendRequest(req.userId!, Number(receiverId));
    res.status(201).json(result);
}

export const getReceivedRequests = async(req : AuthRequest, res : Response)=>{
    const requests = await getFriendRequest(req.userId!);
    res.status(200).json(requests);
}