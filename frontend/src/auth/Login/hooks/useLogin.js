import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../../providers/AuthProvider/AuthProvider.jsx'
import { loginUser } from '../services/loginUser'

export const useLogin = () => {
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const submit = async (creds) => {
    setSubmitting(true)
    setApiError(null)
    try {
      const { access_token, user } = await loginUser(creds)
      login({ token: access_token, user })
      navigate('/', { replace: true })
    } catch (err) {
      const code = err?.response?.status
      if (code === 401) setApiError('🐝 Invalid credentials – give it another buzz!')
      else if (code === 422) setApiError('🐝 Missing or invalid fields – check your inputs!')
      else setApiError("🐝 Stung by a glitch! We couldn't log you in.")
    } finally {
      setSubmitting(false)
    }
  }

  return { submit, submitting, apiError }
}
