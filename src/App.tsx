import SpaceCanvas from './components/SpaceCanvas'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Expertise from './sections/Expertise'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <SpaceCanvas />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-space-800 focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  )
}
