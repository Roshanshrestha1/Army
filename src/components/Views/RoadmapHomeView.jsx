import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, 
  ChevronDown, 
  Dumbbell, 
  BookOpen, 
  FileText, 
  Target,
  CheckCircle,
  Clock,
  Users,
  Trophy,
  MapPin,
  Play
} from 'lucide-react'

function RoadmapHomeView() {
  const [expandedSections, setExpandedSections] = useState({})
  const [selectedPhase, setSelectedPhase] = useState(null)

  const roadmapData = {
    phases: [
      {
        id: 'preparation',
        title: 'Phase 1: Preparation',
        nepaliTitle: 'चरण 1: तयारी',
        description: 'Build your foundation for Gurkha selection',
        color: 'from-blue-500 to-blue-600',
        icon: BookOpen,
        status: 'current',
        subPhases: [
          {
            id: 'education',
            title: 'Education & Study',
            nepaliTitle: 'शिक्षा र अध्ययन',
            description: 'Complete your education and study materials',
            tasks: [
              'Complete SEE (Secondary Education Examination)',
              'Study mathematics and English',
              'Practice test papers',
              'Improve general knowledge'
            ],
            resources: ['Test Papers', 'Study Guides', 'Practice Tests']
          },
          {
            id: 'physical-training',
            title: 'Physical Training',
            nepaliTitle: 'शारीरिक प्रशिक्षण',
            description: 'Build physical fitness and endurance',
            tasks: [
              'Daily running (5-10km)',
              'Push-ups and pull-ups',
              'Sit-ups and planks',
              'Swimming and cycling'
            ],
            resources: ['Fitness Guides', 'Training Videos', 'Exercise Plans']
          }
        ]
      },
      {
        id: 'application',
        title: 'Phase 2: Application',
        nepaliTitle: 'चरण 2: आवेदन',
        description: 'Submit your application and initial screening',
        color: 'from-green-500 to-green-600',
        icon: FileText,
        status: 'upcoming',
        subPhases: [
          {
            id: 'documentation',
            title: 'Documentation',
            nepaliTitle: 'कागजातहरू',
            description: 'Prepare all required documents',
            tasks: [
              'Birth certificate',
              'Educational certificates',
              'Medical certificates',
              'Character references'
            ],
            resources: ['Application Guide', 'Document Checklist']
          },
          {
            id: 'initial-screening',
            title: 'Initial Screening',
            nepaliTitle: 'प्रारम्भिक छनोट',
            description: 'Pass initial eligibility screening',
            tasks: [
              'Age verification (17.5-21 years)',
              'Height requirement (158cm minimum)',
              'Education verification',
              'Medical pre-screening'
            ],
            resources: ['Eligibility Guide', 'Medical Requirements']
          }
        ]
      },
      {
        id: 'selection',
        title: 'Phase 3: Selection Process',
        nepaliTitle: 'चरण 3: छनोट प्रक्रिया',
        description: 'Complete the rigorous selection process',
        color: 'from-purple-500 to-purple-600',
        icon: Target,
        status: 'upcoming',
        subPhases: [
          {
            id: 'physical-tests',
            title: 'Physical Tests',
            nepaliTitle: 'शारीरिक परीक्षाहरू',
            description: 'Pass all physical fitness tests',
            tasks: [
              '1.5 mile run (under 10 minutes)',
              'Push-ups (minimum 44 in 2 minutes)',
              'Sit-ups (minimum 50 in 2 minutes)',
              'Pull-ups (minimum 6)',
              'Swimming test (50m)'
            ],
            resources: ['Physical Test Guide', 'Training Plans', 'Test Videos']
          },
          {
            id: 'written-tests',
            title: 'Written Tests',
            nepaliTitle: 'लिखित परीक्षाहरू',
            description: 'Pass mathematics and English tests',
            tasks: [
              'Mathematics test (basic arithmetic)',
              'English language test',
              'General knowledge test',
              'Logical reasoning test'
            ],
            resources: ['Test Papers', 'Study Materials', 'Practice Tests']
          },
          {
            id: 'interviews',
            title: 'Interviews',
            nepaliTitle: 'अन्तर्वार्ताहरू',
            description: 'Pass medical and interview stages',
            tasks: [
              'Medical examination',
              'Psychological assessment',
              'Interview with officers',
              'Final selection board'
            ],
            resources: ['Interview Guide', 'Medical Requirements']
          }
        ]
      },
      {
        id: 'training',
        title: 'Phase 4: Basic Training',
        nepaliTitle: 'चरण 4: आधारभूत प्रशिक्षण',
        description: 'Complete basic military training',
        color: 'from-red-500 to-red-600',
        icon: Trophy,
        status: 'upcoming',
        subPhases: [
          {
            id: 'basic-training',
            title: 'Basic Military Training',
            nepaliTitle: 'आधारभूत सैन्य प्रशिक्षण',
            description: 'Complete 26 weeks of basic training',
            tasks: [
              'Weapons training',
              'Field craft and tactics',
              'Physical fitness',
              'Military discipline',
              'Team building'
            ],
            resources: ['Training Guide', 'Military Manuals']
          },
          {
            id: 'specialist-training',
            title: 'Specialist Training',
            nepaliTitle: 'विशेषज्ञ प्रशिक्षण',
            description: 'Complete specialist role training',
            tasks: [
              'Infantry training',
              'Combat skills',
              'Equipment training',
              'Leadership development'
            ],
            resources: ['Specialist Guides', 'Equipment Manuals']
          }
        ]
      }
    ]
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'current': return 'text-blue-400'
      case 'upcoming': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />
      case 'current': return <Clock size={16} />
      case 'upcoming': return <Clock size={16} />
      default: return <Clock size={16} />
    }
  }

  return (
    <div className="h-screen w-full overflow-y-auto pt-20 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-white text-4xl font-bold mb-4">Gurkha Preparation Roadmap</h1>
          <p className="text-gray-300 text-lg">Your complete journey to becoming a British Gurkha</p>
          <p className="text-gray-400 text-sm mt-2">गोर्खा तयारी सडक नक्शा - ब्रिटिश गोर्खा बन्ने तपाईंको पूर्ण यात्रा</p>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="space-y-6">
          {roadmapData.phases.map((phase, phaseIndex) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: phaseIndex * 0.1 }}
              className="glass-card p-6"
            >
              {/* Phase Header */}
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection(phase.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${phase.color}`}>
                    <phase.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold">{phase.title}</h3>
                    <p className="text-gray-300 text-sm">{phase.nepaliTitle}</p>
                    <p className="text-gray-400 text-sm mt-1">{phase.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-1 ${getStatusColor(phase.status)}`}>
                    {getStatusIcon(phase.status)}
                    <span className="text-sm capitalize">{phase.status}</span>
                  </div>
                  {expandedSections[phase.id] ? 
                    <ChevronDown size={20} className="text-gray-400" /> : 
                    <ChevronRight size={20} className="text-gray-400" />
                  }
                </div>
              </div>

              {/* Phase Content */}
              <AnimatePresence>
                {expandedSections[phase.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 space-y-4"
                  >
                    {phase.subPhases.map((subPhase, subIndex) => (
                      <motion.div
                        key={subPhase.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: subIndex * 0.1 }}
                        className="bg-gray-800/50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-white font-semibold">{subPhase.title}</h4>
                            <p className="text-gray-300 text-sm">{subPhase.nepaliTitle}</p>
                            <p className="text-gray-400 text-sm mt-1">{subPhase.description}</p>
                          </div>
                          <button
                            onClick={() => setSelectedPhase(subPhase)}
                            className="px-3 py-1 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors flex items-center space-x-1"
                          >
                            <Play size={14} />
                            <span>Start</span>
                          </button>
                        </div>

                        {/* Tasks */}
                        <div className="mb-3">
                          <h5 className="text-gray-300 font-medium text-sm mb-2">Tasks:</h5>
                          <ul className="space-y-1">
                            {subPhase.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="text-gray-400 text-sm flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-navy-400 rounded-full"></div>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Resources */}
                        <div>
                          <h5 className="text-gray-300 font-medium text-sm mb-2">Resources:</h5>
                          <div className="flex flex-wrap gap-2">
                            {subPhase.resources.map((resource, resourceIndex) => (
                              <span
                                key={resourceIndex}
                                className="px-2 py-1 bg-navy-600/30 text-navy-300 text-xs rounded"
                              >
                                {resource}
                              </span>
                            ))}
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

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 glass-card p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">1</div>
              <div className="text-gray-300 text-sm">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">1</div>
              <div className="text-gray-300 text-sm">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">2</div>
              <div className="text-gray-300 text-sm">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy-400">25%</div>
              <div className="text-gray-300 text-sm">Overall Progress</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 glass-card p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-navy-600/30 hover:bg-navy-600/50 rounded-lg transition-colors text-left">
              <Dumbbell size={24} className="text-navy-400 mb-2" />
              <div className="text-white font-medium">Start Physical Training</div>
              <div className="text-gray-400 text-sm">Begin your fitness journey</div>
            </button>
            <button className="p-4 bg-navy-600/30 hover:bg-navy-600/50 rounded-lg transition-colors text-left">
              <BookOpen size={24} className="text-navy-400 mb-2" />
              <div className="text-white font-medium">Study Materials</div>
              <div className="text-gray-400 text-sm">Access test papers and guides</div>
            </button>
            <button className="p-4 bg-navy-600/30 hover:bg-navy-600/50 rounded-lg transition-colors text-left">
              <Target size={24} className="text-navy-400 mb-2" />
              <div className="text-white font-medium">Track Progress</div>
              <div className="text-gray-400 text-sm">Monitor your preparation</div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RoadmapHomeView