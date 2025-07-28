import { XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'

import HexagonButton from './HexagonButton'

export const Modal = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const handleDocumentClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleDocumentClick)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
      <div
        aria-labelledby="modal-title"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl border-2 border-gray-200 bg-white/80 p-6 shadow-2xl backdrop-blur-md transition-transform duration-300 ease-in-out"
        ref={modalRef}
        role="dialog"
      >
        <div className={`mb-4 flex items-center ${title ? 'justify-between' : 'justify-end'}`}>
          {title && (
            <h3 className="text-xl font-bold text-gray-800" id="modal-title">
              {title}
            </h3>
          )}
          <HexagonButton aria-label="Close modal" size="sm" variant="secondary" onClick={onClose}>
            <XMarkIcon className="h-4 w-4" />
          </HexagonButton>
        </div>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  )
}

export default Modal
