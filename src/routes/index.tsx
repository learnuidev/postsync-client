import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Zap,
  Calendar,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../contexts/ThemeContext'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  const { user } = useAuth()
  const { theme } = useTheme()

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Post Everywhere',
      description: 'Publish to all platforms in seconds, not minutes. One dashboard for all your accounts.',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Schedule Smart',
      description: 'Plan your content calendar with precision. Customize posts for each platform automatically.',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Track Performance',
      description: 'See what works, when it works. Make data-driven decisions about your content strategy.',
    },
  ]

  const platforms = [
    { name: 'X', icon: <Twitter className="w-5 h-5" />, color: 'text-gray-900' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: 'text-blue-600' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, color: 'text-pink-600' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: 'text-blue-700' },
  ]

  return (
    <div className={`min-h-screen ${theme.bg}`}>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-16">
            <span className={`inline-block px-4 py-2 text-sm font-medium ${theme.card} ${theme.border} border rounded-full mb-8`}>
              For founders and creators
            </span>
            <h1 className={`text-6xl md:text-8xl font-bold tracking-tight ${theme.text} mb-8`}>
              Post everywhere.
              <br />
              <span className="block text-blue-600">Effortlessly.</span>
            </h1>
            <p className={`text-xl md:text-2xl ${theme.textSecondary} mb-12 max-w-3xl mx-auto leading-relaxed`}>
              One dashboard for all your social media. Post to all platforms in seconds, not hours.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            {user ? (
              <Link
                to="/app"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Get started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button className={`inline-flex items-center justify-center px-8 py-4 text-base font-medium ${theme.text} ${theme.card} hover:bg-opacity-90 rounded-lg transition-all duration-200`}>
                  Watch demo
                </button>
              </>
            )}
          </div>

          {/* Platform Icons */}
          <div className="flex justify-center gap-12">
            {platforms.map((platform, index) => (
              <div key={index} className={`${theme.textSecondary} text-sm font-medium`}>
                {platform.icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 px-6 ${theme.card}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold tracking-tight ${theme.text} mb-6`}>
              Designed for efficiency
            </h2>
            <p className={`text-xl ${theme.textSecondary} max-w-3xl mx-auto`}>
              Everything you need to manage your social media presence, nothing you don't.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 ${theme.iconBg} rounded-2xl`}>
                  <div className={`${theme.iconColor}`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className={`text-2xl font-semibold ${theme.text} mb-4`}>
                  {feature.title}
                </h3>
                <p className={`${theme.textSecondary} leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 px-6 ${theme.bg}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-5xl font-bold tracking-tight ${theme.text} mb-6`}>
            Ready to get started?
          </h2>
          <p className={`text-xl ${theme.textSecondary} mb-12`}>
            Join thousands of founders who are saving time with PostSync.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Start free trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <p className={`text-sm ${theme.textSecondary} mt-6`}>
            No credit card required. Free plan available.
          </p>
        </div>
      </section>
    </div>
  )
}
