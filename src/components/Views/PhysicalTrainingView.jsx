import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Dumbbell, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Target,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Timer,
  TrendingUp,
  Users,
  Award
} from 'lucide-react'

function PhysicalTrainingView() {
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [completedExercises, setCompletedExercises] = useState(new Set())
  const [expandedSections, setExpandedSections] = useState({})

  const trainingPrograms = {
    beginner: {
      title: 'Beginner Program',
      nepaliTitle: 'सुरुवाती कार्यक्रम',
      description: 'Start your fitness journey with basic exercises',
      duration: '4 weeks',
      exercises: [
        {
          id: 'pushups',
          name: 'Push-ups',
          nepaliName: 'पुश-अप',
          description: 'Build upper body strength',
          sets: 3,
          reps: '5-10',
          rest: '60 seconds',
          technique: [
            'Start in plank position',
            'Lower chest to ground',
            'Push back up to starting position',
            'Keep body straight throughout'
          ],
          benefits: ['Chest strength', 'Arm strength', 'Core stability'],
          difficulty: 'Easy'
        },
        {
          id: 'situps',
          name: 'Sit-ups',
          nepaliName: 'सिट-अप',
          description: 'Strengthen your core muscles',
          sets: 3,
          reps: '10-15',
          rest: '45 seconds',
          technique: [
            'Lie on back with knees bent',
            'Place hands behind head',
            'Lift upper body towards knees',
            'Lower back down slowly'
          ],
          benefits: ['Core strength', 'Abdominal muscles', 'Stability'],
          difficulty: 'Easy'
        },
        {
          id: 'squats',
          name: 'Squats',
          nepaliName: 'स्क्वाट',
          description: 'Build leg and glute strength',
          sets: 3,
          reps: '10-15',
          rest: '60 seconds',
          technique: [
            'Stand with feet shoulder-width apart',
            'Lower body as if sitting in chair',
            'Keep knees behind toes',
            'Return to standing position'
          ],
          benefits: ['Leg strength', 'Glute strength', 'Balance'],
          difficulty: 'Easy'
        }
      ]
    },
    intermediate: {
      title: 'Intermediate Program',
      nepaliName: 'मध्यम कार्यक्रम',
      description: 'Progress to more challenging exercises',
      duration: '6 weeks',
      exercises: [
        {
          id: 'pullups',
          name: 'Pull-ups',
          nepaliName: 'पुल-अप',
          description: 'Advanced upper body strength',
          sets: 3,
          reps: '3-8',
          rest: '90 seconds',
          technique: [
            'Hang from bar with overhand grip',
            'Pull body up until chin over bar',
            'Lower body with control',
            'Keep core engaged'
          ],
          benefits: ['Back strength', 'Arm strength', 'Grip strength'],
          difficulty: 'Hard'
        },
        {
          id: 'burpees',
          name: 'Burpees',
          nepaliName: 'बर्पी',
          description: 'Full body cardio exercise',
          sets: 3,
          reps: '5-10',
          rest: '60 seconds',
          technique: [
            'Start standing',
            'Drop to push-up position',
            'Do one push-up',
            'Jump feet to hands',
            'Jump up with arms overhead'
          ],
          benefits: ['Cardio fitness', 'Full body strength', 'Endurance'],
          difficulty: 'Hard'
        },
        {
          id: 'plank',
          name: 'Plank',
          nepaliName: 'प्ल्याङ्क',
          description: 'Core stability and strength',
          sets: 3,
          reps: '30-60 seconds',
          rest: '45 seconds',
          technique: [
            'Start in push-up position',
            'Lower to forearms',
            'Keep body straight',
            'Engage core muscles'
          ],
          benefits: ['Core strength', 'Stability', 'Posture'],
          difficulty: 'Medium'
        }
      ]
    },
    advanced: {
      title: 'Advanced Program',
      nepaliName: 'उन्नत कार्यक्रम',
      description: 'Elite level training for selection',
      duration: '8 weeks',
      exercises: [
        {
          id: 'military-pushups',
          name: 'Military Push-ups',
          nepaliName: 'सैन्य पुश-अप',
          description: 'Strict form push-ups for selection',
          sets: 5,
          reps: '20-30',
          rest: '60 seconds',
          technique: [
            'Perfect plank position',
            'Hands slightly wider than shoulders',
            'Full range of motion',
            'No rest at top or bottom'
          ],
          benefits: ['Selection standard', 'Perfect form', 'Endurance'],
          difficulty: 'Hard'
        },
        {
          id: 'running',
          name: 'Running',
          nepaliName: 'दौड',
          description: 'Build running endurance and speed',
          sets: 1,
          reps: '5-10km',
          rest: 'None',
          technique: [
            'Maintain steady pace',
            'Good running form',
            'Breathe rhythmically',
            'Land on forefoot'
          ],
          benefits: ['Cardio fitness', 'Endurance', 'Speed'],
          difficulty: 'Hard'
        },
        {
          id: 'swimming',
          name: 'Swimming',
          nepaliName: 'पौडी',
          description: 'Water confidence and fitness',
          sets: 1,
          reps: '50-100m',
          rest: 'None',
          technique: [
            'Efficient stroke technique',
            'Rhythmic breathing',
            'Consistent pace',
            'Good form throughout'
          ],
          benefits: ['Water confidence', 'Full body fitness', 'Endurance'],
          difficulty: 'Medium'
        }
      ]
    }
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const startExercise = (exercise) => {
    setSelectedExercise(exercise)
    setTimeRemaining(exercise.rest ? parseInt(exercise.rest) * 1000 : 0)
  }

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimeRemaining(selectedExercise?.rest ? parseInt(selectedExercise.rest) * 1000 : 0)
  }

  const markCompleted = (exerciseId) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]))
  }

  React.useEffect(() => {
    let interval = null
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1000)
      }, 1000)
    } else if (timeRemaining === 0) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeRemaining])

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000)
    return `${seconds}s`
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
          <h1 className="text-white text-3xl font-bold mb-2">Physical Training</h1>
          <p className="text-gray-300">Build the strength and endurance needed for Gurkha selection</p>
          <p className="text-gray-400 text-sm">शारीरिक प्रशिक्षण - गोर्खा छनोटका लागि आवश्यक शक्ति र सहनशीलता निर्माण गर्नुहोस्</p>
        </motion.div>

        {/* Training Programs */}
        <div className="space-y-6">
          {Object.entries(trainingPrograms).map(([level, program], index) => (
            <motion.div
              key={level}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6"
            >
              {/* Program Header */}
              <div 
                className="flex items-center justify-between cursor-pointer mb-4"
                onClick={() => toggleSection(level)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-navy-500 to-army-500">
                    <Dumbbell size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold">{program.title}</h3>
                    <p className="text-gray-300 text-sm">{program.nepaliName}</p>
                    <p className="text-gray-400 text-sm">{program.description} • {program.duration}</p>
                  </div>
                </div>
                {expandedSections[level] ? 
                  <ChevronDown size={20} className="text-gray-400" /> : 
                  <ChevronRight size={20} className="text-gray-400" />
                }
              </div>

              {/* Program Content */}
              <AnimatePresence>
                {expandedSections[level] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {program.exercises.map((exercise, exerciseIndex) => (
                      <motion.div
                        key={exercise.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: exerciseIndex * 0.1 }}
                        className="bg-gray-800/50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-white font-semibold">{exercise.name}</h4>
                              <span className="text-gray-300 text-sm">({exercise.nepaliName})</span>
                              {completedExercises.has(exercise.id) && (
                                <CheckCircle size={16} className="text-green-400" />
                              )}
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{exercise.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span>{exercise.sets} sets</span>
                              <span>{exercise.reps} reps</span>
                              <span>{exercise.rest} rest</span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                exercise.difficulty === 'Easy' ? 'bg-green-600/30 text-green-400' :
                                exercise.difficulty === 'Medium' ? 'bg-yellow-600/30 text-yellow-400' :
                                'bg-red-600/30 text-red-400'
                              }`}>
                                {exercise.difficulty}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startExercise(exercise)}
                              className="px-3 py-1 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors flex items-center space-x-1"
                            >
                              <Play size={14} />
                              <span>Start</span>
                            </button>
                            <button
                              onClick={() => markCompleted(exercise.id)}
                              className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors flex items-center space-x-1"
                            >
                              <CheckCircle size={14} />
                              <span>Done</span>
                            </button>
                          </div>
                        </div>

                        {/* Exercise Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="text-gray-300 font-medium mb-1">Technique:</h5>
                            <ul className="space-y-1">
                              {exercise.technique.map((step, stepIndex) => (
                                <li key={stepIndex} className="text-gray-400 flex items-start space-x-2">
                                  <span className="text-navy-400 mt-1">•</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-gray-300 font-medium mb-1">Benefits:</h5>
                            <div className="flex flex-wrap gap-1">
                              {exercise.benefits.map((benefit, benefitIndex) => (
                                <span
                                  key={benefitIndex}
                                  className="px-2 py-1 bg-navy-600/30 text-navy-300 text-xs rounded"
                                >
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Exercise Timer Modal */}
        <AnimatePresence>
          {selectedExercise && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedExercise(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-white text-xl font-semibold mb-4">{selectedExercise.name}</h3>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-navy-400 mb-2">
                    {formatTime(timeRemaining)}
                  </div>
                  <p className="text-gray-300">Rest Time</p>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    onClick={toggleTimer}
                    className="px-4 py-2 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
                  </button>
                  <button
                    onClick={resetTimer}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <RotateCcw size={16} />
                    <span>Reset</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 glass-card p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-4">Training Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{completedExercises.size}</div>
              <div className="text-gray-300 text-sm">Exercises Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">0</div>
              <div className="text-gray-300 text-sm">Workouts This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy-400">0</div>
              <div className="text-gray-300 text-sm">Total Hours</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PhysicalTrainingView