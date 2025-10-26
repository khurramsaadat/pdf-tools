import Link from 'next/link'
import { 
  FiFile, 
  FiImage, 
  FiType, 
  FiLayers, 
  FiEdit3, 
  FiRotateCw, 
  FiShuffle, 
  FiScissors,
  FiLock,
  FiMinimize2,
  FiHash,
  FiDroplet,
  FiStar,
  FiGrid,
  FiMonitor,
  FiShield,
  FiUnlock
} from 'react-icons/fi'

export default function Features() {
  const features = [
    {
      icon: FiLayers,
      title: "Merge PDFs",
      description: "Combine multiple PDF files into one PDF File",
      color: "from-orange-500 to-orange-600",
      href: "/merge"
    },
    {
      icon: FiFile,
      title: "PDF to Word",
      description: "Convert PDF documents to editable Word files",
      color: "from-blue-500 to-blue-600",
      href: "/convert/pdf-to-word"
    },
    {
      icon: FiImage,
      title: "PDF to Images",
      description: "Extract high-quality images from PDFs",
      color: "from-green-500 to-green-600",
      href: "/convert/pdf-to-images"
    },
    {
      icon: FiImage,
      title: "Image to PDF",
      description: "Convert images to PDF documents instantly",
      color: "from-cyan-500 to-cyan-600",
      href: "/convert/image-to-pdf"
    },
    {
      icon: FiType,
      title: "Word to PDF",
      description: "Convert Word documents to PDF format",
      color: "from-purple-500 to-purple-600",
      href: "/convert/word-to-pdf"
    },
    {
      icon: FiScissors,
      title: "Split PDF",
      description: "Split large PDF files into smaller documents",
      color: "from-red-500 to-red-600",
      href: "/split"
    },
    {
      icon: FiMinimize2,
      title: "Compress PDF",
      description: "Reduce file size without quality loss",
      color: "from-yellow-500 to-yellow-600",
      href: "/compress"
    },
    {
      icon: FiEdit3,
      title: "Edit PDF",
      description: "Add text, images, and annotations to PDFs",
      color: "from-indigo-500 to-indigo-600",
      href: "/edit"
    },
    {
      icon: FiRotateCw,
      title: "Rotate PDF",
      description: "Fix document orientation instantly",
      color: "from-teal-500 to-teal-600",
      href: "/rotate"
    },
    {
      icon: FiHash,
      title: "Page Numbers",
      description: "Add professional page numbering",
      color: "from-emerald-500 to-emerald-600",
      href: "/page-numbers"
    },
    {
      icon: FiDroplet,
      title: "Watermark",
      description: "Brand your documents securely",
      color: "from-blue-400 to-blue-500",
      href: "/watermark"
    },
    {
      icon: FiLock,
      title: "Protect PDF",
      description: "Add passwords and security to your PDFs",
      color: "from-gray-500 to-gray-600",
      href: "/protect"
    }
  ]

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Link 
                key={index}
                href={feature.href}
                className="group bg-gray-700 rounded-xl p-6 hover:bg-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Need help choosing the right tool?</p>
          <Link href="/help" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Get Help
          </Link>
        </div>
      </div>

      {/* Advanced Processing Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Advanced Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FiStar className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Advanced Processing Features
            </h3>
            <FiStar className="h-6 w-6 text-yellow-500 ml-2" />
          </div>
          <p className="text-lg text-gray-400">
            Enhanced tools for professional document processing
          </p>
        </div>

        {/* Advanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            href="/advanced/pdf-to-word"
            className="group bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-6 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-600"
          >
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 mb-4">
              <FiFile className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
              PDF to Word
            </h4>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
              Advanced conversion with layout preservation and OCR
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-300 border border-yellow-600">
                <FiStar className="h-3 w-3 mr-1" />
                Enhanced
              </span>
            </div>
          </Link>

          <Link 
            href="/advanced/word-to-pdf"
            className="group bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-6 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-600"
          >
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 mb-4">
              <FiType className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
              Word to PDF
            </h4>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
              Professional conversion with advanced formatting options
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-300 border border-yellow-600">
                <FiStar className="h-3 w-3 mr-1" />
                Enhanced
              </span>
            </div>
          </Link>

          <Link 
            href="/advanced/excel-to-pdf"
            className="group bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-6 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-600"
          >
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 mb-4">
              <FiGrid className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
              Excel to PDF
            </h4>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
              Convert spreadsheets with chart and formula preservation
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-300 border border-yellow-600">
                <FiStar className="h-3 w-3 mr-1" />
                Enhanced
              </span>
            </div>
          </Link>

          <Link 
            href="/advanced/powerpoint-to-pdf"
            className="group bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-6 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-600"
          >
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 mb-4">
              <FiMonitor className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
              PowerPoint to PDF
            </h4>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
              Convert presentations with slide animations and transitions
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-300 border border-yellow-600">
                <FiStar className="h-3 w-3 mr-1" />
                Enhanced
              </span>
            </div>
          </Link>

          <Link 
            href="/advanced/password-protect"
            className="group bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-6 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-600"
          >
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 mb-4">
              <FiShield className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
              Password Protect
            </h4>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
              Advanced encryption and security with custom permissions
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-300 border border-yellow-600">
                <FiStar className="h-3 w-3 mr-1" />
                Enhanced
              </span>
            </div>
          </Link>

          <Link 
            href="/advanced/remove-protection"
            className="group bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-6 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-600"
          >
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 mb-4">
              <FiUnlock className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
              Remove Protection
            </h4>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
              Safely remove passwords and restrictions from PDFs
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-300 border border-yellow-600">
                <FiStar className="h-3 w-3 mr-1" />
                Enhanced
              </span>
            </div>
          </Link>
        </div>

        {/* Advanced Features CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Unlock professional-grade document processing</p>
          <Link href="/advanced" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
            Explore Advanced Tools
          </Link>
        </div>
      </div>
    </section>
  )
}
