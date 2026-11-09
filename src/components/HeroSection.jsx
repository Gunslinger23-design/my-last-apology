// HeroSection.jsx — full-screen initial screen, only the start gate
import { motion } from 'framer-motion'

export default function HeroSection({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 select-none gap-10">

      {/* Album art — static square, rounded corners */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute -inset-6 rounded-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(198,139,47,0.2) 0%, transparent 70%)',
            filter: 'blur(16px)',
          }}
        />
        {/* Cover */}
        <div className="relative w-64 h-64 rounded-2xl overflow-hidden border border-moody-amber/25 box-glow-amber">
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
          {/* Inner bottom vignette */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 55%, rgba(10,5,2,0.55) 100%)' }}
          />
        </div>
      </motion.div>

      {/* Song info */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.25 }}
      >
        <h1 className="font-serif text-3xl font-light tracking-wide text-moody-cream text-shadow-glow">
          Te Doy una Canción
        </h1>
        <p className="font-sans text-xs font-light tracking-widest text-moody-amber/70 mt-1 uppercase">
          Silvio Rodríguez · Mujeres · 1978
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.5 }}
      >
        <motion.button
          onClick={onStart}
          className="relative group px-10 py-3 rounded-full border border-moody-amber/50 bg-moody-amber/10 font-sans text-sm tracking-widest text-moody-amber uppercase overflow-hidden"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(198,139,47,0.12), transparent)' }}
          />
          <span className="relative z-10">Comenzar</span>
        </motion.button>

        <motion.div
          className="text-moody-amber/40"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
