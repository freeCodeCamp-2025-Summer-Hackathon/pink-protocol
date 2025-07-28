import { createContext, useContext, useMemo, useState } from 'react'

import {
  getToken,
  getUser,
  saveAuth as persistAuth,
  clearAuth as clearAuthStore,
} from '../../_lib/authStore'

const AuthCtx = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getToken())
  const [user, setUser] = useState(() => getUser())

  const login = ({ token, user }) => {
    persistAuth({ token, user })
    setToken(token)
    setUser(user)
  }

  const logout = () => {
    clearAuthStore()
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthed: !!token,
      login,
      logout,
    }),
    [token, user]
  )

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
