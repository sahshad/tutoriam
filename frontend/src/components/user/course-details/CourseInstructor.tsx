import { Star } from "lucide-react"

interface CourseInstructorProps {
  instructor: any
}

export default function CourseInstructor({ instructor }: CourseInstructorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">About the Instructor</h2>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-shrink-0">
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            <img src={instructor.avatar || "/placeholder.svg"} alt={instructor.name}  className="object-cover" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">{instructor.name}</h3>
          <p className="text-sm text-muted-foreground">{instructor.title}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm">{instructor.rating} Instructor Rating</span>
            </div>
            <div className="text-sm text-muted-foreground">{instructor.reviews.toLocaleString()} Reviews</div>
            <div className="text-sm text-muted-foreground">{instructor.students.toLocaleString()} Students</div>
            <div className="text-sm text-muted-foreground">{instructor.courses} Courses</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">About</h4>
        <p className="text-muted-foreground">{instructor.bio}</p>
      </div>
    </div>
  )
}

