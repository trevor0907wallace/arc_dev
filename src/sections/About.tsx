import Reveal from '../components/Reveal'
import { profile, stats } from '../data/resume'

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">About</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Genuine depth across the whole stack.
            </h2>
            <p className="mt-6 text-ink-muted">
              I&apos;ve led projects end to end as technical lead, owning architecture, mentoring
              engineers, and solving the problems others get stuck on.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-ink-muted">{profile.summary}</p>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="card p-4">
                  <dt className="font-display text-2xl font-bold text-ink">{s.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-ink-faint">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
