// Types for API requests
export interface Lesson {
    id?: string
    name: string
    type: "video" | "file" | "text"
    content?: string
    duration?: string
  }
  
  export interface Module {
    id?: string
    name: string
    lessons: string[] // Lesson IDs
  }
  
  export interface Course {
    id?: string
    title: string
    subtitle: string
    category: string
    subCategory: string
    topic: string
    language: string
    subtitleLanguage?: string
    level: string
    duration: string
    durationUnit: "day" | "week" | "month"
    thumbnail: string
    trailer?: string
    description: string
    teachItems: { id: number; content: string }[]
    modules: string[] // Module IDs
    welcomeMessage: string
    congratulationsMessage: string
    price: string
    isPublic: boolean
  }
  
  // API service for course creation
  export const courseService = {
    // Create a lesson
    createLesson: async (lesson: Lesson): Promise<string> => {
      // This would be a real API call in production
      console.log("Creating lesson:", lesson)
  
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 300))
  
      // Return a mock lesson ID
      return `lesson-${Math.random().toString(36).substring(2, 9)}`
    },
  
    // Create a module with lesson IDs
    createModule: async (module: Module): Promise<string> => {
      // This would be a real API call in production
      console.log("Creating module:", module)
  
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 300))
  
      // Return a mock module ID
      return `module-${Math.random().toString(36).substring(2, 9)}`
    },
  
    // Create a course with module IDs
    createCourse: async (course: Course): Promise<string> => {
      // This would be a real API call in production
      console.log("Creating course:", course)
  
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 500))
  
      // Return a mock course ID
      return `course-${Math.random().toString(36).substring(2, 9)}`
    },
  }
  
  