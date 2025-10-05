import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Phase marker component
function PhaseMarker({ position, phase, index, isActive, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1)
    }
  })

  const getPhaseColor = (phaseNumber) => {
    switch (phaseNumber) {
      case 1: return '#3B82F6' // Blue
      case 2: return '#10B981' // Green
      case 3: return '#8B5CF6' // Purple
      case 4: return '#EF4444' // Red
      case 5: return '#F59E0B' // Orange
      default: return '#6B7280' // Gray
    }
  }

  const getPhaseIcon = (phaseNumber) => {
    switch (phaseNumber) {
      case 1: return '📚'
      case 2: return '📝'
      case 3: return '🎯'
      case 4: return '🎖️'
      case 5: return '🌟'
      default: return '📍'
    }
  }

  return (
    <group position={position}>
      {/* Phase marker sphere */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color={getPhaseColor(phase.number)} 
          emissive={getPhaseColor(phase.number)}
          emissiveIntensity={isActive ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Phase number */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {phase.number}
      </Text>
      
      {/* Phase icon */}
      <Text
        position={[0, 0, 0.9]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {getPhaseIcon(phase.number)}
      </Text>
      
      {/* Phase title */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
      >
        {phase.title}
      </Text>
      
      {/* Connection line to next phase */}
      {index < 4 && (
        <mesh position={[1.5, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
          <meshStandardMaterial color="#4B5563" />
        </mesh>
      )}
    </group>
  )
}

// Journey path component
function JourneyPath({ phases }) {
  const points = phases.map((_, index) => new THREE.Vector3(index * 3, 0, 0))
  
  return (
    <mesh>
      <tubeGeometry args={[new THREE.CatmullRomCurve3(points), 100, 0.1, 8, false]} />
      <meshStandardMaterial color="#6B7280" />
    </mesh>
  )
}

// Terrain component
function Terrain() {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2
    }
  })

  return (
    <mesh ref={meshRef} position={[6, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 10, 32, 32]} />
      <meshStandardMaterial color="#1F2937" wireframe />
    </mesh>
  )
}

// Main 3D Journey Map component
function JourneyMap3D({ onPhaseSelect, selectedPhase }) {
  const phases = [
    {
      number: 1,
      title: 'Preparation',
      nepaliTitle: 'तयारी',
      description: 'Build body, mind, and discipline before application',
      position: [0, 0, 0],
      details: {
        study: 'Focus on English, Math, Science - Study 2-3 hrs/day',
        physical: 'Start running, push-ups, sit-ups - Run 3-5 km daily',
        discipline: 'Wake up early (5 AM), stay neat, punctual',
        medical: 'Eat healthy, stay hydrated, visit dentist',
        learning: 'Learn about British Army & Gurkhas',
        practice: 'Talk daily, write short essays - 15-20 mins/day'
      },
      goal: 'Strong body, clear English, good school results, and ready for +2 studies.'
    },
    {
      number: 2,
      title: 'Application',
      nepaliTitle: 'आवेदन',
      description: 'Apply for Gurkha selection and get shortlisted',
      position: [3, 0, 0],
      details: {
        registration: 'Apply via British Gurkha Nepal (BGN) official portal',
        documents: 'Submit citizenship, birth certificate, SEE/+2 marksheet, medical papers',
        screening: 'Height, weight, eyesight, dental, tattoos check',
        training: 'Join local Gurkha Training Center (Pokhara / Dharan)'
      },
      goal: 'All documents ready, body & mind fit, selected for first round.'
    },
    {
      number: 3,
      title: 'Selection Process',
      nepaliTitle: 'छनोट प्रक्रिया',
      description: 'Pass all tests — physical, written, medical, and interview',
      position: [6, 0, 0],
      details: {
        physical: 'Running 800m + 5km, sit-ups (70+), heaves (8+), doko race with 25kg',
        written: 'Grammar, vocabulary, comprehension, arithmetic, fractions, percentage',
        medical: 'Full body check — eyes, teeth, bones, hearing, skin',
        interview: 'General knowledge, family background, discipline, English communication'
      },
      goal: 'Officially selected as a Gurkha recruit! 🎖️'
    },
    {
      number: 4,
      title: 'Basic Training',
      nepaliTitle: 'आधारभूत प्रशिक्षण',
      description: 'Complete British Gurkha Basic Training',
      position: [9, 0, 0],
      details: {
        drill: 'Marching, saluting, teamwork',
        physical: 'Advanced running, obstacle courses, load carrying',
        weapons: 'Rifle handling, safety, shooting practice',
        fieldcraft: 'Navigation, camouflage, survival skills',
        firstaid: 'Battlefield medical basics',
        leadership: 'Courage, loyalty, respect, teamwork'
      },
      goal: 'Fully trained British Gurkha Soldier serving with honor and pride. 🇬🇧🇳🇵'
    },
    {
      number: 5,
      title: 'Service & Growth',
      nepaliTitle: 'सेवा र विकास',
      description: 'Serve proudly and grow in your career',
      position: [12, 0, 0],
      details: {
        service: 'Join unit, follow command, serve abroad',
        career: 'Promotions, specialist training, further education',
        personal: 'Support family, inspire youth, stay humble'
      },
      goal: 'Successful career as a British Gurkha with pride and honor.'
    }
  ]

  return (
    <>
      {/* Terrain */}
      <Terrain />
      
      {/* Journey path */}
      <JourneyPath phases={phases} />
      
      {/* Phase markers */}
      {phases.map((phase, index) => (
        <PhaseMarker
          key={phase.number}
          position={phase.position}
          phase={phase}
          index={index}
          isActive={selectedPhase === phase.number}
          onClick={() => onPhaseSelect(phase)}
        />
      ))}
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#3B82F6" />
    </>
  )
}

// Phase details panel component
function PhaseDetailsPanel({ phase, isVisible, onClose }) {
  if (!phase || !isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 h-full w-96 glass-card p-6 z-40 overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">Phase {phase.number}: {phase.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-navy-400 font-semibold mb-2">Description</h3>
          <p className="text-gray-300 text-sm">{phase.description}</p>
          <p className="text-gray-400 text-sm mt-1">({phase.nepaliTitle})</p>
        </div>
        
        <div>
          <h3 className="text-navy-400 font-semibold mb-2">Key Areas</h3>
          <div className="space-y-2">
            {Object.entries(phase.details).map(([key, value]) => (
              <div key={key} className="bg-gray-800/50 rounded p-3">
                <h4 className="text-white font-medium text-sm capitalize mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-gray-300 text-xs">{value}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-navy-400 font-semibold mb-2">Goal</h3>
          <p className="text-gray-300 text-sm bg-green-900/30 p-3 rounded">
            {phase.goal}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Main Journey Map View component
function JourneyMapView() {
  const [selectedPhase, setSelectedPhase] = useState(null)
  const [showPhaseDetails, setShowPhaseDetails] = useState(false)

  const handlePhaseSelect = (phase) => {
    setSelectedPhase(phase)
    setShowPhaseDetails(true)
  }

  const handleCloseDetails = () => {
    setShowPhaseDetails(false)
    setSelectedPhase(null)
  }

  return (
    <div className="h-screen w-full relative">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <JourneyMap3D 
          onPhaseSelect={handlePhaseSelect}
          selectedPhase={selectedPhase?.number}
        />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
      
      {/* Phase Details Panel */}
      <PhaseDetailsPanel
        phase={selectedPhase}
        isVisible={showPhaseDetails}
        onClose={handleCloseDetails}
      />
      
      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-6 glass-card p-4 max-w-sm"
      >
        <h3 className="text-white font-semibold mb-2">Journey Map</h3>
        <p className="text-gray-300 text-sm mb-2">
          Click on the numbered spheres to explore each phase of your Gurkha journey.
        </p>
        <div className="text-xs text-gray-400 space-y-1">
          <div>🖱️ Mouse: Rotate, zoom, and pan</div>
          <div>👆 Click: Select phase for details</div>
          <div>📱 Touch: Swipe to navigate</div>
        </div>
      </motion.div>
      
      {/* Phase Progress Indicator */}
      <div className="absolute top-6 left-6 glass-card p-4">
        <h3 className="text-white font-semibold mb-2">Your Progress</h3>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((phaseNum) => (
            <div
              key={phaseNum}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                phaseNum === 1 ? 'bg-green-500 text-white' :
                phaseNum === 2 ? 'bg-blue-500 text-white' :
                'bg-gray-600 text-gray-300'
              }`}
            >
              {phaseNum}
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-xs mt-2">Phase 1: In Progress</p>
      </div>
    </div>
  )
}

export default JourneyMapView