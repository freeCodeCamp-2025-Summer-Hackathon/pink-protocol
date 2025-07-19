import {
  EyeIcon,
  EyeSlashIcon,
  SwatchIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { z } from 'zod'

const loginUserSchema = z.object({
  email: z.email('Invalid email format').nonempty('Email is required!'),
  password: z.string().nonempty('Password is required!'),
})

export const Login = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const onSubmit = async (data) => {
    setError(null)
    setSuccess("")
    setIsSubmitting(true)

    try {
      await axios.post("/api/login", data)
      setSuccess("🐝 Welcome back to the hive! Buzzing you in...")
      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(`🐝 ${err.response.data.error}`)
      } else {
        setError("🐝 Stung by a glitch! We couldn't log you in.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

}

export default Login