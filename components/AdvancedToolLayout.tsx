import Link from 'next/link'
import { ReactNode } from 'react'
import { FiArrowLeft, FiStar } from 'react-icons/fi'
import Navbar from './Navbar'
import Footer from './Footer'

interface AdvancedToolLayoutProps {
  children: ReactNode
  title: string
  description: string
  icon: ReactNode
}

export default function AdvancedToolLayout({ 
  children, 
  title, 
  description, 
  icon 
}: AdvancedToolLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          {/* Tool Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-full mr-4">
                {icon}
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <FiStar className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-yellow-500 uppercase tracking-wide">
                    Advanced Tool
                  </span>
                  <FiStar className="h-5 w-5 text-yellow-500 ml-2" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {title}
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>

      <Footer />
    </div>
  )
}
