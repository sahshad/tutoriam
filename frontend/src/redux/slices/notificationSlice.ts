// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// // import { Notification } from "@/types/notification";
// import { fetchNotificationsThunk, markAsReadThunk } from "../thunks/notificationThunk";

// interface NotificationState {
//   notifications: Notification[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: NotificationState = {
//   notifications: [],
//   loading: false,
//   error: null,
// };

// const notificationSlice = createSlice({
//   name: "notification",
//   initialState,
//   reducers: {
//     addNotification: (state, action: PayloadAction<Notification>) => {
//       state.notifications.unshift(action.payload); // latest first
//     },
//     clearNotifications: (state) => {
//       state.notifications = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNotificationsThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.notifications = action.payload;
//       })
//       .addCase(fetchNotificationsThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch notifications";
//       })
//       .addCase(markAsReadThunk.fulfilled, (state, action) => {
//         const id = action.payload;
//         const notif = state.notifications.find((n) => n.id === id);
//         if (notif) notif.read = true;
//       });
//   },
// });

// export const { addNotification, clearNotifications } = notificationSlice.actions;
// export default notificationSlice.reducer;
