export const ArtCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="relative aspect-[3/4] w-full animate-pulse bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-300/30 to-transparent" />
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="h-9 w-9 animate-pulse rounded-full bg-white/60" />
          <div className="h-9 w-9 animate-pulse rounded-full bg-white/60" />
          <div className="h-9 w-9 animate-pulse rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  )
}
