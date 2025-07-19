import { Bars3Icon, Squares2X2Icon } from '@heroicons/react/24/outline'

export const MobileHeader = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 right-0 left-0 z-30 border-b border-stone-200 bg-white lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Squares2X2Icon className="text-honey-500 h-8 w-8" />
          <span className="font-inter ml-2 text-lg font-bold">ArtHive</span>
        </div>
        <button
          aria-label="Open menu"
          className="rounded-lg p-2 transition-colors hover:bg-stone-100"
          onClick={onMenuClick}
        >
          <Bars3Icon className="h-6 w-6 text-stone-600" />
        </button>
      </div>
    </header>
  )
}
