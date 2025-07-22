import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.API_URL ?? 'http://127.0.0.1:8000',
  withCredentials: false,
})
