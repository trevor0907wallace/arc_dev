import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/resume'

export default function Hero() {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center pt-16">
      <div className="container-content">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 bg-gradient-to-r from-nebula-cyan via-nebula-blue to-nebula-violet bg-clip-text font-display text-xl font-semibold text-transparent sm:text-2xl"
          >
            {profile.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#experience"
              className="rounded-full bg-gradient-to-r from-nebula-cyan to-nebula-violet px-6 py-3 text-sm font-semibold text-[color:var(--on-accent)] transition-transform hover:-translate-y-0.5"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-hair/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-hair/40 hover:bg-hair/5"
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint sm:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="relative block h-9 w-5 rounded-full border border-hair/20">
            <motion.span
              className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-nebula-cyan"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.div>
      )}
    </section>
  )
}
