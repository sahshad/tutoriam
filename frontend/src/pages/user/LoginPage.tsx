import Header from "@/components/user/login/Header";
import LoginForm from "@/components/user/login/LoginForm";
import SignupForm from "@/components/user/login/SignupForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [signState, setSignState] = useState<"signIn" | "signUp">("signIn");
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
