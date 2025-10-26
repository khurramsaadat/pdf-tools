import AdvancedToolLayout from '@/components/AdvancedToolLayout'
import { FiType, FiUpload, FiSettings, FiFileText, FiImage } from 'react-icons/fi'

export default function WordToPdfPage() {
  return (
    <AdvancedToolLayout
      title="Word to PDF (Advanced)"
      description="Professional conversion with advanced formatting options and document optimization"
      icon={<FiType className="h-8 w-8 text-white" />}
    >
      {/* Upload Section */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Upload Word Documents
        </h2>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-500 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <FiUpload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Drop your Word files here
          </h3>
          <p className="text-gray-400 mb-4">
            Or click to browse and select files
          </p>
          <p className="text-sm text-gray-500">
            Supports: .docx, .doc, .rtf, .odt • Max file size: 100MB per file
          </p>
        </div>
      </div>

      {/* Advanced Conversion Settings */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-white mb-6">Professional Conversion Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              PDF Quality
            </label>
            <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>High Quality (Print)</option>
              <option>Balanced (Recommended)</option>
              <option>Optimized (Web)</option>
              <option>Minimum Size</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color Mode
            </label>
            <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Full Color</option>
              <option>Grayscale</option>
              <option>Black & White</option>
              <option>Auto-detect</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Page Size
            </label>
            <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Keep Original</option>
              <option>A4</option>
              <option>Letter</option>
              <option>Legal</option>
              <option>Custom</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Orientation
            </label>
            <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Keep Original</option>
              <option>Portrait</option>
              <option>Landscape</option>
              <option>Auto-fit</option>
            </select>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">Advanced Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500" defaultChecked />
              <span className="text-gray-300">Preserve hyperlinks</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500" defaultChecked />
              <span className="text-gray-300">Include bookmarks</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500" defaultChecked />
              <span className="text-gray-300">Embed fonts</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500" />
              <span className="text-gray-300">Password protection</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500" />
              <span className="text-gray-300">Digital signature ready</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500" defaultChecked />
              <span className="text-gray-300">PDF/A compliance</span>
            </label>
          </div>
        </div>

        {/* Metadata Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">Document Metadata</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input 
                type="text" 
                placeholder="Document title"
                className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
              <input 
                type="text" 
                placeholder="Document author"
                className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
          Convert to PDF
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-purple-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiFileText className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Format Preservation</h4>
          <p className="text-gray-400 text-sm">Maintains fonts, styles, and document structure perfectly</p>
        </div>
        
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-purple-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiSettings className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Professional Options</h4>
          <p className="text-gray-400 text-sm">Advanced settings for business and professional use</p>
        </div>
        
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-purple-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiImage className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">High Quality Output</h4>
          <p className="text-gray-400 text-sm">Crystal clear text and images in the final PDF</p>
        </div>
      </div>
    </AdvancedToolLayout>
  )
}
