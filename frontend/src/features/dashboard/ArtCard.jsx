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
    <article className="group relative mb-3 break-inside-avoid overflow-hidden rounded-xl bg-white shadow transition-shadow hover:shadow-lg sm:mb-4 sm:rounded-2xl">
      <div className="relative">
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-200"></div>}
        <img
          alt={art.title}
          className={`w-full object-cover transition-transform group-hover:scale-105 ${imageLoaded ? 'block' : 'hidden'}`}
          ref={imgRef}
          src={art.imageUrl || '/placeholder.svg'}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://placehold.co/400x600/cccccc/ffffff?text=Image+Not+Found'
            setImageLoaded(true)
          }}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-all group-hover:scale-105 group-hover:opacity-100"></div>
        <div className="absolute top-0 right-0 p-2 opacity-0 transition-opacity group-hover:opacity-100 sm:p-3">
          <button
            aria-label="Save art"
            className="rounded-full p-1.5 text-white transition-colors hover:bg-white/20 sm:p-2"
            onClick={(e) => {
              e.stopPropagation()
              setIsSaved((prev) => !prev)
            }}
          >
            <Bookmark
              className={`h-4 w-4 transition-all sm:h-5 sm:w-5 ${isSaved ? 'fill-white' : ''}`}
            />
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-gray-800 sm:text-lg">
          {art.title}
        </h3>
        <div className="mt-1 flex items-center sm:mt-2">
          <img
            alt={art.author.name}
            className="h-5 w-5 rounded-full bg-gray-300 object-cover sm:h-6 sm:w-6"
            src={art.author.avatar || '/placeholder.svg'}
          />
          <p className="ml-2 truncate text-xs text-gray-600 sm:text-sm">{art.author.name}</p>
        </div>
        {art.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1 sm:mt-3 sm:gap-2">
            {art.tags.slice(0, 3).map((tag, index) => (
              <span
                className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600 sm:px-2 sm:py-1"
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
