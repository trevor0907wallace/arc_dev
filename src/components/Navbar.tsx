import { useEffect, useState } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { profile } from '../data/resume'

type Theme = 'dark' | 'light'

const links = [
  { href: '#about', label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-hair/10 bg-hair/[0.03] text-ink-muted transition-colors hover:border-nebula-cyan/50 hover:text-nebula-cyan"
    >
      {theme === 'dark' ? <LuSun className="h-[18px] w-[18px]" /> : <LuMoon className="h-[18px] w-[18px]" />}
    </button>
  )
}

export default function Navbar({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const initials = profile.name
    .split(' ')
    .map((p) => p[0])
    .join('')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-hair/10 bg-space-950/70 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-content flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-hair/10 bg-hair/[0.04] font-display text-sm font-bold text-nebula-cyan transition-colors group-hover:border-nebula-cyan/50">
            {initials}
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide text-ink sm:block">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline text-sm text-ink-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href="#contact"
            className="hidden rounded-full border border-nebula-cyan/40 bg-nebula-cyan/10 px-4 py-2 text-sm font-medium text-nebula-cyan transition-colors hover:bg-nebula-cyan/20 md:inline-block"
          >
            Get in touch
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-hair/10 text-ink md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? 'top-2 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-all ${open ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? 'top-2 -rotate-45' : 'top-4'}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-hair/10 bg-space-950/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <ul className="container-content flex flex-col gap-1 py-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-3 text-ink-muted transition-colors hover:bg-hair/5 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
