import { MessageHeader } from "./message-header";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Message } from "@/redux/slices/messageSlice";
import { sendMessage } from "@/redux/thunks/MessageThunk";
import { IUser } from "@/types/user";

interface MessagePanelProps {
  activeChatId: string | null;
  onBackClick?: () => void;
}

export function MessagePanel({ activeChatId, onBackClick }: MessagePanelProps) {
  const [messages, setMessages] = useState<Message[] | []>([]);
  const chatMessages = useAppSelector((state) => state.message.messages);
  const userId = useAppSelector((state) => state.auth.user._id);

  const participants = useAppSelector((state) => state.chat.chats).find(
    (chat) => chat._id.toString() === activeChatId?.toString()
  )?.participants as Partial<IUser>[];

  const chatDetails = participants?.find((p) => p._id?.toString() !== userId.toString());

  useEffect(() => {
    setMessages(chatMessages);
  }, [chatMessages]);
  const dispatch = useAppDispatch();

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    dispatch(sendMessage({ chatId: activeChatId as string, content }));
  };

  if (!activeChatId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <>
      <MessageHeader
        name={chatDetails?.name as string}
        avatar={chatDetails?.profileImageUrl as string}
        online={true}
        onBackClick={onBackClick}
      />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </>
  );
}
