import { PDFDocument } from 'pdf-lib'

export interface MergeOptions {
  filename?: string
  preserveBookmarks?: boolean
}

export interface MergeResult {
  success: boolean
  error?: string
  downloadUrl?: string
  filename?: string
}

/**
 * Merge multiple PDF files and return raw bytes (for custom download handling)
 */
export async function mergePDFs(
  files: File[], 
  preserveBookmarks: boolean = true,
  statusCallback?: (status: string) => void
): Promise<Uint8Array> {
  try {
    statusCallback?.('Creating new PDF document...')
    const mergedPdf = await PDFDocument.create()
    
    console.log(`Starting PDF merge of ${files.length} files`)
    
    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      statusCallback?.(`Processing file ${i + 1}/${files.length}: ${file.name}`)
      console.log(`Processing file ${i + 1}/${files.length}: ${file.name}`)
      
      try {
        // Read the PDF file
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        
        // Get all pages from this PDF
        const pageCount = pdf.getPageCount()
        const pageIndices = Array.from({ length: pageCount }, (_, i) => i)
        
        // Copy all pages to the merged document
        const copiedPages = await mergedPdf.copyPages(pdf, pageIndices)
        
        // Add each page to the merged document
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page)
        })
        
        console.log(`Added ${pageCount} pages from ${file.name}`)
        
      } catch (fileError: any) {
        console.error(`Error processing ${file.name}:`, fileError)
        throw new Error(`Failed to process ${file.name}: ${fileError.message}`)
      }
    }
    
    // Check if we have any pages
    if (mergedPdf.getPageCount() === 0) {
      throw new Error('No pages could be extracted from the uploaded files')
    }
    
    statusCallback?.('Generating final PDF...')
    console.log(`Merge complete. Total pages: ${mergedPdf.getPageCount()}`)
    
    // Generate and return the merged PDF bytes
    const pdfBytes = await mergedPdf.save()
    return new Uint8Array(pdfBytes)
    
  } catch (error: any) {
    console.error('PDF merge error:', error)
    throw new Error(`Failed to merge PDFs: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Merge selected pages and return raw bytes (for custom download handling)
 */
export async function mergeSelectedPages(
  selectedPages: any[],
  statusCallback?: (status: string) => void
): Promise<Uint8Array> {
  try {
    statusCallback?.('Creating new PDF document...')
    const mergedPdf = await PDFDocument.create()
    
    console.log(`Starting selective PDF merge of ${selectedPages.length} pages`)
    
    // Group pages by file
    const fileGroups = new Map<string, { file: File; pages: any[] }>()
    
    for (const page of selectedPages) {
      if (!fileGroups.has(page.fileId)) {
        fileGroups.set(page.fileId, { file: page.file, pages: [] })
      }
      fileGroups.get(page.fileId)!.pages.push(page)
    }
    
    // Process each file group
    for (const [fileId, group] of Array.from(fileGroups.entries())) {
      statusCallback?.(`Processing ${group.pages.length} pages from ${group.file.name}`)
      console.log(`Processing ${group.pages.length} pages from ${group.file.name}`)
      
      try {
        // Read the PDF file
        const arrayBuffer = await group.file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        
        // Sort pages by their order index
        const sortedPages = group.pages.sort((a, b) => a.orderIndex - b.orderIndex)
        
        // Get page numbers (convert to 0-based indices)
        const pageIndices = sortedPages.map(page => page.pageNumber - 1)
        
        // Validate page numbers
        const maxPages = pdf.getPageCount()
        const validPageIndices = pageIndices.filter(index => 
          index >= 0 && index < maxPages
        )
        
        if (validPageIndices.length === 0) {
          console.warn(`No valid pages selected from ${group.file.name}`)
          continue
        }
        
        // Copy selected pages to the merged document
        const copiedPages = await mergedPdf.copyPages(pdf, validPageIndices)
        
        // Add each page to the merged document
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page)
        })
        
        console.log(`Added ${validPageIndices.length} selected pages from ${group.file.name}`)
        
      } catch (fileError: any) {
        console.error(`Error processing ${group.file.name}:`, fileError)
        throw new Error(`Failed to process ${group.file.name}: ${fileError.message}`)
      }
    }
    
    // Check if we have any pages
    if (mergedPdf.getPageCount() === 0) {
      throw new Error('No pages could be extracted from the selected pages')
    }
    
    statusCallback?.('Generating final PDF...')
    console.log(`Selective merge complete. Total pages: ${mergedPdf.getPageCount()}`)
    
    // Generate and return the merged PDF bytes
    const pdfBytes = await mergedPdf.save()
    return new Uint8Array(pdfBytes)
    
  } catch (error: any) {
    console.error('PDF selective merge error:', error)
    throw new Error(`Failed to merge selected pages: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Legacy function - Merge multiple PDF files into a single PDF (with auto-download)
 */
export async function mergePDFsLegacy(
  files: File[], 
  options: MergeOptions = {}
): Promise<MergeResult> {
  try {
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create()
    
    console.log(`Starting PDF merge of ${files.length} files`)
    if (options.preserveBookmarks) {
      console.log('Note: pdf-lib preserves links and some annotations, but not bookmarks/outlines')
    }
    
    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      console.log(`Processing file ${i + 1}/${files.length}: ${file.name}`)
      
      try {
        // Read the PDF file
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        
        // Get all pages from this PDF
        const pageCount = pdf.getPageCount()
        const pageIndices = Array.from({ length: pageCount }, (_, i) => i)
        
        // Copy all pages to the merged document
        const copiedPages = await mergedPdf.copyPages(pdf, pageIndices)
        
        // Add each page to the merged document
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page)
        })
        
        console.log(`Added ${pageCount} pages from ${file.name}`)
        
      } catch (fileError: any) {
        console.error(`Error processing ${file.name}:`, fileError)
        // Continue with other files even if one fails
        continue
      }
    }
    
    // Check if we have any pages
    if (mergedPdf.getPageCount() === 0) {
      return {
        success: false,
        error: 'No pages could be extracted from the uploaded files'
      }
    }
    
    console.log(`Merge complete. Total pages: ${mergedPdf.getPageCount()}`)
    
    // Generate the merged PDF bytes
    const pdfBytes = await mergedPdf.save()
    
    // Create download filename
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')
    const filename = options.filename || `merged-document-${timestamp}.pdf`
    const finalFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`
    
    // Create blob and download URL
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
    const downloadUrl = URL.createObjectURL(blob)
    
    // Auto-download the file
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = finalFilename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    console.log(`Download initiated: ${finalFilename}`)
    
    // Clean up the URL after a delay to allow download to start
    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl)
    }, 5000)
    
    return {
      success: true,
      downloadUrl,
      filename: finalFilename
    }
    
  } catch (error: any) {
    console.error('PDF merge error:', error)
    return {
      success: false,
      error: `Failed to merge PDFs: ${error.message || 'Unknown error'}`
    }
  }
}

/**
 * Legacy function - Merge specific pages from multiple PDF files (with auto-download)
 */
export async function mergeSelectedPagesLegacy(
  pageSelections: { file: File; pageNumbers: number[] }[],
  options: MergeOptions = {}
): Promise<MergeResult> {
  try {
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create()
    
    console.log(`Starting selective PDF merge`)
    if (options.preserveBookmarks) {
      console.log('Note: pdf-lib preserves links and some annotations, but not bookmarks/outlines')
    }
    
    // Process each file and its selected pages
    for (const selection of pageSelections) {
      const { file, pageNumbers } = selection
      console.log(`Processing ${pageNumbers.length} pages from ${file.name}`)
      
      try {
        // Read the PDF file
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        
        // Validate page numbers
        const maxPages = pdf.getPageCount()
        const validPageNumbers = pageNumbers.filter(pageNum => 
          pageNum >= 1 && pageNum <= maxPages
        )
        
        if (validPageNumbers.length === 0) {
          console.warn(`No valid pages selected from ${file.name}`)
          continue
        }
        
        // Convert to 0-based indices
        const pageIndices = validPageNumbers.map(pageNum => pageNum - 1)
        
        // Copy selected pages to the merged document
        const copiedPages = await mergedPdf.copyPages(pdf, pageIndices)
        
        // Add each page to the merged document
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page)
        })
        
        console.log(`Added ${validPageNumbers.length} selected pages from ${file.name}`)
        
      } catch (fileError: any) {
        console.error(`Error processing ${file.name}:`, fileError)
        continue
      }
    }
    
    // Check if we have any pages
    if (mergedPdf.getPageCount() === 0) {
      return {
        success: false,
        error: 'No pages could be extracted from the selected pages'
      }
    }
    
    console.log(`Selective merge complete. Total pages: ${mergedPdf.getPageCount()}`)
    
    // Generate the merged PDF bytes
    const pdfBytes = await mergedPdf.save()
    
    // Create download filename
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')
    const filename = options.filename || `merged-selected-pages-${timestamp}.pdf`
    const finalFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`
    
    // Create blob and download URL
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
    const downloadUrl = URL.createObjectURL(blob)
    
    // Auto-download the file
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = finalFilename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    console.log(`Download initiated: ${finalFilename}`)
    
    // Clean up the URL after a delay
    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl)
    }, 5000)
    
    return {
      success: true,
      downloadUrl,
      filename: finalFilename
    }
    
  } catch (error: any) {
    console.error('PDF selective merge error:', error)
    return {
      success: false,
      error: `Failed to merge selected pages: ${error.message || 'Unknown error'}`
    }
  }
}