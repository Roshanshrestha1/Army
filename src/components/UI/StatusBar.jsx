import React from 'react'
import { motion } from 'framer-motion'
import { Target, Download, Upload, Settings } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

function StatusBar() {
  const { 
    getProgress, 
    getNextAction, 
    exportData, 
    importData,
    toggleLowPerformanceMode,
    isLowPerformanceMode,
    isFullscreenMode
  } = useAppStore()
  
  const progress = getProgress()
  const nextAction = getNextAction()
  
  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gurkha-progress-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const success = importData(e.target.result)
          if (success) {
            alert('Data imported successfully!')
          } else {
            alert('Failed to import data. Please check the file format.')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }
  
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 right-0 left-0 ${isFullscreenMode ? 'left-0' : 'md:left-60'} z-40 glass-card`}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left side - Progress */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Target size={20} className="text-army-400" />
            <span className="text-white font-medium">Progress:</span>
            <span className="text-army-300 font-bold">{progress}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-army-500 to-navy-500 rounded-full"
            />
          </div>
        </div>
        
        {/* Center - Next Action */}
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-gray-300 text-sm">Next:</span>
          <span className="text-white font-medium text-sm">{nextAction}</span>
        </div>
        
        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Performance Toggle */}
          <button
            onClick={toggleLowPerformanceMode}
            className={`p-2 rounded-lg transition-colors ${
              isLowPerformanceMode 
                ? 'bg-accent-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            title="Toggle performance mode"
            aria-label="Toggle performance mode"
          >
            <Settings size={16} />
          </button>
          
          {/* Export Button */}
          <button
            onClick={handleExport}
            className="p-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg transition-colors"
            title="Export progress"
            aria-label="Export progress"
          >
            <Download size={16} />
          </button>
          
          {/* Import Button */}
          <button
            onClick={handleImport}
            className="p-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg transition-colors"
            title="Import progress"
            aria-label="Import progress"
          >
            <Upload size={16} />
          </button>
        </div>
      </div>
      
      {/* Mobile Progress Bar */}
      <div className="md:hidden px-6 pb-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">Next Action:</span>
          <span className="text-white font-medium">{nextAction}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default StatusBar