import {Response} from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { sendFriendRequest, getFriendRequest, acceptFriendRequest, rejectFriendRequest} from "../services/friend.service";
import { AppError } from "../utils/app-error";

export const sendRequest = async(req : AuthRequest, res : Response)=>{
    const { receiverId } = req.body;
    const result = await sendFriendRequest(req.userId!, Number(receiverId));
    res.status(201).json(result);
}

export const getReceivedRequests = async(req : AuthRequest, res : Response)=>{
    const requests = await getFriendRequest(req.userId!);
    res.status(200).json(requests);
}

export const acceptRequest = async(req : AuthRequest, res : Response)=>{
    const requestId = Number(req.params.requestId);

    if(!Number.isInteger(requestId) || requestId<=0){
        throw new AppError("Invalid Friend Request Id", 400)
    }

    const result = await acceptFriendRequest(requestId, req.userId!);

    res.status(200).json(result);
}

export const rejectRequest = async(req : AuthRequest, res : Response)=>{
    const requestId = Number(req.params.requestId);

    if(!Number.isInteger(requestId) || requestId<=0){
        throw new AppError("Invalid friend Request Id", 400);
    }

    const result = await rejectFriendRequest(requestId, req.userId!);
    res.status(200).json(result);
}