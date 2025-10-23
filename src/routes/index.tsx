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

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  const { user } = useAuth()

  const features = [
    {
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: 'Post to all platforms instantly',
      description:
        'Publish everywhere in 30 seconds, not 30 minutes. Manage all your personal and brand accounts without switching back and forth.',
    },
    {
      icon: <Calendar className="w-12 h-12 text-blue-600" />,
      title: 'Schedule posts effortlessly',
      description:
        'Plan your content strategy ahead of time. Schedule posts across all platforms. Customize your posts perfectly per platform.',
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
      title: 'Manage content efficiently',
      description:
        'View all your scheduled and published posts in one place. Track what\'s been posted, edit upcoming posts, and stay on top of your content strategy.',
    },
  ]

  const platforms = [
    { name: 'Twitter', icon: <Twitter className="w-6 h-6" />, color: 'text-blue-400' },
    { name: 'Facebook', icon: <Facebook className="w-6 h-6" />, color: 'text-blue-600' },
    { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, color: 'text-pink-600' },
    { name: 'LinkedIn', icon: <Linkedin className="w-6 h-6" />, color: 'text-blue-700' },
  ]

  const benefits = [
    'Save hours of time every week',
    'Never miss a posting opportunity',
    'Reach more audiences across platforms',
    'Simple, intuitive interface',
    'Fair pricing for founders and creators',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            The social media scheduler
            <span className="block text-blue-600">for founders</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Post to all social platforms from one dashboard. Easy to use, fairly priced.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <Link
                to="/app"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg inline-flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="px-8 py-4 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                  Learn More
                </button>
              </>
            )}
          </div>

          {/* Platform Icons */}
          <div className="flex justify-center gap-8 mb-12">
            {platforms.map((platform, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center ${platform.color}`}>
                  {platform.icon}
                </div>
                <span className="text-sm text-gray-600">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Everything you need to manage social media
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why founders choose PostSync
          </h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-lg text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-blue-600">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to simplify your social media?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of founders who are saving time and growing their reach with PostSync.
          </p>
          <Link
            to="/login"
            className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-colors shadow-lg inline-flex items-center justify-center gap-2"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
