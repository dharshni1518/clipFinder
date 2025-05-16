"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "../components/auth/LoginForm"
import { useAuthContext } from "../context/AuthContext"

const LoginPage = () => {
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
      <LoginForm />
    </div>
  )
}

export default LoginPage
