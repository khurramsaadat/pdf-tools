'use client'

import Link from 'next/link'
import { 
  FiArrowLeft, 
  FiBook, 
  FiPlay, 
  FiClock, 
  FiUsers, 
  FiTrendingUp,
  FiFile,
  FiLayers,
  FiScissors,
  FiMinimize2,
  FiShield,
  FiImage,
  FiEdit3
} from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TutorialsPage() {
  const tutorialCategories = [
    {
      title: "Getting Started",
      description: "New to PDF processing? Start here with our beginner-friendly guides.",
      color: "from-green-500 to-green-600",
      icon: FiBook,
      tutorials: [
        {
          title: "Your First PDF Conversion",
          description: "Learn the basics of converting PDFs to Word, images, and other formats.",
          duration: "8 min",
          difficulty: "Beginner",
          href: "/knowledge-base/tutorials/first-conversion"
        },
        {
          title: "Understanding PDF Formats",
          description: "What makes PDFs special and when to use different file formats.",
          duration: "6 min", 
          difficulty: "Beginner",
          href: "/knowledge-base/tutorials/pdf-formats"
        },
        {
          title: "Choosing the Right Tool",
          description: "A guide to selecting the best PDF tool for your specific needs.",
          duration: "5 min",
          difficulty: "Beginner", 
          href: "/knowledge-base/tutorials/choosing-tools"
        }
      ]
    },
    {
      title: "Document Management",
      description: "Master the art of organizing, combining, and managing PDF documents.",
      color: "from-blue-500 to-blue-600", 
      icon: FiLayers,
      tutorials: [
        {
          title: "Advanced PDF Merging Techniques",
          description: "Go beyond basic merging with selective pages, bookmarks, and quality control.",
          duration: "12 min",
          difficulty: "Intermediate",
          href: "/knowledge-base/tutorials/advanced-merging"
        },
        {
          title: "Strategic Document Splitting", 
          description: "Learn when and how to split documents for better organization and sharing.",
          duration: "10 min",
          difficulty: "Intermediate",
          href: "/knowledge-base/tutorials/strategic-splitting"
        },
        {
          title: "Creating Document Packages",
          description: "Combine multiple file types into comprehensive PDF packages.",
          duration: "15 min",
          difficulty: "Advanced",
          href: "/knowledge-base/tutorials/document-packages"
        }
      ]
    },
    {
      title: "Optimization & Quality",
      description: "Learn to optimize PDFs for different purposes while maintaining quality.",
      color: "from-purple-500 to-purple-600",
      icon: FiTrendingUp,
      tutorials: [
        {
          title: "PDF Compression Mastery",
          description: "Reduce file sizes effectively while preserving visual quality and readability.",
          duration: "14 min",
          difficulty: "Intermediate", 
          href: "/knowledge-base/tutorials/compression-mastery"
        },
        {
          title: "Image Quality Optimization",
          description: "Balance image quality and file size for different use cases.",
          duration: "11 min",
          difficulty: "Intermediate",
          href: "/knowledge-base/tutorials/image-optimization"
        },
        {
          title: "Web-Ready PDF Creation",
          description: "Optimize PDFs for fast loading on websites and online platforms.",
          duration: "9 min",
          difficulty: "Advanced",
          href: "/knowledge-base/tutorials/web-ready-pdfs"
        }
      ]
    },
    {
      title: "Security & Protection",
      description: "Protect your documents with passwords, permissions, and digital signatures.",
      color: "from-red-500 to-red-600",
      icon: FiShield,
      tutorials: [
        {
          title: "Password Protection Best Practices",
          description: "Secure your PDFs with strong passwords and appropriate permission settings.",
          duration: "10 min",
          difficulty: "Beginner",
          href: "/knowledge-base/tutorials/password-protection"
        },
        {
          title: "Understanding PDF Security Levels",
          description: "Learn about different security options and when to use each one.",
          duration: "13 min", 
          difficulty: "Intermediate",
          href: "/knowledge-base/tutorials/security-levels"
        },
        {
          title: "Digital Signatures and Compliance",
          description: "Add digital signatures and ensure compliance with industry standards.",
          duration: "16 min",
          difficulty: "Advanced", 
          href: "/knowledge-base/tutorials/digital-signatures"
        }
      ]
    },
    {
      title: "Business Workflows",
      description: "Streamline your business processes with efficient PDF workflows.",
      color: "from-orange-500 to-orange-600",
      icon: FiUsers,
      tutorials: [
        {
          title: "Creating Professional Reports",
          description: "Combine data, charts, and documents into polished business reports.",
          duration: "18 min",
          difficulty: "Intermediate",
          href: "/knowledge-base/tutorials/professional-reports"
        },
        {
          title: "Contract Management Workflow",
          description: "Efficiently handle contract reviews, signatures, and storage.",
          duration: "20 min",
          difficulty: "Advanced",
          href: "/knowledge-base/tutorials/contract-workflow"
        },
        {
          title: "Team Collaboration with PDFs",
          description: "Share, review, and collaborate on PDF documents across teams.",
          duration: "15 min",
          difficulty: "Intermediate",
          href: "/knowledge-base/tutorials/team-collaboration"
        }
      ]
    }
  ]

  const featuredTutorials = [
    {
      title: "Complete PDF Workflow Guide",
      description: "A comprehensive tutorial covering the entire PDF processing workflow from creation to distribution.",
      duration: "45 min",
      difficulty: "All Levels",
      views: "15.2k",
      href: "/knowledge-base/tutorials/complete-workflow"
    },
    {
      title: "PDF Automation for Businesses", 
      description: "Learn how to automate repetitive PDF tasks and integrate with business systems.",
      duration: "30 min",
      difficulty: "Advanced",
      views: "8.7k",
      href: "/knowledge-base/tutorials/pdf-automation"
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      case 'All Levels': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-green-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/knowledge-base" 
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to Knowledge Base
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tutorials & Guides
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Step-by-step tutorials to help you master PDF processing, from basic operations to advanced workflows.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">25+</div>
              <div className="text-gray-400 text-sm">Video Tutorials</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">6h+</div>
              <div className="text-gray-400 text-sm">Total Content</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">50k+</div>
              <div className="text-gray-400 text-sm">Students Taught</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-12 bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <FiPlay className="h-6 w-6 text-green-500 mr-2" />
            Featured Tutorials
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredTutorials.map((tutorial, index) => (
              <Link 
                key={index}
                href={tutorial.href}
                className="group bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl p-6 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <FiUsers className="h-4 w-4 mr-1" />
                    {tutorial.views}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
                  {tutorial.title}
                </h3>
                
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                  {tutorial.description}
                </p>

                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="h-4 w-4 mr-1" />
                  {tutorial.duration}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorial Categories */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Browse by Category</h2>
          
          <div className="space-y-12">
            {tutorialCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon
              return (
                <div key={categoryIndex}>
                  <div className="flex items-center mb-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                      <p className="text-gray-400 text-sm">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.tutorials.map((tutorial, tutorialIndex) => (
                      <Link 
                        key={tutorialIndex}
                        href={tutorial.href}
                        className="group bg-gray-700 rounded-xl p-6 hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                            {tutorial.difficulty}
                          </span>
                          <FiPlay className="h-5 w-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                        </div>

                        <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
                          {tutorial.title}
                        </h4>
                        
                        <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors text-sm">
                          {tutorial.description}
                        </p>

                        <div className="flex items-center text-sm text-gray-500">
                          <FiClock className="h-4 w-4 mr-1" />
                          {tutorial.duration}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Learning Path CTA */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-center mt-16">
            <h3 className="text-xl font-bold text-white mb-4">Ready to Become a PDF Pro?</h3>
            <p className="text-green-100 mb-6">
              Follow our structured learning path and master PDF processing in just a few hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/knowledge-base/tutorials/complete-workflow"
                className="inline-flex items-center bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiPlay className="mr-2 h-4 w-4" />
                Start Learning Path
              </Link>
              <Link 
                href="/knowledge-base"
                className="inline-flex items-center bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-800 transition-colors"
              >
                Browse All Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
