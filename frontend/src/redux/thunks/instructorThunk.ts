import { getInstructorDetails } from "@/services/instructorService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInstructor = createAsyncThunk(
    "instructor/fetchInstructor",
    async (instructorId: string, {rejectWithValue}) => {
        try {
            const data = await getInstructorDetails(instructorId)
            console.log(data.instructor)
            return data.instructor
        } catch (error: any) {
            return rejectWithValue(error?.data?.message || "failed to fetch instructor")
        }
    }
)