'use client'

import { useState, useEffect } from 'react'

import { ArtCard } from './ArtCard.jsx'
import { generateMockArt } from './mock.js'

const ITEMS_PER_PAGE = 10

export const GalleryGrid = () => {
  const [visibleArt, setVisibleArt] = useState([])

  useEffect(() => {
    const initialArt = generateMockArt(ITEMS_PER_PAGE).map((art, index) => ({
      ...art,
      id: `initial-${index}`,
    }))
    setVisibleArt(initialArt)
  }, [])

  const handleLoadMore = () => {
    const newArt = generateMockArt(ITEMS_PER_PAGE).map((art, index) => ({
      ...art,
      id: `more-${Date.now()}-${index}`,
    }))

    setVisibleArt((prevArt) => [...prevArt, ...newArt])
  }

  return (
    <section>
      <header className="mb-8">
        <h1 className="font-inter text-4xl font-black tracking-wide text-stone-900 uppercase">
          The Hive
        </h1>
        <p className="font-source-serif text-xl leading-relaxed font-light text-stone-600">
          Buzz through the hive’s latest creations
        </p>
      </header>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
        {visibleArt.map((art) => (
          <ArtCard art={art} key={art.id} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          className="focus:ring-opacity-50 rounded-full bg-stone-800 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-stone-900 focus:ring-2 focus:ring-stone-500 focus:outline-none"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>
    </section>
  )
}
