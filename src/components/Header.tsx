import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import {
  ChevronDown,
  ChevronRight,
  ClipboardType,
  Home,
  Menu,
  Network,
  SquareFunction,
  StickyNote,
  Store,
  Table,
  X,
  Calendar,
  BarChart3,
  LogOut,
} from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [groupedExpanded, setGroupedExpanded] = useState<
    Record<string, boolean>
  >({})
  const { user, logout } = useAuth()

  return (
    <>
      <header className="p-4 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 text-xl font-bold text-gray-900">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              PostSync
            </Link>
          </h1>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <Link
              to="/app"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white text-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-r border-gray-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">PostSync Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors mb-2 text-gray-700"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2 text-white',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          {user ? (
            <>
              <Link
                to="/app"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors mb-2 text-gray-700"
                activeProps={{
                  className:
                    'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2 text-white',
                }}
              >
                <BarChart3 size={20} />
                <span className="font-medium">Dashboard</span>
              </Link>
              
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors mb-2 text-gray-700 text-left"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors mb-2 text-gray-700"
              activeProps={{
                className:
                  'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2 text-white',
              }}
            >
              <LogOut size={20} />
              <span className="font-medium">Login</span>
            </Link>
          )}
        </nav>
      </aside>
    </>
  )
}
