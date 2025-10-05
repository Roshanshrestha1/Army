import React from 'react'
import { motion } from 'framer-motion'
import JourneyMapView from '../3D/JourneyMap3D'

function HomeView() {
  return (
    <div className="h-screen w-full relative">
      {/* 3D Journey Map */}
      <JourneyMapView />
    </div>
  )
}

export default HomeView