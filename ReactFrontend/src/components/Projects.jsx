import { useEffect, useState } from "react"
import { getProjects } from "../api"

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getProjects().then(res => setProjects(res.data))
  }, [])

  return (
    <section id="projects" className="section">
      {projects.map(project => (
        <a
          key={project.id}
          className="project-card"
          href={project.github_link}
          target="_blank"
          rel="noopener"
        >
          <div className="project-top">
            <div className="project-title">
              {project.title}
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M7 17L17 7"/>
                <path d="M7 7h10v10"/>
              </svg>
            </div>
            <div className="project-year">{project.year}</div>
          </div>
          <p className="project-desc">{project.description}</p>
          <div className="project-tags">
            {project.tags.map(tag => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </a>
      ))}
      <a className="view-all" href="https://github.com/King-Leo58148" target="_blank" rel="noopener">
        View full GitHub archive
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M7 17L17 7"/>
          <path d="M7 7h10v10"/>
        </svg>
      </a>
    </section>
  )
}