import AdvancedToolLayout from '@/components/AdvancedToolLayout'
import { FiFile, FiUpload, FiType, FiImage, FiLayers, FiSettings, FiCheckCircle } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function PdfToWordPage() {
  return (
    <AdvancedToolLayout
      title="PDF to Word (Advanced)"
      description="Advanced conversion with layout preservation, OCR, and intelligent text recognition"
      icon={<FiFile className="h-6 w-6 text-white" />}
    >
      {/* Upload Section */}
      <Card className="mb-6 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-center">Upload PDF Files for Conversion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
            <FiUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Drop your PDF files here
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Or click to browse and select files
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 mb-3">
              Choose Files
            </Button>
            <p className="text-xs text-gray-500">
              Supports: .pdf • Max file size: 100MB per file
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Options */}
      <Card className="mb-6 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FiSettings className="mr-2 h-5 w-5" />
            Advanced Conversion Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Layout Preservation</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-300">Preserve original formatting</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-300">Maintain table structures</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-300">Extract images separately</span>
                </label>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">OCR Settings</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-300">Enable OCR for scanned PDFs</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-300">Multi-language recognition</span>
                </label>
                <div className="mt-2">
                  <label className="block text-sm text-gray-300 mb-1">Language:</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Auto-detect</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="bg-blue-600 p-3 rounded-full w-fit mx-auto mb-4">
              <FiType className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Text Recognition</h3>
            <p className="text-sm text-gray-400">
              Advanced OCR technology for accurate text extraction from any PDF
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="bg-green-600 p-3 rounded-full w-fit mx-auto mb-4">
              <FiLayers className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Layout Preservation</h3>
            <p className="text-sm text-gray-400">
              Maintains original formatting, tables, and document structure
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="bg-purple-600 p-3 rounded-full w-fit mx-auto mb-4">
              <FiImage className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Image Handling</h3>
            <p className="text-sm text-gray-400">
              Intelligent image extraction and positioning in Word documents
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How it Works */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-center">How Advanced PDF to Word Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">1</div>
              <h4 className="font-semibold mb-2">Upload PDF</h4>
              <p className="text-sm text-gray-400">Select your PDF file for conversion</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">2</div>
              <h4 className="font-semibold mb-2">Configure Options</h4>
              <p className="text-sm text-gray-400">Set OCR and layout preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">3</div>
              <h4 className="font-semibold mb-2">AI Processing</h4>
              <p className="text-sm text-gray-400">Advanced algorithms convert with precision</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">4</div>
              <h4 className="font-semibold mb-2">Download Word</h4>
              <p className="text-sm text-gray-400">Get your editable Word document</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdvancedToolLayout>
  )
}