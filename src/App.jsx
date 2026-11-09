import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import HeroSection from './components/HeroSection'
import LetterSection from './components/LetterSection'
import LyricsOverlay from './components/LyricsOverlay'
import BotanicalBackground from './components/BotanicalBackground'

// ─── Audio hook ──────────────────────────────────────────────────────────────
function useAudio(src) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying]   = useState(false)
  const [isLoaded,  setIsLoaded]    = useState(false)
  const [progress,  setProgress]    = useState(0)
  const [duration,  setDuration]    = useState(0)
  const rafRef = useRef(null)

  // Initialize audio element lazily
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src)
      audioRef.current.loop = false
      audioRef.current.preload = 'metadata'
    }
    return audioRef.current
  }, [src])

  const updateProgress = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setProgress(audio.currentTime)
    if (!audio.paused) {
      rafRef.current = requestAnimationFrame(updateProgress)
    }
  }, [])

  const play = useCallback(async () => {
    const audio = getAudio()
    try {
      await audio.play()
      setIsPlaying(true)
      rafRef.current = requestAnimationFrame(updateProgress)
    } catch (err) {
      console.warn('Audio play failed:', err)
    }
  }, [getAudio, updateProgress])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
    cancelAnimationFrame(rafRef.current)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  // Set up metadata / ended listeners once
  useEffect(() => {
    const audio = getAudio()

    const onLoaded = () => {
      setIsLoaded(true)
      setDuration(audio.duration)
    }
    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      cancelAnimationFrame(rafRef.current)
    }

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended', onEnded)
      cancelAnimationFrame(rafRef.current)
    }
  }, [getAudio])

  return { isPlaying, isLoaded, progress, duration, play, pause, toggle }
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [started,    setStarted]    = useState(false)
  const [heroOpacity, setHeroOpacity] = useState(1)
  const containerRef = useRef(null)

  const audio = useAudio('/assets/song.mp3')

  // Handle the initial "start" interaction (also unlocks AudioContext)
  const handleStart = useCallback(async () => {
    setStarted(true)
    await audio.play()
  }, [audio])

  // Fade hero as user scrolls
  useEffect(() => {
    if (!started) return
    const container = containerRef.current
    if (!container) return

    const onScroll = () => {
      const scrollY = container.scrollTop
      const windowH = window.innerHeight
      const opacity = Math.max(0, 1 - scrollY / (windowH * 0.6))
      setHeroOpacity(opacity)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [started])

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden bg-moody-dark"
      style={{ maxWidth: '100vw' }}
    >
      {/* Botanical background — always present, fixed */}
      <BotanicalBackground />

      {/* Persistent vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(10,5,2,0.7) 100%)',
        }}
      />

      {/* Hero — fixed while not scrolled, then becomes sticky */}
      <div
        className="fixed inset-0 z-20 flex flex-col items-center justify-center"
        style={{ opacity: heroOpacity, transition: 'opacity 0.1s linear' }}
      >
        <HeroSection
          started={started}
          onStart={handleStart}
          isPlaying={audio.isPlaying}
          onToggle={audio.toggle}
          progress={audio.progress}
          duration={audio.duration}
        />
      </div>

      {/* Spacer so scroll begins after hero */}
      <div className="h-screen" />

      {/* Letter scrollytelling */}
      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="relative z-30 pb-32"
          >
            <LetterSection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lyrics overlay — bottom fixed banner */}
      <AnimatePresence>
        {started && (
          <LyricsOverlay
            isPlaying={audio.isPlaying}
            progress={audio.progress}
            duration={audio.duration}
          />
        )}
      </AnimatePresence>

      {/* Floating mini-player (visible after scroll starts) */}
      <AnimatePresence>
        {started && heroOpacity < 0.5 && (
          <motion.button
            key="miniplayer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            onClick={audio.toggle}
            className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-moody-amber/90 flex items-center justify-center shadow-lg box-glow-sm"
            aria-label={audio.isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {audio.isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-moody-dark">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-moody-dark">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}
