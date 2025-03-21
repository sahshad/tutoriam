import api from "@/utils/axiosInstance"

export const sendInstructorApplication = async() => {
    api.post('/instructor/apply')
}