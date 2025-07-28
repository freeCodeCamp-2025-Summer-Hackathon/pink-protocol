import { useCallback, useEffect, useState, useRef } from 'react'

import { fetchPosts } from '../services/fetchPosts'

const PAGE_SIZE = 10

export const useGallery = () => {
  const [items, setItems] = useState([])
  const [skip, setSkip] = useState(0)
  const [loading, setLoading] = useState(false)
  const [end, setEnd] = useState(false)
  const initialLoadPerformed = useRef(false)

  const mapPost = (p) => ({
    id: p.id,
    title: p.title,
    imageUrl: p.img_url,
    author: { name: `User #${p.user_id}`, avatar: `https://i.pravatar.cc/150?u=${p.user_id}` },
  })

  const load = useCallback(async () => {
    if (loading || end) return
    setLoading(true)
    const start = skip
    try {
      const data = (await fetchPosts(start, PAGE_SIZE)) ?? []

      setItems((prev) => {
        const seen = new Set(prev.map((x) => x.id))
        const next = data.filter((p) => !seen.has(p.id)).map(mapPost)
        return [...prev, ...next]
      })

      setSkip(start + PAGE_SIZE)
      if (data.length < PAGE_SIZE) setEnd(true)
    } catch {
      // TODO: show toast / retry
    } finally {
      setLoading(false)
    }
  }, [skip, loading, end])

  useEffect(() => {
    if (initialLoadPerformed.current) return
    initialLoadPerformed.current = true
    load()
  }, [load])

  return { items, loading, end, loadMore: load }
}
