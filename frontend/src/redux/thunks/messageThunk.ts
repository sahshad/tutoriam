import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message } from "../slices/messageSlice";
import { fetchChatMessages, sendMessageToUser } from "@/services/messageService";

// // ✅ Thunk to fetch messages for a chat
// export const fetchMessages = createAsyncThunk(
//   "message/fetchMessages",
//   async (chatId: string) => {
//     const response = await axios.get(`/api/chats/${chatId}/messages`);
//     return response.data.messages as Message[];
//   }
// );

export const fetchMessages = createAsyncThunk(
    "message/fetchMessages",
      async (chatId: string, { rejectWithValue }) => {
        try {
          const data = await fetchChatMessages(chatId);
        //   console.log(data.messages)
          return data.messages as Message[]
        } catch (err: any) {
          return rejectWithValue(err?.data?.message || "Failed to fetch cart items");
        }
      }
)

export const sendMessage = createAsyncThunk(
    "message/sendMessage",
      async ({ chatId, content }: { chatId: string; content: string }, { rejectWithValue }) => {
        try {
          const data = await sendMessageToUser(chatId, content)
          return data.messageData
        } catch (err: any) {
          return rejectWithValue(err?.data?.message || "Failed to fetch cart items");
        }
      }
)

// export const sendMessage = createAsyncThunk(
//   "message/sendMessage",
//   async ({ chatId, content }: { chatId: string; content: string }) => {
//     const response = await axios.post("/api/messages", { chatId, content });
//     return response.data.message as Message;
//   }
// );
