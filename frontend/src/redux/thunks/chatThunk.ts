import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserChats } from "@/services/chatService";

// export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
//   const response = await axios.get("/api/chats");
//   return response.data.chats as Chat[];
// });

export const fetchChats = createAsyncThunk(
    "chat/fetchChats",
      async (_, { rejectWithValue }) => {
        try {
          const data = await fetchUserChats();
          return data.chats 
        } catch (err: any) {
          return rejectWithValue(err?.data?.message || "Failed to fetch cart items");
        }
      }
)
