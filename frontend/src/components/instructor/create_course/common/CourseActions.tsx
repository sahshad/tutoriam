import { Button } from "@/components/ui/button"
import { useCourse } from "@/contexts/couseContext"

interface CourseActionsProps {
  showSave?: boolean
}


const CourseActions = ({ showSave = true }: CourseActionsProps) => {
  const { goToPreviousStep, goToNextStep } = useCourse()

  return (
    <div className="flex justify-between">
      <Button variant="outline" onClick={goToPreviousStep}>
        Previous
      </Button>
      <Button onClick={goToNextStep}>Save & Next</Button>
    </div>
  )
}


export default CourseActions