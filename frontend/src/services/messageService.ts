import apiClient from "@/lib/axios"

export const fetchChatMessages = async (chatId: string) => {
    try {
        const res = await apiClient.get(`/messages/${chatId}`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const sendMessageToUser = async(chatId: string, body: string) => {
    try {
        const res = await apiClient.post('messages/send', {chatId, body})
        return res.data
    } catch (error) {
        console.log(error)
    }
}