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

@injectable()
export class MessageService extends BaseService<IMessage> implements IMessageService {
    private io: ReturnType<typeof getIO>;
    private getUserSocketId: typeof getUserSocketId;
    constructor(
        @inject(TYPES.MessageRepository) private messageRepository: IMessageRepository,
        @inject(TYPES.ChatRepository) private chatRepositroy: IChatRepository
    ) {
        super(messageRepository)
        this.io = getIO(); 
        this.getUserSocketId = getUserSocketId; 
    }

    async getMessagesByChatId(chatId: string): Promise<IMessage[] | null> {
        return this.messageRepository.findMessagesByChatId(chatId)
    }

    async createMessage(data: Partial<IMessage>, attachment?:Express.Multer.File): Promise<IMessage | null> {
        const chat = await this.chatRepositroy.findById(data.chatId as string);
        if (!chat) {
            throw new Error("Chat not found");
        }
        const participants  = chat.participants.filter(p => p.toString() !== data.senderId?.toString())

        if(attachment){
            
        }

        const message = await this.messageRepository.create(data)

        await this.chatRepositroy.update(data.chatId as string, {lastMessage: message?._id} as Partial<IChat>)

        participants.forEach(pId => {
            const socketId = getUserSocketId(pId)
            if(socketId){
                getIO().to(socketId).emit(SocketEvents.NEW_MESSAGE, message)
            }
        })

        return message
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

    async deleteMessage(messageId: string): Promise<IMessage | null>{
        const message = await this.messageRepository.delete(messageId)
        const chat = await this.chatRepositroy.findById(message?.chatId as string);
        if (!chat) {
            throw new Error("Chat not found");
        }
        const participants  = chat.participants.filter(p => p.toString() !== message?.senderId?.toString())

        participants.forEach(pId => {
            const socketId = getUserSocketId(pId)
            if(socketId){
                getIO().to(socketId).emit(SocketEvents.DELETE_MESSAGE, message)
            }
        })

        return message
    }
}
