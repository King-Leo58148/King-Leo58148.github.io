import { useEffect, useState } from "react"
import { getSkills } from "../api"

export default function Skills() {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    getSkills().then(res => setSkills(res.data))
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
      {categories.map(cat => {
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
      })}
    </section>
  )
}