import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeftIcon,
  HomeIcon,
  PlusIcon,
  BookmarkIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const navItems = [
  { icon: HomeIcon, label: "Dashboard", path: "/" },
  { icon: PlusIcon, label: "Upload", path: "/upload" },
  { icon: BookmarkIcon, label: "Collections", path: "/collections" },
  { icon: EnvelopeIcon, label: "Inbox", path: "/inbox" },
];

const SidebarItem = ({ icon: Icon, text, to, open }) => {
  const baseClasses = "relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group";
  const activeClasses = "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800";
  const inactiveClasses = "hover:bg-indigo-50 text-gray-600";

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Icon className="w-6 h-6"/>
      <span className={`overflow-hidden transition-all ${open ? "w-40 ml-3" : "w-0"}`}>
        {text}
      </span>
      {!open && (
        <div
          className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </NavLink>
  );
};

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <aside className="h-screen sticky top-0">
      <nav className="h-full flex flex-col bg-white border-r border-gray-100 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={`flex items-center overflow-hidden transition-all ${open ? "w-32" : "w-0"}`}>
            <Squares2X2Icon className="w-8 h-8 text-indigo-500"/>
            <span className="font-bold text-lg ml-2">ArtHive</span>
          </div>
          <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            <ChevronLeftIcon className={`w-6 h-6 transition-transform ${!open && "rotate-180"}`}/>
          </button>
        </div>

        <ul className="flex-1 px-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <SidebarItem to={item.path} icon={item.icon} text={item.label} open={open}/>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 flex p-3">
          <div
            className="w-10 h-10 flex-shrink-0 flex justify-center items-center rounded-md bg-indigo-100 text-indigo-800 font-semibold">
            FF
          </div>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${open ? "w-40 ml-3" : "w-0"}`}>
            <div className="leading-4">
              <h4 className="font-semibold">Name</h4>
              <span className="text-xs text-gray-600">email@example.com</span>
            </div>
            <NavLink to="/settings">
              <Cog6ToothIcon className="h-6 w-6 hover:text-indigo-500 cursor-pointer"/>
            </NavLink>
          </div>
        </div>
      </nav>
    </aside>
  );
};
