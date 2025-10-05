import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Target, 
  Dumbbell, 
  BookOpen, 
  Stethoscope,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Users,
  Award,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

function DetailedTestPrepView() {
  const [selectedTest, setSelectedTest] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const [activeTrainingWeek, setActiveTrainingWeek] = useState(1)

  const testCategories = {
    physical: {
      title: 'Physical Tests',
      nepaliTitle: 'शारीरिक परीक्षाहरू',
      icon: Dumbbell,
      color: 'from-red-500 to-red-600',
      tests: [
        {
          id: '2km-run',
          name: '2km Run',
          nepaliName: '२ किमी दौड',
          description: 'Aerobic fitness and speed under pressure',
          target: 'Under 8 minutes 15 seconds',
          icon: '🏃',
          details: {
            whatItMeasures: 'Aerobic fitness and speed under pressure (how fast you can run 2 km)',
            target: 'Under 8 minutes 15 seconds (Phase 3 target widely cited)',
            trainingPlan: {
              weeks1to4: {
                title: 'Weeks 1-4 (Base Building)',
                activities: [
                  '3 runs per week',
                  'One long easy run (20-35 min)',
                  'One interval session (6 × 400m @ 80-90% effort with 2 min rests)',
                  'One easy recovery run (20-30 min)'
                ]
              },
              weeks5to8: {
                title: 'Weeks 5-8 (Speed Build)',
                activities: [
                  'Interval session becomes 8 × 400m or 6 × 800m',
                  'Add one tempo run (15-20 min at comfortably hard pace)',
                  'Continue long easy runs'
                ]
              },
              weeks9to12: {
                title: 'Weeks 9-12 (Race Sharpening)',
                activities: [
                  '2 × 1.6km time-trials (one hard, one moderate)',
                  'Practice 2km time-trial every 10 days',
                  'Shorter speed sets (10 × 200m) for finishing speed'
                ]
              }
            },
            testDayTips: [
              'Full warm-up: 10-15 min (jog + dynamic stretches + 2-3 short sprints)',
              'Start controlled (don\'t sprint first 200m)',
              'Keep consistent splits',
              'Leave energy for last 400m'
            ],
            commonMistakes: [
              'Starting too fast and fading',
              'Skipping interval training',
              'Not warming up properly',
              'Poor pacing strategy'
            ]
          }
        },
        {
          id: 'jerrycan-carry',
          name: 'Jerrycan Carry',
          nepaliName: 'जेरीक्यान बोक्ने',
          description: 'Upper-body strength & power + speed',
          target: 'Complete set under ~2 minutes',
          icon: '🪣',
          details: {
            whatItMeasures: 'Ability to carry two heavy cans quickly (tests upper-body/back endurance and power)',
            target: 'Complete the set under ~2 minutes (final selection guidance)',
            trainingPlan: {
              strength: {
                title: 'Strength Training',
                activities: [
                  'Practice farmer carries (2 × 20kg) for 100-300m',
                  'Build to multiple repetitions',
                  '4 × 200m carries with 90-120 sec rest',
                  'Progress distance or weight slowly'
                ]
              },
              support: {
                title: 'Supporting Exercises',
                activities: [
                  'Deadlifts for posterior chain strength',
                  'Bent-over rows for back strength',
                  'Farmer-walk holds for grip endurance',
                  'Core planks for stability'
                ]
              }
            },
            testDayTips: [
              'Use tight grip on handles',
              'Take short quick steps',
              'Keep chest up and neutral spine',
              'Maintain steady pace throughout'
            ],
            commonMistakes: [
              'Weak grip causing drops',
              'Poor posture (rounding back)',
              'Lack of pacing strategy',
              'Insufficient grip training'
            ]
          }
        },
        {
          id: 'doko-run',
          name: 'Doko Run',
          nepaliName: 'डोको दौड',
          description: 'Endurance, leg strength, balance with heavy load uphill',
          target: 'Carry ~25kg over 4-6km under ~43 minutes',
          icon: '🎒',
          details: {
            whatItMeasures: 'Endurance, leg strength, balance with a heavy load uphill (realistic battlefield-style test)',
            target: 'Carry ~25kg in a doko over hilly course (~4-6km) and finish under ~43 minutes',
            trainingPlan: {
              base: {
                title: 'Base Building',
                activities: [
                  'Long walks with light pack (5-10kg)',
                  '1-2 times per week gradually increasing distance to 8-12km',
                  'Focus on consistent pace and good posture'
                ]
              },
              power: {
                title: 'Power Development',
                activities: [
                  'Hill repeats: 8-12 × 60-120m uphill sprints',
                  'Uphill sprinting for leg power',
                  'Single-leg balance exercises'
                ]
              },
              progression: {
                title: 'Weight Progression',
                activities: [
                  'Every 7-10 days add weight: 10kg → 15kg → 20kg → 25kg',
                  'Include uphill routes in training',
                  'Practice with real doko 2-4 weeks before selection'
                ]
              }
            },
            testDayTips: [
              'Short quick steps on uphills',
              'Use poles of doko to stabilize',
              'Control breathing rhythm',
              'Keep pace steady - finish strong'
            ],
            commonMistakes: [
              'Increasing weight too quickly',
              'Not practicing on hills or steps',
              'Poor footwear choice',
              'Inadequate core training'
            ]
          }
        },
        {
          id: 'mid-thigh-pull',
          name: 'Mid-Thigh Pull',
          nepaliName: 'मध्य-जाँघ तान्ने',
          description: 'Explosive maximal strength test',
          target: '76kg minimum',
          icon: '💪',
          details: {
            whatItMeasures: 'Maximal pulling strength (lower-body/back)',
            target: '76kg minimum (British Army standard for recruits)',
            trainingPlan: {
              strength: {
                title: 'Strength Program',
                activities: [
                  'Deadlift variations (conventional, sumo)',
                  'Romanian deadlifts for hamstring strength',
                  'Trap-bar deadlifts for safer loading',
                  'Heavy sled pulls for functional strength'
                ]
              },
              technique: {
                title: 'Technique Focus',
                activities: [
                  'Low reps heavy sets: 3-5 sets × 3-5 reps',
                  'Work with coach/supervision for form',
                  'Focus on hip hinge technique',
                  'Progressive overload over time'
                ]
              }
            },
            testDayTips: [
              'Perfect technique - neutral spine',
              'Drive with legs and hips',
              'Maintain tight core throughout',
              'Use full range of motion'
            ],
            commonMistakes: [
              'Poor deadlift form',
              'Weak posterior chain',
              'Not engaging core properly',
              'Rushing the movement'
            ]
          }
        },
        {
          id: 'medicine-ball-throw',
          name: 'Medicine Ball Throw',
          nepaliName: 'मेडिसिन बल फाल्ने',
          description: 'Upper-body explosive power',
          target: '~3.1m minimum',
          icon: '⚽',
          details: {
            whatItMeasures: 'Explosive upper-body and core power (throw distance)',
            target: '~3.1m minimum (British Army standard)',
            trainingPlan: {
              power: {
                title: 'Power Development',
                activities: [
                  'Medicine ball chest throws',
                  'Overhead slams for core power',
                  'Plyometric push-ups',
                  'Explosive rowing movements'
                ]
              },
              strength: {
                title: 'Supporting Strength',
                activities: [
                  'Shoulder and rotator-cuff strength work',
                  'Core stability exercises',
                  'Hip flexor strengthening',
                  'Rotational power exercises'
                ]
              }
            },
            testDayTips: [
              'Use hips to generate power',
              'Keep body tight and engaged',
              'Follow through with the throw',
              'Use full body rotation'
            ],
            commonMistakes: [
              'Relying only on arms',
              'Not using hips/core',
              'Poor follow-through',
              'Insufficient warm-up'
            ]
          }
        },
        {
          id: 'reps-tests',
          name: 'Reps Tests',
          nepaliName: 'दोहोराइ परीक्षाहरू',
          description: 'Muscular endurance (sit-ups, push-ups, pull-ups)',
          target: '>50-70 sit-ups, 40-50 push-ups, 6-10 pull-ups',
          icon: '🔄',
          details: {
            whatItMeasures: 'Muscular endurance (core and upper body)',
            target: 'Work up progressively to >50-70 sit-ups, 40-50 push-ups, and 6-10 pull-ups',
            trainingPlan: {
              circuit: {
                title: 'Circuit Training',
                activities: [
                  '3 times per week circuit training',
                  'Tempo sets: 5 × max-reps with short rests',
                  'Progressive overload (add reps, reduce rest)',
                  'Add weight for push-ups when ready'
                ]
              },
              specific: {
                title: 'Specific Training',
                activities: [
                  'Sit-ups: focus on full range of motion',
                  'Push-ups: perfect form over speed',
                  'Pull-ups: assisted variations to build strength',
                  'Core stability exercises'
                ]
              }
            },
            testDayTips: [
              'Use correct form (quality over speed)',
              'Breathe steadily throughout',
              'Pace yourself for endurance',
              'Complete full range of motion'
            ],
            commonMistakes: [
              'Poor technique',
              'Incomplete range of motion',
              'Starting too fast',
              'Not training consistently'
            ]
          }
        }
      ]
    },
    written: {
      title: 'Written Tests',
      nepaliTitle: 'लिखित परीक्षाहरू',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      tests: [
        {
          id: 'english-test',
          name: 'English Assessment',
          nepaliName: 'अंग्रेजी मूल्याङ्कन',
          description: 'Reading comprehension, vocabulary, grammar, writing',
          target: 'Pass minimum standards',
          icon: '📝',
          details: {
            whatItMeasures: 'Basic grammar, reading comprehension, ability to understand and answer questions quickly, spelling, and short written expression',
            format: 'Short reading comprehension, vocabulary, grammar (verbs, tenses, punctuation), writing short answers or sentences, and some oral/verbal comprehension',
            studyPlan: {
              daily: {
                title: 'Daily Practice (8-12 weeks)',
                activities: [
                  '15-30 min reading (short articles, official sample texts)',
                  'Learn vocabulary list in Army education guide',
                  'Quick multiple-choice quizzes',
                  'Speak English daily'
                ]
              },
              weekly: {
                title: 'Weekly Practice',
                activities: [
                  'Practice sample English papers (timed)',
                  '1 full paper per week as you get closer',
                  'Record yourself answering simple questions',
                  'Practice pronunciation exercises'
                ]
              }
            },
            testDayTips: [
              'Read questions first',
              'Underline key words',
              'Manage time (answer easier questions first)',
              'Check answers before submitting'
            ],
            commonMistakes: [
              'Poor time management',
              'Careless grammar errors',
              'Not reading questions carefully',
              'Rushing through answers'
            ]
          }
        },
        {
          id: 'math-test',
          name: 'Mathematics Assessment',
          nepaliName: 'गणित मूल्याङ्कन',
          description: 'Arithmetic, conversions, percentages, ratios, geometry',
          target: 'Pass minimum standards',
          icon: '🔢',
          details: {
            whatItMeasures: 'Practical arithmetic, distance/time/speed, conversions, percentages, ratios, simple geometry, basic probability, reading tables/graphs',
            format: 'Practical arithmetic problems, word problems, conversions, calculations',
            studyPlan: {
              daily: {
                title: 'Daily Practice (8-12 weeks)',
                activities: [
                  '20-30 minutes of mixed practice',
                  'Mental arithmetic exercises',
                  'Conversions practice (m↔km)',
                  'Fraction/percentage problems'
                ]
              },
              weekly: {
                title: 'Weekly Practice',
                activities: [
                  'Official example math papers',
                  'Time yourself to improve speed and accuracy',
                  'Practice word problems with step-by-step solutions',
                  'Review common formulas and methods'
                ]
              }
            },
            testDayTips: [
              'Show your working clearly',
              'Check units (metres vs kilometres)',
              'Don\'t rush the last few answers',
              'Double-check calculations'
            ],
            commonMistakes: [
              'Forgetting to convert units',
              'Not showing working',
              'Careless arithmetic errors',
              'Misreading word problems'
            ]
          }
        }
      ]
    },
    medical: {
      title: 'Medical Tests',
      nepaliTitle: 'चिकित्सा परीक्षाहरू',
      icon: Stethoscope,
      color: 'from-green-500 to-green-600',
      tests: [
        {
          id: 'medical-exam',
          name: 'Medical Examination',
          nepaliName: 'चिकित्सा परीक्षा',
          description: 'Comprehensive health and fitness check',
          target: 'Meet all medical standards',
          icon: '🏥',
          details: {
            whatItMeasures: 'Overall health, physical fitness, medical history, current conditions',
            requirements: {
              height: 'Minimum height commonly ~158cm',
              bmi: 'BMI must be within acceptable range (often ~18-28)',
              vision: 'Uncorrected vision requirements (6/6 right, 6/9 left), color perception tested',
              teeth: 'Front teeth must be good, only limited back-tooth faults allowed',
              hearing: 'Hearing test, chest examination, urine tests',
              vaccinations: 'Up-to-date vaccinations required'
            },
            preparation: {
              early: {
                title: '3-6 Months Before',
                activities: [
                  'Get full medical & dental check',
                  'Fix treatable issues early',
                  'Start healthy lifestyle habits',
                  'Maintain fitness routine'
                ]
              },
              immediate: {
                title: 'Days Before Selection',
                activities: [
                  'Avoid loud noises 3 days before (affects hearing test)',
                  'Get good sleep',
                  'Stay hydrated',
                  'Bring medical records and certificates'
                ]
              }
            },
            testDayTips: [
              'Bring original documents and medical certificates',
              'Be honest about medical history',
              'Stay calm during examinations',
              'Follow all instructions carefully'
            ],
            commonMistakes: [
              'Untreated dental infections',
              'Recent ear syringing or loud-noise exposure',
              'Unrecorded medical history',
              'Not bringing required documents'
            ]
          }
        }
      ]
    },
    interview: {
      title: 'Interview',
      nepaliName: 'अन्तर्वार्ता',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      tests: [
        {
          id: 'selection-interview',
          name: 'Selection Interview',
          nepaliName: 'छनोट अन्तर्वार्ता',
          description: 'Motivation, leadership, teamwork, English communication',
          target: 'Demonstrate suitability and commitment',
          icon: '💬',
          details: {
            whatItMeasures: 'Motivation, honesty, leadership potential, teamwork examples, understanding of Army life',
            commonQuestions: [
              {
                question: 'Why do you want to join the Gurkhas?',
                answer: 'To serve with pride, support my family, and build skills. I\'m disciplined and committed.',
                tips: 'Be genuine, show respect for tradition, mention family support'
              },
              {
                question: 'Tell us about a time you showed leadership',
                answer: 'Use STAR method: Situation, Task, Action, Result - keep it short and specific',
                tips: 'Prepare 6-8 short stories about teamwork, discipline, responsibility, overcoming challenges'
              },
              {
                question: 'Any medical issues?',
                answer: 'Be honest and explain current fitness and recovery if applicable',
                tips: 'Don\'t hide anything, but focus on current health status'
              }
            ],
            preparation: {
              practice: {
                title: 'Practice Plan',
                activities: [
                  'Do mock interviews with friend or teacher',
                  'Record yourself answering questions',
                  'Learn to speak slowly and clearly',
                  'Prepare 6-8 short stories using STAR method'
                ]
              },
              content: {
                title: 'Content Preparation',
                activities: [
                  'Research British Army and Gurkha history',
                  'Understand Army life and values',
                  'Prepare examples of discipline and teamwork',
                  'Practice English pronunciation'
                ]
              }
            },
            testDayTips: [
              'Be honest in all answers',
              'Keep answers short and structured',
              'Show respect and maintain eye contact',
              'Speak clearly and confidently'
            ],
            commonMistakes: [
              'Giving long, rambling answers',
              'Not preparing specific examples',
              'Poor English communication',
              'Lack of confidence or eye contact'
            ]
          }
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

  const getTestIcon = (category) => {
    switch (category) {
      case 'physical': return '💪'
      case 'written': return '📚'
      case 'medical': return '🏥'
      case 'interview': return '💬'
      default: return '📋'
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
          <h1 className="text-white text-4xl font-bold mb-4">Detailed Test Preparation</h1>
          <p className="text-gray-300 text-lg">Complete guide to every test in Gurkha selection</p>
          <p className="text-gray-400 text-sm mt-2">विस्तृत परीक्षा तयारी - गोर्खा छनोटका सबै परीक्षाहरूको पूर्ण गाइड</p>
        </motion.div>

        {/* Test Categories */}
        <div className="space-y-6">
          {Object.entries(testCategories).map(([categoryKey, category], categoryIndex) => (
            <motion.div
              key={categoryKey}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-card p-6"
            >
              {/* Category Header */}
              <div 
                className="flex items-center justify-between cursor-pointer mb-4"
                onClick={() => toggleSection(categoryKey)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <category.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold">{category.title}</h3>
                    <p className="text-gray-300 text-sm">{category.nepaliTitle}</p>
                    <p className="text-gray-400 text-sm">{category.tests.length} tests</p>
                  </div>
                </div>
                {expandedSections[categoryKey] ? 
                  <ChevronDown size={20} className="text-gray-400" /> : 
                  <ChevronRight size={20} className="text-gray-400" />
                }
              </div>

              {/* Category Content */}
              <AnimatePresence>
                {expandedSections[categoryKey] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {category.tests.map((test, testIndex) => (
                      <motion.div
                        key={test.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: testIndex * 0.1 }}
                        className="bg-gray-800/50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-2xl">{test.icon}</span>
                              <div>
                                <h4 className="text-white font-semibold">{test.name}</h4>
                                <p className="text-gray-300 text-sm">{test.nepaliName}</p>
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{test.description}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-navy-400 font-medium">Target: {test.target}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedTest(test)}
                            className="px-4 py-2 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <Play size={16} />
                            <span>View Details</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Test Details Modal */}
        <AnimatePresence>
          {selectedTest && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTest(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full h-full max-w-6xl max-h-[90vh] glass-card p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{selectedTest.icon}</span>
                    <div>
                      <h2 className="text-white text-2xl font-bold">{selectedTest.name}</h2>
                      <p className="text-gray-300">{selectedTest.nepaliName}</p>
                      <p className="text-navy-400 font-medium">Target: {selectedTest.target}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTest(null)}
                    className="text-gray-400 hover:text-white transition-colors text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Test Details Content */}
                <div className="space-y-6">
                  {/* What It Measures */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="text-navy-400 font-semibold text-lg mb-3">What It Measures</h3>
                    <p className="text-gray-300">{selectedTest.details.whatItMeasures}</p>
                  </div>

                  {/* Training Plan */}
                  {selectedTest.details.trainingPlan && (
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-navy-400 font-semibold text-lg mb-4">Training Plan</h3>
                      <div className="space-y-4">
                        {Object.entries(selectedTest.details.trainingPlan).map(([key, phase]) => (
                          <div key={key} className="border-l-4 border-navy-500 pl-4">
                            <h4 className="text-white font-medium mb-2">{phase.title}</h4>
                            <ul className="space-y-1">
                              {phase.activities.map((activity, index) => (
                                <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                                  <span className="text-navy-400 mt-1">•</span>
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Study Plan for Written Tests */}
                  {selectedTest.details.studyPlan && (
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-navy-400 font-semibold text-lg mb-4">Study Plan</h3>
                      <div className="space-y-4">
                        {Object.entries(selectedTest.details.studyPlan).map(([key, phase]) => (
                          <div key={key} className="border-l-4 border-navy-500 pl-4">
                            <h4 className="text-white font-medium mb-2">{phase.title}</h4>
                            <ul className="space-y-1">
                              {phase.activities.map((activity, index) => (
                                <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                                  <span className="text-navy-400 mt-1">•</span>
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Requirements for Medical Tests */}
                  {selectedTest.details.requirements && (
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-navy-400 font-semibold text-lg mb-4">Requirements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(selectedTest.details.requirements).map(([key, value]) => (
                          <div key={key} className="bg-gray-700/50 rounded p-3">
                            <h4 className="text-white font-medium text-sm capitalize mb-1">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <p className="text-gray-300 text-sm">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Common Questions for Interview */}
                  {selectedTest.details.commonQuestions && (
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-navy-400 font-semibold text-lg mb-4">Common Questions</h3>
                      <div className="space-y-4">
                        {selectedTest.details.commonQuestions.map((qa, index) => (
                          <div key={index} className="bg-gray-700/50 rounded p-4">
                            <h4 className="text-white font-medium mb-2">Q: {qa.question}</h4>
                            <p className="text-gray-300 text-sm mb-2"><strong>Answer:</strong> {qa.answer}</p>
                            <p className="text-navy-300 text-sm"><strong>Tips:</strong> {qa.tips}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Test Day Tips */}
                  <div className="bg-green-900/30 rounded-lg p-4">
                    <h3 className="text-green-400 font-semibold text-lg mb-3 flex items-center space-x-2">
                      <CheckCircle size={20} />
                      <span>Test Day Tips</span>
                    </h3>
                    <ul className="space-y-2">
                      {selectedTest.details.testDayTips.map((tip, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Mistakes */}
                  <div className="bg-red-900/30 rounded-lg p-4">
                    <h3 className="text-red-400 font-semibold text-lg mb-3 flex items-center space-x-2">
                      <AlertTriangle size={20} />
                      <span>Common Mistakes to Avoid</span>
                    </h3>
                    <ul className="space-y-2">
                      {selectedTest.details.commonMistakes.map((mistake, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                          <span className="text-red-400 mt-1">⚠</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weekly Training Plan Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 glass-card p-6"
        >
          <h3 className="text-white font-semibold text-xl mb-4">Sample Weekly Training Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {[
              { day: 'Monday', activity: 'Strength (full body) + core (45-60 min)', icon: '💪' },
              { day: 'Tuesday', activity: 'Interval run (speed) + mobility (45 min)', icon: '🏃' },
              { day: 'Wednesday', activity: 'Ruck/pack walk 6-10km + light calisthenics', icon: '🎒' },
              { day: 'Thursday', activity: 'Strength (posterior chain) + explosive work', icon: '⚡' },
              { day: 'Friday', activity: 'Tempo run 3-5km + core and pull-ups', icon: '🏃‍♂️' },
              { day: 'Saturday', activity: 'Hill repeats or Doko simulation', icon: '⛰️' },
              { day: 'Sunday', activity: 'Rest / active recovery', icon: '😴' }
            ].map((day, index) => (
              <div key={day.day} className="bg-gray-800/50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-2">{day.icon}</div>
                <h4 className="text-white font-medium text-sm mb-1">{day.day}</h4>
                <p className="text-gray-300 text-xs">{day.activity}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DetailedTestPrepView