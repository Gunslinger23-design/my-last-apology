// MiniPlayer.jsx — Barra superior minimizada fija con carátula a la izquierda y slide de tiempo a la derecha
import { useState, useRef } from 'react'

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MiniPlayer({ isPlaying, onToggle, progress, duration, onSeek }) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragVal, setDragVal] = useState(0)

  const currentVal = isDragging ? dragVal : progress
  const progressPct = duration > 0 ? (currentVal / duration) * 100 : 0

  const handleSliderChange = (e) => {
    setDragVal(parseFloat(e.target.value))
  }

  const handleSliderMouseDown = () => {
    setIsDragging(true)
    setDragVal(progress)
  }

  const handleSliderMouseUp = () => {
    setIsDragging(false)
    if (onSeek) onSeek(dragVal)
  }

  return (
    <header className="w-full bg-[#1A0E06]/90 backdrop-blur-md border-b border-moody-amber/20 px-4 py-3 shadow-lg select-none transition-all">
      <div className="max-w-md mx-auto flex items-center gap-3">
        {/* Recuadro de la carátula en la parte superior izquierda */}
        <div className="relative flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-moody-amber/40 shadow-md bg-moody-mid">
          <img
            src="/assets/cover.jpg"
            alt="Mujeres - Silvio Rodríguez"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement.style.background =
                'linear-gradient(135deg, #4A2C11, #C68B2F)'
            }}
          />
          {/* Sutil overlay de brillo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Zona derecha: Título, slide de tiempo interactivo y controles */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="truncate pr-2">
              <h2 className="font-serif text-sm font-medium text-moody-cream tracking-wide truncate">
                Te Doy una Canción
              </h2>
              <p className="font-sans text-[10px] uppercase tracking-wider text-moody-amber/70 truncate">
                Silvio Rodríguez
              </p>
            </div>

            {/* Botón de reproducción pequeño y estilizado */}
            <button
              onClick={onToggle}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-moody-amber text-moody-dark flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow"
              aria-label={isPlaying ? 'Pausar canción' : 'Reproducir canción'}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Slider de tiempo interactivo */}
          <div className="flex items-center gap-2">
            <span className="font-sans text-[10px] text-moody-cream/50 tabular-nums w-7 text-right">
              {formatTime(currentVal)}
            </span>

            <div className="relative flex-1 flex items-center group h-4">
              {/* Barra de progreso visual con gradiente */}
              <div className="w-full h-1 bg-moody-cream/15 rounded-full overflow-hidden pointer-events-none relative">
                <div
                  className="h-full bg-gradient-to-r from-moody-amber to-moody-ocre rounded-full transition-all duration-75"
                  style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
                />
              </div>

              {/* Input range invisible encima para manipular el tiempo */}
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentVal || 0}
                onChange={handleSliderChange}
                onMouseDown={handleSliderMouseDown}
                onMouseUp={handleSliderMouseUp}
                onTouchStart={handleSliderMouseDown}
                onTouchEnd={handleSliderMouseUp}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Progreso de la canción"
              />
            </div>

            <span className="font-sans text-[10px] text-moody-cream/40 tabular-nums w-7">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
