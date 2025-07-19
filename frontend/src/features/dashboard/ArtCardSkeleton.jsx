export const ArtCardSkeleton = () => {
  return (
    <div className="relative mb-3 break-inside-avoid overflow-hidden rounded-xl bg-white shadow-md sm:mb-4 sm:rounded-2xl">
      <div className="aspect-[2/3] w-full animate-pulse rounded-t-xl bg-gray-300"></div>

      <div className="p-3 sm:p-4">
        <div className="mb-2 h-5 w-3/4 animate-pulse rounded-md bg-gray-300"></div>

        <div className="mt-2 flex items-center sm:mt-3">
          <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300"></div>
          <div className="ml-2 h-4 w-1/2 animate-pulse rounded-md bg-gray-300"></div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1 sm:gap-2">
          <div className="h-5 w-12 animate-pulse rounded-sm bg-gray-300"></div>
          <div className="h-5 w-16 animate-pulse rounded-sm bg-gray-300"></div>
          <div className="h-5 w-14 animate-pulse rounded-sm bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}
