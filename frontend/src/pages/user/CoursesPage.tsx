import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { CoursePagination } from "@/components/courses/course-pagination"
// import { fetchCourses } from "@/lib/api"
import type { Course } from "@/types/course"
import { getAllCourses } from "@/services/courseService"
import { CourseSort } from "@/components/user/course/CourseSort"
import { CourseFilters } from "@/components/user/course/CourseFilter"
import { CourseGrid } from "@/components/user/course/CourseGrid"
import { CoursePagination } from "@/components/user/course/CoursePagination"
import Header from "@/components/user/home/Header"
// import { SuggestionTags } from "@/components/courses/suggestion-tags"
// import { CourseSort } from "@/components/courses/course-sort"

export default function UserCoursesPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCourses, setTotalCourses] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  const location = useLocation()
  const navigate = useNavigate()

  // Get category from query parameters using useLocation
  const category = new URLSearchParams(location.search).get("category") || ""

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true)
      try {
        // const { courses, total } = await fetchCourses({
        //   page: currentPage,
        //   category,
        //   search: searchQuery,
        // })
        const {courses, message} = await getAllCourses()
        console.log(courses)
        setCourses(courses)
        setTotalCourses(courses.length)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [currentPage, category, searchQuery])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    navigate({
      pathname: location.pathname,
      search: `?category=${category}&page=${page}&search=${searchQuery}`,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update query params for search
    navigate({
      pathname: location.pathname,
      search: `?category=${category}&page=1&search=${searchQuery}`,
    })
  }

  return (
    <>
    <Header/>
    <div className="container mx-auto px-[4%] py-8">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <form onSubmit={handleSearch}>
              <Input
                type="search"
                placeholder="Search for courses..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2 border-black" onClick={toggleFilter}>
              <Filter className="h-4 w-4" />
              Filter
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                
              </span>
            </Button>
            <CourseSort />
          </div>
        </div>

        {/* <SuggestionTags /> */}

        {!loading && searchQuery.length > 0 && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{totalCourses.toLocaleString()}</span> results found for "
            {searchQuery}"
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {isFilterOpen && (
          <div className="lg:col-span-1">
            <CourseFilters />
          </div>
        )}

        <div className={isFilterOpen ? "lg:col-span-3" : "lg:col-span-4"}>
          <CourseGrid courses={courses} loading={loading} isFilterOpen={isFilterOpen} />

          <div className="mt-8 flex justify-center">
            <CoursePagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalCourses / 12)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
