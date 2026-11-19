import { useEffect, useState } from "react"

export default function Loader({ onFinish }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1250)
    const doneTimer = setTimeout(() => onFinish?.(), 1600)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onFinish])

  return (
    <div className={`v4-loader ${fading ? "fade-out" : ""}`} aria-label="Loading">
      <svg className="v4-loader-svg" viewBox="0 0 100 100" fill="none">
        <polygon
          className="v4-loader-hex"
          points="50,5 91,27.5 91,72.5 50,95 9,72.5 9,27.5"
          stroke="#64ffda"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          className="v4-loader-letter"
          x="50"
          y="63"
          textAnchor="middle"
          fill="#64ffda"
          fontSize="40"
          fontWeight="700"
          fontFamily="Fira Code, monospace"
        >
          L
        </text>
      </svg>
    </div>
  )
}
