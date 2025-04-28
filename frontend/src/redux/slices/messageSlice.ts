import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages, sendMessage } from "../thunks/MessageThunk";

export interface Message {
  _id: string;
  chatId:  string;
  senderId: string;
  body: string;
  readBy: { userId: string; read: boolean }[];
  attachments?: { url: string; mime: string; size: number }[];
  createdAt: Date;
  updatedAt: Date;
}

interface MessageState {
  messages: Message[] ;
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch messages";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
