import { Course, FullCourse } from "@/types/course"
import { Clock, MessageSquare, Users, Eye, BookOpen, Languages, Menu, Grid, Gauge, ChartColumnStacked, ChartBarStacked } from "lucide-react"

// Dummy course data
const dummyCourse = {
  _id: "12345",
  title: "React for Beginners",
  description: "Learn the fundamentals of React and build dynamic web applications.",
  createdAt: new Date(),
  updatedAt: new Date(),
  thumbnail: "/placeholder.svg",
  rating: 4.5,
  ratingCount: 200,
  price: 1000,
  totalRevenue: 50000,
  category: "Web Development",
  subcategory: "React",
  instructors: [
    {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  lectureCount: 20, // Dummy data for lecture count
  lectureSize: "10 hours", // Dummy data for lecture size
  commentCount: 150, // Dummy data for total comments
  enrolledStudents: 3500, // Dummy data for students enrolled
  level: "Beginner", // Dummy data for course level
  language: "English", // Dummy data for course language
  attachmentCount: 5, // Dummy data for attachment count
  attachmentSize: "20MB", // Dummy data for attachment size
  duration: 12, // Dummy data for course duration in hours
  viewCount: 5000, // Dummy data for student views
}

interface CourseStatsProps {
  course: FullCourse
}


export function CourseStats({ course }: CourseStatsProps) {
    const getLessonsCount = () => {
        let lessonsCount = 0;
    
        course.modules?.forEach(module => {
          lessonsCount += module.lessons?.length || 0 
        });

        return lessonsCount
    }
    const stats = [
        {
            icon: <Menu className="h-5 w-5 text-gray-500" />,
            value: course.modules?.length,
            label: `Modues`,
          },
          {
            icon: <BookOpen className="h-5 w-5 text-gray-500" />,
            value: getLessonsCount(),
            label: `Lessons`,
        }
        ,
        {
            icon: <Users className="h-5 w-5 text-gray-500" />,
            value: course.enrollmentCount,
      label: "Students enrolled",
    },
        {
            icon: <Gauge className="h-5 w-5 text-gray-500" />,
            value: course.level,
            label: "Course level",
          },
          {
            icon: <Languages className="h-5 w-5 text-gray-500" />,
            value: course.language,
            label: "Course Language",
          },
         
          {
            icon: <Clock className="h-5 w-5 text-gray-500" />,
            value: course.duration, // Assuming formatDuration function exists
            label: "Hours",
          },
        {
            icon: <ChartColumnStacked className="h-5 w-5 text-gray-500" />,
            value: course.category?.toLocaleString(),
            label: "Category",
        },
    
    {
      icon: <ChartBarStacked className="h-5 w-5 text-gray-500" />,
      value: course.subCategory?.toLocaleString(),
      label: "Sub-Category",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className=" rounded-lg p-4 border flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full ">{stat.icon}</div>
          <div>
            <div className="font-bold text-lg">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        </div>
      ))}
    </>
  )
}

function formatDuration(duration: number) {
  const hours = Math.floor(duration);
  const minutes = Math.round((duration - hours) * 60);
  return `${hours}h ${minutes}m`;
}
