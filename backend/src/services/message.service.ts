import { inject, injectable } from "inversify";
import { IMessageService } from "../core/interfaces/service/IMessageService";
import { IMessage } from "../models/Message";
import { TYPES } from "../di/types";
import { IMessageRepository } from "../core/interfaces/repository/IMessageRepository";
import { BaseService } from "../core/abstracts/base.service";
import { IChatRepository } from "../core/interfaces/repository/IChatRepository";
import { getIO, getUserSocketId } from "../infrastructure/socket/socket";
import { IChat } from "../models/Chat";
import { SocketEvents } from "../core/constants/socket.events";
import { deleteImageFromCloudinary, deletePdfFromCloudinary, deleteVideoFromCloudinary, uploadImageToCloudinary, uploadPdfToCloudinary, uploadVideoToCloudinary } from "../utils/clodinaryServices";
import { INotificationRepository } from "../core/interfaces/repository/INotificationRepository";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";

@injectable()
export class MessageService extends BaseService<IMessage> implements IMessageService {
    private io: ReturnType<typeof getIO>;
    private getUserSocketId: typeof getUserSocketId;
    constructor(
        @inject(TYPES.MessageRepository) private messageRepository: IMessageRepository,
        @inject(TYPES.ChatRepository) private chatRepositroy: IChatRepository,
        @inject(TYPES.NotificationRepository) private notificationRepository: INotificationRepository,
        @inject(TYPES.UserRepository) private userRepository: IUserRepository
    ) {
        super(messageRepository)
        this.io = getIO(); 
        this.getUserSocketId = getUserSocketId; 
    }

    async getMessagesByChatId(chatId: string): Promise<IMessage[] | null> {
        return this.messageRepository.findMessagesByChatId(chatId)
    }

    // async createMessage(data: Partial<IMessage>, attachment?:Express.Multer.File): Promise<IMessage | null> {
    //     const chat = await this.chatRepositroy.findById(data.chatId as string);
    //     if (!chat) {
    //         throw new Error("Chat not found");
    //     }
    //     const participants  = chat.participants.filter(p => p.toString() !== data.senderId?.toString())

    //     if(attachment){
            
    //     }

    //     const message = await this.messageRepository.create(data)

    //     await this.chatRepositroy.update(data.chatId as string, {lastMessage: message?._id} as Partial<IChat>)

    //     participants.forEach(pId => {
    //         const socketId = getUserSocketId(pId)
    //         if(socketId){
    //             getIO().to(socketId).emit(SocketEvents.NEW_MESSAGE, message)
    //         }
    //     })

    //     return message
    // }

    async createMessage(
    data: Partial<IMessage>,
    attachment?: Express.Multer.File
): Promise<IMessage | null> {
    const chat = await this.chatRepositroy.findById(data.chatId as string);
    if (!chat) {
        throw new Error("Chat not found");
    }

    const participants = chat.participants.filter(
        (p) => p.toString() !== data.senderId?.toString()
    );

    const attachments: IMessage["attachments"] = [];

    if (attachment) {
        const mime = attachment.mimetype;
        const size = attachment.size;
        let uploadedUrl: string | null = null;

        if (mime.startsWith("image/")) {
            uploadedUrl = await uploadImageToCloudinary(attachment.buffer, "chat/attachments");
        } else if (mime.startsWith("video/")) {
            const videoUpload = await uploadVideoToCloudinary(attachment.buffer, "chat/attachments");
            uploadedUrl = videoUpload?.url ?? null;
        } else if (mime === "application/pdf") {
            uploadedUrl = await uploadPdfToCloudinary(attachment.buffer, "chat/attachments");
        }

        if (uploadedUrl) {
            attachments.push({ url: uploadedUrl, mime, size });
        }
    }

    const message = await this.messageRepository.create({
        ...data,
        attachments: attachments.length > 0 ? attachments : undefined,
    });

    await this.chatRepositroy.update(data.chatId as string, {
        lastMessage: message?._id,
    } as Partial<IChat>);

    const sender = await this.userRepository.findById(message?.senderId as string)

    for (const pId of participants) {
        const socketId = getUserSocketId(pId);
        if (socketId) {
            getIO().to(socketId).emit(SocketEvents.NEW_MESSAGE, message);
            const notification = await this.notificationRepository.create({
                type: "chat",
                title: "New Message",
                description: `You have received a new message. from ${sender?.name}`,
                userId: pId,
                chatId: chat._id as string,
                messageId: message?._id as string,
            });
            getIO().to(socketId).emit(SocketEvents.RECEIVE_NOTIFICATION, notification);
        }
    }

    return message;
}


    async updateMessage(messageId: string, body: string): Promise<IMessage | null> {
        const updatedMessage = await this.messageRepository.findByIdAndUpdate(messageId, {body})
        console.log(messageId, body)

        const chat = await this.chatRepositroy.findById(updatedMessage?.chatId as string);
        if (!chat) {
            throw new Error("Chat not found");
        }
        const participants  = chat.participants.filter(p => p.toString() !== updatedMessage?.senderId?.toString())

        participants.forEach(pId => {
            const socketId = getUserSocketId(pId)
            if(socketId){
                getIO().to(socketId).emit(SocketEvents.UPDATE_MESSAGE, updatedMessage)
            }
        })

        return updatedMessage
    }

    // async deleteMessage(messageId: string): Promise<IMessage | null>{
    //     const message = await this.messageRepository.delete(messageId)
    //     const chat = await this.chatRepositroy.findById(message?.chatId as string);
    //     if (!chat) {
    //         throw new Error("Chat not found");
    //     }
    //     const participants  = chat.participants.filter(p => p.toString() !== message?.senderId?.toString())

    //     participants.forEach(pId => {
    //         const socketId = getUserSocketId(pId)
    //         if(socketId){
    //             getIO().to(socketId).emit(SocketEvents.DELETE_MESSAGE, message)
    //         }
    //     })

    //     return message
    // }


    async deleteMessage(messageId: string): Promise<IMessage | null> {
    // Find the message first (instead of directly deleting), so you can access attachments
    const message = await this.messageRepository.findById(messageId);
    if (!message) {
        throw new Error("Message not found");
    }

    // Delete attachments from Cloudinary if any
    if (message.attachments && message.attachments.length > 0) {
        for (const attachment of message.attachments) {
            const { url, mime } = attachment;

            if (mime.startsWith("image/")) {
                await deleteImageFromCloudinary(url);
            } else if (mime.startsWith("video/")) {
                await deleteVideoFromCloudinary(url);
            } else if (mime === "application/pdf") {
                // PDFs are uploaded as 'raw' resource type, you can delete using same image delete method or implement another if needed
                await deletePdfFromCloudinary(url); // assuming deleteImageFromCloudinary handles raw also or create a separate delete function if needed
            }
        }
    }

    // Now delete the message from DB
    const deletedMessage = await this.messageRepository.delete(messageId);
    if (!deletedMessage) {
        throw new Error("Failed to delete message");
    }

    // Update chat and notify participants
    const chat = await this.chatRepositroy.findById(deletedMessage.chatId as string);
    if (!chat) {
        throw new Error("Chat not found");
    }
    const participants = chat.participants.filter(
        (p) => p.toString() !== deletedMessage.senderId?.toString()
    );

    participants.forEach((pId) => {
        const socketId = getUserSocketId(pId);
        if (socketId) {
            getIO().to(socketId).emit(SocketEvents.DELETE_MESSAGE, deletedMessage);
        }
    });

    return deletedMessage;
}


}
