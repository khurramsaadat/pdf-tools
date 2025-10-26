'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX, FiFile } from 'react-icons/fi'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
              <FiFile className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-lg">PDF Tools</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-gray-700">
                <Link href="/">Home</Link>
              </Button>

              {/* Convert Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
                    Convert
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-gray-700 border-gray-600">
                  {convertTools.map((tool) => (
                    <DropdownMenuItem key={tool.href} asChild className="text-gray-300 hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white">
                      <Link href={tool.href} className="text-sm">
                        {tool.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Edit Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
                    Edit & Manage
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-gray-700 border-gray-600">
                  {editTools.map((tool) => (
                    <DropdownMenuItem key={tool.href} asChild className="text-gray-300 hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white">
                      <Link href={tool.href} className="text-sm">
                        {tool.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Security Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
                    Security
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-gray-700 border-gray-600">
                  {securityTools.map((tool) => (
                    <DropdownMenuItem key={tool.href} asChild className="text-gray-300 hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white">
                      <Link href={tool.href} className="text-sm">
                        {tool.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-gray-700">
                <Link href="/about">About</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-gray-700">
                <Link href="/knowledge-base">Help</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isOpen ? (
                <FiX className="block h-5 w-5" />
              ) : (
                <FiMenu className="block h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:bg-gray-600 hover:text-white" onClick={toggleMenu}>
              <Link href="/">Home</Link>
            </Button>

            {/* Convert Tools Mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleDropdown('convert-mobile')}
              className="w-full justify-between text-gray-300 hover:bg-gray-600 hover:text-white"
            >
              Convert
              {openDropdown === 'convert-mobile' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {openDropdown === 'convert-mobile' && (
              <div className="pl-4 space-y-1">
                {convertTools.map((tool) => (
                  <Button
                    key={tool.href}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-full justify-start text-gray-400 hover:bg-gray-600 hover:text-white text-sm"
                    onClick={toggleMenu}
                  >
                    <Link href={tool.href}>{tool.name}</Link>
                  </Button>
                ))}
              </div>
            )}

            {/* Edit Tools Mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleDropdown('edit-mobile')}
              className="w-full justify-between text-gray-300 hover:bg-gray-600 hover:text-white"
            >
              Edit & Manage
              {openDropdown === 'edit-mobile' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {openDropdown === 'edit-mobile' && (
              <div className="pl-4 space-y-1">
                {editTools.map((tool) => (
                  <Button
                    key={tool.href}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-full justify-start text-gray-400 hover:bg-gray-600 hover:text-white text-sm"
                    onClick={toggleMenu}
                  >
                    <Link href={tool.href}>{tool.name}</Link>
                  </Button>
                ))}
              </div>
            )}

            {/* Security Tools Mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleDropdown('security-mobile')}
              className="w-full justify-between text-gray-300 hover:bg-gray-600 hover:text-white"
            >
              Security
              {openDropdown === 'security-mobile' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {openDropdown === 'security-mobile' && (
              <div className="pl-4 space-y-1">
                {securityTools.map((tool) => (
                  <Button
                    key={tool.href}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-full justify-start text-gray-400 hover:bg-gray-600 hover:text-white text-sm"
                    onClick={toggleMenu}
                  >
                    <Link href={tool.href}>{tool.name}</Link>
                  </Button>
                ))}
              </div>
            )}

            <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:bg-gray-600 hover:text-white" onClick={toggleMenu}>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:bg-gray-600 hover:text-white" onClick={toggleMenu}>
              <Link href="/knowledge-base">Help</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}