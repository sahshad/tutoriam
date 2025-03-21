import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { type FormValues, formSchema, defaultValues } from "@/lib/becomeTutorFormShemas"
import SubmissionSuccess from "./sections/SubmissionSuccess"
import PersonalInfoSection from "./sections/PersonalInfoSection"
import EducationInfoSecion from "./sections/EducationInfoSecion"
import ExperienceInfoSection from "./sections/ExperienceInfoSection"
import SkillsInfoSection from "./sections/SkillsInfoSection"
import BioSection from "./sections/BioSection"
import { sendInstructorApplication } from "@/services/userServices"
import { useSelector } from "react-redux"

const TutorApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0) 

  const user = useSelector((state: any) => state.auth.user);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  const sections = [
    { component: <EducationInfoSecion control={form.control} />, fields: ['education.highestDegree', 'education.institution', 'education.graduationYear', 'education.fieldOfStudy'] as const },
    { component: <ExperienceInfoSection control={form.control} />, fields: ['experience', 'currentOccupation'] as const},
    { component: <SkillsInfoSection control={form.control} />, fields: ['skills', 'preferredSubjects', 'teachingLanguages'] as const },
    { component: <BioSection control={form.control} />, fields: ['bio'] as const },
    { component: <PersonalInfoSection control={form.control} />, fields: ['currentOccupation'] as const },
  ]

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    const formData = new FormData()

    if (data.idCardImage) {
      formData.append("idCardImage", data.idCardImage)
    }

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof FormValues]
      
      if (typeof value === "object" && value !== null) {
        Object.keys(value).forEach((subKey) => {
          formData.append(`${key}[${subKey}]`, value[subKey as keyof typeof value])
        })
      } else {
        formData.append(key, value as string | Blob)
      }
    })


    const resposne = await sendInstructorApplication(user._id,formData)
    
    console.log(resposne)
    setIsSubmitting(false)
    setIsSubmitted(true)

  }

  const nextStep = async () => {
    const currentSection = sections[currentStep]
    const isValid = await form.trigger(currentSection.fields) 
    if (isValid) {
      form.clearErrors(currentSection.fields);
      if (currentStep < sections.length - 1) {
        setCurrentStep((prev) => prev + 1)
      }
    }
  }


  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  if (isSubmitted) {
    return <SubmissionSuccess onReset={() => setIsSubmitted(false)} />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">

      <div className="flex space-x-2 mb-7">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`flex-1 md:w-[60px]  h-[3px] rounded-full ${
                currentStep >= index
                  ? "bg-black"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {sections[currentStep].component}


        <div className="fixed bottom-0 left-0 right-0 px-50 pb-5 bg-white p-4 shadow-md z-10">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <Button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="w-auto"
              >
                <ChevronLeft/>
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={currentStep === sections.length - 1}
                className="w-auto"
              >
                <ChevronRight/>
              </Button>
            </div>

            {currentStep === sections.length - 1 && (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}

export default TutorApplicationForm
