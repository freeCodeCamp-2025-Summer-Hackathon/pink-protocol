import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { loginUser } from '../services/loginUser'

export const useLogin = () => {
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)
  const navigate = useNavigate()

  const submit = async (payload) => {
    setSubmitting(true)
    setApiError(null)

    try {
      await loginUser(payload)
      navigate('/', { replace: true })
    } catch (err) {
      const code = err?.response?.status
      if (code === 404) {
        setApiError('🐝 Account not found - check your email!')
      } else if (code === 409) {
        setApiError('🐝 Incorrect password - give it another buzz!')
      } else {
        setApiError("🐝 Stung by a glitch! We couldn't log you in.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return { submit, submitting, apiError }
}
