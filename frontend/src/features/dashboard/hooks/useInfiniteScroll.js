'use client'

import { useEffect, useRef } from 'react'

export const useInfiniteScroll = (callback, loading, hasMore) => {
  const observerRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && !loading && hasMore) {
          callback()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [callback, loading, hasMore])

  return observerRef
}
