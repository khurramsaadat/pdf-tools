'use client'

import Link from 'next/link'
import { FiArrowLeft, FiClock, FiEye, FiCheck, FiArrowRight, FiDownload, FiInfo } from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function MergePDFsArticle() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-orange-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/knowledge-base" 
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to Knowledge Base
          </Link>

          <div className="flex items-center space-x-4 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              Edit & Manage
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Beginner
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How to Merge Multiple PDFs into One
          </h1>
          
          <div className="flex items-center space-x-6 text-gray-300 mb-6">
            <div className="flex items-center">
              <FiClock className="h-4 w-4 mr-1" />
              6 min read
            </div>
            <div className="flex items-center">
              <FiEye className="h-4 w-4 mr-1" />
              12.3k views
            </div>
            <div>
              Updated November 8, 2024
            </div>
          </div>

          <p className="text-xl text-gray-300 max-w-3xl">
            Learn how to combine multiple PDF files into a single document using our professional merge tool. 
            Perfect for consolidating reports, presentations, contracts, and other documents.
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Table of Contents */}
            <div className="bg-gray-700 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Table of Contents</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#overview" className="hover:text-blue-400 transition-colors">1. Overview</a></li>
                <li><a href="#step-by-step" className="hover:text-blue-400 transition-colors">2. Step-by-Step Guide</a></li>
                <li><a href="#advanced-options" className="hover:text-blue-400 transition-colors">3. Advanced Merge Options</a></li>
                <li><a href="#best-practices" className="hover:text-blue-400 transition-colors">4. Best Practices</a></li>
                <li><a href="#troubleshooting" className="hover:text-blue-400 transition-colors">5. Troubleshooting</a></li>
                <li><a href="#business-use-cases" className="hover:text-blue-400 transition-colors">6. Business Use Cases</a></li>
              </ul>
            </div>

            {/* Overview Section */}
            <div id="overview" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">1. Overview</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <FiInfo className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-800 mb-1">Why Merge PDFs?</h4>
                    <p className="text-sm text-blue-700">
                      Merging PDFs helps consolidate related documents, reduces file management overhead, 
                      and creates professional document packages for sharing with clients or stakeholders.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-gray-300 space-y-4">
                <p>
                  PDF merging is one of the most commonly requested document processing tasks in business environments. 
                  Whether you&apos;re combining multiple reports, consolidating contracts, or creating a comprehensive document package, 
                  our merge tool provides professional-grade features with an intuitive interface.
                </p>
                
                <p>
                  Our PDF merge tool supports:
                </p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Unlimited file combining with no size restrictions</li>
                  <li>Drag-and-drop reordering for custom organization</li>
                  <li>Selective page merging from multiple documents</li>
                  <li>Quality preservation with multiple compression options</li>
                  <li>Bookmark and hyperlink preservation</li>
                  <li>Password-protected file handling</li>
                </ul>
              </div>
            </div>

            {/* Step-by-Step Guide */}
            <div id="step-by-step" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">2. Step-by-Step Guide</h2>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-white">Upload Your PDF Files</h3>
                  </div>
                  <div className="text-gray-300 space-y-3">
                    <p>Navigate to our <Link href="/merge" className="text-blue-400 hover:underline">PDF Merge Tool</Link> and upload your files using one of these methods:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>Drag & Drop:</strong> Simply drag your PDF files into the upload area</li>
                      <li><strong>Browse Files:</strong> Click the upload area and select files from your computer</li>
                      <li><strong>Batch Upload:</strong> Select multiple files at once using Ctrl+Click (Windows) or Cmd+Click (Mac)</li>
                    </ul>
                    <div className="bg-gray-600 rounded p-3 mt-4">
                      <p className="text-sm text-gray-300">
                        <strong>Tip:</strong> Our tool supports files up to 10MB each and you can merge up to 20 files at once.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-white">Organize File Order</h3>
                  </div>
                  <div className="text-gray-300 space-y-3">
                    <p>Once uploaded, you can customize the order of your files:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>Drag & Drop:</strong> Drag files up or down to reorder them</li>
                      <li><strong>Arrow Buttons:</strong> Use the up/down arrows next to each file</li>
                      <li><strong>Quick Sort:</strong> Use quick sort options (A-Z, by size, reverse order)</li>
                    </ul>
                    <div className="bg-orange-50 border border-orange-200 rounded p-3 mt-4">
                      <p className="text-sm text-orange-800">
                        <strong>Important:</strong> The order shown here will be the final order in your merged PDF.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-white">Configure Merge Settings</h3>
                  </div>
                  <div className="text-gray-300 space-y-3">
                    <p>Choose your merge options for optimal results:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>Merge Type:</strong> Sequential (recommended) or Custom Page Selection</li>
                      <li><strong>Quality Level:</strong> Balanced, High Quality, Web Optimized, or Maximum Compression</li>
                      <li><strong>Output Filename:</strong> Customize the name of your merged file</li>
                      <li><strong>Preserve Options:</strong> Keep bookmarks and hyperlinks intact</li>
                    </ul>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                      4
                    </div>
                    <h3 className="text-lg font-semibold text-white">Merge and Download</h3>
                  </div>
                  <div className="text-gray-300 space-y-3">
                    <p>Complete the merge process:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Click the &quot;Merge All Pages&quot; button to combine all files</li>
                      <li>Wait for processing (usually takes 10-30 seconds depending on file sizes)</li>
                      <li>Your merged PDF will automatically download when ready</li>
                      <li>Files are automatically deleted from our servers after 1 hour for security</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div id="advanced-options" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">3. Advanced Merge Options</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Selective Page Merging</h3>
                  <div className="text-gray-300 space-y-3">
                    <p>
                      For more control over your merged document, use our selective page merging feature:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>View thumbnail previews of all pages from uploaded files</li>
                      <li>Select specific pages from each document</li>
                      <li>Arrange selected pages in any order</li>
                      <li>Perfect for creating custom document compilations</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quality Control Options</h3>
                  <div className="text-gray-300 space-y-3">
                    <p>Choose the right quality setting for your needs:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-600 rounded p-4">
                        <h4 className="font-semibold text-white mb-2">High Quality</h4>
                        <p className="text-sm">Best for printing and archival purposes. Larger file sizes.</p>
                      </div>
                      <div className="bg-gray-600 rounded p-4">
                        <h4 className="font-semibold text-white mb-2">Balanced (Recommended)</h4>
                        <p className="text-sm">Optimal balance between quality and file size.</p>
                      </div>
                      <div className="bg-gray-600 rounded p-4">
                        <h4 className="font-semibold text-white mb-2">Web Optimized</h4>
                        <p className="text-sm">Smaller files perfect for email and web sharing.</p>
                      </div>
                      <div className="bg-gray-600 rounded p-4">
                        <h4 className="font-semibold text-white mb-2">Maximum Compression</h4>
                        <p className="text-sm">Smallest file sizes with acceptable quality loss.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div id="best-practices" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">4. Best Practices</h2>
              
              <div className="space-y-4 text-gray-300">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <FiCheck className="h-4 w-4 mr-2" />
                    Do&apos;s
                  </h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Organize files logically before uploading</li>
                    <li>• Use descriptive filenames for better organization</li>
                    <li>• Choose appropriate quality settings for your use case</li>
                    <li>• Test merged files before sharing with others</li>
                    <li>• Keep original files as backups</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <FiInfo className="h-4 w-4 mr-2" />
                    Don&apos;ts
                  </h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Don&apos;t merge extremely large files without testing first</li>
                    <li>• Avoid mixing different page orientations when possible</li>
                    <li>• Don&apos;t forget to check the final file order before merging</li>
                    <li>• Never merge confidential files on unsecured networks</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Business Use Cases */}
            <div id="business-use-cases" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">6. Business Use Cases</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Legal & Compliance</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Contract compilation and review packages</li>
                    <li>• Legal brief assembly with evidence</li>
                    <li>• Compliance report consolidation</li>
                    <li>• Case file organization</li>
                  </ul>
                </div>

                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Business Operations</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Quarterly report compilation</li>
                    <li>• Employee handbook creation</li>
                    <li>• Training material consolidation</li>
                    <li>• Proposal and bid document assembly</li>
                  </ul>
                </div>

                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Academia & Research</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Research paper compilation</li>
                    <li>• Thesis chapter assembly</li>
                    <li>• Course material organization</li>
                    <li>• Academic portfolio creation</li>
                  </ul>
                </div>

                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Marketing & Sales</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Marketing collateral packages</li>
                    <li>• Sales presentation bundles</li>
                    <li>• Product catalog compilation</li>
                    <li>• Client proposal assembly</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Ready to Merge Your PDFs?</h3>
              <p className="text-orange-100 mb-6">
                Try our professional PDF merge tool with advanced features and quality preservation.
              </p>
              <Link 
                href="/merge"
                className="inline-flex items-center bg-white text-orange-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Start Merging PDFs
                <FiArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
