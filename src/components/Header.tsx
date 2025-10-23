import { Link } from '@tanstack/react-router'
import { Calendar } from 'lucide-react'

export default function Header() {

  return (
    <header className="p-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-center">
        <h1 className="text-xl font-bold text-gray-900">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            PostSync
          </Link>
        </h1>
      </div>
    </header>
  )
}
