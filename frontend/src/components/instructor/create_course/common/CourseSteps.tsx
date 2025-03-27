import { FileText, Layers, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useCourse } from "@/contexts/couseContext"
import StepItem from "./StepItem"

interface CourseStepsProps {
  currentStep: number}

const  CourseSteps = ({currentStep}:CourseStepsProps) => {
//   const { currentStep } = useCourse()

  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <StepItem
            icon={<Layers className="h-5 w-5" />}
            title="Basic Information"
            isActive={currentStep === 1}
            isCompleted={currentStep > 1}
          />
          <StepItem
            icon={<FileText className="h-5 w-5" />}
            title="Advance Information"
            isActive={currentStep === 2}
            isCompleted={currentStep > 2}
            progress={currentStep === 2 ? "7/12" : undefined}
          />
          <StepItem
            icon={<Layers className="h-5 w-5" />}
            title="Curriculum"
            isActive={currentStep === 3}
            isCompleted={currentStep > 3}
            progress={currentStep === 3 ? "7/12" : undefined}
          />
          <StepItem
            icon={<CheckCircle className="h-5 w-5" />}
            title="Publish Course"
            isActive={currentStep === 4}
            isCompleted={currentStep > 4}
            progress={currentStep === 4 ? "7/12" : undefined}
          />
        </div>
      </CardContent>
    </Card>
  )
}


export default CourseSteps