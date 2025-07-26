import { useState } from 'react'

import { createPost } from '../services/createPost.js'

export const useUpload = () => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)

  const submit = async ({ title, caption, file, published = true }) => {
    setSubmitting(true)
    setError(null)
    setProgress(0)
    try {
      return await createPost({ title, caption, published, file }, (e) => {
        if (e?.total) setProgress(Math.round((e.loaded * 100) / e.total))
      })
    } catch (err) {
      const code = err?.response?.status
      if (code === 413) setError('🐝 File too large.')
      else if (code === 422) setError('🐝 Missing or invalid fields.')
      else if (code === 401) setError('🐝 Please sign in to upload.')
      else setError('🐝 Upload failed. Try again.')
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  return { submit, submitting, error, progress }
}
