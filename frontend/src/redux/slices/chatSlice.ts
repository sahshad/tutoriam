import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../thunks/chatThunk";
import { IUser } from "@/types/user";
import { Message } from "./messageSlice";

export interface Chat {
  _id: string;
  participants: string[] | Partial<IUser> [];
  lastMessage: Partial<Message>;
  updatedAt: Date;
  createdAt: Date
}

interface ChatState {
  chats: Chat[];
  onlineUsers: string [];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  onlineUsers: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat(state, action) {
      state.chats.unshift(action.payload);
    },
    updateChat(state, action) {
      const index = state.chats.findIndex(chat => chat._id === action.payload._id);
      if (index !== -1) {
        state.chats[index] = { ...state.chats[index], ...action.payload };
      }
    },
    updateOnlineUsers(state, action) {
        // const onlineIds: string[] = action.payload;
        
        // const allChatParticipants = state.chats.flatMap(chat =>
        //     chat.participants.map(p => {
        //       if (typeof p === "string") return p;
        //       if (typeof p === "object" && p._id) return p._id;
        //       return null;
        //     }).filter(Boolean)
        //   );
        // const uniqueParticipants = new Set(allChatParticipants);
        // console.log(uniqueParticipants)
        // state.onlineUsers = onlineIds.filter(id => uniqueParticipants.has(id));
        state.onlineUsers = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch chats";
      });
  },
});

export const { addChat, updateChat, updateOnlineUsers } = chatSlice.actions;
export default chatSlice.reducer;
