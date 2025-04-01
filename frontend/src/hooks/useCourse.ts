import { useState, useEffect } from "react"
import { getMyCourses } from "@/services/instructorService"
import { Course } from "@/types/course"

interface useCoursesProps{
    role:string
}
export function useCourses({role}:useCoursesProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState("latest")
  const [category, setCategory] = useState("all")
  const [rating, setRating] = useState("4")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)  // New loading state

  const coursesPerPage = 8

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true)  // Start loading
        if(role === 'instructor'){
            const res = await getMyCourses()  // Assuming this gets your courses from the backend
            setCourses(res.data)
        }else if(role === 'user'){
            
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)  // Set loading to false when data is fetched
      }
    }
    getCourses()
  }, [])

  useEffect(() => {
    // Filter courses based on criteria
    let result = [...courses]
    console.log(courses)
    // Filter by search query (search in title or subtitle)
    if (searchQuery) {
      result = result.filter((course) => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (category !== "all") {
      result = result.filter((course) => course.category.toLowerCase() === category.toLowerCase())
    }

    // Filter by rating
    const minRating = Number.parseInt(rating)
    // result = result.filter((course) => course.rating >= minRating)

    // Sort courses based on selected criteria
    switch (sortBy) {
        case "latest":
          result.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;  // Sort in descending order (latest first)
          });
          break;
        
        case "oldest":
          result.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateA - dateB;  // Sort in ascending order (oldest first)
          });
          break;
      
        // Uncomment and update other sort cases as needed
        // case "price-high":
        //   result.sort((a, b) => b.price - a.price);  // Sort by price descending
        //   break;
        // case "price-low":
        //   result.sort((a, b) => a.price - b.price);  // Sort by price ascending
        //   break;
        // case "rating":
        //   result.sort((a, b) => b.rating - a.rating);  // Sort by rating descending
        //   break;
      }
      

    // Calculate total pages
    setTotalPages(Math.ceil(result.length / coursesPerPage))

    // Reset to first page when filters change
    setCurrentPage(1)

    // Store filtered results
    setFilteredCourses(result)
  }, [courses, sortBy, category, rating, searchQuery])

//   useEffect(() => {
//     setLoading(true)
//     setFilteredCourses([...courses]);
//     console.log("FilteredCourses set to:", courses);
//     setLoading(false)
//   }, [courses]);

  // Get current page courses
  const getCurrentPageCourses = () => {
    const startIndex = (currentPage - 1) * coursesPerPage
    return filteredCourses.slice(startIndex, startIndex + coursesPerPage)
  }

  return {
    courses : getCurrentPageCourses(),
    setCourses,
    totalPages,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    category,
    setCategory,
    rating,
    setRating,
    searchQuery,
    setSearchQuery,
    loading,
    setLoading  // Return loading state
  }
}
