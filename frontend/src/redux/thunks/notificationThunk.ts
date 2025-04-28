// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "@/lib/axios";
// // import { Notification } from "@/types/notification";

// export const fetchNotificationsThunk = createAsyncThunk<
//   Notification[],
//   void
// >("notification/fetchAll", async (_, thunkAPI) => {
//   try {
//     const response = await axios.get("/notifications");
//     return response.data.notifications as Notification[];
//   } catch (error) {
//     return thunkAPI.rejectWithValue("Failed to fetch notifications");
//   }
// });

// export const markAsReadThunk = createAsyncThunk<
//   string,
//   string
// >("notification/markAsRead", async (notificationId, thunkAPI) => {
//   try {
//     await axios.patch(`/notifications/${notificationId}/read`);
//     return notificationId;
//   } catch (error) {
//     return thunkAPI.rejectWithValue("Failed to mark as read");
//   }
// });
