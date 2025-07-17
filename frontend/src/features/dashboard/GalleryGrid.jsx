'use client'

import { ArtCard } from './ArtCard.jsx'
import { mockArtData } from './mock.js'

export const GalleryGrid = () => (
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
      {mockArtData.map((art) => (
        <ArtCard art={art} key={art.id} />
      ))}
    </div>
  </section>
)
