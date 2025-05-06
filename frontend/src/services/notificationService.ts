import apiClient from "@/lib/axios"

export const getNotifications = async() => {
    try {
        const res = await apiClient.get("/notifications")
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const markNotificationAsRead = async(notificationId: string) => {
    try {
        const res = await apiClient.patch(`/notifications/${notificationId}/read`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const markAllNotificationsAsRead = async() => {
    try {
        const res = await apiClient.patch("/notifications/read")
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}