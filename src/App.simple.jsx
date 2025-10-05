import React from 'react'
import { motion } from 'framer-motion'

function App() {
  return (
    <div className="App">
      <div style={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center' }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Gurkha Preparation Tracker
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Your Journey to Excellence Begins Here
          </p>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '2rem', 
            borderRadius: '1rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <p>Welcome to the Gurkha Preparation Tracker!</p>
            <p>This is a test version to ensure everything is working.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default App