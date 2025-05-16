"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import RegisterForm from "../components/auth/RegisterForm"
import { useAuthContext } from "../context/AuthContext"

const RegisterPage = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="auth-page">
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
