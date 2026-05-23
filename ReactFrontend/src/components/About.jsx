import { useEffect, useState } from "react"
import { getAbout } from "../api"

export default function About() {
  const [paragraphs, setParagraphs] = useState([])

  useEffect(() => {
    getAbout().then(res => setParagraphs(res.data))
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
      {paragraphs.map(p => (
        <div key={p.id}>
          {renderParagraph(p)}
        </div>
      ))}
    </section>
  )
}