'use client'

import Link from 'next/link'
import { useState, useRef, useCallback } from 'react'
import { mergePDFs, mergeSelectedPages } from '@/utils/pdfMerger'
import { getPDFInfo } from '@/utils/pdfThumbnailGenerator'
import { 
  FiUpload, 
  FiFile, 
  FiLayers, 
  FiSettings, 
  FiShield, 
  FiCheckCircle,
  FiMove,
  FiInfo,
  FiFolder,
  FiTarget,
  FiZap,
  FiX,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PDFThumbnailViewer from '@/components/PDFThumbnailViewer'

interface PDFFile {
  id: string
  name: string
  size: string
  sizeBytes: number
  pages: number
  file: File
}

interface SelectedPage {
  id: string
  fileId: string
  fileName: string
  pageNumber: number
  thumbnail: string
  orderIndex: number
}

export default function MergePDFPage() {
  const [selectedFiles, setSelectedFiles] = useState<PDFFile[]>([])
  const [selectedPages, setSelectedPages] = useState<SelectedPage[]>([])
  const [outputFilename, setOutputFilename] = useState('MergedPDF')
  const [preserveBookmarks, setPreserveBookmarks] = useState(true)
  const [isDragOver, setIsDragOver] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [isMerging, setIsMerging] = useState(false)
  const [mergeStatus, setMergeStatus] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [mergeCompleted, setMergeCompleted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const startOver = () => {
    setSelectedFiles([])
    setSelectedPages([])
    setMergeCompleted(false)
    setMergeStatus('')
    setOutputFilename('MergedPDF')
  }

  const processFiles = useCallback(async (files: FileList | null) => {
    if (!files) return

    setIsAnalyzing(true)
    const newFiles: PDFFile[] = []
    
    // Process files sequentially to avoid overwhelming the browser
    for (const file of Array.from(files)) {
      if (file.type === 'application/pdf') {
        try {
          console.log(`Analyzing PDF: ${file.name}`)
          const pdfInfo = await getPDFInfo(file)
          
          const newFile: PDFFile = {
            id: generateId(),
            name: file.name,
            size: formatFileSize(file.size),
            sizeBytes: file.size,
            pages: pdfInfo.pageCount || 0,
            file: file
          }
          newFiles.push(newFile)
          console.log(`PDF ${file.name} has ${pdfInfo.pageCount} pages`)
        } catch (error) {
          console.error(`Error analyzing PDF ${file.name}:`, error)
          // Fallback with estimated page count
        const newFile: PDFFile = {
          id: generateId(),
          name: file.name,
          size: formatFileSize(file.size),
          sizeBytes: file.size,
            pages: Math.ceil(file.size / 50000), // Rough estimate: ~50KB per page
          file: file
        }
        newFiles.push(newFile)
      }
      }
    }

    setSelectedFiles(prev => [...prev, ...newFiles])
    setIsAnalyzing(false)
  }, [])

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await processFiles(event.target.files)
    // Reset the input so the same file can be selected again
    if (event.target) {
      event.target.value = ''
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    await processFiles(event.dataTransfer.files)
  }

  const removeFile = (fileId: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const moveFile = (fromIndex: number, toIndex: number) => {
    const newFiles = [...selectedFiles]
    const [movedFile] = newFiles.splice(fromIndex, 1)
    newFiles.splice(toIndex, 0, movedFile)
    setSelectedFiles(newFiles)
  }

  const handlePagesSelected = (pages: SelectedPage[]) => {
    setSelectedPages(pages)
  }

  const handleMergeSelectedPages = async () => {
    if (selectedPages.length === 0) return

    setIsMerging(true)
    setMergeStatus('Preparing selected pages for merge...')

    try {
      // Group selected pages by file
      const pageSelections = selectedFiles.map(file => {
        const filePagesSelected = selectedPages
          .filter(page => page.fileId === file.id)
          .map(page => page.pageNumber)
        
        return {
          file: file.file,
          pageNumbers: filePagesSelected
        }
      }).filter(selection => selection.pageNumbers.length > 0)

      setMergeStatus(`Merging ${selectedPages.length} selected pages...`)

      const result = await mergeSelectedPages(pageSelections, {
        filename: outputFilename,
        preserveBookmarks: preserveBookmarks
      })

      if (result.success) {
        setMergeStatus(`✅ Successfully merged ${selectedPages.length} pages! Download started.`)
        setMergeCompleted(true)
        setTimeout(() => setMergeStatus(''), 3000)
      } else {
        setMergeStatus(`❌ Error: ${result.error}`)
        setTimeout(() => setMergeStatus(''), 5000)
      }
    } catch (error: any) {
      setMergeStatus(`❌ Error: ${error.message || 'Unknown error occurred'}`)
      setTimeout(() => setMergeStatus(''), 5000)
    } finally {
      setIsMerging(false)
    }
  }

  const handleMergeAllPages = async (showConfirmation = false) => {
    if (selectedFiles.length === 0) return

    const totalPages = selectedFiles.reduce((sum, file) => sum + file.pages, 0)
    
    if (showConfirmation && selectedPages.length > 0) {
      const confirmMergeAll = window.confirm(
        `You have ${selectedPages.length} page${selectedPages.length > 1 ? 's' : ''} selected.\n\n` +
        `Click OK to merge ALL ${totalPages} pages from all files instead, or Cancel to merge only selected pages.`
      )
      if (!confirmMergeAll) return
    }

    setIsMerging(true)
    setMergeStatus(`Preparing all ${totalPages} pages for merge...`)

    try {
      const filesToMerge = selectedFiles.map(file => file.file)
      
      setMergeStatus(`Merging all ${totalPages} pages from ${selectedFiles.length} files...`)

      const result = await mergePDFs(filesToMerge, {
        filename: outputFilename,
        preserveBookmarks: preserveBookmarks
      })

      if (result.success) {
        setMergeStatus(`✅ Successfully merged all ${totalPages} pages! Download started.`)
        setMergeCompleted(true)
        setTimeout(() => setMergeStatus(''), 3000)
      } else {
        setMergeStatus(`❌ Error: ${result.error}`)
        setTimeout(() => setMergeStatus(''), 5000)
      }
    } catch (error: any) {
      setMergeStatus(`❌ Error: ${error.message || 'Unknown error occurred'}`)
      setTimeout(() => setMergeStatus(''), 5000)
    } finally {
      setIsMerging(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-orange-900 py-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">


          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Merge PDF
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Combine multiple PDF files into a single, organized file. Extract specific pages, drag, drop, and reorder your files with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          
          {/* Upload Section */}
          <div className="bg-white rounded-xl p-4 md:p-8 mb-8 shadow-lg">
            <div 
              className={`border-2 border-dashed rounded-lg p-4 md:p-8 text-center transition-colors cursor-pointer ${
                isDragOver 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-300 bg-gray-50 hover:border-orange-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFileSelect}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <FiUpload className={`h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 ${isDragOver ? 'text-orange-500' : 'text-gray-400'}`} />
              
              {selectedFiles.length === 0 ? (
                <>
                  <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2">
                    <span className="hidden sm:inline">Drop your files here or{' '}</span>
                    <span className="text-orange-600 underline">
                      <span className="sm:hidden">Tap to select files</span>
                      <span className="hidden sm:inline">browse</span>
                    </span>
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">Supports: .pdf files only</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Max file size 1GB. <span className="text-orange-600 font-medium">Sign Up for more</span>
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2">
                    <span className="text-orange-600 underline">
                      <span className="sm:hidden">Tap to add more files</span>
                      <span className="hidden sm:inline">Add more files or drop here</span>
                    </span>
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">Click anywhere to select additional PDF files</p>
                </>
              )}
            </div>

            {/* File Order & Analysis - Integrated */}
            {selectedFiles.length > 0 && (
              <div className="mt-8 border-t pt-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-2">
                        Received Files:
                  </h4>
                      <div className="text-xs sm:text-sm text-gray-500">
                        ({selectedFiles.length} files) • Total: {selectedFiles.reduce((acc, file) => acc + file.pages, 0)} pages • {selectedFiles.reduce((acc, file) => acc + file.sizeBytes, 0) > 1024 * 1024 ? 
                      `${(selectedFiles.reduce((acc, file) => acc + file.sizeBytes, 0) / (1024 * 1024)).toFixed(1)} MB` :
                      `${(selectedFiles.reduce((acc, file) => acc + file.sizeBytes, 0) / 1024).toFixed(0)} KB`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-gray-600 mb-2">Sort</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const reversed = [...selectedFiles].reverse()
                            setSelectedFiles(reversed)
                          }}
                          className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                          title="Reverse Order"
                        >
                          <FiArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            const reversed = [...selectedFiles].reverse()
                            setSelectedFiles(reversed)
                          }}
                          className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                          title="Reverse Order"
                        >
                          <FiArrowDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {selectedFiles.map((file, index) => (
                    <div key={file.id} className="flex items-center justify-between bg-gray-50 rounded-lg border-2 border-gray-200 px-2 sm:px-4 py-3 sm:py-4 hover:border-orange-300 transition-colors">
                      <div className="flex items-center flex-1">
                        <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 items-center justify-center text-sm font-bold mr-4 min-w-[2rem] hidden sm:flex">
                          {index + 1}
                        </div>
                        <FiMove className="h-5 w-5 text-gray-400 mr-3 cursor-move hidden sm:block" />
                        <FiFile className="h-5 w-5 text-red-500 mr-3 hidden sm:block" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs sm:text-sm font-medium text-gray-800 break-words pr-2">
                            {file.name.length > 30 ? `${file.name.substring(0, 30)}...` : file.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <span>{file.pages} pages • {file.size}</span>
                            <span className="hidden sm:inline"> • Added: {new Date().toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 sm:space-x-2 ml-2 sm:ml-4">
                        <button 
                          onClick={() => moveFile(index, Math.max(0, index - 1))}
                          disabled={index === 0}
                          className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-gray-200 transition-colors"
                          title="Move up"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => moveFile(index, Math.min(selectedFiles.length - 1, index + 1))}
                          disabled={index === selectedFiles.length - 1}
                          className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-gray-200 transition-colors"
                          title="Move down"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 sm:p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                          title="Remove file"
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 flex flex-wrap gap-3 justify-end">
                  <button
                    onClick={() => {
                      const sorted = [...selectedFiles].sort((a, b) => a.name.localeCompare(b.name))
                      setSelectedFiles(sorted)
                    }}
                    className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    🔤 Sort A-Z
                  </button>
                  <button
                    onClick={() => {
                      const sorted = [...selectedFiles].sort((a, b) => a.sizeBytes - b.sizeBytes)
                      setSelectedFiles(sorted)
                    }}
                    className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    📊 Sort by Size
                  </button>
                  <button
                    onClick={() => setSelectedFiles([])}
                    className="inline-flex items-center px-3 py-2 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-300 transition-colors"
                  >
                    🗑️ Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Debug Info */}
          {debugMode && selectedFiles.length > 0 && (
            <div className="bg-gray-100 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Debug Information</h3>
                <button
                  onClick={() => setDebugMode(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4 text-sm">
                {selectedFiles.map((file) => (
                  <div key={file.id} className="bg-white p-4 rounded border">
                    <h4 className="font-medium text-gray-800 mb-2">{file.name}</h4>
                    <div className="grid grid-cols-2 gap-4 text-gray-600">
                      <div>File size: {file.size}</div>
                      <div>File type: {file.file.type || 'unknown'}</div>
                      <div>Last modified: {new Date(file.file.lastModified).toLocaleString()}</div>
                      <div>Expected pages: {file.pages}</div>
                    </div>
                  </div>
                ))}
                <div className="text-xs text-gray-500 mt-4">
                  Check browser console for detailed PDF.js logs and errors.
                </div>
              </div>
            </div>
          )}

          {/* PDF Thumbnail Viewer */}
          {selectedFiles.length > 0 && (
            <PDFThumbnailViewer
              files={selectedFiles}
              onPagesSelected={handlePagesSelected}
            />
          )}



          {/* Final Output - Only show when files are uploaded */}
          {selectedFiles.length > 0 && (
            <div className="bg-white rounded-xl p-4 md:p-8 mb-8 mt-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
                <FiSettings className="h-5 w-5 mr-2" />
                Final Output
              </h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Professional Features
              </span>
            </div>



            {/* Output Filename */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Filename
              </label>
              <div className="flex">
                <input 
                  type="text" 
                  value={outputFilename}
                  onChange={(e) => setOutputFilename(e.target.value)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 text-sm rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg px-3 py-2 text-gray-500 text-sm">.pdf</span>
              </div>
              <div className="mt-2">
                <label className="flex items-center text-sm text-gray-600">
                  <input 
                    type="checkbox" 
                    checked={preserveBookmarks}
                    onChange={(e) => setPreserveBookmarks(e.target.checked)}
                    className="mr-2 rounded" 
                  />
                  Preserve bookmarks and links
                </label>
              </div>
            </div>



            {/* Apply Button */}
            {selectedFiles.length > 0 ? (
              <div className="space-y-4">
                {selectedPages.length > 0 ? (
                  <button 
                    onClick={handleMergeSelectedPages}
                    disabled={isMerging}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center disabled:cursor-not-allowed"
                  >
                    {isMerging ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Merging...
                      </>
                    ) : (
                      <>
                        <FiCheckCircle className="h-5 w-5 mr-2" />
                        Merge {selectedPages.length} Selected Page{selectedPages.length > 1 ? 's' : ''}
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="text-center py-4">
                      <FiInfo className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No pages selected - you can select specific pages above or merge all pages</p>
                    </div>
                  </div>
                )}
                
                {/* Always show merge all option */}
                <button 
                  onClick={() => handleMergeAllPages(selectedPages.length > 0)}
                  disabled={isMerging}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center disabled:cursor-not-allowed"
                >
                  {isMerging ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Merging...
                    </>
                  ) : (
                    <>
                      <FiLayers className="h-5 w-5 mr-2" />
                      Merge All Pages ({selectedFiles.reduce((sum, file) => sum + file.pages, 0)} total)
                    </>
                  )}
                </button>
                
                {/* Merge Status Display */}
                {mergeStatus && (
                  <div className={`p-4 rounded-lg text-center text-sm font-medium ${
                    mergeStatus.includes('✅') 
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : mergeStatus.includes('❌')
                      ? 'bg-red-50 border border-red-200 text-red-800'
                      : 'bg-blue-50 border border-blue-200 text-blue-800'
                  }`}>
                    {mergeStatus}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Please upload PDF files to start merging</p>
              </div>
            )}
          </div>
          )}

          {/* Conditional Content - Show different sections based on merge completion */}
          {!mergeCompleted ? (
            <>
          {/* Key Features */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Key Features</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-gray-700 rounded-xl p-6 text-center">
                <div className="bg-orange-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <FiTarget className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Select Pages</h4>
                <p className="text-gray-400 text-sm">Choose specific pages from any PDF and combine them in your preferred order.</p>
              </div>
              
              <div className="bg-gray-700 rounded-xl p-6 text-center">
                <div className="bg-orange-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <FiFolder className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Drag & Drop</h4>
                <p className="text-gray-400 text-sm">Easily reorder files and pages with simple drag and drop functionality.</p>
              </div>
              
              <div className="bg-gray-700 rounded-xl p-6 text-center">
                <div className="bg-orange-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <FiLayers className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Preview Pages</h4>
                <p className="text-gray-400 text-sm">See thumbnail previews of all pages before merging.</p>
              </div>
              
              <div className="bg-gray-700 rounded-xl p-6 text-center">
                <div className="bg-orange-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <FiShield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Client-Side</h4>
                <p className="text-gray-400 text-sm">Secure processing entirely in your browser - no uploads required.</p>
              </div>
            </div>
          </div>

          {/* How to Merge PDF Files Guide */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-8">How to Merge PDF Files</h3>
            <div className="bg-gray-700 rounded-xl p-6 md:p-8">
              <p className="text-gray-300 mb-6 text-center">
                Merging PDF files is simple and efficient with our tool. Follow these steps to combine your PDFs into a single document:
              </p>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex-shrink-0 bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                    01
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">Upload Your Files</h4>
                    <p className="text-gray-300">
                      Choose PDF files from your device, Google Drive, OneDrive, Dropbox, or a URL. You can upload multiple files, and the process is straightforward, ensuring a hassle-free experience.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex-shrink-0 bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                    02
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">Preview and Adjust Files</h4>
                    <p className="text-gray-300 mb-3">
                      After uploading, you'll be redirected to the preview screen. Here, you can:
                    </p>
                    <ul className="text-gray-300 space-y-1 ml-4">
                      <li>• Expand PDFs to view individual pages.</li>
                      <li>• Select or deselect specific files manually or pages to include in the final merged PDF. Use options like All, Even, Odd for quick selection.</li>
                      <li>• Drag and drop files or pages to rearrange their order.</li>
                    </ul>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex-shrink-0 bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                    03
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">Customize Your PDF</h4>
                    <p className="text-gray-300 mb-3">
                      Our tool offers a range of editing options:
                    </p>
                    <ul className="text-gray-300 space-y-1 ml-4">
                      <li>• Rotate files or pages individually or in bulk.</li>
                      <li>• Zoom into specific pages.</li>
                      <li>• Duplicate or delete files/pages as needed.</li>
                      <li>• Add a blank page to the document.</li>
                    </ul>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex-shrink-0 bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                    04
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">Export Your Merged PDF</h4>
                    <p className="text-gray-300">
                      Once satisfied with your adjustments: Click "Merge PDF" to merge your files and download your document. You can also save it directly to Google Drive, Dropbox, OneDrive and Scan the QR to download the file to your mobile.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="bg-gray-700 rounded-xl p-6">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer text-base md:text-lg font-semibold text-white">
                    How can I merge a PDF for free?
                    <span className="transform group-open:rotate-180 transition-transform duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-4 text-sm md:text-base text-gray-300">
                    You can quickly merge PDFs for free with our tool. Simply upload PDF files from your device. Adjust the file order, select pages, and click "Merge PDF" to download your merged PDF all free!
                  </div>
                </details>
              </div>

              {/* FAQ 2 */}
              <div className="bg-gray-700 rounded-xl p-6">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer text-base md:text-lg font-semibold text-white">
                    How do you combine PDF files into one document?
                    <span className="transform group-open:rotate-180 transition-transform duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-4 text-sm md:text-base text-gray-300">
                    <p className="mb-3">To combine multiple PDF files into one document:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li>Upload your files.</li>
                      <li>Arrange the files in your desired order on the preview screen.</li>
                      <li>Use features like page selection, rotation, and zoom if needed.</li>
                      <li>Export the final merged document with a single click.</li>
                    </ol>
                  </div>
                </details>
              </div>

              {/* FAQ 3 */}
              <div className="bg-gray-700 rounded-xl p-6">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer text-base md:text-lg font-semibold text-white">
                    How do I add PDF pages?
                    <span className="transform group-open:rotate-180 transition-transform duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-4 text-sm md:text-base text-gray-300">
                    You can add new pages to your PDF by uploading additional PDF files during the merging process. Additionally, you can insert blank pages from the preview screen before exporting the final PDF.
                  </div>
                </details>
              </div>

              {/* FAQ 4 */}
              <div className="bg-gray-700 rounded-xl p-6">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer text-base md:text-lg font-semibold text-white">
                    How to combine PDF files in Chrome?
                    <span className="transform group-open:rotate-180 transition-transform duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-4 text-sm md:text-base text-gray-300">
                    To combine PDF files in Chrome, visit our Merge PDF Tool. Upload your files directly via Chrome, make adjustments using the preview tools, and export the merged PDF without downloading any software.
                  </div>
                </details>
              </div>

              {/* FAQ 5 */}
              <div className="bg-gray-700 rounded-xl p-6">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer text-base md:text-lg font-semibold text-white">
                    How to reduce PDF file size?
                    <span className="transform group-open:rotate-180 transition-transform duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-4 text-sm md:text-base text-gray-300">
                    Our PDF tool automatically optimizes file sizes during the merging process. For additional compression, you can use our dedicated PDF compression feature after merging.
                  </div>
                </details>
              </div>

              {/* FAQ 6 */}
              <div className="bg-gray-700 rounded-xl p-6">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer text-base md:text-lg font-semibold text-white">
                    Is our PDF merge tool safe?
                    <span className="transform group-open:rotate-180 transition-transform duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-4 text-sm md:text-base text-gray-300">
                    Yes, our PDF merge tool ensures your privacy and safety. All processing happens directly in your browser - no files are uploaded to our servers. Your documents remain completely private and secure.
                  </div>
                </details>
              </div>
            </div>
          </div>
            </>
          ) : (
            /* Post-Merge Success Content */
            <div className="mb-12">
              {/* Are you a happy user? */}
              <div className="bg-gray-100 rounded-xl p-6 md:p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Are you a happy user?</h3>
                
                <div className="space-y-4">
                  {/* Want more features */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-gray-700 font-medium">Want more features?</span>
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg border border-blue-300 transition-colors flex items-center gap-2">
                      <span className="text-blue-500">💎</span>
                      Upgrade to Pro
                    </button>
                  </div>

                  {/* Buy us Coffee */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-gray-700 font-medium">Buy us Coffee</span>
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg border border-blue-300 transition-colors flex items-center gap-2">
                      <span className="text-blue-500">☕</span>
                      Donate
                    </button>
                  </div>

                  {/* Sharing is caring */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-gray-700 font-medium">Sharing is caring</span>
                    <div className="flex flex-wrap gap-2">
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-2 rounded-lg border border-blue-300 transition-colors flex items-center gap-2">
                        <span className="text-blue-500">📘</span>
                        Facebook
                      </button>
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-2 rounded-lg border border-blue-300 transition-colors flex items-center gap-2">
                        <span className="text-blue-500">🐦</span>
                        Twitter
                      </button>
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-2 rounded-lg border border-blue-300 transition-colors flex items-center gap-2">
                        <span className="text-blue-500">📱</span>
                        Reddit
                      </button>
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-2 rounded-lg border border-blue-300 transition-colors flex items-center gap-2">
                        <span className="text-blue-500">💼</span>
                        LinkedIn
                      </button>
                    </div>
                  </div>

                  {/* Come back */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-gray-700 font-medium">Come back!</span>
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg border border-blue-300 transition-colors flex items-center gap-2">
                      <span className="text-blue-500">🔖</span>
                      Bookmark Page
                    </button>
                  </div>

                  {/* Link to this tool */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-gray-700 font-medium">Link to this tool</span>
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                      <input 
                        type="text" 
                        value={window.location.href} 
                        readOnly 
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm"
                      />
                      <button 
                        onClick={copyToClipboard}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <span>📋</span>
                        Copy
                      </button>
                    </div>
                  </div>

                  {/* Send Feedback */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-gray-700 font-medium">Send Feedback</span>
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg border border-blue-300 transition-colors flex items-center gap-2">
                      <span className="text-blue-500">✉️</span>
                      Contact us
                    </button>
                  </div>
                </div>
              </div>

              {/* Start Over Button */}
              <div className="text-center mb-8">
                <button 
                  onClick={startOver}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-lg text-lg transition-colors"
                >
                  Merge More PDFs
                </button>
              </div>

              {/* Upgrade CTA */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Want to convert large files without a queue or Ads?
                </h3>
                <p className="text-xl mb-6 opacity-90">Upgrade Now</p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg text-lg transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
