import AdvancedToolLayout from '@/components/AdvancedToolLayout'
import { FiMonitor, FiUpload, FiDownload, FiSettings } from 'react-icons/fi'

export default function PowerPointToPdfPage() {
  return (
    <AdvancedToolLayout
      title="PowerPoint to PDF"
      description="Convert presentations with slide animations and transitions preserved"
      icon={<FiMonitor className="h-8 w-8 text-white" />}
    >
      {/* Upload Section */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Upload Your PowerPoint Files
        </h2>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-500 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <FiUpload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Drop your PowerPoint files here
          </h3>
          <p className="text-gray-400 mb-4">
            Or click to browse and select files
          </p>
          <p className="text-sm text-gray-500">
            Supports: .ppt, .pptx • Max file size: 100MB per file
          </p>
        </div>
        
        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="bg-orange-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <FiSettings className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">Preserve Formatting</h4>
            <p className="text-gray-400 text-sm">Maintains original layout and design elements</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <FiMonitor className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">Animation Support</h4>
            <p className="text-gray-400 text-sm">Converts slide transitions and animations</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <FiDownload className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">High Quality</h4>
            <p className="text-gray-400 text-sm">Professional PDF output with crisp graphics</p>
          </div>
        </div>
      </div>

      {/* Conversion Options */}
      <div className="bg-gray-700 rounded-xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">Conversion Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Output Quality
            </label>
            <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>High Quality (Recommended)</option>
              <option>Medium Quality</option>
              <option>Optimized for Web</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Page Range
            </label>
            <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>All Slides</option>
              <option>Current Slide</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
            Convert to PDF
          </button>
        </div>
      </div>
    </AdvancedToolLayout>
  )
}
