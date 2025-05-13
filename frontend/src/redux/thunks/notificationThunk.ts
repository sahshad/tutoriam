import { deleteNotification, getNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "@/services/notificationService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotificationsThunk = createAsyncThunk(
    "notification/fetchNotifications",
    async (_, { rejectWithValue }) => {
  try {
    const data = await getNotifications()
    return data.notifications as Notification []
  } catch (error:any) {
    return rejectWithValue(error?.data?.message ||"Failed to fetch notifications");
  }
});

export const markAllNotificationsAsReadThunk = createAsyncThunk(
    "notification/markAllNotificationsAsRead",
    async(_, {rejectWithValue}) => {
        try {
             await markAllNotificationsAsRead()
            return true
        } catch (error:any) {
            return rejectWithValue(error?.data.message || "Fialed to mark all notifications as read")
        }
    }
)

export const markNotificationAsReadThunk = createAsyncThunk(
    "notification/markNotificationAsRead",
    async(notificationId: string, {rejectWithValue}) => {
        try {
            const data = await markNotificationAsRead(notificationId)
            return data.notification
        } catch (error:any) {
            return rejectWithValue(error?.data.message || "Failed to mark notification as read")
        }
    }
)

export const deleteNotificationThunk = createAsyncThunk(
    "notification/deleteNotification",
    async(notificationId: string, {rejectWithValue}) => {
        try {
            const data = await deleteNotification(notificationId)
            return data.notification._id
        } catch (error:any) {
            return rejectWithValue(error?.data.message || "Failed to delete notification")
        }
    }
)



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
