import { ArrowLeft, Bookmark, Download, Heart, Share2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const IMAGE_NOT_FOUND_PLACEHOLDER =
  'https://placehold.co/800x1200/cccccc/ffffff?text=Image+Not+Found'

export const PostDetail = ({ post, author }) => {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <button
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-2">
            <button
              aria-label="Like"
              className={`rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-red-500 ${
                liked ? 'text-red-500' : ''
              }`}
              onClick={() => setLiked((v) => !v)}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button
              aria-label="Save"
              className={`rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 ${
                saved ? 'text-blue-600' : ''
              }`}
              onClick={() => setSaved((v) => !v)}
            >
              <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
            </button>
            <button
              aria-label="Share"
              className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
              onClick={() => {}}
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              aria-label="Download"
              className="rounded-full bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
              onClick={() => {}}
            >
              <Download className="mr-2 inline h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl gap-8 px-4 py-6 sm:px-6 lg:grid lg:grid-cols-3 lg:py-8">
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-2xl bg-gray-100">
            <img
              alt={post.title || 'Artwork'}
              className={`mx-auto h-auto max-h-[80vh] w-full object-contain transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              src={post.img_url || '/placeholder.svg'}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = IMAGE_NOT_FOUND_PLACEHOLDER
                setImageLoaded(true)
              }}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
              </div>
            )}
          </div>
        </div>

        <aside className="mt-6 space-y-4 lg:mt-0">
          <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
          {post.caption && <p className="text-gray-700">{post.caption}</p>}

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
            <img
              alt={author?.name || `User #${post.user_id}`}
              className="h-10 w-10 rounded-full object-cover"
              src={`https://i.pravatar.cc/80?u=${post.user_id}`}
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {author?.name || `User #${post.user_id}`}
              </p>
              {author?.username && <p className="text-xs text-gray-500">@{author.username}</p>}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Posted on{' '}
            <span className="font-medium text-gray-700">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
        </aside>
      </main>
    </div>
  )
}
