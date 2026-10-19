import {db} from "../prisma/db.js";
import {AppError} from "../utils/app-error.js";

export const sendFriendRequest = async(senderId : number, receiverId : number)=>{
    const reciever = await db.orm.public.User.where({id : receiverId}).first();
    if(!reciever){
        throw new AppError("User not found", 404);
    }
    if(senderId == receiverId){
        throw new AppError("You can't send a friend request to yourself", 400);
    };
    const user1Id = Math.min(senderId, receiverId);
    const user2Id = Math.max(senderId, receiverId);

    const friendship = await db.orm.public.Friendship.where({user1Id, user2Id}).first();
    if(friendship) throw new AppError("You already have a friendship with this user", 400);

    const existingRequest = await db.orm.public.FriendRequest.where({senderId, receiverId}).first();
    if(existingRequest) throw new AppError("You already have a pending friend request", 400);

    const request = await db.orm.public.FriendRequest.create({
        senderId,
        receiverId,
    });

    return {
        message : "Friend request sent",
        requestId : request.id,
    };
}

export const getFriendRequest = async(userId : number)=>{
    const requests = await db.orm.public.FriendRequest.where({receiverId : userId, status : "PENDING"}).all();
    const result = await Promise.all(requests.map(async(request)=>{
        const sender = await db.orm.public.User.where({id : request.senderId}).first()

        return {
            requestId : request.id,
            senderId : request.senderId,
            senderName : sender?.name,
            senderEmail : sender?.email,
            createdAt : request.createdAt,
        }
    }))
    return result;
}