import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  CheckSquare, 
  Calendar, 
  BookOpen, 
  FileText,
  Dumbbell,
  BarChart3, 
  Info,
  Map,
  Target,
  Menu,
  X,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { useAuthStore } from '../../store/useAuthStore'

const navigationItems = [
  { id: 'home', label: '3D Journey', icon: Home, nepaliLabel: '३डी यात्रा' },
  { id: 'roadmap', label: 'Roadmap', icon: Map, nepaliLabel: 'सडक नक्शा' },
  { id: 'detailed-tests', label: 'Test Details', icon: Target, nepaliLabel: 'परीक्षा विवरण' },
  { id: 'checklist', label: 'Checklist', icon: CheckSquare, nepaliLabel: 'सूची' },
  { id: 'timeline', label: 'Timeline', icon: Calendar, nepaliLabel: 'समयरेखा' },
  { id: 'resources', label: 'Resources', icon: BookOpen, nepaliLabel: 'स्रोतहरू' },
  { id: 'test-papers', label: 'Test Papers', icon: FileText, nepaliLabel: 'परीक्षा कागजातहरू' },
  { id: 'physical-training', label: 'Physical Training', icon: Dumbbell, nepaliLabel: 'शारीरिक प्रशिक्षण' },
  { id: 'age-calculator', label: 'Age Calculator', icon: Calendar, nepaliLabel: 'उमेर क्यालकुलेटर' },
  { id: 'progress', label: 'Progress', icon: BarChart3, nepaliLabel: 'प्रगति' },
  { id: 'about', label: 'About', icon: Info, nepaliLabel: 'बारेमा' }
]

function Navigation() {
  const { currentView, setCurrentView, isFullscreenMode, toggleFullscreenMode } = useAppStore()
  const { isLoggedIn, login, register, logout, email } = useAuthStore()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [form, setForm] = useState({ email: '', password: '' })
  const [authError, setAuthError] = useState('')
  
  const handleItemClick = (itemId) => {
    setCurrentView(itemId)
    setShowMobileMenu(false)
  }
  
  return (
    <>
      {/* Desktop Navigation */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isCollapsed ? -240 : (isFullscreenMode ? -300 : 0) }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-full w-60 glass-card z-50 hidden md:block"
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-navy-500 to-army-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Gurkha Tracker</h1>
                <p className="text-gray-300 text-xs">गोर्खा ट्र्याकर</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFullscreenMode}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Toggle fullscreen mode"
                title={isFullscreenMode ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreenMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Toggle navigation"
              >
                {isCollapsed ? <Menu size={20} /> : <X size={20} />}
              </button>
            </div>
          </div>
          
          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-navy-500/60 scrollbar-track-transparent">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = currentView === item.id
                
                return (
                  <li key={item.id}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-navy-500/50 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon size={20} />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs opacity-75">{item.nepaliLabel}</div>
                      </div>
                    </motion.button>
                  </li>
                )
              })}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-white/20">
            {isLoggedIn() ? (
              <div className="flex items-center justify-between text-gray-200 text-sm">
                <span className="truncate max-w-[140px]">{email}</span>
                <button onClick={logout} className="text-xs text-red-300 hover:text-red-200">Logout</button>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={() => { setAuthMode('login'); setShowAuth(true) }}
                  className="text-sm text-white bg-navy-500/60 px-3 py-1 rounded-md hover:bg-navy-500"
                >Login</button>
                <button
                  onClick={() => { setAuthMode('register'); setShowAuth(true) }}
                  className="ml-2 text-sm text-white/90 border border-white/30 px-3 py-1 rounded-md hover:bg-white/10"
                >Register</button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(true)}
          className="fixed top-4 left-4 z-50 glass-card p-3 text-white"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowMobileMenu(false)}
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.3 }}
                className="w-80 h-full glass-card"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-navy-500 to-army-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">G</span>
                      </div>
                      <div>
                        <h1 className="text-white font-bold text-lg">Gurkha Tracker</h1>
                        <p className="text-gray-300 text-xs">गोर्खा ट्र्याकर</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowMobileMenu(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Close menu"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  {/* Navigation Items */}
                  <nav className="flex-1 overflow-y-auto pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-navy-500/60 scrollbar-track-transparent">
                    <ul className="space-y-2">
                      {navigationItems.map((item) => {
                        const Icon = item.icon
                        const isActive = currentView === item.id
                        
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => handleItemClick(item.id)}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                isActive
                                  ? 'bg-navy-500/50 text-white shadow-lg'
                                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              <Icon size={20} />
                              <div className="flex-1 text-left">
                                <div className="font-medium">{item.label}</div>
                                <div className="text-xs opacity-75">{item.nepaliLabel}</div>
                              </div>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setShowAuth(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-sm p-6 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{authMode === 'login' ? 'Login' : 'Register'}</h3>
                <button onClick={() => setShowAuth(false)} className="text-gray-300 hover:text-white"><X size={18} /></button>
              </div>
              {authError && (
                <div className="mb-3 text-sm text-red-300">{authError}</div>
              )}
              <div className="space-y-3">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none"
                />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Password (min 6 chars)"
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none"
                />
                <button
                  onClick={async () => {
                    setAuthError('')
                    try {
                      if (authMode === 'login') {
                        await login(form.email, form.password)
                      } else {
                        await register(form.email, form.password)
                        await login(form.email, form.password)
                      }
                      setShowAuth(false)
                    } catch (e) {
                      setAuthError(e.message)
                    }
                  }}
                  className="w-full bg-navy-500 hover:bg-navy-600 py-2 rounded-md"
                >{authMode === 'login' ? 'Login' : 'Create account'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation