import AdvancedToolLayout from '@/components/AdvancedToolLayout'
import { FiFile, FiUpload, FiType, FiImage, FiLayers } from 'react-icons/fi'

export default function PdfToWordPage() {
  return (
    <AdvancedToolLayout
      title="PDF to Word (Advanced)"
      description="Advanced conversion with layout preservation, OCR, and intelligent text recognition"
      icon={<FiFile className="h-8 w-8 text-white" />}
    >
      {/* Upload Section */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Upload PDF Files for Conversion
        </h2>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-500 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <FiUpload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Drop your PDF files here
          </h3>
          <p className="text-gray-400 mb-4">
            Or click to browse and select files
          </p>
          <p className="text-sm text-gray-500">
            Supports: .pdf • Max file size: 100MB per file
          </p>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-white mb-6">Advanced Conversion Options</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Output Format
            </label>
            <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>.docx (Recommended)</option>
              <option>.doc (Legacy)</option>
              <option>.rtf (Rich Text Format)</option>
              <option>.odt (OpenDocument)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Layout Mode
            </label>
            <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Exact Layout (Recommended)</option>
              <option>Flowing Text</option>
              <option>Plain Text Only</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image Handling
            </label>
            <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Preserve Original Quality</option>
              <option>Optimize for Size</option>
              <option>Extract as Separate Files</option>
              <option>Convert to Text (OCR)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Page Range
            </label>
            <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Pages</option>
              <option>First Page Only</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>

        {/* OCR Options */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">OCR (Optical Character Recognition)</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500" />
              <span className="text-gray-300">Enable OCR for scanned documents</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500" />
              <span className="text-gray-300">Preserve original formatting during OCR</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500" />
              <span className="text-gray-300">Auto-detect document language</span>
            </label>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
          Convert to Word
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-blue-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiType className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Smart Text Recognition</h4>
          <p className="text-gray-400 text-sm">AI-powered text detection and formatting preservation</p>
        </div>
        
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-blue-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiImage className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Image Preservation</h4>
          <p className="text-gray-400 text-sm">Maintains image quality and positioning in the document</p>
        </div>
        
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-blue-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiLayers className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Layout Accuracy</h4>
          <p className="text-gray-400 text-sm">Precise recreation of original document structure</p>
        </div>
      </div>
    </AdvancedToolLayout>
  )
}
