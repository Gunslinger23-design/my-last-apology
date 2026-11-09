// HeroSection.jsx
// The initial full-screen hero with vinyl record player aesthetic.
// The "Iniciar" button is the AudioContext unlock gate.

import { motion, AnimatePresence } from 'framer-motion'

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function HeroSection({
  started,
  onStart,
  isPlaying,
  onToggle,
  progress,
  duration,
}) {
  const progressPct = duration ? (progress / duration) * 100 : 0

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 select-none">

      {/* Album art — static square with rounded corners */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        {/* Ambient glow behind the cover */}
        <div
          className="absolute -inset-4 rounded-2xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(198,139,47,0.18) 0%, transparent 70%)',
            filter: 'blur(12px)',
            zIndex: 0,
          }}
        />

        {/* Album cover — square with rounded corners */}
        <div
          className="relative w-64 h-64 rounded-2xl overflow-hidden border border-moody-amber/30 box-glow-amber"
          style={{ zIndex: 1 }}
        >
          <img
            src="/assets/cover.jpg"
            alt="Mujeres – Silvio Rodríguez"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement.style.background =
                'linear-gradient(135deg, #4A2C11 0%, #C68B2F 50%, #6B1A2A 100%)'
            }}
          />
          {/* Subtle inner vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent 60%, rgba(10,5,2,0.5) 100%)',
            }}
          />
        </div>
      </motion.div>

      {/* Song info */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <h1 className="font-serif text-3xl font-light tracking-wide text-moody-cream text-shadow-glow leading-tight">
          Te Doy una Canción
        </h1>
        <p className="font-sans text-sm font-light tracking-widest text-moody-amber/80 mt-1 uppercase">
          Silvio Rodríguez
        </p>
        <p className="font-sans text-xs text-moody-cream/40 mt-1 tracking-wider">
          Álbum: Mujeres · 1978
        </p>
      </motion.div>

      {/* Controls / Start button */}
      <AnimatePresence mode="wait">
        {!started ? (
          /* ── Initial start prompt ── */
          <motion.div
            key="start"
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={onStart}
              className="relative group px-10 py-3 rounded-full border border-moody-amber/60 bg-moody-amber/10 font-sans text-sm tracking-widest text-moody-amber uppercase overflow-hidden"
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* shimmer */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(198,139,47,0.15), transparent)',
                }}
              />
              <span className="relative z-10">Toca para comenzar</span>
            </motion.button>

            {/* Animated scroll arrow */}
            <motion.div
              className="text-moody-amber/50 mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-6 h-6"
              >
                <path
                  d="M12 5v14M6 13l6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        ) : (
          /* ── Active player controls ── */
          <motion.div
            key="player"
            className="w-full max-w-xs flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Progress bar */}
            <div className="w-full h-0.5 bg-moody-cream/10 rounded-full relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-moody-amber rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Times */}
            <div className="w-full flex justify-between font-sans text-xs text-moody-cream/40">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Play/Pause */}
            <motion.button
              onClick={onToggle}
              className="w-14 h-14 rounded-full bg-moody-amber/90 flex items-center justify-center box-glow-sm"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.06 }}
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-moody-dark">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-moody-dark ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>

            {/* Scroll hint */}
            <motion.p
              className="font-sans text-xs text-moody-cream/30 tracking-wider mt-1"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ↓ desliza para leer
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
