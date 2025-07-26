import { apiClient } from '../../../_lib/apiClient'

export const fetchUser = (id) => apiClient.get(`/users/${id}`).then((r) => r.data)
