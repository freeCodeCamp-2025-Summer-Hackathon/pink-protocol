import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUpUser } from '../services/signUpUser.js'

export const useSignUp = () => {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [apiSuccess, setApiSuccess] = useState(null)

  const submit = async (payload) => {
    setSubmitting(true)
    setApiError(null)
    setApiSuccess(null)

    try {
      const { httpCode } = await signUpUser(payload)

      if (httpCode === 200) {
        setApiSuccess("🐝 You're part of the buzz now. Let’s make art!")
        setTimeout(() => navigate('/login', { replace: true }), 2000)
      } else if (httpCode === 404) {
        setApiError('🐝 This email is already registered. Try buzzing in instead!')
      } else {
        setApiError('🐝 Missing or invalid fields—check your inputs!')
      }
    } catch {
      setApiError("🐝 Stung by a glitch! We couldn't register you.")
    } finally {
      setSubmitting(false)
    }
  }

  return { submit, submitting, apiError, apiSuccess }
}
