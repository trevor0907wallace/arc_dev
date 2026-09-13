import { useState } from 'react'
import type { FormEvent } from 'react'
import Reveal from '../components/Reveal'
import { profile } from '../data/resume'

/**
 * Contact form.
 *
 * Zero-backend by default: submitting composes a message and opens the visitor's
 * mail client (mailto) addressed to the profile email.
 *
 * To use a real form service instead (e.g. Formspree), set VITE_FORM_ENDPOINT
 * in a .env file to your endpoint URL — the form will POST the fields as JSON.
 */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    if (FORM_ENDPOINT) {
      try {
        setStatus('sending')
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Request failed')
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } catch {
        setStatus('error')
      }
      return
    }

    // Fallback: open the visitor's email client.
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-ink placeholder:text-ink-faint transition-colors focus:border-nebula-cyan/50 focus:bg-white/[0.05] focus:outline-none'

  return (
    <section id="contact" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Contact</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Let&apos;s build something that holds up under real load.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
              Have a project, a role, or a hard problem that needs an owner? Send a note and
              I&apos;ll get back to you.
            </p>
            <p className="mt-8 text-sm text-ink-faint">
              Based in {profile.location} · Open to remote
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="card p-6 sm:p-8" noValidate>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-ink-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update('name')}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-ink-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm text-ink-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell me a little about what you're working on…"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-nebula-cyan to-nebula-violet px-6 py-3 text-sm font-semibold text-space-950 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              <p aria-live="polite" className="mt-4 min-h-5 text-center text-sm">
                {status === 'sent' && (
                  <span className="text-nebula-cyan">
                    Thanks — your message is on its way. I&apos;ll be in touch soon.
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-red-400">
                    Something went wrong. Please email {profile.email} directly.
                  </span>
                )}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
