import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { saveProgress } from '../utils/apiClient'
import { useAuthStore } from './useAuthStore'

// Milestone data structure
const initialMilestones = [
  {
    id: 'see',
    name: 'SEE Preparation',
    nepaliName: 'SEE तयारी',
    position: [0, 0, 0],
    description: 'Complete your Secondary Education Examination with strong grades',
    status: 'pending',
    tasks: [
      { id: 'see-math', text: 'Master mathematics fundamentals', completed: false },
      { id: 'see-science', text: 'Excel in science subjects', completed: false },
      { id: 'see-english', text: 'Improve English proficiency', completed: false },
      { id: 'see-physical', text: 'Maintain physical fitness', completed: false }
    ],
    resources: [
      { type: 'link', title: 'SEE Study Guide', url: '#' },
      { type: 'pdf', title: 'Mathematics Practice Tests', url: '#' }
    ],
    timeline: { month: 1, year: 2024 }
  },
  {
    id: 'plus2',
    name: '+2 Studies',
    nepaliName: '+२ अध्ययन',
    position: [5, 0, 3],
    description: 'Pursue higher secondary education in relevant subjects',
    status: 'pending',
    tasks: [
      { id: 'plus2-apply', text: 'Apply to +2 colleges', completed: false },
      { id: 'plus2-subjects', text: 'Choose relevant subjects (Science/Commerce)', completed: false },
      { id: 'plus2-grades', text: 'Maintain excellent grades', completed: false },
      { id: 'plus2-english', text: 'Continue English improvement', completed: false }
    ],
    resources: [
      { type: 'link', title: '+2 College Guide', url: '#' },
      { type: 'video', title: 'Subject Selection Tips', url: '#' }
    ],
    timeline: { month: 6, year: 2024 }
  },
  {
    id: 'training',
    name: 'Physical Training',
    nepaliName: 'शारीरिक प्रशिक्षण',
    position: [-3, 0, 8],
    description: 'Develop physical fitness and endurance',
    status: 'pending',
    tasks: [
      { id: 'training-running', text: 'Daily running routine (5km+)', completed: false },
      { id: 'training-strength', text: 'Strength training exercises', completed: false },
      { id: 'training-endurance', text: 'Build endurance and stamina', completed: false },
      { id: 'training-diet', text: 'Maintain healthy diet', completed: false }
    ],
    resources: [
      { type: 'link', title: 'Fitness Training Guide', url: '#' },
      { type: 'video', title: 'Running Techniques', url: '#' }
    ],
    timeline: { month: 3, year: 2024 }
  },
  {
    id: 'selection',
    name: 'Selection Process',
    nepaliName: 'चयन प्रक्रिया',
    position: [8, 0, -2],
    description: 'Prepare for and complete the Gurkha selection process',
    status: 'pending',
    tasks: [
      { id: 'selection-apply', text: 'Submit application', completed: false },
      { id: 'run-24km', text: '2.4 km run under 10:30', completed: false },
      { id: 'pushups', text: 'Push-ups: 50 reps (2 min)', completed: false },
      { id: 'situps', text: 'Sit-ups: 60 reps (2 min)', completed: false },
      { id: 'pullups', text: 'Pull-ups: 6 strict', completed: false },
      { id: 'jerrycan', text: 'Jerry can carry: 2×20kg for 150 m', completed: false },
      { id: 'static-lift', text: 'Static lift: 40 kg to required height', completed: false },
      { id: 'pack-carry', text: '25 kg pack carry / loaded march practice', completed: false },
      { id: 'beep-test', text: 'Beep test to target level (e.g., 9.10)', completed: false },
      { id: 'selection-physical', text: 'All physical tests passed', completed: false },
      { id: 'selection-interview', text: 'Complete interviews', completed: false },
      { id: 'selection-medical', text: 'Pass medical examination', completed: false }
    ],
    resources: [
      { type: 'link', title: 'Application Guide', url: '#' },
      { type: 'pdf', title: 'Selection Criteria', url: '#' }
    ],
    timeline: { month: 12, year: 2025 }
  }
]

export const useAppStore = create(
  persist(
    (set, get) => ({
      // State
      milestones: initialMilestones,
      selectedMilestone: null,
      currentView: 'home',
      userSettings: {
        name: '',
        targetAge: 18,
        preferredSchedule: 'morning'
      },
      cameraPosition: [0, 10, 15],
      cameraTarget: [0, 0, 0],
      isLowPerformanceMode: false,
      isFullscreenMode: false,
      showOnboarding: true,
      showIntroVideo: false,
      
      // Actions
      setSelectedMilestone: (milestoneId) => {
        const milestone = get().milestones.find(m => m.id === milestoneId)
        set({ selectedMilestone: milestone })
        
        // Smooth camera transition to milestone
        if (milestone) {
          set({
            cameraTarget: milestone.position,
            cameraPosition: [
              milestone.position[0] + 5,
              milestone.position[1] + 8,
              milestone.position[2] + 10
            ]
          })
        }
      },
      
      toggleTask: (milestoneId, taskId) => {
        set(state => ({
          milestones: state.milestones.map(milestone =>
            milestone.id === milestoneId
              ? {
                  ...milestone,
                  tasks: milestone.tasks.map(task =>
                    task.id === taskId
                      ? { ...task, completed: !task.completed }
                      : task
                  )
                }
              : milestone
          )
        }))
        const { isLoggedIn } = useAuthStore.getState()
        if (isLoggedIn()) {
          const { milestones, userSettings } = get()
          saveProgress({ milestones, userSettings }).catch(() => {})
        }
      },
      
      updateMilestoneStatus: (milestoneId, status) => {
        set(state => ({
          milestones: state.milestones.map(milestone =>
            milestone.id === milestoneId
              ? { ...milestone, status }
              : milestone
          )
        }))
        const { isLoggedIn } = useAuthStore.getState()
        if (isLoggedIn()) {
          const { milestones, userSettings } = get()
          saveProgress({ milestones, userSettings }).catch(() => {})
        }
      },
      
      setCurrentView: (view) => set({ currentView: view }),
      
      updateUserSettings: (settings) => {
        set(state => ({
          userSettings: { ...state.userSettings, ...settings }
        }))
        const { isLoggedIn } = useAuthStore.getState()
        if (isLoggedIn()) {
          const { milestones, userSettings } = get()
          saveProgress({ milestones, userSettings }).catch(() => {})
        }
      },
      
      setCameraPosition: (position, target) => {
        set({ cameraPosition: position, cameraTarget: target })
      },
      
      toggleLowPerformanceMode: () => {
        set(state => ({ isLowPerformanceMode: !state.isLowPerformanceMode }))
      },
      
      toggleFullscreenMode: () => {
        set(state => ({ isFullscreenMode: !state.isFullscreenMode }))
      },
      
      dismissOnboarding: () => {
        set({ showOnboarding: false })
      },
      
      // Computed values
      getProgress: () => {
        const milestones = get().milestones
        const totalTasks = milestones.reduce((acc, milestone) => acc + milestone.tasks.length, 0)
        const completedTasks = milestones.reduce((acc, milestone) => 
          acc + milestone.tasks.filter(task => task.completed).length, 0
        )
        return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
      },
      
      getNextAction: () => {
        const milestones = get().milestones
        const currentMilestone = milestones.find(m => m.status === 'in-progress') || milestones[0]
        const nextTask = currentMilestone.tasks.find(task => !task.completed)
        return nextTask ? nextTask.text : 'Complete current milestone'
      },
      
      exportData: () => {
        const state = get()
        const data = {
          milestones: state.milestones,
          userSettings: state.userSettings,
          exportDate: new Date().toISOString()
        }
        return JSON.stringify(data, null, 2)
      },
      
      importData: (jsonData) => {
        try {
          const data = JSON.parse(jsonData)
          set({
            milestones: data.milestones || initialMilestones,
            userSettings: data.userSettings || get().userSettings
          })
          const { isLoggedIn } = useAuthStore.getState()
          if (isLoggedIn()) {
            const { milestones, userSettings } = get()
            saveProgress({ milestones, userSettings }).catch(() => {})
          }
          return true
        } catch (error) {
          console.error('Failed to import data:', error)
          return false
        }
      },
      
      showIntroVideo: () => {
        set({ showIntroVideo: true })
      },
      
      hideIntroVideo: () => {
        set({ showIntroVideo: false })
        localStorage.setItem('hasSeenIntro', 'true')
      }
    }),
    {
      name: 'gurkha-tracker-storage',
      partialize: (state) => ({
        milestones: state.milestones,
        userSettings: state.userSettings,
        showOnboarding: state.showOnboarding
      })
    }
  )
)

export default useAppStore