import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from '../sidebar/Sidebar.jsx'

import { MobileHeader } from './MobileHeader.jsx'

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-white">
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />

      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      <main className="flex-1 lg:ml-0">
        <div className="pt-16 lg:pt-0">
          <Outlet />
        </div>
      </main>

      {sidebarOpen && (
        <div
          aria-label="Close sidebar"
          className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden"
          role="button"
          tabIndex={0}
          onClick={handleCloseSidebar}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              handleCloseSidebar()
            }
          }}
        />
      )}
    </div>
  )
}
