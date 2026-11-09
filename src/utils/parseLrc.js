// utils/parseLrc.js
// Parses a standard .lrc string into an array of { time, text } objects.
// time = seconds (float), text = lyric line string.

export function parseLrc(lrcString) {
  const lineRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/
  const lines = lrcString.split('\n')
  const result = []

  for (const raw of lines) {
    const match = raw.trim().match(lineRegex)
    if (!match) continue

    const minutes     = parseInt(match[1], 10)
    const seconds     = parseInt(match[2], 10)
    // support both 2-digit centiseconds and 3-digit milliseconds
    const subsRaw     = match[3]
    const subs        = subsRaw.length === 3
      ? parseInt(subsRaw, 10) / 1000
      : parseInt(subsRaw, 10) / 100
    const text        = match[4].trim()

    const time = minutes * 60 + seconds + subs

    // Skip empty-text lines (end markers)
    if (text) {
      result.push({ time, text })
    }
  }

  // Ensure chronological order
  return result.sort((a, b) => a.time - b.time)
}

// Given a sorted lyrics array and a current playback time,
// returns the index of the active lyric line.
export function getActiveLyricIndex(lyrics, currentTime) {
  let active = -1
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) {
      active = i
    } else {
      break
    }
  }
  return active
}
