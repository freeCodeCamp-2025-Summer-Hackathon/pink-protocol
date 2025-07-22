import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { signupUserSchema } from '../validation/schemas.js'

export const SignUpForm = ({ onSubmit, submitting, apiError, apiSuccess }) => {
  const [showPwd, setShowPwd] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupUserSchema) })

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          className="h-11 w-full rounded-md border border-gray-200 bg-white/50 px-3 focus:border-yellow-400 focus:ring-yellow-400"
          id="name"
          placeholder="Jane Bee"
          type="text"
          {...register('name')}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

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
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="username">
          Username
        </label>
        <input
          className="h-11 w-full rounded-md border border-gray-200 bg-white/50 px-3 focus:border-yellow-400 focus:ring-yellow-400"
          id="username"
          placeholder="artist123"
          type="text"
          {...register('username')}
        />
        {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            className="h-11 w-full rounded-md border border-gray-200 bg-white/50 px-3 pr-10 focus:border-yellow-400 focus:ring-yellow-400"
            id="password"
            placeholder="SecretHive@123"
            type={showPwd ? 'text' : 'password'}
            {...register('password')}
          />
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            type="button"
            onClick={() => setShowPwd((v) => !v)}
          >
            {showPwd ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="confirm_password">
          Confirm Password
        </label>
        <input
          className="h-11 w-full rounded-md border border-gray-200 bg-white/50 px-3 focus:border-yellow-400 focus:ring-yellow-400"
          id="confirm_password"
          placeholder="Confirm your password"
          type={showPwd ? 'text' : 'password'}
          {...register('confirm_password')}
        />
        {errors.confirm_password && (
          <p className="text-sm text-red-600">{errors.confirm_password.message}</p>
        )}
      </div>

      <button
        className="flex h-11 w-full items-center justify-center rounded-md bg-gradient-to-r from-yellow-500 to-orange-500 font-medium text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-[1.02] hover:from-yellow-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        disabled={submitting}
        type="submit"
      >
        {submitting ? 'Creating Account…' : 'Sign Up'}
      </button>

      {apiError && (
        <p className="mt-4 rounded bg-red-100 p-3 text-center text-sm text-red-700">{apiError}</p>
      )}
      {apiSuccess && (
        <p className="mt-4 rounded bg-green-100 p-3 text-center text-sm text-green-700">
          {apiSuccess}
        </p>
      )}
    </form>
  )
}
