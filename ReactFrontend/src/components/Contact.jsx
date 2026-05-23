export default function Contact({ contact }) {
  return (
    <section id="contact" className="section">
      <p>
        I'm currently open to backend internships and collaboration opportunities.
        Whether you have a question or just want to say hi, feel free to reach out.
      </p>
      <a
        className="contact-btn"
        href={`mailto:${contact?.email}`}
      >
        Say Hello
      </a>
    </section>
  )
}