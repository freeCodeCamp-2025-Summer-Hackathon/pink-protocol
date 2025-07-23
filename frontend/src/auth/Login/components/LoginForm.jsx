import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { loginUserSchema } from '../validation/schemas'

export const LoginForm = ({ onSubmit, submitting, apiError }) => {
  const [showPwd, setShowPwd] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginUserSchema) })

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          placeholder="artist@arthive.com"
          type="email"
          {...register('email')}
          className="h-11 w-full rounded-md border border-gray-200 bg-white/50 px-3 focus:border-yellow-400 focus:ring-yellow-400"
        />
        {errors.email && <p className="text-sm text-red-600">🍯 {errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            placeholder="Enter your password"
            type={showPwd ? 'text' : 'password'}
            {...register('password')}
            className="h-11 w-full rounded-md border border-gray-200 bg-white/50 px-3 pr-10 focus:border-yellow-400 focus:ring-yellow-400"
          />
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            type="button"
            onClick={() => setShowPwd((v) => !v)}
          >
            {showPwd ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-600">🍯 {errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
            type="checkbox"
          />
          Remember me
        </label>
        <Link
          className="text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:underline"
          to="/forgot-password"
        >
          Forgot password?
        </Link>
      </div>

      <button
        className="flex h-11 w-full items-center justify-center rounded-md bg-gradient-to-r from-yellow-500 to-orange-500 font-medium text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-[1.02] hover:from-yellow-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        disabled={submitting}
      >
        {submitting ? 'Buzzing you in…' : 'Sign In'}
      </button>

      {apiError && (
        <p className="mt-4 rounded bg-red-100 p-3 text-center text-sm text-red-700">{apiError}</p>
      )}
    </form>
  )
}
