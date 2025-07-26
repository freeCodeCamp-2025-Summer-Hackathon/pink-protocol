import { useEffect, useRef } from 'react'

export const useInfiniteScroll = (callback, loading, hasMore) => {
  const sentinelRef = useRef(null)
  const ioRef = useRef(null)

  useEffect(() => {
    if (!sentinelRef.current) return

    ioRef.current?.disconnect()
    ioRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) callback()
      },
      { threshold: 0.01, rootMargin: '200px 0px' }
    )

    ioRef.current.observe(sentinelRef.current)
    return () => ioRef.current?.disconnect()
  }, [callback, loading, hasMore])

  useEffect(() => {
    if (!hasMore) ioRef.current?.disconnect()
  }, [hasMore])

  return sentinelRef
}
