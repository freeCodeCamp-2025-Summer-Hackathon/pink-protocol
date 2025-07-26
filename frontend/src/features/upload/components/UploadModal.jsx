'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Modal } from '../../../ui/Modal/Modal.jsx'
import { createPost } from '../services/createPost.js'
import { UploadForm } from './UploadForm.jsx'

export const UploadModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleUpload = async (formData) => {
    setSubmitting(true)
    setError(null)
    try {
      const post = await createPost(formData)
      onClose()
      if (post?.id) navigate(`/posts/${post.id}`)
    } catch (e) {
      const code = e?.response?.status
      if (code === 422) setError('🐝 Missing or invalid fields.')
      else if (code === 401) setError('🐝 Please sign in to upload.')
      else setError('🐝 Upload failed. Try again.')
      throw e
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} size="xl" title="Share Your Artwork" onClose={onClose}>
      {error && (
        <p className="mx-6 mt-3 rounded bg-red-100 p-2 text-center text-sm text-red-700">{error}</p>
      )}
      <UploadForm submitting={submitting} onCancel={onClose} onSubmit={handleUpload} />
    </Modal>
  )
}
