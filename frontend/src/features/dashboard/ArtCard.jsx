'use client'

import { Bookmark, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

export const ArtCard = ({ art }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <article className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-white shadow transition-shadow hover:shadow-lg">
      <div className="relative">
        {!imageLoaded && (
          <div className="flex aspect-[4/5] w-full animate-pulse items-center justify-center bg-stone-200" />
        )}

        <img
          alt={art.title}
          className={`w-full object-cover transition-transform group-hover:scale-105 ${
            imageLoaded ? 'block' : 'hidden'
          }`}
          loading="lazy"
          src={art.imageUrl}
          onLoad={() => setImageLoaded(true)}
        />

        <button
          className={`absolute top-3 right-3 rounded-full p-2 backdrop-blur-sm ${
            isSaved
              ? 'bg-honey-500 text-white'
              : 'bg-white/90 text-stone-700 hover:bg-white hover:shadow'
          } transition`}
          onClick={(e) => {
            e.stopPropagation()
            setIsSaved((prev) => !prev)
          }}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 font-semibold text-stone-900">{art.title}</h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
          <img
            alt={art.author.name}
            className="h-6 w-6 rounded-full object-cover"
            src={art.author.avatar}
          />
          <span className="truncate">{art.author.name}</span>
        </div>

        {art.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {art.tags.slice(0, 3).map((tag) => (
              <span
                className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600"
                key={tag}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <button className="absolute right-3 bottom-3 rounded-full bg-white/90 p-2 text-stone-600 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
