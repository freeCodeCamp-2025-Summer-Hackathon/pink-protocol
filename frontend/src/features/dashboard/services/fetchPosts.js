import { apiClient } from '../../../_lib/apiClient.js'
import { getToken } from '../../../_lib/authStore.js'

export const fetchPosts = (skip = 0, limit = 10) =>
  apiClient
    .get('/posts', {
      params: { skip, limit },
      headers: {
        // not used, just putting it in place for future use
        Authorization: `Bearer ${getToken() || ''}`,
      },
    })
    .then((r) => r.data)
