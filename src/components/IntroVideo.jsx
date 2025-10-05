import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react'

const IntroVideo = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = React.useRef(null)

  // Sample video URL - you can replace this with your actual intro video
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setProgress((video.currentTime / video.duration) * 100)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onComplete()
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [onComplete])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!document.fullscreenElement) {
      video.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleProgressClick = (e) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * video.duration
    video.currentTime = newTime
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const skipIntro = () => {
    onComplete()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Container */}
        <div className="relative w-full h-full max-w-6xl mx-auto">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/api/placeholder/1920/1080"
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading intro video...</p>
              </div>
            </div>
          )}

          {/* Skip Button */}
          <button
            onClick={skipIntro}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Skip Intro
          </button>

          {/* Controls Overlay */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6"
              >
                {/* Progress Bar */}
                <div className="mb-4">
                  <div
                    className="w-full h-1 bg-gray-600 rounded-full cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-red-600 rounded-full transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      {isMuted ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </button>

                    <div className="text-sm">
                      {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={toggleFullscreen}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <Maximize2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Intro Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-center text-white"
            >
              <h1 className="text-6xl font-bold mb-4 text-shadow-lg">
                Gurkha Preparation Tracker
              </h1>
              <p className="text-xl text-gray-300 text-shadow">
                Your Journey to Excellence Begins Here
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default IntroVideo