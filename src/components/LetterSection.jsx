// LetterSection.jsx — Carta de disculpa interactiva con scrollytelling y 11 bloques emocionales
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const BLOCKS = [
  {
    id: 'b1',
    type: 'opening',
    content: [
      'Todo el día me la pasé pensando, buscando la forma exacta de pedirte perdón.',
    ],
  },
  {
    id: 'b2',
    type: 'flowers',
    content: [
      'Pensé en buscar las flores más raras, como una peonía, lavanda francesa o jacintos acuáticos. Pensaba regalarte un bouquet sobre colores púrpuras, y explicarte por qué que la gente daba la vida por ellos.',
      'Busqué algo tangible que pudieras sostener en tus manos, como una disculpa.',
    ],
  },
  {
    id: 'b3',
    type: 'realization',
    content: [
      'Pero ninguna flor encaja. Ninguna me parece suficiente.',
    ],
  },
  {
    id: 'b4',
    type: 'deep',
    content: [
      'Me di cuenta de que no existe nada físico en este mundo que pueda demostrarte el peso de mi arrepentimiento, ni el tamaño del aprecio que te tengo.',
    ],
  },
  {
    id: 'b5',
    type: 'time',
    content: [
      'No después de tanto tiempo de conocerte.',
      'Lo que hay entre nosotros y lo que significas para mí no se puede resumir, ni arreglar, con algo tan simple.',
    ],
  },
  {
    id: 'b6',
    type: 'apology',
    content: [
      'Lamento mucho mi torpeza. Lamento haberte hecho sentir así y no haber sido el refugio que necesitabas en ese momento.',
    ],
  },
  {
    id: 'b7',
    type: 'bridge',
    content: [
      'Tengo muy claro que la huella que has dejado en mí es absoluta, y a partir de aquí solo tiene dos destinos posibles...',
    ],
  },
  {
    id: 'b8',
    type: 'path-pain',
    content: [
      'O termina convirtiéndose en una cicatriz profunda que llevaré con dolor...',
    ],
  },
  {
    id: 'b9',
    type: 'path-stay',
    content: [
      'O se queda pegada a mí para siempre.',
    ],
  },
  {
    id: 'b10',
    type: 'gift',
    content: [
      'No encontré flores a tu altura, así que te construí esto.',
      'Te doy esta canción, y te pido perdón.',
    ],
  },
  {
    id: 'b11',
    type: 'final',
    isSpecialEnding: true,
    content: [
      'Porque no quiero "cuidarme mucho".',
      'Quiero que te quedes.',
    ],
  },
]

function LetterBlock({ block, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: '-10% 0px -10% 0px',
  })

  // Estilos según el tipo de bloque
  const isFinal = block.isSpecialEnding
  const isApology = block.type === 'apology'
  const isGift = block.type === 'gift'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 20 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative max-w-sm sm:max-w-md mx-auto px-6 text-center select-text transition-all duration-700 ${
        isFinal
          ? 'mt-44 mb-32 pt-12 border-t border-moody-amber/20'
          : 'my-20 sm:my-24'
      }`}
    >
      {/* Detalle floral sutil en el bloque de las flores */}
      {block.type === 'flowers' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.6, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center mb-6"
        >
          <svg viewBox="0 0 100 40" className="w-16 h-8 text-moody-amber/50 fill-current opacity-70">
            <path d="M50 20 Q40 5 25 15 Q35 25 50 20 Q65 25 75 15 Q60 5 50 20 Z" />
            <circle cx="50" cy="20" r="2.5" className="text-moody-ocre" />
          </svg>
        </motion.div>
      )}

      {/* Separador tenue en momentos reflexivos */}
      {(isApology || isGift) && (
        <div className="flex items-center justify-center gap-3 mb-6 opacity-40">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-moody-amber" />
          <span className="text-xs text-moody-amber font-serif">✦</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-moody-amber" />
        </div>
      )}

      {/* Contenido de párrafos dentro del bloque */}
      <div className="space-y-4">
        {block.content.map((paragraph, pIdx) => {
          let styleClasses = 'font-serif text-moody-cream/90 leading-relaxed text-shadow-soft '

          if (isFinal) {
            styleClasses += pIdx === 0
              ? 'text-xl sm:text-2xl italic text-moody-amber/80 font-light'
              : 'text-2xl sm:text-3xl font-medium text-moody-cream tracking-wide mt-2'
          } else if (isApology) {
            styleClasses += 'text-xl sm:text-2xl font-light text-moody-cream text-shadow-glow'
          } else if (isGift) {
            styleClasses += pIdx === 1
              ? 'text-xl sm:text-2xl font-medium text-moody-ocre italic'
              : 'text-lg sm:text-xl text-moody-cream/80'
          } else if (block.type === 'opening') {
            styleClasses += 'text-xl sm:text-2xl font-light text-moody-amber/95 italic'
          } else if (block.type === 'path-pain') {
            styleClasses += 'text-lg sm:text-xl font-light italic text-moody-cream/70'
          } else if (block.type === 'path-stay') {
            styleClasses += 'text-xl sm:text-2xl font-medium text-moody-ocre'
          } else {
            styleClasses += 'text-lg sm:text-xl font-light text-moody-cream/85'
          }

          return (
            <p key={pIdx} className={styleClasses}>
              {paragraph}
            </p>
          )
        })}
      </div>

      {/* Marca final del último bloque */}
      {isFinal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-8 flex justify-center items-center gap-2 text-moody-amber/50"
        >
          <span className="text-sm font-serif">❦</span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function LetterSection() {
  return (
    <div className="w-full relative px-2">
      {BLOCKS.map((block, index) => (
        <LetterBlock key={block.id} block={block} index={index} />
      ))}
    </div>
  )
}
