import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { courseService, type Lesson, type Module, type Course } from "@/lib/api/courseService"
import { FileText, Layers, CheckCircle } from "lucide-react"
import StepItem from "@/components/instructor/create_course/common/StepItem"
import { Sidebar } from "@/components/instructor/common/Sidebar"
import PageFooter from "@/components/instructor/common/Footer"
import PublishCourse, { PublishType } from "@/components/instructor/create_course/PublishCourse"
import Curriculum, { CurriculumType } from "@/components/instructor/create_course/Curriculum"
import AdvancedInformation, { AdvancedInformationType } from "@/components/instructor/create_course/AdvancedInformation"
import BasicInformation, { BasicInformationType } from "@/components/instructor/create_course/BasicInformation"
import PageHeader from "@/components/instructor/common/Header"


const CreateCoursePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean
    message: string
    courseId?: string
  } | null>(null)

  // Form state
  const [basicInformation, setBasicInformation] = useState<Partial<BasicInformationType>>({})
  const [advancedInformation, setAdvancedInformation] = useState<Partial<AdvancedInformationType>>({
    teachItems: [
      { id: 1, content: "" },

    ],
  })
  const [curriculum, setCurriculum] = useState<Partial<CurriculumType>>({})
  const [publish, setPublish] = useState<Partial<PublishType>>({})

  // Form submission handlers
  const handleBasicInfoSubmit = (data: BasicInformationType) => {
    setBasicInformation(data)
    setCurrentStep(2)
  }

  const handleAdvancedInfoSubmit = (data: AdvancedInformationType) => {
    setAdvancedInformation(data)
    setCurrentStep(3)
  }

  const handleCurriculumSubmit = (data: CurriculumType) => {
    setCurriculum(data)
    setCurrentStep(4)
  }

  const handlePublishSubmit = async (data: PublishType) => {
    setPublish(data)
    await publishCourse(data)
  }

  // API call sequence for publishing the course
  const publishCourse = async (publishData: PublishType) => {
    setIsSubmitting(true)
    setSubmissionStatus(null)

    try {
      // 1. Create all lessons first
      const modulePromises = curriculum.sections?.map(async (section:any) => {
        // Create all lessons for this section
        const lessonIds = await Promise.all(
          section.lectures?.map(async (lecture:any) => {
            const lesson: Lesson = {
              name: lecture.name,
              type: lecture.type,
              content: lecture.content,
              duration: lecture.duration,
            }
            return await courseService.createLesson(lesson)
          }) || [],
        )

        // Create the module with lesson IDs
        const module: Module = {
          name: section.name,
          lessons: lessonIds,
        }
        return await courseService.createModule(module)
      })

      // Wait for all modules to be created
      const moduleIds = await Promise.all(modulePromises || [])

      // 3. Create the course with module IDs
      const course: Course = {
        ...(basicInformation as BasicInformationType),
        ...(advancedInformation as AdvancedInformationType),
        ...publishData,
        modules: moduleIds,
        isPublic: publishData.isPublic ?? false,
      }

      const courseId = await courseService.createCourse(course)

      setSubmissionStatus({
        success: true,
        message: "Course created successfully!",
        courseId,
      })
    } catch (error) {
      console.error("Error publishing course:", error)
      setSubmissionStatus({
        success: false,
        message: "Failed to create course. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background" >
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader />

        <main className="flex-1 overflow-y-auto p-6 pb-16 ">
          <Card className="mb-6 px-5 py-2">
            <CardContent className="p-0 ">
              <div className="flex flex-row  p-0">
                <StepItem
                  icon={<Layers className="h-3 w-3" />}
                  title="Basic Information"
                  isActive={currentStep === 1}
                  isCompleted={currentStep > 1}
                />
                <StepItem
                  icon={<FileText className="h-3 w-3" />}
                  title="Advance Information"
                  isActive={currentStep === 2}
                  isCompleted={currentStep > 2}
                />
                <StepItem
                  icon={<Layers className="h-3 w-3" />}
                  title="Curriculum"
                  isActive={currentStep === 3}
                  isCompleted={currentStep > 3}
                />
                <StepItem
                  icon={<CheckCircle className="h-3 w-3" />}
                  title="Publish Course"
                  isActive={currentStep === 4}
                  isCompleted={currentStep > 4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Advance Information"}
              {currentStep === 3 && "Course Curriculum"}
              {currentStep === 4 && "Publish Course"}
            </h2>
          </div>

          {/* Submission Status */}
          {submissionStatus && (
            <div
              className={`mb-6 p-4 rounded-md ${submissionStatus.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
            >
              <p className="font-medium">{submissionStatus.message}</p>
              {submissionStatus.courseId && <p className="text-sm mt-1">Course ID: {submissionStatus.courseId}</p>}
            </div>
          )}

          {/* Form Sections */}
          {currentStep === 1 && (
            <BasicInformation
              defaultValues={basicInformation}
              onSubmit={handleBasicInfoSubmit}
              onCancel={() => {}}
            />
          )}

          {currentStep === 2 && (
            <AdvancedInformation
              defaultValues={advancedInformation}
              onSubmit={handleAdvancedInfoSubmit}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <Curriculum
              defaultValues={curriculum}
              onSubmit={handleCurriculumSubmit}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <PublishCourse
              defaultValues={publish}
              onSubmit={handlePublishSubmit}
              onBack={() => setCurrentStep(3)}
            />
          )}

          {/* <PageFooter /> */}
        </main>
      </div>
    </div>
  )
}

export default CreateCoursePage