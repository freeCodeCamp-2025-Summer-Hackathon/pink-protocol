import { ArtCard } from './ArtCard.jsx'
import { ArtCardSkeleton } from './ArtCardSkeleton.jsx'
import { useGallery } from './hooks/useGallery.js'

export const GalleryGrid = () => {
  const { items: visibleArt, loading: isLoading, end, loadMore } = useGallery()

  return (
    <section>
      <header className="mb-6 sm:mb-8">
        <h1 className="font-inter text-2xl font-black tracking-wide text-stone-900 uppercase sm:text-3xl lg:text-4xl">
          The Hive
        </h1>
        <p className="font-source-serif-pro mt-2 text-lg leading-relaxed font-light text-stone-600 sm:text-xl">
          Buzz through the hive&#39;s latest creations
        </p>
      </header>

      <div className="columns-1 gap-3 space-y-3 sm:columns-2 sm:gap-4 sm:space-y-4 lg:columns-3 xl:columns-4 2xl:columns-5">
        {isLoading && visibleArt.length === 0
          ? Array.from({ length: 10 }).map((_, idx) => <ArtCardSkeleton key={`skeleton-${idx}`} />)
          : visibleArt.map((art) => <ArtCard art={art} key={art.id} />)}
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <button
          className="focus:ring-opacity-50 rounded-full bg-stone-800 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-stone-900 focus:ring-2 focus:ring-stone-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-stone-500 sm:px-8 sm:py-3 sm:text-base"
          disabled={isLoading || end}
          onClick={loadMore}
        >
          {isLoading ? 'Loading…' : end ? 'No more posts' : 'Load more'}
        </button>
      </div>
    </section>
  )
}
