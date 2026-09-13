# Trevor Wallace — Portfolio

A space-themed personal portfolio for a senior full-stack engineer. Built with
**Vite + React + TypeScript**, styled with **Tailwind CSS**, animated with
**Framer Motion**, and set against a canvas-rendered starfield with a custom
cursor that trails shooting-star particles.

## Highlights

- **Space background** — a parallax starfield with subtle twinkle, gentle drift,
  and occasional shooting stars, all painted on a single `<canvas>`.
- **Custom cursor** — a soft dot that leaves a trail of glowing particles in its
  wake. Runs in the same animation loop as the background.
- **Performance-minded** — one `requestAnimationFrame` loop, device-pixel-ratio
  capped at 2, a pre-rendered glow sprite instead of per-particle gradients or
  `shadowBlur`, an object-pooled particle system, and a loop that pauses when the
  tab is hidden.
- **Accessible & responsive** — honors `prefers-reduced-motion` (static field,
  native cursor, no loop), skips the custom cursor on touch devices, keeps
  keyboard focus visible, and works down to ~360px wide.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/
    SpaceCanvas.tsx   # starfield + shooting stars + custom cursor (canvas)
    Navbar.tsx        # sticky navigation
    Reveal.tsx        # scroll-reveal wrapper (Framer Motion)
    Footer.tsx
  sections/
    Hero.tsx  About.tsx  Expertise.tsx  Experience.tsx  Skills.tsx  Contact.tsx
  data/
    resume.ts         # ALL site content lives here — edit this to update copy
  index.css           # Tailwind layers, nebula backdrop, cursor rules
  App.tsx
```

## Editing content

All copy — name, summary, experience, skills, education — lives in
[`src/data/resume.ts`](src/data/resume.ts). Update that one file and every
section reflects the change. Add your GitHub / LinkedIn URLs to the `social`
object there and the footer links appear automatically.

## Contact form

The contact form works with **no backend**: submitting composes a message and
opens the visitor's mail client. To use a real form service instead (e.g.
[Formspree](https://formspree.io)), copy `.env.example` to `.env` and set
`VITE_FORM_ENDPOINT` — the form then POSTs the fields as JSON.

## Deploying

This is a static site. On **Vercel** or **Netlify**, use:

- Build command: `npm run build`
- Output directory: `dist`

## License

Content © Trevor Wallace. Code is free to reuse as a starting point for your own
portfolio.
