import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, Target, Calendar } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

function ChecklistView() {
  const { milestones, toggleTask, setSelectedMilestone } = useAppStore()
  
  const getMilestoneProgress = (milestone) => {
    const completed = milestone.tasks.filter(task => task.completed).length
    const total = milestone.tasks.length
    return Math.round((completed / total) * 100)
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-army-500'
      case 'in-progress': return 'text-accent-500'
      default: return 'text-gray-500'
    }
  }
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={20} className="text-army-500" />
      case 'in-progress': return <Target size={20} className="text-accent-500" />
      default: return <Circle size={20} className="text-gray-500" />
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
          <h1 className="text-white text-3xl font-bold mb-2">Preparation Checklist</h1>
          <p className="text-gray-300">Track your progress through each milestone</p>
        </motion.div>
        
        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {milestones.map((milestone, index) => {
            const progress = getMilestoneProgress(milestone)
            
            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-white/15 transition-all duration-300"
              >
                {/* Milestone Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(milestone.status)}
                    <div>
                      <h3 className="text-white font-semibold text-lg">{milestone.name}</h3>
                      <p className="text-gray-400 text-sm">{milestone.nepaliName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMilestone(milestone.id)}
                    className="text-navy-400 hover:text-navy-300 transition-colors"
                    aria-label={`View details for ${milestone.name}`}
                  >
                    <Calendar size={18} />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-white font-medium">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-army-500 to-navy-500 rounded-full"
                    />
                  </div>
                </div>
                
                {/* Tasks */}
                <div className="space-y-3">
                  {milestone.tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <button
                        onClick={() => toggleTask(milestone.id, task.id)}
                        className="text-army-400 hover:text-army-300 transition-colors"
                        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {task.completed ? (
                          <CheckCircle size={18} className="text-army-500" />
                        ) : (
                          <Circle size={18} />
                        )}
                      </button>
                      <span className={`text-sm flex-1 ${
                        task.completed ? 'text-gray-400 line-through' : 'text-white'
                      }`}>
                        {task.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Timeline */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Target Date:</span>
                    <span className="text-white font-medium">
                      {milestone.timeline.month < 10 ? '0' : ''}{milestone.timeline.month}/{milestone.timeline.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 glass-card p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-4">Overall Progress Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-army-400">
                {milestones.reduce((acc, m) => acc + m.tasks.filter(t => t.completed).length, 0)}
              </div>
              <div className="text-gray-400 text-sm">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy-400">
                {milestones.reduce((acc, m) => acc + m.tasks.length, 0)}
              </div>
              <div className="text-gray-400 text-sm">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-400">
                {Math.round((milestones.reduce((acc, m) => acc + m.tasks.filter(t => t.completed).length, 0) / 
                  milestones.reduce((acc, m) => acc + m.tasks.length, 0)) * 100)}%
              </div>
              <div className="text-gray-400 text-sm">Overall Progress</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ChecklistView