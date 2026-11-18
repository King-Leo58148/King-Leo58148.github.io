import { useEffect, useState } from "react"
import { getExperience } from "../api"

export default function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getExperience()
      .then(res => setExperiences(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="experience" className="section">
      {loading ? (
        <div aria-label="Loading experience">
          {[1, 2].map(i => (
            <div key={i} className="experience-card skeleton-card">
              <div className="skeleton skeleton-text" style={{ width: "95px", height: "0.8rem" }}></div>
              <div className="experience-right">
                <div className="skeleton skeleton-subtitle" style={{ width: "50%" }}></div>
                <div className="skeleton skeleton-text" style={{ width: "35%", marginBottom: "0.85rem" }}></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text short"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        experiences.map(exp => (
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
        ))
      )}
    </section>
  )

}