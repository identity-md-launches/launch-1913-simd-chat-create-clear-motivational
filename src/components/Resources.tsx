import { resources } from '../content/resources'

export default function Resources() {
  return (
    <section className="section" id="resources" aria-labelledby="resources-title">
      <div className="container">
        <div className="section-head">
          <h2 id="resources-title">Resources and links</h2>
          <p>Everything you need to open a job, launch a coin and find the people who will try your project.</p>
        </div>
        <ul className="resource-list">
          {resources.map((resource) => (
            <li key={resource.href}>
              <a href={resource.href} target="_blank" rel="noopener noreferrer">
                {resource.label}
              </a>
              <span>{resource.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
