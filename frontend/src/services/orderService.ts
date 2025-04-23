import apiClient from "@/utils/axiosInstance"

export const fetchUserOrders = async() => {
    try {
        const res = await apiClient.get("/orders")
        return res.data
    } catch (error) {
        console.log(error)
    }
}