import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Target, BookOpen } from 'lucide-react'

function AboutView() {
  return (
    <div className="h-screen w-full overflow-y-auto pt-20 pb-6">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-white text-4xl font-bold mb-4">About Gurkha Tracker</h1>
          <p className="text-gray-300 text-lg">Your companion on the journey to becoming a British Gurkha</p>
        </motion.div>
        
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-army-500 to-army-600 rounded-lg flex items-center justify-center">
              <Target size={24} className="text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold">Our Mission</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            Gurkha Tracker is designed to help young Nepali students prepare for the British Gurkha selection process. 
            We provide an interactive, engaging platform that makes the preparation journey clear, organized, and motivating.
          </p>
        </motion.div>
        
        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg flex items-center justify-center">
              <BookOpen size={24} className="text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold">Key Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">3D Interactive Map</h3>
                <p className="text-gray-300 text-sm">
                  Navigate your preparation journey through an immersive 3D environment with milestone markers.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-300 text-sm">
                  Monitor your advancement with detailed progress bars and completion statistics.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Resource Library</h3>
                <p className="text-gray-300 text-sm">
                  Access study materials, guides, and inspirational content organized by milestone.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Timeline View</h3>
                <p className="text-gray-300 text-sm">
                  Visualize your preparation schedule with an interactive timeline interface.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Data Export/Import</h3>
                <p className="text-gray-300 text-sm">
                  Save your progress and transfer it between devices using JSON export/import.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Mobile Responsive</h3>
                <p className="text-gray-300 text-sm">
                  Optimized for all devices with graceful fallbacks for mobile performance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Technology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="text-white text-2xl font-bold mb-6">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">React</span>
              </div>
              <p className="text-gray-400 text-sm">Frontend Framework</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">Three.js</span>
              </div>
              <p className="text-gray-400 text-sm">3D Graphics</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">Tailwind</span>
              </div>
              <p className="text-gray-400 text-sm">Styling</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">Vite</span>
              </div>
              <p className="text-gray-400 text-sm">Build Tool</p>
            </div>
          </div>
        </motion.div>
        
        {/* Community */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold">Community</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Join our community of aspiring Gurkha soldiers. Share your progress, ask questions, 
            and support each other on this challenging but rewarding journey.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors">
              Join Discord
            </button>
            <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              Follow on GitHub
            </button>
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart size={20} className="text-red-400" />
            <span className="text-gray-300">Made with love for the Gurkha community</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 Gurkha Tracker. Open source project for educational purposes.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutView