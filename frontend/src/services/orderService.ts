import apiClient from "@/lib/axios"

export const fetchUserOrders = async() => {
    try {
        const res = await apiClient.get("/orders")
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllOrders = async(page:number, limit:number) => {
    try {
        const res = await apiClient.get("/orders/all", {
            params:{
                page,
                limit
            }
        })
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}