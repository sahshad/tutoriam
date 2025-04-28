import { inject, injectable } from "inversify";
import { IMessageService } from "../core/interfaces/service/IMessageService";
import { IMessage } from "../models/Message";
import { TYPES } from "../di/types";
import { IMessageRepository } from "../core/interfaces/repository/IMessageRepository";
import { BaseService } from "../core/abstracts/base.service";
import { IChatRepository } from "../core/interfaces/repository/IChatRepository";
import { getIO, getUserSocketId } from "../infrastructure/socket/socket";
import { IChat } from "../models/Chat";

@injectable()
export class MessageService extends BaseService<IMessage> implements IMessageService {
    constructor(
        @inject(TYPES.MessageRepository) private messageRepository: IMessageRepository,
        @inject(TYPES.ChatRepository) private chatRepositroy: IChatRepository
    ) {
        super(messageRepository)
    }

    async getMessagesByChatId(chatId: string): Promise<IMessage[] | null> {
        return this.messageRepository.findMessagesByChatId(chatId)
    }

    async createMessage(data: Partial<IMessage>): Promise<IMessage | null> {
        const chat = await this.chatRepositroy.findById(data.chatId as string);
        if (!chat) {
            throw new Error("Chat not found");
        }
        const participants  = chat.participants.filter(p => p.toString() !== data.senderId?.toString())

        console.log(participants)
        const message = await this.messageRepository.create(data)

        await this.chatRepositroy.update(data.chatId as string, {lastMessage: message?._id} as Partial<IChat>)

        participants.forEach(pId => {
            const socketId = getUserSocketId(pId)
            if(socketId){
                getIO().to(socketId).emit("newMessage", message)
            }
        })

        return message
    }
}
