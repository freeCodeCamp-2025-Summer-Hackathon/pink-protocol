import { apiClient } from '../../../_lib/apiClient'

export const fetchPost = (id) => apiClient.get(`/posts/${id}`).then((r) => r.data)
