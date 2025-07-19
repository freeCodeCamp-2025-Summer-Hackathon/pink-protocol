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

  
}

export default Login