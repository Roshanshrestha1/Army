import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Terrain() {
  const meshRef = useRef()
  
  // Generate terrain geometry
  const geometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(50, 50, 64, 64)
    
    // Add some height variation for a more interesting terrain
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const z = positions[i + 2]
      
      // Create gentle hills and valleys
      const height = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 2 +
                    Math.sin(x * 0.05) * Math.cos(z * 0.05) * 1 +
                    Math.random() * 0.5
      
      positions[i + 1] = height
    }
    
    geometry.computeVertexNormals()
    return geometry
  }, [])
  
  // Material with gradient colors
  const material = useMemo(() => {
    return new THREE.MeshLambertMaterial({
      color: new THREE.Color(0x22c55e), // Army green
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    })
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle rotation for visual interest
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })
  
  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, -2, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    />
  )
}

export default Terrain