import OtpVerification from '@/components/user/otp/OtpVerificaion'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpPage = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    if(!location.state){
      navigate("/login")
    }else{
      setLoading(false)
    }
  },[])
  if(loading){
    return <div></div>
  }
  return (
    <div>
        <div className="flex min-h-screen flex-col">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">TUTORIAM</h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {location.state && 
        <OtpVerification length={data.length} initialTimerSeconds={data.time} email={data.email} />}
      </div>
    </div>
    </div>
  )
}

export default OtpPage