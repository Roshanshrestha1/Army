import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Target, CheckCircle, Clock } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

function TimelineView() {
  const { milestones, setSelectedMilestone } = useAppStore()
  const [selectedYear, setSelectedYear] = useState(2024)
  
  const years = [2024, 2025, 2026]
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  
  const getMilestoneAtDate = (month, year) => {
    return milestones.find(m => m.timeline.month === month + 1 && m.timeline.year === year)
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-army-500'
      case 'in-progress': return 'bg-accent-500'
      default: return 'bg-gray-600'
    }
  }
  
  return (
    <div className="h-screen w-full overflow-y-auto pt-20 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-white text-3xl font-bold mb-2">Preparation Timeline</h1>
          <p className="text-gray-300">Visualize your journey through time</p>
        </motion.div>
        
        {/* Year Selector */}
        <div className="mb-8">
          <div className="flex space-x-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedYear === year
                    ? 'bg-navy-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        
        {/* Timeline */}
        <div className="glass-card p-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
            
            {/* Months */}
            <div className="space-y-8">
              {months.map((month, monthIndex) => {
                const milestone = getMilestoneAtDate(monthIndex, selectedYear)
                
                return (
                  <motion.div
                    key={monthIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: monthIndex * 0.05 }}
                    className="relative flex items-center"
                  >
                    {/* Month Marker */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-600">
                        <span className="text-white font-semibold text-sm">{month}</span>
                      </div>
                      
                      {/* Milestone */}
                      {milestone ? (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 glass-card p-4 cursor-pointer hover:bg-white/15 transition-all duration-300"
                          onClick={() => setSelectedMilestone(milestone.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(milestone.status)}`}></div>
                            <div>
                              <h3 className="text-white font-semibold">{milestone.name}</h3>
                              <p className="text-gray-400 text-sm">{milestone.nepaliName}</p>
                            </div>
                            <div className="ml-auto">
                              {milestone.status === 'completed' && <CheckCircle size={20} className="text-army-500" />}
                              {milestone.status === 'in-progress' && <Clock size={20} className="text-accent-500" />}
                              {milestone.status === 'pending' && <Target size={20} className="text-gray-500" />}
                            </div>
                          </div>
                          
                          {/* Progress */}
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-white">
                                {Math.round((milestone.tasks.filter(t => t.completed).length / milestone.tasks.length) * 100)}%
                              </span>
                            </div>
                            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-army-500 to-navy-500 rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${(milestone.tasks.filter(t => t.completed).length / milestone.tasks.length) * 100}%` 
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex-1 p-4">
                          <div className="text-gray-500 text-sm">No milestone scheduled</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 glass-card p-6"
        >
          <h3 className="text-white font-semibold mb-4">Status Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <span className="text-gray-300">Pending</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-accent-500"></div>
              <span className="text-gray-300">In Progress</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-army-500"></div>
              <span className="text-gray-300">Completed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TimelineView