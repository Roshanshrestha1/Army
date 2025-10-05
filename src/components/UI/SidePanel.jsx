import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Circle, Clock, BookOpen, ExternalLink } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

function SidePanel() {
  const { selectedMilestone, setSelectedMilestone, toggleTask } = useAppStore()
  
  if (!selectedMilestone) return null
  
  const completedTasks = selectedMilestone.tasks.filter(task => task.completed).length
  const totalTasks = selectedMilestone.tasks.length
  const progress = Math.round((completedTasks / totalTasks) * 100)
  
  const handleTaskToggle = (taskId) => {
    toggleTask(selectedMilestone.id, taskId)
  }
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed right-0 top-20 bottom-0 w-96 glass-card z-30 overflow-hidden"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-xl">{selectedMilestone.name}</h2>
                <p className="text-gray-300 text-sm">{selectedMilestone.nepaliName}</p>
              </div>
              <button
                onClick={() => setSelectedMilestone(null)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close panel"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-300">Progress</span>
                <span className="text-white font-medium">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-army-500 to-navy-500 rounded-full"
                />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                {selectedMilestone.description}
              </p>
            </div>
            
            {/* Tasks */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <CheckCircle size={18} className="mr-2 text-army-400" />
                Tasks ({completedTasks}/{totalTasks})
              </h3>
              <div className="space-y-3">
                {selectedMilestone.tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <button
                      onClick={() => handleTaskToggle(task.id)}
                      className="mt-0.5 text-army-400 hover:text-army-300 transition-colors"
                      aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {task.completed ? (
                        <CheckCircle size={20} className="text-army-500" />
                      ) : (
                        <Circle size={20} />
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
            </div>
            
            {/* Timeline */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Clock size={18} className="mr-2 text-navy-400" />
                Timeline
              </h3>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-white font-medium">
                  {selectedMilestone.timeline.month < 10 ? '0' : ''}{selectedMilestone.timeline.month}/{selectedMilestone.timeline.year}
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  Target completion date
                </div>
              </div>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <BookOpen size={18} className="mr-2 text-accent-400" />
                Resources
              </h3>
              <div className="space-y-2">
                {selectedMilestone.resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{resource.title}</span>
                      <button className="text-accent-400 hover:text-accent-300 transition-colors">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SidePanel