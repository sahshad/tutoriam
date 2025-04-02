import React from "react"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom" // Replaced next/link with react-router-dom

import type { Course } from "@/types/course" // Assuming this is the type for course data

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const { _id, title, thumbnail, price, category, rating, enrollmentCount } = course

  return (
    <Link to={`/courses/${_id}`} className="group flex h-full flex-col overflow-hidden rounded-lg border transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        {/* Replaced next/image with standard <img> */}
        <img
          src={thumbnail || "/placeholder.svg"} // Default to placeholder image if no thumbnail
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <Badge
            variant="outline"
            className={cn("border-0 px-2 py-0.5 text-xs font-medium uppercase")}
          >
            {category}
          </Badge>
        </div>
        <h3 className="mb-2 line-clamp-2 flex-1 font-medium leading-tight">{title}</h3>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({enrollmentCount?.toLocaleString()} students)</span>
          </div>
          <div className="text-lg font-bold ">
  {Number(price) === 0 ? "Free" : `₹${price}`}
</div>
        </div>
      </div>
    </Link>
  )
}
