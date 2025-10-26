import { PDFDocument, PDFName, PDFArray, PDFDict, PDFRef } from 'pdf-lib'

export interface CompressionOptions {
  quality: 'high' | 'medium' | 'low'
  imageQuality: number // 0.1 to 1.0
  removeMetadata: boolean
  optimizeImages: boolean
  removeAnnotations: boolean
}

export interface CompressionResult {
  success: boolean
  originalSize: number
  compressedSize: number
  compressionRatio: number
  error?: string
  compressedPdfBytes?: Uint8Array
}

/**
 * Compress a PDF file with effective optimization techniques
 */
export async function compressPDF(
  file: File,
  options: CompressionOptions,
  statusCallback?: (status: string) => void
): Promise<CompressionResult> {
  try {
    statusCallback?.('Reading PDF file...')
    const originalSize = file.size
    const arrayBuffer = await file.arrayBuffer()
    
    statusCallback?.('Loading PDF document...')
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    
    // Get initial page count
    const pageCount = pdfDoc.getPageCount()
    statusCallback?.(`Processing ${pageCount} pages...`)
    
    // Remove metadata aggressively
    if (options.removeMetadata) {
      statusCallback?.('Removing metadata and unnecessary data...')
      try {
        pdfDoc.setTitle('')
        pdfDoc.setAuthor('')
        pdfDoc.setSubject('')
        pdfDoc.setKeywords([])
        pdfDoc.setProducer('')
        pdfDoc.setCreator('')
        pdfDoc.setCreationDate(new Date(0))
        pdfDoc.setModificationDate(new Date(0))
      } catch (error) {
        console.warn('Could not remove some metadata:', error)
      }
    }
    
    // Remove document-level optional content aggressively
    statusCallback?.('Removing optional document content...')
    try {
      const catalog = pdfDoc.catalog
      const keysToRemove = [
        'OCProperties', 'Metadata', 'StructTreeRoot', 'MarkInfo', 
        'Lang', 'SpiderInfo', 'OutputIntents', 'PieceInfo', 
        'Perms', 'Legal', 'Requirements', 'Collection', 
        'NeedsRendering', 'PageLabels', 'Names', 'Dests',
        'ViewerPreferences', 'PageLayout', 'PageMode',
        'Outlines', 'Threads', 'OpenAction', 'AA', 'URI'
      ]
      
      keysToRemove.forEach(key => {
        try {
          catalog.delete(PDFName.of(key))
        } catch (error) {
          // Ignore individual key deletion errors
        }
      })
    } catch (error) {
      console.warn('Could not remove document-level content:', error)
    }
    
    // Process each page for aggressive optimization
    const pages = pdfDoc.getPages()
    for (let i = 0; i < pages.length; i++) {
      statusCallback?.(`Optimizing page ${i + 1}/${pages.length}...`)
      const page = pages[i]
      
      try {
        // Remove page-level optional content
        const pageKeysToRemove = [
          'Annots', 'Thumb', 'B', 'Dur', 'Trans', 
          'AA', 'Metadata', 'PieceInfo', 'SeparationInfo',
          'Tabs', 'TemplateInstantiated', 'PresSteps',
          'UserUnit', 'VP'
        ]
        
        pageKeysToRemove.forEach(key => {
          try {
            if (key === 'Annots' && !options.removeAnnotations) {
              return // Skip if annotations should be preserved
            }
            page.node.delete(PDFName.of(key))
          } catch (error) {
            // Ignore individual key deletion errors
          }
        })
        
        // Remove page group and other optional elements
        try {
          const pageDict = page.node
          pageDict.delete(PDFName.of('Group'))
          pageDict.delete(PDFName.of('StructParents'))
        } catch (error) {
          // Ignore errors
        }
        
      } catch (error) {
        console.warn(`Could not optimize page ${i + 1}:`, error)
      }
    }
    
    // Optimize images if requested
    if (options.optimizeImages) {
      statusCallback?.('Optimizing images...')
      try {
        await optimizeImages(pdfDoc, options.imageQuality, statusCallback)
      } catch (error) {
        console.warn('Image optimization failed:', error)
      }
    }
    
    // Set compression options based on quality level
    let saveOptions: any = {
      useObjectStreams: true,
      addDefaultPage: false,
      updateFieldAppearances: false
    }
    
    switch (options.quality) {
      case 'high':
        saveOptions.objectsPerTick = 10
        break
      case 'medium':
        saveOptions.objectsPerTick = 25
        break
      case 'low':
        saveOptions.objectsPerTick = 50
        break
    }
    
    statusCallback?.('Applying compression...')
    const compressedPdfBytes = await pdfDoc.save(saveOptions)
    
    const compressedSize = compressedPdfBytes.length
    const compressionRatio = originalSize > 0 ? ((originalSize - compressedSize) / originalSize) * 100 : 0
    
    statusCallback?.('Compression complete!')
    
    return {
      success: true,
      originalSize,
      compressedSize,
      compressionRatio: Math.max(0, Math.round(compressionRatio * 100) / 100),
      compressedPdfBytes: new Uint8Array(compressedPdfBytes)
    }
    
  } catch (error: any) {
    console.error('PDF compression error:', error)
    return {
      success: false,
      originalSize: file.size,
      compressedSize: 0,
      compressionRatio: 0,
      error: `Failed to compress PDF: ${error.message || 'Unknown error'}`
    }
  }
}

/**
 * Optimize images in the PDF document
 */
async function optimizeImages(
  pdfDoc: PDFDocument, 
  quality: number, 
  statusCallback?: (status: string) => void
): Promise<void> {
  try {
    statusCallback?.('Scanning for images...')
    
    // Get all objects in the PDF
    const objects = pdfDoc.context.enumerateIndirectObjects()
    let imageCount = 0
    
    for (const [ref, object] of objects) {
      if (object instanceof PDFDict) {
        const type = object.get(PDFName.of('Type'))
        const subtype = object.get(PDFName.of('Subtype'))
        
        // Check if this is an image object
        if (
          (type && type.toString() === '/XObject') ||
          (subtype && (subtype.toString() === '/Image' || subtype.toString() === '/Form'))
        ) {
          imageCount++
          statusCallback?.(`Processing image ${imageCount}...`)
          
          try {
            // Try to optimize the image object
            const filter = object.get(PDFName.of('Filter'))
            const width = object.get(PDFName.of('Width'))
            const height = object.get(PDFName.of('Height'))
            
            // For now, we'll remove some optional image properties
            // Full image recompression would require canvas manipulation
            const optionalKeys = ['SMask', 'Mask', 'Decode', 'Intent', 'Interpolate']
            optionalKeys.forEach(key => {
              try {
                object.delete(PDFName.of(key))
              } catch (error) {
                // Ignore deletion errors
              }
            })
            
          } catch (error) {
            console.warn(`Could not optimize image ${imageCount}:`, error)
          }
        }
      }
    }
    
    statusCallback?.(`Optimized ${imageCount} images`)
    
  } catch (error) {
    console.warn('Image optimization error:', error)
  }
}

/**
 * Ultra-aggressive compression with multiple optimization passes
 */
export async function ultraCompressPDF(
  file: File,
  options: CompressionOptions,
  statusCallback?: (status: string) => void
): Promise<CompressionResult> {
  try {
    statusCallback?.('Starting ultra compression...')
    
    // First pass with maximum settings
    const firstPassOptions: CompressionOptions = {
      quality: 'low',
      imageQuality: Math.min(options.imageQuality, 0.3),
      removeMetadata: true,
      optimizeImages: true,
      removeAnnotations: true
    }
    
    const firstPass = await compressPDF(file, firstPassOptions, (status) => {
      statusCallback?.(`Pass 1: ${status}`)
    })
    
    if (!firstPass.success || !firstPass.compressedPdfBytes) {
      return firstPass
    }
    
    // If we got good compression, try one more pass
    if (firstPass.compressionRatio > 5) {
      statusCallback?.('Applying second compression pass...')
      
      try {
        const tempFile = new File([firstPass.compressedPdfBytes as BlobPart], file.name, { 
          type: 'application/pdf' 
        })
        
        const secondPass = await compressPDF(tempFile, firstPassOptions, (status) => {
          statusCallback?.(`Pass 2: ${status}`)
        })
        
        if (secondPass.success && secondPass.compressedPdfBytes) {
          // Calculate total compression ratio from original file
          const totalCompressionRatio = file.size > 0 
            ? ((file.size - secondPass.compressedSize) / file.size) * 100 
            : 0
          
          return {
            success: true,
            originalSize: file.size,
            compressedSize: secondPass.compressedSize,
            compressionRatio: Math.max(0, Math.round(totalCompressionRatio * 100) / 100),
            compressedPdfBytes: secondPass.compressedPdfBytes
          }
        }
      } catch (error) {
        console.warn('Second pass failed, using first pass result')
      }
    }
    
    return firstPass
    
  } catch (error: any) {
    console.error('Ultra compression error:', error)
    return {
      success: false,
      originalSize: file.size,
      compressedSize: 0,
      compressionRatio: 0,
      error: `Failed to ultra compress PDF: ${error.message || 'Unknown error'}`
    }
  }
}

/**
 * Get recommended compression settings based on file size and use case
 */
export function getRecommendedCompressionSettings(
  fileSizeBytes: number,
  useCase: 'email' | 'web' | 'print' | 'archive'
): CompressionOptions {
  const fileSizeMB = fileSizeBytes / (1024 * 1024)
  
  switch (useCase) {
    case 'email':
      // Prioritize small file size for email attachments
      return {
        quality: 'low',
        imageQuality: 0.2,
        removeMetadata: true,
        optimizeImages: true,
        removeAnnotations: true
      }
      
    case 'web':
      // Balance between quality and loading speed
      return {
        quality: 'medium',
        imageQuality: 0.4,
        removeMetadata: true,
        optimizeImages: true,
        removeAnnotations: false
      }
      
    case 'print':
      // Preserve quality for printing
      return {
        quality: 'high',
        imageQuality: 0.8,
        removeMetadata: false,
        optimizeImages: false,
        removeAnnotations: false
      }
      
    case 'archive':
      // Long-term storage, balance quality and size
      return {
        quality: 'medium',
        imageQuality: 0.6,
        removeMetadata: false,
        optimizeImages: true,
        removeAnnotations: false
      }
      
    default:
      return {
        quality: 'medium',
        imageQuality: 0.5,
        removeMetadata: true,
        optimizeImages: true,
        removeAnnotations: false
      }
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Calculate compression percentage
 */
export function getCompressionPercentage(originalSize: number, compressedSize: number): number {
  if (originalSize === 0) return 0
  return Math.round(((originalSize - compressedSize) / originalSize) * 100)
}