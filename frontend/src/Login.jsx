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
  email: z.email('🍯 Invalid email format! Buzz buzz, try again.').nonempty('🍯 Email must bee filled!'),
  password: z.string().nonempty('🍯 Password must bee filled!'),
})

export const Login = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState('')
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
    setSuccess('')
    setIsSubmitting(true)

    try {
      await axios.post('/api/login', data)
      setSuccess('🐝 Welcome back to the hive! Buzzing you in...')
      setTimeout(() => {
        navigate('/dashboard')
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

  return (
    <div
      className={`relative min-h-screen transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-yellow-300 blur-xl"></div>
          <div className="absolute top-32 right-20 h-16 w-16 rounded-full bg-orange-300 blur-lg"></div>
          <div className="absolute bottom-20 left-1/4 h-24 w-24 rounded-full bg-amber-300 blur-xl"></div>
          <div className="absolute right-1/3 bottom-40 h-12 w-12 rounded-full bg-yellow-400 blur-md"></div>
        </div>
      </div>

      <div className="relative flex min-h-screen">
        <div className="relative hidden flex-col items-center justify-center p-12 lg:flex lg:w-1/2">
          <div className="max-w-md space-y-8 text-center">
            <div className="relative">
              <img
                alt="ArtHive Logo"
                className="mx-auto drop-shadow-lg"
                src="/logo.png"
                width={500}
              />
              <div className="absolute -top-4 -right-4 h-8 w-8 animate-pulse rounded-full bg-yellow-400"></div>
              <div className="absolute -bottom-2 -left-6 h-6 w-6 animate-pulse rounded-full bg-orange-400 delay-300"></div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-800">
                Welcome to the <span className="text-yellow-600">Hive</span>
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                Ready to buzz back into your creative sanctuary? Your artistic journey continues
                here.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="space-y-2 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <SwatchIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-600">Create Art</p>
              </div>
              <div className="space-y-2 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <UserGroupIcon className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-sm text-gray-600">Connect</p>
              </div>
              <div className="space-y-2 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <SparklesIcon className="h-6 w-6 text-amber-600" />
                </div>
                <p className="text-sm text-gray-600">Inspire</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
          <div className="w-full max-w-md rounded-2xl bg-white/80 p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-8 space-y-2 text-center">
              <div className="mb-4 lg:hidden">
                <img alt="ArtHive Logo" className="mx-auto" src="/logo.png" width={200} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
              <p className="text-gray-600">Sign in to continue your creative journey.</p>
            </div>

            {error && (
              <p className="mb-4 rounded-md bg-red-100 p-3 text-center text-sm text-red-700">
                {error}
              </p>
            )}

            {success && (
              <p className="mb-4 rounded-md bg-green-100 p-3 text-center text-sm text-green-700">
                {success}
              </p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="h-11 w-full rounded-md border border-gray-200 bg-white/50 px-3 focus:border-yellow-400 focus:ring-yellow-400"
                  id="email"
                  placeholder="artist@arthive.com"
                  type="email"
                  {...register('email')}
                />
                {errors.email && <p className="text-sm text-red-600">🍯 {errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="h-11 w-full rounded-md border border-gray-200 bg-white/50 px-3 pr-10 focus:border-yellow-400 focus:ring-yellow-400"
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <button
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">🍯 {errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    id="remember-me"
                    type="checkbox"
                  />
                  <label className="ml-2 text-sm text-gray-600" htmlFor="remember-me">
                    Remember me
                  </label>
                </div>
                <Link
                  className="text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:underline"
                  to="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                className="flex h-11 w-full items-center justify-center rounded-md bg-gradient-to-r from-yellow-500 to-orange-500 font-medium text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-[1.02] hover:from-yellow-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Buzzing you in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                New to the hive?{' '}
                <Link
                  className="font-medium text-yellow-600 hover:text-yellow-700 hover:underline"
                  to="/signup"
                >
                  Join the buzz!
                </Link>
              </p>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-center text-xs leading-relaxed text-gray-500">
                By signing in, you agree to our{' '}
                <Link className="text-yellow-600 hover:underline" to="/terms">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link className="text-yellow-600 hover:underline" to="/privacy">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
