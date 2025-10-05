import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

export function useKeyboardNavigation() {
  const { 
    currentView, 
    setCurrentView, 
    selectedMilestone, 
    setSelectedMilestone,
    milestones,
    toggleTask 
  } = useAppStore()
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't interfere with form inputs
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return
      }
      
      // Navigation shortcuts
      if (event.altKey) {
        switch (event.key) {
          case '1':
            event.preventDefault()
            setCurrentView('home')
            break
          case '2':
            event.preventDefault()
            setCurrentView('checklist')
            break
          case '3':
            event.preventDefault()
            setCurrentView('timeline')
            break
          case '4':
            event.preventDefault()
            setCurrentView('resources')
            break
          case '5':
            event.preventDefault()
            setCurrentView('progress')
            break
          case '6':
            event.preventDefault()
            setCurrentView('about')
            break
          case 'Escape':
            event.preventDefault()
            if (selectedMilestone) {
              setSelectedMilestone(null)
            }
            break
        }
      }
      
      // Milestone navigation
      if (event.key >= '1' && event.key <= '4' && !event.altKey) {
        const milestoneIndex = parseInt(event.key) - 1
        if (milestoneIndex < milestones.length) {
          event.preventDefault()
          setSelectedMilestone(milestones[milestoneIndex].id)
        }
      }
      
      // Space bar to toggle tasks (when milestone is selected)
      if (event.key === ' ' && selectedMilestone) {
        event.preventDefault()
        const currentMilestone = milestones.find(m => m.id === selectedMilestone.id)
        if (currentMilestone) {
          const firstIncompleteTask = currentMilestone.tasks.find(task => !task.completed)
          if (firstIncompleteTask) {
            toggleTask(selectedMilestone.id, firstIncompleteTask.id)
          }
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentView, selectedMilestone, milestones, setCurrentView, setSelectedMilestone, toggleTask])
}

export function useFocusManagement() {
  useEffect(() => {
    // Focus management for accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    
    const handleTabKey = (event) => {
      if (event.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll(focusableElements))
        const firstFocusable = focusable[0]
        const lastFocusable = focusable[focusable.length - 1]
        
        if (event.shiftKey) {
          if (document.activeElement === firstFocusable) {
            event.preventDefault()
            lastFocusable.focus()
          }
        } else {
          if (document.activeElement === lastFocusable) {
            event.preventDefault()
            firstFocusable.focus()
          }
        }
      }
    }
    
    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [])
}