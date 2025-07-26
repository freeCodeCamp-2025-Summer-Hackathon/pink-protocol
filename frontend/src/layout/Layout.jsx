import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { UploadModal } from '../features/upload/UploadModal.jsx'
import { Sidebar } from '../sidebar/Sidebar.jsx'

import { MobileHeader } from './MobileHeader.jsx'

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  const handleOpenUpload = () => {
    setUploadModalOpen(true)
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} onUploadClick={handleOpenUpload} />
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
      <UploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </div>
  )
}
