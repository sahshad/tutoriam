import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Course } from "@/types/course"

interface CourseRatingProps {
  course: Course
}

export function CourseRating({ course }: CourseRatingProps) {
  const ratingDistribution = [
    { stars: 5, percentage: 67, label: "5 Star" },
    { stars: 4, percentage: 27, label: "4 Star" },
    { stars: 3, percentage: 5, label: "3 Star" },
    { stars: 2, percentage: 1, label: "2 Star" },
    { stars: 1, percentage: 0, label: "1 Star" },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Overall Course Rating</CardTitle>
        <Select defaultValue="week">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="This week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
            <SelectItem value="year">This year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className=" p-6 rounded-lg text-center flex-shrink-0">
            <div className="text-4xl font-bold">{course.rating?.toFixed(1)}</div>
            <div className="flex justify-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(course.rating ?? 0) ? "text-black fill-black" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-2">Overall Rating</div>
          </div>

          <div className="flex-1">
            <div className="h-[100px] mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                  <path
                    d="M0,50 C50,30 100,70 150,50 C200,30 250,70 300,50 C350,30 400,70 400,50"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <div className="flex w-24 items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < item.stars ? "text-black fill-black" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="text-xs font-medium w-8">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

