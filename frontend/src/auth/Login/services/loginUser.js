import { apiClient } from '../../../_lib/apiClient.js'

export const loginUser = (payload) => apiClient.post('/users/login', payload).then((r) => r.data)
