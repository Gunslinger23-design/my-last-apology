// LetterSection.jsx
// The scrollytelling apology letter.
// Each paragraph fades in and slides up when it enters the viewport.

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ── Letter paragraphs ─────────────────────────────────────────────────────────
const PARAGRAPHS = [
  {
    id: 'p1',
    type: 'opening',
    text: 'Iba a contarte una historia épica e inventada...',
    italic: true,
  },
  {
    id: 'p2',
    type: 'body',
    text: 'Iba a decirte que en la Edad Media la gente moría por obtener el color púrpura, solo para decirte que yo también lo haría por ti.',
  },
  {
    id: 'p3',
    type: 'pivot',
    text: 'Pero la verdad es que hoy no necesitas a alguien que muera por ti.',
    italic: true,
  },
  {
    id: 'p4',
    type: 'body',
    text: 'Necesitas a alguien que sepa cuidarte y apoyarte en este mal momento.',
  },
  {
    id: 'p5',
    type: 'botanical',
    text: 'Históricamente, el jacinto morado significaba «perdóname».',
    decoration: 'hyacinth',
  },
  {
    id: 'p6',
    type: 'apology',
    text: 'Lamento mi torpeza. Vales demasiado para mí.',
    italic: true,
  },
  {
    id: 'p7',
    type: 'closing',
    text: 'Y quiero estar a la altura de lo que mereces.',
  },
]

// ── Single animated paragraph ─────────────────────────────────────────────────
function LetterParagraph({ paragraph, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-15% 0px -15% 0px',
  })

  const delay = 0.1

  const baseClasses = 'font-serif leading-relaxed text-moody-cream/90 text-shadow-soft'

  const sizeClass =
    paragraph.type === 'opening'  ? 'text-2xl sm:text-3xl font-light'    :
    paragraph.type === 'pivot'    ? 'text-xl sm:text-2xl font-light'      :
    paragraph.type === 'apology'  ? 'text-2xl sm:text-3xl font-medium'    :
    paragraph.type === 'closing'  ? 'text-2xl sm:text-3xl font-light'     :
    paragraph.type === 'botanical'? 'text-lg sm:text-xl font-light'       :
                                    'text-xl sm:text-2xl font-light'

  const colorClass =
    paragraph.type === 'pivot'    ? 'text-moody-amber/90'  :
    paragraph.type === 'apology'  ? 'text-moody-cream'     :
    paragraph.type === 'closing'  ? 'text-moody-ocre/90'   :
    paragraph.type === 'botanical'? 'text-moody-olive-l/90':
                                    'text-moody-cream/80'

  return (
    <motion.div
      ref={ref}
      className="mb-16 px-6 max-w-sm mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 1.0,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* Optional botanical accent above certain paragraphs */}
      {paragraph.type === 'botanical' && (
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        >
          <HyacinthSVG />
        </motion.div>
      )}

      {/* Decorative rule for pivot / apology */}
      {(paragraph.type === 'pivot' || paragraph.type === 'opening') && (
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.1 }}
          style={{ originX: 0 }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-moody-amber/40" />
          <div className="w-1 h-1 rounded-full bg-moody-amber/60" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-moody-amber/40" />
        </motion.div>
      )}

      <p
        className={`${baseClasses} ${sizeClass} ${colorClass} ${
          paragraph.italic ? 'italic' : ''
        }`}
      >
        {paragraph.text}
      </p>

      {/* Closing flourish */}
      {paragraph.type === 'closing' && (
        <motion.div
          className="flex justify-center mt-8 gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.5 }}
        >
          <span className="text-moody-amber/50 text-2xl">✦</span>
          <span className="text-moody-amber/30 text-2xl">✦</span>
          <span className="text-moody-amber/50 text-2xl">✦</span>
        </motion.div>
      )}
    </motion.div>
  )
}

// ── Hyacinth SVG accent ───────────────────────────────────────────────────────
function HyacinthSVG() {
  return (
    <svg
      viewBox="0 0 120 140"
      className="w-20 h-24 opacity-70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <path d="M60 130 Q58 90 60 60" stroke="#5C6B2F" strokeWidth="2.5" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M60 100 Q40 85 25 90" stroke="#7A8C40" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M60 110 Q80 95 95 100" stroke="#7A8C40" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Florets cluster */}
      {[
        [60, 55], [50, 65], [70, 65],
        [45, 50], [75, 50], [55, 42], [65, 42],
        [52, 72], [68, 72], [60, 30],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="7" fill="#6B1A80" opacity={0.5 + (i % 3) * 0.15} />
          <circle cx={cx} cy={cy} r="4" fill="#9B4DCA" opacity={0.7} />
          <circle cx={cx} cy={cy} r="2" fill="#E8D5F5" opacity={0.9} />
        </g>
      ))}
    </svg>
  )
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="text-center pt-20 pb-12 px-6"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.4 }}
    >
      {/* Thin horizontal ornament */}
      <div className="flex items-center gap-4 justify-center mb-6">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-moody-amber/50" />
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-moody-amber/60" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
        </svg>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-moody-amber/50" />
      </div>
    </motion.div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function LetterSection() {
  return (
    <section className="min-h-screen">
      <SectionHeader />
      {PARAGRAPHS.map((p, i) => (
        <LetterParagraph key={p.id} paragraph={p} index={i} />
      ))}
    </section>
  )
}
