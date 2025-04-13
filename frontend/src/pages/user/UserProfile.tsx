import Header from '@/components/user/home/header'
import ChangePassword from '@/components/user/profile/change-password'
import ProfileHeader from '@/components/user/profile/profile-header'
import ProfileNavigation from '@/components/user/profile/profile-navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if(!user){
      navigate("/login")
      return
    }
    if(user?.role === "instructor"){
      navigate("/instructor/dashboard")
    }

  },[user])
  return (
    <div className='pb-5'>
        <Header/>
        <div className='w-full'>
        <div className='px-[10%]'>
        <ProfileHeader/>
        <ProfileNavigation/>
        {/* <ChangePassword/> */}
        </div>
        </div>
    </div>
  )
}

export default UserProfile