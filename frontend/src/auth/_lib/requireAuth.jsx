import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../../providers/AuthProvider/AuthProvider.jsx'

export const RequireAuth = ({ children }) => {
  const { isAuthed } = useAuth()
  const location = useLocation()

  if (!isAuthed) {
    return <Navigate state={{ from: location }} to="/login" replace />
  }
  return children
}
