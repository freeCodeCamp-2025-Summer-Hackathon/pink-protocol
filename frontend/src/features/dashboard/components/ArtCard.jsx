import { Bookmark, Download, Share2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const IMAGE_NOT_FOUND_PLACEHOLDER =
  'https://placehold.co/600x800/cccccc/ffffff?text=Image+Not+Found'

export const ArtCard = ({ art }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:-translate-y-2 hover:shadow-2xl">
      <Link
        aria-label={art.title ? `Open “${art.title}”` : 'Open artwork'}
        className="absolute inset-0 z-10"
        to={`/posts/${art.id}`}
      >
        <span className="sr-only">{art.title || 'Artwork'}</span>
      </Link>

      <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          alt={art.title || 'Artwork'}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          decoding="async"
          loading="lazy"
          src={art.imageUrl || '/placeholder.svg?height=800&width=600'}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = IMAGE_NOT_FOUND_PLACEHOLDER
            setImageLoaded(true)
          }}
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />

        <div className="absolute top-4 right-4 z-20 flex translate-y-2 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            aria-label={isSaved ? 'Remove from saved' : 'Save art'}
            className="rounded-full bg-white/90 p-2.5 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white hover:text-gray-900"
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsSaved((prev) => !prev)
            }}
          >
            <Bookmark className={`h-4 w-4 transition-all ${isSaved ? 'fill-gray-700' : ''}`} />
          </button>

          <button
            aria-label="Share art"
            className="rounded-full bg-white/90 p-2.5 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white hover:text-gray-900"
            type="button"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button
            aria-label="Download art"
            className="rounded-full bg-white/90 p-2.5 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white hover:text-gray-900"
            type="button"
            onClick={(e) => e.stopPropagation()}
          >
            <Download className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute right-4 bottom-4 left-4 z-20 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="line-clamp-2 text-lg font-bold text-white drop-shadow-lg">{art.title}</h3>
        </div>

        {!imageLoaded && (
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-3 border-gray-300 border-t-gray-600" />
          </div>
        )}
      </div>
    </article>
  )
}
