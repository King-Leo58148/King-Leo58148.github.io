import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Contact from "./components/Contact"
import { getHero, getContact } from "./api"

export default function App() {
  const [hero, setHero] = useState(null)
  const [contact, setContact] = useState(null)

  useEffect(() => {
    getHero().then(res => setHero(res.data[0]))
    getContact().then(res => setContact(res.data[0]))
  }, [])

  useEffect(() => {
    if (window.innerWidth > 900) {
      const glow = document.createElement('div')
      glow.style.cssText = `
        position: fixed; pointer-events: none; z-index: 0;
        width: 600px; height: 600px; border-radius: 50%;
        background: radial-gradient(circle, rgba(100,255,218,0.04) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: left 100ms ease, top 100ms ease;
      `
      document.body.appendChild(glow)

      const move = (e) => {
        glow.style.left = e.clientX + 'px'
        glow.style.top = e.clientY + 'px'
      }

      document.addEventListener('mousemove', move)
      return () => {
        document.removeEventListener('mousemove', move)
        document.body.removeChild(glow)
      }
    }
  }, [])

  return (
    <div className="layout">
      <Sidebar hero={hero} contact={contact} />
      <main className="content">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact contact={contact} />
        <footer className="footer">
          <p>Built by {hero?.name}</p>
        </footer>
      </main>
    </div>
  )
}