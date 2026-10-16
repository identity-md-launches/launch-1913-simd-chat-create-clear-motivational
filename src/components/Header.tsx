import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '#guide', label: 'Guide' },
  { href: '#brief', label: 'Brief builder' },
  { href: '#examples', label: 'Examples' },
  { href: '#tips', label: 'Tips' },
  { href: '#resources', label: 'Resources' },
]

export function BrandMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="currentColor" />
      <circle cx="22" cy="24" r="7" fill="#c4400c" />
      <circle cx="42" cy="20" r="5" fill="#ffd9c7" />
      <circle cx="38" cy="42" r="8" fill="#c4400c" />
      <circle cx="18" cy="46" r="4" fill="#ffd9c7" />
      <path d="M22 24 L42 20 L38 42 L18 46 Z" fill="none" stroke="#fff8f0" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <div className="container">
        <a className="brand" href="#top">
          <BrandMark />
          <span>Swarm Builder Guide</span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className="site-nav" aria-label="Sections" hidden={!open}>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
