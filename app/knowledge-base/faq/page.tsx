'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiArrowLeft, FiSearch, FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqCategories = [
    {
      category: "General Questions",
      questions: [
        {
          question: "Is PDF Tools Online really free to use?",
          answer: "Yes! All our basic PDF tools are completely free with no registration required. You can process unlimited files without any hidden costs. We do offer advanced features for power users, but our core functionality remains free for everyone."
        },
        {
          question: "Do you store or keep my uploaded files?",
          answer: "No, we prioritize your privacy and security. All uploaded files are automatically deleted from our servers within 1 hour after processing. We never store, access, or share your documents with third parties."
        },
        {
          question: "What file formats do you support?",
          answer: "We support PDF files as the primary format, along with conversions to/from Word (DOCX), Excel (XLSX), PowerPoint (PPTX), and various image formats (JPG, PNG, TIFF, BMP). Our tools are optimized for these standard business formats."
        },
        {
          question: "Is there a file size limit?",
          answer: "Individual files can be up to 10MB in size. For merge operations, you can combine up to 20 files at once. If you need to process larger files, consider compressing them first or splitting them into smaller parts."
        },
        {
          question: "Can I use your tools on mobile devices?",
          answer: "Absolutely! Our tools are fully responsive and work on smartphones, tablets, and desktop computers. The interface automatically adapts to your screen size for optimal usability."
        }
      ]
    },
    {
      category: "PDF Conversion",
      questions: [
        {
          question: "Why does my converted Word document look different from the original PDF?",
          answer: "PDF to Word conversion can be complex due to formatting differences between the formats. PDFs with complex layouts, scanned images, or unusual fonts may not convert perfectly. For best results, use PDFs that were originally created from Word documents."
        },
        {
          question: "Can I convert password-protected PDFs?",
          answer: "You cannot convert password-protected PDFs unless you first remove the password protection. If you have the password, you can use our 'Remove Protection' tool first, then proceed with conversion."
        },
        {
          question: "What&apos;s the difference between PDF to Image and PDF to Word conversion?",
          answer: "PDF to Image creates picture files (JPG, PNG) of your PDF pages - the text becomes part of the image and cannot be edited. PDF to Word creates an editable document where you can modify text, formatting, and layout."
        },
        {
          question: "How do I maintain formatting when converting Word to PDF?",
          answer: "Our Word to PDF converter preserves most formatting automatically. For best results, avoid using unusual fonts, complex layouts, or custom styles that may not translate perfectly to PDF format."
        }
      ]
    },
    {
      category: "PDF Merging & Splitting",
      questions: [
        {
          question: "Can I merge PDFs with different page sizes?",
          answer: "Yes, you can merge PDFs with different page sizes (A4, Letter, Legal, etc.). The merged PDF will preserve the original page dimensions of each document. However, this may result in inconsistent page sizes in the final document."
        },
        {
          question: "How do I select specific pages when merging?",
          answer: "After uploading your files, use our page preview feature to see thumbnails of all pages. Click on individual pages to select/deselect them, then use the 'Merge Selected Pages' option instead of 'Merge All Pages'."
        },
        {
          question: "Will bookmarks and links be preserved when merging?",
          answer: "Yes, when you enable the 'Preserve bookmarks and links' option in the merge settings, we maintain internal bookmarks and hyperlinks from the original documents in the merged PDF."
        },
        {
          question: "Can I change the order of pages after merging?",
          answer: "It&apos;s better to arrange pages in the correct order before merging. If you need to reorder after merging, you would need to split the PDF and merge again with the desired order."
        }
      ]
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          question: "How secure is PDF password protection?",
          answer: "Our password protection uses industry-standard AES encryption. However, the security level depends on the password strength you choose. Use complex passwords with a mix of letters, numbers, and symbols for maximum security."
        },
        {
          question: "Can you recover a forgotten PDF password?",
          answer: "No, we cannot recover forgotten passwords due to the encryption used. If you forget your password, you&apos;ll need to recreate the document or use specialized password recovery tools (which may take considerable time)."
        },
        {
          question: "What happens to my files during processing?",
          answer: "Files are processed on secure servers with SSL encryption. They&apos;re temporarily stored in memory during processing and automatically deleted within 1 hour. We never access the content of your files."
        },
        {
          question: "Is it safe to process confidential documents?",
          answer: "While we use secure processing, we recommend exercising caution with highly confidential documents. For maximum security with sensitive information, consider using our downloadable desktop tools for offline processing."
        }
      ]
    },
    {
      category: "Technical Issues",
      questions: [
        {
          question: "Why is my file upload failing?",
          answer: "Upload failures can occur due to: file size exceeding 10MB, unsupported file format, poor internet connection, or corrupted files. Try reducing file size, checking your connection, or using a different file."
        },
        {
          question: "The processing is taking too long. What should I do?",
          answer: "Processing time depends on file size and complexity. Large files or complex operations may take 2-3 minutes. If it takes longer than 5 minutes, refresh the page and try again with smaller files."
        },
        {
          question: "Why can&apos;t I open my processed PDF?",
          answer: "This could be due to incomplete download, file corruption during processing, or compatibility issues with your PDF viewer. Try downloading again or opening with a different PDF reader like Adobe Acrobat or Chrome&apos;s built-in viewer."
        },
        {
          question: "My browser crashes when processing large files. How can I fix this?",
          answer: "Large file processing requires significant browser memory. Try closing other tabs, clearing browser cache, or using a different browser. For very large files, consider splitting them into smaller parts first."
        }
      ]
    },
    {
      category: "Advanced Features",
      questions: [
        {
          question: "What&apos;s the difference between compression levels?",
          answer: "High Quality maintains original quality with larger file sizes. Balanced offers good quality with moderate compression. Web Optimized creates smaller files suitable for online sharing. Maximum Compression gives the smallest files but may reduce quality."
        },
        {
          question: "How do I add watermarks to multiple PDFs at once?",
          answer: "Currently, our watermark tool processes one PDF at a time for better quality control. For batch processing, you&apos;ll need to add watermarks to each file individually or consider our API solutions for enterprise users."
        },
        {
          question: "Can I rotate specific pages instead of the entire document?",
          answer: "Our basic rotation tool rotates all pages. For selective page rotation, use the split tool to extract specific pages, rotate them individually, then merge them back with the original document."
        },
        {
          question: "How do I maintain image quality when compressing PDFs?",
          answer: "Choose 'High Quality' or 'Balanced' compression settings. Avoid 'Maximum Compression' if images are important. For documents with many high-resolution images, consider optimizing images separately before creating the PDF."
        }
      ]
    }
  ]

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    searchTerm === '' || 
    category.questions.length > 0 ||
    category.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Find quick answers to common questions about our PDF tools, features, and services.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FiHelpCircle className="h-6 w-6 mr-3 text-blue-500" />
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 1000 + itemIndex
                  const isOpen = openItems.includes(globalIndex)
                  
                  return (
                    <div key={itemIndex} className="bg-gray-700 rounded-lg">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-600 transition-colors rounded-lg"
                      >
                        <h3 className="text-lg font-medium text-white pr-4">
                          {item.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <FiChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <FiChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-600 pt-4">
                            <p className="text-gray-300 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* No Results */}
          {searchTerm && filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <FiSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">
                We couldn&apos;t find any FAQs matching your search. Try different keywords or browse our categories.
              </p>
              <Link 
                href="/knowledge-base/troubleshooting"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                Check our troubleshooting guide →
              </Link>
            </div>
          )}

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-center mt-12">
            <h3 className="text-xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-blue-100 mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </Link>
              <Link 
                href="/knowledge-base/troubleshooting"
                className="inline-flex items-center bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors"
              >
                View Troubleshooting Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
