import React from 'react'
import { motion } from 'framer-motion'
import Navigation from './components/UI/Navigation'
import StatusBar from './components/UI/StatusBar'
import Onboarding from './components/Onboarding'
import HomeView from './components/Views/HomeView'
import RoadmapHomeView from './components/Views/RoadmapHomeView'
import ChecklistView from './components/Views/ChecklistView'
import TimelineView from './components/Views/TimelineView'
import ResourcesView from './components/Views/ResourcesView'
import TestPapersView from './components/Views/TestPapersView'
import PhysicalTrainingView from './components/Views/PhysicalTrainingView'
import DetailedTestPrepView from './components/Views/DetailedTestPrepView'
import ProgressView from './components/Views/ProgressView'
import AgeCalculatorView from './components/Views/AgeCalculatorView'
import AboutView from './components/Views/AboutView'
import { useAppStore } from './store/useAppStore'
import { useKeyboardNavigation, useFocusManagement } from './hooks/useKeyboardNavigation'

function App() {
  const { currentView, isFullscreenMode } = useAppStore()
  
  // Enable keyboard navigation and focus management
  useKeyboardNavigation()
  useFocusManagement()
  
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />
      case 'roadmap':
        return <RoadmapHomeView />
      case 'checklist':
        return <ChecklistView />
      case 'timeline':
        return <TimelineView />
      case 'resources':
        return <ResourcesView />
      case 'test-papers':
        return <TestPapersView />
      case 'physical-training':
        return <PhysicalTrainingView />
      case 'detailed-tests':
        return <DetailedTestPrepView />
      case 'progress':
        return <ProgressView />
      case 'age-calculator':
        return <AgeCalculatorView />
      case 'about':
        return <AboutView />
      default:
        return <HomeView />
    }
  }
  
  return (
    <div className="App">
      {/* Navigation */}
      <Navigation />
      
      {/* Status Bar */}
      <StatusBar />
      
      {/* Main Content */}
      <motion.main
        key={currentView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`main-content ${isFullscreenMode ? 'fullscreen-mode' : ''}`}
      >
        {renderView()}
      </motion.main>
      
      {/* Onboarding */}
      <Onboarding />
      
      {/* Performance Warning */}
      <PerformanceWarning />
    </div>
  )
}

// Performance warning component
function PerformanceWarning() {
  const { isLowPerformanceMode, toggleLowPerformanceMode } = useAppStore()
  
  // Check for low-end device indicators
  const isLowEndDevice = () => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) return true
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      // Check for integrated graphics or low-end GPUs
      return renderer.includes('Intel') || 
             renderer.includes('Integrated') || 
             renderer.includes('Mali') ||
             renderer.includes('Adreno 3')
    }
    
    return false
  }
  
  React.useEffect(() => {
    if (isLowEndDevice() && !isLowPerformanceMode) {
      // Show performance warning after a delay
      setTimeout(() => {
        const warning = document.createElement('div')
        warning.className = 'fixed bottom-4 right-4 glass-card p-4 max-w-sm z-40'
        warning.innerHTML = `
          <div class="text-white font-semibold mb-2">Performance Notice</div>
          <div class="text-gray-300 text-sm mb-3">
            We detected you might be using a low-end device. Consider enabling low performance mode for better experience.
          </div>
          <button class="w-full py-2 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors">
            Enable Low Performance Mode
          </button>
        `
        
        const button = warning.querySelector('button')
        button.onclick = () => {
          toggleLowPerformanceMode()
          document.body.removeChild(warning)
        }
        
        document.body.appendChild(warning)
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
          if (document.body.contains(warning)) {
            document.body.removeChild(warning)
          }
        }, 10000)
      }, 5000)
    }
  }, [isLowPerformanceMode, toggleLowPerformanceMode])
  
  return null
}

export default App