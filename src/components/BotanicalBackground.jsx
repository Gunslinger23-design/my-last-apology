// BotanicalBackground.jsx
// Renders fixed SVG botanical elements + gradient that fill the screen behind everything.

export default function BotanicalBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, #1A0E06 0%, #2E1A0A 40%, #1A0E06 70%, #0D0704 100%)',
        }}
      />

      {/* Top-left large botanical bloom */}
      <svg
        className="absolute -top-16 -left-20 w-72 h-72 opacity-[0.07]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="80" fill="#C68B2F" />
        {[...Array(12)].map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="80"
            rx="22"
            ry="55"
            fill="#D4A843"
            transform={`rotate(${i * 30} 200 200)`}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={i + 20}
            cx="200"
            cy="110"
            rx="14"
            ry="38"
            fill="#5C6B2F"
            transform={`rotate(${i * 45 + 22} 200 200)`}
          />
        ))}
      </svg>

      {/* Top-right trailing vine */}
      <svg
        className="absolute -top-10 -right-10 w-64 h-80 opacity-[0.06]"
        viewBox="0 0 300 400"
        fill="none"
      >
        <path
          d="M280 10 Q240 80 260 150 Q280 220 240 300 Q200 380 220 420"
          stroke="#7A8C40"
          strokeWidth="6"
          fill="none"
        />
        {[0, 60, 130, 200, 290].map((y, i) => (
          <ellipse
            key={i}
            cx={i % 2 === 0 ? 220 : 270}
            cy={y + 40}
            rx="30"
            ry="16"
            fill="#5C6B2F"
            transform={`rotate(${i % 2 === 0 ? -20 : 20} ${i % 2 === 0 ? 220 : 270} ${y + 40})`}
          />
        ))}
      </svg>

      {/* Bottom-right large rose */}
      <svg
        className="absolute -bottom-20 -right-16 w-80 h-80 opacity-[0.08]"
        viewBox="0 0 400 400"
        fill="none"
      >
        {[...Array(5)].map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="140"
            rx="50"
            ry="90"
            fill="#6B1A2A"
            transform={`rotate(${i * 72} 200 200)`}
            opacity={0.6 + i * 0.08}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <ellipse
            key={i + 10}
            cx="200"
            cy="160"
            rx="35"
            ry="65"
            fill="#8B2235"
            transform={`rotate(${i * 72 + 36} 200 200)`}
          />
        ))}
        <circle cx="200" cy="200" r="30" fill="#4A0E18" />
      </svg>

      {/* Bottom-left fern */}
      <svg
        className="absolute bottom-20 -left-10 w-56 h-72 opacity-[0.06]"
        viewBox="0 0 300 400"
        fill="none"
      >
        <path d="M150 400 Q150 200 150 10" stroke="#5C6B2F" strokeWidth="5" fill="none" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i}>
            <path
              d={`M150 ${380 - i * 50} Q${150 - 60 + i * 5} ${360 - i * 50} ${80 - i * 8} ${340 - i * 50}`}
              stroke="#7A8C40"
              strokeWidth="3"
              fill="none"
            />
            <path
              d={`M150 ${380 - i * 50} Q${150 + 60 - i * 5} ${360 - i * 50} ${220 + i * 8} ${340 - i * 50}`}
              stroke="#7A8C40"
              strokeWidth="3"
              fill="none"
            />
          </g>
        ))}
      </svg>

      {/* Center-right mid-screen small flower cluster */}
      <svg
        className="absolute top-1/2 -right-8 w-40 h-40 opacity-[0.05]"
        viewBox="0 0 200 200"
        fill="none"
      >
        {[...Array(6)].map((_, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="50"
            rx="18"
            ry="38"
            fill="#C68B2F"
            transform={`rotate(${i * 60} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="20" fill="#D4A843" />
      </svg>

      {/* Noise grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  )
}
