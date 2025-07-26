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
    try {
      const data = await fetchPosts(skip, PAGE_SIZE)
      if (data.length === 0) {
        setEnd(true)
      } else {
        setItems((prev) => [...prev, ...data.map(mapPost)])
        setSkip((prev) => prev + PAGE_SIZE)
      }
    } catch (error) {
      // TODO: set error state/toast
    } finally {
      setLoading(false)
    }
  }, [skip, loading, end])

  useEffect(() => {
    if (initialLoadPerformed.current) {
      return
    }
    initialLoadPerformed.current = true
    load()
  }, [])

  return { items, loading, end, loadMore: load }
}
