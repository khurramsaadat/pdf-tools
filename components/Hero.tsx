import { FiUpload, FiZap, FiShield } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            All PDF Tools in One Place
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-1xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Merge, Convert & Edit PDFs with ease. Fast, secure, and completely free. Choose from our comprehensive suite of PDF tools to handle any document task
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 p-4 rounded-full mb-4">
                <FiUpload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Easy Upload</h3>
              <p className="text-gray-400">Drag & drop your files or click to browse</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-600 p-4 rounded-full mb-4">
                <FiZap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Process your files in seconds</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-600 p-4 rounded-full mb-4">
                <FiShield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">100% Secure</h3>
              <p className="text-gray-400">Your files are processed securely and deleted after conversion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
