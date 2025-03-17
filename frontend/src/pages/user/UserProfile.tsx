import Header from '@/components/user/home/Header'
import ChangePassword from '@/components/user/userProfile/ChangePassword'
import ProfileHeader from '@/components/user/userProfile/ProfileHeader'
import ProfileNavigation from '@/components/user/userProfile/ProfileNavigation'

const UserProfile = () => {
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