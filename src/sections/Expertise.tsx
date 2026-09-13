import Reveal from '../components/Reveal'
import { expertise } from '../data/resume'

export default function Expertise() {
  return (
    <section id="expertise" className="relative scroll-mt-20 py-24 sm:py-28">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-4">What I do</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Areas I take ownership of.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {expertise.map((e, i) => (
            <Reveal as="article" key={e.title} delay={i * 0.06}>
              <div className="card group h-full p-7 transition-colors duration-300 hover:border-nebula-cyan/30 hover:bg-white/[0.04]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-ink">{e.title}</h3>
                  <span className="font-display text-sm font-medium text-nebula-cyan/60">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-4 leading-relaxed text-ink-muted">{e.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
