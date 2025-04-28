import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { inject, injectable } from "inversify";
import { IMessageController } from "../core/interfaces/controller/IMessageController";
import { IMessageService } from "../core/interfaces/service/IMessageService";
import { TYPES } from "../di/types";
import { StatusCodes } from "http-status-codes";
import { IMessage } from "../models/Message";

@injectable()
export class MessageController implements IMessageController {
    constructor(@inject(TYPES.MessageService) private messageService: IMessageService) {}

    getMessages = asyncHandler(async (req: Request, res: Response) => {
        const { chatId } = req.params;
        const messages = await this.messageService.getMessagesByChatId(chatId);
        res.status(StatusCodes.OK).json({ message: "Messages fetched successfully", messages });
    });

    createMessage = asyncHandler(async (req: Request, res: Response) => {
        const { chatId, body, attachments } = req.body;
        const senderId = req.user?._id as string;

        const messageData: Partial<IMessage> = {chatId, senderId, body}
        if(attachments){
            messageData.attachments = attachments
        }

        const message = await this.messageService.createMessage(messageData);
        res.status(StatusCodes.CREATED).json({ message: "Message sent successfully", messageData: message });
    });
}
