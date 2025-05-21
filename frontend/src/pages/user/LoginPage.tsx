"use client"

import Header from "@/components/user/login/login-header"
import LoginForm from "@/components/user/login/login-form"
import SignupForm from "@/components/user/login/signup-form"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const LoginPage = () => {
  const location = useLocation()
  const formState = location.state?.formState || "signIn"
  const [signState, setSignState] = useState<"signIn" | "signUp">(formState === "signIn" ? "signIn" : "signUp")
  const user = useSelector((state: any) => state.auth.user)
  const [loading, setLoading] = useState<boolean>(true)
  const isAdmin = localStorage.getItem("adminLoggedIn")
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !isAdmin) {
      navigate("/")
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <div></div>
  }

  return (
    <div className="min-h-screen ">
      <Header signState={signState} setSignState={setSignState} />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="relative">
              <div className="absolute inset-0 opacity-20 -z-10 "></div>
              <div className="border rounded-2xl overflow-hidden">
                <div className="p-8">
                  <motion.div
                    key={signState}
                    initial={{ opacity: 0, x: signState === "signIn" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {signState === "signIn" ? <LoginForm /> : <SignupForm />}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 text-center"
          >
          </motion.div>

          {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block w-full h-24"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-violet-100 dark:fill-slate-700 opacity-20"
              ></path>
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
