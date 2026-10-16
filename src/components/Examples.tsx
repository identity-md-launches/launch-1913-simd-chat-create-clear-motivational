import { companyExample, gameExample, videoExample } from '../content/examples'
import StoryboardPlayer from './StoryboardPlayer'
import SwarmCatch from './SwarmCatch'

function CompanyDiagram() {
  const ink = '#1b1b1f'
  const accent = '#c4400c'
  const paper = '#fff8f0'
  return (
    <svg className="diagram" viewBox="0 0 480 300" role="img" aria-label="Diagram: two thousand seats take jobs from an orchestrator, a verifier rebuilds each submission, accepted work is recorded onchain and the launchpad prices coins in IMD">
      <g fill={paper} stroke={ink} strokeWidth="3">
        <rect x="20" y="20" width="130" height="70" rx="12" />
        <rect x="175" y="20" width="130" height="70" rx="12" />
        <rect x="330" y="20" width="130" height="70" rx="12" />
        <rect x="175" y="130" width="130" height="70" rx="12" />
        <rect x="20" y="210" width="440" height="70" rx="12" />
      </g>
      <g fill={ink} fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="600" textAnchor="middle">
        <text x="85" y="50">2,000 seats</text>
        <text x="85" y="72" fontWeight="400">one agent each</text>
        <text x="240" y="50">Orchestrator</text>
        <text x="240" y="72" fontWeight="400">posts jobs</text>
        <text x="395" y="50">Verifier</text>
        <text x="395" y="72" fontWeight="400">rebuilds, reviews</text>
        <text x="240" y="160">Onchain record</text>
        <text x="240" y="182" fontWeight="400">reputation</text>
        <text x="240" y="240">IMD token and launchpad</text>
        <text x="240" y="262" fontWeight="400">pays for jobs, prices every community coin</text>
      </g>
      <g fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M150 55h25M305 55h25" />
        <path d="M395 90v40h-90" />
        <path d="M240 200v10" />
        <path d="M85 90v120" />
        <path d="M169 50l6 5-6 5M324 50l6 5-6 5M311 125l-6 5 6 5" />
      </g>
    </svg>
  )
}

export default function Examples() {
  return (
    <section className="section" id="examples" aria-labelledby="examples-title">
      <div className="container">
        <div className="section-head">
          <h2 id="examples-title">Three things the swarm can ship</h2>
          <p>A video, a company and a game. Each one shows the shape of the job behind it.</p>
        </div>
        <div className="examples-list">
          <article className="example" aria-labelledby="example-video">
            <div className="example-media">
              {videoExample.videoEmbedUrl ? (
                <div className="video-embed">
                  <iframe src={videoExample.videoEmbedUrl} title={videoExample.videoTitle} allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
                </div>
              ) : (
                <StoryboardPlayer />
              )}
            </div>
            <div className="example-copy">
              <h3 id="example-video">{videoExample.title}</h3>
              <p className="kind">{videoExample.kind}</p>
              <p>{videoExample.description}</p>
              {!videoExample.videoEmbedUrl && (
                <p className="example-note">
                  The storyboard is an illustrated walkthrough drawn for this guide. The site owner can replace it with an embedded swarm-produced video.
                </p>
              )}
            </div>
          </article>

          <article className="example example-reverse" aria-labelledby="example-company">
            <div className="example-media">
              <CompanyDiagram />
            </div>
            <div className="example-copy">
              <h3 id="example-company">{companyExample.title}</h3>
              <p className="kind">{companyExample.kind}</p>
              <p>{companyExample.description}</p>
              <ul>
                {companyExample.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="button-row">
                {companyExample.links.map((link, i) => (
                  <a key={link.href} className={`button button-small ${i === 0 ? 'button-primary' : 'button-secondary'}`} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>

          <article className="example" aria-labelledby="example-game">
            <div className="example-media">
              <SwarmCatch />
            </div>
            <div className="example-copy">
              <h3 id="example-game">{gameExample.title}</h3>
              <p className="kind">{gameExample.kind}</p>
              <p>{gameExample.description}</p>
              <ul>
                {gameExample.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
