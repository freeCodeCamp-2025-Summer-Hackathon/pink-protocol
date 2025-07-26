import { useParams } from 'react-router-dom'

import { PostDetail } from './components/PostDetail'
import { usePost } from './hooks/usePost'

const Page = () => {
  const { postId } = useParams()
  const { post, author, loading, error } = usePost(postId)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      </div>
    )
  }

  if (error === 'not_found') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm font-medium text-gray-600">Post not found.</p>
        {/*I'd prefer a 404 page here, but this is a placeholder*/}
      </div>
    )
  }

  if (!post) return null

  return <PostDetail author={author} post={post} />
}

export default Page
