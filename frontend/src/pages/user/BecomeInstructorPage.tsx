import Features from '@/components/tutor/becomeInstructor/Features'
import HeroSection from '@/components/tutor/becomeInstructor/HeroSection'
import Header from '@/components/user/home/Header'
import React from 'react'

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