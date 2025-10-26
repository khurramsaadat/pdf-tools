import { FiUpload, FiZap, FiShield } from 'react-icons/fi'
import { Card, CardContent } from '@/components/ui/card'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            All PDF Tools in One Place
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Merge, Convert & Edit PDFs with ease. Fast, secure, and completely free. Choose from our comprehensive suite of PDF tools to handle any document task
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="bg-blue-600 p-3 rounded-full mb-4">
                  <FiUpload className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Easy Upload</h3>
                <p className="text-sm text-gray-400">Drag & drop your files or click to browse</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="bg-purple-600 p-3 rounded-full mb-4">
                  <FiZap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-sm text-gray-400">Process your files in seconds</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="bg-green-600 p-3 rounded-full mb-4">
                  <FiShield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">100% Secure</h3>
                <p className="text-sm text-gray-400">Your files are processed securely and deleted after conversion</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}