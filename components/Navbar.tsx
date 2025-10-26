'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX, FiFile, FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const convertTools = [
    { name: 'PDF to Word', href: '/convert/pdf-to-word' },
    { name: 'PDF to Images', href: '/convert/pdf-to-images' },
    { name: 'Image to PDF', href: '/convert/image-to-pdf' },
    { name: 'Word to PDF', href: '/convert/word-to-pdf' }
  ]

  const editTools = [
    { name: 'Merge PDF', href: '/merge' },
    { name: 'Split PDF', href: '/split' },
    { name: 'Compress PDF', href: '/compress' },
    { name: 'Edit PDF', href: '/edit' },
    { name: 'Rotate PDF', href: '/rotate' },
    { name: 'Add Page Numbers', href: '/page-numbers' }
  ]

  const securityTools = [
    { name: 'Watermark', href: '/watermark' },
    { name: 'Protect PDF', href: '/protect' },
    { name: 'Remove Protection', href: '/advanced/remove-protection' }
  ]

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
              <FiFile className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl">PDF Tools</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>

              {/* Convert Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('convert')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  Convert
                  {openDropdown === 'convert' ? <FiChevronUp className="ml-1 h-4 w-4" /> : <FiChevronDown className="ml-1 h-4 w-4" />}
                </button>
                {openDropdown === 'convert' && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {convertTools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Edit Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('edit')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  Edit & Manage
                  {openDropdown === 'edit' ? <FiChevronUp className="ml-1 h-4 w-4" /> : <FiChevronDown className="ml-1 h-4 w-4" />}
                </button>
                {openDropdown === 'edit' && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {editTools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Security Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('security')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  Security
                  {openDropdown === 'security' ? <FiChevronUp className="ml-1 h-4 w-4" /> : <FiChevronDown className="ml-1 h-4 w-4" />}
                </button>
                {openDropdown === 'security' && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {securityTools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </Link>
              <Link href="/knowledge-base" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Help
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="text-gray-300 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={toggleMenu}>
              Home
            </Link>

            {/* Convert Tools Mobile */}
            <button
              onClick={() => toggleDropdown('convert-mobile')}
              className="w-full text-left text-gray-300 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center justify-between"
            >
              Convert
              {openDropdown === 'convert-mobile' ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
            </button>
            {openDropdown === 'convert-mobile' && (
              <div className="pl-4 space-y-1">
                {convertTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="text-gray-400 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-sm transition-colors"
                    onClick={toggleMenu}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Edit Tools Mobile */}
            <button
              onClick={() => toggleDropdown('edit-mobile')}
              className="w-full text-left text-gray-300 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center justify-between"
            >
              Edit & Manage
              {openDropdown === 'edit-mobile' ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
            </button>
            {openDropdown === 'edit-mobile' && (
              <div className="pl-4 space-y-1">
                {editTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="text-gray-400 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-sm transition-colors"
                    onClick={toggleMenu}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Security Tools Mobile */}
            <button
              onClick={() => toggleDropdown('security-mobile')}
              className="w-full text-left text-gray-300 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center justify-between"
            >
              Security
              {openDropdown === 'security-mobile' ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
            </button>
            {openDropdown === 'security-mobile' && (
              <div className="pl-4 space-y-1">
                {securityTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="text-gray-400 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-sm transition-colors"
                    onClick={toggleMenu}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/about" className="text-gray-300 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/knowledge-base" className="text-gray-300 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={toggleMenu}>
              Help
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
