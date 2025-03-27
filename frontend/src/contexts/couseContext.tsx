import { createContext, useContext, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import {
  type BasicInformationType,
  type AdvanceInformationType,
  type CurriculumType,
  type PublishType,
  basicInformationSchema,
  advanceInformationSchema,
  curriculumSchema,
  publishSchema,
} from "@/lib/validations/course"

type CourseContextType = {
  currentStep: number
  basicInformation: Partial<BasicInformationType>
  advanceInformation: Partial<AdvanceInformationType>
  curriculum: Partial<CurriculumType>
  publish: Partial<PublishType>

  setCurrentStep: (step: number) => void
  updateBasicInformation: (data: Partial<BasicInformationType>) => void
  updateAdvanceInformation: (data: Partial<AdvanceInformationType>) => void
  updateCurriculum: (data: Partial<CurriculumType>) => void
  updatePublish: (data: Partial<PublishType>) => void

  goToNextStep: () => Promise<boolean>
  goToPreviousStep: () => void

  validateCurrentStep: () => Promise<boolean>
}

const CourseContext = createContext<CourseContextType | undefined>(undefined)

export function CourseProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate() 
  const [currentStep, setCurrentStep] = useState(1)

  const [basicInformation, setBasicInformation] = useState<Partial<BasicInformationType>>({})
  const [advanceInformation, setAdvanceInformation] = useState<Partial<AdvanceInformationType>>({
    teachItems: [
      { id: 1, content: "" },
      { id: 2, content: "" },
      { id: 3, content: "" },
      { id: 4, content: "" },
    ],
  })
  const [curriculum, setCurriculum] = useState<Partial<CurriculumType>>({
    sections: [
      {
        id: "section-1",
        name: "Section name",
        lectures: [
          {
            id: "lecture-1",
            name: "Lecture name",
            type: "video",
            content: "",
            isExpanded: false,
          },
          {
            id: "lecture-2",
            name: "Lecture name",
            type: "video",
            content: "",
            isExpanded: false,
          },
        ],
      },
    ],
  })
  const [publish, setPublish] = useState<Partial<PublishType>>({})

  const updateBasicInformation = (data: Partial<BasicInformationType>) => {
    setBasicInformation((prev) => ({ ...prev, ...data }))
  }

  const updateAdvanceInformation = (data: Partial<AdvanceInformationType>) => {
    setAdvanceInformation((prev) => ({ ...prev, ...data }))
  }

  const updateCurriculum = (data: Partial<CurriculumType>) => {
    setCurriculum((prev) => ({ ...prev, ...data }))
  }

  const updatePublish = (data: Partial<PublishType>) => {
    setPublish((prev) => ({ ...prev, ...data }))
  }

  const validateCurrentStep = async (): Promise<boolean> => {
    try {
      switch (currentStep) {
        case 1:
          await basicInformationSchema.parseAsync(basicInformation)
          return true
        case 2:
          await advanceInformationSchema.parseAsync(advanceInformation)
          return true
        case 3:
          await curriculumSchema.parseAsync(curriculum)
          return true
        case 4:
          await publishSchema.parseAsync(publish)
          return true
        default:
          return false
      }
    } catch (error) {
      return false
    }
  }

  const goToNextStep = async (): Promise<boolean> => {
    const isValid = await validateCurrentStep()

    if (isValid) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)

        switch (currentStep + 1) {
          case 1:
            navigate("/create-course")
            break
          case 2:
            navigate("/create-course/advance-information")
            break
          case 3:
            navigate("/create-course/curriculum")
            break
          case 4:
            navigate("/create-course/publish")
            break
        }

        return true
      }
    }

    return false
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)

      switch (currentStep - 1) {
        case 1:
          navigate("/create-course")
          break
        case 2:
          navigate("/create-course/advance-information")
          break
        case 3:
          navigate("/create-course/curriculum")
          break
      }
    }
  }

  return (
    <CourseContext.Provider
      value={{
        currentStep,
        basicInformation,
        advanceInformation,
        curriculum,
        publish,
        setCurrentStep,
        updateBasicInformation,
        updateAdvanceInformation,
        updateCurriculum,
        updatePublish,
        goToNextStep,
        goToPreviousStep,
        validateCurrentStep,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

export function useCourse() {
  const context = useContext(CourseContext)

  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider")
  }

  return context
}
