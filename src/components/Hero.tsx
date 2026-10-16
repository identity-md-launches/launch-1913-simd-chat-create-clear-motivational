import { phases } from '../content/guide'

function HeroArt() {
  return (
    <svg viewBox="0 0 420 320" role="img" aria-label="Four connected agents passing a brief from idea to launch">
      <rect width="420" height="320" rx="24" fill="#ffefe3" />
      <path d="M70 230 C 120 120, 200 120, 230 180 S 330 230, 360 90" fill="none" stroke="#1b1b1f" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 10" />
      <circle cx="70" cy="230" r="34" fill="#c4400c" />
      <circle cx="190" cy="150" r="26" fill="#ffd9c7" stroke="#1b1b1f" strokeWidth="3" />
      <circle cx="290" cy="210" r="30" fill="#ffd9c7" stroke="#1b1b1f" strokeWidth="3" />
      <circle cx="360" cy="90" r="40" fill="#1b1b1f" />
      <path d="M345 92 l10 10 l22 -24" fill="none" stroke="#fff8f0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="54" y="222" width="32" height="18" rx="3" fill="#fff8f0" />
      <path d="M60 228h20M60 234h14" stroke="#c4400c" strokeWidth="2" strokeLinecap="round" />
      <path d="M182 144h16M182 150h16M182 156h10" stroke="#1b1b1f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M276 202h28v18h-28z" fill="#fff8f0" stroke="#1b1b1f" strokeWidth="2.5" />
      <path d="M281 211h8l4-6 5 10 4-4" fill="none" stroke="#c4400c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1 id="hero-title">
            Build something <span className="highlight">great</span> with the swarm
          </h1>
          <p className="hero-lede">
            A step-by-step guide to planning, briefing, building and launching projects on Identity.md.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="#guide">
              Start the guide
            </a>
            <a className="button button-secondary" href="#brief">
              Write a brief
            </a>
          </div>
          <ol className="phase-strip" aria-label="The four phases">
            {phases.map((phase) => (
              <li key={phase.id}>
                <a href={`#phase-${phase.id}`}>
                  <span className="phase-number">{phase.number}</span>
                  {phase.name}
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className="hero-art">
          <HeroArt />
        </div>
      </div>
    </section>
  )
}
