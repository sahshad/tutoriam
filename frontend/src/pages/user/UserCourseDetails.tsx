import { useEffect, useState } from "react"
import type { Course, FullCourse } from "@/types/course"

import { CurriculumType } from "@/lib/validations/course"
import CourseHeader from "@/components/user/course-details/CourseHeader"
import CoursePreview from "@/components/user/course-details/CoursePreview"
import CourseTabs from "@/components/user/course-details/CourseTab"
import CourseDescription from "@/components/user/course-details/CourseDescription"
import CourseCurriculum from "@/components/user/course-details/CourseCurriculum"
import CourseInstructor from "@/components/user/course-details/CourseInstructor"
import CourseReviews from "@/components/user/course-details/CourseReviews"
import CourseSidebar from "@/components/user/course-details/CourseSidebar"
import { useNavigate, useParams } from "react-router-dom"
import { getCourseById } from "@/services/courseService"
import Header from "@/components/user/home/Header"

interface CourseDetailsPageProps {
  course: FullCourse
}



function createCurriculumType(data: any): CurriculumType {
  console.log(data.modules[0].lessons[0].description)
  return {
        sections: data.modules.map((module: any) => ({
            description: module.description,
            id: module._id,
            name: module.title,
            lectures: module.lessons.map((lesson: any) => ({
                type: lesson.type === "video" ? "video" : "file", // Assuming 'type' could be 'video' or 'file'
                description: lesson.description,
                id: lesson._id,
                name: lesson.title,
                isExpanded: false, // Assuming all lectures start not expanded, can be changed later
                duration: lesson.duration,
                content: lesson.content, // If lesson contains content as a file
              })),
        })),
    };
}

export default function UserCourseDetailsPage() {

  const { courseId } = useParams()
  const [course, setCourse] = useState<FullCourse | null>(null)
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "instructor" | "review">("overview")
const navigate = useNavigate()

    useEffect(() => {
      if(!courseId){
          navigate("/courses")
          return
      }
      const fetchCourse = async () => {
        try {
          const res = await getCourseById(courseId); 
          console.log(res.data)
          setCourse(res.data as Course);
        } catch (error) {
          console.error("Failed to fetch course:", error);
          navigate("/courses");
        } finally {
          setLoading(false);
        }
      };
  
      fetchCourse();
    }, [courseId, navigate]);

    if(loading){
        return <div></div>
    }

    if(!course){
        return null
    }

  return (
    <>
    <Header/>
    <div className="container mx-auto px-[4%] py-8">
      <div className="mb-8">
        <CourseHeader
          title={course.title as string}
          subtitle={course.subtitle as string}
          rating={course.rating as number}
          reviewCount={0}
          instructor={course.instructorId}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CoursePreview thumbnailUrl={course.thumbnail as string} />

          <div className="mt-8">
            <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="mt-6 rounded-lg border p-6">
              {activeTab === "overview" && <CourseDescription description={Array.isArray(course.description) ? course.description : []} />}
              {activeTab === "curriculum" && <CourseCurriculum curriculum={createCurriculumType(course)} />}
              {activeTab === "instructor" && <CourseInstructor instructor={course.instructorId} />}
              {activeTab === "review" && <CourseReviews reviews={course.rating} rating={course.rating as number} />}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <CourseSidebar
            price={course.price }
            duration={course.duration}
            level={course.level}
            studentsEnrolled={course.enrollmentCount}
            language={course.language}
          />
        </div>
      </div>
    </div>
  </>
  )
}

