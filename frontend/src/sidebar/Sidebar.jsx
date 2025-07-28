import {
  ChevronLeftIcon,
  HomeIcon,
  PlusIcon,
  BookmarkIcon,
  Squares2X2Icon,
  XMarkIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from '../providers/AuthProvider/AuthProvider.jsx'

const NAV_BASE =
  'font-source-serif-pro relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group'
const NAV_ACTIVE = 'bg-honey-100 text-honey-800'
const NAV_REST = 'hover:bg-honey-50 text-stone-600'

const SidebarItem = ({ icon: Icon, text, to, open, onClick, isUpload = false }) => {
  if (isUpload) {
    return (
      <button
        aria-label="Upload"
        className={`${NAV_BASE} ${NAV_REST} w-full text-left`}
        title="Upload"
        type="button"
        onClick={onClick}
      >
        <Icon className="h-6 w-6" />
        <span className={`overflow-hidden transition-all ${open ? 'ml-3 w-40' : 'w-0'}`}>
          {text}
        </span>
        {!open && (
          <div className="bg-honey-50 text-honey-700 invisible absolute left-full ml-6 -translate-x-3 rounded-md px-2 py-1 text-sm opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
            {text}
          </div>
        )}
      </button>
    )
  }

  return (
    <NavLink
      className={({ isActive }) => `${NAV_BASE} ${isActive ? NAV_ACTIVE : NAV_REST}`}
      to={to}
      end
      onClick={onClick}
    >
      <Icon className="h-6 w-6" />
      <span className={`overflow-hidden transition-all ${open ? 'ml-3 w-40' : 'w-0'}`}>{text}</span>
      {!open && (
        <div className="bg-honey-50 text-honey-700 invisible absolute left-full ml-6 -translate-x-3 rounded-md px-2 py-1 text-sm opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
          {text}
        </div>
      )}
    </NavLink>
  )
}

export const Sidebar = ({ isOpen, onClose, onUploadClick }) => {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleItemClick = () => {
    if (window.innerWidth < 1024) onClose()
  }

  const handleUploadClick = () => onUploadClick()

  const handleLogout = () => {
    logout()
    onClose()
    navigate('/login', { replace: true })
  }

  const navItems = [
    { icon: HomeIcon, label: 'Dashboard', path: '/' },
    { icon: PlusIcon, label: 'Upload', path: '/upload', isUpload: true },
    { icon: BookmarkIcon, label: 'Collections', path: '/collections' },
  ]

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen w-full transition-transform duration-300 ease-in-out sm:w-80 lg:sticky lg:w-auto lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } `}
    >
      <nav className="flex h-full w-full flex-col border-r border-stone-200 bg-white shadow-lg lg:w-auto lg:shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <div
            className={`flex items-center overflow-hidden transition-all ${open ? 'w-32' : 'w-0'}`}
          >
            <Squares2X2Icon className="text-honey-500 h-8 w-8" />
            <span className="font-inter ml-2 text-lg font-bold">ArtHive</span>
          </div>
          <button
            className="hidden rounded-lg bg-stone-100 p-1.5 hover:bg-stone-200 lg:block"
            onClick={() => setOpen(!open)}
          >
            <ChevronLeftIcon
              className={`h-6 w-6 text-stone-600 transition-transform ${!open && 'rotate-180'}`}
            />
          </button>
          <button
            className="rounded-lg bg-stone-100 p-1.5 hover:bg-stone-200 lg:hidden"
            onClick={onClose}
          >
            <XMarkIcon className="h-6 w-6 text-stone-600" />
          </button>
        </div>

        <ul className="flex-1 px-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <SidebarItem
                icon={item.icon}
                isUpload={item.isUpload}
                open={open}
                text={item.label}
                to={item.path}
                onClick={item.isUpload ? handleUploadClick : handleItemClick}
              />
            </li>
          ))}
        </ul>

        <div className="border-t border-stone-200 p-3">
          <button
            aria-label="Sign out"
            className={`${NAV_BASE} ${NAV_REST} w-full justify-start`}
            title="Sign out"
            type="button"
            onClick={handleLogout}
          >
            <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
            <span className={`overflow-hidden transition-all ${open ? 'ml-3 w-40' : 'w-0'}`}>
              Sign out
            </span>
            {!open && (
              <div className="bg-honey-50 text-honey-700 invisible absolute left-full ml-6 -translate-x-3 rounded-md px-2 py-1 text-sm opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
                Sign out
              </div>
            )}
          </button>
        </div>
      </nav>
    </aside>
  )
}
