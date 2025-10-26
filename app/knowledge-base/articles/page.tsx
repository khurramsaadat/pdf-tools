'use client'

import Link from 'next/link'
import { FiArrowLeft, FiFile, FiClock, FiEye } from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ArticlesPage() {
  const allArticles = [
    {
      title: "How to Merge Multiple PDFs into One",
      description: "Complete guide to combining PDF files with advanced options for quality and organization.",
      href: "/knowledge-base/articles/merge-pdfs",
      category: "Edit & Manage",
      readTime: "6 min read",
      views: "12.3k views",
      difficulty: "Beginner",
      lastUpdated: "2024-11-08"
    },
    {
      title: "Converting PDF to Word Without Losing Format",
      description: "Learn how to convert PDFs to editable Word documents while preserving layout and formatting.",
      href: "/knowledge-base/articles/pdf-to-word",
      category: "Convert PDFs",
      readTime: "5 min read",
      views: "8.7k views",
      difficulty: "Beginner",
      lastUpdated: "2024-11-07"
    },
    {
      title: "Compressing PDFs for Email and Storage",
      description: "Reduce PDF file sizes by up to 90% while maintaining quality for easy sharing.",
      href: "/knowledge-base/articles/compress-pdfs",
      category: "Optimization",
      readTime: "7 min read",
      views: "6.2k views",
      difficulty: "Intermediate",
      lastUpdated: "2024-11-06"
    },
    {
      title: "Password Protecting Sensitive Documents",
      description: "Secure your PDFs with encryption and access controls to protect confidential information.",
      href: "/knowledge-base/articles/password-protect",
      category: "Security & Protection",
      readTime: "5 min read",
      views: "5.4k views",
      difficulty: "Beginner",
      lastUpdated: "2024-11-05"
    },
    {
      title: "Converting Images to PDF Documents",
      description: "Transform JPG, PNG, TIFF and other image formats into professional PDF documents.",
      href: "/knowledge-base/articles/image-to-pdf",
      category: "Convert PDFs",
      readTime: "4 min read",
      views: "4.9k views",
      difficulty: "Beginner",
      lastUpdated: "2024-11-04"
    },
    {
      title: "Splitting Large PDF Files Effectively",
      description: "Extract specific pages or divide large PDFs into smaller, manageable documents.",
      href: "/knowledge-base/articles/split-pdfs",
      category: "Edit & Manage",
      readTime: "5 min read",
      views: "4.1k views",
      difficulty: "Beginner",
      lastUpdated: "2024-11-03"
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/knowledge-base" 
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to Knowledge Base
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Articles
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive guides and tutorials for all PDF processing tasks.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allArticles.map((article, index) => (
              <Link 
                key={index}
                href={article.href}
                className="group bg-gray-700 rounded-xl p-6 hover:bg-gray-600 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {article.category}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                    {article.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                  {article.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FiClock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center">
                      <FiEye className="h-4 w-4 mr-1" />
                      {article.views}
                    </div>
                  </div>
                  <div>
                    Updated {new Date(article.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
