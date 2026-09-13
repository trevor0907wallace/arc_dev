import Reveal from '../components/Reveal'
import { experience } from '../data/resume'

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-4">Experience</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            A decade of shipping to production.
          </h2>
        </Reveal>

        <ol className="mt-16 space-y-4">
          {experience.map((role, i) => (
            <Reveal as="li" key={role.company + role.period} delay={i * 0.05}>
              <article className="card relative p-7 sm:p-9">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-nebula-cyan">{role.company}</p>
                  </div>
                  <div className="text-sm text-ink-faint sm:text-right">
                    <p className="font-medium text-ink-muted">{role.period}</p>
                    <p>{role.location}</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {role.highlights.map((h, hi) => (
                    <li key={hi} className="flex gap-3 text-ink-muted">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nebula-violet/70"
                      />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
