// repositories/message.repository.ts
import { BaseRepository } from "../core/abstracts/base.repository";
import { IMessageRepository } from "../core/interfaces/repository/IMessageRepository";
import { Message, IMessage } from "../models/Message";
import { injectable } from "inversify";

@injectable()
export class MessageRepository extends BaseRepository<IMessage> implements IMessageRepository {
    constructor() {
        super(Message);
    }

    async findMessagesByChatId(chatId: string): Promise<IMessage[] | null> {
        return Message.find({ chatId }).sort({ createdAt: 1 });
    }

}
