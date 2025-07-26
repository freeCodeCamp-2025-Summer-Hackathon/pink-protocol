import { PhotoIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { useState, useMemo, useEffect } from 'react'

export const UploadForm = ({ onSubmit, onCancel, submitting = false }) => {
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [published, setPublished] = useState(true)
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file])
  useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return
    await onSubmit({ title, caption, file, published })
    setTitle('')
    setCaption('')
    setFile(null)
    setPublished(true)
  }

  const handleFileChange = (f) => f?.type?.startsWith('image/') && setFile(f)
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileChange(e.dataTransfer.files[0])
  }

  return (
    <div className="px-6 py-4">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="space-y-3">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-lg font-medium text-stone-800">Upload Image</label>

          {!previewUrl ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              className={`group relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
                isDragging
                  ? 'border-honey-400 bg-honey-50/50'
                  : 'hover:border-honey-400 border-stone-300 hover:bg-stone-50'
              }`}
              onClick={() => document.getElementById('file-input')?.click()}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="group-hover:bg-honey-100 rounded-2xl bg-stone-100 p-3 transition-colors">
                  <CloudArrowUpIcon className="group-hover:text-honey-500 h-10 w-10 text-stone-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-stone-700">
                    Drop your image here, or{' '}
                    <span className="text-honey-600 hover:text-honey-700">browse</span>
                  </p>
                  <p className="mt-1 text-sm text-stone-500">Supports: JPG, PNG, GIF up to 10MB</p>
                </div>
              </div>
              <input
                accept="image/*"
                className="hidden"
                id="file-input"
                type="file"
                required
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />
            </div>
          ) : (
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
                <img
                  alt="Preview"
                  className="h-64 w-full object-cover"
                  src={previewUrl || '/placeholder.svg'}
                />
              </div>
              <button
                className="absolute top-3 right-3 rounded-xl bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white"
                type="button"
                onClick={() => setFile(null)}
              >
                <PhotoIcon className="h-4 w-4 text-stone-600" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="block text-lg font-medium text-stone-800">Title</label>
            <input
              className="focus:ring-honey-500 h-12 w-full rounded-xl border border-stone-200 px-4 text-base placeholder-stone-400 transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none"
              placeholder="Give your artwork a title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="block text-lg font-medium text-stone-800">Caption</label>
            <textarea
              className="focus:ring-honey-500 w-full resize-none rounded-xl border border-stone-200 px-4 py-3 text-base placeholder-stone-400 transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none"
              placeholder="Describe your artwork"
              rows={3}
              value={caption}
              required
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                checked={published}
                className="peer sr-only"
                type="checkbox"
                onChange={(e) => setPublished(e.target.checked)}
              />
              <div className="peer-focus:ring-honey-300 peer peer-checked:bg-honey-500 h-7 w-12 rounded-full bg-stone-200 peer-focus:ring-4 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-5 peer-checked:after:border-white"></div>
            </label>
            <span className="text-base font-medium text-stone-700">Publish immediately</span>
          </div>
        </div>

        <div className="flex justify-end space-x-3 border-t border-stone-100 pt-6">
          <button
            className="rounded-xl bg-stone-100 px-6 py-3 text-base font-medium text-stone-600 transition-all duration-200 hover:bg-stone-200"
            disabled={submitting}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex items-center space-x-2 rounded-xl bg-stone-900 px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!file || submitting}
            type="submit"
          >
            {submitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <span>Upload Artwork</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
