import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, X, MapPin, CheckSquare, Calendar } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

function Onboarding() {
  const { showOnboarding, dismissOnboarding } = useAppStore()
  const [currentStep, setCurrentStep] = useState(0)
  
  const steps = [
    {
      title: 'Welcome to Gurkha Tracker',
      nepaliTitle: 'गोर्खा ट्र्याकरमा स्वागत छ',
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-lg">
            This interactive 3D map will guide you through your journey to becoming a British Gurkha.
          </p>
          <p className="text-gray-400">
            Each marker represents a key milestone in your preparation process.
          </p>
        </div>
      )
    },
    {
      title: 'Interactive 3D Map',
      nepaliTitle: 'इन्टरएक्टिभ ३डी नक्शा',
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-lg">
            Navigate the 3D environment to explore different milestones.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>• Click markers to view details</li>
            <li>• Use mouse to rotate and zoom</li>
            <li>• Pan to explore the terrain</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Track Your Progress',
      nepaliTitle: 'आफ्नो प्रगति ट्र्याक गर्नुहोस्',
      icon: CheckSquare,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-lg">
            Use the checklist system to track your tasks and progress.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>• Check off completed tasks</li>
            <li>• View progress percentages</li>
            <li>• Export your data</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Timeline & Resources',
      nepaliTitle: 'समयरेखा र स्रोतहरू',
      icon: Calendar,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-lg">
            Access study materials and view your preparation timeline.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>• Browse resources by category</li>
            <li>• View timeline milestones</li>
            <li>• Download study materials</li>
          </ul>
        </div>
      )
    }
  ]
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      dismissOnboarding()
    }
  }
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  if (!showOnboarding) return null
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card p-8 max-w-2xl w-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-navy-500 to-army-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Getting Started</h2>
                <p className="text-gray-400 text-sm">Step {currentStep + 1} of {steps.length}</p>
              </div>
            </div>
            <button
              onClick={dismissOnboarding}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Skip onboarding"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Content */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-army-500 to-army-600 rounded-lg flex items-center justify-center">
                {React.createElement(steps[currentStep].icon, { size: 24, className: 'text-white' })}
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold">{steps[currentStep].title}</h3>
                <p className="text-gray-400">{steps[currentStep].nepaliTitle}</p>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps[currentStep].content}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-army-500 to-navy-500 rounded-full"
              />
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>
            
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-navy-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 px-6 py-2 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors"
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Onboarding