import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../logo/Logo.png' // Adjust the path as necessary

const SignUp = () => {
  const [formData, setFormData] = useState({
    email_address: '',
    username: '',
    password: '',
    confirm_password: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setVisible(true)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    if (
      !formData.email_address ||
      !formData.username ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setError(
        <span>
          🍯 Every field must <em>bee</em> filled!
        </span>
      )
      setIsSubmitting(false)
      return
    }

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,16}$/
    if (!passwordRegex.test(formData.password)) {
      setError(
        <span>
          🍯 Don&apos;t get kicked from the hive — your password needs some sting:
          <strong>8-16 characters, uppercase, lowercase, number, and a symbol.</strong>
        </span>
      )
      setIsSubmitting(false)
      return
    }

    if (formData.password !== formData.confirm_password) {
      setError(
        <span>
          🍯 Passwords must match — <em>we can&apos;t have rebels in the hive.</em>
        </span>
      )
      setIsSubmitting(false)
      return
    }

    try {
      await axios.post('/api/signup', formData)
      setSuccess("🐝 You're part of the buzz now. Let's make some art!")
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch {
      setError("🐝 Stung by a glitch! We couldn't complete your registration.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`flex h-auto w-full flex-row items-center justify-center transition-all duration-500 ease-in-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
    >
      <div className="flex items-center justify-center p-2">
        <img alt="Logo" className="h-auto w-[500px]" src={logo} />
      </div>
      <div className="flex h-auto max-w-md flex-col items-center justify-center rounded-xl border-2 border-black [box-shadow:0_4px_10px_rgba(0,_0,_0,_0.1)]">
        <h2 className="mt-8 mb-8 text-center text-[2rem] underline">Sign Up</h2>
        {error && <p className="pr-8 pl-8 text-justify text-[1rem] text-[#8A1538]">{error}</p>}
        {success && <p className="pr-8 pl-8 text-justify text-[1rem] text-[#27AE60]">{success}</p>}
        <form className="w-full space-y-6 p-8" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email_address">Email Address:</label>
            <input
              className="box-border w-full rounded-xl border border-black p-[0.8rem] text-[1rem] transition-[border-color,box-shadow] duration-500 ease-in-out focus:border-2 focus:border-[#5e4f8d] focus:shadow-[0_0_8px_rgba(94,79,141,0.5)] focus:outline-none"
              id="email_address"
              name="email_address"
              placeholder="jane.doe@email.com"
              type="email"
              value={formData.email_address}
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className="box-border w-full rounded-xl border border-black p-[0.8rem] text-[1rem] transition-[border-color,box-shadow] duration-500 ease-in-out focus:border-2 focus:border-[#5e4f8d] focus:shadow-[0_0_8px_rgba(94,79,141,0.5)] focus:outline-none"
              id="username"
              name="username"
              placeholder="jane_doe"
              type="text"
              value={formData.username}
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="mb-1 block" htmlFor="password">
              Password:
            </label>
            <div className="relative">
              <input
                className="box-border w-full rounded-xl border border-black p-[0.8rem] text-[1rem] transition-[border-color,box-shadow] duration-500 ease-in-out focus:border-2 focus:border-[#5e4f8d] focus:shadow-[0_0_8px_rgba(94,79,141,0.5)] focus:outline-none"
                id="password"
                name="password"
                placeholder="Secrethivecode@123"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                required
                onChange={handleChange}
              />
              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 transform"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeIcon className="h-6 w-6 text-black" />
                ) : (
                  <EyeSlashIcon className="h-6 w-6 text-black" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirm_password"> Confirm Password:</label>
            <input
              className="box-border w-full rounded-xl border border-black p-[0.8rem] text-[1rem] transition-[border-color,box-shadow] duration-500 ease-in-out focus:border-2 focus:border-[#5e4f8d] focus:shadow-[0_0_8px_rgba(94,79,141,0.5)] focus:outline-none"
              id="confirm_password"
              name="confirm_password"
              type="password"
              value={formData.confirm_password}
              required
              onChange={handleChange}
            />
          </div>
          <button
            className="w-full cursor-pointer rounded-lg border-none bg-[#5e4f8d] p-[0.8rem] text-[1.1rem] text-white transition-[background-color,transform,box-shadow] duration-2000 ease-in-out hover:scale-[1.05] hover:bg-[#7b6ebf] hover:shadow-lg"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>
        <a
          className="mb-8 block text-center text-sm text-[#5e4f8d] underline hover:opacity-80 dark:text-[#D4AF37]"
          href="/login"
        >
          Already part of the hive? Log in here!{' '}
        </a>
      </div>
    </div>
  )
}

export default SignUp
