import React from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp, Calendar, Award } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

function ProgressView() {
  const { milestones, getProgress } = useAppStore()
  
  const overallProgress = getProgress()
  const completedMilestones = milestones.filter(m => m.status === 'completed').length
  const totalMilestones = milestones.length
  
  const getMilestoneProgress = (milestone) => {
    const completed = milestone.tasks.filter(task => task.completed).length
    const total = milestone.tasks.length
    return Math.round((completed / total) * 100)
  }
  
  const getNextMilestone = () => {
    return milestones.find(m => m.status === 'pending') || milestones[0]
  }
  
  const getDaysUntilNext = () => {
    const nextMilestone = getNextMilestone()
    const targetDate = new Date(nextMilestone.timeline.year, nextMilestone.timeline.month - 1, 1)
    const today = new Date()
    const diffTime = targetDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
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
          <h1 className="text-white text-3xl font-bold mb-2">Progress Dashboard</h1>
          <p className="text-gray-300">Track your journey to becoming a British Gurkha</p>
        </motion.div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-army-500 to-army-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{overallProgress}%</div>
            <div className="text-gray-400 text-sm">Overall Progress</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{completedMilestones}/{totalMilestones}</div>
            <div className="text-gray-400 text-sm">Milestones Completed</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {milestones.reduce((acc, m) => acc + m.tasks.filter(t => t.completed).length, 0)}
            </div>
            <div className="text-gray-400 text-sm">Tasks Completed</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{getDaysUntilNext()}</div>
            <div className="text-gray-400 text-sm">Days Until Next</div>
          </motion.div>
        </div>
        
        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6 mb-8"
        >
          <h3 className="text-white font-semibold text-lg mb-6">Milestone Progress</h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => {
              const progress = getMilestoneProgress(milestone)
              
              return (
                <div key={milestone.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        milestone.status === 'completed' ? 'bg-army-500' :
                        milestone.status === 'in-progress' ? 'bg-accent-500' : 'bg-gray-600'
                      }`}></div>
                      <span className="text-white font-medium">{milestone.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{progress}%</span>
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
              )
            })}
          </div>
        </motion.div>
        
        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Task Breakdown</h3>
            <div className="space-y-3">
              {milestones.map((milestone) => {
                const completed = milestone.tasks.filter(t => t.completed).length
                const total = milestone.tasks.length
                
                return (
                  <div key={milestone.id} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{milestone.name}</span>
                    <span className="text-white font-medium">{completed}/{total}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
          
          {/* Timeline Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="glass-card p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Timeline Overview</h3>
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">{milestone.name}</span>
                  <span className="text-white font-medium">
                    {milestone.timeline.month < 10 ? '0' : ''}{milestone.timeline.month}/{milestone.timeline.year}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 glass-card p-6 text-center"
        >
          <h3 className="text-white font-semibold text-lg mb-2">Keep Going!</h3>
          <p className="text-gray-300">
            {overallProgress < 25 && "Every journey begins with a single step. You're on the right path!"}
            {overallProgress >= 25 && overallProgress < 50 && "Great progress! You're building momentum."}
            {overallProgress >= 50 && overallProgress < 75 && "You're halfway there! Keep pushing forward."}
            {overallProgress >= 75 && overallProgress < 100 && "Almost there! The finish line is in sight."}
            {overallProgress === 100 && "Congratulations! You've completed your preparation journey!"}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressView