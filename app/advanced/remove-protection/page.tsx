import AdvancedToolLayout from '@/components/AdvancedToolLayout'
import { FiUnlock, FiUpload, FiKey, FiShield, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

export default function RemoveProtectionPage() {
  return (
    <AdvancedToolLayout
      title="Remove PDF Protection"
      description="Safely remove passwords and restrictions from protected PDF documents"
      icon={<FiUnlock className="h-8 w-8 text-white" />}
    >
      {/* Upload Section */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Upload Protected PDF
        </h2>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-500 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <FiUpload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Drop your protected PDF here
          </h3>
          <p className="text-gray-400 mb-4">
            Or click to browse and select file
          </p>
          <p className="text-sm text-gray-500">
            Supports: .pdf • Max file size: 100MB
          </p>
        </div>
      </div>

      {/* Password Entry Section */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <FiKey className="h-5 w-5 mr-2" />
          Authentication Required
        </h3>
        
        <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <FiAlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-300 font-semibold mb-1">Legal Notice</h4>
              <p className="text-yellow-200 text-sm">
                Only remove protection from PDFs that you own or have explicit permission to modify. 
                Unauthorized removal of PDF protection may violate copyright laws.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Owner Password
            </label>
            <input 
              type="password" 
              placeholder="Enter owner/master password"
              className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-xs text-gray-400 mt-1">Required to remove document restrictions</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              User Password (if applicable)
            </label>
            <input 
              type="password" 
              placeholder="Enter user password"
              className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-xs text-gray-400 mt-1">Only needed if document requires password to open</p>
          </div>
        </div>
      </div>

      {/* Removal Options */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-white mb-6">Protection Removal Options</h3>
        
        <div className="space-y-4 mb-6">
          <label className="flex items-start space-x-3">
            <input type="checkbox" className="w-4 h-4 text-teal-600 bg-gray-600 border-gray-500 rounded focus:ring-teal-500 mt-1" defaultChecked />
            <div>
              <span className="text-gray-300 font-medium">Remove password protection</span>
              <p className="text-gray-400 text-sm">Remove user and owner passwords from the document</p>
            </div>
          </label>
          
          <label className="flex items-start space-x-3">
            <input type="checkbox" className="w-4 h-4 text-teal-600 bg-gray-600 border-gray-500 rounded focus:ring-teal-500 mt-1" defaultChecked />
            <div>
              <span className="text-gray-300 font-medium">Remove editing restrictions</span>
              <p className="text-gray-400 text-sm">Allow copying, printing, and modifying the document</p>
            </div>
          </label>
          
          <label className="flex items-start space-x-3">
            <input type="checkbox" className="w-4 h-4 text-teal-600 bg-gray-600 border-gray-500 rounded focus:ring-teal-500 mt-1" defaultChecked />
            <div>
              <span className="text-gray-300 font-medium">Remove printing restrictions</span>
              <p className="text-gray-400 text-sm">Enable high-quality printing of the document</p>
            </div>
          </label>
          
          <label className="flex items-start space-x-3">
            <input type="checkbox" className="w-4 h-4 text-teal-600 bg-gray-600 border-gray-500 rounded focus:ring-teal-500 mt-1" defaultChecked />
            <div>
              <span className="text-gray-300 font-medium">Remove copy restrictions</span>
              <p className="text-gray-400 text-sm">Allow text and image extraction from the document</p>
            </div>
          </label>
        </div>
        
        <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
          Remove Protection
        </button>
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-teal-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiShield className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Secure Processing</h4>
          <p className="text-gray-400 text-sm">Your files are processed securely and deleted immediately</p>
        </div>
        
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-teal-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiCheckCircle className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Legal Compliance</h4>
          <p className="text-gray-400 text-sm">Only removes protection with proper authorization</p>
        </div>
        
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-teal-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiUnlock className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Complete Removal</h4>
          <p className="text-gray-400 text-sm">Removes all restrictions while preserving document quality</p>
        </div>
      </div>
    </AdvancedToolLayout>
  )
}
