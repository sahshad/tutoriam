import Features from '@/components/user/becomeInstructor/Features'
import HeroSection from '@/components/user/becomeInstructor/HeroSection'
import Header from '@/components/user/home/Header'

const BecomeInstructorPage = () => {
  return (
    <main className="min-h-screen bg-white">
    <Header/>
        <HeroSection/>
        <Features/>
    </main>
  )
}

export default BecomeInstructorPage