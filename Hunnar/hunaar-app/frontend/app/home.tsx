import Link from 'next/link'
import { ArrowRight, Zap, Shield, Layers, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Zap className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Hunaar</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/signin" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup" 
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Automate Your Workflows
              <span className="block text-primary-600">Like Never Before</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect your favorite apps and automate repetitive tasks with Hunaar. 
              Build powerful workflows without coding and save hours every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="btn-primary text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/dashboard" 
                className="btn-secondary text-lg px-8 py-3"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Hunaar?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for teams who want to focus on what matters most
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Set up automations in minutes, not hours. Our intuitive interface makes workflow creation effortless.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">
                Enterprise-grade security with 99.9% uptime. Your data is always safe and your workflows always running.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">500+ Integrations</h3>
              <p className="text-gray-600">
                Connect with all your favorite tools. From Gmail to Slack, Salesforce to Shopify - we've got you covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Workflow Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-gray-600">
              Here's a sample workflow: Gmail → Slack notification
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center p-4 bg-red-50 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-semibold">G</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Gmail</h4>
                  <p className="text-sm text-gray-600">New email received</p>
                </div>
              </div>
              
              <ArrowRight className="h-8 w-8 text-gray-400" />
              
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">S</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Slack</h4>
                  <p className="text-sm text-gray-600">Send notification</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 text-center">
                <Users className="inline h-5 w-5 mr-2" />
                Workflow active • Processed 1,247 emails this month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Automate Your Work?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already saving time with Hunaar
          </p>
          <Link 
            href="/auth/signup" 
            className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-200 inline-flex items-center"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">Hunaar</span>
            </div>
            <p className="text-gray-400">
              © 2024 Hunaar. Built with ❤️ for automation enthusiasts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}