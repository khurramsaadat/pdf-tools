'use client'

import { useState, useRef } from 'react'
import { FiUpload, FiX, FiMinimize2, FiDownload, FiInfo, FiSettings, FiZap, FiShield, FiMail } from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { 
  compressPDF, 
  ultraCompressPDF,
  getRecommendedCompressionSettings, 
  formatFileSize, 
  getCompressionPercentage,
  type CompressionOptions,
  type CompressionResult 
} from '@/utils/pdfCompressor'

interface PDFFile {
  id: string
  name: string
  size: string
  sizeBytes: number
  file: File
}

export default function CompressPDFPage() {
  const [selectedFile, setSelectedFile] = useState<PDFFile | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processStatus, setProcessStatus] = useState<string>('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null)
  const [selectedUseCase, setSelectedUseCase] = useState<'email' | 'web' | 'print' | 'archive'>('email')
  const [customOptions, setCustomOptions] = useState<CompressionOptions | null>(null)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [compressionHistory, setCompressionHistory] = useState<CompressionResult[]>([])
  const [currentFile, setCurrentFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const startOver = () => {
    setSelectedFile(null)
    setProcessStatus('')
    setCompressionResult(null)
    setCustomOptions(null)
    setCompressionHistory([])
    setCurrentFile(null)
  }

  const handleFileSelect = () => fileInputRef.current?.click()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile({
        id: generateId(),
        name: file.name,
        size: formatFileSize(file.size),
        sizeBytes: file.size,
        file: file
      })
      setCurrentFile(file)
      setCompressionResult(null)
      setProcessStatus('')
      setCompressionHistory([])
    } else {
      alert('Please select a valid PDF file')
    }
    if (event.target) event.target.value = ''
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    const file = event.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile({
        id: generateId(),
        name: file.name,
        size: formatFileSize(file.size),
        sizeBytes: file.size,
        file: file
      })
      setCurrentFile(file)
      setCompressionResult(null)
      setProcessStatus('')
      setCompressionHistory([])
    } else {
      alert('Please select a valid PDF file')
    }
  }

  const handleCompress = async (useUltraCompression = false) => {
    if (!selectedFile) return

    setIsProcessing(true)
    setProcessStatus('Initializing compression...')
    
    // Use the current compressed file if available, otherwise use original
    const fileToCompress = compressionResult?.compressedPdfBytes && currentFile
      ? new File([compressionResult.compressedPdfBytes as BlobPart], selectedFile.name, { type: 'application/pdf' })
      : selectedFile.file

    try {
      // Get compression options with more aggressive settings
      const options = customOptions || {
        ...getRecommendedCompressionSettings(selectedFile.sizeBytes, selectedUseCase),
        // Force aggressive settings for better compression
        removeMetadata: true,
        optimizeImages: true,
        removeAnnotations: selectedUseCase === 'email' || selectedUseCase === 'web',
        imageQuality: selectedUseCase === 'email' ? 0.3 : 0.5
      }

      // Choose compression method
      const result = useUltraCompression 
        ? await ultraCompressPDF(fileToCompress, options, (status) => {
            setProcessStatus(status)
          })
        : await compressPDF(fileToCompress, options, (status) => {
            setProcessStatus(status)
          })

      // Add to compression history and calculate cumulative compression
      if (result.success) {
        // Calculate compression ratio from original file size
        const originalFileSize = selectedFile.sizeBytes
        const cumulativeCompressionRatio = originalFileSize > 0 
          ? ((originalFileSize - result.compressedSize) / originalFileSize) * 100 
          : 0
        
        const adjustedResult = {
          ...result,
          compressionRatio: Math.max(0, Math.round(cumulativeCompressionRatio * 100) / 100)
        }
        
        setCompressionHistory(prev => [...prev, adjustedResult])
        setCompressionResult(adjustedResult)
      } else {
        setCompressionResult(result)
      }

      if (result.success && result.compressedPdfBytes) {
        // Update current file for further compression
        setCurrentFile(new File([result.compressedPdfBytes as BlobPart], selectedFile.name, { type: 'application/pdf' }))
        setProcessStatus('Compression completed successfully!')
      } else {
        setProcessStatus(result.error || 'Compression failed')
      }

    } catch (error: any) {
      setProcessStatus(`Error: ${error.message || 'Unknown error occurred'}`)
      setCompressionResult({
        success: false,
        originalSize: selectedFile.sizeBytes,
        compressedSize: 0,
        compressionRatio: 0,
        error: error.message
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!compressionResult?.compressedPdfBytes || !selectedFile) return

    const blob = new Blob([compressionResult.compressedPdfBytes as BlobPart], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `compressed_${selectedFile.name}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  const useCaseOptions = [
    { value: 'email', label: 'Email Attachment', icon: FiMail, description: 'Optimize for email size limits' },
    { value: 'web', label: 'Web Display', icon: FiZap, description: 'Balance quality and loading speed' },
    { value: 'print', label: 'Print Quality', icon: FiShield, description: 'Preserve quality for printing' },
    { value: 'archive', label: 'Long-term Storage', icon: FiSettings, description: 'Balance quality and storage' }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-yellow-600 p-3 rounded-full mr-4">
              <FiMinimize2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Compress PDF</h1>
          </div>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Reduce PDF file size while maintaining good quality. Perfect for email attachments, web uploads, and storage optimization.
          </p>
        </div>

        {/* File Upload Area */}
        <Card className="mb-6 bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isDragOver 
                  ? 'border-yellow-500 bg-yellow-500/10' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFileSelect}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <FiUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Drop PDF file here or click to browse
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Select a PDF file to compress and reduce its size
              </p>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                Choose PDF File
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Selected File */}
        {selectedFile && (
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FiInfo className="mr-2 h-5 w-5" />
                Selected File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-600 p-2 rounded">
                    <FiUpload className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{selectedFile.name}</div>
                    <div className="text-xs text-gray-400">Original size: {selectedFile.size}</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  <FiX className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compression Options */}
        {selectedFile && !compressionResult && (
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FiSettings className="mr-2 h-5 w-5" />
                Compression Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Choose optimization preset:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {useCaseOptions.map((option) => {
                      const IconComponent = option.icon
                      return (
                        <Button
                          key={option.value}
                          variant={selectedUseCase === option.value ? 'default' : 'outline'}
                          onClick={() => setSelectedUseCase(option.value as any)}
                          className="h-auto p-4 flex flex-col items-start space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4" />
                            <span className="font-semibold">{option.label}</span>
                          </div>
                          <span className="text-xs opacity-75">{option.description}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showAdvanced"
                    checked={showAdvancedOptions}
                    onChange={(e) => setShowAdvancedOptions(e.target.checked)}
                    className="rounded border-gray-600 bg-gray-700"
                  />
                  <label htmlFor="showAdvanced" className="text-sm text-gray-300">
                    Show advanced options
                  </label>
                </div>

                {showAdvancedOptions && (
                  <div className="space-y-4 p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-semibold text-white">Advanced Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-1">Quality Level:</label>
                        <select 
                          className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-sm text-white"
                          onChange={(e) => setCustomOptions(prev => ({
                            ...getRecommendedCompressionSettings(selectedFile.sizeBytes, selectedUseCase),
                            ...prev,
                            quality: e.target.value as any
                          }))}
                        >
                          <option value="high">High Quality (less compression)</option>
                          <option value="medium">Medium Quality (balanced)</option>
                          <option value="low">Low Quality (more compression)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-1">Image Quality:</label>
                        <select 
                          className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-sm text-white"
                          onChange={(e) => setCustomOptions(prev => ({
                            ...getRecommendedCompressionSettings(selectedFile.sizeBytes, selectedUseCase),
                            ...prev,
                            imageQuality: parseFloat(e.target.value)
                          }))}
                        >
                          <option value="0.9">90% (high quality)</option>
                          <option value="0.7">70% (balanced)</option>
                          <option value="0.5">50% (smaller size)</option>
                          <option value="0.3">30% (maximum compression)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2" 
                          defaultChecked
                          onChange={(e) => setCustomOptions(prev => ({
                            ...getRecommendedCompressionSettings(selectedFile.sizeBytes, selectedUseCase),
                            ...prev,
                            removeMetadata: e.target.checked
                          }))}
                        />
                        <span className="text-sm text-gray-300">Remove metadata (author, creation date, etc.)</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2" 
                          defaultChecked
                          onChange={(e) => setCustomOptions(prev => ({
                            ...getRecommendedCompressionSettings(selectedFile.sizeBytes, selectedUseCase),
                            ...prev,
                            optimizeImages: e.target.checked
                          }))}
                        />
                        <span className="text-sm text-gray-300">Optimize images</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compress Button */}
        {selectedFile && !compressionResult && (
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => handleCompress(false)}
                    disabled={isProcessing}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Compressing...
                      </>
                    ) : (
                      <>
                        <FiMinimize2 className="mr-2 h-4 w-4" />
                        Compress PDF
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleCompress(true)}
                    disabled={isProcessing}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Ultra Compressing...
                      </>
                    ) : (
                      <>
                        <FiZap className="mr-2 h-4 w-4" />
                        Ultra Compress
                      </>
                    )}
                  </Button>
                </div>
                {processStatus && (
                  <p className="text-sm text-gray-400 mt-2">{processStatus}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compression Results */}
        {compressionResult && (
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FiZap className="mr-2 h-5 w-5" />
                Compression Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {compressionResult.success ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                      <div className="text-xs text-gray-400">Original Size</div>
                      <div className="text-lg font-semibold">{formatFileSize(compressionResult.originalSize)}</div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                      <div className="text-xs text-gray-400">Compressed Size</div>
                      <div className="text-lg font-semibold text-green-400">{formatFileSize(compressionResult.compressedSize)}</div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                      <div className="text-xs text-gray-400">Size Reduction</div>
                      <div className="text-lg font-semibold text-blue-400">
                        {getCompressionPercentage(compressionResult.originalSize, compressionResult.compressedSize)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <FiDownload className="mr-2 h-4 w-4" />
                      Download Compressed PDF
                    </Button>
                    
                    {compressionResult.compressionRatio < 50 && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          onClick={() => handleCompress(false)}
                          disabled={isProcessing}
                          variant="outline"
                          className="flex-1 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white"
                        >
                          <FiMinimize2 className="mr-2 h-4 w-4" />
                          Compress More
                        </Button>
                        <Button
                          onClick={() => handleCompress(true)}
                          disabled={isProcessing}
                          variant="outline"
                          className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <FiZap className="mr-2 h-4 w-4" />
                          Ultra Compress
                        </Button>
                      </div>
                    )}
                    
                    {compressionHistory.length > 1 && (
                      <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                        <h4 className="text-sm font-semibold text-white mb-2">Compression History:</h4>
                        <div className="space-y-1">
                          {compressionHistory.map((result, index) => (
                            <div key={index} className="text-xs text-gray-400 flex justify-between">
                              <span>Pass {index + 1}:</span>
                              <span>{formatFileSize(result.compressedSize)} ({result.compressionRatio.toFixed(1)}% reduction)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button
                      onClick={startOver}
                      variant="outline"
                    >
                      Compress Another File
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-red-400 mb-4">
                    {compressionResult.error || 'Compression failed'}
                  </div>
                  <Button onClick={startOver} variant="outline">
                    Try Again
                  </Button>
                </div>
              )}
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
              <h3 className="text-lg font-semibold mb-2">Smart Compression</h3>
              <p className="text-sm text-gray-400">
                Intelligent algorithms reduce file size while preserving quality
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="bg-green-600 p-3 rounded-full w-fit mx-auto mb-4">
                <FiShield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Processing</h3>
              <p className="text-sm text-gray-400">
                Files are processed locally in your browser for maximum security
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-600 p-3 rounded-full w-fit mx-auto mb-4">
                <FiSettings className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Customizable Options</h3>
              <p className="text-sm text-gray-400">
                Choose from presets or fine-tune compression settings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-center">How PDF Compression Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">1</div>
                <h4 className="font-semibold mb-2">Upload PDF</h4>
                <p className="text-sm text-gray-400">Select the PDF file you want to compress</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">2</div>
                <h4 className="font-semibold mb-2">Choose Settings</h4>
                <p className="text-sm text-gray-400">Select compression level and optimization options</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">3</div>
                <h4 className="font-semibold mb-2">Process File</h4>
                <p className="text-sm text-gray-400">Our algorithms optimize your PDF for smaller size</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">4</div>
                <h4 className="font-semibold mb-2">Download</h4>
                <p className="text-sm text-gray-400">Get your compressed PDF ready for sharing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}