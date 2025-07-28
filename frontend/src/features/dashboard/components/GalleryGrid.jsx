import { useGallery } from '../hooks/useGallery.js'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll.js'

import { ArtCard } from './ArtCard.jsx'
import { ArtCardSkeleton } from './ArtCardSkeleton.jsx'

export const GalleryGrid = () => {
  const { items: visibleArt, loading: isLoading, end, loadMore } = useGallery()
  const observerRef = useInfiniteScroll(loadMore, isLoading, !end)

  return (
    <section>
      <header className="mb-8 sm:mb-12">
        <h1 className="font-inter text-3xl font-black tracking-wide text-stone-900 uppercase sm:text-4xl lg:text-5xl">
          The Hive
        </h1>
        <p className="font-source-serif-pro mt-3 text-xl leading-relaxed font-light text-stone-600 sm:text-2xl">
          Buzz through the hive&#39;s latest creations
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleArt.map((art) => (
          <ArtCard art={art} key={art.id} />
        ))}
        {isLoading && Array.from({ length: 8 }).map((_, i) => <ArtCardSkeleton key={i} />)}
      </div>

      <div aria-hidden="true" className="mt-8 h-8" ref={observerRef}>
        {isLoading && !end && (
          <div className="flex items-center justify-center gap-3 text-stone-600">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
            <span className="text-sm font-medium">Loading more...</span>
          </div>
        )}
      </div>
    </section>
  )
}