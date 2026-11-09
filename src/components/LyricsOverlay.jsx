// LyricsOverlay.jsx
// Fetches song.lrc, parses it, and displays a 3-line synced view:
//   prev line (dimmed) · active line (bright) · next line (dimmed)

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { parseLrc, getActiveLyricIndex } from '../utils/parseLrc'

export default function LyricsOverlay({ isPlaying, progress }) {
  const [lyrics, setLyrics]           = useState([])
  const [activeIdx, setActiveIdx]     = useState(-1)
  const prevIdxRef                    = useRef(-1)

  // ── Fetch & parse the LRC once ──────────────────────────────────────────────
  useEffect(() => {
    fetch('/assets/song.lrc')
      .then((r) => r.text())
      .then((text) => setLyrics(parseLrc(text)))
      .catch(() => {
        // LRC not found — silent fail, overlay stays hidden
      })
  }, [])

  // ── Track active line from playback progress ────────────────────────────────
  useEffect(() => {
    if (!lyrics.length) return
    const idx = getActiveLyricIndex(lyrics, progress)
    if (idx !== prevIdxRef.current) {
      prevIdxRef.current = idx
      setActiveIdx(idx)
    }
  }, [progress, lyrics])

  // Nothing to show yet
  if (!lyrics.length || activeIdx < 0) return null

  const prevLine   = activeIdx > 0              ? lyrics[activeIdx - 1].text : null
  const activeLine = lyrics[activeIdx].text
  const nextLine   = activeIdx < lyrics.length - 1 ? lyrics[activeIdx + 1].text : null

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Gradient fade from transparent to background */}
      <div
        className="w-full px-6 pt-10 pb-5 flex flex-col items-center gap-1"
        style={{
          background:
            'linear-gradient(to top, rgba(10,5,2,0.97) 0%, rgba(10,5,2,0.75) 65%, transparent 100%)',
        }}
      >
        {/* Previous line */}
        <AnimatePresence mode="popLayout">
          {prevLine && (
            <motion.p
              key={`prev-${activeIdx}`}
              className="font-serif italic text-xs text-moody-cream/25 text-center leading-relaxed tracking-wide w-full"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
            >
              {prevLine}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Active line — highlighted */}
        <AnimatePresence mode="popLayout">
          <motion.p
            key={`active-${activeIdx}`}
            className="font-serif italic text-sm text-moody-amber/90 text-center leading-relaxed tracking-wide w-full"
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ textShadow: '0 0 20px rgba(198,139,47,0.4)' }}
          >
            {activeLine}
          </motion.p>
        </AnimatePresence>

        {/* Next line */}
        <AnimatePresence mode="popLayout">
          {nextLine && (
            <motion.p
              key={`next-${activeIdx}`}
              className="font-serif italic text-xs text-moody-cream/20 text-center leading-relaxed tracking-wide w-full"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
            >
              {nextLine}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
