// controllers/chat.controller.ts
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { inject, injectable } from "inversify";
import { IChatController } from "../core/interfaces/controller/IChatController";
import { IChatService } from "../core/interfaces/service/IChatService";
import { TYPES } from "../di/types";
import { StatusCodes } from "http-status-codes";

@injectable()
export class ChatController implements IChatController {
    constructor(@inject(TYPES.ChatService) private chatService: IChatService) {}

    getChats = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?._id as string;
        const chats = await this.chatService.getUserChats(userId);
        res.status(StatusCodes.OK).json({ message: "Chats fetched successfully", chats });
    });

    createChat = asyncHandler(async (req: Request, res: Response) => {
        const { recieverId } = req.body
        const userId = req.user?._id as string 
        const chat = await this.chatService.createChat(userId, recieverId)
        res.status(StatusCodes.CREATED).json({ message: "Chat created or fetched successfully", chat });
    });
}
