import TutorApplicationForm from "@/components/tutor/becomeTutorForms/TutorApplicationForm"
import Header from "@/components/user/home/Header"

const TutorApplicationPage = () => {
  return (
      <div className=" pb-10">
        <Header/>
      <div className=" mt-10 mx-auto max-w-4xl">
        <div className="mb-8 text-left">
          <h1 className="text-2xl font-bold tracking-tight">Become a Instructor</h1>
          <p className="mt-2 text-muted-foreground text-sm">Fill out the form below to apply to join our tutoring team.</p>
        </div>
        <TutorApplicationForm />
      </div>
    </div>
  )
}

export default TutorApplicationPage