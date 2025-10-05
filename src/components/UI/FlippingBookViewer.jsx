import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Download, RotateCcw, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react'

function FlippingBookViewer({ isOpen, onClose, pdfUrl, title, nepaliTitle }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (isOpen && pdfUrl) {
      setIsLoading(true)
      setCurrentPage(1)
      setZoom(100)
    }
  }, [isOpen, pdfUrl])

  const handlePreviousPage = () => {
    if (currentPage > 1 && !isFlipping) {
      setIsFlipping(true)
      setCurrentPage(prev => prev - 1)
      setTimeout(() => setIsFlipping(false), 300)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages && !isFlipping) {
      setIsFlipping(true)
      setCurrentPage(prev => prev + 1)
      setTimeout(() => setIsFlipping(false), 300)
    }
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50))
  }

  const handleResetZoom = () => {
    setZoom(100)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${title}.pdf`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isFullscreen) {
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, isFullscreen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-black/95 z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full h-full ${isFullscreen ? 'max-w-none max-h-none' : 'max-w-7xl max-h-[95vh]'} glass-card ${isFullscreen ? 'p-2' : 'p-4'} flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">{title}</h3>
              <p className="text-gray-300 text-sm">{nepaliTitle}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFullscreen}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage <= 1 || isFlipping}
                className="p-2 bg-navy-600 hover:bg-navy-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-white text-sm px-3">
                Page {currentPage} of {totalPages || '?'}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages || isFlipping}
                className="p-2 bg-navy-600 hover:bg-navy-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-white text-sm px-2">{zoom}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Book Container */}
          <div className="flex-1 relative overflow-hidden">
            <motion.div
              key={currentPage}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
            >
              <iframe
                ref={iframeRef}
                src={`${pdfUrl}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=1&zoom=${zoom}`}
                className="w-full h-full border-0 rounded-lg"
                title={title}
                onLoad={() => {
                  setIsLoading(false)
                  // Try to get total pages from PDF metadata
                  try {
                    const iframe = iframeRef.current
                    if (iframe && iframe.contentWindow) {
                      // This is a simplified approach - in a real implementation,
                      // you'd need to use PDF.js to get accurate page count
                      setTotalPages(50) // Default fallback
                    }
                  } catch (error) {
                    console.log('Could not determine page count')
                  }
                }}
              />
            </motion.div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-500 mx-auto mb-4"></div>
                  <p className="text-white">Loading PDF...</p>
                </div>
              </div>
            )}
          </div>

          {/* Page Navigation */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage <= 1}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 5))}
              disabled={currentPage <= 5}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
            >
              -5
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages || 50, currentPage + 5))}
              disabled={currentPage >= (totalPages || 50) - 5}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
            >
              +5
            </button>
            <button
              onClick={() => setCurrentPage(totalPages || 50)}
              disabled={currentPage >= (totalPages || 50)}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
            >
              Last
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default FlippingBookViewer