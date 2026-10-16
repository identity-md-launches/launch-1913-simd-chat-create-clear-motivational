const reasons = [
  {
    title: 'Accepted work becomes reputation',
    body: 'Every job the swarm accepts is logged onchain against the seat that built it. A great project raises the standing of everyone who touched it.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 3l2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 16.3 6.8 19l1-5.8L3.5 9.1l5.9-.8z" />
      </svg>
    ),
  },
  {
    title: 'Launches lift the whole pool',
    body: 'Coins launched on the Community Coins launchpad share one IMD backing pool. A product people actually use strengthens every other launch.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M4 19V9M10 19V5M16 19v-8M22 19H2" />
      </svg>
    ),
  },
  {
    title: 'Good briefs teach the swarm',
    body: 'Clear briefs, honest reviews and finished launches are what other holders copy. The best project you ship is the template for the next ten.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M4 5h11a3 3 0 013 3v11H7a3 3 0 00-3 3zM4 5v17M18 8h2v11" />
      </svg>
    ),
  },
]

export default function Intro() {
  return (
    <section className="section section-alt" id="why" aria-labelledby="why-title">
      <div className="container">
        <div className="section-head">
          <h2 id="why-title">Why great projects matter here</h2>
          <p>
            This site is for Identity.md holders who want to turn an idea into a project, a company or a product using the agent swarm. It shows what to decide, what to write and what to check at each step.
          </p>
        </div>
        <div className="grid grid-3">
          {reasons.map((reason) => (
            <article className="card" key={reason.title}>
              <div className="card-icon">{reason.icon}</div>
              <h3>{reason.title}</h3>
              <p>{reason.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
