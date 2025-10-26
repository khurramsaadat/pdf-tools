import Link from 'next/link'
import { FiFile } from 'react-icons/fi'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'horizontal' | 'stacked'
  showIcon?: boolean
}

export default function Logo({ 
  size = 'md', 
  variant = 'horizontal', 
  showIcon = true 
}: LogoProps) {
  const sizeClasses = {
    sm: {
      container: 'text-sm',
      icon: 'h-4 w-4',
      text: 'text-sm',
      spacing: 'space-x-1.5',
      padding: 'px-2 py-1'
    },
    md: {
      container: 'text-base',
      icon: 'h-5 w-5',
      text: 'text-base',
      spacing: 'space-x-2',
      padding: 'px-3 py-1.5'
    },
    lg: {
      container: 'text-lg',
      icon: 'h-6 w-6',
      text: 'text-lg',
      spacing: 'space-x-2.5',
      padding: 'px-4 py-2'
    }
  }

  const classes = sizeClasses[size]

  if (variant === 'stacked') {
    return (
      <Link href="/" className="flex flex-col items-center group">
        {showIcon && (
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg mb-1 group-hover:from-red-600 group-hover:to-red-700 transition-all duration-200 shadow-lg">
            <FiFile className={`${classes.icon} text-white`} />
          </div>
        )}
        <div className="flex flex-col items-center">
          <span className="font-bold text-white text-xs tracking-wider">PDF</span>
          <span className="font-bold text-white text-xs tracking-wider -mt-0.5">TOOLS</span>
        </div>
      </Link>
    )
  }

  return (
    <Link href="/" className={`flex items-center group ${classes.spacing}`}>
      {showIcon && (
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg group-hover:from-red-600 group-hover:to-red-700 transition-all duration-200 shadow-lg group-hover:shadow-xl">
          <FiFile className={`${classes.icon} text-white`} />
        </div>
      )}
      <div className="flex items-center">
        <div className={`bg-gradient-to-r from-red-500 to-red-600 ${classes.padding} rounded-lg group-hover:from-red-600 group-hover:to-red-700 transition-all duration-200 shadow-lg group-hover:shadow-xl`}>
          <span className={`font-bold text-white tracking-wider ${classes.text}`}>
            PDF TOOLS
          </span>
        </div>
      </div>
    </Link>
  )
}

// Alternative creative logo designs
export function LogoCreative({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: { container: 'h-8', text: 'text-xs', icon: 'h-3 w-3' },
    md: { container: 'h-10', text: 'text-sm', icon: 'h-4 w-4' },
    lg: { container: 'h-12', text: 'text-base', icon: 'h-5 w-5' }
  }

  const classes = sizeClasses[size]

  return (
    <Link href="/" className="group">
      <div className={`${classes.container} flex items-center space-x-1`}>
        {/* PDF part with icon */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 px-2 py-1 rounded-l-lg group-hover:from-red-600 group-hover:to-red-700 transition-all duration-200 shadow-lg flex items-center space-x-1">
          <FiFile className={`${classes.icon} text-white`} />
          <span className={`font-bold text-white tracking-wide ${classes.text}`}>PDF</span>
        </div>
        {/* TOOLS part */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 px-2 py-1 rounded-r-lg group-hover:from-red-700 group-hover:to-red-800 transition-all duration-200 shadow-lg">
          <span className={`font-bold text-white tracking-wide ${classes.text}`}>TOOLS</span>
        </div>
      </div>
    </Link>
  )
}

// Minimal logo for tight spaces
export function LogoMinimal({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: { container: 'h-6 w-6', text: 'text-xs' },
    md: { container: 'h-8 w-8', text: 'text-sm' },
    lg: { container: 'h-10 w-10', text: 'text-base' }
  }

  const classes = sizeClasses[size]

  return (
    <Link href="/" className="group">
      <div className={`${classes.container} bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all duration-200 shadow-lg group-hover:shadow-xl`}>
        <span className={`font-bold text-white ${classes.text}`}>PT</span>
      </div>
    </Link>
  )
}

// Badge-style logo
export function LogoBadge({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: { text: 'text-xs', padding: 'px-2 py-0.5', icon: 'h-3 w-3' },
    md: { text: 'text-sm', padding: 'px-3 py-1', icon: 'h-4 w-4' },
    lg: { text: 'text-base', padding: 'px-4 py-1.5', icon: 'h-5 w-5' }
  }

  const classes = sizeClasses[size]

  return (
    <Link href="/" className="group">
      <div className={`inline-flex items-center space-x-1.5 bg-gradient-to-r from-red-500 to-red-600 ${classes.padding} rounded-full group-hover:from-red-600 group-hover:to-red-700 transition-all duration-200 shadow-lg group-hover:shadow-xl`}>
        <FiFile className={`${classes.icon} text-white`} />
        <span className={`font-bold text-white tracking-wide ${classes.text}`}>
          PDF TOOLS
        </span>
      </div>
    </Link>
  )
}
