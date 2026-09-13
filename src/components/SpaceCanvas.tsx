import { useEffect, useRef } from 'react'

/**
 * A single full-screen canvas that renders three things in one animation loop:
 *   1. A parallax starfield (subtle twinkle + gentle drift).
 *   2. Occasional background shooting stars.
 *   3. A custom cursor: a soft dot that trails "shooting star" particles.
 *
 * Performance notes:
 *   - One requestAnimationFrame loop, delta-time based.
 *   - Device pixel ratio is capped at 2 to bound fill cost on hi-dpi screens.
 *   - Glow is a pre-rendered sprite drawn with drawImage — no per-particle
 *     radial gradients and no shadowBlur (both are expensive per frame).
 *   - Trail particles come from a fixed-size pool; dead ones are reused (no GC churn).
 *   - The loop pauses when the tab is hidden.
 *   - Honors prefers-reduced-motion (static field, native cursor, no loop) and
 *     skips the custom cursor entirely on coarse-pointer (touch) devices.
 */

type Star = {
  x: number
  y: number
  r: number
  baseAlpha: number
  twPhase: number
  twSpeed: number
  depth: number // 0..1, drives parallax + drift speed
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number // remaining, seconds
  maxLife: number
  size: number
  hue: 0 | 1 // 0 = cyan-white, 1 = violet
  active: boolean
}

type Shooter = {
  x: number
  y: number
  vx: number
  vy: number
  len: number
  life: number
  maxLife: number
  active: boolean
}

const MAX_PARTICLES = 220
const MAX_SHOOTERS = 3

function makeGlowSprite(size: number, r: number, g: number, b: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const grd = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grd.addColorStop(0, `rgba(${r},${g},${b},1)`)
  grd.addColorStop(0.25, `rgba(${r},${g},${b},0.55)`)
  grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, size, size)
  return c
}

export default function SpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const useCursor = finePointer && !reduceMotion

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Pre-rendered glow sprites (drawn scaled per element).
    const glowCyan = makeGlowSprite(64, 210, 245, 255)
    const glowViolet = makeGlowSprite(64, 175, 150, 255)

    let stars: Star[] = []

    const buildStars = () => {
      // Density scales with area but is capped for large displays.
      const count = Math.min(Math.round((width * height) / 5200), 480)
      stars = new Array(count)
      for (let i = 0; i < count; i++) {
        const depth = Math.random()
        stars[i] = {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.4 + depth * 1.3,
          baseAlpha: 0.35 + Math.random() * 0.5,
          twPhase: Math.random() * Math.PI * 2,
          twSpeed: 0.6 + Math.random() * 1.6,
          depth,
        }
      }
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildStars()
    }
    resize()

    // ---- Static render path for reduced motion ----
    if (reduceMotion) {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        ctx.globalAlpha = s.baseAlpha
        ctx.fillStyle = '#dfe7ff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      const onResizeStatic = () => {
        resize()
        ctx.clearRect(0, 0, width, height)
        for (const s of stars) {
          ctx.globalAlpha = s.baseAlpha
          ctx.fillStyle = '#dfe7ff'
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }
      window.addEventListener('resize', onResizeStatic)
      return () => window.removeEventListener('resize', onResizeStatic)
    }

    // ---- Animated path ----
    if (useCursor) document.body.classList.add('custom-cursor')

    // Cursor state
    let targetX = width / 2
    let targetY = height / 2
    let dotX = targetX
    let dotY = targetY
    let prevDotX = dotX
    let prevDotY = dotY
    let pointerInside = false
    let isPressed = false

    // Parallax target (normalized -1..1 from center), eased.
    let paraTX = 0
    let paraTY = 0
    let paraX = 0
    let paraY = 0

    // Particle pool
    const particles: Particle[] = new Array(MAX_PARTICLES)
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles[i] = { x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 1, size: 1, hue: 0, active: false }
    }
    let pCursor = 0
    const spawnParticle = (x: number, y: number, hue: 0 | 1) => {
      const p = particles[pCursor]
      pCursor = (pCursor + 1) % MAX_PARTICLES
      p.x = x
      p.y = y
      const a = Math.random() * Math.PI * 2
      const sp = Math.random() * 14
      p.vx = Math.cos(a) * sp
      p.vy = Math.sin(a) * sp + 6 // slight downward bias, like falling embers
      p.maxLife = 0.5 + Math.random() * 0.5
      p.life = p.maxLife
      p.size = 2 + Math.random() * 3.5
      p.hue = hue
      p.active = true
    }

    // Shooter pool
    const shooters: Shooter[] = new Array(MAX_SHOOTERS)
    for (let i = 0; i < MAX_SHOOTERS; i++) {
      shooters[i] = { x: 0, y: 0, vx: 0, vy: 0, len: 0, life: 0, maxLife: 1, active: false }
    }
    let nextShooterIn = 2 + Math.random() * 4
    const spawnShooter = () => {
      const s = shooters.find((sh) => !sh.active)
      if (!s) return
      const fromLeft = Math.random() < 0.5
      s.x = fromLeft ? -60 : Math.random() * width
      s.y = fromLeft ? Math.random() * height * 0.5 : -60
      const speed = 480 + Math.random() * 320
      const ang = (Math.PI / 180) * (20 + Math.random() * 25)
      s.vx = Math.cos(ang) * speed
      s.vy = Math.sin(ang) * speed
      s.len = 120 + Math.random() * 140
      s.maxLife = 0.9 + Math.random() * 0.5
      s.life = s.maxLife
      s.active = true
    }

    // Events
    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      pointerInside = true
      paraTX = (e.clientX / width - 0.5) * 2
      paraTY = (e.clientY / height - 0.5) * 2
    }
    const onLeave = () => {
      pointerInside = false
    }
    const onDown = () => {
      isPressed = true
    }
    const onUp = () => {
      isPressed = false
    }

    if (useCursor) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDown, { passive: true })
      window.addEventListener('pointerup', onUp, { passive: true })
      document.addEventListener('pointerleave', onLeave)
    }

    let raf = 0
    let last = performance.now()
    let running = true

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    let onResize: () => void = () => {}
    onResize = () => resize()
    window.addEventListener('resize', onResize)

    const frame = (now: number) => {
      let dt = (now - last) / 1000
      last = now
      if (dt > 0.05) dt = 0.05 // clamp after tab-switch / stalls
      const t = now / 1000

      ctx.clearRect(0, 0, width, height)

      // Eased parallax
      paraX += (paraTX - paraX) * Math.min(1, dt * 3)
      paraY += (paraTY - paraY) * Math.min(1, dt * 3)

      // --- Stars (source-over) ---
      ctx.fillStyle = '#dfe7ff'
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        // gentle upward drift, wrap around
        s.y -= s.depth * 4 * dt
        if (s.y < -2) s.y = height + 2
        const px = s.x - paraX * s.depth * 14
        const py = s.y - paraY * s.depth * 14
        const tw = 0.65 + 0.35 * Math.sin(s.twPhase + t * s.twSpeed)
        ctx.globalAlpha = s.baseAlpha * tw
        if (s.r < 0.9) {
          ctx.fillRect(px, py, s.r * 2, s.r * 2)
        } else {
          ctx.beginPath()
          ctx.arc(px, py, s.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      // --- Glowing elements (additive) ---
      ctx.globalCompositeOperation = 'lighter'

      // Shooting stars
      nextShooterIn -= dt
      if (nextShooterIn <= 0) {
        spawnShooter()
        nextShooterIn = 3 + Math.random() * 5
      }
      for (let i = 0; i < shooters.length; i++) {
        const s = shooters[i]
        if (!s.active) continue
        s.life -= dt
        if (s.life <= 0 || s.x > width + 120 || s.y > height + 120) {
          s.active = false
          continue
        }
        s.x += s.vx * dt
        s.y += s.vy * dt
        const k = Math.min(1, s.life / s.maxLife) // fade near end
        const nx = s.vx
        const ny = s.vy
        const inv = 1 / Math.hypot(nx, ny)
        const tailX = s.x - nx * inv * s.len
        const tailY = s.y - ny * inv * s.len
        const grd = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
        grd.addColorStop(0, `rgba(210,245,255,${0.9 * k})`)
        grd.addColorStop(1, 'rgba(210,245,255,0)')
        ctx.strokeStyle = grd
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
        // bright head
        const hs = 10
        ctx.globalAlpha = k
        ctx.drawImage(glowCyan, s.x - hs / 2, s.y - hs / 2, hs, hs)
        ctx.globalAlpha = 1
      }

      // Cursor: ease the dot toward the pointer for buttery movement
      dotX += (targetX - dotX) * Math.min(1, dt * 22)
      dotY += (targetY - dotY) * Math.min(1, dt * 22)

      if (useCursor && pointerInside) {
        // Emit trail particles proportional to speed, along the path travelled.
        const dx = dotX - prevDotX
        const dy = dotY - prevDotY
        const dist = Math.hypot(dx, dy)
        const emits = Math.min(6, Math.floor(dist / 4))
        for (let i = 0; i < emits; i++) {
          const f = i / Math.max(1, emits)
          const hue: 0 | 1 = Math.random() < 0.7 ? 0 : 1
          spawnParticle(prevDotX + dx * f, prevDotY + dy * f, hue)
        }
      }
      prevDotX = dotX
      prevDotY = dotY

      // Update + draw particles
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = particles[i]
        if (!p.active) continue
        p.life -= dt
        if (p.life <= 0) {
          p.active = false
          continue
        }
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.vx *= 0.92
        p.vy = p.vy * 0.92 + 12 * dt // mild gravity
        const lifeK = p.life / p.maxLife
        const size = p.size * (0.4 + lifeK * 0.9) * 3.2
        ctx.globalAlpha = lifeK * 0.9
        ctx.drawImage(
          p.hue === 0 ? glowCyan : glowViolet,
          p.x - size / 2,
          p.y - size / 2,
          size,
          size,
        )
      }
      ctx.globalAlpha = 1

      // Cursor dot (drawn last, on top)
      if (useCursor && pointerInside) {
        const ring = isPressed ? 30 : 40
        ctx.globalAlpha = 0.5
        ctx.drawImage(glowViolet, dotX - ring / 2, dotY - ring / 2, ring, ring)
        ctx.globalAlpha = 1
        ctx.globalCompositeOperation = 'source-over'
        const dotR = isPressed ? 3 : 4
        ctx.fillStyle = '#eafbff'
        ctx.beginPath()
        ctx.arc(dotX, dotY, dotR, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      if (useCursor) {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerdown', onDown)
        window.removeEventListener('pointerup', onUp)
        document.removeEventListener('pointerleave', onLeave)
      }
      document.body.classList.remove('custom-cursor')
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
