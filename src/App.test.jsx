import React from 'react'
import ReactDOM from 'react-dom/client'

function TestApp() {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Test App Working!</h1>
        <p>If you can see this, React is working</p>
      </div>
    </div>
  )
}

// Test if we can render anything at all
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<TestApp />)