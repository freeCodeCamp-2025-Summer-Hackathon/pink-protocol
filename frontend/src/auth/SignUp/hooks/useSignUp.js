import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUpUser } from '../services/signUpUser.js'

export const useSignUp = () => {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [apiSuccess, setApiSuccess] = useState(null)

  const submit = async (formData) => {
    setSubmitting(true)
    setApiError(null)
    setApiSuccess(null)

    try {
      await signUpUser(formData)

      setApiSuccess("🐝 You're part of the buzz now. Let’s make art!")
      setTimeout(() => navigate('/login', { replace: true }), 2000)
    } catch (err) {
      const code = err?.response?.status

      if (code === 409) {
        setApiError('🐝 This email is already registered. Try buzzing in instead!')
      } else if (code === 422) {
        setApiError('🐝 Missing or invalid fields—check your inputs!')
      } else {
        setApiError("🐝 Stung by a glitch! We couldn't register you.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return { submit, submitting, apiError, apiSuccess }
}
