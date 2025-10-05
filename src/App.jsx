import React from 'react'
import { motion } from 'framer-motion'

function App() {
  const [currentView, setCurrentView] = React.useState('home')
  const [showIntroVideo, setShowIntroVideo] = React.useState(false)

  // Check if intro video should be shown (first visit)
  React.useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro')
    if (!hasSeenIntro) {
      setShowIntroVideo(true)
    }
  }, [])

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenIntro', 'true')
    setShowIntroVideo(false)
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />
      case 'about':
        return <AboutView />
      default:
        return <HomeView />
    }
  }
  
  return (
    <div className="App">
      {/* Intro Video */}
      {showIntroVideo && (
        <IntroVideo onComplete={handleIntroComplete} />
      )}
      
      {/* Simple Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        zIndex: 1000
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>
          Gurkha Preparation Tracker
        </h1>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => setCurrentView('home')}
            style={{
              background: currentView === 'home' ? '#3b82f6' : 'transparent',
              color: 'white',
              border: '1px solid white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentView('about')}
            style={{
              background: currentView === 'about' ? '#3b82f6' : 'transparent',
              color: 'white',
              border: '1px solid white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            About
          </button>
          <button 
            onClick={() => setShowIntroVideo(true)}
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Replay Intro
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <motion.main
        key={currentView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ marginTop: '60px', height: 'calc(100vh - 60px)' }}
      >
        {renderView()}
      </motion.main>
    </div>
  )
}

// Simple HomeView component
function HomeView() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Welcome to Gurkha Preparation Tracker
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Your Journey to Excellence Begins Here
        </p>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '1rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Features Coming Soon:</h2>
          <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>✓ 3D Interactive Journey Map</li>
            <li style={{ marginBottom: '0.5rem' }}>✓ Progress Tracking</li>
            <li style={{ marginBottom: '0.5rem' }}>✓ Test Papers & Resources</li>
            <li style={{ marginBottom: '0.5rem' }}>✓ Physical Training Tracker</li>
            <li style={{ marginBottom: '0.5rem' }}>✓ Timeline & Milestones</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Simple AboutView component
function AboutView() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          About Gurkha Preparation Tracker
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Your companion on the journey to becoming a British Gurkha
        </p>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '1rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Our Mission</h2>
          <p>
            Gurkha Tracker is designed to help young Nepali students prepare for the British Gurkha selection process. 
            We provide an interactive, engaging platform that makes the preparation journey clear, organized, and motivating.
          </p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '1rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Key Features</h2>
          <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>🎯 3D Interactive Journey Map</li>
            <li style={{ marginBottom: '0.5rem' }}>📊 Progress Tracking System</li>
            <li style={{ marginBottom: '0.5rem' }}>📚 Comprehensive Resource Library</li>
            <li style={{ marginBottom: '0.5rem' }}>💪 Physical Training Tracker</li>
            <li style={{ marginBottom: '0.5rem' }}>📅 Timeline & Milestone Management</li>
            <li style={{ marginBottom: '0.5rem' }}>📱 Responsive Design</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App