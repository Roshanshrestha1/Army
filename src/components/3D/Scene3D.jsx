import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Text, Sphere, Box } from '@react-three/drei'
import { useAppStore } from '../../store/useAppStore'
import Terrain from './Terrain'
import MilestoneMarker from './MilestoneMarker'
import CameraController from './CameraController'

function SceneContent() {
  const { milestones, selectedMilestone, cameraPosition, cameraTarget } = useAppStore()
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      
      {/* Environment */}
      <Environment preset="sunset" />
      
      {/* Terrain */}
      <Terrain />
      
      {/* Milestone Markers */}
      {milestones.map((milestone) => (
        <MilestoneMarker
          key={milestone.id}
          milestone={milestone}
          isSelected={selectedMilestone?.id === milestone.id}
        />
      ))}
      
      {/* Camera Controller */}
      <CameraController />
      
      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
        target={cameraTarget}
      />
    </>
  )
}

function Scene3D() {
  const { isLowPerformanceMode } = useAppStore()
  
  if (isLowPerformanceMode) {
    return <Scene2DFallback />
  }
  
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 10, 15], fov: 60 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}

// 2D Fallback for mobile/low performance
function Scene2DFallback() {
  const { milestones, selectedMilestone, setSelectedMilestone } = useAppStore()
  
  return (
    <div className="w-full h-full bg-gradient-to-br from-army-900 via-navy-900 to-army-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-army-500/30 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-navy-500/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-accent-500/20 rounded-full blur-xl"></div>
      </div>
      
      {/* 2D Map Grid */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 400 300">
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Milestone Markers */}
          {milestones.map((milestone, index) => {
            const x = 50 + (index * 80) + (index % 2 === 0 ? 0 : 40)
            const y = 100 + (index % 2 === 0 ? 0 : 60)
            const isSelected = selectedMilestone?.id === milestone.id
            
            return (
              <g key={milestone.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 20 : 15}
                  fill={isSelected ? '#6366f1' : '#22c55e'}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-300 hover:scale-110"
                  onClick={() => setSelectedMilestone(milestone.id)}
                />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="600"
                  className="pointer-events-none"
                >
                  {milestone.name.split(' ')[0]}
                </text>
              </g>
            )
          })}
          
          {/* Connection Lines */}
          {milestones.slice(0, -1).map((milestone, index) => {
            const x1 = 50 + (index * 80) + (index % 2 === 0 ? 0 : 40)
            const y1 = 100 + (index % 2 === 0 ? 0 : 60)
            const x2 = 50 + ((index + 1) * 80) + ((index + 1) % 2 === 0 ? 0 : 40)
            const y2 = 100 + ((index + 1) % 2 === 0 ? 0 : 60)
            
            return (
              <line
                key={`line-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )
          })}
        </svg>
      </div>
      
      {/* Progress Indicator */}
      <div className="absolute top-4 right-4 glass-card p-3">
        <div className="text-white text-sm font-medium">
          Journey Progress
        </div>
        <div className="text-army-300 text-xs mt-1">
          Click markers to explore milestones
        </div>
      </div>
    </div>
  )
}

export default Scene3D