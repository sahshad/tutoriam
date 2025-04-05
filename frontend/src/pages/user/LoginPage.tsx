import Header from "@/components/user/login/login-header";
import LoginForm from "@/components/user/login/login-form";
import SignupForm from "@/components/user/login/signup-form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


const LoginPage = () => {

  const location = useLocation();
  const formState = location.state?.formState || 'signIn';
  const [signState, setSignState] = useState<"signIn" | "signUp">(formState === "signIn" ? "signIn" : "signUp");
  const user = useSelector((state:any) => state.auth.user)
  const [loading, setLoading] = useState<boolean>(true)
  const isAdmin = localStorage.getItem("adminLoggedIn")
  const navigate = useNavigate()
  useEffect(()=>{
    if(user && !isAdmin){
      navigate('/')
    }else{
      setLoading(false)
    }
  },[])
  if(loading){
    return <div></div>
  }
  return (
    <div>
      <Header signState={signState} setSignState={setSignState} />
      <div className="flex flex-row w-full ">
        <div className="w-1/2 hidden justify-end items-center md:flex  ">
          <img src="/login_image.png" alt=""  className="h-[400px] fixed top-[150px]" />
        </div>
        <div className={` px-6 pt-3 md:p-6 ${signState === "signUp" && "md:pt-3 md:pb-0"} md:w-1/2 w-full `}>
          {signState === "signIn" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
