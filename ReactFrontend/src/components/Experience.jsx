import { useEffect, useState } from "react"
import { getExperience } from "../api"

export default function Experience() {
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    getExperience().then(res => setExperiences(res.data))
  }, [])

  return (
    <section id="experience" className="section">
      {experiences.map(exp => (
        <div key={exp.id} className="experience-card">
          <div className="experience-date">
            {exp.start_date} — {exp.end_date}
          </div>
          <div className="experience-right">
            <div className="experience-title">{exp.title}</div>
            <div className="experience-company">{exp.company}</div>
            <p className="experience-desc">{exp.description}</p>
          </div>
        </div>
      ))}
    </section>
  )

}