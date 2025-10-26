import AdvancedToolLayout from '@/components/AdvancedToolLayout'
import { FiShield, FiUpload, FiLock, FiEye, FiEdit3, FiCopy } from 'react-icons/fi'

export default function PasswordProtectPage() {
  return (
    <AdvancedToolLayout
      title="Password Protect PDF"
      description="Advanced encryption and security with custom permissions and access control"
      icon={<FiShield className="h-8 w-8 text-white" />}
    >
      {/* Upload Section */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Upload PDF to Protect
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

      {/* Security Settings */}
      <div className="bg-gray-700 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-white mb-6">Security Settings</h3>
        
        {/* Password Section */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <FiLock className="h-5 w-5 mr-2" />
            Password Protection
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                User Password (Open Document)
              </label>
              <input 
                type="password" 
                placeholder="Enter password to open PDF"
                className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <p className="text-xs text-gray-400 mt-1">Required to open and view the PDF</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Owner Password (Edit Permissions)
              </label>
              <input 
                type="password" 
                placeholder="Enter password for editing rights"
                className="w-full bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <p className="text-xs text-gray-400 mt-1">Required to modify document permissions</p>
            </div>
          </div>
        </div>

        {/* Permissions Section */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <FiShield className="h-5 w-5 mr-2" />
            Document Permissions
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-red-600 bg-gray-600 border-gray-500 rounded focus:ring-red-500" />
              <span className="text-gray-300 flex items-center">
                <FiCopy className="h-4 w-4 mr-2" />
                Allow copying text and images
              </span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-red-600 bg-gray-600 border-gray-500 rounded focus:ring-red-500" />
              <span className="text-gray-300 flex items-center">
                <FiEdit3 className="h-4 w-4 mr-2" />
                Allow document modifications
              </span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-red-600 bg-gray-600 border-gray-500 rounded focus:ring-red-500" />
              <span className="text-gray-300 flex items-center">
                <FiEye className="h-4 w-4 mr-2" />
                Allow content extraction for accessibility
              </span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-red-600 bg-gray-600 border-gray-500 rounded focus:ring-red-500" />
              <span className="text-gray-300">
                Allow form field filling
              </span>
            </label>
          </div>
        </div>

        {/* Encryption Level */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">Encryption Level</h4>
          <select className="w-full md:w-1/2 bg-gray-600 border border-gray-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>256-bit AES (Recommended)</option>
            <option>128-bit AES</option>
            <option>128-bit RC4</option>
            <option>40-bit RC4 (Legacy)</option>
          </select>
        </div>
        
        <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
          Apply Password Protection
        </button>
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-red-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiShield className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">256-bit Encryption</h4>
          <p className="text-gray-400 text-sm">Military-grade security for your documents</p>
        </div>
        
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-red-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiLock className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Custom Permissions</h4>
          <p className="text-gray-400 text-sm">Fine-grained control over document access</p>
        </div>
        
        <div className="bg-gray-700 rounded-xl p-6 text-center">
          <div className="bg-red-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <FiEye className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-2">Secure Processing</h4>
          <p className="text-gray-400 text-sm">Files are processed securely and never stored</p>
        </div>
      </div>
    </AdvancedToolLayout>
  )
}
