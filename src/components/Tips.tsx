import type { ReactElement } from 'react'
import { tips, type Tip } from '../content/tips'

const icons: Record<Tip['icon'], ReactElement> = {
  target: <path d="M12 2v4M12 18v4M2 12h4M18 12h4M12 7a5 5 0 100 10 5 5 0 000-10zM12 11a1 1 0 100 2 1 1 0 000-2z" />,
  scissors: <path d="M6 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12" />,
  paperclip: <path d="M21 11.5l-8.5 8.5a5 5 0 01-7-7l9-9a3.5 3.5 0 015 5l-9 9a2 2 0 01-3-3l8-8" />,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  eye: <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 100 6 3 3 0 000-6z" />,
  people: <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8" />,
}

export default function Tips() {
  return (
    <section className="section section-alt" id="tips" aria-labelledby="tips-title">
      <div className="container">
        <div className="section-head">
          <h2 id="tips-title">Tips from briefs that went well</h2>
          <p>Six habits that separate a one-round job from a three-round one.</p>
        </div>
        <div className="grid grid-2 grid-3">
          {tips.map((tip) => (
            <article className="card" key={tip.id}>
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                {icons[tip.icon]}
              </svg>
              <h3>{tip.title}</h3>
              <p>{tip.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
