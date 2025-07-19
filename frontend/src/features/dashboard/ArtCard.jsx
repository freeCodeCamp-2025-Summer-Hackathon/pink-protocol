'use client'

import { Bookmark } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export const ArtCard = ({ art }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true)
    }
  }, [])

  return (
    <article className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-white shadow transition-shadow hover:shadow-lg">
      <div className="relative">
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-200"></div>}

        <img
          alt={art.title}
          className={`w-full object-cover transition-transform group-hover:scale-105 ${
            imageLoaded ? 'block' : 'hidden'
          }`}
          ref={imgRef}
          src={art.imageUrl}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://placehold.co/400x600/cccccc/ffffff?text=Image+Not+Found'
            setImageLoaded(true)
          }}
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

        <div className="absolute top-0 right-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            aria-label="Save art"
            className="rounded-full p-2 text-white transition-colors hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              setIsSaved((prev) => !prev)
            }}
          >
            <Bookmark className={`transition-all ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{art.title}</h3>

        <div className="mt-1 flex items-center">
          <img
            alt={art.author.name}
            className="h-6 w-6 rounded-full bg-gray-300 object-cover"
            src={art.author.avatar}
          />
          <p className="ml-2 text-sm text-gray-600">{art.author.name}</p>
        </div>

        {art.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {art.tags.slice(0, 3).map((tag, index) => (
              <span
                className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                key={index}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
