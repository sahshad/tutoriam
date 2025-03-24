import Header from '@/components/user/home/Header'
import ChangePassword from '@/components/user/userProfile/ChangePassword'
import ProfileHeader from '@/components/user/userProfile/ProfileHeader'
import ProfileNavigation from '@/components/user/userProfile/ProfileNavigation'
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
        <ChangePassword/>
        </div>
        </div>
    </div>
  )
}

export default UserProfile