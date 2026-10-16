import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CELLS = 9
const ROUND_SECONDS = 20
const BEST_KEY = 'imd-swarm-catch-best-v1'

type Phase = 'idle' | 'running' | 'over'

function nextCell(current: number): number {
  let next = Math.floor(Math.random() * CELLS)
  if (next === current) next = (next + 1 + Math.floor(Math.random() * (CELLS - 1))) % CELLS
  return next
}

export default function SwarmCatch() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [active, setActive] = useState(-1)
  const [best, setBest] = useLocalStorage<number>(BEST_KEY, 0)
  const [result, setResult] = useState('')
  const moveTimer = useRef<number | null>(null)
  const scoreRef = useRef(0)

  const clearMove = () => {
    if (moveTimer.current !== null) {
      window.clearTimeout(moveTimer.current)
      moveTimer.current = null
    }
  }

  // The active task moves on its own; the interval shortens as the score grows.
  const scheduleMove = (from: number) => {
    clearMove()
    const delay = Math.max(450, 900 - scoreRef.current * 25)
    moveTimer.current = window.setTimeout(() => {
      const to = nextCell(from)
      setActive(to)
      scheduleMove(to)
    }, delay)
  }

  const start = () => {
    scoreRef.current = 0
    setScore(0)
    setTimeLeft(ROUND_SECONDS)
    setResult('')
    const first = Math.floor(Math.random() * CELLS)
    setActive(first)
    setPhase('running')
    scheduleMove(first)
  }

  const stop = (finalScore: number) => {
    clearMove()
    setActive(-1)
    setPhase('over')
    const newBest = Math.max(best, finalScore)
    setBest(newBest)
    if (finalScore === 0) {
      setResult('Round over. No tasks accepted. Try again.')
      return
    }
    const tasks = `${finalScore} task${finalScore === 1 ? '' : 's'} accepted.`
    setResult(finalScore > best ? `Round over. ${tasks} New best for this browser.` : `Round over. ${tasks} Best so far: ${newBest}.`)
  }

  useEffect(() => {
    if (phase !== 'running') return
    const id = window.setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)
    return () => window.clearInterval(id)
  }, [phase])

  useEffect(() => {
    if (phase === 'running' && timeLeft <= 0) stop(scoreRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase])

  useEffect(() => clearMove, [])

  const accept = (cell: number) => {
    if (phase !== 'running' || cell !== active) return
    scoreRef.current += 1
    setScore(scoreRef.current)
    const to = nextCell(cell)
    setActive(to)
    scheduleMove(to)
  }

  return (
    <div className="game">
      <div className="game-bar">
        <span className="stat">Score {score}</span>
        <span className="stat">Time {timeLeft}s</span>
        <span className="stat">Best {best}</span>
        {phase === 'running' ? (
          <button type="button" className="button button-secondary button-small" onClick={() => stop(scoreRef.current)}>
            End round
          </button>
        ) : (
          <button type="button" className="button button-primary button-small" onClick={start}>
            {phase === 'idle' ? 'Start round' : 'Play again'}
          </button>
        )}
      </div>
      <div className="game-board" role="group" aria-label="Swarm Catch board">
        {Array.from({ length: CELLS }, (_, i) => (
          <button
            key={i}
            type="button"
            className="cell"
            data-active={i === active}
            aria-label={i === active ? `Cell ${i + 1}, task waiting. Accept it.` : `Cell ${i + 1}, empty`}
            onClick={() => accept(i)}
            disabled={phase !== 'running'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="M7.5 12.5l3 3 6-7" fill="none" stroke="#fff8f0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
      <p className="game-help">Tap the cell with the task before it moves. Each accepted task scores one point.</p>
      <p className="game-result" role="status">
        {result}
      </p>
    </div>
  )
}
