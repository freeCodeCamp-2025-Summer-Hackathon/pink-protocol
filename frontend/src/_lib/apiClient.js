import axios from 'axios'

import { getToken } from './authStore.js'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? http://127.0.0.1:8000,
  withCredentials: false,
})

apiClient.interceptors.request.use((cfg) => {
  const token = getToken()
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})
