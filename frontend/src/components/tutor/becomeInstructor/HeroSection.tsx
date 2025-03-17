import { Button } from '@/components/ui/button'
import { Award, Building, CheckCircle, GlobeIcon, UserIcon } from 'lucide-react'
import bannerImage from '/become_instructor_banner.png'

const HeroSection = () => {
  return (
    <>
    <section className="container mx-auto px-[6%] py-12 md:py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Become an Instructor</h1>
            <p className="text-md text-gray-700">
              Become an instructor & start teaching with 26k certified instructors. Create a success story with 67.1k
              Students — Grow yourself with 71 countries.
            </p>
            <Button className=" px-8 py-6 rounded-md text-lg font-medium">
              Get Started
            </Button>
          </div>
          <div className="flex justify-center md:justify-center">
            <img
              src={bannerImage}
              alt="Excited instructor with notebook and pencil"
              className="max-w-full h-[400px]"
            />
          </div>
        </div>
      </section>

<section className="bg-[#e4e4e4] py-8">
<div className="container mx-auto px-[5%]">
  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
    <StatItem icon={<UserIcon />} value="67.1k" label="Students" />
    <StatItem icon={<Award />} value="26k" label="Certified Instructor" />
    <StatItem icon={<GlobeIcon />} value="72" label="Country Language" />
    <StatItem icon={<CheckCircle />} value="99.9%" label="Success Rate" />
    <StatItem icon={<Building />} value="57" label="Trusted Companies" />
  </div>
</div>
</section>
</>
  )
}

const StatItem: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
    <div className="flex flex-col items-center">
      <div className='flex gap-2'>
      <div className="text-[#FF6636] mb-2 w-">{icon}</div>
      <div className="text-sm font-bold text-gray-900">{value}</div>
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )

export default HeroSection