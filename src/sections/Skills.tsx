import Reveal from '../components/Reveal'
import { skills } from '../data/resume'

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 py-24 sm:py-28">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-4">Toolkit</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            The stack I reach for.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <Reveal key={group.title} delay={(i % 4) * 0.05}>
              <div className="card h-full p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-nebula-cyan/80">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-sm text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
