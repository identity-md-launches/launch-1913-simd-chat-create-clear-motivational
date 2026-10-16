import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { phases, totalItems } from '../content/guide'
import { useLocalStorage } from '../hooks/useLocalStorage'

const STORAGE_KEY = 'imd-guide-progress-v1'

export default function Guide() {
  const [active, setActive] = useState(0)
  const [done, setDone] = useLocalStorage<Record<string, boolean>>(STORAGE_KEY, {})
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const doneCount = Object.values(done).filter(Boolean).length
  const percent = Math.round((doneCount / totalItems) * 100)
  const phase = phases[active]

  // Deep links such as #phase-build select the matching tab.
  useEffect(() => {
    const select = () => {
      const match = /^#phase-(\w+)$/.exec(window.location.hash)
      if (!match) return
      const index = phases.findIndex((p) => p.id === match[1])
      if (index >= 0) setActive(index)
    }
    select()
    window.addEventListener('hashchange', select)
    return () => window.removeEventListener('hashchange', select)
  }, [])

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = phases.length - 1
    let next: number | null = null
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = last
    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const toggle = (id: string, checked: boolean) => {
    setDone((prev) => ({ ...prev, [id]: checked }))
  }

  return (
    <section className="section" id="guide" aria-labelledby="guide-title">
      <div className="container">
        <div className="section-head">
          <h2 id="guide-title">The guide, in four phases</h2>
          <p>
            Work through each phase and tick the steps as you go. Progress is saved in this browser only.
          </p>
        </div>

        <div className="progress">
          <span className="progress-count" aria-live="polite">
            {doneCount} of {totalItems} steps done
          </span>
          <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={totalItems} aria-valuenow={doneCount} aria-label="Guide progress">
            <span style={{ width: `${percent}%` }} />
          </div>
          <button type="button" className="button button-secondary button-small" onClick={() => setDone({})} disabled={doneCount === 0}>
            Reset progress
          </button>
        </div>

        <div className="tabs" role="tablist" aria-label="Phases">
          {phases.map((p, index) => (
            <button
              key={p.id}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              type="button"
              role="tab"
              id={`phase-${p.id}`}
              className="tab"
              aria-selected={index === active}
              aria-controls={`panel-${p.id}`}
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onTabKey(event, index)}
            >
              {p.number}. {p.name}
            </button>
          ))}
        </div>

        <div className="tab-panel" role="tabpanel" id={`panel-${phase.id}`} aria-labelledby={`phase-${phase.id}`}>
          <div className="tab-panel-intro">
            <h3>{phase.heading}</h3>
            {phase.summary.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <p className="tip">{phase.tip}</p>
          </div>
          <ul className="checklist" aria-label={`${phase.name} steps`}>
            {phase.items.map((item) => (
              <li key={item.id}>
                <label>
                  <input type="checkbox" checked={Boolean(done[item.id])} onChange={(event) => toggle(item.id, event.target.checked)} />
                  <span>
                    <span className="item-title">{item.title}</span>
                    <span className="item-detail">{item.detail}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
