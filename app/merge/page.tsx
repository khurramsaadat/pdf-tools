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
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

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
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStatus, setProcessingStatus] = useState('')
  const [mergeMode, setMergeMode] = useState<'files' | 'pages'>('files')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return

    const newFiles: PDFFile[] = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      if (file.type !== 'application/pdf') {
        alert(`${file.name} is not a PDF file. Please select only PDF files.`)
        continue
      }

      try {
          const pdfInfo = await getPDFInfo(file)
          
        const pdfFile: PDFFile = {
          id: `${Date.now()}-${i}`,
          name: file.name,
          size: formatFileSize(file.size),
          sizeBytes: file.size,
          pages: pdfInfo.pageCount,
          file: file
        }
        
        newFiles.push(pdfFile)
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error)
        alert(`Error processing ${file.name}. Please make sure it's a valid PDF file.`)
      }
    }

    setSelectedFiles(prev => [...prev, ...newFiles])
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeFile = (fileId: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileId))
    setSelectedPages(prev => prev.filter(page => page.fileId !== fileId))
  }

  const moveFile = (fileId: string, direction: 'up' | 'down') => {
    setSelectedFiles(prev => {
      const currentIndex = prev.findIndex(file => file.id === fileId)
      if (currentIndex === -1) return prev
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
      if (newIndex < 0 || newIndex >= prev.length) return prev
      
      const newFiles = [...prev]
      const [movedFile] = newFiles.splice(currentIndex, 1)
      newFiles.splice(newIndex, 0, movedFile)
      
      return newFiles
    })
  }

  const handlePageSelection = (pages: SelectedPage[]) => {
    setSelectedPages(pages)
  }

  const handleMerge = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one PDF file to merge.')
      return
    }

    setIsProcessing(true)
    setProcessingStatus('Initializing merge process...')

    try {
      let mergedPdfBytes: Uint8Array

      if (mergeMode === 'pages' && selectedPages.length > 0) {
        setProcessingStatus('Merging selected pages...')
        mergedPdfBytes = await mergeSelectedPages(selectedPages, (status) => {
          setProcessingStatus(status)
        })
      } else {
        setProcessingStatus('Merging PDF files...')
        mergedPdfBytes = await mergePDFs(selectedFiles.map(f => f.file), preserveBookmarks, (status) => {
          setProcessingStatus(status)
        })
      }

      setProcessingStatus('Preparing download...')
      
      const blob = new Blob([mergedPdfBytes as BlobPart], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `${outputFilename}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
      
      setProcessingStatus('Download completed!')
      
      setTimeout(() => {
        setIsProcessing(false)
        setProcessingStatus('')
      }, 2000)
      
    } catch (error) {
      console.error('Error merging PDFs:', error)
      alert('An error occurred while merging the PDFs. Please try again.')
      setIsProcessing(false)
      setProcessingStatus('')
    }
  }

  const totalSize = selectedFiles.reduce((sum, file) => sum + file.sizeBytes, 0)
  const totalPages = selectedFiles.reduce((sum, file) => sum + file.pages, 0)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-orange-600 p-3 rounded-full mr-4">
              <FiLayers className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Merge PDF Files</h1>
          </div>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Combine multiple PDF files into one document. Drag and drop your files, reorder them as needed, and download your merged PDF instantly.
          </p>
        </div>
          
        {/* File Upload Area */}
        <Card className="mb-6 bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <FiUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Drop PDF files here or click to browse
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Select multiple PDF files to merge them into one document
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <FiFolder className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Selected Files */}
            {selectedFiles.length > 0 && (
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FiFile className="mr-2 h-5 w-5" />
                Selected Files ({selectedFiles.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Total Files</div>
                  <div className="text-lg font-semibold">{selectedFiles.length}</div>
                      </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Total Pages</div>
                  <div className="text-lg font-semibold">{totalPages}</div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Total Size</div>
                  <div className="text-lg font-semibold">{formatFileSize(totalSize)}</div>
                          </div>
                        </div>

              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={file.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-600 p-2 rounded">
                        <FiFile className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-gray-400">{file.pages} pages • {file.size}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveFile(file.id, 'up')}
                        disabled={index === 0}
                        className="p-1 h-auto"
                      >
                        <FiArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveFile(file.id, 'down')}
                        disabled={index === selectedFiles.length - 1}
                        className="p-1 h-auto"
                      >
                        <FiArrowDown className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="p-1 h-auto text-red-400 hover:text-red-300"
                      >
                        <FiX className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          )}

        {/* Merge Mode Selection */}
          {selectedFiles.length > 0 && (
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FiTarget className="mr-2 h-5 w-5" />
                Merge Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Button
                  variant={mergeMode === 'files' ? 'default' : 'outline'}
                  onClick={() => setMergeMode('files')}
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <FiLayers className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Merge Entire Files</div>
                    <div className="text-xs opacity-75">Combine all pages from each file</div>
                  </div>
                </Button>
                <Button
                  variant={mergeMode === 'pages' ? 'default' : 'outline'}
                  onClick={() => setMergeMode('pages')}
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <FiMove className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Select Specific Pages</div>
                    <div className="text-xs opacity-75">Choose and reorder individual pages</div>
                  </div>
                </Button>
            </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                Output Filename
              </label>
                  <Input
                  type="text" 
                  value={outputFilename}
                  onChange={(e) => setOutputFilename(e.target.value)}
                    placeholder="Enter filename (without .pdf extension)"
                    className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="preserveBookmarks"
                    checked={preserveBookmarks}
                    onChange={(e) => setPreserveBookmarks(e.target.checked)}
                    className="rounded border-gray-600 bg-gray-700"
                  />
                  <label htmlFor="preserveBookmarks" className="text-sm text-gray-300">
                    Preserve bookmarks and metadata
                </label>
              </div>
            </div>
            </CardContent>
          </Card>
        )}

        {/* Page Selection Mode */}
        {mergeMode === 'pages' && selectedFiles.length > 0 && (
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FiMove className="mr-2 h-5 w-5" />
                Select Pages to Merge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PDFThumbnailViewer
                files={selectedFiles}
                onPagesSelected={handlePageSelection}
              />
            </CardContent>
          </Card>
        )}

        {/* Merge Button */}
        {selectedFiles.length > 0 && (
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="text-center">
                <Button
                  onClick={handleMerge}
                  disabled={isProcessing || (mergeMode === 'pages' && selectedPages.length === 0)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiLayers className="mr-2 h-5 w-5" />
                      Merge PDF{selectedFiles.length > 1 ? 's' : ''}
                    </>
                  )}
                </Button>
                {processingStatus && (
                  <p className="text-sm text-gray-400 mt-2">{processingStatus}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-600 p-3 rounded-full w-fit mx-auto mb-4">
                <FiZap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-400">
                Merge PDFs instantly with our optimized processing engine
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="bg-green-600 p-3 rounded-full w-fit mx-auto mb-4">
                  <FiShield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Secure</h3>
              <p className="text-sm text-gray-400">
                Your files are processed locally and never uploaded to servers
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-600 p-3 rounded-full w-fit mx-auto mb-4">
                <FiSettings className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced Options</h3>
              <p className="text-sm text-gray-400">
                Preserve bookmarks, select specific pages, and customize output
              </p>
            </CardContent>
          </Card>
          </div>

        {/* How it Works */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-center">How to Merge PDFs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">1</div>
                <h4 className="font-semibold mb-2">Upload Files</h4>
                <p className="text-sm text-gray-400">Drag and drop or click to select your PDF files</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">2</div>
                <h4 className="font-semibold mb-2">Arrange Order</h4>
                <p className="text-sm text-gray-400">Reorder files or select specific pages as needed</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">3</div>
                <h4 className="font-semibold mb-2">Configure Options</h4>
                <p className="text-sm text-gray-400">Set filename and choose merge preferences</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">4</div>
                <h4 className="font-semibold mb-2">Download</h4>
                <p className="text-sm text-gray-400">Get your merged PDF file instantly</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}