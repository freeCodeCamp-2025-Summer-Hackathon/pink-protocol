import {
  ChevronLeftIcon,
  HomeIcon,
  PlusIcon,
  BookmarkIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { icon: HomeIcon, label: 'Dashboard', path: '/' },
  { icon: PlusIcon, label: 'Upload', path: '/upload' },
  { icon: BookmarkIcon, label: 'Collections', path: '/collections' },
  { icon: EnvelopeIcon, label: 'Inbox', path: '/inbox' },
]

const SidebarItem = ({ icon: Icon, text, to, open }) => {
  const base =
    'font-inter relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group'
  const active = 'bg-honey-100 text-honey-800'
  const rest = 'hover:bg-honey-50 text-stone-600'

  return (
    <NavLink className={({ isActive }) => `${base} ${isActive ? active : rest}`} to={to} end>
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

export const Sidebar = () => {
  const [open, setOpen] = useState(true)

  return (
    <aside className="sticky top-0 h-screen">
      <nav className="flex h-full flex-col border-r border-stone-200 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <div
            className={`flex items-center overflow-hidden transition-all ${open ? 'w-32' : 'w-0'}`}
          >
            <Squares2X2Icon className="text-honey-500 h-8 w-8" />

            <span className="font-jost ml-2 text-lg font-bold">ArtHive</span>
          </div>

          <button
            className="rounded-lg bg-stone-100 p-1.5 hover:bg-stone-200"
            onClick={() => setOpen(!open)}
          >
            <ChevronLeftIcon
              className={`h-6 w-6 text-stone-600 transition-transform ${!open && 'rotate-180'}`}
            />
          </button>
        </div>

        <ul className="flex-1 px-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <SidebarItem icon={item.icon} open={open} text={item.label} to={item.path} />
            </li>
          ))}
        </ul>

        <div className="flex border-t border-stone-200 p-3">
          <div className="font-inter bg-honey-100 text-honey-800 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md font-semibold">
            FF
          </div>
          <div
            className={`flex items-center justify-between overflow-hidden transition-all ${open ? 'ml-3 w-40' : 'w-0'}`}
          >
            <div className="leading-4">
              <h4 className="font-jost font-semibold text-stone-700">Name</h4>
              <span className="font-inter text-xs text-stone-500">email@example.com</span>
            </div>
            <NavLink to="/settings">
              <Cog6ToothIcon className="hover:text-honey-600 h-6 w-6 cursor-pointer text-stone-500" />
            </NavLink>
          </div>
        </div>
      </nav>
    </aside>
  )
}
