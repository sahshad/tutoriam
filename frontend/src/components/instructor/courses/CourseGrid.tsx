import type { Course } from "@/types/course"
import { CourseCard } from "./CourseCard"
import { useEffect } from "react"

interface CourseGridProps {
  courses: Course[]
}

export function CourseGrid({ courses }: CourseGridProps) {
    // useEffect(()=> {
    // },[courses])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course}  />
      ))}
    </div>
  )
}

