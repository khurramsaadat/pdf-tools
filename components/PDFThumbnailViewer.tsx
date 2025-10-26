'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import {
  FiGrid,
  FiList,
  FiLayers,
  FiCheck,
  FiX,
  FiMove,
  FiCheckSquare,
  FiSquare,
  FiEye,
  FiLock,
  FiAlertTriangle,
  FiLoader
} from 'react-icons/fi'
import {
  generateThumbnail,
  getPDFInfo,
  generateErrorThumbnail,
  cleanupThumbnailsForFile,
  isPDFJSSupported,
  type ThumbnailResult,
  type PDFInfo
} from '@/utils/pdfThumbnailGenerator'

interface PDFFile {
  id: string
  name: string
  size: string
  sizeBytes: number
  pages: number
  file: File
}

interface PDFPage {
  id: string
  fileId: string
  fileName: string
  pageNumber: number
  thumbnail: string | null
  selected: boolean
  error: string | null
  isLoading: boolean
}

interface SelectedPage {
  id: string
  fileId: string
  fileName: string
  pageNumber: number
  thumbnail: string
  orderIndex: number
}

type LayoutMode = 'grouped' | 'continuous' | 'tabbed'

interface PDFThumbnailViewerProps {
  files: PDFFile[]
  onPagesSelected: (pages: SelectedPage[]) => void
}

export default function PDFThumbnailViewer({ files, onPagesSelected }: PDFThumbnailViewerProps) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('grouped')
  const [activeTab, setActiveTab] = useState<string>('')
  const [pages, setPages] = useState<PDFPage[]>([])
  const [isSupported, setIsSupported] = useState(true)
  const [initializationError, setInitializationError] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(false)
  const [displayedPageCount, setDisplayedPageCount] = useState(100)
  const [filePageLimits, setFilePageLimits] = useState<{[fileId: string]: number}>({})
  
  const observerRef = useRef<IntersectionObserver | null>(null)
  const thumbnailRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const initializationRef = useRef<string>('')

  // Browser support check on mount only
  useEffect(() => {
    setIsSupported(isPDFJSSupported())
  }, [])

  // Create a stable file signature to prevent unnecessary re-initialization
  const fileSignature = useMemo(() => {
    return files.map(f => `${f.id}-${f.name}-${f.sizeBytes}`).join('|')
  }, [files])

  // Initialize PDF files only when the file signature changes
  useEffect(() => {
    if (!isSupported || files.length === 0) {
      setPages([])
      setInitializationError(null)
      return
    }

    // Prevent duplicate initialization
    if (initializationRef.current === fileSignature) {
      console.log('Skipping duplicate initialization for:', fileSignature)
      return
    }

    initializationRef.current = fileSignature
    console.log('Starting PDF initialization for:', fileSignature)

    const initializePDFs = async () => {
      setIsInitializing(true)
      setInitializationError(null)
      
      try {
        const newPages: PDFPage[] = []
        
        for (const file of files) {
          try {
            console.log(`Analyzing file: ${file.name}`)
            const info = await getPDFInfo(file.file)
            console.log(`PDF analysis result for ${file.name}:`, {
              pageCount: info.pageCount,
              isCorrupted: info.isCorrupted,
              isPasswordProtected: info.isPasswordProtected,
              title: info.title
            })
            
            if (info.isCorrupted || info.isPasswordProtected) {
              // Add error page for corrupted/protected files
              newPages.push({
                id: `${file.id}-error`,
                fileId: file.id,
                fileName: file.name,
                pageNumber: 1,
                thumbnail: null,
                selected: false,
                error: info.isPasswordProtected ? 'Password protected PDF' : 'Corrupted or invalid PDF',
                isLoading: false
              })
            } else {
              // Add all pages
              for (let pageNum = 1; pageNum <= info.pageCount; pageNum++) {
                newPages.push({
                  id: `${file.id}-page-${pageNum}`,
                  fileId: file.id,
                  fileName: file.name,
                  pageNumber: pageNum,
                  thumbnail: null,
                  selected: false,
                  error: null,
                  isLoading: false
                })
              }
            }
          } catch (error: any) {
            console.error(`Failed to analyze ${file.name}:`, error)
            newPages.push({
              id: `${file.id}-error`,
              fileId: file.id,
              fileName: file.name,
              pageNumber: 1,
              thumbnail: null,
              selected: false,
              error: error.message || 'Failed to analyze PDF',
              isLoading: false
            })
          }
        }
        
        setPages(newPages)
        if (files.length > 0 && !activeTab) {
          setActiveTab(files[0].id)
        }
        
        console.log(`Initialized ${newPages.length} pages`)
        
      } catch (error: any) {
        console.error('PDF initialization failed:', error)
        setInitializationError(error.message || 'Failed to initialize PDFs')
      } finally {
        setIsInitializing(false)
      }
    }

    initializePDFs()
  }, [fileSignature, isSupported, files, activeTab])

  // Update selected pages callback with stable reference
  const selectedPages = useMemo(() => {
    return pages
      .filter(page => page.selected && page.thumbnail)
      .map((page, index) => ({
        id: page.id,
        fileId: page.fileId,
        fileName: page.fileName,
        pageNumber: page.pageNumber,
        thumbnail: page.thumbnail!,
        orderIndex: index
      }))
  }, [pages])

  // Call onPagesSelected when selectedPages changes
  useEffect(() => {
    onPagesSelected(selectedPages)
  }, [selectedPages, onPagesSelected])

  const handlePageVisible = useCallback(async (pageId: string) => {
    const page = pages.find(p => p.id === pageId)
    if (!page || page.thumbnail || page.isLoading || page.error) return

    const file = files.find(f => f.id === page.fileId)
    if (!file) return

    // Update loading state
    setPages(prev => prev.map(p =>
      p.id === pageId ? { ...p, isLoading: true } : p
    ))

    try {
      const result = await generateThumbnail(file.file, page.pageNumber, {
        scale: 0.8,
        width: 160,
        height: 220
      })

      if (result.success && result.thumbnail) {
        setPages(prev => prev.map(p =>
          p.id === pageId 
            ? { ...p, thumbnail: result.thumbnail!, isLoading: false, error: null }
            : p
        ))
      } else {
        setPages(prev => prev.map(p =>
          p.id === pageId 
            ? { ...p, isLoading: false, error: result.error || 'Failed to generate thumbnail' }
            : p
        ))
      }
    } catch (error: any) {
      setPages(prev => prev.map(p =>
        p.id === pageId 
          ? { ...p, isLoading: false, error: error.message || 'Thumbnail generation failed' }
          : p
      ))
    }
  }, [pages, files])

  // Set up lazy loading observer
  useEffect(() => {
    if (!isSupported) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageId = entry.target.getAttribute('data-page-id')
            if (pageId) {
              console.log(`Page ${pageId} is now visible, generating thumbnail...`)
              handlePageVisible(pageId)
            }
          }
        })
      },
      { 
        rootMargin: '100px', // Increased margin for earlier loading
        threshold: 0.1 // Trigger when 10% of element is visible
      }
    )

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isSupported, handlePageVisible])

  // Auto-generate thumbnails for first few pages immediately
  useEffect(() => {
    if (pages.length === 0) return

    // For large PDFs (>50 pages), only auto-generate first 10 pages for performance
    // For smaller PDFs, auto-generate first 20 pages
    const isLargePDF = pages.length > 50
    const autoGenerateCount = isLargePDF ? 10 : Math.min(pages.length, 20)
    const autoGeneratePages = pages.slice(0, autoGenerateCount)
    
    console.log(`Auto-generating ${autoGenerateCount} thumbnails for ${pages.length} total pages (large PDF: ${isLargePDF})`)
    
    autoGeneratePages.forEach(page => {
      if (!page.thumbnail && !page.isLoading && !page.error) {
        handlePageVisible(page.id)
      }
    })
  }, [pages, handlePageVisible])

  const setThumbnailRef = useCallback((pageId: string, element: HTMLDivElement | null) => {
    // Clean up previous element if exists
    if (thumbnailRefs.current[pageId] && observerRef.current) {
      observerRef.current.unobserve(thumbnailRefs.current[pageId]!)
    }
    
    thumbnailRefs.current[pageId] = element
    
    if (element && observerRef.current) {
      observerRef.current.observe(element)
      console.log(`Started observing page ${pageId}`)
    }
  }, [])

  const togglePageSelection = useCallback((pageId: string) => {
    setPages(prev => prev.map(page =>
      page.id === pageId ? { ...page, selected: !page.selected } : page
    ))
  }, [])

  const selectAllPages = useCallback((fileId: string) => {
    setPages(prev => prev.map(page =>
      page.fileId === fileId ? { ...page, selected: true } : page
    ))
  }, [])

  const selectNonePages = useCallback((fileId: string) => {
    setPages(prev => prev.map(page =>
      page.fileId === fileId ? { ...page, selected: false } : page
    ))
  }, [])

  // Get currently displayed pages
  const displayedPages = useMemo(() => {
    return pages.slice(0, displayedPageCount)
  }, [pages, displayedPageCount])

  // Get displayed pages for a specific file
  const getDisplayedPagesForFile = useCallback((fileId: string) => {
    const filePages = pages.filter(page => page.fileId === fileId)
    const limit = filePageLimits[fileId] || 50 // Default to showing 50 pages per file
    return filePages.slice(0, limit)
  }, [pages, filePageLimits])

  const generateAllThumbnails = useCallback(() => {
    pages.forEach(page => {
      if (!page.thumbnail && !page.isLoading && !page.error) {
        handlePageVisible(page.id)
      }
    })
  }, [pages, handlePageVisible])

  const generateVisibleThumbnails = useCallback(() => {
    // Generate thumbnails for currently displayed pages only
    const visiblePages = layoutMode === 'continuous' 
      ? displayedPages 
      : layoutMode === 'tabbed' 
        ? getDisplayedPagesForFile(activeTab)
        : pages.filter(page => {
            const filePages = pages.filter(p => p.fileId === page.fileId)
            const limit = filePageLimits[page.fileId] || 50
            const fileDisplayedPages = filePages.slice(0, limit)
            return fileDisplayedPages.includes(page)
          })
    
    console.log(`Generating thumbnails for ${visiblePages.length} visible pages`)
    
    visiblePages.forEach(page => {
      if (!page.thumbnail && !page.isLoading && !page.error) {
        handlePageVisible(page.id)
      }
    })
  }, [pages, displayedPages, layoutMode, activeTab, getDisplayedPagesForFile, filePageLimits, handlePageVisible])

  const showAllPages = useCallback(() => {
    // Show all pages for all files
    const newLimits: {[fileId: string]: number} = {}
    files.forEach(file => {
      const filePages = pages.filter(page => page.fileId === file.id)
      newLimits[file.id] = filePages.length
    })
    setFilePageLimits(newLimits)
    setDisplayedPageCount(pages.length)
    console.log('Showing all pages for all files')
  }, [files, pages])

  const loadMorePages = useCallback(() => {
    const currentCount = displayedPageCount
    const newCount = Math.min(displayedPageCount + 50, pages.length)
    setDisplayedPageCount(newCount)
    console.log(`Loading more pages: showing ${newCount} of ${pages.length} total pages`)
    
    // Re-observe new pages after a short delay to ensure DOM is updated
    setTimeout(() => {
      const newPages = pages.slice(currentCount, newCount)
      newPages.forEach(page => {
        const element = thumbnailRefs.current[page.id]
        if (element && observerRef.current) {
          observerRef.current.observe(element)
          console.log(`Re-observing newly loaded page ${page.id}`)
        }
      })
    }, 100)
  }, [displayedPageCount, pages.length])

  // Load more pages for a specific file
  const loadMorePagesForFile = useCallback((fileId: string) => {
    const filePages = pages.filter(page => page.fileId === fileId)
    const currentLimit = filePageLimits[fileId] || 50
    const newLimit = Math.min(currentLimit + 50, filePages.length)
    
    setFilePageLimits(prev => ({
      ...prev,
      [fileId]: newLimit
    }))
    
    console.log(`Loading more pages for file ${fileId}: showing ${newLimit} of ${filePages.length} pages`)
    
    // Re-observe new pages after a short delay to ensure DOM is updated
    setTimeout(() => {
      const newPages = filePages.slice(currentLimit, newLimit)
      newPages.forEach(page => {
        const element = thumbnailRefs.current[page.id]
        if (element && observerRef.current) {
          observerRef.current.observe(element)
          console.log(`Re-observing newly loaded page ${page.id}`)
        }
      })
    }, 100)
  }, [pages, filePageLimits])

  const renderPageThumbnail = (page: PDFPage) => {
    const getThumbnailSrc = () => {
      if (page.error) {
        if (page.error.includes('password') || page.error.includes('Password')) {
          return generateErrorThumbnail('password')
        } else if (page.error.includes('corrupted') || page.error.includes('invalid')) {
          return generateErrorThumbnail('corrupted')
        } else {
          return generateErrorThumbnail('unsupported')
        }
      }
      return page.thumbnail || undefined
    }

    return (
      <div
        key={page.id}
        ref={(el) => setThumbnailRef(page.id, el)}
        data-page-id={page.id}
        className={`relative group cursor-pointer transition-all duration-200 ${
          page.selected ? 'ring-2 ring-orange-500' : 'hover:shadow-lg'
        }`}
        onClick={() => !page.isLoading && togglePageSelection(page.id)}
      >
        <div className="relative w-32 h-40 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
          {page.isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <FiLoader className="h-8 w-8 text-orange-500 animate-spin mb-2" />
              <span className="text-xs text-gray-500">Loading...</span>
            </div>
          ) : page.error ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <img
                src={getThumbnailSrc()}
                alt={`Error: ${page.error}`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : page.thumbnail ? (
            <img
              src={page.thumbnail}
              alt={`${page.fileName} - Page ${page.pageNumber}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <FiEye className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-xs text-gray-500 mb-2">Page {page.pageNumber}</span>
              {!page.isLoading && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePageVisible(page.id)
                  }}
                  className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded"
                >
                  Generate
                </button>
              )}
            </div>
          )}

          {/* Selection Checkbox */}
          <div className="absolute top-2 left-2">
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
              page.selected
                ? 'bg-orange-500 border-orange-500'
                : 'bg-white border-gray-300 group-hover:border-orange-300'
            } ${page.isLoading ? 'opacity-50' : ''}`}>
              {page.selected && <FiCheck className="h-4 w-4 text-white" />}
            </div>
          </div>

          {/* Page Number Badge */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            Page {page.pageNumber}
          </div>

          {/* Error Indicator */}
          {page.error && (
            <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded" title={page.error}>
              <FiAlertTriangle className="h-3 w-3" />
            </div>
          )}


        </div>
        {page.error && (
          <div className="mt-1 text-xs text-red-500 truncate" title={page.error}>
            {page.error}
          </div>
        )}
      </div>
    )
  }

  const renderLayoutToggle = () => (
    <div className="hidden sm:flex sm:flex-row sm:items-center gap-1 mb-6 bg-gray-100 rounded-lg p-1">
      <span className="text-sm font-medium text-gray-700">Layout:</span>
      <div className="flex flex-wrap gap-1">
        {[
          { mode: 'grouped', icon: FiLayers, label: 'Grouped' },
          { mode: 'continuous', icon: FiGrid, label: 'Continuous' },
          { mode: 'tabbed', icon: FiList, label: 'Tabbed' }
        ].map(({ mode, icon: Icon, label }) => (
          <button
            key={mode}
            onClick={() => setLayoutMode(mode as LayoutMode)}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              layoutMode === mode
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )

  const renderGroupedLayout = () => {
    const fileGroups = files.map(file => {
      const allFilePages = pages.filter(page => page.fileId === file.id)
      const displayedFilePages = getDisplayedPagesForFile(file.id)
      const selectedCount = allFilePages.filter(p => p.selected).length
      const currentLimit = filePageLimits[file.id] || 50
      
      return (
        <div key={file.id} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 break-words flex-1">{file.name}</h4>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                {selectedCount} selected • {displayedFilePages.length} of {allFilePages.length} shown
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => selectAllPages(file.id)}
                  className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-2 sm:px-3 py-1 rounded whitespace-nowrap"
                >
                  Select All
                </button>
                <button
                  onClick={() => selectNonePages(file.id)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded whitespace-nowrap"
                >
                  Select None
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
            {displayedFilePages.map(renderPageThumbnail)}
          </div>
          
          {/* Load More Button for this file */}
          {currentLimit < allFilePages.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => loadMorePagesForFile(file.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Load More Pages ({currentLimit} of {allFilePages.length} shown)
              </button>
            </div>
          )}
        </div>
      )
    })

    return <div>{fileGroups}</div>
  }

  const renderContinuousLayout = () => (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">All Pages</h4>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm text-gray-500">{selectedPages.length} selected</span>
          <div className="flex gap-2">
            <button
              onClick={() => files.forEach(file => selectAllPages(file.id))}
              className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-2 sm:px-3 py-1 rounded whitespace-nowrap"
            >
              Select All
            </button>
            <button
              onClick={() => files.forEach(file => selectNonePages(file.id))}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded whitespace-nowrap"
            >
              Select None
            </button>
            <button
              onClick={generateVisibleThumbnails}
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded"
            >
              Generate Visible Thumbnails
            </button>
            <button
              onClick={showAllPages}
              className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded"
            >
              Show All Pages
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
        {displayedPages.map(renderPageThumbnail)}
      </div>
      
      {/* Load More Button */}
      {displayedPageCount < pages.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMorePages}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Load More Pages ({displayedPageCount} of {pages.length} shown)
          </button>
        </div>
      )}
    </div>
  )

  const renderTabbedLayout = () => {
    const activeFile = files.find(f => f.id === activeTab)
    const allActivePages = pages.filter(page => page.fileId === activeTab)
    const displayedActivePages = getDisplayedPagesForFile(activeTab)
    const selectedCount = allActivePages.filter(p => p.selected).length
    const currentLimit = filePageLimits[activeTab] || 50

    return (
      <div>
        <div className="flex flex-wrap gap-1 mb-6 border-b pb-2">
          {files.map(file => (
            <button
              key={file.id}
              onClick={() => setActiveTab(file.id)}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-t-lg transition-colors truncate max-w-[120px] sm:max-w-none ${
                activeTab === file.id
                  ? 'bg-orange-100 text-orange-700 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              title={file.name}
            >
              {file.name}
            </button>
          ))}
        </div>

        {activeFile && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 break-words">{activeFile.name}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                {selectedCount} selected • {displayedActivePages.length} of {allActivePages.length} shown
              </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => selectAllPages(activeTab)}
                    className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-2 sm:px-3 py-1 rounded whitespace-nowrap"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => selectNonePages(activeTab)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded whitespace-nowrap"
                  >
                    Select None
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
              {displayedActivePages.map(renderPageThumbnail)}
            </div>
            
            {/* Load More Button for active tab */}
            {currentLimit < allActivePages.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => loadMorePagesForFile(activeTab)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Load More Pages ({currentLimit} of {allActivePages.length} shown)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }



  // Browser compatibility check
  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start">
          <FiAlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Browser Not Supported</h3>
            <p className="text-yellow-700">PDF thumbnail generation requires a modern browser.</p>
          </div>
        </div>
      </div>
    )
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-8">
        <FiEye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Upload PDF files to preview pages</p>
      </div>
    )
  }

  if (initializationError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start">
          <FiAlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">PDF Processing Error</h3>
            <p className="text-red-700">{initializationError}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-3 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">Thumbnails & Selections</h3>
        <div className="text-xs sm:text-sm text-gray-500">{selectedPages.length} pages selected for merging</div>
      </div>

      {renderLayoutToggle()}

      {isInitializing ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Analyzing PDF files...</p>
        </div>
      ) : (
        <>
          {/* On mobile, always use grouped layout. On desktop, use selected layout mode */}
          <div className="sm:hidden">
            {renderGroupedLayout()}
          </div>
          <div className="hidden sm:block">
            {layoutMode === 'grouped' && renderGroupedLayout()}
            {layoutMode === 'continuous' && renderContinuousLayout()}
            {layoutMode === 'tabbed' && renderTabbedLayout()}
          </div>
        </>
      )}
    </div>
  )
}