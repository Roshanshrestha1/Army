import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere, Box } from '@react-three/drei'
import { useAppStore } from '../../store/useAppStore'
import * as THREE from 'three'

function MilestoneMarker({ milestone, isSelected }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { setSelectedMilestone } = useAppStore()
  
  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = milestone.position[1] + Math.sin(state.clock.elapsedTime + milestone.id.length) * 0.5
      
      // Rotation for visual interest
      groupRef.current.rotation.y += 0.01
      
      // Scale animation when hovered
      const targetScale = hovered || isSelected ? 1.2 : 1
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })
  
  const getMarkerColor = () => {
    if (isSelected) return '#6366f1' // Navy blue
    if (milestone.status === 'completed') return '#22c55e' // Army green
    if (milestone.status === 'in-progress') return '#f97316' // Accent orange
    return '#64748b' // Gray for pending
  }
  
  const getMarkerIcon = () => {
    switch (milestone.id) {
      case 'see':
        return '📚'
      case 'plus2':
        return '🎓'
      case 'training':
        return '🏃'
      case 'selection':
        return '🎯'
      default:
        return '📍'
    }
  }
  
  return (
    <group
      ref={groupRef}
      position={milestone.position}
      onClick={() => setSelectedMilestone(milestone.id)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main marker sphere */}
      <Sphere args={[1, 16, 16]} position={[0, 0, 0]}>
        <meshLambertMaterial
          color={getMarkerColor()}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Glow effect */}
      <Sphere args={[1.5, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={getMarkerColor()}
          transparent
          opacity={hovered || isSelected ? 0.3 : 0.1}
        />
      </Sphere>
      
      {/* Icon */}
      <Text
        position={[0, 0, 1.2]}
        fontSize={1.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {getMarkerIcon()}
      </Text>
      
      {/* Milestone name */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
        font="/fonts/inter.woff"
      >
        {milestone.name}
      </Text>
      
      {/* Status indicator */}
      <Box args={[0.3, 0.3, 0.3]} position={[1.2, 1.2, 0]}>
        <meshLambertMaterial
          color={milestone.status === 'completed' ? '#22c55e' : '#64748b'}
        />
      </Box>
      
      {/* Connection line to next milestone */}
      {milestone.id !== 'selection' && (
        <mesh position={[2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
          <meshLambertMaterial color="#64748b" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  )
}

export default MilestoneMarker