import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article'
}

/**
 * Subtle scroll-reveal: fade + small rise, once. Disabled under reduced motion.
 */
export default function Reveal({ children, className, delay = 0, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
