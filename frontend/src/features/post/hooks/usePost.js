import { useEffect, useState } from 'react'

import { fetchPost } from '../services/fetchPost'
import { fetchUser } from '../services/fetchUser'

export const usePost = (postId) => {
  const [post, setPost] = useState(null)
  const [author, setAuthor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const post = await fetchPost(postId)
        if (ignore) return
        setPost(post)

        try {
          const user = await fetchUser(post.user_id)
          if (!ignore) setAuthor(user)
        } catch {
          /* empty */
        }
      } catch (e) {
        if (!ignore) setError(e?.response?.status === 404 ? 'not_found' : 'error')
      } finally {
        if (!ignore) setLoading(false)
      }
    })()

    return () => {
      ignore = true
    }
  }, [postId])

  return { post, author, loading, error }
}
