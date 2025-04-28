import { IMessage } from "../../../models/Message";
import { IBaseService } from "./IBaseService";

export interface IMessageService extends IBaseService<IMessage> {
    createMessage(data: Partial<IMessage>): Promise<IMessage | null>;
  getMessagesByChatId(chatId: string): Promise<IMessage[] | null>;
}
