import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../contexts/ThemeContext'

export const Route = createFileRoute('/app')({
  component: AppDashboard,
})

function AppDashboard() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.navigate({ to: '/login' })
    }
  }, [user, router])

  return (
    <div className={`min-h-screen ${theme.bg}`}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 pt-24 pb-24 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center bg-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to your PostSync Dashboard
              </h2>
              <p className="text-gray-600 mb-8">
                This is where you'll manage your social media content
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Total Posts</h3>
                  <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Scheduled</h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">8</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Connected Accounts</h3>
                  <p className="text-3xl font-bold text-purple-600 mt-2">5</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center space-x-4">
                <button className={`${theme.button} ${theme.buttonText} px-6 py-3 rounded-md font-medium`}>
                  Create New Post
                </button>
                <button className={`${theme.button} ${theme.buttonText} px-6 py-3 rounded-md font-medium`}>
                  Schedule Post
                </button>
                <button className={`${theme.button} ${theme.buttonText} px-6 py-3 rounded-md font-medium`}>
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
