'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { FiUpload, FiFile, FiDownload, FiScissors, FiX, FiArrowLeft } from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface PDFFile {
  id: string
  name: string
  size: string
  file: File
}

export default function SplitPDFPage() {
  const [selectedFile, setSelectedFile] = useState<PDFFile | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processStatus, setProcessStatus] = useState<string>('')
  const [splitMode, setSplitMode] = useState<'page' | 'range' | 'every'>('page')
  const [splitValue, setSplitValue] = useState<string>('')
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const startOver = () => { setSelectedFile(null); setProcessStatus(''); setSplitValue('') }

  const handleFileSelect = () => fileInputRef.current?.click()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile({ id: generateId(), name: file.name, size: formatFileSize(file.size), file: file })
    } else {
      alert('Please select a valid PDF file')
    }
    if (event.target) event.target.value = ''
  }

  const handleDragOver = (event: React.DragEvent) => { event.preventDefault(); setIsDragOver(true) }
  const handleDragLeave = (event: React.DragEvent) => { event.preventDefault(); setIsDragOver(false) }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    const file = event.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile({ id: generateId(), name: file.name, size: formatFileSize(file.size), file: file })
    } else {
      alert('Please select a valid PDF file')
    }
  }

  const handleSplit = async () => {
    if (!selectedFile) return
    setIsProcessing(true)
    setProcessStatus('Splitting PDF...')
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setProcessStatus('✅ Split initiated. Feature coming soon!')
    } catch (error: any) {
      setProcessStatus(`❌ Error: ${error.message || 'Unknown error occurred'}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-red-900 py-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Split PDF</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">Split large PDF files into smaller documents. Extract pages or ranges.</p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-4 md:p-8 mb-8 shadow-lg">
            <div className={`border-2 border-dashed rounded-lg p-4 md:p-8 text-center transition-colors cursor-pointer ${isDragOver ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-red-400'}`}
              onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleFileSelect}>
              <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
              <FiUpload className={`h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 ${isDragOver ? 'text-red-500' : 'text-gray-400'}`} />
              {!selectedFile ? (
                <>
                  <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2"><span className="text-red-600 underline">Drop your PDF here or browse</span></h3>
                  <p className="text-xs md:text-sm text-gray-500">Supports: .pdf files only</p>
                </>
              ) : (
                <>
                  <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2"><span className="text-red-600 underline">Add more files or drop here</span></h3>
                  <p className="text-xs md:text-sm text-gray-500">Click to select another file</p>
                </>
              )}
            </div>
            {selectedFile && (
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1"><FiFile className="h-5 w-5 text-red-500 mr-3" />
                    <div><div className="text-sm font-medium text-gray-800">{selectedFile.name}</div><div className="text-xs text-gray-500">{selectedFile.size}</div></div>
                  </div>
                  <button onClick={() => setSelectedFile(null)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><FiX className="h-5 w-5" /></button>
                </div>
              </div>
            )}
          </div>
          {selectedFile && (
            <>
              <div className="bg-white rounded-xl p-4 md:p-8 shadow-lg mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Split Options</h3>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Split Mode</label>
                    <div className="flex gap-4">
                      <button onClick={() => setSplitMode('page')} className={`px-4 py-2 rounded-lg ${splitMode === 'page' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>Extract Pages</button>
                      <button onClick={() => setSplitMode('range')} className={`px-4 py-2 rounded-lg ${splitMode === 'range' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>Page Range</button>
                      <button onClick={() => setSplitMode('every')} className={`px-4 py-2 rounded-lg ${splitMode === 'every' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>Every N Pages</button>
                    </div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">{splitMode === 'page' ? 'Page Numbers (e.g., 1,3,5-10)' : splitMode === 'range' ? 'Page Range (e.g., 1-10)' : 'Pages per file'}</label>
                    <input type="text" value={splitValue} onChange={(e) => setSplitValue(e.target.value)} placeholder="Enter pages" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-8 shadow-lg">
                <button onClick={handleSplit} disabled={isProcessing} className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center disabled:cursor-not-allowed">
                  {isProcessing ? (<> <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div> Splitting... </>) : (<> <FiScissors className="h-5 w-5 mr-2" /> Split PDF </>)}
                </button>
                {processStatus && (
                  <div className={`mt-4 p-4 rounded-lg text-center text-sm font-medium ${processStatus.includes('✅') ? 'bg-green-50 border border-green-200 text-green-800' : processStatus.includes('❌') ? 'bg-red-50 border border-red-200 text-red-800' : 'bg-blue-50 border border-blue-200 text-blue-800'}`}>{processStatus}</div>
                )}
                {processStatus && (
                  <button onClick={startOver} className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors">Start Over</button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

