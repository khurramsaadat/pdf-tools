'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  FiSearch, 
  FiBook, 
  FiHelpCircle, 
  FiTool, 
  FiFile, 
  FiImage, 
  FiLayers, 
  FiScissors,
  FiMinimize2,
  FiLock,
  FiEdit3,
  FiRotateCw,
  FiHash,
  FiDroplet,
  FiShield,
  FiUnlock,
  FiChevronRight,
  FiClock,
  FiTrendingUp
} from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    {
      title: "Convert PDFs",
      description: "Learn how to convert PDFs to and from various formats",
      icon: FiFile,
      color: "from-blue-500 to-blue-600",
      articles: [
        { title: "PDF to Word Conversion Guide", href: "/knowledge-base/articles/pdf-to-word", time: "5 min read" },
        { title: "Converting PDFs to Images", href: "/knowledge-base/articles/pdf-to-images", time: "4 min read" },
        { title: "Word to PDF Best Practices", href: "/knowledge-base/articles/word-to-pdf", time: "6 min read" },
        { title: "Excel to PDF Conversion", href: "/knowledge-base/articles/excel-to-pdf", time: "4 min read" },
        { title: "PowerPoint to PDF Guide", href: "/knowledge-base/articles/powerpoint-to-pdf", time: "5 min read" }
      ]
    },
    {
      title: "Edit & Manage",
      description: "Master PDF editing, merging, and management tools",
      icon: FiEdit3,
      color: "from-green-500 to-green-600",
      articles: [
        { title: "How to Merge PDF Files", href: "/knowledge-base/articles/merge-pdfs", time: "6 min read" },
        { title: "Splitting PDFs Effectively", href: "/knowledge-base/articles/split-pdfs", time: "5 min read" },
        { title: "PDF Compression Techniques", href: "/knowledge-base/articles/compress-pdfs", time: "7 min read" },
        { title: "Editing PDF Content", href: "/knowledge-base/articles/edit-pdfs", time: "8 min read" },
        { title: "Rotating PDF Pages", href: "/knowledge-base/articles/rotate-pdfs", time: "3 min read" }
      ]
    },
    {
      title: "Security & Protection",
      description: "Secure your PDFs with passwords and permissions",
      icon: FiShield,
      color: "from-red-500 to-red-600",
      articles: [
        { title: "Password Protecting PDFs", href: "/knowledge-base/articles/password-protect", time: "5 min read" },
        { title: "Removing PDF Restrictions", href: "/knowledge-base/articles/remove-protection", time: "4 min read" },
        { title: "Understanding PDF Security", href: "/knowledge-base/articles/pdf-security", time: "8 min read" },
        { title: "Digital Signatures Guide", href: "/knowledge-base/articles/digital-signatures", time: "6 min read" }
      ]
    },
    {
      title: "Optimization",
      description: "Optimize PDFs for better performance and sharing",
      icon: FiTrendingUp,
      color: "from-purple-500 to-purple-600",
      articles: [
        { title: "PDF Size Optimization", href: "/knowledge-base/articles/optimize-size", time: "6 min read" },
        { title: "Adding Watermarks", href: "/knowledge-base/articles/add-watermarks", time: "4 min read" },
        { title: "Page Numbering Guide", href: "/knowledge-base/articles/page-numbers", time: "3 min read" },
        { title: "Image Quality in PDFs", href: "/knowledge-base/articles/image-quality", time: "7 min read" }
      ]
    }
  ]

  const quickLinks = [
    { title: "Getting Started", href: "/knowledge-base/tutorials", icon: FiBook },
    { title: "FAQ", href: "/knowledge-base/faq", icon: FiHelpCircle },
    { title: "Troubleshooting", href: "/knowledge-base/troubleshooting", icon: FiTool },
  ]



  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    searchTerm === '' || 
    category.articles.length > 0 ||
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Knowledge Base
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Everything you need to know about PDF processing, conversion, and management. 
            Find tutorials, guides, and solutions to common problems.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles, tutorials, and guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Quick Links */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon
                return (
                  <Link 
                    key={index}
                    href={link.href}
                    className="group bg-gray-700 rounded-xl p-6 hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-600 p-3 rounded-lg group-hover:bg-blue-500 transition-colors">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {link.title}
                        </h3>
                        <FiChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>



          {/* Categories */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredCategories.map((category, index) => {
                const IconComponent = category.icon
                return (
                  <div key={index} className="bg-gray-700 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                        <p className="text-gray-400 text-sm">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {category.articles.map((article, articleIndex) => (
                        <Link 
                          key={articleIndex}
                          href={article.href}
                          className="flex items-center justify-between p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors group"
                        >
                          <div className="flex-1">
                            <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                              {article.title}
                            </h4>
                            <div className="flex items-center text-gray-400 text-sm mt-1">
                              <FiClock className="h-3 w-3 mr-1" />
                              {article.time}
                            </div>
                          </div>
                          <FiChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* No Results */}
          {searchTerm && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <FiSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-gray-400">
                Try searching with different keywords or browse our categories above.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
