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
  const base = "font-inter relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group";
  const active = "bg-honey-100 text-honey-800";
  const rest = "hover:bg-honey-50 text-stone-600";

  return (
    <NavLink to={to} end className={({ isActive }) => `${base} ${isActive ? active : rest}`}>
      <Icon className="w-6 h-6"/>
      <span className={`overflow-hidden transition-all ${open ? "w-40 ml-3" : "w-0"}`}>{text}</span>
      {!open && (
        <div
          className="absolute left-full rounded-md px-2 py-1 ml-6 bg-honey-50 text-honey-700 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
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
      <nav className="h-full flex flex-col bg-white border-r border-stone-200 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={`flex items-center overflow-hidden transition-all ${open ? "w-32" : "w-0"}`}>
            <Squares2X2Icon className="w-8 h-8 text-honey-500"/>
            <span className="font-jost font-bold text-lg ml-2">ArtHive</span>
          </div>
          <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200">
            <ChevronLeftIcon className={`w-6 h-6 text-stone-600 transition-transform ${!open && "rotate-180"}`}/>
          </button>
        </div>

        <ul className="flex-1 px-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <SidebarItem to={item.path} icon={item.icon} text={item.label} open={open}/>
            </li>
          ))}
        </ul>

        <div className="border-t border-stone-200 flex p-3">
          <div
            className="font-inter w-10 h-10 flex-shrink-0 flex justify-center items-center rounded-md bg-honey-100 text-honey-800 font-semibold">
            FF
          </div>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${open ? "w-40 ml-3" : "w-0"}`}>
            <div className="leading-4">
              <h4 className="font-jost font-semibold text-stone-700">Name</h4>
              <span className="font-inter text-xs text-stone-500">email@example.com</span>
            </div>
            <NavLink to="/settings">
              <Cog6ToothIcon className="h-6 w-6 text-stone-500 hover:text-honey-600 cursor-pointer"/>
            </NavLink>
          </div>
        </div>
      </nav>
    </aside>
  );
};
