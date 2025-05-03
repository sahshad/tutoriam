import apiClient from "@/lib/axios"
import { PayoutRequest } from "@/types/revenue"

export const fetchInstructorWallet = async () =>{
    try {
        const res = await apiClient.get("/wallets/")
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchRevenueStats = async (type: string) =>{
    try {
        const res = await apiClient.get("/instructors/revenue",{
            params:{
                type
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createPayoutRequest = async (data: PayoutRequest) => {
    try {
        const res = await apiClient.post("/payouts", data)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchPayoutRequests = async () => {
    try {
        const res = await apiClient.get("/payouts")
        return res.data
    } catch (error) {
        console.log
    }
}