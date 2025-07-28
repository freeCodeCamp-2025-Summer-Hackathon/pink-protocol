import { apiClient } from '../../../_lib/apiClient.js'

export const fetchPosts = async (skip = 0, limit = 10) => {
  const { data } = await apiClient.get('/posts', { params: { skip, limit } })

  return Array.isArray(data) ? data : []
}
