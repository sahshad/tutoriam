import { useState, useEffect } from "react"
import { getMyCourses } from "@/services/instructorService"
import { Course } from "@/types/course"

interface useCoursesProps{
    role:string
}
export function useCourses({role}:useCoursesProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState("latest")
  const [category, setCategory] = useState("all")
  const [subCategory, setSubCategory] = useState("all")
  const [rating, setRating] = useState("4")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true) 

  const coursesPerPage = 1

  const fetchCoursesFromBackend = async () => {
    try {
      setLoading(true)
      const response = await getMyCourses({
        page: currentPage,
        limit: coursesPerPage,
        searchQuery,
        category,
        subCategory,
        sortBy,
      })

      console.log(response)
      setCourses(response.coursesWithPagination.courses)
      setTotalPages(response.coursesWithPagination.totalPages)  
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getCourses = async () => {
      try {
        if(role === 'instructor'){
             await fetchCoursesFromBackend()
        }else if(role === 'user'){       
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)}
    }
    getCourses()
  }, [sortBy, category, searchQuery, currentPage, subCategory])

  // useEffect(() => {
  //   let result = [...courses]
  //   console.log(courses)
  //   if (searchQuery) {
  //     result = result.filter((course) => 
  //       course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       course.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   }

  //   if (category !== "all") {
  //     result = result.filter((course) => course.category.toLowerCase() === category.toLowerCase())
  //   }

  //   // Filter by rating
  //   // const minRating = Number.parseInt(rating)
  //   // result = result.filter((course) => course.rating >= minRating)

  //   switch (sortBy) {
  //       case "latest":
  //         result.sort((a, b) => {
  //           const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
  //           const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
  //           return dateB - dateA;  
  //         });
  //         break;
        
  //       case "oldest":
  //         result.sort((a, b) => {
  //           const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
  //           const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
  //           return dateA - dateB;  
  //         });
  //         break;
  //       case "price-high":
  //         result.sort((a:any, b:any) => b.price - a.price);
  //         break;
  //       case "price-low":
  //         result.sort((a:any, b:any) => a.price - b.price); 
  //         break;
  //       case "rating":
  //         result.sort((a:any, b:any) => b.rating - a.rating); 
  //         break;
  //     }
      
  //   setTotalPages(Math.ceil(result.length / coursesPerPage))

  //   setCurrentPage(1)

  //   setFilteredCourses(result)
  // }, [courses, sortBy, category, rating, searchQuery])

  // useEffect(() => {
  //   setLoading(true)
  //   setFilteredCourses([...courses]);
  //   console.log("FilteredCourses set to:", courses);
  //   setLoading(false)
  // }, [courses]);

  // const getCurrentPageCourses = () => {
  //   const startIndex = (currentPage - 1) * coursesPerPage
  //   return filteredCourses.slice(startIndex, startIndex + coursesPerPage)
  // }

  return {
    courses ,
    setCourses,
    totalPages,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    rating,
    setRating,
    searchQuery,
    setSearchQuery,
    loading,
    setLoading  
  }
}
