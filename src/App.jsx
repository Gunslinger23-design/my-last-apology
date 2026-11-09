import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection      from './components/HeroSection'
import MiniPlayer       from './components/MiniPlayer'
import LetterSection    from './components/LetterSection'
import BotanicalBackground from './components/BotanicalBackground'

// ─── Audio hook ───────────────────────────────────────────────────────────────
function useAudio(src) {
  const audioRef  = useRef(null)
  const rafRef    = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress,  setProgress]  = useState(0)
  const [duration,  setDuration]  = useState(0)

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current        = new Audio(src)
      audioRef.current.preload = 'metadata'
    }
    return audioRef.current
  }, [src])

  const tick = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    setProgress(a.currentTime)
    if (!a.paused) rafRef.current = requestAnimationFrame(tick)
  }, [])

  const play = useCallback(async () => {
    const a = getAudio()
    try {
      await a.play()
      setIsPlaying(true)
      rafRef.current = requestAnimationFrame(tick)
    } catch (e) { console.warn('Audio play failed:', e) }
  }, [getAudio, tick])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
    cancelAnimationFrame(rafRef.current)
  }, [])

  const toggle = useCallback(() => {
    isPlaying ? pause() : play()
  }, [isPlaying, play, pause])

  const seek = useCallback((time) => {
    const a = audioRef.current
    if (!a) return
    a.currentTime = time
    setProgress(time)
  }, [])

  useEffect(() => {
    const a = getAudio()
    const onMeta  = () => setDuration(a.duration)
    const onEnded = () => { setIsPlaying(false); setProgress(0); cancelAnimationFrame(rafRef.current) }
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('ended', onEnded)
    return () => {
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('ended', onEnded)
      cancelAnimationFrame(rafRef.current)
    }
  }, [getAudio])

  return { isPlaying, progress, duration, play, pause, toggle, seek }
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [started, setStarted] = useState(false)
  const audio = useAudio('/assets/song.mp3')

  const handleStart = useCallback(async () => {
    setStarted(true)
    await audio.play()
  }, [audio])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-moody-dark">
      <BotanicalBackground />

      {/* Global vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,5,2,0.65) 100%)' }}
      />

      {/* ── HERO (before start) ── */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="hero"
            className="fixed inset-0 z-30 flex items-center justify-center"
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.6, ease: 'easeIn' } }}
          >
            <HeroSection onStart={handleStart} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN VIEW (after start) ── */}
      <AnimatePresence>
        {started && (
          <>
            {/* Mini player — fixed top bar */}
            <motion.div
              key="miniplayer"
              className="fixed top-0 left-0 right-0 z-50"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0,    opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            >
              <MiniPlayer
                isPlaying={audio.isPlaying}
                onToggle={audio.toggle}
                progress={audio.progress}
                duration={audio.duration}
                onSeek={audio.seek}
              />
            </motion.div>

            {/* Scrollable letter — full viewport, masked at top so it fades before touching player */}
            <motion.div
              key="letter"
              className="fixed inset-0 z-20 overflow-y-auto overflow-x-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                // Top mask fades out 74px (miniplayer margin) to 135px (full visibility)
                maskImage:
                  'linear-gradient(to bottom, transparent 0px, transparent 74px, black 135px, black calc(100% - 24px), transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0px, transparent 74px, black 135px, black calc(100% - 24px), transparent 100%)',
              }}
            >
              {/* Espacio inicial para que el primer bloque empiece debajo del reproductor */}
              <div className="h-32" />
              <LetterSection />
              {/* Espacio inferior de desahogo al final de la lectura */}
              <div className="h-20" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
