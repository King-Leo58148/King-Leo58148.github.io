import { useEffect, useState } from "react"
import { getAbout, getExperience, getProjects, getSkills, getCached } from "../api"
import Loader from "./Loader"
import "../detailed.css"

export default function DetailedPortfolio({ hero, contact, onBack }) {
  const [about, setAbout] = useState(() => getCached("about") || [])
  const [skills, setSkills] = useState(() => getCached("skills") || [])
  const [experiences, setExperiences] = useState(() => getCached("experience") || [])
  const [projects, setProjects] = useState(() => getCached("projects") || [])
  const [activeJob, setActiveJob] = useState(0)
  const [loading, setLoading] = useState(() => !getCached("about"))
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    Promise.all([
      getAbout().then(r => setAbout(r.data)),
      getSkills().then(r => setSkills(r.data)),
      getExperience().then(r => setExperiences(r.data)),
      getProjects().then(r => setProjects(r.data)),
    ]).finally(() => setLoading(false))
  }, [])

  function renderParagraph(paragraph) {
    const text = paragraph.description
    const words = paragraph.highlighted_words
    if (!words || words.length === 0) return <p>{text}</p>
    const parts = text.split(new RegExp(`(${words.join("|")})`, "g"))
    return (
      <p>
        {parts.map((part, i) =>
          words.includes(part) ? <span key={i} className="highlight">{part}</span> : part
        )}
      </p>
    )
  }

  const selectedExp = experiences[activeJob]

  return (
    <div className="v4-wrapper">
      {showLoader && <Loader onFinish={() => setShowLoader(false)} />}
      <header className="v4-header">
        <button type="button" className="v4-logo" onClick={onBack} title="Back to Minimal View">
          L
        </button>
        <nav className="v4-nav">
          <a href="#v4-about"><span>01.</span>About</a>
          <a href="#v4-jobs"><span>02.</span>Experience</a>
          <a href="#v4-work"><span>03.</span>Work</a>
          <a href="#v4-contact"><span>04.</span>Contact</a>
          <button type="button" className="v4-switch-btn" onClick={onBack}>
            &larr; Minimal View
          </button>
        </nav>
      </header>

      <main className="v4-main">
        {/* HERO */}
        <section className="v4-hero">
          <div className="v4-intro">Hi, my name is</div>
          <h1 className="v4-big-name">{hero?.name || "Louis Aparkwon Sanyenni"}.</h1>
          <h2 className="v4-big-title">{hero?.title || "Backend Developer"}.</h2>
          <p className="v4-hero-desc">
            {hero?.tagline || "I build clean APIs and real-time systems that work."}
          </p>
          <a href="#v4-work" className="v4-cta">Check out my work</a>
        </section>

        {/* 01. ABOUT */}
        <section id="v4-about" className="v4-section">
          <h2 className="v4-heading"><span>01.</span> About Me</h2>
          {loading ? (
            <div className="v4-about-grid">
              <div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text short"></div>
              </div>
              <div className="skeleton" style={{ width: "260px", height: "320px", borderRadius: "6px" }}></div>
            </div>
          ) : (
            <div className="v4-about-grid">
              <div className="v4-about-text">
                {about.map(p => (
                  <div key={p.id}>{renderParagraph(p)}</div>
                ))}
                {skills.length > 0 && (
                  <ul className="v4-skills-grid">
                    {skills.slice(0, 10).map(s => (
                      <li key={s.id}>{s.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              {hero?.profile_picture && (
                <div className="v4-photo-frame">
                  <img src={hero.profile_picture} alt={hero?.name || "Profile"} />
                </div>
              )}
            </div>
          )}
        </section>

        {/* 02. EXPERIENCE */}
        <section id="v4-jobs" className="v4-section">
          <h2 className="v4-heading"><span>02.</span> Where I&apos;ve Worked</h2>
          {experiences.length === 0 ? (
            <p>Experience details coming soon.</p>
          ) : (
            <div className="v4-jobs">
              <div className="v4-tab-list" role="tablist">
                {experiences.map((exp, idx) => (
                  <button
                    key={exp.id}
                    type="button"
                    role="tab"
                    className={`v4-tab-btn ${idx === activeJob ? "active" : ""}`}
                    onClick={() => setActiveJob(idx)}
                  >
                    {exp.company}
                  </button>
                ))}
              </div>
              {selectedExp && (
                <div className="v4-job-panel">
                  <div className="v4-job-title">
                    {selectedExp.title} <span>@ {selectedExp.company}</span>
                  </div>
                  <div className="v4-job-dates">
                    {selectedExp.start_date} — {selectedExp.end_date}
                  </div>
                  <p className="v4-job-desc">{selectedExp.description}</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 03. PROJECTS */}
        <section id="v4-work" className="v4-section">
          <h2 className="v4-heading"><span>03.</span> Some Things I&apos;ve Built</h2>
          <div className="v4-projects-grid">
            {projects.map(p => (
              <a
                key={p.id}
                href={p.github_link || "#"}
                target={p.github_link ? "_blank" : undefined}
                rel="noopener"
                className="v4-project-card"
              >
                <div>
                  <div className="v4-project-card-top">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="28" height="28">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "0.78rem", color: "var(--muted)" }}>
                      {p.year}
                    </span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
                <div className="v4-project-tech">
                  {p.tags.map(t => (
                    <span key={t.id}>{t.name}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 04. CONTACT */}
        <section id="v4-contact" className="v4-contact">
          <div className="v4-contact-overline">04. What&apos;s Next?</div>
          <h2>Get In Touch</h2>
          <p>
            I&apos;m currently open to backend engineering opportunities and interesting collaborations.
            Whether you have a question or just want to say hi, my inbox is open.
          </p>
          {contact?.email && (
            <a className="v4-cta" href={`mailto:${contact.email}`}>Say Hello</a>
          )}
        </section>
      </main>

      <footer className="v4-footer">
        <div className="v4-socials-inline">
          {contact?.github && <a href={contact.github} target="_blank" rel="noopener">GitHub</a>}
          {contact?.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener">LinkedIn</a>}
          {contact?.email && <a href={`mailto:${contact.email}`}>Email</a>}
        </div>
        <p>Built by {hero?.name || "Louis Aparkwon Sanyenni"}</p>
        <p style={{ marginTop: "0.4rem", fontSize: "0.72rem" }}>
          Design inspired by{" "}
          <a
            href="https://github.com/bchiang7/v4"
            target="_blank"
            rel="noopener"
            style={{ color: "var(--accent)", textDecoration: "underline" }}
          >
            Brittany Chiang
          </a>
        </p>
      </footer>
    </div>
  )
}
