import React from 'react'
import { motion } from 'framer-motion'
import AgeCalculator from '../UI/AgeCalculator'

function AgeCalculatorView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-army-900 via-navy-900 to-army-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Age Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Convert between Bikram Sambat (BS) and Gregorian (AD) calendars and check your Gurkha eligibility status
          </p>
        </motion.div>

        {/* Age Calculator Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AgeCalculator />
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* BS Calendar Info */}
          <div className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-army-500 to-army-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">BS</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-3">Bikram Sambat</h3>
            <p className="text-gray-300 text-sm">
              The official calendar of Nepal. Used for official documents and traditional celebrations.
            </p>
          </div>

          {/* AD Calendar Info */}
          <div className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-navy-500 to-navy-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">AD</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-3">Gregorian Calendar</h3>
            <p className="text-gray-300 text-sm">
              The international standard calendar. Used worldwide for business and international communication.
            </p>
          </div>

          {/* Gurkha Eligibility Info */}
          <div className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">18+</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-3">Gurkha Eligibility</h3>
            <p className="text-gray-300 text-sm">
              You must be at least 18 years old to be eligible for Gurkha selection. Start your preparation early!
            </p>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 glass-card p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">💡 Tips for Using the Age Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-army-400 font-semibold mb-3">For BS Dates:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Use format: YYYY-MM-DD (e.g., 2067-07-27)</li>
                <li>• BS year 2080 = AD year 2023</li>
                <li>• BS months are similar to AD months</li>
                <li>• Check your citizenship certificate for exact BS date</li>
              </ul>
            </div>
            <div>
              <h3 className="text-navy-400 font-semibold mb-3">For AD Dates:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Use format: YYYY-MM-DD (e.g., 2010-11-13)</li>
                <li>• AD year 2023 = BS year 2080</li>
                <li>• Check your birth certificate for exact AD date</li>
                <li>• Use this for international documents</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">🇳🇵 Ready to Start Your Gurkha Journey?</h2>
            <p className="text-gray-300 text-lg mb-6">
              Whether you're 13 or 17, it's never too early to start preparing. Use this calculator to track your progress and stay motivated on your path to becoming a Gurkha warrior.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-army-500 to-navy-500 text-white font-semibold rounded-xl hover:from-army-600 hover:to-navy-600 transition-all duration-200"
              >
                Start Training Plan
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200"
              >
                View Resources
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AgeCalculatorView