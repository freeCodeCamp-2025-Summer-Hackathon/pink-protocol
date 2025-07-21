import { XMarkIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'

export const Popup = ({
  message,
  onClose,
  showCloseButton = true,
  position = 'center',
  type = 'info',
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose?.()
    }, 300)
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  }
  const typeClasses = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-leaf-50 border-green-leaf-200 text-green-leaf-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  }
  return (
    <div
      className={`fixed z-50 mx-4 w-full max-w-sm transition-all duration-300 ease-in-out ${positionClasses[position]} ${
        isVisible && !isLeaving
          ? 'translate-y-0 scale-100 opacity-100'
          : 'translate-y-2 scale-95 opacity-0'
      } `}
    >
      <div
        className={`rounded-lg border-2 p-4 shadow-lg backdrop-blur-sm ${typeClasses[type]} flex items-start gap-3`}
      >
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {showCloseButton && (
          <button
            className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-black/10"
            onClick={handleClose}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Popup
