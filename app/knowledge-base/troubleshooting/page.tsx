'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  FiArrowLeft, 
  FiSearch, 
  FiTool, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiInfo,
  FiUpload,
  FiDownload,
  FiRefreshCw,
  FiWifi,
  FiFile,
  FiLock
} from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TroubleshootingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const troubleshootingGuides = [
    {
      category: "Upload Issues",
      icon: FiUpload,
      color: "text-blue-500",
      problems: [
        {
          title: "File upload keeps failing",
          symptoms: ["Upload progress bar stops", "Error message appears", "File doesn't appear in list"],
          causes: ["File size too large (>10MB)", "Unsupported file format", "Poor internet connection", "Browser cache issues"],
          solutions: [
            "Check file size - compress if over 10MB using our compression tool first",
            "Verify file format - we support PDF, DOCX, XLSX, PPTX, JPG, PNG, TIFF",
            "Test internet connection - try uploading a smaller file first",
            "Clear browser cache and cookies, then try again",
            "Disable browser extensions that might interfere",
            "Try using a different browser (Chrome, Firefox, Safari)"
          ]
        },
        {
          title: "Upload is extremely slow",
          symptoms: ["Progress bar moves very slowly", "Upload takes several minutes", "Browser becomes unresponsive"],
          causes: ["Large file size", "Slow internet connection", "Server load", "Browser limitations"],
          solutions: [
            "Compress files before uploading to reduce size",
            "Check internet speed - consider using faster connection",
            "Upload during off-peak hours (early morning/late evening)",
            "Close other browser tabs and applications",
            "Try uploading files one at a time instead of batch upload"
          ]
        },
        {
          title: "Drag and drop not working",
          symptoms: ["Files don't appear when dragged", "Drop zone doesn't highlight", "Click to browse works but drag doesn't"],
          causes: ["Browser compatibility", "JavaScript disabled", "Browser security settings"],
          solutions: [
            "Use 'Browse Files' button as alternative",
            "Enable JavaScript in browser settings",
            "Update browser to latest version",
            "Try different browser if issue persists",
            "Check if browser has drag-drop restrictions enabled"
          ]
        }
      ]
    },
    {
      category: "Processing Errors",
      icon: FiRefreshCw,
      color: "text-orange-500",
      problems: [
        {
          title: "Processing takes too long or times out",
          symptoms: ["Operation runs for over 5 minutes", "Browser shows 'timeout' error", "Page becomes unresponsive"],
          causes: ["Very large files", "Complex PDF structure", "Server overload", "Browser memory issues"],
          solutions: [
            "Split large files into smaller parts first",
            "Try processing during off-peak hours",
            "Close other browser tabs to free memory",
            "Refresh page and try again with smaller files",
            "Use 'Maximum Compression' setting for faster processing"
          ]
        },
        {
          title: "Conversion fails with error message",
          symptoms: ["Error popup appears", "Download doesn't start", "Process stops unexpectedly"],
          causes: ["Corrupted source file", "Password protection", "Unsupported content", "File format issues"],
          solutions: [
            "Try opening source file in original application to verify it's not corrupted",
            "Remove password protection before conversion if applicable",
            "Simplify complex formatting in source document",
            "Save source file in a different format and try again",
            "Contact support if error persists with file details"
          ]
        },
        {
          title: "Merged PDF has wrong page order",
          symptoms: ["Pages appear in incorrect sequence", "Files merged in unexpected order", "Pages missing or duplicated"],
          causes: ["Files uploaded in wrong order", "Page selection errors", "Browser caching old order"],
          solutions: [
            "Use drag-and-drop to reorder files before merging",
            "Check file order preview before clicking merge",
            "Use 'Clear All' and re-upload files in correct order",
            "For page selection, verify thumbnail selection matches intent",
            "Try 'Reverse Order' option if files are backwards"
          ]
        }
      ]
    },
    {
      category: "Download Problems",
      icon: FiDownload,
      color: "text-green-500",
      problems: [
        {
          title: "Processed file won't download",
          symptoms: ["Download button doesn't work", "File downloads but is 0 bytes", "Download starts but fails"],
          causes: ["Browser download restrictions", "Popup blocker interference", "Network interruption", "Disk space"],
          solutions: [
            "Right-click download link and 'Save Link As'",
            "Disable popup blocker for our site",
            "Check available disk space on device",
            "Try downloading with different browser",
            "Clear browser downloads folder if it's full"
          ]
        },
        {
          title: "Downloaded file is corrupted or won't open",
          symptoms: ["PDF reader shows error", "File appears damaged", "Can't open with any application"],
          causes: ["Incomplete download", "Processing error", "Antivirus interference", "File association issues"],
          solutions: [
            "Download file again - ensure complete download",
            "Try opening with different PDF reader (Adobe, Chrome, Firefox)",
            "Temporarily disable antivirus and re-download",
            "Check file size - compare with expected size",
            "Clear browser cache and try processing again"
          ]
        }
      ]
    },
    {
      category: "Quality Issues",
      icon: FiFile,
      color: "text-purple-500",
      problems: [
        {
          title: "Converted document loses formatting",
          symptoms: ["Text alignment changes", "Fonts look different", "Images moved or resized", "Tables broken"],
          causes: ["Format differences", "Font availability", "Complex layouts", "Compression settings"],
          solutions: [
            "Use 'High Quality' setting instead of compression",
            "Convert simpler documents for better results",
            "Save source in compatible fonts before conversion",
            "Try PDF to HTML then HTML to target format",
            "For complex layouts, consider converting to images instead"
          ]
        },
        {
          title: "Images appear blurry or pixelated",
          symptoms: ["Low resolution images", "Blurry text", "Pixelated graphics", "Poor print quality"],
          causes: ["High compression", "Low source resolution", "Format conversion", "Size reduction"],
          solutions: [
            "Use 'High Quality' or 'Balanced' compression setting",
            "Start with higher resolution source images",
            "Avoid 'Maximum Compression' for image-heavy documents",
            "For printing, use 'High Quality' setting always",
            "Consider PNG format for images with text"
          ]
        },
        {
          title: "File size is too large after processing",
          symptoms: ["Output file bigger than expected", "Email attachment size limit exceeded", "Slow to share or view"],
          causes: ["High quality settings", "Uncompressed images", "Multiple large files merged"],
          solutions: [
            "Use 'Web Optimized' or 'Maximum Compression' settings",
            "Compress individual files before merging",
            "Remove unnecessary pages before processing",
            "Convert high-resolution images to lower resolution first",
            "Use our separate compression tool after processing"
          ]
        }
      ]
    },
    {
      category: "Security & Access",
      icon: FiLock,
      color: "text-red-500",
      problems: [
        {
          title: "Can't process password-protected PDF",
          symptoms: ["Upload succeeds but processing fails", "Password prompt appears", "Access denied error"],
          causes: ["PDF has password protection", "Encryption restrictions", "Permission settings"],
          solutions: [
            "Remove password protection first using our 'Remove Protection' tool",
            "Get password from document owner",
            "If you know password, use 'Remove Protection' with password first",
            "Check if PDF has printing/editing restrictions vs opening password",
            "Try opening PDF in reader to verify password works"
          ]
        },
        {
          title: "Processed file has unexpected restrictions",
          symptoms: ["Can't print processed PDF", "Can't copy text", "Can't edit converted document"],
          causes: ["Source restrictions copied", "Conversion limitations", "Security settings preserved"],
          solutions: [
            "Remove restrictions from source file first",
            "Use 'Remove Protection' tool before conversion",
            "Check if target format supports desired features",
            "Try converting through intermediate format (PDF → Word → PDF)",
            "Verify source file doesn't have hidden restrictions"
          ]
        }
      ]
    },
    {
      category: "Browser & Compatibility",
      icon: FiWifi,
      color: "text-indigo-500",
      problems: [
        {
          title: "Tool doesn't work in my browser",
          symptoms: ["Buttons don't respond", "Upload area not visible", "Page layout broken", "JavaScript errors"],
          causes: ["Outdated browser", "JavaScript disabled", "Ad blockers", "Browser compatibility"],
          solutions: [
            "Update browser to latest version",
            "Enable JavaScript in browser settings",
            "Disable ad blockers for our site",
            "Try in incognito/private browsing mode",
            "Switch to supported browser: Chrome, Firefox, Safari, Edge"
          ]
        },
        {
          title: "Mobile device issues",
          symptoms: ["Touch controls don't work", "Text too small", "Buttons hard to tap", "Upload difficult"],
          causes: ["Mobile browser limitations", "Touch interface issues", "Screen size constraints"],
          solutions: [
            "Use mobile browser's desktop mode",
            "Zoom in for better touch accuracy",
            "Use 'Browse Files' instead of drag-and-drop",
            "Switch to landscape mode for better layout",
            "Consider using desktop/laptop for complex operations"
          ]
        }
      ]
    }
  ]

  const filteredGuides = troubleshootingGuides.filter(guide => {
    if (selectedCategory !== 'all' && guide.category !== selectedCategory) return false
    
    if (searchTerm === '') return true
    
    return (
      guide.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.problems.some(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase())) ||
        problem.causes.some(cause => cause.toLowerCase().includes(searchTerm.toLowerCase())) ||
        problem.solutions.some(solution => solution.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    )
  })

  const categories = ['all', ...troubleshootingGuides.map(guide => guide.category)]

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-red-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/knowledge-base" 
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to Knowledge Base
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Troubleshooting Guide
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Solve common issues quickly with our comprehensive troubleshooting guide. Find solutions to upload problems, processing errors, and quality issues.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for problems, symptoms, or solutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting Content */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredGuides.map((guide, guideIndex) => {
            const IconComponent = guide.icon
            return (
              <div key={guideIndex} className="mb-16">
                <div className="flex items-center mb-8">
                  <IconComponent className={`h-8 w-8 ${guide.color} mr-4`} />
                  <h2 className="text-2xl font-bold text-white">{guide.category}</h2>
                </div>
                
                <div className="space-y-8">
                  {guide.problems.map((problem, problemIndex) => (
                    <div key={problemIndex} className="bg-gray-700 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <FiAlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                        {problem.title}
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Symptoms */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                            <FiInfo className="h-4 w-4 mr-2" />
                            SYMPTOMS
                          </h4>
                          <ul className="space-y-2">
                            {problem.symptoms.map((symptom, index) => (
                              <li key={index} className="text-gray-400 text-sm flex items-start">
                                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Causes */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                            <FiTool className="h-4 w-4 mr-2" />
                            POSSIBLE CAUSES
                          </h4>
                          <ul className="space-y-2">
                            {problem.causes.map((cause, index) => (
                              <li key={index} className="text-gray-400 text-sm flex items-start">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Solutions */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                            <FiCheckCircle className="h-4 w-4 mr-2" />
                            SOLUTIONS
                          </h4>
                          <ul className="space-y-2">
                            {problem.solutions.map((solution, index) => (
                              <li key={index} className="text-gray-400 text-sm flex items-start">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* No Results */}
          {filteredGuides.length === 0 && (
            <div className="text-center py-12">
              <FiSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">
                We couldn&apos;t find any troubleshooting guides matching your search. Try different keywords or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Clear search and show all guides
              </button>
            </div>
          )}

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-8 text-center mt-16">
            <h3 className="text-xl font-bold text-white mb-4">Still experiencing issues?</h3>
            <p className="text-red-100 mb-6">
              If these solutions don&apos;t solve your problem, our support team is here to help with personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center bg-white text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </Link>
              <Link 
                href="/knowledge-base/faq"
                className="inline-flex items-center bg-red-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-800 transition-colors"
              >
                Check FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
