import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { saveAuth } from '../../../_lib/authStore'
import { loginUser } from '../services/loginUser'

export const useLogin = () => {
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [apiSuccess, setApiSuccess] = useState(null)
  const navigate = useNavigate()

  const submit = async (creds) => {
    setSubmitting(true)
    setApiError(null)
    setApiSuccess(null)

    try {
      const { access_token, user } = await loginUser(creds)
      saveAuth({ token: access_token, user })
      setApiSuccess('🐝 Welcome back! You’ve successfully logged in.')
      setTimeout(() => navigate('/', { replace: true }), 1500)
    } catch (err) {
      const code = err?.response?.status
      if (code === 401) {
        setApiError('🐝 Invalid credentials – give it another buzz!')
      } else if (code === 422) {
        setApiError('🐝 Missing or invalid fields – check your inputs!')
      } else {
        setApiError("🐝 Stung by a glitch! We couldn't log you in.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return { submit, submitting, apiError, apiSuccess }
}
