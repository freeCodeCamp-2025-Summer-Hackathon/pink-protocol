import { apiClient } from '../../../_lib/apiClient.js'
import { getUser } from '../../../_lib/authStore.js'

export const createPost = async ({ title, caption, published = true, file }) => {
  const user = getUser()
  if (!user?.id) throw new Error('Not authenticated')

  const fd = new FormData()
  fd.append('user_id', String(user.id))
  fd.append('title', title)
  fd.append('caption', caption)
  fd.append('published', String(Boolean(published)))
  fd.append('image_file', file)

  const res = await apiClient.post('/posts', fd)
  return res.data
}
