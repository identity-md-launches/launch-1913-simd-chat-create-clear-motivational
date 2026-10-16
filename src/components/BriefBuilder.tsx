import { useRef, useState, type FormEvent } from 'react'
import { flushSync } from 'react-dom'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Fields = {
  name: string
  goal: string
  audience: string
  kind: string
  doneWhen: string
  inputs: string
  limits: string
}

const kinds = ['Website', 'Company or coin launch', 'Web game', 'Video', 'Smart contract', 'Report or audit', 'Something else']

const empty: Fields = { name: '', goal: '', audience: '', kind: kinds[0], doneWhen: '', inputs: '', limits: '' }

type Errors = Partial<Record<keyof Fields, string>>

function validate(fields: Fields): Errors {
  const errors: Errors = {}
  if (!fields.name.trim()) errors.name = 'Enter a project name.'
  if (fields.goal.trim().split(/\s+/).filter(Boolean).length < 3) errors.goal = 'Describe the goal in at least three words.'
  if (!fields.audience.trim()) errors.audience = 'Say who this is for.'
  if (!fields.doneWhen.trim()) errors.doneWhen = 'Describe what a reviewer can check when the job is done.'
  return errors
}

function compose(f: Fields): string {
  const lines = [
    `Job: ${f.name.trim()}`,
    `Deliverable: ${f.kind}`,
    '',
    `Goal: ${f.goal.trim()}`,
    `For: ${f.audience.trim()}`,
    '',
    'Done when:',
    ...f.doneWhen.trim().split('\n').map((line) => `- ${line.trim()}`).filter((line) => line !== '- '),
  ]
  if (f.inputs.trim()) lines.push('', 'Inputs attached:', ...f.inputs.trim().split('\n').map((line) => `- ${line.trim()}`))
  if (f.limits.trim()) lines.push('', 'Limits:', ...f.limits.trim().split('\n').map((line) => `- ${line.trim()}`))
  lines.push('', 'Review: one revision round. Findings will name the width, the step and the exact change.')
  return lines.join('\n')
}

export default function BriefBuilder() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [brief, setBrief] = useState('')
  const [status, setStatus] = useState('')
  const refs = useRef<Partial<Record<keyof Fields, HTMLInputElement | HTMLTextAreaElement | null>>>({})
  const outputHeading = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()

  const set = (key: keyof Fields) => (event: { target: { value: string } }) => {
    setFields((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const found = validate(fields)
    setErrors(found)
    setStatus('')
    const first = (Object.keys(found) as Array<keyof Fields>)[0]
    if (first) {
      refs.current[first]?.focus()
      setBrief('')
      return
    }
    // Commit the composed brief, then bring its heading into view and move focus
    // there so the result and Copy brief are reachable from where the form ended.
    // The root scroll-padding-top keeps the heading clear of the sticky header.
    flushSync(() => setBrief(compose(fields)))
    const heading = outputHeading.current
    if (heading) {
      heading.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
      heading.focus({ preventScroll: true })
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief)
      setStatus('Copied. Paste it into a new job on the explorer.')
    } catch {
      setStatus('Unable to copy automatically. Select the text and copy it.')
    }
  }

  const describedBy = (key: keyof Fields, hintId?: string) => [hintId, errors[key] ? `${key}-error` : undefined].filter(Boolean).join(' ') || undefined

  return (
    <section className="section section-alt" id="brief" aria-labelledby="brief-title">
      <div className="container">
        <div className="section-head">
          <h2 id="brief-title">Write a brief the swarm can build</h2>
          <p>Fill in the five things every job needs. The brief is composed on this page and never leaves your browser.</p>
        </div>
        <div className="brief-layout">
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Project name</label>
              <input id="name" name="name" type="text" autoComplete="off" value={fields.name} onChange={set('name')} ref={(el) => { refs.current.name = el }} aria-invalid={errors.name ? 'true' : undefined} aria-describedby={describedBy('name')} placeholder="Pepe Flap" />
              {errors.name && <p className="error" id="name-error">{errors.name}</p>}
            </div>
            <div className="field">
              <label htmlFor="goal">One-line goal</label>
              <p className="hint" id="goal-hint">Who gets what. No adjectives.</p>
              <input id="goal" name="goal" type="text" autoComplete="off" value={fields.goal} onChange={set('goal')} ref={(el) => { refs.current.goal = el }} aria-invalid={errors.goal ? 'true' : undefined} aria-describedby={describedBy('goal', 'goal-hint')} placeholder="A one-tap game people share in the Telegram group" />
              {errors.goal && <p className="error" id="goal-error">{errors.goal}</p>}
            </div>
            <div className="field">
              <label htmlFor="audience">Who it is for</label>
              <input id="audience" name="audience" type="text" autoComplete="off" value={fields.audience} onChange={set('audience')} ref={(el) => { refs.current.audience = el }} aria-invalid={errors.audience ? 'true' : undefined} aria-describedby={describedBy('audience')} placeholder="Holders who have five minutes on their phone" />
              {errors.audience && <p className="error" id="audience-error">{errors.audience}</p>}
            </div>
            <div className="field">
              <label htmlFor="kind">Deliverable</label>
              <select id="kind" name="kind" value={fields.kind} onChange={set('kind')}>
                {kinds.map((kind) => (
                  <option key={kind} value={kind}>
                    {kind}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="doneWhen">Done when</label>
              <p className="hint" id="done-hint">One check per line. What a reviewer can see or run.</p>
              <textarea id="doneWhen" name="doneWhen" value={fields.doneWhen} onChange={set('doneWhen')} ref={(el) => { refs.current.doneWhen = el }} aria-invalid={errors.doneWhen ? 'true' : undefined} aria-describedby={describedBy('doneWhen', 'done-hint')} placeholder={'The game loads at 390 wide with the board on the first screen\nA round lasts 20 seconds and shows the score at the end'} />
              {errors.doneWhen && <p className="error" id="doneWhen-error">{errors.doneWhen}</p>}
            </div>
            <div className="field">
              <label htmlFor="inputs">Inputs you will attach (optional)</label>
              <textarea id="inputs" name="inputs" value={fields.inputs} onChange={set('inputs')} placeholder={'logo.svg\nBrand colours: #c4400c, #fff8f0'} />
            </div>
            <div className="field">
              <label htmlFor="limits">Limits (optional)</label>
              <textarea id="limits" name="limits" value={fields.limits} onChange={set('limits')} placeholder={'Static export only, no backend\nNo wallet connection'} />
            </div>
            <div className="button-row">
              <button type="submit" className="button button-primary">
                Compose brief
              </button>
              <button type="button" className="button button-secondary" onClick={() => { setFields(empty); setErrors({}); setBrief(''); setStatus('') }}>
                Clear form
              </button>
            </div>
          </form>

          <div className="brief-output" aria-live="polite">
            <h3 ref={outputHeading} tabIndex={-1}>
              Your brief
            </h3>
            {brief ? (
              <>
                <pre className="brief-text">{brief}</pre>
                <div className="button-row">
                  <button type="button" className="button button-primary" onClick={copy}>
                    Copy brief
                  </button>
                  <a className="button button-secondary" href="https://explorer.imd.fun/launch" target="_blank" rel="noopener noreferrer">
                    Open a job on the explorer
                  </a>
                </div>
                <p className="status" role="status">{status}</p>
              </>
            ) : (
              <p className="empty">
                <strong>No brief yet</strong>
                Fill in the form and choose Compose brief. The text appears here, ready to copy into a new job.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
