import React, { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useAppStore } from '../../store/useAppStore'
import * as THREE from 'three'

function CameraController() {
  const { camera } = useThree()
  const { cameraPosition, cameraTarget } = useAppStore()
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  
  useEffect(() => {
    // Set initial camera position
    targetPosition.current.set(...cameraPosition)
    targetLookAt.current.set(...cameraTarget)
    
    camera.position.copy(targetPosition.current)
    camera.lookAt(targetLookAt.current)
  }, [camera, cameraPosition, cameraTarget])
  
  useEffect(() => {
    // Smooth camera transition when position changes
    targetPosition.current.set(...cameraPosition)
    targetLookAt.current.set(...cameraTarget)
  }, [cameraPosition, cameraTarget])
  
  useFrame((state, delta) => {
    // Smooth camera movement
    camera.position.lerp(targetPosition.current, delta * 2)
    
    // Smooth look-at transition
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    currentLookAt.multiplyScalar(-1)
    currentLookAt.add(camera.position)
    
    const targetLookAtVector = targetLookAt.current.clone()
    currentLookAt.lerp(targetLookAtVector, delta * 2)
    
    camera.lookAt(currentLookAt)
  })
  
  return null
}

export default CameraController