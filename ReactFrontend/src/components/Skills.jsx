import { useEffect, useState } from "react"
import { getSkills, getCached } from "../api"

export default function Skills() {
  const [skills, setSkills] = useState(() => getCached("skills") || [])
  const [loading, setLoading] = useState(() => !getCached("skills"))

  useEffect(() => {
    getSkills()
      .then(res => setSkills(res.data))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['core', 'databases', 'tools', 'exploring']
  const labels = {
    core: 'Core',
    databases: 'Databases',
    tools: 'Tools & Infrastructure',
    exploring: 'Exploring'
  }

  return (
    <section id="skills" className="section">
      {loading ? (
        <div aria-label="Loading skills">
          {[1, 2].map(group => (
            <div key={group} className="skill-group">
              <div className="skeleton skeleton-text" style={{ width: "90px", height: "0.75rem", marginBottom: "0.75rem" }}></div>
              <div className="skill-list">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="skeleton skeleton-pill" style={{ borderRadius: "4px" }}></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        categories.map(cat => {
          const filtered = skills.filter(s => s.category === cat)
          if (filtered.length === 0) return null
          return (
            <div key={cat} className="skill-group">
              <div className="skill-group-title">{labels[cat]}</div>
              <div className="skill-list">
                {filtered.map(skill => (
                  <span key={skill.id} className="skill-tag">{skill.name}</span>
                ))}
              </div>
            </div>
          )
        })
      )}
    </section>
  )
}