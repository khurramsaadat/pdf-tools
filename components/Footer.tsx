import Link from 'next/link'
import { FiMail, FiGithub, FiHeart, FiLinkedin, FiFacebook, FiInstagram } from 'react-icons/fi'
import { FaXTwitter } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 text-white mb-3">
              <span className="font-bold text-base sm:text-lg">PDF Converter Online</span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 mb-4 max-w-md">
              The most comprehensive online PDF toolkit. Convert, merge, edit, and manage your PDF documents with ease. Fast, secure, and completely free.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" asChild className="p-2 h-auto text-gray-400 hover:text-white">
                <a href="#" title="Follow us on X">
                  <FaXTwitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-2 h-auto text-gray-400 hover:text-white">
                <a href="#" title="Follow us on LinkedIn">
                  <FiLinkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-2 h-auto text-gray-400 hover:text-white">
                <a href="#" title="Follow us on Facebook">
                  <FiFacebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-2 h-auto text-gray-400 hover:text-white">
                <a href="#" title="Follow us on Instagram">
                  <FiInstagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-2 h-auto text-gray-400 hover:text-white">
                <a href="#" title="View our GitHub">
                  <FiGithub className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-2 h-auto text-gray-400 hover:text-white">
                <a href="#" title="Contact us">
                  <FiMail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Convert Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Convert</h3>
            <ul className="space-y-1.5">
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/convert/pdf-to-word">PDF to Word</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/convert/pdf-to-images">PDF to Images</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/convert/image-to-pdf">Image to PDF</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/convert/word-to-pdf">Word to PDF</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/advanced/excel-to-pdf">Excel to PDF</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/advanced/powerpoint-to-pdf">PPT to PDF</Link>
                </Button>
              </li>
            </ul>
          </div>

          {/* Edit & Manage */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Edit & Manage</h3>
            <ul className="space-y-1.5">
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/merge">Merge PDF</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/split">Split PDF</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/compress">Compress PDF</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/edit">Edit PDF</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/rotate">Rotate PDF</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/page-numbers">Add Page Numbers</Link>
                </Button>
              </li>
            </ul>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Security</h3>
            <ul className="space-y-1.5">
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/watermark">Add Watermark</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/protect">Protect PDF</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/advanced/password-protect">Advanced Protection</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/advanced/remove-protection">Remove Protection</Link>
                </Button>
              </li>
            </ul>
            <h3 className="text-sm font-semibold text-white mb-3 mt-5">Resources</h3>
            <ul className="space-y-1.5">
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/about">About</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/knowledge-base">Knowledge Base</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/knowledge-base/tutorials">Tutorials</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white justify-start">
                  <Link href="/knowledge-base/faq">FAQ</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="my-6 bg-gray-700" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-xs text-gray-400">
              © 2025 PDF Converter Online. All rights reserved.
            </p>
            <div className="flex space-x-3">
              <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white">
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
              <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white">
                <Link href="/terms">Terms of Service</Link>
              </Button>
              <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs text-gray-400 hover:text-white">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-400 mt-3 md:mt-0">
            <span>Made with</span>
            <FiHeart className="h-3 w-3 mx-1 text-red-500" />
            <span>for document productivity</span>
          </div>
        </div>
      </div>
    </footer>
  )
}