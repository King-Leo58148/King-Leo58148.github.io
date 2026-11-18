import { useEffect, useState } from "react"
import { getAbout } from "../api"

export default function About({ hero }) {
  const [paragraphs, setParagraphs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAbout()
      .then(res => setParagraphs(res.data))
      .finally(() => setLoading(false))
  }, [])

  function renderParagraph(paragraph) {
    let text = paragraph.description
    const words = paragraph.highlighted_words

    if (!words || words.length === 0) return <p>{text}</p>

    const parts = text.split(new RegExp(`(${words.join('|')})`, 'g'))

    return (
      <p>
        {parts.map((part, i) =>
          words.includes(part)
            ? <span key={i} className="highlight">{part}</span>
            : part
        )}
      </p>
    )
  }

  return (
    <section id="about" className="section">
      {loading ? (
        <div className="about-layout" aria-label="Loading about section">
          <div className="about-text">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text short"></div>
            <div className="skeleton skeleton-text" style={{ marginTop: "0.75rem" }}></div>
            <div className="skeleton skeleton-text short"></div>
          </div>
          <div className="about-photo-wrap">
            <div className="skeleton skeleton-photo"></div>
          </div>
        </div>
      ) : (
        <div className={hero?.profile_picture ? "about-layout" : ""}>
          <div className="about-text">
            {paragraphs.map(p => (
              <div key={p.id}>
                {renderParagraph(p)}
              </div>
            ))}
          </div>
          {hero?.profile_picture && (
            <div className="about-photo-wrap">
              <img
                src={hero.profile_picture}
                alt={hero?.name || "Profile"}
                className="about-photo"
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}