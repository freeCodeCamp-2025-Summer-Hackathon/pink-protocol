import { apiClient } from '../../../_lib/apiClient.js'

export const signUpUser = (payload) => apiClient.post('/users', payload)
