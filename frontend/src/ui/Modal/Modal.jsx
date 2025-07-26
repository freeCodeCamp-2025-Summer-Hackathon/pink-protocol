'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'

export const Modal = ({ isOpen, onClose, title, children, size = 'lg' }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="absolute inset-0 bg-white/80 transition-all duration-300" onClick={onClose} />

      <div
        className={`relative rounded-2xl border border-stone-200/50 bg-white shadow-2xl ${sizeClasses[size]} max-h-[95vh] w-full scale-100 transform overflow-hidden transition-all duration-300`}
      >
        <div className="flex items-center justify-between border-b border-stone-100 px-8 py-6">
          <h2 className="text-2xl font-semibold text-stone-900">{title}</h2>
          <button
            className="group rounded-xl p-2 transition-colors duration-200 hover:bg-stone-100"
            onClick={onClose}
          >
            <XMarkIcon className="h-6 w-6 text-stone-400 group-hover:text-stone-600" />
          </button>
        </div>

        <div className="max-h-[calc(95vh-100px)] overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
