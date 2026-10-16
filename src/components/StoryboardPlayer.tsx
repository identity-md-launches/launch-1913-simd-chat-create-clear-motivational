import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { videoExample } from '../content/examples'

const INTERVAL_MS = 2500

function Frame({ index }: { index: number }) {
  // Five simple scenes drawn with the site's own colours.
  const ink = '#1b1b1f'
  const accent = '#c4400c'
  const paper = '#fff8f0'
  const tint = '#ffd9c7'
  return (
    <svg viewBox="0 0 480 270" aria-hidden="true" focusable="false">
      <rect width="480" height="270" fill={tint} />
      {index === 0 && (
        <g>
          <rect x="120" y="50" width="240" height="170" rx="12" fill={paper} stroke={ink} strokeWidth="3" />
          <path d="M150 90h180M150 115h140M150 140h180M150 165h100" stroke={ink} strokeWidth="4" strokeLinecap="round" />
          <circle cx="340" cy="180" r="22" fill={accent} />
          <path d="M330 180l7 7 14-14" fill="none" stroke={paper} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {index === 1 && (
        <g>
          <rect x="60" y="60" width="200" height="150" rx="12" fill={paper} stroke={ink} strokeWidth="3" />
          <path d="M85 95h150M85 120h110M85 145h150M85 170h80" stroke={ink} strokeWidth="4" strokeLinecap="round" />
          <circle cx="360" cy="130" r="48" fill={ink} />
          <path d="M340 120a20 20 0 0140 0v12a20 20 0 01-40 0z" fill={paper} />
          <path d="M330 150c8 18 52 18 60 0" fill="none" stroke={paper} strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {index === 2 && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${50 + i * 135} 70)`}>
              <rect width="110" height="70" rx="8" fill={paper} stroke={ink} strokeWidth="3" />
              <rect x="12" y="12" width="86" height="46" rx="4" fill={i === 1 ? accent : tint} />
              <path d="M10 95h90M10 115h60" stroke={ink} strokeWidth="4" strokeLinecap="round" />
            </g>
          ))}
          <path d="M160 105h25M295 105h25" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {index === 3 && (
        <g>
          <rect x="70" y="45" width="340" height="180" rx="12" fill={ink} />
          <circle cx="170" cy="130" r="40" fill={accent} />
          <path d="M100 200c50-60 110-60 160 0" fill="none" stroke={paper} strokeWidth="6" strokeLinecap="round" />
          <rect x="290" y="80" width="90" height="16" rx="8" fill={paper} />
          <rect x="290" y="110" width="60" height="16" rx="8" fill={tint} />
          <circle cx="380" cy="200" r="14" fill={paper} />
          <path d="M374 200l4 4 8-8" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {index === 4 && (
        <g>
          <rect x="40" y="110" width="400" height="50" rx="8" fill={paper} stroke={ink} strokeWidth="3" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={52 + i * 78} y="120" width="66" height="30" rx="4" fill={i % 2 ? tint : accent} />
          ))}
          <path d="M240 60v40" stroke={ink} strokeWidth="4" strokeLinecap="round" />
          <path d="M228 72l12-16 12 16" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="240" cy="210" r="22" fill={accent} />
          <path d="M233 202l16 8-16 8z" fill={paper} />
        </g>
      )}
    </svg>
  )
}

export default function StoryboardPlayer() {
  const frames = videoExample.frames
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setIndex((i) => {
        if (i === frames.length - 1) {
          setPlaying(false)
          return i
        }
        return i + 1
      })
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [playing, frames.length])

  const frame = frames[index]
  const atEnd = index === frames.length - 1

  return (
    <figure>
      <div className="storyboard">
        <Frame index={index} />
      </div>
      <figcaption className="storyboard-caption" aria-live={reduced ? 'off' : 'polite'}>
        <strong>
          {index + 1}. {frame.title}
        </strong>
        <span>{frame.caption}</span>
      </figcaption>
      <div className="storyboard-controls">
        <button type="button" className="button button-secondary button-small" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
          Previous
        </button>
        <button type="button" className="button button-secondary button-small" onClick={() => setIndex((i) => Math.min(frames.length - 1, i + 1))} disabled={atEnd}>
          Next
        </button>
        <button
          type="button"
          className="button button-primary button-small"
          aria-pressed={playing}
          onClick={() => {
            if (playing) {
              setPlaying(false)
              return
            }
            if (atEnd) setIndex(0)
            setPlaying(true)
          }}
        >
          {playing ? 'Pause' : atEnd ? 'Play again' : 'Play storyboard'}
        </button>
        <span className="frame-count">
          Frame {index + 1} of {frames.length}
        </span>
      </div>
    </figure>
  )
}
