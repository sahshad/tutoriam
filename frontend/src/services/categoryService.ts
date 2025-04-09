import { CategoryFormValues, CategoryParams } from "@/types/category"
import apiClient from "@/utils/axiosInstance"

export const fetchAllCategories = async ({page, limit, searchQuery, filter}:CategoryParams) => {
    // console.log(page, limit, searchQuery, filter)
    try {
        const res = await apiClient.get("/admin/categories",{
            params:{
                page,
                limit,
                searchQuery,
                filter
            }
        })
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchListedCategories = async () => {
    try {
        const res = await apiClient.get("/instructor/categories")
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createCategory = async (categoryData:CategoryFormValues) => {
    try {
        const res = await apiClient.post("/admin/categories", categoryData)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const editCategory = async (id:string,data:any) => {
    try {
        const res = await apiClient.patch(`/admin/categories/${id}`, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const toggleCategoryStatus = async (id:string) => {
    try {
        const res = await apiClient.patch(`/admin/categories/${id}/status`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}