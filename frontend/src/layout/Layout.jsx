import { Outlet } from 'react-router-dom'

import { Sidebar } from '../sidebar/Sidebar.jsx'

export const Layout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
