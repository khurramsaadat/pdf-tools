import AdvancedToolLayout from '@/components/AdvancedToolLayout'
import { FiGrid, FiUpload, FiBarChart, FiTable, FiPrinter } from 'react-icons/fi'

export default function ExcelToPdfPage() {
  return (
    <AdvancedToolLayout
      title="Excel to PDF (Advanced)"
      description="Convert spreadsheets with chart and formula preservation, advanced formatting options"
      icon={<FiGrid className="h-8 w-8 text-white" />}
    >
      {/* Upload Section */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Upload Excel Spreadsheets
        </h2>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-500 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <FiUpload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Drop your Excel files here
          </h3>
          <p className="text-gray-400 mb-4">
            Or click to browse and select files
          </p>
          <p className="text-sm text-gray-500">
            Supports: .xlsx, .xls, .xlsm, .csv • Max file size: 100MB per file
          </p>
        </div>
      </div>

      {/* Conversion Settings */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-white mb-6">Advanced Conversion Settings</h3>
        
        {/* Worksheet Selection */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">Worksheet Selection</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sheets to Convert
              </label>
              <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>All Worksheets</option>
                <option>Active Sheet Only</option>
                <option>Selected Sheets</option>
                <option>Visible Sheets Only</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Page Layout
              </label>
              <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Fit to Page Width</option>
                <option>Fit to Page</option>
                <option>Actual Size</option>
                <option>Custom Scale</option>
              </select>
            </div>
          </div>
        </div>

        {/* Page Setup */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">Page Setup</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Page Size
              </label>
              <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>A4</option>
                <option>Letter</option>
                <option>Legal</option>
                <option>A3</option>
                <option>Tabloid</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Orientation
              </label>
              <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Auto-detect</option>
                <option>Portrait</option>
                <option>Landscape</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Quality
              </label>
              <select className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>High Quality</option>
                <option>Standard</option>
                <option>Optimized</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">Content Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-green-600 bg-gray-600 border-gray-500 rounded focus:ring-green-500" defaultChecked />
              <span className="text-gray-300">Include charts and graphs</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-green-600 bg-gray-600 border-gray-500 rounded focus:ring-green-500" defaultChecked />
              <span className="text-gray-300">Show formulas (optional)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-green-600 bg-gray-600 border-gray-500 rounded focus:ring-green-500" defaultChecked />
              <span className="text-gray-300">Include headers and footers</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-green-600 bg-gray-600 border-gray-500 rounded focus:ring-green-500" />
              <span className="text-gray-300">Print gridlines</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-green-600 bg-gray-600 border-gray-500 rounded focus:ring-green-500" />
              <span className="text-gray-300">Print row and column headings</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-green-600 bg-gray-600 border-gray-500 rounded focus:ring-green-500" defaultChecked />
              <span className="text-gray-300">Preserve cell formatting</span>
            </label>
          </div>
        </div>

        {/* Print Range */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">Print Range</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cell Range (Optional)
              </label>
              <input 
                type="text" 
                placeholder="e.g., A1:Z100 or leave blank for auto"
                className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Scaling (%)
              </label>
              <input 
                type="number" 
                placeholder="100"
                min="10"
                max="400"
                className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
          Convert to PDF
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-green-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiBarChart className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Chart Preservation</h4>
          <p className="text-gray-400 text-sm">Maintains all charts, graphs, and visual elements</p>
        </div>
        
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-green-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiTable className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Formula Handling</h4>
          <p className="text-gray-400 text-sm">Smart formula conversion and calculation results</p>
        </div>
        
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-green-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiPrinter className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Print Optimization</h4>
          <p className="text-gray-400 text-sm">Professional layout optimized for printing</p>
        </div>
      </div>
    </AdvancedToolLayout>
  )
}
