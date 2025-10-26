import Link from 'next/link'
import { ReactNode } from 'react'
import { FiArrowLeft, FiStar } from 'react-icons/fi'
import Navbar from './Navbar'
import Footer from './Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-white mb-6">
            <Link href="/">
              <FiArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          {/* Tool Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-5">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-full mr-4">
                {icon}
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <FiStar className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-xs font-medium text-yellow-500 uppercase tracking-wide">
                    Advanced Tool
                  </span>
                  <FiStar className="h-4 w-4 text-yellow-500 ml-2" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {title}
                </h1>
                <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Enhanced Features Banner */}
      <section className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-t border-yellow-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-700/50">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <FiStar className="h-5 w-5 text-yellow-400 mr-2" />
                  <h3 className="text-lg font-bold text-white">Enhanced Processing</h3>
                  <FiStar className="h-5 w-5 text-yellow-400 ml-2" />
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  This advanced tool provides enhanced features and processing capabilities for professional document workflows.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Advanced Processing
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Professional Quality
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Enhanced Options
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}